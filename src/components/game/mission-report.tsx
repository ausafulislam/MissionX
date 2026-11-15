"use client";
import { useState } from 'react';
import { buildMissionReport, reportFilename } from '@/game/report/mission-report';
import { resources } from '@/game/engine/resources';
import { flightLifecycle } from '@/game/engine/flight-lifecycle';
import type { SavedRun } from '@/game/types';
export function MissionReport({ run }: {
    run: SavedRun;
}) {
    const balance = resources(run.design);
    const [busy, setBusy] = useState(false), [error, setError] = useState('');
    return <section className="mission-report"><p>COMMANDER {run.commanderName ?? 'Not recorded'} · {run.result.outcome.toUpperCase()} · {run.result.score}/100 · {flightLifecycle(run, 0).destination}</p><p>Achieved requirements: {run.result.requirements.filter(c => c.status === 'pass').map(c => c.label).join(', ') || 'None'}. Unmet requirements: {run.result.requirements.filter(c => c.status !== 'pass').map(c => c.label).join(', ') || 'None'}.</p><p>Fleet mass {balance.mass} kg · EOL power headroom {balance.powerMarginPercent.toFixed(1)}% per spacecraft · Earth-received return {run.result.returnedData} GB/day. {run.result.science} science points; scientific usefulness is a gameplay proxy.</p><button className="button" disabled={busy} onClick={async () => { setBusy(true); setError(''); try {
        const { createMissionPdf } = await import('@/game/report/pdf-export');
        const response = await fetch('/images/logo-report.png');
        const logo = response.ok ? new Uint8Array(await response.arrayBuffer()) : undefined;
        const bytes = await createMissionPdf(run, logo);
        const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = reportFilename(run);
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 30000);
    }
    catch {
        setError('Report download failed. Please retry. Your mission remains saved.');
    }
    finally {
        setBusy(false);
    } }}>{busy ? 'GENERATING REPORT…' : 'DOWNLOAD MISSION REPORT'} ↧</button>{error && <p role="alert">{error}</p>}<details><summary>REVIEW MISSION TESTS, EVENTS & COMPLETE REPORT</summary>{buildMissionReport(run).map(section => <details key={section.title}><summary>{section.title}</summary>{section.rows.map((row, i) => <p key={i}><strong>{row[0]}</strong><br />{row.slice(1).join(' · ')}</p>)}</details>)}</details></section>;
}
