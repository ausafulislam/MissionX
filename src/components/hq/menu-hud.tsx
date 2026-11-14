"use client";
import Image from "next/image";
import Link from "next/link";
import { getMission } from "@/game/data/catalog";
import { useCommander } from "@/game/store/commander-store";
import { useMissionStore } from "@/game/store/mission-store";
import { commanderRank } from "@/game/engine/progression";
import { STATIONS, type Station } from "./types";
export function MainMenu({
  navigate,
  onSettings,
  onNew,
}: {
  navigate: (s: Station) => void;
  onSettings: () => void;
  onNew: () => void;
}) {
  const p = useCommander(),
    s = useMissionStore();
  return (
    <section className="hq-main-menu">
      <span className="eyebrow">ORBITAL HEADQUARTERS / EARTH SECTOR</span>
      <h1>
        THE NEXT
        <br />
        FRONTIER
        <br />
        <em>IS YOURS.</em>
      </h1>
      <p className="menu-welcome">
        Welcome aboard, Commander <strong>{p.name}</strong>.<br />
        The unknown is waiting for your next decision.
      </p>
      <div className="menu-actions">
        <button
          className="button"
          disabled={!s.chosen}
          onClick={() =>
            navigate(
              s.complete
                ? "results"
                : s.run
                  ? "launch"
                  : s.design.partIds.length
                    ? "engineering"
                    : "planning",
            )
          }
        >
          CONTINUE MISSION <span>↗</span>
        </button>
        <button className="menu-secondary-action" onClick={onNew}>
          START NEW MISSION <span>＋</span>
        </button>
        <div className="menu-action-grid">
          <button onClick={() => navigate("planning")}>◎ MISSION SELECT</button>
          <button
            onClick={() => navigate(s.chosen ? "engineering" : "planning")}
          >
            ◇ MY SPACECRAFT
          </button>
          <button onClick={() => navigate("archive")}>≋ MISSION ARCHIVE</button>
          <button onClick={onSettings}>⚙ SETTINGS</button>
        </div>
        <button className="hq-text-button" onClick={() => navigate("command")}>
          EXPLORE HEADQUARTERS →
        </button>
      </div>
      <div className="commander-stats">
        <div>
          <strong>{p.progress.completed.toString().padStart(2, "0")}</strong>
          <span>MISSIONS COMPLETED</span>
        </div>
        <div>
          <strong>{p.progress.xp}</strong>
          <span>COMMANDER XP</span>
        </div>
        <div>
          <strong>{p.progress.best}</strong>
          <span>PERSONAL BEST</span>
        </div>
      </div>
      <span className="menu-last-flight">
        LAST ASSIGNMENT /{" "}
        {s.chosen
          ? getMission(s.design.missionId).name.toUpperCase()
          : "AWAITING YOUR FIRST MISSION"}
      </span>
      <Link href="/" className="hq-exit-link">
        EXIT TO WEBSITE ↗
      </Link>
    </section>
  );
}
export function HeadquartersHUD({
  station,
  navigate,
  onSettings,
  onSound,
  muted,
}: {
  station: Station;
  navigate: (s: Station) => void;
  onSettings: () => void;
  onSound: () => void;
  muted: boolean;
}) {
  const p = useCommander(),
    s = useMissionStore();
  return (
    <>
      <header className="hq-hud">
        <Link href="/" aria-label="Exit to MissionX website">
          <Image
            src="/images/logo.png"
            alt="MissionX"
            width={1568}
            height={512}
          />
        </Link>
        <div className="hud-commander">
          <span>COMMANDER {p.name.toUpperCase()}</span>
          <small>
            {commanderRank(p.progress.xp)} / {p.progress.xp} XP
          </small>
        </div>
        <div className="hud-mission">
          <span>
            {s.chosen
              ? getMission(s.design.missionId).name.toUpperCase()
              : "HEADQUARTERS ONLINE"}
          </span>
          <small>
            <i /> {station === "menu" ? "COMMAND DECK" : station.toUpperCase()}{" "}
            /{" "}
            {s.complete
              ? "FLIGHT EVALUATED"
              : s.run
                ? "FLIGHT IN PROGRESS"
                : "SYSTEMS STANDBY"}
          </small>
        </div>
        <button
          className="hq-icon-button"
          aria-label={muted ? "Unmute audio" : "Mute audio"}
          onClick={onSound}
        >
          {muted ? "♪̸" : "♪"}
        </button>
        <button
          className="hq-icon-button"
          aria-label="Open settings"
          onClick={onSettings}
        >
          ⚙
        </button>
        <button
          className="hq-icon-button"
          aria-label="Open main menu"
          onClick={() => navigate("menu")}
        >
          ☰
        </button>
      </header>
      {station !== "menu" && (
        <nav className="hq-station-dock" aria-label="Headquarters stations">
          <button
            onClick={() => navigate("command")}
            aria-current={station === "command" ? "location" : undefined}
          >
            <span>⌂</span>
            <small>COMMAND</small>
          </button>
          {STATIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              aria-current={
                station === s.id ||
                (station === "launch" && s.id === "verification")
                  ? "location"
                  : undefined
              }
            >
              <span>{s.icon}</span>
              <small>
                {s.id === "verification"
                  ? "LAUNCH"
                  : s.id === "results"
                    ? "SCIENCE"
                    : s.id.toUpperCase()}
              </small>
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
