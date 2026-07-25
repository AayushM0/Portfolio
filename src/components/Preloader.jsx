import React, { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const progressBoxRef = useRef(null);
  const progressBarRef = useRef(null);
  const svgWrapperRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current ? Array.from(svgRef.current.querySelectorAll('path')) : [];

    // Initially hide SVG wrapper & set path strokeDashoffset to full length (hidden stroke)
    if (svgWrapperRef.current) {
      svgWrapperRef.current.style.opacity = '0';
    }

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`; // Hidden initially
    });

    // Master Anime v4 Timeline
    const tl = createTimeline({
      defaults: { ease: 'easeInOutQuad' },
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // ── Phase 1: Fill Centered Loading Bar (0ms -> 1200ms) ──
    tl.add(progressBarRef.current, {
      width: ['0%', '100%'],
      duration: 1200,
      ease: 'inOutCubic',
    })
    // Phase 1 Transition: Fade out Loading Bar (1200ms -> 1500ms)
    .add(progressBoxRef.current, {
      opacity: 0,
      duration: 300,
      ease: 'outQuad',
    })
    // ── Phase 2A: Reveal SVG & Draw Diagonal "AAYUSH MITTAL" (1500ms -> 3000ms) ──
    .add(svgWrapperRef.current, {
      opacity: [0, 1],
      duration: 200,
      ease: 'inOutQuad',
    })
    .add(paths, {
      strokeDashoffset: (el) => [el.getTotalLength(), 0], // Draw in
      duration: 1300,
      delay: stagger(40),
      ease: 'inOutSine',
    })
    // ── Phase 2B: Reverse-Trace Un-draw "AAYUSH MITTAL" (3000ms -> 4300ms) ──
    .add(paths, {
      strokeDashoffset: (el) => [0, el.getTotalLength()], // Un-draw backward
      duration: 1300,
      delay: stagger(40),
      ease: 'inOutSine',
    })
    // ── Phase 3: Drop Curtain Downward Off-Screen to Reveal Hero (4300ms -> 5100ms) ──
    .add(containerRef.current, {
      translateY: ['0%', '100%'],
      duration: 800,
      ease: 'inOutExpo',
    });

    return () => {
      tl.pause();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      aria-label="Application Loading Sequence"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        pointerEvents: 'auto',
        willChange: 'transform',
      }}
    >
      {/* Dead-Center Container for Phase 1 Loader */}
      <div
        ref={progressBoxRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '260px',
            height: '3px',
            backgroundColor: '#222222',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              width: '0%',
              height: '100%',
              backgroundColor: 'var(--signal-red)',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: '800',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--fg-muted)',
            marginTop: '0.875rem',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          SYSTEM INITIALIZING...
        </span>
      </div>

      {/* Phase 2: Diagonal Screen Composition SVG */}
      <div
        ref={svgWrapperRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '2rem',
          zIndex: 3,
          opacity: 0,
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 600"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '90vh',
            overflow: 'visible',
          }}
        >
          <g
            fill="none"
            stroke="var(--signal-red)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* TOP-LEFT REGION: A A Y U S H */}
            {/* A */}
            <path d="M 40 180 L 85 60 L 130 180" />
            <path d="M 62 130 L 108 130" />

            {/* A */}
            <path d="M 145 180 L 190 60 L 235 180" />
            <path d="M 167 130 L 213 130" />

            {/* Y */}
            <path d="M 250 60 L 285 125 L 320 60" />
            <path d="M 285 125 L 285 180" />

            {/* U */}
            <path d="M 335 60 L 335 145 Q 335 180 370 180 Q 405 180 405 145 L 405 60" />

            {/* S */}
            <path d="M 475 85 C 475 60 420 60 420 105 C 420 150 475 150 475 180 C 475 205 420 205 420 170" />

            {/* H */}
            <path d="M 490 60 L 490 180" />
            <path d="M 490 120 L 550 120" />
            <path d="M 550 60 L 550 180" />

            {/* BOTTOM-RIGHT REGION: M I T T A L */}
            {/* M */}
            <path d="M 440 540 L 440 420 L 495 510 L 550 420 L 550 540" />

            {/* I */}
            <path d="M 575 420 L 625 420" />
            <path d="M 600 420 L 600 540" />
            <path d="M 575 540 L 625 540" />

            {/* T */}
            <path d="M 640 420 L 710 420" />
            <path d="M 675 420 L 675 540" />

            {/* T */}
            <path d="M 725 420 L 795 420" />
            <path d="M 760 420 L 760 540" />

            {/* A */}
            <path d="M 810 540 L 850 420 L 890 540" />
            <path d="M 830 490 L 870 490" />

            {/* L */}
            <path d="M 905 420 L 905 540 L 970 540" />
          </g>
        </svg>
      </div>
    </div>
  );
}
