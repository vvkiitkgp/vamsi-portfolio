import React, { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './containers/Home';
import Home2 from './containers/Home2';
import ClientForm from './apps/ClientForm';
import HtmlConverter from './apps/HtmlConverter';
import InstagramAlike from './apps/InstagramAlike';
import ShoppingConcept from './apps/ShoppingConcept';
import TodoList from './apps/TodoList';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import AskAnything from './pages/AskAnything';
import JewelleryStore from './pages/JewelleryStore';
import ScrollableTable from './apps/ScrollableTable';
import AiDrivenWebapp from './pages/AiDrivenWebapp';
import SkillsUniverse from './pages/SkillsUniverse';
import { Box } from '@mui/material';

/**
 * Slide direction: navigating to Home is "back" (page slides right, Home enters
 * from the left); navigating to any other route is "forward" (current page slides
 * left, the new page enters from the right).
 */
const pageVariants = {
  initial: (dir) => ({ x: dir === 'back' ? '-100%' : '100%', position: 'relative' }),
  in: { x: '0%', position: 'relative' },
  out: (dir) => ({
    x: dir === 'back' ? '100%' : '-100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  }),
};

// Strip the residual transform once a page settles (x back to 0) so it doesn't
// create a containing block for the page's position:fixed children (the sticky
// NavBar) or position:sticky hero. framer appends translateZ(0px), so match on
// the latest x value rather than the generated string.
const flattenRestTransform = (latest, generated) =>
  parseFloat(latest.x) === 0 ? 'none' : generated;

function AnimatedRoutes() {
  const location = useLocation();
  const pathname = location.pathname;
  const direction = pathname === '/' ? 'back' : 'forward';

  // Remember where the user was on Home so we can return them there.
  const homeScrollRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      if (window.location.pathname === '/') homeScrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sub-pages open at the top; returning Home restores the saved position.
  useEffect(() => {
    if (pathname === '/') {
      const y = homeScrollRef.current;
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <Box sx={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}>
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
          transformTemplate={flattenRestTransform}
          style={{ width: '100%' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/client-form" element={<ClientForm />} />
            <Route path="/html-converter" element={<HtmlConverter />} />
            <Route path="/instagram-alike" element={<InstagramAlike />} />
            <Route path="/shopping-concept" element={<ShoppingConcept />} />
            <Route path="/todo-list" element={<TodoList />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ask-anything" element={<AskAnything />} />
            <Route path="/jewellery-store" element={<JewelleryStore />} />
            <Route path="/scrollable-table" element={<ScrollableTable />} />
            <Route path="/ai-driven-webapp" element={<AiDrivenWebapp />} />
            <Route path="/skills-universe" element={<SkillsUniverse />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}

function AppRoutes() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default AppRoutes;
