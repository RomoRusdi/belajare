import { marqueeItems } from '../data.js';

/**
 * Marquee — full-bleed brick-red band with black Anton text scrolling left
 * forever. The track is duplicated and slides -50%, so the loop is seamless.
 */
export default function Marquee() {
  // One copy of the content (rendered twice in the track).
  const Track = () => (
    <span className="flex shrink-0 items-center font-display text-[clamp(28px,5vw,64px)] uppercase">
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6">{item}</span>
          <span className="text-[0.5em]">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="overflow-hidden border-y-2 border-black/25 bg-orange py-4 text-black"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee will-change-transform">
        <Track />
        <Track />
      </div>
    </div>
  );
}
