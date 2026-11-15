# Mission PDF reports

[Documentation index](README.md)

## Export path

The result screen's download action calls the report builder and browser-side pdf-lib export. `src/game/report/mission-report.ts` builds section rows; `pdf-layout.ts` measures/wraps tables and paginates; `pdf-export.ts` creates the PDF, embeds the report logo and adds links. The sanitized filename uses mission and recorded commander name. Download is local; no PDF upload service is implemented.

## Report contents

Sections A–M cover mission identity, purpose, selected spacecraft, resource/power/data calculations, cost, orbit/trajectory caveats, actual event timeline, preflight/arrival test results, scientific outcome, four mission segments, improvements, recommendations and sources/independence.

Missing historical identity/completion dates are disclosed, not invented. Numeric configuration findings come from current engine projections; legacy run calculations and current shared catalog values can differ. Report snapshots are educational records, not engineering certificates.

## Layout and assets

Tables use measured font widths, wrapped long tokens, repeated table headings and continued sections. Cover/footer links target exactly https://missionx-black.vercel.app/. `public/images/logo-report.png` is a transparent black/orange derivative of the existing artwork; `scripts/pdf-logo.ts` records the derivation. The website logo is unchanged.

## Validation and limits

`mission-report.test.ts` checks report content. `pdf-layout.test.ts` checks text/layout cases, image embedding and per-page links. Prior QA also parsed success/loss downloads for text bounds and rendered sample pages; those are dated historical results, not proof of PDF/UA compliance. The documentation pass reruns available checks as recorded in [Testing](Testing.md).

The PDF is not certified tagged/accessible, archival, digitally signed or suitable for real flight approval. A report logo derivative does not settle the underlying branding license. See [asset attribution](Asset-Attribution.md).
