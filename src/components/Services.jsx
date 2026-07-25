import React from 'react';
import { services } from '../data/content';

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container-full">
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
          <h2 className="section-h2 tighten">What I Do</h2>
          <div className="section-mono-caption">
            Core Capabilities & Deliverables
          </div>
        </div>

        {/* Invert-on-hover Services List */}
        <div className="services-list">
          {services.map((item) => (
            <div key={item.index} className="services-row">
              <div className="services-index">/ {item.index}</div>
              <div>
                <h3 className="services-title tighten">{item.title}</h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--signal-red)',
                    marginTop: '0.5rem',
                  }}
                >
                  [ {item.highlight} ]
                </div>
              </div>
              <p className="services-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
