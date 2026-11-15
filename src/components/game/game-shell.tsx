"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/layout/site-header";
import { useMissionStore } from "@/game/store/mission-store";
import { useAudioSystems } from "@/components/hq/use-hq-systems";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useGameFeedback } from "@/hooks/use-game-feedback";
import { useCommander } from "@/game/store/commander-store";
import { missionAudio } from "@/game/audio/audio-manager";
import { getMission } from "@/game/data/catalog";
gsap.registerPlugin(useGSAP);
const steps = ["goal", "build", "verify", "launch", "result", "debrief"];
export function GameShell({ children }: { children: ReactNode }) {
  const state = useMissionStore(),
    path = usePathname(),
    router = useRouter(),
    scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const step = path.split("/").pop() ?? "goal",
    index = steps.indexOf(step),
    m = getMission(state.design.missionId);
  let redirect = "";
  if (state.hydrated) {
    if (step === "play")
      redirect = state.complete
        ? "/play/result"
        : state.run
          ? "/play/launch"
          : state.chosen
            ? "/play/build"
            : "/play/goal";
    else if (!["goal", "debrief"].includes(step) && !state.chosen)
      redirect = "/play/goal";
    else if (step === "result" && !state.run) redirect = "/play/build";
    else if (step === "launch" && !state.run) redirect = "/play/verify";
    else if (step === "result" && !state.complete) redirect = "/play/launch";
  }
  const hydrate = state.hydrate;
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  useEffect(() => {
    if (redirect) router.replace(redirect);
  }, [redirect, router]);
  useGSAP(
    () => {
      const screens = Array.from(
        scope.current?.querySelectorAll<HTMLElement>(".game-screen") ?? [],
      ).filter((el) => el.getClientRects().length > 0);
      if (!screens.length || reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(screens, {
          opacity: 0,
          y: 16,
          duration: 0.55,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    {
      scope,
      dependencies: [path, state.hydrated, redirect, reduced],
      revertOnUpdate: true,
    },
  );
  useAudioSystems();
  const feedback = useGameFeedback(step);
  const commander = useCommander();
  const hydrateCommander = commander.hydrate;
  useEffect(() => {
    hydrateCommander();
  }, [hydrateCommander]);
  const allowed = (target: string) =>
    target === "goal" ||
    target === "debrief" ||
    (state.chosen && ["build", "verify"].includes(target)) ||
    (!!state.run && target === "launch") ||
    (state.complete && target === "result");
  return (
    <div
      className={`game-app ${reduced ? "game-reduced" : ""}`}
      ref={scope}
      onPointerOver={(e) => {
        if ((e.target as HTMLElement).closest("button:not(:disabled),a"))
          missionAudio.play("hover");
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button:not(:disabled),a"))
          missionAudio.play("click");
      }}
    >
      <a className="skip-link" href="#game-main">
        Skip to mission workspace
      </a>
      <header className="game-header">
        <Link href="/" aria-label="MissionX homepage">
          <Logo />
        </Link>
        <div className="game-flight-id">
          <span className="technical">
            FLIGHT DECK /{" "}
            {state.chosen ? m.name.toUpperCase() : "MISSION PLANNING"}
          </span>
          <span className="game-save">
            ● {state.storageWarning ? "SESSION ONLY" : "LOCAL AUTO-SAVE"}
          </span>
        </div>
        <button
          className="game-audio-toggle"
          aria-label={
            commander.preferences.muted ? "Unmute audio" : "Mute audio"
          }
          onClick={() => {
            void missionAudio.unlock();
            commander.update({ muted: !commander.preferences.muted });
          }}
        >
          {commander.preferences.muted ? "♪ OFF" : "♪ ON"}
        </button>
        <label className="game-volume">
          VOLUME
          <input
            aria-label="Master volume"
            type="range"
            min="0"
            max="100"
            value={commander.preferences.master * 100}
            onChange={(e) =>
              commander.update({ master: Number(e.target.value) / 100 })
            }
          />
        </label>
        <Link href="/" className="game-exit">
          EXIT TO EARTH ↗
        </Link>
      </header>
      <nav className="game-progress" aria-label="Mission progress">
        {steps.map((s, i) =>
          allowed(s) ? (
            <Link
              key={s}
              href={`/play/${s}`}
              aria-current={step === s ? "step" : undefined}
              className={step === s ? "active" : i < index ? "visited" : ""}
            >
              <span>0{i + 1}</span>
              {s === "goal"
                ? "GOAL"
                : s === "result"
                  ? "RESULT"
                  : s.toUpperCase()}
              <i>{i < index ? "✓" : "↗"}</i>
            </Link>
          ) : (
            <span className="locked" key={s} aria-disabled="true">
              <span>0{i + 1}</span>
              {s.toUpperCase()}
              <i>−</i>
            </span>
          ),
        )}
      </nav>
      {state.storageWarning && (
        <div className="game-storage-warning" role="status">
          {state.storageWarning}
        </div>
      )}
      <main id="game-main" className="game-main">
        {!state.hydrated || redirect ? (
          <div className="game-loading">
            <span className="eyebrow">MISSION CONTROL</span>
            <h1>
              PREPARING
              <br />
              <em>YOUR WORKSPACE.</em>
            </h1>
          </div>
        ) : (
          children
        )}
      </main>
      {feedback && (
        <div className="game-feedback" role="status">
          ✳ {feedback}
        </div>
      )}
      <footer className="game-footer">
        <span>TEAM NASA WARRIORS · SPACE APPS 2026</span>
        <span>SIMPLIFIED EDUCATIONAL ESTIMATES · NOT FLIGHT-READY</span>
        <span>Not affiliated with or endorsed by NASA.</span>
      </footer>
    </div>
  );
}
export function ScreenHeading({
  number,
  eyebrow,
  title,
  accent,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <div className="game-heading">
      <div>
        <span className="eyebrow">
          <b>{number}</b> {eyebrow}
        </span>
        <h1>
          {title}
          <br />
          <em>{accent}</em>
        </h1>
      </div>
      <p>{description}</p>
    </div>
  );
}
