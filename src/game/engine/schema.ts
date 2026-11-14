import { MISSIONS, ORBITS, PARTS, ROCKETS } from "../data/catalog";
import type { Design } from "../types";
export function validDesign(value: unknown): value is Design {
  if (!value || typeof value !== "object") return false;
  const d = value as Record<string, unknown>;
  return (
    MISSIONS.some((m) => m.id === d.missionId) &&
    Array.isArray(d.partIds) &&
    d.partIds.length <= PARTS.length &&
    d.partIds.every(
      (id) => typeof id === "string" && PARTS.some((p) => p.id === id),
    ) &&
    new Set(d.partIds).size === d.partIds.length &&
    ROCKETS.some((r) => r.id === d.rocketId) &&
    ORBITS.some((o) => o.id === d.orbitId)
  );
}
