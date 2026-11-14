"use client";
import { useState } from "react";
const resources = [
  {
    label: "MASS",
    unit: "KG",
    base: 210,
    extra: 48,
    max: 400,
    note: "More capability. More to carry.",
  },
  {
    label: "POWER",
    unit: "W",
    base: 340,
    extra: 110,
    max: 600,
    note: "Every instrument needs energy.",
  },
  {
    label: "DATA",
    unit: "GB/DAY",
    base: 12,
    extra: 14,
    max: 40,
    note: "Discovery is only useful if it gets home.",
  },
  {
    label: "BUDGET",
    unit: "$M",
    base: 32,
    extra: 14,
    max: 60,
    note: "Ambition meets a finite budget.",
  },
];
export function Engineering() {
  const [instrument, setInstrument] = useState(false);
  return (
    <section id="engineering" className="section engineering-section">
      <span className="side-index">04 — THE TRADE-OFF</span>
      <div className="engineering-intro reveal">
        <span className="eyebrow">
          <b>04</b> THE ENGINEERING CHALLENGE
        </span>
        <h2>
          EVERY DECISION
          <br />
          CHANGES
          <br />
          <em>EVERYTHING.</em>
        </h2>
        <p>
          A better camera captures more detail. It also adds mass, draws power,
          produces data, and costs more. In space, nothing is an isolated
          decision.
        </p>
        <button
          className={`instrument-toggle ${instrument ? "is-on" : ""}`}
          aria-pressed={instrument}
          onClick={() => setInstrument(!instrument)}
        >
          <span className="toggle-icon">{instrument ? "−" : "+"}</span>
          <span>
            {instrument ? "REMOVE" : "ADD"} HIGH-RES CAMERA
            <small>SEE THE TRADE-OFF IN REAL TIME</small>
          </span>
          <span>↗</span>
        </button>
      </div>
      <div className="resource-console reveal">
        <div className="console-header">
          <span className="eyebrow">SPACECRAFT RESOURCE MONITOR</span>
          <span className="live-label">● LIVE PREVIEW</span>
        </div>
        <div className="console-design">
          <span>✳</span>
          <div>
            <span className="technical">CURRENT CONFIGURATION</span>
            <h3>
              {instrument ? "BUS + HIGH-RES CAMERA" : "BASE SPACECRAFT BUS"}
            </h3>
          </div>
          <span className="technical">MX–01</span>
        </div>
        <div className="resources" aria-live="polite">
          {resources.map((r) => (
            <div className="resource" key={r.label}>
              <div className="resource-label">
                <span>{r.label}</span>
                <strong>
                  {r.base + (instrument ? r.extra : 0)} <small>{r.unit}</small>
                  <i>/ {r.max}</i>
                </strong>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{
                    width: `${((r.base + (instrument ? r.extra : 0)) / r.max) * 100}%`,
                  }}
                />
              </div>
              <p>{r.note}</p>
            </div>
          ))}
        </div>
        <p className="console-footnote">
          ILLUSTRATIVE VALUES · SIMPLIFIED EDUCATIONAL APPROXIMATIONS
        </p>
      </div>
    </section>
  );
}
