import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../lib/smoothScroll.js';

/**
 * Starts Lenis smooth scrolling while `enabled` is true, driving it from a
 * single RAF loop. Pass `enabled = loaded && !reducedMotion` so it only runs
 * after the preloader releases scroll, and never under reduced motion (native
 * scrolling is used in that case). Cleans up + clears the singleton on teardown.
 */
export default function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    setLenis(lenis);

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}
