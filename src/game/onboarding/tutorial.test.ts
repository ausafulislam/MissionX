import {test} from 'node:test';
import assert from 'node:assert/strict';
import {TUTORIAL_KEY,TUTORIAL_STEPS,tutorialSeen,saveTutorial} from './tutorial';
test('versioned first-visit detection, corrupt/blocked storage, completion and skip',()=>{
 assert.equal(tutorialSeen({getItem:()=>null}),false);
 assert.equal(tutorialSeen({getItem:()=>'{'}),false);
 assert.equal(tutorialSeen({getItem:()=>JSON.stringify({version:2,status:'completed'})}),false);
 assert.equal(tutorialSeen({getItem:()=>{throw Error('blocked')}}),false);
 for(const status of ['completed','skipped'] as const){
  let value='';assert.equal(saveTutorial(status,{setItem:(key,v)=>{assert.equal(key,TUTORIAL_KEY);value=v}}),true);
  assert.deepEqual(JSON.parse(value),{version:1,status});assert.equal(tutorialSeen({getItem:()=>value}),true);
 }
 assert.equal(saveTutorial('skipped',{setItem:()=>{throw Error('quota')}}),false);
 assert.equal(tutorialSeen(),true);
});
test('tour explains real stations and never requires navigation to an active flight',()=>{
 assert.equal(TUTORIAL_STEPS.length,8);
 assert.ok(TUTORIAL_STEPS.every(s=>s.target&&s.title&&s.description&&s.station!=='launch'));
 assert.equal(TUTORIAL_STEPS[1].station,'planning');assert.equal(TUTORIAL_STEPS.at(-1)?.station,'results');
});
