import {test} from 'node:test';
import assert from 'node:assert/strict';
import {useMissionStore} from '../store/mission-store';
import {STARTERS} from '../data/catalog';
import {simulate as oldSimulation} from './legacy-v1/simulation';
import {simulate} from './simulation';
const design={missionId:'moon' as const,partIds:[...STARTERS.moon],orbitId:'lunar',rocketId:'swift'};
test('save hydration retains legacy outcome and recomputes current model without trusting cached scores',()=>{
 const original=Object.getOwnPropertyDescriptor(globalThis,'localStorage');const data=new Map<string,string>();Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(key:string)=>data.get(key)??null,setItem:(key:string,value:string)=>data.set(key,value)}});
 try{for(const result of [oldSimulation(design,2026),simulate(design,2026)]){const expected=structuredClone(result);const run={id:'old-run',createdAt:'2026-11-14T00:00:00Z',design,result:{...result,score:99999}};data.set('missionx-flight-deck-v1',JSON.stringify({version:1,chosen:true,design,run,complete:true,history:[run]}));useMissionStore.setState({...useMissionStore.getInitialState()});useMissionStore.getState().hydrate();assert.deepEqual(useMissionStore.getState().run?.result,expected);assert.deepEqual(useMissionStore.getState().history[0].result,expected);}}
 finally{if(original)Object.defineProperty(globalThis,'localStorage',original);else Reflect.deleteProperty(globalThis,'localStorage');useMissionStore.setState({...useMissionStore.getInitialState()});}
});
