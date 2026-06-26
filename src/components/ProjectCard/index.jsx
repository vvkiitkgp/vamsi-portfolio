import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getTechIcon } from '../../config/techIcons';

const FONT =
  'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';

const FALLBACK_GRADIENT =
  'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e3a5f 100%)';

/* Small brand-logo chip for a single tech in the project's stack. */
const TechTag = ({ name }) => {
  const { Icon, color } = getTechIcon(name);
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 0.9,
        py: 0.4,
        borderRadius: '8px',
        bgcolor: '#F3F4F6',
        color: '#4B5563',
        fontFamily: FONT,
        fontSize: 11.5,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      <Box component={Icon} sx={{ fontSize: 13, color, flexShrink: 0 }} />
      {name}
    </Box>
  );
};

export const ProjectCard = ({ data }) => {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);

  const techStack = data?.techStack || [];

  const handleOpen = () => {
    if (!data?.isDeveloped) {
      setToastOpen(true);
      return;
    }
    if (data?.externalUrl) {
      window.open(data.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (data?.path) {
      navigate(data.path);
    }
  };

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.15 }}
        onClick={handleOpen}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#fff',
          borderRadius: '18px',
          border: '1px solid #EDEFF2',
          boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 18px 38px rgba(0,0,0,0.12)',
            '& .project-thumb': { transform: 'scale(1.04)' },
            '& .project-cta': { gap: 1.1 },
          },
        }}
      >
        {/* Thumbnail */}
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
          <Box
            className="project-thumb"
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: data?.imageUrl ? `url(${data.imageUrl})` : 'none',
              background: data?.imageUrl ? undefined : FALLBACK_GRADIENT,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.4s ease',
            }}
          />
          {!data?.isDeveloped && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                px: 1,
                py: 0.4,
                borderRadius: '50px',
                bgcolor: 'rgba(17,24,39,0.78)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.01em',
              }}
            >
              In Progress
            </Box>
          )}
        </Box>

        {/* Body */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
            p: { xs: 2.25, sm: 2.5 },
            flexGrow: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 18,
              fontWeight: 700,
              color: '#111827',
              letterSpacing: '-0.015em',
            }}
          >
            {data?.heading}
          </Typography>

          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: '#6B7280',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {data?.info}
          </Typography>

          {techStack.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.25 }}>
              {techStack.map((t) => (
                <TechTag key={t} name={t} />
              ))}
            </Box>
          )}

          {/* CTA pinned to bottom */}
          <Box
            className="project-cta"
            sx={{
              mt: 'auto',
              pt: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.6,
              color: data?.isDeveloped ? '#630dff' : '#9CA3AF',
              fontFamily: FONT,
              fontSize: 13.5,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              transition: 'gap 0.2s ease',
            }}
          >
            {data?.isDeveloped ? 'View project' : 'Coming soon'}
            {data?.isDeveloped && <ArrowForwardIcon sx={{ fontSize: 16 }} />}
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          onClose={() => setToastOpen(false)}
          sx={{
            backgroundColor: '#111827',
            color: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}
        >
          This project is not yet complete. Will be available soon.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProjectCard;
