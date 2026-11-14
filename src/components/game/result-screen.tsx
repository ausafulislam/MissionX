"use client";
import { MissionReport } from "@/components/game/mission-report";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMission, getOrbit, getRocket } from "@/game/data/catalog";
import { useMissionStore } from "@/game/store/mission-store";
import { ScreenHeading } from "./game-shell";
import { CheckList } from "./check-list";
import { AnimatedScore } from "./animated-score";
import { OperationsNote } from "./operations-note";
import { OutcomeReveal } from "./outcome-reveal";
import { MentorPanel } from "./mentor-panel";
export function ResultScreen() {
  const s = useMissionStore(),
    run = s.run,
    router = useRouter();
  if (!run) return null;
  const r = run.result,
    m = getMission(run.design.missionId),
    outcome =
      r.outcome === "partial"
        ? "PARTIAL SUCCESS"
        : r.outcome === "failed"
          ? "MISSION FAILED"
          : "MISSION SUCCESS";
  return (
    <section className="game-screen">
      <ScreenHeading
        number="05"
        eyebrow={`MISSION EVALUATION / ${m.name.toUpperCase()}`}
        title="EVERY OUTCOME."
        accent="A DISCOVERY."
        description="Behind every result is an engineering decision. Follow your science from launch to the people who use it."
      />
      <MissionReport run={run} />
      <OutcomeReveal run={run} />
      <div className={`result-hero result-${r.outcome} game-panel`}>
        <div className="score-dial">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="#273246"
              strokeWidth="4"
            />
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${(r.score / 100) * 540.35} 540.35`}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <strong>
            <AnimatedScore value={r.score} />
            <small>/ 100</small>
          </strong>
          <span>MISSION SCORE</span>
        </div>
        <div className="result-statement">
          <span
            className={`status-pill status-${r.outcome === "success" ? "pass" : r.outcome === "partial" ? "close" : "fail"}`}
          >
            {r.outcome === "success"
              ? "✓"
              : r.outcome === "partial"
                ? "!"
                : "×"}{" "}
            {outcome}
          </span>
          <h2>
            {r.outcome === "success"
              ? "YOU MADE IT."
              : r.outcome === "partial"
                ? "PROGRESS IS SCIENCE."
                : "FAILURE IS A TEACHER."}
          </h2>
          <p>
            {r.outcome === "success"
              ? "Your spacecraft met the science and engineering goals. Now ask: could a different design get there with less?"
              : r.outcome === "partial"
                ? "Your mission returned useful science, but some goals were not fully achieved. The next design begins with what you learned."
                : "The mission did not deliver its science objective. The report below explains what happened and how you can improve."}
          </p>
          <span className="technical">
            SEED {r.seed} · {getRocket(run.design.rocketId).name.toUpperCase()}{" "}
            · {getOrbit(run.design.orbitId).name.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="result-metrics">
        {[
          [
            "SCIENCE ACHIEVEMENT",
            `${r.scienceScore}%`,
            `${r.science} / ${m.scienceTarget} science points`,
          ],
          [
            "ENGINEERING PERFORMANCE",
            `${r.engineeringScore}%`,
            "Power availability + design lifetime",
          ],
          [
            "RESOURCE EFFICIENCY",
            `${r.efficiencyScore}%`,
            "Based on budget used and science delivery",
          ],
          [
            "MISSION LIFETIME",
            `${r.lifetime} mo`,
            `${m.lifetimeTarget} months required`,
          ],
        ].map(([label, value, note]) => (
          <div key={label}>
            <span className="technical">{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
          </div>
        ))}
      </div>
      <div className="report-heading">
        <span className="eyebrow">ONE MISSION. FOUR CONNECTED SEGMENTS.</span>
        <h2>
          THE WHOLE <em>PICTURE.</em>
        </h2>
      </div>
      <div className="segment-reports">
        {r.segments.map((segment, i) => (
          <article className="game-panel segment-report" key={segment.name}>
            <div>
              <span className="report-number">0{i + 1}</span>
              <span className={`status-pill status-${segment.status}`}>
                {segment.status === "pass"
                  ? "SUCCESS"
                  : segment.status === "close"
                    ? "PARTIAL"
                    : "FAILED"}
              </span>
            </div>
            <h3>{segment.name}</h3>
            <p>{segment.explanation}</p>
            {segment.name === "GROUND" && <OperationsNote result={r} />}
          </article>
        ))}
      </div>
      <div className="result-detail-layout">
        <div className="game-panel">
          <div className="game-panel-heading">
            <h2>REQUIREMENTS ACHIEVED</h2>
            <span>
              {r.requirements.filter((c) => c.status === "pass").length} / 4
            </span>
          </div>
          <CheckList checks={r.requirements} />
        </div>
        <div className="game-panel lessons-panel">
          <div className="game-panel-heading">
            <h2>ENGINEERING RECOMMENDATIONS</h2>
            <span>YOUR NEXT ITERATION</span>
          </div>
          <ol>
            {r.lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ol>
          <div className="real-mission">
            <span className="technical">EXPLORE A REAL MISSION</span>
            <a href={m.reference.url} target="_blank" rel="noopener noreferrer">
              {m.reference.name} ↗
            </a>
            <p>
              Shared science theme, not a reproduction of real flight
              performance. No affiliation or endorsement.
            </p>
          </div>
        </div>
      </div>
      <MentorPanel key={run.id} design={run.design} run={run} />
      <div className="game-bottom-bar">
        <button
          className="game-secondary"
          onClick={() => {
            s.redesign();
            router.push("/play/build");
          }}
        >
          ← REDESIGN MISSION
        </button>
        <p>Your completed flight is saved in the local design archive.</p>
        <Link className="button" href="/play/debrief">
          COMPARE MISSION DESIGNS <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
