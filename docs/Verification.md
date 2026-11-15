# Verification and arrival reviews

[Documentation index](README.md)

## Prelaunch checks

`verify()` in `src/game/engine/validation.ts` combines mission requirements with power, battery, downlink, storage, launch capacity, subsystem presence, mission payload, instrument compatibility, dependencies, structure payload allowance, slots, orbit, launch trajectory and catalog validity.

`numericCheck()` uses a minimum/maximum comparison. A near miss (ratio at least 0.9) is `close`, but **close is still blocking unless `blocking === false`**. Readiness requires every check to pass or be explicitly nonblocking.

- Nonzero inadequate downlink or storage is an accepted operational risk: warning, not silent full-science credit. A zero capacity is not granted this exception.
- Mass and end-of-life power headroom are nonblocking advisories. The 10% threshold is authored gameplay policy, not a flight standard.
- Six essential non-payload subsystem categories are required. Camera is required for Moon/Mars; coronagraph for Sun Watch.
- Duplicate IDs are invalid; one non-science component per category; instrument pointing dependencies and bus payload mass are checked.

## Six sequential arrival reviews

`missionDiagnostics()` defines:

1. Spacecraft configuration health
2. Power system diagnostics
3. Communication diagnostics
4. Orbit and navigation diagnostics
5. Scientific instrument diagnostics
6. Mission readiness

These evaluate configuration evidence at the presentation arrival milestone, **not sensor measurements**. Unmodeled propulsion/thermal health, RF compatibility, insertion/navigation accuracy and instrument calibration remain `NOT EVALUATED`. Hardware presence is not operational certification.

`advanceFlight()` stops playback at the operations event until six reviews have been acknowledged. Skip cannot bypass this gate. A launch loss has no arrival eligibility or fictional commissioning success.

## Consistent reporting

`flightTestResults()` maps engine verification and diagnostics to PASS / WARNING / FAIL / NOT EVALUATED. Group aggregation: FAIL > WARNING > NOT EVALUATED > PASS; PASS requires every finding evaluated/passed. A mixed WARNING/NOT EVALUATED group retains WARNING and shows missing count. `summarizeTests()` reports separate group and finding totals/pass/fail/warning/unevaluated counts; the shared canonical status uses FAIL > WARNING > NOT EVALUATED > PASS (empty→NOT EVALUATED), displayed as BLOCKED / READY WITH WARNINGS / NOT EVALUATED / MISSION READY. Both group and finding counts remain visible. HQ, flight deck and PDF use this shared projection. Individual reasons remain inspectable after review. Counts are finding instances, including checks reused in multiple groups, not unique subsystem measurements. Baseline arrival has four NOT EVALUATED groups and six NOT EVALUATED findings. CONFIGURATION READY in preflight means blocking checks passed, not flight certification. New-run checks come from captured inputs; legacy checks are labeled current-catalog reconstruction.

Tests: `engine.test.ts`, `diagnostics.test.ts`, `flight-tests.test.ts`, `countdown.test.ts`, `release-blockers.test.ts`. See [testing](Testing.md) and [simulation](Launch-and-Simulation.md).
