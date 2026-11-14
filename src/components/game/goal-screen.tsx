"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MISSIONS, getMission } from "@/game/data/catalog";
import { useMissionStore } from "@/game/store/mission-store";
import { ScreenHeading } from "./game-shell";
import { Destination } from "./destination";
import type { MissionId } from "@/game/types";
export function GoalScreen() {
  const [pending, setPending] = useState<MissionId | null>(null);
  const s = useMissionStore(),
    router = useRouter(),
    m = getMission(s.design.missionId);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("mission");
    if (id === "moon" || id === "sun" || id === "mars")
      useMissionStore.getState().choose(id);
  }, []);
  const requirements = [
    ["MASS LIMIT", `${m.massLimit} kg`],
    ["MISSION BUDGET", `$${m.budget}M`],
    ["SCIENCE TARGET", `${m.scienceTarget} points`],
    ["MINIMUM LIFETIME", `${m.lifetimeTarget} months`],
  ];
  return (
    <section className="game-screen">
      <ScreenHeading
        number="01"
        eyebrow="MISSION SELECTION"
        title="CHOOSE YOUR"
        accent="FRONTIER."
        description="One question can change everything. Choose where your curiosity takes you, then engineer a way to get there."
      />
      <div className="goal-layout">
        <div className="mission-selector">
          <span className="eyebrow">THREE DESTINATIONS. YOUR CALL.</span>
          {MISSIONS.map((mission, i) => (
            <button
              key={mission.id}
              className={`mission-choice ${m.id === mission.id ? "selected" : ""}`}
              aria-pressed={m.id === mission.id}
              onClick={() => {
                if (
                  s.design.partIds.length &&
                  s.design.missionId !== mission.id
                )
                  setPending(mission.id);
                else s.choose(mission.id);
              }}
            >
              <span className="choice-number">0{i + 1}</span>
              <span>
                <small>
                  {mission.difficulty.toUpperCase()} /{" "}
                  {mission.fleet === 4 ? "4 SATELLITES" : "1 SPACECRAFT"}
                </small>
                <strong>{mission.name}</strong>
                <em>
                  {m.id === mission.id
                    ? "SELECTED MISSION"
                    : "EXPLORE DESTINATION"}
                </em>
              </span>
              <span className="choice-arrow">↗</span>
            </button>
          ))}
          {pending && (
            <div className="mission-switch-confirm game-panel" role="alert">
              <h3 className="game-label">CHANGE DESTINATION?</h3>
              <p>
                This replaces your active workspace. Completed flight history is
                kept.
              </p>
              <div className="game-button-group">
                <button
                  className="game-secondary"
                  onClick={() => setPending(null)}
                >
                  KEEP CURRENT
                </button>
                <button
                  className="game-secondary"
                  onClick={() => {
                    s.choose(pending);
                    setPending(null);
                  }}
                >
                  CHANGE MISSION ↗
                </button>
              </div>
            </div>
          )}
          <div className="field-note">
            <span>◎</span>
            <p>
              No perfect answers. Just decisions.
              <br />
              Each mission teaches a different engineering trade-off.
            </p>
          </div>
        </div>
        <div className="mission-overview game-panel">
          <div className="overview-visual">
            <Destination id={m.id} />
            <div className="overview-visual-copy">
              <span className="eyebrow">{m.subtitle}</span>
              <h2>{m.name}</h2>
              <span className="technical">
                {m.fleet === 4
                  ? "CONSTELLATION / 04 IDENTICAL SPACECRAFT"
                  : "SINGLE SPACECRAFT / ORBITAL SCIENCE"}
              </span>
            </div>
          </div>
          <div className="overview-details">
            <p>{m.description}</p>
            <div className="goal-requirements">
              {requirements.map(([label, value]) => (
                <div key={label}>
                  <span className="technical">{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <h3 className="game-label">YOUR SCIENCE OBJECTIVES</h3>
            <ul className="objective-list">
              {m.objectives.map((o) => (
                <li key={o}>
                  <span>↗</span>
                  {o}
                </li>
              ))}
            </ul>
            <div className="game-action-row">
              <span className="technical">
                {m.fleet === 4
                  ? "TOTAL MASS & COST COVER ALL FOUR SATELLITES."
                  : "ALL VALUES ARE EDUCATIONAL ESTIMATES."}
              </span>
              <button
                className="button"
                onClick={() => {
                  s.choose(m.id);
                  router.push("/play/build");
                }}
              >
                START MISSION <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
