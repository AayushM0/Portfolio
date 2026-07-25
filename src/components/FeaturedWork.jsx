import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StackedWork from './StackedWork';
import { projects } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FeaturedWork() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.mentions-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="work" className="work-section grain" ref={sectionRef} style={{ padding: '4rem 0 3.5rem' }}>
      <div className="container-full">
        {/* Section Header */}
        <header className="work-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h2 className="section-h2 tighten">Selected work</h2>
            <div className="section-mono-caption" style={{ marginTop: '0.25rem' }}>
              Scroll-Linked Stacking Gallery / 001—006
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--signal-red)',
            }}
          >
            [ SCROLL-LINKED PARALLAX STACK ]
          </div>
        </header>

        {/* Dynamic Row-by-Row Card Stacking Layout */}
        <StackedWork />

        {/* Mentions Container */}
        {projects.mentions && projects.mentions.length > 0 && (
          <div className="mentions-box">
            <h3 className="mentions-h3">[ ALSO / MENTIONS ]</h3>
            <div>
              {projects.mentions.map((mention, idx) => (
                <div key={idx} className="mentions-item">
                  {mention}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
