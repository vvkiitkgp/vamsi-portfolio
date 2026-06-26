import { Box, Typography, Skeleton } from '@mui/material';
import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import { useAboutMe } from '../../hooks/useAboutMe';
import { SOCIALS } from '../../config/socials';

const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

/* Splits a name into [first word, remaining words] for the two-tone display. */
const splitName = (name = '') => {
  const parts = name.trim().split(/\s+/);
  return [parts[0] || '', parts.slice(1).join(' ')];
};

export const AboutMe = () => {
  const navigate = useNavigate();
  const { data, loading } = useAboutMe();
  const [firstName, restName] = splitName(data.name);

  const actionButtons = [
    { label: 'Resume', Icon: DescriptionIcon, onClick: () => navigate('/resume'), filled: true },
    { label: 'GitHub', Icon: GitHubIcon, href: SOCIALS.github },
    { label: 'LinkedIn', Icon: LinkedInIcon, href: SOCIALS.linkedin },
  ];

  return (
    <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

      {/* Gradient background */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,0)), linear-gradient(#070113, #630dff 54%, #fff)',
        zIndex: 0,
      }} />

      {/* ── Hero content — two columns ─────────────────────────────────── */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: 9 },
          pt: { xs: 10, md: 0 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Left — text */}
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            flex: { md: '1 1 58%' },
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {/* Eyebrow */}
          {loading ? (
            <Skeleton variant="text" width={260} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 30, height: '1px', bgcolor: 'rgba(255,255,255,0.35)' }} />
              <Typography sx={{
                fontFamily: FONT,
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: 12, md: 13 },
                letterSpacing: '0.04em',
              }}>
                {data.tagline}
              </Typography>
            </Box>
          )}

          {/* Chips */}
          {!loading && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {[`Based out of ${data.location}`, data.subtitle, 'IIT Kharagpur'].map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    px: 1.5,
                    py: 0.6,
                    borderRadius: '50px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.78)',
                    fontFamily: FONT,
                    fontSize: { xs: 11.5, md: 12.5 },
                    fontWeight: 500,
                  }}
                >
                  {chip}
                </Box>
              ))}
            </Box>
          )}

          {/* Accent line */}
          {!loading && (
            <Typography sx={{
              fontFamily: FONT,
              color: '#c4b5fd',
              fontSize: { xs: 12.5, md: 14.5 },
              fontWeight: 700,
              letterSpacing: { xs: '0.04em', md: '0.06em' },
              textTransform: 'uppercase',
              lineHeight: 1.4,
              mt: 0.5,
            }}>
              {data.accentLine}
            </Typography>
          )}

          {/* Name (two-tone serif) */}
          {loading ? (
            <Skeleton variant="text" sx={{ bgcolor: 'rgba(255,255,255,0.08)', fontSize: { xs: '2.8rem', md: '5.2rem' }, width: '80%' }} />
          ) : (
            <Typography
              component="h1"
              sx={{
                fontFamily: SERIF,
                color: '#fff',
                fontWeight: 700,
                fontSize: { xs: '2.8rem', sm: '4rem', md: '5.2rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              {firstName}
              {restName && (
                <Box component="span" sx={{ color: '#c4b5fd' }}>{` ${restName}`}</Box>
              )}
            </Typography>
          )}

          {/* Bio */}
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, maxWidth: { md: 520 } }}>
              {['100%', '92%', '80%'].map((w) => (
                <Skeleton key={w} variant="text" width={w} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
              ))}
            </Box>
          ) : (
            <Typography sx={{
              fontFamily: FONT,
              color: 'rgba(255,255,255,0.5)',
              fontSize: { xs: 13, md: 15 },
              lineHeight: { xs: 1.65, md: 1.8 },
              maxWidth: { md: 540 },
            }}>
              {data.bio}
            </Typography>
          )}

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 1.5, mt: { xs: 1, md: 1.5 }, flexWrap: 'wrap' }}>
            {loading ? (
              [96, 110, 116].map((w) => (
                <Skeleton key={w} variant="rounded" width={w} height={42} sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '50px' }} />
              ))
            ) : (
              actionButtons.map(({ label, Icon, onClick, href, filled }) => {
                const linkProps = href
                  ? { component: 'a', href, target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick };
                return (
                  <Box
                    key={label}
                    {...linkProps}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.85,
                      px: { xs: 2, md: 2.5 },
                      py: { xs: 1, md: 1.15 },
                      borderRadius: '50px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      userSelect: 'none',
                      fontFamily: FONT,
                      fontSize: { xs: 13, md: 14 },
                      fontWeight: 600,
                      transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                      ...(filled
                        ? {
                            bgcolor: '#ede9fe',
                            color: '#2e1065',
                            boxShadow: '0 8px 24px rgba(99,13,255,0.35)',
                            '&:hover': { bgcolor: '#fff', transform: 'translateY(-2px)' },
                          }
                        : {
                            bgcolor: 'rgba(255,255,255,0.07)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(12px)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.16)', transform: 'translateY(-2px)' },
                          }),
                      '&:active': { transform: 'scale(0.97)' },
                    }}
                  >
                    <Icon sx={{ fontSize: 16, opacity: filled ? 0.9 : 0.85 }} />
                    {label}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>

        {/* Right — polaroid photo */}
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            flex: { md: '1 1 42%' },
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              bgcolor: '#fff',
              p: { xs: 1, md: 1.25 },
              pb: { xs: 2.5, md: 3.25 },
              borderRadius: '4px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
              transform: { xs: 'rotate(-2deg)', md: 'rotate(-4deg)' },
              transition: 'transform 0.45s ease, box-shadow 0.45s ease',
              width: { xs: 230, sm: 290, md: 340 },
              '&:hover': {
                transform: 'rotate(0deg) translateY(-6px)',
                boxShadow: '0 30px 72px rgba(0,0,0,0.55)',
              },
            }}
          >
            {loading || !data.photoUrl ? (
              <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '4 / 5', bgcolor: 'rgba(0,0,0,0.08)' }} />
            ) : (
              <Box
                component="img"
                src={data.photoUrl}
                alt={data.name}
                loading="eager"
                decoding="async"
                sx={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMe;
