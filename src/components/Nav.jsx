import React, { useState } from 'react';
import { siteConfig } from '../data/content';
import { lenisInstance } from '../App';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    setIsOpen(false);
    if (lenisInstance) {
      lenisInstance.scrollTo(target);
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Activity', href: '#github-activity' },
    { name: 'Services', href: '#services' },
    { name: 'Method', href: '#method' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Accent Tape */}
      <div className="top-tape">
        <div className="container-full top-tape__inner">
          <div className="top-tape__left">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>{siteConfig.status}</span>
          </div>
          <div className="top-tape__right hidden-sm">
            Full-Stack & AI Tooling · No Templates
          </div>
        </div>
      </div>

      {/* Sticky Nav Header */}
      <header className="header-nav">
        <div className="container-full header-nav__inner">
          {/* Left Brand Lockup */}
          <a
            href="#top"
            className="brand-lockup"
            onClick={(e) => handleSmoothScroll(e, 'body')}
          >
            <div className="brand-monogram">A</div>
            <span className="brand-wordmark">
              AAYUSH MITTAL<span className="text-signal-red">®</span>
            </span>
          </a>

          {/* Center Links */}
          <nav className="nav-menu">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="link-underline"
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="nav-cta"
            >
              Start a project
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className={`mobile-hamburger ${isOpen ? 'mobile-hamburger--open' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isOpen ? 'mobile-menu-overlay--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="link-underline"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a
            href={siteConfig.resumePath}
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 'fit-content', marginTop: '1rem' }}
          >
            View Resume ↗
          </a>
        </div>
      </header>
    </>
  );
}
