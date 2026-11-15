import { PARTS, getMission, getOrbit, getRocket } from "../../data/catalog";
import {resources as currentResources} from "../resources";
import type { Design, Resources } from "../../types";
export function selectedParts(design: Design) {
  return PARTS.filter((p) => design.partIds.includes(p.id));
}
export function resources(design: Design): Resources {
  const parts = selectedParts(design),
    mission = getMission(design.missionId),
    orbit = getOrbit(design.orbitId),
    fleet = mission.fleet;
  const sum = (
    key:
      | "mass"
      | "cost"
      | "draw"
      | "generation"
      | "battery"
      | "data"
      | "downlink"
      | "science",
  ) => parts.reduce((n, p) => n + p[key], 0);
  const generation =
      sum("generation") * orbit.solarFactor * (1 - orbit.eclipse),
    consumption = sum("draw");
  return {
    ...currentResources(design),
    mass: sum("mass") * fleet,
    cost: sum("cost") * fleet + getRocket(design.rocketId).cost,
    generation,
    consumption,
    powerMargin: generation - consumption,
    battery: sum("battery"),
    batteryNeeded: consumption * orbit.eclipse * orbit.period,
    data: sum("data") * fleet,
    downlink: sum("downlink") * orbit.contact * fleet,
    science: sum("science") * fleet,
    lifetime: parts.length ? Math.min(...parts.map((p) => p.lifetime)) : 0,
    fleet,
  };
}
