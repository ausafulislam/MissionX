"use client";
import { countdownLabel } from "@/game/engine/flight-lifecycle";
import { useEffect, useRef } from "react";
import { missionAudio, type Sound } from "@/game/audio/audio-manager";
import type { SavedRun } from "@/game/types";
export function useFlightAudio(
  run: SavedRun | null,
  time: number,
  playing: boolean,
  active = true,
) {
  useEffect(() => {
    if(active && run && playing && time === 0) missionAudio.play("countdown");
  }, [active, run, playing, time]);
  const previous = useRef({ id: "", time: -0.1 });
  useEffect(() => {
    if (!active || !run) return;
    const old = previous.current,
      from = old.id === run.id ? old.time : -0.1;
    previous.current = { id: run.id, time };
    if (time === from) return;
    if (time - from > 1) {
      if (time >= run.result.duration)
        missionAudio.play(
          run.result.outcome === "success"
            ? "success"
            : run.result.outcome === "partial"
              ? "partial"
              : "failure",
        );
      return;
    }
    const cues: Record<string, Sound> = {
      liftoff: "liftoff",
      separation: "separation",
      deployment: "deployment",
      operations: "notification",
      storm: "warning",
      fault: "warning",
      outage: "warning",
      failure: "failure",
      complete:
        run.result.outcome === "success"
          ? "completion"
          : run.result.outcome === "partial"
            ? "partial"
            : "failure",
    };
    for (const event of run.result.events)
      if (event.at > from && event.at <= time && cues[event.kind])
        missionAudio.play(cues[event.kind]);
    if (
      playing &&
      time < 3 &&
      countdownLabel(time) !== countdownLabel(from) && countdownLabel(time) !== "LIFTOFF!"
    )
      missionAudio.play("countdown");
    if (playing && from < 2 && time >= 2) missionAudio.play("ignition");
  }, [run, time, active, playing]);
  const failed = run?.result.events.some(
    (e) => e.kind === "failure" && e.at <= time,
  );
  const engineActive = active && playing && time >= 2 && time < 8 && !failed;
  useEffect(() => {
    missionAudio.engineRunning(engineActive);
  }, [engineActive]);
  useEffect(() => () => missionAudio.engineRunning(false), []);
}
