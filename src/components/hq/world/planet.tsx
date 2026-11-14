"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
type PlanetKind = "earth" | "moon" | "sun" | "mars";
function planetTexture(kind: PlanetKind, quality: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = quality ? 1024 : 512;
  canvas.height = canvas.width / 2;
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width,
    h = canvas.height;
  let seed = kind === "earth" ? 47 : 81;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  ctx.fillStyle =
    kind === "earth"
      ? "#123451"
      : kind === "moon"
        ? "#8a8b89"
        : kind === "mars"
          ? "#ad6645"
          : "#f99825";
  ctx.fillRect(0, 0, w, h);
  if (kind === "earth") {
    const continents = [
      [
        [0.08, 0.2],
        [0.17, 0.12],
        [0.25, 0.16],
        [0.29, 0.27],
        [0.23, 0.36],
        [0.19, 0.47],
        [0.13, 0.4],
        [0.11, 0.29],
      ],
      [
        [0.22, 0.48],
        [0.3, 0.51],
        [0.33, 0.61],
        [0.3, 0.76],
        [0.25, 0.88],
        [0.22, 0.69],
      ],
      [
        [0.46, 0.22],
        [0.52, 0.15],
        [0.6, 0.2],
        [0.66, 0.13],
        [0.82, 0.2],
        [0.92, 0.31],
        [0.85, 0.43],
        [0.73, 0.37],
        [0.69, 0.5],
        [0.63, 0.39],
        [0.56, 0.36],
        [0.5, 0.33],
      ],
      [
        [0.46, 0.37],
        [0.55, 0.39],
        [0.59, 0.51],
        [0.55, 0.69],
        [0.51, 0.76],
        [0.46, 0.59],
        [0.43, 0.48],
      ],
      [
        [0.79, 0.68],
        [0.86, 0.63],
        [0.9, 0.72],
        [0.86, 0.8],
        [0.8, 0.79],
      ],
      [
        [0.31, 0.06],
        [0.39, 0.07],
        [0.36, 0.23],
        [0.31, 0.19],
      ],
    ];
    continents.forEach((points, i) => {
      ctx.fillStyle = i === 5 ? "#b9d2d1" : i % 2 ? "#657b66" : "#759a85";
      ctx.beginPath();
      points.forEach(([x, y], j) =>
        j ? ctx.lineTo(x * w, y * h) : ctx.moveTo(x * w, y * h),
      );
      ctx.closePath();
      ctx.fill();
    });
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = `rgba(230,246,249,${random() * 0.25})`;
      ctx.beginPath();
      ctx.ellipse(
        random() * w,
        random() * h,
        random() * w * 0.04 + w * 0.006,
        random() * h * 0.006 + 1,
        -0.2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.fillStyle = "#d0e2e1";
    ctx.fillRect(0, 0, w, h * 0.035);
    ctx.fillRect(0, h * 0.95, w, h * 0.05);
  } else
    for (let i = 0; i < (kind === "sun" ? 900 : 1600); i++) {
      const x = random() * w,
        y = random() * h,
        r = random() * (kind === "moon" ? 11 : 22) + 1;
      ctx.fillStyle =
        kind === "moon"
          ? `rgba(${random() > 0.5 ? "18,22,26" : "225,224,209"},${random() * 0.22})`
          : kind === "mars"
            ? `rgba(${random() > 0.4 ? "50,25,21" : "220,165,104"},${random() * 0.18})`
            : `rgba(255,${Math.floor(80 + random() * 140)},10,${random() * 0.2})`;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      if (kind === "moon") {
        ctx.strokeStyle = "#e2e3d344";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
export function Planet({
  kind = "earth",
  radius = 1,
  position = [0, 0, 0],
  quality = false,
  motion = true,
  onClick,
}: {
  kind?: PlanetKind;
  radius?: number;
  position?: [number, number, number];
  quality?: boolean;
  motion?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<THREE.Group>(null),
    texture = useMemo(() => planetTexture(kind, quality), [kind, quality]);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame((_, delta) => {
    if (ref.current && motion)
      ref.current.rotation.y += Math.min(delta, 0.05) * 0.035;
  });
  return (
    <group position={position}>
      <group ref={ref} rotation={[0.12, 0, -0.18]}>
        <mesh
          onClick={(e) => {
            if (onClick) {
              e.stopPropagation();
              onClick();
            }
          }}
        >
          <sphereGeometry
            args={[radius, quality ? 64 : 40, quality ? 40 : 24]}
          />
          {kind === "sun" ? (
            <meshBasicMaterial map={texture} color="#ffce78" />
          ) : (
            <meshStandardMaterial
              map={texture}
              bumpMap={kind === "earth" ? undefined : texture}
              bumpScale={kind === "moon" ? 0.045 : 0.02}
              roughness={kind === "earth" ? 0.66 : 0.92}
              metalness={kind === "earth" ? 0.18 : 0}
            />
          )}
        </mesh>
      </group>
      {(kind === "earth" || kind === "sun") && (
        <mesh scale={1.045}>
          <sphereGeometry args={[radius, 40, 24]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            uniforms={{
              tint: {
                value: new THREE.Color(
                  kind === "earth" ? "#408acc" : "#ff8f32",
                ),
              },
            }}
            vertexShader="varying vec3 n; void main(){n=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}"
            fragmentShader="uniform vec3 tint; varying vec3 n; void main(){float f=pow(1.0-abs(dot(normalize(n),vec3(0.,0.,1.))),2.5); gl_FragColor=vec4(tint,f*.55);}"
          />
        </mesh>
      )}
    </group>
  );
}
export function OrbitRing({
  radius = 2,
  color = "#6bafce",
  rotation = [0, 0, 0],
}: {
  radius?: number;
  color?: string;
  rotation?: [number, number, number];
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 6, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}
