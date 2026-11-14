import Image from "next/image";
import { SectionLabel } from "@/components/ui/section-label";
export function MissionControl() {
  return (
    <section id="about" className="section control-section framed">
      <span className="side-index">05 — MISSION CONTROL</span>
      <div className="control-top reveal">
        <SectionLabel number="05">
          A MISSION IS MORE THAN A SPACECRAFT
        </SectionLabel>
        <h2>
          FROM EARTH
          <br />
          TO THE <em>UNKNOWN.</em>
        </h2>
        <p>
          Real missions connect people, technology and discovery. MissionX
          brings the whole picture into focus.
        </p>
      </div>
      <div className="control-visual">
        <Image
          src="/images/orbital-hero.png"
          alt="Earth's curved horizon beneath an orbiting scientific spacecraft"
          fill
          sizes="(max-width: 700px) 100vw, 85vw"
        />
        <div className="control-visual-overlay" />
        <div className="signal-graphic" aria-hidden="true">
          <div />
          <div />
          <div />
          <span>⌁</span>
        </div>
        <span className="technical control-image-label">
          ONE CONNECTED SYSTEM. ONE SHARED PURPOSE.
        </span>
      </div>
      <div className="segment-timeline">
        {[
          {
            name: "LAUNCH",
            icon: "↗",
            copy: "The rocket and launch services that get your mission off the ground.",
          },
          {
            name: "SPACE",
            icon: "◇",
            copy: "The spacecraft and scientific instruments that explore the unknown.",
          },
          {
            name: "GROUND",
            icon: "⌁",
            copy: "The ground stations and operations that keep your mission connected.",
          },
          {
            name: "USER",
            icon: "◎",
            copy: "The scientists who turn your mission data into new discoveries.",
          },
        ].map((s, i) => (
          <div className="segment reveal" key={s.name}>
            <span className="segment-node">{s.icon}</span>
            <span className="eyebrow">
              0{i + 1} / {s.name}
            </span>
            <p>{s.copy}</p>
          </div>
        ))}
      </div>
      <div className="education-note">
        <span>ⓘ</span>
        <p>
          Inspired by real mission engineering. Simplified for discovery.
          <br />
          <span>
            MissionX uses educational simulations, not flight-ready
            calculations.
          </span>
        </p>
      </div>
    </section>
  );
}
