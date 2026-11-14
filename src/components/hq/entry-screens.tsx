"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { validCommanderName } from "@/game/store/commander-store";
export function EntryFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="hq-entry">
      <div className="entry-starfield" />
      <Image
        className="entry-logo"
        src="/images/logo.png"
        alt="MissionX"
        width={1568}
        height={512}
        priority
      />
      {children}
      <span className="entry-disclaimer">
        INDEPENDENT EDUCATIONAL SIMULATION · NOT AFFILIATED WITH OR ENDORSED BY
        NASA.
      </span>
    </div>
  );
}
export function OrientationScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <EntryFrame>
      <div className="orientation-phone" aria-hidden="true">
        <div>
          <span>↻</span>
          <i />
        </div>
      </div>
      <span className="eyebrow">PREPARE YOUR VIEWPORT</span>
      <h1>
        ROTATE YOUR
        <br />
        <em>DEVICE.</em>
      </h1>
      <p>
        MissionX is designed for an immersive landscape experience.
        <br />
        Portrait play is supported if rotating is not an option.
      </p>
      <button className="button" onClick={onContinue}>
        CONTINUE TO MISSIONX <span>↗</span>
      </button>
      <a href="/play" className="hq-text-button">
        USE THE ACCESSIBLE FLIGHT DECK
      </a>
    </EntryFrame>
  );
}
export function LoadingScreen({
  completed,
  total,
  failed,
  onFallback,
}: {
  completed: number;
  total: number;
  failed: boolean;
  onFallback: () => void;
}) {
  const percent = Math.round((completed / total) * 100),
    messages = [
      "CALIBRATING FLIGHT SYSTEMS",
      "CONNECTING COMMANDER PROFILE",
      "LOADING HEADQUARTERS MODULE",
      "DECODING LOCAL MISSION ASSETS",
      "INITIALIZING 3D RENDERER",
      "HEADQUARTERS READY",
    ];
  return (
    <EntryFrame>
      <div className="loading-orbital" aria-hidden="true">
        <div />
        <div />
        <div />
        <span>✳</span>
      </div>
      <span className="eyebrow">MISSIONX / SYSTEM INITIALIZATION</span>
      <h1>
        {failed ? "ALTERNATE" : "ESTABLISHING"}
        <br />
        <em>{failed ? "FLIGHT PATH." : "CONNECTION."}</em>
      </h1>
      <div
        className="loading-track"
        role="progressbar"
        aria-label="Initialization tasks"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="loading-meta">
        <span>
          {failed
            ? "3D UNAVAILABLE · ACCESSIBLE MODE READY"
            : messages[Math.min(completed, messages.length - 1)]}
        </span>
        <strong>
          {completed}/{total}
        </strong>
      </div>
      <p>Progress reflects completed local assets and system checks.</p>
      {failed && (
        <button className="button" onClick={onFallback}>
          CONTINUE WITHOUT 3D ↗
        </button>
      )}
      <button className="hq-text-button" onClick={onFallback}>
        ENTER LOW-RESOURCE MODE
      </button>
    </EntryFrame>
  );
}
export function IdentityScreen({
  name,
  onEnter,
  onBack,
}: {
  name: string;
  onEnter: (name: string) => void;
  onBack?: () => void;
}) {
  const [value, setValue] = useState(name),
    [editing, setEditing] = useState(!name),
    [error, setError] = useState(""),
    scope = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () =>
        gsap.from(".identity-card", {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: "power3.out",
        }),
      );
      return () => mm.revert();
    },
    { scope },
  );
  return (
    <div className="identity-overlay" ref={scope}>
      <form
        className="identity-card"
        onSubmit={(e) => {
          e.preventDefault();
          if (!validCommanderName(value)) {
            setError(
              "Choose a name between 2 and 24 characters. Do not include angle brackets or control characters.",
            );
            return;
          }
          onEnter(value.trim());
        }}
      >
        <span className="eyebrow">PERSONNEL IDENTIFICATION / LOCAL ONLY</span>
        <div className="commander-insignia">✳</div>
        <h1>
          {name && !editing ? "WELCOME BACK," : "WELCOME,"}
          <br />
          <em>{name && !editing ? `${name}.` : "COMMANDER."}</em>
        </h1>
        <p>
          Every great mission starts with a commander.
          <br />
          What should we call you?
        </p>
        {editing ? (
          <label className="commander-name-label">
            ENTER YOUR NAME
            <input
              autoFocus
              autoComplete="nickname"
              name="commander"
              value={value}
              maxLength={24}
              aria-invalid={!!error}
              aria-describedby={error ? "identity-error" : "identity-privacy"}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
            />
          </label>
        ) : (
          <button
            type="button"
            className="hq-text-button"
            onClick={() => setEditing(true)}
          >
            EDIT COMMANDER IDENTITY ↗
          </button>
        )}
        {error && (
          <p id="identity-error" role="alert" className="hq-error">
            {error}
          </p>
        )}
        <button type="submit" className="button">
          ENTER HEADQUARTERS <span>↗</span>
        </button>
        <span id="identity-privacy" className="technical">
          A DISPLAY NAME, NOT A REGISTRATION.
          <br />
          STORED ONLY ON THIS BROWSER.
        </span>
        {onBack && (
          <button type="button" className="hq-text-button" onClick={onBack}>
            CANCEL
          </button>
        )}
      </form>
    </div>
  );
}
