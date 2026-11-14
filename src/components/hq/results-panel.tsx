"use client";
import { AnimatedScore } from "@/components/game/animated-score";
import { OperationsNote } from "@/components/game/operations-note";
import { OutcomeReveal } from "@/components/game/outcome-reveal";
import { useState } from "react";
import { ACHIEVEMENTS } from "@/game/engine/progression";
import { getMission, PARTS } from "@/game/data/catalog";
import { resources } from "@/game/engine/resources";
import { mentorAdvice } from "@/game/engine/mentor";
import { useMissionStore } from "@/game/store/mission-store";
import { useCommander } from "@/game/store/commander-store";
import type { SavedRun } from "@/game/types";
export function ResultsPanel({ onRedesign }: { onRedesign: () => void }) {
  const s = useMissionStore(),
    p = useCommander(),
    run = s.run;
  if (!run || !s.complete)
    return (
      <>
        <span className="eyebrow">04 / SCIENCE & DATA</span>
        <h2>
          DISCOVERY
          <br />
          <em>AWAITS.</em>
        </h2>
        <p>
          Complete a flight to receive your science return, mission evaluation
          and engineering recommendations here.
        </p>
        <div className="hq-readiness">◎ GROUND SEGMENT READY TO RECEIVE</div>
      </>
    );
  const r = run.result,
    m = getMission(run.design.missionId);
  return (
    <>
      <span className="eyebrow">04 / MISSION EVALUATION</span>
      <h2>
        {r.outcome === "success"
          ? "MISSION"
          : r.outcome === "partial"
            ? "PARTIAL"
            : "MISSION"}
        <br />
        <em>
          {r.outcome === "success"
            ? "SUCCESS."
            : r.outcome === "partial"
              ? "SUCCESS."
              : "FAILED."}
        </em>
      </h2>
      <OutcomeReveal run={run} />
      <div className="hq-score">
        <strong>
          <AnimatedScore value={r.score} />
          <small>/ 100</small>
        </strong>
        <span>
          MISSION SCORE
          <br />
          {r.lifetime} MONTHS ACHIEVED
        </span>
      </div>
      <p>
        {r.science} / {m.scienceTarget} science points · {r.returnedData} GB/day
        returned.
      </p>
      <div className="hq-report-list">
        {r.segments.map((seg, i) => (
          <div key={seg.name}>
            <strong>
              0{i + 1} / {seg.name}
              <span className={`hq-${seg.status}`}>
                {seg.status === "pass"
                  ? "SUCCESS"
                  : seg.status === "close"
                    ? "PARTIAL"
                    : "FAILED"}
              </span>
            </strong>
            <p>{seg.explanation}</p>
            {seg.name === "GROUND" && <OperationsNote result={r} />}
          </div>
        ))}
      </div>
      <div className="hq-local-mentor">
        <span className="eyebrow">MISSION MENTOR</span>
        <p>{mentorAdvice(run.design, r)}</p>
      </div>
      <h3 className="hq-section-label">LESSONS FOR YOUR NEXT FLIGHT</h3>
      <ul className="hq-objectives">
        {r.lessons.map((l) => (
          <li key={l}>
            <span>↗</span>
            {l}
          </li>
        ))}
      </ul>
      <div className="hq-badges">
        {ACHIEVEMENTS.filter((a) => p.progress.achievements.includes(a.id)).map(
          (a) => (
            <div key={a.id} title={a.description}>
              <span>✧</span>
              <strong>{a.name}</strong>
              <small>{a.description}</small>
            </div>
          ),
        )}
      </div>
      <a
        href={m.reference.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hq-text-button"
      >
        REAL MISSION / {m.reference.name.toUpperCase()} ↗
      </a>
      <button className="button" onClick={onRedesign}>
        REDESIGN SPACECRAFT <span>↗</span>
      </button>
    </>
  );
}
export function ArchivePanel({
  restore,
}: {
  restore: (run: SavedRun) => void;
}) {
  const s = useMissionStore(),
    [a, setA] = useState(""),
    [b, setB] = useState(""),
    left = s.history.find((r) => r.id === a) ?? s.history[1] ?? s.history[0],
    right = s.history.find((r) => r.id === b) ?? s.history[0];
  return (
    <>
      <span className="eyebrow">05 / FLIGHT ARCHIVE</span>
      <h2>
        LEARN.
        <br />
        <em>GO FURTHER.</em>
      </h2>
      <p>
        {s.history.length
          ? "Every flight leaves a lesson. Compare actual configurations and outcomes, then send your next idea to the workbench."
          : "Your completed flights will be recorded here, locally on this browser. Complete your first mission to open the archive."}
      </p>
      {s.history.length > 1 && (
        <>
          {[
            { title: "REFERENCE FLIGHT", id: left.id, change: setA },
            { title: "COMPARE FLIGHT", id: right.id, change: setB },
          ].map((x) => (
            <label className="hq-select-label" key={x.title}>
              {x.title}
              <select value={x.id} onChange={(e) => x.change(e.target.value)}>
                {s.history.map((r, i) => (
                  <option key={r.id} value={r.id}>
                    FLIGHT {s.history.length - i} /{" "}
                    {getMission(r.design.missionId).name} / {r.result.score} pts
                  </option>
                ))}
              </select>
            </label>
          ))}
          <div className="hq-compare">
            {[
              ["SCORE", left.result.score, right.result.score],
              [
                "COST ($M)",
                resources(left.design).cost,
                resources(right.design).cost,
              ],
              [
                "MASS (kg)",
                resources(left.design).mass,
                resources(right.design).mass,
              ],
              ["SCIENCE", left.result.science, right.result.science],
              ["LIFETIME (mo)", left.result.lifetime, right.result.lifetime],
            ].map(([label, one, two]) => (
              <div key={String(label)}>
                <small>{label}</small>
                <span>{one}</span>
                <strong>{two}</strong>
              </div>
            ))}
          </div>
          <p className="hq-fineprint">
            {left.design.missionId !== right.design.missionId
              ? "These missions have different targets. Compare trade-offs, not scores as equivalents."
              : left.result.seed === right.result.seed
                ? "Identical seeds help isolate configuration changes."
                : "Seeds differ, so both your configuration and flight events may affect the difference."}
          </p>
        </>
      )}
      {s.history.map((run, i) => (
        <article className="archive-flight" key={run.id}>
          <span className="eyebrow">
            FLIGHT {s.history.length - i} / SEED {run.result.seed}
          </span>
          <h3>
            {getMission(run.design.missionId).name}
            <strong>{run.result.score}</strong>
          </h3>
          <span className="hq-tag">
            {run.result.outcome.toUpperCase()} · {resources(run.design).mass} kg
            · ${resources(run.design).cost}M
          </span>
          <details>
            <summary>INSPECT CONFIGURATION</summary>
            <ul>
              {run.design.partIds.map((id) => (
                <li key={id}>{PARTS.find((p) => p.id === id)?.name}</li>
              ))}
            </ul>
          </details>
          <button className="hq-outlined" onClick={() => restore(run)}>
            RESTORE TO WORKBENCH ↗
          </button>
        </article>
      ))}
    </>
  );
}
