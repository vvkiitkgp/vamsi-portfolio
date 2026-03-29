import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#111827',
    },
    secondary: {
      main: '#2563EB',
    },
    success: {
      main: '#16A34A',
    },
    error: {
      main: '#DC2626',
    },
    divider: '#E5E7EB',
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F9FAFB',
          fontFamily:
            'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        containedPrimary: {
          boxShadow: '0 8px 18px rgba(17,24,39,0.18)',
          '&:hover': {
            boxShadow: '0 10px 22px rgba(17,24,39,0.22)',
          },
        },
        outlinedPrimary: {
          borderColor: '#E5E7EB',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#F3F4F6',
            borderColor: '#E5E7EB',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 14px 32px rgba(0,0,0,0.10)',
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});

export default theme;
