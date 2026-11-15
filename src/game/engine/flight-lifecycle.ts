import { getMission } from "../data/catalog";
import type { SavedRun } from "../types";
/** Three 0.8-second beats plus a 0.6-second liftoff hold before ascent at t=3. */
export function countdownLabel(time: number): string | null {
    if(time < 0 || time >= 3) return null;
    return time >= 2.4 ? "LIFTOFF!" : String(3 - Math.min(2, Math.floor((time + 1e-9) / 0.8)));
}
/** Presentation only. Never adds arrival or science to a failed launch. */
export function flightLifecycle(run: SavedRun, time: number, commissioned = false) {
    const elapsed = Math.max(0, Math.min(time, run.result.duration));
    const failed = run.result.events.some(e => e.kind === "failure" && e.at <= elapsed);
    const launched = run.result.events.some(e => e.kind === "deployment" && e.at <= elapsed);
    const operationsAt = run.result.events.find(e => e.kind === "operations")?.at;
    const arrived = !failed && launched && operationsAt !== undefined && elapsed >= operationsAt;
    const stage = failed ? "lost" : elapsed >= run.result.duration ? "evaluation" : arrived ? commissioned ? "operations" : "commissioning" : elapsed >= 13 && launched ? "journey" : elapsed >= 8 ? "upper-ascent" : elapsed >= 3 ? "ascent" : "preparation";
    return {
        stage, elapsed, failed, arrived,
        canOperate: arrived && commissioned,
        destination: run.design.missionId === "sun" ? "Earth orbit / solar observations" : run.design.missionId === "moon" ? "Moon" : "Mars",
        mission: getMission(run.design.missionId).name,
        countdown: elapsed < 2.4 ? Number(countdownLabel(elapsed)) : 0,
        journeyProgress: failed ? 0 : Math.max(0, Math.min(1, (elapsed - 13) / 5)),
        timeLabel: "Compressed playback seconds; schematic journey, not physical travel time",
    };
}
/** Shared playback gate; skip never bypasses commissioning. */
export function advanceFlight(run: SavedRun, time: number, amount: number, skip = false) {
    if(skip && time < 3) return time;
    const gate = run.result.events.find(e => e.kind === 'operations')?.at;
    const blocked = gate !== undefined && (run.diagnosticsReviewed ?? 0) < 6;
    const end = blocked ? Math.min(gate, run.result.duration) : run.result.duration;
    return Math.min(end, skip ? run.result.duration : time < 3 ? Math.min(3, time + Math.max(0,amount)) : time + amount);
}
