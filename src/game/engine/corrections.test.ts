import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { aggregate, type DiagnosticFinding } from './diagnostics';
import { flightTestResults, testSummaryText } from './flight-tests';
import { captureRunSnapshot, readRunSnapshot, runInputs, runInputLabel } from './run-snapshot';
import { STARTERS, PARTS } from '../data/catalog';
import { simulate } from './simulation';
import { useMissionStore } from '../store/mission-store';
import { buildMissionReport } from '../report/mission-report';
import { parameterRows } from '../report/parameter-provenance';
import type { Design, SavedRun } from '../types';
const statuses=(...s: DiagnosticFinding['status'][])=>s.map(status=>({status} as DiagnosticFinding));
test('diagnostic precedence never conceals unevaluated findings as PASS',()=>{
 assert.equal(aggregate(statuses('PASS','PASS')),'PASS');
 assert.equal(aggregate(statuses('PASS','NOT EVALUATED')),'NOT EVALUATED');
 assert.equal(aggregate(statuses('WARNING','NOT EVALUATED')),'WARNING');
 assert.equal(aggregate(statuses('FAIL','WARNING','NOT EVALUATED','PASS')),'FAIL');
 assert.equal(aggregate([]),'NOT EVALUATED');
});
for(const missionId of ['moon','sun','mars'] as const) test(`${missionId}: captured report inputs survive catalog edits and hydration`,()=>{
 const design:Design={missionId,partIds:[...STARTERS[missionId]],rocketId:missionId==='moon'?'swift':missionId==='sun'?'atlas':'horizon',orbitId:missionId==='moon'?'lunar':missionId==='sun'?'solar':'mars'};
 const result=simulate(design,5),run:SavedRun={id:'snapshot',createdAt:'2026-11-14T00:00:00Z',design,result};
 run.snapshot=captureRunSnapshot(design,result,run.createdAt);
 assert.ok(readRunSnapshot(run.snapshot,design));
 const before=buildMissionReport(run),part=PARTS.find(p=>p.id===design.partIds[0])!,mass=part.mass;
 try {part.mass+=10000;assert.deepEqual(buildMissionReport(run),before);} finally {part.mass=mass;}
 const model=flightTestResults(run,18);
 assert.equal(model.arrivalSummary.notEvaluated,4);
 assert.equal(model.arrivalSummary.findings.notEvaluated,6);
 assert.equal(model.arrivalSummary.findings.total,model.diagnostics.flatMap(t=>t.findings).length);
 assert.ok(JSON.stringify(before).includes(testSummaryText(model.arrivalSummary)));
 assert.ok(parameterRows(runInputs(run)).every(([id,value])=>id.includes('.json:')&&value.includes('authored')));
 assert.match(runInputLabel({...run,snapshot:undefined}),/Historical inputs unavailable/);
 assert.equal(readRunSnapshot({...run.snapshot,payload:run.snapshot.payload+' '},design),null);
 assert.equal(readRunSnapshot({...run.snapshot,payload:'{}'},design),null);
 const original=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 let stored=JSON.stringify({version:1,chosen:true,design,run,complete:true,history:[run]});
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>stored,setItem:(_k:string,v:string)=>{stored=v;}}});
 try {
  useMissionStore.setState({...useMissionStore.getInitialState()});useMissionStore.getState().hydrate();
  assert.deepEqual(useMissionStore.getState().run?.result,result);
  assert.ok(useMissionStore.getState().run?.snapshot);
 } finally {
  useMissionStore.setState({...useMissionStore.getInitialState()});
  if(original)Object.defineProperty(globalThis,'localStorage',original);else Reflect.deleteProperty(globalThis,'localStorage');
 }
});
test('one countdown overlay per active screen and no separate ten-count expression',()=>{
 const scene=readFileSync('src/components/game/flight-scene.tsx','utf8');
 assert.ok(scene.includes('countdownLabel(time)'));assert.ok(!scene.includes('10*(1-time/3)'));assert.ok(!scene.includes('countdown-number'));
 for(const path of ['src/components/game/launch-screen.tsx','src/components/hq/launch-overlay.tsx']){
  assert.equal((readFileSync(path,'utf8').match(/<LaunchCountdown\b/g)??[]).length,1);
 }
 assert.ok(!readFileSync('src/components/game/launch-countdown.tsx','utf8').includes('setInterval'));
});
test('equivalent assumption wiring preserves baseline results and scoped values',()=>{
 for(const [missionId,mass,cost,science,score] of [['moon',166,46,45,100],['sun',672,151,168,96],['mars',359,130,100,97]] as const){
  const design:Design={missionId,partIds:STARTERS[missionId],rocketId:missionId==='moon'?'swift':missionId==='sun'?'atlas':'horizon',orbitId:missionId==='moon'?'lunar':missionId==='sun'?'solar':'mars'};
  const result=simulate(design,5),inputs=runInputs({id:'baseline',createdAt:'2026-11-14',design,result});
  assert.equal(inputs.resources.mass,mass);assert.equal(inputs.resources.cost,cost);assert.equal(result.science,science);assert.equal(result.score,score);assert.equal(result.modelVersion,3);
 }
});
