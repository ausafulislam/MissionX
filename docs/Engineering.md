# MissionX educational engineering model

All values are invented, simplified estimates for learning, not agency specifications, safety assessments or launch predictions. The model is intentionally understandable and deterministic.

## Resources
- One installed component per subsystem, except science instruments can be combined; no duplicated instrument IDs.
- Total mass = sum of component masses × fleet size.
- Total budget = sum of component costs × fleet size + launch service cost.
- Sun Watch has four identical spacecraft; per-craft energy and lifetime remain per-craft, while mass, cost, science and data scale to the fleet.
- Average solar generation = nominal array generation × orbit solar factor × (1 − eclipse fraction).
- Average demand = sum of component power draw. Preflight requires generation ≥ demand.
- Eclipse energy required = demand × eclipse fraction × orbit period in hours. Installed battery capacity must cover this.
- Downlink = nominal radio capacity × ground contact fraction × fleet size. Must cover the fleet's generated daily data.
- Design lifetime is the shortest lifetime among installed components.
- Science capability is the sum of instrument/pointing science points × fleet size.

Four mission requirements are mass maximum, budget maximum, science minimum, lifetime minimum. Structural, payload, compatibility, power, battery, data, rocket capacity and trajectory checks also block launch. CLOSE means within 10% of target but still not passing.

## Seeded simulation
The same design + 32-bit seed always produce the same report. Browser clock, random API and graphics never influence the engine. The launcher has a catalog reliability threshold; a failed draw ends the mission at the launch segment. Successful launches deploy the configured fleet and draw one controlled operations event: stable operations, solar storm, ground contact outage or instrument degradation.

Storms affect power/data/lifetime; protected computers soften them. Transceivers recover more missed-contact data. Remaining battery reserve can cover a one-orbit power deficit after a storm (usable Wh / orbit hours), capped at the unmet demand. A persistent remaining power deficit reduces operating availability, science return and lifetime. Instrument degradation reduces science data and lifetime. The final four requirements are recalculated using achieved science and actual lifetime.

- Failed: launch loss, invalid design, or less than half the science target.
- Success: all four final requirements pass and full power availability.
- Partial: useful science returned, but the complete goal was not achieved.
- Score: 50% science attainment + 35% engineering (power availability and lifetime attainment) + 15% resource efficiency (budget headroom weighted by science delivery). Each dimension is bounded 0–100. Launch loss scores zero.

The scene reads engine events and elapsed playback time. It never rolls outcomes independently. Pause, speed, skip and reduced motion do not change results. Spaceflight durations, altitude and velocity are schematic; this is not an orbital mechanics integrator. Refreshing a flight restarts its deterministic playback.

## Catalog probe
`bun run balance` generates 1,000 seeded random configurations per mission. In the current catalog, 419 Moon, 86 Sun, and 3 Mars configurations pass all preflight checks; of those, 83%, 47%, and 67% succeed in the sampled flights. This is a diagnostic, not a claim about real spacecraft. Mars is deliberately demanding; the explicit Load Baseline action provides a verified starting point for all missions. Further classroom balance tuning is recommended.
