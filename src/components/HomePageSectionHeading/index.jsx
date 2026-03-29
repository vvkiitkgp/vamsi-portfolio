import { Box, Typography } from '@mui/material';
import React from 'react';

export const HomePageSectionHeading = ({ heading }) => {
  return (
    <Box
      sx={{
        mt: 8,
        px: { xs: 2, sm: '10%' },
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#111827',
          fontWeight: 700,
          fontFamily:
            'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
          letterSpacing: '-0.015em',
        }}
      >
        {heading}
      </Typography>
      <Box
        sx={{
          height: 4,
          width: 56,
          borderRadius: 999,
          background: '#E5E7EB',
        }}
      />
    </Box>
  );
};
