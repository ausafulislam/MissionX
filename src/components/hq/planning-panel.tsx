"use client";
import { SourceNote } from "@/components/game/source-note";
import { MISSIONS, getMission } from "@/game/data/catalog";
import { useMissionStore } from "@/game/store/mission-store";
import type { MissionId } from "@/game/types";
export function PlanningPanel({
  onChoose,
  onBuild,
}: {
  onChoose: (id: MissionId) => void;
  onBuild: () => void;
}) {
  const s = useMissionStore(),
    m = getMission(s.design.missionId);
  return (
    <>
      <span className="eyebrow">01 / MISSION PLANNING</span>
      <h2>
        CHOOSE YOUR
        <br />
        <em>FRONTIER.</em>
      </h2>
      <div className="hq-destination-tabs" aria-label="Mission destination">
        {MISSIONS.map((mission) => (
          <button
            key={mission.id}
            aria-pressed={m.id === mission.id}
            onClick={() => onChoose(mission.id)}
          >
            {mission.id.toUpperCase()}
          </button>
        ))}
      </div>
      <span className="hq-tag">
        {m.difficulty.toUpperCase()} ·{" "}
        {m.fleet === 4 ? "FOUR SATELLITES" : "SINGLE SPACECRAFT"}
      </span>
      <h3 className="station-title">{m.name}</h3>
      <p>{m.description}</p>
      <SourceNote source={m.source}/>
      <div className="hq-requirement-grid">
        {[
          ["MASS LIMIT", `${m.massLimit} kg`],
          ["TOTAL BUDGET", `$${m.budget}M`],
          ["SCIENCE GOAL", `${m.scienceTarget} pts`],
          ["LIFETIME", `${m.lifetimeTarget} mo`],
        ].map(([label, value]) => (
          <div key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <ul className="hq-objectives">
        {m.objectives.map((o) => (
          <li key={o}>
            <span>↗</span>
            {o}
          </li>
        ))}
      </ul>
      <button className="button" onClick={onBuild}>
        ENTER ENGINEERING LAB <span>↗</span>
      </button>
      <p className="hq-fineprint">
        All mission values are simplified educational estimates. Select a planet
        in the scene or use the controls above.
      </p>
    </>
  );
}
