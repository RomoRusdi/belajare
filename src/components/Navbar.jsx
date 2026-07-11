import { useEffect, useRef, useState } from 'react';
import { site, navLinks } from '../data.js';
import { scrollToTarget } from '../lib/smoothScroll.js';

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
  const [active, setActive] = useState('');
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

  // Active-section highlighting: flag whichever section is crossing the
  // upper-middle of the viewport. The rootMargin band keeps exactly one
  // section active at a time.
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const onNavClick = (e, href) => {
    e.preventDefault();
    setActive(href);
    scrollToTarget(href);
  };

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
          className="py-2 font-display text-xl uppercase tracking-wide"
          aria-label={`${site.name} — home`}
        >
          {site.initials}
          <span className="text-orange">✦</span>
        </a>

        {/* Center / right links — compact type on mobile, full label voice
            from md up. py padding keeps tap targets comfortable. */}
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {navLinks.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative block px-0.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors md:text-label ${
                    isActive ? 'text-orange' : ''
                  }`}
                >
                  {l.label}
                  {/* Underline — animated on hover; stays lit (orange) while
                      this section is active so it reads on the blend. */}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full transition-transform duration-300 ease-out ${
                      isActive
                        ? 'origin-left scale-x-100 bg-orange'
                        : 'origin-right scale-x-0 bg-text group-hover:origin-left group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Status — hidden on mobile */}
        {site.available && (
          <div className="hidden items-center gap-2 font-mono text-label uppercase md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-orange" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            Available for work
          </div>
        )}
      </nav>
    </header>
  );
}
