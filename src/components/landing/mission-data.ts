export const missions = [
  {
    id: "moon",
    number: "01",
    name: "Moon Mapping",
    category: "LUNAR EXPLORATION",
    difficulty: "Beginner",
    description:
      "Every crater has a story. Design an orbital mapping spacecraft and see the Moon in a whole new light.",
    objective:
      "Map lunar terrain · Capture surface imagery · Maintain a stable lunar orbit",
    distance: "384,400 KM",
    destination: "THE MOON",
  },
  {
    id: "sun",
    number: "02",
    name: "Sun Watch",
    category: "HELIOPHYSICS",
    difficulty: "Intermediate",
    description:
      "One star. Four perspectives. Build a coordinated constellation of small satellites to study our Sun.",
    objective:
      "Coordinate four satellites · Observe solar activity · Return science data",
    distance: "1 AU",
    destination: "THE SUN",
  },
  {
    id: "mars",
    number: "03",
    name: "Mars Orbiter",
    category: "PLANETARY SCIENCE",
    difficulty: "Advanced",
    description:
      "A world of unanswered questions. Engineer a spacecraft for the long journey to the red planet.",
    objective:
      "Reach Mars orbit · Image the surface · Sustain deep-space communications",
    distance: "BEYOND EARTH",
    destination: "MARS",
  },
] as const;
export type MissionId = (typeof missions)[number]["id"];
