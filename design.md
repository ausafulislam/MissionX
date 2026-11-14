# MissionX — cinematic landing design system

This owner-requested specification supersedes conflicting legacy tokens in docs/Design.md (preserved as historical context). LONG-BURN screenshot is a direction for editorial scale, staggered frames, dark space and technical detail, never copied identity, copy or imagery.

## Color
Background #080A0F; secondary #0D111A; card #101521; elevated #151B28; border #252D3B; primary text #F5F5F2; secondary #9299A7; orange #FF6A2B; success #3DDC84; warning #FFB020; error #FF4D4F. Orange only for focus, action, select words, indices, and active states. No dominant orange backgrounds or neon glow.

## Exact typography
All four families are Google Fonts. Prefer next/font/google in unrestricted deployment; this network-restricted environment vendors the original Google Fonts files from google/fonts on GitHub and uses next/font/local for reliable self-hosted builds and zero runtime font requests.

| Family | Weights | Purpose | Fallback |
|---|---|---|---|
| Barlow Condensed | 600,700,800,900 | hero, uppercase large titles, huge numbers | Impact, Arial Narrow, sans-serif |
| Space Grotesk | 400,500,600,700 | secondary titles, navigation, buttons, UI labels | Arial, sans-serif |
| Inter | 400,500,600 | body and descriptions | Arial, sans-serif |
| IBM Plex Mono | 400,500 | metadata, mission IDs, indices, status | Courier New, monospace |

Hero clamp(76px,9.7vw,148px), 800, .88 line-height, -.025em. Section title clamp(48px,6vw,88px), 700/800, .95 line-height. Mission title 48–64px, 700. Body 14–16px, 400, 1.75 line-height. UI 11–13px, 500/600, .06em tracking. Metadata 10–12px, 400/500, .1em tracking. Never reproduce the logo in text.

## Layout and spacing
8px modular scale: 4,8,16,24,32,48,64,96,128. Max content width 1440px, desktop gutter 64px, tablet 32px, mobile 20px. Hero full bleed, text left, spacecraft right; gradient protects contrast. Content panels use 1px borders and 8px radius, offset horizontally with restrained overlap. At most 4–5 visual groups per viewport. Sideways section indices on desktop. Sections separated by 96–144px; mobile 64–80px. Cards are editorial image compositions, not a generic SaaS grid.

## Components
Primary buttons: orange, dark text, Space Grotesk 600, minimum 48px height, 4px radius; arrow moves subtly on hover. Secondary links: underline rule or arrow, 44px touch target. Cards: thin border, low-radius, no excessive shadows/glass. Technical meters use a clear label and numeric value, plus explanatory text, not color alone. Navigation has a keyboard-accessible mobile menu. Dialog uses native modal semantics, Escape/backdrop dismissal and focus restoration.

## Responsive
Desktop ≥1100px: asymmetric layouts, generous typography, staggered mission frames. Tablet 700–1099px: smaller gutters/offsets, two-column where readable. Mobile <700px: one column, no panel offsets, compact navigation, hero image visible behind gradient, no horizontal overflow, no parallax. Body remains readable; controls ≥44px.

## Motion
GSAP + @gsap/react with scoped useGSAP, ScrollTrigger; Lenis drives the GSAP ticker with milliseconds conversion, scroll event triggers ScrollTrigger.update. Destroy Lenis and remove ticker on cleanup. No native CSS smooth scrolling alongside Lenis. Hero staggered line reveals and controlled orbital image entry; sections use subtle y/fade reveals; image hover scale; resource meter entrance animation; final visual drift. 0.7–1.2s ease power3.out entrances, 200–400ms hover transitions. No scroll hijacking or pinned content. Content visible before hydration. prefers-reduced-motion skips motion and smooth scrolling, including preference changes. Avoid layout-shift, heavy 3D and perpetual decorative animation.

## Game extension — same design, not a dashboard
Game canvas retains all existing fonts/colors. Header: unchanged logo, mission identifier, compact numbered stage rail and return-to-site link. Display headings 64–100px desktop, 48–64px mobile. Workspace: asymmetric two-column composition, dominant cinematic destination/spacecraft viewport with restrained bordered engineering panels, metadata strips, editorial section numbers. Use orange sparingly for active controls, numeric accents and primary progress action. Dense labels ≥10px, body 13–16px. Resource rails use numeric value, limit, units, readable explanation and pass/close/fail text. Selection cards have aria-pressed, visible border and text selected state. Sticky resource summary only on desktop; mobile stacks it before controls. No horizontally scrolling app canvas. Native scroll in game to avoid custom scrolling conflicts with nested component catalogs. GSAP owns route and selection entry, meter transitions, and mission scene movement; simulation time/engine events are the source of truth. Reduced motion replaces movement with discrete readable states. Timeline playback offers pause, 1x/2x/4x and skip; never traps navigation. Comparison uses stacked per-run cards on small screens. Confirmation for reset; no destructive silent reset.

## Phase 03 — Space Mission Control Headquarters (current gameplay direction)
The 3D world is now the primary interface at `/hq`, not a decorative background behind a dashboard. Preserve all existing branding/fonts and the landing. A full-viewport architectural spacecraft interior has a broad observation window over Earth, ribbed structural bays, recessed technical floor, catwalk lighting and a central holographic Earth. Engineering, navigation, preflight/launch, science, and archive stations are spatial destinations with pointer/touch hotspots and matching keyboard controls. Camera moves between authored compositions; limited orbit/zoom inspection never requires first-person walking. Menu composition reserves space on the left, hero globe on the right. Station panels occupy a narrow edge of the viewport while models remain dominant.

### Rendering architecture / materials
Lazy client-only React Three Fiber Canvas. Modular headquarters, planet, spacecraft, launch and camera components. Metallic graphite/off-white architecture, brushed gold thermal insulation, blue photovoltaic cells, glass/clearcoat screens, cool-white strip lights, sparse orange interaction accents. Detailed procedural assemblies (bevelled platforms, recessed panels, rails, antenna bowls, instrument optics, clustered engine bells), not unrelated boxes. Original seeded planet textures are generated locally on canvases; no remote model, HDR or font request. Shared geometries/materials are automatically disposed by R3F; owned procedural textures are explicitly disposed. Instanced architectural repeats and stars. No expensive realtime floor reflection or postprocessing requirement; use polished material highlights and controlled lighting. Native game scrolling is confined to edge panels; no Lenis inside the world.

### Interaction / motion
Authored camera targets per station with damped/cinematic movement; reset to wide view anytime. GSAP UI entrances; R3F per-frame assembly, orbital and launch animation derived from existing catalog/store and simulation clock. Removal animates outward before a component is hidden. Planet focus changes on mission selection. Reduced-motion preference (OS or player) stops ambient drift, camera flights and assembly travel; retain discrete feedback. Fullscreen only in direct user gestures; rejection never blocks entry. Mobile portrait orientation screen has a rotating CSS 3D phone and an explicit continue-in-portrait escape. Handle resize, orientationchange and fullscreenchange with cleanup.

### HUD / entry / audio
Persistent restrained HUD: logo, commander, station, mission and audio/settings controls, with bottom station dock. Entry progress measures actual imported scene module, decoded logo and engine readiness tasks, never a timer masquerading as assets. Profile name 2–24 characters, no registration. Returning identity can be edited. Original Web Audio ambient chord/drone with filtered noise and procedural effects; AudioContext is created/resumed only after a user gesture. Independent master/music/effects gains, mute and toggles, suspended when tab hidden. No audio network files or copyrighted music. Sounds have action-specific envelopes for clicks, installation/removal, validation, liftoff, separation, deployment and outcomes.

### Responsive / performance
Device-aware DPR capped 1 on small screens, 1.5 on high quality desktop; low mode reduces sphere detail, instanced particles and shadows. No physics or costly postprocessing. Landscape uses model + edge panel; portrait offers explicit continuation with a compact model viewport and bottom sheet that can collapse. Touch targets ≥44px; mouse/touch/keyboard station access. WebGL capability/context loss and render errors switch to a polished static destination with functional station controls and links to the complete accessible flight deck. English is the implemented interface; settings must honestly label unavailable translations, not offer fake localization. Player XP/achievements derive from actual completed runs, never time spent or paid actions.

## Game-feel refinement — current owner override (2026-11-14)
The newest commission uses **Space Grotesk headings and Inter body** on both interactive game experiences. The preserved marketing landing keeps its established composition. Authoritative game UI tokens: background #0A0A0C, surface #131316, border #26262B, accent #FF6A2B, primary #F5F5F2, secondary #8A8A93, success #3DDC84, warning #FFB020, failure #FF4D4F. The 3D environment may keep cool physical lighting; station controls use dark neutral panels, restrained orange feedback and status colors.

Shared game-feel styles live in `src/app/game-feel.css`; reusable outcome, score and flight-status components complement existing screens instead of replacing the architecture. The original procedural musical score now varies harmony, register, rhythm and timbre across landing/preparation/launch/results/failure, with overlapping release tails for smooth mood changes. Sound is never the only warning or success signal. Engine loop follows playback/pause/staging; skipping does not replay a burst of missed launch sounds. OS and stored reduced-motion preferences take precedence over cinematic effects.
