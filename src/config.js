/**
 * ============================================================
 *  Tuning knobs for the WebGL hero background (HeroCanvas).
 *  Dial these in — or flip `enabled` off — without touching
 *  shader code. Mobile/coarse-pointer devices use the reduced
 *  values automatically.
 * ============================================================
 */
export const HERO_CONFIG = {
  // Master switch. Set false to drop the WebGL hero entirely
  // (the CSS hero background shows through instead).
  enabled: true,

  // Particle counts for the rotating point-cloud shell.
  particleCount: 6000, // desktop / fine pointer
  particleCountMobile: 2000, // <768px or coarse pointer

  // Radius of the spherical shell the particles live on.
  radius: 4.2,

  // Continuous rotation speed (radians/second) around the Y axis.
  rotationSpeed: 0.05,

  // Vertical bob — amplitude (world units) and speed (radians/second).
  driftAmplitude: 0.18,
  driftSpeed: 0.4,

  // Mouse parallax: how far the cloud tilts toward the cursor (radians)
  // and how quickly it eases there (0–1 lerp factor per frame).
  parallaxStrength: 0.25,
  parallaxEase: 0.05,

  // Base point size in (CSS) pixels, attenuated by distance in the shader.
  // Keep this small — large additive points blow out to white and tank fill
  // rate.
  pointSize: 1.6,

  // Bloom (post-processing). Threshold is high so only the bright particle
  // cores bloom (not the whole field), keeping the centre dark enough for the
  // white headline to read and avoiding a washed-out screen.
  bloomIntensity: 0.5,
  bloomIntensityMobile: 0.3,
  bloomThreshold: 0.55,
  bloomRadius: 0.5,

  // Brand gradient the particles are coloured along — deep brick red
  // rising to vintage cream, like hot film-grain embers.
  colorEmber: '#a83a26', // deep brick
  colorBright: '#e6d3a5', // cream highlight
};
