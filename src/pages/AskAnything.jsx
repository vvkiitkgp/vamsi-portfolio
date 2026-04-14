import Anthropic from '@anthropic-ai/sdk';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { ABOUT_ME_CONTEXT } from '../lib/aboutMePrompt';
import BackButton from '../components/BackButton';

const fallbackAnswer =
  'Thanks for asking! I’m a UI developer focused on React, with experience across forms, hooks, and shipping polished product experiences. I enjoy building clean, performant UIs and collaborating closely with product teams.';

const AskAnything = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! Ask anything about me or my work.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const streamRef = useRef(null);

  const handleStopStream = () => {
    if (streamRef.current) {
      clearInterval(streamRef.current);
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  useEffect(() => {
    return () => {
      handleStopStream();
    };
  }, []);

  const streamAnswer = (answer) => {
    const chars = answer.split('');
    let acc = '';
    streamRef.current = setInterval(() => {
      acc += chars.shift() ?? '';
      setMessages((prev) => {
        const next = [...prev];
        // Replace or append current streaming assistant message
        if (next[next.length - 1]?.role === 'assistant-stream') {
          next[next.length - 1] = { role: 'assistant-stream', text: acc };
        } else {
          next.push({ role: 'assistant-stream', text: acc });
        }
        return next;
      });

      if (!chars.length) {
        handleStopStream();
        setMessages((prev) => {
          const next = [...prev];
          // finalize the stream message as assistant
          if (next[next.length - 1]?.role === 'assistant-stream') {
            next[next.length - 1] = { role: 'assistant', text: acc };
          }
          return next;
        });
      }
    }, 12);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setIsStreaming(true);

    const apiKey = process.env.REACT_APP_CLAUDE_KEY;
    if (!apiKey) {
      streamAnswer(fallbackAnswer);
      return;
    }

    try {
      const client = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true,
      });

      const msg = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: ABOUT_ME_CONTEXT,
        messages: [{ role: 'user', content: trimmed }],
      });

      const answer = msg.content[0].text || fallbackAnswer;
      streamAnswer(answer);
    } catch (err) {
      console.error('handleSend error:', err);
      streamAnswer(`Sorry, something went wrong. (${err.message})`);
    }
  };

  const renderedMessages = useMemo(
    () =>
      messages.map((m, idx) => {
        const isUser = m.role === 'user';
        return (
          <Box
            key={`${m.role}-${idx}-${m.text.slice(0, 10)}`}
            sx={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                maxWidth: '80%',
                alignItems: 'flex-start',
              }}
            >
              {!isUser && (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '10px',
                    backgroundColor: '#EEF2F7',
                    color: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ChatBubbleOutlineIcon fontSize="small" />
                </Box>
              )}
              <Card
                elevation={0}
                sx={{
                  backgroundColor: isUser ? '#2563EB' : '#FFFFFF',
                  color: isUser ? '#FFFFFF' : '#111827',
                  border: isUser ? 'none' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: isUser
                    ? '0 10px 24px rgba(37,99,235,0.25)'
                    : '0 10px 24px rgba(0,0,0,0.06)',
                }}
              >
                <CardContent sx={{ py: 1.2, px: 1.6 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      fontFamily:
                        'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                    }}
                  >
                    {m.text}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            {isUser && (
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  backgroundColor: '#EEF2F7',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  ml: 1,
                }}
              >
                <PersonOutlineIcon fontSize="small" />
              </Box>
            )}
          </Box>
        );
      }),
    [messages],
  );

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
          maxWidth: 900,
          borderRadius: '18px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: { xs: 3, sm: 4 },
          }}
        >
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
            Ask Anything
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#4B5563',
              fontFamily:
                'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
            }}
          >
            Ask anything about me or my work. Answers stream in like chat.
          </Typography>

          <Stack spacing={1.5} sx={{ minHeight: 320 }}>
            {renderedMessages}
            {isStreaming && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#4B5563',
                }}
              >
                <CircularProgress size={16} />
                <Typography variant="caption">Thinking...</Typography>
              </Box>
            )}
          </Stack>

          <TextField
            fullWidth
            placeholder="Ask anything about me"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Send"
                    onClick={handleSend}
                    disabled={!input.trim() || isStreaming}
                    sx={{
                      backgroundColor: '#111827',
                      color: '#FFFFFF',
                      '&:hover': { backgroundColor: '#0F1620' },
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AskAnything;
