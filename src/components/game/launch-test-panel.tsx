"use client";
import { useEffect, useRef } from "react";
import { flightTestResults, testSummaryText } from '@/game/engine/flight-tests';
import type { DiagnosticStatus } from '@/game/engine/diagnostics';
import type { SavedRun } from '@/game/types';
import { useMissionStore } from '@/game/store/mission-store';
import { missionAudio } from '@/game/audio/audio-manager';
import './launch-test-panel.css';
const indicator=(s:DiagnosticStatus)=>s==='PASS'?'✓':s==='FAIL'?'×':s==='WARNING'?'!':'—';
export function LaunchTestPanel({run,time}:{run:SavedRun;time:number}) {
 const model=flightTestResults(run,time),count=run.diagnosticsReviewed??0;
 const arrived=model.arrival.some(t=>t.status!=='NOT EVALUATED'),current=model.diagnostics[Math.min(count,5)];
 const root=useRef<HTMLElement>(null),list=useRef<HTMLUListElement>(null);
 const reviewing=time>0&&time<3,failureAt=model.failure?.at;
 const acknowledge=useMissionStore(s=>s.acknowledgeDiagnostic);
 // Checks are evaluated synchronously. Only their review is progressively revealed.
 const revealed=time===0?0:Math.min(model.preflight.length,Math.ceil(time/3*model.preflight.length));
 useEffect(()=>{
  if(!reviewing&&!arrived&&failureAt===undefined)return;
  const frame=requestAnimationFrame(()=>{
   const panel=root.current,container=panel?.closest('.hq-launch-events');
   if(panel&&container)container.scrollTop+=panel.getBoundingClientRect().top-container.getBoundingClientRect().top-8;
  });
  return()=>cancelAnimationFrame(frame);
 },[reviewing,arrived,count,failureAt]);
 useEffect(()=>{if(reviewing&&list.current)list.current.scrollTop=list.current.scrollHeight;},[revealed,reviewing]);
 return <aside ref={root} className="launch-test-panel" aria-label="Mission test results">
  {model.failure&&<p role="status" className="test-flight-failed">× FLIGHT FAILED: {model.failure.description} Preflight configuration checks do not guarantee launch success. Arrival diagnostics were NOT EVALUATED.</p>}
  <details open={time<3||!!model.failure}>
   <summary>PREFLIGHT CONFIGURATION · {time<3?`${revealed}/${model.preflight.length} reviewed`:model.preflightSummary.status}</summary>
   <p>Calculated preflight checks, reviewed during countdown. Not live sensor readings.</p>
   {time<3&&<progress aria-label="Preflight review" value={revealed} max={model.preflight.length}/>}
   <ul ref={list} className="launch-test-list">{model.preflight.slice(0,revealed).map(t=><li key={t.id}><strong>{t.name}</strong><span className={`test-status status-${t.status.toLowerCase()}`}>{indicator(t.status)} {t.status}</span><p>{t.description}. {t.evidence}</p></li>)}</ul>
  </details>
  {time>=3&&<p className="test-summary" data-test-summary="preflight">{testSummaryText(model.preflightSummary)}</p>}

  {arrived&&<section className="arrival-test-popup" aria-label="Arrival test review" aria-live="polite">
   <h3>{count<6?`TEST ${count+1} OF 6 · ${current.name}`:'ARRIVAL TEST SUMMARY'}</h3>
   {count<6?<>
    <span className={`test-status status-${current.status.toLowerCase()}`}>{indicator(current.status)} {current.status}</span>
    <p>Arrival configuration evaluation, not live sensor certification.</p>
    <progress aria-label="Arrival tests reviewed" value={count} max={6}/>
    {current.findings.map(f=><details key={f.id}><summary>{f.name} · {f.status}</summary><p>{f.evidence}</p><p>Impact: {f.impact}</p><p>Next design: {f.recommendation}</p></details>)}
    <button className="button" disabled={current.status==='FAIL'} onClick={()=>{missionAudio.play(current.status==='WARNING'?'warning':'notification');acknowledge();}}>CONTINUE {count===5?'TO SCIENCE OPERATIONS':`TO TEST ${count+2}`} ↗</button>
   </>:<>
    <p className="test-summary" data-test-summary="arrival">{testSummaryText(model.arrivalSummary)}</p>
    <p>Configuration review complete. Unmodeled measurements remain NOT EVALUATED; readiness is not hardware certification.</p>
    {model.arrival.map(t=><p key={t.id}>{t.name}: <span className={`test-status status-${t.status.toLowerCase()}`}>{indicator(t.status)} {t.status}</span></p>)}
   </>}
  </section>}
 </aside>;
}
