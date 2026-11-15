# Parameter-level data provenance

[Documentation index](README.md) · [Sources](RESOURCES.md) · [Formulas](ENGINEERING_REFERENCES.md)

Inspected 2026-11-14; catalog registry `missionx-catalog-0.1.11`, assumption registry `missionx-assumptions-3-0.1.11`, result model 3. Identifiers are manual release identifiers, not a scientific dataset version or live resolver.

## Reading every parameter record

Each table row is a distinct parameter record. The following fields apply **individually to every authored row**, not just to each catalog:

- **Provenance type:** authored. **Statement:** "MissionX-authored educational estimate; original balancing rationale not recorded."
- **Original numerical source URL:** none established. The repository https://github.com/ausafulislam/MissionX records implementation, not independent scientific authority.
- **Source version/date:** original balancing date unknown; present value inspected 2026-11-14 in the registry versions above.
- **Page/section:** no external numerical source/page. **Transformation:** direct catalog input, followed by the documented engine formulas.
- **Confidence:** high for code/value inventory, physical accuracy unverified. **Verification:** inspected local code; tests check behavior, not aerospace validity.
- **UI consumer:** builder/component inspection and resource/verification screens (mission/rocket/orbit fields also selection screens); derived outcomes appear in results.
- **PDF consumer:** `parameterRows()` prints each selected parameter ID/value in Sources and references; configuration/balance/trajectory/results tables consume the same captured input context. Current documentation descriptions are not archived historical source verification.
- **File path:** all catalog files below are under `src/game/data/`; named runtime functions are under `src/game/engine/`.

No catalog number is currently classified as measured or externally copied. Unknown provenance refers to the original *reason for the magnitude*, not evidence of a hidden NASA source. Zero means no modeled contribution, not a measured physical zero. Versions are bookkeeping, not educational magnitude estimates.

## `missions.json`

| Parameter ID | File.field | Current value | Unit | Runtime consumer |
|---|---|---:|---|---|
| missions:moon.fleet | missions.json → fleet | 1 | count | resources; operations; simulation |
| missions:moon.massLimit | missions.json → massLimit | 550 | kg fleet | resources; validation |
| missions:moon.budget | missions.json → budget | 85 | $M fleet | resources; validation; scoring |
| missions:moon.scienceTarget | missions.json → scienceTarget | 45 | points fleet | validation; simulation |
| missions:moon.lifetimeTarget | missions.json → lifetimeTarget | 12 | months | resources; validation; simulation |
| missions:sun.fleet | missions.json → fleet | 4 | count | resources; operations; simulation |
| missions:sun.massLimit | missions.json → massLimit | 1000 | kg fleet | resources; validation |
| missions:sun.budget | missions.json → budget | 180 | $M fleet | resources; validation; scoring |
| missions:sun.scienceTarget | missions.json → scienceTarget | 160 | points fleet | validation; simulation |
| missions:sun.lifetimeTarget | missions.json → lifetimeTarget | 12 | months | resources; validation; simulation |
| missions:mars.fleet | missions.json → fleet | 1 | count | resources; operations; simulation |
| missions:mars.massLimit | missions.json → massLimit | 900 | kg fleet | resources; validation |
| missions:mars.budget | missions.json → budget | 170 | $M fleet | resources; validation; scoring |
| missions:mars.scienceTarget | missions.json → scienceTarget | 75 | points fleet | validation; simulation |
| missions:mars.lifetimeTarget | missions.json → lifetimeTarget | 24 | months | resources; validation; simulation |

## `parts.json`

| Parameter ID | File.field | Current value | Unit | Runtime consumer |
|---|---|---:|---|---|
| parts:bus-light.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:bus-light.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:bus-light.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:bus-light.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:bus-light.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:bus-light.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:bus-light.lifetime | parts.json → lifetime | 18 | months | resources; simulation |
| parts:bus-light.mass | parts.json → mass | 70 | kg/spacecraft | resources; validation |
| parts:bus-light.cost | parts.json → cost | 8 | $M/spacecraft | resources; scoring |
| parts:bus-light.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:bus-light.payloadLimit | parts.json → payloadLimit | 120 | kg/spacecraft | validation |
| parts:bus-deep.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:bus-deep.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:bus-deep.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:bus-deep.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:bus-deep.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:bus-deep.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:bus-deep.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:bus-deep.mass | parts.json → mass | 120 | kg/spacecraft | resources; validation |
| parts:bus-deep.cost | parts.json → cost | 14 | $M/spacecraft | resources; scoring |
| parts:bus-deep.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:bus-deep.payloadLimit | parts.json → payloadLimit | 300 | kg/spacecraft | validation |
| parts:solar-compact.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:solar-compact.generation | parts.json → generation | 320 | W/spacecraft | resources; operations |
| parts:solar-compact.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:solar-compact.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:solar-compact.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:solar-compact.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:solar-compact.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:solar-compact.mass | parts.json → mass | 30 | kg/spacecraft | resources; validation |
| parts:solar-compact.cost | parts.json → cost | 5 | $M/spacecraft | resources; scoring |
| parts:solar-compact.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:solar-wide.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:solar-wide.generation | parts.json → generation | 650 | W/spacecraft | resources; operations |
| parts:solar-wide.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:solar-wide.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:solar-wide.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:solar-wide.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:solar-wide.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:solar-wide.mass | parts.json → mass | 55 | kg/spacecraft | resources; validation |
| parts:solar-wide.cost | parts.json → cost | 10 | $M/spacecraft | resources; scoring |
| parts:solar-wide.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:solar-deep.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:solar-deep.generation | parts.json → generation | 1000 | W/spacecraft | resources; operations |
| parts:solar-deep.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:solar-deep.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:solar-deep.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:solar-deep.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:solar-deep.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:solar-deep.mass | parts.json → mass | 75 | kg/spacecraft | resources; validation |
| parts:solar-deep.cost | parts.json → cost | 16 | $M/spacecraft | resources; scoring |
| parts:solar-deep.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:battery-small.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:battery-small.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:battery-small.battery | parts.json → battery | 180 | Wh/spacecraft | resources; operations |
| parts:battery-small.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:battery-small.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:battery-small.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:battery-small.lifetime | parts.json → lifetime | 18 | months | resources; simulation |
| parts:battery-small.mass | parts.json → mass | 14 | kg/spacecraft | resources; validation |
| parts:battery-small.cost | parts.json → cost | 2 | $M/spacecraft | resources; scoring |
| parts:battery-small.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:battery-large.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:battery-large.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:battery-large.battery | parts.json → battery | 600 | Wh/spacecraft | resources; operations |
| parts:battery-large.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:battery-large.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:battery-large.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:battery-large.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:battery-large.mass | parts.json → mass | 28 | kg/spacecraft | resources; validation |
| parts:battery-large.cost | parts.json → cost | 5 | $M/spacecraft | resources; scoring |
| parts:battery-large.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:radio-basic.draw | parts.json → draw | 18 | W/spacecraft | resources; operations |
| parts:radio-basic.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:radio-basic.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:radio-basic.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:radio-basic.downlink | parts.json → downlink | 50 | GB/day continuous contact/spacecraft | resources; operations |
| parts:radio-basic.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:radio-basic.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:radio-basic.mass | parts.json → mass | 12 | kg/spacecraft | resources; validation |
| parts:radio-basic.cost | parts.json → cost | 3 | $M/spacecraft | resources; scoring |
| parts:radio-basic.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:radio-dish.draw | parts.json → draw | 32 | W/spacecraft | resources; operations |
| parts:radio-dish.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:radio-dish.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:radio-dish.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:radio-dish.downlink | parts.json → downlink | 190 | GB/day continuous contact/spacecraft | resources; operations |
| parts:radio-dish.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:radio-dish.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:radio-dish.mass | parts.json → mass | 24 | kg/spacecraft | resources; validation |
| parts:radio-dish.cost | parts.json → cost | 7 | $M/spacecraft | resources; scoring |
| parts:radio-dish.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:radio-relay.draw | parts.json → draw | 45 | W/spacecraft | resources; operations |
| parts:radio-relay.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:radio-relay.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:radio-relay.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:radio-relay.downlink | parts.json → downlink | 500 | GB/day continuous contact/spacecraft | resources; operations |
| parts:radio-relay.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:radio-relay.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:radio-relay.mass | parts.json → mass | 30 | kg/spacecraft | resources; validation |
| parts:radio-relay.cost | parts.json → cost | 10 | $M/spacecraft | resources; scoring |
| parts:radio-relay.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:computer-basic.draw | parts.json → draw | 12 | W/spacecraft | resources; operations |
| parts:computer-basic.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:computer-basic.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:computer-basic.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:computer-basic.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:computer-basic.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:computer-basic.lifetime | parts.json → lifetime | 18 | months | resources; simulation |
| parts:computer-basic.mass | parts.json → mass | 8 | kg/spacecraft | resources; validation |
| parts:computer-basic.cost | parts.json → cost | 2 | $M/spacecraft | resources; scoring |
| parts:computer-basic.storage | parts.json → storage | 2 | GB/spacecraft | resources; operations |
| parts:computer-rad.draw | parts.json → draw | 20 | W/spacecraft | resources; operations |
| parts:computer-rad.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:computer-rad.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:computer-rad.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:computer-rad.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:computer-rad.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:computer-rad.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:computer-rad.mass | parts.json → mass | 20 | kg/spacecraft | resources; validation |
| parts:computer-rad.cost | parts.json → cost | 5 | $M/spacecraft | resources; scoring |
| parts:computer-rad.storage | parts.json → storage | 64 | GB/spacecraft | resources; operations |
| parts:attitude-basic.draw | parts.json → draw | 10 | W/spacecraft | resources; operations |
| parts:attitude-basic.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:attitude-basic.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:attitude-basic.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:attitude-basic.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:attitude-basic.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:attitude-basic.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:attitude-basic.mass | parts.json → mass | 12 | kg/spacecraft | resources; validation |
| parts:attitude-basic.cost | parts.json → cost | 3 | $M/spacecraft | resources; scoring |
| parts:attitude-basic.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:attitude-deep.draw | parts.json → draw | 16 | W/spacecraft | resources; operations |
| parts:attitude-deep.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:attitude-deep.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:attitude-deep.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:attitude-deep.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:attitude-deep.science | parts.json → science | 5 | points/spacecraft | resources; simulation |
| parts:attitude-deep.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:attitude-deep.mass | parts.json → mass | 18 | kg/spacecraft | resources; validation |
| parts:attitude-deep.cost | parts.json → cost | 4 | $M/spacecraft | resources; scoring |
| parts:attitude-deep.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:camera-map.draw | parts.json → draw | 25 | W/spacecraft | resources; operations |
| parts:camera-map.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:camera-map.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:camera-map.data | parts.json → data | 12 | GB/day/spacecraft | resources; operations; science |
| parts:camera-map.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:camera-map.science | parts.json → science | 45 | points/spacecraft | resources; simulation |
| parts:camera-map.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:camera-map.mass | parts.json → mass | 20 | kg/spacecraft | resources; validation |
| parts:camera-map.cost | parts.json → cost | 5 | $M/spacecraft | resources; scoring |
| parts:camera-map.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:camera-hires.draw | parts.json → draw | 55 | W/spacecraft | resources; operations |
| parts:camera-hires.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:camera-hires.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:camera-hires.data | parts.json → data | 34 | GB/day/spacecraft | resources; operations; science |
| parts:camera-hires.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:camera-hires.science | parts.json → science | 65 | points/spacecraft | resources; simulation |
| parts:camera-hires.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:camera-hires.mass | parts.json → mass | 42 | kg/spacecraft | resources; validation |
| parts:camera-hires.cost | parts.json → cost | 10 | $M/spacecraft | resources; scoring |
| parts:camera-hires.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:coronagraph.draw | parts.json → draw | 30 | W/spacecraft | resources; operations |
| parts:coronagraph.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:coronagraph.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:coronagraph.data | parts.json → data | 14 | GB/day/spacecraft | resources; operations; science |
| parts:coronagraph.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:coronagraph.science | parts.json → science | 42 | points/spacecraft | resources; simulation |
| parts:coronagraph.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:coronagraph.mass | parts.json → mass | 22 | kg/spacecraft | resources; validation |
| parts:coronagraph.cost | parts.json → cost | 6 | $M/spacecraft | resources; scoring |
| parts:coronagraph.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:spectrometer.draw | parts.json → draw | 35 | W/spacecraft | resources; operations |
| parts:spectrometer.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:spectrometer.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:spectrometer.data | parts.json → data | 14 | GB/day/spacecraft | resources; operations; science |
| parts:spectrometer.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:spectrometer.science | parts.json → science | 30 | points/spacecraft | resources; simulation |
| parts:spectrometer.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:spectrometer.mass | parts.json → mass | 26 | kg/spacecraft | resources; validation |
| parts:spectrometer.cost | parts.json → cost | 8 | $M/spacecraft | resources; scoring |
| parts:spectrometer.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:magnetometer.draw | parts.json → draw | 8 | W/spacecraft | resources; operations |
| parts:magnetometer.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:magnetometer.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:magnetometer.data | parts.json → data | 3 | GB/day/spacecraft | resources; operations; science |
| parts:magnetometer.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:magnetometer.science | parts.json → science | 12 | points/spacecraft | resources; simulation |
| parts:magnetometer.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:magnetometer.mass | parts.json → mass | 8 | kg/spacecraft | resources; validation |
| parts:magnetometer.cost | parts.json → cost | 3 | $M/spacecraft | resources; scoring |
| parts:magnetometer.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:radar.draw | parts.json → draw | 140 | W/spacecraft | resources; operations |
| parts:radar.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:radar.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:radar.data | parts.json → data | 50 | GB/day/spacecraft | resources; operations; science |
| parts:radar.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:radar.science | parts.json → science | 50 | points/spacecraft | resources; simulation |
| parts:radar.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:radar.mass | parts.json → mass | 65 | kg/spacecraft | resources; validation |
| parts:radar.cost | parts.json → cost | 18 | $M/spacecraft | resources; scoring |
| parts:radar.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:bus-cube.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:bus-cube.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:bus-cube.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:bus-cube.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:bus-cube.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:bus-cube.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:bus-cube.lifetime | parts.json → lifetime | 12 | months | resources; simulation |
| parts:bus-cube.mass | parts.json → mass | 28 | kg/spacecraft | resources; validation |
| parts:bus-cube.cost | parts.json → cost | 4 | $M/spacecraft | resources; scoring |
| parts:bus-cube.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:bus-cube.payloadLimit | parts.json → payloadLimit | 35 | kg/spacecraft | validation |
| parts:bus-medium.draw | parts.json → draw | 0 | W/spacecraft | resources; operations |
| parts:bus-medium.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:bus-medium.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:bus-medium.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:bus-medium.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:bus-medium.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:bus-medium.lifetime | parts.json → lifetime | 36 | months | resources; simulation |
| parts:bus-medium.mass | parts.json → mass | 100 | kg/spacecraft | resources; validation |
| parts:bus-medium.cost | parts.json → cost | 11 | $M/spacecraft | resources; scoring |
| parts:bus-medium.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:bus-medium.payloadLimit | parts.json → payloadLimit | 180 | kg/spacecraft | validation |
| parts:radio-low.draw | parts.json → draw | 8 | W/spacecraft | resources; operations |
| parts:radio-low.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:radio-low.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:radio-low.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:radio-low.downlink | parts.json → downlink | 24 | GB/day continuous contact/spacecraft | resources; operations |
| parts:radio-low.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:radio-low.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:radio-low.mass | parts.json → mass | 6 | kg/spacecraft | resources; validation |
| parts:radio-low.cost | parts.json → cost | 1.5 | $M/spacecraft | resources; scoring |
| parts:radio-low.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:radiation-detector.draw | parts.json → draw | 6 | W/spacecraft | resources; operations |
| parts:radiation-detector.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:radiation-detector.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:radiation-detector.data | parts.json → data | 2 | GB/day/spacecraft | resources; operations; science |
| parts:radiation-detector.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:radiation-detector.science | parts.json → science | 10 | points/spacecraft | resources; simulation |
| parts:radiation-detector.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:radiation-detector.mass | parts.json → mass | 6 | kg/spacecraft | resources; validation |
| parts:radiation-detector.cost | parts.json → cost | 3 | $M/spacecraft | resources; scoring |
| parts:radiation-detector.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:attitude-sun.draw | parts.json → draw | 5 | W/spacecraft | resources; operations |
| parts:attitude-sun.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:attitude-sun.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:attitude-sun.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:attitude-sun.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:attitude-sun.science | parts.json → science | 0 | points/spacecraft | resources; simulation |
| parts:attitude-sun.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:attitude-sun.mass | parts.json → mass | 6 | kg/spacecraft | resources; validation |
| parts:attitude-sun.cost | parts.json → cost | 1.5 | $M/spacecraft | resources; scoring |
| parts:attitude-sun.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |
| parts:attitude-star.draw | parts.json → draw | 14 | W/spacecraft | resources; operations |
| parts:attitude-star.generation | parts.json → generation | 0 | W/spacecraft | resources; operations |
| parts:attitude-star.battery | parts.json → battery | 0 | Wh/spacecraft | resources; operations |
| parts:attitude-star.data | parts.json → data | 0 | GB/day/spacecraft | resources; operations; science |
| parts:attitude-star.downlink | parts.json → downlink | 0 | GB/day continuous contact/spacecraft | resources; operations |
| parts:attitude-star.science | parts.json → science | 5 | points/spacecraft | resources; simulation |
| parts:attitude-star.lifetime | parts.json → lifetime | 48 | months | resources; simulation |
| parts:attitude-star.mass | parts.json → mass | 16 | kg/spacecraft | resources; validation |
| parts:attitude-star.cost | parts.json → cost | 4 | $M/spacecraft | resources; scoring |
| parts:attitude-star.storage | parts.json → storage | 0 | GB/spacecraft | resources; operations |

## `rockets.json`

| Parameter ID | File.field | Current value | Unit | Runtime consumer |
|---|---|---:|---|---|
| rockets:swift.capacity | rockets.json → capacity | 600 | kg | resources; validation |
| rockets:swift.cost | rockets.json → cost | 18 | $M/launch | resources; scoring |
| rockets:swift.reliability | rockets.json → reliability | 0.96 | probability | simulation |
| rockets:atlas.capacity | rockets.json → capacity | 1600 | kg | resources; validation |
| rockets:atlas.cost | rockets.json → cost | 35 | $M/launch | resources; scoring |
| rockets:atlas.reliability | rockets.json → reliability | 0.975 | probability | simulation |
| rockets:horizon.capacity | rockets.json → capacity | 2600 | kg | resources; validation |
| rockets:horizon.cost | rockets.json → cost | 58 | $M/launch | resources; scoring |
| rockets:horizon.reliability | rockets.json → reliability | 0.985 | probability | simulation |

## `orbits.json`

| Parameter ID | File.field | Current value | Unit | Runtime consumer |
|---|---|---:|---|---|
| orbits:earth.solarFactor | orbits.json → solarFactor | 1 | factor | resources |
| orbits:earth.eclipse | orbits.json → eclipse | 0.35 | fraction | resources; operations |
| orbits:earth.period | orbits.json → period | 1.5 | h | resources; operations |
| orbits:earth.contact | orbits.json → contact | 0.5 | fraction | resources; operations |
| orbits:lunar.solarFactor | orbits.json → solarFactor | 1 | factor | resources |
| orbits:lunar.eclipse | orbits.json → eclipse | 0.3 | fraction | resources; operations |
| orbits:lunar.period | orbits.json → period | 2 | h | resources; operations |
| orbits:lunar.contact | orbits.json → contact | 0.45 | fraction | resources; operations |
| orbits:solar.solarFactor | orbits.json → solarFactor | 1 | factor | resources |
| orbits:solar.eclipse | orbits.json → eclipse | 0.2 | fraction | resources; operations |
| orbits:solar.period | orbits.json → period | 1.6 | h | resources; operations |
| orbits:solar.contact | orbits.json → contact | 0.55 | fraction | resources; operations |
| orbits:mars.solarFactor | orbits.json → solarFactor | 0.44 | factor | resources |
| orbits:mars.eclipse | orbits.json → eclipse | 0.12 | fraction | resources; operations |
| orbits:mars.period | orbits.json → period | 3 | h | resources; operations |
| orbits:mars.contact | orbits.json → contact | 0.12 | fraction | resources; operations |
| orbits:sso.solarFactor | orbits.json → solarFactor | 1 | factor | resources |
| orbits:sso.eclipse | orbits.json → eclipse | 0.15 | fraction | resources; operations |
| orbits:sso.period | orbits.json → period | 1.65 | h | resources; operations |
| orbits:sso.contact | orbits.json → contact | 0.3 | fraction | resources; operations |
| orbits:geo.solarFactor | orbits.json → solarFactor | 1 | factor | resources |
| orbits:geo.eclipse | orbits.json → eclipse | 0.05 | fraction | resources; operations |
| orbits:geo.period | orbits.json → period | 24 | h | resources; operations |
| orbits:geo.contact | orbits.json → contact | 0.8 | fraction | resources; operations |

## `assumptions.json`

| Parameter ID | File.field | Current value | Unit | Runtime consumer |
|---|---|---:|---|---|
| assumptions:model.modelVersion | assumptions.json → modelVersion | 3 | version | simulation result identifier |
| assumptions:model.solarAnnualRetention | assumptions.json → solarAnnualRetention | 0.98 | fraction/year | resources |
| assumptions:model.batteryUsableFraction | assumptions.json → batteryUsableFraction | 0.8 | fraction | resources |
| assumptions:model.batteryDischargeEfficiency | assumptions.json → batteryDischargeEfficiency | 0.95 | fraction | resources |
| assumptions:model.batteryChargeEfficiency | assumptions.json → batteryChargeEfficiency | 0.95 | fraction | operations |
| assumptions:model.groundReceptionEfficiency | assumptions.json → groundReceptionEfficiency | 1 | fraction | operations |
| assumptions:model.representativeDays | assumptions.json → representativeDays | 4 | days | operations |
| assumptions:model.stepsPerOrbit | assumptions.json → stepsPerOrbit | 48 | count | operations |
| assumptions:model.advisoryMarginPercent | assumptions.json → advisoryMarginPercent | 10 | % | resources risk; validation headroom |

## Compatibility and starter metadata

`setup.json` categories/starters, part destination lists, `requiresAny`, launcher orbit lists and orbit mission lists are authored categorical rules (not measurements). `validation.ts` consumes compatibility/dependency/slots; store/builder consumes starters. They have the same unknown original balancing rationale and no external source/page. Snapshot captures selected entries and checks, not the whole unselected library.

## Events, scores, time and derived fields

These records have the same authorship/source/confidence defaults above. They are not Quicksat/NASA values. PDF displays event outcomes; formulas and original policies remain documented here rather than claiming policy source URLs.

| Parameter ID / file.field | Current value | Unit | Consumer / transformation | UI / PDF |
|---|---|---|---|---|
| events:storm / events.ts | power .75; data .88; lifetime .94 | factors | simulation → operations, one orbit at hour 48 | event timeline, science/ledger |
| events:outage / events.ts | power 1; data .72; lifetime 1 | factors | blackout `24*(1-dataFactor)` h | timeline/contacts |
| events:fault / events.ts | power 1; data .76; lifetime .72 | factors | after hour 48; lifetime shortened | timeline/results |
| events:stable / events.ts | 1 / 1 / 1 | factors | no additional anomaly reduction | timeline/results |
| events:selection / simulation.ts | 1/4 each conditional on launch | probability | uniform four-option RNG | operations explanation / source policy |
| protection:computer-rad / simulation.ts | .94 / .97 / 1 | factors | storm override | event/results |
| protection:radio-relay / simulation.ts | .95 | factor | outage override →1.2 h | event/results |
| score:weights / simulation.ts | .50 / .35 / .15 | weights | science/engineering/efficiency weighted sum | result score |
| score:efficiencyOffset / simulation.ts | .55 | factor | budget-efficiency offset | result score |
| score:failureThreshold / simulation.ts | .5 | target fraction | below half science fails | outcome |
| verification:closeRatio / validation.ts | .9 | ratio | minimum actual/target; maximum target/actual | checks |
| campaign:month / simulation.ts; operations.ts | 30 | days/month | daily rate × min(achieved,required) ×30 in final result | operations totals |
| event:playback / simulation.ts | 0/3/8/13/18/23/30; loss 7 | seconds | authored compressed schedule | timeline |
| countdown:beats / flight-lifecycle.ts | .8/.8/.8 + .6 hold | seconds | shared countdownLabel; ascent at3 | one overlay / PDF schedule |
| telemetry:altitude / telemetry.ts | 100 Moon;550 solar;320 Mars; predeployment min(180,(t−3)*18) | km schematic | presentation only | telemetry, not navigation |
| telemetry:velocity / telemetry.ts | min(7.8,(t−3)*.7) after ignition stage | km/s schematic | presentation only | telemetry |
| geometry:scene / journey-geometry.ts | target [7,0,−4] solar or[7,1,−3]; radius3; scales .28/.55; clearance1.2 | scene units | interpolation, not physics | 3D journey |

Numerical tolerances (`1e-9`, `1e-6`, downlink fraction `.999999`) and display rounding are computational policy, not measured uncertainty. See code/formulas for exact branches. Event factors and scores remain literal: this task does not centralize all policy into assumptions.json.

### Derived records (design-dependent current values)

Every field in `Resources` is derived from the selected captured inputs, not an externally sourced constant. **Current value:** depends on selected design; exact run values are printed in the balance tables, with selected inputs in parameter rows. **Provenance type:** derived; **source/page:** local formula only; **version:** recorded result/catalog/assumption version; **confidence:** arithmetic tested, physical validity unverified.

| Fields | Units | Calculation/consumer | UI/PDF |
|---|---|---|---|
| mass,cost,budgetRemaining | kg,$M,$M | sums and subtraction, resources() | live balances / balance sheet |
| nominalGeneration,generation,consumption,powerMargin | W per craft | sums/solar/eclipse/EOL, resources() | power / balance sheet |
| powerMarginPercent,massMarginPercent | % | supply/capacity normalized headroom | verification / checks |
| battery,batteryUsable,batteryNeeded | Wh per craft | nameplate×fractions; load×eclipse×period | battery / balance sheet |
| storage,storageNeeded | GB fleet | sum×fleet; planned rate×contact gap | storage / balance sheet |
| data,downlink | GB/day fleet | generation sum×fleet; nominal link×contact×fleet | data / balance sheet |
| science,lifetime,fleet,risk | points,months,count,category | sums/minimum/heuristic | design and results / report |
| OperationsReport energy fields | Wh per craft | integrate step generation/served/charge/spill | ledger / report |
| OperationsReport data fields | GB fleet | integrate generated/transmitted/received/overflow/backlog | ledger / report |
| availability,brownoutHours,averageDeliveredPower,contacts | ratio,h,W/craft,count | operations() accumulators | telemetry/results / report |
| campaignGeneratedGB,campaignReceivedGB | GB fleet | daily rate×min life×30 | result / report |
| scienceScore,engineeringScore,efficiencyScore,score,outcome | points/category | simulation() policy | result / report |

## Snapshot and source-metadata boundary

New store-launched runs capture selected mission/parts/rocket/orbit, assumptions, calculated resources/checks and simulation result. Serialized payload plus corruption checksum is optional under the existing save schema; no old save is assigned fabricated original inputs. Snapshotless legacy runs reconstruct using current catalogs and recorded model dispatch; report labels this explicitly. Current source descriptions and diagnostics aggregation are current reporting logic, not archived historical metadata. No physical measurement exists in these captures.
