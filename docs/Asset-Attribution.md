# Assets, dependencies, attribution and rights

[Documentation index](README.md) · [Source categories](RESOURCES.md)

Inspected 2026-11-14, release0.1.11. Preserve the existing [MIT LICENSE](../LICENSE): project software/docs copyright2026 Team NASA WARRIORS. MIT does not establish third-party ownership, asset permission or trademark rights. This register is not legal clearance or an exhaustive deployment SBOM.

## Images and creative assets

| Asset | Evidence | Rights/status |
|---|---|---|
| `public/images/logo.png` | Existing supplied artwork, unchanged | **Unknown / Requires owner confirmation** of creator and redistribution permission |
| `public/images/logo-report.png` | Recolored/trimmed derivative via `scripts/pdf-logo.ts` | Inherits unknown underlying logo rights |
| `public/images/orbital-hero.png` | Existing cinematic raster; earlier Memory describes AI generation, not independently verified ownership | **Unknown / Requires owner confirmation** |
| `public/images/lunar-mission.png` | Actual existing lunar raster; earlier creation history not a rights grant | **Unknown / Requires owner confirmation** |
| `lunar-closeup.png` named in audit/request | No file with this name exists in current repository; likely refers to lunar-mission.png, owner to confirm | Unknown; no replacement/removal made |
| `docs/images/*.webp` | Actual app captures; gallery documents release/conditions | Underlying UI/artwork rights apply; screenshots are not hardware 3D proof |
| `src/app/icon.svg`; inline SVG/Unicode/CSS icons | Local X icon and UI source; no imported icon pack found | Local implementation under project license where owned; no agency insignia added |
| HQ/world spacecraft/rocket/architecture | Primitive geometry in `world/`; no GLTF/OBJ/FBX asset import | Procedural project code, not NASA models |
| Planets/stars | Canvas textures/authored polygons/craters and deterministic star generators | Procedural code, not NASA texture/astronomical datasets |
| Audio/music | `audio-manager.ts`, `score.ts`: oscillators/noise, chord/cue arrays; no bundled recordings | Procedural project code; no external recording rights inferred; original authorship not independently certified |

No visual assets were removed/replaced. Do not add NASA logos, seals or insignia implying endorsement. Agency pages may contain third-party images with separate rights.

## Fonts — bundled notices retained

| Family | Local files | Provider evidence / original project | Terms |
|---|---|---|---|
| Barlow | barlow.ttf, -600, -700, -900 | Barlow Project Authors, https://github.com/jpt/barlow | `public/fonts/barlow.ttf.LICENSE.txt`, SIL OFL1.1 |
| Inter | inter.ttf | Inter Project Authors, https://github.com/rsms/inter | inter.ttf.LICENSE.txt, SIL OFL1.1 |
| IBM Plex Mono | mono.ttf, mono-500.ttf | IBM Corp.; reserved name Plex in bundled notice | mono.ttf.LICENSE.txt, SIL OFL1.1 |
| Space Grotesk | space.ttf | Space Grotesk Project Authors, https://github.com/floriankarsten/space-grotesk | space.ttf.LICENSE.txt, SIL OFL1.1 |

Loaded locally with `next/font/local`; no remote font request. Notices inspected, upstream binary hashes not independently compared. Retain font copyright/license; modified reserved names need appropriate permission. OFL is not replaced by repository MIT.

## Direct software dependencies

Local package metadata/lock/imports inspected. All original package authors retain their rights; installed versions are not a future version guarantee.

| Dependency | Installed version | Provider / source | License / usage |
|---|---|---|---|
| next | 16.4.6 | Vercel, https://github.com/vercel/next.js | MIT; routing/server |
| react / react-dom | 19.3.0 | Meta/contributors, https://github.com/facebook/react | MIT; UI |
| three | .187.0 | Three.js contributors, https://github.com/mrdoob/three.js | MIT; scene/math |
| @react-three/fiber | 9.8.2 | pmndrs, https://github.com/pmndrs/react-three-fiber | MIT; renderer |
| @react-three/drei | 10.7.9 | pmndrs, https://github.com/pmndrs/drei | MIT; helpers |
| zustand | 5.1.0 | pmndrs, https://github.com/pmndrs/zustand | MIT; local stores |
| pdf-lib | 1.17.1 | Hopding, https://github.com/Hopding/pdf-lib | MIT; report export |
| lenis | 1.3.27 | darkroom.engineering, https://github.com/darkroomengineering/lenis | MIT; landing scrolling |
| gsap | 3.15.1 | GSAP/Webflow, https://github.com/greensock/GSAP | GSAP Standard No Charge license, **not MIT** |
| @gsap/react | 2.1.2 | GSAP, https://github.com/greensock/react | Points to GSAP standard license |

GSAP terms https://gsap.com/standard-license retrieved 2026-11-14 (redirected standard license page; effective April30 2025, modified May30 2025). Permitted website/application uses remain subject to restrictions, including specified competing visual-animation-builder uses. Preserve notices; do not claim all dependencies are unrestricted MIT. Future use changes need terms review.

## Tooling and APIs

Tailwind/Turbopack4.3.3, ESLint9.39.5, eslint-config-next16.4.6 and installed DefinitelyTyped packages declare MIT; TypeScript5.9.3 declares Apache-2.0. Bun1.3.14 is the configured tool; its entire bundled third-party distribution has not been audited here. No new dependencies installed.

Optional OpenAI Chat Completions request is server-side in `/api/mentor`; no OpenAI SDK dependency is installed. Service terms/privacy/billing are separate from code licensing; no live provider validation or aerospace authority implied.

## Material transitive review items

Installed manifest scan in the preceding audit covered405 packages, not shipped bundles. Local reinspection of applicable license declarations supports the items below; dependency inclusion does not prove browser shipping.

| Package(s) | Declared terms | Review action |
|---|---|---|
| sharp .35.5 | Apache-2.0 | Native image pipeline and logo script; preserve applicable notices |
| @img/sharp-libvips Linux variants | LGPL-3.0-or-later | Review native distribution and source/relinking obligations for actual artifacts |
| lightningcss and Linux variants | MPL-2.0 | Review file-level/source obligations when distributing |
| axe-core | MPL-2.0 | Tooling presence is not completed accessibility certification |
| caniuse-lite | CC-BY-4.0 | Dataset attribution review |
| pako | MIT AND Zlib | Preserve both applicable notices |
| argparse | Python-2.0 | Preserve applicable license |
| webgl-constants | manifest missing license field; local LICENSE is MIT, Tim van Scherpenzeel2019 | Do not misreport as unlicensed based only on manifest |
| three-stdlib, maath, three-mesh-bvh, @pdf-lib/standard-fonts, @pdf-lib/upng | MIT declarations | Retain notices; full transitive closure still needs artifact review |

Pending owner decisions: artwork identity/rights, actual redistribution targets, and whether to commission a full shipped-artifact license/SBOM review. Referencing NASA/JPL/CSA or a participant team page grants neither endorsement nor asset permission.


## Separate owner confirmation checklist — 0.1.12

No artwork was changed by the final software corrections. For each item, confirm creator, creation/source history, ownership or permission, and distribution/derivative rights in the intended public release:

1. `public/images/logo.png` — supplied logo.
2. `public/images/logo-report.png` — derivative of the same logo; underlying and derivative permission.
3. `public/images/orbital-hero.png` — supplied cinematic artwork; earlier AI-generation history is not proof of rights.
4. `public/images/lunar-mission.png` — supplied lunar artwork; confirm whether this is the intended “lunar-closeup.png,” which is absent.
5. `docs/images/*.webp` — application screenshots inherit any restrictions of the artwork above; not an independent clearance.

Status for the underlying supplied art remains **Unknown / Requires owner confirmation**. Repository MIT and passing software tests do not establish legal clearance.


## Official submission/SI gate — finalization

The freshly retrieved [Submission Guide](https://www.spaceappschallenge.org/resources/project-submission-guide/) requires visible watermarks on SI-generated images/video, descriptive/metadata acknowledgement for generated audio/code/data, and forbids generated NASA branding. Earlier Memory records say orbital/lunar art was generated locally; full creator/tool/license/idea history and required markings are not verified. AI-assisted code/docs were used in this session. Owner must reconcile **all** prior work and permissions before agreeing originality/legal terms. No logo/artwork was replaced or marked here, per preservation constraint; current screenshots inherit those unresolved issues. [Official requirements](../submission/OFFICIAL_REQUIREMENTS.md).

Existing local font families carry SIL OFL notices; dependencies retain their own notices. GSAP's custom license is not MIT. No dependency/source-image redistribution right follows merely from a package being installed or NASA linking a page. No legal clearance or complete transitive license certification is claimed.
