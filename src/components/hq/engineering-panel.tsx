"use client";
import { SourceNote } from "@/components/game/source-note";
import { useState } from "react";
import { CATEGORIES, PARTS, getMission } from "@/game/data/catalog";
import { resources } from "@/game/engine/resources";
import { useMissionStore } from "@/game/store/mission-store";
import { missionAudio } from "@/game/audio/audio-manager";
import type { Category } from "@/game/types";
export function ResourceStrip() {
  const d = useMissionStore((s) => s.design),
    r = resources(d),
    m = getMission(d.missionId);
  return (
    <div className="hq-resource-strip">
      {[
        ["MASS", `${r.mass} / ${m.massLimit}`, r.mass <= m.massLimit],
        ["BUDGET", `$${r.cost} / ${m.budget}M`, r.cost <= m.budget],
        [
          "POWER",
          `${r.consumption} / ${r.generation.toFixed(0)}W`,
          r.consumption <= r.generation,
        ],
        [
          "DATA",
          `${r.data} / ${r.downlink.toFixed(0)} GB/d`,
          r.data <= r.downlink,
        ],
      ].map(([name, value, ok], index) => (
        <div key={String(name)} className={ok ? "" : "resource-over"}>
          <small>{name}</small>
          <strong>{value}</strong>
          <div className="hq-resource-bar" aria-hidden="true">
            <i
              style={{
                width: `${Math.min(100, Math.max(0, [r.mass / m.massLimit, r.cost / m.budget, r.generation ? r.consumption / r.generation : r.consumption ? 1 : 0, r.downlink ? r.data / r.downlink : r.data ? 1 : 0][index]) * 100)}%`,
              }}
            />
          </div>
          <span>{ok ? "✓ IN LIMIT" : "! REVIEW"}</span>
        </div>
      ))}
    </div>
  );
}
export function EngineeringPanel({
  inspect,
  onInspect,
  onVerify,
  notify,
}: {
  inspect: string | null;
  onInspect: (id: string) => void;
  onVerify: () => void;
  notify: (s: string) => void;
}) {
  const s = useMissionStore(),
    [category, setCategory] = useState<Category>("structure"),
    selected = PARTS.find((p) => p.id === inspect),
    m = getMission(s.design.missionId),
    balance = resources(s.design);
  const toggle = (id: string) => {
    const installed = s.design.partIds.includes(id);
    s.toggle(id);

    notify(
      `${PARTS.find((p) => p.id === id)?.name} ${installed ? "removed" : "installed"}. Resource model updated.`,
    );
  };
  return (
    <>
      <span className="eyebrow">02 / SPACECRAFT ENGINEERING</span>
      <h2>
        BUILD FOR
        <br />
        <em>THE BEYOND.</em>
      </h2>
      <p className="hq-fineprint">
        {m.fleet === 4
          ? "Build one satellite; this assembly is replicated four times."
          : "Click installed components on the model to inspect them."}{" "}
        Drag to orbit. Pinch or scroll to inspect. Mass headroom{" "}
        {balance.massMarginPercent.toFixed(1)}%; EOL power headroom{" "}
        {balance.powerMarginPercent.toFixed(1)}%; usable battery{" "}
        {balance.batteryUsable.toFixed(0)} Wh; onboard memory {balance.storage}{" "}
        GB. Remaining budget ${balance.budgetRemaining.toFixed(1)}M;{" "}
        {balance.risk} risk (gameplay heuristic).
      </p>
      <button
        className="hq-outlined"
        onClick={() => {
          s.starter();

          notify(
            "Verified baseline loaded. Every component is now installed on your workbench.",
          );
        }}
      >
        LOAD VERIFIED BASELINE ↗
      </button>
      <div className="hq-category-list" aria-label="Subsystem catalog">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            aria-pressed={category === c.id}
            onClick={() => {
              setCategory(c.id);
              missionAudio.play("click");
            }}
          >
            {c.name}
            {s.design.partIds.some(
              (id) => PARTS.find((p) => p.id === id)?.category === c.id,
            ) && " ✓"}
          </button>
        ))}
      </div>
      <div className="hq-component-list">
        {PARTS.filter((p) => p.category === category).map((p) => (
          <article
            key={p.id}
            className={s.design.partIds.includes(p.id) ? "equipped" : ""}
          >
            <button
              className="component-inspect"
              onClick={() => onInspect(p.id)}
            >
              <span className="hq-tag">
                {p.missions.includes(m.id)
                  ? "COMPATIBLE"
                  : "! DIFFERENT DESTINATION"}
              </span>
              <strong>{p.name}</strong>
              <span>
                {p.mass} kg · ${p.cost}M · {p.draw}W draw
              </span>
            </button>
            <button
              className="hq-outlined"
              aria-pressed={s.design.partIds.includes(p.id)}
              onClick={() => toggle(p.id)}
            >
              {s.design.partIds.includes(p.id)
                ? "− REMOVE COMPONENT"
                : "+ INSTALL COMPONENT"}
            </button>
          </article>
        ))}
      </div>
      {selected && (
        <div className="hq-inspection" aria-live="polite">
          <span className="eyebrow">COMPONENT INSPECTION</span>
          <h3>{selected.name}</h3>
          <p>
            {selected.description} {selected.limitations}
          </p>
          <SourceNote source={selected.source} />
          <dl>
            {[
              ["Mass", `${selected.mass} kg`],
              ["Mass memory", `${selected.storage} GB`],
              ["Cost", `$${selected.cost}M`],
              ["Power draw", `${selected.draw} W`],
              ["Solar supply", `${selected.generation} W`],
              ["Battery", `${selected.battery} Wh`],
              ["Data", `${selected.data} GB/d`],
              ["Downlink*", `${selected.downlink} GB/d`],
              ["Lifetime", `${selected.lifetime} mo`],
              ["Science", `${selected.science} pts`],
            ].map(([a, b]) => (
              <div key={a}>
                <dt>{a}</dt>
                <dd>{b}</dd>
              </div>
            ))}
          </dl>
          <small>* Nominal; orbit contact and solar conditions apply.</small>
        </div>
      )}
      <button className="button" onClick={onVerify}>
        VERIFY YOUR DESIGN <span>↗</span>
      </button>
    </>
  );
}
