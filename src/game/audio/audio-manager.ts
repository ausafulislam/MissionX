"use client";
import type { Preferences } from "../store/commander-store";
export type Sound =
  | "click"
  | "hover"
  | "transition"
  | "open"
  | "close"
  | "install"
  | "remove"
  | "error"
  | "verify"
  | "liftoff"
  | "separation"
  | "deployment"
  | "success"
  | "failure"
  | "notification";
class MissionAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private effects: GainNode | null = null;
  private voices: OscillatorNode[] = [];
  private config: Preferences | null = null;
  private lastHover = 0;
  private unlocked = false;
  async unlock() {
    try {
      if (!this.context) {
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.music = this.context.createGain();
        this.effects = this.context.createGain();
        this.music.connect(this.master);
        this.effects.connect(this.master);
        this.master.connect(this.context.destination);
        this.master.gain.value = 0;
        this.music.gain.value = 0;
        this.effects.gain.value = 0;
        this.startAmbient();
      }
      await this.context.resume();
      this.unlocked = true;
      if (this.config) this.configure(this.config);
    } catch {
      /* Silent play remains available when audio is blocked. */
    }
  }
  configure(p: Preferences) {
    this.config = p;
    const ctx = this.context;
    if (!ctx || !this.master || !this.music || !this.effects) return;
    this.master.gain.setTargetAtTime(
      p.muted || !this.unlocked ? 0 : p.master,
      ctx.currentTime,
      0.15,
    );
    this.music.gain.setTargetAtTime(
      p.musicEnabled ? p.music * 0.15 : 0,
      ctx.currentTime,
      0.4,
    );
    this.effects.gain.setTargetAtTime(
      p.effectsEnabled ? p.effects * 0.28 : 0,
      ctx.currentTime,
      0.05,
    );
  }
  private startAmbient() {
    const ctx = this.context;
    if (!ctx || !this.music) return;
    [55, 82.4069, 110, 164.8138].forEach((frequency, i) => {
      const osc = ctx.createOscillator(),
        gain = ctx.createGain(),
        filter = ctx.createBiquadFilter();
      osc.type = i % 2 ? "sine" : "triangle";
      osc.frequency.value = frequency;
      osc.detune.value = i % 2 ? 4 : -4;
      gain.gain.value = i === 0 ? 0.32 : 0.12;
      filter.type = "lowpass";
      filter.frequency.value = 340;
      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.music!);
      osc.start();
      this.voices.push(osc);
    });
  }
  scene(location: string) {
    const ctx = this.context;
    if (!ctx) return;
    const shift =
      location === "launch"
        ? -0.9
        : location === "engineering"
          ? 0.6
          : location === "results"
            ? 1.3
            : 0;
    this.voices.forEach((v, i) =>
      v.detune.setTargetAtTime(
        (i % 2 ? 4 : -4) + shift * 10,
        ctx.currentTime,
        2,
      ),
    );
  }
  play(sound: Sound) {
    const ctx = this.context;
    if (
      !ctx ||
      !this.effects ||
      !this.unlocked ||
      this.config?.muted ||
      !this.config?.effectsEnabled
    )
      return;
    if (sound === "hover") {
      if (performance.now() - this.lastHover < 120) return;
      this.lastHover = performance.now();
    }
    const frequencies: Record<Sound, number[]> = {
      click: [440, 660],
      hover: [540],
      transition: [180, 360, 540],
      open: [220, 440, 660],
      close: [440, 220],
      install: [440, 554, 880],
      remove: [660, 330],
      error: [140, 110],
      verify: [523, 659, 784],
      liftoff: [55, 70, 90],
      separation: [220, 110, 440],
      deployment: [392, 523, 784],
      success: [523, 659, 784, 1046],
      failure: [220, 165, 110],
      notification: [660, 880],
    };
    frequencies[sound].forEach((frequency, i) => {
      const osc = ctx.createOscillator(),
        gain = ctx.createGain();
      const at = ctx.currentTime + i * (sound === "liftoff" ? 0.2 : 0.065),
        duration = sound === "liftoff" ? 1.5 : sound === "hover" ? 0.05 : 0.22;
      osc.type = sound === "liftoff" ? "sawtooth" : "sine";
      osc.frequency.setValueAtTime(frequency, at);
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(25, frequency * (sound === "remove" ? 0.7 : 1.08)),
        at + duration,
      );
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(
        sound === "hover" ? 0.08 : 0.2,
        at + 0.015,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      osc.connect(gain);
      gain.connect(this.effects!);
      osc.start(at);
      osc.stop(at + duration + 0.02);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    });
  }
  visibility(hidden: boolean) {
    if (!this.context) return;
    if (hidden) void this.context.suspend().catch(() => {});
    else if (this.unlocked) void this.context.resume().catch(() => {});
  }
  dispose() {
    this.voices.forEach((v) => {
      v.stop();
      v.disconnect();
    });
    this.voices = [];
    void this.context?.close().catch(() => {});
    this.context = null;
    this.unlocked = false;
  }
}
export const missionAudio = new MissionAudio();
