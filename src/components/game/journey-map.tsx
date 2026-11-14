import type { SavedRun } from '@/game/types';
import { flightLifecycle } from '@/game/engine/flight-lifecycle';
export function JourneyMap({ run, time }: {
    run: SavedRun;
    time: number;
}) {
    const life = flightLifecycle(run, time, (run.diagnosticsReviewed ?? 0) >= 6);
    if (time < 13 || life.failed)
        return null;
    const p = life.journeyProgress;
    return <figure className="journey-map"><svg viewBox="0 0 600 150" role="img" aria-label={`Schematic Earth to ${life.destination} journey ${Math.round(p * 100)} percent`}><circle cx="50" cy="100" r="26" fill="#245373"/><path d="M 80 100 Q 290 -20 510 100" fill="none" stroke="#ff6a2b" strokeWidth="2" strokeDasharray="6 4"/><circle cx="540" cy="100" r="32" fill={run.design.missionId === 'mars' ? '#ad6645' : run.design.missionId === 'moon' ? '#8a8b89' : '#245373'}/><circle cx={80 + 430 * p} cy={100 - 240 * p * (1 - p)} r="7" fill="#f5f5f2"/><text x="25" y="145" fill="currentColor">Earth</text><text x="380" y="145" fill="currentColor">{life.destination}</text></svg><figcaption>Visual time/distance compression · {life.canOperate ? 'Observing target and returning data' : 'Journey / commissioning'} · {Math.round(p * 100)}%</figcaption></figure>;
}
