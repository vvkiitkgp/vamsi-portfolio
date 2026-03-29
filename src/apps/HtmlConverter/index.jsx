import React, { useEffect, useMemo, useState } from 'react';
import { ContentCopyRounded, RestartAltRounded } from '@mui/icons-material';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import BackButton from '../../components/BackButton';

const defaultHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>3D HTML Cube</title>
  <style>
    :root {
      color-scheme: dark;
      --glass: rgba(12, 18, 32, 0.82);
      --edge: rgba(255, 255, 255, 0.24);
      --glow: rgba(93, 188, 255, 0.35);
      --text: #e5e7eb;
      --accent: #7dd3fc;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at 30% 30%, #111827, #0b1221 58%);
      color: var(--text);
      font-family: 'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif;
      letter-spacing: 0.02em;
    }

    .scene {
      width: clamp(240px, 38vw, 320px);
      aspect-ratio: 1;
      perspective: 900px;
      position: relative;
      filter: drop-shadow(0 24px 36px rgba(0, 0, 0, 0.35));
    }

    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      animation: spin 12s infinite linear;
    }

    .face {
      position: absolute;
      inset: 0;
      border-radius: 22px;
      background: linear-gradient(135deg, #0f172a, #0b162b);
      border: 1px solid var(--edge);
      box-shadow:
        inset 0 0 40px rgba(255, 255, 255, 0.04),
        0 10px 26px rgba(0, 0, 0, 0.28);
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: clamp(18px, 2vw, 26px);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text);
      backdrop-filter: blur(12px);
      text-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
    }

    .face::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 22px;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.08), transparent 48%);
      opacity: 0.9;
    }

    .front  { transform: translateZ(120px); background: linear-gradient(145deg, rgba(125, 211, 252, 0.18), rgba(99, 102, 241, 0.14)); }
    .back   { transform: rotateY(180deg) translateZ(120px); }
    .right  { transform: rotateY(90deg) translateZ(120px); background: linear-gradient(145deg, rgba(110, 231, 183, 0.16), rgba(59, 130, 246, 0.12)); }
    .left   { transform: rotateY(-90deg) translateZ(120px); background: linear-gradient(145deg, rgba(248, 113, 113, 0.16), rgba(250, 204, 21, 0.12)); }
    .top    { transform: rotateX(90deg) translateZ(120px); }
    .bottom { transform: rotateX(-90deg) translateZ(120px); }

    .core-glow {
      position: absolute;
      inset: 14%;
      border-radius: 28px;
      background: radial-gradient(circle, rgba(125, 211, 252, 0.32), transparent 70%);
      filter: blur(26px);
      transform: translateZ(60px);
      pointer-events: none;
    }

    @keyframes spin {
      0%   { transform: rotateX(-16deg) rotateY(-28deg); }
      50%  { transform: rotateX(20deg) rotateY(210deg); }
      100% { transform: rotateX(-16deg) rotateY(332deg); }
    }

    footer {
      position: absolute;
      bottom: 22px;
      width: 100%;
      display: flex;
      justify-content: center;
      color: rgba(229, 231, 235, 0.7);
      font-size: 13px;
      letter-spacing: 0.04em;
    }
  </style>
</head>
<body>
  <div class="scene">
    <div class="cube">
      <div class="core-glow"></div>
      <div class="face front">HTML</div>
      <div class="face back">CSS</div>
      <div class="face right">UI</div>
      <div class="face left">UX</div>
      <div class="face top">3D</div>
      <div class="face bottom">↻</div>
    </div>
  </div>
  <footer>Live 3D cube · editable HTML & CSS</footer>
</body>
</html>`;

const HtmlConverter = () => {
  const [source, setSource] = useState(defaultHtml);
  const [formattedPreview, setFormattedPreview] = useState(defaultHtml);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFormattedPreview(source), 180);
    return () => clearTimeout(timer);
  }, [source]);

  const hasChanges = useMemo(() => source !== defaultHtml, [source]);

  const handleReset = () => setSource(defaultHtml);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 1500);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Clipboard not available', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f8fafc 0%, #e5e7eb 34%, #f8fafc 100%)',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        py: { xs: 3, md: 5 },
        px: { xs: 1.5, sm: 2.5, md: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1300,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <BackButton />
        <Stack
          spacing={1}
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color: '#0f172a',
                letterSpacing: '-0.02em',
                fontSize: { xs: 26, sm: 30 },
              }}
            >
              HTML to Visual · Live Preview
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#475569', maxWidth: 780, mt: 0.5 }}
            >
              Type or paste HTML on the left, see the app render instantly on
              the right.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.05fr 1fr' },
            gap: { xs: 2, md: 3 },
            alignItems: 'stretch',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(145deg, #0b1221 0%, #0f162e 65%)',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 20px 38px rgba(0,0,0,0.35)',
              color: '#e2e8f0',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
                alignItems: 'center',
                rowGap: 1,
                columnGap: 1.5,
                px: 2,
                py: 1.5,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ minWidth: 0 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  {['#ef4444', '#f59e0b', '#22c55e'].map((color) => (
                    <Box
                      // eslint-disable-next-line react/no-array-index-key
                      key={color}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: color,
                        opacity: 0.8,
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ color: '#e2e8f0', letterSpacing: '0.02em' }}
                >
                  Editor
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ justifySelf: { xs: 'flex-start', sm: 'flex-end' } }}
              >
                <Tooltip title="Reset to cube demo">
                  <IconButton
                    size="small"
                    onClick={handleReset}
                    sx={{
                      color: '#cbd5f5',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
                    }}
                  >
                    <RestartAltRounded fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={hasCopied ? 'Copied!' : 'Copy to clipboard'}>
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    sx={{
                      color: '#cbd5f5',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
                    }}
                  >
                    <ContentCopyRounded fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            <Box
              component="textarea"
              value={source}
              onChange={(event) => setSource(event.target.value)}
              spellCheck={false}
              aria-label="HTML editor"
              sx={{
                width: '100%',
                minHeight: { xs: 360, md: 520 },
                background: 'transparent',
                color: '#e2e8f0',
                border: 'none',
                outline: 'none',
                fontFamily:
                  'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 14,
                lineHeight: 1.6,
                p: 2.25,
                resize: 'vertical',
                '&::selection': {
                  backgroundColor: 'rgba(125, 211, 252, 0.35)',
                  color: '#0b1221',
                },
                '&::-webkit-scrollbar': { width: 10 },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255,255,255,0.14)',
                  borderRadius: 999,
                  border: '2px solid rgba(11,18,33,0.65)',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255,255,255,0.06)',
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                px: 2,
                py: 1.25,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'rgba(226,232,240,0.8)', letterSpacing: '0.05em' }}
              >
                Live updates as you type · Dark editor
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow:
                '0 20px 50px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ color: '#0f172a', letterSpacing: '0.04em' }}
              >
                Visual Preview
              </Typography>
              <Chip
                label={hasChanges ? 'Custom' : 'Default cube'}
                size="small"
                sx={{
                  backgroundColor: hasChanges ? '#e0f2fe' : '#f1f5f9',
                  color: '#0f172a',
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                backgroundColor: '#ffffff',
                position: 'relative',
              }}
            >
              <iframe
                title="HTML preview"
                srcDoc={formattedPreview}
                sandbox="allow-scripts allow-same-origin"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  backgroundColor: 'rgba(15,23,42,0.75)',
                  color: '#e2e8f0',
                  px: 1.25,
                  py: 0.65,
                  borderRadius: 999,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.16)',
                }}
              >
                Live
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HtmlConverter;
