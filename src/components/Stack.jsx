import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { stack } from '../data.js';

/**
 * Stack (03) — a grid of tech cells separated by 1px hairlines. The wrapper
 * draws the top/left edge and each cell draws its right/bottom edge, so
 * empty trailing grid slots stay invisible. Each cell flips to solid
 * brick red with black text on hover.
 */
export default function Stack() {
  return (
    <section id="stack" className="px-[6vw] py-24 md:py-36">
      <SectionHeader number="03" title="Toolkit" />

      <Reveal>
        <div
          className="grid border-l border-t border-line"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
        >
          {stack.map((tech, i) => (
            <div
              key={tech}
              className="group flex h-[130px] flex-col justify-between border-b border-r border-line bg-bg p-5 transition-colors duration-300 hover:bg-orange"
            >
              <span className="font-mono text-label text-muted transition-colors duration-300 group-hover:text-black/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-xl uppercase leading-tight transition-colors duration-300 group-hover:text-black">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
