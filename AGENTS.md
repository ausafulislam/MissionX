# MissionX

MissionX is an interactive space mission design game built by Team NASA WARRIORS for the NASA Space Apps Challenge 2026.

Before doing anything, read these files in order: docs/PRD.md, docs/Architecture.md, docs/Rules.md, docs/Phases.md, docs/Design.md, docs/Memory.md. Then work only on the current phase listed in docs/Phases.md.

## Most important rules

- Use bun only (`bun install`, `bun dev`, `bun add`, `bun run build`). Never npm, yarn or pnpm.
- Do not add dependencies without asking the owner first.
- Do not invent layouts. The owner gives design and layout instructions at runtime; ask if something is missing.
- `docs/Design.md` is read-only. Never edit it.
- Update `docs/Memory.md` after every task: what changed, files touched, decisions and next step.
- Run `bun run lint` and `bun run build` before finishing, and fix anything you introduced.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Landing-page commission — 2026-11-14 (owner-authorized override)
The owner explicitly authorizes documentation updates and the complete landing page. The new root `design.md` and the product requirements in README.md specify this commission; their tokens supersede conflicting legacy design values. Preserve the legacy design document for history. Use the existing logo unchanged. Keep landing sections in `src/components/sections`, shared navigation/footer in `layout`, and motion in a scoped client wrapper. No new engine logic is part of this phase. CTAs must open a real mission briefing, clearly identifying that the simulator is not yet available. All controls need keyboard focus, descriptive names, and reduced-motion support. Use GSAP/useGSAP cleanup, one Lenis ticker, no native smooth-scroll conflict. Validate with bun lint, TypeScript, production build, and browser viewport checks when available. The requested animation dependencies are already approved and installed in package.json.

## Complete application commission — 2026-11-14 (current override)
The owner now authorizes all remaining game phases, not just the landing. Preserve the landing visuals; replace only the unavailable briefing action with a real game link. Use existing `src/game/{data,engine,store}` and `src/components/game`, routes `/play/goal`, `/build`, `/verify`, `/launch`, `/result`, `/debrief` under `/play`. Root design.md remains the visual authority. Engine code is pure, seeded, typed, UI-independent. Catalog values are simplified educational estimates. UI must use engine outputs, not duplicate rules. Persist only validated versioned data; guard storage failures and stale/corrupted saves. Never expose mentor keys. Mentor has deterministic fallback with no key. Use native scroll on the interactive game (Lenis remains landing-only), scoped GSAP, reduced-motion support, and keyboard accessible controls. Test with `bun test`, `bun run lint`, `bun x tsc --noEmit`, `bun run build`, then browser end-to-end and responsive checks. No new runtime libraries are needed.

## Phase 03 headquarters — current override
Owner authorizes the 3D-first `/hq` experience and multiple procedural scenes, superseding the old one-hero-scene limitation. Keep the pure engineering engine and accessible `/play` route intact. Headquarters code lives in `src/components/hq`, scene modules in `src/components/hq/world`, profile/audio in `src/game/{store,audio}`. Lazy-load Canvas client-side; no browser/WebGL/audio initialization on the server. Audio requires a gesture. All station controls need a keyboard/touch equivalent, reduced motion and a fallback. Profile/settings/progression are local-only; never collect anything beyond chosen display name and game data. Product requirements migrated into README; the retired definition document is deleted by explicit request. Validate engine tests, profile/progression tests, browser entry/fullscreen/orientation/audio/WebGL fallback and actual 3D rendering, lint, types and production build. Update docs/HQ-Implementation.md honestly at handoff.

## Game-feel upgrade — 2026-11-14 (latest owner refinement)
Improve the existing HQ and accessible flight deck, never rebuild them. Current game typography/tokens are Space Grotesk headings, Inter body, #0A0A0C/#131316/#26262B neutral UI with established orange/status colors (see design.md). Reuse `useGameFeedback`, `useFlightAudio`, shared outcome/score/flight-status components and the original procedural audio score; do not duplicate event timing or resource rules in screens. Keep engine terminal failure telemetry terminal through evaluation. Tests now include audio lifecycle/signatures and telemetry regression. Audio context creation must remain gesture-only, sources bounded/disposed, and stored reduced-motion respected as well as OS preference.

## Research, Sources and Engineering Accuracy Policy

This mandatory policy applies to every future feature, change, calculation, simulation, component, mission, parameter, scientific explanation and engineering rule.

1. Research before implementation.
2. Prefer official primary sources from NASA, JPL, ESA, CSA or other relevant space agencies.
3. Use academic papers and reputable technical publications when primary sources are insufficient.
4. Record the actual provider and original URL.
5. Record the access date.
6. Identify the exact section, page or technical concept used.
7. Explain why the source is relevant.
8. Identify exactly where the information is used in MissionX.
9. Document adaptations, assumptions and simplifications.
10. Never invent scientific facts, engineering parameters, formulas, source links or provider names.
11. Never describe a simplified educational model as professional engineering simulation.
12. Never claim NASA endorsement, certification, partnership or affiliation.
13. Respect third-party terms, licences and data-use conditions.
14. If a source is unavailable, do not pretend it was verified.
15. If reliable evidence is absent, explicitly label an estimate, explain its reason and record unresolved original rationale honestly. An estimate label is not permission to pick arbitrary numbers.
16. Update docs/RESOURCES.md and docs/ENGINEERING_REFERENCES.md when sources or engineering rules change.
17. Update relevant catalog source metadata; until the approved metadata migration, record traceability in the registers and do not claim runtime IDs exist.
18. Remove or update obsolete references when implementation changes; preserve clearly labeled historical evidence.
19. No live API/external-service dependency without approval.
20. Every new feature must trace from implementation to research evidence or an explicit educational assumption.

### Mandatory Future Change Workflow

1. **Research:** identify sources needed for the proposed change.
2. **Source verification:** open original resources; record what was actually reviewed and what remains inaccessible.
3. **Implementation plan:** identify files, calculations, components and systems that will change.
4. **Approval:** wait when project rules require it. New layouts and protected-document edits still require their own approval; docs/Design.md remains read-only.
5. **Implementation:** make the smallest necessary changes; preserve working features and static data architecture.
6. **Documentation:** update source register, engineering references, catalog provenance and relevant project documentation.
7. **Testing:** validate behavior and that the cited source supports the actual claim. Run bun run lint, bun test and bun run build; check complete flow, success/partial/failure, compatibility, source-ID resolution, formulas, links and unsupported claims as applicable. Report unavailable checks honestly; never confuse retrieval with technical validation.
8. **Change record:** update CHANGELOG.md, docs/Memory.md and docs/Phases.md; increment package.json patch; update README only for user-facing changes.

A feature is not complete until implementation and research documentation are both complete. Use Bun only; no new dependencies without approval. Source links do not imply endorsement or permission to copy assets/code/text.

### Independence and third-party data

MissionX is an independent educational project created by Team NASA WARRIORS for the NASA International Space Apps Challenge 2026. It is not affiliated with, endorsed by, or sponsored by NASA or any other space agency. NASA is not responsible for information contained on non-U.S. Government websites.

Preserve the existing user-facing disclaimer. Distinguish NASA, CSA, academic, commercial and community providers. Review item-specific rights before reuse; do not copy without permission or compatible terms. Full disclaimer in the user-facing credits area is pending the separately approved UI task, not implemented by this policy update.
