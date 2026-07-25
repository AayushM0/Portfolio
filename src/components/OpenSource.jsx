import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openSource } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function OpenSource() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(['.open-source-quote', '.repo-tag'], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
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
    <section id="open-source" className="work-section" ref={sectionRef}>
      <div className="container-full">
        <header className="work-header">
          <h2 className="section-h2 tighten">Open Source</h2>
          <div className="section-mono-caption">[ CNCF & LFX ]</div>
        </header>

        <div
          className="open-source-quote"
          style={{
            borderLeft: '4px solid var(--signal)',
            paddingLeft: '1.5rem',
            fontFamily: 'var(--font-grotesk)',
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            fontWeight: '700',
            lineHeight: '1.4',
            maxWidth: '42ch',
            marginBottom: '2rem',
            color: 'var(--fg)',
          }}
        >
          {openSource.description}
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--fg-muted)',
              marginBottom: '1rem',
            }}
          >
            Target Repositories
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {openSource.repos.map((repo, idx) => (
              <span
                key={idx}
                className="repo-tag hardshadow-sm"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  backgroundColor: 'var(--bg-base)',
                  color: 'var(--fg)',
                  border: '2px solid var(--border)',
                  padding: '0.5rem 1rem',
                }}
              >
                {repo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
