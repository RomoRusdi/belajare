import Reveal from './Reveal.jsx';
import { site } from '../data.js';

/**
 * CTA — centered, very tall padding. Mono orange eyebrow, a giant Syne
 * headline where "something" is rendered in the transparent / text-stroked
 * outline style, and a pill button that inverts to off-white on hover.
 */
export default function CTA() {
  return (
    <section
      id="contact"
      className="flex flex-col items-center px-[6vw] py-40 text-center md:py-56"
    >
      <Reveal>
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-orange sm:text-sm">
          Got a problem worth solving?
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className="font-display font-extrabold uppercase leading-[0.9]"
          style={{ fontSize: 'clamp(44px, 11vw, 170px)', letterSpacing: '-0.03em' }}
        >
          <span className="block">Let&rsquo;s build</span>
          {/* outline style strokes in `text` colour per spec */}
          <span className="block text-outline text-stroke-text">something</span>
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <a
          href={`mailto:${site.email}`}
          className="mt-14 inline-block rounded-full bg-orange px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] text-black transition-all duration-300 hover:-translate-y-1 hover:bg-text"
        >
          {site.email}
        </a>
      </Reveal>
    </section>
  );
}
