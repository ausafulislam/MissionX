# Contributing to MissionX

Thank you for helping make mission-design trade-offs understandable. Read the [README](README.md), [documentation index](docs/README.md), [AGENTS](AGENTS.md) and [Rules](docs/Rules.md) before proposing changes.

## Before you start

- Open an issue for substantial features, science/model changes or documentation gaps. Agree scope before new layouts, dependencies, external services or protected-document edits.
- This repository currently has **no root license**. Do not assume an open-source grant or submit material you cannot legally share. License/asset rights require owner clarification before redistribution.
- Follow the [code of conduct](CODE_OF_CONDUCT.md). Never put secrets, private saves or vulnerability details in public issues; see [security](SECURITY.md).

## Local workflow

Use Bun 1.3.14 and the committed lockfile:

```sh
bun install --frozen-lockfile
bun run dev --hostname 0.0.0.0
bun run lint
bun run typecheck
bun test
bun run build
```

Use `bun run balance` when assessing catalog/engine changes. Do not add dependencies without owner approval. Keep changes focused and describe what was actually checked.

## Implementation and research standards

- Keep engine rules pure, deterministic, typed and UI-independent. Put static inputs in existing catalogs; avoid duplicate formulas in UI.
- Preserve the Goal → Build → Verify → Launch → Result loop, arrival gate, loss handling, local fallback and accessible alternatives.
- Research before changing scientific claims. Record original provider/URL, access date, exact section, implementation mapping, adaptation, confidence and licensing in the source registers.
- Explicitly distinguish sourced facts, conceptual inspiration and authored educational assumptions. Do not retrofit a citation onto unsupported numbers.
- Update the relevant guides, source registers, changelog, Memory and Phases. Documentation-only work does not require a package bump. Runtime version decisions follow owner policy.
- `docs/Design.md` is read-only. PRD/Architecture changes require owner approval. Preserve useful historical evidence and label superseded plans.

## Pull requests

Use the PR template: explain purpose, files/behavior affected, evidence, screenshots when UI changes, checks run and unresolved limits. Screenshots must come from the running app and identify compatibility/reduced-motion settings. No fabricated metrics, badges, endpoints or endorsements. Maintainer review does not imply scientific certification.

No commit/push/release is required merely to propose an issue. Do not claim a release or deployment until it actually occurs.
