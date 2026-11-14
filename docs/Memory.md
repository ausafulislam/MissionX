# Memory: MissionX

Living progress file. The AI agent reads this at the start of every session and updates it after every task, so no context is lost when switching chats or tools and the whole codebase does not need to be re-read.

Keep entries short. Newest entries on top in each log section.

---

## Project snapshot

- **Project:** MissionX (NASA Space Apps Challenge 2026, challenge: Space Mission Design Game)
- **Team:** NASA WARRIORS
- **Package manager:** bun
- **Stack:** Next.js (App Router), TypeScript, Tailwind, GSAP, Three.js (React Three Fiber), Lenis, Zustand
- **Deadline:** 15 Nov 2026, 11:59 PM (local time). Aim to submit early.
- **Current phase:** Phase 1 (Landing page)
- **Last updated:** 2026-11-14 UTC

## Status by phase

| Phase | Status | Notes |
|---|---|---|
| 0 Project foundation | Not started | |
| 1 Landing page | Done | Cinematic landing + mission briefings; simulator integration awaits engine phase. |
| 2 Game data and engine | Not started | |
| 3 Game shell and state | Not started | |
| 4 Goal screen | Not started | |
| 5 Build screen | Not started | |
| 6 Verify screen | Not started | |
| 7 Launch screen | Not started | |
| 8 Result screen | Not started | |
| 9 AI mentor | Not started | |
| 10 Polish and quality | Not started | |
| 11 Submission | Not started | |

Status values: Not started, In progress, Done, Blocked.

## Done log

- 2026-11-14: Completed owner-requested cinematic landing page. Original logo reused; orbital and lunar assets generated locally. Added responsive navigation, five-stage keyboard-accessible tabs, mission briefing dialogs, interactive illustrative resource monitor, mission segments, final CTA and footer. GSAP/useGSAP + ScrollTrigger and ticker-synced Lenis with full cleanup and reduced-motion media queries. No engine existed and none was overwritten.

## In progress

- (nothing yet)

## Decisions made

- GSAP is the only animation library. Anime.js is not used.
- Three.js is used for one hero scene only, with a static image fallback.
- Game engine is pure TypeScript and deterministic (seeded). UI never calculates game rules.
- Design tokens come from Design.md. Page layouts are provided by the owner at runtime.

## Owner instructions given at runtime

Record layout and design instructions the owner gives during the build, so they are not lost.

- (nothing yet)

## File map (add important files as they are created)

| Path | What it does |
|---|---|
| (none yet) | |

## Assets and credits

Keep a list of every external image or texture, with source and license, for NASA imagery credit.

| File | Source | License or credit |
|---|---|---|
| (none yet) | | |

## Known issues and risks

- (none yet)

## Open questions for the owner

- (none yet)

## Next steps

1. Finish Phase 0 (clean boilerplate, tokens, fonts, folders).
2. Start Phase 1 and ask the owner for the first section's layout instructions.


## Landing implementation handoff — 2026-11-14
- Documentation updated before coding: AGENTS.md, define.md, design.md, README.md. Legacy docs/Design.md preserved with a supersession note.
- Files: src/app/{page.tsx,layout.tsx,globals.css}; src/components/landing/{motion.tsx,mission-data.ts,mission-dialog.tsx}; src/components/layout/{site-header.tsx,site-footer.tsx}; src/components/sections/{landing-page.tsx,how-it-works.tsx,missions.tsx,engineering.tsx,mission-control.tsx}; src/components/ui/section-label.tsx; public/fonts; public/images/{orbital-hero.png,lunar-mission.png}.
- Fonts: exact Barlow Condensed 600/700/800/900, Space Grotesk variable 400–700, Inter upright variable 400–600, IBM Plex Mono 400/500. Self-hosted Google Fonts from google/fonts GitHub via next/font/local because Google font hosts are inaccessible in the sandbox. OFL licenses included with font files.
- Assets: existing logo is unchanged. Orbital and lunar images are original AI-generated cinematic illustrations, not NASA photography. Sun and Mars are original procedural CSS illustrations. No NASA marks or third-party game assets used.
- Validation: bun run lint; bun x tsc --noEmit; bun run build. Browser automation at 1440×1000, 820×1180, 390×844: no horizontal overflow; working mission choices, modal Escape dismissal, process tabs, resource toggle, mobile menu. All internal anchors resolve; all images loaded after scrolling; no JavaScript page errors. Reduced-motion browser check: no Lenis, headings visible. Full-page screenshots reviewed at all three widths.
- Browser testing used temporary Playwright/Chromium tools only; removed from application dependencies afterward. Existing animation packages were already installed; no new runtime dependencies.
- Scope boundary: no playable simulator exists yet. Start/Explore actions open honest mission briefings identifying the simulator as in development. Engineering figures are illustrative. Next: game catalogs/engine, then replace briefing launch actions with /play entry when available.
