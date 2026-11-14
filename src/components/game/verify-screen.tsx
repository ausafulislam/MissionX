"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ORBITS, ROCKETS, getMission, getOrbit, getRocket } from "@/game/data/catalog";
import { verify } from "@/game/engine/validation";
import { useMissionStore } from "@/game/store/mission-store";
import { ScreenHeading } from "./game-shell";
import { SourceNote } from "./source-note";
import { CheckList } from "./check-list";
import { ResourcePanel } from "./resource-panel";
import { MentorPanel } from "./mentor-panel";
export function VerifyScreen() {
  const s = useMissionStore(),
    v = verify(s.design),
    m = getMission(s.design.missionId),
    router = useRouter(),
    [seed, setSeed] = useState("2026");
  const seedValid = /^\d+$/.test(seed) && Number(seed) <= 4294967295;
  return (
    <section className="game-screen">
      <ScreenHeading
        number="03"
        eyebrow="PREFLIGHT VERIFICATION"
        title="LEAVE NOTHING"
        accent="TO CHANCE."
        description="The right spacecraft. The right rocket. The right orbit. Check the complete system before you commit to the unknown."
      />
      <div
        className={`readiness-banner ${v.ready ? "ready" : ""}`}
        role="status"
      >
        <span>{v.ready ? "✓" : "!"}</span>
        <div>
          <h2>
            {v.ready ? "ALL SYSTEMS GO." : "ENGINEERING REVIEW REQUIRED."}
          </h2>
          <p>
            {v.ready
              ? "All blocking requirements pass. Review advisory warnings; they may limit science return."
              : `${v.checks.filter((c) => c.status !== "pass").length} checks need attention. Resolve blocking requirements. Advisory warnings identify risks you may choose to fly.`}
          </p>
        </div>
        <span className="technical">
          {v.checks.filter((c) => c.status === "pass").length} /{" "}
          {v.checks.length}
        </span>
      </div>
      <div className="verify-layout">
        <div>
          <div className="game-panel verification-panel">
            <div className="game-panel-heading">
              <h2>01 / MISSION REQUIREMENTS</h2>
              <span>{m.name.toUpperCase()}</span>
            </div>
            <CheckList checks={v.checks.slice(0, 4)} />
          </div>
          <div className="game-panel verification-panel">
            <div className="game-panel-heading">
              <h2>02 / SYSTEMS & COMPATIBILITY</h2>
              <span>NO CHECK LEFT BEHIND</span>
            </div>
            <CheckList checks={v.checks.slice(4)} />
          </div>
        </div>
        <aside>
          <div className="game-panel selection-panel">
            <div className="game-panel-heading">
              <h2>03 / LAUNCH SERVICE</h2>
              <span>INCLUDED IN BUDGET</span>
            </div>
            {ROCKETS.map((r) => (
              <button
                className={`launch-choice ${s.design.rocketId === r.id ? "selected" : ""}`}
                key={r.id}
                aria-pressed={s.design.rocketId === r.id}
                onClick={() => s.setRocket(r.id)}
              >
                <div>
                  <h3>{r.name}</h3>
                  <span>${r.cost}M</span>
                </div>
                <p>{r.description}</p>
                <span className="technical">
                  {r.capacity} KG CAPACITY · {(r.reliability * 100).toFixed(1)}%
                  RELIABILITY
                </span>
                <small>
                  {s.design.rocketId === r.id
                    ? "✓ SELECTED"
                    : "+ SELECT LAUNCHER"}
                </small>
              </button>
            ))}
          </div>
          <div className="game-panel selection-panel">
            <div className="game-panel-heading">
              <h2>04 / SCIENCE ORBIT</h2>
              <span>DESTINATION MATTERS</span>
            </div>
            {ORBITS.map((o) => (
              <button
                className={`launch-choice ${s.design.orbitId === o.id ? "selected" : ""}`}
                key={o.id}
                aria-pressed={s.design.orbitId === o.id}
                onClick={() => s.setOrbit(o.id)}
              >
                <div>
                  <h3>{o.name}</h3>
                  <span>{o.missions.includes(m.id) ? "✓" : "!"}</span>
                </div>
                <p>{o.description}</p>
                <span className="technical">
                  {(o.eclipse * 100).toFixed(0)}% ECLIPSE ·{" "}
                  {(o.contact * 100).toFixed(0)}% GROUND CONTACT
                </span>
                <small>
                  {s.design.orbitId === o.id ? "✓ SELECTED" : "+ SELECT ORBIT"}
                </small>
              </button>
            ))}
          </div>
          <SourceNote source={getRocket(s.design.rocketId).source}/>
          <SourceNote source={getOrbit(s.design.orbitId).source}/>
          <ResourcePanel design={s.design} />
        </aside>
      </div>
      <div className="flight-seed game-panel">
        <div>
          <h2 className="game-label">FLIGHT SEED</h2>
          <p>
            The same design and seed reproduce the same events. Change the seed
            to explore another flight.
          </p>
        </div>
        <label>
          SEED{" "}
          <input
            type="number"
            min="0"
            max="4294967295"
            step="1"
            value={seed}
            aria-invalid={!seedValid}
            onChange={(e) => setSeed(e.target.value)}
          />
        </label>
        {!seedValid && (
          <p className="seed-error" role="alert">
            Enter a whole number from 0 to 4294967295.
          </p>
        )}
      </div>
      <MentorPanel key={JSON.stringify(s.design)} design={s.design} />
      <div className="game-bottom-bar">
        <Link className="game-secondary" href="/play/build">
          ← REDESIGN SPACECRAFT
        </Link>
        <p>
          {v.ready
            ? "Verified, not invulnerable. Leave margin for the unexpected."
            : "Resolve every blocking check; advisory warnings may be flown with reduced science return."}
        </p>
        <button
          className="button"
          disabled={!v.ready || !seedValid}
          onClick={() => {
            if (s.launch(Number(seed))) router.push("/play/launch");
          }}
        >
          CONTINUE TO LAUNCH <span>↗</span>
        </button>
      </div>
    </section>
  );
}
