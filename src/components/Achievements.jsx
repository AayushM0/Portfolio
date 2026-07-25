import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.achievement-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: 'power1.out',
        stagger: 0.1,
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="achievements" className="work-section" ref={sectionRef}>
      <div className="container-full">
        <header className="work-header">
          <h2 className="section-h2 tighten">Achievements</h2>
          <div className="section-mono-caption">[ RECOGNITION ]</div>
        </header>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="achievement-card hardshadow-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'var(--bg-base)',
                color: 'var(--fg)',
                border: '2px solid var(--border)',
                padding: '0.875rem 1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <span className="text-signal">★</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
