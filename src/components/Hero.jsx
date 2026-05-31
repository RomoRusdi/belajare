import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data.js'
import RichText from '../lib/richText.jsx'

/**
 * Hero — full viewport, centered. The H1 is three stacked words that each
 * rise out of a clipped container with a staggered delay. The middle word
 * uses the transparent / orange-stroked outline style.
 *
 * Entrances wait for `loaded` (the preloader finishing) so the sequence
 * plays on a clean stage. Reduced motion shows everything immediately.
 */
export default function Hero({ loaded }) {
  const reduce = useReducedMotion()
  // Hold animations until the preloader is done (or skip the wait entirely
  // when reduced motion is on).
  const go = reduce ? true : loaded

  // Shared transition for the clipped line rise.
  const lineTransition = (delay) => ({
    duration: 1,
    delay,
    ease: [0.2, 0.7, 0.2, 1],
  })

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center px-[6vw] pb-16 pt-28"
    >
      {/* Kicker */}
      <motion.p
        className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-orange sm:text-sm"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={go ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {site.role}
      </motion.p>

      {/* Headline — clipped line-by-line rise */}
      <h1
        className="font-display font-extrabold uppercase"
        style={{
          lineHeight: 0.86,
          letterSpacing: '-0.03em',
          fontSize: 'clamp(40px, 10vw, 150px)',
        }}
      >
        {site.heroLines.map((line, i) => (
          <span key={line.text} className="block overflow-hidden pb-[0.04em]">
            <motion.span
              className={`block ${line.outline ? 'text-outline' : ''}`}
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
        <p className="max-w-md text-base text-muted sm:text-lg">
          <RichText text={site.heroIntro} />
        </p>

        <a
          href="#about"
          className="group flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
        >
          Scroll
          <span className="animate-bob text-orange" aria-hidden="true">
            ↓
          </span>
        </a>
      </motion.div>
    </section>
  )
}
