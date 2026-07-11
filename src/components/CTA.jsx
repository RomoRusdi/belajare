import Reveal from './Reveal.jsx';
import Label from './Label.jsx';
import { site } from '../data.js';

/**
 * CTA — centered, very tall padding. Mono orange eyebrow, a giant Anton
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
        <Label as="p" accent className="mb-8">
          Got a problem worth solving?
        </Label>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-display-xl text-balance font-display uppercase text-orange">
          <span className="block">Let&rsquo;s build</span>
          {/* outline word strokes in cream — the retro two-tone pairing */}
          <span className="block text-outline text-stroke-cream">something</span>
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <a
          href={`mailto:${site.email}`}
          className="mt-14 inline-block max-w-full break-all border-2 border-orange bg-orange px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-black transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-orange sm:px-10 sm:text-xs sm:tracking-[0.2em]"
        >
          {site.email}
        </a>
      </Reveal>
    </section>
  );
}
