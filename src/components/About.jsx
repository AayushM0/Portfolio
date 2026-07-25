import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(['.about-bio p', '.timeline-item'], {
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
    <section id="about" className="work-section" ref={sectionRef}>
      <div className="container-full">
        <header className="work-header">
          <h2 className="section-h2 tighten">About</h2>
          <div className="section-mono-caption">[ BACKGROUND ]</div>
        </header>

        <div className="hero-lower-band" style={{ borderTop: '2px solid var(--border)', marginTop: 0 }}>
          {/* Left Column Bio */}
          <div className="hero-lower-left about-bio">
            {about.bio.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  marginBottom: '1.25rem',
                  color: 'var(--fg)',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column Timeline */}
          <div className="hero-lower-right">
            <div
              style={{
                borderLeft: '2px solid var(--border)',
                paddingLeft: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {about.timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div
                    style={{
                      fontFamily: 'var(--font-grotesk)',
                      fontWeight: '800',
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      color: 'var(--fg)',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--fg-muted)',
                      marginTop: '0.25rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
