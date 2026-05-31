import Reveal from './Reveal.jsx';

/**
 * SectionHeader — the shared header pattern for sections 01–03.
 * Mono orange number on the left, mono uppercase muted title on the
 * right, spaced apart by a hairline, with a large bottom margin.
 */
export default function SectionHeader({ number, title }) {
  return (
    <Reveal className="mb-16 flex items-center justify-between border-b border-line pb-5 md:mb-24">
      <span className="font-mono text-sm text-orange">({number})</span>
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted sm:text-sm">
        {title}
      </span>
    </Reveal>
  );
}
