"use client";
import { useEffect } from "react";
import type { SavedRun } from "@/game/types";
import { missionAudio } from "@/game/audio/audio-manager";
import { ACHIEVEMENTS } from "@/game/engine/progression";
import { awardRuns, emptyProgress } from "@/game/engine/progression";
export function OutcomeReveal({ run }: { run: SavedRun }) {
  const r = run.result;
  useEffect(() => {
    missionAudio.scene(r.outcome);
    missionAudio.play(
      r.outcome === "success"
        ? "success"
        : r.outcome === "partial"
          ? "partial"
          : "failure",
    );
  }, [run.id, r.outcome]);
  const earned = awardRuns(emptyProgress(), [run]).achievements;
  return (
    <div className={`outcome-reveal outcome-${r.outcome}`}>
      <span className="outcome-emblem" aria-hidden="true">
        {r.outcome === "success" ? "✧" : r.outcome === "partial" ? "◈" : "↻"}
      </span>
      <div>
        <span className="technical">
          {r.outcome === "success"
            ? "OBJECTIVES ACHIEVED"
            : r.outcome === "partial"
              ? "USEFUL SCIENCE RETURNED"
              : "YOUR NEXT DESIGN STARTS HERE"}
        </span>
        <p>
          {r.outcome === "success"
            ? "Your engineering decisions made this discovery possible."
            : r.outcome === "partial"
              ? "Study the limiting requirements below, then refine your design."
              : "A failed flight is evidence, not the end. Use the report to redesign."}
        </p>
        <div className="flight-achievements">
          {ACHIEVEMENTS.filter((a) => earned.includes(a.id)).map((a) => (
            <span key={a.id} title={a.description}>
              ✧ {a.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
