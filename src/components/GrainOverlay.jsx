/**
 * GrainOverlay — the vintage-print texture stack: film grain + faint CRT
 * scanlines. Heavier than a typical "polish" grain on purpose; the aged
 * texture is a core part of the retro-futuristic look.
 *
 * The noise is an inline SVG feTurbulence (no asset request). Sits above
 * the page but below interactive UI, and never intercepts pointer events.
 */
export default function GrainOverlay() {
  const noise =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

  return (
    <>
      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[45] opacity-[0.07]"
        style={{
          backgroundImage: `url("${noise}")`,
          backgroundRepeat: 'repeat',
        }}
      />
      {/* CRT scanlines — 1px dark line every 3px, barely-there */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[45] opacity-[0.05]"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0 2px, #000 2px 3px)',
        }}
      />
    </>
  );
}
