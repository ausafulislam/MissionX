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

## Research, Sources and Engineering Accuracy Policy

This mandatory policy applies to every future feature, change, calculation, simulation, component, mission, parameter, scientific explanation and engineering rule.

1. Research before implementation.
2. Prefer official primary sources from NASA, JPL, ESA, CSA or other relevant space agencies.
3. Use academic papers and reputable technical publications when primary sources are insufficient.
4. Record the actual provider and original URL.
5. Record the access date.
6. Identify the exact section, page or technical concept used.
7. Explain why the source is relevant.
8. Identify exactly where the information is used in MissionX.
9. Document adaptations, assumptions and simplifications.
10. Never invent scientific facts, engineering parameters, formulas, source links or provider names.
11. Never describe a simplified educational model as professional engineering simulation.
12. Never claim NASA endorsement, certification, partnership or affiliation.
13. Respect third-party terms, licences and data-use conditions.
14. If a source is unavailable, do not pretend it was verified.
15. If reliable evidence is absent, explicitly label an estimate, explain its reason and record unresolved original rationale honestly. An estimate label is not permission to pick arbitrary numbers.
16. Update docs/RESOURCES.md and docs/ENGINEERING_REFERENCES.md when sources or engineering rules change.
17. Update relevant catalog source metadata; until the approved metadata migration, record traceability in the registers and do not claim runtime IDs exist.
18. Remove or update obsolete references when implementation changes; preserve clearly labeled historical evidence.
19. No live API/external-service dependency without approval.
20. Every new feature must trace from implementation to research evidence or an explicit educational assumption.

### Mandatory Future Change Workflow

1. **Research:** identify sources needed for the proposed change.
2. **Source verification:** open original resources; record what was actually reviewed and what remains inaccessible.
3. **Implementation plan:** identify files, calculations, components and systems that will change.
4. **Approval:** wait when project rules require it. New layouts and protected-document edits still require their own approval; docs/Design.md remains read-only.
5. **Implementation:** make the smallest necessary changes; preserve working features and static data architecture.
6. **Documentation:** update source register, engineering references, catalog provenance and relevant project documentation.
7. **Testing:** validate behavior and that the cited source supports the actual claim. Run bun run lint, bun test and bun run build; check complete flow, success/partial/failure, compatibility, source-ID resolution, formulas, links and unsupported claims as applicable. Report unavailable checks honestly; never confuse retrieval with technical validation.
8. **Change record:** update CHANGELOG.md, docs/Memory.md and docs/Phases.md; increment package.json patch; update README only for user-facing changes.

A feature is not complete until implementation and research documentation are both complete. Use Bun only; no new dependencies without approval. Source links do not imply endorsement or permission to copy assets/code/text.

### Independence and third-party data

MissionX is an independent educational project created by Team NASA WARRIORS for the NASA International Space Apps Challenge 2026. It is not affiliated with, endorsed by, or sponsored by NASA or any other space agency. NASA is not responsible for information contained on non-U.S. Government websites.

Preserve the existing user-facing disclaimer. Distinguish NASA, CSA, academic, commercial and community providers. Review item-specific rights before reuse; do not copy without permission or compatible terms. Full disclaimer in the user-facing credits area is pending the separately approved UI task, not implemented by this policy update.


## Documentation and repository standards — owner-approved 2026-11-14

This additive policy preserves all preceding rules. The owner approved the documentation plan and Architecture reconciliation; `docs/Design.md` remains read-only and PRD changes still require approval.

- Maintain README and docs index as accurate entry points; distinguish current behavior, historical plans and proposed work. Prefer existing filenames; avoid case-conflicting duplicates.
- Documentation must trace features/formulas/commands/env/API descriptions to actual code and tests. No invented metrics, endpoints, author identities, badges, releases or successful checks.
- Capture screenshots from the real application; record viewport, date, compatibility/reduced-motion settings and limitations. Optimize without fabricating UI; include meaningful alt text.
- Maintain original resource URLs, access dates, reviewed sections, implementation mapping, use type, confidence, adaptations and licensing status. Retrieval alone is not scientific or reuse validation.
- Preserve exact independence language supplied by the owner in current documentation. Agency/team-page links imply no endorsement or asset permission.
- No root license, private reporting address, funding link or third-party rights grant may be invented. Record unresolved decisions and obtain owner approval.
- Documentation-only changes do **not** require a package version bump or release; this overrides only the unconditional patch-bump wording above for documentation-only tasks.
- Validate relative links, anchors, screenshots, source IDs, diagrams and setup claims. Run Bun lint, typecheck, tests and build; report skipped external/browser checks honestly. Add automation only when it runs real supported commands; badges must not imply unexecuted CI.
- Update CHANGELOG.md, docs/Memory.md and docs/Phases.md with actual work/evidence. Preserve application functionality, architecture boundaries, local fallback and accessibility accommodations.
## Post-audit accuracy standards — 0.1.11 (additive owner instruction)

Preserve all preceding rules; never edit `docs/Design.md`.
1. Never claim NASA affiliation, endorsement, certification or validation without official evidence.
2. Every external scientific source needs a verified purpose and traceable code relationship.
3. Source URLs alone are not implementation evidence; similarity is not adoption evidence.
4. Document provenance for each source-dependent numerical parameter.
5. Label MissionX-authored values educational estimates; record unknown balancing rationale honestly.
6. Document formula variables, units, assumptions and limitations.
7. Keep conceptual references separate from implemented sources.
8. Keep software dependencies/APIs separate from scientific references; identity/challenge pages are not engineering datasets.
9. Mark unmodeled spacecraft properties NOT EVALUATED.
10. PASS must never imply an unperformed physical measurement; incomplete groups cannot be plain PASS.
11. PDF reports must share diagnostic data and actual mission state; distinguish captured, reconstructed and unavailable inputs and current metadata.
12. Screenshots must depict actual application states and identify older-release captures.
13. Respect third-party licensing and asset ownership; unknown permissions require confirmation.
14. Documentation must match actual implementation, including historical limitations.
15. `docs/Design.md` is permanently read-only. PRD/Architecture edits require exact proposal and approval.
