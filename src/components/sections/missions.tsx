"use client";
import Image from "next/image";
import { missions, type MissionId } from "@/components/landing/mission-data";
import { SectionLabel } from "@/components/ui/section-label";
export function Missions({ onSelect }: { onSelect: (id: MissionId) => void }) {
  return (
    <section id="missions" className="section missions-section">
      <span className="side-index">03 — PICK YOUR FRONTIER</span>
      <div className="section-heading-row">
        <div className="reveal">
          <SectionLabel number="03">THE MISSIONS</SectionLabel>
          <h2>
            THREE MISSIONS.
            <br />
            <em>INFINITE POSSIBILITIES.</em>
          </h2>
        </div>
        <p className="section-lead reveal">
          Different worlds. Different challenges.
          <br />
          One mission designer. You.
        </p>
      </div>
      <div className="mission-composition">
        {missions.map((m, i) => (
          <article className={`mission-card mission-${m.id} reveal`} key={m.id}>
            <div className="mission-visual">
              {i === 0 ? (
                <Image
                  src="/images/lunar-mission.png"
                  alt="Cratered Moon seen from orbit with a small mapping satellite"
                  fill
                  sizes="(max-width: 700px) 100vw, 60vw"
                />
              ) : (
                <div
                  className={`planet-scene ${m.id}-scene`}
                  role="img"
                  aria-label={
                    i === 1
                      ? "Fiery Sun with solar corona in deep space"
                      : "Rust-colored Mars with a shadowed planetary horizon"
                  }
                >
                  <div className="planet" />
                  <div className="planet-orbit" />
                </div>
              )}
              <span className="mission-corner technical">MX / 0{i + 1}</span>
              <span className="destination technical">
                DESTINATION: {m.destination}
              </span>
              <span className="visual-plus">+</span>
            </div>
            <div className="mission-info">
              <div className="mission-meta">
                <span className="eyebrow">{m.category}</span>
                <span className="difficulty">
                  <span>
                    {"▰".repeat(i + 1)}
                    <i>{"▱".repeat(2 - i)}</i>
                  </span>{" "}
                  {m.difficulty}
                </span>
              </div>
              <h3>{m.name}</h3>
              <p>{m.description}</p>
              <div className="mission-objective">
                <span className="technical">MISSION OBJECTIVES</span>
                <p>{m.objective}</p>
              </div>
              <button className="mission-link" onClick={() => onSelect(m.id)}>
                EXPLORE MISSION <span>↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
