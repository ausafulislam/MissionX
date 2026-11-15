# Mission PDF reports

[Documentation index](README.md)

## Export path

The result screen's download action calls the report builder and browser-side pdf-lib export. `src/game/report/mission-report.ts` builds section rows; `pdf-layout.ts` measures/wraps tables and paginates; `pdf-export.ts` creates the PDF, embeds the report logo and adds links. The sanitized filename uses mission and recorded commander name. Download is local; no PDF upload service is implemented.

## Report contents

Sections A–M cover mission identity, purpose, selected spacecraft, resource/power/data calculations, cost, orbit/trajectory caveats, actual event timeline, preflight/arrival test results, scientific outcome, four mission segments, improvements, recommendations and sources/independence.

Missing historical identity/completion dates are disclosed, not invented. New runs capture selected inputs, assumptions, calculated balances/checks and actual result in optional snapshot schema1. Reports/diagnostics use the captured context; captured values are authored/calculated, not measured. Catalog and assumption registry identifiers and capture date are printed. Legacy runs without snapshots reconstruct balances/checks using current catalogs and recorded engine dispatch; unavailable historical values are explicitly disclosed. Snapshotless v2 still shares current helpers. Current documentation/source descriptions and diagnostic aggregation are not archived historical reporting logic. Report snapshots are educational records, not engineering certificates.

Parameter IDs/value/unit/authored provenance appear in the source table; [DATA_SOURCES.md](DATA_SOURCES.md) documents each field and its consumers. The UI and PDF use `flightTestResults()` for group and finding counts/reasons; NOT EVALUATED is never counted as PASS. Local bounded snapshots/checksums detect corruption, not deliberate forgery. No risky mandatory migration or old-input fabrication occurs.

## Layout and assets

Tables use measured font widths, wrapped long tokens, repeated table headings and continued sections. Cover/footer links target exactly https://missionx-black.vercel.app/. `public/images/logo-report.png` is a transparent black/orange derivative of the existing artwork; `scripts/pdf-logo.ts` records the derivation. The website logo is unchanged.

## Validation and limits

`mission-report.test.ts` checks report content. `pdf-layout.test.ts` checks text/layout cases, image embedding and per-page links. Prior QA also parsed success/loss downloads for text bounds and rendered sample pages; those are dated historical results, not proof of PDF/UA compliance. The documentation pass reruns available checks as recorded in [Testing](Testing.md).

The PDF is not certified tagged/accessible, archival, digitally signed or suitable for real flight approval. A report logo derivative does not settle the underlying branding license. See [asset attribution](Asset-Attribution.md).

### 0.1.12

PDF cover labels Weighted Performance Score and explains independent rounding;100 can coexist with PARTIAL. Schema1 reads use a fixed contract. Supplied invalid/unsupported snapshots stop report generation instead of rebuilding inputs; only absent snapshots use disclosed reconstruction. Shared summaries prioritize warnings over missing findings while printing both counts. Defaults/limits: [correction record](Post-Audit-Corrections.md).

## Current visual/evidence

[Actual0.1.12 PDF cover preview](images/pdf-report.webp) was rendered from a real completed Moon seed5 run. Fresh seven-report parser checks cover Moon partial/success/loss and Sun/Mars success/loss:23/23/24 pages respectively, score explanation/shared counts/text bounds/site links passed. No full print/Unicode/tagged accessibility certification. Report export is client-local, not an official competition submission upload.
