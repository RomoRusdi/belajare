import Reveal from './Reveal.jsx'
import SectionHeader from './SectionHeader.jsx'
import { projects } from '../data.js'

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
              className="group grid grid-cols-1 items-center gap-2 border-b border-line py-7 transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-bg-elev hover:pl-[30px] md:grid-cols-[auto_1fr_auto_auto] md:gap-8 md:py-8"
            >
              {/* Number — hidden on mobile */}
              <span className="hidden font-mono text-sm text-muted md:block">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Name */}
              <span
                className="font-display font-bold leading-none transition-colors duration-300 group-hover:text-orange"
                style={{ fontSize: 'clamp(26px, 3.6vw, 52px)' }}
              >
                {p.name}
              </span>

              {/* Tags */}
              <span className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </span>

              {/* View → — hidden by default, slides in on hover (desktop) */}
              <span
                className="hidden translate-x-2 font-mono text-xs uppercase tracking-[0.2em] text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-orange group-hover:opacity-100 md:block"
                aria-hidden="true"
              >
                View →
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
