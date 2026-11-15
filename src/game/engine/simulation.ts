import assumptions from "../data/assumptions.json";
import { EVENT_OPTIONS } from "../data/events";
import { getMission, getRocket } from "../data/catalog";
import type { Design, MissionEvent, SegmentReport, Simulation } from "../types";
import { operate } from "./operations";
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
  const operations = operate(design, incident, launchOk);
  const availability = operations.availability;
  const power = operations.averageDeliveredPower;
  const lifetime = launchOk
    ? Number((r.lifetime * (incident?.lifetimeFactor ?? 1)).toFixed(1))
    : 0;
  operations.campaignGeneratedGB =
    (operations.generatedGB / operations.days) *
    Math.min(lifetime, m.lifetimeTarget) *
    30;
  operations.campaignReceivedGB =
    (operations.receivedGB / operations.days) *
    Math.min(lifetime, m.lifetimeTarget) *
    30;
  // Scientific credit requires received observations AND the required operating duration.
  const dataFactor = operations.scienceFraction;
  const science = Number(
    (r.science * dataFactor * Math.min(1, lifetime / m.lifetimeTarget)).toFixed(
      1,
    ),
  );
  const returnedData = Number(
    (operations.receivedGB / operations.days).toFixed(3),
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
        Math.max(
          0,
          Math.min(
            1,
            ((m.budget - r.cost) / m.budget + 0.55) *
              Math.min(1, science / m.scienceTarget),
          ),
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
      : passed === 4 && availability >= 1 - 1e-9
        ? "success"
        : "partial";
  const segments: SegmentReport[] = [
    {
      name: "LAUNCH",
      status: launchOk ? "pass" : "fail",
      explanation: launchOk
        ? `${rocket.name} delivered the ${r.mass} kg payload to the selected orbit.`
        : validation.ready
          ? events[events.length - 1].description
          : validation.checks
              .filter((c) => c.status !== "pass" && c.blocking !== false)
              .map((c) => `${c.label}: ${c.reason}`)
              .join(" "),
    },
    {
      name: "SPACE",
      status: !launchOk
        ? "fail"
        : availability < 1 || lifetime < m.lifetimeTarget
          ? "close"
          : "pass",
      explanation: launchOk
        ? `EOL operations delivered ${power.toFixed(1)} W average of ${r.consumption} W demand. Minimum battery ${operations.batteryMinWh.toFixed(1)} Wh; ${operations.brownoutHours.toFixed(2)} equivalent hours of unmet load. Shortest-component/event-limited life: ${lifetime} months.`
        : "No spacecraft reached science operations.",
    },
    {
      name: "GROUND",
      status:
        !launchOk || operations.receivedGB === 0
          ? "fail"
          : dataFactor < 0.999999
            ? "close"
            : "pass",
      explanation: launchOk
        ? `Across ${operations.contacts} contact windows in ${operations.days} representative days: generated ${operations.generatedGB.toFixed(2)} GB; transmitted ${operations.transmittedGB.toFixed(2)} GB; Earth received ${operations.receivedGB.toFixed(2)} GB. ${operations.remainingGB.toFixed(2)} GB remains onboard; ${operations.lostGB.toFixed(2)} GB was discarded when ${r.storage} GB memory filled. Actual reception, not orbit arrival, earns science credit.`
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
  if (launchOk && operations.lostGB > 1e-6)
    lessons.push(
      `Instruments generated data faster than storage/contact windows could handle. ${operations.lostGB.toFixed(2)} GB was discarded after memory filled; upgrade computer storage or radio capacity.`,
    );
  if (launchOk && operations.remainingGB > 1e-6)
    lessons.push(
      `${operations.remainingGB.toFixed(2)} GB is still onboard at campaign end and earns no science credit until received on Earth.`,
    );
  if (launchOk && operations.brownoutHours > 1e-6)
    lessons.push(
      `Shadow/event energy deficits exhausted usable reserves for ${operations.brownoutHours.toFixed(2)} equivalent hours. Instruments collected less data; increase array or battery capacity.`,
    );
  if (!lessons.length)
    lessons.push(
      "Your design met the science goal. Explore whether a lighter or less expensive configuration can return the same science.",
    );
  return {
    modelVersion: assumptions.modelVersion,
    operations,
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
