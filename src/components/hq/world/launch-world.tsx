"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SavedRun } from "@/game/types";
import { telemetry } from "@/game/engine/telemetry";
import { SpacecraftModel } from "./spacecraft-model";
import { OrbitRing, Planet } from "./planet";
import { SpaceParticles } from "./architecture";
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
      rocket.current.rotation.z = failure ? 0.28 : 0;
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
  const orbitGroup = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (orbitGroup.current && !reduced)
      orbitGroup.current.rotation.y += Math.min(delta, 0.05) * 0.07;
  });
  const data = telemetry(run.design, run.result, time),
    failed = run.result.events.some(
      (e) => e.kind === "failure" && e.at <= time,
    ),
    orbital = time >= 13 && !failed;
  return (
    <>
      <color attach="background" args={[orbital ? "#020611" : "#071525"]} />
      <ambientLight intensity={orbital ? 1.5 : 0.9} />
      <hemisphereLight args={["#b4d5eb", "#203c46", 2]} />
      <directionalLight position={[4, 12, 4]} intensity={4} color="#ffe3c7" />
      {orbital ? (
        <>
          <SpaceParticles count={low ? 100 : 450} motion={!reduced} />
          <Planet
            kind={
              run.design.missionId === "sun" ? "earth" : run.design.missionId
            }
            radius={4.1}
            position={[-0.6, -1, -2]}
            quality={!low}
            motion={!reduced}
          />
          <OrbitRing radius={6.4} rotation={[0.9, 0.2, 0.2]} />
          <group ref={orbitGroup}>
            {Array.from({ length: data.fleet }, (_, i) => (
              <group
                key={i}
                position={[-2 + i * 1.7, 3 + Math.sin(i) * 0.4, 3 - i * 0.5]}
                rotation={[0.3, 0.3 + i, 0]}
              >
                <SpacecraftModel
                  design={run.design}
                  reduced
                  scale={data.fleet === 4 ? 0.35 : 0.65}
                />
              </group>
            ))}
          </group>
          {data.phase?.severity === "warning" && (
            <pointLight position={[0, 5, 3]} color="#ff8d42" intensity={15} />
          )}
        </>
      ) : (
        <>
          <fog attach="fog" args={["#122337", 25, 80]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
            <planeGeometry args={[160, 160]} />
            <meshStandardMaterial color="#253e47" roughness={0.93} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[4, 4, 0.3, 48]} />
            <meshStandardMaterial
              color="#697780"
              metalness={0.4}
              roughness={0.65}
            />
          </mesh>
          <Rocket time={time} run={run} reduced={reduced} />
          {!failed && <ExhaustCloud time={time} low={low} reduced={reduced} />}
          <group position={[-2, 0, -1]}>
            {[0, 1, 2, 3, 4, 5, 6].map((y) => (
              <group key={y} position={[0, y * 1.1, 0]}>
                <mesh>
                  <boxGeometry args={[1.1, 0.12, 1]} />
                  <meshStandardMaterial
                    color="#78828a"
                    metalness={0.7}
                    roughness={0.5}
                  />
                </mesh>
                {[-0.48, 0.48].map((x) => (
                  <mesh key={x} position={[x, 0.5, 0]}>
                    <boxGeometry args={[0.1, 1.1, 0.8]} />
                    <meshStandardMaterial
                      color="#4d5e70"
                      metalness={0.6}
                      roughness={0.5}
                    />
                  </mesh>
                ))}
              </group>
            ))}
            <mesh position={[1.2, 5, 0]}>
              <boxGeometry args={[1.4, 0.12, 0.15]} />
              <meshStandardMaterial color="#738595" />
            </mesh>
          </group>
          {[-7, 7].map((x) => (
            <mesh key={x} position={[x, 1.5, -5]}>
              <boxGeometry args={[3, 3, 6]} />
              <meshStandardMaterial
                color="#52616b"
                metalness={0.3}
                roughness={0.8}
              />
            </mesh>
          ))}
          {time >= 2 && time < 8 && !failed && (
            <pointLight
              position={[0, Math.min(12, (time - 3) * 1.15), 0]}
              color="#ff9145"
              intensity={35}
              distance={12}
            />
          )}
          <Planet
            kind="earth"
            radius={30}
            position={[4, -35, -40]}
            quality={!low}
            motion={false}
          />
          {failed && (
            <group position={[0, 7, 0]}>
              <mesh>
                <sphereGeometry args={[1.4, 24, 16]} />
                <meshBasicMaterial color="#ff7731" transparent opacity={0.8} />
              </mesh>
              <mesh scale={1.8}>
                <sphereGeometry args={[1.4, 16, 12]} />
                <meshBasicMaterial
                  color="#8f3325"
                  wireframe
                  transparent
                  opacity={0.3}
                />
              </mesh>
            </group>
          )}
        </>
      )}
    </>
  );
}
