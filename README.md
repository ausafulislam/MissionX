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

No new application dependencies were needed. GSAP, @gsap/react and Lenis were already declared. No environment variables are required for the landing page. The simulator is not implemented yet: start actions open mission briefings, not a fake playable experience. Engineering resource numbers are illustrative only.

Validation:
```bash
bun run lint
bunx tsc --noEmit
bun run build
```
