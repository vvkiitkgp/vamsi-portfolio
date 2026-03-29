import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

/**
 * Consistent back-navigation button used across all non-home pages.
 * Floats in the top-left corner by default (position: fixed).
 * Pass sx to override positioning when the page already has a top-bar.
 */
const BackButton = ({ sx }) => {
  const navigate = useNavigate();
  return (
    <Tooltip title="Back" placement="right">
      <IconButton
        onClick={() => navigate(-1)}
        size="small"
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 100,
          bgcolor: '#FFFFFF',
          color: '#111827',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          '&:hover': { bgcolor: '#F3F4F6' },
          ...sx,
        }}
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;
