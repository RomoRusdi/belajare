import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — a thin orange bar pinned to the very top whose scaleX
 * tracks page scroll progress (0→1). Driven by framer-motion's useScroll
 * (which reads window scroll — kept in sync by Lenis) with a light spring for
 * smoothness; uses transform: scaleX, not width. Hidden until the preloader
 * finishes (`visible`).
 *
 * z-index: above the grain overlay (z-45) / navbar (z-50), below the
 * preloader (z-100).
 */
export default function ScrollProgress({ visible }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-orange"
      style={{ scaleX, opacity: visible ? 1 : 0 }}
    />
  );
}
