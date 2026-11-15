# Post-audit corrections — 0.1.11

Date: 2026-11-14. [Sources](RESOURCES.md) · [Parameter records](DATA_SOURCES.md) · [Limitations](Scientific-Limitations.md)

## Reconfirmation and disposition

Reconfirmed unsupported HQ certification language, separate ten-count in FlightScene, mixed PASS/NOT EVALUATED aggregation, Sun travel implication on landing, campaign uncapped-lifetime prose, ambiguous fleet scopes, current-catalog report reconstruction, unused descriptive source IDs, overstated source adoption and weak numeric provenance. Corrected presentation/aggregation/provenance without new physical models or changed numeric game rules. No evidence established NASA numerical validation, real RF/navigation/thermal testing, GMAT integration or historical NASA/Quicksat method adoption.

Diagnostic precedence is FAIL > WARNING > NOT EVALUATED > PASS. PASS requires all findings evaluated; empty is NOT EVALUATED. Separate group/finding summaries retain incomplete counts even in warning groups. Baseline arrival has4 incomplete groups and6 incomplete finding instances. Missing reasons remain inspectable in launch panel/review and shared PDF projection. Acknowledgement is not certification.

FlightScene now reads the lifecycle countdown and renders no second number overlay. Existing route overlays each render one countdown; no timer added. Sun observes from Earth orbit; no orbit or objective changed. Scope labels distinguish per-craft power/battery/component specs from fleet mass/cost/memory/data/downlink. Campaign projection uses min(achieved,required)life×30day months. advisoryMarginPercent and modelVersion now supply equivalent existing literals; seeded baseline scores remain100/96/97 for Moon/Sun/Mars seed5.

## Historical integrity

New store-launched runs capture selected catalog entries, assumptions, balances/checks, actual result and release IDs in optional schema1, within existing saved-run storage. Corruption checksum/shape validation,150KB bound; not authentication. Legacy missing snapshots remain restoreable using existing dispatch with explicit current-catalog reconstruction/unavailable-original wording; no old input fabricated. Reports use captured values; current source descriptions/diagnostic aggregation are not historical executable snapshots. Current telemetry/visual presentation is not fully archived. At 0.1.11 schema validation used the current model3 structural template. The 0.1.12 correction below replaces that template; catalog-ID removals still require separate compatibility work. Permanent executable replay is not promised. No risky mandatory migration performed.

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


## Final blocker corrections — 0.1.12 (2026-11-14)

The owner authorized only shared diagnostic precedence, score interpretation and version-aware snapshot reading. No scientific model, catalog magnitude, numerical formula, score weight, rounding, requirement or outcome threshold changed. Protected Design/PRD/Architecture, CSS/layout, artwork and dependencies are unchanged. Package patch increased only after implementation tests/lint/typecheck/build and targeted browser/PDF checks passed; catalog/assumption registry IDs remain0.1.11 because those data values did not change.

### Shared summary policy

`aggregate()` now accepts status-bearing findings or groups; `summarizeTests()` calls it rather than defining a second precedence. It returns canonical `diagnosticStatus` plus existing presentation labels (FAIL→BLOCKED, WARNING→READY WITH WARNINGS, NOT EVALUATED→NOT EVALUATED, PASS→MISSION READY). Both group and finding summaries use FAIL > WARNING > NOT EVALUATED > PASS; empty→NOT EVALUATED. Missing counts/reasons remain visible when warnings take precedence. Launch, result report review and PDF continue to consume `flightTestResults()`/`testSummaryText()`.

### Weighted Performance Score

Both existing result screens, compact report identity and report/PDF label the weighted score explicitly. Shared explanation: the score is rounded independently of outcome;100 does not imply every objective was achieved. Original outcome-specific headings/classes/emblems and explanations remain. Moon starter seed0 is unchanged:44.9/45 science points,100 weighted score,PARTIAL. No score cap or hidden balance adjustment was introduced.

### Schema-1 reader and safe defaults

`snapshot-schema-v1.ts` defines a fixed wire contract independent of live catalogs, current assumptions shape or `simulate()`. Required numerical/structural fields, finite values, enums, IDs, unique selected part records, array/payload bounds and checksum are validated. Unknown additional fields are tolerated, not sourced from today's catalog. Adding a field to current assumptions no longer changes schema1 validation. Future scientific behavior must still define its own compatible reader; accepting extra data is not claiming the old reader implements it.

Optional defaults: absent explanatory `assumptions.note` gets “Historical explanatory note not recorded; captured numerical assumptions are preserved.” Absent verification-check `blocking` defaults to true, preserving existing required-check semantics. Absent `payloadLimit`/`requiresAny` remain absent (no added limit/dependency). No missing required scientific numeric value receives a guessed or current-catalog default.

Version dispatch explicitly distinguishes missing, valid, invalid and unsupported snapshots. Only genuinely snapshotless legacy saves use labeled current-catalog reconstruction. Supplied invalid/unsupported snapshots cannot fall back: report input access throws, restoration warns and omits unsupported flights from active memory, and automatic persistence is paused to retain the original raw save. Explicit workspace reset clears that warning/resumes saving. This may require owner/user recovery of a rejected record; no automatic migration is attempted. Current editor/schema still recognizes current catalog IDs; removal/renaming of IDs needs separate compatibility work. Snapshots are educational data records, not permanent executable archives or authenticated evidence.

### Actual validation

- `bun run test`:114 pass,0fail across19 files (19 new tests). Added all seven requested precedence cases plus mixed-group precedence/count/reason checks; exact seed0; fixed-schema optional/required/unknown cases; frozen schema1 fixture generated with committed0.1.11 writer; six success/loss restoration/report/PDF cases; legacy model1/2/3 restoration for all missions.
- `bun run lint`, `bun run typecheck`, `bun run build`, `git diff --check`: passed before patch bump. No dependencies added.
- Chromium compatibility mode, production build: Moon/Sun/Mars seed5 success1440×900 and seed43 loss390×844; Moon seed0 partial1440×900. HQ journeys, six reviews where eligible, shared UI summary equality and PDF downloads passed; flight-deck result labels/explanations checked after reload/navigation. No observed page/console errors; no horizontal overflow in measured flight-deck results.
- Phone-width Moon radio-low warning journey: displayed6 groups (1PASS,2WARNING,3NOT EVALUATED),41 findings (33PASS,2WARNING,6NOT EVALUATED),READY WITH WARNINGS. Exact shared summary matched UI.
- Independently parsed seven PDFs (three success/loss pairs plus Moon seed0): score label/explanation, outcome, exact shared arrival summary, all text bounds and per-page site links passed; Moon/Sun23 pages, Mars24. Captured result parity checked.
- Browser flows used WebGL-disabled compatibility mode; physical GPU/audio/print/accessibility and exhaustive visual sign-off were not rerun or certified. Artwork permission remains unresolved; software fixes are not legal release clearance.

### Owner confirmation required — unchanged assets

See [Asset-Attribution.md](Asset-Attribution.md): logo.png, its logo-report.png derivative, orbital-hero.png and lunar-mission.png. No lunar-closeup.png exists; owner must confirm intended identity. No artwork replaced, removed or relicensed. No push, PR or release performed.
