import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    title: 'Resume',
    description: 'View my experience and skills.',
    icon: <DescriptionIcon fontSize="medium" />,
    path: '/resume',
  },
  {
    title: 'Contact',
    description: 'Get in touch to collaborate.',
    icon: <MailOutlineIcon fontSize="medium" />,
    path: '/contact',
  },
  {
    title: 'Ask Anything',
    description: 'Ask me about my projects.',
    icon: <ChatBubbleOutlineIcon fontSize="medium" />,
    path: '/ask-anything',
  },
];

const HorizontalCardsSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 1.5, sm: 3 },
        py: { xs: 3, sm: 4 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 2.5 },
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1100,
        }}
      >
        {items.map((item) => (
          <Card
            key={item.title}
            elevation={0}
            sx={{
              width: { xs: '100%', sm: 260 },
              minHeight: { xs: 160, sm: 200 },
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
              backgroundColor: '#FFFFFF',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 16px 34px rgba(0,0,0,0.1)',
              },
            }}
            onClick={() => {
              if (
                item.path?.startsWith('http') ||
                item.path?.startsWith('mailto:')
              ) {
                window.location.assign(item.path);
              } else {
                navigate(item.path || '/shopping-concept');
              }
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                py: 3,
                px: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    backgroundColor: '#EEF2F7',
                    color: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </Box>
                {item.title === 'Ask Anything' && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 1.25,
                      height: 44,
                      borderRadius: '12px',
                      background:
                        'linear-gradient(135deg, rgba(99,102,241,0.16), rgba(37,99,235,0.14))',
                      border: '1px solid rgba(37,99,235,0.25)',
                      color: '#111827',
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily:
                        'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                      letterSpacing: '0.02em',
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background:
                          'conic-gradient(from 90deg, #6366F1, #22D3EE, #A855F7, #6366F1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: 10,
                        fontWeight: 700,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                      }}
                    >
                      ✦
                    </Box>
                    AI
                  </Box>
                )}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#111827',
                  fontWeight: 700,
                  fontFamily:
                    'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                }}
              >
                {item.title}
              </Typography>
              {item.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#4B5563',
                    lineHeight: 1.6,
                    fontFamily:
                      'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                  }}
                >
                  {item.description}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HorizontalCardsSection;
