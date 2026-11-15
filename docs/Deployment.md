# Deployment and production operations

[Documentation index](README.md) · [Finalization evidence](Finalization-Report.md)

Version 0.1.12; reviewed2026-11-14. This is a runbook, not a deployment completion claim. No hosting credentials, domains, secrets, PR or release were changed.

## What is actually configured

- Next.js16.4.6; `cacheComponents`, `partialPrefetching`, Tailwind Turbopack CSS loader in `next.config.ts`.
- `packageManager: bun@1.3.14`; frozen `bun.lock`. Scripts: dev/build/start/test/lint/typecheck/balance.
- No tracked `vercel.json`, Dockerfile, CI workflow, static export, standalone output, database, login or server-side save store.
- Existing owner URL: https://missionx-black.vercel.app/ . Page content was retrieved during finalization, but older Sun wording was visible; deployed commit/version is unknown. Do not present it as verified current 0.1.12.
- Public GitHub repository visibility was confirmed with authenticated read-only metadata; anonymous access to the unpushed current branch is not established. Local finalization commits are not automatically on GitHub.

## Pre-deployment gate

1. Owner resolves artwork permissions, SI disclosure/watermark requirements and the moderate minimatch tooling advisory (see SECURITY.md); do not attest compliance without evidence.
2. Approve the exact commit to deploy. This task does not push or choose another branch.
3. Run `bun install --frozen-lockfile`, `bun run test`, `bun run lint`, `bun run typecheck`, `bun run balance`, `bun run build`, `git diff --check`.
4. Back up any important browser-local saves privately before testing/resetting. Saves do not migrate between preview and production origins; never publish personal saves.

## Vercel framework integration — owner-operated

Use the dashboard's Next.js framework preset, repository root directory, install command `bun install --frozen-lockfile`, build command `bun run build`. Keep the framework-managed output setting; do not choose `out` or a static-only deployment. Vercel invokes its Next runtime rather than your local `bun run start` server. Verify Bun/package-manager detection and a supported Node runtime (installed Next declares>=20.9.0) in the actual deployment logs. These dashboard settings were not inspected here.

No provider CLI is installed or required by this runbook. Do not connect a production branch/automatic release without permission. Review Preview/Production environment separation and access protection: judges need a public final/demo link without sign-in, but development previews need not be made public indiscriminately.

## Self-hosted production server — locally exercised

```sh
bun install --frozen-lockfile
bun run build
bun run start --hostname 0.0.0.0
```

The default port is3000; `--port 3013` was used for finalization smoke checks. Use a service manager/reverse proxy/TLS in a real deployment; those infrastructure configurations are not supplied or tested here. Proxy browser requests to the same origin, including `/api/mentor`, `/_next/*`, `/images/*` and `/fonts/*`. Browser code must not call the server's localhost address.

## Environment and privacy

| Setting | Production guidance |
|---|---|
| MENTOR_API_KEY | Optional server secret only. Leave unset for the simplest/cost-safe competition demo. Do not expose it with NEXT_PUBLIC or in build logs. |
| MENTOR_MODEL | Optional provider model, default gpt-4o-mini; account/model entitlement requires a live check by the owner. |
| NEXT_PUBLIC_SITE_URL | Currently unused; setting it does not establish canonical metadata, domain routing or PDF site links. |

Explicit remote advice sends normalized design, verification, recomputed result and local advice, not commander identity. The deployed hosting/provider services may retain request data under their own policies. No analytics integration was found; this is not a blanket no-logs claim. Public mentor has input bounds and an8-second outbound timeout, but no rate limiting, authentication or account quota. Enable a key only after abuse/billing controls are reviewed. Live provider calls were not made here.

## Domain and public smoke checks

- Add the desired domain through the host and configure DNS using the host's current instructions; verify certificate, apex/www redirects and ownership. No domain configuration was performed here.
- The PDF footer URL is fixed in `pdf-layout.ts`, not controlled by NEXT_PUBLIC_SITE_URL. A domain/link change is a focused code proposal requiring testing/version policy, not an environment-only switch.
- In a private window without saved data: load landing/assets, enter HQ or `/play`, run Moon seed 5 success, Moon seed 0 partial, seed 43 loss; inspect Sun Earth-orbit wording and Mars. Download PDFs and inspect captured-input labels, weighted-score explanation and diagnostics.
- Exercise phone/tablet sizes, keyboard focus, reduced motion, WebGL fallback and mentor no-key fallback. Confirm no console errors, broken images or blocked asset requests.
- Check the exact deployed commit in the provider dashboard, not only the displayed branding. Public reachability alone proves neither current code nor mission functionality.
- Verify demo/repository/final-project links anonymously; sharing an authenticated dashboard link is insufficient.

## Troubleshooting

| Symptom | Check |
|---|---|
| Chunk404 or blank page after rebuilding locally | Stop the old production process and restart against the new `.next`; do not run a stale server over replaced build assets. |
| Mentor returns local advice | Expected without a key; check optional provider/model/network settings privately. This is not game failure. |
| 400/413 mentor response | Invalid catalog/seed/JSON or request exceeds12,000 bytes; do not weaken validation. |
| Missing3D or context loss | Use compatibility mode/semantic flight deck; inspect hardware/browser support. No physical GPU performance guarantee. |
| Save appears missing | Different origin/private mode/reset/storage policy; data is not cloud synchronized. |
| Invalid/unsupported snapshot warning | Original raw save is retained; automatic saving pauses. Back up privately and recover with a compatible reader; explicit reset resumes saving but is not historical recovery. |
| PDF failure | Same-origin logo access, client memory and browser support; retry without clearing the run. No PDF/UA guarantee. |
| Vercel/static host cannot serve mentor | Use Next server/framework integration, not static export. |

## Rollback

Retain the last known-good deployment ID/commit in the host. Owner may promote a prior deployment using the provider dashboard after smoke checks. No rollback was performed. Browser-local saves are separate from deployments: an older executable may not understand newer snapshot schemas. Do not mass-clear storage or silently reinterpret historical inputs to make a rollback appear compatible. Preserve backups and verify saved-run/PDF behavior before switching public traffic.
