import React from 'react';

export default function ProjectCard({ id, title, hook, stack, outcomes, link, note, isLead, category, year, artClass }) {
  return (
    <article className={`work-card ${isLead ? 'work-card--wide hardshadow' : 'work-card--square hardshadow-sm'} ${artClass || 'card-art-lace'} grain`}>
      <div className="card-content-overlay">
        {/* Top Meta Row */}
        <div className="card-top-row">
          <span>{id || '001'}</span>
          {isLead && <span className="card-featured-tag">Featured</span>}
        </div>

        {/* Center Title */}
        <div>
          <h3 className="card-title-lg tighten">{title}</h3>
          <p className="card-sub-mono">{hook}</p>
        </div>

        {/* Bottom Meta Row */}
        <div>
          <div className="card-bottom-meta">
            <span>{category || stack?.slice(0, 2).join(' · ') || 'System Design'}</span>
            <span>{year || '2026'}</span>
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginTop: '0.5rem',
                color: 'var(--fg-paper)',
              }}
            >
              View Repository ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
