# MissionX source register

[Documentation index](README.md) · [Formulas](ENGINEERING_REFERENCES.md) · [Field provenance](DATA_SOURCES.md) · [Rights](Asset-Attribution.md)

Re-verified 2026-11-14 for 0.1.11. Access dates below mean retrieval of the stated sections, not execution of a linked tool or approval of reuse. This register supersedes earlier implementation/adaptation labels. No NASA/CSA numerical dataset or GMAT integration is established.

## Classification and evidence standard

- **A Directly Implemented:** identifiable source-specific data/code/API/method actually used.
- **B Adapted:** documented transformation of an identifiable source method into code; similarity alone is insufficient.
- **C Conceptual Reference:** explicit educational reference, not proof of historical derivation.
- **D Mentioned Only:** documentation/metadata mention without established contribution.
- **E Not Used / Not Verified:** meaningful use or verification not established.

Each record has one primary category. Confidence concerns only the stated relationship/inspection, never NASA numerical validation. None of the nine proposed resources qualifies for A/B on current adoption evidence. The previous audit's B labels for the NASA presentation and Quicksat were too strong: code/reference prose establishes conceptual citation, not historical adoption or formula derivation.

## Scientific and mission references — nine proposed resources

All nine original URLs returned content in this correction pass on 2026-11-14. Section headings are used where extraction does not preserve reliable page numbers; no page numbers are invented.

<a id="NASA-SCIENCE-MISSIONS"></a>
### NASA-SCIENCE-MISSIONS — C Conceptual Reference
- **Provider/title:** NASA, Julie Levri; *Design and Develop Science Missions*, March 26, 2025, Access to Space for All / Systems Engineering Webinar Series.
- **Original URL:** https://www.nasa.gov/wp-content/uploads/2025/04/250323-design-and-develop-science-mission.pdf (original supplied query variant: https://www.nasa.gov/wp-content/uploads/2025/04/250323-design-and-develop-science-mission.pdf?emrc=a454cf).
- **Reviewed:** mission-segment definitions, Big Picture Process, Role of ConOps, BioNutrients mission-segment example (returned first chunk).
- **Actual relationship/code:** current conceptual citation in `src/game/report/mission-report.ts`; four result segment names in `simulation.ts`, requirements in `validation.ts` correspond to named ideas. No independently established historical transformation; not category B.
- **Data/formulas:** none sourced numerically. Catalog values now identify MissionX authorship, not this URL.
- **Limits/rights/confidence:** High for named content and conceptual correspondence; historical adoption unknown. Reference only; embedded third-party material and agency branding require item-specific rights review.

<a id="NASA-GMAT"></a>
### NASA-GMAT — D Mentioned Only
- **Provider/title:** NASA Software Catalog; *General Mission Analysis Tool (GMAT) Version R2025a*, GSC-19468-1.
- **URL:** https://software.nasa.gov/software/GSC-19468-1
- **Reviewed:** complete catalog overview/software details.
- **Relationship/code:** documentation comparison only. No GMAT dependency, process, solver, trajectory import, API or output file found. `journey-geometry.ts` is authored scene geometry.
- **Limits/rights/confidence:** High for catalog/no integration distinction. GMAT not installed/executed; do not infer a particular code license from “open source” on a catalog page. No software reused.

<a id="NASA-JPL-CML"></a>
### NASA-JPL-CML — D Mentioned Only
- **Provider/title:** Wessen, Borden, Ziemer, Kwok; JPL/Caltech Open Repository; *Space mission concept development using concept maturity levels* (2013), repository version 2.0.
- **URL:** https://dataverse.jpl.nasa.gov/dataset.xhtml?persistentId=hdl:2014/44299
- **Linked paper:** https://dataverse.jpl.nasa.gov/api/access/datafile/50237
- **Reviewed:** repository abstract/metadata, CML 1–4 description, displayed terms. Full paper/matrix not newly read.
- **Relationship/code:** reference only in documentation; no CML matrix, scoring or rating in engine.
- **Limits/rights/confidence:** High for metadata; limited for paper. Repository displays CC0; file-specific notices still require review before reproduction.

<a id="NASA-MDL"></a>
### NASA-MDL — D Mentioned Only
- **Provider/title:** NASA Goddard ETD; *Mission Design Lab*.
- **URL:** https://etd.gsfc.nasa.gov/capabilities/integrated-design-center/mission-design-lab/
- **Reviewed:** What MDL Provides, study options, capabilities, disciplines; complete page.
- **Relationship/code:** professional-analysis comparison, not imported MDL tools, studies, cost estimates or certification. Documentation only.
- **Limits/rights/confidence:** High for page. Do not infer adoption from generic mass/power/data trades. Reference only; image rights not granted by linking.

<a id="NASA-MISSION-VIZ"></a>
### NASA-MISSION-VIZ — D Mentioned Only
- **Provider/title:** NASA mission-viz; *Web-based Space Mission Visualization*.
- **URL:** https://nasa.github.io/mission-viz/
- **Reviewed:** complete apps/tutorial index; linked demos not executed.
- **Relationship/code:** historical descriptive ID in unused `src/game/data/flight-stages.json`; reference in docs. Runtime uses Three.js procedural geometry, not established NASA code reuse.
- **Limits/rights/confidence:** High for index/no imported implementation, unknown historical influence. Prior `https://github.com/nasa/mission-viz/blob/main/LICENSE` lookup was missing-file content, not proof of no repository license. No reuse clearance claimed.

<a id="NASA-WEBB-GAME"></a>
### NASA-WEBB-GAME — D Mentioned Only
- **Provider/title:** NASA Science/Webb; *Build It Yourself: A Learning Game About Telescopes*.
- **URL:** https://science.nasa.gov/mission/webb/game-build-it-yourself/
- **Reviewed:** learning-game introduction in returned chunk 2: science choice drives wavelength/instrument/optics choices.
- **Relationship/code:** documentation reference. Similar goal-first gameplay is not proof of adoption; no specific game code/content reused.
- **Limits/rights/confidence:** High for introduction; game not played, full mechanics not compared. Reference only; game/asset terms not reviewed for reuse.

<a id="NASA-CUBESAT-101"></a>
### NASA-CUBESAT-101 — D Mentioned Only
- **Provider/title:** NASA CubeSat Launch Initiative; *CubeSat 101: Basic Concepts and Processes for First-Time CubeSat Developers* (2017).
- **URL:** https://www3.nasa.gov/sites/default/files/atoms/files/nasa_csli_cubesat_101_508.pdf
- **Reviewed:** introduction, §1.1 CubeSats, beginning §1.2 in returned chunk 1; PDF extraction limited to first 30 pages. TOC entries are not proof of chapter review.
- **Relationship/code:** process reference only; `bus-cube` has authored mass/payload/life, no U-size/dispenser/interface conformity implementation.
- **Limits/rights/confidence:** High for inspected content, incomplete guide review. Third-party image credits apply; not universal spacecraft qualification or a source for battery factors.

<a id="NASA-SPACEAPPS-VR-2023"></a>
### NASA-SPACEAPPS-VR-2023 — D Mentioned Only
- **Provider/title:** NASA International Space Apps Challenge; *Visualize a Space Mission Using Virtual Reality* (2023).
- **URL:** https://www.spaceappschallenge.org/2023/challenges/visualize-a-space-mission-using-virtual-reality/
- **Reviewed:** summary/background/objectives/potential considerations.
- **Relationship/code:** past challenge context only; no WebXR, VR, GMAT or X3D integration. Ordinary browser 3D is not VR implementation.
- **Limits/rights/confidence:** High for text/no integration; suggested tools not executed. Reference only, not permission to copy artwork.

<a id="CSA-DIGITAL-GAMES"></a>
### CSA-DIGITAL-GAMES — D Mentioned Only
- **Provider/title:** Canadian Space Agency; *Digital games and activities*.
- **URL:** https://www.asc-csa.gc.ca/eng/youth-educators/digital-games-and-activities.asp
- **Reviewed:** complete directory, including RADARSAT/OSIRIS-REx/Exploring Earth descriptions.
- **Relationship/code:** education reference only; no CSA activity, imagery or data integrated.
- **Limits/rights/confidence:** High for directory; individual games not played or source-compared. CSA is not NASA. Individual activities may have separate terms.

## Other scientific mission context

These are **C Conceptual Reference**, not numerical sources. Provider: NASA Science. Substantive mission-page sections were reviewed in the preceding read-only audit; not re-fetched in this correction pass. Confidence high for theme, no performance equivalence. Runtime relationship: `missions.json` reference links → result UI; no data ingestion. Reference only; linked images not copied or licensed here.

<a id="NASA-LRO"></a>
- **NASA-LRO:** *Lunar Reconnaissance Orbiter*, https://science.nasa.gov/mission/lro/ — mapping/LOLA context; prior audit reviewed mission/science text.
<a id="NASA-PUNCH"></a>
- **NASA-PUNCH:** *PUNCH*, https://science.nasa.gov/mission/punch/ — four-spacecraft solar observations from Earth orbit; prior audit reviewed Key Questions/A New View. MissionX's identical craft are not a PUNCH hardware model.
<a id="NASA-MRO"></a>
- **NASA-MRO:** *Mars Reconnaissance Orbiter*, https://science.nasa.gov/mission/mars-reconnaissance-orbiter/ — Mars imaging/mineral/water themes; prior audit reviewed overview/key facts/science text. No actual MRO specifications adopted.

## Engineering and educational references

<a id="COMMUNITY-QUICKSAT-POWER"></a>
### COMMUNITY-QUICKSAT-POWER — C Conceptual Reference
- **Provider/title:** egemenimre / Quicksat contributors; *Set up a power budget*.
- **URL:** https://github.com/egemenimre/quicksat/blob/master/docs/guides/power/set_up_a_power_budget.md
- **Accessed/reviewed:** 2026-11-14; returned chunk 1, §§5–8 battery/conditioning/budget checks.
- **Actual relationship:** explicit conceptual citation in report/engineering docs. `resources.ts` and `operations.ts` use locally written accounting; no Quicksat import or demonstrated historical derivation. Matching efficiencies are not attribution proof.
- **Limits/rights/confidence:** High for inspected text, unknown adoption; no numerical coefficients established as copied. Reuse license not cleared; a missing uppercase LICENSE path is not proof of no license.

<a id="COMMUNITY-QUICKSAT-SIZING"></a>
### COMMUNITY-QUICKSAT-SIZING — C Conceptual Reference
- **Provider/title:** egemenimre / Quicksat contributors; *Initialise a satellite*.
- **URL:** https://github.com/egemenimre/quicksat/blob/master/docs/guides/sizing/initialise_a_satellite.md
- **Accessed/reviewed:** 2026-11-14; returned chunk 1, dataflow inputs, mass configuration, loading/checking sections.
- **Relationship:** explicit reading link in `operations-note.tsx`/report; contacts/rates/storage concepts only. No imported Python library or proof MissionX's rate×duration formula derives from this guide.
- **Limits/rights/confidence:** High for content, historical adoption unknown. No Quicksat delta-v/agility capability implied; reuse licensing unverified.

<a id="COMMUNITY-MISSION-ARCHITECT"></a>
### COMMUNITY-MISSION-ARCHITECT — D Mentioned Only
- **Provider/title:** IDEAMAX Skills Factory / devideamax; *Mission Architect skill guide*.
- **URL:** https://github.com/devideamax/aerospace-team/blob/main/skills/mission-architect/SKILL.md
- **Reviewed:** front matter/role/overview in prior audit; not re-fetched this pass. Historical planning reference in `Engineering-Audit.md` only.
- **Limits/rights/confidence:** Not an agency/validated standard. Front matter says generated guide, “MIT + Attribution”; preserve required notice if reuse later occurs. No numerical adoption established; low confidence on historical influence.

<a id="MISSIONX-EDUCATIONAL-ASSUMPTIONS"></a>
### MISSIONX-EDUCATIONAL-ASSUMPTIONS — A Directly Implemented local rules (not external scientific authority)
- **Provider:** MissionX contributors; repository https://github.com/ausafulislam/MissionX
- **Reviewed:** actual catalogs, `resources/validation/operations/simulation/diagnostics`, 2026-11-14.
- **Relationship:** locally authored inputs, calculations and gameplay policies. See [field provenance](DATA_SOURCES.md).
- **Limits:** original numerical balancing rationale not recorded; high confidence in code inventory, no claim of physical validation. Code/docs MIT where project owns rights; assets retain separate terms.

## Participation and identity — not engineering sources

- **SPACEAPPS- 2026 — C Conceptual Reference:** NASA Space Apps, *Space Mission Design Game*, https://www.spaceappschallenge.org/2026/challenges/space-mission-design-game/ . Prior audit reviewed challenge objectives/background; not newly fetched here. Matches scope, not numerical requirements or mandatory multiplayer. Confidence high for scope, no endorsement. Reference-only rights.
- **TEAM-NASA-WARRIORS — D Mentioned Only:** participant-submitted team page, https://www.spaceappschallenge.org/2026/find-a-team/nasa-warriors/ . Prior audit reviewed identity/about/user-generated-content notice; not freshly fetched here. README/CITATION identity context only, not engineering evidence or asset permission.

## Software dependencies and APIs — not scientific sources

Actual packages/API use is **A Directly Implemented** unless noted. Verification: local imports/package metadata and lock, 2026-11-14; confidence high for integration, not a complete upstream API/license audit. See [attribution](Asset-Attribution.md) for exact versions/terms.

| Provider/tool | Original URL | Actual code relationship / reviewed evidence |
|---|---|---|
| Three.js / contributors | https://threejs.org/ | `world/`, Vector3/Quaternion/PerspectiveCamera; local installed API inspected |
| Three.js math/camera reference | https://github.com/mrdoob/three.js/blob/r187/src/math/Quaternion.js ; https://github.com/mrdoob/three.js/blob/r187/src/cameras/PerspectiveCamera.js | `journey-geometry.ts`; URLs retained, not re-fetched |
| pmndrs / React Three Fiber & Drei | https://r3f.docs.pmnd.rs/ | Canvas/hooks/helpers in `world.tsx`; local imports |
| Hopding / pdf-lib | https://github.com/Hopding/pdf-lib ; https://github.com/Hopding/pdf-lib/blob/master/src/api/PDFPage.ts | `pdf-export.ts`, `pdf-layout.ts`; local API/imports |
| Vercel / Next.js | https://nextjs.org/ | App Router/API route; installed use-client guide reviewed |
| Meta/contributors / React | https://github.com/facebook/react | components/hooks; local imports |
| pmndrs / Zustand | https://zustand.docs.pmnd.rs/ | mission/commander stores |
| GSAP / Webflow | https://gsap.com/ | UI motion; license https://gsap.com/standard-license retrieved 2026-11-14 |
| darkroom.engineering / Lenis | https://lenis.darkroom.engineering/ | landing motion only |
| OpenAI API | https://api.openai.com/v1/chat/completions | conditional POST in `/api/mentor`, server-only key; no live provider test, no aerospace data authority |
| Tailwind Labs | https://tailwindcss.com/ | CSS/Turbopack config, local package |
| Microsoft / TypeScript | https://www.typescriptlang.org/ | compilation/types, local config |
| Bun / tooling | https://bun.sh/ | package scripts/packageManager; developer tool, not shipped science data |

Documentation homepages above are identifying links, not claims their complete contents were read. No new dependencies were installed.

## Accessibility / interaction guidance

**W3C-ARIA-DIALOG — C Conceptual Reference.** W3C APG, https://github.com/w3c/aria-practices/blob/main/content/patterns/dialog-modal/dialog-modal-pattern.html . Prior audit reviewed modal inertness, focus containment/return; local `focus-guard.tsx` and `tutorial-tour.tsx` implement corresponding patterns, but historical adoption is not proven. Not scientific evidence or accessibility certification; current pass did not re-fetch. Review W3C terms before copying examples.

## Assets and creative resources

Bundled fonts are **A Directly Implemented** assets: Barlow https://github.com/jpt/barlow ; Inter https://github.com/rsms/inter ; Space Grotesk https://github.com/floriankarsten/space-grotesk ; IBM Plex Mono (IBM copyright in bundled notice). Local OFL files reviewed 2026-11-14; upstream binaries not hash-verified. Notices refer to https://scripts.sil.org/OFL . Images/logos: unknown rights requiring owner confirmation; no NASA imagery provenance inferred. Models/textures/audio are procedural code; see [asset register](Asset-Attribution.md).

## Metadata scope and history

- `flight-stages.json` retains historical `sourceIds` descriptively; not imported, not timing control.
- Diagnostic source IDs name local authored rules only; they are descriptive strings, not a resolver, measurement source or scientific validation.
- Catalog source metadata now says authored and links the repository, not an unrelated NASA numerical authority. The prior NASA concept link remains documented above and in Git history.
- PDF lists current source descriptions separately from captured/reconstructed parameter values. Source-register IDs do not control calculations.
- Prior resource register/audit records are historical evidence, not stronger proof of adoption. No external-source resolver was invented.

MissionX is an independent educational project created by Team NASA WARRIORS for the NASA International Space Apps Challenge 2026. It is not affiliated with, endorsed by, or sponsored by NASA or any other space agency. NASA is not responsible for information contained on non-U.S. Government websites.


## Finalization retrieval and competition-resource update — 2026-11-14

Re-retrieved all nine supplied original targets for the finalization task: NASA Design first PDF chunk (segments/process/ConOps), GMAT full catalog, JPL CML first metadata/abstract chunk (not full paper), MDL full page, Mission Viz full index (no demos), Webb chunk2 learning-game introduction, CubeSat chunk1 introduction/§1.1/start1.2,2023 VR first chunk and CSA full activity directory. This does not enlarge the original scientific review beyond the named sections. Primary classifications above remain unchanged; no NASA numerical dataset/solver/API integration is established.

### Space Apps resources — administrative, not engineering inputs

- 2026 theme page https://www.spaceappschallenge.org/2026/ — The Next Frontier verified; event theme, not selected challenge title.
- 2026 selected challenge https://www.spaceappschallenge.org/2026/challenges/space-mission-design-game/ — both chunks, objectives/potential considerations; collaborative modes are optional, MissionX remains single-player.
- Submission Guide https://www.spaceappschallenge.org/resources/project-submission-guide/ — all3 chunks; required public demo≤7slides or≤30seconds, form fields, NASA-resource requirement, SI disclosures/watermarks and attestations. No eligibility/compliance grant inferred.
- Judging Guide https://www.spaceappschallenge.org/resources/judging-awards-guide/ — first chunk, eligibility and criteria; complete legal/award analysis not claimed.
- Team page https://www.spaceappschallenge.org/2026/find-a-team/nasa-warriors/ — full returned About page; participant-generated identity/Universal Event, no verified roster/endorsement.

Actual use: [submission preparation](../submission/OFFICIAL_REQUIREMENTS.md), README identity and human checklist; no runtime ingestion. Rights: referenced, no agency images copied. Confidence high for retrieved instructions; owner must verify live form, full legal terms, timezone/member eligibility and originality/permissions before submitting. See also [Asset-Attribution](Asset-Attribution.md): SI-generated-image watermark rules may require owner action, not silent artwork editing.
