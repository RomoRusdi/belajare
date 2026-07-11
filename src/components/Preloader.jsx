import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Preloader — full-screen overlay that counts 0% → 100% then slides away.
 *
 * - Huge Anton percentage bottom-right (the "%" is orange).
 * - Mono status label bottom-left.
 * - Thin orange progress bar pinned to the very bottom, grows 0→100%.
 * - Locks body scroll until it finishes, then unlocks + calls onComplete.
 *
 * Under prefers-reduced-motion we skip the count-up theatre: unlock and
 * complete on the next tick so content is available immediately.
 */
export default function Preloader({ onComplete }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // Lock scroll while the preloader is visible.
  useEffect(() => {
    document.body.classList.add('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, []);

  // Reduced motion: don't perform the count animation.
  useEffect(() => {
    if (!reduce) return;
    setCount(100);
    document.body.classList.remove('is-locked');
    const t = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 0);
    return () => clearTimeout(t);
  }, [reduce, onComplete]);

  // Count up in random 3–10 increments every ~90ms.
  useEffect(() => {
    if (reduce) return;
    let current = 0;
    const id = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3; // 3–10
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(id);
        // Hold at 100%, then release.
        setTimeout(() => {
          document.body.classList.remove('is-locked');
          setDone(true);
          onComplete?.();
        }, 380);
      } else {
        setCount(current);
      }
    }, 90);
    return () => clearInterval(id);
  }, [reduce, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg"
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Mono status label — bottom-left */}
          <div className="absolute bottom-8 left-[6vw] font-mono text-xs uppercase tracking-[0.2em] text-muted sm:text-sm">
            Compiling portfolio{' '}
            <span className="hidden text-muted/60 sm:inline">{'// loading assets'}</span>
          </div>

          {/* Huge percentage — bottom-right */}
          <div className="absolute bottom-6 right-[6vw] font-display text-[18vw] leading-none text-cream sm:text-[14vw]">
            {count}
            <span className="text-orange">%</span>
          </div>

          {/* Progress bar pinned to the very bottom */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-line-soft">
            <div
              className="h-full bg-orange transition-[width] duration-150 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
