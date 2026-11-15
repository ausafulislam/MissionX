"use client";
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMissionStore } from '@/game/store/mission-store';
import { missionDiagnostics } from '@/game/engine/diagnostics';
import { flightLifecycle } from '@/game/engine/flight-lifecycle';
import { missionAudio } from '@/game/audio/audio-manager';
import { getMission, PARTS } from '@/game/data/catalog';
import type { SavedRun } from '@/game/types';
export function CommissioningPanel({ run, time }: {
    run: SavedRun;
    time: number;
}) {
    const reduced = useReducedMotion();
    const acknowledge = useMissionStore(s => s.acknowledgeDiagnostic), ref = useRef<HTMLDivElement>(null);
    const count = run.diagnosticsReviewed ?? 0, life = flightLifecycle(run, time, count === 6), tests = missionDiagnostics(run, time), current = tests[Math.min(count, 5)];
    useGSAP(() => { if (life.stage === 'commissioning')
        ref.current?.closest('.hq-launch-events')?.scrollTo({ top: 0 }); if (!reduced)
        gsap.fromTo(ref.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3 }); }, { scope: ref, dependencies: [count, life.stage, reduced] });
    if (life.failed)
        return null;
    return <div ref={ref} className="commissioning-panel">
 <p>COMMANDER {run.commanderName ?? 'Not recorded'} · {life.destination}</p>
 {time < 3 ? <h3>T − {life.countdown}</h3> : <p>◎ {life.stage.toUpperCase().replaceAll('-', ' ')} · Journey {Math.round(life.journeyProgress * 100)}%</p>}
 <p aria-live="polite">{life.stage === 'preparation' ? 'Launch control ready. Ignition precedes liftoff.' : life.stage === 'ascent' ? 'Launch vehicle ascending from Earth.' : life.stage === 'upper-ascent' ? 'Booster separation; upper stage continues the schematic ascent.' : life.stage === 'journey' ? `Spacecraft deployed. Following the schematic path to ${life.destination}.` : life.stage === 'commissioning' ? 'Destination phase reached. Mission control begins configuration diagnostics.' : life.stage === 'operations' ? 'Commissioning reviewed. Instruments observe the selected target.' : 'Flight evaluation complete. Review received science and engineering results.'}</p>
 <p className="hq-fineprint">Schematic geometry and compressed journey. No measured navigation solution.</p>
 {life.arrived && count < 6 && <section aria-live="polite"><h3>TEST {count + 1} OF 6 · {current.name}</h3><strong>{current.status}</strong><p>Mission phase reached. Configuration commissioning—not live sensor certification.</p>{current.findings.map(f => <details key={f.id}><summary>{f.name} · {f.status}</summary><p>{f.evidence}</p><p>Impact: {f.impact}</p><p>Next design: {f.recommendation}</p></details>)}<button className="button" disabled={current.status === 'FAIL'} onClick={() => { missionAudio.play(current.status === 'WARNING' ? 'warning' : 'notification'); acknowledge(); }}>CONTINUE {count === 5 ? 'TO SCIENCE OPERATIONS' : `TO TEST ${count + 2}`} ↗</button></section>}
 {count > 0 && <details><summary>REVIEW COMPLETED TESTS ({count})</summary>{tests.slice(0, count).map(t => <div key={t.id}><h4>{t.name} · {t.status}</h4>{t.findings.map(f => <p key={f.id}>{f.name}: {f.status} — {f.evidence}</p>)}</div>)}</details>}
 {life.canOperate && <p>Observing: {getMission(run.design.missionId).objectives[0]}. Active payload: {PARTS.filter(p => run.design.partIds.includes(p.id) && ['camera', 'science'].includes(p.category)).map(p => p.name).join(', ')}. Only Earth-received data earns science credit.</p>}
 </div>;
}
