import Reveal from './Reveal.jsx';
import Label from './Label.jsx';
import { stats } from '../data.js';

/**
 * Stats — a 4-up row (2-up on mobile) under a top hairline. Each stat is a
 * huge Syne number whose unit/suffix is orange, plus a mono muted label.
 */
export default function Stats() {
  return (
    <section className="px-[6vw] py-24 md:py-32">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-14 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col gap-3">
              <div className="text-stat nums-tabular font-display font-extrabold">
                {s.value}
                {s.unit && <span className="text-orange">{s.unit}</span>}
              </div>
              <Label>{s.label}</Label>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
