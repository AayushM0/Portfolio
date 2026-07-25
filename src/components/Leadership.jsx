import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { leadership } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Leadership() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.leadership-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power1.out',
        stagger: 0.1,
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="leadership" className="work-section" ref={sectionRef}>
      <div className="container-full">
        <header className="work-header">
          <h2 className="section-h2 tighten">Leadership & Community</h2>
          <div className="section-mono-caption">[ INITIATIVES ]</div>
        </header>

        <div className="method-grid">
          {leadership.map((item, index) => (
            <div
              key={index}
              className="leadership-card hardshadow-sm"
              style={{
                backgroundColor: 'var(--bg-base)',
                border: '2px solid var(--border)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--signal)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.period}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-grotesk)',
                    fontWeight: '900',
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1',
                    color: 'var(--fg)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.role}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: 'var(--fg-muted)',
                    marginBottom: '1rem',
                  }}
                >
                  {item.org}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--fg-muted)',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
