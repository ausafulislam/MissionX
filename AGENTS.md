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
The owner explicitly authorizes documentation updates and the complete landing page. The new root `design.md` and `define.md` specify this commission; their tokens supersede conflicting legacy design values. Preserve the legacy design document for history. Use the existing logo unchanged. Keep landing sections in `src/components/sections`, shared navigation/footer in `layout`, and motion in a scoped client wrapper. No new engine logic is part of this phase. CTAs must open a real mission briefing, clearly identifying that the simulator is not yet available. All controls need keyboard focus, descriptive names, and reduced-motion support. Use GSAP/useGSAP cleanup, one Lenis ticker, no native smooth-scroll conflict. Validate with bun lint, TypeScript, production build, and browser viewport checks when available. The requested animation dependencies are already approved and installed in package.json.

## Complete application commission — 2026-11-14 (current override)
The owner now authorizes all remaining game phases, not just the landing. Preserve the landing visuals; replace only the unavailable briefing action with a real game link. Use existing `src/game/{data,engine,store}` and `src/components/game`, routes `/play/goal`, `/build`, `/verify`, `/launch`, `/result`, `/debrief` under `/play`. Root design.md remains the visual authority. Engine code is pure, seeded, typed, UI-independent. Catalog values are simplified educational estimates. UI must use engine outputs, not duplicate rules. Persist only validated versioned data; guard storage failures and stale/corrupted saves. Never expose mentor keys. Mentor has deterministic fallback with no key. Use native scroll on the interactive game (Lenis remains landing-only), scoped GSAP, reduced-motion support, and keyboard accessible controls. Test with `bun test`, `bun run lint`, `bun x tsc --noEmit`, `bun run build`, then browser end-to-end and responsive checks. No new runtime libraries are needed.
