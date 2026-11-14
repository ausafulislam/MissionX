/** Original procedural score. No downloads, samples, or third-party recordings. */
export const SCORES = {
  landing: {
    root: 55,
    chords: [
      [0, 7, 14, 15],
      [0, 5, 12, 19],
      [0, 3, 10, 17],
      [0, 7, 12, 14],
    ],
    beat: 0.8,
    cutoff: 620,
  },
  preparation: {
    root: 65.406,
    chords: [
      [0, 7, 12, 15],
      [0, 5, 10, 17],
      [0, 3, 7, 14],
      [0, 5, 12, 19],
    ],
    beat: 0.6,
    cutoff: 900,
  },
  launch: {
    root: 49,
    chords: [
      [0, 7, 12, 14],
      [0, 3, 10, 14],
      [0, 5, 12, 17],
      [0, 7, 14, 19],
    ],
    beat: 0.32,
    cutoff: 1400,
  },
  results: {
    root: 65.406,
    chords: [
      [0, 4, 7, 14],
      [0, 5, 9, 16],
      [0, 7, 11, 14],
      [0, 4, 12, 19],
    ],
    beat: 0.85,
    cutoff: 1100,
  },
  failure: {
    root: 49,
    chords: [
      [0, 3, 7, 10],
      [0, 5, 8, 12],
      [0, 2, 7, 14],
      [0, 3, 10, 15],
    ],
    beat: 1,
    cutoff: 450,
  },
} as const;
export type MusicMood = keyof typeof SCORES;
export function musicMood(location: string): MusicMood {
  return location === "landing"
    ? "landing"
    : location === "launch"
      ? "launch"
      : location === "failed"
        ? "failure"
        : ["results", "result", "success", "partial"].includes(location)
          ? "results"
          : "preparation";
}
export const CUES = {
  click: [720, 1080],
  hover: [1400],
  transition: [196, 392, 784],
  open: [262, 392, 524],
  close: [524, 262],
  select: [392, 587, 784],
  install: [330, 660, 990],
  remove: [660, 440, 220],
  warning: [294, 294],
  error: [147, 139],
  verify: [523, 659, 784, 1046],
  ignition: [45, 60],
  liftoff: [38, 55, 82],
  separation: [180, 720],
  deployment: [392, 523, 784, 1046],
  success: [523, 659, 784, 1046, 1318],
  partial: [392, 523, 587],
  failure: [220, 165, 110],
  notification: [880, 1174],
  countdown: [880],
  completion: [784, 1046, 1568],
} as const;
export type Sound = keyof typeof CUES;
