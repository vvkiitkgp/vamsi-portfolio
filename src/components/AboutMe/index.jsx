import { Box, Typography } from '@mui/material';
import React from 'react';
import vvkProfilePhoto from '../../assets/vvk_profile_photo.JPG';
import DescriptionIcon from '@mui/icons-material/Description';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';

const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';

const actionItems = [
  { label: 'Resume',       Icon: DescriptionIcon,       path: '/resume'       },
  { label: 'Contact',      Icon: MailOutlineIcon,        path: '/contact'      },
  { label: 'Ask Anything', Icon: ChatBubbleOutlineIcon,  path: '/ask-anything', isAI: true },
];

export const AboutMe = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

      {/* Gradient background */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,0)), linear-gradient(#070113, #630dff 54%, #fff)',
        zIndex: 0,
      }} />

      {/* Photo — desktop: bleeds to right edge */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          right: 0,
          top: 0,
          width: '44%',
          height: '100%',
          zIndex: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #070113 0%, rgba(7,1,19,0.3) 40%, transparent 65%), linear-gradient(to bottom, transparent 55%, #fff 100%)',
            zIndex: 1,
          },
        }}
      >
        <Box
          component="img"
          src={vvkProfilePhoto}
          alt="Vamsi Vinay Kumar"
          sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: 9 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, md: 1.75 },
        }}
      >
        {/* Mobile: circular photo */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 0.5 }}>
          <Box
            component="img"
            src={vvkProfilePhoto}
            alt="Vamsi Vinay Kumar"
            sx={{
              width: 175,
              height: 175,
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              border: '3px solid rgba(255,255,255,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            }}
          />
        </Box>

        {/* hello! */}
        <Typography sx={{
          fontFamily: FONT,
          color: 'rgba(255,255,255,0.5)',
          fontSize: { xs: 13, md: 18 },
          letterSpacing: { xs: 4, md: 6 },
          fontWeight: 400,
        }}>
          hello!
        </Typography>

        {/* Name */}
        <Typography
          component="h1"
          sx={{
            fontFamily: FONT,
            color: '#fff',
            fontWeight: 800,
            fontSize: { xs: '2.4rem', sm: '3.8rem', md: '5.75rem' },
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
          }}
        >
          I'm Vamsi
        </Typography>

        {/* Role */}
        <Typography sx={{
          fontFamily: FONT,
          color: '#c4b5fd',
          fontSize: { xs: 13, md: 19 },
          letterSpacing: { xs: 2, md: 4 },
          fontWeight: 500,
        }}>
          ui developer · react
        </Typography>

        {/* Short bio */}
        <Typography sx={{
          fontFamily: FONT,
          color: 'rgba(255,255,255,0.45)',
          fontSize: { xs: 12, md: 14.5 },
          lineHeight: { xs: 1.65, md: 1.85 },
          maxWidth: { xs: '100%', md: 480 },
          mt: 0,
        }}>
          Senior Frontend Engineer with 6+ years in React, TypeScript &amp; GraphQL.
          Started at Standard Chartered Bank architecting corporate banking
          migrations, then moved to SigFig leading teams that ship LLM-powered
          financial features. IIT Kharagpur grad — Cursor &amp; Claude are my daily tools.
        </Typography>

        {/* Action pills */}
        <Box sx={{ display: 'flex', gap: 1.5, mt: { xs: 0.5, md: 1.5 }, flexWrap: 'wrap' }}>
          {actionItems.map(({ label, Icon, path, isAI }) => (
            <Box
              key={label}
              onClick={() => navigate(path)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.85,
                px: { xs: 1.75, md: 2.25 },
                py: { xs: 0.85, md: 1.1 },
                borderRadius: '50px',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(12px)',
                bgcolor: isAI ? 'rgba(99,13,255,0.28)' : 'rgba(255,255,255,0.09)',
                color: '#fff',
                fontFamily: FONT,
                fontSize: { xs: 12, md: 13 },
                fontWeight: 600,
                transition: 'background 0.2s, transform 0.15s',
                userSelect: 'none',
                '&:hover': {
                  bgcolor: isAI ? 'rgba(99,13,255,0.45)' : 'rgba(255,255,255,0.18)',
                  transform: 'translateY(-2px)',
                },
                '&:active': { transform: 'scale(0.96)' },
              }}
            >
              {isAI ? (
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'conic-gradient(from 90deg, #6366F1, #22D3EE, #A855F7, #6366F1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 9, fontWeight: 700, flexShrink: 0,
                }}>
                  ✦
                </Box>
              ) : (
                <Icon sx={{ fontSize: 15, opacity: 0.8 }} />
              )}
              {label}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMe;
