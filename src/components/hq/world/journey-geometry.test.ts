import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Vector3,PerspectiveCamera} from 'three';
import {DEPLOYMENT,journeyGeometry,journeyPose,journeyCamera} from './journey-geometry';
import {makeStarLayer} from './journey-stars';

for(const mission of ['moon','sun','mars'] as const){
 test(`${mission}: approach and operations keep the entire fleet outside all celestial surfaces`,()=>{
  const g=journeyGeometry(mission);
  assert.ok(journeyPose(g,13,false).position.distanceTo(DEPLOYMENT)<1e-10);
  for(let time=13;time<=30;time+=.005){
   const p=journeyPose(g,time,time>18);
   assert.ok(p.position.distanceTo(g.target)-g.envelope>g.surfaceRadius+1.19,`${mission}@${time}`);
   for(const offset of g.offsets){
    const craft=offset.clone().applyQuaternion(p.rotation).add(p.position);
    assert.ok(craft.distanceTo(g.target)-4*g.modelScale>g.surfaceRadius+1.19);
    if(mission!=='sun')assert.ok(craft.distanceTo(new Vector3(-8,-3,-15))-4*g.modelScale>4.18);
    else assert.ok(craft.distanceTo(new Vector3(-9,9,-15))-4*g.modelScale>1.881);
   }
  }
 });
 test(`${mission}: tangent, orientation and speed stay continuous across arrival and commissioning`,()=>{
  const g=journeyGeometry(mission),a=journeyPose(g,18-.00001,false),b=journeyPose(g,18,true),c=journeyPose(g,18+.00001,true);
  assert.ok(a.position.distanceTo(b.position)<.0001);assert.ok(c.position.distanceTo(b.position)<.0001);
  assert.ok(a.tangent.dot(c.tangent)>.999999);
  assert.ok(Math.abs(a.position.distanceTo(b.position)/c.position.distanceTo(b.position)-1)<.001);
  assert.ok(new Vector3(0,0,1).applyQuaternion(b.rotation).dot(b.tangent)>.999999);
  assert.ok(journeyPose(g,30,false).position.distanceTo(journeyPose(g,18,false).position)<1e-10);
 });
 for(const aspect of [390/844,844/390,820/1180,1440/900])test(`${mission}: arrival camera frames the target/fleet without surface clipping (${aspect.toFixed(2)})`,()=>{
  const g=journeyGeometry(mission),camera=new PerspectiveCamera(48,aspect,.1,180);
  for(let time=13;time<=30;time+=.05){
   const p=journeyCamera(g,time,aspect);camera.position.copy(p.position);camera.lookAt(p.lookAt);camera.updateMatrixWorld();
   assert.ok(camera.position.distanceTo(g.target)>g.surfaceRadius+g.envelope+1);
   const craft=journeyPose(g,time,true).position;
   // A ray from the camera to the fleet cannot pass through the target disk.
   const ray=craft.clone().sub(camera.position),distance=ray.length();ray.normalize();
   const along=g.target.clone().sub(camera.position).dot(ray);
   const closest=camera.position.clone().addScaledVector(ray,Math.max(0,Math.min(distance,along)));
   assert.ok(closest.distanceTo(g.target)>g.surfaceRadius+g.envelope,`occlusion at ${time}`);
   for(const center of (time<16?[craft]:[g.target,craft])){const ndc=center.clone().project(camera);assert.ok(Math.abs(ndc.x)<.9&&Math.abs(ndc.y)<.9,`out of frame ${time} ${ndc.toArray()}`);}
  }
 });
}
test('star shells are deterministic, genuinely three-dimensional and bounded',()=>{
 for(let layer=0;layer<3;layer++){
  const a=makeStarLayer(1200,layer),b=makeStarLayer(1200,layer);assert.deepEqual(a,b);
  let front=0,back=0;
  for(let i=0;i<1200;i++){
   const p=new Vector3().fromArray(a.positions,i*3);assert.ok(p.length()>=64.999&&p.length()<118);
   if(p.z>0)front++;else back++;
  }assert.ok(front>400&&back>400);assert.ok(new Set(a.colors).size>100);
 }
});
