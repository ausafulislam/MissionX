# MissionX resource register

Central research register. Updated 2026-11-14 for v0.1.5. Source IDs below are documentation identifiers; runtime metadata migration is **not implemented**. [Engineering references](ENGINEERING_REFERENCES.md) distinguish formulas from assumptions.

## Interpretation and scope
- Implemented means the named concept/link is actually used at the listed location, not that software or all source methods are integrated.
- Confidence concerns the narrow stated support; it never transfers to invented numbers. High = directly reviewed primary content; Medium = limited/secondary conceptual evidence; Low = unresolved evidence or non-authoritative context.
- Access dates record known retrieval, not publication date. Prior audit evidence is identified explicitly. Missing evidence is not a successful link check.
- Catalog masses, costs, power, data, lifetimes, orbit factors, reliability and science points are authored teaching inputs unless a future parameter-level record proves otherwise.
- No external text, code or artwork is reproduced here beyond titles/short terminology. Linking is not permission to reuse assets. Provider/file terms must be checked before copying.

## Independence disclaimer
MissionX is an independent educational project created by Team NASA WARRIORS for the NASA International Space Apps Challenge 2026. It is not affiliated with, endorsed by, or sponsored by NASA or any other space agency. NASA is not responsible for information contained on non-U.S. Government websites.

Existing user-facing disclaimer remains unchanged. Full credits copy awaits the separately approved UI task. A link implies no provider endorsement.

## Research resources

<a id="NASA-SCIENCE-MISSIONS"></a>
### Resource: Design and Develop Science Missions

- **Source ID:** `NASA-SCIENCE-MISSIONS`
- **Provider:** NASA; Julie Levri
- **Resource type:** Official NASA presentation
- **Official URL:** https://www.nasa.gov/wp-content/uploads/2025/04/250323-design-and-develop-science-mission.pdf
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Slides headed mission segments, Big Picture Process, Role of ConOps, and BioNutrients requirements/verification
- **Purpose:** Explain goals, requirements, verification and Launch/Space/Ground/User segments.
- **Why MissionX uses it:** Four segment names and goal-first workflow; conceptual attribution only.
- **Implementation location:** src/game/data/{missions,parts,rockets,orbits}.json; src/game/engine/{validation,simulation}.ts; src/components/game/source-note.tsx.
- **Related files/components:** src/game/data/{missions,parts,rockets,orbits}.json; src/game/engine/{validation,simulation}.ts; src/components/game/source-note.tsx.
- **Supported feature or calculation:** Four segment names and goal-first workflow; conceptual attribution only.
- **Implementation status:** Implemented
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** High
- **Limitations:** Presentation retrieved in two chunks during approval audit. Numeric catalog values and scoring are NOT sourced from it.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Presentation retrieved in two chunks during approval audit. Numeric catalog values and scoring are NOT sourced from it.

<a id="NASA-GMAT"></a>
### Resource: General Mission Analysis Tool (GMAT) R2025a

- **Source ID:** `NASA-GMAT`
- **Provider:** NASA Technology Transfer; Goddard and collaborators
- **Resource type:** Official software catalog
- **Official URL:** https://software.nasa.gov/software/GSC-19468-1
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Overview and software details
- **Purpose:** Contrast real mission design/optimization/navigation with schematic MissionX trajectories.
- **Why MissionX uses it:** Scope/limitations explanation; no GMAT calculations or runtime integration.
- **Implementation location:** docs/RESOURCES.md; docs/ENGINEERING_REFERENCES.md, Orbit section.
- **Related files/components:** docs/RESOURCES.md; docs/ENGINEERING_REFERENCES.md, Orbit section.
- **Supported feature or calculation:** Scope/limitations explanation; no GMAT calculations or runtime integration.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** High
- **Limitations:** Catalog page verified; manuals, solver methods, download and numerical execution not verified.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Catalog page verified; manuals, solver methods, download and numerical execution not verified.

<a id="NASA-JPL-CML"></a>
### Resource: Space mission concept development using concept maturity levels

- **Source ID:** `NASA-JPL-CML`
- **Provider:** Wessen, Borden, Ziemer, Kwok; JPL / Caltech
- **Resource type:** Conference paper in JPL Open Repository
- **Official URL:** https://dataverse.jpl.nasa.gov/dataset.xhtml?persistentId=hdl:2014/44299
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Paper introduction and Section II; linked PDF https://dataverse.jpl.nasa.gov/api/access/datafile/50237
- **Purpose:** Explain feasibility, trade-space exploration and remaining concept work.
- **Why MissionX uses it:** Maturity vocabulary only; no official CML rating or score mapping.
- **Implementation location:** docs/RESOURCES.md; proposed future verification/report feedback (not implemented).
- **Related files/components:** docs/RESOURCES.md; proposed future verification/report feedback (not implemented).
- **Supported feature or calculation:** Maturity vocabulary only; no official CML rating or score mapping.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** High
- **Limitations:** Repository and beginning of paper verified; full CML matrix not reviewed. Repository displays CC0; check file notices before reproducing material.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. See explicit file/license qualification above.
- **Verification status:** Repository and beginning of paper verified; full CML matrix not reviewed. Repository displays CC0; check file notices before reproducing material.

<a id="NASA-MDL"></a>
### Resource: Mission Design Lab

- **Source ID:** `NASA-MDL`
- **Provider:** NASA Goddard Engineering and Technology Directorate
- **Resource type:** Official agency capability page
- **Official URL:** https://etd.gsfc.nasa.gov/capabilities/integrated-design-center/mission-design-lab/
- **Accessed date:** 2026-11-14
- **Relevant section/page:** What MDL Provides; study options; capabilities; disciplines
- **Purpose:** Explain multidisciplinary feasibility and coupled trades including ground, cost and end-of-mission.
- **Why MissionX uses it:** Professional-analysis context, not specific probabilities or budgets.
- **Implementation location:** docs/RESOURCES.md; proposed future mentor/verification explanations.
- **Related files/components:** docs/RESOURCES.md; proposed future mentor/verification explanations.
- **Supported feature or calculation:** Professional-analysis context, not specific probabilities or budgets.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** High
- **Limitations:** Page verified; includes website-update funding notice. No MDL tool, study or professional certification integrated.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Page verified; includes website-update funding notice. No MDL tool, study or professional certification integrated.

<a id="NASA-MISSION-VIZ"></a>
### Resource: Web-based Space Mission Visualization

- **Source ID:** `NASA-MISSION-VIZ`
- **Provider:** NASA mission-viz project
- **Resource type:** Agency-hosted demonstrations/tutorial index
- **Official URL:** https://nasa.github.io/mission-viz/
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Web-Apps and Tutorials, Earth–Moon and elliptical orbit descriptions
- **Purpose:** Inform future schematic spatial explanations.
- **Why MissionX uses it:** Visualization inspiration only.
- **Implementation location:** docs/RESOURCES.md; possible future existing flight scene captions, subject to approval.
- **Related files/components:** docs/RESOURCES.md; possible future existing flight scene captions, subject to approval.
- **Supported feature or calculation:** Visualization inspiration only.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Medium
- **Limitations:** Index verified, interactive demos not validated. https://github.com/nasa/mission-viz/blob/main/LICENSE returned missing-file content; reuse license unresolved. No code/assets copied.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. See explicit file/license qualification above.
- **Verification status:** Index verified, interactive demos not validated. https://github.com/nasa/mission-viz/blob/main/LICENSE returned missing-file content; reuse license unresolved. No code/assets copied.

<a id="NASA-WEBB-GAME"></a>
### Resource: Build It Yourself: A Learning Game About Telescopes

- **Source ID:** `NASA-WEBB-GAME`
- **Provider:** NASA Science / Webb
- **Resource type:** Official educational game page
- **Official URL:** https://science.nasa.gov/mission/webb/game-build-it-yourself/
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Learning objective; Playing Hints; accessibility and transcript links
- **Purpose:** Relate scientific objectives to instruments and unsuitable combinations.
- **Why MissionX uses it:** Science-first game-design reference; no copied game UI or scoring.
- **Implementation location:** docs/RESOURCES.md; proposed mission/instrument explanations.
- **Related files/components:** docs/RESOURCES.md; proposed mission/instrument explanations.
- **Supported feature or calculation:** Science-first game-design reference; no copied game UI or scoring.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** High
- **Limitations:** Page content verified; embedded game not played and transcript PDFs not fully reviewed. Its 2013 education review does not apply to MissionX.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Page content verified; embedded game not played and transcript PDFs not fully reviewed. Its 2013 education review does not apply to MissionX.

<a id="NASA-CUBESAT-101"></a>
### Resource: CubeSat 101: Basic Concepts and Processes for First-Time CubeSat Developers

- **Source ID:** `NASA-CUBESAT-101`
- **Provider:** NASA CubeSat Launch Initiative; contributors listed in guide
- **Resource type:** Official NASA guide, October 2017
- **Official URL:** https://www3.nasa.gov/sites/default/files/atoms/files/nasa_csli_cubesat_101_508.pdf
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Accessible Chapter 2 material: §§2.1–2.3; contents lists §2.10 p22, §2.11 p23, §2.12 p25 and later reports
- **Purpose:** Context for concept development, feasibility, ground readiness and non-hardware costs.
- **Why MissionX uses it:** Development-process context, not numerical battery or part specifications.
- **Implementation location:** docs/Engineering-Audit.md; docs/RESOURCES.md; proposed subsystem/readiness explanations.
- **Related files/components:** docs/Engineering-Audit.md; docs/RESOURCES.md; proposed subsystem/readiness explanations.
- **Supported feature or calculation:** Development-process context, not numerical battery or part specifications.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Medium
- **Limitations:** Only first 30 PDF pages available to extraction. TOC references are not proof later text was read. CubeSat-specific guidance is not universal spacecraft qualification. Review third-party image credits before reuse.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Only first 30 PDF pages available to extraction. TOC references are not proof later text was read. CubeSat-specific guidance is not universal spacecraft qualification. Review third-party image credits before reuse.

<a id="NASA-SPACEAPPS-VR-2023"></a>
### Resource: Visualize a Space Mission Using Virtual Reality

- **Source ID:** `NASA-SPACEAPPS-VR-2023`
- **Provider:** NASA International Space Apps Challenge
- **Resource type:** Official past challenge page
- **Official URL:** https://www.spaceappschallenge.org/2023/challenges/visualize-a-space-mission-using-virtual-reality/
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Background; Objectives; Potential Considerations
- **Purpose:** Connect mission concept, orbital path and timeline for beginners.
- **Why MissionX uses it:** Educational visualization inspiration; not orbital formulas.
- **Implementation location:** docs/RESOURCES.md; possible future timeline caption work.
- **Related files/components:** docs/RESOURCES.md; possible future timeline caption work.
- **Supported feature or calculation:** Educational visualization inspiration; not orbital formulas.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** High
- **Limitations:** Substantive challenge text verified. No VR implementation, assets or external visualization library adopted.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Substantive challenge text verified. No VR implementation, assets or external visualization library adopted.

<a id="CSA-DIGITAL-GAMES"></a>
### Resource: Digital games and activities

- **Source ID:** `CSA-DIGITAL-GAMES`
- **Provider:** Canadian Space Agency (CSA)
- **Resource type:** Official agency education index
- **Official URL:** https://www.asc-csa.gc.ca/eng/youth-educators/digital-games-and-activities.asp
- **Accessed date:** 2026-11-14
- **Relevant section/page:** RADARSAT, Exploring Earth and OSIRIS-REx activity descriptions
- **Purpose:** Explain how observations serve real users and decisions.
- **Why MissionX uses it:** Application-oriented learning inspiration.
- **Implementation location:** docs/RESOURCES.md; proposed future result-learning copy.
- **Related files/components:** docs/RESOURCES.md; proposed future result-learning copy.
- **Supported feature or calculation:** Application-oriented learning inspiration.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Medium
- **Limitations:** Index verified; games not played or evaluated. CSA is not NASA; individual activity terms require review before reuse.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Index verified; games not played or evaluated. CSA is not NASA; individual activity terms require review before reuse.

<a id="NASA-SPACEAPPS-GAME-2026"></a>
### Resource: Space Mission Design Game

- **Source ID:** `NASA-SPACEAPPS-GAME-2026`
- **Provider:** NASA International Space Apps Challenge
- **Resource type:** Official challenge page
- **Official URL:** https://www.spaceappschallenge.org/2026/challenges/space-mission-design-game/
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Integrated mission design, simulation and educational explanations
- **Purpose:** Scope the integrated mission-design learning loop.
- **Why MissionX uses it:** Challenge scope only, not numerical engineering evidence.
- **Implementation location:** docs/Engineering-Audit.md; existing /play and /hq workflow.
- **Related files/components:** docs/Engineering-Audit.md; existing /play and /hq workflow.
- **Supported feature or calculation:** Challenge scope only, not numerical engineering evidence.
- **Implementation status:** Implemented
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** High
- **Limitations:** Earlier audit records both chunks retrieved on this date; not freshly re-fetched in documentation task. No certification or endorsement.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Earlier audit records both chunks retrieved on this date; not freshly re-fetched in documentation task. No certification or endorsement.

<a id="COMMUNITY-QUICKSAT-POWER"></a>
### Resource: Set up a power budget

- **Source ID:** `COMMUNITY-QUICKSAT-POWER`
- **Provider:** egemenimre / Quicksat contributors
- **Resource type:** Community technical guide
- **Official URL:** https://github.com/egemenimre/quicksat/blob/master/docs/guides/power/set_up_a_power_budget.md
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Mode loads, EOL inputs, usable battery, charge/discharge and energy balance
- **Purpose:** Distinguish average supply, stored energy and operating loads.
- **Why MissionX uses it:** Conceptual budgeting reference; no copied implementation or adopted numeric factors.
- **Implementation location:** src/game/engine/{resources,operations}.ts; docs/Engineering-Audit.md.
- **Related files/components:** src/game/engine/{resources,operations}.ts; docs/Engineering-Audit.md.
- **Supported feature or calculation:** Conceptual budgeting reference; no copied implementation or adopted numeric factors.
- **Implementation status:** Implemented
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Medium
- **Limitations:** Earlier audit records both chunks reviewed; not freshly fetched in this task. Not a NASA standard; no universal 0.98 retention or 0.95 efficiency justified. License not checked for reuse; no code copied.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. See explicit file/license qualification above.
- **Verification status:** Earlier audit records both chunks reviewed; not freshly fetched in this task. Not a NASA standard; no universal 0.98 retention or 0.95 efficiency justified. License not checked for reuse; no code copied.

<a id="COMMUNITY-QUICKSAT-SIZING"></a>
### Resource: Initialise a satellite

- **Source ID:** `COMMUNITY-QUICKSAT-SIZING`
- **Provider:** egemenimre / Quicksat contributors
- **Resource type:** Community technical guide
- **Official URL:** https://github.com/egemenimre/quicksat/blob/master/docs/guides/sizing/initialise_a_satellite.md
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Mass sums, data production, contacts and finite mass memory
- **Purpose:** Explain coupled resource sizing and contact-gap memory.
- **Why MissionX uses it:** Conceptual rate×duration and capacity sizing, adapted to simplified GB/day inputs.
- **Implementation location:** src/game/engine/{resources,operations}.ts.
- **Related files/components:** src/game/engine/{resources,operations}.ts.
- **Supported feature or calculation:** Conceptual rate×duration and capacity sizing, adapted to simplified GB/day inputs.
- **Implementation status:** Implemented
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Medium
- **Limitations:** Earlier audit records both chunks reviewed; not freshly fetched here. No real contact schedule or RF performance verified; reuse license not reviewed.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. See explicit file/license qualification above.
- **Verification status:** Earlier audit records both chunks reviewed; not freshly fetched here. No real contact schedule or RF performance verified; reuse license not reviewed.

<a id="COMMUNITY-MISSION-ARCHITECT"></a>
### Resource: Mission Architect skill guide

- **Source ID:** `COMMUNITY-MISSION-ARCHITECT`
- **Provider:** devideamax / aerospace-team contributors
- **Resource type:** Third-party community AI planning guide
- **Official URL:** https://github.com/devideamax/aerospace-team/blob/main/skills/mission-architect/SKILL.md
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Integrated mission planning and segment/subsystem context
- **Purpose:** Historical planning context only.
- **Why MissionX uses it:** No numerical rule, code or percentage adopted.
- **Implementation location:** docs/Engineering-Audit.md.
- **Related files/components:** docs/Engineering-Audit.md.
- **Supported feature or calculation:** No numerical rule, code or percentage adopted.
- **Implementation status:** Reference only
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Low
- **Limitations:** Earlier audit reports chunks 0/1 reviewed. Not a space agency, authoritative standard or flight-engineering validation; licensing not checked for copying.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Earlier audit reports chunks 0/1 reviewed. Not a space agency, authoritative standard or flight-engineering validation; licensing not checked for copying.

<a id="NASA-LRO"></a>
### Resource: Lunar Reconnaissance Orbiter

- **Source ID:** `NASA-LRO`
- **Provider:** NASA Science
- **Resource type:** Official mission page
- **Official URL:** https://science.nasa.gov/mission/lro/
- **Accessed date:** Not substantively verified; LRO/PUNCH retrieval attempted 2026-11-14; MRO not retrieved
- **Relevant section/page:** Mission overview; substantive section verification pending
- **Purpose:** Offer a real-mission comparison, not claim identical spacecraft.
- **Why MissionX uses it:** Outbound educational comparison link only; no numerical specification supported.
- **Implementation location:** src/game/data/missions.json reference; existing result screens.
- **Related files/components:** src/game/data/missions.json reference; existing result screens.
- **Supported feature or calculation:** Outbound educational comparison link only; no numerical specification supported.
- **Implementation status:** Implemented
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Low
- **Limitations:** Link is present in implementation. LRO/PUNCH prior extraction was navigation-only; MRO remains unverified. Do not infer instrument specs, fleet equivalence or performance.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Link is present in implementation. LRO/PUNCH prior extraction was navigation-only; MRO remains unverified. Do not infer instrument specs, fleet equivalence or performance.

<a id="NASA-PUNCH"></a>
### Resource: PUNCH

- **Source ID:** `NASA-PUNCH`
- **Provider:** NASA Science
- **Resource type:** Official mission page
- **Official URL:** https://science.nasa.gov/mission/punch/
- **Accessed date:** Not substantively verified; LRO/PUNCH retrieval attempted 2026-11-14; MRO not retrieved
- **Relevant section/page:** Mission overview; substantive section verification pending
- **Purpose:** Offer a real-mission comparison, not claim identical spacecraft.
- **Why MissionX uses it:** Outbound educational comparison link only; no numerical specification supported.
- **Implementation location:** src/game/data/missions.json reference; existing result screens.
- **Related files/components:** src/game/data/missions.json reference; existing result screens.
- **Supported feature or calculation:** Outbound educational comparison link only; no numerical specification supported.
- **Implementation status:** Implemented
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Low
- **Limitations:** Link is present in implementation. LRO/PUNCH prior extraction was navigation-only; MRO remains unverified. Do not infer instrument specs, fleet equivalence or performance.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Link is present in implementation. LRO/PUNCH prior extraction was navigation-only; MRO remains unverified. Do not infer instrument specs, fleet equivalence or performance.

<a id="NASA-MRO"></a>
### Resource: Mars Reconnaissance Orbiter

- **Source ID:** `NASA-MRO`
- **Provider:** NASA Science
- **Resource type:** Official mission page
- **Official URL:** https://science.nasa.gov/mission/mars-reconnaissance-orbiter/
- **Accessed date:** Not substantively verified; LRO/PUNCH retrieval attempted 2026-11-14; MRO not retrieved
- **Relevant section/page:** Mission overview; substantive section verification pending
- **Purpose:** Offer a real-mission comparison, not claim identical spacecraft.
- **Why MissionX uses it:** Outbound educational comparison link only; no numerical specification supported.
- **Implementation location:** src/game/data/missions.json reference; existing result screens.
- **Related files/components:** src/game/data/missions.json reference; existing result screens.
- **Supported feature or calculation:** Outbound educational comparison link only; no numerical specification supported.
- **Implementation status:** Implemented
- **Adaptation or simplification:** MissionX uses its own simplified static, seeded model; no numerical authority beyond the supported scope is inferred.
- **Confidence:** Low
- **Limitations:** Link is present in implementation. LRO/PUNCH prior extraction was navigation-only; MRO remains unverified. Do not infer instrument specs, fleet equivalence or performance.
- **Usage and licensing notes:** Reference/link only; no agency endorsement. Do not assume embedded third-party content is reusable; check item-specific terms before reuse.
- **Verification status:** Link is present in implementation. LRO/PUNCH prior extraction was navigation-only; MRO remains unverified. Do not infer instrument specs, fleet equivalence or performance.

<a id="MISSIONX-EDUCATIONAL-ASSUMPTIONS"></a>
### Resource: MissionX authored educational model

- **Source ID:** `MISSIONX-EDUCATIONAL-ASSUMPTIONS`
- **Provider:** Team NASA WARRIORS / MissionX project contributors
- **Resource type:** Local authored assumptions and game rules; not external scientific evidence
- **Official URL:** No external authority. Repository: https://github.com/ausafulislam/MissionX
- **Accessed date:** 2026-11-14 local code inspection
- **Relevant section/page:** [Engineering rule and parameter inventory](ENGINEERING_REFERENCES.md), all estimate/policy sections.
- **Purpose:** Make unsupported numerical choices visible and replaceable.
- **Why MissionX uses it:** Existing teaching model needs bounded, deterministic trade-offs without pretending to be flight software.
- **Implementation location:** `src/game/data/`; `src/game/engine/`.
- **Related files/components:** `assumptions.json`, `events.ts`, `resources.ts`, `validation.ts`, `operations.ts`, `simulation.ts`, `telemetry.ts`, `progression.ts`.
- **Supported feature or calculation:** Authorship provenance only for numerical inputs, schedules, policies and scoring; not independent scientific validation.
- **Implementation status:** Implemented
- **Adaptation or simplification:** Identical fleet craft; flat rates; finite battery/memory; synthetic contacts; representative EOL campaign; heuristic life/science/risk.
- **Confidence:** Low
- **Limitations:** Original rationale for individual numeric choices was not recorded. Documentation must not retroactively invent a rationale; sensitivity/convergence work remains pending.
- **Usage and licensing notes:** Project-authored rules; repository ownership/license should be checked before external reuse. No NASA-derived numerical approval.
- **Verification status:** Code inspected; dimensional accounting and current tests support internal consistency, not realism. Exact inventories below.

## Implementation-tool references (not scientific evidence)
These README-linked tools support the implementation stack, not mission parameters. Their API/license review is outside the completed science-source verification. Each is reference-only for this research register; actual libraries are installed as recorded in package.json. No documentation-site artwork/code copied by this task.

### Resource: Bun documentation
- **Source ID:** `TOOL-BUN`
- **Provider:** Bun
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://bun.sh/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** package.json; bun.lock.
- **Related files/components:** package.json; bun.lock.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: Next.js / Vercel documentation
- **Source ID:** `TOOL-NEXT`
- **Provider:** Next.js / Vercel
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://nextjs.org/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** src/app; next.config.ts.
- **Related files/components:** src/app; next.config.ts.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: TypeScript / Microsoft documentation
- **Source ID:** `TOOL-TYPESCRIPT`
- **Provider:** TypeScript / Microsoft
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://www.typescriptlang.org/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** tsconfig.json; src/**/*.ts.
- **Related files/components:** tsconfig.json; src/**/*.ts.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: Tailwind Labs documentation
- **Source ID:** `TOOL-TAILWIND`
- **Provider:** Tailwind Labs
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://tailwindcss.com/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** src/app/globals.css; package.json.
- **Related files/components:** src/app/globals.css; package.json.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: GSAP documentation
- **Source ID:** `TOOL-GSAP`
- **Provider:** GSAP
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://gsap.com/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** src/hooks; src/components motion.
- **Related files/components:** src/hooks; src/components motion.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: Darkroom Engineering documentation
- **Source ID:** `TOOL-LENIS`
- **Provider:** Darkroom Engineering
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://lenis.darkroom.engineering/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** landing smooth-scroll wrapper.
- **Related files/components:** landing smooth-scroll wrapper.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: Three.js contributors documentation
- **Source ID:** `TOOL-THREE`
- **Provider:** Three.js contributors
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://threejs.org/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** src/components/hq/world.
- **Related files/components:** src/components/hq/world.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: Poimandres documentation
- **Source ID:** `TOOL-R3F`
- **Provider:** Poimandres
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://r3f.docs.pmnd.rs/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** src/components/hq/world.
- **Related files/components:** src/components/hq/world.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

### Resource: Zustand / Poimandres documentation
- **Source ID:** `TOOL-ZUSTAND`
- **Provider:** Zustand / Poimandres
- **Resource type:** Implementation-tool documentation
- **Official URL:** https://zustand.docs.pmnd.rs/
- **Accessed date:** Not verified in this task
- **Relevant section/page:** Specific API sections not inventoried; pending future code-change research.
- **Purpose:** Identify existing development tooling, not scientific authority.
- **Why MissionX uses it:** Existing stack documentation linked from README.
- **Implementation location:** src/game/store.
- **Related files/components:** src/game/store.
- **Supported feature or calculation:** Implementation infrastructure only; no scientific calculation.
- **Implementation status:** Reference only
- **Adaptation or simplification:** No technical methods adopted by this documentation task.
- **Confidence:** Low
- **Limitations:** Documentation URL content and package licenses not verified here; do not treat this record as license approval.
- **Usage and licensing notes:** Installed package license and version-specific docs must be checked before reuse/change.
- **Verification status:** Reference found locally; external verification pending.

## Cinematic foundation usage amendment — 0.1.6
- `NASA-SCIENCE-MISSIONS`: existing verified requirements/verification concepts now inform `src/game/engine/diagnostics.ts`; no claim of NASA test procedures or sensor measurements.
- `NASA-MISSION-VIZ`: remains reference-only for visuals. Mentioned by planned presentation metadata; no propagator/code/assets integrated.
- `MISSIONX-EDUCATIONAL-ASSUMPTIONS`: implemented lifecycle/status policies in `flight-lifecycle.ts`, `diagnostics.ts` and static `flight-stages.json`. Exact assumptions and tests in ENGINEERING_REFERENCES.md. Static IDs resolve to this register; this is not the broader parameter-level catalog migration.
- Verification basis is the preceding approved audit and its recorded source review; no new external numerical evidence or fresh link verification claimed. Commander/timestamp capture is local application metadata, not a sourced engineering measurement.

<a id="TOOL-PDF-LIB"></a>
### Resource: pdf-lib
- **Source ID:** `TOOL-PDF-LIB`
- **Provider:** Andrew Dillon / Hopding and contributors
- **Resource type:** Open-source PDF generation library, implementation reference only
- **Official URL:** https://github.com/Hopding/pdf-lib
- **Accessed date:** 2026-11-14
- **Relevant section/page:** Repository overview; installed1.17.1 API/types and LICENSE.md inspected; document/page/font/PNG/save APIs exercised by tests.
- **Purpose:** Generate direct multipage PDF downloads in browser without uploading flight data.
- **Why MissionX uses it:** Owner explicitly approved pdf-lib after native print limitations were explained.
- **Implementation location:** src/game/report/pdf-export.ts
- **Related files/components:** mission-report.ts; components/game/mission-report.tsx; mission-report.test.ts
- **Supported feature or calculation:** PDF formatting, PNG embedding, standard fonts and serialization; no scientific authority.
- **Implementation status:** Implemented
- **Adaptation or simplification:** Application handles wrapping/pagination; Unicode lines rasterized with browser fonts to avoid an unapproved font dependency. ASCII remains vector text; Unicode raster lines are not searchable text.
- **Confidence:** High
- **Limitations:** Browser/system font glyph coverage varies; not PDF/UA certified. No external font dependency added. Headless unit export replaces unsupported non-ASCII with question marks; user-facing browser export uses raster lines.
- **Usage and licensing notes:** Installed MIT license ©2019 Andrew Dillon; retain distributed license notices. No NASA assets copied; existing MissionX logo embedded.
- **Verification status:** Repository overview retrieved, installed license/types inspected; unit roundtrip and browser downloads tested. Full repository documentation not reviewed.

## Cinematic integration usage amendment — v0.1.7
- NASA-SCIENCE-MISSIONS supports requirements/verification and four report segments in the shared diagnostic/report modules, not simulated sensor or navigation certification.
- NASA-MISSION-VIZ remains visualization reference only; continuous procedural scene/path implementation is original. No assets/code copied and no propagator integrated.
- MISSIONX-EDUCATIONAL-ASSUMPTIONS supports authored scene geometry, camera interpolation, compressed clocks, load presentation and commissioning gate. These are not sourced distances/travel times.
- Quicksat references retain the previously reviewed conceptual budgeting scope in the report. Numerical coefficients and performance tables remain MissionX estimates.
- src/game/report/mission-report.ts maps only these genuinely relevant engineering references into the downloaded report; TOOL-PDF-LIB is an implementation dependency, not scientific evidence.
