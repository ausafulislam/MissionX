import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/mentor/route";
import { STARTERS } from "../src/game/data/catalog";
const design = {
  missionId: "moon",
  partIds: STARTERS.moon,
  rocketId: "swift",
  orbitId: "lunar",
};
const request = (data: unknown) =>
  new Request("http://localhost/api/mentor", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
test("mentor input and streaming size limits", async () => {
  assert.equal((await POST(request({ design: {} }))).status, 400);
  assert.equal((await POST(request({ design, seed: -1 }))).status, 400);
  assert.equal((await POST(request({ design, seed: 1.5 }))).status, 400);
  assert.equal((await POST(request({ data: "x".repeat(13000) }))).status, 413);
  assert.equal(
    (
      await POST(
        new Request("http://localhost/api/mentor", {
          method: "POST",
          body: "not-json",
        }),
      )
    ).status,
    400,
  );
});
test("mentor has deterministic no-key fallback and mocked provider handling", async () => {
  const originalKey = process.env.MENTOR_API_KEY,
    originalFetch = globalThis.fetch;
  try {
    delete process.env.MENTOR_API_KEY;
    const first = await (await POST(request({ design, seed: 2026 }))).json();
    const second = await (await POST(request({ design, seed: 2026 }))).json();
    assert.deepEqual(first, second);
    assert.equal(first.source, "local");
    process.env.MENTOR_API_KEY = "unit-test-placeholder";
    globalThis.fetch = (async () =>
      Response.json({
        choices: [
          {
            message: {
              content: "Try a larger battery for better eclipse reserves.",
            },
          },
        ],
      })) as typeof fetch;
    const remote = await (await POST(request({ design, seed: 2026 }))).json();
    assert.equal(remote.source, "ai");
    assert.ok(remote.advice.includes("battery"));
    globalThis.fetch = (async () =>
      new Response("Provider unavailable", { status: 503 })) as typeof fetch;
    const unavailable = await (
      await POST(request({ design, seed: 2026 }))
    ).json();
    assert.deepEqual(unavailable, first);
    globalThis.fetch = (async () => {
      throw new Error("Network blocked");
    }) as typeof fetch;
    assert.deepEqual(
      await (await POST(request({ design, seed: 2026 }))).json(),
      first,
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.MENTOR_API_KEY;
    else process.env.MENTOR_API_KEY = originalKey;
  }
});
