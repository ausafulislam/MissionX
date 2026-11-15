# Security policy

## Reporting a vulnerability

**No private security reporting channel is currently published or verified for MissionX.** Do not post exploit details, secrets, personal data or private saves in public issues. The owner must establish a private channel before confidential reports can be accepted; no response-time or coordinated-disclosure SLA is promised.

For a non-sensitive request to establish a channel, open a minimal repository issue without vulnerability details. A contact on the Space Apps website is not automatically the project's security contact.

## Scope and current limitations

MissionX is an educational application. No supported-version/LTS program or security certification is established; package 0.1.10 is the current documentation baseline, not a promise of maintained releases.

- Saves/display names are browser-local and are not authenticated identity or tamper-proof records.
- The mentor validates catalog inputs, bounds requests to 12,000 bytes and recomputes results. These controls are not a complete abuse defense.
- Optional remote mentor requests send design/checks/result to OpenAI. There is no application rate limiter; deployment operators should evaluate cost/abuse controls before enabling a key.
- Keep secrets server-side in environment configuration. Never commit `.env.local`, tokens or private reports. Rotate exposed secrets through the provider.
- Dependency upgrades and infrastructure controls require review; passing tests is not proof of security.

See [mentor implementation](docs/Mentor.md) and [contributing](CONTRIBUTING.md). Owner action pending: establish and publish a private reporting channel.
