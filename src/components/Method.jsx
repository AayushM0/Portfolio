import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { method } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Method() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.method-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 24,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="method" className="method-section grain" ref={sectionRef}>
      <div className="container-full">
        <header className="method-header">
          <h2 className="section-h2 tighten" style={{ color: 'var(--fg-paper)' }}>
            The method <br className="hidden-sm" /> that ships.
          </h2>
          <div className="section-mono-caption" style={{ color: 'rgba(244, 241, 234, 0.6)' }}>
            Process / 01—04
          </div>
        </header>

        <div className="method-grid">
          {method.map((item, idx) => (
            <div
              key={item.step}
              className={`method-card ${idx === 0 ? 'method-card--first' : ''}`}
            >
              <div className="method-step">{item.step}</div>
              <h3 className="method-title tighten">{item.title}</h3>
              <p className="method-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
