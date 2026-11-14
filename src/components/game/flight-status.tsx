import type { Simulation } from "@/game/types";
export function FlightStatus({
  result,
  time,
}: {
  result: Simulation;
  time: number;
}) {
  const failed = result.events.some(
    (e) => e.kind === "failure" && e.at <= time,
  );
  return (
    <div
      className={`mission-control-strip ${failed ? "control-abort" : ""}`}
      aria-label="Mission control status"
    >
      {[
        ["GUIDANCE", failed ? "LOST" : "LOCKED"],
        [
          "PROPULSION",
          failed
            ? "FAULT"
            : time < 2
              ? "STANDBY"
              : time < 3
                ? "IGNITION"
                : time < 8
                  ? "NOMINAL"
                  : "STAGED",
        ],
        [
          "PAYLOAD",
          failed ? "NOT DELIVERED" : time < 13 ? "SECURED" : "DEPLOYED",
        ],
      ].map(([label, value]) => (
        <div key={label}>
          <i />
          <span>
            {label}
            <strong>{value}</strong>
          </span>
        </div>
      ))}
      <div
        className="control-flight-progress"
        role="progressbar"
        aria-label="Flight playback"
        aria-valuemin={0}
        aria-valuemax={result.duration}
        aria-valuenow={Math.floor(time)}
      >
        <span
          style={{ width: `${Math.min(100, (time / result.duration) * 100)}%` }}
        />
      </div>
    </div>
  );
}
