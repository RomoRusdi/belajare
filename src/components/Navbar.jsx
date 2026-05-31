import { useEffect, useRef, useState } from 'react';
import { site, navLinks } from '../data.js';

/**
 * Navbar — fixed top, mix-blend-difference so it reads against any section.
 *
 * - Left: logo = initials + orange period.
 * - Right: mono uppercase links with an animated hover underline.
 * - Far right: "Available for work" status with a pulsing green dot.
 * - Hides on scroll-down, shows on scroll-up (translateY).
 * - Links + status collapse on mobile (logo always shown).
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Always show near the very top; otherwise follow scroll direction.
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true); // scrolling down
      } else if (y < lastY.current - 6) {
        setHidden(false); // scrolling up
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 mix-blend-difference transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-[6vw] py-5 text-text"
      >
        {/* Logo */}
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight"
          aria-label={`${site.name} — home`}
        >
          {site.initials}
          <span className="text-orange">.</span>
        </a>

        {/* Center / right links — hidden on mobile */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group relative font-mono text-xs uppercase tracking-[0.18em]"
              >
                {l.label}
                {/* animated underline */}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-text transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* Status — hidden on mobile */}
        {site.available && (
          <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-green-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for work
          </div>
        )}
      </nav>
    </header>
  );
}
