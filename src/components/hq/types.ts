export type Station =
  | "menu"
  | "command"
  | "planning"
  | "engineering"
  | "verification"
  | "launch"
  | "results"
  | "archive";
export const STATIONS: {
  id: Station;
  name: string;
  label: string;
  icon: string;
  position: [number, number, number];
}[] = [
  {
    id: "planning",
    name: "MISSION PLANNING",
    label: "Navigation / 01",
    icon: "◎",
    position: [-7, 0, -4],
  },
  {
    id: "engineering",
    name: "ENGINEERING LAB",
    label: "Assembly / 02",
    icon: "◇",
    position: [7, 0, -4],
  },
  {
    id: "verification",
    name: "LAUNCH CONTROL",
    label: "Flight systems / 03",
    icon: "↗",
    position: [7, 0, 4],
  },
  {
    id: "results",
    name: "SCIENCE LAB",
    label: "Discovery / 04",
    icon: "✳",
    position: [-7, 0, 4],
  },
  {
    id: "archive",
    name: "MISSION ARCHIVE",
    label: "Flight records / 05",
    icon: "≋",
    position: [0, 0, 8],
  },
];
