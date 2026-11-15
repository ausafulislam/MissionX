import {test} from 'node:test';
import schema1Fixture from './fixtures/schema1-0.1.11.json';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {PDFDocument} from 'pdf-lib';
import {aggregate, type DiagnosticStatus} from './diagnostics';
import {summarizeTests, flightTestResults, testSummaryText} from './flight-tests';
import {captureRunSnapshot, inspectRunSnapshot, readRunSnapshot, runInputs, runInputLabel, type RunSnapshot} from './run-snapshot';
import {STARTERS, PARTS} from '../data/catalog';
import assumptions from '../data/assumptions.json';
import {simulate} from './simulation';
import {simulate as simulateV1} from './legacy-v1/simulation';
import {simulate as simulateV2} from './legacy-v2';
import {useMissionStore} from '../store/mission-store';
import {buildMissionReport} from '../report/mission-report';
import {createMissionPdf} from '../report/pdf-export';
import {PERFORMANCE_SCORE_LABEL, PERFORMANCE_SCORE_EXPLANATION} from '../report/score-presentation';
import type {Design, SavedRun} from '../types';
const cases: [string, DiagnosticStatus[], DiagnosticStatus, string][] = [
 ['all PASS',['PASS','PASS'],'PASS','MISSION READY'],
 ['one FAIL',['PASS','FAIL'],'FAIL','BLOCKED'],
 ['one WARNING',['PASS','WARNING'],'WARNING','READY WITH WARNINGS'],
 ['one NOT EVALUATED',['PASS','NOT EVALUATED'],'NOT EVALUATED','NOT EVALUATED'],
 ['WARNING + NOT EVALUATED',['WARNING','NOT EVALUATED'],'WARNING','READY WITH WARNINGS'],
 ['FAIL + NOT EVALUATED',['FAIL','NOT EVALUATED'],'FAIL','BLOCKED'],
 ['empty',[],'NOT EVALUATED','NOT EVALUATED'],
];
for(const [name,statuses,expected,label] of cases)test(`shared summary policy: ${name}`,()=>{
 const findings=statuses.map(status=>({status})),s=summarizeTests(findings);
 assert.equal(aggregate(findings),expected);assert.equal(s.diagnosticStatus,expected);assert.equal(s.status,label);
 assert.equal(s.total,statuses.length);
 for(const [status,key] of [['PASS','passed'],['FAIL','failed'],['WARNING','warnings'],['NOT EVALUATED','notEvaluated']] as const){
  const n=statuses.filter(s=>s===status).length;assert.equal(s[key],n);assert.ok(testSummaryText(s).includes(`${n} ${status}`));
 }
});
const designFor=(missionId:Design['missionId']):Design=>({missionId,partIds:[...STARTERS[missionId]],rocketId:missionId==='moon'?'swift':missionId==='sun'?'atlas':'horizon',orbitId:missionId==='moon'?'lunar':missionId==='sun'?'solar':'mars'});
function makeRun(missionId:Design['missionId']='moon',seed=5):SavedRun {
 const design=designFor(missionId),result=simulate(design,seed),createdAt='2026-11-14T00:00:00Z';
 return {id:`release-${missionId}-${seed}`,createdAt,design,result,snapshot:captureRunSnapshot(design,result,createdAt)};
}
// Re-sign a test fixture after an intentional field edit; this tests schema
// validation separately from checksum corruption detection, not authentication.
function editPayload(snapshot:RunSnapshot,edit:(data:ReturnType<typeof JSON.parse>)=>void):RunSnapshot {
 const data=JSON.parse(snapshot.payload);edit(data);const payload=JSON.stringify(data);let hash=2166136261;
 for(let i=0;i<payload.length;i++)hash=Math.imul(hash^payload.charCodeAt(i),16777619);
 return {...snapshot,payload,checksum:(hash>>>0).toString(16)};
}
function withStorage(body:(restore:(run:SavedRun)=>ReturnType<typeof useMissionStore.getState>)=>void){
 const original=Object.getOwnPropertyDescriptor(globalThis,'localStorage');const data=new Map<string,string>();
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v)}});
 try {body(run=>{data.set('missionx-flight-deck-v1',JSON.stringify({version:1,chosen:true,design:run.design,run,complete:true,history:[run]}));useMissionStore.setState({...useMissionStore.getInitialState()});useMissionStore.getState().hydrate();const state=useMissionStore.getState();if(state.storageWarning.includes('unsupported schema'))assert.equal(data.get('missionx-flight-deck-v1'),JSON.stringify({version:1,chosen:true,design:run.design,run,complete:true,history:[run]}));return state;});}
 finally {useMissionStore.setState({...useMissionStore.getInitialState()});if(original)Object.defineProperty(globalThis,'localStorage',original);else Reflect.deleteProperty(globalThis,'localStorage');}
}
test('mixed diagnostic groups preserve warning precedence, missing counts and finding reasons',()=>{
 const run=makeRun();run.snapshot=editPayload(run.snapshot!,data=>{
  data.verification.checks.find((c:{id:string})=>c.id==='data').status='close';
  data.verification.checks.find((c:{id:string})=>c.id==='data').blocking=false;
 });
 const model=flightTestResults(run,18),all=model.diagnostics.flatMap(t=>t.findings);
 assert.equal(model.diagnostics.find(g=>g.id==='communications')?.status,'WARNING');
 assert.equal(model.arrivalSummary.diagnosticStatus,'WARNING');assert.equal(model.arrivalSummary.status,'READY WITH WARNINGS');
 assert.equal(model.arrivalSummary.findings.diagnosticStatus,'WARNING');assert.equal(model.arrivalSummary.findings.notEvaluated,6);
 assert.equal(model.arrivalSummary.total,6);assert.equal(model.arrivalSummary.warnings,2);assert.equal(model.arrivalSummary.notEvaluated,3);assert.equal(model.arrivalSummary.passed,1);
 assert.equal(model.arrivalSummary.findings.total,all.length);
 const report=JSON.stringify(buildMissionReport(run));assert.ok(report.includes(testSummaryText(model.arrivalSummary)));
 for(const f of all)assert.ok(report.includes(f.evidence));
 const failing={...run,snapshot:editPayload(run.snapshot!,data=>{data.verification.checks.find((c:{id:string})=>c.id==='power').status='fail';})};
 assert.equal(flightTestResults(failing,18).arrivalSummary.diagnosticStatus,'FAIL');
});
test('Moon seed 0 keeps 100 weighted score, 44.9/45 science and PARTIAL with explicit interpretation',async()=>{
 const run=makeRun('moon',0);assert.equal(run.result.score,100);assert.equal(run.result.science,44.9);assert.equal(run.result.outcome,'partial');
 assert.equal(run.result.requirements.find(c=>c.id==='science')?.target,45);
 assert.equal(run.result.requirements.find(c=>c.id==='science')?.status,'close');
 const text=JSON.stringify(buildMissionReport(run));assert.ok(text.includes(PERFORMANCE_SCORE_LABEL));assert.ok(text.includes(PERFORMANCE_SCORE_EXPLANATION));assert.ok(text.includes('PARTIAL'));
 for(const path of ['src/components/game/result-screen.tsx','src/components/hq/results-panel.tsx','src/game/report/pdf-export.ts']){
  const source=readFileSync(path,'utf8');assert.ok(source.includes('PERFORMANCE_SCORE_LABEL'));assert.ok(source.includes('PERFORMANCE_SCORE_EXPLANATION'));
 }
 const pdf=await PDFDocument.load(await createMissionPdf(run));assert.ok(pdf.getPageCount()>1);
});
test('schema-1 reader is independent of current added assumption fields and defaults optional metadata safely',()=>{
 const run=makeRun();assert.equal(inspectRunSnapshot(run.snapshot,run.design).status,'valid');
 const extended=assumptions as typeof assumptions & {futureOptionalField?:number};extended.futureOptionalField=123;
 try {assert.equal(inspectRunSnapshot(run.snapshot,run.design).status,'valid');}finally{delete extended.futureOptionalField;}
 const missing=editPayload(run.snapshot!,data=>{delete data.assumptions.note;delete data.parts[0].requiresAny;delete data.parts[0].payloadLimit;delete data.verification.checks[0].blocking;});
 const restored=readRunSnapshot(missing,run.design)!;assert.ok(restored);assert.match(restored.assumptions.note,/not recorded/);assert.equal(restored.verification.checks[0].blocking,true);
 assert.deepEqual(restored.result,run.result);assert.deepEqual(restored.resources,runInputs(run).resources);
 const extra=editPayload(run.snapshot!,data=>{data.assumptions.futureOptionalField=456;});assert.ok(readRunSnapshot(extra,run.design));
});
test('missing required fields, invalid optional fields and future versions fail closed without reconstruction',()=>{
 const run=makeRun();
 for(const snapshot of [editPayload(run.snapshot!,data=>{delete data.assumptions.solarAnnualRetention;}),editPayload(run.snapshot!,data=>{delete data.resources.mass;}),editPayload(run.snapshot!,data=>{data.verification.checks[0].blocking='no';}),{...run.snapshot!,schemaVersion:99} as unknown as RunSnapshot]){
  const rejected={...run,snapshot};assert.equal(readRunSnapshot(snapshot,run.design),null);assert.throws(()=>runInputs(rejected),/reconstruction is not permitted/);assert.match(runInputLabel(rejected),/No current-catalog reconstruction/);
  withStorage(restore=>{const state=restore(rejected);assert.equal(state.run,null);assert.equal(state.history.length,0);assert.match(state.storageWarning,/unsupported schema/);});
 }
 assert.equal(inspectRunSnapshot({...run.snapshot,schemaVersion:99},run.design).status,'unsupported');
});
for(const missionId of ['moon','sun','mars'] as const)for(const seed of [5,43])test(`${missionId} seed ${seed}: snapshot restoration, summary/report consistency and PDF`,async()=>{
 const run=makeRun(missionId,seed),report=buildMissionReport(run),expected=structuredClone(run.result);
 assert.equal(run.result.outcome,seed===5?'success':'failed');assert.equal(run.result.score,seed===43?0:missionId==='moon'?100:missionId==='sun'?96:97);
 const p=PARTS.find(p=>p.id===run.design.partIds[0])!,mass=p.mass;
 try {p.mass+=10000;assert.deepEqual(buildMissionReport(run),report);withStorage(restore=>{assert.deepEqual(restore(run).run?.result,expected);});}finally{p.mass=mass;}
 const model=flightTestResults(run,run.result.duration);assert.equal(model.arrivalSummary.notEvaluated,seed===5?4:6);
 assert.ok(JSON.stringify(report).includes(testSummaryText(model.arrivalSummary)));
 const pdf=await PDFDocument.load(await createMissionPdf(run));assert.ok(pdf.getPageCount()>1);
});
test('snapshotless legacy model 1/2/3 saves still restore and disclose current reconstruction for every mission',()=>{
 for(const missionId of ['moon','sun','mars'] as const)for(const simulateModel of [simulateV1,simulateV2,simulate]){
  const run=makeRun(missionId);delete run.snapshot;run.result=simulateModel(run.design,5);
  withStorage(restore=>assert.deepEqual(restore(run).run?.result,run.result));assert.match(runInputLabel(run),/Historical inputs unavailable/);assert.ok(runInputs(run));
 }
});

test('frozen fixture produced by committed 0.1.11 writer remains readable and restorable',()=>{
 const design=schema1Fixture.design as Design,snapshot=schema1Fixture.snapshot as RunSnapshot;
 const captured=readRunSnapshot(snapshot,design);assert.ok(captured);assert.equal(captured.result.score,100);
 withStorage(restore=>assert.deepEqual(restore({id:'frozen',createdAt:snapshot.capturedAt,design,result:captured.result,snapshot}).run?.result,captured.result));
});
