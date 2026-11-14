import { CATEGORIES, MISSIONS, PARTS } from "../src/game/data/catalog";
import { seededRandom, simulate } from "../src/game/engine/simulation";
import { verify } from "../src/game/engine/validation";
import type { Design } from "../src/game/types";
const random = seededRandom(2026);
for (const m of MISSIONS) {
  let valid = 0,
    success = 0,
    partial = 0,
    failed = 0;
  for (let i = 0; i < 1000; i++) {
    const partIds: string[] = [];
    for (const category of CATEGORIES) {
      const compatible = PARTS.filter(
        (p) => p.category === category.id && p.missions.includes(m.id),
      );
      if (category.id === "science") {
        for (const p of compatible)
          if (random() < 0.45 || (m.id === "sun" && p.id === "coronagraph"))
            partIds.push(p.id);
      } else if (compatible.length)
        partIds.push(compatible[Math.floor(random() * compatible.length)].id);
    }
    const design: Design = {
      missionId: m.id,
      partIds,
      rocketId:
        m.id === "moon" ? "swift" : m.id === "sun" ? "atlas" : "horizon",
      orbitId: m.id === "moon" ? "lunar" : m.id === "sun" ? "solar" : "mars",
    };
    if (!verify(design).ready) continue;
    valid++;
    const result = simulate(design, i);
    if (result.outcome === "success") success++;
    else if (result.outcome === "partial") partial++;
    else failed++;
  }
  console.info(
    `${m.name}: ${valid}/1000 randomized designs pass verification; ${success} success, ${partial} partial, ${failed} failed (${valid ? Math.round((success / valid) * 100) : 0}% success among verified designs).`,
  );
}
