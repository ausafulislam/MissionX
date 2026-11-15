# MissionX documentation

Current documentation baseline: package **0.1.10**, audited 2026-11-14. These guides describe implemented behavior; planned work is labeled explicitly. Start with the [project README](../README.md).

## Current guides

| Guide | Read for |
|---|---|
| [Architecture](Architecture.md) | Routes, module ownership, state and deployment boundaries |
| [Gameplay](Gameplay.md) | Complete player loop, saves and settings |
| [Missions](Missions.md) | Exact mission inputs, launchers and orbit compatibility |
| [Components](Components.md) | Part categories and UI module responsibilities |
| [Launch and simulation](Launch-and-Simulation.md) | Playback, arrival gate, operations and scoring |
| [Verification](Verification.md) | Blocking checks, warnings and six arrival reviews |
| [PDF reports](PDF-Reports.md) | Content generation, export, pagination and limits |
| [Mentor](Mentor.md) | API contract, environment, privacy and fallback |
| [Testing](Testing.md) | Actual commands and browser/device evidence boundaries |
| [Scientific limitations](Scientific-Limitations.md) | What the model cannot establish |
| [Asset attribution](Asset-Attribution.md) | Font licenses, illustration provenance and unresolved rights |
| [Screenshot gallery](images/README.md) | Actual app captures and capture conditions |

## Research and engineering

- [Resource register](RESOURCES.md): source IDs, original URLs, scoped evidence and reuse cautions.
- [Engineering references](ENGINEERING_REFERENCES.md): implemented formulas, authored assumptions, units and tests.
- [Engineering summary](Engineering.md) and [engineering audit](Engineering-Audit.md): earlier model decisions; current formulas take precedence where superseded.

## History, requirements and design

These are useful development records, **not an assertion every original requirement is implemented**:

- [PRD](PRD.md): original requirements; preserved unchanged. For current verification warnings and catalog fields use current guides/source.
- [Phases](Phases.md), [Memory](Memory.md), [changelog](../CHANGELOG.md): chronological change records; completion claims apply to their recorded scope/date.
- [Implementation](Implementation.md), [HQ implementation](HQ-Implementation.md), [game QA](Game-QA.md), [game-feel upgrade](Game-Feel-Upgrade.md): dated implementation/validation snapshots, not new test results.
- [Design baseline](Design.md): protected historical document, read-only. [Root design specification](../design.md): later approved visual direction. See [AGENTS](../AGENTS.md) for superseding commissions and [Rules](Rules.md) for standing constraints.
- The original architecture plan remains below the current overview in [Architecture](Architecture.md).

## Documentation handoff

[Documentation audit and exact file inventory](Documentation-Audit.md) records this task, checks and unresolved owner decisions.

## Repository participation

[Contributing](../CONTRIBUTING.md) · [Conduct](../CODE_OF_CONDUCT.md) · [Security](../SECURITY.md) · [Citation](../CITATION.cff)

Software and associated documentation use the [MIT License](../LICENSE). Third-party notices and unresolved asset rights remain documented separately. No private reporting address or funding channel is published.

## Correction release 0.1.11

[Parameter-level provenance](DATA_SOURCES.md) documents authored values and derived outputs; [post-audit corrections](Post-Audit-Corrections.md) records implementation, compatibility, checks and protected-document proposals. Source classification uses evidence of adoption, not similarity.
