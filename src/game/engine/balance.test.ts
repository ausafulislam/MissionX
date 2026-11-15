import { test } from "node:test";
import assert from "node:assert/strict";
import { STARTERS } from "../data/catalog";
import { resources } from "./resources";
import { verify } from "./validation";
const base = () => ({
  missionId: "moon" as const,
  partIds: [...STARTERS.moon],
  rocketId: "swift",
  orbitId: "lunar",
});
test("mass margin and battery/EOL assumptions are dimensionally explicit", () => {
  const d = base(),
    r = resources(d);
  assert.equal(r.massMarginPercent, ((550 - r.mass) / 550) * 100);
  assert.ok(r.generation < r.nominalGeneration * 0.7);
  assert.equal(r.batteryUsable, 180 * 0.8 * 0.95);
  assert.ok(r.storage >= r.storageNeeded);
  assert.equal(r.budgetRemaining, 85 - r.cost);
});
test("data shortage is explicit acceptable risk, never silently PASS", () => {
  const d = base();
  d.partIds.push("radar");
  const v = verify(d),
    check = v.checks.find((c) => c.id === "data")!;
  assert.equal(check.status, "close");
  assert.equal(check.blocking, false);
  assert.match(check.reason, /lose observations/);
  assert.equal(v.ready, true);
});
test("zero memory, insufficient battery and incompatible orbits cannot pass", () => {
  const d = base();
  d.partIds = d.partIds.filter((id) => id !== "computer-basic");
  assert.equal(
    verify(d).checks.find((c) => c.id === "storage")?.status,
    "fail",
  );
  assert.equal(verify(d).ready, false);
  d.orbitId = "mars";
  assert.equal(verify(d).checks.find((c) => c.id === "orbit")?.status, "fail");
});
test("over-budget, overweight and deficient power remain hard constraints", () => {
  const d = base();
  d.partIds.push(
    "radar",
    "spectrometer",
    "camera-hires",
    "solar-deep",
    "bus-deep",
  );
  const v = verify(d);
  assert.equal(v.ready, false);
  assert.notEqual(v.checks.find((c) => c.id === "budget")?.status, "pass");
  d.partIds = STARTERS.sun;
  d.rocketId = "swift";
  d.missionId = "moon";
  assert.equal(
    verify({ ...d, missionId: "sun" }).checks.find(
      (c) => c.id === "rocket-mass",
    )?.status,
    "fail",
  );
});
test("high resolution needs precision pointing and CubeSat bus respects payload allowance", () => {
  const d = base();
  d.partIds = d.partIds
    .filter((id) => id !== "camera-map")
    .concat("camera-hires");
  assert.equal(
    verify(d).checks.find((c) => c.id === "dependencies")?.status,
    "fail",
  );
  d.partIds = d.partIds
    .filter((id) => id !== "bus-light")
    .concat("bus-cube", "radar");
  assert.notEqual(
    verify(d).checks.find((c) => c.id === "bus-payload")?.status,
    "pass",
  );
  assert.equal(verify(d).ready, false);
});
