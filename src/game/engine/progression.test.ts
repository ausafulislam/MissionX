import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { awardRuns, emptyProgress, commanderRank } from "./progression";
import { simulate } from "./simulation";
import { STARTERS } from "../data/catalog";
import { cleanPreferences, validCommanderName } from "../store/commander-store";
import type { SavedRun, MissionId } from "../types";
const flight = (missionId: MissionId, id = missionId): SavedRun => {
  const design = {
    missionId,
    partIds: [...STARTERS[missionId]],
    rocketId:
      missionId === "moon"
        ? "swift"
        : missionId === "sun"
          ? "atlas"
          : "horizon",
    orbitId:
      missionId === "moon" ? "lunar" : missionId === "sun" ? "solar" : "mars",
  };
  return {
    id,
    createdAt: "2026-11-14T00:00:00Z",
    design,
    result: simulate(design, 2026),
  };
};
describe("headquarters profile and earned progression", () => {
  test("names trim and reject invalid length or markup", () => {
    assert.ok(validCommanderName("  Ayesha  "));
    for (const n of ["", " ", "A", "x".repeat(25), "<admin>", "A\nB"])
      assert.equal(validCommanderName(n), false);
    assert.ok(validCommanderName("月の司令官"));
  });
  test("preferences clamp unsafe values and retain independent controls", () => {
    const p = cleanPreferences({
      master: 4,
      music: -1,
      effects: 0.6,
      muted: true,
      quality: "ultra",
      sensitivity: Infinity,
      language: "fake",
    });
    assert.equal(p.master, 1);
    assert.equal(p.music, 0);
    assert.equal(p.effects, 0.6);
    assert.equal(p.muted, true);
    assert.equal(p.quality, "auto");
    assert.equal(p.sensitivity, 1);
    assert.equal(p.language, "en");
    assert.deepEqual(cleanPreferences(null), cleanPreferences({}));
  });
  test("awards real score once per unique run and never mutates input", () => {
    const old = emptyProgress(),
      r = flight("moon");
    const p = awardRuns(old, [r]);
    assert.equal(p.xp, 20 + r.result.score);
    assert.equal(p.completed, 1);
    assert.ok(p.achievements.includes("contact"));
    assert.equal(old.xp, 0);
    assert.deepEqual(awardRuns(p, [r]), p);
  });
  test("three science destinations unlock explorer, one does not", () => {
    const p = awardRuns(
      emptyProgress(),
      (["moon", "sun", "mars"] as const).map((m) => flight(m)),
    );
    assert.ok(p.achievements.includes("explorer"));
    assert.equal(p.completed, 3);
    assert.ok(
      !awardRuns(emptyProgress(), [flight("moon")]).achievements.includes(
        "explorer",
      ),
    );
  });
  test("failed launch cannot earn success or launch achievements", () => {
    const r = flight("moon");
    r.result = {
      ...r.result,
      outcome: "failed",
      science: 0,
      score: 0,
      engineeringScore: 0,
      segments: r.result.segments.map((s) => ({ ...s, status: "fail" })),
    };
    const p = awardRuns(emptyProgress(), [r]);
    assert.deepEqual(p.achievements, ["contact"]);
    assert.equal(p.best, 0);
    assert.equal(p.xp, 20);
  });
  test("rank follows earned XP", () => {
    assert.equal(commanderRank(0), "CADET COMMANDER");
    assert.equal(commanderRank(150), "ORBITAL EXPLORER");
    assert.equal(commanderRank(500), "MISSION SPECIALIST");
    assert.equal(commanderRank(1200), "FLIGHT DIRECTOR");
  });
});
