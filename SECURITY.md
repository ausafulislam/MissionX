# Security policy

## Reporting a vulnerability

**No private security reporting channel is currently published or verified for MissionX.** Do not post exploit details, secrets, personal data or private saves in public issues. The owner must establish a private channel before confidential reports can be accepted; no response-time or coordinated-disclosure SLA is promised.

For a non-sensitive request to establish a channel, open a minimal repository issue without vulnerability details. A contact on the Space Apps website is not automatically the project's security contact.

## Scope and current limitations

MissionX is an educational application. No supported-version/LTS program or security certification is established; package0.1.12 is the current implemented baseline, not a promise of maintained releases.

- Saves/display names are browser-local and are not authenticated identity or tamper-proof records.
- The mentor validates catalog inputs, bounds requests to 12,000 bytes and recomputes results. These controls are not a complete abuse defense.
- Optional remote mentor requests send design/checks/result to OpenAI. There is no application rate limiter; deployment operators should evaluate cost/abuse controls before enabling a key.
- Keep secrets server-side in environment configuration. Never commit `.env.local`, tokens or private reports. Rotate exposed secrets through the provider.
- Dependency upgrades and infrastructure controls require review; passing tests is not proof of security.

See [mentor implementation](docs/Mentor.md) and [contributing](CONTRIBUTING.md). Owner action pending: establish and publish a private reporting channel.


## Finalization review — 2026-11-14

`bun audit --json` returned a moderate advisory: [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), minimatch globparts-amplification denial of service. Installed minimatch10.2.6 is reached through `@typescript-eslint/typescript-estree`→TypeScript/ESLint dev tooling; installed3.1.5 is outside this advisory's stated>=7,<11.0.1 range. GitHub advisory metadata identifies11.0.1 as patched. No override/upgrade was applied: the parent currently requires^10.2.2, so forcing11 needs maintainer compatibility review. Treat automated audit as **FAILED/open**, not a clean security bill; tooling dependency classification is not an exploitability or shipped-artifact proof. Owner must remediate or document justified risk acceptance.

Review found no client environment-key reference, arbitrary mentor destination or raw HTML rendering of advice. Input byte/seed/catalog validation and fallback are tested; provider/live network and infrastructure/WAF controls were not validated. Body-read slow-client defenses, application rate limiting, CSP/security headers, supply-chain and full penetration testing are not established. Keep remote mentor disabled for the default demo. Private reporting contact and actual deployment controls remain owner actions. [Deployment runbook](docs/Deployment.md).
