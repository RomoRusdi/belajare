import { useEffect, useRef, useState } from 'react';

/**
 * CursorGlow — a soft radial orange glow that trails the mouse.
 *
 * Performance notes:
 * - mousemove only writes the latest x/y/opacity into a ref and schedules a
 *   single requestAnimationFrame. No DOM reads/writes happen in the event
 *   handler itself, so we never force layout on the event.
 * - One rAF callback applies the position with `transform: translate3d(...)`
 *   (GPU-friendly, no layout) and toggles opacity. Centering is handled by a
 *   static margin offset so the transform is purely for positioning.
 * - The element gets `will-change: transform`.
 * - Listeners are passive and cleaned up on unmount. Only enabled on fine
 *   pointers (real mouse); on touch / coarse pointers it renders nothing.
 */
export default function CursorGlow() {
  const ref = useRef(null);
  const state = useRef({ x: 0, y: 0, opacity: 0 });
  const rafId = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only on devices with a precise pointer that can hover.
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    setEnabled(mq.matches);

    const onChange = (e) => setEnabled(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Single rAF loop: reads the ref, writes transform + opacity once.
    const apply = () => {
      rafId.current = 0;
      const el = ref.current;
      if (!el) return;
      const s = state.current;
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      el.style.opacity = String(s.opacity);
    };

    const schedule = () => {
      if (!rafId.current) rafId.current = requestAnimationFrame(apply);
    };

    // Handlers do no DOM work — they only stash state + schedule a frame.
    const onMove = (e) => {
      const s = state.current;
      s.x = e.clientX;
      s.y = e.clientY;
      s.opacity = 1;
      schedule();
    };
    const onLeave = () => {
      state.current.opacity = 0;
      schedule();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = 0;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[40] h-[520px] w-[520px] opacity-0 mix-blend-screen transition-opacity duration-300 will-change-transform"
      style={{
        // Static centering offset; `transform` is reserved for positioning.
        marginLeft: '-260px',
        marginTop: '-260px',
        background:
          'radial-gradient(circle, rgba(209,80,58,0.16) 0%, rgba(209,80,58,0.06) 35%, transparent 70%)',
      }}
    />
  );
}
