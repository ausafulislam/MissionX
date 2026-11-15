import type { SavedRun } from '../types';
import { runInputs } from './run-snapshot';
import { aggregate, missionDiagnostics, type DiagnosticStatus } from './diagnostics';
export interface FlightTestResult { id:string; name:string; status:DiagnosticStatus; description:string; evidence:string; }
export function summarizeTests<T extends {status: DiagnosticStatus}>(tests: T[]) {
 const count=(status:DiagnosticStatus)=>tests.filter(t=>t.status===status).length;
 const summary={total:tests.length,passed:count('PASS'),failed:count('FAIL'),warnings:count('WARNING'),notEvaluated:count('NOT EVALUATED')};
 const diagnosticStatus = aggregate(tests);
 const labels = {FAIL:'BLOCKED', WARNING:'READY WITH WARNINGS', 'NOT EVALUATED':'NOT EVALUATED', PASS:'MISSION READY'} as const;
 return {...summary,diagnosticStatus,status:labels[diagnosticStatus]};
}
/** Single presentation projection; never replaces engineering verification or sensor measurements. */
export function flightTestResults(run:SavedRun,time:number) {
 const verification=runInputs(run).verification;
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
 const arrivalSummary = {...summarizeTests(arrival), findings: summarizeTests(diagnostics.flatMap(t=>t.findings))};
 return {preflight,arrival,diagnostics,preflightSummary:summarizeTests(preflight),arrivalSummary,failure};
}
export function testSummaryText(s:ReturnType<typeof summarizeTests> & {findings?: ReturnType<typeof summarizeTests>}) {
 const counts=(v:ReturnType<typeof summarizeTests>)=>`${v.total} total | ${v.passed} PASS | ${v.failed} FAIL | ${v.warnings} WARNING | ${v.notEvaluated} NOT EVALUATED`;
 return `Test groups: ${counts(s)} | ${s.status}` + (s.findings ? `; Findings: ${counts(s.findings)}` : '');
}
