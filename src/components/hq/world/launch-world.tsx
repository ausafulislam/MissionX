"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SavedRun } from "@/game/types";
import { telemetry } from "@/game/engine/telemetry";
import { SpacecraftModel } from "./spacecraft-model";
import { OrbitRing, Planet } from "./planet";
import { JourneyStars } from "./journey-stars";
import { journeyGeometry, journeyPose, smoothArrival } from "./journey-geometry";
function Rocket({
  time,
  run,
  reduced,
}: {
  time: number;
  run: SavedRun;
  reduced: boolean;
}) {
  const rocket = useRef<THREE.Group>(null),
    stage = useRef<THREE.Group>(null),
    flame = useRef<THREE.Mesh>(null);
  const failure = run.result.events.some(
      (e) => e.kind === "failure" && time >= e.at,
    ),
    size =
      run.design.rocketId === "horizon"
        ? 1.22
        : run.design.rocketId === "atlas"
          ? 1.08
          : 1;
  useFrame(({ clock }) => {
    if (rocket.current) {
      rocket.current.position.y =
        time < 3 ? 0 : Math.min(12, (time - 3) * 1.15);
      rocket.current.rotation.z = failure ? 0.28 : !reduced && time>=2 && time<3 ? Math.sin(time*90)*0.006 : 0;
    }
    if (stage.current) {
      stage.current.position.y = time >= 8 ? -(time - 8) * 1.8 : 0;
      stage.current.rotation.z = time >= 8 ? (time - 8) * 0.12 : 0;
    }
    if (flame.current) {
      flame.current.visible = time >= 2 && time < 8 && !failure;
      flame.current.scale.y = reduced
        ? 1
        : 1 + Math.sin(clock.elapsedTime * 35) * 0.12;
    }
  });
  return (
    <group ref={rocket} scale={size}>
      <group ref={stage}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.42, 0.45, 3, 32]} />
          <meshStandardMaterial
            color="#b7c2c8"
            metalness={0.65}
            roughness={0.35}
          />
        </mesh>
        {[-1, 1].map((x) => (
          <mesh
            key={x}
            position={[x * 0.4, 0.55, 0]}
            rotation={[0, 0, x * 0.4]}
          >
            <boxGeometry args={[0.12, 0.9, 0.65]} />
            <meshStandardMaterial
              color="#465d73"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        ))}
        {[-0.2, 0.2].map((x) => (
          <mesh key={x} position={[x, -0.06, 0]}>
            <cylinderGeometry args={[0.12, 0.2, 0.3, 16]} />
            <meshStandardMaterial
              color="#4d535c"
              metalness={0.85}
              roughness={0.26}
            />
          </mesh>
        ))}
        <mesh ref={flame} position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.38, 2.3, 24]} />
          <meshBasicMaterial color="#ff973a" transparent opacity={0.85} />
        </mesh>
      </group>
      <mesh position={[0, 3.65, 0]}>
        <cylinderGeometry args={[0.4, 0.42, 1.3, 32]} />
        <meshStandardMaterial
          color="#e0e2da"
          metalness={0.45}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 4.65, 0]}>
        <coneGeometry args={[0.4, 0.7, 32]} />
        <meshStandardMaterial color="#e7e8e2" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.4, 0]}>
        <cylinderGeometry args={[0.423, 0.423, 0.22, 32]} />
        <meshBasicMaterial color="#ff6a2b" />
      </mesh>
    </group>
  );
}
function ExhaustCloud({
  time,
  low,
  reduced,
}: {
  time: number;
  low: boolean;
  reduced: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  useFrame(() => {
    if (!ref.current) return;
    for (let i = 0; i < (low ? 10 : 22); i++) {
      const phase = (i * 0.37 + Math.max(0, time - 2) * 0.8) % 2.5,
        angle = i * 2.4;
      dummy.position.set(
        Math.cos(angle) * (phase * 1.8 + 0.4),
        0.1 + phase * 0.25,
        Math.sin(angle) * (phase * 1.8 + 0.4),
      );
      dummy.scale.setScalar(
        time >= 2 && time < 8 ? (reduced ? 0.4 : (1 - phase / 3) * 0.6) : 0,
      );
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, low ? 10 : 22]}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial
        color="#ada49c"
        transparent
        opacity={0.17}
        depthWrite={false}
        roughness={1}
      />
    </instancedMesh>
  );
}
export function LaunchWorld({
  run,
  time,
  low,
  reduced,
}: {
  run: SavedRun;
  time: number;
  low: boolean;
  reduced: boolean;
}) {
  const ascent=Math.max(0,Math.min(1,(time-3)/10));
  const data=telemetry(run.design,run.result,time),failed=run.result.events.some(e=>e.kind==='failure'&&e.at<=time),deployed=time>=13&&!failed;
  const geometry=useMemo(()=>journeyGeometry(run.design.missionId),[run.design.missionId]);
  const operating=time>18&&(run.diagnosticsReviewed??0)>=6;
  const pose=journeyPose(geometry,time,operating);
  const line=useMemo(()=>new THREE.BufferGeometry().setFromPoints(
    Array.from({length:129},(_,i)=>journeyPose(geometry,13+i/128*5,false).position)),[geometry]);
  const trajectory=useMemo(()=>new THREE.Line(line,new THREE.LineBasicMaterial({color:"#ff6a2b",transparent:true,opacity:.6})),[line]);
  useEffect(()=>()=>{line.dispose();trajectory.material.dispose();},[line,trajectory]);
  const background=new THREE.Color('#3a6b8b').lerp(new THREE.Color('#020611'),ascent);
  return <>
    <color attach="background" args={[background]} />
    <ambientLight intensity={1.3}/><hemisphereLight args={['#b4d5eb','#203c46',1.6]}/><directionalLight position={[4,12,4]} intensity={4} color="#ffe3c7"/>
    <JourneyStars low={low} opacity={smoothArrival((time-7)/6)}/>
    <group position={[0,-ascent*20,0]} visible={time<13}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.2,0]}><planeGeometry args={[80,80]}/><meshStandardMaterial color="#253e47" roughness={.93} transparent opacity={Math.max(0,1-Math.max(0,ascent-.2)/.35)} depthWrite={false}/></mesh>
      <mesh position={[0,-.1,0]}><cylinderGeometry args={[4,4,.3,32]}/><meshStandardMaterial color="#697780"/></mesh>
      <group position={[-2,0,-1]}>{Array.from({length:7},(_,y)=><group key={y} position={[0,y*1.1,0]}><mesh><boxGeometry args={[1.1,.12,1]}/><meshStandardMaterial color="#78828a"/></mesh>{[-.48,.48].map(x=><mesh key={x} position={[x,.5,0]}><boxGeometry args={[.1,1.1,.8]}/><meshStandardMaterial color="#4d5e70"/></mesh>)}</group>)}</group>
      {!failed&&<ExhaustCloud time={time} low={low} reduced={reduced}/>}
    </group>
    <group visible={!deployed}><Rocket time={time} run={run} reduced={reduced}/></group>
    {time>=2&&time<8&&!failed&&<pointLight position={[0,Math.max(0,(time-3)*1.15),0]} color="#ff9145" intensity={30} distance={16}/>}
    <group visible={time>=8&&(run.design.missionId!=="sun"||time<13)} position={[-8,-32+ascent*29,-15]} scale={Math.max(.001,Math.min(1,(time-8)/5))}><Planet kind="earth" radius={4} quality={!low} motion={false}/></group>
    {!failed&&time>=11&&<>
      {run.design.missionId!=='sun'?<group position={geometry.target.toArray()} scale={Math.max(.01,Math.min(1,(time-11)/7))}><Planet kind={run.design.missionId} radius={3} quality={!low} motion={false}/></group>:<><Planet kind="earth" radius={3} position={geometry.target.toArray()} quality={!low} motion={false}/><Planet kind="sun" radius={1.8} position={[-9,9,-15]} quality={false} motion={false}/></>}
      <primitive object={trajectory}/>
    </>}
    {deployed&&<>
      <group position={pose.position.toArray()} quaternion={pose.rotation}>{geometry.offsets.map((offset,i)=><group key={i} position={offset.toArray()}><SpacecraftModel design={run.design} reduced scale={geometry.modelScale}/></group>)}</group>
      {time>=18&&<group position={geometry.target.toArray()} quaternion={geometry.orbitRotation}><OrbitRing radius={geometry.orbitRadius}/></group>}
      {operating&&<ObservationCue craft={pose.position} target={geometry.target} contact={data.contact}/>}

    </>}
    {failed&&<mesh position={[0,5,0]}><sphereGeometry args={[1.4,16,12]}/><meshBasicMaterial color="#ff7731" transparent opacity={.6}/></mesh>}
  </>;
}

function ObservationCue({craft,target,contact}:{craft:THREE.Vector3;target:THREE.Vector3;contact:boolean}) {
  const direction=target.clone().sub(craft), length=direction.length();
  return <mesh position={craft.clone().addScaledVector(direction,.4).toArray()}
    quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize())}>
    <cylinderGeometry args={[.04,.55,length*.8,12,1,true]}/>
    <meshBasicMaterial color={contact?'#65caa5':'#ff6a2b'} transparent opacity={.12} depthWrite={false} side={THREE.DoubleSide}/>
  </mesh>;
}
