import type { SavedRun } from "../types";
import { resources } from "./resources";
export interface Progression {
  xp: number;
  completed: number;
  best: number;
  missions: string[];
  awarded: string[];
  achievements: string[];
}
export const emptyProgress = (): Progression => ({
  xp: 0,
  completed: 0,
  best: 0,
  missions: [],
  awarded: [],
  achievements: [],
});
export const ACHIEVEMENTS = [
  {
    id: "contact",
    name: "FIRST CONTACT",
    description: "Complete your first mission evaluation.",
  },
  {
    id: "launch",
    name: "CLEAR THE TOWER",
    description: "Successfully deliver a spacecraft to orbit.",
  },
  {
    id: "success",
    name: "MISSION ACCOMPLISHED",
    description: "Achieve every mission requirement.",
  },
  {
    id: "engineering",
    name: "ENGINEERING EXCELLENCE",
    description: "Score at least 90 with at least 95% engineering performance.",
  },
  {
    id: "power",
    name: "POWER OPTIMIZER",
    description:
      "Complete a successful flight with positive power margin below 25% of supply.",
  },
  {
    id: "explorer",
    name: "SCIENCE EXPLORER",
    description: "Return science from all three destinations.",
  },
];
export function awardRuns(
  previous: Progression,
  runs: SavedRun[],
): Progression {
  const p: Progression = {
    ...previous,
    missions: [...previous.missions],
    awarded: [...previous.awarded],
    achievements: [...previous.achievements],
  };
  const earn = (id: string) => {
    if (!p.achievements.includes(id)) p.achievements.push(id);
  };
  for (const run of runs) {
    if (p.awarded.includes(run.id)) continue;
    p.awarded.push(run.id);
    p.completed++;
    p.xp += 20 + run.result.score;
    p.best = Math.max(p.best, run.result.score);
    earn("contact");
    if (run.result.segments[0]?.status === "pass") earn("launch");
    if (run.result.outcome === "success") earn("success");
    if (run.result.score >= 90 && run.result.engineeringScore >= 95)
      earn("engineering");
    const r = resources(run.design);
    if (
      run.result.outcome === "success" &&
      r.powerMargin > 0 &&
      r.powerMargin / r.generation < 0.25
    )
      earn("power");
    if (run.result.science > 0 && !p.missions.includes(run.design.missionId))
      p.missions.push(run.design.missionId);
  }
  if (p.missions.length === 3) earn("explorer");
  p.awarded = p.awarded.slice(-2048);
  return p;
}
export const commanderRank = (xp: number) =>
  xp >= 1200
    ? "FLIGHT DIRECTOR"
    : xp >= 500
      ? "MISSION SPECIALIST"
      : xp >= 150
        ? "ORBITAL EXPLORER"
        : "CADET COMMANDER";
