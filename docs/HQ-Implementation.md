# Phase 03 — immersive headquarters

## Delivered
- [x] Desktop START requests fullscreen directly from the gesture, then enters `/hq`. Phones/tablets receive an orientation preparation screen in portrait; Continue attempts fullscreen then landscape lock, with unrestricted portrait continuation. Unsupported/rejected APIs do not block play. Navigation cleanup unlocks orientation, exits fullscreen and closes audio.
- [x] Initialization reports five **completed tasks**, not simulated download percentage: local profile, engine verification, lazy world module, logo decode, first rendered frame (or explicit compatibility mode). Procedural textures are generated locally. There is no remote asset manifest/download.
- [x] Validated 2–24-character local commander name, Enter submit, returning welcome/edit, modal keyboard containment and focus restoration.
- [x] Cinematic world-backed menu, Continue/New/Mission Select/My Spacecraft/Archive/Settings/Exit, commander statistics and persistent station HUD.
- [x] Coherent procedural orbital interior: ribbed structural shell, observation window/Earth, holographic globe/orbits, engineering assembly pedestal, planetary planning table, launch desk/rocket, science displays and archive. Clickable 3D signs/platform rings and equivalent keyboard/touch station dock.
- [x] Smooth station camera director, bounded orbit/zoom, reset view, portrait framing and user-interruptible inspection. No physics or postprocessing dependencies.
- [x] Actual catalog-driven spacecraft model, damped install **and removal**, component inspection, starter designs, synchronized mass/cost/power/data and compatibility information.
- [x] Moon, Sun and Mars planning; numeric targets/objectives; destructive-change confirmation. Four-craft Sun mission follows the existing engine's identical-satellite model.
- [x] Actual engine preflight, rocket/orbit/seed selection, blocked invalid launches and explanations; countdown/ascent/separation, orbital deployment and seeded event/result playback. Pause/speed/skip controls; failure does not later appear as successful deployment.
- [x] Original Web Audio ambient chord/ship tone and interaction, install/removal, transition, notification, launch, separation, deployment, success/failure effects. Gesture-only context creation; independent persisted volume controls/toggles; visibility pause and disposal.
- [x] Local XP, rank, completed evaluations, personal best, earned achievements, existing bounded flight history and comparison/restore. No payments, accounts or added personal data.
- [x] Settings for audio, graphics, reduced motion, camera sensitivity, fullscreen, identity, honest English-only language selector and confirmed full local reset.
- [x] Lazy client-only R3F, device-aware DPR/particle/texture detail, instanced lights, texture disposal, WebGL/context-loss compatibility mode; `/play` remains the accessible non-WebGL journey.
- [x] Useful product requirements migrated into README; retired definition file deleted and references removed. Legacy `docs/Design.md` preserved. README, design, architecture, phase status, AGENTS and memory updated.

## Architecture
`src/app/hq/page.tsx` mounts the client orchestrator with a route-scoped stylesheet. `hq-experience.tsx` coordinates entry/stations/playback only; it reuses `useMissionStore`, `resources`, `verify`, `simulate` (through store launch), `telemetry` and `mentorAdvice`. Existing engine calculations and catalog values were not changed.

`world/world.tsx` owns lazy Canvas, context events and camera; `headquarters`, `architecture`, `planet`, `spacecraft-model`, and `launch-world` own procedural visuals. Panels have separate modules. The scene is the workspace; panels can be minimized for unobstructed inspection. In-world signs use textured meshes rather than independently mounted DOM roots, avoiding a React/Drei HTML-root unmount race found during QA.

`commander-store.ts` persists `missionx-commander-v1`, independently of the existing validated flight-deck save. Its guards clamp preferences and reject invalid names. `progression.ts` awards evaluated flight IDs once; the profile keeps up to 2,048 awarded IDs and the existing archive retains 12 flights. Local storage is not an anti-cheat boundary. Blocking storage preserves session play with an explicit warning.

## Validation — 2026-11-14
- **31 automated tests passed**: existing 25 engine/schema/API tests plus six profile/preference/progression tests. Seed determinism and success/partial/failure coverage retained.
- `bun run lint`, `bun run typecheck`, `bun run build`: passed. No runtime dependency additions.
- Headless Chromium, production server: desktop 1440×1000 (normal and reduced motion), phone landscape 844×390, phone portrait 390×844, tablet 1180×820. HQ entry → identity → planning → baseline assembly → verification → launch → results; redesign, preferences/profile/progression persistence after reload. All three destinations exercised. No page overflow or browser errors on successful final runs.
- Browser fullscreen/orientation rejection, no-WebGL startup, live WebGL context loss, denied local storage, invalid-design launch blocking, settings, cancel/confirm reset: passed. Compatibility controls remain functional after renderer failure.
- Existing `/play` desktop Moon, tablet Sun and phone Mars six-screen regression: all category controls, exact engine results, mentor, history, reset retention, refresh, guards, corrupt saves and API 200/400/413 checks passed without browser errors or clipped controls.
- Screenshots reviewed for menu, desktop assembly/results and portrait assembly. Browser QA tools/screenshots live in ignored `.tools`; they are not application dependencies or Git assets.

## Honest limitations / release checks
- Educational visual model, **not** physically accurate orbit propagation or a flight simulator. Launch altitude/time is schematic and compressed. Refresh resumes the saved seeded flight from the start of playback.
- English only; no cloud sync, multiplayer or registration. Audio is original synthesized ambience/effects, not a recorded orchestral soundtrack. Listening quality, physical-device performance and vendor-specific fullscreen/orientation behavior still need human checks on Safari/iOS and Android hardware.
- Chromium QA used sandbox/software rendering. DPR/detail limits and instancing are implemented, but no real-device FPS or battery-life guarantee is claimed. No external GPU profiler or cross-browser performance benchmark was run.
- Local data can be removed by browser settings. Full reset clears both profile and flight history; ordinary New Mission retains evaluated flights. Three destinations/fixed catalog remain intentionally educational in scope.
- Public-host deployment verification is still required before release. No commit/push is performed by this implementation handoff.
