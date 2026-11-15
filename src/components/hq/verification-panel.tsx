"use client";
import { useState } from "react";
import { SourceNote } from "@/components/game/source-note";
import { ORBITS, ROCKETS, getOrbit, getRocket } from "@/game/data/catalog";
import { verify } from "@/game/engine/validation";
import { mentorAdvice } from "@/game/engine/mentor";
import { useMissionStore } from "@/game/store/mission-store";
import { missionAudio } from "@/game/audio/audio-manager";
export function VerificationPanel({
  onLaunch,
}: {
  onLaunch: (seed: number) => void;
}) {
  const s = useMissionStore(),
    v = verify(s.design),
    [seed, setSeed] = useState("2026"),
    valid = /^\d+$/.test(seed) && Number(seed) <= 4294967295;
  return (
    <>
      <span className="eyebrow">03 / LAUNCH CONTROL</span>
      <h2>
        {v.ready ? "ALL SYSTEMS" : "ENGINEERING"}
        <br />
        <em>{v.ready ? "GO." : "REVIEW."}</em>
      </h2>
      <div className={`hq-readiness ${v.ready ? "ready" : ""}`} role="status">
        {v.ready
          ? "✓ FLIGHT CERTIFIED"
          : `! ${v.checks.filter((c) => c.status !== "pass").length} CHECKS REQUIRE ATTENTION`}
      </div>
      <h3 className="hq-section-label">LAUNCH VEHICLE</h3>
      <div className="hq-radio-list">
        {ROCKETS.map((r) => (
          <button
            key={r.id}
            aria-pressed={s.design.rocketId === r.id}
            onClick={() => {
              s.setRocket(r.id);
              missionAudio.play("click");
            }}
          >
            <strong>
              {r.name}
              <span>${r.cost}M</span>
            </strong>
            <small>
              {r.capacity} kg · {(r.reliability * 100).toFixed(1)}% reliability
            </small>
          </button>
        ))}
      </div>
      <label className="hq-select-label">
        Science orbit
        <select
          value={s.design.orbitId}
          onChange={(e) => {
            s.setOrbit(e.target.value);
            missionAudio.play("click");
          }}
        >
          {ORBITS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </label>
      <SourceNote source={getRocket(s.design.rocketId).source} />
      <SourceNote source={getOrbit(s.design.orbitId).source} />
      <div className="hq-checks">
        {v.checks.map((c) => (
          <div key={c.id}>
            <strong>
              {c.label}
              <span className={`hq-${c.status}`}>
                {c.status === "pass" ? "✓" : c.status === "close" ? "!" : "×"}{" "}
                {c.status === "close" ? "WARNING" : c.status.toUpperCase()}
              </span>
            </strong>
            <p>{c.reason}</p>
          </div>
        ))}
      </div>
      <div className="hq-local-mentor">
        <span className="eyebrow">ENGINEERING ADVISOR</span>
        <p>{mentorAdvice(s.design)}</p>
      </div>
      <label className="hq-select-label">
        Flight seed
        <input
          type="number"
          min="0"
          max="4294967295"
          value={seed}
          aria-invalid={!valid}
          onChange={(e) => setSeed(e.target.value)}
        />
      </label>
      <p className="hq-fineprint">
        Same design + seed = same flight events. Blocking requirements must
        pass. Warnings marked as accepted operational risks may reduce science
        return.
      </p>
      <button
        className="button"
        data-tour-launch
        disabled={!v.ready || !valid}
        onClick={() => onLaunch(Number(seed))}
      >
        INITIATE LAUNCH <span>↗</span>
      </button>
    </>
  );
}
