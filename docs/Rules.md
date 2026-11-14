# Rules: MissionX

Boundaries for the AI agent. Follow these on every task.

---

## 1. Workflow

1. Before doing anything, read `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md` and `Memory.md` (if it exists).
2. Work only on the current phase listed in `Phases.md`. Do not jump ahead.
3. Keep changes small and focused. One task, one clear result.
4. After finishing a task, update `Memory.md` (what was done, files touched, decisions, next step).
5. At the end of every task, reply with a short summary: files created, changed or deleted, and anything that needs the owner's decision.
6. If something is unclear or missing (especially layout or design direction), ask. Do not guess.

## 2. Design boundaries (important)

- `Design.md` is the source of truth for colors, fonts, tokens and component styling. Follow it exactly. Never edit it.
- These documents do NOT define page layouts, section arrangement or screen-by-screen visuals. The owner gives those instructions at runtime. If a layout instruction is not given, ask for it instead of inventing one.
- Do not restyle things the owner did not ask to change.
- Do not add decorative elements, effects or extra sections on your own.

## 3. Tech rules

### Package manager
- Use `bun` only (`bun add`, `bun add -d`, `bun dev`, `bun run build`). Never use npm, yarn or pnpm.

### Allowed libraries
Next.js, React, TypeScript, Tailwind CSS, GSAP with `@gsap/react`, Three.js with `@react-three/fiber` and `@react-three/drei`, Lenis, Zustand, `next/font`, `next/image`.

### Not allowed without asking first
- Any other animation library (Anime.js, Framer Motion, Motion One, etc.). GSAP is the single animation library.
- UI kits or component libraries (shadcn, MUI, Chakra, Radix themes, etc.).
- CSS-in-JS libraries.
- Any new dependency. If you believe one is needed, explain why and wait for approval.
- Backend databases or auth for the MVP.

## 4. Code rules

- TypeScript strict mode. No `any`, no `@ts-ignore`.
- Functional components only. Server components by default. Add `"use client"` only where needed (state, effects, GSAP, Three.js, browser APIs).
- Use the `@/` import alias.
- Keep files small and single purpose. Split a file when it grows past about 250 lines.
- Name things clearly: components in PascalCase, functions in camelCase, constants in UPPER_SNAKE_CASE, files in kebab-case or PascalCase for components.
- Game rules live only in `src/game/engine`. Components must not contain game calculations.
- The engine is pure and deterministic. No UI imports, no `Math.random()` (use the seeded RNG), no browser APIs.
- All game numbers come from the JSON catalogs in `src/game/data`. No hard-coded stats in components.
- Write comments only where the reason is not obvious. No commented-out code left behind.
- No `console.log` left in committed code.

## 5. UI copy rules

- Plain, friendly English. Short labels, short sentences.
- Never use code-style or developer-style text in the UI: no `//` prefixes, no underscores in labels, no brackets, no fake terminal text, no random letters.
- Headlines are short. No long paragraphs on screens.
- Technical terms get a short tooltip with one plain-language line.
- Status must always be icon plus text, never color alone.
- Disclaimer "Not affiliated with or endorsed by NASA." must appear in the footer.

## 6. Animation and 3D rules

- Use `useGSAP` from `@gsap/react` with a scope ref so cleanup is automatic.
- Register GSAP plugins once, client side only.
- Respect `prefers-reduced-motion` (skip or shorten animations, stop auto-rotation).
- Three.js: one scene only (hero), loaded with `next/dynamic` and `ssr: false`. Cap pixel ratio at 1.5, textures 2K or smaller in webp, and always provide a static image fallback for mobile or no WebGL.
- Animations must never block interaction or hide content permanently if JavaScript is slow.

## 7. Error handling

- The engine returns typed results. Normal gameplay conditions (over budget, over mass, incompatible orbit) are results, not exceptions.
- UI shows a clear, friendly message for every blocked action, including the exact reason and amount.
- Wrap browser storage reads and writes in try/catch and handle empty or corrupted data.
- The AI mentor must always have a fallback text. A failed or slow API call must never break a screen.
- Add error and not-found boundaries for the app routes.

## 8. Security

- Secrets only in environment variables, server side only. Never expose keys to the client or commit them.
- Keep `.env.example` updated with empty values. Never commit `.env.local`.
- Validate and size-limit input to `/api/mentor`.

## 9. Content and legal

- Do not use NASA logos, badges or branding.
- Use only public-domain or properly licensed images and keep a credit list (in `Memory.md`) for NASA imagery.
- Do not copy copyrighted games, art or text.
- Label all part values as simplified approximations.

## 10. Accessibility and performance

- Keyboard accessible controls with visible focus.
- Semantic HTML, `alt` text on meaningful images, labels on controls.
- Use `next/image` and `next/font`.
- Keep the bundle lean. No unused code or assets.

## 11. Git and safety

- Commit at the end of each completed task with a clear message.
- Never run destructive commands (deleting folders, force pushes, resetting history) without asking.
- Do not delete or rename files that were not part of the task.
- Do not refactor unrelated code.
- Run `bun run lint` and `bun run build` before saying a task is done. Fix errors and warnings you introduced.

## 12. Definition of done (per task)

- Works as described, with loading, empty and error states handled.
- Responsive on desktop and mobile.
- Lint and build pass.
- No leftover boilerplate, debug code or unused files.
- `Memory.md` updated.
