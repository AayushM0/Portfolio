# UI/UX Design System & Aesthetic Guidelines

## 1. Aesthetic Direction: Neo-Brutalism (Paper & Ink)
The portfolio deviates from standard tech aesthetics by adopting a high-contrast **Neo-Brutalist Paper & Ink** design system. Key visual identifiers include solid structural borders, flat design styling, offset hard-shadows, and raw monospaced status indicators.

---

## 2. Color Token System
The site uses a strict dual-accent color palette. All components pull styles directly from these variables.

| CSS Variable Name | Color Hex | Role in Design |
|---|---|---|
| `--bg-base` | `#1A1A18` | Base background tone for structural sheets. |
| `--bg-black` | `#0A0A0A` | Deep contrast tone for panels, cards, and footer. |
| `--signal-red` | `#e5341f` | **Primary Loud Accent**: Brand boxes, active tags, hero callouts, and main CTA section background. |
| `--signal-lime` | `#D7FF3F` | **Secondary Accent Highlight**: GitHub active matrix dots and badges. |
| `--fg` | `#F5F3EE` | Off-white primary text color for maximum readability. |
| `--fg-muted` | `#9A9A92` | Soft warm-gray for subheadings, captions, and code labels. |
| `--border` | `#3A3A36` | 2px solid hairline for frames, cards, and grids. |

---

## 3. Typography Hierarchy
Visual density is maintained using high-impact display types paired with clean monospaced indicators.

- **Primary Display Headings**: Archivo (Extra Bold, tight letter spacing, uppercase labels). Used for huge text components (e.g. `Work that refuses to blend in.`).
- **Body & Copy**: DM Sans. Optimized for high legibility in bios, summaries, and descriptions.
- **Labels & Micro-data**: JetBrains Mono (Uppercase). Used for badges, statistics, section metadata numbers, and terminal details.

---

## 4. Key Neo-Brutalist Design Details

### 4.1. Borders & Hard Shadows
- **Solid Borders**: A universal 2px solid border (`#3A3A36`) wraps cards, navigation items, buttons, and sections.
- **Flat Hard Shadows**: Cards do not use blur filters or radial gradients. Instead, they use hard, offset physical shadows:
  - Small shadow: `box-shadow: 4px 4px 0px 0px #0a0a0a;`
  - Large shadow: `box-shadow: 8px 8px 0px 0px #e5341f;` (Signal Red Accent)

### 4.2. SVG Grain Overlay
- To simulate paper texture, a global noise pattern is laid over the site:
  - An SVG noise filter pattern (`feTurbulence`) is applied via a fixed full-screen element with low opacity (~0.015), creating a dynamic retro/analog feel.

---

## 5. Viewport Responsiveness Guidelines
- **Grid Stacking**: 2-column or 3-column splits on desktop collapse to 1-column layouts on mobile viewports.
- **Navigation Menu**: Nav list links adapt into a clean hamburger/overlay menu or collapse to compact label pills on narrow screens.
- **Horizontal Cards**: Staggered GSAP project decks adapt to clean vertical stacks with touch scrolling on mobile to prevent layout overflow.
