import { NextResponse } from "next/server";
import { validDesign } from "@/game/engine/schema";
import { mentorAdvice } from "@/game/engine/mentor";
import { simulate } from "@/game/engine/simulation";
import { verify } from "@/game/engine/validation";
export async function POST(request: Request) {
  const maxBytes = 12000;
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes)
    return NextResponse.json(
      { error: "Request is too large." },
      { status: 413 },
    );
  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return NextResponse.json(
        { error: "A design is required." },
        { status: 400 },
      );
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Request is too large." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    const body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    input = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return NextResponse.json(
      { error: "Send valid JSON with a mission design." },
      { status: 400 },
    );
  }
  if (!input || typeof input !== "object")
    return NextResponse.json(
      { error: "A design is required." },
      { status: 400 },
    );
  const { design, seed } = input as Record<string, unknown>;
  if (
    !validDesign(design) ||
    (seed !== undefined &&
      (typeof seed !== "number" ||
        !Number.isInteger(seed) ||
        seed < 0 ||
        seed > 4294967295))
  )
    return NextResponse.json(
      { error: "The mission configuration or seed is invalid." },
      { status: 400 },
    );
  const safeDesign = {
    missionId: design.missionId,
    partIds: [...design.partIds],
    rocketId: design.rocketId,
    orbitId: design.orbitId,
  };
  const result =
    typeof seed === "number" && verify(safeDesign).ready
      ? simulate(safeDesign, seed)
      : null;
  const fallback = mentorAdvice(safeDesign, result),
    key = process.env.MENTOR_API_KEY;
  if (!key)
    return NextResponse.json(
      { advice: fallback, source: "local" },
      { headers: { "Cache-Control": "no-store" } },
    );
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        model: process.env.MENTOR_MODEL || "gpt-4o-mini",
        max_tokens: 220,
        messages: [
          {
            role: "system",
            content:
              "You are MissionX, a friendly educational engineering mentor for students. Explain the provided simplified simulation in at most four short sentences. Give practical component changes based only on supplied checks. Do not invent capabilities or claim NASA endorsement. Plain text only.",
          },
          {
            role: "user",
            content: JSON.stringify({
              design: safeDesign,
              checks: verify(safeDesign).checks,
              result,
              fallback,
            }),
          },
        ],
      }),
    });
    if (!response.ok) throw new Error("Mentor provider unavailable");
    const content = await response.json();
    const advice = content.choices?.[0]?.message?.content;
    if (typeof advice !== "string" || !advice.trim())
      throw new Error("Invalid provider response");
    return NextResponse.json(
      { advice: advice.trim().slice(0, 2000), source: "ai" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { advice: fallback, source: "local" },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
