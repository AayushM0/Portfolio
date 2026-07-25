import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ROWS = 7;
const COLS = 52;

const LETTER_MAP = {
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  S: [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  H: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
};

function generatePixelArtGrid() {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  const word = ['A', 'A', 'Y', 'U', 'S', 'H'];
  const startCol = 11;
  let currentCol = startCol;

  word.forEach((char) => {
    const pattern = LETTER_MAP[char];
    if (!pattern) return;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < 4; c++) {
        if (pattern[r][c] === 1) {
          grid[r][currentCol + c] = { intensity: 4, count: 'Pixel Art ("AAYUSH")', date: '' };
        }
      }
    }
    currentCol += 5;
  });

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!grid[r][c] || grid[r][c] === 0) {
        const seed = (r * 52 + c * 17) % 10;
        const intensity = seed === 0 ? 1 : seed <= 2 ? 2 : seed === 3 ? 3 : 0;
        grid[r][c] = { intensity, count: `${intensity * 3} contributions`, date: '' };
      }
    }
  }

  return grid;
}

const pixelArtGrid = generatePixelArtGrid();
const dayLabels = ['Mon', '', 'Wed', '', 'Fri', ''];

export default function GitHubMatrix() {
  const sectionRef = useRef(null);
  const [viewMode, setViewMode] = useState('live');
  const [liveGrid, setLiveGrid] = useState(null);
  const [totalCommits, setTotalCommits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    async function fetchLiveContributions() {
      try {
        setLoading(true);
        const res = await fetch('https://github-contributions.vercel.app/api/v1/AayushM0');
        if (!res.ok) throw new Error('API response not ok');
        const data = await res.json();

        const total = data.years?.reduce((sum, y) => sum + (y.total || 0), 0) || 0;
        setTotalCommits(total);

        const recentContribs = data.contributions?.slice(-364) || [];

        const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
        recentContribs.forEach((item, index) => {
          const col = Math.floor(index / 7);
          const row = index % 7;
          if (col < COLS && row < ROWS) {
            grid[row][col] = {
              intensity: parseInt(item.intensity, 10) || (item.count > 0 ? 1 : 0),
              count: item.count,
              date: item.date,
            };
          }
        });

        setLiveGrid(grid);
      } catch (err) {
        console.warn('Could not fetch live GitHub data, using pixel matrix fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveContributions();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.matrix-dot', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.3,
        duration: 0.3,
        ease: 'power2.out',
        stagger: {
          grid: [ROWS, COLS],
          from: 'left',
          amount: 0.6,
        },
      });
    });
  }, { scope: sectionRef });

  const activeGrid = (viewMode === 'live' && liveGrid) ? liveGrid : pixelArtGrid;

  // Signal Red Primary Heatmap
  const getDotStyle = (intensity) => {
    switch (intensity) {
      case 4:
        return { backgroundColor: '#e5341f', boxShadow: '0 0 8px rgba(229, 52, 31, 0.7)' }; // Signal Red Peak
      case 3:
        return { backgroundColor: '#B82816' };
      case 2:
        return { backgroundColor: '#781A0F' };
      case 1:
        return { backgroundColor: '#420E08' };
      default:
        return { backgroundColor: '#20201D' }; // Base Dark Dot
    }
  };

  return (
    <section id="github-activity" className="work-section grain" ref={sectionRef}>
      <div className="container-full">
        <header className="work-header">
          <div>
            <h2 className="section-h2 tighten">GitHub Activity</h2>
            <div className="section-mono-caption" style={{ marginTop: '0.25rem' }}>
              {totalCommits !== null ? `${totalCommits.toLocaleString()} Total Contributions` : 'Live Activity Graph'} · @AayushM0
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                display: 'inline-flex',
                border: '2px solid var(--border)',
                backgroundColor: '#0A0A0A',
                padding: '2px',
              }}
            >
              <button
                onClick={() => setViewMode('live')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  padding: '0.375rem 0.75rem',
                  backgroundColor: viewMode === 'live' ? 'var(--signal-red)' : 'transparent',
                  color: viewMode === 'live' ? 'var(--fg-on-red)' : 'var(--fg-muted)',
                  border: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                🔴 Live Commits
              </button>
              <button
                onClick={() => setViewMode('pixel')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  padding: '0.375rem 0.75rem',
                  backgroundColor: viewMode === 'pixel' ? 'var(--signal-red)' : 'transparent',
                  color: viewMode === 'pixel' ? 'var(--fg-on-red)' : 'var(--fg-muted)',
                  border: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                👾 Pixel "AAYUSH"
              </button>
            </div>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid-ink"
              style={{ fontSize: '11px', padding: '0.5rem 1rem' }}
            >
              Profile ↗
            </a>
          </div>
        </header>

        {/* Matrix Container */}
        <div
          className="hardshadow"
          style={{
            backgroundColor: '#0A0A0A',
            border: '2px solid var(--border)',
            padding: '1.5rem',
            overflowX: 'auto',
          }}
        >
          {/* Top Status Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--fg-muted)',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              <span className="text-signal-red">✳</span> Data Source:{' '}
              <span style={{ color: 'var(--fg)' }}>
                {viewMode === 'live'
                  ? (loading ? 'Fetching @AayushM0 live graph...' : 'Live GitHub Contributions (@AayushM0)')
                  : 'Custom Pixel Matrix ("AAYUSH")'}
              </span>
            </div>
            <div style={{ color: hoverInfo ? 'var(--signal-red)' : 'var(--fg-muted)' }}>
              {hoverInfo || 'Hover over dots to inspect commits'}
            </div>
          </div>

          {/* Matrix Grid */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: `repeat(${ROWS}, 12px)`,
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--fg-muted)',
                lineHeight: '12px',
                paddingRight: '0.25rem',
              }}
            >
              {dayLabels.map((lbl, idx) => (
                <div key={idx}>{lbl}</div>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${COLS}, minmax(10px, 12px))`,
                gridTemplateRows: `repeat(${ROWS}, 12px)`,
                gap: '4px',
                flexGrow: 1,
              }}
            >
              {Array.from({ length: COLS }).map((_, c) => (
                <React.Fragment key={c}>
                  {Array.from({ length: ROWS }).map((_, r) => {
                    const cell = activeGrid[r]?.[c] || { intensity: 0, count: 0, date: '' };
                    return (
                      <div
                        key={`${r}-${c}`}
                        className="matrix-dot"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '2px',
                          transition: 'transform 0.15s ease, background-color 0.15s ease',
                          cursor: 'pointer',
                          ...getDotStyle(cell.intensity),
                        }}
                        onMouseEnter={() =>
                          setHoverInfo(
                            cell.date
                              ? `${cell.count} contribution${cell.count === 1 ? '' : 's'} on ${cell.date}`
                              : typeof cell.count === 'string'
                              ? cell.count
                              : `${cell.count || 0} contributions`
                          )
                        }
                        onMouseLeave={() => setHoverInfo(null)}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Legend Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--fg-muted)',
              marginTop: '1.25rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>Live Sync API · Real-time Commit Log</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span>Less</span>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#20201D', borderRadius: '2px' }}></span>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#420E08', borderRadius: '2px' }}></span>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#781A0F', borderRadius: '2px' }}></span>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#B82816', borderRadius: '2px' }}></span>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#e5341f', borderRadius: '2px' }}></span>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
