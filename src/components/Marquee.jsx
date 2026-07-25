import React from 'react';

const marqueeItems = [
  "LACE",
  "GramConnect",
  "DeployIT",
  "Vite 8",
  "React 19",
  "GSAP",
  "Node.js",
  "Python",
  "MCP",
  "FastAPI",
  "MongoDB",
  "Tailwind CSS",
];

export default function Marquee() {
  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {/* Track Group 1 */}
        <div className="marquee-group">
          {marqueeItems.map((item, idx) => (
            <div key={`g1-${idx}`} className="marquee-item">
              <span>{item}</span>
              <span className="text-signal-red">✳</span>
            </div>
          ))}
        </div>

        {/* Track Group 2 (Duplicate for Seamless Loop) */}
        <div className="marquee-group" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <div key={`g2-${idx}`} className="marquee-item">
              <span>{item}</span>
              <span className="text-signal-red">✳</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
