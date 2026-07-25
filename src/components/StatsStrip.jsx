import React from 'react';
import { statsStrip } from '../data/content';

export default function StatsStrip() {
  return (
    <section className="stats-section">
      <div className="container-full">
        <div className="stats-grid">
          {statsStrip.map((item, idx) => (
            <div key={idx} className="stats-cell">
              <div className="stats-figure tighten text-signal-red">{item.value}</div>
              <div className="stats-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
