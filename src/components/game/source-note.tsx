import type {SourceInfo} from '@/game/types';
export function SourceNote({source}:{source:SourceInfo}){return <details><summary>SOURCE & ESTIMATE LIMITS</summary><p><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a><br/>{source.parameter}<br/>Accessed {source.accessed} · {source.confidence}. {source.simplification}</p></details>;}
