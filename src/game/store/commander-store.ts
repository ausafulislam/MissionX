"use client";
import { create } from "zustand";
import {
  awardRuns,
  emptyProgress,
  type Progression,
} from "../engine/progression";
import type { SavedRun } from "../types";
export interface Preferences {
  master: number;
  music: number;
  effects: number;
  muted: boolean;
  musicEnabled: boolean;
  effectsEnabled: boolean;
  quality: "auto" | "low" | "high";
  reducedMotion: boolean;
  sensitivity: number;
  language: "en";
}
export const defaultPreferences = (): Preferences => ({
  master: 0.55,
  music: 0.3,
  effects: 0.55,
  muted: false,
  musicEnabled: true,
  effectsEnabled: true,
  quality: "auto",
  reducedMotion: false,
  sensitivity: 1,
  language: "en",
});
const KEY = "missionx-commander-v1";
export function validCommanderName(name: string) {
  return (
    name.trim().length >= 2 &&
    name.trim().length <= 24 &&
    !/[\u0000-\u001f<>]/.test(name)
  );
}
export function cleanPreferences(value: unknown): Preferences {
  const fallback = defaultPreferences();
  if (!value || typeof value !== "object") return fallback;
  const v = value as Record<string, unknown>;
  for (const k of ["master", "music", "effects", "sensitivity"] as const) {
    const n = v[k];
    if (typeof n === "number" && Number.isFinite(n))
      fallback[k] = Math.min(
        k === "sensitivity" ? 2 : 1,
        Math.max(k === "sensitivity" ? 0.25 : 0, n),
      );
  }
  for (const k of [
    "muted",
    "musicEnabled",
    "effectsEnabled",
    "reducedMotion",
  ] as const)
    if (typeof v[k] === "boolean") fallback[k] = v[k];
  if (v.quality === "auto" || v.quality === "low" || v.quality === "high")
    fallback.quality = v.quality;
  return fallback;
}
function cleanProgress(value: unknown): Progression {
  const p = emptyProgress();
  if (!value || typeof value !== "object") return p;
  const v = value as Record<string, unknown>;
  for (const key of ["xp", "completed", "best"] as const)
    if (typeof v[key] === "number" && Number.isFinite(v[key]))
      p[key] = Math.max(
        0,
        Math.min(key === "best" ? 100 : 10000000, Math.floor(v[key])),
      );
  for (const key of ["missions", "awarded", "achievements"] as const)
    if (Array.isArray(v[key]))
      p[key] = v[key]
        .filter((x: unknown) => typeof x === "string" && x.length < 100)
        .slice(-2048);
  return p;
}
interface CommanderState {
  hydrated: boolean;
  name: string;
  preferences: Preferences;
  progress: Progression;
  warning: string;
  hydrate: () => void;
  identify: (name: string) => boolean;
  update: (preferences: Partial<Preferences>) => void;
  record: (runs: SavedRun[]) => void;
  reset: () => void;
}
export const useCommander = create<CommanderState>((set, get) => ({
  hydrated: false,
  name: "",
  preferences: defaultPreferences(),
  progress: emptyProgress(),
  warning: "",
  hydrate: () => {
    if (get().hydrated) return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw && raw.length > 300000) throw new Error("Oversized profile");
      const v = raw ? JSON.parse(raw) : {};
      set({
        hydrated: true,
        name:
          typeof v.name === "string" && validCommanderName(v.name)
            ? v.name.trim()
            : "",
        preferences: cleanPreferences(v.preferences),
        progress: cleanProgress(v.progress),
      });
    } catch {
      set({
        hydrated: true,
        warning:
          "Profile storage unavailable. You can still play this session.",
      });
    }
  },
  identify: (name) => {
    if (!validCommanderName(name)) return false;
    set({ name: name.trim() });
    return true;
  },
  update: (preferences) =>
    set({
      preferences: cleanPreferences({ ...get().preferences, ...preferences }),
    }),
  record: (runs) => {
    if (runs.some((r) => !get().progress.awarded.includes(r.id)))
      set({ progress: awardRuns(get().progress, runs) });
  },
  reset: () =>
    set({
      name: "",
      preferences: defaultPreferences(),
      progress: emptyProgress(),
      warning: "",
      hydrated: true,
    }),
}));
useCommander.subscribe((s) => {
  if (!s.hydrated) return;
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        version: 1,
        name: s.name,
        preferences: s.preferences,
        progress: s.progress,
      }),
    );
  } catch {
    if (!s.warning)
      useCommander.setState({
        warning:
          "Profile storage unavailable. Preferences and progress apply to this session only.",
      });
  }
});
