# Parts and application components

[Documentation index](README.md)

## Catalog parts

There are 26 parts in eight categories (`parts.json`, `setup.json`). Required structural/operational categories are structure, power, battery, communications, computer and attitude. Camera/science payload rules depend on the mission. The UI renders static catalog values; calculations belong in the engine.

| Category | Role in the model |
|---|---|
| Structure | Mass/cost/lifetime and payload mass allowance |
| Power | Solar generation, mass/cost and lifetime |
| Battery | Stored energy; usable fraction and discharge efficiency apply |
| Communications | Downlink rate, draw and mission compatibility |
| Computer | Storage, draw/lifetime; radiation-protected option mitigates a particular authored incident |
| Attitude | Pointing compatibility and payload dependencies; no attitude dynamics solver |
| Camera | Mapping/high-resolution payload where mission-compatible |
| Science | Additional instruments; multiple distinct science parts may be combined |

Parts carry mass (kg), cost (million USD), draw/generation (W), battery (Wh), data/downlink (GB/day), storage (GB), science points and lifetime (months), as applicable. Zero fields do not imply a real subsystem has no physical demand. Fleet resources scale selectively; power/battery feasibility remains per craft. See [formulas](ENGINEERING_REFERENCES.md).

## UI and supporting modules

- `src/components/sections`: landing content; `layout`: shared navigation/footer.
- `src/components/hq`: station UI; `hq/world`: procedural canvas scenes and fallback handling.
- `src/components/game`: flight-deck screens and shared checks, diagnostics, report and mentor panels.
- `src/game/engine/flight-tests.ts`: common preflight/arrival presentation projection.
- `src/game/report`: saved/captured-input report content and measured PDF layout.
- `src/game/audio`: original procedural Web Audio score/effects; no downloaded music assets.
- `src/game/onboarding`: first-use tutorial definitions and state validation.

Do not duplicate resource, diagnostic or scoring rules in UI components. The current architecture lives in [Architecture](Architecture.md); catalog values are not a bill of materials for real hardware.


## Current module/data boundary map — 0.1.12

`catalog.ts` exposes JSON; `resources.ts` budgets the selected design; `validation.ts` checks it; `simulation.ts` uses seeded events and `operations.ts` for actual educational outcomes. `mission-store.ts` owns design/run/history and captures schema1. `commander-store.ts` owns local identity/preferences/progression; tutorial state has its own versioned key. No server database or authenticated identity exists.

`run-snapshot.ts` dispatches missing/valid/invalid/unsupported records; `snapshot-schema-v1.ts` validates a fixed wire contract rather than live catalog shape. Snapshotless legacy models remain explicit current-catalog reconstructions. Current catalog-ID removal is not solved by the fixed reader.

`diagnostics.ts`/`flight-tests.ts` project captured checks/findings into one shared severity/count policy for LaunchTestPanel, MissionReport and PDF. `score-presentation.ts` supplies shared explanation, not scoring logic. PDF generation is lazy/client-local with measured layout and same-origin logo; no report upload endpoint. `/api/mentor` alone accepts optional remote advice requests; it validates/recomputes and fails back locally. See [README tree](../README.md#technology-and-architecture), [deployment](Deployment.md), [snapshot contract](Post-Audit-Corrections.md). Protected Architecture has an older baseline; exact update proposals are in [finalization report](Finalization-Report.md).
