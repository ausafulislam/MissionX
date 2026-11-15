# Demo guide

## Two different demonstrations

- **Live team/judge walkthrough:** suggested3–5 minutes; not a recorded/completed artifact and **not** compliant as the official short video.
- **Official submission demo:** at most7 slides OR video at most30 seconds, public without login. [Verified requirements](OFFICIAL_REQUIREMENTS.md), [seven-slide content draft](DEMO_STORYBOARD.md). Owner must export/record/review the final artifact; no demo URL is invented.

## Reliable local walkthrough

1. Use Bun1.3.14: `bun install --frozen-lockfile`, `bun run build`, `bun run start --hostname 0.0.0.0`. Open localhost:3000 locally (public preview URL remotely). Leave mentor key unset for a deterministic/cost-safe demo. Use `/play` if HQ/WebGL fails.
2. Open HQ, choose a non-identifying display name and complete or skip tutorial. Select **MOON → ENTER ENGINEERING LAB**.
3. Choose **LOAD AUTHORED BASELINE**. Explain fleet mass166kg/$46M and per-craft65W load/~219.52W EOL generation. These are educational values, not NASA hardware data. The live balance responds to changes; restore baseline before the scripted run.
4. Open **VERIFY**, retain Swift Light/Lunar polar orbit and use seed**5**. Explain CONFIGURATION READY, not certification. A warning would remain visible, not become PASS.
5. INITIATE LAUNCH → BEGIN COUNTDOWN. Show3/2/1/LIFTOFF; do not restart or accelerate the initial countdown. After ascent use skip to arrival if time is short.
6. Review six configuration groups. Explicitly show missing propulsion/thermal/navigation/calibration/RF measurements: baseline arrival has4 incomplete groups/6 unevaluated finding instances. Acknowledge reviews, then continue/skip to evaluation.
7. Open science report. Seed5 Moon should show SUCCESS/100 weighted score. Explain achieved/unmet requirements, received data and segment reasons. Download PDF; show captured-input identifiers and same diagnostic counts.
8. Optional brief contrast: seed**43** produces launch loss without arrival credit; seed**0** produces PARTIAL/100 with44.9/45 science. The100 is rounded weighted performance, not a perfect mission. Sun seed 5 SUCCESS96 and Mars seed 5 SUCCESS97 also passed local checks.

## Prepare before presenting

- Owner verifies exact deployed revision/public links, permissions and SI markings; the existing public URL is not confirmed current 0.1.12.
- Test internet/assets, downloads, keyboard, sound preferences and projector. Audio/physical-device behavior is not guaranteed by headless tests.
- Use real controls and your saved test run; do not fabricate sensor readings or imply a schematic journey solves orbital mechanics.
- Keep a locally built app and report screenshots as backup; a network-independent AI fallback is not an offline PWA guarantee.
- Do not show minors, secrets, private browser saves or personal profiles. Do not clear a judge's browser storage.
