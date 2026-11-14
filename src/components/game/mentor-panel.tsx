"use client";
import { useEffect, useRef, useState } from "react";
import type { Design, SavedRun } from "@/game/types";
import { mentorAdvice } from "@/game/engine/mentor";
export function MentorPanel({
  design,
  run,
}: {
  design: Design;
  run?: SavedRun;
}) {
  const fallback = mentorAdvice(design, run?.result),
    [advice, setAdvice] = useState(fallback),
    [source, setSource] = useState("LOCAL FLIGHT ANALYST"),
    [busy, setBusy] = useState(false),
    controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function ask() {
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ design, seed: run?.result.seed }),
        signal: abort.signal,
      });
      if (!response.ok) throw new Error("Mentor unavailable");
      const data = await response.json();
      if (typeof data.advice !== "string") throw new Error("Invalid advice");
      setAdvice(data.advice);
      setSource(
        data.source === "ai"
          ? "AI MISSION MENTOR"
          : "LOCAL FLIGHT ANALYST · NO AI SERVICE REQUIRED",
      );
    } catch {
      if (!abort.signal.aborted) {
        setAdvice(fallback);
        setSource("OFFLINE ADVICE · FLIGHT DATA AVAILABLE");
      }
    } finally {
      if (!abort.signal.aborted) setBusy(false);
    }
  }
  return (
    <div className="mentor-panel game-panel">
      <div className="mentor-mark">✳</div>
      <div>
        <span className="eyebrow">MISSION MENTOR</span>
        <h2>
          LET’S MAKE YOUR
          <br />
          <em>NEXT MISSION BETTER.</em>
        </h2>
        <p aria-live="polite">{advice}</p>
        <span className="technical">{source}</span>
        <button className="game-secondary" disabled={busy} onClick={ask}>
          {busy ? "ANALYZING FLIGHT DATA…" : "REQUEST MISSION ADVICE ↗"}
        </button>
      </div>
    </div>
  );
}
