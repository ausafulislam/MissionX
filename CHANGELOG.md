# Changelog

## 0.1.1 — 2026-11-14
- Audited official challenge and supplied references; documented provenance limits and sequential engineering plan.
- Migrated mission/component/launcher/orbit catalogs to static JSON behind existing exports. Each entry now discloses source scope, access date, confidence and numerical gameplay assumptions.
- Added catalog integrity and migration regression tests. No layouts, engine behavior, catalog IDs or approved architecture/PRD/design documents changed.

## 0.1.2 — 2026-11-14
- Added explicit authored EOL solar, battery usability/efficiency, mass/power margins, memory sizing, budget headroom and heuristic risk.
- Finite computer storage and storage verification; positive-capacity data/storage shortages are labeled operational warnings while zero capacity and incompatible/budget/mass/power constraints block launch.
- Existing resource/check cards explain the balance without layout changes. Added balance tests; simulation reports identify model revision 2.
