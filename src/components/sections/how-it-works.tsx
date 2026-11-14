"use client";
import { useState } from "react";
const stages = [
  {
    name: "GOAL",
    title: "EVERY GREAT MISSION\nSTARTS WITH A QUESTION.",
    copy: "Choose your destination. Define the science. Set the requirements that will guide every decision you make.",
    label: "DEFINE YOUR PURPOSE",
    icon: "◎",
  },
  {
    name: "BUILD",
    title: "BIG IDEAS.\nREAL TRADE-OFFS.",
    copy: "Select instruments, solar panels, communications and more. Build a spacecraft that can turn your science goals into reality.",
    label: "ENGINEER YOUR SPACECRAFT",
    icon: "◇",
  },
  {
    name: "VERIFY",
    title: "LEAVE NOTHING\nTO CHANCE.",
    copy: "Check your mass, power, data and budget. Match your spacecraft to the right launch vehicle and orbit before you commit.",
    label: "CHECK EVERY REQUIREMENT",
    icon: "✓",
  },
  {
    name: "LAUNCH",
    title: "ALL SYSTEMS GO.\nTHE UNKNOWN AWAITS.",
    copy: "Follow your mission from liftoff to orbit. Discover how your engineering decisions hold up beyond Earth.",
    label: "PUT YOUR DESIGN TO THE TEST",
    icon: "↗",
  },
  {
    name: "RESULT",
    title: "EVERY OUTCOME\nIS A DISCOVERY.",
    copy: "Success, partial success or failure: understand what happened, learn why, and take that knowledge into your next mission.",
    label: "LEARN. REFINE. EXPLORE AGAIN.",
    icon: "✳",
  },
];
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return (
    <section id="how-it-works" className="section process-section framed">
      <span className="side-index">02 — THE PROCESS</span>
      <div className="section-top">
        <span className="eyebrow">
          <b>02</b> YOUR MISSION, YOUR DECISIONS
        </span>
        <span className="technical">FROM CONCEPT TO COSMOS</span>
      </div>
      <h2 className="reveal">
        WHAT DOES IT TAKE
        <br />
        TO <em>REACH SPACE?</em>
      </h2>
      <div className="stage-tabs" role="tablist" aria-label="Mission stages">
        {stages.map((s, i) => (
          <button
            key={s.name}
            id={`stage-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="stage-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 4
                      : (active + (e.key === "ArrowRight" ? 1 : 4)) % 5;
                setActive(next);
                document.getElementById(`stage-tab-${next}`)?.focus();
              }
            }}
          >
            <span>0{i + 1}</span>
            {s.name}
            <i>↗</i>
          </button>
        ))}
      </div>
      <div
        className="stage-panel"
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active}`}
      >
        <div className="stage-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <span className="orbit-core">{stage.icon}</span>
          <span className="orbit-point" />
          <span className="art-cross cross-one">+</span>
          <span className="art-cross cross-two">+</span>
          <span className="art-caption">
            MISSION DESIGN SEQUENCE / 0{active + 1}
          </span>
        </div>
        <div className="stage-copy" key={active}>
          <span className="eyebrow">
            0{active + 1} / {stage.label}
          </span>
          <h3>
            {stage.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h3>
          <p>{stage.copy}</p>
          <span className="technical">
            GOAL → BUILD → VERIFY → LAUNCH → RESULT
          </span>
        </div>
      </div>
    </section>
  );
}
