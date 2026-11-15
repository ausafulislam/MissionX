import {test} from 'node:test';import assert from 'node:assert/strict';
import {flightTestResults,summarizeTests,testSummaryText} from './flight-tests';
import {buildMissionReport} from '../report/mission-report';
import {STARTERS} from '../data/catalog';import {simulate} from './simulation';import {verify} from './validation';import type {Design,SavedRun} from '../types';
for(const missionId of ['moon','sun','mars'] as const)test(`${missionId}: panel/PDF share exact tests, evidence and totals for success and loss`,()=>{
 const design:Design={missionId,partIds:STARTERS[missionId],rocketId:missionId==='moon'?'swift':missionId==='sun'?'atlas':'horizon',orbitId:missionId==='moon'?'lunar':missionId==='sun'?'solar':'mars'};
 const runs=Array.from({length:500},(_,seed):SavedRun=>({id:'test',createdAt:'2026-11-14T00:00:00Z',design,result:simulate(design,seed)}));
 for(const run of [runs.find(r=>r.result.outcome==='success')!,runs.find(r=>r.result.duration===7)!]){
  assert.ok(run);const model=flightTestResults(run,run.result.duration),report=buildMissionReport(run)[7].rows;
  assert.equal(model.preflight.length,verify(design).checks.length);
  for(const test of [...model.preflight,...model.arrival]){const row=report.find(r=>r[0]===test.name);assert.ok(row);assert.equal(row[1],test.status);assert.ok(row[2].includes(test.evidence));}
  assert.ok(report.some(r=>r[1]===testSummaryText(model.preflightSummary)));
  assert.ok(report.some(r=>r[1]===testSummaryText(model.arrivalSummary)));
  if(run.result.duration===7){assert.equal(model.arrivalSummary.notEvaluated,6);assert.ok(model.failure);}
  else {assert.equal(model.arrivalSummary.failed,0);assert.equal(model.arrivalSummary.notEvaluated,0);}
 }
});
test('blocking errors and accepted warnings cannot become hardcoded PASS',()=>{
 const design:Design={missionId:'moon',partIds:[],rocketId:'swift',orbitId:'mars'};const run:SavedRun={id:'invalid',createdAt:'2026-11-14T00:00:00Z',design,result:simulate(design,1)};
 assert.ok(flightTestResults(run,0).preflightSummary.failed>0);assert.equal(flightTestResults(run,0).preflightSummary.status,'BLOCKED');
 assert.equal(summarizeTests([{id:'w',name:'Risk',description:'',evidence:'',status:'WARNING'}]).status,'READY WITH WARNINGS');
 assert.equal(flightTestResults(run,0).arrivalSummary.status,'NOT EVALUATED');
 const riskDesign:Design={missionId:'moon',partIds:STARTERS.moon.map(id=>id==='radio-basic'?'radio-low':id),rocketId:'swift',orbitId:'lunar'};
 const riskRun={...run,design:riskDesign,result:simulate(riskDesign,5)};
 const risk=flightTestResults(riskRun,18);assert.ok(verify(riskDesign).ready);assert.equal(risk.preflight.find(t=>t.id==='data')?.status,'WARNING');
 assert.ok(buildMissionReport(riskRun)[7].rows.some(r=>r[0]==='Daily downlink capacity'&&r[1]==='WARNING'));

});
