/**
 * Cheap one-shot WebGL capability probe. Creates a throwaway canvas and
 * tries to acquire a context; returns false if the browser/GPU can't give
 * us one (so callers can fall back to the CSS background instead of
 * mounting a doomed <Canvas>).
 */
let cached;

export function supportsWebGL() {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement('canvas');
    cached = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    cached = false;
  }
  return cached;
}
