import { getMission, getOrbit, getRocket, PARTS } from '../data/catalog';
import assumptions from '../data/assumptions.json';
import { resources } from './resources';
import { verify } from './validation';
import { readSchema1 } from './snapshot-schema-v1';
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
export type SnapshotRead =
  | { status: 'missing' }
  | { status: 'unsupported'; schemaVersion: unknown }
  | { status: 'invalid' }
  | { status: 'valid'; data: Captured };
/** Version dispatch never reconstructs a supplied snapshot with today's inputs. */
export function inspectRunSnapshot(value: unknown, design: Design): SnapshotRead {
  if (value === undefined) return {status:'missing'};
  if (!value || typeof value !== 'object') return {status:'invalid'};
  const s = value as RunSnapshot;
  if (s.schemaVersion !== 1) return {status:'unsupported', schemaVersion:s.schemaVersion};
  if (typeof s.payload !== 'string' || s.payload.length > 150000 ||
      typeof s.catalogVersion !== 'string' || !s.catalogVersion.length || s.catalogVersion.length > 100 ||
      typeof s.assumptionsVersion !== 'string' || !s.assumptionsVersion.length || s.assumptionsVersion.length > 100 ||
      typeof s.capturedAt !== 'string' || !Number.isFinite(Date.parse(s.capturedAt)) || s.checksum !== checksum(s.payload)) return {status:'invalid'};
  try {
    const data = readSchema1(JSON.parse(s.payload), design);
    return data ? {status:'valid', data:data as Captured} : {status:'invalid'};
  } catch { return {status:'invalid'}; }
}
export function readRunSnapshot(value: unknown, design: Design): Captured | null {
  const read = inspectRunSnapshot(value, design);
  return read.status === 'valid' ? read.data : null;
}
export function runInputs(run: SavedRun) {
  const read = inspectRunSnapshot(run.snapshot, run.design);
  if (read.status === 'missing') return currentRunInputs(run.design);
  if (read.status === 'valid') return read.data;
  throw new Error(`Historical snapshot ${read.status}; report unavailable. Current-catalog reconstruction is not permitted for a supplied snapshot.`);
}
export function runInputLabel(run: SavedRun) {
  const read = inspectRunSnapshot(run.snapshot, run.design);
  if (read.status === 'unsupported' || read.status === 'invalid') return `Historical snapshot ${read.status}; original inputs unavailable to this reader. No current-catalog reconstruction performed.`;
  return read.status === 'valid'
    ? `Captured at simulation: ${run.snapshot!.capturedAt}; catalog ${run.snapshot!.catalogVersion}; assumptions ${run.snapshot!.assumptionsVersion}. Results and calculated balances captured, not measured.`
    : 'Historical inputs unavailable: no valid snapshot. Balances and diagnostics reconstructed using the current catalog; legacy results are recomputed by the recorded engine model. Original historical values cannot be recovered.';
}
