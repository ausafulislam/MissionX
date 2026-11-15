"use client";
import { useMemo } from "react";
import { Color } from "three";
/** Stationary deterministic shells, three draw calls, no per-star objects/timers. */
export function makeStarLayer(count: number, layer: number) {
  const positions = new Float32Array(count * 3), colors = new Float32Array(count * 3);
  let seed = 8917 + layer * 101;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const tint = new Color();
  for (let i = 0; i < count; i++) {
    const y = random() * 2 - 1, angle = random() * Math.PI * 2;
    const radius = 65 + layer * 18 + random() * 16, ring = Math.sqrt(1 - y * y);
    positions.set([radius * ring * Math.cos(angle), radius * y, radius * ring * Math.sin(angle)], i * 3);
    tint.set(random() < 0.15 ? "#ead4b4" : "#bfd6e8").multiplyScalar(0.45 + random() * 0.55);
    colors.set([tint.r, tint.g, tint.b], i * 3);
  }
  return { positions, colors };
}
function StarLayer({ count, layer, opacity }: { count: number; layer: number; opacity: number }) {
  const data = useMemo(() => makeStarLayer(count, layer), [count, layer]);
  return <points frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
    </bufferGeometry>
    <pointsMaterial vertexColors size={[0.8, 1.2, 1.8][layer]} sizeAttenuation={false}
      transparent opacity={opacity * [0.5, 0.7, 0.85][layer]} depthWrite={false} />
  </points>;
}
export function JourneyStars({ low, opacity }: { low: boolean; opacity: number }) {
  return <group>{[0, 1, 2].map(layer => <StarLayer key={layer} layer={layer}
    count={low ? [430, 290, 130][layer] : [1200, 800, 350][layer]} opacity={opacity} />)}</group>;
}
