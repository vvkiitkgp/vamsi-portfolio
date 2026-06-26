import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const NarrativeSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
    <Skeleton variant="text" width={180} />
    <Skeleton variant="text" width="85%" sx={{ fontSize: '2.4rem' }} />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="92%" />
  </Box>
);

export const SectionIntro = ({
  sectionLabel,
  heading,
  headingAccent,
  subHeading,
  narrative,
  loading = false,
  maxWidth = 560,
}) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    sx={{ px: { xs: 2, sm: '10%' }, width: '100%' }}
  >
    {loading ? (
      <NarrativeSkeleton />
    ) : (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box sx={{ width: 30, height: '1px', bgcolor: '#D1D5DB' }} />
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: 12, sm: 13 },
              color: '#9CA3AF',
              letterSpacing: '0.04em',
            }}
          >
            {sectionLabel}
          </Typography>
        </Box>

        <Typography
          component="h2"
          sx={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3rem' },
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#111827',
            mb: subHeading ? 1.5 : 2,
          }}
        >
          {heading}{' '}
          {headingAccent && (
            <Box component="span" sx={{ color: '#630dff' }}>
              {headingAccent}
            </Box>
          )}
        </Typography>

        {subHeading && (
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              mb: 2.5,
            }}
          >
            {subHeading}
          </Typography>
        )}

        {narrative && (
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: 14.5, sm: 15.5 },
              lineHeight: 1.75,
              color: '#6B7280',
              maxWidth,
            }}
          >
            {narrative}
          </Typography>
        )}
      </>
    )}
  </Box>
);

export default SectionIntro;
