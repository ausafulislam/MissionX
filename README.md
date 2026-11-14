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

The landing page uses the original logo, self-hosted Google Fonts, original generated orbital imagery, GSAP/ScrollTrigger and Lenis. See [design.md](design.md) for the current owner-approved design system and [define.md](define.md) for scope. The legacy docs remain available as project history.

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

Local progress and up to 12 runs are stored in the browser. No account, database or keys required. Browser storage can be cleared from the game's New Mission control (history is retained for comparison).

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
