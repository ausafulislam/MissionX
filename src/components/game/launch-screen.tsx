"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMissionStore } from "@/game/store/mission-store";
import { telemetry } from "@/game/engine/telemetry";
import { getMission } from "@/game/data/catalog";
import { ScreenHeading } from "./game-shell";
import { useFlightAudio } from "@/hooks/use-flight-audio";
import { FlightScene } from "./flight-scene";
export function LaunchScreen() {
  const id = useMissionStore((s) => s.run?.id);
  return <LaunchPlayback key={id ?? "no-flight"} />;
}
function LaunchPlayback() {
  const s = useMissionStore(),
    run = s.run,
    [time, setTime] = useState(s.complete && run ? run.result.duration : 0),
    [playing, setPlaying] = useState(false),
    [speed, setSpeed] = useState(1);
  const finish = s.finish;
  const done = !!run && time >= run.result.duration;
  useEffect(() => {
    if (!playing || !run || done) return;
    const timer = setInterval(
      () => setTime((t) => Math.min(run.result.duration, t + 0.1 * speed)),
      100,
    );
    return () => clearInterval(timer);
  }, [playing, speed, run, done]);
  useEffect(() => {
    if (done && !s.complete) finish();
  }, [done, s.complete, finish]);
  useFlightAudio(run, time, playing);
  if (!run) return null;
  const result = run.result,
    t = telemetry(run.design, result, time),
    m = getMission(run.design.missionId),
    event = t.phase;
  return (
    <section className="game-screen">
      <ScreenHeading
        number="04"
        eyebrow={`LIVE MISSION / SEED ${result.seed}`}
        title="BEYOND"
        accent="THE BLUE."
        description={`This flight is driven by your ${run.design.partIds.length}-component ${m.fleet === 4 ? "constellation" : "spacecraft"}, selected launch vehicle, and reproducible mission events.`}
      />
      <div className="launch-layout">
        <div>
          <FlightScene design={run.design} result={result} time={time} />
          <div className="flight-controls game-panel">
            <button
              className="game-secondary"
              disabled={done}
              onClick={() => setPlaying(!playing)}
            >
              {done
                ? "✓ PLAYBACK COMPLETE"
                : playing
                  ? "Ⅱ PAUSE"
                  : time === 0
                    ? "▶ START COUNTDOWN"
                    : "▶ RESUME"}
            </button>
            <div className="speed-controls" aria-label="Playback speed">
              {[1, 2, 4].map((n) => (
                <button
                  key={n}
                  aria-pressed={speed === n}
                  onClick={() => setSpeed(n)}
                >
                  {n}×
                </button>
              ))}
            </div>
            <button
              className="flight-skip"
              disabled={done}
              onClick={() => {
                setTime(result.duration);
                setPlaying(false);
              }}
            >
              SKIP TO REPORT ↗
            </button>
          </div>
          <div
            className={`active-event event-${event?.severity}`}
            aria-live="polite"
          >
            <span>
              {event?.severity === "warning"
                ? "!"
                : event?.severity === "failure"
                  ? "×"
                  : "◎"}
            </span>
            <div>
              <h2>{event?.label}</h2>
              <p>{event?.description}</p>
            </div>
          </div>
          <div className="flight-telemetry">
            {[
              ["ALTITUDE", `${t.altitude} km`],
              ["VELOCITY", `${t.velocity.toFixed(1)} km/s`],
              ["SOLAR SUPPLY", `${t.power.toFixed(0)} W`],
              ["USEFUL DOWNLINK", `${t.data.toFixed(1)} GB/d`],
              ["USABLE BATTERY", `${t.batteryWh.toFixed(1)} Wh`],
              ["ONBOARD DATA", `${t.storedGB.toFixed(2)} GB`],
              ["EARTH RECEIVED", `${t.receivedGB.toFixed(2)} GB`],
              ["GROUND WINDOW", t.contact ? "CONTACT" : "NO CONTACT"],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="technical">{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <p className="telemetry-note">
            Compressed educational timeline. Altitude and velocity are
            schematic; resource and event effects derive from your design.{" "}
            {m.fleet === 4
              ? "Power is per spacecraft; downlink is fleet total."
              : ""}
          </p>
        </div>
        <aside className="game-panel flight-timeline">
          <div className="game-panel-heading">
            <h2>MISSION TIMELINE</h2>
            <span>
              {Math.floor(time)} / {result.duration}s
            </span>
          </div>
          <div className="flight-timeline-progress">
            <span style={{ width: `${(time / result.duration) * 100}%` }} />
          </div>
          {result.events.map((e, i) => (
            <div
              className={`timeline-event ${time >= e.at ? "reached" : ""} ${event === e ? "current" : ""}`}
              key={`${e.at}-${e.kind}`}
            >
              <span className="timeline-node">
                {time >= e.at ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="technical">
                  T
                  {e.at === 0 ? "−03" : `+${String(e.at - 3).padStart(2, "0")}`}
                  s
                </span>
                <h3>
                  {time >= e.at
                    ? e.label
                    : i === result.events.length - 1
                      ? "Mission evaluation"
                      : "Awaiting flight event"}
                </h3>
                <p>
                  {time >= e.at
                    ? e.description
                    : "Mission control is monitoring the flight."}
                </p>
              </div>
            </div>
          ))}
          <div className="timeline-footer technical">
            CONFIGURATION LOCKED AT LAUNCH.
            <br />
            SAME DESIGN + SEED = SAME FLIGHT.
          </div>
        </aside>
      </div>
      <div className="game-bottom-bar">
        <Link className="game-secondary" href="/play/verify">
          ← RETURN TO PREFLIGHT
        </Link>
        <p>
          {done
            ? "Flight data is ready. Discover what your decisions made possible."
            : "You can pause, change playback speed, or skip without changing the outcome."}
        </p>
        {done ? (
          <Link className="button" href="/play/result">
            SEE MISSION RESULTS <span>↗</span>
          </Link>
        ) : (
          <button className="button" disabled>
            MISSION IN PROGRESS <span>↗</span>
          </button>
        )}
      </div>
    </section>
  );
}
