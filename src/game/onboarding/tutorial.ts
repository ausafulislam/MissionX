import type { Station } from "@/components/hq/types";
export const TUTORIAL_KEY = "missionx-hq-tutorial-v1";
export const TUTORIAL_STEPS: { station: Station; target: string; title: string; description: string }[] = [
  { station: "menu", target: ".hq-hud", title: "Welcome to MissionX", description: "Design, verify and launch a simulated space mission. This tour previews your real controls without changing your design. Next takes you between stations; you can skip at any time." },
  { station: "planning", target: ".hq-destination-tabs", title: "Choose your mission", description: "Choose Moon Mapping, Sun Watch or Mars Orbiter. Each has a different science goal and engineering limits. After the tour, select a destination and open the builder." },
  { station: "engineering", target: ".hq-category-list", title: "Build your spacecraft", description: "Browse subsystems, inspect components and equip the parts your mission needs. The starter configuration is an optional starting point, not a required choice." },
  { station: "engineering", target: ".hq-resource-strip", title: "Watch the balance sheet", description: "Mass and budget must stay within limits. Match power supply to demand and data generation to downlink. These live values update when your configuration changes." },
  { station: "verification", target: ".hq-radio-list", title: "Choose a rocket and orbit", description: "Select a launch vehicle here and a science orbit immediately below. Vehicle capacity and orbit compatibility must fit your mission. Changing them updates verification and cost." },
  { station: "verification", target: ".hq-checks > div:first-child", title: "Verify before flight", description: "Read each check and its reason. Blocking problems must be fixed; accepted operational risks can still reduce your science return. These are educational checks, not flight certification." },
  { station: "verification", target: "[data-tour-launch]", title: "Begin your launch", description: "Initiate Launch becomes available when the required checks pass. On the flight screen, Begin Countdown starts 3, 2, 1, LIFTOFF before ascent. Complete the six arrival checks before scientific operations." },
  { station: "results", target: ".hq-side-panel-content h2", title: "Review your results", description: "After a flight, the Science station shows mission performance, science return, score and your downloadable report. Until then it shows this waiting state. Finish returns you to where you started." },
];
let sessionDismissed = false;
export function tutorialSeen(storage?: Pick<Storage, "getItem">) {
  if (sessionDismissed) return true;
  try { const value = JSON.parse(storage?.getItem(TUTORIAL_KEY) ?? "null"); return value?.version === 1 && ["completed", "skipped"].includes(value.status); } catch { return false; }
}
export function saveTutorial(status: "completed" | "skipped", storage?: Pick<Storage, "setItem">) {
  sessionDismissed = true;
  try { storage?.setItem(TUTORIAL_KEY, JSON.stringify({ version: 1, status })); return !!storage; } catch { return false; }
}
