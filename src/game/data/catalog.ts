// Stable typed facade: screens/engine keep their existing imports; data is static JSON.
import type { Category, Mission, Orbit, Part, Rocket } from "../types";
import missions from "./missions.json";
import parts from "./parts.json";
import rockets from "./rockets.json";
import orbits from "./orbits.json";
import setup from "./setup.json";
export const CATEGORIES = setup.categories as {
  id: Category;
  name: string;
  hint: string;
}[];
export const MISSIONS = missions as Mission[];
export const PARTS = parts as Part[];
export const ROCKETS = rockets as Rocket[];
export const ORBITS = orbits as Orbit[];
export const STARTERS = setup.starters as Record<Mission["id"], string[]>;
export const getMission = (id: string) =>
  MISSIONS.find((m) => m.id === id) ?? MISSIONS[0];
export const getOrbit = (id: string) =>
  ORBITS.find((o) => o.id === id) ?? ORBITS[1];
export const getRocket = (id: string) =>
  ROCKETS.find((r) => r.id === id) ?? ROCKETS[0];
