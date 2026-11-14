"use client";
import Image from "next/image";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { Motion } from "@/components/landing/motion";
import { MissionDialog } from "@/components/landing/mission-dialog";
import { type MissionId } from "@/components/landing/mission-data";
import { HowItWorks } from "./how-it-works";
import { Engineering } from "./engineering";
import { Missions } from "./missions";
import { MissionControl } from "./mission-control";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionLabel } from "@/components/ui/section-label";

export function LandingPage() {
  const [selected, setSelected] = useState<MissionId | null>(null);
  const start = () => setSelected("moon");
  return (
    <Motion>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="top" />
      <SiteHeader onStart={start} />
      <main id="main-content">
        <section id="explore" className="hero">
          <div className="hero-image">
            <Image
              src="/images/orbital-hero.png"
              alt="Scientific satellite with gold thermal insulation and blue solar arrays orbiting above Earth's horizon"
              fill
              sizes="100vw"
              priority
            />
          </div>
          <div className="hero-shade" />
          <span className="side-index hero-index">01 — THE BEGINNING</span>
          <div className="hero-content">
            <div className="hero-eyebrow eyebrow">
              <span className="outline-tag">MISSION DESIGN SIMULATOR</span>
              <span className="hero-edition">EARTH IS JUST THE BEGINNING</span>
            </div>
            <h1>
              <span className="hero-line">
                <span>HOW FAR</span>
              </span>
              <span className="hero-line">
                <span>WILL YOUR</span>
              </span>
              <span className="hero-line">
                <span>
                  MISSION <em>GO?</em>
                </span>
              </span>
            </h1>
            <p className="hero-description">
              Design your spacecraft. Make critical engineering decisions.
              Simulate an entire space mission and discover what it takes to
              reach beyond Earth.
            </p>
            <div className="hero-actions">
              <button className="button" onClick={start}>
                START YOUR MISSION <span>↗</span>
              </button>
              <a className="text-link" href="#missions">
                EXPLORE THE UNIVERSE <span>↓</span>
              </a>
            </div>
            <div className="hero-credit technical">
              <span className="status-dot" /> INDEPENDENTLY BUILT. INFINITELY
              CURIOUS.
            </div>
          </div>
          <div className="satellite-label">
            <span className="target-cross">+</span>
            <div>
              <span className="technical">SPACECRAFT / MX–01</span>
              <strong>BUILT FOR THE UNKNOWN.</strong>
              <span className="technical">YOUR DESIGN. YOUR DESTINATION.</span>
            </div>
          </div>
          <div className="hero-bottom">
            <div>
              <strong>03</strong>
              <span>MISSIONS TO EXPLORE</span>
            </div>
            <div>
              <strong>05</strong>
              <span>STAGES TO DISCOVERY</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>WAYS TO GET THERE</span>
            </div>
            <a href="#how-it-works" className="scroll-link">
              <span>SCROLL TO EXPLORE</span>
              <span>↓</span>
            </a>
          </div>
        </section>
        <div className="page-content">
          <HowItWorks />
          <Missions onSelect={setSelected} />
          <Engineering />
          <MissionControl />
        </div>
        <section className="final-cta">
          <Image
            className="final-image"
            src="/images/lunar-mission.png"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="final-shade" />
          <div className="final-content reveal">
            <SectionLabel number="06">THE NEXT CHAPTER IS YOURS</SectionLabel>
            <h2>
              YOUR MISSION
              <br />
              <em>STARTS HERE.</em>
            </h2>
            <p>
              The universe is waiting. Make your decisions.
              <br />
              Build your spacecraft. Write your mission story.
            </p>
            <button className="button" onClick={start}>
              BEGIN YOUR MISSION <span>↗</span>
            </button>
            <span className="technical">NO SIGN-UP. JUST CURIOSITY.</span>
          </div>
          <span className="final-coordinate technical">
            NEXT DESTINATION
            <br />
            YOURS TO DECIDE.
          </span>
        </section>
      </main>
      <SiteFooter />
      <MissionDialog
        selected={selected}
        onSelect={setSelected}
        onClose={() => setSelected(null)}
      />
    </Motion>
  );
}
