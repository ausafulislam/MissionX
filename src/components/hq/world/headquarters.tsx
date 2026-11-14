"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Design, SavedRun } from "@/game/types";
import { STARTERS } from "@/game/data/catalog";
import { STATIONS, type Station } from "../types";
import {
  Architecture,
  PanelDisplay,
  Pedestal,
  SpaceParticles,
  StationDesk,
} from "./architecture";
import { OrbitRing, Planet } from "./planet";
import { SpacecraftModel } from "./spacecraft-model";
function Hologram({ motion }: { motion: boolean }) {
  const ring = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (motion && ring.current) ring.current.rotation.y += dt * 0.15;
  });
  return (
    <group>
      <Pedestal radius={2.7} height={0.55} accent="#82b9d2" />
      <Planet
        kind="earth"
        radius={1.65}
        position={[0, 3, 0]}
        motion={motion}
        quality
      />
      <group position={[0, 3, 0]} ref={ring}>
        <OrbitRing radius={2.15} rotation={[0.5, 0, 0.2]} />
        <OrbitRing radius={2.45} rotation={[1.2, 0.1, -0.5]} color="#ff9b63" />
        <group position={[2.15, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.13, 0.15, 0.13]} />
            <meshBasicMaterial color="#ffae6b" />
          </mesh>
          <mesh rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.5, 0.02, 0.15]} />
            <meshStandardMaterial
              color="#5482a9"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[1.5, 0.25, 1.5, 48, 1, true]} />
        <meshBasicMaterial
          color="#5aadd1"
          transparent
          opacity={0.035}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
export function Headquarters({
  station,
  design,
  run,
  low,
  reduced,
  onStation,
  onMission,
  inspect,
}: {
  station: Station;
  design: Design;
  run: SavedRun | null;
  low: boolean;
  reduced: boolean;
  onStation: (s: Station) => void;
  onMission: (id: Design["missionId"]) => void;
  inspect: (id: string) => void;
}) {
  return (
    <>
      <color attach="background" args={["#030810"]} />
      <fog attach="fog" args={["#071322", 28, 100]} />
      <ambientLight intensity={1.2} color="#b6c9df" />
      <hemisphereLight args={["#97bddd", "#1e2e42", 2]} />
      <directionalLight position={[1, 10, -14]} intensity={4} color="#cee8fa" />
      <directionalLight position={[4, 7, 8]} intensity={2.5} color="#d5deef" />
      <pointLight
        position={[0, 3, 0]}
        intensity={20}
        distance={12}
        color="#74b9dc"
      />
      <pointLight
        position={[7, 4, -4]}
        intensity={station === "engineering" ? 28 : 8}
        distance={12}
        color="#bed6ef"
      />
      <pointLight
        position={[-7, 4, -4]}
        intensity={18}
        distance={10}
        color="#68adca"
      />
      <pointLight
        position={[7, 3, 4]}
        intensity={12}
        distance={10}
        color="#ff9d66"
      />
      <Architecture low={low} />
      <SpaceParticles count={low ? 90 : 260} motion={!reduced} />
      <Planet
        kind="earth"
        radius={14}
        position={[0, -3, -37]}
        quality={!low}
        motion={!reduced}
      />
      <group position={[0, 0, -1]}>
        <Hologram motion={!reduced} />
      </group>
      <group position={[7, 0, -4]}>
        <Pedestal radius={2.2} height={0.6} />
        <group position={[0, 2.1, 0]} rotation={[0.13, -0.4, 0]}>
          <SpacecraftModel
            design={design}
            reduced={reduced}
            scale={0.95}
            inspect={inspect}
          />
        </group>
        <group position={[0, 0, -2.6]}>
          <StationDesk label="SPACECRAFT ENGINEERING" />
        </group>
        <mesh position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.7, 1.72, 64]} />
          <meshBasicMaterial color="#70aabb" transparent opacity={0.7} />
        </mesh>
      </group>
      <group position={[-7, 0, -4]}>
        <Pedestal radius={2.5} height={0.55} accent="#73c9de" />
        {(["moon", "sun", "mars"] as const).map((id, i) => (
          <group key={id} position={[(i - 1) * 1.7, 2.1, 0]}>
            <Planet
              kind={id}
              radius={design.missionId === id ? 0.8 : 0.57}
              motion={!reduced}
              quality={!low}
              onClick={() => onMission(id)}
            />
            <group rotation={[0.5, 0, 0.2]}>
              <OrbitRing
                radius={id === design.missionId ? 1.03 : 0.8}
                color={id === design.missionId ? "#ff9b63" : "#557b8e"}
              />
            </group>
          </group>
        ))}
        <group position={[0, 0, -2.8]}>
          <StationDesk label="MISSION TRAJECTORIES" />
        </group>
      </group>
      <group position={[7, 0, 4]} rotation={[0, -0.5, 0]}>
        <StationDesk label="LAUNCH SYSTEMS" />
        <group position={[0, 2.6, -0.8]}>
          <PanelDisplay
            label="PREFLIGHT VERIFICATION"
            width={3.3}
            height={1.8}
          />
        </group>
        <group position={[2.2, 0.1, 0]}>
          <Pedestal radius={0.6} height={0.4} />
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 2, 16]} />
            <meshStandardMaterial
              color="#d2d6d3"
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, 2.65, 0]}>
            <coneGeometry args={[0.13, 0.3, 16]} />
            <meshStandardMaterial
              color="#e1e0d4"
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>
      <group position={[-7, 0, 4]} rotation={[0, 0.5, 0]}>
        <StationDesk label="SCIENCE OPERATIONS" />
        <group position={[0, 2.8, -0.9]}>
          <PanelDisplay
            label={
              run
                ? `SCIENCE RETURN / ${run.result.science}`
                : "AWAITING SCIENCE DATA"
            }
            width={3.8}
            height={1.9}
            color="#80d5bb"
          />
        </group>
        {[
          run?.result.scienceScore ?? 24,
          run?.result.engineeringScore ?? 48,
          run?.result.efficiencyScore ?? 34,
        ].map((value, i) => (
          <mesh key={i} position={[-1 + i, 0.8 + value / 100, 1]}>
            <boxGeometry args={[0.28, value / 50, 0.28]} />
            <meshStandardMaterial
              color={i === 0 ? "#ff9454" : "#7ab5c9"}
              emissive={i === 0 ? "#a84820" : "#1e5368"}
              emissiveIntensity={0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
      <group position={[0, 0, 8]} rotation={[0, Math.PI, 0]}>
        <StationDesk label="FLIGHT ARCHIVE" />
        <group position={[0, 2.8, 0]}>
          <SpacecraftModel
            design={{ ...design, partIds: STARTERS[design.missionId] }}
            reduced={reduced}
            scale={0.45}
          />
        </group>
      </group>
      {STATIONS.map((s) => (
        <group key={s.id} position={[s.position[0], 0.05, s.position[2]]}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onStation(s.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "";
            }}
          >
            <ringGeometry args={[2.65, 2.86, 64]} />
            <meshBasicMaterial
              color={station === s.id ? "#ff8848" : "#457486"}
              transparent
              opacity={station === s.id ? 0.9 : 0.35}
            />
          </mesh>
          {(station === "command" || station === "menu") && (
            <group
              position={[0, 3.5, 0]}
              rotation={[
                0,
                s.position[0] > 0 ? -0.7 : s.position[0] < 0 ? 0.7 : Math.PI,
                0,
              ]}
              onClick={(e) => {
                e.stopPropagation();
                onStation(s.id);
              }}
            >
              <PanelDisplay
                label={s.name}
                width={2.8}
                height={0.65}
                color="#ffac79"
              />
            </group>
          )}
        </group>
      ))}
    </>
  );
}
