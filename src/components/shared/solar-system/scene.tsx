"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

import { keplerPosition, sampleOrbit } from "./kepler";
import { MOON, PLANETS, SUN, type PlanetData } from "./planet-data";

type TimeRef = MutableRefObject<number>;

/* ------------------------------------------------------------------ */
/*  Sun                                                                */
/* ------------------------------------------------------------------ */

function Sun({ timeRef }: { timeRef: TimeRef }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationRate = (2 * Math.PI) / SUN.rotationPeriod;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = timeRef.current * rotationRate;
    }
  });

  return (
    <group>
      {/* The main Sun body — emissive so Bloom post-processing lights it up. */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN.displayRadius, 64, 64]} />
        <meshStandardMaterial
          color={SUN.color}
          emissive={SUN.emissive}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
      {/* Soft corona — a larger, additive-blended sphere shell. */}
      <mesh>
        <sphereGeometry args={[SUN.displayRadius * 1.35, 32, 32]} />
        <meshBasicMaterial
          color={SUN.emissive}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* The physical light source. A point light with gentle falloff so
          outer planets aren't completely black. */}
      <pointLight
        color="#fff4d6"
        intensity={3.5}
        distance={0}
        decay={0}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbit path (static ellipse)                                        */
/* ------------------------------------------------------------------ */

function OrbitPath({ planet }: { planet: PlanetData }) {
  const points = useMemo(() => {
    const pts = sampleOrbit(planet.orbit, 256);
    return pts.map((p) => new THREE.Vector3(p.x, p.y, p.z));
  }, [planet.orbit]);

  return (
    <Line
      points={points}
      color="#6b7a9a"
      lineWidth={0.6}
      transparent
      opacity={0.35}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Saturn's rings                                                     */
/* ------------------------------------------------------------------ */

function SaturnRings({ planet }: { planet: PlanetData }) {
  if (!planet.rings) return null;
  const { innerRadius, outerRadius, color, opacity } = planet.rings;
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <ringGeometry args={[innerRadius, outerRadius, 96]} />
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Earth's Moon                                                       */
/* ------------------------------------------------------------------ */

function Moon({ timeRef }: { timeRef: TimeRef }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const t = timeRef.current;
    const angle = (2 * Math.PI * t) / MOON.period;
    // Circular orbit in a plane tilted by MOON.inclination.
    const x = Math.cos(angle) * MOON.localRadius;
    const z = Math.sin(angle) * MOON.localRadius;
    const y = Math.sin(angle) * MOON.localRadius * Math.sin(MOON.inclination);
    ref.current.position.set(x, y, z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[MOON.displayRadius, 24, 24]} />
      <meshStandardMaterial color={MOON.color} roughness={1} metalness={0} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Planet                                                             */
/* ------------------------------------------------------------------ */

function Planet({
  planet,
  timeRef,
  showLabels,
}: {
  planet: PlanetData;
  timeRef: TimeRef;
  showLabels: boolean;
}) {
  // Outer group: orbital position (Kepler).
  // Inner "body" group: axial tilt (applied once) + self-rotation (every frame).
  const orbitGroupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  const spinRate = (2 * Math.PI) / planet.rotationPeriod;

  useFrame(() => {
    const t = timeRef.current;
    // Orbit position from Kepler's equation.
    const p = keplerPosition(planet.orbit, t);
    if (orbitGroupRef.current) {
      orbitGroupRef.current.position.set(p.x, p.y, p.z);
    }
    // Self-rotation — sign of period handles retrograde bodies automatically.
    if (spinRef.current) {
      spinRef.current.rotation.y = t * spinRate;
    }
  });

  return (
    <group ref={orbitGroupRef}>
      {/* Axial tilt applied to everything that rotates with the body
          (the sphere AND the rings — Saturn's rings are in the equatorial plane). */}
      <group rotation-z={planet.axialTilt}>
        <group ref={spinRef}>
          <mesh>
            <sphereGeometry args={[planet.displayRadius, 48, 48]} />
            <meshStandardMaterial
              color={planet.color}
              emissive={planet.emissive ?? "#000000"}
              emissiveIntensity={planet.emissive ? 0.25 : 0}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
          <SaturnRings planet={planet} />
        </group>
      </group>

      {/* Earth gets a moon. The moon is outside the tilt group so it orbits
          in the ecliptic plane, not Earth's equatorial plane — which matches
          reality (the Moon orbits near the ecliptic, not Earth's equator). */}
      {planet.id === "earth" && <Moon timeRef={timeRef} />}

      {showLabels && (
        <Html
          center
          distanceFactor={18}
          position={[0, planet.displayRadius + 0.4, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="whitespace-nowrap rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm">
            {planet.name}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Main scene content                                                 */
/* ------------------------------------------------------------------ */

export interface SceneContentProps {
  speed: number;
  showOrbits: boolean;
  showLabels: boolean;
}

export function SceneContent({ speed, showOrbits, showLabels }: SceneContentProps) {
  // Simulation time in "years". We accumulate delta * speed every frame so
  // that changing `speed` mid-simulation smoothly accelerates from the
  // current state instead of teleporting the planets.
  const timeRef = useRef(0);
  const speedRef = useRef(speed);

  // Sync speedRef in an effect so the render function stays pure.
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Priority -1 so this runs BEFORE the planet useFrames that read timeRef.
  useFrame((_, delta) => {
    timeRef.current += delta * speedRef.current;
  }, -1);

  return (
    <>
      {/* Very soft ambient so the dark side of planets keeps a hint of colour. */}
      <ambientLight intensity={0.04} />
      <Sun timeRef={timeRef} />

      {showOrbits &&
        PLANETS.map((planet) => <OrbitPath key={`${planet.id}-orbit`} planet={planet} />)}

      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          timeRef={timeRef}
          showLabels={showLabels}
        />
      ))}
    </>
  );
}
