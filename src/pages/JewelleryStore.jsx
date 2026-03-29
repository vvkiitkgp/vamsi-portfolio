import React, { useState } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const FONT =
  'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';

const JewelleryStore = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#F9FAFB',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: { xs: 2, sm: 3 },
          py: 1.5,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          size="small"
          sx={{
            backgroundColor: '#F3F4F6',
            color: '#111827',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#E5E7EB',
            },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: loaded ? '#22c55e' : '#f59e0b',
              transition: 'background-color 0.4s ease',
            }}
          />
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              fontWeight: 600,
              color: '#111827',
              letterSpacing: '-0.01em',
            }}
          >
            Jewellery Store
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: '0.78rem',
              color: '#6B7280',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            — Next.js · Supabase · Tailwind CSS
          </Typography>
        </Box>

        <Box sx={{ ml: 'auto' }}>
          <Typography
            component="a"
            href="https://jewellery-store-gamma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontFamily: FONT,
              fontSize: '0.78rem',
              fontWeight: 500,
              color: '#2563EB',
              textDecoration: 'none',
              px: 1.5,
              py: 0.75,
              borderRadius: '8px',
              border: '1px solid #BFDBFE',
              backgroundColor: '#EFF6FF',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#DBEAFE',
                borderColor: '#93C5FD',
              },
            }}
          >
            Open in new tab ↗
          </Typography>
        </Box>
      </Box>

      {/* iframe area */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {!loaded && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              backgroundColor: '#F9FAFB',
              zIndex: 5,
            }}
          >
            <CircularProgress
              size={36}
              thickness={3}
              sx={{ color: '#2563EB' }}
            />
            <Typography
              sx={{
                fontFamily: FONT,
                fontSize: '0.88rem',
                color: '#6B7280',
              }}
            >
              Loading Jewellery Store…
            </Typography>
          </Box>
        )}
        <Box
          component="iframe"
          src="https://jewellery-store-gamma.vercel.app/"
          title="Jewellery Store"
          onLoad={() => setLoaded(true)}
          sx={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
          allow="fullscreen"
        />
      </Box>
    </Box>
  );
};

export default JewelleryStore;
