import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { HomePageSectionHeading } from '../HomePageSectionHeading';
import { CATEGORIES } from '../../config/skills';
import { getTechIcon } from '../../config/techIcons';

const FONT =
  'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';

/* A single skill chip — logo (brand-tinted) + label. */
const SkillPill = ({ skill }) => {
  const { Icon, color } = getTechIcon(skill);
  return (
    <Box
      component={motion.div}
      variants={{
        hidden: { opacity: 0, y: 10, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.85,
        px: { xs: 1.4, sm: 1.6 },
        py: { xs: 0.7, sm: 0.8 },
        borderRadius: '50px',
        border: '1px solid #E5E7EB',
        bgcolor: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        color: '#374151',
        fontFamily: FONT,
        fontSize: { xs: 12.5, sm: 13.5 },
        fontWeight: 500,
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
          borderColor: '#D1D5DB',
        },
      }}
    >
      <Box
        component={Icon}
        sx={{ fontSize: { xs: 15, sm: 16 }, color, flexShrink: 0 }}
      />
      {skill}
    </Box>
  );
};

/* One category block — eyebrow label + wrapped pills, stagger on scroll-in. */
const CategoryBlock = ({ category }) => (
  <Box sx={{ width: '100%' }}>
    <Typography
      sx={{
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#9CA3AF',
        mb: 1.5,
      }}
    >
      {category.name}
    </Typography>
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.03 } } }}
      sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 1.25 } }}
    >
      {category.skills.map((skill) => (
        <SkillPill key={skill} skill={skill} />
      ))}
    </Box>
  </Box>
);

export const SkillsSection = () => {
  const navigate = useNavigate();

  return (
    <Box component="section" sx={{ width: '100%' }}>
      <HomePageSectionHeading heading="Skills & Tech Stack" />

      <Box
        sx={{
          mt: 4,
          px: { xs: 2, sm: '10%' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, sm: 4.5 },
        }}
      >
        {CATEGORIES.map((category) => (
          <CategoryBlock key={category.name} category={category} />
        ))}

        {/* CTA into the immersive deep-dive page */}
        <Box
          onClick={() => navigate('/skills-universe')}
          sx={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            mt: 0.5,
            color: '#630dff',
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            transition: 'gap 0.2s ease, opacity 0.2s ease',
            '&:hover': { gap: 1.25, opacity: 0.85 },
          }}
        >
          Explore the interactive view
          <ArrowForwardIcon sx={{ fontSize: 17 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SkillsSection;
