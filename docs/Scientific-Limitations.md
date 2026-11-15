# Scientific scope and limitations

[Documentation index](README.md) · [Parameter provenance](DATA_SOURCES.md) · [Formulas](ENGINEERING_REFERENCES.md)

MissionX is an independent educational space mission design game. It is not a NASA-certified, endorsed or numerically validated simulator and does not use GMAT internally.

## Modeled educational relationships

Static authored mass/cost/science/lifetime; simplified EOL array power; per-spacecraft energy and usable battery; synthetic repeating eclipse/contact cycles; finite fleet memory, transmission/reception; seeded launch/event risk; score policy and configuration review. Current simulation model remains 3. No scientific magnitudes or score weights were changed by correction release 0.1.11.

## Not modeled / NOT EVALUATED

- Real orbital propagation, transfer/navigation solution or measured insertion accuracy.
- Launch thrust/drag/staging dynamics, propulsion, delta-v or propellant sizing.
- RF link budget, signal quality, antenna compatibility/acquisition or real ground-network scheduling.
- Thermal analysis, structural/vibration analysis, radiation transport or physical attitude dynamics.
- Measured spacecraft health, propulsion health, temperature, instrument calibration, mapping resolution, coverage or discoveries.
- Real vendor pricing, lifecycle cost, validated launch reliability or official concept maturity assessment.

No numerical NASA validation, professional mission approval or real spacecraft certification is established. PASS means a configured rule/presence check passed, never an unimplemented physical measurement.

## Numerical assumptions

Four representative EOL days, 48 midpoint steps/orbit, full initial usable battery and empty memory. Battery usable fraction .8, discharge allowance .95 and charging efficiency .95 are authored; no temperature/rate/cycle-aging model. Solar retention .98/year is authored, not a universal degradation constant. Loads are constant, craft identical, windows synthetic. Finite storage before same-step transmission is conservative ordering. Ground reception efficiency is idealized at1; no packet overhead/latency/error model.

Final campaign volume = representative daily rate × min(achieved life, required life) ×30 days/month. This is stationary extrapolation, not evolving lifetime integration. Convergence, initial-state sensitivity and independent physical accuracy remain unverified.

Event probabilities/factors, weak-component lifetime, science points, score weights and outcome thresholds are authored gameplay policy. Science credit depends on received/planned data and capped lifetime fraction; it does not predict discoveries. Sun Watch observes the Sun from Earth orbit, not a modeled journey to the Sun. 3D/2D journeys, altitude, velocity and formation scales are schematic.

## Diagnostics

FAIL overrides WARNING; WARNING overrides NOT EVALUATED; PASS requires all findings evaluated/passed. Group and finding counts are both shown. Mixed WARNING/NOT EVALUATED groups visibly disclose missing findings. Acknowledging six groups permits science playback even though unmodeled properties remain NOT EVALUATED; this is an interaction gate, not qualification.

## Historical reproducibility

New store-launched runs capture selected inputs, assumptions, calculated balances/checks and actual result, with catalog/assumption IDs. Local snapshots have bounded validation and a corruption checksum, not a digital signature or proof against deliberate local editing. They preserve the run data, not a complete historical executable. Reports use captured inputs; diagnostic aggregation and explanatory source metadata use current reporting logic.

Legacy runs without snapshots cannot recover original inputs: restoration retains legacy model dispatch but reconstructs using current catalogs, explicitly labeled in UI/PDF. Legacy-v2 also shares current resource/verification helpers. No claim of bit-for-bit historical replay is made. Current visual telemetry/archive comparison outside the captured report context can still use current catalog presentation; the report's provenance disclosure is authoritative for its balance tables.

Agency/community source links are conceptual or historical references, not numerical justification. See classifications and actual review scope in [RESOURCES.md](RESOURCES.md). Future scientific models need verified sources, units, assumptions, review and separate owner approval.

### 0.1.12 snapshot/score clarification

Fixed schema1 validation is independent of current catalog/assumption structure. Future optional fields do not become required by changing today’s data; required historical numeric fields remain required. Invalid/unsupported supplied snapshots fail closed, with a storage warning and retained raw save, not reconstructed reports. This is not a permanent executable archive. Weighted Performance Score is rounded independently of outcome;100 does not imply all objectives were achieved.
