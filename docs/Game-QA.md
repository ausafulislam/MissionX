# Game QA

> **Historical implementation/validation record.** Statements and check counts below apply to the recorded phase, not a new test execution. Use the [documentation index](README.md), [current architecture](Architecture.md) and [current testing record](Testing.md) for the present baseline. Original evidence is preserved.

25 automated regression tests across three files pass. Provider tests mock success, HTTP failure and network failure; no live paid service was called.

Engine regression suite: `bun test`. Lint: `bun run lint`. Types: `bun run typecheck`. Production: `bun run build`.

## Automated browser checks (local QA harness, Chromium)
- Screen 01 destination selection updates all four measurable targets.
- Screen 02 baseline, category selectors, add/remove, live engine totals.
- Screen 03 empty design locks launch; valid baseline unlocks; wrong orbit locks it again.
- Screen 04 countdown, playback speed, pause/resume, timeline, skip and completion.
- Screen 05 score/outcome match pure engine; deterministic mentor endpoint fallback.
- Screen 06 first-run empty comparison guidance; two flights compare side by side, restore/redesign, refresh history.
- Production full journey at 1440×1000 (Moon), 820×1180 (Sun), 390×844 (Mars), including all six screens.
- Every visible control remains inside viewport; no horizontal document overflow.
- Fresh direct result route returns to goal; invalid saved JSON recovers safely.
- New mission confirmation can be cancelled; confirming clears active design but keeps flight history.
- Mentor: valid request 200 local advice; invalid design 400; oversized payload 413.
- Reduced motion: native game scroll, no Lenis instance; orbital drift disabled.

## Additional browser coverage
- All 20 catalog components toggled at mobile width; displayed budget/mass/power/data checked against pure engine totals after each interaction.
- All three launch vehicles and four orbit controls exercised; readiness matches engine verification.
- Preflight mentor explains failed checks with actionable suggestions; result mentor explains actual events.
- Success, partial success and failure rendered in successive flights; each new flight resets playback correctly.
- Normal GSAP playback, pause, changing motion preference mid-flight and keyboard skip link tested without console errors/warnings.
- Corrupted and blocked browser storage tested; session-only play remains usable.
- Mission change and New Mission confirmation cancellation/confirmation tested.

## Honest scope / limitations
All numeric spacecraft/rocket/orbit values, science points, probabilities, compressed timing and events are simplified educational estimates. No flight dynamics solver. Sun Watch uses four identical satellites, not four independent designs. Local save is device/browser specific; no cloud sync. In-flight refresh replays the same seeded flight from the beginning. History stores the latest 12 runs. Remote AI provider requires deployment network access and a server key; local teaching advice always works. English/Urdu translation and multiplayer/team mode are not implemented. No external paid service was used in validation.
