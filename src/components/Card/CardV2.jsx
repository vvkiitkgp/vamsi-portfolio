import { Box, Grid, Snackbar, Alert } from '@mui/material';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Infocard } from '../InfoCard';
import AnimatedOnVisible from '../AnimateOnVisible';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const blobShapes = [
  '60% 40% 55% 45% / 55% 45% 55% 45%',
  '45% 55% 60% 40% / 50% 60% 40% 50%',
  '55% 45% 40% 60% / 40% 55% 45% 60%',
  '50% 50% 38% 62% / 60% 40% 62% 38%',
  '38% 62% 55% 45% / 45% 55% 50% 50%',
];

let blobCounter = 0;

export const CardV2 = ({ data }) => {
  const navigate   = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const infocardRef = useRef(null);
  const [blobSize, setBlobSize] = useState({ width: 0, height: 0 });

  const borderRadius = useMemo(() => {
    const r = blobShapes[blobCounter % blobShapes.length];
    blobCounter += 1;
    return r;
  }, []);

  // Track Infocard's rendered size
  useEffect(() => {
    const el = infocardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setBlobSize({ width: width * 1.15, height: height * 1.5 });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 18, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.15 }}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: { xs: 4, sm: 6 },
        mb: { xs: 6, sm: 10 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 8, sm: 4, md: 4 }}
        sx={{ width: '100%', maxWidth: 1200, alignItems: 'center' }}
      >
        {/* Image column */}
        <Grid
          item
          xs={12}
          sm={6}
          order={{ xs: 1, md: 1 }}
          sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            onClick={() => {
              if (!data?.isDeveloped) { setToastOpen(true); return; }
              if (data?.externalUrl) {
                window.open(data.externalUrl, '_blank', 'noopener,noreferrer');
              } else if (data?.path) {
                navigate(data.path);
              }
            }}
            sx={{
              width: { xs: '100%', sm: '100%' },
              maxWidth: 520,
              aspectRatio: '8 / 4',
              backgroundImage: data.imageUrl ? `url(${data.imageUrl})` : 'none',
              background: data.imageUrl
                ? undefined
                : 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e3a5f 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '18px',
              boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 42px rgba(0,0,0,0.16)',
                '& .card-visit-overlay': { opacity: 1 },
              },
            }}
          >
            <Box
              className="card-visit-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(17,24,39,0.25), rgba(17,24,39,0.55))',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 600,
                fontFamily: 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                letterSpacing: '0.01em',
              }}
            >
              {data?.isDeveloped ? 'Have a visit' : 'Under Development'}
            </Box>
          </Box>
        </Grid>

        {/* Infocard column — blob sits behind, sized to card */}
        <Grid
          item
          xs={12}
          md={6}
          sm={12}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
            {/* Blob — visible once measured */}
            {blobSize.height > 0 && (
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  width: blobSize.width,
                  height: blobSize.height,
                  borderRadius,
                  background: 'linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,0)), linear-gradient(#070113, #630dff 54%, #fff)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
            )}

            {/* Infocard — measured via ref */}
            <Box ref={infocardRef} sx={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <AnimatedOnVisible
                from={{ opacity: 0, x: 10 }}
                to={{ opacity: 1, x: 0 }}
                duration={0.45}
                once={false}
                component={<Infocard heading={data.heading} info={data.info} />}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

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
    </Box>
  );
};
