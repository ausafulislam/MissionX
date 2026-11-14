"use client";
import { create } from "zustand";
import { ORBITS, PARTS, ROCKETS, STARTERS } from "../data/catalog";
import { simulate } from "../engine/simulation";
import { verify } from "../engine/validation";
import { validDesign } from "../engine/schema";
import type { Design, MissionId, SavedRun } from "../types";
const KEY = "missionx-flight-deck-v1";
const emptyDesign = (): Design => ({
  missionId: "moon",
  partIds: [],
  rocketId: "swift",
  orbitId: "lunar",
});
function restoreRun(value: unknown): SavedRun | null {
  if (!value || typeof value !== "object") return null;
  const r = value as Record<string, unknown>,
    result = r.result as Record<string, unknown> | undefined;
  if (
    !validDesign(r.design) ||
    typeof r.id !== "string" ||
    r.id.length === 0 ||
    r.id.length > 100 ||
    typeof r.createdAt !== "string" ||
    !Number.isFinite(Date.parse(r.createdAt)) ||
    !result ||
    typeof result.seed !== "number" ||
    !Number.isInteger(result.seed) ||
    result.seed < 0 ||
    result.seed > 4294967295 ||
    !verify(r.design).ready
  )
    return null;
  return {
    id: r.id,
    createdAt: r.createdAt,
    design: r.design,
    result: simulate(r.design, result.seed),
  };
}
interface GameState {
  hydrated: boolean;
  storageWarning: string;
  design: Design;
  chosen: boolean;
  run: SavedRun | null;
  complete: boolean;
  history: SavedRun[];
  hydrate: () => void;
  choose: (id: MissionId) => void;
  toggle: (id: string) => void;
  starter: () => void;
  setRocket: (id: string) => void;
  setOrbit: (id: string) => void;
  launch: (seed: number) => boolean;
  finish: () => void;
  redesign: () => void;
  restore: (run: SavedRun) => void;
  reset: () => void;
}
export const useMissionStore = create<GameState>((set, get) => ({
  hydrated: false,
  storageWarning: "",
  design: emptyDesign(),
  chosen: false,
  run: null,
  complete: false,
  history: [],
  hydrate: () => {
    if (get().hydrated) return;
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }
      if (raw.length > 250000) throw new Error("Save too large");
      const data = JSON.parse(raw);
      if (
        data.version !== 1 ||
        !validDesign(data.design) ||
        !Array.isArray(data.history)
      )
        throw new Error("Invalid save");
      const run = restoreRun(data.run);
      set({
        hydrated: true,
        design: data.design,
        chosen: data.chosen === true,
        run,
        complete: !!run && data.complete === true,
        history: data.history
          .slice(0, 12)
          .map(restoreRun)
          .filter((r: SavedRun | null): r is SavedRun => !!r),
      });
    } catch {
      set({
        hydrated: true,
        storageWarning:
          "Saved progress could not be restored. A fresh workspace is ready; your browser storage may be unavailable or corrupted.",
      });
    }
  },
  choose: (id) => {
    if (get().chosen && get().design.missionId === id) return;
    set({
      chosen: true,
      design: {
        missionId: id,
        partIds: [],
        rocketId: id === "moon" ? "swift" : id === "sun" ? "atlas" : "horizon",
        orbitId: id === "moon" ? "lunar" : id === "sun" ? "solar" : "mars",
      },
      run: null,
      complete: false,
    });
  },
  toggle: (id) => {
    const part = PARTS.find((p) => p.id === id);
    if (!part) return;
    const d = get().design,
      exists = d.partIds.includes(id);
    const ids = exists
      ? d.partIds.filter((p) => p !== id)
      : [
          ...d.partIds.filter(
            (p) =>
              part.category === "science" ||
              PARTS.find((x) => x.id === p)?.category !== part.category,
          ),
          id,
        ];
    set({ design: { ...d, partIds: ids }, run: null, complete: false });
  },
  starter: () =>
    set({
      design: {
        ...get().design,
        partIds: [...STARTERS[get().design.missionId]],
      },
      run: null,
      complete: false,
    }),
  setRocket: (id) => {
    if (ROCKETS.some((r) => r.id === id))
      set({
        design: { ...get().design, rocketId: id },
        run: null,
        complete: false,
      });
  },
  setOrbit: (id) => {
    if (ORBITS.some((o) => o.id === id))
      set({
        design: { ...get().design, orbitId: id },
        run: null,
        complete: false,
      });
  },
  launch: (seed) => {
    const design = get().design;
    if (
      !verify(design).ready ||
      !Number.isInteger(seed) ||
      seed < 0 ||
      seed > 4294967295
    )
      return false;
    const timestamp = new Date().toISOString();
    set({
      run: {
        id: `${Date.now()}-${seed}`,
        createdAt: timestamp,
        design: { ...design, partIds: [...design.partIds] },
        result: simulate(design, seed),
      },
      complete: false,
    });
    return true;
  },
  finish: () => {
    const run = get().run;
    if (!run) return;
    set({
      complete: true,
      history: [run, ...get().history.filter((r) => r.id !== run.id)].slice(
        0,
        12,
      ),
    });
  },
  redesign: () => set({ run: null, complete: false }),
  restore: (run) =>
    set({
      chosen: true,
      design: { ...run.design, partIds: [...run.design.partIds] },
      run: null,
      complete: false,
    }),
  reset: () =>
    set({ chosen: false, design: emptyDesign(), run: null, complete: false }),
}));
useMissionStore.subscribe((state) => {
  if (!state.hydrated) return;
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        version: 1,
        design: state.design,
        chosen: state.chosen,
        run: state.run,
        complete: state.complete,
        history: state.history,
      }),
    );
  } catch {
    if (!state.storageWarning)
      useMissionStore.setState({
        storageWarning:
          "Browser storage is unavailable or full. You can keep playing, but progress may not survive a refresh.",
      });
  }
});
