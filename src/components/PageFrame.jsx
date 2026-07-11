/**
 * PageFrame — the fixed retro-futuristic HUD border that wraps the whole
 * viewport, modelled on vintage sci-fi print frames: a thin brick-red
 * rounded rectangle, cream corner brackets, and a small ornament row of
 * diamonds/dots along the top edge.
 *
 * Purely decorative: fixed, pointer-events-none, aria-hidden. Sits above
 * the grain (z-45) but below the navbar (z-50). The corner brackets are
 * drawn slightly inside the border so nothing clips at the viewport edge.
 */
export default function PageFrame() {
  // One L-shaped corner bracket; rotated into each corner.
  const corner = (pos, rotate) => (
    <span
      className={`absolute ${pos} h-4 w-4 border-cream/80`}
      style={{
        borderTopWidth: 2,
        borderLeftWidth: 2,
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[46] hidden sm:block">
      {/* Outer border — thin red rounded rect, inset from the viewport */}
      <div className="absolute inset-3 rounded-xl border border-orange/60" />

      {/* Corner brackets — cream, hugging the border corners */}
      {corner('left-1.5 top-1.5', 0)}
      {corner('right-1.5 top-1.5', 90)}
      {corner('bottom-1.5 right-1.5', 180)}
      {corner('bottom-1.5 left-1.5', 270)}

      {/* Top-centre ornament row — ✦ · ● ● · ✦ like the reference's header edge */}
      <div className="absolute left-1/2 top-[5px] flex -translate-x-1/2 items-center gap-6 bg-bg px-5 text-[9px] leading-none text-cream/90">
        <span>✦</span>
        <span className="h-1.5 w-1.5 rounded-full bg-cream/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-cream/80" />
        <span>✦</span>
      </div>

      {/* Side tick marks — small registration dashes mid-height */}
      <div className="absolute left-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        <span className="ml-[-1px] h-px w-2.5 bg-orange/70" />
        <span className="ml-[-1px] h-px w-1.5 bg-orange/40" />
        <span className="ml-[-1px] h-px w-2.5 bg-orange/70" />
      </div>
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-end gap-2">
        <span className="mr-[-1px] h-px w-2.5 bg-orange/70" />
        <span className="mr-[-1px] h-px w-1.5 bg-orange/40" />
        <span className="mr-[-1px] h-px w-2.5 bg-orange/70" />
      </div>
    </div>
  );
}
