import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';

import livilLogo from '../assets/livil/livil-logo.png';
import livilMark from '../assets/livil/livil-mark.png';
import shotHome from '../assets/livil/home-feed.png';
import shotPlayer from '../assets/livil/player.png';
import shotJam from '../assets/livil/jam-room.png';
import shotProfile from '../assets/livil/profile.png';
import shotPlayerInfo from '../assets/livil/player-info.png';
import shotNotif from '../assets/livil/notification-controls.png';
import shotLock from '../assets/livil/lock-screen.png';

/* ── Brand tokens (mirrors the Livil app's dark palette) ───────────────────── */
const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const BG = '#0A0A0F';
const SURFACE = '#12121C';
const CARD = '#16162a';
const BORDER = '#252545';
const PURPLE = '#7C3AED';
const PURPLE_LIGHT = '#A78BFA';
const TEXT = '#FFFFFF';
const TEXT_DIM = '#8B90A7';

const GITHUB_URL = 'https://github.com/vvkiitkgp/livil';
const REQUEST_MAILTO =
  'mailto:vvk.iitkgp@gmail.com?subject=Livil%20%E2%80%94%20closed-testing%20access&body=Hi%20Vamsi%2C%20I%27d%20love%20a%20tester%20invite%20to%20Livil.';

const TECH_PILLS = ['React Native', 'TypeScript', 'Supabase', 'Firebase', 'PostgreSQL'];

const SCREENS = [
  { src: shotHome, label: 'Home feed', caption: '“For you” — friends’ stories + reposts' },
  { src: shotPlayer, label: 'Full-screen player', caption: 'Scrubber, shuffle/loop, beat-synced wave' },
  { src: shotJam, label: 'Jam Room', caption: 'Synced playback + in-room chat' },
  { src: shotProfile, label: 'Creator profile', caption: 'Reposts · Uploads · Albums · Playlists' },
  { src: shotPlayerInfo, label: 'Player → Info', caption: 'Album link, credits, collaborators' },
  { src: shotNotif, label: 'Notification controls', caption: 'Media controls in the shade' },
  { src: shotLock, label: 'Lock screen', caption: 'Clip-aware controls + scrubber' },
];

const STATS = [
  { value: 37500, suffix: '+', label: 'Lines of TypeScript' },
  { value: 28, suffix: '', label: 'Screens' },
  { value: 22, suffix: '', label: 'Backend services' },
  { value: 31, suffix: '', label: 'DB migrations' },
  { value: 44, suffix: '+', label: 'Play Store releases' },
];

const FEATURES = [
  { icon: '🎧', title: 'Real-time Jam Rooms', body: 'Listen together — playback stays in sync across every participant, with host controls and a permission model.' },
  { icon: '⬆️', title: 'Audio & video uploads', body: 'Stream uploads up to 500 MB. MP3/AAC/WAV/FLAC and MP4/MOV/WebM, audio extracted for unified playback.' },
  { icon: '💬', title: 'DMs & group chat', body: 'Reactions, @mentions with typeahead, swipe-to-reply, typing & read state, request-gated inbox.' },
  { icon: '📀', title: 'Albums & playlists', body: 'Collaborative curation with per-item visibility (public / friends-only / private) and emoji + gradient covers.' },
  { icon: '✨', title: 'Stories & clip-reposts', body: 'Repost a clipped window of any track; ephemeral stories highlight the best moments.' },
  { icon: '🔔', title: 'Social graph + push', body: 'Follows, friend requests, live activity center, and Firebase push for messages, likes, comments & jam invites.' },
];

const DEEP_DIVE = [
  {
    tag: 'Audio architecture',
    title: 'One engine to own the lock screen',
    body: 'Consolidated a two-engine design into a single hidden MediaSession owner that plays both audio and video posts. Killed the notification carousel, lost skip events, and sync drift — the lock screen, car head-units and Wear OS stay correct even while JS is asleep.',
  },
  {
    tag: 'Native patching',
    title: 'Clip-aware playback via a patched native module',
    body: 'Patched react-native-video (pinned + captured with patch-package) so the lock-screen scrubber reflects a clip window, not the full file, with clip-relative seeking and native next/prev events that survive backgrounding under the New Architecture.',
  },
  {
    tag: 'Realtime',
    title: 'Jam Rooms synced over Supabase Realtime',
    body: 'Playback state broadcasts to all participants; position sync uses the host wall-clock + each client’s elapsed time to absorb latency skew. A permission model gates play/seek/skip and an RPC auto-ends stale rooms.',
  },
  {
    tag: 'Signal processing',
    title: 'On-device FFT beat-synced waveform',
    body: 'A one-shot FFT decode extracts kick/bass onsets and spectral brightness, cached as JSONB in Postgres. Strictly isolated from the playback engine and fail-safe — it degrades to a decorative wave instead of ever risking audio.',
  },
  {
    tag: 'Backend',
    title: 'Full backend ownership on Supabase',
    body: '31 versioned Postgres migrations, row-level security on every table, atomic RPC functions, Realtime publications, and Storage buckets — plus Google OAuth onboarding and Firebase Cloud Messaging. Designed and shipped end-to-end.',
  },
  {
    tag: 'AI-first delivery',
    title: 'Shipped solo, AI-first',
    body: 'Schema, all 22 service modules, the migrations and 44 production releases were designed and shipped solo by working AI-first with Claude & Claude Code — driving AI to build real, production software fast, not toy demos.',
  },
];

const STACK = [
  'React Native 0.85 (New Architecture / Fabric)',
  'TypeScript (strict)',
  'Supabase — Postgres · RLS · Realtime · Storage',
  'Firebase Cloud Messaging + Notifee',
  'Reanimated 4 (worklets) + Gesture Handler',
  'React Navigation v7 (typed native-stack)',
  'Google OAuth 2.0',
  'patch-package (native module patches)',
];

/* ── Count-up number that animates when scrolled into view ─────────────────── */
const CountUp = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const formatted = value >= 1000 ? `${(display / 1000).toFixed(display >= 1000 ? 1 : 0)}K` : display;
  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
};

/* ── A phone screenshot inside a device bezel ──────────────────────────────── */
const PhoneShot = ({ src, label, caption, index }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.4, 0, 0.2, 1] }}
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, flexShrink: 0 }}
  >
    <Box
      sx={{
        width: { xs: 208, sm: 230 },
        p: '8px',
        borderRadius: '34px',
        background: 'linear-gradient(160deg, #2a2a44, #0d0d18)',
        border: `1px solid ${BORDER}`,
        boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(124,58,237,0.12)',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={label}
        loading="lazy"
        sx={{
          width: '100%',
          display: 'block',
          borderRadius: '26px',
          border: '1px solid #000',
        }}
      />
    </Box>
    <Box sx={{ textAlign: 'center', maxWidth: 220 }}>
      <Typography sx={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: TEXT }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: FONT, fontSize: 12, color: TEXT_DIM, lineHeight: 1.45, mt: 0.25 }}>
        {caption}
      </Typography>
    </Box>
  </Box>
);

const Pill = ({ children }) => (
  <Box
    sx={{
      px: 1.4,
      py: 0.5,
      borderRadius: '50px',
      border: `1px solid ${BORDER}`,
      bgcolor: 'rgba(124,58,237,0.10)',
      color: PURPLE_LIGHT,
      fontFamily: FONT,
      fontSize: 11.5,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </Box>
);

const SectionEyebrow = ({ children }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
    <Box sx={{ width: 28, height: '1px', bgcolor: PURPLE }} />
    <Typography
      sx={{
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: PURPLE_LIGHT,
      }}
    >
      {children}
    </Typography>
  </Box>
);

const Livil = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BG, color: TEXT, fontFamily: FONT }}>
      {/* ── Sticky top bar ───────────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: { xs: 2, sm: 3 },
          py: 1.25,
          bgcolor: 'rgba(10,10,15,0.82)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          size="small"
          sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: TEXT, borderRadius: '10px', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)' } }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
          <Typography sx={{ fontFamily: FONT, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 700 }}>
            Livil
          </Typography>
          <Typography sx={{ fontFamily: FONT, fontSize: '0.76rem', color: TEXT_DIM, display: { xs: 'none', md: 'block' } }}>
            — React Native · TypeScript · Supabase · Firebase
          </Typography>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Box
            component="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.4, py: 0.7, borderRadius: '8px', border: `1px solid ${BORDER}`, color: TEXT, textDecoration: 'none', fontFamily: FONT, fontSize: '0.78rem', fontWeight: 600, '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' } }}
          >
            <GitHubIcon sx={{ fontSize: 15 }} /> <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Source</Box>
          </Box>
          <Box
            component="a"
            href={REQUEST_MAILTO}
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.4, py: 0.7, borderRadius: '8px', bgcolor: PURPLE, color: '#fff', textDecoration: 'none', fontFamily: FONT, fontSize: '0.78rem', fontWeight: 600, boxShadow: '0 6px 18px rgba(124,58,237,0.4)', '&:hover': { bgcolor: '#6d28d9' } }}
          >
            Request access
          </Box>
        </Box>
      </Box>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: `radial-gradient(900px 480px at 70% -10%, rgba(124,58,237,0.28), transparent 60%), radial-gradient(700px 420px at 0% 10%, rgba(167,139,250,0.12), transparent 55%)`, zIndex: 0 }} />
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          sx={{ position: 'relative', zIndex: 1, maxWidth: 1100, mx: 'auto', px: { xs: 3, sm: 5 }, pt: { xs: 6, sm: 9 }, pb: { xs: 5, sm: 7 } }}
        >
          <Box component="img" src={livilLogo} alt="Livil" sx={{ height: { xs: 36, sm: 44 }, mb: 3, display: 'block' }} />

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.6, borderRadius: '50px', border: `1px solid ${BORDER}`, bgcolor: 'rgba(124,58,237,0.10)', mb: 2.5 }}>
            <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#22c55e' }} />
            <Typography sx={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: PURPLE_LIGHT }}>
              Founder &amp; Lead Engineer · Solo-built · Shipping on Google Play
            </Typography>
          </Box>

          <Typography component="h1" sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: '2.4rem', sm: '3.6rem', md: '4.2rem' }, lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: 820 }}>
            Music is social.{' '}
            <Box component="span" sx={{ color: PURPLE_LIGHT }}>Listen together, in real time.</Box>
          </Typography>

          <Typography sx={{ fontFamily: FONT, fontSize: { xs: 15, md: 17 }, color: TEXT_DIM, lineHeight: 1.7, mt: 2.5, maxWidth: 640 }}>
            A production social-music platform for Android — Spotify’s player × Discord’s presence × SoundCloud’s creator feed,
            fused into one app. Designed, built and shipped end-to-end: mobile, backend, realtime infra and release.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
            {TECH_PILLS.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.5 }}>
            <Box component="a" href={REQUEST_MAILTO} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.85, px: 2.5, py: 1.15, borderRadius: '50px', bgcolor: PURPLE, color: '#fff', textDecoration: 'none', fontFamily: FONT, fontSize: 14.5, fontWeight: 700, boxShadow: '0 10px 30px rgba(124,58,237,0.45)', transition: 'transform 0.15s, background 0.2s', '&:hover': { bgcolor: '#6d28d9', transform: 'translateY(-2px)' } }}>
              <MailOutlineIcon sx={{ fontSize: 17 }} /> Request closed-testing access
            </Box>
            <Box component="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.85, px: 2.5, py: 1.15, borderRadius: '50px', border: `1px solid ${BORDER}`, bgcolor: 'rgba(255,255,255,0.04)', color: '#fff', textDecoration: 'none', fontFamily: FONT, fontSize: 14.5, fontWeight: 700, transition: 'transform 0.15s, background 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-2px)' } }}>
              <GitHubIcon sx={{ fontSize: 17 }} /> View source
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <Box sx={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, bgcolor: SURFACE }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, sm: 5 }, py: { xs: 3, sm: 4 }, display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(5, 1fr)' }, gap: { xs: 3, sm: 2 } }}>
          {STATS.map((s) => (
            <Box key={s.label} sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
              <Typography sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: '1.9rem', sm: '2.3rem' }, color: TEXT, lineHeight: 1 }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontSize: 12, color: TEXT_DIM, mt: 0.75, letterSpacing: '0.02em' }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Phone gallery ────────────────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, sm: 5 }, pt: { xs: 6, sm: 8 }, pb: { xs: 2, sm: 3 } }}>
        <SectionEyebrow>Inside the app</SectionEyebrow>
        <Typography component="h2" sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.4rem' }, mb: 1 }}>
          Seven real screens, shipped to testers
        </Typography>
        <Typography sx={{ fontFamily: FONT, fontSize: 14.5, color: TEXT_DIM, maxWidth: 560, mb: 4 }}>
          A polished, gesture-driven dark UI with a floating mini-player that follows you across the whole app.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2.5, sm: 3.5 },
            overflowX: 'auto',
            pb: 3,
            px: 0.5,
            scrollSnapType: 'x mandatory',
            '& > *': { scrollSnapAlign: 'center' },
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': { bgcolor: BORDER, borderRadius: 3 },
          }}
        >
          {SCREENS.map((s, i) => (
            <PhoneShot key={s.label} {...s} index={i} />
          ))}
        </Box>
      </Box>

      {/* ── Feature highlights ───────────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 3, sm: 5 }, pt: { xs: 5, sm: 7 }, pb: { xs: 3, sm: 4 } }}>
        <SectionEyebrow>What it does</SectionEyebrow>
        <Typography component="h2" sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.4rem' }, mb: 4 }}>
          A full social network around music
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {FEATURES.map((f, i) => (
            <Box
              key={f.title}
              component={motion.div}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${BORDER}`, bgcolor: CARD, transition: 'border-color 0.2s, transform 0.2s', '&:hover': { borderColor: PURPLE, transform: 'translateY(-3px)' } }}
            >
              <Box sx={{ fontSize: 22, mb: 1 }}>{f.icon}</Box>
              <Typography sx={{ fontFamily: FONT, fontSize: 15.5, fontWeight: 700, mb: 0.75 }}>{f.title}</Typography>
              <Typography sx={{ fontFamily: FONT, fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>{f.body}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Engineering deep-dive ────────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 3, sm: 5 }, pt: { xs: 5, sm: 7 }, pb: { xs: 3, sm: 4 } }}>
        <SectionEyebrow>Engineering deep-dive</SectionEyebrow>
        <Typography component="h2" sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.4rem' }, mb: 1 }}>
          The hard problems, and how they were solved
        </Typography>
        <Typography sx={{ fontFamily: FONT, fontSize: 14.5, color: TEXT_DIM, maxWidth: 580, mb: 4 }}>
          Where the senior-level work actually lives — audio internals, native patching, realtime sync and full backend ownership.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {DEEP_DIVE.map((d, i) => (
            <Box
              key={d.title}
              component={motion.div}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
              sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: '18px', border: `1px solid ${BORDER}`, bgcolor: CARD, position: 'relative', overflow: 'hidden' }}
            >
              <Box sx={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', bgcolor: PURPLE }} />
              <Typography sx={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: PURPLE_LIGHT, mb: 1 }}>
                {d.tag}
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, mb: 1, letterSpacing: '-0.01em' }}>
                {d.title}
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: TEXT_DIM, lineHeight: 1.65 }}>
                {d.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Stack grid ───────────────────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 3, sm: 5 }, pt: { xs: 5, sm: 7 }, pb: { xs: 3, sm: 4 } }}>
        <SectionEyebrow>Architecture &amp; stack</SectionEyebrow>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.25, mt: 2 }}>
          {STACK.map((s) => (
            <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 2, py: 1.5, borderRadius: '12px', border: `1px solid ${BORDER}`, bgcolor: SURFACE }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: PURPLE_LIGHT, flexShrink: 0 }} />
              <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: '#D6D8E5' }}>{s}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Access footer ────────────────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 3, sm: 5 }, pt: { xs: 6, sm: 8 }, pb: { xs: 8, sm: 10 } }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            border: `1px solid ${BORDER}`,
            bgcolor: SURFACE,
            p: { xs: 3.5, sm: 5 },
            textAlign: 'center',
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, background: `radial-gradient(600px 300px at 50% -20%, rgba(124,58,237,0.25), transparent 60%)`, zIndex: 0 }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box component="img" src={livilMark} alt="Livil" sx={{ width: 52, height: 52, mb: 2, borderRadius: '14px' }} />
            <Typography sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem' }, mb: 1 }}>
              Currently in closed testing on Google Play
            </Typography>
            <Typography sx={{ fontFamily: FONT, fontSize: 14.5, color: TEXT_DIM, maxWidth: 520, mx: 'auto', mb: 3 }}>
              Livil is live with testers on Google Play (v1.1.3). Want a look? Request a tester invite, or browse the source on GitHub.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
              <Box component="a" href={REQUEST_MAILTO} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.85, px: 2.5, py: 1.15, borderRadius: '50px', bgcolor: PURPLE, color: '#fff', textDecoration: 'none', fontFamily: FONT, fontSize: 14.5, fontWeight: 700, boxShadow: '0 10px 30px rgba(124,58,237,0.45)', '&:hover': { bgcolor: '#6d28d9' } }}>
                <MailOutlineIcon sx={{ fontSize: 17 }} /> Request access
              </Box>
              <Box component="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.85, px: 2.5, py: 1.15, borderRadius: '50px', border: `1px solid ${BORDER}`, color: '#fff', textDecoration: 'none', fontFamily: FONT, fontSize: 14.5, fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
                <GitHubIcon sx={{ fontSize: 17 }} /> GitHub
              </Box>
            </Box>
          </Box>
        </Box>

        <Box onClick={() => navigate('/')} sx={{ mt: 4, display: 'inline-flex', alignItems: 'center', gap: 0.75, color: TEXT_DIM, fontFamily: FONT, fontSize: 14, fontWeight: 600, cursor: 'pointer', '&:hover': { color: TEXT } }}>
          <ArrowBackIcon sx={{ fontSize: 17 }} /> Back to portfolio
        </Box>
      </Box>
    </Box>
  );
};

export default Livil;
