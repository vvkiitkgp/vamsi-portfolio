import { Box, Typography } from '@mui/material';
import React from 'react';

export const Infocard = ({ heading, info }) => {
  return (
    <Box
      sx={{
        width: { sm: '52vh', xs: '92%' },
        borderRadius: '14px',
        p: { xs: 3, sm: 4 },
        backgroundColor: '#0a0a0a',
        boxShadow: '0 14px 32px rgba(0,0,0,0.28)',
        color: '#fff',
        fontFamily:
          'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: '#fff',
          fontWeight: 700,
          letterSpacing: '-0.015em',
          fontFamily:
            'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
        }}
      >
        {heading}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255,255,255,0.6)',
          mt: 0.5,
          lineHeight: 1.7,
          fontFamily:
            'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {info}
      </Typography>
    </Box>
  );
};
