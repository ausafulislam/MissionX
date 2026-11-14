import {test} from 'node:test';
import assert from 'node:assert/strict';
import {MISSIONS,PARTS,ROCKETS,ORBITS,STARTERS} from './catalog';
import {verify} from '../engine/validation';
import {simulate} from '../engine/simulation';
test('all static entries disclose scope and gameplay assumptions',()=>{for(const rows of [MISSIONS,PARTS,ROCKETS,ORBITS]){assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);for(const x of rows){assert.ok(x.source.title);assert.equal(new URL(x.source.url).protocol,'https:');assert.equal(x.source.accessed,'2026-11-14');assert.ok(x.source.parameter);assert.ok(x.source.simplification.includes('NOT these numbers'));}}});
test('catalog migration preserves three playable starter scenarios',()=>{for(const m of MISSIONS){const d={missionId:m.id,partIds:STARTERS[m.id],rocketId:m.id==='moon'?'swift':m.id==='sun'?'atlas':'horizon',orbitId:m.id==='moon'?'lunar':m.id==='sun'?'solar':'mars'};assert.ok(verify(d).ready);assert.deepEqual(simulate(d,2026),simulate(d,2026));}});
