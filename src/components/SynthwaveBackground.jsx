import { useEffect, useRef } from 'react';
import { SYNTHWAVE_CONFIG as C } from '../config.js';

/**
 * SynthwaveBackground — the outrun-style hero backdrop on a single 2D
 * <canvas>: a banded retro sun on the horizon, a neon perspective grid
 * scrolling toward the viewer, and a few faint twinkling stars. No
 * libraries, one requestAnimationFrame loop.
 *
 * Colours are read from the design tokens on :root (--orange,
 * --orange-deep, --cream) so the palette stays single-source.
 *
 * Behaviour:
 * - `animate={false}` (reduced motion) draws one static frame — same
 *   picture, nothing moves.
 * - The loop pauses when the hero scrolls off-screen or the tab hides.
 * - Resize (incl. DPR changes) re-measures and redraws.
 */

/** '#rrggbb' → 'r,g,b' for building rgba() strings. */
function hexToRgb(hex) {
  const h = hex.trim().replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export default function SynthwaveBackground({ animate = true }) {
  const canvasRef = useRef(null);
  const animateRef = useRef(animate);
  animateRef.current = animate;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !C.enabled) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    // ---- palette from the design tokens --------------------------------
    const css = getComputedStyle(document.documentElement);
    const orange = hexToRgb(css.getPropertyValue('--orange') || '#d1503a');
    const deep = hexToRgb(css.getPropertyValue('--orange-deep') || '#a83a26');
    const cream = hexToRgb(css.getPropertyValue('--cream') || '#e6d3a5');

    // ---- lite mode (decided once) ---------------------------------------
    const isLite = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    const cols = isLite ? C.gridColsMobile : C.gridCols;
    const starCount = isLite ? C.starCountMobile : C.starCount;
    const maxDpr = isLite ? C.maxDprMobile : C.maxDpr;
    const sunXf = isLite ? C.sunXMobile : C.sunX;

    // Star field — fixed positions in unit space so resizes keep the sky.
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random(),
      seed: Math.random() * Math.PI * 2,
    }));

    // Offscreen layer for the sun so the band gaps can be punched out with
    // destination-out without erasing the sky behind it.
    const sunLayer = document.createElement('canvas');
    const sunCtx = sunLayer.getContext('2d');

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(lastT);
    };

    // ---- draw one frame at time t (seconds) ------------------------------
    let lastT = 0;
    const draw = (t) => {
      lastT = t;
      ctx.clearRect(0, 0, w, h);

      const hy = h * C.horizon; // horizon y
      const sunR = Math.min(Math.max(Math.min(w, h) * C.sunRadiusFactor, C.sunRadiusMin), C.sunRadiusMax);
      const sunX = w * sunXf;
      const sunY = hy;

      // Stars — faint cream points in the sky, slow twinkle.
      for (const s of stars) {
        const sy = s.y * hy * 0.92;
        const twinkle = 0.45 + 0.35 * Math.sin(t * 0.7 + s.seed);
        ctx.fillStyle = `rgba(${cream},${(0.35 * twinkle).toFixed(3)})`;
        ctx.fillRect(s.x * w, sy, s.r, s.r);
      }

      // Sun glow — radial wash behind the disc.
      const glow = ctx.createRadialGradient(sunX, sunY, sunR * 0.2, sunX, sunY, sunR * 3);
      glow.addColorStop(0, `rgba(${orange},0.28)`);
      glow.addColorStop(0.5, `rgba(${deep},0.10)`);
      glow.addColorStop(1, `rgba(${deep},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(sunX - sunR * 3, sunY - sunR * 3, sunR * 6, sunR * 6);

      // Sun disc with band cutouts, composed on the offscreen layer. Only
      // the upper half shows (the horizon/grid covers the rest).
      const sunSize = Math.ceil(sunR * 2 + 4);
      if (sunLayer.width !== sunSize) sunLayer.width = sunSize;
      sunLayer.height = sunSize; // setting height also clears the layer
      const cx = sunSize / 2;
      const grad = sunCtx.createLinearGradient(0, cx - sunR, 0, cx + sunR);
      grad.addColorStop(0, `rgb(${cream})`);
      grad.addColorStop(0.45, `rgb(${orange})`);
      grad.addColorStop(1, `rgb(${deep})`);
      sunCtx.fillStyle = grad;
      sunCtx.beginPath();
      sunCtx.arc(cx, cx, sunR, 0, Math.PI * 2);
      sunCtx.fill();
      // Punch the horizontal gaps — thicker toward the horizon, creeping
      // slowly downward. Only the disc's upper half is ever visible (the
      // floor covers the rest), so the bands live in its lower portion:
      // from ~45% down the visible semicircle to the horizon line.
      sunCtx.globalCompositeOperation = 'destination-out';
      const drift = (t * 0.02) % 1;
      for (let i = 0; i < C.sunBands; i++) {
        const f = (i + drift) / C.sunBands; // 0→1 down the banded zone
        const gapY = cx - sunR * 0.55 + sunR * 0.58 * f;
        const gapH = 1.5 + f * f * (sunR * 0.1);
        sunCtx.fillRect(0, gapY, sunSize, gapH);
      }
      sunCtx.globalCompositeOperation = 'source-over';
      ctx.drawImage(sunLayer, sunX - cx, sunY - cx);

      // Below the horizon everything sits on the page background.
      ctx.fillStyle = 'rgba(13,10,7,0.92)';
      ctx.fillRect(0, hy, w, h - hy);

      // Perspective grid — vertical lines fan out from the vanishing point,
      // which sits at the sun's centre so the "road" converges into the
      // base of the sun.
      const vpX = sunX;
      const spread = (w * 1.6) / cols; // bottom spacing; overshoots the edges
      ctx.lineWidth = 1;
      for (let i = -cols; i <= cols; i++) {
        const alpha = 0.5 - Math.abs(i / cols) * 0.25;
        ctx.strokeStyle = `rgba(${orange},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(vpX, hy);
        ctx.lineTo(vpX + i * spread, h + 2);
        ctx.stroke();
      }

      // Horizontal lines — rows slide from the horizon toward the viewer.
      const phase = (t * C.gridSpeed) % 1;
      for (let i = 0; i < C.gridRows; i++) {
        const z = (i + phase) / C.gridRows; // 0 = horizon, 1 = viewer
        const y = hy + (h - hy) * z * z * z; // cubic → rows bunch at horizon
        const alpha = 0.12 + z * 0.55;
        ctx.strokeStyle = `rgba(${orange},${alpha.toFixed(3)})`;
        ctx.lineWidth = 1 + z * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Horizon line — a bright cream-hot edge with a soft glow above it.
      const hGlow = ctx.createLinearGradient(0, hy - 28, 0, hy);
      hGlow.addColorStop(0, `rgba(${orange},0)`);
      hGlow.addColorStop(1, `rgba(${orange},0.35)`);
      ctx.fillStyle = hGlow;
      ctx.fillRect(0, hy - 28, w, 28);
      ctx.fillStyle = `rgba(${cream},0.9)`;
      ctx.fillRect(0, hy - 0.5, w, 1.5);
    };

    // ---- animation loop with off-screen / hidden-tab pausing ------------
    let rafId = 0;
    let running = false;
    let visible = true;
    const start = performance.now();

    const loop = (now) => {
      rafId = 0;
      if (!running) return;
      draw((now - start) / 1000);
      rafId = requestAnimationFrame(loop);
    };

    const setRunning = (on) => {
      const next = on && visible && animateRef.current && !document.hidden;
      if (next === running) return;
      running = next;
      if (running && !rafId) rafId = requestAnimationFrame(loop);
      if (!running && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setRunning(visible);
    });
    io.observe(canvas);

    const onVisibility = () => setRunning(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Static mode still gets exactly one drawn frame (from resize()); the
    // loop only spins when animation is wanted.
    setRunning(true);

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!C.enabled) return null;

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
