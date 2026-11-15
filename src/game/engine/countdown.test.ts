import {test} from 'node:test';
import assert from 'node:assert/strict';
import {advanceFlight,countdownLabel} from './flight-lifecycle';
import {STARTERS} from '../data/catalog';
import {simulate} from './simulation';
import type {Design,SavedRun} from '../types';
const design:Design={missionId:'moon',partIds:STARTERS.moon,rocketId:'swift',orbitId:'lunar'};
const run:SavedRun={id:'countdown-test',createdAt:'2026-11-14T00:00:00Z',design,result:simulate(design,1)};
test('flight clock presents three beats and liftoff hold before ascent',()=>{
 assert.deepEqual([0,.79,.8,1.59,1.6,2.39,2.4,2.99,3].map(countdownLabel),['3','3','2','2','1','1','LIFTOFF!','LIFTOFF!',null]);
 let t=0;const seen:string[]=[];
 for(let i=0;i<31;i++){
  const label=countdownLabel(t);if(label&&seen.at(-1)!==label)seen.push(label);
  if(i<30){assert.ok(t<3);assert.equal(advanceFlight(run,t,100,true),t);}
  t=advanceFlight(run,t,.1);
 }
 assert.deepEqual(seen,['3','2','1','LIFTOFF!']);assert.ok(t>=3);
});
test('large advancement cannot cross ascent interlock in one tick; commissioning stays gated',()=>{
 assert.equal(advanceFlight(run,0,100),3);
 assert.equal(advanceFlight(run,2.4,100),3);
 assert.equal(advanceFlight(run,3,100,true),18);
 assert.equal(advanceFlight({...run,diagnosticsReviewed:6},18,100,true),30);
});
