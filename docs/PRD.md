# PRD: MissionX

Product Requirements Document. Read this first, then Architecture.md, Rules.md, Phases.md and Design.md.

---

## 1. Overview

- **Product name:** MissionX
- **Tagline:** Design. Simulate. Learn.
- **One-line description:** An interactive browser game where students design, launch and run a complete space mission, balancing budget, mass, power and data, then learn why the mission succeeded or failed.
- **Built by:** Team NASA WARRIORS (3 members, Karachi, Pakistan)
- **Built for:** NASA International Space Apps Challenge 2026, challenge "Space Mission Design Game"
- **Disclaimer (must appear on the site):** Not affiliated with or endorsed by NASA.

## 2. Event context

| Item | Detail |
|---|---|
| Event | NASA International Space Apps Challenge 2026, global 48-hour hackathon |
| Theme | The Next Frontier |
| Dates | 14 to 15 November 2026 |
| Submission window | Opens 14 Nov 9:00 AM, closes 15 Nov 11:59 PM (local time) |
| Team | NASA WARRIORS, Universal Event (virtual) |
| Challenge | Space Mission Design Game (Intermediate and Beginner/Youth, subject: Games) |
| Judging | Event judges pick Global Nominees, then NASA and partner agency experts pick Finalists and Winners. Exact 2026 criteria are unconfirmed. Past years used impact, creativity, validity, relevance and presentation. |
| Submission usually asks for | Project description, demo or video, repository link, how space agency data was used |

## 3. Problem

Students rarely get to experiment with a whole space mission from concept to operation. Existing tools cover single topics (orbits, spacecraft design, rocket launches) but not how these parts interact. Every decision has a trade-off: a better instrument adds science value but also mass, power, data and cost. Students end up knowing the pieces without understanding the system.

## 4. Solution

MissionX is a turn-based mission design simulator. The player chooses a mission goal, builds a spacecraft within real-style constraints, selects a rocket and orbit, verifies the design against measurable requirements, watches the mission run, and gets a report that explains why it worked or failed. There is no single perfect answer. Different designs can reach the same goal.

## 5. Target users

1. **Students aged 12 to 18** with little or no space engineering knowledge (primary).
2. **Educators and space enthusiasts** who want a simple teaching tool.
3. **Hackathon judges** who need to understand the product and its value within minutes.

## 6. Goals and success criteria

- A complete playable loop from goal selection to result, in the browser, with no sign-up.
- Every major decision has a visible consequence on at least one resource.
- The result screen explains the reason for success or failure in plain language.
- Beginner friendly: jargon is explained through short tooltips, not walls of text.
- Works on desktop and mobile.
- Deployed live with a stable public URL before the submission deadline.
- Honest labelling: all part values are simplified and clearly marked as approximations.

## 7. Game design requirements

### 7.1 Game flow (5 steps)

1. **Goal:** choose a mission and read its 4 measurable requirements.
2. **Build:** choose spacecraft parts and instruments while resource meters update live.
3. **Verify:** check the design against requirements, then choose rocket and orbit, with a compatibility check.
4. **Launch:** run the simulation with a live camera view, timeline, readouts and random events.
5. **Result:** show SUCCESS, PARTIAL or FAILED, the score, and a report by mission segment.

### 7.2 Missions (3 for MVP)

| Mission | Short idea |
|---|---|
| Moon Mapping | Map the lunar surface from orbit |
| Sun Watch | Study the Sun with several small satellites (inspired by the real PUNCH mission) |
| Mars Orbiter | Image Mars from orbit |

Each mission has a difficulty level, a budget, and 4 measurable requirements (for example mass limit, budget limit, minimum images, lifetime).

### 7.3 Resources the player manages

| Resource | Meaning |
|---|---|
| Budget | Money available for parts and launch |
| Mass | Total spacecraft mass, limited by the rocket |
| Power | Generation vs consumption, including eclipse periods |
| Data | Data produced by instruments vs data that can be sent to Earth |
| Communications | Ability to send data to ground stations |
| Time | Mission lifetime |

### 7.4 Spacecraft parts (categories)

Structure, Power (solar panels), Battery, Communications (antenna), Computer, Instruments (camera, spectrometer, radar and similar). Each part has mass, power use or generation, cost, data output (instruments) and science value (instruments).

### 7.5 Verification and requirements

Requirements are measurable and checked before launch with Pass, Close or Fail. Launch is blocked until all requirements pass. This follows the NASA approach where requirements are defined first and verification is planned upfront.

### 7.6 Launch and orbit

Several rocket options (capacity, cost, reliability) and orbit options (for example low Earth orbit, polar, lunar orbit, Mars orbit). The game must check that spacecraft mass and orbit are compatible with the chosen rocket and explain any mismatch in plain words.

### 7.7 Simulation and events

The simulation is driven by a deterministic seeded engine. It produces a timeline of events (liftoff, stage separation, satellite release, deployment, operations) and may include random events (for example solar storm, communications outage, equipment fault) and failure outcomes (rocket breakup, satellite lost). The UI plays this timeline back as a live camera style sequence.

### 7.8 Scoring and result report

Score combines science return, budget efficiency and risk handling. The report is organised into the 4 real mission segments from the NASA resource:

| Segment | Question answered |
|---|---|
| Launch | Was the rocket right for the job? |
| Space | Did the spacecraft work? |
| Ground | Did the data reach Earth? |
| User | Was the science data useful? |

Each segment shows a status and one plain-language sentence explaining why. The result may also show a similar real NASA mission.

## 8. Feature list

### Must have (MVP)

- Mission selection with 3 missions
- Measurable requirements per mission
- Parts selection with live Budget, Mass, Power and Data meters
- Verify step with Pass, Close, Fail checks
- Rocket and orbit selection with compatibility check
- Simulation with timeline and events
- Result screen with score and 4-segment explanation
- Try again and change design
- Plain-language tooltips for technical terms
- Landing page that explains the product and links into the game
- Responsive layout and accessible status labels

### Should have

- Live rocket camera animation (liftoff, separation, release, failure)
- AI mentor that explains outcomes in simple words, with fallback text
- Tutorial or coach marks on the Build screen
- Save progress locally
- 4 to 5 random events
- Difficulty levels

### Stretch (only if time remains)

- Compare two designs side by side
- Team mode for up to 4 players with roles (planner, engineer, science, communications)
- Urdu and English toggle
- Leaderboard
- Sandbox mode

## 9. Edge cases to handle

- Over mass or over budget: show a clear warning and the exact amount, do not silently block.
- Power shortage during eclipse, data downlink bottleneck.
- Instrument not compatible with the chosen orbit.
- Mission that is impossible or trivially easy: balance must be tested with many simulated runs.
- AI mentor unavailable or slow: use prewritten fallback text.
- Page refresh: restore progress from local storage.
- Small screens, touch controls, color-blind safe status (always icon plus text, never color alone).
- Reduced motion preference.

## 10. Non-goals

- Not a physically exact simulator. Values are simplified and labelled as such.
- No user accounts, payments or backend database for the MVP.
- No use of NASA logos or badges.
- No copyrighted assets.

## 11. Official resources to reference

- Design and Develop Science Missions (NASA PDF): mission stages (Need and Goals, Concept, Requirements, Design, Build and Verify, Implement) and the four segments (Launch, Space, Ground, User).
- General Mission Analysis Tool (GMAT), NASA Mission Viz, Mission Design Lab, Concept Maturity Levels, CubeSat 101, CSA digital games.
- NASA Webb "Build it yourself" telescope game: designs only a telescope. MissionX covers a full mission (budget, power, data, orbit, launch).
- 2023 Space Apps challenge "Visualize a Space Mission Using VR" as a similar past challenge.
- The NASA PDF has no numeric parts catalog. Mass, power and cost values must be simplified approximations (CubeSat 101 and similar sources) and labelled as such.

## 12. Submission checklist

- Live deployed URL
- Public repository link
- Short demo video
- Project description explaining the problem, solution and how NASA resources were used
- Team and challenge details on the Space Apps site
- Submit before the deadline with a safety buffer

## 13. Design

Visual language, colors, typography and components are defined in `Design.md`. Page layouts, section arrangement and screen-by-screen visual direction are NOT defined in these documents. The product owner will provide them at runtime. If a layout instruction is missing, ask before inventing one.

## 14. Open questions

- Final judging criteria for 2026 are unconfirmed.
- Exact prize details are unconfirmed (no fixed cash prize confirmed).
- Whether team mode will be attempted depends on time left after the MVP.
