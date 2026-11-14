import { test } from "node:test";
import assert from "node:assert/strict";
import { validDesign } from "./schema";
import { STARTERS } from "../data/catalog";
import { mentorAdvice } from "./mentor";
import { simulate } from "./simulation";
const d = {
  missionId: "moon" as const,
  partIds: [...STARTERS.moon],
  rocketId: "swift",
  orbitId: "lunar",
};
test("schema rejects malformed and unknown catalog values", () => {
  for (const value of [
    null,
    {},
    [],
    { ...d, missionId: "pluto" },
    { ...d, partIds: ["bogus"] },
    { ...d, rocketId: "bogus" },
    { ...d, partIds: ["bus-light", "bus-light"] },
  ])
    assert.equal(validDesign(value), false);
  assert.equal(validDesign(d), true);
});
test("mentor always has useful deterministic local advice", () => {
  assert.equal(mentorAdvice(d), mentorAdvice(d));
  assert.ok(mentorAdvice({ ...d, partIds: [] }).includes("Start with"));
  assert.ok(mentorAdvice(d, simulate(d, 42)).length > 50);
});
