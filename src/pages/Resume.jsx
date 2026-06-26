import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useAboutMe } from '../hooks/useAboutMe';

const FALLBACK_RESUME = '/March%202026%20V2%20Resume.pdf';
const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';

const Resume = () => {
  const navigate = useNavigate();
  const { data } = useAboutMe();
  const resumeSrc = data.resumeUrl || FALLBACK_RESUME;

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
            '&:hover': { backgroundColor: '#E5E7EB' },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
            fontWeight: 600,
            color: '#111827',
            letterSpacing: '-0.01em',
          }}
        >
          Resume
        </Typography>
      </Box>

      {/* PDF iframe */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
          px: { xs: 1.5, sm: 3 },
        }}
      >
        <Box
          component="iframe"
          src={resumeSrc}
          title="Resume"
          sx={{
            width: { xs: '100%', md: '98%' },
            height: '85%',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            boxShadow: '0 16px 36px rgba(0,0,0,0.08)',
            backgroundColor: '#FFFFFF',
          }}
        />
      </Box>
    </Box>
  );
};

export default Resume;
