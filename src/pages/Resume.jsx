import React from 'react';
import { Box, Typography, Skeleton, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useAboutMe } from '../hooks/useAboutMe';

const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';

const Resume = () => {
  const navigate = useNavigate();
  const { data, loading } = useAboutMe();

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

      {/* PDF viewer */}
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
        {loading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: '100%', md: '98%' },
              height: '85%',
              borderRadius: '12px',
            }}
          />
        ) : data.resumeUrl ? (
          <Box
            component="iframe"
            src={data.resumeUrl}
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
        ) : (
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: '0.95rem',
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            Resume is not available yet. Upload it in Sanity Studio.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Resume;
