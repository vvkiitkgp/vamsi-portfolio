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

// The model sometimes emits `import`/`export` despite the system prompt. React &
// friends are injected as globals in the iframe, so strip module syntax (it would
// throw "Cannot use import statement outside a module" in the non-module Function
// scope) rather than relying on the model to behave.
const stripModuleSyntax = (code) =>
  code
    .replace(/^\s*import\s+[\s\S]*?\s+from\s+['"][^'"]*['"];?[ \t]*$/gm, '') // import x from '...'
    .replace(/^\s*import\s+['"][^'"]*['"];?[ \t]*$/gm, '') // side-effect import '...'
    .replace(/^\s*export\s+default\s+/gm, '') // export default App  ->  App
    .replace(/^\s*export\s+(?=(const|let|var|function|class)\b)/gm, '') // export const/function
    .trim();

const buildSrcdoc = (rawCode) => {
  const code = stripModuleSyntax(rawCode);
  // Embed the code as a JS string literal so a `</script>` inside it can't break
  // out of the script tag, and so Babel compile errors are catchable rather than
  // silently aborting the whole frame.
  const codeLiteral = JSON.stringify(code).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
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
      #__error {
        margin: 0; padding: 16px 20px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 13px; line-height: 1.55; color: #b91c1c; background: #fef2f2;
        border-bottom: 1px solid #fecaca; white-space: pre-wrap; word-break: break-word;
      }
    </style>
  </head>
  <body>
    <pre id="__error" style="display:none"></pre>
    <div id="root"></div>
    <script>
      (function () {
        var root = document.getElementById('root');
        var errBox = document.getElementById('__error');
        function showError(label, err) {
          errBox.style.display = 'block';
          errBox.textContent = label + ': ' + (err && err.message ? err.message : String(err));
        }
        // Catch runtime errors thrown after the initial render (e.g. in effects).
        window.addEventListener('error', function (e) { showError('Runtime error', e.error || e.message); });

        try {
          var source = ${codeLiteral};
          // Classic runtime compiles JSX to React.createElement (React is a global here).
          // The automatic runtime would inject a react/jsx-runtime import, which throws
          // Cannot use import statement outside a module in this non-module scope.
          var compiled = Babel.transform(source, { presets: [['react', { runtime: 'classic' }]] }).code;
          // Expose hooks as locals so code that imported them (now stripped) still resolves.
          var preamble = 'var { useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, useLayoutEffect, Fragment } = React;\\n';
          // Run the generated code and hand back its App component.
          var App = new Function('React', 'ReactDOM', preamble + compiled + '\\n; return typeof App !== "undefined" ? App : null;')(React, ReactDOM);
          if (typeof App !== 'function') {
            throw new Error('No function named "App" was found in the generated code.');
          }
          ReactDOM.createRoot(root).render(React.createElement(App));
        } catch (err) {
          showError('Failed to render', err);
        }
      })();
    </script>
  </body>
</html>`;
};

const buildSystemPrompt = (currentCode) =>
  `You are a React component code generator. The user will describe UI changes they want.

Your rules — follow them strictly:
- Return ONLY raw JavaScript/JSX code. No markdown, no backticks, no explanation.
- The component MUST be a function named App.
- Do NOT include any import or require statements. React, useState, useEffect, and all React hooks are available globally via the React global (e.g. const { useState } = React;).
- Do NOT include ReactDOM.render or ReactDOM.createRoot calls.
- Use only inline styles for styling. No external CSS libraries.
- In any string literal that contains an apostrophe (e.g. "I've", "don't"), use double quotes for that string or escape the apostrophe. Never let an apostrophe close a single-quoted string. Prefer double quotes for human-readable text.
- Output complete, syntactically valid code. Do not truncate; close every bracket, brace, and string.
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
        max_tokens: 8192,
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
          placeholder={
            isLoading
              ? 'Generating your app — hang tight…'
              : 'e.g. "Add a counter button in the center of the page"'
          }
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

          <Box sx={{ position: 'relative' }}>
            <iframe
              key={customAppCode}
              title="live-preview"
              srcDoc={buildSrcdoc(customAppCode)}
              style={{ width: '100%', height: 500, border: 'none', display: 'block' }}
              sandbox="allow-scripts"
            />

            {/* ChatGPT-style "image creating" shimmer while the model generates */}
            {isLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2.5,
                  // Sweeping diagonal highlight band over a soft grey base.
                  background:
                    'linear-gradient(110deg, #ECEFF3 8%, #F7F8FA 18%, #ECEFF3 33%)',
                  backgroundSize: '200% 100%',
                  animation: 'aiShimmer 1.4s ease-in-out infinite',
                  '@keyframes aiShimmer': {
                    '0%': { backgroundPosition: '150% 0' },
                    '100%': { backgroundPosition: '-50% 0' },
                  },
                }}
              >
                {/* Pulsing square "canvas" being painted in */}
                <Box
                  sx={{
                    width: 96,
                    height: 96,
                    borderRadius: '20px',
                    background:
                      'linear-gradient(135deg, #C7CDD6 0%, #E3E7EC 50%, #C7CDD6 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'aiCanvas 1.8s ease-in-out infinite',
                    boxShadow: '0 8px 28px rgba(17,24,39,0.10)',
                    '@keyframes aiCanvas': {
                      '0%, 100%': { backgroundPosition: '0% 50%', transform: 'scale(1)' },
                      '50%': { backgroundPosition: '100% 50%', transform: 'scale(1.06)' },
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6B7280',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    fontFamily:
                      'Inter, "SF Pro Text", -apple-system, system-ui, sans-serif',
                    animation: 'aiText 1.6s ease-in-out infinite',
                    '@keyframes aiText': {
                      '0%, 100%': { opacity: 0.55 },
                      '50%': { opacity: 1 },
                    },
                  }}
                >
                  Creating your app…
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AiDrivenWebapp;
