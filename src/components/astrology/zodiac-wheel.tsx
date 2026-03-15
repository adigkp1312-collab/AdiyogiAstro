"use client";

import { cn } from "@/lib/utils";
import type { ChartData } from "@/types";

interface ZodiacWheelProps {
  chartData?: ChartData | null;
  size?: number;
  className?: string;
}

const SIGN_ORDER = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const SIGN_SYMBOLS = [
  "\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D",
  "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653",
];

const ELEMENT_COLORS: Record<string, string> = {
  Aries: "#ef4444",
  Leo: "#f97316",
  Sagittarius: "#f59e0b",
  Taurus: "#22c55e",
  Virgo: "#16a34a",
  Capricorn: "#84cc16",
  Gemini: "#38bdf8",
  Libra: "#06b6d4",
  Aquarius: "#67e8f9",
  Cancer: "#818cf8",
  Scorpio: "#a78bfa",
  Pisces: "#c084fc",
};

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "\u2609",
  Moon: "\u263D",
  Mercury: "\u263F",
  Venus: "\u2640",
  Mars: "\u2642",
  Jupiter: "\u2643",
  Saturn: "\u2644",
  Uranus: "\u2645",
  Neptune: "\u2646",
  Pluto: "\u2647",
};

const ASPECT_STYLES: Record<string, { color: string; dash: string }> = {
  Conjunction: { color: "#fbbf24", dash: "" },
  Sextile: { color: "#38bdf8", dash: "4,4" },
  Square: { color: "#ef4444", dash: "" },
  Trine: { color: "#22c55e", dash: "" },
  Opposition: { color: "#f97316", dash: "8,4" },
};

function getSignIndex(sign: string): number {
  return SIGN_ORDER.indexOf(sign);
}

function degreeToAngle(sign: string, degree: number): number {
  const signIndex = getSignIndex(sign);
  if (signIndex === -1) return 0;
  // Each sign = 30 degrees. Start from the top (-90 offset for SVG coordinate system)
  return signIndex * 30 + degree - 90;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export function ZodiacWheel({ chartData, size = 400, className }: ZodiacWheelProps) {
  const center = size / 2;
  const outerR = size / 2 - 8;
  const signR = outerR - 30;
  const innerR = signR - 8;
  const houseR = innerR - 20;
  const planetR = houseR - 25;

  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-2xl"
      >
        {/* Background circle */}
        <circle cx={center} cy={center} r={outerR} fill="#0f172a" stroke="#334155" strokeWidth="2" />

        {/* Sign segments */}
        {SIGN_ORDER.map((sign, i) => {
          const startAngle = i * 30 - 90;
          const endAngle = (i + 1) * 30 - 90;
          const midAngle = startAngle + 15;
          const color = ELEMENT_COLORS[sign];

          // Segment arc
          const arcPath = describeArc(center, center, outerR, startAngle, endAngle);
          const innerArcPath = describeArc(center, center, signR, startAngle, endAngle);

          // Segment line from outer to inner
          const outerStart = polarToCartesian(center, center, outerR, startAngle);
          const innerStart = polarToCartesian(center, center, signR, startAngle);

          // Symbol position
          const symbolPos = polarToCartesian(center, center, (outerR + signR) / 2, midAngle);

          return (
            <g key={sign}>
              {/* Segment boundary line */}
              <line
                x1={outerStart.x}
                y1={outerStart.y}
                x2={innerStart.x}
                y2={innerStart.y}
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Colored arc for the sign band */}
              <path
                d={`${arcPath} L ${polarToCartesian(center, center, signR, endAngle).x} ${polarToCartesian(center, center, signR, endAngle).y} ${describeArc(center, center, signR, startAngle, endAngle).replace("M", "L").split("A").map((p, idx) => idx === 0 ? "" : "A" + p).join("")}`}
                fill="none"
              />
              {/* Subtle colored line on outer edge */}
              <path d={arcPath} fill="none" stroke={color} strokeWidth="3" opacity="0.6" />
              {/* Sign symbol */}
              <text
                x={symbolPos.x}
                y={symbolPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={color}
                fontSize={size > 300 ? "14" : "10"}
                fontWeight="bold"
              >
                {SIGN_SYMBOLS[i]}
              </text>
            </g>
          );
        })}

        {/* Inner sign ring */}
        <circle cx={center} cy={center} r={signR} fill="none" stroke="#334155" strokeWidth="1" />

        {/* House ring */}
        <circle cx={center} cy={center} r={innerR} fill="none" stroke="#1e293b" strokeWidth="1" />

        {/* House divisions */}
        {chartData?.houses
          ? chartData.houses.map((houseCusp, i) => {
              const angle = houseCusp - 90;
              const outerPt = polarToCartesian(center, center, innerR, angle);
              const innerPt = polarToCartesian(center, center, houseR, angle);
              return (
                <g key={`house-${i}`}>
                  <line
                    x1={outerPt.x}
                    y1={outerPt.y}
                    x2={innerPt.x}
                    y2={innerPt.y}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  {/* House number */}
                  {(() => {
                    const nextCusp = chartData.houses[(i + 1) % 12];
                    let mid = (houseCusp + nextCusp) / 2;
                    if (nextCusp < houseCusp) mid = (houseCusp + nextCusp + 360) / 2;
                    const labelPos = polarToCartesian(center, center, (innerR + houseR) / 2, mid - 90);
                    return (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#64748b"
                        fontSize="9"
                      >
                        {i + 1}
                      </text>
                    );
                  })()}
                </g>
              );
            })
          : // Default 12 equal houses
            Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30 - 90;
              const outerPt = polarToCartesian(center, center, innerR, angle);
              const innerPt = polarToCartesian(center, center, houseR, angle);
              const midAngle = angle + 15;
              const labelPos = polarToCartesian(center, center, (innerR + houseR) / 2, midAngle);
              return (
                <g key={`house-${i}`}>
                  <line
                    x1={outerPt.x}
                    y1={outerPt.y}
                    x2={innerPt.x}
                    y2={innerPt.y}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#64748b"
                    fontSize="9"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}

        {/* Planet ring */}
        <circle cx={center} cy={center} r={houseR} fill="none" stroke="#1e293b" strokeWidth="1" />

        {/* Aspect lines between planets */}
        {chartData?.aspects?.map((aspect, i) => {
          const planets = getPlanetPositions(chartData);
          const p1 = planets.find((p) => p.planet === aspect.planet1);
          const p2 = planets.find((p) => p.planet === aspect.planet2);
          if (!p1 || !p2) return null;

          const angle1 = degreeToAngle(p1.sign, p1.degree);
          const angle2 = degreeToAngle(p2.sign, p2.degree);
          const pos1 = polarToCartesian(center, center, planetR, angle1);
          const pos2 = polarToCartesian(center, center, planetR, angle2);
          const style = ASPECT_STYLES[aspect.type] ?? { color: "#64748b", dash: "2,2" };

          return (
            <line
              key={`aspect-${i}`}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke={style.color}
              strokeWidth="1"
              strokeDasharray={style.dash}
              opacity="0.5"
            />
          );
        })}

        {/* Planet markers */}
        {chartData &&
          getPlanetPositions(chartData).map((planet) => {
            const angle = degreeToAngle(planet.sign, planet.degree);
            const pos = polarToCartesian(center, center, planetR, angle);
            const symbolChar = PLANET_SYMBOLS[planet.planet] ?? planet.planet[0];

            return (
              <g key={planet.planet}>
                <circle cx={pos.x} cy={pos.y} r={size > 300 ? 12 : 8} fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#fbbf24"
                  fontSize={size > 300 ? "11" : "8"}
                  fontWeight="bold"
                >
                  {symbolChar}
                </text>
                {planet.retrograde && (
                  <text
                    x={pos.x + (size > 300 ? 10 : 7)}
                    y={pos.y - (size > 300 ? 8 : 5)}
                    fill="#ef4444"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    R
                  </text>
                )}
              </g>
            );
          })}

        {/* Center point */}
        <circle cx={center} cy={center} r={3} fill="#fbbf24" />

        {/* Empty state */}
        {!chartData && (
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#64748b"
            fontSize="14"
          >
            No chart data
          </text>
        )}
      </svg>
    </div>
  );
}

function getPlanetPositions(chartData: ChartData) {
  const planets: Array<{ planet: string; sign: string; degree: number; retrograde?: boolean }> = [];
  const planetKeys = [
    "sun", "moon", "mercury", "venus", "mars",
    "jupiter", "saturn", "uranus", "neptune", "pluto",
  ] as const;

  for (const key of planetKeys) {
    const pos = chartData[key];
    if (pos) {
      planets.push({
        planet: key.charAt(0).toUpperCase() + key.slice(1),
        sign: pos.sign,
        degree: pos.degree,
        retrograde: pos.retrograde,
      });
    }
  }

  return planets;
}
