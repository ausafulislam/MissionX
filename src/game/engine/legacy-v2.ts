import { EVENT_OPTIONS } from "../data/events";
import { getMission, getOrbit, getRocket } from "../data/catalog";
import type { Design, MissionEvent, SegmentReport, Simulation } from "../types";
import { missionRequirements, verify } from "./validation";
export function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const event = (
  at: number,
  kind: MissionEvent["kind"],
  label: string,
  description: string,
  severity: MissionEvent["severity"] = "info",
): MissionEvent => ({
  at,
  kind,
  label,
  description,
  severity,
  powerFactor: 1,
  dataFactor: 1,
  lifetimeFactor: 1,
});
export function simulate(design: Design, seed: number): Simulation {
  const validation = verify(design),
    r = validation.resources,
    m = getMission(design.missionId),
    rocket = getRocket(design.rocketId),
    rng = seededRandom(seed);
  const launchOk = validation.ready && rng() < rocket.reliability;
  const events: MissionEvent[] = [
    event(
      0,
      "countdown",
      "Terminal countdown",
      "Final guidance, power and communications checks.",
    ),
    event(
      3,
      "liftoff",
      "Liftoff",
      `${rocket.name} lifts ${r.mass} kg toward ${m.name}.`,
    ),
  ];
  if (!launchOk)
    events.push(
      event(
        7,
        "failure",
        "Mission lost",
        validation.ready
          ? "A launch propulsion fault prevented orbital insertion. Reliability is a risk estimate, not a guarantee."
          : "The configuration did not meet prelaunch checks. The mission could not proceed.",
        "failure",
      ),
    );
  else {
    events.push(
      event(
        8,
        "separation",
        "Stage separation",
        "The booster separates. The upper stage continues the journey.",
      ),
      event(
        13,
        "deployment",
        "Payload deployment",
        `${m.fleet === 4 ? "Four coordinated spacecraft deploy" : "Your spacecraft deploys"} and solar arrays unfold.`,
      ),
      event(
        18,
        "operations",
        "Science operations",
        "Instruments begin observing. The ground segment receives the first data.",
      ),
    );
    const anomaly = {
      ...EVENT_OPTIONS[Math.floor(rng() * EVENT_OPTIONS.length)],
      at: 23,
    };
    if (anomaly.kind === "storm" && design.partIds.includes("computer-rad")) {
      anomaly.powerFactor = 0.94;
      anomaly.dataFactor = 0.97;
      anomaly.lifetimeFactor = 1;
      anomaly.description +=
        " Your protected computer maintains its design lifetime.";
    }
    if (anomaly.kind === "outage" && design.partIds.includes("radio-relay")) {
      anomaly.dataFactor = 0.95;
      anomaly.description +=
        " Your high-capacity radio recovers most of the data.";
    }
    events.push(
      anomaly,
      event(
        30,
        "complete",
        "Mission complete",
        "The science campaign ends. Mission control evaluates the returned dataset.",
      ),
    );
  }
  const incident = launchOk ? events[events.length - 2] : null;
  const rawPower = launchOk ? r.generation * (incident?.powerFactor ?? 1) : 0;
  const reservePower = launchOk
    ? Math.max(0, r.battery - r.batteryNeeded) / getOrbit(design.orbitId).period
    : 0;
  const power =
    rawPower + Math.min(Math.max(0, r.consumption - rawPower), reservePower);
  const availability = launchOk
    ? Math.min(1, power / Math.max(1, r.consumption))
    : 0;
  const dataFactor = launchOk ? (incident?.dataFactor ?? 1) * availability : 0;
  const lifetime = launchOk
    ? Number(
        (r.lifetime * (incident?.lifetimeFactor ?? 1) * availability).toFixed(
          1,
        ),
      )
    : 0;
  const science = Number((r.science * dataFactor).toFixed(1));
  const returnedData = Number(
    (Math.min(r.data, r.downlink) * dataFactor).toFixed(1),
  );
  const requirements = missionRequirements(design, { ...r, science, lifetime });
  const passed = requirements.filter((c) => c.status === "pass").length;
  const scienceScore = Math.round(Math.min(1, science / m.scienceTarget) * 100);
  const engineeringScore = launchOk
    ? Math.round(
        ((availability + Math.min(1, lifetime / m.lifetimeTarget)) / 2) * 100,
      )
    : 0;
  const efficiencyScore = launchOk
    ? Math.round(
        Math.min(
          1,
          ((m.budget - r.cost) / m.budget + 0.55) *
            Math.min(1, science / m.scienceTarget),
        ) * 100,
      )
    : 0;
  const score = launchOk
    ? Math.round(
        scienceScore * 0.5 + engineeringScore * 0.35 + efficiencyScore * 0.15,
      )
    : 0;
  const outcome: Simulation["outcome"] =
    !launchOk || science < m.scienceTarget * 0.5
      ? "failed"
      : passed === 4 && availability === 1
        ? "success"
        : "partial";
  const segments: SegmentReport[] = [
    {
      name: "LAUNCH",
      status: launchOk ? "pass" : "fail",
      explanation: launchOk
        ? `${rocket.name} delivered the ${r.mass} kg payload to the selected orbit.`
        : events[events.length - 1].description,
    },
    {
      name: "SPACE",
      status: !launchOk
        ? "fail"
        : availability < 1 || lifetime < m.lifetimeTarget
          ? "close"
          : "pass",
      explanation: launchOk
        ? `Available power (including usable battery reserve): ${power.toFixed(0)} W for ${r.consumption} W demand. Achieved lifetime: ${lifetime} months.`
        : "No spacecraft reached science operations.",
    },
    {
      name: "GROUND",
      status: !launchOk ? "fail" : dataFactor < 1 ? "close" : "pass",
      explanation: launchOk
        ? `${returnedData} GB/day of useful data returned from a planned ${r.data} GB/day.`
        : "No science data reached the ground segment.",
    },
    {
      name: "USER",
      status:
        science >= m.scienceTarget
          ? "pass"
          : science >= m.scienceTarget * 0.5
            ? "close"
            : "fail",
      explanation: `Scientists received ${science} science points against a target of ${m.scienceTarget}.`,
    },
  ];
  const lessons: string[] = [];
  if (!launchOk)
    lessons.push(
      validation.ready
        ? "Even a verified design carries launch risk. Try another flight seed or a more reliable launch service."
        : "Resolve all prelaunch checks before retrying.",
    );
  if (power < r.consumption && launchOk)
    lessons.push(
      "Add a larger solar array. Positive normal margins are not always enough during a solar storm.",
    );
  if (science < m.scienceTarget && launchOk)
    lessons.push(
      "Add science margin: a stronger payload or better data recovery can keep discovery on target when events reduce return.",
    );
  if (lifetime < m.lifetimeTarget && launchOk)
    lessons.push(
      "Choose longer-life components. The shortest-lived installed part limits the whole spacecraft.",
    );
  if (incident?.kind === "storm")
    lessons.push("Radiation-tolerant computers reduce solar-storm damage.");
  if (incident?.kind === "outage")
    lessons.push(
      "A deep-space transceiver can recover more data after a missed ground contact.",
    );
  if (!lessons.length)
    lessons.push(
      "Your design met the science goal. Explore whether a lighter or less expensive configuration can return the same science.",
    );
  return {
    modelVersion: 2,
    seed,
    outcome,
    score,
    scienceScore,
    engineeringScore,
    efficiencyScore,
    lifetime,
    science,
    returnedData,
    power,
    duration: launchOk ? 30 : 7,
    events,
    requirements,
    segments,
    lessons,
  };
}
