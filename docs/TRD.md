# Technical Requirements Document (TRD)

## 📌 Document Overview
- **Project Name**: Aayush Mittal Personal Portfolio Website
- **Version**: 1.0.0
- **Author**: Aayush Mittal

---

## 1. System Technology Stack
The application is built on a modern, ultra-fast frontend stack centered around Vite 8 and React 19.

| Technology | Version | Purpose |
|---|---|---|
| **Vite** | `^8.1.1` | Build tool, bundling, and hot-module replacement (HMR) development server |
| **React** | `^19.2.7` | Component-driven UI framework with concurrent rendering |
| **React DOM** | `^19.2.7` | Virtual DOM interface |
| **GSAP (GreenSock)** | `^3.15.0` | High-performance animation engine (ScrollTrigger, pinning, scrub) |
| **@gsap/react** | `^2.1.2` | React lifecycle hooks wrapper for safe GSAP context/cleanup |
| **Anime.js** | `^4.5.0` | Timeline orchestration for entrance preloader and vector trace sequences |
| **Lenis** | `^1.3.25` | Smooth scroll engine to normalize scroll metrics across browsers |

---

## 2. Dev & Build Environment
- **Linting Engine**: `Oxlint` (`^1.71.0`) is configured via `.oxlintrc.json` for super-fast JS static analysis.
- **Commands**:
  - `npm run dev`: Starts local development server on Vite.
  - `npm run build`: Bundles the production code into `/dist`.
  - `npm run lint`: Performs static analysis checking for code rules and syntax optimizations.
  - `npm run preview`: Previews the production build locally.

---

## 3. Data Integration
All site copy, project specifications, bio details, and organizational listings are consolidated in a unified config file: [content.js](file:///d:/Projects/Portfolio/src/data/content.js).

### External API: GitHub Contribution Matrix
The `GitHubMatrix.jsx` component connects to a live JSON API endpoint:
- **URL**: `https://github-contributions.vercel.app/api/v1/AayushM0`
- **Method**: `GET`
- **Response Format**:
  ```json
  {
    "years": [
      {
        "year": "2026",
        "total": 3842,
        "range": { "start": "2026-01-01", "end": "2026-12-31" }
      }
    ],
    "contributions": [
      {
        "date": "2026-07-25",
        "count": 12,
        "level": 3
      }
    ]
  }
  ```
- **Fallback**: In case the API is offline or returns an error, the system must degrade gracefully, using hardcoded static activity arrays or standard mock states without freezing the client.

---

## 4. Coding Standards & Performance Guidelines
- **Zero Layout Thrashing**: Ensure GSAP tweens and Lenis scrolls read layout properties (e.g., `offsetTop`, `offsetHeight`) outside hot rendering loops.
- **Unmounting Cleanup**: All GSAP timelines must utilize the `useGSAP` hook or explicit cleanups (`ctx.revert()`) to prevent memory leaks and zombie animations.
- **Code Splitting**: Utilize dynamic `React.lazy` imports for heavy media components and below-the-fold sections if needed, to maintain a tiny initial JS bundle size.
