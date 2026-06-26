import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TerminalIcon from '@mui/icons-material/Terminal';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const WORD_MARK = 'Vamsi Vinay Kumar';

// Order mirrors the page flow: Home → Skills → Projects, then the route links.
// `section` ties an item to a homepage anchor for scroll-spy highlighting.
const navItems = [
  { label: 'Home', Icon: HomeOutlinedIcon, scrollTop: true, section: 'home' },
  { label: 'Skills', Icon: TerminalIcon, target: 'skills', section: 'skills' },
  { label: 'Projects', Icon: WorkOutlineIcon, target: 'projects', section: 'projects' },
  { label: 'Resume', Icon: DescriptionIcon, path: '/resume' },
  { label: 'Contact', Icon: MailOutlineIcon, path: '/contact' },
];

export const NavBar = () => {
  const navigate = useNavigate();

  // On scroll, the nav collapses (name hides, links center) and highlights the
  // section currently in view (scroll-spy).
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const line = 120; // active when a section's top crosses just below the nav
      let current = 'home';
      for (const id of ['skills', 'projects']) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (item) => {
    if (item.path) return navigate(item.path);
    if (item.scrollTop) return window.scrollTo({ top: 0, behavior: 'smooth' });
    if (item.target) document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 14, md: 24 },
        left: 0,
        right: 0,
        zIndex: 1200,
        px: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Box
        component={motion.div}
        layout
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        sx={{
          pointerEvents: 'auto',
          width: scrolled ? 'auto' : '100%',
          maxWidth: 1150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: scrolled ? 'center' : 'space-between',
          gap: 1,
          px: { xs: 1.75, md: 2.5 },
          py: { xs: 0.85, md: 1 },
          borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.12)',
          bgcolor: scrolled ? 'rgba(12,6,28,0.6)' : 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(14px)',
          boxShadow: scrolled ? '0 10px 34px rgba(0,0,0,0.4)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Word-mark — fades out and collapses on scroll */}
        <AnimatePresence initial={false} mode="popLayout">
          {!scrolled && (
            <Box
              key="wordmark"
              component={motion.div}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: { xs: 18, md: 22 },
                color: '#fff',
                letterSpacing: '0.01em',
                cursor: 'pointer',
                pl: 0.5,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {WORD_MARK}
            </Box>
          )}
        </AnimatePresence>

        {/* Nav items — glide to center when the word-mark collapses */}
        <Box
          component={motion.div}
          layout
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, md: 0.5 } }}
        >
          {navItems.map(({ label, Icon, section, ...rest }) => {
            const isActive = section ? section === activeSection : false;
            return (
              <Box
                key={label}
                onClick={() => goTo({ label, ...rest })}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.6,
                  px: { xs: 1, md: 1.6 },
                  py: { xs: 0.7, md: 0.8 },
                  borderRadius: '50px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.62)',
                  bgcolor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  fontFamily: FONT,
                  fontSize: { xs: 12.5, md: 13.5 },
                  fontWeight: 500,
                  transition: 'background 0.2s, color 0.2s',
                  '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <Icon sx={{ fontSize: { xs: 15, md: 16 } }} />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{label}</Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
