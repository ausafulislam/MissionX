# Phases: MissionX

**Current owner directive (2026-11-14):** execute the complete application phase across original phases 2–10. The previous landing-only scope is complete. Current implementation/validation checklist: [Implementation.md](Implementation.md). Deployment and event submission remain owner-operated Phase 11 tasks.

Build in small phases. Work only on the current phase. Mark a phase done only when its "Done when" list is complete, then update `Memory.md`.

Hackathon window: submission closes 15 Nov 2026, 11:59 PM (local time). Aim to freeze features by mid afternoon on 15 Nov and submit with a safety buffer.

**Time-box rule:** the landing page is built first, but it must not eat the whole schedule. The game itself is what judges evaluate. Parallel work (Phase 2 engine and data) can run at the same time if teammates are available.

---

## Phase 0: Project foundation

**Goal:** Clean, branded starting point.

**Tasks**
- Remove all default Next.js boilerplate (logos, demo content, default CSS, unused assets).
- Set project name, description and metadata for MissionX.
- Load fonts (Space Grotesk, Inter) with `next/font`.
- Add design tokens from `Design.md` to `globals.css` and Tailwind.
- Create the folder structure from `Architecture.md`.
- Add `.env.example`, README, and a simple favicon.

**Done when**
- App runs with `bun dev`, `bun run lint` and `bun run build` pass.
- No leftover references to the default template.

---

## Phase 1: Landing page (start here)

**Goal:** A polished landing page that explains MissionX and sends people into the game.

**Important:** The layout, sections and visual direction for the landing page are NOT defined in these files. The owner provides them at runtime, section by section. Ask if anything is missing.

**Tasks**
- Build the shared Navbar and Footer components using the tokens in `Design.md`.
- Build the landing page one section at a time, following the owner's instructions for each.
- Add scroll and entrance animations with GSAP and smooth scrolling with Lenis, as instructed.
- Add the 3D Earth scene only if the owner asks for it, and only after a static version works.
- Make every call to action link to `/play`.
- Include the footer disclaimer: "Not affiliated with or endorsed by NASA."
- Responsive pass for mobile and tablet.
- Accessibility pass: focus states, alt text, reduced motion.

**Done when**
- All requested sections are built and responsive.
- Primary buttons open the game entry route.
- Lint and build pass, page loads fast, no console errors.
- Time-box respected (suggested: about 3 hours).

---

## Phase 2: Game data and engine

**Goal:** Working game rules with no UI.

**Tasks**
- Create shared types in `src/types`.
- Create JSON catalogs in `src/game/data`: missions (3), parts (about 12 to 16), rockets (3), orbits (3 to 4), events (4 to 5), fallback explanation text.
- Mark every value as a simplified approximation.
- Implement engine functions: totals, power balance, data balance, requirement verification, launch compatibility, mission simulation (seeded), scoring and 4-segment report.
- Add the seeded random number helper in `src/lib`.
- Write unit tests or a script for the engine, plus a balance script that prints the success rate over many random designs.

**Done when**
- Same design and seed always produce the same result.
- Balance script shows a reasonable success rate (roughly 30 to 60 percent).
- Engine has no UI imports and passes lint and build.

---

## Phase 3: Game shell and state

**Goal:** Navigable game skeleton.

**Tasks**
- Create the `/play` routes for Goal, Build, Verify, Launch and Result.
- Build the Zustand store with persistence (client only, try/catch).
- Build the shared game top bar with the 5-step progress indicator.
- Add step guards (cannot skip ahead), back navigation, reset and "change design".
- Add error and not-found boundaries.

**Done when**
- Can move through all five steps with placeholder content.
- Refreshing the page restores progress.

---

## Phase 4: Goal screen (mission and requirements)

**Goal:** Player picks a mission and sees measurable requirements.

**Tasks**
- Mission selection with 3 missions.
- Requirements list for the selected mission.
- Continue to Build.

Screen layout and visuals are given by the owner at runtime.

**Done when**
- Selection is saved in the store and drives the next screens.

---

## Phase 5: Build screen

**Goal:** Core gameplay screen.

**Tasks**
- Parts browsing by category and adding or removing parts.
- Live Budget, Mass, Power and Data meters from engine calculations.
- Inline warnings with exact amounts (over mass, over budget, power shortage).
- Spacecraft visual that reflects chosen parts.
- Tooltips for technical terms.

**Done when**
- Every part change updates meters instantly and correctly.
- Warnings are accurate and understandable.

---

## Phase 6: Verify screen (checks, rocket and orbit)

**Goal:** Prove the design meets requirements and pick the launch setup.

**Tasks**
- Requirement checks with Pass, Close, Fail.
- Rocket and orbit selection.
- Compatibility check with a plain-language reason.
- Launch button disabled until all checks pass.

**Done when**
- Impossible combinations are blocked with a clear explanation.
- Launch is only possible with a valid design.

---

## Phase 7: Launch screen (simulation)

**Goal:** Watch the mission happen.

**Tasks**
- Play back the engine timeline with pause and speed controls (1x, 2x, 4x).
- Live camera style sequence for liftoff, stage separation, satellite release and deployment, plus failure variants (rocket breakup, satellite lost).
- Timeline stages, live readouts, event captions and warning banners.
- Orbit map showing the satellite position.
- "See results" enabled when the mission ends, plus a skip option.

**Done when**
- Success and failure runs both play correctly and end on the Result screen.
- Animation respects reduced motion and runs smoothly on mobile.

---

## Phase 8: Result screen

**Goal:** Explain why the mission worked or failed.

**Tasks**
- SUCCESS, PARTIAL or FAILED state with score.
- 4-segment report (Launch, Space, Ground, User), each with status and one sentence.
- Similar real NASA mission line.
- Try again and change design actions.

**Done when**
- Every outcome path shows a correct and understandable explanation.

---

## Phase 9: AI mentor

**Goal:** Plain-language explanations that feel personal.

**Tasks**
- `/api/mentor` route with input validation, size limit and timeout.
- Mentor panel on the Result screen.
- Fallback text from `fallback-text.json` on any failure.

**Done when**
- Works with a valid key and degrades gracefully without one.
- No secrets reach the browser.

---

## Phase 10: Polish and quality

**Goal:** Reliable, accessible, ready to show.

**Tasks**
- Tutorial or coach marks on the Build screen.
- Mobile and tablet pass on every screen.
- Accessibility pass (keyboard, focus, labels, color-independent status).
- Performance pass (images, fonts, 3D fallback).
- Balance tuning using the balance script.
- Full playthrough testing, including refresh mid-game and failure paths.
- Optional stretch items if time remains: compare designs, Urdu and English toggle, team mode.

**Done when**
- No blocking bugs, lint and build pass, a stranger can play a full mission without help.

---

## Phase 11: Submission

**Goal:** Ship it.

**Tasks**
- Deploy to Vercel and test the production URL in a private window.
- Make the repository public with a clear README.
- Record a short demo video of a full mission.
- Write the project description (problem, solution, NASA resources used, what makes it different).
- Fill in the Space Apps submission form and submit with a safety buffer before 11:59 PM on 15 Nov.

**Done when**
- Submission is confirmed on the Space Apps site.

---

## Suggested time plan

| When | Focus |
|---|---|
| 14 Nov, first half | Phase 0, Phase 1 (time-boxed), Phase 2 in parallel |
| 14 Nov, second half | Phase 3, 4, 5 (playable Build screen) |
| 14 Nov night | Phase 6, 7 start (one full playable loop) |
| 15 Nov morning | Phase 7 finish, Phase 8, Phase 9 |
| 15 Nov midday | Phase 10, feature freeze |
| 15 Nov afternoon to evening | Phase 11, submit early |

## Owner-authorized Phase03 headquarters commission — implemented 2026-11-14
The subsequent owner commission supersedes the original incremental phase schedule above. `/hq` now supplies the immersive orbital headquarters and integrates the completed engineering engine, while `/play` remains a functional accessible alternative. Delivery, test evidence and remaining release checks are tracked in [HQ-Implementation.md](HQ-Implementation.md). Public deployment, physical-device/audio listening checks and event submission remain separate release tasks; no event submission is claimed.

## Engineering completion commission — 2026-11-14
Current owner commission: improve in place, no layout changes without design approval. PRD/Architecture and legacy Design are protected. Task 1: audit and static sourced catalogs (v0.1.1). Next: engineering margins/verification, then operations/ground delivery and educational report integration. Track exact evidence and boundaries in Engineering-Audit.md and Memory.md; patch version/test/build/commit after each completed task.
- Engineering task 2 (0.1.2): explicit EOL/battery assumptions, margins, finite memory, advisory vs blocking verification. Existing layouts retained; next is deterministic operations/data delivery integration.
- Engineering task 3 (0.1.3): time-stepped operations/finite memory/ground reception/science credit, causal segment reports, source/scoring ledgers in existing cards, model-aware saved-flight preservation. Next: catalog breadth and final browser regression; standalone operations-panel design remains owner-controlled.

## Engineering completion task 4 — v0.1.4
Catalog breadth, payload/pointing compatibility, explicit energy ledger, and regression checks complete. 48 unit tests/lint/build pass; Chromium desktop/tablet/phone mission flows and desktop HQ flow pass. Result→redesign route guard fixed. Operations controls, difficulty selection and comparative-history presentation remain pending owner layout direction; automatic operations are implemented, not interactive ground command gameplay.

## Resource documentation task 1 — v0.1.5 (approved)
Source register and engineering reference inventory created; permanent source policy appended to AGENTS.md/Rules.md; stale engineering summary consolidated. Documentation-only: source IDs currently resolve within the register, not runtime catalogs. No game/UI behavior changed. Next approval: migrate catalog metadata and add source-resolution/coverage tests. User-facing source disclosures remain a separate approval scope.

## Cinematic launch/report commission — task1 v0.1.6
Approved sequence: lifecycle/identity/diagnostics → continuous journey → interactive commissioning/audio → PDF export → results/regression. First foundation implemented without UI or simulation-score changes. Next integrate existing scenes/controllers; pdf-lib approved but not installed. No completion claim for cinematic visuals, gating UI or PDF yet.

## Cinematic commission — visible integration v0.1.7
Connected HQ continuous launch/journey and mission-specific arrival, flight-deck schematic, sequential commissioning gate/review and results PDF download. Commander/completion snapshot retained. All previously approved main systems are connected to the UI; no further approval pause. No real navigation/thermal/RF certification. See Memory for executed tests and remaining physical-device/PDF-accessibility limits.
