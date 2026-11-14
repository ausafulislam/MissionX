"use client";
import type { Preferences } from "../store/commander-store";
import { CUES, SCORES, musicMood, type MusicMood, type Sound } from "./score";
export type { Sound } from "./score";
class MissionAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private effects: GainNode | null = null;
  private config: Preferences | null = null;
  private unlocked = false;
  private lastHover = 0;
  private semanticAt = -1000;
  private mood: MusicMood = "landing";
  private scheduler: ReturnType<typeof setInterval> | null = null;
  private nextBeat = 0;
  private beat = 0;
  private voices = new Set<AudioScheduledSourceNode>();
  private engine: { source: AudioBufferSourceNode; gain: GainNode } | null =
    null;
  private noise: AudioBuffer | null = null;
  async unlock() {
    try {
      if (!this.context) {
        const ctx = (this.context = new AudioContext());
        this.master = ctx.createGain();
        this.music = ctx.createGain();
        this.effects = ctx.createGain();
        this.music.connect(this.master);
        this.effects.connect(this.master);
        const compressor = ctx.createDynamicsCompressor();
        this.master.connect(compressor);
        compressor.connect(ctx.destination);
        this.master.gain.value = 0;
        this.music.gain.value = 0;
        this.effects.gain.value = 0;
        this.nextBeat = ctx.currentTime + 0.05;
        this.scheduler = setInterval(() => this.schedule(), 100);
      }
      await this.context.resume();
      this.unlocked = true;
      if (this.config) this.configure(this.config);
    } catch {
      /* Silent play is always supported. */
    }
  }
  configure(p: Preferences) {
    this.config = p;
    const c = this.context;
    if (!c || !this.master || !this.music || !this.effects) return;
    this.master.gain.setTargetAtTime(
      p.muted || !this.unlocked ? 0 : p.master,
      c.currentTime,
      0.08,
    );
    this.music.gain.setTargetAtTime(
      p.musicEnabled ? p.music * 0.32 : 0,
      c.currentTime,
      0.35,
    );
    this.effects.gain.setTargetAtTime(
      p.effectsEnabled ? p.effects * 0.6 : 0,
      c.currentTime,
      0.06,
    );
  }
  scene(location: string) {
    const next = musicMood(location);
    if (next === this.mood) return;
    this.mood = next;
    this.beat = 0; /* Already sounding pads release gently as the new harmony enters. */
  }
  private tone(
    frequency: number,
    at: number,
    duration: number,
    volume: number,
    type: OscillatorType,
    destination: AudioNode,
    cutoff = 1800,
  ) {
    const ctx = this.context;
    if (!ctx) return;
    const osc = ctx.createOscillator(),
      gain = ctx.createGain(),
      filter = ctx.createBiquadFilter();
    osc.type = type;
    osc.frequency.value = frequency;
    filter.type = "lowpass";
    filter.frequency.value = cutoff;
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(
      volume,
      at + Math.min(0.15, duration * 0.18),
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    osc.start(at);
    osc.stop(at + duration + 0.02);
    this.voices.add(osc);
    osc.onended = () => {
      this.voices.delete(osc);
      osc.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }
  private schedule() {
    const ctx = this.context;
    if (!ctx || !this.music || !this.unlocked || ctx.state !== "running")
      return;
    if (
      this.config?.muted ||
      !this.config?.musicEnabled ||
      !this.config?.music
    ) {
      this.nextBeat = ctx.currentTime + 0.05;
      return;
    }
    if (this.nextBeat < ctx.currentTime) this.nextBeat = ctx.currentTime + 0.03;
    while (this.nextBeat < ctx.currentTime + 0.22) {
      const score = SCORES[this.mood],
        chord = score.chords[Math.floor(this.beat / 8) % score.chords.length];
      if (this.beat % 8 === 0)
        chord.forEach((n, i) =>
          this.tone(
            score.root * 2 ** (n / 12),
            this.nextBeat,
            score.beat * 10,
            i === 0 ? 0.12 : 0.055,
            "triangle",
            this.music!,
            score.cutoff,
          ),
        );
      const note = chord[this.beat % 4];
      this.tone(
        score.root * 4 * 2 ** (note / 12),
        this.nextBeat,
        score.beat * 1.8,
        0.045,
        "sine",
        this.music,
        score.cutoff * 2,
      );
      this.nextBeat += score.beat;
      this.beat++;
    }
  }
  play(sound: Sound) {
    const ctx = this.context;
    if (
      !ctx ||
      !this.effects ||
      !this.unlocked ||
      this.config?.muted ||
      !this.config?.effectsEnabled ||
      ctx.state !== "running"
    )
      return;
    const now = performance.now();
    if (sound === "hover") {
      if (now - this.lastHover < 150) return;
      this.lastHover = now;
    } else if (sound === "click") {
      if (now - this.semanticAt < 80) return;
    } else this.semanticAt = now;
    CUES[sound].forEach((f, i) =>
      this.tone(
        f,
        ctx.currentTime + i * (sound === "success" ? 0.13 : 0.07),
        sound === "hover" ? 0.045 : sound === "failure" ? 0.65 : 0.24,
        sound === "hover" ? 0.025 : 0.12,
        ["error", "warning"].includes(sound) ? "triangle" : "sine",
        this.effects!,
      ),
    );
    if (["ignition", "liftoff", "separation"].includes(sound))
      this.burst(sound === "liftoff" ? 1.8 : sound === "ignition" ? 0.9 : 0.18);
  }
  private noiseBuffer() {
    const ctx = this.context!;
    if (!this.noise) {
      const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate),
        data = b.getChannelData(0);
      let low = 0;
      for (let i = 0; i < data.length; i++) {
        low = (low + (Math.random() * 2 - 1) * 0.04) / 1.04;
        data[i] = low * 3.5;
      }
      this.noise = b;
    }
    return this.noise;
  }
  private burst(duration: number) {
    const ctx = this.context;
    if (!ctx || !this.effects) return;
    const source = ctx.createBufferSource(),
      gain = ctx.createGain();
    source.buffer = this.noiseBuffer();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.connect(gain);
    gain.connect(this.effects);
    source.start();
    source.stop(ctx.currentTime + duration);
    this.voices.add(source);
    source.onended = () => {
      this.voices.delete(source);
      source.disconnect();
      gain.disconnect();
    };
  }
  engineRunning(active: boolean) {
    const ctx = this.context;
    if (!ctx || !this.effects) return;
    if (active && !this.engine) {
      const source = ctx.createBufferSource(),
        gain = ctx.createGain();
      source.buffer = this.noiseBuffer();
      source.loop = true;
      gain.gain.value = 0;
      gain.gain.setTargetAtTime(0.28, ctx.currentTime, 0.3);
      source.connect(gain);
      gain.connect(this.effects);
      source.start();
      this.engine = { source, gain };
    } else if (!active && this.engine) {
      const { source, gain } = this.engine;
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.06);
      source.stop(ctx.currentTime + 0.3);
      source.onended = () => {
        source.disconnect();
        gain.disconnect();
      };
      this.engine = null;
    }
  }
  visibility(hidden: boolean) {
    if (!this.context) return;
    if (hidden) void this.context.suspend().catch(() => {});
    else if (this.unlocked) void this.context.resume().catch(() => {});
  }
  dispose() {
    if (this.scheduler) clearInterval(this.scheduler);
    this.scheduler = null;
    this.engineRunning(false);
    for (const v of this.voices) {
      try {
        v.stop();
      } catch {}
      v.disconnect();
    }
    this.voices.clear();
    void this.context?.close().catch(() => {});
    this.context = null;
    this.noise = null;
    this.unlocked = false;
    this.beat = 0;
  }
}
export const missionAudio = new MissionAudio();
