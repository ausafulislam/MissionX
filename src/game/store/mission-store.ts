"use client";
import { create } from "zustand";
import { ORBITS, PARTS, ROCKETS, STARTERS } from "../data/catalog";
import { simulate as simulateLegacy } from "../engine/legacy-v1/simulation";
import { verify as verifyLegacy } from "../engine/legacy-v1/validation";
import { simulate as simulateV2 } from "../engine/legacy-v2";
import { simulate } from "../engine/simulation";
import { verify } from "../engine/validation";
import { missionDiagnostics } from "../engine/diagnostics";
import { captureRunSnapshot, readRunSnapshot } from "../engine/run-snapshot";
import { validDesign } from "../engine/schema";
import type { Design, MissionId, SavedRun } from "../types";
import { useCommander, validCommanderName } from "./commander-store";
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
    (result.modelVersion !== undefined &&
      ![1, 2, 3].includes(result.modelVersion as number)) ||
    typeof result.seed !== "number" ||
    !Number.isInteger(result.seed) ||
    result.seed < 0 ||
    result.seed > 4294967295 ||
    !(r.snapshot !== undefined || (
      result.modelVersion === 3
        ? verify(r.design)
        : result.modelVersion === 2
          ? verify(r.design)
          : verifyLegacy(r.design)
    ).ready)
  )
    return null;
  const captured = readRunSnapshot(r.snapshot, r.design);
  if (r.snapshot !== undefined && !captured) return null;
  return {
    ...(captured ? { snapshot: r.snapshot as SavedRun["snapshot"] } : {}),
    id: r.id,
    createdAt: r.createdAt,
    diagnosticsReviewed: typeof r.diagnosticsReviewed === "number" ? Math.max(0,Math.min(6,Math.floor(r.diagnosticsReviewed))) : 0,
    ...(typeof r.commanderName === "string" && validCommanderName(r.commanderName) ? {commanderName:r.commanderName.trim()} : {}),
    ...(typeof r.completedAt === "string" && Number.isFinite(Date.parse(r.completedAt)) && Date.parse(r.completedAt)>=Date.parse(r.createdAt) ? {completedAt:r.completedAt} : {}),
    design: r.design,
    result: captured?.result ?? (
      result.modelVersion === 3
        ? simulate(r.design, result.seed)
        : result.modelVersion === 2
          ? simulateV2(r.design, result.seed)
          : simulateLegacy(r.design, result.seed)),
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
  acknowledgeDiagnostic: () => void;
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
      if (raw.length > 2000000) throw new Error("Save too large");
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
    useCommander.getState().hydrate();
    const timestamp = new Date().toISOString();
    const result = simulate(design, seed);
    set({
      run: {
        snapshot: captureRunSnapshot(design, result, timestamp),
        id: `${Date.now()}-${seed}`,
        createdAt: timestamp,
        ...(validCommanderName(useCommander.getState().name) ? {commanderName:useCommander.getState().name.trim()} : {}),
        design: { ...design, partIds: [...design.partIds] },
        result,
      },
      complete: false,
    });
    return true;
  },
  acknowledgeDiagnostic: () => {
    const run=get().run;if(!run)return;
    const tests=missionDiagnostics(run,18);
    const index=run.diagnosticsReviewed??0;
    if(index>=6||tests[index].status==='FAIL')return;
    set({run:{...run,diagnosticsReviewed:index+1}});
  },
  finish: () => {
    const saved = get().run;
    if (!saved) return;
    const run = {...saved, completedAt:saved.completedAt??new Date().toISOString()};
    set({
      run,
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
