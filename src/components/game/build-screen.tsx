"use client";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, PARTS, getMission } from "@/game/data/catalog";
import { useMissionStore } from "@/game/store/mission-store";
import type { Category } from "@/game/types";
import { ScreenHeading } from "./game-shell";
import { ResourcePanel } from "./resource-panel";
import { SourceNote } from "./source-note";
import { Spacecraft } from "./spacecraft";
export function BuildScreen() {
  const s = useMissionStore(),
    [category, setCategory] = useState<Category>("structure"),
    m = getMission(s.design.missionId),
    parts = PARTS.filter((p) => p.category === category),
    c = CATEGORIES.find((c) => c.id === category)!;
  return (
    <section className="game-screen">
      <ScreenHeading
        number="02"
        eyebrow={`SPACECRAFT ASSEMBLY / ${m.name.toUpperCase()}`}
        title="BIG IDEAS."
        accent="REAL TRADE-OFFS."
        description={
          m.fleet === 4
            ? "Design one satellite. The same configuration is built four times; mass and cost include the complete constellation."
            : "Every component has a consequence. Build a spacecraft that can turn your science question into discovery."
        }
      />
      <div className="builder-layout">
        <div className="component-library">
          <div className="library-header">
            <div>
              <span className="eyebrow">ENGINEERING CATALOG</span>
              <p>Select one part per subsystem. Combine science instruments.</p>
            </div>
            <button className="game-secondary" onClick={s.starter}>
              LOAD BASELINE ↗
            </button>
          </div>
          <div className="category-tabs" aria-label="Component categories">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                aria-pressed={category === cat.id}
                onClick={() => setCategory(cat.id)}
              >
                <span>0{i + 1}</span>
                {cat.name}
                {s.design.partIds.some(
                  (id) => PARTS.find((p) => p.id === id)?.category === cat.id,
                ) && <i aria-label="Installed">✓</i>}
              </button>
            ))}
          </div>
          <div className="category-heading">
            <h2>{c.name}</h2>
            <p>{c.hint}</p>
          </div>
          <div className="parts-list">
            {parts.map((p) => {
              const installed = s.design.partIds.includes(p.id),
                compatible = p.missions.includes(m.id);
              return (
                <article
                  className={`part-card ${installed ? "installed" : ""}`}
                  key={p.id}
                >
                  <div className="part-card-top">
                    <span className="part-icon">
                      {category === "power"
                        ? "▦"
                        : category === "communications"
                          ? "⌁"
                          : category === "camera"
                            ? "◎"
                            : category === "science"
                              ? "✳"
                              : "◇"}
                    </span>
                    <div>
                      <span className="technical">
                        {compatible
                          ? "DESTINATION COMPATIBLE"
                          : "! NOT FOR THIS DESTINATION"}
                      </span>
                      <h3>{p.name}</h3>
                    </div>
                    <span className="part-price">
                      ${p.cost}M<small>PER CRAFT</small>
                    </span>
                  </div>
                  <p>
                    {p.description} {p.limitations}
                  </p>
                  <SourceNote source={p.source} />
                  <dl className="part-stats">
                    {[
                      ["MASS", `${p.mass} kg`],
                      ["DRAW", `${p.draw} W`],
                      ["GENERATION", `${p.generation} W`],
                      ["DATA", `${p.data} GB/d`],
                      ["STORAGE", `${p.storage} GB`],
                      ["DOWNLINK", `${p.downlink} GB/d*`],
                      ["LIFETIME", `${p.lifetime} mo`],
                      ...(p.battery ? [["STORAGE", `${p.battery} Wh`]] : []),
                      ...(p.science ? [["SCIENCE", `${p.science} pts`]] : []),
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <button
                    className={
                      installed
                        ? "game-secondary part-remove"
                        : "game-secondary"
                    }
                    onClick={() => s.toggle(p.id)}
                    aria-pressed={installed}
                  >
                    {installed ? "✓ INSTALLED · REMOVE" : "＋ ADD COMPONENT"}
                  </button>
                </article>
              );
            })}
          </div>
          <p className="catalog-note">
            * Nominal downlink before orbit contact time. Array output is before
            distance and eclipse losses. All values are simplified estimates.
          </p>
        </div>
        <aside className="build-summary">
          <Spacecraft design={s.design} />
          <ResourcePanel design={s.design} />
        </aside>
      </div>
      <div className="game-bottom-bar">
        <Link className="game-secondary" href="/play/goal">
          ← MISSION GOAL
        </Link>
        <p>Ready to put your decisions to the test?</p>
        <Link className="button" href="/play/verify">
          VERIFY SPACECRAFT <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
