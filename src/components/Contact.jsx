import React from 'react';
import { siteConfig } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container-full">
        <div className="contact-grid">
          {/* Left Block */}
          <div>
            <div className="contact-eyebrow">[ START A PROJECT ]</div>
            <h2 className="contact-headline tighten-xl">
              Let's ship something loud.
            </h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="contact-email-link link-underline"
            >
              <span>{siteConfig.email}</span>
              <span>↗</span>
            </a>
          </div>

          {/* Right Info Box (Location & Status) */}
          <div className="contact-info-grid hardshadow">
            <div className="contact-info-cell" style={{ borderBottom: 'none' }}>
              <div className="info-cell-label">LOCATION</div>
              <div className="info-cell-value">{siteConfig.location}</div>
            </div>
            <div className="contact-info-cell" style={{ borderBottom: 'none' }}>
              <div className="info-cell-label">AVAILABILITY</div>
              <div className="info-cell-value" style={{ color: 'var(--signal-lime)' }}>
                {siteConfig.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
