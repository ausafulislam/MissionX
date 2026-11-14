import {test} from 'node:test';
import assert from 'node:assert/strict';
import {STARTERS} from '../data/catalog';
import {simulate} from './simulation';
import {missionDiagnostics} from './diagnostics';
import {flightLifecycle} from './flight-lifecycle';
import type {Design,SavedRun} from '../types';
for(const missionId of ['moon','sun','mars'] as const){
 const design:Design={missionId,partIds:[...STARTERS[missionId]],orbitId:missionId==='moon'?'lunar':missionId==='sun'?'solar':'mars',rocketId:missionId==='moon'?'swift':missionId==='sun'?'atlas':'horizon'};
 const run=(seed:number):SavedRun=>({id:'test',createdAt:'2026-11-14T00:00:00Z',design,result:simulate(design,seed)});
 test(`${missionId}: diagnostics require arrival and never invent hardware measurements`,()=>{
  const r=Array.from({length:100},(_,i)=>run(i)).find(r=>r.result.duration===30)!;
  assert.ok(r);assert.ok(missionDiagnostics(r,4).every(t=>t.status==='NOT EVALUATED'));
  const tests=missionDiagnostics(r,18);assert.equal(tests.length,6);assert.ok(tests.every(t=>t.status!=='FAIL'));
  assert.equal(tests[0].findings.find(f=>f.id==='thermal')?.status,'NOT EVALUATED');
  assert.equal(flightLifecycle(r,18).canOperate,false);assert.equal(flightLifecycle(r,18,true).canOperate,true);
  assert.equal(flightLifecycle(r,0).countdown,10);assert.ok(flightLifecycle(r,17).journeyProgress<1);
  assert.match(flightLifecycle(r,18).destination,missionId==='sun'?/Earth orbit/:missionId==='moon'?/Moon/:/Mars/);
 });
 test(`${missionId}: launch loss cannot arrive or pass commissioning`,()=>{
  const r=Array.from({length:500},(_,i)=>run(i)).find(r=>r.result.duration===7)!;
  assert.ok(r);assert.equal(flightLifecycle(r,99,true).canOperate,false);assert.equal(flightLifecycle(r,99).stage,'lost');
  assert.ok(missionDiagnostics(r,99).every(t=>t.status==='NOT EVALUATED'));
 });
}
