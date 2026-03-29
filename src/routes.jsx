import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
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
import { Box } from '@mui/material';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === '/') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Box sx={{ background: '#fff', minHeight: '100vh' }}>
        <Routes>
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
        </Routes>
      </Box>
    </Router>
  );
}

export default AppRoutes;
