"use client";

import dynamic from "next/dynamic";

const SolarSystem = dynamic(
  () => import("@/components/landing/solar-system").then((m) => m.default),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "auto",
        margin: "0 clamp(16px, 4vw, 80px)",
        height: "clamp(280px, 32vw, 480px)",
        background: "#04030a",
        overflow: "hidden",
        display: "block",
      }}
    >
      {/* Three.js solar system — full bleed */}
      <SolarSystem className="absolute inset-0 w-full h-full" />

      {/* Soft bottom fade into cream content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, transparent 55%, rgba(4,3,10,0.6) 85%, rgba(4,3,10,0.92) 100%)",
          zIndex: 2,
        }}
      />

      {/* Title overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          gap: "10px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(42px, 9vw, 112px)",
            lineHeight: 0.9,
            letterSpacing: "2px",
            color: "#f5f5f0",
            margin: 0,
            textShadow:
              "0 1.5px 0 #2a0a0a, 0 -1.5px 0 #2a0a0a, 1.5px 0 0 #2a0a0a, -1.5px 0 0 #2a0a0a," +
              "0 2px 8px rgba(0,0,0,0.6), 0 0 8px rgba(255,180,60,0.9), 0 0 32px rgba(255,140,20,0.55)",
          }}
        >
          DAIVIK VANI
        </h1>
        <p
          style={{
            fontFamily: "'Hind', sans-serif",
            fontSize: "clamp(11px, 1.3vw, 17px)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(253,246,232,0.65)",
            margin: 0,
          }}
        >
          Cosmic Intelligence · Ancient Wisdom
        </p>
      </div>

      {/* Bottom drag hint */}
      <p
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 11,
          fontFamily: "'Hind', sans-serif",
          fontSize: "10px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(253,246,232,0.3)",
          margin: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Drag to rotate · Scroll to zoom · Click planets
      </p>
    </section>
  );
}
