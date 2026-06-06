/**
 * Tiny singleton around the active Lenis instance so any component can drive
 * in-page navigation without prop-drilling. When Lenis isn't running (reduced
 * motion, or before the preloader finishes) we fall back to native scrolling.
 */
let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/**
 * Smooth-scroll to a target (CSS selector string or element). Used by the
 * navbar links and the hero scroll cue.
 */
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: 0 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
