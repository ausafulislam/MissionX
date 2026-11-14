"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getMission } from "@/game/data/catalog";
import { resources } from "@/game/engine/resources";
import type { Design } from "@/game/types";
export function ResourcePanel({ design }: { design: Design }) {
  const reduced = useReducedMotion();
  const r = resources(design),
    m = getMission(design.missionId),
    scope = useRef<HTMLDivElement>(null);
  const rows = [
    {
      label: "BUDGET",
      value: r.cost,
      limit: m.budget,
      unit: "$M",
      ok: r.cost <= m.budget,
      note: "Parts + selected launch service",
    },
    {
      label: "MASS",
      value: r.mass,
      limit: m.massLimit,
      unit: "kg",
      ok: r.mass <= m.massLimit,
      note: `Total for ${m.fleet} spacecraft`,
    },
    {
      label: "POWER",
      value: r.consumption,
      limit: r.generation,
      unit: "W",
      ok: r.consumption <= r.generation && r.generation > 0,
      note: "Average demand / available generation",
    },
    {
      label: "DATA",
      value: r.data,
      limit: r.downlink,
      unit: "GB/day",
      ok: r.data <= r.downlink && r.downlink > 0,
      note: "Data produced / daily downlink capacity",
    },
  ];
  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".game-meter-fill", {
          scaleX: 0.92,
          transformOrigin: "left",
          duration: 0.35,
          ease: "power2.out",
        });
      });
      return () => mm.revert();
    },
    { scope, dependencies: [design, reduced], revertOnUpdate: true },
  );
  return (
    <div className="game-panel resource-panel" ref={scope}>
      <div className="game-panel-heading">
        <h2>RESOURCE MONITOR</h2>
        <span>{m.fleet === 4 ? "FLEET TOTALS" : "LIVE DESIGN"}</span>
      </div>
      <div className="resource-panel-body" aria-live="polite">
        {rows.map((row) => (
          <div
            className={`game-resource ${row.ok ? "" : "resource-alert"}`}
            key={row.label}
          >
            <div>
              <span className="game-label">{row.label}</span>
              <strong>
                {row.value.toFixed(1)} <small>{row.unit}</small>
                <i>/ {row.limit.toFixed(1)}</i>
              </strong>
            </div>
            <div className="game-meter-track">
              <span
                className="game-meter-fill"
                style={{
                  width: `${Math.min(100, row.limit ? (row.value / row.limit) * 100 : 0)}%`,
                }}
              />
            </div>
            <p>
              {row.note} <span>{row.ok ? "✓ WITHIN LIMIT" : "! REVIEW"}</span>
            </p>
          </div>
        ))}
        <div className="resource-extra">
          <span>MASS / EOL POWER MARGIN<strong>{r.massMarginPercent.toFixed(1)}% / {r.powerMarginPercent.toFixed(1)}%</strong></span>
          <span>ONBOARD STORAGE<strong>{r.storage.toFixed(1)} GB / {r.storageNeeded.toFixed(2)} GB between contacts</strong></span>
          <span>REMAINING BUDGET / RISK<strong>${r.budgetRemaining.toFixed(1)}M / {r.risk.toUpperCase()} (heuristic)</strong></span>
          <span>
            USABLE BATTERY RESERVE{" "}
            <strong>
              {r.batteryUsable.toFixed(0)} / {r.batteryNeeded.toFixed(0)} Wh required
            </strong>
          </span>
          <span>
            SCIENCE CAPABILITY{" "}
            <strong>
              {r.science} / {m.scienceTarget} points
            </strong>
          </span>
          <span>
            DESIGN LIFETIME{" "}
            <strong>
              {r.lifetime} / {m.lifetimeTarget} months
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
