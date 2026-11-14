import type { Design, Simulation } from "../types";
import { verify } from "./validation";
export function mentorAdvice(
  design: Design,
  result?: Simulation | null,
): string {
  const { checks, resources: r } = verify(design);
  const failed = checks.filter((c) => c.status !== "pass").sort((a,b)=>Number(a.blocking===false)-Number(b.blocking===false));
  const actions: Record<string, string> = {
    mass: "Try a lighter structure or remove optional instruments.",
    budget:
      "Try lower-cost instruments or a less expensive compatible launcher.",
    science:
      "Add a compatible science instrument or choose a more capable camera.",
    lifetime:
      "Use longer-life structure, battery and computer options; the shortest-lived component limits the craft.",
    power: "Select a larger solar array or reduce instrument power demand.",
    battery: "Install a higher-capacity battery to cover operations in shadow.",
    storage: "Choose a computer with more mass memory to preserve observations between contacts.",
    data: "Upgrade your radio to send more science back during short ground contacts.",
  };
  if (failed.length)
    return `Start with ${failed[0].label.toLowerCase()}: ${failed[0].reason} ${actions[failed[0].id] ?? (failed[1] ? failed[1].reason : "Change one component at a time and watch all four resource meters.")}`;
  if (result)
    return `${result.lessons[0]} ${result.lessons[1] ?? `Your science return was ${result.science} points. Compare this run with your next design to see what improved.`}`;
  return `Your design is ready. Average power has ${r.powerMargin.toFixed(0)} W of margin. A larger camera may improve science, but also adds mass, energy demand and data. Keep some room for unexpected events.`;
}
