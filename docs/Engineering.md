# MissionX educational engineering model

The current authoritative rule inventory is [ENGINEERING_REFERENCES.md](ENGINEERING_REFERENCES.md). The source/provider/verification register is [RESOURCES.md](RESOURCES.md). These consolidate the former chronological model notes; game behavior has not changed in v0.1.5.

## Current model 3
- Pure deterministic seeded engine with static authored catalog values.
- Mass/cost/data/science scale to fleet; battery/power state remains per spacecraft.
- EOL average solar, usable battery, normalized headroom and finite memory preflight checks.
- Nonzero downlink/storage deficits and low margins may fly as explicit warnings. Hard engineering/compatibility failures still block.
- Four representative EOL days with48 steps/orbit, synthetic sunlight/contact windows, finite energy/memory, one selected operations event and Earth-received data accounting.
- Science credit depends on received/planned data and achieved/required lifetime. Score weights50/35/15 are gameplay policies, not NASA evaluation criteria.
- Conservation tests establish arithmetic consistency, not hardware accuracy. No RF/thermal/propulsion/orbit propagator or mission-lifetime forecast is implemented.

## Evidence boundaries
NASA's mission-development presentation supports process and four-segment names, not catalog numbers. Quicksat community guides support budgeting concepts, not numerical factors. GMAT, Mission Viz, CML, MDL, Webb game and CSA material are studied references unless the register explicitly identifies implemented usage.

All catalog specifications, event probabilities, costs, reliability, life, orbit/contact factors and science points remain educational estimates. Original magnitude-selection rationales were not recorded. No NASA endorsement or flight-readiness claim is made.

## Historical models
Model1 algorithms reside in engine/legacy-v1. Model2 simulation resides in legacy-v2.ts but shares current resources/validation; exact historical fidelity is not guaranteed. Current saves dispatch by model and recompute rather than trust cached scores. Catalog evolution can affect recomputation. See the engineering references for exact caveats.

## Balance diagnostic
The v0.1.4 recorded1000-design sweep per mission: Moon395 verified (249 success/112 partial/34 failed); Sun138 (77/54/7); Mars28 (7/5/16). This is a randomized diagnostic, not measured player difficulty or real mission reliability. Verified baseline actions remain available. These results were recorded previously, not rerun for the documentation-only task.

## Pending work
Catalog source-ID migration, per-parameter metadata validation and source transparency changes require subsequent tasks. Numerical convergence/initial-state sensitivity, charge-loss-aware preflight, misleading stable-event copy, historic-model isolation and source-section verification remain open. No claims that documentation alone fixes these issues.
