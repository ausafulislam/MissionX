# Launch, operations and evaluation

[Documentation index](README.md)

## Two clocks, different meanings

`simulate()` computes the seeded result. The UI plays back compressed events; it does not integrate a physical trip. Events are at 0 (countdown), 3 (liftoff), 8 (separation), 13 (deployment), 18 (operations), 23 (one authored incident) and 30 seconds (completion). A failed launch terminates at 7 seconds instead. Countdown uses three 0.8-second beats and a 0.6-second liftoff hold: authored presentation timing, not rocket procedure.

`flightLifecycle()` maps the timeline to preparation, ascent, journey, commissioning, operations, evaluation or loss. Sun Watch remains in Earth orbit observing the Sun. Journey geometry is schematic, not an ephemeris/propagated trajectory. Six reviews gate playback at arrival; see [verification](Verification.md).

## Seed and reliability

`seededRandom()` in `simulation.ts` supplies reproducible draws. A valid configuration still faces the fictional launcher's authored reliability. One authored operational incident is then selected; protected computer/radio choices mitigate specific event factors. Determinism applies to identical design, seed, implementation and catalog inputs, not all future releases.

## Representative operations

`operate()` in `operations.ts` uses four representative end-of-life days and 48 steps per orbit. Synthetic midpoint sunlight/contact schedules drive energy and data flow. It begins with full usable battery and empty onboard data, includes charging/discharging losses, limits memory, and records generated, transmitted, received, remaining and lost data. Energy shortfalls reduce instrument duty. This is not a continuous orbit solution or validated full-duration campaign.

Campaign totals extrapolate representative daily rates over achieved/required life using 30-day months. Stationary EOL conditions, initial battery state and timestep choices are limitations; convergence and sensitivity studies are not claimed.

## Science and score

Source: `simulation.ts`, `resources.ts`, `operations.ts`; all weights/thresholds are authored educational policy.

- Achieved life: shortest selected-part life multiplied by the incident lifetime factor (zero after launch failure).
- Science: catalog fleet science × received/planned fraction × capped achieved/required lifetime fraction, rounded to one decimal.
- Science score: capped science/target × 100, rounded.
- Engineering score: average of energy availability and capped lifetime fraction × 100, rounded; zero after launch loss.
- Efficiency score: clamp to 0–1 of `((budget − cost)/budget + 0.55) × min(1, science/target)`, × 100 rounded; zero after launch loss.
- Total: rounded `0.50 × scienceScore + 0.35 × engineeringScore + 0.15 × efficiencyScore`; zero after launch loss.
- Failed: launch loss or science below half target. Success: all four final mission requirements pass and energy availability is at least `1 − 1e−9`. Other completed cases are partial.

Launch / Space / Ground / User segment explanations describe specific criteria; they are not four separately awarded scores. Actual Earth-received observations earn science credit, not reaching a destination illustration. See [engineering references](ENGINEERING_REFERENCES.md) for conservation formulas and test mappings.
