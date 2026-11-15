import assumptions from "../data/assumptions.json";
import {
  CATEGORIES,
  ORBITS,
  PARTS,
  ROCKETS,
  getMission,
  getOrbit,
  getRocket,
} from "../data/catalog";
import type {
  Check,
  CheckStatus,
  Design,
  Resources,
  Verification,
} from "../types";
import { resources, selectedParts } from "./resources";
export function numericCheck(
  id: string,
  label: string,
  actual: number,
  target: number,
  unit: string,
  minimum = false,
): Check {
  const passed = minimum ? actual >= target : actual <= target;
  const ratio = minimum
    ? target
      ? actual / target
      : 1
    : actual
      ? target / actual
      : 1;
  const status: CheckStatus = passed ? "pass" : ratio >= 0.9 ? "close" : "fail";
  const amount = Math.abs(target - actual);
  return {
    id,
    label,
    actual,
    target,
    unit,
    status,
    reason: passed
      ? `${actual.toFixed(1)} ${unit} meets the ${minimum ? "minimum" : "maximum"} of ${target} ${unit}.`
      : `${minimum ? "Increase by" : "Reduce by"} ${amount.toFixed(1)} ${unit} to meet the ${target} ${unit} ${minimum ? "minimum" : "limit"}.`,
  };
}
export function missionRequirements(
  design: Design,
  r: Resources = resources(design),
): Check[] {
  const m = getMission(design.missionId);
  return [
    numericCheck("mass", "Spacecraft mass", r.mass, m.massLimit, "kg"),
    numericCheck("budget", "Mission budget", r.cost, m.budget, "$M"),
    numericCheck(
      "science",
      "Science capability",
      r.science,
      m.scienceTarget,
      "points",
      true,
    ),
    numericCheck(
      "lifetime",
      "Design lifetime",
      r.lifetime,
      m.lifetimeTarget,
      "months",
      true,
    ),
  ];
}
function condition(
  id: string,
  label: string,
  pass: boolean,
  reason: string,
): Check {
  return {
    id,
    label,
    status: pass ? "pass" : "fail",
    actual: pass ? 1 : 0,
    target: 1,
    unit: "",
    reason,
  };
}
export function verify(design: Design): Verification {
  const r = resources(design),
    parts = selectedParts(design),
    m = getMission(design.missionId),
    rocket = getRocket(design.rocketId),
    orbit = getOrbit(design.orbitId);
  const mandatory = CATEGORIES.filter(
    (c) => !["camera", "science"].includes(c.id),
  );
  const missing = mandatory.filter(
    (c) => !parts.some((p) => p.category === c.id),
  );
  const incompatible = parts.filter((p) => !p.missions.includes(m.id));
  const duplicates = CATEGORIES.filter(
    (c) =>
      c.id !== "science" && parts.filter((p) => p.category === c.id).length > 1,
  );
  const payload =
    m.id === "sun"
      ? parts.some((p) => p.id === "coronagraph")
      : parts.some((p) => p.category === "camera");
  const dependencies = parts.filter(
    (p) =>
      p.requiresAny && !p.requiresAny.some((id) => design.partIds.includes(id)),
  );
  const payloadMass = parts
    .filter((p) => ["science", "camera"].includes(p.category))
    .reduce((n, p) => n + p.mass, 0);
  const payloadLimit =
    parts.find((p) => p.category === "structure")?.payloadLimit ?? 0;
  const checks = [
    ...missionRequirements(design, r),
    numericCheck(
      "power",
      "Average power supply",
      r.generation,
      r.consumption,
      "W",
      true,
    ),
    numericCheck(
      "battery",
      "Eclipse energy reserve",
      r.batteryUsable,
      r.batteryNeeded,
      "Wh",
      true,
    ),
    numericCheck(
      "data",
      "Daily downlink capacity",
      r.downlink,
      r.data,
      "GB/day",
      true,
    ),
    numericCheck(
      "storage",
      "Onboard storage between contacts",
      r.storage,
      r.storageNeeded,
      "GB",
      true,
    ),
    numericCheck(
      "rocket-mass",
      "Launch vehicle capacity",
      r.mass,
      rocket.capacity,
      "kg",
    ),
    condition(
      "subsystems",
      "Required subsystems",
      !missing.length,
      missing.length
        ? `Add ${missing.map((c) => c.name.toLowerCase()).join(", ")}.`
        : "All six essential subsystems are installed.",
    ),
    condition(
      "payload",
      "Mission science payload",
      payload,
      payload
        ? "The mission-specific science instrument is installed."
        : m.id === "sun"
          ? "Install a solar coronagraph on each satellite."
          : "Install a mapping or high-resolution camera.",
    ),
    condition(
      "parts",
      "Instrument compatibility",
      !incompatible.length,
      incompatible.length
        ? `Remove incompatible components: ${incompatible.map((p) => p.name).join(", ")}.`
        : "All components support this destination.",
    ),
    condition(
      "dependencies",
      "Pointing / payload dependencies",
      !dependencies.length,
      dependencies.length
        ? `${dependencies.map((p) => p.name).join(", ")} needs a compatible precision pointing suite (deep-space or star-tracker).`
        : "All payload pointing requirements are supported.",
    ),
    numericCheck(
      "bus-payload",
      "Structure payload allowance",
      payloadMass,
      payloadLimit,
      "kg",
    ),
    condition(
      "slots",
      "Component slots",
      !duplicates.length &&
        new Set(design.partIds).size === design.partIds.length,
      duplicates.length
        ? "Choose one component per subsystem; science instruments can be combined."
        : "One part per subsystem; no duplicate instruments.",
    ),
    condition(
      "orbit",
      "Science orbit",
      orbit.missions.includes(m.id),
      orbit.missions.includes(m.id)
        ? `${orbit.name} supports ${m.name}.`
        : `${orbit.name} cannot meet ${m.name} objectives. Choose a compatible science orbit.`,
    ),
    condition(
      "launch-orbit",
      "Launch trajectory",
      rocket.orbits.includes(orbit.id),
      rocket.orbits.includes(orbit.id)
        ? `${rocket.name} can reach ${orbit.name}.`
        : `${rocket.name} cannot reach ${orbit.name}. Select another launch service.`,
    ),
    condition(
      "catalog",
      "Valid configuration",
      design.partIds.every((id) => PARTS.some((p) => p.id === id)) &&
        ROCKETS.some((x) => x.id === design.rocketId) &&
        ORBITS.some((x) => x.id === design.orbitId),
      "Configuration uses known catalog components, launcher and orbit.",
    ),
  ];
  // Data/storage deficits may be flown for learning, but never silent or full-science promises.
  for (const check of checks) {
    if (
      ["data", "storage"].includes(check.id) &&
      check.actual > 0 &&
      check.status !== "pass"
    ) {
      check.status = "close";
      check.blocking = false;
      check.reason +=
        " Accepted operational risk: limited capacity may lose observations and reduce science credit.";
    }
  }
  for (const [id, label, value] of [
    ["mass-margin", "Mass headroom", r.massMarginPercent],
    ["power-margin", "End-of-life power headroom", r.powerMarginPercent],
  ] as const) {
    checks.push({
      id,
      label,
      status: value >= assumptions.advisoryMarginPercent ? "pass" : "close",
      blocking: false,
      actual: value,
      target: assumptions.advisoryMarginPercent,
      unit: "%",
      reason: `${value.toFixed(1)}% headroom. ${assumptions.advisoryMarginPercent}% is a gameplay advisory, not a flight standard. Low headroom increases vulnerability to events.`,
    });
  }
  return {
    checks,
    resources: r,
    ready: checks.every((c) => c.status === "pass" || c.blocking === false),
  };
}
