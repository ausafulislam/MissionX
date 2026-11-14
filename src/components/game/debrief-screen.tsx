"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMission, PARTS } from "@/game/data/catalog";
import { resources } from "@/game/engine/resources";
import { useMissionStore } from "@/game/store/mission-store";
import type { SavedRun } from "@/game/types";
import { ScreenHeading } from "./game-shell";
import { Spacecraft } from "./spacecraft";
function RunCard({ run, onRestore }: { run: SavedRun; onRestore: () => void }) {
  const m = getMission(run.design.missionId),
    r = resources(run.design);
  return (
    <article className="game-panel comparison-card">
      <div className="comparison-card-header">
        <span className="eyebrow">{m.name.toUpperCase()}</span>
        <span
          className={`status-pill status-${run.result.outcome === "success" ? "pass" : run.result.outcome === "partial" ? "close" : "fail"}`}
        >
          {run.result.outcome === "success"
            ? "✓"
            : run.result.outcome === "partial"
              ? "!"
              : "×"}{" "}
          {run.result.outcome.toUpperCase()}
        </span>
      </div>
      <Spacecraft design={run.design} />
      <div className="comparison-card-body">
        <span className="technical">
          {new Date(run.createdAt).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}{" "}
          · SEED {run.result.seed}
        </span>
        <div className="comparison-score">
          <strong>
            {run.result.score}
            <small>/ 100</small>
          </strong>
          <span>MISSION SCORE</span>
        </div>
        <dl className="comparison-resources">
          {[
            ["BUDGET", `$${r.cost}M`],
            ["MASS", `${r.mass} kg`],
            ["POWER MARGIN", `${r.powerMargin.toFixed(0)} W`],
            ["DATA / DOWNLINK", `${r.data} / ${r.downlink.toFixed(1)} GB/d`],
            ["SCIENCE RETURN", `${run.result.science} points`],
            ["ACTUAL LIFETIME", `${run.result.lifetime} mo`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <h3 className="game-label">INSTALLED COMPONENTS</h3>
        <ul className="comparison-parts">
          {run.design.partIds.map((id) => (
            <li key={id}>{PARTS.find((p) => p.id === id)?.name}</li>
          ))}
        </ul>
        <button className="game-secondary" onClick={onRestore}>
          REDESIGN THIS CONFIGURATION ↗
        </button>
      </div>
    </article>
  );
}
export function DebriefScreen() {
  const s = useMissionStore(),
    router = useRouter(),
    [leftId, setLeft] = useState(""),
    [rightId, setRight] = useState(""),
    [confirmReset, setConfirmReset] = useState(false);
  const left =
      s.history.find((r) => r.id === leftId) ?? s.history[1] ?? s.history[0],
    right = s.history.find((r) => r.id === rightId) ?? s.history[0];
  const restore = (run: SavedRun) => {
    s.restore(run);
    router.push("/play/build");
  };
  if (!s.history.length)
    return (
      <section className="game-screen">
        <ScreenHeading
          number="06"
          eyebrow="MISSION DEBRIEF"
          title="LEARN. REFINE."
          accent="GO FURTHER."
          description="Your mission archive will grow with every flight. Compare your decisions and discover what changes the outcome."
        />
        <div className="game-panel game-empty">
          <span className="eyebrow">NO COMPLETED FLIGHTS YET</span>
          <h2>
            YOUR FIRST CHAPTER
            <br />
            <em>IS STILL AHEAD.</em>
          </h2>
          <p>
            Complete a mission to save its design, resources and outcome here.
            No account is needed.
          </p>
          <Link className="button" href="/play">
            RETURN TO YOUR MISSION <span>↗</span>
          </Link>
        </div>
      </section>
    );
  const lr = resources(left.design),
    rr = resources(right.design),
    same = left.design.missionId === right.design.missionId;
  return (
    <section className="game-screen">
      <ScreenHeading
        number="06"
        eyebrow={`DESIGN ARCHIVE / ${s.history.length} FLIGHTS SAVED`}
        title="LEARN. REFINE."
        accent="GO FURTHER."
        description="Change one decision. Fly again. Compare what happened. This is how engineering becomes understanding."
      />
      {s.history.length > 1 ? (
        <>
          <div className="comparison-selectors">
            {[
              { label: "REFERENCE FLIGHT", value: left.id, set: setLeft },
              { label: "COMPARE WITH", value: right.id, set: setRight },
            ].map((field) => (
              <label key={field.label}>
                <span className="technical">{field.label}</span>
                <select
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                >
                  {s.history.map((r, i) => (
                    <option key={r.id} value={r.id}>
                      FLIGHT {s.history.length - i} ·{" "}
                      {getMission(r.design.missionId).name} · {r.result.score}
                      /100 · SEED {r.result.seed}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="comparison-insight" role="status">
            <span>↗</span>
            <p>
              {left.id === right.id
                ? "You are viewing the same flight on both sides. Select another run to compare changes."
                : !same
                  ? "Different missions have different targets. Compare individual trade-offs, not scores as if they were equivalent."
                  : `Compared with the reference: ${rr.cost - lr.cost >= 0 ? "+" : ""}$${rr.cost - lr.cost}M budget, ${rr.mass - lr.mass >= 0 ? "+" : ""}${rr.mass - lr.mass} kg mass, and ${right.result.score - left.result.score >= 0 ? "+" : ""}${right.result.score - left.result.score} score points. ${left.result.seed !== right.result.seed ? "Seeds differ, so event effects also changed." : "The same seed helps isolate configuration changes."}`}
            </p>
          </div>
          <div className="comparison-grid">
            <RunCard run={left} onRestore={() => restore(left)} />
            <RunCard run={right} onRestore={() => restore(right)} />
          </div>
        </>
      ) : (
        <>
          <div className="comparison-insight">
            <span>◎</span>
            <p>
              Your first flight is saved. Redesign this configuration and
              complete another flight to unlock side-by-side comparison.
            </p>
          </div>
          <div className="single-run">
            <RunCard run={right} onRestore={() => restore(right)} />
          </div>
        </>
      )}
      <div className="game-bottom-bar">
        <Link className="game-secondary" href="/play">
          ← CURRENT MISSION
        </Link>
        <p>
          Up to 12 flights saved on this browser. History stays when you start a
          new mission.
        </p>
        <button className="button" onClick={() => setConfirmReset(true)}>
          NEW MISSION <span>↗</span>
        </button>
      </div>
      {confirmReset && (
        <div className="reset-confirmation game-panel" role="alert">
          <div>
            <h2 className="game-label">START A NEW MISSION?</h2>
            <p>
              This replaces your active workspace. Your completed flight archive
              is kept.
            </p>
          </div>
          <div className="game-button-group">
            <button
              className="game-secondary"
              onClick={() => setConfirmReset(false)}
            >
              KEEP WORKING
            </button>
            <button
              className="button"
              onClick={() => {
                s.reset();
                router.push("/play/goal");
              }}
            >
              CONFIRM NEW MISSION ↗
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
