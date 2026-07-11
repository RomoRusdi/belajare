import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data.js';
import RichText from '../lib/richText.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import { HERO_CONFIG } from '../config.js';
import { supportsWebGL } from '../lib/webgl.js';
import { scrollToTarget } from '../lib/smoothScroll.js';

// Code-split the three.js scene so it never blocks first paint. Until it
// loads — and as the fallback when WebGL is unavailable or errors — the CSS
// hero background simply shows through.
const HeroCanvas = lazy(() => import('./HeroCanvas.jsx'));

/**
 * Hero — full viewport, centered. The H1 is three stacked Anton words in
 * brick red that each rise out of a clipped container with a staggered
 * delay; the middle word uses the transparent / cream-stroked outline style.
 * Retro HUD dressing: a diamond-flanked kicker, a slow-spinning concentric
 * dial on the right, and registration ticks.
 *
 * Entrances wait for `loaded` (the preloader finishing) so the sequence
 * plays on a clean stage. Reduced motion shows everything immediately.
 */
export default function Hero({ loaded }) {
  const reduce = useReducedMotion();
  // Hold animations until the preloader is done (or skip the wait entirely
  // when reduced motion is on).
  const go = reduce ? true : loaded;

  // Shared transition for the clipped line rise.
  const lineTransition = (delay) => ({
    duration: 1,
    delay,
    ease: [0.2, 0.7, 0.2, 1],
  });

  // Mount the WebGL background only when it can run well: enabled, WebGL is
  // available, and the user hasn't asked for reduced motion. Otherwise the
  // CSS hero background stays — a broken/janky canvas is worse than none.
  const showCanvas = HERO_CONFIG.enabled && !reduce && supportsWebGL();

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center px-[6vw] pb-16 pt-28"
    >
      {/* WebGL particle field — purely decorative, behind everything, never
          intercepts pointer events. Wrapped in an error boundary so a WebGL
          failure can never blank the hero. */}
      {showCanvas && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <HeroCanvas />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Radial vignette — darkens the centre behind the headline so the
          type keeps contrast over the bloom. Sits between canvas and text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(13,10,7,0.65) 0%, rgba(13,10,7,0.35) 38%, rgba(13,10,7,0) 75%)',
        }}
      />

      {/* Spinning HUD dial — concentric circles with a diamond hub, echoing
          the instrument ornaments in vintage sci-fi print. Desktop only. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[7vw] top-1/2 z-[1] hidden -translate-y-1/2 lg:block"
        initial={reduce ? false : { opacity: 0 }}
        animate={go ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: 1.1 }}
      >
        <svg
          className="animate-spin-slow"
          width="170"
          height="170"
          viewBox="0 0 170 170"
          fill="none"
        >
          <circle cx="85" cy="85" r="82" stroke="var(--cream)" strokeOpacity="0.35" />
          <circle
            cx="85"
            cy="85"
            r="62"
            stroke="var(--orange)"
            strokeOpacity="0.6"
            strokeDasharray="4 10"
          />
          <circle cx="85" cy="85" r="30" stroke="var(--cream)" strokeOpacity="0.25" />
          {/* Cardinal ticks */}
          <path d="M85 0v12M85 158v12M0 85h12M158 85h12" stroke="var(--cream)" strokeOpacity="0.5" />
          {/* Diamond hub */}
          <path d="M85 75l7 10-7 10-7-10z" fill="var(--orange)" />
        </svg>
      </motion.div>

      {/* Foreground content sits above the canvas + vignette. */}
      <div className="relative z-10">
        {/* Kicker — diamond-flanked, cream */}
        <motion.p
          className="mb-8 flex items-center gap-4 font-mono text-label uppercase text-cream"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span aria-hidden="true" className="text-orange">
            ✦
          </span>
          {site.role}
          <span aria-hidden="true" className="text-orange">
            ✦
          </span>
        </motion.p>

        {/* Headline — clipped line-by-line rise. Solid lines in brick red,
            the outline line stroked in cream. */}
        <h1 className="text-display-xl text-balance font-display uppercase text-orange">
          {site.heroLines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className={`block ${line.outline ? 'text-outline text-stroke-cream' : ''}`}
                initial={reduce ? false : { y: '110%' }}
                animate={go ? { y: '0%' } : undefined}
                transition={lineTransition(0.25 + i * 0.15)}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Footer row — intro + scroll cue, fade in last */}
        <motion.div
          className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="max-w-[60ch] text-body-lg text-pretty text-hang text-muted-2">
            <RichText text={site.heroIntro} />
          </p>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('#about');
            }}
            className="group flex shrink-0 items-center gap-3 font-mono text-label uppercase text-muted transition-colors hover:text-text"
          >
            Scroll
            <span className="animate-bob text-orange" aria-hidden="true">
              ↓
            </span>
          </a>
        </motion.div>

        {/* Mega-tracked strip — the "F U T U R I S T I C" voice */}
        <motion.p
          aria-hidden="true"
          className="tracking-mega mt-16 select-none text-center font-mono text-[10px] uppercase text-cream/60 sm:text-xs"
          initial={reduce ? false : { opacity: 0 }}
          animate={go ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Fullstack · Web · Mobile
        </motion.p>
      </div>
    </section>
  );
}
