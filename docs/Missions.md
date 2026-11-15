# Missions and catalog

[Documentation index](README.md)

Source of truth: `src/game/data/{missions,parts,rockets,orbits,setup,assumptions}.json`, exposed by `catalog.ts`. All numeric values are **MissionX educational estimates**, not agency specifications. No original parameter-selection rationale is available unless explicitly recorded in the engineering register.

## Mission requirements

Mass is total fleet mass (kg); budget is fleet parts plus one launch (million USD); science is a gameplay points proxy; lifetime is months.

| ID / mission | Fleet | Mass limit kg | Budget $M | Science points | Life months | Context link |
|---|---:|---:|---:|---:|---:|---|
| `moon` / Moon Mapping | 1 | 550 | 85 | 45 | 12 | [Lunar Reconnaissance Orbiter](https://science.nasa.gov/mission/lro/) |
| `sun` / Sun Watch | 4 | 1000 | 180 | 160 | 12 | [PUNCH](https://science.nasa.gov/mission/punch/) |
| `mars` / Mars Orbiter | 1 | 900 | 170 | 75 | 24 | [Mars Reconnaissance Orbiter](https://science.nasa.gov/mission/mars-reconnaissance-orbiter/) |

Moon/Mars require a camera. Sun Watch requires a coronagraph on each identical craft; its orbit is Earth-based, not a Sun intercept. Context links do not source the numerical rows above. Individual mission pages were not fully re-reviewed during this documentation pass; prior evidence is retained in the resource register.

## Fictional launch services

None of these are real provider specifications. Reliability is a seeded probability, not a guarantee. A name resemblance does not identify a real launch vehicle.

| ID / name | Capacity kg | Cost $M | Reliability | Reachable orbit IDs |
|---|---:|---:|---:|---|
| `swift` / Swift Light | 600 | 18 | 0.96 | lunar, earth, sso |
| `atlas` / Atlas Medium | 1600 | 35 | 0.975 | earth, lunar, solar, sso, geo |
| `horizon` / Horizon Heavy | 2600 | 58 | 0.985 | earth, lunar, solar, mars, sso, geo |

## Synthetic orbit inputs

Periods are hours; eclipse and contact are dimensionless fractions; solar factor is dimensionless. These describe synthetic schedules, not solved trajectories or ground-station visibility.

| ID / name | Science missions | Solar factor | Eclipse | Period h | Contact |
|---|---|---:|---:|---:|---:|
| `earth` / Low Earth orbit | None | 1 | 0.35 | 1.5 | 0.5 |
| `lunar` / Lunar polar orbit | moon | 1 | 0.3 | 2 | 0.45 |
| `solar` / Sun-observing Earth orbit | sun | 1 | 0.2 | 1.6 | 0.55 |
| `mars` / Mars science orbit | mars | 0.44 | 0.12 | 3 | 0.12 |
| `sso` / Sun-synchronous Earth orbit | sun | 1 | 0.15 | 1.65 | 0.3 |
| `geo` / Geostationary Earth orbit | sun | 1 | 0.05 | 24 | 0.8 |

An orbit can be reachable by a launcher but unsuitable for mission science. Low Earth staging, SSO and GEO alternatives are checked against the actual mission compatibility lists rather than assumed valid. See [verification](Verification.md) and [engineering references](ENGINEERING_REFERENCES.md).
