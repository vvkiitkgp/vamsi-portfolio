import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { SOCIALS } from '../../config/socials';

const FONT =
  'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const SOCIAL_LINKS = [
  { label: 'GitHub', Icon: GitHubIcon, href: SOCIALS.github },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: SOCIALS.linkedin },
  { label: 'Email', Icon: AlternateEmailIcon, href: SOCIALS.email },
];

export const Fotter = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#070113',
        color: '#fff',
        px: { xs: 3, sm: 5 },
        pt: { xs: 6, sm: 9 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Centered card ─────────────────────────────────────────────── */}
      <Box
        sx={{
          maxWidth: 1080,
          mx: 'auto',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          bgcolor: 'rgba(255,255,255,0.02)',
          px: { xs: 3, sm: 6 },
          py: { xs: 5, sm: 7 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2.5,
        }}
      >
        {/* Eyebrow */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 30, height: '1px', bgcolor: 'rgba(196,181,253,0.5)' }} />
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#c4b5fd',
            }}
          >
            If the thinking resonates
          </Typography>
        </Box>

        {/* Message */}
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: { xs: 16, sm: 19 },
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: 680,
          }}
        >
          If something here resonated, or you just like people who care a little
          too much about the details — say hello.
        </Typography>

        {/* Socials */}
        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
          {SOCIAL_LINKS.map(({ label, Icon, href }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              sx={{
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.3)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Icon sx={{ fontSize: 20 }} />
            </IconButton>
          ))}
        </Box>

        {/* Resume link */}
        <Typography
          onClick={() => navigate('/resume')}
          sx={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.75)',
            cursor: 'pointer',
            mt: 1,
            transition: 'color 0.2s ease',
            '&:hover': { color: '#fff' },
          }}
        >
          Resume
        </Typography>

        {/* Copyright */}
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: 13,
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          © {year} Vamsi Vinay Kumar. All rights reserved.
        </Typography>
      </Box>

      {/* ── Giant fading watermark ────────────────────────────────────── */}
      <Typography
        aria-hidden
        sx={{
          fontFamily: SERIF,
          fontWeight: 700,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          fontSize: { xs: '4.5rem', sm: '9rem', md: '14rem' },
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(180deg, rgba(196,181,253,0.28) 0%, rgba(196,181,253,0.06) 72%, rgba(196,181,253,0) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          userSelect: 'none',
          mt: { xs: 4, md: 7 },
          mb: { xs: '-0.1em', md: '-0.15em' },
        }}
      >
        Stay curious!
      </Typography>
    </Box>
  );
};

export default Fotter;
