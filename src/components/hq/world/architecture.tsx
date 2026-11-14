"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
export function PanelDisplay({
  label = "MISSION CONTROL",
  color = "#79b9ce",
  width = 2.5,
  height = 1.4,
}: {
  label?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#081421";
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = "#385a70";
    ctx.lineWidth = 1;
    for (let x = 0; x < 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
    for (let y = 0; y < 256; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }
    ctx.fillStyle = color;
    ctx.font = "bold 22px monospace";
    ctx.fillText(label, 22, 35);
    ctx.font = "11px monospace";
    ctx.fillStyle = "#a1b8c5";
    ctx.fillText("MISSIONX / ORBITAL SYSTEMS", 22, 58);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 20; x < 490; x += 5) {
      const y = 145 + Math.sin(x * 0.035) * 28 + Math.sin(x * 0.1) * 8;
      if (x === 20) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "#ff6a2b";
    ctx.beginPath();
    ctx.arc(404, 101, 26, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 3 ? "#44687d" : "#dc8148";
      ctx.fillRect(22 + i * 59, 211, 40, 4 + (i % 4) * 6);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [label, color]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <group>
      <RoundedBox
        args={[width + 0.12, height + 0.12, 0.1]}
        radius={0.06}
        smoothness={2}
      >
        <meshStandardMaterial color="#26384a" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}
export function Pedestal({
  radius = 2.2,
  height = 0.45,
  accent = "#ff6a2b",
}: {
  radius?: number;
  height?: number;
  accent?: string;
}) {
  return (
    <group>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius * 1.06, height, 64]} />
        <meshStandardMaterial
          color="#1b2939"
          metalness={0.82}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, height + 0.025, 0]}>
        <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.04, 64]} />
        <meshStandardMaterial
          color="#102137"
          metalness={0.75}
          roughness={0.23}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height - 0.06, 0]}>
        <torusGeometry args={[radius + 0.015, 0.018, 8, 96]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  );
}
export function StationDesk({ label }: { label: string }) {
  return (
    <group>
      <RoundedBox
        args={[3.4, 0.23, 1.5]}
        radius={0.13}
        smoothness={3}
        position={[0, 1.1, 0]}
      >
        <meshStandardMaterial
          color="#384a5b"
          metalness={0.75}
          roughness={0.34}
        />
      </RoundedBox>
      {[-1.35, 1.35].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]}>
          <boxGeometry args={[0.3, 1, 0.9]} />
          <meshStandardMaterial
            color="#182434"
            metalness={0.65}
            roughness={0.45}
          />
        </mesh>
      ))}
      <group rotation={[-0.4, 0, 0]} position={[0, 1.6, -0.35]}>
        <PanelDisplay label={label} width={2.8} height={1.1} />
      </group>
      <mesh position={[0, 1.23, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 0.22]} />
        <meshBasicMaterial color="#6da2b1" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
export function Architecture({ low = false }: { low?: boolean }) {
  const lights = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    if (!lights.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      dummy.position.set(Math.sin(angle) * 10.8, 0.025, Math.cos(angle) * 10.8);
      dummy.rotation.y = angle;
      dummy.updateMatrix();
      lights.current.setMatrixAt(i, dummy.matrix);
    }
    lights.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <group>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[15, 15, 0.6, 96]} />
        <meshStandardMaterial
          color="#162230"
          metalness={0.7}
          roughness={0.31}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[3.7, 3.73, 96]} />
        <meshBasicMaterial color="#4d667a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <ringGeometry args={[11.8, 11.85, 96]} />
        <meshBasicMaterial color="#84b4bd" />
      </mesh>
      <instancedMesh ref={lights} args={[undefined, undefined, 24]}>
        <boxGeometry args={[0.06, 0.025, 0.7]} />
        <meshBasicMaterial color="#a4c3cd" />
      </instancedMesh>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, a, 0]}>
            <mesh position={[0, 0, 9.2]}>
              <boxGeometry args={[0.022, 0.018, 5.8]} />
              <meshStandardMaterial
                color="#526473"
                metalness={0.8}
                roughness={0.4}
              />
            </mesh>
            <group position={[0, 0, 13.7]}>
              <mesh position={[0, 3.1, 0]} rotation={[0.13, 0, 0]}>
                <boxGeometry args={[0.32, 6.7, 0.6]} />
                <meshStandardMaterial
                  color="#536271"
                  metalness={0.72}
                  roughness={0.38}
                />
              </mesh>
              <mesh position={[0, 3.8, 0.34]} rotation={[0.13, 0, 0]}>
                <boxGeometry args={[0.045, 4.8, 0.025]} />
                <meshBasicMaterial
                  color={i % 3 === 0 ? "#ff9050" : "#b7d4dc"}
                />
              </mesh>
              <mesh
                position={[0, 6.1, -2]}
                rotation={[Math.PI / 2 + 0.14, 0, 0]}
              >
                <boxGeometry args={[0.32, 5.2, 0.45]} />
                <meshStandardMaterial
                  color="#485a6b"
                  metalness={0.7}
                  roughness={0.38}
                />
              </mesh>
              <mesh
                position={[0, 6.03, -2]}
                rotation={[Math.PI / 2 + 0.14, 0, 0]}
              >
                <boxGeometry args={[0.07, 4.3, 0.48]} />
                <meshBasicMaterial color="#789dab" />
              </mesh>
            </group>
          </group>
        );
      })}
      <mesh position={[0, 6.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11.3, 0.35, 8, 64]} />
        <meshStandardMaterial color="#26374a" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10.8, 0.035, 8, 96]} />
        <meshBasicMaterial color="#9dbcc9" />
      </mesh>
      <mesh position={[0, 5.1, -13.5]}>
        <boxGeometry args={[26, 0.35, 0.4]} />
        <meshStandardMaterial color="#2e4356" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.6, -14.1]}>
        <planeGeometry args={[27, 6]} />
        <meshPhysicalMaterial
          color="#78b1d0"
          transparent
          opacity={0.045}
          roughness={0.1}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {!low &&
        [-12.8, 12.8].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.65, 0]}>
              <boxGeometry args={[0.09, 0.08, 18]} />
              <meshStandardMaterial
                color="#8a9ca6"
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
            {[-7, -3, 1, 5, 9].map((z) => (
              <mesh key={z} position={[0, 0.3, z]}>
                <boxGeometry args={[0.08, 0.65, 0.08]} />
                <meshStandardMaterial
                  color="#6c7e8c"
                  metalness={0.8}
                  roughness={0.3}
                />
              </mesh>
            ))}
          </group>
        ))}
    </group>
  );
}
export function SpaceParticles({
  count = 180,
  motion = true,
}: {
  count?: number;
  motion?: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = Math.sin(i * 127.1) * 60;
      a[i * 3 + 1] = Math.cos(i * 31.17) * 30;
      a[i * 3 + 2] = -25 - Math.abs(Math.sin(i * 73.7)) * 45;
    }
    return a;
  }, [count]);
  useFrame((_, delta) => {
    if (motion && ref.current) ref.current.rotation.z += delta * 0.002;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#bfd6e8"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
