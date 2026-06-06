import { site, navLinks, socials } from '../data.js';
import Label from './Label.jsx';

/**
 * Footer — top hairline, then three link columns (Navigate / Connect /
 * Elsewhere), a giant outlined name spanning the width, and a bottom row
 * with a dynamic-year copyright + a "built from scratch" note.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const Column = ({ title, links }) => (
    <div>
      <Label as="h3" className="mb-5 block">
        {title}
      </Label>
      <ul className="space-y-3">
        {links.map((l) => {
          // Treat empty / "#" hrefs as not-yet-filled placeholders and render
          // them as plain text rather than self-linking anchors.
          const isPlaceholder = !l.href || l.href === '#';
          const isExternal = l.href?.startsWith('http');
          return (
            <li key={l.label}>
              {isPlaceholder ? (
                <span className="font-mono text-label uppercase text-muted/60">{l.label}</span>
              ) : (
                <a
                  href={l.href}
                  className="font-mono text-label uppercase text-text transition-colors hover:text-orange"
                  {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {l.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <footer className="border-t border-line px-[6vw] pb-10 pt-20">
      {/* Link columns */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
        <Column title="Navigate" links={navLinks} />
        <Column title="Connect" links={socials.connect} />
        <Column title="Elsewhere" links={socials.elsewhere} />
      </div>

      {/* Giant outlined name */}
      <div className="mt-24 select-none" aria-hidden="true">
        <span
          className="block font-display font-extrabold uppercase leading-[0.8] text-outline text-stroke-line"
          style={{ fontSize: 'clamp(60px, 18vw, 260px)', letterSpacing: '-0.03em' }}
        >
          {site.name}
        </span>
      </div>

      {/* Bottom row */}
      <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 font-mono text-label uppercase text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {site.name}
        </span>
        <span>Built from scratch · No templates</span>
      </div>
    </footer>
  );
}
