import Reveal from './Reveal.jsx';
import Label from './Label.jsx';

/**
 * SectionHeader — the shared header pattern for sections 01–03, in the
 * retro-HUD voice: a diamond + bracketed number on the left, the title on
 * the right, joined by a hairline with a small registration tick at each
 * end, and a large bottom margin.
 */
export default function SectionHeader({ number, title }) {
  return (
    <Reveal className="mb-16 md:mb-24">
      <div className="flex items-center justify-between pb-5">
        <Label accent className="flex items-center gap-3">
          <span aria-hidden="true">✦</span>[ {number} ]
        </Label>
        <Label>{title}</Label>
      </div>
      {/* Hairline with end ticks */}
      <div className="relative border-b border-line" aria-hidden="true">
        <span className="absolute -top-1 left-0 h-2 w-px bg-orange" />
        <span className="absolute -top-1 right-0 h-2 w-px bg-orange" />
      </div>
    </Reveal>
  );
}
