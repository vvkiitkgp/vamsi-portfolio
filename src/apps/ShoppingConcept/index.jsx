import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, CardActions, Typography } from '@mui/material';
import ShoppingCard from './components/ShoppingCard';
import SelectionSummary from './components/SelectionSummary';
import BackButton from '../../components/BackButton';

const placeholderImages = Array(10).fill(
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
);

const initialCatalog = Array.from({ length: 30 }, (_, idx) => ({
  id: idx + 1,
  name: `Item ${idx + 1}`,
  price: 30000 + idx * 10,
  color: idx % 2 === 0 ? 'Blue' : 'Red',
  size: ['S', 'M', 'L'][idx % 3],
  images: placeholderImages,
}));

const ShoppingConcept = () => {
  const [session, setSession] = useState(1);
  const [initialStagedItems, setInitialStagedItems] = useState(initialCatalog);
  const [stagedItems, setStagedItems] = useState(initialCatalog);
  const [selectedItems, setSelectedItems] = useState([]);
  const [rejectedItems, setRejectedItems] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);
  const [isHinting, setIsHinting] = useState(false);
  const hintPlayedRef = useRef(false);
  const [sessionPulse, setSessionPulse] = useState(false);
  const hasHistory = sessionHistory.length > 0;
  const historyListRef = useRef(null);

  const sumPrices = (items = []) =>
    items.reduce((total, item) => total + (item?.price ?? 0), 0);
  const formatCurrency = (value = 0) =>
    `₹ ${(value ?? 0).toLocaleString('en-IN')}`;

  const currentItem = useMemo(() => stagedItems[0] || null, [stagedItems]);
  const nextItem = useMemo(() => stagedItems[1] || null, [stagedItems]);

  const handleSelectNext = () => {
    if (!stagedItems.length) return;
    const [next, ...rest] = stagedItems;
    setSelectedItems((prev) => [...prev, next]);
    setStagedItems(rest);
  };

  const handleRejectNext = () => {
    if (!stagedItems.length) return;
    const [next, ...rest] = stagedItems;
    setRejectedItems((prev) => [...prev, next]);
    setStagedItems(rest);
  };

  const handleDragStart = (clientX) => {
    if (!stagedItems.length) return;
    dragStartXRef.current = clientX;
    setIsDragging(true);
    if (isHinting) {
      setIsHinting(false);
    }
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setDragX(clientX - dragStartXRef.current);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const threshold = 80;
    if (dragX > threshold) {
      triggerDismiss('right');
    } else if (dragX < -threshold) {
      triggerDismiss('left');
    }
    setIsDragging(false);
    if (Math.abs(dragX) <= threshold) {
      setDragX(0);
    }
  };

  useEffect(() => {
    if (!currentItem || hintPlayedRef.current || isDragging || isAnimatingOut) {
      return;
    }

    hintPlayedRef.current = true;

    const startDelay = 200;
    const duration = 1000;
    setTimeout(() => {
      setIsHinting(true);
      const stopTimer = setTimeout(() => {
        setIsHinting(false);
      }, duration);
      // Only clear stop timer on unmount
      return () => clearTimeout(stopTimer);
    }, startDelay);

    // Do not clear the startTimer on cleanup to survive StrictMode double-invoke.
    return undefined;
  }, [currentItem, isDragging, isAnimatingOut]);

  const triggerDismiss = (direction) => {
    if (isAnimatingOut || !stagedItems.length) return;
    setExitDirection(direction);
    setIsAnimatingOut(true);
    const perform = direction === 'right' ? handleSelectNext : handleRejectNext;
    setTimeout(() => {
      perform();
      setIsAnimatingOut(false);
      setExitDirection(null);
      setDragX(0);
    }, 200);
  };

  const handleFinalizeCart = () => {
    // In a real flow, this might trigger a checkout step.
    // Here it simply keeps the current selected list as the finalized set.
  };

  const handleRepickCart = () => {
    // Capture the session that just ended into the history stack.
    setSessionHistory((prev) => [
      ...prev,
      {
        session,
        stagedCount: initialStagedItems.length,
        stagedTotal: sumPrices(initialStagedItems),
        selectedCount: selectedItems.length,
        selectedTotal: sumPrices(selectedItems),
      },
    ]);

    // Start a new session with the previously selected items as the new staged list.
    setSession((prev) => prev + 1);
    const nextStaged = [...selectedItems];
    setInitialStagedItems(nextStaged);
    setStagedItems(nextStaged);
    setSelectedItems([]);
    setRejectedItems([]);
    hintPlayedRef.current = false; // allow hint on new session
  };

  const handleUndoFromSelected = (id) => {
    if (!id) return;
    setSelectedItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      setStagedItems((s) => [item, ...s]);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleUndoFromRejected = (id) => {
    if (!id) return;
    setRejectedItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      setStagedItems((s) => [item, ...s]);
      return prev.filter((i) => i.id !== id);
    });
  };

  useEffect(() => {
    setSessionPulse(true);
    const timer = setTimeout(() => setSessionPulse(false), 600);
    return () => clearTimeout(timer);
  }, [session]);

  useEffect(() => {
    if (historyListRef.current && sessionHistory.length) {
      const el = historyListRef.current;
      requestAnimationFrame(() => {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      });
    }
  }, [sessionHistory.length]);

  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100%',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        overflowX: 'hidden',
        pb: 8,
      }}
    >
      <BackButton />
      {/* Session Header */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          px: { xs: 1.5, sm: 3 },
          py: 0,
          top: 0,
          zIndex: 2,
          mb: 2,
          minHeight: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: hasHistory ? 'flex-start' : 'center',
          transition: 'justify-content 0.35s ease',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: hasHistory ? 1 : 0,
            transition: 'margin-bottom 0.3s ease',
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              animation: sessionPulse ? 'sessionPulse 0.6s ease' : 'none',
              fontFamily:
                'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
              color: '#111827',
              transform: hasHistory ? 'translateY(0)' : 'translateY(8px)',
              transition: 'transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)',
              '@keyframes sessionPulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '30%': { transform: 'scale(1.5)', opacity: 0.95 },
                '60%': { transform: 'scale(0.98)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            Shortlisting · Round {session}
          </Typography>
        </Box>

        {/* Previous sessions row (scrollable, no wrap) */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '100vw',
            display: 'flex',
            gap: 1.5,
            overflowX: 'auto',
            pb: hasHistory ? 1 : 0,
            flexWrap: 'nowrap',
            minHeight: hasHistory ? 90 : 0,
            maxHeight: hasHistory ? 120 : 0,
            opacity: hasHistory ? 1 : 0,
            transition:
              'opacity 0.35s ease, max-height 0.35s ease, padding-bottom 0.35s ease, min-height 0.35s ease',
            pointerEvents: hasHistory ? 'auto' : 'none',
            px: { xs: 1.5, sm: 0 },
          }}
          ref={historyListRef}
        >
          {sessionHistory.map((item, idx) => {
            const isFirst = idx === 0;
            const clip = isFirst
              ? 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)'
              : 'polygon(0 50%, 8% 0, 92% 0, 100% 50%, 92% 100%, 8% 100%)';
            const overlap = isFirst ? 0 : -10;
            const zOrder = sessionHistory.length - idx;
            const cardWidth = isFirst ? 250 : 350;
            return (
              <Box
                key={item.session}
                sx={{
                  flex: `0 0 ${cardWidth}px`,
                  width: `${cardWidth}px`,
                  minHeight: 50,
                  p: 2,
                  background:
                    'linear-gradient(145deg, #FFFFFF 0%, #F3F4F6 100%)',
                  color: '#111827',
                  border: '1px solid #E5E7EB',
                  borderRadius: '14px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
                  clipPath: clip,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  justifyContent: 'center',
                  ml: overlap,
                  position: 'relative',
                  zIndex: zOrder,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.9,
                    color: '#111827',
                    fontWeight: 600,
                    fontFamily:
                      'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                  }}
                >
                  Round {item.session}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color: '#111827',
                    fontFamily:
                      'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  Initial: {item.stagedCount} items | ₹{' '}
                  {item.stagedTotal.toLocaleString('en-IN')}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#4B5563',
                    fontFamily:
                      'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  Selected: {item.selectedCount} items | ₹{' '}
                  {item.selectedTotal.toLocaleString('en-IN')}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(220px, 1fr) minmax(340px, 420px) minmax(220px, 1fr)',
          },
          alignItems: 'start',
          columnGap: { xs: 1.5, md: 3 },
          rowGap: 2,
          px: { xs: 1.5, md: 2 },
          py: 1.5,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxHeight: 520,
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SelectionSummary
            title="Rejected Items"
            items={rejectedItems}
            totalLabel={formatCurrency(sumPrices(rejectedItems))}
            compact
            onUndoItem={handleUndoFromRejected}
          />
        </Box>

        {currentItem ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: { xs: '100%', sm: 400 },
              height: { xs: 520, sm: 620 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {nextItem && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  transform: 'translate(12px, 12px) scale(0.96)',
                  borderRadius: 3,
                  boxShadow: 2,
                  opacity: 0.9,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                }}
              >
                <ShoppingCard
                  name={nextItem?.name}
                  price={nextItem?.price}
                  color={nextItem?.color}
                  size={nextItem?.size}
                  images={nextItem?.images}
                />
              </Box>
            )}

            <Box
              sx={{
                width: { xs: '100%', sm: 360 },
                height: { xs: 520, sm: 600 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isHinting ? 'hintWiggle 1s ease' : 'none',
                pointerEvents: isHinting ? 'none' : 'auto',
                '@keyframes hintWiggle': {
                  '0%': { transform: 'translateX(0px)' },
                  '20%': { transform: 'translateX(28px)' },
                  '50%': { transform: 'translateX(-28px)' },
                  '80%': { transform: 'translateX(14px)' },
                  '100%': { transform: 'translateX(0px)' },
                },
              }}
              onAnimationEnd={() => {
                if (isHinting) {
                  setIsHinting(false);
                }
              }}
              onAnimationCancel={() => {
                if (isHinting) {
                  setIsHinting(false);
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', sm: 360 },
                  height: { xs: 520, sm: 600 },
                  cursor: stagedItems.length ? 'grab' : 'default',
                  transform: isAnimatingOut
                    ? `translateX(${
                        exitDirection === 'right' ? 240 : -240
                      }px) rotate(${
                        exitDirection === 'right' ? 18 : -18
                      }deg) scale(0)`
                    : `translateX(${dragX}px) rotate(${
                        dragX / 60
                      }deg) scale(1)`,
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.25s ease, opacity 0.25s ease',
                  opacity: isAnimatingOut ? 0 : 1,
                }}
                key={currentItem?.id ?? 'card'}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleDragStart(e.clientX);
                }}
                onPointerMove={(e) => handleDragMove(e.clientX)}
                onPointerUp={handleDragEnd}
                onPointerLeave={handleDragEnd}
                onPointerCancel={handleDragEnd}
              >
                <ShoppingCard
                  name={currentItem?.name}
                  price={currentItem?.price}
                  color={currentItem?.color}
                  size={currentItem?.size}
                  images={currentItem?.images}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: 380,
              height: 620,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 360,
                height: 600,
                border: '1px dashed #E5E7EB',
                borderRadius: 3,
                color: '#4B5563',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Your cart is all sorted
              </Typography>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            width: '100%',
            maxHeight: 520,
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SelectionSummary
            title="Selected Items"
            items={selectedItems}
            totalLabel={formatCurrency(sumPrices(selectedItems))}
            defaultExpanded
            compact
            onUndoItem={handleUndoFromSelected}
          />
        </Box>
      </Box>

      <CardActions
        sx={{
          position: 'fixed',
          bottom: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '94%', sm: '80%', md: '50%' },
          maxWidth: 720,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        {/* <Box sx={{ flex: 1 }} /> */}
        <Box
          sx={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 1 }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{
              px: 1.75,
              py: 0.5,
              minWidth: 0,
              textTransform: 'none',
              backgroundColor: '#FFFFFF',
              color: '#111827',
              borderColor: '#E5E7EB',
              '&:hover': {
                backgroundColor: '#F3F4F6',
                borderColor: '#E5E7EB',
              },
            }}
            onClick={handleRepickCart}
          >
            Re-Pick My Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              px: 1.75,
              py: 0.5,
              minWidth: 0,
              textTransform: 'none',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              boxShadow: '0 8px 18px rgba(17,24,39,0.18)',
              '&:hover': {
                backgroundColor: '#0F1620',
                boxShadow: '0 10px 22px rgba(17,24,39,0.22)',
              },
            }}
            onClick={handleFinalizeCart}
          >
            Finalise Cart
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="subtitle1"
            color="#111827"
            fontFamily='Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif'
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            Total: ₹ {sumPrices(selectedItems).toLocaleString('en-IN')}
          </Typography>
        </Box>
      </CardActions>
    </Box>
  );
};

export default ShoppingConcept;
