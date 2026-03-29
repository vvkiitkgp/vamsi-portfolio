import React from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SwipeOutlinedIcon from '@mui/icons-material/SwipeOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useNavigate } from 'react-router-dom';
import ScrollableTable from '../../components/ScrollableTable';
import { columns, tableData } from './mockData';

// ─── Page-level Apple design tokens ──────────────────────────────────────────
const A = {
  bg:        '#F2F2F7',
  surface:   '#FFFFFF',
  fill:      '#E5E5EA',
  label:     '#000000',
  label2:    '#636366',
  label3:    '#8E8E93',
  sep:       'rgba(60,60,67,0.18)',
  sepStrong: 'rgba(60,60,67,0.29)',
  font: '-apple-system, "SF Pro Text", "SF Pro Display", BlinkMacSystemFont, Helvetica, Arial, sans-serif',
};

const TOP_BAR_H  = 52;
const PHONE_W    = 350;
const PHONE_H    = 660;
const BEZEL_TOP  = 42;
const BEZEL_BOT  = 20;
const BEZEL_SIDE = 10;
const SCREEN_W   = PHONE_W - BEZEL_SIDE * 2;
const SCREEN_H   = PHONE_H - BEZEL_TOP - BEZEL_BOT;

const noScrollbar = {
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
};

// ─── Phone Frame ──────────────────────────────────────────────────────────────
const PhoneFrame = ({ children }) => (
  <Box sx={{ flexShrink: 0, position: 'relative' }}>
    <Box
      sx={{
        width: PHONE_W,
        height: PHONE_H,
        borderRadius: '48px',
        bgcolor: '#1C1C1E',
        p: `${BEZEL_TOP}px ${BEZEL_SIDE}px ${BEZEL_BOT}px`,
        boxShadow: [
          '0 48px 96px rgba(0,0,0,0.40)',
          '0 0 0 1px rgba(255,255,255,0.07) inset',
          '0 0 0 2px rgba(0,0,0,0.55)',
        ].join(', '),
        position: 'relative',
      }}
    >
      {/* Dynamic Island */}
      <Box sx={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 100, height: 26, bgcolor: '#000', borderRadius: '14px', zIndex: 10 }} />

      {/* Side buttons */}
      <Box sx={{ position: 'absolute', left: -3, top: 120, width: 3, height: 36, bgcolor: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
      <Box sx={{ position: 'absolute', left: -3, top: 168, width: 3, height: 52, bgcolor: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
      <Box sx={{ position: 'absolute', left: -3, top: 232, width: 3, height: 52, bgcolor: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
      <Box sx={{ position: 'absolute', right: -3, top: 160, width: 3, height: 72, bgcolor: '#2C2C2E', borderRadius: '0 2px 2px 0' }} />

      {/* Screen — fills with the ScrollableTable component */}
      <Box sx={{ width: SCREEN_W, height: SCREEN_H, bgcolor: A.surface, borderRadius: '38px', overflow: 'hidden', position: 'relative' }}>
        {children}
      </Box>

      {/* Home indicator */}
      <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 110, height: 4, bgcolor: 'rgba(255,255,255,0.30)', borderRadius: '3px' }} />
    </Box>

    <Typography sx={{ textAlign: 'center', mt: 2.5, fontSize: 11, fontWeight: 600, color: A.label3, letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: A.font }}>
      Mobile View
    </Typography>
  </Box>
);

// ─── Browser / Desktop Frame ──────────────────────────────────────────────────
const CHROME_H   = 40;

const BrowserFrame = ({ children }) => (
  <Box sx={{ flexShrink: 0, position: 'relative', width: '100%' }}>
    <Box
      sx={{
        width: '100%',
        height: 500,
        borderRadius: '14px',
        bgcolor: '#1C1C1E',
        overflow: 'hidden',
        boxShadow: [
          '0 48px 96px rgba(0,0,0,0.40)',
          '0 0 0 1px rgba(255,255,255,0.07) inset',
          '0 0 0 2px rgba(0,0,0,0.55)',
        ].join(', '),
      }}
    >
      {/* Browser chrome bar */}
      <Box sx={{ height: CHROME_H, bgcolor: '#2C2C2E', display: 'flex', alignItems: 'center', px: 1.5, gap: 1, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <Box key={c} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: c, flexShrink: 0 }} />
          ))}
        </Box>
        <Box sx={{ flex: 1, mx: 1.5, height: 22, bgcolor: '#3A3A3C', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontFamily: A.font, letterSpacing: 0.2 }}>
            scrollable-table · desktop view
          </Typography>
        </Box>
      </Box>

      {/* Screen content */}
      <Box sx={{ height: `calc(500px - ${CHROME_H}px)`, overflowY: 'auto' }}>
        {children}
      </Box>
    </Box>

    <Typography sx={{ textAlign: 'center', mt: 2.5, fontSize: 11, fontWeight: 600, color: A.label3, letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: A.font }}>
      Desktop View
    </Typography>
  </Box>
);

// ─── Explanation Panel ────────────────────────────────────────────────────────
const features = [
  {
    Icon: TableChartOutlinedIcon,
    title: 'Column View',
    desc: 'Active column sits in the centre on a white surface. Neighbours are visible but muted. Use ‹ › to navigate — rows expand automatically for long content.',
  },
  {
    Icon: SwipeOutlinedIcon,
    title: 'Row Detail View',
    desc: 'Tap any row ID to open its full detail. Scroll the row list — it loops infinitely from last back to first. Tap any column card to jump straight back to that column.',
  },
  {
    Icon: AutoAwesomeOutlinedIcon,
    title: 'Fully Responsive',
    desc: 'Standard table on desktop. On mobile it switches to these two views automatically — same data, zero horizontal scrolling, no lost context.',
  },
];

const ExplanationPanel = () => (
  <Box
    sx={{
      maxWidth: 420,
      bgcolor: A.surface,
      borderRadius: '20px',
      p: { xs: 2.5, md: 3.5, lg: 4.5 },
      boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      fontFamily: A.font,
    }}
  >
    <Box sx={{ display: 'inline-flex' }}>
      <Box sx={{ bgcolor: A.bg, borderRadius: '20px', px: 1.5, py: 0.5 }}>
        <Typography sx={{ fontFamily: A.font, fontWeight: 600, fontSize: 11, color: A.label2, textTransform: 'uppercase', letterSpacing: 0.8 }}>
          UX Component
        </Typography>
      </Box>
    </Box>

    <Box>
      <Typography sx={{ fontFamily: A.font, fontWeight: 700, fontSize: 26, color: A.label, lineHeight: 1.15, letterSpacing: -0.6, mb: 1 }}>
        Scrollable Table
      </Typography>
      <Typography sx={{ fontFamily: A.font, fontSize: 14, color: A.label2, lineHeight: 1.7 }}>
        Standard data tables break on mobile — users scroll horizontally and
        lose track of which row a cell belongs to. This component solves that
        with two purpose-built views.
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {features.map(({ Icon, title, desc }) => (
        <Box key={title} sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start' }}>
          <Box sx={{ width: 34, height: 34, borderRadius: '10px', bgcolor: A.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon sx={{ fontSize: 17, color: A.label2 }} />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: A.font, fontWeight: 600, fontSize: 13, color: A.label, mb: 0.2 }}>
              {title}
            </Typography>
            <Typography sx={{ fontFamily: A.font, fontSize: 12, color: A.label2, lineHeight: 1.6 }}>
              {desc}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>

    <Box sx={{ bgcolor: A.bg, borderRadius: '12px', p: 2 }}>
      <Typography sx={{ fontFamily: A.font, fontWeight: 600, fontSize: 13, color: A.label, mb: 0.75 }}>
        Try it →
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.25, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
        {[
          'Tap a row ID to open the detail view',
          'Tap any column card to jump back to that column',
          'Scroll the row list — it wraps infinitely',
          'Hit ‹ › to switch columns and watch rows resize',
        ].map(tip => (
          <Typography key={tip} component="li" sx={{ fontFamily: A.font, fontSize: 12, color: A.label2, lineHeight: 1.6 }}>
            {tip}
          </Typography>
        ))}
      </Box>
    </Box>
  </Box>
);

// ─── Mobile Page ──────────────────────────────────────────────────────────────
const MobilePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: A.bg, overflow: 'hidden' }}>
      {/* Top bar */}
      <Box
        sx={{
          height: TOP_BAR_H,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          bgcolor: A.surface,
          borderBottom: `1px solid ${A.sepStrong}`,
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          size="small"
          sx={{ bgcolor: A.bg, color: A.label, borderRadius: '10px', '&:hover': { bgcolor: A.fill } }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ fontFamily: A.font, fontWeight: 600, fontSize: 15, color: A.label }}>
          Scrollable Table
        </Typography>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: 'auto', ...noScrollbar }}>
        {/* Description card */}
        <Box sx={{ p: 2, pt: 2.5 }}>
          <ExplanationPanel />
        </Box>

        {/* Section label */}
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Typography sx={{ fontFamily: A.font, fontWeight: 600, fontSize: 11, color: A.label3, textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Live Demo
          </Typography>
        </Box>

        {/* Interactive demo */}
        <Box
          sx={{
            mx: 2,
            mb: 4,
            height: '80vh',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
          }}
        >
          <ScrollableTable
            data={tableData}
            columns={columns}
            view="mobile"
          />
        </Box>
      </Box>
    </Box>
  );
};

// ─── Desktop Wrapper ──────────────────────────────────────────────────────────
const DesktopWrapper = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: A.bg, position: 'relative' }}>
      {/* Back button */}
      <Box sx={{ position: 'absolute', top: 20, left: 24, zIndex: 10 }}>
        <IconButton
          onClick={() => navigate('/')}
          size="small"
          sx={{
            bgcolor: A.surface,
            color: A.label,
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            '&:hover': { bgcolor: A.fill },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Row 1: explanation panel + phone frame */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: { md: 6, lg: 10 },
          px: { md: 6, lg: 10 },
          pt: 8,
          pb: 6,
        }}
      >
        <ExplanationPanel />
        <PhoneFrame>
          <ScrollableTable data={tableData} columns={columns} view="mobile" />
        </PhoneFrame>
      </Box>

      {/* Row 2: browser / desktop frame */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: { md: 6, lg: 10 },
          pb: 10,
        }}
      >
        <Box sx={{ width: '75%' }}>
          <BrowserFrame>
            <ScrollableTable data={tableData} columns={columns} view="desktop" />
          </BrowserFrame>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
const ScrollableTablePage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? <MobilePage /> : <DesktopWrapper />;
};

export default ScrollableTablePage;
