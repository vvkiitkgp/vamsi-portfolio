import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../config/skills';

/* ─────────────────────────────────────────────────────────────────────────────
   TOKENS
───────────────────────────────────────────────────────────────────────────── */

const FONT =
  "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif";
const EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

/* ─────────────────────────────────────────────────────────────────────────────
   CSS — injected once on mount, cleaned up on unmount
───────────────────────────────────────────────────────────────────────────── */

function buildCSS() {
  return `
    @keyframes su-fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* Blob drift — slow organic movement so glass always has color to refract */
    @keyframes su-drift-1 {
      0%,100% { transform: translate(0px,   0px)  scale(1);    }
      33%     { transform: translate(40px,  -30px) scale(1.06); }
      66%     { transform: translate(-25px,  35px) scale(0.94); }
    }
    @keyframes su-drift-2 {
      0%,100% { transform: translate(0px,  0px)   scale(1);    }
      33%     { transform: translate(-50px, 25px)  scale(1.08); }
      66%     { transform: translate(30px, -40px)  scale(0.93); }
    }
    @keyframes su-drift-3 {
      0%,100% { transform: translate(0px,  0px)   scale(1);    }
      33%     { transform: translate(25px,  50px)  scale(0.96); }
      66%     { transform: translate(-40px,-25px)  scale(1.04); }
    }

    /* Page root — cursor: none replaced by custom cursor */
    .su-root {
      min-height: 100vh;
      background: #000;
      position: relative;
      overflow-x: hidden;
      cursor: none;
    }

    /* Colorful blob layer */
    .su-blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }
    .su-blob-1 {
      width: 640px; height: 640px;
      background: rgba(10, 132, 255, 0.38);
      top: -220px; left: -120px;
      animation: su-drift-1 14s ease-in-out infinite;
    }
    .su-blob-2 {
      width: 520px; height: 520px;
      background: rgba(130, 40, 220, 0.32);
      top: 15%; right: -160px;
      animation: su-drift-2 17s ease-in-out infinite;
    }
    .su-blob-3 {
      width: 580px; height: 580px;
      background: rgba(0, 200, 180, 0.28);
      bottom: -120px; left: 18%;
      animation: su-drift-3 20s ease-in-out infinite;
    }

    /* Scrollable content column (gets scroll-velocity skewY) */
    .su-content {
      position: relative;
      z-index: 1;
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 32px 140px;
      transform-origin: center top;
      will-change: transform;
    }

    /* Back button */
    .su-back {
      position: fixed;
      top: 20px;
      left: 24px;
      z-index: 200;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(40px) saturate(200%);
      -webkit-backdrop-filter: blur(40px) saturate(200%);
      border-radius: 100px;
      color: rgba(255,255,255,0.75);
      font-family: ${FONT};
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.01em;
      padding: 7px 16px 7px 12px;
      cursor: none;
      transition: background 0.2s ${EASING}, color 0.2s ${EASING};
    }
    .su-back:hover {
      background: rgba(255,255,255,0.11);
      color: #fff;
    }

    /* Liquid glass card */
    .su-card {
      position: relative;
      overflow: hidden;
      flex: 1 1 420px;
      max-width: calc((100% - 24px) / 2);
      min-height: 320px;
      background: rgba(255,255,255,0.06);
      border-top: 1px solid rgba(255,255,255,0.5);
      border-right: 1px solid rgba(255,255,255,0.1);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      border-left: 1px solid rgba(255,255,255,0.1);
      border-radius: 28px;
      padding: 56px 64px;
      backdrop-filter: blur(48px) saturate(200%) brightness(1.1);
      -webkit-backdrop-filter: blur(48px) saturate(200%) brightness(1.1);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
      animation: su-fadeInUp 600ms ${EASING} both;
      will-change: transform;
      transition:
        border-color 0.25s ${EASING},
        background   0.25s ${EASING},
        box-shadow   0.25s ${EASING};
    }

    /* Static diagonal highlight — ::before stays put */
    .su-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    /* Lift card children above ::before */
    .su-card > * {
      position: relative;
      z-index: 1;
    }

    /* Moving specular div — overrides the z-index: 1 above, stays behind content */
    .su-card > .su-highlight {
      position: absolute;
      inset: 0;
      border-radius: 17px;
      pointer-events: none;
      z-index: 0;
    }

    .su-card:hover {
      background: rgba(255,255,255,0.09);
      border-top-color: rgba(255,255,255,0.65);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.28),
        0 8px 32px rgba(0,0,0,0.35);
    }

    /* Category eyebrow — starts hidden, JS slides it in from the left */
    .su-cat-label {
      font-family: ${FONT};
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 28px;
      opacity: 0;
      transform: translateX(-12px);
      will-change: opacity, transform;
    }

    /* Skill pill — starts hidden, JS cascades it in with spring bounce */
    .su-pill {
      display: inline-flex;
      align-items: center;
      background: rgba(255,255,255,0.08);
      border-top: 1px solid rgba(255,255,255,0.3);
      border-right: 1px solid rgba(255,255,255,0.15);
      border-bottom: 1px solid rgba(255,255,255,0.15);
      border-left: 1px solid rgba(255,255,255,0.15);
      border-radius: 100px;
      padding: 10px 22px;
      font-size: 15px;
      font-family: ${FONT};
      font-weight: 400;
      letter-spacing: -0.01em;
      color: rgba(255,255,255,0.85);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
      backdrop-filter: blur(10px) saturate(180%);
      -webkit-backdrop-filter: blur(10px) saturate(180%);
      cursor: none;
      white-space: nowrap;
      will-change: transform, opacity;
      /* Start invisible — IntersectionObserver cascade reveals each pill */
      opacity: 0;
      transform: translateY(16px) scale(0.92);
      /* Visual-only transitions; transform is driven by JS */
      transition:
        background   0.2s ${EASING},
        border-color 0.2s ${EASING},
        color        0.2s ${EASING},
        box-shadow   0.2s ${EASING};
    }
    /* Blue accent: pill hover only */
    .su-pill:hover {
      background: rgba(10,132,255,0.15);
      border-top-color: rgba(10,132,255,0.5);
      border-right-color: rgba(10,132,255,0.2);
      border-bottom-color: rgba(10,132,255,0.2);
      border-left-color: rgba(10,132,255,0.2);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 16px rgba(10,132,255,0.15);
      color: #ffffff;
      /* No transform here — JS combines magnetic + hover scale */
    }

    /* Responsive — single column on mobile */
    @media (max-width: 720px) {
      .su-card { flex: 1 1 100%; max-width: 100%; padding: 36px 28px; min-height: 200px; }
    }
  `;
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function SkillsUniverse() {
  const navigate = useNavigate();

  /* ── Refs (no useState — avoids re-renders on every frame) ───────────────── */
  const mouseRef = useRef({ x: -200, y: -200 });
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const ringPosRef = useRef({ x: -200, y: -200 });
  const overPillRef = useRef(false);
  const cardRefs = useRef([]);
  const pillRefs = useRef([]); // [cardIdx][pillIdx] → DOM element
  const highlightRefs = useRef([]); // [cardIdx] → specular div
  const hoveredPills = useRef(new Set());
  const visiblePills = useRef(new WeakSet()); // pills that have been cascaded in
  const contentRef = useRef(null);
  const scrollVel = useRef(0);
  const lastScroll = useRef(0);
  const skewVal = useRef(0);
  const tiltVal = useRef(0);
  const isScrolling = useRef(false); // true only while scroll events are actively firing
  const scrollDir = useRef(0); // +1 down / -1 up — preserved so tilt holds direction
  const scrollStopTimer = useRef(null);
  const rafRef = useRef(null);
  const firstMove = useRef(false);

  /* ── CSS injection ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const tag = document.createElement('style');
    tag.id = 'su-apple-styles';
    tag.textContent = buildCSS();
    document.head.appendChild(tag);
    return () => document.getElementById('su-apple-styles')?.remove();
  }, []);

  /* ── RAF loop: cursor lerp + scroll-skew decay ───────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const { x: rx, y: ry } = ringPosRef.current;

      // Lerp ring toward cursor — creates the trailing glass-bead feel
      const lx = rx + (mx - rx) * 0.12;
      const ly = ry + (my - ry) * 0.12;
      ringPosRef.current = { x: lx, y: ly };

      const overPill = overPillRef.current;
      const dotSize = overPill ? 16 : 8;
      const ringSize = overPill ? 48 : 32;

      if (cursorDotRef.current) {
        const s = cursorDotRef.current.style;
        s.transform = `translate(${mx}px, ${my}px)`;
        s.width = `${dotSize}px`;
        s.height = `${dotSize}px`;
        s.marginLeft = `-${dotSize / 2}px`;
        s.marginTop = `-${dotSize / 2}px`;
      }
      if (cursorRingRef.current) {
        const s = cursorRingRef.current.style;
        s.transform = `translate(${lx}px, ${ly}px)`;
        s.width = `${ringSize}px`;
        s.height = `${ringSize}px`;
        s.marginLeft = `-${ringSize / 2}px`;
        s.marginTop = `-${ringSize / 2}px`;
        s.background = overPill ? 'rgba(255,255,255,0.08)' : 'transparent';
      }

      // Velocity decay — both skew and card tilt read from this each frame
      scrollVel.current *= 0.85;

      // Skew lerp
      skewVal.current += (scrollVel.current * -0.02 - skewVal.current) * 0.1;
      skewVal.current = Math.max(-2, Math.min(2, skewVal.current));
      if (contentRef.current) {
        contentRef.current.style.transform = `skewY(${skewVal.current}deg)`;
      }

      // Scroll-driven card tilt — binary: 45deg while scrolling, lerps back to 0 when stopped
      const tiltTarget = isScrolling.current ? scrollDir.current * 45 : 0;
      const lerpFactor = tiltTarget !== 0 ? 0.22 : 0.1; // fast to tilt, slow graceful return
      tiltVal.current += (tiltTarget - tiltVal.current) * lerpFactor;
      if (!isScrolling.current && Math.abs(tiltVal.current) < 0.1)
        tiltVal.current = 0;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = `perspective(600px) rotateY(${tiltVal.current}deg)`;
        card.style.transition = 'none'; // RAF owns this transform — no CSS transition interference
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Global mousemove: specular + pill magnetic ──────────────────────────── */
  useEffect(() => {
    const onMove = (e) => {
      // Snap ring to cursor on very first move to avoid a sweep from off-screen
      if (!firstMove.current) {
        firstMove.current = true;
        ringPosRef.current = { x: e.clientX, y: e.clientY };
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };

      /* Moving specular highlight -------------------------------------------- */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const hl = highlightRefs.current[i];
        if (!hl) return;
        const inside =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
        if (inside) {
          const px = ((e.clientX - r.left) / r.width) * 100;
          const py = ((e.clientY - r.top) / r.height) * 100;
          hl.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
        } else {
          hl.style.background = 'none';
        }
      });

      /* Pill magnetic attraction -------------------------------------------- */
      pillRefs.current.forEach((cardPills) => {
        if (!cardPills) return;
        cardPills.forEach((pill) => {
          if (!pill) return;
          const r = pill.getBoundingClientRect();
          const px = r.left + r.width / 2;
          const py = r.top + r.height / 2;
          const dx = e.clientX - px;
          const dy = e.clientY - py;
          const dist = Math.hypot(dx, dy);
          const hover = hoveredPills.current.has(pill);
          const scale = hover ? 1.12 : 1;
          const liftY = hover ? -1 : 0;

          if (dist < 80) {
            // Pull pill gently toward cursor
            pill.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px) scale(${scale}) translateY(${liftY}px)`;
            pill.style.transition = 'transform 80ms ease-out';
          } else if (!hover) {
            // Spring back to rest (only if not in hover-scale state)
            const visible = visiblePills.current.has(pill);
            pill.style.transform = visible ? 'translate(0,0) scale(1)' : '';
            pill.style.transition = `transform 300ms ${SPRING}`;
          }
        });
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* ── Scroll tracking — debounced stop detection ─────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const delta = window.scrollY - lastScroll.current;
      scrollVel.current = delta;
      lastScroll.current = window.scrollY;

      // Capture direction only on real movement (ignore 0-delta momentum ticks)
      if (delta !== 0) scrollDir.current = delta > 0 ? 1 : -1;

      // Keep flag hot while scroll events keep firing
      isScrolling.current = true;

      // Debounce: 150ms after the LAST scroll event → declare stopped
      // 150ms handles trackpad inertia which fires events well after finger lifts
      clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => {
        isScrolling.current = false;
      }, 80);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollStopTimer.current);
    };
  }, []);

  /* ── IntersectionObserver: label slide-in + pill spring cascade ───────────── */
  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((card, cardIdx) => {
      if (!card) return;
      const cssDelay = cardIdx * 80; // matches CSS animationDelay on the card

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          // Category label slides in from left (100ms after card starts entering)
          const label = card.querySelector('.su-cat-label');
          setTimeout(() => {
            if (!label) return;
            label.style.transition = `opacity 300ms ease-out, transform 300ms ease-out`;
            label.style.opacity = '1';
            label.style.transform = 'translateX(0)';
          }, cssDelay + 100);

          // Pills cascade in with spring bounce — "popcorn" effect
          card.querySelectorAll('.su-pill').forEach((pill, i) => {
            setTimeout(
              () => {
                pill.style.transition = `opacity 280ms ${SPRING}, transform 280ms ${SPRING}`;
                pill.style.opacity = '1';
                pill.style.transform = 'translate(0,0) scale(1)';
                visiblePills.current.add(pill); // mark so magnetic reset uses correct base
              },
              cssDelay + 600 + i * 35,
            );
          });

          obs.disconnect();
        },
        { threshold: 0.1 },
      );

      obs.observe(card);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Pill hover handlers (track Set, combine with magnetic transform) ─────── */
  const onPillEnter = (cardIdx, pillIdx) => {
    const el = pillRefs.current[cardIdx]?.[pillIdx];
    if (el) hoveredPills.current.add(el);
    overPillRef.current = true;
  };

  const onPillLeave = (cardIdx, pillIdx) => {
    const el = pillRefs.current[cardIdx]?.[pillIdx];
    if (el) {
      hoveredPills.current.delete(el);
      const visible = visiblePills.current.has(el);
      el.style.transform = visible ? 'translate(0,0) scale(1)' : '';
      el.style.transition = `transform 300ms ${SPRING}`;
    }
    overPillRef.current = hoveredPills.current.size > 0;
  };

  /* ── Card mouse-leave: clear specular only (tilt is scroll-driven) ───────── */
  const onCardLeave = (cardIdx) => {
    const hl = highlightRefs.current[cardIdx];
    if (hl) hl.style.background = 'none';
  };

  /* ── Render ───────────────────────────────────────────────────────────────── */
  return (
    <div className="su-root">
      {/* Custom cursor — dot (instant) + ring (lerped) */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          background: '#fff',
          transform: 'translate(-200px, -200px)',
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.35)',
          transform: 'translate(-200px, -200px)',
          transition:
            'width 0.25s ease, height 0.25s ease, background 0.25s ease',
        }}
      />

      {/* Colorful blobs — glass refraction source */}
      <div className="su-blob su-blob-1" />
      <div className="su-blob su-blob-2" />
      <div className="su-blob su-blob-3" />

      {/* Back button */}
      <button className="su-back" onClick={() => navigate('/')}>
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 1L1 6L6 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      {/* su-content gets the scroll-velocity skewY */}
      <div className="su-content" ref={contentRef}>
        {/* Page header */}
        <div
          style={{ textAlign: 'center', paddingTop: 120, paddingBottom: 80 }}
        >
          <h1
            style={{
              fontFamily: FONT,
              fontSize: 'clamp(40px, 5.6vw, 56px)',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.07,
              animation: `su-fadeInUp 600ms ${EASING} both`,
            }}
          >
            Built with.
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 'clamp(17px, 2.2vw, 21px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.5)',
              margin: '16px 0 0',
              letterSpacing: '-0.01em',
              animation: `su-fadeInUp 600ms ${EASING} 80ms both`,
            }}
          >
            The stack behind the work.
          </p>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'center',
          }}
        >
          {CATEGORIES.map((cat, cardIdx) => (
            <div
              key={cat.name}
              className="su-card"
              ref={(el) => {
                cardRefs.current[cardIdx] = el;
              }}
              style={{ animationDelay: `${cardIdx * 80}ms` }}
              onMouseLeave={() => onCardLeave(cardIdx)}
            >
              {/* Moving specular highlight — follows cursor inside the card */}
              <div
                className="su-highlight"
                ref={(el) => {
                  highlightRefs.current[cardIdx] = el;
                }}
              />

              {/* Category eyebrow — JS slides in from left after card enters */}
              <div className="su-cat-label">{cat.name}</div>

              {/* Skill pills — JS spring-cascades these in */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {cat.skills.map((skill, pillIdx) => (
                  <span
                    key={skill}
                    className="su-pill"
                    ref={(el) => {
                      if (!pillRefs.current[cardIdx])
                        pillRefs.current[cardIdx] = [];
                      pillRefs.current[cardIdx][pillIdx] = el;
                    }}
                    onMouseEnter={() => onPillEnter(cardIdx, pillIdx)}
                    onMouseLeave={() => onPillLeave(cardIdx, pillIdx)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
