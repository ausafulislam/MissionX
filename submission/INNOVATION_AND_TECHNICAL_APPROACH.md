# Innovation and technical approach

MissionX combines a mission-design workflow, inspectable constraints and procedural presentation in one application. These are project strengths, not claims that no similar educational tool exists.

- **Connected decisions:** science goals → component selection → live budgeting → compatibility/requirement checks → seeded mission → report.
- **Resource consequences:** mass/cost scale with fleet where appropriate; power/battery checks are per spacecraft. Finite memory/contact windows and power availability constrain received science data.
- **Repeatable events:** the local TypeScript engine uses seeded authored launch reliability and one operational event. Playback visualizes an already calculated result; it does not calculate a trajectory.
- **Honest diagnostics:** FAIL > WARNING > NOT EVALUATED > PASS, empty unevaluated, separate group/finding counts and inspectable evidence. Installation presence is not measured hardware health.
- **Outcome plus performance:** SUCCESS/PARTIAL/FAILED derives from requirements/operations, while the Weighted Performance Score is independently rounded. Even100 can be PARTIAL.
- **Historical records:** bounded schema 1 snapshots preserve selected inputs, assumptions, checks/balances and results. A fixed reader validates older records; missing legacy inputs are disclosed; unknown supplied schemas are not silently rebuilt.
- **Multiple presentations:** procedural Three.js/R3F HQ plus a semantic `/play` flight deck and no-WebGL compatibility controls. Device/accessibility certification is not claimed.
- **Shared reporting:** the same diagnostic projection drives UI and pdf-lib reports with parameter provenance and limitations.

## Implementation map

Next.js App Router/React/TypeScript and scoped CSS/Tailwind form the UI. Zustand owns browser-local mission/profile state. `src/game/data` holds static catalogs; `src/game/engine` owns resources, checks, operations, simulation and snapshots; `src/game/report` owns report content/layout. GSAP supports animation; Lenis is landing-only. Optional server-side OpenAI HTTP advice has validated input and local fallback but no built-in rate limiter. No database/authentication or NASA service integration exists.

See [README architecture/data flow](../README.md#technology-and-architecture), [component map](../docs/Components.md), [formula register](../docs/ENGINEERING_REFERENCES.md) and [test evidence](../docs/Testing.md).
