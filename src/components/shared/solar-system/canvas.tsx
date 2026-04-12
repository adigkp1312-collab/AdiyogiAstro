"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

import { SceneContent, type SceneContentProps } from "./scene";

export interface SolarSystemCanvasProps extends SceneContentProps {
  autoRotate: boolean;
  cameraDistance: number;
}

/**
 * The actual Three.js canvas. Kept in its own file so the parent can
 * `next/dynamic` import it with `ssr: false` — Three.js touches `window`
 * during module init which would otherwise blow up during SSR.
 */
export default function SolarSystemCanvas({
  speed,
  showOrbits,
  showLabels,
  autoRotate,
  cameraDistance,
}: SolarSystemCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, cameraDistance * 0.5, cameraDistance],
        fov: 50,
        near: 0.1,
        far: 2000,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <color attach="background" args={["#03020a"]} />

      {/* Starfield background — drei's Stars is a big instanced sphere. */}
      <Stars
        radius={400}
        depth={80}
        count={8000}
        factor={4}
        saturation={0}
        fade
        speed={0.4}
      />

      <SceneContent speed={speed} showOrbits={showOrbits} showLabels={showLabels} />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={4}
        maxDistance={400}
        autoRotate={autoRotate}
        autoRotateSpeed={0.3}
        makeDefault
      />

      {/* Bloom makes the emissive Sun bleed light. Low threshold because our
          only emissive object is the Sun (and its corona shell). */}
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1.4}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
}
