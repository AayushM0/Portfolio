import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/content';

gsap.registerPlugin(useGSAP);

export default function CurvedMarquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  // Duplicate the project list 3 times to create a seamless infinite marquee
  const marqueeProjects = [
    ...projects.lead,
    ...projects.lead,
    ...projects.lead,
  ];

  useGSAP(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!container || !track || cards.length === 0) return;

    // Linear horizontal marquee animation speed (px per second)
    const speed = 70; // moderate lazy scrolling gallery speed
    let xPos = 0;

    // Total width of one set of cards
    const cardWidth = 380; // card width + gap
    const totalSetWidth = projects.lead.length * cardWidth;

    const tickHandler = (_, deltaTime) => {
      // Delta time in seconds
      const deltaSec = deltaTime / 1000;
      xPos -= speed * deltaSec;

      // Wrap xPos infinitely
      if (xPos <= -totalSetWidth) {
        xPos += totalSetWidth;
      }

      // Move horizontal track
      gsap.set(track, { x: xPos });

      // Compute per-card vertical arc offset based on container viewport bounds
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width || window.innerWidth;
      const amplitude = 60; // px dip in the center

      cards.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        
        // Calculate normalized position t from 0 (left edge of container) to 1 (right edge)
        const cardCenter = cardRect.left + cardRect.width / 2;
        const t = (cardCenter - containerRect.left) / containerWidth;

        // Apply arc formula: dips in middle (t = 0.5), high at edges (t = 0 or 1)
        if (t >= -0.2 && t <= 1.2) {
          const yOffset = amplitude * Math.sin(Math.max(0, Math.min(1, t)) * Math.PI);
          gsap.set(card, { y: yOffset });
        }
      });
    };

    gsap.ticker.add(tickHandler);

    return () => {
      gsap.ticker.remove(tickHandler);
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '4rem 0 6rem 0',
        userSelect: 'none',
      }}
    >
      {/* Horizontal Scrolling Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '2rem',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {marqueeProjects.map((project, idx) => (
          <div
            key={`${project.id || idx}-${idx}`}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="hardshadow"
            style={{
              width: '350px',
              flexShrink: 0,
              backgroundColor: '#0A0A0A',
              border: '2px solid var(--border)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              position: 'relative',
              willChange: 'transform',
            }}
          >
            {/* Top Tag Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                marginBottom: '1rem',
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
                [ {project.tag || 'PROJECT'} ]
              </span>
              <span style={{ color: 'var(--fg-muted)' }}>{project.year}</span>
            </div>

            {/* Empty Image Placeholder Frame (per user request) */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 10',
                backgroundColor: '#141414',
                border: '2px solid var(--border)',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                backgroundImage: 'repeating-linear-gradient(45deg, #181818 0, #181818 10px, #141414 10px, #141414 20px)',
              }}
            >
              {/* Empty Pic Placeholder Badge */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
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

            {/* Bottom Info: Title & About */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justify: 'space-between',
                  gap: '0.5rem',
                  marginBottom: '0.375rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-grotesk)',
                    fontWeight: '900',
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.04em',
                    color: 'var(--fg)',
                    lineHeight: '1.1',
                  }}
                >
                  {project.title}
                </h3>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  lineHeight: '1.5',
                  color: 'var(--fg-muted)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {project.hook}
              </p>

              {project.link && (
                <a
                  href={project.link}
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
                    marginTop: '0.75rem',
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
