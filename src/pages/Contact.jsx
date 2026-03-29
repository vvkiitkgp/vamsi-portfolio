import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BackButton from '../components/BackButton';

const contactItems = [
  {
    label: 'Phone',
    value: '+91 9573241734',
    href: 'tel:+919573241734',
    icon: <PhoneIcon fontSize="medium" />,
    prefix: '🇮🇳',
  },
  {
    label: 'Email',
    value: 'vvk.iitkgp@gmail.com',
    href: 'mailto:vvk.iitkgp@gmail.com?subject=Origin%3A%20Portfolio%20-%20Need%20to%20contact%20to%20you%20about',
    icon: <EmailIcon fontSize="medium" />,
  },
];

const Contact = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 1.5, sm: 3 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <BackButton />
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 720,
          borderRadius: '18px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: { xs: 3, sm: 4 },
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: '#111827',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                fontFamily:
                  'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
              }}
            >
              Contact
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#4B5563',
                mt: 0.5,
                fontFamily:
                  'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
              }}
            >
              Reach out anytime via phone or email.
            </Typography>
          </Box>

          <Stack spacing={2}>
            {contactItems.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  border: '1px solid #E5E7EB',
                  borderRadius: '14px',
                  p: 2,
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#4B5563',
                        fontFamily:
                          'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#111827',
                        fontWeight: 700,
                        fontFamily:
                          'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                        letterSpacing: '-0.01em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {item.prefix
                        ? `${item.prefix} ${item.value}`
                        : item.value}
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title={`Open ${item.label}`} placement="left">
                  <IconButton
                    size="small"
                    component="a"
                    href={item.href}
                    sx={{
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      color: '#111827',
                      '&:hover': { backgroundColor: '#F3F4F6' },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Contact;
