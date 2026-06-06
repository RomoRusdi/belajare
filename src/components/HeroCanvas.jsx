/* eslint-disable react/no-unknown-property -- react-three-fiber exposes
   three.js objects (points, group, geometry, material…) as intrinsic JSX
   elements, which the React eslint plugin doesn't know about. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { HERO_CONFIG as C } from '../config.js';

/**
 * HeroCanvas — the heavy WebGL hero background. This module is the lazy
 * boundary (imported via React.lazy from Hero.jsx), so three.js / r3f /
 * postprocessing all land in a separate, code-split chunk that never blocks
 * first paint.
 *
 * Visual: a slowly rotating spherical shell of ~6k additive points coloured
 * along the brand ember→orange gradient, with gentle drift, mouse parallax,
 * and a tasteful bloom. Renders only while the hero is on-screen.
 *
 * Reduced-motion is handled by the caller (it simply doesn't mount this).
 */

const PIXEL_RATIO = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

/** Build the point-cloud geometry once: positions on a fibonacci sphere
 *  (with radial jitter for depth), a per-particle colour along the brand
 *  gradient, and a random seed for shader-side shimmer/size variation. */
function buildGeometry(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  const ember = new THREE.Color(C.colorEmber);
  const bright = new THREE.Color(C.colorBright);
  const tmp = new THREE.Color();
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2; // 1 → -1
    const ring = Math.sqrt(Math.max(1 - y * y, 0));
    const theta = golden * i;
    const jitter = C.radius * (0.85 + Math.random() * 0.3);

    positions[i * 3] = Math.cos(theta) * ring * jitter;
    positions[i * 3 + 1] = y * jitter;
    positions[i * 3 + 2] = Math.sin(theta) * ring * jitter;

    tmp.copy(ember).lerp(bright, Math.random());
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;

    seeds[i] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  return geo;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec3 p = position;
    // Subtle per-particle shimmer along the radial direction.
    float t = uTime * 0.5 + aSeed * 6.2831853;
    p += normalize(position) * sin(t) * 0.06;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Small distance-attenuated points (uSize is a base pixel size). The 8.0
    // constant keeps near points ~a handful of px and far ones ~1px — never
    // the screen-filling blobs that blow out additive blending.
    gl_PointSize = uSize * uPixelRatio * (8.0 / -mvPosition.z) * (0.6 + aSeed * 0.8);
    gl_PointSize = clamp(gl_PointSize, 1.0, 14.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
    // Circular soft point — discard outside the disc, fade toward the edge.
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function ParticleField({ count, parallax }) {
  const outer = useRef(null); // parallax tilt
  const inner = useRef(null); // continuous spin + drift
  const pointer = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const geometry = useMemo(() => buildGeometry(count), [count]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: C.pointSize },
          uPixelRatio: { value: PIXEL_RATIO },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // Keep the shader's pixel ratio in sync with the renderer.
  useEffect(() => {
    material.uniforms.uPixelRatio.value = gl.getPixelRatio();
  }, [gl, material]);

  // Throttled (rAF) window-level pointer tracking for parallax — passive,
  // does no DOM work in the handler, cleaned up on unmount.
  useEffect(() => {
    if (!parallax) return;
    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [parallax]);

  // Dispose GPU resources on unmount to avoid leaks.
  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;

    const i = inner.current;
    if (i) {
      i.rotation.y += C.rotationSpeed * delta;
      i.position.y = Math.sin(t * C.driftSpeed) * C.driftAmplitude;
    }

    const o = outer.current;
    if (o && parallax) {
      const tx = pointer.current.y * C.parallaxStrength;
      const ty = pointer.current.x * C.parallaxStrength;
      o.rotation.x += (tx - o.rotation.x) * C.parallaxEase;
      o.rotation.y += (ty - o.rotation.y) * C.parallaxEase;
    }
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        <points geometry={geometry} material={material} frustumCulled={false} />
      </group>
    </group>
  );
}

export default function HeroCanvas() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(true);

  // Mobile / coarse-pointer = cheaper everything (decided once at mount).
  const isLite = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  }, []);

  const count = isLite ? C.particleCountMobile : C.particleCount;
  const parallax = !isLite;
  const bloomIntensity = isLite ? C.bloomIntensityMobile : C.bloomIntensity;

  // Pause all GPU work when the hero scrolls out of view or the tab is hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) setActive(false);
      else setActive(el.getBoundingClientRect().bottom > 0 && el.getBoundingClientRect().top < window.innerHeight);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, isLite ? 1.5 : 2]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 0, 9], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ParticleField count={count} parallax={parallax} />
        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={C.bloomThreshold}
            radius={C.bloomRadius}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
