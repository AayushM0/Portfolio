import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// 3 Dynamic Rows Configuration (No Duplicate Projects)
const rowData = [
  // Row 1: 1 Full-Width Card (100%)
  {
    rowId: 'row-1',
    cards: [
      {
        id: 'lace-main',
        title: 'LACE · Local AI Context Engine',
        tag: 'AI SYSTEM',
        year: '2026',
        hook: 'Privacy-first local memory layer for AI coding assistants. Eliminates ~80% manual context re-entry via auto-extraction.',
        link: 'https://github.com/AayushM0',
        bgColor: 'var(--signal-red)',
        textColor: 'var(--fg-on-red)',
        tagBg: '#0A0A0A',
        tagColor: 'var(--fg)',
        aspectRatio: '21 / 9',
      },
    ],
  },

  // Row 2: 2 Split Cards (50 / 50)
  {
    rowId: 'row-2',
    cards: [
      {
        id: 'gramconnect',
        title: 'GramConnect · Civic Protocol',
        tag: 'FULL-STACK',
        year: '2025',
        hook: 'On-chain civic grievance platform connecting citizens to municipal corporations with automated AI intake verification.',
        link: 'https://github.com/AayushM0/GramConnect-TeamDaps-Sathack',
        bgColor: '#141414',
        textColor: 'var(--fg)',
        tagBg: 'var(--signal-red)',
        tagColor: 'var(--fg-on-red)',
        aspectRatio: '16 / 10',
      },
      {
        id: 'frontend-showcase',
        title: 'Frontend Design Showcase',
        tag: 'CLIENT PROJECT',
        year: '2025',
        hook: 'A full design system and motion-driven website — custom navy-and-gold identity brought to life with scroll-triggered animation.',
        link: null,
        bgColor: '#0A0A0A',
        textColor: 'var(--fg)',
        tagBg: 'var(--signal-red)',
        tagColor: 'var(--fg-on-red)',
        aspectRatio: '16 / 10',
      },
    ],
  },

  // Row 3: 2 Split Cards (50 / 50)
  {
    rowId: 'row-3',
    cards: [
      {
        id: 'deployit',
        title: 'DeployIT · CLI Deployer',
        tag: 'TOOLING',
        year: '2025',
        hook: 'Terminal deployment tool for single-command web application builds.',
        link: '#',
        bgColor: '#141414',
        textColor: 'var(--fg)',
        tagBg: 'var(--signal-red)',
        tagColor: 'var(--fg-on-red)',
        aspectRatio: '16 / 10',
      },
      {
        id: 'commercial-frontend',
        title: 'Commercial Frontend Project',
        tag: 'CLIENT PROJECT',
        year: '2026',
        hook: 'A modern, high-performance commercial website — mobile-first, with lazy-loaded routes and a clean, production-grade interface.',
        link: null,
        bgColor: '#0A0A0A',
        textColor: 'var(--fg)',
        tagBg: 'var(--signal-red)',
        tagColor: 'var(--fg-on-red)',
        aspectRatio: '16 / 10',
      },
    ],
  },
];

export default function StackedWork() {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);

  useGSAP(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rows = rowRefs.current.filter(Boolean);

    rows.forEach((rowEl) => {
      if (!rowEl) return;

      ScrollTrigger.create({
        trigger: rowEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress; // 0 (enters bottom) -> 0.5 (center) -> 1 (exits top)

          let scale, y;
          if (p <= 0.5) {
            // Incoming: scale 0.85 -> 1.0, y 120px -> 0px
            const localP = p / 0.5;
            scale = gsap.utils.interpolate(0.85, 1.0, localP);
            y = gsap.utils.interpolate(120, 0, localP);
          } else {
            // Outgoing Stacking: scale 1.0 -> 0.90, y 0px -> -60px (parallax stacking)
            const localP = (p - 0.5) / 0.5;
            scale = gsap.utils.interpolate(1.0, 0.9, localP);
            y = gsap.utils.interpolate(0, -60, localP);
          }

          gsap.set(rowEl, {
            scale: scale,
            y: y,
            transformOrigin: 'center center',
            willChange: 'transform',
          });
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '2rem 0 5rem 0',
      }}
    >
      {/* Dynamic Rows Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {rowData.map((row, rIdx) => (
          <div
            key={row.rowId}
            ref={(el) => (rowRefs.current[rIdx] = el)}
            style={{
              display: 'grid',
              gridTemplateColumns:
                row.cards.length === 1
                  ? '1fr'
                  : 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              width: '100%',
              willChange: 'transform',
            }}
          >
            {row.cards.map((card) => (
              <div
                key={card.id}
                className="hardshadow-sm"
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  border: '2px solid var(--border)',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Top Badge & Year Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    marginBottom: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: card.tagBg,
                      color: card.tagColor,
                      padding: '0.25rem 0.625rem',
                      border: '1px solid #0a0a0a',
                      borderRadius: '0.5rem',
                    }}
                  >
                    [ {card.tag} ]
                  </span>
                  <span style={{ opacity: 0.8 }}>{card.year}</span>
                </div>

                {/* Empty Image Placeholder Frame */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: card.aspectRatio,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '1.25rem',
                    marginBottom: '1.25rem',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 10px, transparent 10px, transparent 20px)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: '700',
                      opacity: 0.7,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      border: '1px dashed rgba(255, 255, 255, 0.3)',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    IMAGE PLACEHOLDER
                  </div>
                </div>

                {/* Interior Elements */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-grotesk)',
                      fontWeight: '900',
                      fontSize: row.cards.length === 1 ? '2.25rem' : '1.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.03em',
                      lineHeight: '1.05',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      lineHeight: '1.55',
                      opacity: 0.85,
                      marginBottom: '1rem',
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
                        gap: '0.375rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: card.bgColor === 'var(--signal-red)' ? '#ffffff' : 'var(--signal-red)',
                      }}
                    >
                      Explore Project ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
