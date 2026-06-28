import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

import livilMark from '../../assets/livil/livil-mark.png';
import shotHome from '../../assets/livil/home-feed.png';
import shotPlayer from '../../assets/livil/player.png';
import shotJam from '../../assets/livil/jam-room.png';

const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const PURPLE_LIGHT = '#A78BFA';
const BORDER = '#252545';

const STATS = [
  { v: '37.5K+', l: 'lines TS' },
  { v: '28', l: 'screens' },
  { v: '44+', l: 'Play releases' },
];

const PHONES = [
  { src: shotJam, rot: '-8deg', x: -34, z: 1, scale: 0.9 },
  { src: shotHome, rot: '0deg', x: 0, z: 3, scale: 1 },
  { src: shotPlayer, rot: '8deg', x: 34, z: 1, scale: 0.9 },
];

const Pill = ({ children }) => (
  <Box sx={{ px: 1.3, py: 0.45, borderRadius: '50px', border: `1px solid ${BORDER}`, bgcolor: 'rgba(124,58,237,0.12)', color: PURPLE_LIGHT, fontFamily: FONT, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
    {children}
  </Box>
);

export const FeaturedProject = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: { xs: 2, sm: '10%' } }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        onClick={() => navigate('/livil')}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #0c0a1f 0%, #140d2e 45%, #0a0a0f 100%)',
          border: '1px solid #2a2347',
          boxShadow: '0 24px 60px rgba(76,29,149,0.28)',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
          alignItems: 'center',
          gap: { xs: 4, md: 2 },
          p: { xs: 3.5, sm: 5 },
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 30px 72px rgba(76,29,149,0.42)' },
        }}
      >
        {/* Glow */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 320px at 80% -10%, rgba(124,58,237,0.35), transparent 60%)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Left — copy */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
            <Box component="img" src={livilMark} alt="Livil" sx={{ width: 34, height: 34, borderRadius: '9px' }} />
            <Box sx={{ px: 1.25, py: 0.4, borderRadius: '50px', border: '1px solid rgba(167,139,250,0.4)', color: PURPLE_LIGHT, fontFamily: FONT, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ★ Flagship · Founder
            </Box>
          </Box>

          <Typography component="h3" sx={{ fontFamily: SERIF, fontWeight: 700, color: '#fff', fontSize: { xs: '1.9rem', sm: '2.5rem' }, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            Livil — a social music app,{' '}
            <Box component="span" sx={{ color: PURPLE_LIGHT }}>shipped solo to Google Play</Box>
          </Typography>

          <Typography sx={{ fontFamily: FONT, fontSize: { xs: 13.5, sm: 14.5 }, color: '#9a9fb5', lineHeight: 1.7, mt: 1.75, maxWidth: 460 }}>
            Real-time Jam Rooms, a custom-patched native audio engine, on-device FFT waveforms and a full Supabase + Firebase backend — designed, built and released end-to-end.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2.5, mt: 2.5 }}>
            {STATS.map((s) => (
              <Box key={s.l}>
                <Typography sx={{ fontFamily: SERIF, fontWeight: 700, color: '#fff', fontSize: { xs: '1.4rem', sm: '1.7rem' }, lineHeight: 1 }}>{s.v}</Typography>
                <Typography sx={{ fontFamily: FONT, fontSize: 11.5, color: '#7d8199', mt: 0.4 }}>{s.l}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.85, mt: 2.5 }}>
            {['React Native', 'TypeScript', 'Supabase', 'Realtime', 'Firebase'].map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </Box>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mt: 3, px: 2.25, py: 1.05, borderRadius: '50px', bgcolor: '#7C3AED', color: '#fff', fontFamily: FONT, fontSize: 14, fontWeight: 700, boxShadow: '0 10px 28px rgba(124,58,237,0.45)', transition: 'gap 0.2s ease', '&:hover': { gap: 1.25 } }}>
            View case study <ArrowForwardIcon sx={{ fontSize: 17 }} />
          </Box>
        </Box>

        {/* Right — phone cluster */}
        <Box sx={{ position: 'relative', zIndex: 1, height: { xs: 280, sm: 340 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {PHONES.map((p, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                transform: `translateX(${p.x}%) rotate(${p.rot}) scale(${p.scale})`,
                zIndex: p.z,
                width: { xs: 124, sm: 150 },
                p: '5px',
                borderRadius: '22px',
                background: 'linear-gradient(160deg, #2a2a44, #0d0d18)',
                border: `1px solid ${BORDER}`,
                boxShadow: '0 18px 44px rgba(0,0,0,0.6)',
              }}
            >
              <Box component="img" src={p.src} alt="Livil screen" loading="lazy" sx={{ width: '100%', display: 'block', borderRadius: '17px', border: '1px solid #000' }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProject;
