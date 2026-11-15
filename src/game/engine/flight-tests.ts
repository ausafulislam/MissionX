import type { SavedRun } from '../types';
import { verify } from './validation';
import { missionDiagnostics, type DiagnosticStatus } from './diagnostics';
export interface FlightTestResult { id:string; name:string; status:DiagnosticStatus; description:string; evidence:string; }
export function summarizeTests(tests: FlightTestResult[]) {
 const count=(status:DiagnosticStatus)=>tests.filter(t=>t.status===status).length;
 const summary={total:tests.length,passed:count('PASS'),failed:count('FAIL'),warnings:count('WARNING'),notEvaluated:count('NOT EVALUATED')};
 return {...summary,status:summary.failed?'BLOCKED':summary.notEvaluated?'NOT EVALUATED':summary.warnings?'READY WITH WARNINGS':'MISSION READY'};
}
/** Single presentation projection; never replaces engineering verification or sensor measurements. */
export function flightTestResults(run:SavedRun,time:number) {
 const verification=verify(run.design);
 const number=(value:number)=>Number(value.toFixed(3)).toString();
 const preflight:FlightTestResult[]=verification.checks.map(c=>({id:c.id,name:c.label,
  status:c.status==='pass'?'PASS':c.blocking===false?'WARNING':'FAIL',
  description:c.blocking===false?'Advisory configuration check':'Required configuration check',
  evidence:c.reason+(c.unit?` Evaluated: ${number(c.actual)} ${c.unit}; criterion: ${number(c.target)} ${c.unit}.`:'')}));
 const diagnostics=missionDiagnostics(run,time);
 const arrival:FlightTestResult[]=diagnostics.map(t=>({id:t.id,name:t.name,status:t.status,
  description:'Arrival configuration diagnostics; not hardware certification.',
  evidence:t.findings.map(f=>`${f.name} / ${f.status}: ${f.evidence} Impact: ${f.impact} Next design: ${f.recommendation}`).join('\n')}));
 const failure=run.result.events.find(e=>e.kind==='failure'&&e.at<=time);
 return {preflight,arrival,diagnostics,preflightSummary:summarizeTests(preflight),arrivalSummary:summarizeTests(arrival),failure};
}
export function testSummaryText(s:ReturnType<typeof summarizeTests>) {
 return `${s.total} tests | ${s.passed} PASS | ${s.failed} FAIL | ${s.warnings} WARNING | ${s.notEvaluated} NOT EVALUATED | ${s.status}`;
}
