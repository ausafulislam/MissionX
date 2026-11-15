import { PARTS, getMission, getOrbit, getRocket } from "../data/catalog";
import assumptions from "../data/assumptions.json";
import type { Design, Resources } from "../types";
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
  const nominalGeneration = sum("generation") * orbit.solarFactor;
  const generation =
      nominalGeneration *
      (1 - orbit.eclipse) *
      assumptions.solarAnnualRetention ** (mission.lifetimeTarget / 12),
    consumption = sum("draw");
  const mass = sum("mass") * fleet,
    cost = sum("cost") * fleet + getRocket(design.rocketId).cost;
  const massLimit = Math.min(
    mission.massLimit,
    getRocket(design.rocketId).capacity,
  );
  const massMarginPercent = ((massLimit - mass) / massLimit) * 100;
  const powerMarginPercent = generation
    ? ((generation - consumption) / generation) * 100
    : consumption
      ? -100
      : 0;
  const storage = parts.reduce((n, p) => n + p.storage, 0) * fleet;
  const storageNeeded =
    ((sum("data") * fleet) / 24) * orbit.period * (1 - orbit.contact);
  return {
    nominalGeneration,
    batteryUsable:
      sum("battery") *
      assumptions.batteryUsableFraction *
      assumptions.batteryDischargeEfficiency,
    storage,
    storageNeeded,
    massMarginPercent,
    powerMarginPercent,
    budgetRemaining: mission.budget - cost,
    risk:
      massMarginPercent < 0 || powerMarginPercent < 0 || cost > mission.budget
        ? "high"
        : Math.min(massMarginPercent, powerMarginPercent) < 10
          ? "moderate"
          : "low",
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
