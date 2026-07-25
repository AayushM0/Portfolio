import React from 'react';
import { siteConfig } from '../data/content';
import { lenisInstance } from '../App';

export default function Footer() {
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
    <footer className="footer">
      <div className="container-full">
        <div className="footer-top">
          {/* Giant Wordmark */}
          <div className="footer-wordmark tighten">
            {siteConfig.name}<span className="text-signal-red">®</span>
          </div>

          {/* Nav Links */}
          <nav className="footer-nav">
            <a href="#work" className="link-underline" onClick={(e) => handleSmoothScroll(e, '#work')}>Work</a>
            <a href="#github-activity" className="link-underline" onClick={(e) => handleSmoothScroll(e, '#github-activity')}>Activity</a>
            <a href="#services" className="link-underline" onClick={(e) => handleSmoothScroll(e, '#services')}>Services</a>
            <a href="#method" className="link-underline" onClick={(e) => handleSmoothScroll(e, '#method')}>Method</a>
            <a href="#about" className="link-underline" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
            <a href="#contact" className="link-underline" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
          </nav>
        </div>

        {/* Legal Row */}
        <div className="footer-legal-row">
          <div>© {new Date().getFullYear()} AAYUSH MITTAL STUDIO — INDEPENDENT PRACTICE</div>
          <div>BUILT LOUD. NO TEMPLATES.</div>
        </div>
      </div>
    </footer>
  );
}
