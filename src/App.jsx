import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import 'lenis/dist/lenis.css';
import Preloader from './components/Preloader.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import GrainOverlay from './components/GrainOverlay.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Stack from './components/Stack.jsx';
import Stats from './components/Stats.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import useSmoothScroll from './hooks/useSmoothScroll.js';

export default function App() {
  // `loaded` flips true when the preloader finishes counting to 100%.
  // The hero waits for it so its entrance plays after the reveal.
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  // Smooth scroll starts only once the preloader releases scroll, and never
  // under reduced motion (native scrolling is kept in that case).
  useSmoothScroll(loaded && !reduce);

  return (
    <>
      {/* Duotone filter for the Work thumbnails — maps shadows → near-black
          and highlights → orange. Defined once, referenced via
          `filter: url(#duotone)`. Decorative, hidden from a11y + layout. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <filter id="duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0    0    0    1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.043 1.0" />
            <feFuncG type="table" tableValues="0.039 0.353" />
            <feFuncB type="table" tableValues="0.031 0.122" />
          </feComponentTransfer>
        </filter>
      </svg>

      <Preloader onComplete={() => setLoaded(true)} />

      {/* Atmosphere — purely decorative, sit above the page, ignore pointer */}
      <CursorGlow />
      <GrainOverlay />
      <ScrollProgress visible={loaded} />

      <Navbar />

      <main>
        <Hero loaded={loaded} />
        <Marquee />
        <About />
        <Work />
        <Stack />
        <Stats />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
