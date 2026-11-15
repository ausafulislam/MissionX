# Scientific scope and limitations

[Documentation index](README.md)

MissionX teaches coupled resource trades. It is not a professional mission-analysis package or NASA-approved engineering process.

## What is modeled

Static mass/cost/science/lifetime, simplified EOL array degradation, per-craft energy, synthetic eclipse/contact cycles, finite memory, data transmission/reception, seeded launch/event risk, authored score aggregation and configuration diagnostics. Current model version is 3.

## What is not established

- No orbital propagation, delta-v, propellant sizing, transfer/navigation solution or measured insertion accuracy.
- No thermal, structural/vibration, radiation transport, attitude dynamics or hardware health model.
- No real RF link budget, antenna compatibility/acquisition measurement or real ground station network.
- No scientific instrument calibration, measured mapping resolution/coverage or discovery prediction.
- No actual vendor prices, agency spacecraft specifications, validated reliability or professional lifecycle cost model.
- No official concept maturity level, mission readiness certification or launch approval.
- No independently established numerical convergence, initial-state sensitivity or validated physical accuracy.

Four representative EOL days and 48 steps/orbit are authored choices. Full initial battery, synthetic schedules and stationary 30-day-month campaign extrapolation influence outcomes. Sun Watch uses four identical craft rather than independent constellation geometry. Legacy replay can share current catalog values.

Agency sources support only the named concepts/sections in [RESOURCES](RESOURCES.md); catalog values, scoring, probabilities and timing remain [authored assumptions](ENGINEERING_REFERENCES.md). A source link does not validate all calculations or grant reuse rights. Navigation-only retrieval is not full mission-page review.

Future work (not implemented): parameter-level source IDs, external scientific review, convergence/initial-state studies and wider device/accessibility testing. Real engineering requires dedicated analysis, qualified review and applicable requirements beyond this game.
