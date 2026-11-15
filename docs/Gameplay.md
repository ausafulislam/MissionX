# Gameplay

[Documentation index](README.md)

## Entry and controls

Open `/hq` from the landing page, choose a local commander display name and use station controls for planning, engineering, launch, science and archive. First-use guidance can be completed or skipped and replayed from settings. The `/play` flight deck provides a semantic alternative without requiring the HQ canvas. Keyboard focus, reduced motion and compatibility mode are supported; physical-device/screen-reader sign-off remains a separate task.

## Goal → Build → Verify → Launch → Result

1. **Goal:** Moon Mapping, Sun Watch or Mars Orbiter. Read four measurable mission requirements.
2. **Build:** select catalog parts and observe engine resource outputs. One part per non-science category; science instruments can be combined subject to compatibility, power, mass and payload limits. Baselines are teaching starting points, not guaranteed flight success.
3. **Verify:** choose a compatible launcher and science orbit; resolve blocking checks. Read accepted downlink/storage risks rather than treating a warning as a guarantee.
4. **Launch:** choose the seed, begin countdown and watch compressed playback. Pause/speed/skip controls do not bypass the initial countdown or six sequential arrival reviews. A seeded launch loss ends the journey without arrival or operations credit.
5. **Result:** inspect score, achieved science/lifetime, four segments and recommendations. Download the PDF, compare saved runs in debrief/archive, or redesign.

## Saves and preferences

Progress, runs, commander identity and preferences are local to the browser. Hydration validates data and handles unavailable/corrupted storage. No registration, cloud synchronization or public leaderboard is implemented. A local name is not an authenticated identity. Clearing browser data removes local progress; storage failures can prevent persistence.

Audio starts only after a user gesture. Mute/music/effects settings and reduced motion are preferences, not inputs to the scientific result. Identical design/seed/model inputs reproduce engine results; current shared catalogs can affect historical replay.

See [missions](Missions.md), [parts](Components.md), [verification](Verification.md) and [simulation](Launch-and-Simulation.md).

## Current0.1.12 record and score behavior

Weighted Performance Score is independently rounded:100 can coexist with PARTIAL. Inspect actual unmet requirements. New runs capture inputs/results for reports; only absent snapshots use disclosed current-catalog reconstruction. Invalid/unsupported supplied snapshots warn and retain raw storage rather than silently replaying. [Snapshot/report details](Post-Audit-Corrections.md) · [Current checks](Testing.md).
