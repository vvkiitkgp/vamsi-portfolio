import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

const SelectionSummary = ({
  title = 'Selected Items',
  items = [],
  totalLabel = '₹ 0',
  defaultExpanded = false,
  compact = false,
  onUndoItem,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const padding = compact ? 1.25 : 2;
  const thumbSize = compact ? 44 : 52;
  const gap = compact ? 0.75 : 1;
  const listRef = useRef(null);
  const maxListHeight = (thumbSize + (compact ? 14 : 18)) * 6; // roughly 6 items tall

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [items.length, expanded]);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '250px' },
        backgroundColor: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        p: padding,
        boxShadow: expanded
          ? '0 16px 36px rgba(0,0,0,0.08)'
          : '0 10px 24px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            variant="subtitle2"
            color="#111827"
            sx={{
              fontSize: compact ? 14 : undefined,
              fontFamily:
                'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            lineHeight={1.2}
            color="#111827"
            sx={{
              fontSize: compact ? 16 : undefined,
              fontFamily:
                'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {totalLabel}
          </Typography>
          <Typography
            variant="body2"
            color="#4B5563"
            sx={{
              fontSize: compact ? 12.5 : undefined,
              fontFamily:
                'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
            }}
          >
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Typography>
        </Box>

        <Tooltip title={expanded ? 'Hide Items' : 'Show Items'} placement="top">
          <IconButton
            aria-label={`Toggle ${title}`}
            onClick={() => setExpanded((prev) => !prev)}
            size="small"
            sx={{
              border: '1px solid #E5E7EB',
              borderRadius: '10px',
              width: 34,
              height: 34,
              color: '#111827',
              backgroundColor: '#F9FAFB',
              '&:hover': {
                backgroundColor: '#EEF2F7',
              },
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{
                width: 16,
                height: 16,
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                color: 'inherit',
              }}
            >
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Box>
          </IconButton>
        </Tooltip>
      </Box>

      {expanded && (
        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap,
            maxHeight: maxListHeight,
            overflowY: 'auto',
          }}
          ref={listRef}
        >
          {items.length ? (
            items.map((item) => {
              const firstImage = item?.images?.[0] || item?.image;
              const label = item?.name || `Item ${item?.id ?? ''}`;
              const handleUndo = () => onUndoItem?.(item?.id, item);
              return (
                <Box
                  key={item?.id ?? label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: compact ? 1 : 1.5,
                    p: compact ? 0.75 : 1,
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Box
                    sx={{
                      width: thumbSize,
                      height: thumbSize,
                      borderRadius: 1,
                      overflow: 'hidden',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {firstImage ? (
                      <Box
                        component="img"
                        src={firstImage}
                        alt={label}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        No image
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      noWrap
                      title={label}
                      sx={{
                        fontSize: compact ? 13 : undefined,
                        color: '#111827',
                        fontFamily:
                          'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  {onUndoItem && (
                    <Tooltip title="Undo" placement="top">
                      <IconButton
                        size="small"
                        aria-label={`Undo ${label}`}
                        onClick={handleUndo}
                        sx={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '10px',
                          width: compact ? 30 : 34,
                          height: compact ? 30 : 34,
                          color: '#111827',
                          backgroundColor: '#F9FAFB',
                          flexShrink: 0,
                          '&:hover': {
                            backgroundColor: '#EEF2F7',
                          },
                        }}
                      >
                        <Box
                          component="svg"
                          viewBox="0 0 24 24"
                          sx={{ width: 14, height: 14 }}
                        >
                          <path
                            d="M9 5l-5 5 5 5M4 10h10a4 4 0 010 8h-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Box>
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              );
            })
          ) : (
            <Typography
              variant="body2"
              color="#6B7280"
              sx={{
                px: 0.5,
                fontFamily:
                  'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
              }}
            >
              Nothing to show here yet.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SelectionSummary;
