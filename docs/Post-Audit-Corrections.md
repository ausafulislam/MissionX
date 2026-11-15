# Post-audit corrections — 0.1.11

Date: 2026-11-14. [Sources](RESOURCES.md) · [Parameter records](DATA_SOURCES.md) · [Limitations](Scientific-Limitations.md)

## Reconfirmation and disposition

Reconfirmed unsupported HQ certification language, separate ten-count in FlightScene, mixed PASS/NOT EVALUATED aggregation, Sun travel implication on landing, campaign uncapped-lifetime prose, ambiguous fleet scopes, current-catalog report reconstruction, unused descriptive source IDs, overstated source adoption and weak numeric provenance. Corrected presentation/aggregation/provenance without new physical models or changed numeric game rules. No evidence established NASA numerical validation, real RF/navigation/thermal testing, GMAT integration or historical NASA/Quicksat method adoption.

Diagnostic precedence is FAIL > WARNING > NOT EVALUATED > PASS. PASS requires all findings evaluated; empty is NOT EVALUATED. Separate group/finding summaries retain incomplete counts even in warning groups. Baseline arrival has4 incomplete groups and6 incomplete finding instances. Missing reasons remain inspectable in launch panel/review and shared PDF projection. Acknowledgement is not certification.

FlightScene now reads the lifecycle countdown and renders no second number overlay. Existing route overlays each render one countdown; no timer added. Sun observes from Earth orbit; no orbit or objective changed. Scope labels distinguish per-craft power/battery/component specs from fleet mass/cost/memory/data/downlink. Campaign projection uses min(achieved,required)life×30day months. advisoryMarginPercent and modelVersion now supply equivalent existing literals; seeded baseline scores remain100/96/97 for Moon/Sun/Mars seed5.

## Historical integrity

New store-launched runs capture selected catalog entries, assumptions, balances/checks, actual result and release IDs in optional schema1, within existing saved-run storage. Corruption checksum/shape validation,150KB bound; not authentication. Legacy missing snapshots remain restoreable using existing dispatch with explicit current-catalog reconstruction/unavailable-original wording; no old input fabricated. Reports use captured values; current source descriptions/diagnostic aggregation are not historical executable snapshots. Current telemetry/visual presentation is not fully archived. Schema validation still uses the current model3 structural template: future schema/catalog-ID removals require an explicit backward-compatible reader, not silent recomputation or a promised permanent replay guarantee. No risky mandatory migration performed.

## Sources and numeric provenance

All nine proposed sources classified individually in RESOURCES; no A/B adoption proven. NASA Design is C, Quicksat guides C. GMAT/CML/MDL/MissionViz/Webb/CubeSat/VR/CSA are D. Separate mission/context, software/API, W3C, assets/rights sections. IDs in flight-stages.json are descriptive/unimported, not fake resolvers; useful history retained. Catalog numeric magnitudes now explicitly authored, not attributed to NASA. DATA_SOURCES covers numeric catalog fields, assumptions, event/scoring/timing/schematic policy and derived consumers; selected field IDs/value/unit/authorship appear in PDF. Unknown balancing rationale remains unresolved, not invented. No new numerical source adopted.

## Rights and documentation

MIT retained; logo, report-logo derivative, orbital hero and actual lunar-mission.png rights require owner confirmation. No lunar-closeup.png exists; owner must confirm intended identity. GSAP custom standard license, font OFL sidecars and material transitive license review are distinguished from project MIT. Full shipped-artifact SBOM/legal clearance remains pending.

README/index, references, field provenance, limitations, PDF, verification, simulation, attribution and permanent15 standards updated. Existing actual screenshots labeled pre0.1.11, not substituted with fabricated current captures. Memory/Phases/changelog updated.

## Executed validation

- `bun run test`:95 passed,0 failed across18 files, including aggregation, snapshot immutability/hydration/corruption, Moon/Sun/Mars diagnostics/report counts, equivalent baselines, countdown static regression, PDF layout/links and existing simulation tests.
- `bun run lint`, `bun run typecheck`, `bun run build`: passed. No dependencies added; Bun lock has no root version field requiring update.
- Chromium compatibility mode (WebGL explicitly disabled): production preview, Moon seed5 desktop success, six reviews, shared summary parity, PDF download; seed43 phone-sized launch loss, arrival NOT EVALUATED, no arrival review, PDF download. No page errors. Initial browser attempt needed existing shared-library path; stale preview after rebuilding required restart; final flows passed.
- PDF.js independent success/loss specimens:23 pages each, text within bounds, exact site link each page. No full physical print/Unicode/tagged-PDF accessibility certification or manual every-page typography sign-off claimed.
- Browser coverage not exhaustive: Sun/Mars snapshot/diagnostics covered in automated tests, not full fresh UI journeys; hardware3D/audio/FPS/accessibility and live mentor not tested.

## Protected-document proposals — not applied

No PRD/Architecture/Design edits. If approved, add a current-state paragraph to PRD describing configuration-readiness (not spacecraft certification), NOT EVALUATED properties, shared3/2/1 countdown and optional captured-run provenance. Proposed Architecture addition: optional `SavedRun.snapshot` schema1, captured-input report/diagnostics path, explicit legacy reconstruction, and future versioned-reader requirement. These changes require owner approval before any edit; Design remains permanently read-only. No result/score changes proposed or required.
