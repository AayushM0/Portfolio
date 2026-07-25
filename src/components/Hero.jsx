import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { siteConfig, heroData } from '../data/content';
import { lenisInstance } from '../App';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();

      tl.fromTo('.hero-headline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(['.hero-meta-row', '.hero-blurb', '.hero-cta-group', '.hero-lower-right'],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
        0.2
      );
    });
  }, { scope: containerRef });

  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo(target);
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-section grain" ref={containerRef}>
      <div className="container-full">
        {/* Meta Row */}
        <div className="hero-meta-row">
          <div>
            <span className="text-signal-red">✳</span> Independent Design & Engineering Practice
          </div>
          <div>Est. 2024 / Worldwide</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="pulse-dot"></span>
            <span>{heroData.metaRow}</span>
          </div>
        </div>

        {/* Giant Headline */}
        <h1 className="hero-headline tighten-xl">
          Work that <span className="text-signal-red">refuses</span> to blend in.
        </h1>

        {/* Lower Band */}
        <div className="hero-lower-band">
          {/* Left 7-Col */}
          <div className="hero-lower-left">
            <div className="eyebrow-red">[ WHAT I MAKE ]</div>
            <p className="hero-blurb tighten">
              Full-stack builder crafting high-fidelity web products, AI context tooling, and neo-brutalist interfaces that reject boilerplate defaults.
            </p>
            <div className="hero-cta-group">
              <a
                href="#work"
                className="btn-solid-ink"
                onClick={(e) => handleSmoothScroll(e, '#work')}
              >
                See selected work ↗
              </a>
              <a
                href="#services"
                className="btn-ghost-ink"
                onClick={(e) => handleSmoothScroll(e, '#services')}
              >
                What I do
              </a>
            </div>
          </div>

          {/* Right 5-Col */}
          <div className="hero-lower-right">
            {/* Canvas Block Artwork with Red Hard Shadow */}
            <div className="hero-canvas-block hardshadow-red">
              <div className="hero-canvas-art"></div>
              <div className="hero-canvas-label-top">FIG.01 / CANVAS</div>
              <div
                className="hero-canvas-tag-bottom"
                style={{ backgroundColor: 'var(--signal-red)', color: 'var(--fg-on-red)' }}
              >
                LIVE PREVIEW
              </div>
            </div>

            {/* 2-Cell Stat Pair */}
            <div className="hero-stat-pair">
              {heroData.statPair.map((stat, idx) => (
                <div key={idx} className="hero-stat-cell">
                  <div className="hero-stat-num tighten text-signal-red">{stat.value}</div>
                  <div className="hero-stat-desc">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
