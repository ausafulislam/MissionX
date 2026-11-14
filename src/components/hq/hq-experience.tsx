"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCommander } from "@/game/store/commander-store";
import { useMissionStore } from "@/game/store/mission-store";
import { missionAudio, type Sound } from "@/game/audio/audio-manager";
import { verify } from "@/game/engine/validation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { MissionId } from "@/game/types";
import {
  landscapeAfterGesture,
  requestImmersion,
  supportsWebGL,
} from "./device";
import {
  IdentityScreen,
  LoadingScreen,
  OrientationScreen,
} from "./entry-screens";
import { useAudioSystems, useDevice } from "./use-hq-systems";
import { FocusGuard } from "./focus-guard";
import { WorldBoundary } from "./world-boundary";
import { STATIONS, type Station } from "./types";
import { HeadquartersHUD, MainMenu } from "./menu-hud";
import { PlanningPanel } from "./planning-panel";
import { EngineeringPanel, ResourceStrip } from "./engineering-panel";
import { VerificationPanel } from "./verification-panel";
import { ResultsPanel, ArchivePanel } from "./results-panel";
import { LaunchOverlay } from "./launch-overlay";
import { SettingsPanel } from "./settings-panel";
const importWorld = () => import("./world/world");
const World = dynamic(importWorld, { ssr: false, loading: () => null });
export function HQExperience() {
  const game = useMissionStore(),
    commander = useCommander(),
    { device, fullscreen } = useDevice(),
    osReduced = useReducedMotion(),
    scope = useRef<HTMLDivElement>(null);
  const [accepted, setAccepted] = useState(false),
    [active, setActive] = useState(false),
    [moduleReady, setModuleReady] = useState(false),
    [failed, setFailed] = useState(false),
    [tasks, setTasks] = useState<string[]>([]),
    [station, setStation] = useState<Station>("menu"),
    [settings, setSettings] = useState(false),
    [identity, setIdentity] = useState(false),
    [notice, setNotice] = useState(""),
    [inspect, setInspect] = useState<string | null>(null),
    [view, setView] = useState(0),
    [collapsed, setCollapsed] = useState(false),
    [newMission, setNewMission] = useState(false),
    [pendingMission, setPendingMission] = useState<MissionId | null>(null),
    [time, setTime] = useState(0),
    [playing, setPlaying] = useState(false),
    [speed, setSpeed] = useState(1);
  const reduced = osReduced || commander.preferences.reducedMotion,
    orientation =
      !!device &&
      device.kind !== "desktop" &&
      device.portrait &&
      !accepted &&
      !active,
    low =
      commander.preferences.quality === "low" ||
      (commander.preferences.quality === "auto" &&
        !!device &&
        (device.kind !== "desktop" || device.compact)),
    eventRef = useRef(""),
    noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useAudioSystems();
  const canInitialize = !!device && !orientation;
  const mark = useCallback(
    (task: string) =>
      setTasks((old) => (old.includes(task) ? old : [...old, task])),
    [],
  );
  const notify = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 5000);
  }, []);
  const onFailure = useCallback(() => {
    setFailed(true);
    mark("renderer");
  }, [mark]);
  const onReady = useCallback(() => mark("renderer"), [mark]);
  useEffect(() => {
    if (!canInitialize) return;
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      useCommander.getState().hydrate();
      useMissionStore.getState().hydrate();
      mark("profile");
      verify(useMissionStore.getState().design);
      mark("engine");
      if (!supportsWebGL()) {
        setFailed(true);
        mark("renderer");
      }
    });
    void importWorld()
      .then(() => {
        if (!cancelled) {
          setModuleReady(true);
          mark("module");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          mark("module");
          mark("renderer");
        }
      });
    const logo = new Image();
    logo.src = "/images/logo.png";
    void logo
      .decode()
      .catch(() => {})
      .then(() => {
        if (!cancelled) mark("assets");
      });
    return () => {
      cancelled = true;
    };
  }, [canInitialize, mark]);
  const navigate = useCallback(
    (target: Station) => {
      let next = target;
      const s = useMissionStore.getState();
      if (["engineering", "verification"].includes(next) && !s.chosen) {
        next = "planning";
        notify("Choose your mission before engineering a spacecraft.");
      }
      if (next === "launch" && !s.run) {
        next = "verification";
        notify("Verify your spacecraft and initiate a flight first.");
      }
      setStation(next);
      setCollapsed(false);
      setView((v) => v + 1);
      window.history.pushState({ station: next }, "", `#${next}`);
      missionAudio.play("transition");
      missionAudio.scene(next);
      if (next !== "launch") setPlaying(false);
    },
    [notify],
  );
  useEffect(() => {
    if (!active) return;
    const back = () => {
      const value = location.hash.slice(1) as Station;
      if (
        ["menu", "command", ...STATIONS.map((s) => s.id), "launch"].includes(
          value,
        )
      ) {
        const valid =
          value === "launch" && !useMissionStore.getState().run
            ? "verification"
            : value;
        setStation(valid);
        setPlaying(false);
        setCollapsed(false);
      }
    };
    window.addEventListener("popstate", back);
    window.addEventListener("hashchange", back);
    return () => {
      window.removeEventListener("popstate", back);
      window.removeEventListener("hashchange", back);
    };
  }, [active]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (settings) setSettings(false);
      else if (identity) setIdentity(false);
      else if (active) navigate("command");
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [settings, identity, active, navigate]);
  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );
  const record = commander.record;
  useEffect(() => {
    record(game.history);
  }, [game.history, record]);
  const run = game.run,
    done = !!run && time >= run.result.duration;
  useEffect(() => {
    if (!playing || !run || done || station !== "launch") return;
    const timer = setInterval(
      () => setTime((t) => Math.min(run.result.duration, t + 0.1 * speed)),
      100,
    );
    return () => clearInterval(timer);
  }, [playing, run, done, speed, station]);
  const finish = game.finish;
  useEffect(() => {
    if (done && !game.complete) finish();
  }, [done, game.complete, finish]);
  useEffect(() => {
    if (!run || station !== "launch") return;
    const e = run.result.events.filter((e) => e.at <= time).at(-1);
    if (!e) return;
    const id = `${run.id}:${e.at}`;
    if (eventRef.current === id) return;
    eventRef.current = id;
    const sound: Partial<Record<typeof e.kind, Sound>> = {
      countdown: "notification",
      liftoff: "liftoff",
      separation: "separation",
      deployment: "deployment",
      storm: "error",
      outage: "error",
      fault: "error",
      failure: "failure",
      complete: run.result.outcome === "failed" ? "failure" : "success",
    };
    if (sound[e.kind]) missionAudio.play(sound[e.kind]!);
  }, [time, run, station]);
  useGSAP(
    () => {
      if (reduced) return;
      const targets = scope.current?.querySelectorAll(
        ".hq-side-panel-content,.hq-main-menu,.launch-cinematic-title",
      );
      if (targets?.length)
        gsap.from(targets, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power3.out",
        });
    },
    {
      scope,
      dependencies: [station, active, reduced, collapsed],
      revertOnUpdate: true,
    },
  );
  const choose = (id: MissionId) => {
    if (game.design.missionId !== id && game.design.partIds.length) {
      setPendingMission(id);
      missionAudio.play("open");
      return;
    }
    game.choose(id);
    missionAudio.play("click");
  };
  const launch = (seed: number) => {
    if (!game.launch(seed)) {
      notify("Launch blocked. Resolve every preflight requirement.");
      missionAudio.play("error");
      return;
    }
    setTime(0);
    setSpeed(1);
    setPlaying(false);
    eventRef.current = "";
    navigate("launch");
    missionAudio.play("verify");
  };
  const ready = tasks.length >= 5,
    showIdentity = !active && ready && !orientation,
    showLoading = !active && !showIdentity && !orientation;
  const enter = (name: string) => {
    if (!commander.identify(name)) return;
    void missionAudio.unlock();
    requestImmersion();
    setActive(true);
    setIdentity(false);
    setStation("menu");
    missionAudio.play("open");
    const requested = new URLSearchParams(location.search).get("mission");
    if (
      (requested === "moon" || requested === "sun" || requested === "mars") &&
      !game.chosen
    )
      game.choose(requested);
  };
  const fallbackContinue = () => {
    setFailed(true);
    mark("renderer");
  };
  const resetAll = () => {
    useMissionStore.setState({
      ...useMissionStore.getInitialState(),
      hydrated: true,
    });
    commander.reset();
    setSettings(false);
    setActive(false);
    setStation("menu");
    setTime(0);
    setPlaying(false);
    missionAudio.play("close");
  };
  return (
    <div
      className={`hq-experience ${device?.portrait ? "portrait" : ""} ${reduced ? "hq-reduced" : ""} ${collapsed ? "panel-collapsed" : ""}`}
      ref={scope}
      onPointerOver={(e) => {
        if ((e.target as HTMLElement).closest("button"))
          missionAudio.play("hover");
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button"))
          missionAudio.play("click");
      }}
    >
      <FocusGuard
        active={
          showIdentity || identity || settings || newMission || !!pendingMission
        }
      />
      <a className="skip-link" href="#hq-controls">
        Skip to headquarters controls
      </a>
      {moduleReady && !failed && (
        <WorldBoundary onFailure={onFailure}>
          <World
            station={station}
            design={game.design}
            run={run}
            time={time}
            low={low}
            reduced={reduced}
            sensitivity={commander.preferences.sensitivity}
            view={view}
            onStation={navigate}
            onMission={choose}
            inspect={(id) => {
              setInspect(id);
              notify(
                "Component selected. Inspection data is open in the engineering panel.",
              );
            }}
            onReady={onReady}
            onFailure={onFailure}
          />
        </WorldBoundary>
      )}
      {failed && (
        <div
          className="hq-static-world"
          role="img"
          aria-label="Orbital mission headquarters above Earth"
        >
          <div className="fallback-globe" />
          <span>COMPATIBILITY MODE / ALL STATIONS AVAILABLE</span>
        </div>
      )}
      {orientation && (
        <OrientationScreen
          onContinue={() => {
            void landscapeAfterGesture();
            void missionAudio.unlock();
            setAccepted(true);
          }}
        />
      )}
      {showLoading && (
        <LoadingScreen
          completed={tasks.length}
          total={5}
          failed={failed}
          onFallback={fallbackContinue}
        />
      )}
      {showIdentity && <IdentityScreen name={commander.name} onEnter={enter} />}
      {active && (
        <>
          <HeadquartersHUD
            station={station}
            navigate={navigate}
            onSettings={() => {
              setSettings(true);
              missionAudio.play("open");
            }}
            muted={commander.preferences.muted}
            onSound={() => {
              void missionAudio.unlock();
              commander.update({ muted: !commander.preferences.muted });
            }}
          />
          <div id="hq-controls" className="hq-interaction-layer">
            {station === "menu" ? (
              <MainMenu
                navigate={navigate}
                onSettings={() => setSettings(true)}
                onNew={() => {
                  if (game.chosen && game.design.partIds.length)
                    setNewMission(true);
                  else navigate("planning");
                }}
              />
            ) : station === "command" ? (
              <div className="hq-command-caption">
                <span className="eyebrow">MISSION CONTROL HEADQUARTERS</span>
                <h1>
                  WELCOME TO
                  <br />
                  <em>THE POSSIBLE.</em>
                </h1>
                <p>
                  Select a station in the world or the station dock.
                  <br />
                  Drag to explore. Pinch or scroll to move closer.
                </p>
                <button
                  className="hq-outlined"
                  onClick={() => setView((v) => v + 1)}
                >
                  RESET CAMERA ↺
                </button>
              </div>
            ) : station === "launch" && run ? (
              <LaunchOverlay
                run={run}
                time={time}
                playing={playing}
                speed={speed}
                onPlay={() => {
                  void missionAudio.unlock();
                  setPlaying((p) => !p);
                }}
                onSpeed={setSpeed}
                onSkip={() => {
                  setTime(run.result.duration);
                  setPlaying(false);
                }}
                onResults={() => navigate("results")}
              />
            ) : (
              <aside className="hq-side-panel">
                <button
                  className="hq-panel-toggle"
                  onClick={() => setCollapsed((v) => !v)}
                  aria-expanded={!collapsed}
                >
                  {collapsed ? "OPEN STATION PANEL +" : "MINIMIZE CONTROLS −"}
                </button>
                {!collapsed && (
                  <div className="hq-side-panel-content">
                    {station === "planning" ? (
                      <PlanningPanel
                        onChoose={choose}
                        onBuild={() => {
                          game.choose(game.design.missionId);
                          navigate("engineering");
                        }}
                      />
                    ) : station === "engineering" ? (
                      <EngineeringPanel
                        inspect={inspect}
                        onInspect={setInspect}
                        notify={notify}
                        onVerify={() => navigate("verification")}
                      />
                    ) : station === "verification" ? (
                      <VerificationPanel onLaunch={launch} />
                    ) : station === "results" ? (
                      <ResultsPanel
                        onRedesign={() => {
                          game.redesign();
                          navigate("engineering");
                        }}
                      />
                    ) : (
                      <ArchivePanel
                        restore={(saved) => {
                          game.restore(saved);
                          navigate("engineering");
                        }}
                      />
                    )}
                  </div>
                )}
              </aside>
            )}
          </div>
          {["engineering", "verification"].includes(station) && (
            <ResourceStrip />
          )}
          {station !== "menu" && (
            <div className="hq-world-tools">
              <button
                className="hq-outlined"
                onClick={() => setView((v) => v + 1)}
              >
                RESET VIEW ↺
              </button>
              <Link className="hq-text-button" href="/play">
                ACCESSIBLE FLIGHT DECK ↗
              </Link>
            </div>
          )}
          {(commander.warning || game.storageWarning) && (
            <span className="hq-storage-warning" role="status">
              SESSION-ONLY SAVE · STORAGE UNAVAILABLE
            </span>
          )}
          {settings && (
            <SettingsPanel
              fullscreen={fullscreen}
              onClose={() => {
                setSettings(false);
                missionAudio.play("close");
              }}
              onIdentity={() => {
                setSettings(false);
                setIdentity(true);
              }}
              onReset={resetAll}
            />
          )}
          {identity && (
            <IdentityScreen
              name={commander.name}
              onEnter={(name) => {
                if (commander.identify(name)) {
                  setIdentity(false);
                  missionAudio.play("verify");
                }
              }}
              onBack={() => setIdentity(false)}
            />
          )}
          {(newMission || pendingMission) && (
            <div className="hq-modal-backdrop">
              <section
                className="hq-modal confirm-modal"
                role="alertdialog"
                aria-labelledby="confirm-mission"
              >
                <span className="eyebrow">NEW MISSION ASSIGNMENT</span>
                <h2 id="confirm-mission">
                  CHANGE
                  <br />
                  <em>TRAJECTORY?</em>
                </h2>
                <p>
                  This replaces your active spacecraft design. Completed flights
                  and commander achievements are kept.
                </p>
                <button
                  autoFocus
                  className="hq-outlined"
                  onClick={() => {
                    setNewMission(false);
                    setPendingMission(null);
                  }}
                >
                  KEEP CURRENT MISSION
                </button>
                <button
                  className="button"
                  onClick={() => {
                    if (pendingMission) game.choose(pendingMission);
                    else game.reset();
                    setPendingMission(null);
                    setNewMission(false);
                    navigate("planning");
                  }}
                >
                  CONFIRM NEW MISSION ↗
                </button>
              </section>
            </div>
          )}
          {notice && (
            <div className="hq-notification" role="status">
              <span>✳</span>
              {notice}
            </div>
          )}
        </>
      )}
      {!active && failed && showIdentity && (
        <Link className="entry-accessible" href="/play">
          OPEN ACCESSIBLE FLIGHT DECK ↗
        </Link>
      )}
      <span className="hq-build-label">
        MISSIONX / ORIGINAL EDUCATIONAL SIMULATION · NO NASA AFFILIATION
      </span>
    </div>
  );
}
