"use client";
import { useState } from "react";
import { useCommander } from "@/game/store/commander-store";
import { requestImmersion } from "./device";
export function SettingsPanel({
  onClose,
  onIdentity,
  onReset,
  fullscreen,
  onReplayTutorial,
}: {
  onClose: () => void;
  onIdentity: () => void;
  onReset: () => void;
  fullscreen: boolean;
  onReplayTutorial: () => void;
}) {
  const s = useCommander(),
    p = s.preferences,
    [confirm, setConfirm] = useState(false);
  return (
    <div className="hq-modal-backdrop">
      <section
        className="hq-modal settings-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="hq-panel-heading">
          <span className="eyebrow">PERSONAL FLIGHT PREFERENCES</span>
          <button
            autoFocus
            className="hq-icon-button"
            aria-label="Close settings"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <h2 id="settings-title">
          TUNE YOUR
          <br />
          <em>EXPERIENCE.</em>
        </h2>
        <div className="settings-scroll">
          <h3>GUIDED HELP</h3>
          <button className="hq-outlined" onClick={onReplayTutorial}>Replay Tutorial</button>
          <h3>AUDIO SYSTEMS</h3>
          {(["master", "music", "effects"] as const).map((key) => (
            <label className="hq-range" key={key}>
              <span>
                {key === "master"
                  ? "Master volume"
                  : key === "music"
                    ? "Ambient music"
                    : "Sound effects"}
                <strong>{Math.round(p[key] * 100)}%</strong>
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={p[key] * 100}
                onChange={(e) =>
                  s.update({ [key]: Number(e.target.value) / 100 })
                }
              />
            </label>
          ))}
          {(
            [
              { key: "muted", label: "Mute all audio" },
              { key: "musicEnabled", label: "Background music" },
              { key: "effectsEnabled", label: "Interaction sounds" },
            ] as const
          ).map(({ key, label }) => (
            <label className="hq-switch" key={key}>
              <span>{label}</span>
              <input
                type="checkbox"
                checked={p[key]}
                onChange={(e) => s.update({ [key]: e.target.checked })}
              />
            </label>
          ))}
          <h3>GRAPHICS & CONTROL</h3>
          <label className="hq-select-label">
            Graphics quality
            <select
              value={p.quality}
              onChange={(e) =>
                s.update({ quality: e.target.value as typeof p.quality })
              }
            >
              <option value="auto">Auto · device-aware</option>
              <option value="low">Low · battery-friendly</option>
              <option value="high">High · detailed planets</option>
            </select>
          </label>
          <label className="hq-switch">
            <span>Reduce motion (also respects device preference)</span>
            <input
              type="checkbox"
              checked={p.reducedMotion}
              onChange={(e) => s.update({ reducedMotion: e.target.checked })}
            />
          </label>
          <label className="hq-range">
            <span>
              Camera sensitivity<strong>{p.sensitivity.toFixed(2)}×</strong>
            </span>
            <input
              type="range"
              min="25"
              max="200"
              value={p.sensitivity * 100}
              onChange={(e) =>
                s.update({ sensitivity: Number(e.target.value) / 100 })
              }
            />
          </label>
          <button
            className="hq-outlined"
            onClick={() => {
              if (document.fullscreenElement)
                void document.exitFullscreen().catch(() => {});
              else requestImmersion();
            }}
          >
            {fullscreen ? "EXIT FULLSCREEN" : "ENTER FULLSCREEN"} ↗
          </button>
          <label className="hq-select-label">
            Interface language
            <select value="en" onChange={() => s.update({ language: "en" })}>
              <option value="en">English</option>
            </select>
          </label>
          <p className="hq-fineprint">
            Additional language packs are not installed. Interface text remains
            English.
          </p>
          <h3>COMMANDER PROFILE</h3>
          <button className="hq-outlined" onClick={onIdentity}>
            EDIT IDENTITY / {s.name.toUpperCase()} ↗
          </button>
          <button
            className="hq-text-button danger"
            onClick={() => setConfirm(true)}
          >
            RESET ALL LOCAL GAME DATA
          </button>
          {confirm && (
            <div className="reset-warning" role="alert">
              <strong>DELETE YOUR LOCAL PROFILE AND FLIGHT HISTORY?</strong>
              <p>
                This removes your name, settings, progression, draft and saved
                flights on this browser. This cannot be undone.
              </p>
              <div>
                <button
                  className="hq-outlined"
                  onClick={() => setConfirm(false)}
                >
                  KEEP MY DATA
                </button>
                <button className="hq-outlined danger" onClick={onReset}>
                  CONFIRM RESET
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
