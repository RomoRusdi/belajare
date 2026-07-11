/**
 * ============================================================
 *  Tuning knobs for the synthwave hero background
 *  (SynthwaveBackground.jsx). Dial these in — or flip `enabled`
 *  off — without touching draw code. Mobile/coarse-pointer
 *  devices use the reduced values automatically.
 * ============================================================
 */
export const SYNTHWAVE_CONFIG = {
  // Master switch. Set false to drop the canvas entirely
  // (the plain CSS hero background shows through instead).
  enabled: true,

  // Vertical position of the horizon line, as a fraction of hero height.
  horizon: 0.62,

  // Sun centre X as a fraction of width — also the grid's vanishing point,
  // so the perspective lines converge into the base of the sun. Desktop
  // pushes it right of the headline; small screens centre it.
  sunX: 0.72,
  sunXMobile: 0.5,

  // Sun radius = min(width, height) * this factor, clamped to px range.
  sunRadiusFactor: 0.17,
  sunRadiusMin: 70,
  sunRadiusMax: 190,

  // Horizontal band cutouts across the sun's lower half (the retro sun).
  sunBands: 6,

  // Grid: how many rows/columns of the perspective floor to draw.
  gridRows: 13,
  gridCols: 15, // per side of centre
  gridColsMobile: 9,

  // Floor scroll speed — full row-cycles per second (the "moving floor").
  gridSpeed: 0.13,

  // Sky stars above the horizon.
  starCount: 90,
  starCountMobile: 40,

  // Cap on devicePixelRatio (2 keeps retina crisp without 3x fill cost).
  maxDpr: 2,
  maxDprMobile: 1.5,
};
