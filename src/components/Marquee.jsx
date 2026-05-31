import { marqueeItems } from '../data.js'

/**
 * Marquee — full-bleed orange band with black Syne text scrolling left
 * forever. The track is duplicated and slides -50%, so the loop is seamless.
 */
export default function Marquee() {
  // One copy of the content (rendered twice in the track).
  const Track = () => (
    <span
      className="flex shrink-0 items-center font-display text-[clamp(28px,5vw,64px)] font-extrabold uppercase tracking-tight"
      aria-hidden="true"
    >
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6">{item}</span>
          <span className="text-[0.55em]">✳</span>
        </span>
      ))}
    </span>
  )

  return (
    <div
      className="overflow-hidden border-y border-black/20 bg-orange py-4 text-black"
      role="presentation"
    >
      <div className="flex w-max animate-marquee will-change-transform">
        <Track />
        <Track />
      </div>
    </div>
  )
}
