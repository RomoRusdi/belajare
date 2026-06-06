import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import Label from './Label.jsx';
import { projects } from '../data.js';

/**
 * Work (02) — an editorial list (not cards). Each row is a grid of
 * [num | name | tags | "View →"] with a top/bottom hairline. On hover the
 * row lifts to bg-elev, nudges its padding right, the name turns orange,
 * and the "View →" slides in. Collapses to a stacked single column on
 * mobile (num + arrow hidden).
 */
export default function Work() {
  return (
    <section id="work" className="px-[6vw] py-24 md:py-36">
      <SectionHeader number="02" title="Selected Work" />

      {/* Top hairline */}
      <div className="border-t border-line">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <a
              href={p.link}
              className="group grid grid-cols-1 items-center gap-4 border-b border-line py-7 transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-bg-elev hover:pl-[30px] md:grid-cols-[auto_150px_1fr_auto_auto] md:gap-8 md:py-8"
            >
              {/* Number — hidden on mobile */}
              <Label as="span" className="hidden md:block">
                {String(i + 1).padStart(2, '0')}
              </Label>

              {/* Duotone thumbnail — full width on mobile (stacks above text),
                  fixed-size on desktop. All thumbs share the identical
                  aspect/treatment so the section reads as art-directed. */}
              <div className="work-thumb w-full md:w-[150px]">
                <img
                  className="work-thumb__img"
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width="1600"
                  height="1000"
                />
                <span className="work-thumb__tint" aria-hidden="true" />
                <span className="work-thumb__overlay" aria-hidden="true" />
              </div>

              {/* Name */}
              <span className="text-display-md text-balance font-display font-bold transition-colors duration-300 group-hover:text-orange">
                {p.name}
              </span>

              {/* Tags */}
              <span className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Label key={t} className="rounded-full border border-line px-3 py-1">
                    {t}
                  </Label>
                ))}
              </span>

              {/* View → — hidden by default, slides in on hover (desktop) */}
              <Label
                as="span"
                aria-hidden="true"
                className="hidden translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-orange group-hover:opacity-100 md:block"
              >
                View →
              </Label>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
