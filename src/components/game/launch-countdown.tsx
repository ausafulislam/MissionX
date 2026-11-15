"use client";
import { countdownLabel } from "@/game/engine/flight-lifecycle";
import "./launch-countdown.css";
/** Uses the flight clock; deliberately has no independent timer. */
export function LaunchCountdown({ time, playing }: { time: number; playing: boolean }) {
  const label = countdownLabel(time);
  if (!playing || !label) return null;
  return <div className="launch-countdown-stage" role="status" aria-live="assertive" aria-atomic="true">
    <div key={label} className={`launch-countdown-number ${label === "LIFTOFF!" ? "is-liftoff" : ""}`}><span>MISSION CONTROL / LAUNCH SEQUENCE</span><strong>{label}</strong><small>{label==="LIFTOFF!"?"ASCENT RELEASE IMMINENT":"ASCENT INTERLOCK ENGAGED"}</small></div>
  </div>;
}
