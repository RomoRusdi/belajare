import { motion, useReducedMotion } from 'framer-motion';

/**
 * <Reveal> — fades + rises its children into view once.
 *
 * opacity 0→1, y 34→0, ~0.9s, ease [.2,.7,.2,1]. Triggers via
 * whileInView (once, when ~15% is visible). Respects reduced motion:
 * when the user prefers less motion the content renders immediately
 * with no transform.
 *
 * Props:
 *   delay  — seconds to wait before animating (used for stagger)
 *   as     — element/component to render as a motion element (default div)
 *   ...rest — className, style, etc. are forwarded
 */
export default function Reveal({ children, delay = 0, as = 'div', className = '', ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    // No entrance animation — show content as-is.
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
