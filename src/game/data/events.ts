import type { MissionEvent } from "../types";
export const EVENT_OPTIONS: Omit<MissionEvent, "at">[] = [
  {
    kind: "storm",
    label: "Solar storm",
    description:
      "Charged particles reduce available power and useful science return. Radiation-tolerant computers soften the impact.",
    severity: "warning",
    powerFactor: 0.75,
    dataFactor: 0.88,
    lifetimeFactor: 0.94,
  },
  {
    kind: "outage",
    label: "Ground contact lost",
    description:
      "A missed ground contact reduces delivered science data. A high-capacity transceiver recovers more of the backlog.",
    severity: "warning",
    powerFactor: 1,
    dataFactor: 0.72,
    lifetimeFactor: 1,
  },
  {
    kind: "fault",
    label: "Instrument degradation",
    description:
      "An instrument fault shortens operating life and reduces useful science data.",
    severity: "warning",
    powerFactor: 1,
    dataFactor: 0.76,
    lifetimeFactor: 0.72,
  },
  {
    kind: "operations",
    label: "Stable science operations",
    description:
      "Power, pointing and downlink remain stable. Science return remains limited by the configured power, memory and downlink.",
    severity: "info",
    powerFactor: 1,
    dataFactor: 1,
    lifetimeFactor: 1,
  },
];
