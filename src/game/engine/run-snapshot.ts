import { getMission, getOrbit, getRocket, PARTS } from '../data/catalog';
import assumptions from '../data/assumptions.json';
import { resources } from './resources';
import { verify } from './validation';
import { simulate } from './simulation';
import type { Design, SavedRun, Simulation } from '../types';

export const CATALOG_VERSION = 'missionx-catalog-0.1.11';
export const ASSUMPTIONS_VERSION = 'missionx-assumptions-3-0.1.11';
export function currentRunInputs(design: Design) {
  return { mission: getMission(design.missionId), orbit: getOrbit(design.orbitId),
    rocket: getRocket(design.rocketId), parts: PARTS.filter(p => design.partIds.includes(p.id)),
    assumptions, resources: resources(design), verification: verify(design) };
}
export interface RunSnapshot {
  schemaVersion: 1;
  catalogVersion: string;
  assumptionsVersion: string;
  capturedAt: string;
  /** Serialized at launch: immutable by value, not references into mutable catalogs. */
  payload: string;
  checksum: string;
}
function checksum(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16);
}
export function captureRunSnapshot(design: Design, result: Simulation, capturedAt: string): RunSnapshot {
  const payload = JSON.stringify({ ...currentRunInputs(design), design, result });
  return { schemaVersion: 1, catalogVersion: CATALOG_VERSION, assumptionsVersion: ASSUMPTIONS_VERSION,
    capturedAt, payload, checksum: checksum(payload) };
}
type Captured = ReturnType<typeof currentRunInputs> & { design: Design; result: Simulation };
// Shape validation plus finite/bounded JSON and corruption checksum. Local saves are not signed records.
function matches(value: unknown, template: unknown): boolean {
  if (typeof template === 'number') return typeof value === 'number' && Number.isFinite(value);
  if (typeof template === 'string') return typeof value === 'string' && value.length <= 20000;
  if (typeof template === 'boolean') return typeof value === 'boolean';
  if (Array.isArray(template)) return Array.isArray(value) && value.length <= 500 &&
    value.every(v => !template.length || template.some(t => matches(v, t)));
  if (!template || typeof template !== 'object') return value === template;
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Object.entries(template).every(([key, t]) => key === 'blocking' || matches((value as Record<string, unknown>)[key], t));
}
const cache = new WeakMap<object, {payload: string; checksum: string; design: string; data: Captured}>();
export function readRunSnapshot(value: unknown, design: Design): Captured | null {
  if (!value || typeof value !== 'object') return null;
  const s = value as RunSnapshot;
  if (s.schemaVersion !== 1 || typeof s.payload !== 'string' || s.payload.length > 150000 ||
      typeof s.catalogVersion !== 'string' || s.catalogVersion.length > 100 ||
      typeof s.assumptionsVersion !== 'string' || s.assumptionsVersion.length > 100 ||
      !Number.isFinite(Date.parse(s.capturedAt)) || s.checksum !== checksum(s.payload)) return null;
  const key = JSON.stringify(design), hit = cache.get(s);
  if (hit?.payload === s.payload && hit.checksum === s.checksum && hit.design === key) return hit.data;
  try {
    const data = JSON.parse(s.payload);
    const template = { ...currentRunInputs(design), design, result: simulate(design, 5) };
    if (!matches(data, template) || JSON.stringify(data.design) !== JSON.stringify(design) ||
      data.mission.id !== design.missionId || data.rocket.id !== design.rocketId || data.orbit.id !== design.orbitId ||
      data.parts.length !== design.partIds.length || !data.parts.every((p: {id: string}) => design.partIds.includes(p.id)) ||
      !['success','partial','failed'].includes(data.result.outcome) || data.result.modelVersion !== 3 ||
      data.result.events.some((e: {kind: string; severity: string}) => !['countdown','liftoff','separation','deployment','operations','storm','outage','fault','failure','complete'].includes(e.kind) || !['info','warning','failure'].includes(e.severity)) ||
      [...data.verification.checks, ...data.result.requirements, ...data.result.segments].some((c: {status: string}) => !['pass','close','fail'].includes(c.status))) return null;
    cache.set(s, {payload: s.payload, checksum: s.checksum, design: key, data});
    return data as Captured;
  } catch { return null; }
}
export function runInputs(run: SavedRun) {
  return readRunSnapshot(run.snapshot, run.design) ?? currentRunInputs(run.design);
}
export function runInputLabel(run: SavedRun) {
  return readRunSnapshot(run.snapshot, run.design)
    ? `Captured at simulation: ${run.snapshot!.capturedAt}; catalog ${run.snapshot!.catalogVersion}; assumptions ${run.snapshot!.assumptionsVersion}. Results and calculated balances captured, not measured.`
    : 'Historical inputs unavailable: no valid snapshot. Balances and diagnostics reconstructed using the current catalog; legacy results are recomputed by the recorded engine model. Original historical values cannot be recovered.';
}
