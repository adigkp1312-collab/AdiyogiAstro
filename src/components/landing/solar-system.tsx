"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// ============================================
// SOLAR SYSTEM PHYSICS & MATHEMATICS
// ============================================
// Kepler's Laws of Planetary Motion:
// 1. Planets orbit in ellipses with the Sun at one focus
// 2. Equal areas in equal times (conservation of angular momentum)
// 3. T² ∝ a³ (orbital period squared ∝ semi-major axis cubed)
//
// Position Calculation:
// M = n(t - t₀)           Mean Anomaly
// M = E - e·sin(E)        Kepler's Equation (Newton-Raphson)
// tan(ν/2) = √((1+e)/(1-e))·tan(E/2)   True Anomaly
// r = a(1 - e·cos(E))     Orbital Radius
// ============================================

type PlanetData = {
  name: string;
  radius: number;
  color: number;
  atmosphereColor: number;
  semiMajorAxis: number;
  eccentricity: number;
  orbitalPeriod: number;
  inclination: number;
  rotationPeriod: number;
  hasMoon?: boolean;
  hasBands?: boolean;
  hasRings?: boolean;
};

type CelestialBodies = {
  sun: {
    name: string;
    radius: number;
    color: number;
    coronaColor: number;
  };
  planets: PlanetData[];
};

const CELESTIAL_BODIES: CelestialBodies = {
  sun: {
    name: "Sun",
    radius: 3.5,
    color: 0xfdb813,
    coronaColor: 0xff6b00,
  },
  planets: [
    {
      name: "Mercury",
      radius: 0.12,
      color: 0xa0a0a0,
      atmosphereColor: 0x888888,
      semiMajorAxis: 6,
      eccentricity: 0.2056,
      orbitalPeriod: 0.241,
      inclination: 7.0,
      rotationPeriod: 58.6,
    },
    {
      name: "Venus",
      radius: 0.22,
      color: 0xe8cda0,
      atmosphereColor: 0xffddaa,
      semiMajorAxis: 8.5,
      eccentricity: 0.0068,
      orbitalPeriod: 0.615,
      inclination: 3.4,
      rotationPeriod: -243,
    },
    {
      name: "Earth",
      radius: 0.25,
      color: 0x4a90d9,
      atmosphereColor: 0x87ceeb,
      semiMajorAxis: 11,
      eccentricity: 0.0167,
      orbitalPeriod: 1.0,
      inclination: 0.0,
      rotationPeriod: 1,
      hasMoon: true,
    },
    {
      name: "Mars",
      radius: 0.18,
      color: 0xcd6839,
      atmosphereColor: 0xe07850,
      semiMajorAxis: 14,
      eccentricity: 0.0934,
      orbitalPeriod: 1.881,
      inclination: 1.85,
      rotationPeriod: 1.03,
    },
    {
      name: "Jupiter",
      radius: 1.1,
      color: 0xd4a574,
      atmosphereColor: 0xe8c090,
      semiMajorAxis: 22,
      eccentricity: 0.0489,
      orbitalPeriod: 11.86,
      inclination: 1.3,
      rotationPeriod: 0.41,
      hasBands: true,
    },
    {
      name: "Saturn",
      radius: 0.95,
      color: 0xf4d59e,
      atmosphereColor: 0xffe4b0,
      semiMajorAxis: 32,
      eccentricity: 0.0565,
      orbitalPeriod: 29.46,
      inclination: 2.49,
      rotationPeriod: 0.45,
      hasRings: true,
    },
    {
      name: "Uranus",
      radius: 0.5,
      color: 0xafdbf5,
      atmosphereColor: 0xc5e5f5,
      semiMajorAxis: 42,
      eccentricity: 0.0457,
      orbitalPeriod: 84.01,
      inclination: 0.77,
      rotationPeriod: -0.72,
    },
    {
      name: "Neptune",
      radius: 0.48,
      color: 0x4b70dd,
      atmosphereColor: 0x6080ee,
      semiMajorAxis: 52,
      eccentricity: 0.0113,
      orbitalPeriod: 164.8,
      inclination: 1.77,
      rotationPeriod: 0.67,
    },
  ],
};

// Newton-Raphson solver for Kepler's equation
function solveKeplerEquation(M: number, e: number, tol = 1e-8): number {
  let E = M;
  for (let i = 0; i < 50; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tol) break;
  }
  return E;
}

// Kepler orbital position
function getOrbitalPosition(
  time: number,
  planet: PlanetData
): { x: number; y: number; z: number } {
  const { semiMajorAxis: a, eccentricity: e, orbitalPeriod: T, inclination } = planet;
  const n = (2 * Math.PI) / T;
  const M = n * time;
  const E = solveKeplerEquation(M, e);
  const nu = 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2)
  );
  const r = a * (1 - e * Math.cos(E));
  const x = r * Math.cos(nu);
  const z = r * Math.sin(nu);
  const incRad = (inclination * Math.PI) / 180;
  return {
    x,
    y: z * Math.sin(incRad),
    z: z * Math.cos(incRad),
  };
}

// Generate orbit ellipse points
function generateOrbitPoints(planet: PlanetData, segments = 180): THREE.Vector3[] {
  const { semiMajorAxis: a, eccentricity: e, inclination } = planet;
  const b = a * Math.sqrt(1 - e * e);
  const c = a * e;
  const points: THREE.Vector3[] = [];
  const incRad = (inclination * Math.PI) / 180;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    const x = a * Math.cos(theta) - c;
    const z = b * Math.sin(theta);
    points.push(new THREE.Vector3(x, z * Math.sin(incRad), z * Math.cos(incRad)));
  }
  return points;
}

// ============================================
// CUSTOM SHADERS
// ============================================

// Sun corona shader - creates realistic solar atmosphere
const sunCoronaVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sunCoronaFragmentShader = `
  uniform float time;
  uniform vec3 coronaColor;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Simplex noise for corona turbulence
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);

    // Animated noise for solar activity
    float noise1 = snoise(vPosition * 0.5 + time * 0.1);
    float noise2 = snoise(vPosition * 1.0 + time * 0.15);
    float noise3 = snoise(vPosition * 2.0 + time * 0.2);
    float combinedNoise = (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75;

    // Corona intensity with noise
    float intensity = fresnel * (0.6 + combinedNoise * 0.4);

    // Color gradient from yellow core to orange/red corona
    vec3 innerColor = vec3(1.0, 0.95, 0.7);
    vec3 outerColor = coronaColor;
    vec3 finalColor = mix(innerColor, outerColor, fresnel);

    gl_FragColor = vec4(finalColor, intensity * 0.8);
  }
`;

// Sun surface shader
const sunSurfaceVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sunSurfaceFragmentShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Noise functions for surface detail
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 8.0;

    // Animated solar granulation
    float n1 = fbm(uv + time * 0.02);
    float n2 = fbm(uv * 1.5 - time * 0.015);
    float n3 = fbm(uv * 0.5 + time * 0.01);

    float pattern = (n1 + n2 * 0.5 + n3 * 0.3) / 1.8;

    // Sunspot-like darker regions
    float spots = smoothstep(0.4, 0.6, fbm(uv * 0.3 + time * 0.005));

    // Color mixing
    vec3 hotColor = vec3(1.0, 0.95, 0.8);
    vec3 warmColor = vec3(1.0, 0.7, 0.3);
    vec3 coolColor = vec3(0.9, 0.4, 0.1);

    vec3 color = mix(warmColor, hotColor, pattern);
    color = mix(color, coolColor, spots * 0.3);

    // Limb darkening
    float limb = pow(max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 0.3);
    color *= 0.7 + limb * 0.3;

    // Emission
    float emission = 1.0 + pattern * 0.5;

    gl_FragColor = vec4(color * emission, 1.0);
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================

type SolarSystemProps = {
  className?: string;
};

export default function SolarSystem({ className }: SolarSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const planetMeshesRef = useRef<{ group: THREE.Group; mesh: THREE.Mesh; planet: PlanetData }[]>([]);
  const moonRef = useRef<{ mesh: THREE.Mesh; parentGroup: THREE.Group } | null>(null);
  const sunMaterialsRef = useRef<THREE.ShaderMaterial[]>([]);
  const orbitLinesRef = useRef<THREE.Line[]>([]);
  const dustParticlesRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  const [timeScale, setTimeScale] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [cameraDistance, setCameraDistance] = useState<number>(45);
  const [cameraAngle, setCameraAngle] = useState<{ theta: number; phi: number }>({ theta: -0.3, phi: 1.1 });
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera - cinematic angle matching reference
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    cameraRef.current = camera;

    // Renderer with better quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ========== STARFIELD ==========
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 300 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      starSizes[i] = 0.3 + Math.random() * 1.2;

      // Color variation: white, blue-white, yellow
      const colorType = Math.random();
      if (colorType < 0.6) {
        starColors[i * 3] = 0.9 + Math.random() * 0.1;
        starColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        starColors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.85) {
        starColors[i * 3] = 0.7 + Math.random() * 0.3;
        starColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        starColors[i * 3 + 2] = 0.7 + Math.random() * 0.2;
      }
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });

    scene.add(new THREE.Points(starGeometry, starMaterial));

    // ========== ORBITAL DUST DISC ==========
    // Creates the glowing orbital plane visible in reference
    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = 15000;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      // Distribute in disc shape with varying density
      const r = 5 + Math.pow(Math.random(), 0.5) * 55;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * (0.5 + r * 0.02); // Thicker towards edges

      dustPositions[i * 3] = r * Math.cos(theta);
      dustPositions[i * 3 + 1] = y;
      dustPositions[i * 3 + 2] = r * Math.sin(theta);

      // Color gradient: warm near sun, cooler far
      const distFactor = r / 60;
      dustColors[i * 3] = 0.3 + (1 - distFactor) * 0.5;
      dustColors[i * 3 + 1] = 0.4 + (1 - distFactor) * 0.3;
      dustColors[i * 3 + 2] = 0.5 + distFactor * 0.3;

      dustSizes[i] = 0.05 + Math.random() * 0.15;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));
    dustGeometry.setAttribute("size", new THREE.BufferAttribute(dustSizes, 1));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);
    dustParticlesRef.current = dustParticles;

    // ========== ORBITAL RINGS (Glowing lines in ecliptic) ==========
    const createGlowingRing = (radius: number, color: number, opacity = 0.3) => {
      const ringGeometry = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 128);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = -Math.PI / 2;
      return ring;
    };

    // Add subtle orbital ring markers
    [10, 15, 20, 28, 38, 48].forEach((r, i) => {
      const ring = createGlowingRing(r, 0x445566, 0.08 - i * 0.008);
      scene.add(ring);
    });

    // ========== SUN ==========
    const sunRadius = CELESTIAL_BODIES.sun.radius;

    // Sun surface with animated shader
    const sunGeometry = new THREE.SphereGeometry(sunRadius, 64, 64);
    const sunSurfaceMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: sunSurfaceVertexShader,
      fragmentShader: sunSurfaceFragmentShader,
    });
    const sun = new THREE.Mesh(sunGeometry, sunSurfaceMaterial);
    sun.name = "Sun";
    scene.add(sun);

    // Sun corona (outer glow)
    const coronaGeometry = new THREE.SphereGeometry(sunRadius * 1.4, 64, 64);
    const coronaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        coronaColor: { value: new THREE.Color(0xff6b00) },
      },
      vertexShader: sunCoronaVertexShader,
      fragmentShader: sunCoronaFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
    scene.add(corona);

    // Outer corona layer
    const outerCoronaGeometry = new THREE.SphereGeometry(sunRadius * 2.0, 32, 32);
    const outerCoronaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        coronaColor: { value: new THREE.Color(0xff4400) },
      },
      vertexShader: sunCoronaVertexShader,
      fragmentShader: sunCoronaFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const outerCorona = new THREE.Mesh(outerCoronaGeometry, outerCoronaMaterial);
    scene.add(outerCorona);

    sunMaterialsRef.current = [sunSurfaceMaterial, coronaMaterial, outerCoronaMaterial];

    // Sun light
    const sunLight = new THREE.PointLight(0xfffaf0, 3, 300);
    scene.add(sunLight);

    // Subtle ambient for visibility
    scene.add(new THREE.AmbientLight(0x111122, 0.2));

    // ========== PLANETS ==========
    const planetMeshes: { group: THREE.Group; mesh: THREE.Mesh; planet: PlanetData }[] = [];

    CELESTIAL_BODIES.planets.forEach((planet, index) => {
      const group = new THREE.Group();

      // Planet sphere
      const geometry = new THREE.SphereGeometry(planet.radius, 48, 48);

      // Create material with subtle variations
      const material = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.7,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = planet.name;
      mesh.userData = { planetIndex: index, planetData: planet };
      group.add(mesh);

      // Atmosphere glow
      const atmosphereGeometry = new THREE.SphereGeometry(planet.radius * 1.15, 32, 32);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: planet.atmosphereColor,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      group.add(atmosphere);

      // Saturn's rings
      if (planet.hasRings) {
        const ringInner = planet.radius * 1.3;
        const ringOuter = planet.radius * 2.3;

        // Multiple ring layers for depth
        for (let r = 0; r < 5; r++) {
          const rInner = ringInner + (ringOuter - ringInner) * (r / 5);
          const rOuter = ringInner + (ringOuter - ringInner) * ((r + 1) / 5);

          const ringGeo = new THREE.RingGeometry(rInner, rOuter, 64);
          const ringMat = new THREE.MeshBasicMaterial({
            color: r % 2 === 0 ? 0xd4c4a8 : 0xc4b498,
            transparent: true,
            opacity: 0.7 - r * 0.08,
            side: THREE.DoubleSide,
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2 + 0.4; // Tilted rings
          group.add(ringMesh);
        }
      }

      // Jupiter bands effect
      if (planet.hasBands) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: planet.color,
          roughness: 0.6,
          metalness: 0.05,
        });
      }

      scene.add(group);
      planetMeshes.push({ group, mesh, planet });

      // Earth's moon
      if (planet.hasMoon) {
        const moonGeo = new THREE.SphereGeometry(0.07, 24, 24);
        const moonMat = new THREE.MeshStandardMaterial({
          color: 0xbbbbbb,
          roughness: 0.9,
        });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        moon.name = "Moon";
        scene.add(moon);
        moonRef.current = { mesh: moon, parentGroup: group };
      }

      // Orbit path
      const orbitPoints = generateOrbitPoints(planet);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: planet.color,
        transparent: true,
        opacity: 0.2,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.name = `${planet.name}_orbit`;
      scene.add(orbitLine);
      orbitLinesRef.current.push(orbitLine);
    });

    planetMeshesRef.current = planetMeshes;

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.Line
        ) {
          if (object.geometry) object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      planetMeshesRef.current = [];
      moonRef.current = null;
      sunMaterialsRef.current = [];
      orbitLinesRef.current = [];
      dustParticlesRef.current = null;
    };
  }, []);

  // Orbit visibility
  useEffect(() => {
    orbitLinesRef.current.forEach((line) => {
      line.visible = showOrbits;
    });
  }, [showOrbits]);

  // Camera position
  useEffect(() => {
    if (!cameraRef.current) return;
    const { theta, phi } = cameraAngle;
    const x = cameraDistance * Math.sin(phi) * Math.cos(theta);
    const y = cameraDistance * Math.cos(phi);
    const z = cameraDistance * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(0, 0, 0);
  }, [cameraDistance, cameraAngle]);

  // Mouse controls
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    setCameraAngle((prev) => ({
      theta: prev.theta + dx * 0.005,
      phi: Math.max(0.2, Math.min(Math.PI - 0.2, prev.phi + dy * 0.005)),
    }));
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCameraDistance((prev) => Math.max(12, Math.min(120, prev + e.deltaY * 0.05)));
  }, []);

  // Touch controls
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    const touch = e.touches[0];
    lastMouseRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - lastMouseRef.current.x;
    const dy = touch.clientY - lastMouseRef.current.y;
    setCameraAngle((prev) => ({
      theta: prev.theta + dx * 0.005,
      phi: Math.max(0.2, Math.min(Math.PI - 0.2, prev.phi + dy * 0.005)),
    }));
    lastMouseRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // Click for planet selection
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sceneRef.current || !cameraRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);
    const meshes = planetMeshesRef.current.map((p) => p.mesh);
    const intersects = raycaster.intersectObjects(meshes);
    if (intersects.length > 0) {
      setSelectedPlanet(intersects[0].object.userData.planetData as PlanetData);
    } else {
      setSelectedPlanet(null);
    }
  }, []);

  // Animation loop
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();

      if (!isPaused) {
        timeRef.current += delta * timeScale * 0.5;
      }

      const time = timeRef.current;

      // Update sun shaders
      sunMaterialsRef.current.forEach((mat) => {
        if (mat.uniforms && mat.uniforms.time) {
          mat.uniforms.time.value = time;
        }
      });

      // Update planet positions
      planetMeshesRef.current.forEach(({ group, planet }) => {
        const pos = getOrbitalPosition(time, planet);
        group.position.set(pos.x, pos.y, pos.z);

        // Axial rotation
        const rotSpeed = 0.02 / Math.abs(planet.rotationPeriod);
        group.rotation.y += rotSpeed * (planet.rotationPeriod > 0 ? 1 : -1) * timeScale;
      });

      // Update moon
      if (moonRef.current) {
        const earthGroup = moonRef.current.parentGroup;
        const moonAngle = time * 12;
        const moonDist = 0.5;
        moonRef.current.mesh.position.set(
          earthGroup.position.x + moonDist * Math.cos(moonAngle),
          earthGroup.position.y,
          earthGroup.position.z + moonDist * Math.sin(moonAngle)
        );
      }

      // Slowly rotate dust
      if (dustParticlesRef.current) {
        dustParticlesRef.current.rotation.y += 0.0001 * timeScale;
      }

      rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, timeScale]);

  return (
    <div
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{
        background: "#000005",
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        ref={containerRef}
        className={cn("w-full h-full touch-none", isDragging ? "cursor-grabbing" : "cursor-grab")}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Title */}
      <div style={{ position: "absolute", top: 28, left: 28, pointerEvents: "none" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 200,
            letterSpacing: "0.25em",
            margin: 0,
            color: "#fff",
            textTransform: "uppercase",
            textShadow: "0 0 40px rgba(255,150,50,0.3)",
          }}
        >
          Solar System
        </h1>
        <p
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            marginTop: 8,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
          }}
        >
          Keplerian Orbital Mechanics · Three.js · React
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 28,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "20px 24px",
          color: "#fff",
          minWidth: 240,
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 10,
            }}
          >
            Time Scale: {timeScale.toFixed(1)}×
          </label>
          <input
            type="range"
            min={0.1}
            max={10}
            step={0.1}
            value={timeScale}
            onChange={(e) => setTimeScale(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#ff9944", height: 4 }}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: isPaused ? "rgba(100,200,100,0.15)" : "rgba(200,100,100,0.15)",
              border:
                "1px solid " +
                (isPaused ? "rgba(100,200,100,0.4)" : "rgba(200,100,100,0.4)"),
              borderRadius: 8,
              color: "#fff",
              cursor: "pointer",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            {isPaused ? "▶ Play" : "❚❚ Pause"}
          </button>
          <button
            onClick={() => setShowOrbits(!showOrbits)}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: showOrbits
                ? "rgba(100,150,255,0.15)"
                : "rgba(60,60,80,0.15)",
              border:
                "1px solid " +
                (showOrbits ? "rgba(100,150,255,0.4)" : "rgba(60,60,80,0.4)"),
              borderRadius: 8,
              color: "#fff",
              cursor: "pointer",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            Orbits
          </button>
        </div>

        <p
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.3)",
            marginTop: 16,
            marginBottom: 0,
            lineHeight: 1.6,
          }}
        >
          Drag to rotate · Scroll to zoom · Click planets
        </p>
      </div>

      {/* Physics formulas */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 28,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "18px 22px",
          color: "#fff",
          maxWidth: 260,
          fontSize: 11,
        }}
      >
        <h3
          style={{
            margin: "0 0 14px 0",
            fontSize: 11,
            fontWeight: 500,
            color: "rgba(255,200,100,0.8)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Orbital Mechanics
        </h3>
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            lineHeight: 2,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          <div>
            <span style={{ color: "rgba(150,200,255,0.8)" }}>Kepler:</span> M = E − e·sin(E)
          </div>
          <div>
            <span style={{ color: "rgba(150,200,255,0.8)" }}>Anomaly:</span>{" "}
            tan(ν/2) = √((1+e)/(1-e))·tan(E/2)
          </div>
          <div>
            <span style={{ color: "rgba(150,200,255,0.8)" }}>Radius:</span> r = a(1 − e·cos(E))
          </div>
        </div>
      </div>

      {/* Planet info */}
      {selectedPlanet && (
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "20px 24px",
            color: "#fff",
            minWidth: 200,
          }}
        >
          <h3
            style={{
              margin: "0 0 14px 0",
              fontSize: 18,
              fontWeight: 300,
              letterSpacing: "0.08em",
            }}
          >
            {selectedPlanet.name}
          </h3>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Semi-major axis</span>
              <span style={{ color: "rgba(255,200,100,0.9)" }}>
                {selectedPlanet.semiMajorAxis.toFixed(1)} AU*
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Eccentricity</span>
              <span style={{ color: "rgba(255,200,100,0.9)" }}>
                {selectedPlanet.eccentricity.toFixed(4)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Period</span>
              <span style={{ color: "rgba(255,200,100,0.9)" }}>
                {selectedPlanet.orbitalPeriod.toFixed(2)} yr
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Inclination</span>
              <span style={{ color: "rgba(255,200,100,0.9)" }}>
                {selectedPlanet.inclination.toFixed(1)}°
              </span>
            </div>
          </div>
          <p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 12, marginBottom: 0 }}>
            *Scaled for visualization
          </p>
        </div>
      )}

      {/* Planet legend */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 20,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 24,
          padding: "12px 24px",
        }}
      >
        {CELESTIAL_BODIES.planets.map((planet) => (
          <div
            key={planet.name}
            onClick={() => setSelectedPlanet(planet)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              opacity: selectedPlanet?.name === planet.name ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: `#${planet.color.toString(16).padStart(6, "0")}`,
                boxShadow: `0 0 8px #${planet.color.toString(16).padStart(6, "0")}`,
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              {planet.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
