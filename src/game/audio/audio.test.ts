import { test } from "node:test";
import assert from "node:assert/strict";
import { CUES, SCORES, musicMood } from "./score";
import { missionAudio } from "./audio-manager";
import { defaultPreferences } from "../store/commander-store";
test("original score moods and important action signatures are distinct", () => {
  assert.equal(musicMood("landing"), "landing");
  assert.equal(musicMood("engineering"), "preparation");
  assert.equal(musicMood("launch"), "launch");
  assert.equal(musicMood("partial"), "results");
  assert.equal(musicMood("failed"), "failure");
  assert.notDeepEqual(SCORES.landing, SCORES.preparation);
  assert.notDeepEqual(CUES.install, CUES.remove);
  assert.notDeepEqual(CUES.success, CUES.failure);
  assert.notDeepEqual(CUES.select, CUES.click);
});
test("audio is gesture-created, gains respect independent preferences, engine stops and context disposes", async () => {
  let contexts = 0,
    started = 0,
    stopped = 0,
    closed = 0;
  class Param {
    value = 0;
    setValueAtTime(n: number) {
      this.value = n;
    }
    setTargetAtTime(n: number) {
      this.value = n;
    }
    linearRampToValueAtTime(n: number) {
      this.value = n;
    }
    exponentialRampToValueAtTime(n: number) {
      this.value = n;
    }
  }
  class Node {
    gain = new Param();
    frequency = new Param();
    connect() {}
    disconnect() {}
    start() {
      started++;
    }
    stop() {
      stopped++;
    }
    onended: null | (() => void) = null;
  }
  class Context {
    currentTime = 0;
    sampleRate = 100;
    state = "running";
    createGain() {
      return new Node();
    }
    createDynamicsCompressor() {
      return new Node();
    }
    createOscillator() {
      return new Node();
    }
    createBiquadFilter() {
      return new Node();
    }
    createBufferSource() {
      return new Node();
    }
    createBuffer() {
      return { getChannelData: () => new Float32Array(200) };
    }
    destination = new Node();
    constructor() {
      contexts++;
    }
    async resume() {}
    async suspend() {}
    async close() {
      closed++;
    }
  }
  const original = globalThis.AudioContext;
  globalThis.AudioContext = Context as unknown as typeof AudioContext;
  try {
    const p = defaultPreferences();
    missionAudio.configure(p);
    missionAudio.play("click");
    assert.equal(contexts, 0);
    await missionAudio.unlock();
    assert.equal(contexts, 1);
    missionAudio.play("install");
    assert.ok(started > 0);
    const before = started;
    missionAudio.configure({ ...p, muted: true });
    missionAudio.play("liftoff");
    assert.equal(started, before);
    missionAudio.configure({ ...p, effectsEnabled: false });
    missionAudio.play("warning");
    assert.equal(started, before);
    missionAudio.configure(p);
    missionAudio.engineRunning(true);
    const active = started;
    missionAudio.engineRunning(true);
    assert.equal(started, active);
    missionAudio.engineRunning(false);
    assert.ok(stopped > 0);
    missionAudio.dispose();
    assert.equal(closed, 1);
  } finally {
    missionAudio.dispose();
    globalThis.AudioContext = original;
  }
});
