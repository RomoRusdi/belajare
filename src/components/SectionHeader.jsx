import Reveal from './Reveal.jsx';
import Label from './Label.jsx';

/**
 * SectionHeader — the shared header pattern for sections 01–03.
 * Orange number on the left, muted title on the right (both in the unified
 * label voice), spaced apart by a hairline, with a large bottom margin.
 */
export default function SectionHeader({ number, title }) {
  return (
    <Reveal className="mb-16 flex items-center justify-between border-b border-line pb-5 md:mb-24">
      <Label accent>({number})</Label>
      <Label>{title}</Label>
    </Reveal>
  );
}
