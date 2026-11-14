"use client";
export interface DeviceInfo {
  kind: "desktop" | "phone" | "tablet";
  portrait: boolean;
  compact: boolean;
}
export function detectDevice(): DeviceInfo {
  const width = innerWidth,
    height = innerHeight,
    touch = navigator.maxTouchPoints > 0;
  const phone =
    /Android.*Mobile|iPhone|iPod/i.test(navigator.userAgent) ||
    (touch && Math.min(width, height) < 600);
  return {
    kind: phone
      ? "phone"
      : touch && Math.min(width, height) < 1100
        ? "tablet"
        : "desktop",
    portrait: height > width,
    compact: width < 1000 || height < 600,
  };
}
export async function requestImmersion() {
  if (typeof document === "undefined") return;
  try {
    if (
      !document.fullscreenElement &&
      document.documentElement.requestFullscreen
    )
      await document.documentElement.requestFullscreen();
  } catch {
    /* Full viewport is the supported fallback. */
  }
}
export async function landscapeAfterGesture() {
  await requestImmersion();
  try {
    const orientation = screen.orientation as ScreenOrientation & {
      lock?: (direction: string) => Promise<void>;
    };
    await orientation?.lock?.("landscape");
  } catch {
    /* Portrait continuation is always available. */
  }
}
export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas"),
      gl = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
