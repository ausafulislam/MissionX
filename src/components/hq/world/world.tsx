"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { OrbitControls as Controls } from "three-stdlib";
import * as THREE from "three";
import type { Design, SavedRun } from "@/game/types";
import type { Station } from "../types";
import { Headquarters } from "./headquarters";
import { journeyGeometry, journeyCamera } from "./journey-geometry";
import { LaunchWorld } from "./launch-world";
export interface WorldProps {
  station: Station;
  design: Design;
  run: SavedRun | null;
  time: number;
  low: boolean;
  reduced: boolean;
  sensitivity: number;
  view: number;
  onStation: (s: Station) => void;
  onMission: (id: Design["missionId"]) => void;
  inspect: (id: string) => void;
  onReady: () => void;
  onFailure: () => void;
}
function CameraDirector({
  station,
  design,
  time,
  view,
  reduced,
  sensitivity,
}: {
  station: Station;
  design: Design;
  time: number;
  view: number;
  reduced: boolean;
  sensitivity: number;
}) {
  const controls = useRef<Controls>(null),
    camera = useThree((s) => s.camera),
    size = useThree((s) => s.size),
    goal = useRef(new THREE.Vector3()),
    target = useRef(new THREE.Vector3()),
    moving = useRef(true);
  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    if (size.height > size.width && station !== "menu" && station !== "command")
      perspective.setViewOffset(
        size.width,
        size.height,
        0,
        size.height * 0.18,
        size.width,
        size.height,
      );
    else perspective.clearViewOffset();
    perspective.updateProjectionMatrix();
  }, [camera, size.width, size.height, station]);
  const orbital = station === "launch" && time >= 13;
  useEffect(() => {
    const index =
      design.missionId === "moon" ? 0 : design.missionId === "sun" ? 1 : 2;
    const positions: Record<Station, [number, number, number]> = {
      menu: [19, 11, 20],
      command: [17, 13, 20],
      planning: [-9 + index * 1.15, 4.5, 3],
      engineering: [13, 5.5, 3],
      verification: [13, 4.5, 12],
      launch: [12, 7 + Math.max(0,time-3)*.6, 15],
      results: [-13, 5.5, 12],
      archive: [1, 4, 16],
    };
    const targets: Record<Station, [number, number, number]> = {
      menu: [-1, 2, -1],
      command: [0, 1, 0],
      planning: [-7.8 + index * 0.9, 1.9, -4],
      engineering: [8, 2, -4],
      verification: [8, 1.7, 4],
      launch: [0, 2.2+Math.max(0,time-3)*1.05, 0],
      results: [-6.5, 2.1, 4],
      archive: [0.8, 2, 8],
    };
    if(station === "launch" && orbital){
      const pose=journeyCamera(journeyGeometry(design.missionId),time,size.width/size.height);
      goal.current.copy(pose.position);target.current.copy(pose.lookAt);
    }else{goal.current.set(...positions[station]);target.current.set(...targets[station]);}
    moving.current = true;
  }, [station, design.missionId, view, orbital, time, size.width, size.height]);
  useFrame((_, delta) => {
    if (!controls.current || !moving.current) return;
    const speed = reduced ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) * 2.7);
    camera.position.lerp(goal.current, speed);
    controls.current.target.lerp(target.current, speed);
    controls.current.update();
    if (
      camera.position.distanceTo(goal.current) < 0.015 &&
      controls.current.target.distanceTo(target.current) < 0.015
    )
      moving.current = false;
  });
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableRotate={station !== "launch"}
      enableZoom={station !== "launch"}
      minDistance={3}
      maxDistance={station === "launch" ? 160 : 38}
      minPolarAngle={0.3}
      maxPolarAngle={1.48}
      rotateSpeed={0.35 * sensitivity}
      zoomSpeed={0.6 * sensitivity}
      enableDamping
      dampingFactor={0.08}
      onStart={() => {
        if(station !== "launch") moving.current = false;
      }}
    />
  );
}
function Lifecycle({
  onReady,
  onFailure,
}: {
  onReady: () => void;
  onFailure: () => void;
}) {
  const gl = useThree((s) => s.gl),
    sent = useRef(false);
  useEffect(() => {
    const lost = (e: Event) => {
      e.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useFrame(() => {
    if (!sent.current) {
      sent.current = true;
      onReady();
    }
  });
  return null;
}
export default function World(props: WorldProps) {
  return (
    <Canvas
      className="hq-canvas"
      camera={{ position: [19, 11, 20], fov: 48, near: 0.1, far: 180 }}
      dpr={props.low ? 1 : [1, 1.5]}
      gl={{
        antialias: !props.low,
        alpha: false,
        powerPreference: props.low ? "low-power" : "high-performance",
      }}
      fallback={
        <div className="world-unavailable">
          3D rendering is unavailable. Station controls remain available.
        </div>
      }
    >
      <Suspense fallback={null}>
        {props.station === "launch" && props.run ? (
          <LaunchWorld
            run={props.run}
            time={props.time}
            low={props.low}
            reduced={props.reduced}
          />
        ) : (
          <Headquarters {...props} />
        )}
        <CameraDirector {...props} />
        <Lifecycle onReady={props.onReady} onFailure={props.onFailure} />
      </Suspense>
    </Canvas>
  );
}
