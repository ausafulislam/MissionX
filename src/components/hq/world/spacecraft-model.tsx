"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PARTS } from "@/game/data/catalog";
import type { Category, Design } from "@/game/types";
const anchor: Record<Category, [number, number, number]> = {
  structure: [0, 0, 0],
  power: [0, 0, 0],
  battery: [0, -0.7, 0],
  communications: [0, 0.8, 0],
  computer: [0, 0.1, 0.6],
  attitude: [0, -0.3, 0],
  camera: [0.45, -0.25, 0.6],
  science: [-0.45, 0.35, 0.5],
};
function SolarWing() {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.4, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.65, 0.06, 1.15]} />
            <meshStandardMaterial
              color="#75929c"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          {Array.from({ length: 6 }, (_, i) => (
            <group key={i} position={[-0.69 + i * 0.275, 0.036, 0]}>
              {Array.from({ length: 4 }, (_, j) => (
                <mesh
                  key={j}
                  position={[0, 0, -0.44 + j * 0.29]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <planeGeometry args={[0.25, 0.265]} />
                  <meshStandardMaterial
                    color={j % 2 ? "#173e68" : "#22527d"}
                    metalness={0.72}
                    roughness={0.24}
                  />
                </mesh>
              ))}
            </group>
          ))}
          <mesh position={[-side * 0.93, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.35, 8]} />
            <meshStandardMaterial
              color="#b1bac1"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
export function PartGeometry({
  category,
  variant = "",
}: {
  category: Category;
  variant?: string;
}) {
  const gold = (
    <meshStandardMaterial color="#c5a664" metalness={0.78} roughness={0.37} />
  );
  if (category === "structure")
    return (
      <group>
        <mesh>
          <boxGeometry args={[0.94, 1.2, 0.92]} />
          {gold}
        </mesh>
        {[-0.47, 0.47].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.025, 1.23, 0.96]} />
              <meshStandardMaterial
                color="#e0d9c2"
                metalness={0.7}
                roughness={0.25}
              />
            </mesh>
          </group>
        ))}
        {[-0.45, 0.45].map((z) => (
          <mesh key={z} position={[0, 0, z]}>
            <boxGeometry args={[0.97, 0.025, 0.025]} />
            <meshStandardMaterial
              color="#eee3c7"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.04, 8]} />
          <meshStandardMaterial
            color="#646c76"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </group>
    );
  if (category === "power")
    return (
      <group
        scale={
          variant === "solar-deep" ? 1.3 : variant === "solar-wide" ? 1.12 : 1
        }
      >
        <SolarWing />
      </group>
    );
  if (category === "communications")
    return (
      <group>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.45, 8]} />
          <meshStandardMaterial
            color="#c9d6da"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.46, 0]} rotation={[0.25, 0, 0]}>
          <sphereGeometry args={[0.51, 32, 16, 0, Math.PI * 2, 0, 0.85]} />
          <meshStandardMaterial
            color="#d2d9d6"
            metalness={0.6}
            roughness={0.24}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.65, 0.02]}>
          <cylinderGeometry args={[0.018, 0.018, 0.4, 8]} />
          <meshStandardMaterial color="#f5f1e4" />
        </mesh>
      </group>
    );
  if (category === "battery")
    return (
      <group>
        {[-0.22, 0, 0.22].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.6, 12]} />
            <meshStandardMaterial
              color="#677982"
              metalness={0.7}
              roughness={0.38}
            />
          </mesh>
        ))}
      </group>
    );
  if (category === "camera")
    return (
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.19, 0.22, 0.5, 20]} />
          <meshStandardMaterial
            color="#707f8e"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.26, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.012, 24]} />
          <meshPhysicalMaterial
            color="#1c647d"
            metalness={0.8}
            roughness={0.07}
            clearcoat={1}
          />
        </mesh>
      </group>
    );
  if (category === "science")
    return (
      <group>
        <mesh rotation={[0, 0, -0.5]} position={[-0.2, 0.3, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
          <meshStandardMaterial
            color="#d4d9d8"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-0.4, 0.66, 0]}>
          <boxGeometry args={[0.22, 0.18, 0.28]} />
          <meshStandardMaterial
            color="#e0c18c"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[0.28, 0.3, 0.2]} />
          {gold}
        </mesh>
      </group>
    );
  if (category === "computer")
    return (
      <group>
        <mesh>
          <boxGeometry args={[0.44, 0.29, 0.09]} />
          <meshStandardMaterial
            color="#354d4b"
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>
        {[-0.12, 0, 0.12].map((x) => (
          <mesh key={x} position={[x, 0, 0.055]}>
            <boxGeometry args={[0.07, 0.17, 0.03]} />
            <meshStandardMaterial
              color="#b4b7ae"
              metalness={0.5}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>
    );
  return (
    <group>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.52, 0, 0]} rotation={[0, 0, s * 0.4]}>
          <cylinderGeometry args={[0.1, 0.18, 0.25, 12]} />
          <meshStandardMaterial
            color="#8a939a"
            metalness={0.9}
            roughness={0.24}
          />
        </mesh>
      ))}
    </group>
  );
}
function AssemblyPart({
  id,
  installed,
  reduced,
  inspect,
}: {
  id: string;
  installed: boolean;
  reduced: boolean;
  inspect?: (id: string) => void;
}) {
  const ref = useRef<THREE.Group>(null),
    p = PARTS.find((p) => p.id === id)!;
  const target = new THREE.Vector3(...anchor[p.category]);
  const index = PARTS.indexOf(p),
    offset = p.category === "science" ? (index - 16) * 0.16 : 0;
  target.x -= offset;
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const amount = reduced ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) * 6),
      goal = installed
        ? target
        : new THREE.Vector3(
            target.x + (index % 2 ? 3.8 : -3.8),
            target.y + 1.7,
            target.z - 1,
          );
    g.position.lerp(goal, amount);
    const scale = installed ? 1 : 0;
    g.scale.lerp(new THREE.Vector3(scale, scale, scale), amount);
    g.visible = installed || g.scale.x > 0.008;
  });
  return (
    <group
      ref={ref}
      position={reduced ? target : [target.x + 3, 2, target.z]}
      scale={0}
      onClick={(e) => {
        if (installed && inspect) {
          e.stopPropagation();
          inspect(id);
        }
      }}
    >
      <PartGeometry category={p.category} variant={id} />
    </group>
  );
}
export function SpacecraftModel({
  design,
  reduced = false,
  scale = 1,
  inspect,
}: {
  design: Design;
  reduced?: boolean;
  scale?: number;
  inspect?: (id: string) => void;
}) {
  return (
    <group scale={scale}>
      {PARTS.map((p) => (
        <AssemblyPart
          key={p.id}
          id={p.id}
          installed={design.partIds.includes(p.id)}
          reduced={reduced}
          inspect={inspect}
        />
      ))}
    </group>
  );
}
