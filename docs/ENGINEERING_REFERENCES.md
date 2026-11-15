# MissionX engineering references

Current model 3, package 0.1.12; documentation reconciled 2026-11-14. This is a description of **existing code**, not newly validated flight engineering. [Source register](RESOURCES.md) supplies provider, original URL, access/review scope and restrictions for every source ID. Historical algorithms are separate below.


## Current implementation reconciliation — documentation pass

The formulas below were checked against `resources.ts`, `validation.ts`, `operations.ts`, `simulation.ts`, `flight-lifecycle.ts`, `diagnostics.ts` and `flight-tests.ts`. No scientific magnitude or scoring formula changed; diagnostic status expectations were corrected. Any earlier “UI pending” statement is historical: the six-review gate and shared preflight/arrival results are now connected to HQ, flight deck and PDF (implementation through 0.1.10).

### Traceability to guides and tests

| Subject | Actual entry points | Tests / documentation |
|---|---|---|
| Mass/cost/power/battery/storage | `resources()`, `selectedParts()` in resources.ts | engine.test.ts, balance.test.ts; [catalog](Missions.md) |
| Blocking checks and disclosed risks | `verify()`, `numericCheck()`, `missionRequirements()` in validation.ts | engine.test.ts, balance.test.ts; [verification](Verification.md) |
| Four-day finite-energy/memory integration | `operate()` in operations.ts | operations.test.ts; [limits](Scientific-Limitations.md) |
| Seeded events, science, lifetime, scores | `simulate()`, `seededRandom()` in simulation.ts | engine.test.ts, operations.test.ts, save-model.test.ts; [simulation](Launch-and-Simulation.md) |
| Arrival eligibility and six-review gate | `flightLifecycle()`, `advanceFlight()`, `missionDiagnostics()` | diagnostics.test.ts, countdown.test.ts |
| Shared PASS/WARNING/FAIL/NOT EVALUATED projection | `flightTestResults()`, `summarizeTests()` | flight-tests.test.ts; report content tests |
| Report content and PDF layout | `buildMissionReport()`, pdf-layout.ts, pdf-export.ts | mission-report.test.ts, pdf-layout.test.ts; [PDF guide](PDF-Reports.md) |

Test names here refer to repository files, not external scientific validation. Current test execution is recorded in [Testing](Testing.md); historical results below remain dated evidence.

### Explicit numerical policies

`assumptions.json`: modelVersion 3; solarAnnualRetention 0.98; batteryUsableFraction 0.8; batteryDischargeEfficiency 0.95; batteryChargeEfficiency 0.95; groundReceptionEfficiency 1; representativeDays 4; stepsPerOrbit 48; advisoryMarginPercent 10. The headroom/risk rules now consume advisoryMarginPercent; simulation result identifiers consume modelVersion. Other score/event literals are not centralized.

`simulation.ts`: score weights 0.50 / 0.35 / 0.15; efficiency offset 0.55; failure science threshold 0.5 of target; success availability tolerance 1e-9. All are authored educational policies. Readiness accepts only PASS or explicitly nonblocking checks. Nonzero inadequate data/storage becomes a warning; not every CLOSE result is safe to launch.

`operations.ts`: scienceFraction = min(1, Earth-received GB / (planned fleet GB/day × representative days)), or 0 for no planned data. Generated/transmitted/received are not interchangeable; overflow and onboard backlog receive no science credit. Lifetime fraction is applied separately in `simulate()`. Four-day rates are extrapolated with 30-day months and capped achieved/required life, not integrated across a full changing campaign.

No catalog magnitude, degradation factor, risk threshold, countdown interval, score weight or schematic travel time is attributed to NASA/CSA/JPL/Quicksat. Missing original selection rationales remain unresolved. See [resource audit](RESOURCES.md) for scope and reuse limits.

## Correction addendum — 0.1.11

Parameter records: [DATA_SOURCES.md](DATA_SOURCES.md). NASA presentation and Quicksat are category C conceptual references, not proven method derivations; no numerical source is inferred from formula similarity.

**Diagnostics (`diagnostics.ts`, `flight-tests.ts`):** any FAIL → FAIL; else any WARNING → WARNING; else any NOT EVALUATED (or empty group) → NOT EVALUATED; else PASS. Group and finding counts are separate; repeated checks in different groups count as separate finding instances. WARNING plus unmodeled findings retains WARNING and discloses unevaluated count. Baseline arrival: four unevaluated groups, six unevaluated finding instances; this is not physical health testing. Six review acknowledgments permit playback, not certification.

**History (`run-snapshot.ts`):** report inputs use captured values when valid; only snapshotless saves use explicitly labeled current-catalog reconstruction. Supplied invalid/unsupported snapshots fail closed. Existing save schema/key unchanged, optional snapshot schema1; new snapshots include catalog/assumption identifiers. Captured results are finite/shape checked with a corruption checksum, not signed or tamper-proof. Current aggregation and documentation metadata may evolve; no old diagnostics/source metadata version is fabricated. Tests: corrections.test.ts, save-model.test.ts, flight-tests.test.ts, report tests.

**Scope:** fleet mass/cost/data/memory/downlink; per-craft power/battery/part specs. Countdown overlay reads the existing flight clock with no timer; FlightScene reads the same label and no longer renders an independent ten-count. Existing controller intervals clean up on effect teardown. Tests cover shared timing, gate and display source.

## Evidence and notation

- **Derived:** dimensional sums/rate integration applied to authored inputs. Correct arithmetic does not validate input realism.
- **Estimate/policy:** authored by Team NASA WARRIORS, source [MISSIONX-EDUCATIONAL-ASSUMPTIONS](RESOURCES.md#MISSIONX-EDUCATIONAL-ASSUMPTIONS), repository https://github.com/ausafulislam/MissionX; inspected 2026-11-14. No external numerical authority. Original number-selection rationales are unavailable; do not invent them.
- **Concept:** external reference supports only the specified concept. NASA presentation: https://www.nasa.gov/wp-content/uploads/2025/04/250323-design-and-develop-science-mission.pdf (segment/process/ConOps slides), [NASA-SCIENCE-MISSIONS](RESOURCES.md#NASA-SCIENCE-MISSIONS).
- Community budgeting context: [COMMUNITY-QUICKSAT-POWER](RESOURCES.md#COMMUNITY-QUICKSAT-POWER), https://github.com/egemenimre/quicksat/blob/master/docs/guides/power/set_up_a_power_budget.md (EOL/mode/battery budgeting); [COMMUNITY-QUICKSAT-SIZING](RESOURCES.md#COMMUNITY-QUICKSAT-SIZING), https://github.com/egemenimre/quicksat/blob/master/docs/guides/sizing/initialise_a_satellite.md (mass/data/contact/memory sizing). Neither verifies our coefficients.

Symbols: N=fleet count; Σ=sum selected unique catalog parts; P=per-craft load W; G=per-craft EOL orbit-average solar W; e=eclipse fraction; c=contact fraction; T=orbit period h; L=required months; C=usable battery Wh; R=fleet planned data GB/day; D=fleet contact-averaged downlink GB/day. GB is the catalog accounting unit; no encoding/bit conversion is implemented. Costs are millions of nominal USD teaching units, not inflation-adjusted quotations.

## Mass, payload, budget and lifetime

Implementation: `src/game/engine/resources.ts`; constraints in `validation.ts`. Inputs: part `mass`, `cost`, `lifetime`, `payloadLimit`, category; mission N/budget/mass limit; launcher capacity/cost. Outputs: kg, $M, months, %.

| Rule | Exact calculation/policy | Classification and limits | Validation |
|---|---|---|---|
| Total mass | N × Σ mass | Derived; no propellant, harness/adapter or contingency mass unless implicitly included in authored parts | engine.test.ts sum/fleet/overweight cases |
| Payload mass | Σ mass of camera/science parts, per craft | Derived; structure payload allowance is authored, not structural analysis | balance.test.ts payload allowance |
| Structure/power/comms mass | Each selected part contributes its catalog kg to total; no separate subsystem sizing solver | Estimate inputs; no propulsion part/category or propulsion mass calculation | catalog.test.ts, total-mass test |
| Capacity | fleet mass ≤ launcher capacity and mission cap; bus payload ≤ selected structure payloadLimit (default 0) | Policy; fictional launcher capacity independent of actual trajectory energy | engine.test.ts, balance.test.ts |
| Mass headroom | 100 × (min(mission cap, rocket cap) − fleet mass)/min(cap values) | Derived normalized headroom, not uncertainty analysis | balance.test.ts |
| Cost | N × Σ part cost + one launcher cost | Derived from estimates; omits separate labor/testing/ground/operations/reserves/travel costs | engine.test.ts budget sum, overbudget |
| Budget remaining | mission budget − cost | Derived $M; no cost uncertainty distribution | balance.test.ts |
| Design lifetime | minimum installed part lifetime, or 0 with no parts | Authored weakest-part policy, not reliability distribution | engine.test.ts short-life case |

Historical review notes cited CubeSat process/funding context; the current correction pass reviewed only introduction/§1.1/beginning §1.2, not a fresh chapter-2 verification: https://www3.nasa.gov/sites/default/files/atoms/files/nasa_csli_cubesat_101_508.pdf, [NASA-CUBESAT-101](RESOURCES.md#NASA-CUBESAT-101). It does **not** supply MissionX costs or justify applying CubeSat requirements to all craft.

## Electrical power and energy

Implementation: `resources.ts`, `operations.ts`. Conceptual reading: Quicksat power guide above; historical derivation not established. All numeric factors are authored estimates; values inventoried below. Outputs remain per spacecraft, not fleet totals.

| Parameter/output | Formula, units and inputs | Assumptions/limits | Test method |
|---|---|---|---|
| Nominal generation | Σ generation W × orbit solarFactor | Array output already an authored rating; no area/temperature/pointing model | balance.test.ts dimensional calculation |
| Average EOL generation G | nominal × (1−e) × 0.98^(L/12), W | Retention is an input, not a NASA annual degradation standard; evaluated at required life | balance.test.ts |
| Average demand P | Σ draw, W | Continuous flat loads; no component operating modes or standby power | engine.test.ts power shortage |
| Power margin | G−P W; percent =100(G−P)/G | If G=0, percent is −100 when P>0, else 0; denominator is supply | balance.test.ts |
| Nameplate/usable battery | Σ battery Wh; C=nameplate×0.8×0.95 | Discharge efficiency is absorbed into usable capacity; not applied again on withdrawal. No cycle aging/temperature model | balance.test.ts, operations.test.ts |
| Eclipse requirement | P×e×T Wh | Constant load, single contiguous assumed shadow | engine.test.ts, balance.test.ts |
| Step size | dt=T/48 h; last step truncated at 96 h | Midpoint phase sampling, not continuous event boundary integration | repeatability/conservation tests; convergence pending |
| Sunlight | phase=((step mod 48)+0.5)/48; sun if phase≥e | Fixed repeating shadow placement | bounds tests; short-window precision pending |
| Solar step energy | sunlit supply G/(1−e) × h; storm multiplier when active | No inverse-square calculation, orientation or RF constraints; catalog e must remain <1 | conservation tests |
| Load energy | demand=P×h Wh | Common proportional load shedding | conservation/brownout tests |
| Charging | surplus=max(solar−demand,0); added=min(C−battery,surplus×0.95) | Stored usable Wh; charge input=added/0.95; charge loss=input−added; spill=surplus−input | energy identity across seeded cases |
| Discharging | withdrawal=min(battery,max(demand−solar,0)); served=solar+withdrawal in deficit | Starts fully charged; finite usable Wh, no rate limits | battery bounds, upgrade counterfactual |
| Availability | step served/demand (1 for zero demand); campaign Σserved/Σdemand | Unmet fraction reduces science generation and transmission proportionally | operations.test.ts |
| Brownout equivalent hours | Σ h×(1−step availability) | Equivalent unmet-load hours, not a count of discrete shutdowns | operations.test.ts |
| Delivered average power | Σserved/96 h, W | Four-day representative EOL value | operations.test.ts |

Energy identity per spacecraft: initial battery + total solar = served loads + final battery + charge losses + spilled solar. Existing seeded tests use absolute tolerance 1e-6 Wh. This establishes internal conservation only. Initial full battery may mask a slow energy deficit; average preflight supply does not explicitly budget charge losses. Neither is newly fixed in this task.

## Communications and memory

Implementation: `resources.ts`, `operations.ts`, `simulation.ts`. Quicksat sizing guide supports rate/time/contact-gap concepts, not current rates or schedules. Inputs are fleet-scaled unless noted.

| Parameter/output | Exact formula/rule | Units, assumptions, limitations | Validation |
|---|---|---|---|
| Planned data R | N×Σ data | GB/day; continuous generation, no compression/mode selection | fleet tests |
| Daily downlink D | N×Σ downlink×c | GB/day; part downlink means full-day equivalent at continuous contact | data bottleneck tests |
| Memory | N×Σ storage | GB; no file overhead or per-craft imbalance | bounds tests |
| Required memory | R/24×T×(1−c) | GB; assumes one contiguous no-contact gap per orbit | balance.test.ts |
| Contact gate | phase≥1−c and no blackout | Synthetic common fleet window; no station location, antenna visibility, Earth occultation, scheduling contention or light time | operations.test.ts |
| Generated step data | R/24×h×availability×active instrument/storm data factor | GB; active factor=1 otherwise; linear duty proxy | conservation tests |
| Accepted/lost | accepted=min(generated,max(0,memory−stored)); overflow=generated−accepted | New observations discarded first; observations must fit before same-step downlink | overflow/counterfactual tests |
| Transmitted | when contact: min(stored,D/c/24×h×availability); else 0 | GB; continuous-contact rate recovered from daily average; no RF link budget | conservation tests |
| Received | transmitted×groundReceptionEfficiency (currently 1) | Ideal reception when contact functions; ground loss=sent−received | conservation tests |
| Contact count | false→true contact transitions | Campaign-wide representative fleet windows, not N independent station passes | deterministic traces |
| Reported return rate | round(received/days,3) | GB/day, not total lifetime delivery | simulation tests |
| Campaign extrapolation | representative generated or received/day × min(achieved life,required life) ×30 | GB; 30-day months and stationary EOL performance, not lifetime integration | code/formula inspection |

Data identities: generated=transmitted+remaining onboard+overflow; transmitted=received+ground loss. `operations.test.ts` covers 3 missions ×60 seeds, bounds and capacity upgrades. Transmission is not awarded science until received. No launch returns a zero operations ledger.

## Orbit, trajectory and visualization

Inputs in `orbits.json` are estimates: period h, eclipse/contact/solar fractions, allowed mission IDs. No Kepler-law period, altitude, inclination, eccentricity, ephemeris, delta-v, thrust, propellant or transfer calculation exists. SSO/GEO names do not validate observing geometry. Mars 0.44 solar factor is an authored input, not a calculation from a documented heliocentric distance.

`validation.ts` checks allowed mission and launcher orbit IDs plus mass. This is a gameplay compatibility table, not ascent/injection capability analysis. Swift/Atlas/Horizon are fictional services, not real launch vehicles.

`telemetry.ts` compresses operations into playback t=18…30 s: operation hour=clamp((t−18)/12,0,1)×days×24; selects the last sample not later than that hour. Samples are emitted twice per orbit and at campaign end. Schematic altitude: before liftoff 0; ascent min(180,(t−3)×18); after deployment Moon 100, Mars 320, Sun 550 (displayed km). Velocity=min(7.8,(t−3)×0.7), displayed km/s after liftoff. These are animation estimates, **not physically matched to destination gravity**. Terminal failure zeroes altitude/velocity/power/data. `telemetry.test.ts` validates failure terminality and event gating, not orbital accuracy.

Scope references only: GMAT https://software.nasa.gov/software/GSC-19468-1 (catalog Overview); Mission Viz https://nasa.github.io/mission-viz/ (demonstrations/tutorial index); 2023 visualization challenge https://www.spaceappschallenge.org/2023/challenges/visualize-a-space-mission-using-virtual-reality/ (Objectives/Potential Considerations). None of their algorithms or software is integrated.

## Risk, seeded events and lifetime consequences

Implementation: `simulation.ts`, `src/game/data/events.ts`, `operations.ts`. All probabilities, impacts and mitigations below are authored policies, not radiation forecasts or launch statistics.

- RNG is the deterministic 32-bit integer algorithm in `seededRandom`; seed coerced unsigned, increment 0x6d2b79f5, integer mixing and division by 2^32. Same design/seed repeats; no physical randomness claim.
- Launch passes only if verification ready and first random draw < fictional launcher reliability. Invalid design short-circuits launch. No actual ascent/propulsion simulation.
- On launch success, next draw selects uniformly one of four events (25% each), not four independent hazards. Playback at 23 s is separate from event activation at representative hour 48.
- Storm: power 0.75, data 0.88, lifetime 0.94. Protected computer substitutes 0.94/0.97/1. Storm lasts one orbit from hour48; lifetime factor affects final achieved-life heuristic.
- Outage: power1, dataFactor0.72, life1; radio-relay changes dataFactor to0.95. Here dataFactor determines blackout duration 24×(1−factor) h from hour48; it does **not** directly multiply generated observations.
- Fault: power1, data0.76, life0.72. Data factor persists after hour48.
- Stable event: all factors1; capacity constraints can still lose data. Copy explicitly states those limits.
- Achieved life=round(shortest installed life×event lifetime factor,1) months if launched, else0. Not calculated from accumulated radiation/battery wear.
- Risk label: high if mass/power margin<0 or cost>budget; moderate if min(mass,power margin)<10%; otherwise low. Ignores downlink/storage/battery/launcher uncertainty; not a probability or complete mission risk assessment.

Tests: `engine.test.ts` seeded success/partial/failure, protected computer, transceiver, lifetime; `operations.test.ts` causal/bounds/conservation. Realism of event severity/frequency remains unverified. MDL risk-study concepts do not supply these numbers.

## Verification and science/scoring

Implementation: `validation.ts`, `simulation.ts`. NASA-SCIENCE-MISSIONS is a conceptual citation for requirement/verification process and segment labels; historical adoption is not proven. NASA-WEBB-GAME remains mentioned only, not an implemented source. The following rules are **MissionX policies**.

- Numeric pass: actual≤target for maxima, actual≥target for minima. Nonpassing ratio actual/target (minimum) or target/actual (maximum) ≥0.9 gives internal `close`, otherwise `fail`; zero denominators have explicit code branches. UI says WARNING, not verified flight readiness.
- Four requirements: fleet mass cap, budget cap, science points minimum, lifetime minimum.
- Mandatory categories: structure,power,battery,communications,computer,attitude. Camera required for Moon/Mars; coronagraph for Sun. All part mission restrictions apply. High-resolution camera requires attitude-deep or attitude-star. One per non-science category; no duplicated part IDs. Bus allowance counts camera/science mass only. All IDs and orbit/launcher compatibility must validate.
- Normal power, usable battery and mass/budget/life/science deficits block. Positive-capacity data/storage deficits are nonblocking `close` regardless of deficit magnitude; zero capacity remains blocking. Margin<10% is nonblocking. `ready` means each check passes OR explicitly nonblocking, not every check PASS.
- Science capability S=N×Σ science points, including pointing bonuses. No resolution/wavelength/calibration/coverage/uncertainty calculation.
- f=min(1,received/(R×days)), or0 if R=0; science=round(S×f×min(1,achieved life/required life),1). Planned R, not reduced generated volume, is denominator, so lost observing duty reduces credit.
- Science score=round(100×min(1,science/target)). Engineering score=round(100×(availability+min(1,life/required))/2), if launched else0.
- Efficiency score=round(100×clamp(((budget−cost)/budget+0.55)×min(1,science/target),0,1)), if launched else0. Offset0.55 is authored balancing policy with no recorded original rationale.
- Total=round(0.50 scienceScore+0.35 engineeringScore+0.15 efficiencyScore), or0 on launch loss.
- Failed: no launch OR science<half target. Success: all four final requirements pass AND availability≥1−1e-9. Otherwise partial. 1e-9 is a numerical comparison tolerance, not science uncertainty.
- Launch segment: pass iff launched. Space: fail if not launched, warning if availability<1 or life<required, else pass. Ground: fail without launch/reception, warning if f<0.999999, else pass. User: pass at target, warning at half target, else fail. Space's strict `<1` check differs from outcome tolerance; not altered by this task.

Tests: `engine.test.ts`, `balance.test.ts`, `operations.test.ts`, `schema.test.ts` cover valid starters, overmass/overbudget, power shortage, compatibility, advisory policy, deterministic outcomes and causal explanations. No test establishes official scientific usefulness from science points.

## Progression, history and non-engineering rules

`progression.ts`: each unique evaluated run earns20+score XP, even failed runs; ranks at150/500/1200 XP. Achievements: first evaluation; launch segment pass; success outcome; score≥90 and engineering≥95; successful positive power headroom<25% supply; positive science at all3 destinations. These are authored engagement rules, not qualifications. Award ID history capped2048. Tested in `progression.test.ts`.

Mission store retains12 runs and a 2MB save guard. New runs capture bounded inputs/balances/checks/results; snapshotless legacy runs use validated design/model dispatch and recomputed results; UI clock/speed/skip never determines outcomes. Schema tests and `save-model.test.ts` address persistence/tamper handling. Mentor fallback uses engine summaries; generated AI advice is not a validated engineering source.

## Historical models and unresolved work

`engine/legacy-v1/` preserves original resource/validation/simulation algorithms. `legacy-v2.ts` preserves intermediate simulation but imports current resource/validation code: exact historic-v2 isolation is **not guaranteed**. Catalog changes can also affect old model recomputation. Existing v1/current tests are not proof all historical designs reproduce bit-for-bit. Legacy algorithms remain; new captured results are retained rather than recomputed from current catalogs.

Pending approval/work: external scientific explanation review, step-size convergence, initial-state sensitivity, charge-loss-aware feasibility, event-copy correction, remaining literal policies, complete mission-page verification and later CubeSat chapters. No official CML rating, RF link budget, propulsion, thermal, navigation, end-of-mission disposal or professional cost/risk model exists.

## Static parameter inventory

Tables below snapshot all numeric science/engineering fields in current static catalogs; every number is an educational estimate unless explicitly distinguished above. Units and evidence apply to each listed field. Individual original balancing rationales were not recorded; the intended qualitative trade is in each part's description, not evidence for its magnitude. Zero values mean no modeled contribution, not a certified zero physical property. Tests verify catalog integrity and starter feasibility, not hardware validity. Update these tables whenever catalog values change.

### `parts.json`

Field units in column order: kg; $M; W; W; Wh; GB/day; GB/day; points; months; GB; kg. Source: MISSIONX-EDUCATIONAL-ASSUMPTIONS, not numerical NASA data. Implementation: resources/validation/simulation/operations as described above.

| ID | mass | cost | draw | generation | battery | data | downlink | science | lifetime | storage | payloadLimit |
|---|---|---|---|---|---|---|---|---|---|---|---|
| bus-light | 70 | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 18 | 0 | 120 |
| bus-deep | 120 | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 48 | 0 | 300 |
| solar-compact | 30 | 5 | 0 | 320 | 0 | 0 | 0 | 0 | 48 | 0 | — |
| solar-wide | 55 | 10 | 0 | 650 | 0 | 0 | 0 | 0 | 48 | 0 | — |
| solar-deep | 75 | 16 | 0 | 1000 | 0 | 0 | 0 | 0 | 48 | 0 | — |
| battery-small | 14 | 2 | 0 | 0 | 180 | 0 | 0 | 0 | 18 | 0 | — |
| battery-large | 28 | 5 | 0 | 0 | 600 | 0 | 0 | 0 | 48 | 0 | — |
| radio-basic | 12 | 3 | 18 | 0 | 0 | 0 | 50 | 0 | 48 | 0 | — |
| radio-dish | 24 | 7 | 32 | 0 | 0 | 0 | 190 | 0 | 48 | 0 | — |
| radio-relay | 30 | 10 | 45 | 0 | 0 | 0 | 500 | 0 | 48 | 0 | — |
| computer-basic | 8 | 2 | 12 | 0 | 0 | 0 | 0 | 0 | 18 | 2 | — |
| computer-rad | 20 | 5 | 20 | 0 | 0 | 0 | 0 | 0 | 48 | 64 | — |
| attitude-basic | 12 | 3 | 10 | 0 | 0 | 0 | 0 | 0 | 48 | 0 | — |
| attitude-deep | 18 | 4 | 16 | 0 | 0 | 0 | 0 | 5 | 48 | 0 | — |
| camera-map | 20 | 5 | 25 | 0 | 0 | 12 | 0 | 45 | 48 | 0 | — |
| camera-hires | 42 | 10 | 55 | 0 | 0 | 34 | 0 | 65 | 48 | 0 | — |
| coronagraph | 22 | 6 | 30 | 0 | 0 | 14 | 0 | 42 | 48 | 0 | — |
| spectrometer | 26 | 8 | 35 | 0 | 0 | 14 | 0 | 30 | 48 | 0 | — |
| magnetometer | 8 | 3 | 8 | 0 | 0 | 3 | 0 | 12 | 48 | 0 | — |
| radar | 65 | 18 | 140 | 0 | 0 | 50 | 0 | 50 | 48 | 0 | — |
| bus-cube | 28 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 12 | 0 | 35 |
| bus-medium | 100 | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 36 | 0 | 180 |
| radio-low | 6 | 1.5 | 8 | 0 | 0 | 0 | 24 | 0 | 48 | 0 | — |
| radiation-detector | 6 | 3 | 6 | 0 | 0 | 2 | 0 | 10 | 48 | 0 | — |
| attitude-sun | 6 | 1.5 | 5 | 0 | 0 | 0 | 0 | 0 | 48 | 0 | — |
| attitude-star | 16 | 4 | 14 | 0 | 0 | 0 | 0 | 5 | 48 | 0 | — |

### `missions.json`

Field units in column order: count; kg; $M; points; months. Source: MISSIONX-EDUCATIONAL-ASSUMPTIONS, not numerical NASA data. Implementation: resources/validation/simulation/operations as described above.

| ID | fleet | massLimit | budget | scienceTarget | lifetimeTarget |
|---|---|---|---|---|---|
| moon | 1 | 550 | 85 | 45 | 12 |
| sun | 4 | 1000 | 180 | 160 | 12 |
| mars | 1 | 900 | 170 | 75 | 24 |

### `rockets.json`

Field units in column order: kg; $M; probability. Source: MISSIONX-EDUCATIONAL-ASSUMPTIONS, not numerical NASA data. Implementation: resources/validation/simulation/operations as described above.

| ID | capacity | cost | reliability |
|---|---|---|---|
| swift | 600 | 18 | 0.96 |
| atlas | 1600 | 35 | 0.975 |
| horizon | 2600 | 58 | 0.985 |

### `orbits.json`

Field units in column order: dimensionless; fraction; h; fraction. Source: MISSIONX-EDUCATIONAL-ASSUMPTIONS, not numerical NASA data. Implementation: resources/validation/simulation/operations as described above.

| ID | solarFactor | eclipse | period | contact |
|---|---|---|---|---|
| earth | 1 | 0.35 | 1.5 | 0.5 |
| lunar | 1 | 0.3 | 2 | 0.45 |
| solar | 1 | 0.2 | 1.6 | 0.55 |
| mars | 0.44 | 0.12 | 3 | 0.12 |
| sso | 1 | 0.15 | 1.65 | 0.3 |
| geo | 1 | 0.05 | 24 | 0.8 |

### `assumptions.json`

| Parameter | Input | Units / classification |
|---|---|---|
| modelVersion | 3 | model identifier |
| solarAnnualRetention | 0.98 | dimensionless authored fraction |
| batteryUsableFraction | 0.8 | dimensionless authored fraction |
| batteryDischargeEfficiency | 0.95 | dimensionless authored fraction |
| batteryChargeEfficiency | 0.95 | dimensionless authored fraction |
| groundReceptionEfficiency | 1 | dimensionless authored fraction |
| representativeDays | 4 | days |
| stepsPerOrbit | 48 | steps/orbit |
| advisoryMarginPercent | 10 | % |

`advisoryMarginPercent` now controls risk and verification headroom at the unchanged value10. Event factors are inventoried in Risk above, including TypeScript overrides. `setup.json` category hints and starter part IDs are authored educational selections, not sourced optimal designs. Mission difficulty labels are authored descriptors, not validated difficulty measurements.

## Cinematic foundation (v0.1.6; UI integration pending)
`flight-lifecycle.ts` maps existing model3 playback into preparation(0), ascent(3), upper-ascent(8), deployment/journey(13), commissioning/operations(18), evaluation(30). `flight-stages.json` records authored presentation stages/source IDs. No extra physics events or scoring changes. Deployment must actually be present and operations event reached before schematic arrival; failed launch remains lost at every later requested time. Sun Watch destination is Earth orbit/solar observations, never a flight to the Sun. Countdown uses shared 3–2–1 and LIFTOFF over three playback seconds; scene/audio are connected. flight-stages.json is descriptive, not runtime timing.

`diagnostics.ts` emits six sets of configuration findings: health, power, communications, orbit/navigation, instrument compatibility, readiness. Before arrival every status is NOT EVALUATED. After arrival PASS means an existing configuration check passes, WARNING means a nonblocking modeled deficit, FAIL means a blocking check. Subsystem installation is explicitly not measured health. Thermal/propulsion, actual navigation/insertion accuracy, calibration and RF antenna performance remain NOT EVALUATED. Aggregate prioritizes FAIL, WARNING, NOT EVALUATED, then PASS only for fully evaluated findings; mixed groups expose missing counts. No campaign-total data is passed off as arrival-time measurements. `canOperate` additionally requires commissioning acknowledgement; shared playback/UI gating is wired.

Historical stage metadata IDs: NASA-SCIENCE-MISSIONS and NASA-MISSION-VIZ are descriptive references only, not imported runtime data. Diagnostic findings now identify only MISSIONX-EDUCATIONAL-ASSUMPTIONS (authored status rules). No source supports these timing values as flight dynamics. `diagnostics.test.ts` tests all destinations and terminal launch failures; existing tests retain power/data/compatibility/outcome coverage.

`SavedRun` now optionally captures validated commanderName on launch from the existing local profile, and completedAt on first finish. Commander profile hydrates before capture, including /play. Subsequent identity edits do not rename old flights. Legacy missing fields stay absent; invalid names/dates are discarded on restore. These metadata do not affect seeded simulation. Completion timestamp means player playback evaluation acknowledgement, not physical mission arrival/lifetime. Save tests verify persistence, idempotent finish and legacy absence.

## Connected cinematic playback, commissioning and report (v0.1.7)
- `advanceFlight` in flight-lifecycle.ts is the shared HQ/flight-deck gate. Until6 diagnostic groups are acknowledged, time clamps at the actual operations event (18 playback units). Skip stops there too. Per100ms tick, countdown advances0.03 playback units at1x, yielding approximately10 wall-clock seconds over original0–3 interval; higher playback speeds compress this. Remaining journey/operations clocks are visual compression, not real travel duration. Existing seeded simulation/model3 outcomes are unchanged.
- `commissioning-panel.tsx` shows one configuration test, progress, evidence/impact/recommendation, review and Continue. Unsupported sensor/RF/thermal/navigation/calibration data remain NOT EVALUATED. FAIL blocks acknowledgement. Diagnostic count persists per flight (0…6); old missing count defaults0. No claim that six acknowledgements are real flight tests. Controllers do not advance science playback before the gate clears.
- `launch-world.tsx` retains procedural rocket/tower/instanced smoke and adds continuous ground recession, background/lighting progression, target approach, original Catmull-Rom path, Earth backdrop and selected spacecraft/fleet. Sun Watch shows Earth-orbit solar observations, not a flight to the Sun. Coordinates, scales, camera lerp and observation cone are authored visual units, not physical parameters. No new trajectory performance calculation. Camera/pan path is time-based; reduced motion disables vibration/pulsing and shortens camera interpolation. Exhaust remains bounded10/22 instances; particle count90/300; path81 points. `journey-map.tsx` is the accessible schematic equivalent.
- Flight diagnostics are configuration verification; whole-campaign outcomes do not masquerade as arrival-time sensors. Operations telemetry samples still come from engine operations; observation beam and contact color are illustrative and conditional on the acknowledgement gate. A launch failure remains terminal and never deploys the journey or diagnostics.
- `mission-report.ts` builds13 sections from SavedRun, catalog and engine resources/checks, never UI-derived fake values. Missing commander/completion/operations fields remain explicitly unavailable. Component quantities, cost and mass are fleet-aware; power/battery specifications are per spacecraft. Segment scores are not separately modeled and are labeled accordingly. Reference IDs identify conceptual sources vs authored numbers. Diagnostic review count is distinguished from generated configuration findings; actual engine schedule is distinguished from physical travel time.
- `pdf-export.ts` lazy-loads approved pdf-lib1.17.1 for A4 pages, logo, orange section headings, ruled component records, wrapped long text, page numbers, source links and disclaimer. No API/upload; static same-origin logo only. Source TOOL-PDF-LIB records MIT usage. Browser Unicode raster lines preserve displayed names but depend on installed font glyph coverage and are not searchable text; no PDF/UA certification claimed. Sanitized ASCII filenames do not change commander text inside the report. Review/download is in both existing results screens.
- Tests: shared skip gate, all mission reports/components/data, multipage PDF roundtrip, long names, existing success/partial/failure and compatibility suites. Browser gate/reload/identity/download tests and limitations recorded in Memory.md. Full physical-device audio/performance and vendor PDF viewer validation remain separate release checks.

## 0.1.8 schematic journey geometry (2026-11-14)
Trace: THREE-JOURNEY-GEOMETRY in RESOURCES. Unchanged destination centers; target-relative polar arc decreases radial distance with cubic smoothstep to a clearance radius = visible planet radius (including atmosphere) + formation/model envelope + 1.2 scene units. Envelope = 4 × model render scale + maximum centered fleet offset, conservatively bounding installed parts including 1.3× deep solar wings (unscaled reach < 3.1); not a measured spacecraft dimension. Analytical velocity sets quaternion heading and matches a circular operations orbit. Commissioning holds the endpoint until six reviews; actual rules remain engine-owned. Orbit ring and observation beam now use the same geometry.
Camera blends from ascent to a near-normal view of the orbital plane, framing both target and formation with perspective fit using the smaller horizontal/vertical half-angle, then a bounded 1.3→1 distance zoom. No FOV pumping/shake. Existing damping and portrait view offset remain. Stars use three deterministic shells, 850 low / 2350 normal points, three draws, vertex brightness/tints, no drift or per-star objects. The specific dimensions/timing are educational visual design, not navigation/orbit integration.
Tests sample all missions at .005-second intervals through travel/operations, heading/velocity continuity, fleet clearance, projected occlusion and aspect-ratio framing (four aspect ratios). This verifies ideal requested camera poses, not damped browser rendering, HUD occlusion or hardware FPS.

## 0.1.9 countdown interlock and first-use guidance
- Trace: `MISSIONX-EDUCATIONAL-ASSUMPTIONS` for authored visual timing, `W3C-APG-MODAL-TOUR` for modal interaction. No new physical/scientific parameters.
- Shared `countdownLabel(time)` maps t=[0,.8) to 3, [.8,1.6) to 2, [1.6,2.4) to 1 and [2.4,3) to LIFTOFF. At t=3 the existing rocket ascent begins. Preparation advances at 1× independent of chosen travel speed, replaces the earlier 0.3× stretched preparation, and clamps advancement at t=3. Skip cannot cross this gate; after ascent it still respects the six-review commissioning gate. Simulation events/results remain unchanged.
- The fixed-center countdown renders from the same clock in HQ and `/play/launch`. No new timer, generated audio or independent physics state machine; original countdown/ignition/liftoff cues retained. Number animations are presentation-only and disabled under OS/stored reduced motion.
- HQ tour temporarily displays actual station panels using current design, without choosing/equipping/launching. It restores the prior station and pauses playback for replay. It does not fabricate readiness or results. The launch button can be highlighted while disabled; copy explains requirements. First-use auto-start is after HQ identity/ready, not on the landing or accessible flight-deck routes.
- Tour uses four dimming regions and a spotlight, original modal text, background inertness and existing focus containment. Targets are measured/clipped to scrolling ancestors; resize/scroll observers/listeners are cleaned up. Completion/skip stored as `{version:1,status}` under `missionx-hq-tutorial-v1`; unavailable storage degrades to page-session dismissal, so persistence across reload cannot be promised when storage is blocked.

## 0.1.10 presentation-only test/report consolidation
`flightTestResults(run,time)` derives ordered preflight rows from existing `verify` checks and arrival groups/findings from existing `missionDiagnostics`. Required non-pass checks display FAIL; nonblocking non-pass checks display WARNING. `summarizeTests` counts PASS/FAIL/WARNING/NOT EVALUATED, with FAIL > WARNING > NOT EVALUATED > PASS and empty NOT EVALUATED (0.1.12 shared aggregation). UI and report consume the same names, statuses, explanations and summaries. Preflight and arrival are separate; correction0.1.11 additionally reports finding-instance counts, never conflating them with group counts. A successful configuration does not imply successful seeded launch; a launch-loss banner/event remains distinct and arrival is NOT EVALUATED.

Preflight checks already execute synchronously before flight. Their three-second progressive visual review uses the current flight clock and is labelled as review, not pretend live testing. Arrival groups advance only through existing acknowledgement state; original six-review operations gate and critical-failure behavior are unchanged. A small scoped panel scroll makes the active review/summary visible without moving the scene/HUD or adding an independent execution timer. Native progress and reduced-motion styles are presentation-only.

PDF uses existing report data grouped into cover, overview, configuration, balance, timeline, tests, science/segments, assessment and sources. Table text wraps by measured font/canvas width; rows stay together when they fit a fresh page and oversized rows continue with repeated section/column headers. Diagnostic findings have individual rows so a large group does not strand half a page. All pages carry a clickable exact owner URL and page numbers. Reports are not fixed to a page count; parameter provenance adds pages depending on selected parts and text wrapping. No fabricated missing values or empty filler pages are added. Browser Unicode still uses system-font rasterization; glyph coverage/searchability and tagged-PDF accessibility remain limitations without the separately approved font/accessibility work.

## 0.1.12 software-only correction

Fixed schema1 wire reader no longer calls current simulation/catalogs for shape validation; safe optional defaults and unsupported-snapshot retention are documented in [Post-Audit-Corrections.md](Post-Audit-Corrections.md). No formulas changed. Weighted score rounding is independent of outcome;100 is not an assertion of all requirements passing.
