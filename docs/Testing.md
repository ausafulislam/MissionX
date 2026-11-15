# Testing and validation

[Documentation index](README.md)

## Reproducible project checks

Use the pinned Bun version (1.3.14), committed lockfile and existing dependencies. No application dependencies were added for documentation.

```sh
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun test
bun run balance
bun run build
bun run start --hostname 0.0.0.0
```

`lint` runs ESLint; `typecheck` runs TypeScript without emit; `test` runs Bun tests; `balance` runs `scripts/balance.ts`; `build` produces a Next.js production build. A local QA environment must have Bun on PATH because the balance script invokes `bun` internally. The sandbox first lacked that PATH entry; rerunning with the existing `.tools` directory on PATH passed. No package/script change was needed.

## Documentation-pass results — 2026-11-14

| Check | Result |
|---|---|
| Lint | Passed |
| Typecheck | Passed |
| Bun tests | 89 passed, 0 failed, 17 files |
| Production build | Passed; landing, HQ, six /play steps and sole mentor API route generated |
| Balance diagnostic | Passed; details below |
| Browser capture journey | Moon Mapping, baseline, seed 5, six arrival reviews, successful result; no page errors; additional seed-43 launch-loss/PDF-download check passed with no page errors |
| Screenshots | Six real captures, optimized WebP, visually inspected; see gallery |
| Local Markdown links/anchors/images | 172 references checked across root guides and docs, zero errors |
| External links | Named resource URLs and team/challenge pages reached; not an exhaustive network crawl of historical links or badge hosts |

Balance output: Moon 395/1000 verified (249 success, 112 partial, 34 failed); Sun 138/1000 (77/54/7); Mars 28/1000 (7/5/16). These are seeded randomized diagnostics, not player success rates or real reliability estimates.

Tests include catalog/schema, resource/compatibility/score cases, energy/data conservation, seeded repeatability, legacy save dispatch, progression, lifecycle/countdown, six-review gating, terminal failure telemetry, shared panel/PDF results, report layout/links, tutorial persistence and procedural geometry/audio lifecycle. Mentor provider tests use mocks; no paid/live AI call was made.

## Browser and manual checks

The screenshot pass uses Chromium, reduced motion and explicit no-WebGL compatibility mode, desktop viewport 1440 × 1000. It follows actual controls rather than injecting a fabricated result. The builder gallery image uses `/play/build`; other game captures use `/hq`. Capture tooling is local/ignored QA tooling, not an installable application script.

A fresh production server on port 3004 was started after build so capture requests use matching build assets. Do not serve an old process against a replaced `.next` build. A preliminary HQ engineering capture showed blank panel content in this QA mode; it was not published as a builder screenshot. The flight-deck builder capture is used instead. No application fix or blanket HQ visual pass is claimed by documentation work.

Prior phase records contain broader success/loss, phone/tablet, PDF-download and text-bounds checks. They remain historical evidence; they were not all rerun here. Remaining manual checks include physical-device WebGL/audio/fullscreen/orientation, assistive-technology testing, PDF tagging/read order and wider viewport coverage. Geometry/unit checks are not visual hardware performance tests.

## Documentation checks

Validate all changed relative Markdown links, anchors, image paths and alt text. Verify catalog counts/units against JSON, formulas against functions/tests and source IDs against resource anchors. No Mermaid diagram is added; plain-text architecture diagrams avoid untested rendering claims. Static stack badges are not CI, license or coverage badges. No new GitHub workflow or funding file is introduced.

See [scientific limits](Scientific-Limitations.md), [source register](RESOURCES.md) and [documentation audit](Documentation-Audit.md).

## Correction release 0.1.11

Fresh95-test/lint/typecheck/build and compatibility-mode browser/PDF checks, with precise scope and failed setup attempts, are recorded in [Post-Audit-Corrections.md](Post-Audit-Corrections.md). Older counts above describe earlier validation.
