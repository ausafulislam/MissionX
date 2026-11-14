import { describe, test } from "node:test";
import assert from "node:assert/strict";
const expect = (actual: unknown) => ({
  toBe: (expected: unknown) => assert.equal(actual, expected),
  toEqual: (expected: unknown) => assert.deepEqual(actual, expected),
  toBeGreaterThanOrEqual: (expected: number) =>
    assert.ok(typeof actual === "number" && actual >= expected),
  toBeLessThanOrEqual: (expected: number) =>
    assert.ok(typeof actual === "number" && actual <= expected),
  not: { toBe: (expected: unknown) => assert.notEqual(actual, expected) },
});
import { MISSIONS, STARTERS } from "../data/catalog";
import type { Design } from "../types";
import { resources } from "./resources";
import { verify } from "./validation";
import { simulate } from "./simulation";
const design = (id: Design["missionId"] = "moon"): Design => ({
  missionId: id,
  partIds: [...STARTERS[id]],
  rocketId: id === "moon" ? "swift" : id === "sun" ? "atlas" : "horizon",
  orbitId: id === "moon" ? "lunar" : id === "sun" ? "solar" : "mars",
});
describe("pure engineering engine", () => {
  for (const mission of MISSIONS)
    test(`${mission.name} starter passes every check`, () =>
      expect(verify(design(mission.id)).ready).toBe(true));
  test("mass and budget sum catalog plus launch", () => {
    const r = resources(design());
    expect(r.mass).toBe(166);
    expect(r.cost).toBe(46);
  });
  test("Sun Watch models four spacecraft", () => {
    const d = design("sun"),
      r = resources(d);
    expect(r.fleet).toBe(4);
    expect(r.mass).toBe(672);
    expect(r.science).toBe(168);
  });
  test("power shortage blocks launch", () => {
    const d = design("mars");
    d.partIds = d.partIds.filter((id) => id !== "solar-deep");
    d.partIds.push("solar-compact");
    expect(verify(d).checks.find((c) => c.id === "power")?.status).toBe("fail");
  });
  test("battery capacity changes eclipse reserve", () => {
    const d = design();
    d.partIds = d.partIds.filter((id) => id !== "battery-small");
    expect(verify(d).checks.find((c) => c.id === "battery")?.status).toBe(
      "fail",
    );
  });
  test("downlink bottleneck identified", () => {
    const d = design();
    d.partIds = d.partIds.filter((id) => id !== "camera-map");
    d.partIds.push("camera-hires");
    expect(verify(d).checks.find((c) => c.id === "data")?.status).not.toBe(
      "pass",
    );
  });
  test("rocket trajectory and orbit constraints", () => {
    const d = design("mars");
    d.rocketId = "swift";
    expect(verify(d).checks.find((c) => c.id === "launch-orbit")?.status).toBe(
      "fail",
    );
    d.orbitId = "earth";
    expect(verify(d).checks.find((c) => c.id === "orbit")?.status).toBe("fail");
  });
  test("incompatible and duplicate parts rejected", () => {
    const d = design();
    d.partIds.push("coronagraph", "bus-deep");
    expect(verify(d).ready).toBe(false);
  });
  test("same design and seed gives identical report", () =>
    expect(simulate(design(), 42)).toEqual(simulate(design(), 42)));
  test("seeded runs reach success, partial and failure", () => {
    const outcomes = new Set(
      Array.from({ length: 500 }, (_, i) => simulate(design(), i).outcome),
    );
    expect([...outcomes].sort()).toEqual(["failed", "partial", "success"]);
  });
  test("scores derive from actual data, not animation", () => {
    for (let i = 0; i < 30; i++) {
      const r = simulate(design(), i);
      expect(r.scienceScore).toBe(
        Math.round(Math.min(1, r.science / 45) * 100),
      );
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(100);
    }
  });
  test("invalid configuration cannot launch", () => {
    const d = design();
    d.partIds = [];
    expect(simulate(d, 42).outcome).toBe("failed");
  });
});

describe("edge cases and educational event effects", () => {
  test("budget and science CLOSE statuses are not launch ready", () => {
    const d = design();
    d.partIds = d.partIds.filter((id) => id !== "camera-map");
    d.partIds.push("magnetometer");
    expect(verify(d).ready).toBe(false);
  });
  test("large payload is constrained by the rocket even before mission mass limit", () => {
    const d = design("sun");
    d.rocketId = "swift";
    expect(verify(d).checks.find((c) => c.id === "rocket-mass")?.status).toBe(
      "fail",
    );
  });
  test("short-life part limits Mars lifetime", () => {
    const d = design("mars");
    d.partIds = d.partIds.filter((id) => id !== "computer-rad");
    d.partIds.push("computer-basic");
    expect(verify(d).checks.find((c) => c.id === "lifetime")?.status).toBe(
      "fail",
    );
  });
  test("protected computer softens storm effects", () => {
    const d = design(),
      protectedDesign = {
        ...d,
        partIds: d.partIds
          .filter((id) => id !== "computer-basic")
          .concat("computer-rad"),
      };
    const seed = Array.from({ length: 100 }, (_, i) => i).find((i) =>
      simulate(d, i).events.some((e) => e.kind === "storm"),
    )!;
    expect(
      simulate(protectedDesign, seed).science > simulate(d, seed).science,
    ).toBe(true);
  });
  test("transceiver recovers more data after contact outage", () => {
    const d = design(),
      upgraded = {
        ...d,
        partIds: d.partIds
          .filter((id) => id !== "radio-basic")
          .concat("radio-relay"),
      };
    const seed = Array.from({ length: 100 }, (_, i) => i).find((i) =>
      simulate(d, i).events.some((e) => e.kind === "outage"),
    )!;
    expect(
      simulate(upgraded, seed).returnedData > simulate(d, seed).returnedData,
    ).toBe(true);
  });
  test("data and power factors remain bounded across all missions", () => {
    for (const m of MISSIONS)
      for (let seed = 0; seed < 50; seed++) {
        const d = design(m.id),
          r = resources(d),
          s = simulate(d, seed);
        expect(s.returnedData).toBeLessThanOrEqual(
          Math.min(r.data, r.downlink),
        );
        expect(s.lifetime).toBeLessThanOrEqual(r.lifetime);
        expect(s.score).toBeGreaterThanOrEqual(0);
      }
  });
});

test("extra battery reserve mitigates short storm power deficits", () => {
  const d = design();
  d.partIds = d.partIds
    .filter((id) => id !== "radio-basic")
    .concat("radio-dish", "radar");
  const larger = {
    ...d,
    partIds: d.partIds
      .filter((id) => id !== "battery-small")
      .concat("battery-large"),
  };
  assert.equal(verify(d).ready, true);
  assert.equal(verify(larger).ready, true);
  const seed = Array.from({ length: 100 }, (_, i) => i).find((i) =>
    simulate(d, i).events.some((e) => e.kind === "storm"),
  )!;
  assert.ok(simulate(larger, seed).power > simulate(d, seed).power);
  assert.ok(simulate(larger, seed).lifetime > simulate(d, seed).lifetime);
});
