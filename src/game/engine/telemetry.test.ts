import { test } from "node:test";
import assert from "node:assert/strict";
import { telemetry } from "./telemetry";
import { simulate } from "./simulation";
import { STARTERS } from "../data/catalog";
const design = {
  missionId: "moon" as const,
  partIds: [...STARTERS.moon],
  rocketId: "swift",
  orbitId: "lunar",
};
test("a failed launch remains lost at evaluation and never regains power/data/altitude", () => {
  let seed = 0;
  while (!simulate(design, seed).events.some((e) => e.kind === "failure"))
    seed++;
  const run = simulate(design, seed);
  for (const time of [7, 13, 23, run.duration]) {
    const t = telemetry(design, run, time);
    assert.equal(t.altitude, 0);
    assert.equal(t.power, 0);
    assert.equal(t.data, 0);
    assert.equal(t.velocity, 0);
  }
});
test("successful insertion returns actual resource telemetry only after the appropriate events", () => {
  const run = simulate(design, 2026);
  assert.equal(telemetry(design, run, 0).altitude, 0);
  assert.equal(telemetry(design, run, 12).power, 0);
  assert.ok(telemetry(design, run, 13).power > 0);
  assert.equal(telemetry(design, run, 17).data, 0);
  assert.ok(telemetry(design, run, 18).data > 0);
});
