"use client";
import type { SavedRun } from "@/game/types";
import { FlightStatus } from "@/components/game/flight-status";
import { telemetry } from "@/game/engine/telemetry";
export function LaunchOverlay({
  run,
  time,
  playing,
  speed,
  onPlay,
  onSpeed,
  onSkip,
  onResults,
}: {
  run: SavedRun;
  time: number;
  playing: boolean;
  speed: number;
  onPlay: () => void;
  onSpeed: (n: number) => void;
  onSkip: () => void;
  onResults: () => void;
}) {
  const t = telemetry(run.design, run.result, time),
    done = time >= run.result.duration;
  return (
    <>
      <div className="launch-cinematic-title">
        <span className="eyebrow">LIVE FLIGHT / SEED {run.result.seed}</span>
        <h1>
          {time < 3
            ? "READY FOR"
            : time >= run.result.duration
              ? "FLIGHT"
              : t.phase?.kind === "failure"
                ? "SIGNAL"
                : "BEYOND"}
          <br />
          <em>
            {time < 3
              ? "IGNITION."
              : t.phase?.kind === "failure"
                ? "LOST."
                : time >= run.result.duration
                  ? "EVALUATED."
                  : "THE BLUE."}
          </em>
        </h1>
        {time < 3 && (
          <span className="hq-countdown">
            T −{" "}
            {Math.ceil(3 - time)
              .toString()
              .padStart(2, "0")}
          </span>
        )}
      </div>
      <section className="hq-launch-events">
        <span className="eyebrow">FLIGHT EVENT / {Math.floor(time)}s</span>
        <h2 aria-live="polite">{t.phase?.label}</h2>
        <p>{t.phase?.description}</p>
        <FlightStatus result={run.result} time={time} />
        <ol>
          {run.result.events.map((e) => (
            <li className={time >= e.at ? "reached" : ""} key={e.at}>
              <span>{time >= e.at ? "✓" : "○"}</span>
              {time >= e.at ? e.label : "Awaiting flight event"}
              <small>{e.at}s</small>
            </li>
          ))}
        </ol>
        <div className="launch-mini-telemetry">
          <span>
            {t.altitude} km<small>ALTITUDE*</small>
          </span>
          <span>
            {t.power.toFixed(0)} W<small>SOLAR + RESERVE</small>
          </span>
          <span>
            {t.data.toFixed(1)}
            <small>GB/DAY RETURN</small>
          </span>
        </div>
        <p className="hq-fineprint">Ground: {t.contact?"contact window":"waiting for contact"} · usable battery {t.batteryWh.toFixed(1)} Wh · stored {t.storedGB.toFixed(2)} GB · Earth received {t.receivedGB.toFixed(2)} GB.</p>
        <p className="hq-fineprint">
          * Schematic altitude and compressed time. Resources and outcomes use
          your actual design.
        </p>
        <div className="hq-playback-controls">
          <button className="hq-outlined" disabled={done} onClick={onPlay}>
            {done
              ? "✓ COMPLETE"
              : playing
                ? "Ⅱ PAUSE"
                : time === 0
                  ? "▶ BEGIN COUNTDOWN"
                  : "▶ RESUME"}
          </button>
          {[1, 2, 4].map((n) => (
            <button
              className="hq-speed"
              key={n}
              aria-pressed={speed === n}
              onClick={() => onSpeed(n)}
            >
              {n}×
            </button>
          ))}
        </div>
        {done ? (
          <button className="button" onClick={onResults}>
            VIEW SCIENCE REPORT <span>↗</span>
          </button>
        ) : (
          <button className="hq-text-button" onClick={onSkip}>
            SKIP TO EVALUATION ↗
          </button>
        )}
      </section>
    </>
  );
}
