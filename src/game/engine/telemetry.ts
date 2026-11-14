import { getMission, getOrbit } from "../data/catalog";
import type { Design, Simulation } from "../types";
import { resources } from "./resources";
export function telemetry(design: Design, result: Simulation, time: number) {
  const t = Math.max(0, Math.min(time, result.duration)),
    r = resources(design),
    active = result.events.filter((e) => e.at <= t),
    last = active[active.length - 1];
  const incident = active.find((e) =>
    ["storm", "outage", "fault"].includes(e.kind),
  );
  const failed = last?.kind === "failure",
    orbit = t >= 13 && !failed;
  return {
    phase: last,
    altitude: failed
      ? 0
      : Math.round(
          t < 3
            ? 0
            : orbit
              ? design.missionId === "mars"
                ? 320
                : design.missionId === "moon"
                  ? 100
                  : 550
              : Math.min(180, (t - 3) * 18),
        ),
    power: failed ? 0 : t >= 13 ? (incident ? result.power : r.generation) : 0,
    data:
      t >= 18 && !failed
        ? incident
          ? result.returnedData
          : Math.min(r.data, r.downlink)
        : 0,
    velocity: failed ? 0 : t < 3 ? 0 : Math.min(7.8, (t - 3) * 0.7),
    fleet: getMission(design.missionId).fleet,
    orbit: getOrbit(design.orbitId).name,
  };
}
