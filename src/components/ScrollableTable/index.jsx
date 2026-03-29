import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// ─── Internal constants ───────────────────────────────────────────────────────
const ROW_H   = 44;
const HEADER_H = 50;
const ID_W    = 108;
const REPS    = 5;

const noScrollbar = {
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
};

// ─── Built-in theme presets ───────────────────────────────────────────────────
const APPLE = {
  bg:        '#F2F2F7',
  surface:   '#FFFFFF',
  fill:      '#E5E5EA',
  label:     '#000000',
  label2:    '#636366',
  label3:    '#8E8E93',
  sep:       'rgba(60,60,67,0.18)',
  sepStrong: 'rgba(60,60,67,0.29)',
  font: '-apple-system, "SF Pro Text", "SF Pro Display", BlinkMacSystemFont, Helvetica, Arial, sans-serif',
};

const resolveTheme = (theme) => {
  if (!theme || theme === 'apple') return APPLE;
  if (typeof theme === 'object') return { ...APPLE, ...theme };
  return APPLE;
};

// ─── Desktop Table ────────────────────────────────────────────────────────────
const DesktopTable = ({ data, columns, T }) => (
  <Box sx={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', fontFamily: T.font }}>
    <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600, fontFamily: T.font }}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={col.key}
              style={{
                padding: '10px 16px',
                textAlign: 'left',
                background: T.bg,
                color: T.label3,
                fontFamily: T.font,
                fontWeight: 600,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                borderBottom: `1px solid ${T.sepStrong}`,
                borderRight: i < columns.length - 1 ? `1px solid ${T.sep}` : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ background: T.surface }}>
            {columns.map((col, j) => (
              <td
                key={col.key}
                style={{
                  padding: '11px 16px',
                  fontSize: 13,
                  fontFamily: T.font,
                  borderBottom: `1px solid ${T.sep}`,
                  borderRight: j < columns.length - 1 ? `1px solid ${T.sep}` : 'none',
                  color: j === 0 ? T.label3 : T.label,
                  whiteSpace: 'nowrap',
                }}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

// ─── DataCell ─────────────────────────────────────────────────────────────────
const DataCell = ({ value, variant, T }) => {
  const isActive = variant === 'active';
  return (
    <Box
      sx={{
        flex: isActive ? 2 : 1,
        display: 'flex',
        alignItems: isActive ? 'flex-start' : 'center',
        px: 1,
        py: isActive ? 0.875 : 0,
        bgcolor: isActive ? T.surface : T.bg,
        borderRight: `1px solid ${T.sep}`,
        overflow: 'hidden',
        transition: 'flex 0.22s ease, background 0.15s',
      }}
    >
      <Typography
        sx={{
          fontFamily: T.font,
          fontSize: 12,
          color: isActive ? T.label : T.label3,
          fontWeight: isActive ? 500 : 400,
          whiteSpace: isActive ? 'normal' : 'nowrap',
          wordBreak: isActive ? 'break-word' : 'normal',
          overflow: isActive ? 'visible' : 'hidden',
          textOverflow: isActive ? 'unset' : 'ellipsis',
          width: '100%',
          lineHeight: 1.5,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

// ─── View 1: Column View ──────────────────────────────────────────────────────
const ColumnView = memo(({ data, idCol, dataCols, activeColIdx, onPrev, onNext, selectedRowIdx, onRowClick, height, T }) => {
  const scrollRef = useRef(null);
  const prevIdx = (activeColIdx - 1 + dataCols.length) % dataCols.length;
  const nextIdx = (activeColIdx + 1) % dataCols.length;

  useEffect(() => {
    if (scrollRef.current) {
      const target = selectedRowIdx * ROW_H - 3 * ROW_H;
      scrollRef.current.scrollTop = Math.max(0, target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ height, display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: T.bg, fontFamily: T.font }}>

      {/* Navigation header */}
      <Box
        sx={{
          height: HEADER_H,
          display: 'flex',
          flexShrink: 0,
          bgcolor: T.surface,
          borderBottom: `1px solid ${T.sepStrong}`,
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: ID_W,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: T.bg,
            borderRight: `1px solid ${T.sepStrong}`,
          }}
        >
          <Typography sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 11, color: T.label3, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            {idCol.label}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: T.surface, px: 0.5 }}>
          <IconButton size="small" onClick={onPrev} sx={{ color: T.label }}>
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 15, color: T.label, letterSpacing: -0.2 }}>
            {dataCols[activeColIdx]?.label}
          </Typography>
          <IconButton size="small" onClick={onNext} sx={{ color: T.label }}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Scrollable rows */}
      <Box ref={scrollRef} sx={{ flex: 1, overflowY: 'auto', ...noScrollbar }}>
        {data.map((row, i) => (
          <Box
            key={i}
            sx={{ display: 'flex', minHeight: ROW_H, borderBottom: `1px solid ${T.sep}`, alignItems: 'stretch' }}
          >
            {/* ID cell — tap to open detail view */}
            <Box
              onClick={() => onRowClick(i)}
              sx={{
                width: ID_W,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                bgcolor: T.bg,
                borderRight: `1px solid ${T.sepStrong}`,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'background 0.1s',
                '&:active': { bgcolor: T.fill },
              }}
            >
              <Typography sx={{ fontFamily: T.font, fontSize: 12, fontWeight: 500, color: T.label2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {String(row[idCol.key])}
              </Typography>
            </Box>

            {/* Three data columns: prev (dim) | active | next (dim) */}
            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <DataCell value={row[dataCols[prevIdx]?.key]} variant="dim" T={T} />
              <DataCell value={row[dataCols[activeColIdx]?.key]} variant="active" T={T} />
              <DataCell value={row[dataCols[nextIdx]?.key]} variant="dim" T={T} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

// ─── View 2: Row Detail View ──────────────────────────────────────────────────
const RowDetailView = memo(({ data, idCol, dataCols, infiniteRows, initialRowIdx, onRowChange, onColumnClick, height, T }) => {
  const [centeredIdx, setCenteredIdx] = useState(initialRowIdx);
  const [ready, setReady]             = useState(false);
  const containerRef  = useRef(null);
  const isResetting   = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerH   = container.clientHeight;
    const midStart     = Math.floor(REPS / 2) * data.length;
    const absoluteIdx  = midStart + initialRowIdx;
    const scrollTop    = absoluteIdx * ROW_H - Math.floor((containerH - ROW_H) / 2);
    container.scrollTop = Math.max(0, scrollTop);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(() => {
    if (isResetting.current) return;
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, clientHeight } = container;
    const oneRepH      = data.length * ROW_H;
    const midRepOffset = Math.floor(REPS / 2) * oneRepH;
    const centeredAbs  = Math.round((scrollTop + (clientHeight - ROW_H) / 2) / ROW_H);
    const newIdx       = ((centeredAbs % data.length) + data.length) % data.length;
    setCenteredIdx(newIdx);
    onRowChange(newIdx);
    const distFromMid = scrollTop - midRepOffset;
    if (Math.abs(distFromMid) > oneRepH * 1.5) {
      isResetting.current = true;
      const equivalent    = midRepOffset + ((distFromMid % oneRepH) + oneRepH) % oneRepH;
      container.scrollTop = equivalent;
      setTimeout(() => { isResetting.current = false; }, 50);
    }
  }, [onRowChange, data.length]);

  const selectedRow = data[centeredIdx];

  return (
    <Box sx={{ height, display: 'flex', bgcolor: T.bg, overflow: 'hidden', visibility: ready ? 'visible' : 'hidden', fontFamily: T.font }}>

      {/* Left: infinite row picker */}
      <Box sx={{ width: ID_W, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${T.sepStrong}` }}>
        <Box sx={{ height: HEADER_H, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: T.surface, borderBottom: `1px solid ${T.sepStrong}`, flexShrink: 0 }}>
          <Typography sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 11, color: T.label3, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            {idCol.label}
          </Typography>
        </Box>

        <Box
          ref={containerRef}
          onScroll={handleScroll}
          sx={{ flex: 1, overflowY: 'scroll', scrollSnapType: 'y mandatory', bgcolor: T.bg, ...noScrollbar }}
        >
          {infiniteRows.map((row, i) => {
            const isCentered = i % data.length === centeredIdx;
            return (
              <Box
                key={i}
                sx={{
                  height: ROW_H,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 1,
                  scrollSnapAlign: 'center',
                  bgcolor: isCentered ? T.surface : 'transparent',
                  borderBottom: `1px solid ${T.sep}`,
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: T.font,
                    fontSize: 12,
                    fontWeight: isCentered ? 600 : 400,
                    color: isCentered ? T.label : T.label3,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                  }}
                >
                  {String(row[idCol.key])}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Right: column cards */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ height: HEADER_H, display: 'flex', alignItems: 'center', px: 2, borderBottom: `1px solid ${T.sepStrong}`, bgcolor: T.surface, flexShrink: 0 }}>
          <Box>
            <Typography sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 15, color: T.label, lineHeight: 1.1 }}>
              {selectedRow ? String(selectedRow[idCol.key]) : ''}
            </Typography>
            <Typography sx={{ fontFamily: T.font, fontSize: 11, color: T.label3, mt: 0.1 }}>
              Details
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1.5, alignContent: 'flex-start', ...noScrollbar }}>
          {dataCols.map((col, idx) => {
            const value  = selectedRow ? String(selectedRow[col.key]) : '';
            const isLong = value.length > 13;
            return (
              <Box
                key={col.key}
                onClick={() => onColumnClick(idx)}
                sx={{
                  width: isLong ? '100%' : 'calc(50% - 6px)',
                  bgcolor: T.surface,
                  borderRadius: '12px',
                  p: 1.5,
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                  overflow: 'hidden',
                  transition: 'transform 0.15s',
                  '&:active': { transform: 'scale(0.97)' },
                }}
              >
                <Typography sx={{ fontFamily: T.font, fontSize: 10, fontWeight: 600, color: T.label3, textTransform: 'uppercase', letterSpacing: 0.7, mb: 0.4 }}>
                  {col.label}
                </Typography>
                <Typography sx={{ fontFamily: T.font, fontSize: 13, fontWeight: 400, color: T.label, lineHeight: 1.4, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {value}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
});

// ─── Table Interactive (pure — no page chrome) ────────────────────────────────
const TableInteractive = ({ data, idCol, dataCols, infiniteRows, T, height }) => {
  const [activeView,     setActiveView]     = useState('columns');
  const [activeColIdx,   setActiveColIdx]   = useState(0);
  const [selectedRowIdx, setSelectedRowIdx] = useState(0);

  const handlePrev        = useCallback(() => setActiveColIdx(i => (i - 1 + dataCols.length) % dataCols.length), [dataCols.length]);
  const handleNext        = useCallback(() => setActiveColIdx(i => (i + 1) % dataCols.length), [dataCols.length]);
  const handleRowClick    = useCallback(i      => { setSelectedRowIdx(i);    setActiveView('row');     }, []);
  const handleColumnClick = useCallback(colIdx => { setActiveColIdx(colIdx); setActiveView('columns'); }, []);

  return activeView === 'columns' ? (
    <ColumnView
      data={data}
      idCol={idCol}
      dataCols={dataCols}
      activeColIdx={activeColIdx}
      onPrev={handlePrev}
      onNext={handleNext}
      selectedRowIdx={selectedRowIdx}
      onRowClick={handleRowClick}
      height={height}
      T={T}
    />
  ) : (
    <RowDetailView
      data={data}
      idCol={idCol}
      dataCols={dataCols}
      infiniteRows={infiniteRows}
      initialRowIdx={selectedRowIdx}
      onRowChange={setSelectedRowIdx}
      onColumnClick={handleColumnClick}
      height={height}
      T={T}
    />
  );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
/**
 * ScrollableTable — a responsive table component.
 *
 * Props:
 *   data        {object[]}  Required. Array of row objects.
 *   columns     {object[]}  Required. Array of { key, label }. First column becomes the sticky ID column.
 *   visibleRows {number}    Optional. Sets component height to (visibleRows × rowHeight + headerHeight).
 *                           Omit (or pass undefined) to fill the parent container (height: '100%').
 *   theme       {string|object} Optional. 'apple' (default) or a partial/full theme object to override tokens.
 *                           Token keys: bg, surface, fill, label, label2, label3, sep, sepStrong, font.
 *   view        {string}    Optional. 'auto' (default) | 'mobile' | 'desktop'.
 *                           'auto' detects window width (≤ 768 px → mobile). Use 'mobile' to force the
 *                           interactive mobile views regardless of screen size (e.g. inside a phone frame).
 */
const ScrollableTable = ({
  data,
  columns,
  visibleRows,
  theme = 'apple',
  view  = 'auto',
}) => {
  const isWindowMobile = useMediaQuery('(max-width: 768px)');
  const T            = resolveTheme(theme);
  const idCol        = columns[0];
  const dataCols     = columns.slice(1);
  const infiniteRows = Array(REPS).fill(data).flat();
  const height       = visibleRows ? visibleRows * ROW_H + HEADER_H : '100%';
  const showMobile   = view === 'mobile' || (view === 'auto' && isWindowMobile);

  if (!showMobile) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: T.bg, fontFamily: T.font }}>
        <DesktopTable data={data} columns={columns} T={T} />
      </Box>
    );
  }

  return (
    <TableInteractive
      data={data}
      idCol={idCol}
      dataCols={dataCols}
      infiniteRows={infiniteRows}
      T={T}
      height={height}
    />
  );
};

export default ScrollableTable;
