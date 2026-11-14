"use client";
import { useEffect, useRef, useState } from "react";
import { useMissionStore } from "@/game/store/mission-store";
import { useCommander } from "@/game/store/commander-store";
import { getMission, PARTS } from "@/game/data/catalog";
import { resources } from "@/game/engine/resources";
import { verify } from "@/game/engine/validation";
import { missionAudio } from "@/game/audio/audio-manager";
/** Observe design changes once at the experience root, not in every card/meter. */
export function useGameFeedback(location: string) {
  const s = useMissionStore(),
    p = useCommander(),
    [message, setMessage] = useState(""),
    previous = useRef(s.design),
    previousLocation = useRef(location);
  useEffect(() => {
    if (!s.hydrated) return;
    const before = previous.current,
      d = s.design;
    previous.current = d;
    if (before === d) return;
    const added = d.partIds.filter((id) => !before.partIds.includes(id)),
      removed = before.partIds.filter((id) => !d.partIds.includes(id));
    let text = "";
    if (before.missionId !== d.missionId) {
      missionAudio.play("select");
      text = `${getMission(d.missionId).name} selected. New mission targets loaded.`;
    } else if (added.length || removed.length) {
      missionAudio.play(added.length ? "install" : "remove");
      text =
        added.length === 1
          ? `${PARTS.find((p) => p.id === added[0])?.name} installed.`
          : added.length > 1
            ? "Baseline assembled."
            : "Component removed.";
    } else missionAudio.play("select");
    const r = resources(d),
      m = getMission(d.missionId),
      warnings = [
        r.cost > m.budget
          ? `Budget exceeded by $${(r.cost - m.budget).toFixed(1)}M`
          : "",
        r.mass > m.massLimit
          ? `Mass exceeds limit by ${(r.mass - m.massLimit).toFixed(1)} kg`
          : "",
        added.some(
          (id) =>
            !PARTS.find((p) => p.id === id)?.missions.includes(d.missionId),
        )
          ? "Incompatible component: check destination"
          : "",
      ].filter(Boolean);
    if (warnings.length) {
      missionAudio.play("warning");
      text = warnings.join(". ") + ". Redesign before launch.";
    }
    if (text) setMessage(text);
  }, [s.design, s.hydrated]);
  useEffect(() => {
    missionAudio.scene(
      ["result", "results"].includes(location) && s.complete && s.run
        ? s.run.result.outcome
        : location,
    );
    if (previousLocation.current !== location) {
      previousLocation.current = location;
      missionAudio.play("transition");
    }
    if (["verification", "verify"].includes(location) && verify(s.design).ready)
      missionAudio.play("verify");
  }, [location, s.design, s.complete, s.run]);
  const record = p.record;
  useEffect(() => {
    record(s.history);
  }, [s.history, record]);
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(""), 4500);
    return () => clearTimeout(id);
  }, [message]);
  return message;
}
