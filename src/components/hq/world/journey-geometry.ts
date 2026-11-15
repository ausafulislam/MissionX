/** Original schematic scene geometry: visual units, not orbital mechanics. */
import { Vector3, Quaternion, MathUtils } from "three";
import type { MissionId } from "@/game/types";

export const DEPLOYMENT = new Vector3(0, 12, 0);
export const JOURNEY_START = 13;
export const ARRIVAL = 18;
const UP = new Vector3(0, 1, 0);
const FORWARD = new Vector3(0, 0, 1);
export const smoothArrival = (x: number) => {
  const t = MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
};
export function journeyGeometry(mission: MissionId) {
  // Keep existing destination placement; account for the Earth's atmosphere mesh.
  const target = new Vector3(...(mission === "sun" ? [7, 0, -4] : [7, 1, -3]));
  const targetKind = mission === "sun" ? "earth" : mission;
  const surfaceRadius = targetKind === "earth" ? 3 * 1.045 : 3;
  // Model radius 4 bounds installed payloads/solar wings at existing render scales.
  const modelScale = mission === "sun" ? 0.28 : 0.55;
  const offsets = mission === "sun"
    ? Array.from({ length: 4 }, (_, i) => new Vector3((i - 1.5) * 1.1, (i % 2 ? 1 : -1) * 0.2, 0))
    : [new Vector3()];
  const envelope = 4 * modelScale + Math.max(...offsets.map(p => p.length()));
  const orbitRadius = surfaceRadius + envelope + 1.2;
  const start = DEPLOYMENT.clone().sub(target);
  const startRadius = start.length();
  const startDirection = start.clone().normalize();
  const entryDirection = new Vector3(-0.8, 0.35, 0.55).normalize();
  const axis = startDirection.clone().cross(entryDirection).normalize();
  const basis = axis.clone().cross(startDirection).normalize();
  const angle = startDirection.angleTo(entryDirection);
  const angularSpeed = angle / (ARRIVAL - JOURNEY_START);
  const orbitRotation = new Quaternion().setFromUnitVectors(FORWARD, axis);
  return { target, targetKind, surfaceRadius, offsets, envelope, modelScale,
    orbitRadius, startRadius, startDirection, axis, basis, angle, angularSpeed, orbitRotation };
}
export type JourneyGeometry = ReturnType<typeof journeyGeometry>;
export function journeyPose(g: JourneyGeometry, time: number, operating: boolean) {
  const u = MathUtils.clamp((time - JOURNEY_START) / (ARRIVAL - JOURNEY_START), 0, 1);
  const elapsed = operating ? Math.max(0, time - ARRIVAL) : 0;
  const theta = g.angle * u + g.angularSpeed * elapsed;
  const direction = g.startDirection.clone().multiplyScalar(Math.cos(theta))
    .addScaledVector(g.basis, Math.sin(theta));
  const radius = g.orbitRadius + (g.startRadius - g.orbitRadius) * (1 - smoothArrival(u));
  const position = g.target.clone().addScaledVector(direction, radius);
  const radialSpeed = -(g.startRadius - g.orbitRadius) * 6 * u * (1 - u) / 5;
  const tangent = g.axis.clone().cross(direction).multiplyScalar(radius * g.angularSpeed)
    .addScaledVector(direction, radialSpeed).normalize();
  const rotation = new Quaternion().setFromUnitVectors(FORWARD, tangent);
  return { position, tangent, rotation };
}
export function journeyCamera(g: JourneyGeometry, time: number, aspect: number, fov = 48) {
  const u = smoothArrival((time - JOURNEY_START) / (ARRIVAL - JOURNEY_START));
  const halfVertical = MathUtils.degToRad(fov / 2);
  const halfHorizontal = Math.atan(Math.tan(halfVertical) * Math.max(0.25, aspect));
  // Frame whole orbit + formation, with padding for view offsets and HUD. Zoom is
  // bounded by this fit rather than an arbitrary close-up distance.
  const frameRadius = g.orbitRadius + g.envelope;
  const fit = frameRadius / Math.sin(Math.min(halfVertical, halfHorizontal)) * 1.16;
  const direction = g.axis.clone().addScaledVector(UP, 0.12).normalize();
  const end = g.target.clone().addScaledVector(direction, fit);
  const establishing = g.target.clone().addScaledVector(direction, fit * 1.3);
  // Continuous handoff from the existing ascent camera, then slow target zoom.
  const handoff = smoothArrival((time - JOURNEY_START) / 1.5);
  const position = new Vector3(12, 13, 15).lerp(establishing.clone().lerp(end, u), handoff);
  const lookAt = new Vector3(0, 12, 0).lerp(g.target, handoff);
  return { position, lookAt, fit };
}
