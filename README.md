<p align="center"><img src="public/images/logo.png" alt="MissionX" width="360" /></p>

# MissionX — Design. Simulate. Learn.

**An educational space-mission design game by [Team NASA WARRIORS](https://www.spaceappschallenge.org/2026/find-a-team/nasa-warriors/), Karachi, Pakistan, for the NASA International Space Apps Challenge 2026.**

[![Next.js 16.4.6](https://img.shields.io/badge/Next.js-16.4.6-black)](https://nextjs.org/docs)
[![Bun 1.3.14](https://img.shields.io/badge/Bun-1.3.14-f9f1e1)](https://bun.sh/docs)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](tsconfig.json)

[**Play MissionX**](https://missionx-black.vercel.app/) · [Documentation](docs/README.md) · [Team page](https://www.spaceappschallenge.org/2026/find-a-team/nasa-warriors/) · [Report a bug](https://github.com/ausafulislam/MissionX/issues/new?template=bug_report.yml)

![MissionX landing page with mission-design introduction and launch controls](docs/images/missionx-landing.webp)

## Contents

- [Why MissionX?](#why-missionx)
- [Implemented features](#implemented-features)
- [How to play](#how-to-play)
- [Mission catalog](#mission-catalog)
- [Screenshots](#screenshots)
- [Run locally](#run-locally)
- [Environment](#environment)
- [Development and checks](#development-and-checks)
- [Architecture](#architecture)
- [Scientific scope and sources](#scientific-scope-and-sources)
- [Documentation](#documentation)
- [Team and participation](#team-and-participation)
- [Limitations and future work](#limitations-and-future-work)
- [License and attribution](#license-and-attribution)
- [Independence disclaimer](#independence-disclaimer)

## Why MissionX?

Space engineering trade-offs can stay abstract when students encounter spacecraft, launchers, power and communications as separate topics. MissionX connects them in one playable loop: select a science goal, assemble a spacecraft, verify its resources, launch a seeded mission, and learn from the returned science and segment report.

It is designed for students aged 12–18, educators and space enthusiasts. No account, payment or remote AI service is required for gameplay.

## Implemented features

- Three scenarios: Moon Mapping, Sun Watch and Mars Orbiter.
- 26 catalog parts across eight categories, three fictional launch services and six orbit configurations.
- Live mass, budget, power, battery, storage, downlink, science and lifetime calculations.
- Typed verification with blocking failures and disclosed nonblocking operational risks.
- 3D-first headquarters at `/hq`, first-use guidance, and a semantic flight-deck alternative at `/play`.
- Seeded launch reliability and events; representative end-of-life energy/data operations.
- Six sequential arrival configuration reviews shared by HQ and the flight deck; a failed launch never receives arrival credit.
- Science, engineering and efficiency score breakdown; Launch / Space / Ground / User explanations.
- Local commander preferences, progression, saved runs and debrief/comparison tools.
- Downloadable sectioned PDF reports with parameter IDs, shared diagnostic group/finding counts, captured new-run inputs and explicit legacy-reconstruction caveats.
- Deterministic local mentor; optional server-side remote advice with fallback.
- Gesture-enabled procedural audio, reduced-motion controls and WebGL compatibility fallback.

These are implementation descriptions, not claims of universal accessibility, device performance or scientific validation.

## How to play

**Goal → Build → Verify → Launch → Result**

1. Choose a mission and inspect its mass, budget, science and lifetime requirements.
2. Select parts, launcher and science orbit. Use a verified baseline to explore a known viable configuration, then compare alternatives.
3. Resolve blocking checks. Nonzero downlink/storage deficits may be accepted as warnings; they can reduce actual science return.
4. Start countdown. Successful deployment leads to schematic arrival and six configuration reviews before science operations. Playback time is compressed, not physical travel time.
5. Read the result, inspect lost/received data and segment explanations, download the report, and redesign.

See [gameplay](docs/Gameplay.md), [verification](docs/Verification.md), [simulation](docs/Launch-and-Simulation.md) and [PDF reports](docs/PDF-Reports.md).

## Mission catalog

All numbers below are **authored educational scenario inputs**, not real mission specifications. Budget includes parts for the fleet and one launch.

| Mission | Fleet | Mass limit | Budget (million USD) | Science target (points) | Lifetime (months) |
|---|---:|---:|---:|---:|---:|
| Moon Mapping | 1 | 550 kg | 85 | 45 | 12 |
| Sun Watch | 4 identical craft | 1,000 kg | 180 | 160 | 12 |
| Mars Orbiter | 1 | 900 kg | 170 | 75 | 24 |

Sun Watch observes the Sun **from Earth orbit**; it does not fly to the Sun. Real mission links are educational context, not numeric catalog sources. [Catalog details](docs/Missions.md).

## Screenshots

Actual local application captures at 1440 × 1000, 2026-11-14, before correction release 0.1.11. They show real earlier UI; readiness/status labels have since been corrected. HQ screenshots use the application's **WebGL compatibility mode** and reduced motion; they are not proof of hardware 3D performance. Images are optimized, not fabricated. [Capture details and gallery](docs/images/README.md).

| Build | Verify |
|---|---|
| ![Flight-deck builder with baseline component catalog and resource summary](docs/images/spacecraft-builder.webp) | ![Prelaunch verification with requirement checks and flight seed](docs/images/design-verification.webp) |

| Arrival review | Result |
|---|---|
| ![First of six arrival configuration reviews with modeled and unmodeled findings](docs/images/arrival-diagnostics.webp) | ![Completed Moon Mapping mission report with score and returned science](docs/images/mission-result.webp) |

## Run locally

Install [Bun 1.3.14](https://bun.sh/docs/installation), then:

```sh
git clone https://github.com/ausafulislam/MissionX.git
cd MissionX
bun install --frozen-lockfile
bun run dev --hostname 0.0.0.0
```

Open `http://localhost:3000`. For a production server:

```sh
bun run build
bun run start --hostname 0.0.0.0
```

For hosted previews, use the preview's public address rather than localhost. Browser requests to the mentor use a same-origin relative URL. The public deployment is [missionx-black.vercel.app](https://missionx-black.vercel.app/); deployment account settings and automatic preview rules are not established by this repository.

## Environment

No environment file is needed for ordinary play. Optionally copy `.env.example` to `.env.local` and configure:

| Variable | Actual use |
|---|---|
| `MENTOR_API_KEY` | Server-only key for `api.openai.com`; never expose it to the browser. |
| `MENTOR_MODEL` | Optional remote model; defaults to `gpt-4o-mini`. Provider availability is not guaranteed. |
| `NEXT_PUBLIC_SITE_URL` | Present in the example but currently unused in source; setting it does not change canonical metadata or PDF links. |

Only an explicit mentor request uses the remote service when configured; design/checks/result are sent, not commander identity. Missing key, timeout or provider failure uses local advice. An initial application load still requires the server/assets: “no AI required” does not mean an offline-installable PWA. [Mentor/privacy details](docs/Mentor.md).

## Development and checks

Use Bun only; do not add dependencies without owner approval.

```sh
bun run lint
bun run typecheck
bun test
bun run balance
bun run build
```

`balance` explores seeded designs; it is not a scientific certification or a guarantee that random configurations succeed. Browser journeys and screenshots use separate local QA tooling, not an advertised package script. [Testing and limitations](docs/Testing.md).

## Architecture

Next.js App Router + React + strict TypeScript, Tailwind CSS, GSAP, React Three Fiber/Drei/Three.js, Zustand and pdf-lib. Lenis is limited to the landing experience. No application database or authentication system is implemented.

```text
src/app/                 landing, HQ, /play routes, mentor API
src/components/          landing/layout, HQ/world and flight-deck UI
src/game/data/           static JSON catalogs and authored assumptions
src/game/engine/         pure calculations, verification, simulation, diagnostics
src/game/store/          validated local saves and commander preferences
src/game/audio/          procedural Web Audio score and effects
src/game/report/         report content, measured layout and PDF export
```

The store and screens call the engine; the engine does not import the UI. See [current architecture](docs/Architecture.md).

## Scientific scope and sources

MissionX uses locally authored educational parameters, not NASA numerical validation. Diagnostics evaluate configured requirements, not real spacecraft health; incomplete findings remain NOT EVALUATED with group/finding counts. The journey is schematic. MissionX does not use GMAT internally and is neither NASA-certified nor NASA-endorsed.

NASA's mission-design presentation is a conceptual reference for mission segments and requirements. Historical adoption of its method is not established. Quicksat is conceptual reading, not proven formula derivation. Other agency/community links have individually scoped classifications. They do **not** supply MissionX's fictional part prices, reliability values, science points, scoring weights or synthetic orbit factors.

The operations model integrates four representative end-of-life days with 48 steps per orbit, finite memory, energy limitations and synthetic contact windows. It is not a trajectory, thermal, radiation, propulsion or RF solver. Sources, formulas, units, evidence confidence and unresolved rationale are separated in [the resource register](docs/RESOURCES.md) and [engineering references](docs/ENGINEERING_REFERENCES.md), with [field-level provenance](docs/DATA_SOURCES.md).

## Documentation

Start at the [documentation index](docs/README.md). It separates current guides, research registers, historical implementation records and protected planning/design documents.

## Team and participation

Built by **[Team NASA WARRIORS](https://www.spaceappschallenge.org/2026/find-a-team/nasa-warriors/)**, Karachi, Pakistan, for the NASA International Space Apps Challenge 2026, challenge **Space Mission Design Game**, Universal Event. The linked Space Apps page is participant-submitted content, not an agency endorsement. No individual roles, awards or member identities are asserted here.

See [contributing](CONTRIBUTING.md), [code of conduct](CODE_OF_CONDUCT.md), [security](SECURITY.md) and [citation metadata](CITATION.cff). There is currently no published private reporting contact; do not disclose vulnerabilities or personal information in public issues.

## Limitations and future work

Known limits include synthetic orbit/contact inputs, simplified single-incident operations, shared current catalog inputs in some historical replays, no independent convergence/sensitivity study, and no tagged-PDF accessibility certification. Full physical-device WebGL/audio and screen-reader validation remain separate checks.

**Planned, not implemented or promised:** parameter-level source-ID migration, deeper scientific model review, convergence studies and broader device/accessibility testing. Earlier PRD stretch ideas (such as multiplayer, leaderboard or Urdu localization) are not current features.

## License and attribution

MissionX software and associated documentation are licensed under the [MIT License](LICENSE), copyright © 2026 Team NASA WARRIORS. Retain the copyright and permission notice when redistributing copies or substantial portions. Third-party fonts and dependencies retain their own licenses. The software license does not establish ownership of third-party material or grant trademark/agency endorsement rights; see [asset attribution and unresolved rights](docs/Asset-Attribution.md). No NASA insignia or endorsement badge is supplied.

## Independence disclaimer

MissionX is an independent educational project created by Team NASA WARRIORS. It is not affiliated with, endorsed by, or sponsored by NASA or any other government space agency. NASA and other organization names, resources, and references are acknowledged for their respective educational or informational contributions. Their inclusion does not imply endorsement.
