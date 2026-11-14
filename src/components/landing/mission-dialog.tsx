"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { detectDevice, requestImmersion } from "@/components/hq/device";
import { missionAudio } from "@/game/audio/audio-manager";
import { missions, type MissionId } from "./mission-data";

export function MissionDialog({
  selected,
  onClose,
  onSelect,
}: {
  selected: MissionId | null;
  onClose: () => void;
  onSelect: (id: MissionId) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const mission = missions.find((m) => m.id === selected) ?? missions[0];
  useEffect(() => {
    const dialog = ref.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
    if (!selected && dialog?.open) dialog.close();
  }, [selected]);
  return (
    <dialog
      ref={ref}
      className="mission-dialog"
      aria-labelledby="brief-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="dialog-inner" data-lenis-prevent>
        <div className="dialog-top">
          <span className="eyebrow">MISSION BRIEFING / {mission.number}</span>
          <button
            className="close-button"
            aria-label="Close mission briefing"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <h2 id="brief-title">
          CHOOSE YOUR
          <br />
          <em>FRONTIER.</em>
        </h2>
        <div className="brief-choices" aria-label="Choose mission">
          {missions.map((m) => (
            <button
              key={m.id}
              aria-pressed={m.id === selected}
              onClick={() => onSelect(m.id)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <span className="eyebrow">
          {mission.category} · {mission.difficulty}
        </span>
        <h3>{mission.name}</h3>
        <p>{mission.description}</p>
        <h4>YOUR OBJECTIVES</h4>
        <ul>
          {mission.objective.split(" · ").map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <div className="development-note">
          <span className="status-dot" /> YOUR FLIGHT DECK IS READY
          <p>
            Build your spacecraft, verify every requirement, and see how your
            decisions perform. All values are simplified educational estimates.
          </p>
        </div>
        <Link
          className="button"
          href={`/hq?mission=${mission.id}`}
          onClick={() => {
            if (detectDevice().kind === "desktop") requestImmersion();
            void missionAudio.unlock();
            onClose();
          }}
        >
          ENTER MISSION CONTROL <span>↗</span>
        </Link>
      </div>
    </dialog>
  );
}
