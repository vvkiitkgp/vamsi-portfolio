import Anthropic from '@anthropic-ai/sdk';
import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BackButton from '../components/BackButton';

const INITIAL_CODE = `function App() {
  return (
    <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif', color: '#111827' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
        Hello! I'm your AI-generated app.
      </h2>
      <p style={{ color: '#6B7280', lineHeight: 1.6 }}>
        Use the chat above to describe what you want to build and watch me update in real time.
      </p>
    </div>
  );
}`;

const buildSrcdoc = (code) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      ${code}
      const _root = ReactDOM.createRoot(document.getElementById('root'));
      _root.render(<App />);
    </script>
  </body>
</html>`;

const buildSystemPrompt = (currentCode) =>
  `You are a React component code generator. The user will describe UI changes they want.

Your rules — follow them strictly:
- Return ONLY raw JavaScript/JSX code. No markdown, no backticks, no explanation.
- The component MUST be a function named App.
- Do NOT include any import or require statements. React, useState, useEffect, and all React hooks are available globally via the React global (e.g. const { useState } = React;).
- Do NOT include ReactDOM.render or ReactDOM.createRoot calls.
- Use only inline styles for styling. No external CSS libraries.
- Build on top of the existing component below — don't start from scratch unless asked.

Current component code:
${currentCode}`;

const AiDrivenWebapp = () => {
  const [customAppCode, setCustomAppCode] = useState(INITIAL_CODE);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setInput('');
    setIsLoading(true);

    const apiKey = process.env.REACT_APP_CLAUDE_KEY;

    if (!apiKey) {
      console.error('REACT_APP_CLAUDE_KEY is not set.');
      setIsLoading(false);
      return;
    }

    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

      const msg = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: buildSystemPrompt(customAppCode),
        messages: [{ role: 'user', content: trimmed }],
      });

      const raw = msg.content[0].text.trim();

      // Strip markdown fences if Claude added them despite instructions
      const cleaned = raw
        .replace(/^```(?:jsx?|tsx?|javascript|typescript)?\n?/, '')
        .replace(/\n?```$/, '')
        .trim();

      setCustomAppCode(cleaned);
    } catch (err) {
      console.error('AiDrivenWebapp handleSend error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        px: { xs: 1.5, sm: 3 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <BackButton />

      <Box
        sx={{
          maxWidth: 960,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: '#111827',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              fontFamily: 'Inter, "SF Pro Text", -apple-system, system-ui, sans-serif',
            }}
          >
            AI Driven Webapp
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              mt: 0.5,
              fontFamily: 'Inter, "SF Pro Text", -apple-system, system-ui, sans-serif',
            }}
          >
            Describe what you want to build and the AI will generate and update a live React app below.
          </Typography>
        </Box>

        {/* Chat input */}
        <TextField
          fullWidth
          placeholder='e.g. "Add a counter button in the center of the page"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isLoading ? (
                  <CircularProgress size={20} sx={{ mr: 0.5 }} />
                ) : (
                  <IconButton
                    onClick={handleSend}
                    disabled={!input.trim()}
                    sx={{
                      backgroundColor: '#111827',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      '&:hover': { backgroundColor: '#0F1620' },
                      '&.Mui-disabled': {
                        backgroundColor: '#E5E7EB',
                        color: '#9CA3AF',
                      },
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            },
          }}
        />

        {/* Live preview box */}
        <Box
          sx={{
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            backgroundColor: '#fff',
          }}
        >
          {/* Browser-chrome bar */}
          <Box
            sx={{
              px: 2,
              py: 1.2,
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
            }}
          >
            {['#FF5F57', '#FEBC2E', '#28C840'].map((color) => (
              <Box
                key={color}
                sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: color }}
              />
            ))}
            <Typography
              variant="caption"
              sx={{ ml: 1, color: '#9CA3AF', fontFamily: 'monospace', fontSize: '0.7rem' }}
            >
              live preview
            </Typography>
          </Box>

          <iframe
            key={customAppCode}
            title="live-preview"
            srcDoc={buildSrcdoc(customAppCode)}
            style={{ width: '100%', height: 500, border: 'none', display: 'block' }}
            sandbox="allow-scripts"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AiDrivenWebapp;
