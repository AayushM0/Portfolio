// ─── Site-wide config ────────────────────────────────────────────
export const siteConfig = {
  name: "Aayush Mittal",
  brand: "Aayush Mittal",
  tagline:
    "Full-stack builder who ships — from client-ready frontend work to AI-native developer tooling.",
  status: "Open to freelance work",
  resumePath: "/AayushResume.pdf",
  email: "aayushmittal620@gmail.com",
  github: "https://github.com/AayushM0",
  linkedin: "https://linkedin.com/in/aayush-mittal620",
  location: "IIIT Kota / India",
  hours: null,
};

// ─── Hero Data ───────────────────────────────────────────────────
export const heroData = {
  metaRow: "✳ Open to freelance work · 5 Projects Shipped",
  statPair: [
    { value: "5", label: "Projects Shipped" },
    { value: "2+yr", label: "Building in Public" },
  ],
};

// ─── Stats Strip Data ────────────────────────────────────────────
export const statsStrip = [
  { value: "5", label: "Projects Shipped" },
  { value: "3", label: "Leadership Roles" },
  { value: "30+", label: "Students Mentored" },
  { value: "2+yr", label: "Building in Public" },
];

// ─── Services / What We Do ───────────────────────────────────────
export const services = [
  {
    index: "01",
    title: "AI & Agent Tooling",
    description: "Building privacy-first memory engines, Model Context Protocol (MCP) servers, and LLM-assisted workflows that eliminate manual context entry and automate complex coding tasks.",
    highlight: "Memory & MCP",
  },
  {
    index: "02",
    title: "Full-Stack Web Applications",
    description: "Architecting end-to-end applications from scratch using React, Node.js, FastAPI, PostgreSQL, and MongoDB. Production-grade code with clean data models.",
    highlight: "React & Node",
  },
  {
    index: "03",
    title: "Frontend & Motion Systems",
    description: "Crafting distinct visual identities, neo-brutalist systems, frame-sequence heroes, and GSAP scroll-driven interactions that refuse to blend into generic templates.",
    highlight: "GSAP & Tailwind",
  },
  {
    index: "04",
    title: "Automation & CLI Tooling",
    description: "Streamlining developer workflows with terminal CLI deployers, edge TTS video automation scripts, and custom pipeline tooling built for speed and reliability.",
    highlight: "Node & Python CLI",
  },
];

// ─── Method / 4 Phase Process ──────────────────────────────────
export const method = [
  {
    step: "/ 01",
    title: "Discover & Spec",
    description: "Deconstruct the core problem, outline architectural requirements, set up design tokens, and draft unambiguous execution specs before writing source code.",
  },
  {
    step: "/ 02",
    title: "Prototype & System",
    description: "Establish strict 2px border systems, typographic hierarchy, responsive layouts, and motion guidelines. Prototype hero interactions early.",
  },
  {
    step: "/ 03",
    title: "Build & Automate",
    description: "Synthesize modular React components, clean state handlers, and optimized bundle chunks with parallel subagent workflows and zero slop.",
  },
  {
    step: "/ 04",
    title: "Ship & Verify",
    description: "Audit performance, ensure WCAG AA contrast compliance, test keyboard navigation, and verify production builds across desktop and mobile viewports.",
  },
];

// ─── About ───────────────────────────────────────────────────────
export const about = {
  bio: [
    "I'm a third-year Electronics & Communication Engineering student at IIIT Kota, but most of my time goes into building things outside the classroom — full-stack products, AI developer tooling, and client-facing frontend work. I like taking a problem end-to-end: architecture, implementation, and the smaller decisions in between.",
    "I build with an agent-driven workflow — writing detailed specs and letting coding agents handle implementation. It lets me run multiple projects in parallel without cutting corners on quality.",
  ],
  timeline: [
    {
      label: "Modern School, Noida",
      detail: "Schooling through 2024",
    },
    {
      label: "IIIT Kota",
      detail: "B.Tech, Electronics & Communication Engineering (2024–2028)",
    },
    {
      label: "GFG Campus Mantri / Web Dev Lead, Codebase Web3 Lead",
      detail: "2024–present",
    },
  ],
};

// ─── Projects ────────────────────────────────────────────────────
export const projects = {
  lead: [
    {
      id: "001",
      title: "LACE",
      hook: "Local AI Context Engine — Privacy-first memory layer for AI coding assistants.",
      tag: "AI SYSTEM",
      stack: ["Python", "SQLite", "MCP", "LLM APIs"],
      outcomes: [
        "Cut manual context re-entry by ~80% per session via auto-extraction.",
      ],
      link: "https://github.com/AayushM0",
      category: "AI Memory Engine",
      year: "2026",
      image: "[PLACEHOLDER_IMAGE_PATH_1]",
    },
    {
      id: "002",
      title: "GramConnect",
      hook: "Civic Grievance Platform — On-chain civic grievance platform with AI intake verification.",
      tag: "FULL-STACK",
      stack: ["React", "Node", "MongoDB", "Solidity"],
      outcomes: [
        "On-chain audit trail, SLA escalation, and AI image recognition.",
      ],
      link: "https://github.com/AayushM0/GramConnect-TeamDaps-Sathack",
      category: "Web3 / Civic Tech",
      year: "2025",
      image: "[PLACEHOLDER_IMAGE_PATH_2]",
    },
    {
      id: "003",
      title: "Frontend Design Showcase",
      hook: "A full design system and motion-driven website — custom navy-and-gold identity brought to life with scroll-triggered animation.",
      tag: "CLIENT PROJECT",
      stack: ["React", "Vite", "Tailwind", "GSAP"],
      outcomes: [
        "Custom design system; frame-sequence canvas hero; layered scroll-driven depth-reveal section.",
      ],
      link: null,
      category: "Design & Motion",
      year: "2025",
      image: "[PLACEHOLDER_IMAGE_PATH_3]",
    },
    {
      id: "004",
      title: "DeployIT",
      hook: "CLI Deployment Tool — Terminal deployer for frontend web applications.",
      tag: "TOOLING",
      stack: ["Node.js", "Commander.js", "CLI"],
      outcomes: ["Cut deployment setup time by ~70%."],
      link: "#",
      category: "CLI Tooling",
      year: "2025",
      image: "[PLACEHOLDER_IMAGE_PATH_4]",
    },
    {
      id: "005",
      title: "Commercial Frontend Project",
      hook: "A modern, high-performance commercial website — mobile-first, with lazy-loaded routes and a clean, production-grade interface.",
      tag: "CLIENT PROJECT",
      stack: ["React 19", "Vite 8", "Tailwind CSS 4", "React Router 7"],
      outcomes: [
        "Lazy-loaded route-level code splitting for performance",
        "Semantic HTML and ARIA-first accessibility approach",
      ],
      link: null,
      category: "Commercial Frontend",
      year: "2026",
      image: "[PLACEHOLDER_IMAGE_PATH_5]",
    },
  ],

  mentions: [
    "SMG Electric Scooters — Winter Intern (Dec 2024 – Jan 2025): ride-hailing prototype UI with booking flow and real-time tracking.",
    "SHIELD 1.0 and Odoo x GCET Hackathon — Qualifier (2025–2026)",
    "RescueMesh / MeshSOS — Samsung Solve for Tomorrow submission: disaster communication platform using BLE mesh networking.",
    "Yt Shorts Bot — multi-channel YouTube automation pipeline (Groq, Edge TTS, FFmpeg)",
  ],
};

// ─── Open Source ──────────────────────────────────────────────────
export const openSource = {
  description:
    "Currently pursuing LFX Mentorship, Fall 2026 (Term 3), targeting CNCF projects — jaeger-ui, opencost, and opentelemetry-collector — alongside Meshery/Layer5.",
  repos: [
    "jaeger-ui",
    "opencost",
    "opentelemetry-collector",
    "Meshery / Layer5",
  ],
};

// ─── Leadership ──────────────────────────────────────────────────
export const leadership = [
  {
    role: "Campus Mantri",
    org: "GeeksforGeeks",
    period: "Jun 2026 – Dec 2026",
    description:
      "Official representative of GeeksforGeeks at IIIT Kota — the main point of contact between GFG and the student community, running campus-level events and promoting GFG's educational resources.",
  },
  {
    role: "Web Development Lead",
    org: "GeeksforGeeks Student Chapter",
    period: "2024 – Present",
    description:
      "Lead the web development vertical — running sessions on Git, GitHub, and version control workflows, and core-organizing Hackovation, the chapter's flagship hackathon.",
  },
  {
    role: "Web3 Lead",
    org: "Codebase, IIIT Kota",
    period: "2024 – Present",
    description:
      "Lead Web3 initiatives and run web development workshops covering frontend and backend fundamentals for 30+ students. Core organizer for HackTheChain, a blockchain-focused hackathon.",
  },
];

// ─── Skills ──────────────────────────────────────────────────────
export const skills = {
  groups: [
    {
      label: "Building agent systems",
      items: ["Python", "MCP", "LLM APIs", "SQLite"],
    },
    {
      label: "Full-stack delivery",
      items: [
        "React.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "PostgreSQL",
        "MongoDB",
        "SQL",
        "HTML",
        "CSS",
      ],
    },
    {
      label: "Automation & tooling",
      items: ["JavaScript", "CLI tools", "Git", "GitHub", "VS Code"],
    },
  ],
  languages: ["C++", "Java", "Python", "JavaScript"],
};

// ─── Achievements ────────────────────────────────────────────────
export const achievements = [
  "Prize Winner — ZINNOVATIO 3.0, SMG Award (2024)",
  "Hackathon Qualifier — SHIELD 1.0, Odoo x GCET Hackathons (2025–2026)",
];
