import type { Design } from '../types';

// Frozen schema-1 wire contract. Never derive this from a live catalog, assumptions
// object or simulation. New optional fields must stay optional in this reader.
type Rule = (value: unknown) => boolean;
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text: Rule = v => typeof v === 'string' && v.length <= 20000;
const number: Rule = v => typeof v === 'number' && Number.isFinite(v);
const boolean: Rule = v => typeof v === 'boolean';
const choice = (...values: unknown[]): Rule => v => values.includes(v);
const list = (rule: Rule, max = 500): Rule => v => Array.isArray(v) && v.length <= max && v.every(rule);
const optional = (rule: Rule): Rule => v => v === undefined || rule(v);
const fields = (rules: Record<string, Rule>): Rule => v => record(v) && Object.entries(rules).every(([key, rule]) => rule(v[key]));
const numbers = (keys: string): Record<string, Rule> => Object.fromEntries(keys.split(' ').map(k => [k, number]));
const strings = (keys: string): Record<string, Rule> => Object.fromEntries(keys.split(' ').map(k => [k, text]));
const missionId = choice('moon', 'sun', 'mars');
const source = fields({...strings('title url parameter accessed simplification'), confidence: choice('concept-only','verified','authored')});
const check = fields({...strings('id label unit reason'), ...numbers('actual target'), status: choice('pass','close','fail'), blocking: optional(boolean)});
const resources = fields({...numbers('nominalGeneration batteryUsable storage storageNeeded massMarginPercent powerMarginPercent budgetRemaining mass cost generation consumption powerMargin battery batteryNeeded data downlink science lifetime fleet'), risk: choice('low','moderate','high')});
const designRule = fields({missionId, partIds:list(text), rocketId:text, orbitId:text});
export const snapshotDesign = (v: unknown): v is Design => designRule(v) && new Set((v as Design).partIds).size === (v as Design).partIds.length;
const mission = fields({...strings('name subtitle description difficulty'), id:missionId, ...numbers('fleet massLimit budget scienceTarget lifetimeTarget'), objectives:list(text), reference:fields({name:text,url:text}), source});
const part = fields({...strings('id name limitations description'), ...numbers('storage mass cost draw generation battery data downlink science lifetime'), category:choice('structure','power','battery','communications','computer','attitude','camera','science'), missions:list(missionId), payloadLimit:optional(number), requiresAny:optional(list(text)), source});
const rocket = fields({...strings('id name description'), ...numbers('capacity cost reliability'), orbits:list(text), source});
const orbit = fields({...strings('id name description'), ...numbers('solarFactor eclipse period contact'), missions:list(missionId), source});
const assumptions = fields({...numbers('solarAnnualRetention batteryUsableFraction batteryDischargeEfficiency batteryChargeEfficiency groundReceptionEfficiency representativeDays stepsPerOrbit advisoryMarginPercent'), modelVersion:choice(3), note:optional(text)});
const sample = fields({...numbers('hour batteryWh storedGB generatedGB transmittedGB receivedGB'), contact:boolean, sunlight:boolean});
const operations = fields({...numbers('solarGeneratedWh loadServedWh chargeLossWh spilledWh initialBatteryWh finalBatteryWh days generatedGB transmittedGB receivedGB remainingGB lostGB groundLostGB batteryMinWh brownoutHours availability averageDeliveredPower contacts campaignGeneratedGB campaignReceivedGB scienceFraction'), samples:list(sample,10000)});
const event = fields({...numbers('at powerFactor dataFactor lifetimeFactor'), ...strings('label description'), kind:choice('countdown','liftoff','separation','deployment','operations','storm','outage','fault','failure','complete'), severity:choice('info','warning','failure')});
const result = fields({...numbers('score scienceScore engineeringScore efficiencyScore lifetime science returnedData power duration'), seed:v=>number(v)&&Number.isInteger(v)&&Number(v)>=0&&Number(v)<=4294967295, modelVersion:choice(3), outcome:choice('success','partial','failed'), operations, events:list(event), requirements:list(check), segments:list(fields({name:choice('LAUNCH','SPACE','GROUND','USER'),status:choice('pass','close','fail'),explanation:text})), lessons:list(text)});
const payload = fields({design:snapshotDesign,mission,parts:list(part),rocket,orbit,assumptions,resources,verification:fields({checks:list(check),ready:boolean,resources}),result});

/** Defaults are explanatory/structural only, never scientific numeric guesses. */
export function readSchema1(value: unknown, design: Design): unknown | null {
  if (!payload(value) || !record(value)) return null;
  const data = value as Record<string, Record<string, unknown>>;
  const parts = data.parts as unknown as {id:string}[];
  if (JSON.stringify(data.design) !== JSON.stringify(design) || data.mission.id !== design.missionId ||
      data.rocket.id !== design.rocketId || data.orbit.id !== design.orbitId ||
      parts.length !== design.partIds.length || new Set(parts.map(p=>p.id)).size !== parts.length ||
      !parts.every(p=>design.partIds.includes(p.id))) return null;
  // note is optional explanatory metadata: it never changes calculation/results.
  data.assumptions.note ??= 'Historical explanatory note not recorded; captured numerical assumptions are preserved.';
  // Optional blocking retains its original meaning: omission means required.
  const checks = (data.verification.checks as {blocking?:boolean}[]);
  checks.forEach(c => { c.blocking ??= true; });
  // Absent payloadLimit means no extra modeled limit; absent requiresAny means
  // no recorded dependency. Preserve absence rather than invent a numeric limit.
  return data;
}
