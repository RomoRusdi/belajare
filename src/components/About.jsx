import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import RichText from '../lib/richText.jsx';
import { about } from '../data.js';

/**
 * About (01) — a big statement (with orange-accented words) over a
 * two-column grid of bio paragraphs.
 */
export default function About() {
  // Wrap each accent word in an orange span inside the statement.
  const renderStatement = () => {
    const accentSet = new Set(about.accents.map((a) => a.toLowerCase()));
    // Split on whitespace but keep the separators.
    return about.statement.split(/(\s+)/).map((token, i) => {
      const bare = token.replace(/[.,!?;:]/g, '').toLowerCase();
      if (accentSet.has(bare)) {
        return (
          <span key={i} className="text-orange">
            {token}
          </span>
        );
      }
      return <span key={i}>{token}</span>;
    });
  };

  return (
    <section id="about" className="px-[6vw] py-24 md:py-36">
      <SectionHeader number="01" title="About" />

      {/* Big statement */}
      <Reveal>
        <h2 className="max-w-[16ch] text-display-lg text-balance font-display font-bold">
          {renderStatement()}
        </h2>
      </Reveal>

      {/* Two-column bio */}
      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="max-w-[52ch] text-body-lg text-pretty text-hang text-muted-2">
              <RichText text={p} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
