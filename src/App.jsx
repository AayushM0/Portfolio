import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import FeaturedWork from './components/FeaturedWork';
import GitHubMatrix from './components/GitHubMatrix';
import StatsStrip from './components/StatsStrip';
import Services from './components/Services';
import Method from './components/Method';
import About from './components/About';
import Leadership from './components/Leadership';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgressWidget from './components/ScrollProgressWidget';

gsap.registerPlugin(ScrollTrigger);

// Global Lenis instance for export so nav/anchor links can call lenis.scrollTo()
export let lenisInstance = null;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisInstance = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger update
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's raf callback to GSAP's ticker for 60fps frame synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing to prevent visual stuttering during scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <>
      {/* Phase 1-3 Preloader Sequence */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Keyboard Accessibility Skip Link */}
      <a href="#work" className="skip-link">
        Skip to main content
      </a>

      <Nav />

      <main style={{ visibility: isLoaded ? 'visible' : 'visible' }}>
        <Hero />
        <Marquee />
        <FeaturedWork />
        <GitHubMatrix />
        <StatsStrip />
        <Services />
        <Method />
        <About />
        <Leadership />
        <Skills />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      {/* Floating Bottom-Right Ruler Scroll Progress Widget */}
      <ScrollProgressWidget />
    </>
  );
}

export default App;
