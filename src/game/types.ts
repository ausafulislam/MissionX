export interface SourceInfo {
  title: string; url: string; parameter: string; accessed: string;
  confidence: "concept-only" | "verified"; simplification: string;
}
export type MissionId = "moon" | "sun" | "mars";
export type Category =
  | "structure"
  | "power"
  | "battery"
  | "communications"
  | "computer"
  | "attitude"
  | "camera"
  | "science";
export interface Part {
  source: SourceInfo;
  id: string;
  name: string;
  category: Category;
  storage: number;
  limitations: string;
  mass: number;
  cost: number;
  draw: number;
  generation: number;
  battery: number;
  data: number;
  downlink: number;
  science: number;
  lifetime: number;
  missions: MissionId[];
  description: string;
}
export interface Mission {
  source: SourceInfo;
  id: MissionId;
  name: string;
  subtitle: string;
  description: string;
  difficulty: string;
  fleet: number;
  massLimit: number;
  budget: number;
  scienceTarget: number;
  lifetimeTarget: number;
  objectives: string[];
  reference: { name: string; url: string };
}
export interface Rocket {
  source: SourceInfo;
  id: string;
  name: string;
  capacity: number;
  cost: number;
  reliability: number;
  orbits: string[];
  description: string;
}
export interface Orbit {
  source: SourceInfo;
  id: string;
  name: string;
  missions: MissionId[];
  solarFactor: number;
  eclipse: number;
  period: number;
  contact: number;
  description: string;
}
export interface Design {
  missionId: MissionId;
  partIds: string[];
  rocketId: string;
  orbitId: string;
}
export interface Resources {
  nominalGeneration: number;
  batteryUsable: number;
  storage: number;
  storageNeeded: number;
  massMarginPercent: number;
  powerMarginPercent: number;
  budgetRemaining: number;
  risk: "low" | "moderate" | "high";

  mass: number;
  cost: number;
  generation: number;
  consumption: number;
  powerMargin: number;
  battery: number;
  batteryNeeded: number;
  data: number;
  downlink: number;
  science: number;
  lifetime: number;
  fleet: number;
}
export type CheckStatus = "pass" | "close" | "fail";
export interface Check {
  id: string;
  label: string;
  status: CheckStatus;
  blocking?: boolean;
  actual: number;
  target: number;
  unit: string;
  reason: string;
}
export interface Verification {
  checks: Check[];
  ready: boolean;
  resources: Resources;
}
export type EventKind =
  | "countdown"
  | "liftoff"
  | "separation"
  | "deployment"
  | "operations"
  | "storm"
  | "outage"
  | "fault"
  | "failure"
  | "complete";
export interface MissionEvent {
  at: number;
  kind: EventKind;
  label: string;
  description: string;
  severity: "info" | "warning" | "failure";
  powerFactor: number;
  dataFactor: number;
  lifetimeFactor: number;
}
export type Outcome = "success" | "partial" | "failed";
export interface SegmentReport {
  name: "LAUNCH" | "SPACE" | "GROUND" | "USER";
  status: CheckStatus;
  explanation: string;
}
export interface Simulation {
  modelVersion?: number;
  seed: number;
  outcome: Outcome;
  score: number;
  scienceScore: number;
  engineeringScore: number;
  efficiencyScore: number;
  lifetime: number;
  science: number;
  returnedData: number;
  power: number;
  duration: number;
  events: MissionEvent[];
  requirements: Check[];
  segments: SegmentReport[];
  lessons: string[];
}
export interface SavedRun {
  id: string;
  createdAt: string;
  design: Design;
  result: Simulation;
}
