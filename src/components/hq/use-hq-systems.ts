"use client";
import { useEffect, useState } from "react";
import { detectDevice, type DeviceInfo } from "./device";
import { useCommander } from "@/game/store/commander-store";
import { missionAudio } from "@/game/audio/audio-manager";
export function useDevice() {
  const [device, setDevice] = useState<DeviceInfo | null>(null),
    [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    let live = true;
    const update = () => {
      if (live) {
        setDevice(detectDevice());
        setFullscreen(!!document.fullscreenElement);
      }
    };
    void Promise.resolve().then(update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    document.addEventListener("fullscreenchange", update);
    return () => {
      live = false;
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      document.removeEventListener("fullscreenchange", update);
    };
  }, []);
  return { device, fullscreen };
}
export function useAudioSystems() {
  const p = useCommander((s) => s.preferences);
  useEffect(() => {
    missionAudio.configure(p);
  }, [p]);
  useEffect(() => {
    const visibility = () => missionAudio.visibility(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const gesture = () => {
      void missionAudio.unlock();
    };
    window.addEventListener("pointerdown", gesture, { once: true });
    window.addEventListener("keydown", gesture, { once: true });
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pointerdown", gesture);
      window.removeEventListener("keydown", gesture);
      missionAudio.dispose();
      try {
        screen.orientation?.unlock?.();
      } catch {}
      if (document.fullscreenElement)
        void document.exitFullscreen().catch(() => {});
      document.body.style.cursor = "";
    };
  }, []);
}
