# MissionX Design System (Design.md)

This file is the source of truth for visual language and tokens. Do not edit it. Page layouts and screen-by-screen design instructions are given by the owner at runtime.

---

## 1. Brand Identity and Visual Language

- **Brand Name:** MissionX
- **Tagline:** Design. Simulate. Learn.
- **Archetype:** Premium Aerospace / Orbital Mission Control / Cinematic Hard Sci-Fi Simulation.
- **Design Philosophy:** Minimalist, high-precision, hyper-legible interface floating over authentic orbital photography. Avoids cartoonish gaming tropes, excessive neon cyan glow, or unnecessary card containers. Delivers the authority of an official space agency mixed with a high-end aerospace vehicle HUD.

---

## 2. Color Palette and Token System

### Core Palette

| Token Name | Hex Code | Purpose and Usage |
|---|---|---|
| `color-bg-base` | `#0A0A0C` | Deep orbital black, foundational page canvas |
| `color-surface-elevated` | `#131316` | Mission panels, flight logs, control modules |
| `color-surface-hover` | `#1A1A20` | Interactive card and button hover state |
| `color-border-subtle` | `#26262B` | Hairline dividers, vertical stat rules, subtle containers |
| `color-border-active` | `#3E3E47` | Focused inputs, hovered controls, active tab borders |
| `color-accent-primary` | `#FF6A2B` | Aerospace telemetry orange: primary CTAs, critical telemetry, ignition highlights |
| `color-accent-glow` | `rgba(255, 106, 43, 0.35)` | Atmospheric radiant back-glow for primary action pills |
| `color-accent-blue-deep` | `#0D3B66` | Deep orbital dark blue: structured UI badges, telemetry backdrops, module container headers |
| `color-accent-blue-navy` | `#102A43` | Midnight aerospace navy: secondary panels, card borders, active HUD brackets |
| `color-accent-blue-cobalt` | `#1E40AF` | Focused deep cobalt indicator: secondary orbital telemetry, navigational vector accents, mission status pills |
| `color-text-primary` | `#F5F5F2` | High-contrast white for headers, numbers, and primary labels |
| `color-text-secondary` | `#8A8A93` | Muted cool grey for descriptions, subheadings, and units |
| `color-text-tertiary` | `#56565F` | Captions, metadata, inactive icons, orbital coordinates |

### Surface Overlays and Backdrops

- **Vignette Gradient:** `linear-gradient(to right, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.7) 45%, rgba(10,10,12,0.2) 80%, rgba(10,10,12,0.6) 100%)`
- **Deep Space Blue Gradient:** `linear-gradient(180deg, rgba(16, 42, 67, 0.25) 0%, rgba(10, 10, 12, 0.95) 100%)`
- **Bottom Shelf Fade:** `linear-gradient(to top, #0A0A0C 0%, rgba(10,10,12,0.6) 50%, transparent 100%)`
- **Backdrop Blur:** `backdrop-blur-md` for HUD overlays and floating controls.

---

## 3. Typography Hierarchy

### Font Families

- **Primary Typeface: Space Grotesk (Google Fonts).** Technical, modern aerospace geometric grotesque.
  - Used for: brand marks, large numerical metrics, section titles, navigation uppercase links, eyebrow badges.
- **Secondary Typeface: Inter (Google Fonts).** Precision neo-grotesque with neutral clarity.
  - Used for: body text, UI descriptions, button labels, telemetry data, tooltips.

### Type Scale and Hierarchy

| Hierarchy Level | Font Family | Weight | Size (Desktop / Mobile) | Tracking / Letter Spacing | Case |
|---|---|---|---|---|---|
| Eyebrow / Category | Space Grotesk | Medium (500) | 12px / 11px | 0.3em (`tracking-[0.3em]`) | UPPERCASE |
| Hero Brand Mark | Space Grotesk / Logo | Bold (700) | Responsive clamp or SVG | 0.15em | UPPERCASE |
| Mission Numbers / Stats | Space Grotesk | Bold (700) | 48px to 64px / 36px | tight | Normal |
| Section Heading | Space Grotesk | SemiBold (600) | 24px to 32px / 20px | 0.1em | UPPERCASE |
| Subheadings and Leads | Inter | Regular (400) | 16px to 18px / 15px | normal | Sentence case |
| CTA and Action Buttons | Inter | SemiBold (600) | 14px to 15px | 0.08em | UPPERCASE |
| Nav Links and HUD Labels | Space Grotesk | Medium (500) | 13px / 12px | 0.25em | UPPERCASE |
| Fine Labels / Captions | Inter | Medium (500) | 11px / 10px | 0.2em | UPPERCASE |

---

## 4. Spacing, Grid and Layout Principles

- **Base Spacing Grid:** 8px modular unit (4px micro, 8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px).
- **Viewport Layout:** 100vh full-bleed hero container with `overflow-hidden`.
- **Compositional Balance:**
  - **Left Flank (40 to 48% width):** primary typography, brand presence, value propositions, CTA. Backed by dark radial or linear gradient.
  - **Right Flank (52 to 60% width):** cinematic orbital subject (spacecraft or space station, solar arrays) with Earth curvature and floating directional controls.
  - **Bottom Dock (full width):** mission metric counters, subtle hairline grid dividers (`#26262B`), and "Scroll to Explore" telemetry.
- **Horizontal Margins:** `px-8 md:px-16 lg:px-24` on large desktop screens; minimum `px-5` on mobile.

---

## 5. UI Components and Patterns

### 1. Navigation Header

- **Container:** Fully transparent, floating across top edge (`h-24 md:h-28`), `z-50`.
- **Logo Placement:** Left-aligned, bold aerospace brand mark scaled for maximum authority.
- **Navigation Cluster:** Right-aligned, uppercase links (PLAY, ABOUT, MISSIONS, LEARN) with generous tracking (0.25em), subtle hover transition to deep cobalt (`hover:text-[#3B82F6]` or `hover:border-[#1E40AF]`).
- **Menu Trigger:** Minimal 2-bar or 3-bar hamburger icon (`w-7 h-5`) for contextual mission drawer.

### 2. Primary Action Button (Start Mission)

- **Structure:** Rounded pill (`rounded-full`), padding `px-8 py-4`.
- **Background:** Solid `#FF6A2B` with soft ambient glow (`box-shadow: 0 0 28px rgba(255, 106, 43, 0.45)`).
- **Typography:** Inter SemiBold, 14px, uppercase, letter-spacing 0.08em, crisp white `#FFFFFF`.
- **Icon:** Arrow right, moves +4px on hover.
- **Hover State:** Elevates subtly (`scale-[1.02]`), intensifying orange radiance.

### 3. Secondary Telemetry and Badges (Deep Dark Blue)

- **Structure:** Status badges, vector coordinates, telemetry chips.
- **Colors:** Deep Navy (`#102A43`) background with Dark Cobalt (`#1E40AF` / `#0D3B66`) hairline border and crisp secondary text.
- **Usage:** Orbit status indicators, sub-system monitoring panels, telemetry data badges, and mission phase markers.

### 4. Statistics and Metric Shelf

- **Container:** `border-t border-[#26262B]`, 4 evenly distributed columns.
- **Separators:** Thin vertical 1px rules (`border-r border-[#26262B]/60`).
- **Metric Value:** Space Grotesk Bold, 56px, color `#F5F5F2`.
- **Metric Label:** Inter Medium, 11px, tracking 0.25em, color `#8A8A93`.

### 5. Floating Viewport Navigation Controls

- **Structure:** Dual circular pills (`w-11 h-11`), stacked vertically on the right margin.
- **Styling:** `border border-white/20 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:border-[#1E40AF] hover:text-[#93C5FD]`.
- **Icons:** Chevron Up and Chevron Down, centered with smooth hover transitions.

### 6. "Scroll to Explore" Telemetry

- **Styling:** Small uppercase label (11px, tracking 0.2em, `#8A8A93`).
- **Indicator:** Minimal vector mouse outline with scroll indicator.

---

## 6. Motion and Interaction Tokens

- **Transition Curve:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for responsive aerospace feedback.
- **Standard Transition Duration:** 200ms for buttons and links; 400ms for panel overlays.
- **Ambient Space Motion:** Subtle slow orbital drift for floating particles or stars (0.05px/sec).
- **CTA Pulse:** Soft breathing ambient box-shadow glow loop in aerospace telemetry orange.
