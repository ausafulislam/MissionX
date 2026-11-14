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
