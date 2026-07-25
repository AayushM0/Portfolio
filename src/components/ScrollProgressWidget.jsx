import React, { useState, useEffect } from 'react';
import { lenisInstance } from '../App';

const TICK_COUNT = 36;

export default function ScrollProgressWidget() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollPercent(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate which tick is active (0 to TICK_COUNT - 1)
  const activeTickIndex = Math.min(
    TICK_COUNT - 1,
    Math.floor((scrollPercent / 100) * TICK_COUNT)
  );

  // Click on tick bar to jump scroll to that location
  const handleBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));
    const targetY = ratio * (document.documentElement.scrollHeight - window.innerHeight);

    if (lenisInstance) {
      lenisInstance.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="scroll-progress-widget hardshadow-sm"
      aria-label="Scroll Progress Indicator"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 90,
        backgroundColor: '#1E1E1C',
        border: '2px solid var(--border)',
        borderRadius: '9999px',
        padding: '0.625rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
      }}
      onClick={handleBarClick}
    >
      {/* Scroll Percentage Label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: '800',
          color: 'var(--fg)',
          minWidth: '28px',
          letterSpacing: '0.05em',
        }}
      >
        {Math.round(scrollPercent)}%
      </span>

      {/* Tick Marks Ruler */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          height: '20px',
        }}
      >
        {Array.from({ length: TICK_COUNT }).map((_, idx) => {
          const isActive = idx === activeTickIndex;
          const isPassed = idx < activeTickIndex;
          const isMajor = idx % 5 === 0;

          return (
            <span
              key={idx}
              style={{
                display: 'block',
                width: isActive ? '3px' : '2px',
                height: isMajor ? '16px' : '10px',
                borderRadius: '1px',
                backgroundColor: isActive
                  ? '#e5341f'
                  : isPassed
                  ? 'rgba(245, 243, 238, 0.4)'
                  : 'rgba(245, 243, 238, 0.15)',
                boxShadow: isActive ? '0 0 8px #e5341f, 0 0 2px #e5341f' : 'none',
                transition: 'background-color 0.1s ease, height 0.15s ease, transform 0.15s ease',
                transform: isActive ? 'scaleY(1.2)' : 'scaleY(1)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
