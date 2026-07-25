import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.skills-chip', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 12,
        duration: 0.3,
        ease: 'power1.out',
        stagger: 0.05,
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="skills" className="work-section" ref={sectionRef}>
      <div className="container-full">
        <header className="work-header">
          <h2 className="section-h2 tighten">Skills</h2>
          <div className="section-mono-caption">[ STACK & TOOLING ]</div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {skills.groups.map((group, index) => (
            <div key={index}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--signal)',
                  marginBottom: '0.75rem',
                }}
              >
                {group.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {group.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="skills-chip"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      backgroundColor: 'var(--bg-base)',
                      color: 'var(--fg)',
                      border: '2px solid var(--border)',
                      padding: '0.5rem 1rem',
                      boxShadow: '3px 3px 0 0 #0a0a0a',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Languages Row */}
          <div style={{ borderTop: '2px solid var(--border)', paddingTop: '1.5rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--fg)',
                marginBottom: '0.75rem',
              }}
            >
              Languages
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {skills.languages.map((lang, langIdx) => (
                <span
                  key={langIdx}
                  className="skills-chip"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    backgroundColor: '#0A0A0A',
                    color: 'var(--fg)',
                    border: '2px solid var(--border)',
                    padding: '0.5rem 1rem',
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
