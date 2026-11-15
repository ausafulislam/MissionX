# MissionX architecture — current implementation

Audited 2026-11-14 against package 0.1.10. This section takes precedence over the **historical plan** retained below. The old sample interfaces, proposed filenames, one-hero-scene limit and deployment assumptions are not current implementation contracts.

## Runtime and routes

- Next.js App Router, React, strict TypeScript and Tailwind CSS.
- `/`: landing sections, GSAP motion and Lenis scroll.
- `/hq`: client-side headquarters, station panels, procedural scene modules and compatibility fallback.
- `/play`: flight-deck entry with `/play/goal`, `/play/build`, `/play/verify`, `/play/launch`, `/play/result`, `/play/debrief`.
- `POST /api/mentor`: the sole application API route; optional OpenAI call with deterministic local fallback.
- Route-level error/not-found boundaries support recovery. Browser-facing API calls are same-origin.

## Source ownership

| Location | Responsibility |
|---|---|
| `src/game/types.ts` | Actual shared TypeScript models; do not use historical example interfaces below |
| `src/game/data/catalog.ts` | Typed facade over static missions/parts/rockets/orbits/setup JSON |
| `src/game/data/assumptions.json` | Model version and disclosed educational coefficients |
| `src/game/data/events.ts` | Authored incident options |
| `src/game/engine/` | Resources, verification, seeded simulation, operations, lifecycle, diagnostics, telemetry, progression and mentor advice |
| `src/game/store/mission-store.ts` | Current design, validated runs, history, hydration and diagnostic review count |
| `src/game/store/commander-store.ts` | Local commander identity/preferences/progression |
| `src/game/report/` | Report rows, measured page layout and pdf-lib output |
| `src/game/audio/` | Gesture-created procedural score/effects and lifecycle management |
| `src/game/onboarding/` | Versioned first-use tutorial |
| `src/components/hq/world/` | Multiple procedural visual modules, fallback/device/focus handling |
| `src/components/game/` | Flight-deck UI and shared diagnostic/report components |

## Data flow

```text
Static catalogs → pure resources / verify / simulate / operate
                             ↑                  ↓
                       mission store ← validated run
                             ↓
                    HQ or /play presentation
                             ↓
                 diagnostics / mentor / PDF report
```

Simulation computes a result; playback presents it. `flight-lifecycle.ts` and `flight-tests.ts` are shared projections, not independent science engines. Arrival acknowledgment controls playback; it does not manufacture measurements or change scoring formulas.

## Persistence and trust

Mission saves use local storage key `missionx-flight-deck-v1`, guarded parsing, validated IDs and bounded history. Hydration recomputes saved results with the recorded model version (1, 2 or 3); legacy modules remain in the engine. Historical replay is not necessarily bit-for-bit archival because catalogs may be shared. Commander preferences are separate; no cloud account/database is implemented. Clearing browser data removes local progress.

The mentor validates catalog IDs and optional unsigned 32-bit seed, limits streamed JSON to 12,000 bytes, and recomputes the result server-side. It sends no commander name to the provider. No application rate limiter is present; deployment abuse controls are an owner responsibility. See [Mentor](Mentor.md).

## Presentation and deployment boundaries

Canvas is client-side/lazy-loaded. Multiple HQ scenes are authorized by later commissions in AGENTS.md, superseding the historical one-scene rule. Reduced motion, keyboard/touch controls, compatibility rendering and gesture-only audio are implemented accommodations, not blanket accessibility certification. Fonts/images are local; there is no live NASA data dependency.

`next.config.ts` enables cache components/partial prefetching and the Tailwind Turbopack loader. The supplied public deployment is https://missionx-black.vercel.app/. Vercel account settings, production branch and automatic preview configuration are not verified by repository source. `NEXT_PUBLIC_SITE_URL` is currently unused; PDF links are explicit. See [setup](../README.md#run-locally) and [Testing](Testing.md).

---

# Historical architecture plan and implementation appendices

**Historical record, retained rather than rewritten:** the following content mixes original intentions and dated implementation notes. Claims such as `fallback-text.json`, planned function names, TypeScript-only catalogs, one hero scene and automatic Vercel previews are superseded or unverified. Use the current overview and actual source for implementation work.

# Architecture: MissionX

Describes the app flow, tech stack, folder structure, data models and how the pieces connect. Does not define visual design (see Design.md and runtime instructions).

---

## 1. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) | Server components by default, client components only when needed |
| Language | TypeScript (strict) | No `any` |
| Styling | Tailwind CSS | Design tokens from Design.md |
| Animation | GSAP with `@gsap/react` and ScrollTrigger | Single animation library. Use `useGSAP` for cleanup |
| 3D | Three.js with React Three Fiber and Drei | One hero scene only, loaded client side |
| Smooth scroll | Lenis | Synced with GSAP ticker |
| State | Zustand | Game state, persisted to local storage |
| Package manager | bun | `bun add`, `bun dev`, `bun run build` |
| Hosting | Vercel | Preview and production |
| AI mentor | Server route calling an LLM API | Provider and key via environment variables only |

Anime.js is not used. GSAP covers all animation needs.

## 2. High-level flow

```
Landing page (/)
      |
      v
Play entry (/play)  ->  Goal -> Build -> Verify -> Launch -> Result
                          |        |         |         |         |
                          v        v         v         v         v
                     Zustand game store (single source of truth)
                          |
                          v
                 Game engine (pure TypeScript functions)
                          |
              +-----------+------------+
              v                        v
      Data catalogs (JSON)      AI mentor route (/api/mentor)
```

Principle: the UI never calculates game rules. It reads state from the store and calls engine functions. The engine never imports UI code.

## 3. Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/play` | Redirects to the first step or resumes saved progress |
| `/play/goal` | Mission selection and requirements |
| `/play/build` | Spacecraft builder |
| `/play/verify` | Requirement checks plus rocket and orbit selection |
| `/play/launch` | Simulation |
| `/play/result` | Score and segment report |
| `/api/mentor` | POST: returns a plain-language explanation of a result |

A step cannot be opened unless previous steps are complete in the store (redirect back otherwise).

## 4. Folder structure

```
src/
  app/
    layout.tsx
    page.tsx                  landing page
    globals.css               design tokens
    icon.svg
    play/
      page.tsx
      goal/page.tsx
      build/page.tsx
      verify/page.tsx
      launch/page.tsx
      result/page.tsx
    api/
      mentor/route.ts
  components/
    layout/                   Navbar, Footer, GameTopBar
    sections/                 landing page sections
    ui/                       Button, Pill, Gauge, Meter, Tooltip, Card
    three/                    hero Earth scene
    game/                     screen level components (PartCard, RequirementRow, etc.)
  game/
    engine/                   pure functions: mass, power, data, cost, verify, simulate, score
    data/                     missions.json, parts.json, rockets.json, orbits.json, events.json, fallback-text.json
    store/                    Zustand store and persistence
  hooks/                      useGsapReveal, useReducedMotion, useLenis
  lib/                        helpers, seeded RNG, formatters
  types/                      shared TypeScript types
public/
  images/
  textures/
```

## 5. Data models (TypeScript)

```ts
type PartCategory = "structure" | "power" | "battery" | "comms" | "computer" | "instrument";

interface Part {
  id: string;
  name: string;
  category: PartCategory;
  massKg: number;
  powerW: number;          // negative = consumes, positive = generates
  costM: number;           // million USD (simplified)
  dataGbPerDay?: number;   // instruments
  scienceValue?: number;   // instruments
  downlinkGbPerDay?: number; // comms
  tooltip: string;         // one plain-language line
}

interface Requirement {
  id: string;
  label: string;           // e.g. "Mass under 400 kg"
  metric: "mass" | "budget" | "images" | "lifetime" | "power" | "data";
  operator: "<=" | ">=";
  target: number;
}

interface Mission {
  id: string;
  name: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  budgetM: number;
  requirements: Requirement[];
  allowedOrbits: string[];
  similarRealMission: string;
}

interface Rocket { id: string; name: string; capacityKg: number; costM: number; reliability: number; orbits: string[]; }
interface Orbit { id: string; name: string; eclipseFraction: number; contactHoursPerDay: number; radiationLevel: number; lifetimeYears: number; }

interface Design { missionId: string; partIds: string[]; rocketId?: string; orbitId?: string; }

type CheckStatus = "pass" | "close" | "fail";
interface CheckResult { requirementId: string; actual: number; target: number; status: CheckStatus; }

type SegmentName = "launch" | "space" | "ground" | "user";
interface SegmentReport { segment: SegmentName; status: CheckStatus; reason: string; }

interface SimEvent { timeSec: number; type: string; severity: "info" | "warning" | "failure"; caption: string; }

interface SimResult {
  outcome: "success" | "partial" | "failed";
  score: number;
  events: SimEvent[];
  segments: SegmentReport[];
}
```

## 6. Game engine (src/game/engine)

Pure, deterministic and testable.

| Function | Responsibility |
|---|---|
| `totals(design)` | Sums mass, power, cost, data from parts |
| `powerBalance(design, orbit)` | Generation vs consumption including eclipse fraction |
| `dataBalance(design, orbit)` | Data produced vs data that can be downlinked |
| `verifyRequirements(design, mission)` | Returns `CheckResult[]` |
| `checkLaunchCompatibility(design, rocket, orbit)` | Mass, orbit and rocket match with plain-language reason |
| `simulateMission(design, mission, seed)` | Returns the event timeline and outcome |
| `scoreMission(sim, design, mission)` | Score and 4-segment report |

Rules:
- Same design plus same seed always gives the same result (seeded RNG in `lib`).
- All numbers come from the JSON catalogs, never hard-coded in components.
- Engine returns typed results and never throws for normal gameplay conditions.
- A balance script runs many random designs and prints the success rate (target roughly 30 to 60 percent for a random reasonable design).

## 7. State (src/game/store)

Zustand store holds: selected mission, selected part ids, rocket, orbit, verification results, simulation seed and result, current step, and settings (reduced motion, language if added).

- Persist to local storage with a version key. Guard against SSR (read storage only on the client).
- Provide a `reset` action and a `changeDesign` action that keeps the mission but returns to Build.

## 8. Simulation playback

The engine produces the full event timeline instantly. The Launch screen plays it back with a timer, with speed controls (1x, 2x, 4x), pause, and a caption that follows the current event. The rocket-camera visual is driven by the current event type (liftoff, separation, release, deployment, anomaly). Failure events switch the visual to the failure variant. Playback code is separate from engine code.

## 9. Animation and 3D

- GSAP is registered once (ScrollTrigger plugin) in a client-only hook.
- Use `useGSAP` with a scope ref so animations clean up correctly (important in React strict mode).
- Lenis drives scroll and is connected to GSAP's ticker and ScrollTrigger.
- Honor `prefers-reduced-motion`: skip or shorten animations and stop 3D auto-rotation.
- Three.js: one hero scene only, loaded with `next/dynamic` and `ssr: false`. Limit device pixel ratio (max 1.5), keep textures small (2K or less, webp), and show a static image fallback on mobile or when WebGL is unavailable.

## 10. AI mentor

- `POST /api/mentor` receives the design summary and simulation result, returns 2 to 4 short sentences in simple language.
- API key and model name come from environment variables (`MENTOR_API_KEY`, `MENTOR_MODEL`). Never expose them to the browser.
- Timeout of a few seconds. On any error or timeout, return text from `fallback-text.json` based on the segment reasons.
- Validate input shape, cap request size, never echo secrets, and keep prompts short.

## 11. Environment variables

| Variable | Purpose |
|---|---|
| `MENTOR_API_KEY` | AI mentor provider key (server only) |
| `MENTOR_MODEL` | Model identifier for the mentor |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata |

Provide `.env.example` with empty values. Never commit `.env.local`.

## 12. Accessibility and performance targets

- Keyboard reachable controls, visible focus, labelled form controls and buttons.
- Status is always icon plus text, never color alone.
- Minimum text size 11px for captions, body text 16px.
- Largest contentful paint kept low: optimized images with `next/image`, fonts via `next/font`.
- 3D and heavy animation must not block interaction on low-end devices.

## 13. Testing and quality

- Unit tests (or a simple script) for engine functions: mass sum, power balance, verification statuses, compatibility, determinism with a fixed seed.
- Balance script for success rate.
- `bun run lint` and `bun run build` must pass before each phase is marked done.
- Manual checklist: full playthrough on desktop and mobile, refresh mid-game, failure path, reduced motion.

## 14. Deployment

- Vercel project connected to the repository, preview on every push, production from main.
- Environment variables set in Vercel.
- Final check: open the production URL in a private window and play one full mission.


## Implemented application — 2026-11-14
The preceding architecture is the original plan. Current code adapts it without duplicating folders:
- `src/game/types.ts`: shared typed models.
- `src/game/data/catalog.ts`, `events.ts`: typed catalogs (TypeScript instead of separate JSON for type safety).
- `src/game/engine/resources.ts`, `validation.ts`, `simulation.ts`, `telemetry.ts`, `mentor.ts`, `schema.ts`: pure, deterministic logic and trust-boundary validation. Scoring/reporting currently live together in simulation.ts, not a redundant second engine.
- `src/game/store/mission-store.ts`: Zustand, versioned local persistence, schema validation, bounded 12-run history, launch snapshot and guards.
- `src/components/game/`: six screen components, shared shell, schematic spacecraft, resource panel, event-driven scene and mentor.
- `src/app/play/`: six routes plus resumable entry, scoped stylesheet and error boundary. `/play/debrief` is the added sixth-screen comparison/archive route.
- `src/app/api/mentor/route.ts`: validated 12KB streaming request limit, server-only optional provider call with 8-second timeout, deterministic fallback and no-store responses.
- `src/hooks/use-reduced-motion.ts`: live preference subscription.
- Native game scrolling; the original Lenis + ScrollTrigger remain landing-only. Static SVG/CSS mission views avoid a new WebGL requirement.
- Browser-local state gates play content. These segments export `instant = false` intentionally, because server instant-navigation validation cannot observe validated client saves.
- No user accounts, cloud storage or backend database. Secrets are optional mentor environment variables only.

See Engineering.md for exact simplified equations, Game-QA.md for validation, and Implementation.md for completion status.

## Phase 03 implementation — orbital headquarters
`/hq` is now the primary experience; `/play` remains the working accessible, non-WebGL fallback, not a removed legacy route. Landing START enters `/hq` while preserving the established landing presentation. See [HQ-Implementation.md](HQ-Implementation.md) for the validated module map and limitations.

The rendering layer (`src/components/hq/world`) consumes the same design/run state as the flight deck. It cannot decide launch readiness, invent science returns or award arbitrary results. Client-only dynamically loaded R3F owns procedural local geometry/textures, camera and lifecycle. Separate station panels provide keyboard/touch access and are collapsible. WebGL/context failure replaces only rendering, not game controls. All graphics/audio dependencies were already installed.

`src/game/store/commander-store.ts` adds a separate guarded local identity/preferences/progression save; `src/game/engine/progression.ts` calculates earned XP/achievements from evaluated engine runs. `src/game/audio/audio-manager.ts` owns gesture-created original Web Audio synthesis, independent gains and cleanup. No accounts, database, asset CDN, physics backend or extra server endpoints were introduced.
