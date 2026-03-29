import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

const resumeSrc = '/March%202026%20V2%20Resume.pdf';

const Resume = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 4,
        px: { xs: 1.5, sm: 3 },
        pb: 6,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#111827',
          fontWeight: 700,
          fontFamily:
            'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
          mb: 2,
        }}
      >
        Resume
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 1,
          }}
        >
          <Tooltip title="Back" placement="left">
            <IconButton
              size="small"
              onClick={() => navigate(-1)}
              sx={{
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                '&:hover': { backgroundColor: '#F3F4F6' },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download" placement="left">
            <IconButton
              size="small"
              component="a"
              href={resumeSrc}
              download
              sx={{
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                '&:hover': { backgroundColor: '#F3F4F6' },
              }}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          component="iframe"
          src={resumeSrc}
          title="Resume"
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: '80vh', md: '80vh' },
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
