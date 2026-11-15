# Changelog

## 0.1.1 — 2026-11-14
- Audited official challenge and supplied references; documented provenance limits and sequential engineering plan.
- Migrated mission/component/launcher/orbit catalogs to static JSON behind existing exports. Each entry now discloses source scope, access date, confidence and numerical gameplay assumptions.
- Added catalog integrity and migration regression tests. No layouts, engine behavior, catalog IDs or approved architecture/PRD/design documents changed.

## 0.1.2 — 2026-11-14
- Added explicit authored EOL solar, battery usability/efficiency, mass/power margins, memory sizing, budget headroom and heuristic risk.
- Finite computer storage and storage verification; positive-capacity data/storage shortages are labeled operational warnings while zero capacity and incompatible/budget/mass/power constraints block launch.
- Existing resource/check cards explain the balance without layout changes. Added balance tests; simulation reports identify model revision 2.

## 0.1.3 — 2026-11-14
- Added deterministic four-day representative EOL operations: sunlight/eclipse energy, charging/discharging, finite onboard memory, scheduled contacts, transmission, ground reception and conservation accounting.
- Science now depends on useful data actually received and achieved lifetime. Causal reports identify storage overflow, onboard backlog, brownouts and unmet requirements; four-segment labels show SUCCESS/PARTIAL/FAILED.
- Existing cards expose source notes, estimate limits and an expandable operations/scoring ledger. Live telemetry reads battery/storage/contact samples. No layout/styles changed.
- Preserved historical deterministic models for archived flights; current saves recompute under their identified model and never trust cached scores. Added conservation, counterfactual and save-migration tests.

## 0.1.4 — 2026-11-14
- Expanded authored catalog choices: CubeSat-class and medium buses, low-gain radio, radiation detector, two pointing suites, SSO and GEO teaching orbits. Added bus payload allowances and precision-imaging pointing dependencies; fictional launch services explicitly labeled.
- Added a closed per-spacecraft energy ledger (solar, initial/final battery, served loads, charge loss, unused solar), conservation assertions, and HQ margin text in existing slots. Current-model return telemetry uses actual received fraction.
- Fixed result→redesign route guard race. Reformatted touched engineering files for maintenance.
- Validation: 48 unit tests, lint and production build passed. Headless Chromium desktop Moon/tablet Sun/phone Mars full flows, ledger, redesign and save reload passed; desktop HQ launch/results/redesign passed, no console/page errors. Browser tools isolated in ignored workspace, no application dependencies changed.

## 0.1.5 — 2026-11-14
- Added permanent source/provider register with review scopes, limitations, implementation status and unresolved licensing/link verification.
- Added current-code engineering formulas, parameter snapshots, policies, tests and known gaps; consolidated stale chronological Engineering.md notes.
- Added mandatory research/source workflow to AGENTS.md and Rules.md, including the independence disclaimer. No runtime/UI/catalog/dependency changes; metadata IDs and full user-facing credits remain pending separate tasks.
- Validation: lint,48 tests and production build pass; register structure/anchor/inventory checks pass. Fresh-production Chromium three-viewport mission flows and HQ pass; an initial existing-server phone overflow was not reproduced. External verification gaps remain explicitly recorded; no blanket link-validity claim.

## 0.1.6 — 2026-11-14
- Added pure mission-specific presentation lifecycle and six configuration diagnostic groups with explicit NOT EVALUATED findings for absent models. Failed launches cannot arrive or become operation-ready.
- Snapshot actual local commander identity at launch and completion timestamp on first evaluation; preserve fields through saves without attributing legacy flights to a current profile.
- Documented timing/status assumptions and source mapping. Scene, audio, interactive gating and PDF remain subsequent approved tasks; no dependencies or scoring changes.
- Validation:55 unit tests, lint and production build pass. New commissioning UI, scene/audio behavior and PDF export are not yet implemented or browser-tested.

## 0.1.7 — 2026-11-14
- Connected six interactive arrival-time configuration diagnostics to HQ and accessible flight deck, with persistent acknowledgement, review, clear unavailable-model findings and a shared gate that Skip cannot bypass.
- Replaced abrupt HQ launch/orbit switch with continuous Earth ascent, background transition, original trajectory path and mission-correct destination approach; retained procedural configured spacecraft, bounded effects, gesture audio and reduced-motion support. Ten countdown ticks now span approximately10 seconds at1x.
- Added actual-state multipage PDF mission report download to both results screens, including branding, commander, components, balances, diagnostics, events, science, four segments, recommendations, sources and disclaimer. Approved pdf-lib1.17.1 only; no extra font dependency or external mission-data API.
- Added report/outcome/gating tests and source/model documentation. Numerical outcomes remain model3; diagnostics are configuration checks, not invented live sensors.
- Validation:60 tests, lint/build/diff/source-reference checks pass; Chromium desktop/tablet/phone mission flows and normal-motion HQ flow pass including six checks and actual PDF downloads. Eight seeded success/partial/launch-loss browser cases also pass reload/identity/download checks. Physical-device/audio listening and PDF accessibility certification remain outside executed validation.

## 0.1.8 — 2026-11-14
- Replace independent craft/path/ring coordinates with mission-aware target-relative clearance geometry, centered four-craft formation, tangent heading and continuous operations orbit.
- Smooth bounded target arrival zoom with aspect-aware fit; protect flight camera from accidental user orbit/zoom.
- Add three stationary spatial star shells with varied brightness, tint and size, capped for low-quality rendering.
- Add deterministic clearance, continuity, camera projection and star distribution regressions; preserve models, launch animation and commissioning rules.
