import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Video-Accurate Card Sequence (Matching HAOQI 0:06–0:09 Layout)
const videoAccurateCards = [
  // Row 1: Hero Lead Card (LACE Wide)
  {
    id: 'row1-lace-hero',
    title: 'LACE · Core Architecture',
    tag: 'AI SYSTEM',
    year: '2026',
    hook: 'Local AI Context Engine — Privacy-first memory layer for AI coding assistants.',
    link: 'https://github.com/AayushM0/LACE',
    row: 1,
    left: '16%',
    width: '68%',
    isHero: true,
  },

  // Row 2: Dual Split (GramConnect Left + Jindal Hongkong Right)
  {
    id: 'row2-gram',
    title: 'GramConnect · Civic Protocol',
    tag: 'FULL-STACK',
    year: '2025',
    hook: 'On-chain civic grievance platform connecting citizens to municipal corporations.',
    link: 'https://github.com/AayushM0/GramConnect',
    row: 2,
    left: '0%',
    width: '48%',
    isHero: false,
  },
  {
    id: 'row2-jindal',
    title: 'Jindal Hongkong · Trade Platform',
    tag: 'CLIENT PROJECT',
    year: '2025',
    hook: 'High-performance trading interface for global steel & commodity shipments.',
    link: null,
    row: 2,
    left: '52%',
    width: '48%',
    isHero: false,
  },

  // Row 3: Dual Split (DeployIT Left + Yt Shorts Bot Right)
  {
    id: 'row3-deploy',
    title: 'DeployIT · CLI Deployer',
    tag: 'TOOLING',
    year: '2025',
    hook: 'Terminal deployment tool for single-command web application builds.',
    link: 'https://github.com/AayushM0/DeployIt-CLI',
    row: 3,
    left: '0%',
    width: '48%',
    isHero: false,
  },
  {
    id: 'row3-yt',
    title: 'Yt Shorts Bot · Groq Scripting',
    tag: 'AUTOMATION',
    year: '2025',
    hook: 'Multi-channel automated short-form video generation using LLM scripting.',
    link: null,
    row: 3,
    left: '52%',
    width: '48%',
    isHero: false,
  },

  // Row 4: Triplet Deep Dives (LACE MCP + GramConnect AI + DeployIT Pipeline)
  {
    id: 'row4-lace-mcp',
    title: 'LACE · MCP Protocol',
    tag: 'MCP SERVER',
    year: '2026',
    hook: 'Model Context Protocol server for zero-copy resource & prompt retrieval.',
    link: 'https://github.com/AayushM0/LACE',
    row: 4,
    left: '0%',
    width: '31%',
    isHero: false,
  },
  {
    id: 'row4-gram-ai',
    title: 'GramConnect · AI Verification',
    tag: 'AI INTAKE',
    year: '2025',
    hook: 'Automated AI image recognition & SLA escalation for civic complaints.',
    link: 'https://github.com/AayushM0/GramConnect',
    row: 4,
    left: '34.5%',
    width: '31%',
    isHero: false,
  },
  {
    id: 'row4-deploy-pipe',
    title: 'DeployIT · Pipeline Engine',
    tag: 'CLI PIPELINE',
    year: '2025',
    hook: 'Automated artifact packaging, bundle optimization, and edge syncing.',
    link: 'https://github.com/AayushM0/DeployIt-CLI',
    row: 4,
    left: '69%',
    width: '31%',
    isHero: false,
  },
];

export default function VerticalCurvedWork() {
  const stageRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stage = stageRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!stage || cards.length === 0) return;

    // Pinning Timeline: Pin stage for 300% scroll distance with fluid 1.2s inertia scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1.2, // Fluid inertia smoothing
        anticipatePin: 1,
      },
    });

    // Group cards by row to stream rows smoothly together
    const rowGroups = [1, 2, 3, 4];

    rowGroups.forEach((rowNum, rowIdx) => {
      const rowCards = cards.filter((card) => card.dataset.row === String(rowNum));
      const startProgress = rowIdx * 0.22; // Sequential row stream timing
      const duration = 0.45;

      rowCards.forEach((card) => {
        // Initial state at bottom depth of 3D tube
        gsap.set(card, {
          opacity: 0,
          y: '140%',
          rotateX: 35,
          translateZ: -200,
          scale: 0.9,
          transformPerspective: 1000,
        });

        // Fluid animation curve: bottom depth -> focal plane center -> top depth exit
        tl.to(
          card,
          {
            opacity: 1,
            y: '0%',
            rotateX: 0,
            translateZ: 0,
            scale: 1,
            duration: duration / 2,
            ease: 'sine.out',
          },
          startProgress
        ).to(
          card,
          {
            opacity: 0.15,
            y: '-140%',
            rotateX: -35,
            translateZ: -200,
            scale: 0.9,
            duration: duration / 2,
            ease: 'sine.in',
          },
          startProgress + duration / 2
        );
      });
    });

    return () => {
      tl.kill();
    };
  }, { scope: stageRef });

  return (
    <div
      ref={stageRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#1A1A18',
        overflow: 'hidden',
      }}
    >
      {/* Pinned Heading Container with top clearance for sticky header */}
      <div
        style={{
          position: 'absolute',
          top: '84px', // Clears sticky nav header (68px) with generous gap
          left: '1.5rem',
          right: '1.5rem',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--signal-red)',
            marginBottom: '0.5rem',
          }}
        >
          <span>[ PINNED 3D TUBE GALLERY ]</span>
          <span>VIDEO-ACCURATE ROW FLOW</span>
        </div>
        <h2
          className="tighten-xl"
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: '900',
            textTransform: 'uppercase',
            fontSize: 'clamp(2.25rem, 6.5vw, 5.5rem)',
            lineHeight: '0.88',
            color: 'var(--fg)',
          }}
        >
          Selected <span className="text-signal-red">Work</span>
        </h2>
      </div>

      {/* 3D Cylindrical Tunnel Stage */}
      <div
        style={{
          position: 'absolute',
          top: '220px',
          bottom: 0,
          left: '1.5rem',
          right: '1.5rem',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
        }}
      >
        {videoAccurateCards.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            data-row={card.row}
            className="hardshadow-sm"
            style={{
              position: 'absolute',
              top: '10%',
              left: card.left,
              width: card.width,
              backgroundColor: '#0A0A0A',
              border: '2px solid var(--border)',
              padding: card.isHero ? '1.5rem' : '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
              zIndex: 10 + card.row,
            }}
          >
            {/* Top Tag & Year Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                marginBottom: '0.875rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              <span
                style={{
                  backgroundColor: 'var(--signal-red)',
                  color: 'var(--fg-on-red)',
                  padding: '0.25rem 0.5rem',
                  border: '1px solid #0a0a0a',
                }}
              >
                [ {card.tag} ]
              </span>
              <span style={{ color: 'var(--fg-muted)' }}>{card.year}</span>
            </div>

            {/* Empty Image Placeholder Frame (per prompt requirement) */}
            <div
              style={{
                width: '100%',
                aspectRatio: card.isHero ? '21 / 9' : '16 / 10',
                backgroundColor: '#141414',
                border: '2px solid var(--border)',
                marginBottom: '0.875rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                backgroundImage:
                  'repeating-linear-gradient(45deg, #181818 0, #181818 10px, #141414 10px, #141414 20px)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: '700',
                  color: 'var(--fg-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  border: '1px dashed var(--border)',
                  padding: '0.375rem 0.75rem',
                  backgroundColor: '#0A0A0A',
                }}
              >
                IMAGE PLACEHOLDER
              </div>
            </div>

            {/* Bottom Meta Info */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-grotesk)',
                  fontWeight: '900',
                  fontSize: card.isHero ? '1.75rem' : '1.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  color: 'var(--fg)',
                  lineHeight: '1.05',
                  marginBottom: '0.375rem',
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  lineHeight: '1.45',
                  color: 'var(--fg-muted)',
                  marginBottom: '0.625rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {card.hook}
              </p>

              {card.link && (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--signal-red)',
                  }}
                >
                  Explore Project ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
