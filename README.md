# MissionX

**Design it. Launch it. Learn why.**

MissionX is an interactive game where students design, launch and run a complete space mission, balancing budget, mass, power and data, then learn why it succeeded or failed.

## NASA Space Apps Challenge 2026

Built by **Team NASA WARRIORS** for the [NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/), under the challenge **Space Mission Design Game**.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/)
- [Three.js](https://threejs.org/) with [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Lenis](https://lenis.darkroom.engineering/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [bun](https://bun.sh/)

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Build

```bash
bun run build
```

## Documentation

- [docs/PRD.md](docs/PRD.md) — Product requirements, missions, gameplay loop, scope and submission checklist.
- [docs/Architecture.md](docs/Architecture.md) — Tech stack, routes, folder structure, data models and engine contracts.
- [docs/Rules.md](docs/Rules.md) — Agent boundaries, code/design/tech rules and the definition of done.
- [docs/Phases.md](docs/Phases.md) — Build phases, goals and the current phase to work on.
- [docs/Design.md](docs/Design.md) — Historical design baseline; current landing specification is [design.md](design.md).
- [docs/Memory.md](docs/Memory.md) — Living progress log: status, decisions, risks and next steps.

AI agents should start from [AGENTS.md](AGENTS.md).

## Team

**Team NASA WARRIORS**

## Disclaimer

Not affiliated with or endorsed by NASA.

## Cinematic landing page (November 2026)

The landing page uses the original logo, self-hosted Google Fonts, original generated orbital imagery, GSAP/ScrollTrigger and Lenis. See [design.md](design.md) for the current owner-approved design system and the product requirements below for scope. The legacy docs remain available as project history.

No new application dependencies were needed. GSAP, @gsap/react and Lenis were already declared. No environment variables are required for the landing page. The complete game is now implemented: landing briefings link to mission selection and the six-screen flight deck. Engineering resource numbers are illustrative only.

Validation:
```bash
bun run lint
bunx tsc --noEmit
bun run build
```

## Full game application

Routes: `/play` resumes locally; `/play/goal`, `/play/build`, `/play/verify`, `/play/launch`, `/play/result`, `/play/debrief`. Game code follows existing `src/game/data`, `src/game/engine`, `src/game/store`; screens live in `src/components/game`. All engineering values are simplified educational estimates, not flight calculations.

```bash
bun test
bun run lint
bun x tsc --noEmit
bun run build
```

Local progress and up to 12 runs are stored in the browser. No account, database or keys required. New Mission clears the active design while retaining history. HQ Settings provides a confirmed full local-data reset.

Optional mentor environment: `MENTOR_API_KEY`, `MENTOR_MODEL` (default `gpt-4o-mini`). Server-only OpenAI-compatible completion at api.openai.com; no client keys. Missing service/key/network uses deterministic local recommendations. The deployment environment must allow the provider host to enable remote advice. No remote service is required for gameplay.

Implementation checklist: [docs/Implementation.md](docs/Implementation.md). QA scope and limitations: [docs/Game-QA.md](docs/Game-QA.md). Catalog balance probe: `bun run balance`.


### Source map
- `src/components/game/` — six screens and reusable flight-deck UI
- `src/game/data/` — typed component, mission, launcher, orbit and event catalogs
- `src/game/engine/` — resource calculations, verification, seeded outcomes, scoring, telemetry, mentor and tests
- `src/game/store/` — guarded Zustand state and versioned local saves
- `src/app/api/mentor/` — optional server-only AI with deterministic fallback
- `scripts/balance.ts` — repeatable catalog balance diagnostics
- `tests/mentor-api.test.ts` — request validation, mocked provider and offline fallback tests

Exact model and caveats: [docs/Engineering.md](docs/Engineering.md). All six game screens reuse the landing's original MissionX branding and four-font system. No runtime dependencies were added for this phase.

## Product requirements (migrated from the retired product-definition document)
MissionX is an independent educational browser game for students ages 12–18, educators and space enthusiasts, by Team NASA WARRIORS for the NASA International Space Apps Challenge 2026. It is not affiliated with or endorsed by NASA. The established landing remains unchanged visually. The scientific journey remains GOAL → BUILD → VERIFY → LAUNCH → RESULT, with saved-run debrief/comparison. Moon Mapping, four-identical-satellite Sun Watch and Mars Orbiter each have numeric mass, budget, science and lifetime requirements. Parts, batteries, communications, launcher, orbit and seeded events determine outcomes. All values are simplified educational estimates. No registration, unnecessary personal data, payments or cloud account is required. Local saves and deterministic mentor advice work without external services.

## Phase 03 — immersive headquarters
The primary entry is `/hq`: device/orientation handling → real module/asset initialization → commander identity → cinematic menu → interactive 3D headquarters. Five stations connect mission planning, spacecraft assembly, preflight/launch control, results and archive. The existing `/play` screens remain an accessible, low-resource flight-deck alternative and preserve existing saves. Display name, settings and earned progression are local-only. Original procedural geometry/textures and Web Audio synthesis avoid unlicensed assets and broken external URLs. Three.js, R3F and Drei are already installed; no extra rendering, physics or audio dependency is needed.

### Headquarters controls and local data
- Click a 3D station sign/platform or use the bottom station dock. Drag to inspect, scroll/pinch to zoom, **Reset View** to return; station side panels can be minimized. Every mission/engineering action also has a keyboard/touch control.
- Choose a mission, install a verified baseline or assemble catalog parts, pass **every** preflight check, and initiate a seeded flight. Start/pause/speed/skip playback from the launch console. Results and archive use actual engine returns.
- Settings independently control master/music/effects, graphics, reduced motion and camera sensitivity. English is the only installed language. Fullscreen/orientation/audio are optional browser capabilities, never prerequisites for play.
- `missionx-commander-v1` stores your display name, preferences and earned progression; the existing flight-deck key stores your design and up to 12 flights. New Mission retains history; **Settings → Reset all local game data** removes both after confirmation. No data is sent to an account or analytics service.
- Development: `bun dev --hostname 0.0.0.0`; production: `bun run build && bun run start --hostname 0.0.0.0`. No new environment variables are needed for HQ.

Implementation/QA evidence and known limitations: [docs/HQ-Implementation.md](docs/HQ-Implementation.md). The 3D launch is schematic, not a physically accurate flight calculation. Hardware performance, human audio listening and Safari/iOS/Android release checks remain necessary.

### Connected game feel
Both `/hq` and `/play` now share original scene-specific procedural music and action sounds, live engineering feedback, synchronized launch audio/status, animated scores and earned-flight result reveals. The engine remains separate and unchanged apart from a terminal-failure telemetry correction. Current game typography is Space Grotesk/Inter with neutral black surfaces and orange/status feedback. See [docs/Game-Feel-Upgrade.md](docs/Game-Feel-Upgrade.md) for implementation and QA boundaries. No added dependencies or audio downloads are required.

### Engineering and ground operations (v0.1.3)
Catalogs now use static JSON with expandable source/estimate notes. Preflight includes EOL power, usable eclipse battery, normalized margins and computer memory. Blocking requirements must pass; positive-capacity downlink/storage warnings can be flown to explore reduced science return.

The seeded simulation tracks battery, sunlight/eclipses, finite storage, contact windows and generated → transmitted → Earth-received science. Data still onboard or discarded earns no credit. Open the existing result report's **Operations Ledger & Scoring Model** for the trace, assumptions and causal explanations. Historical flights retain their original model; restore/redesign to compare with a new run. Layouts and branding are unchanged. Exact simplified model and source review: [docs/Engineering.md](docs/Engineering.md), [docs/Engineering-Audit.md](docs/Engineering-Audit.md).
