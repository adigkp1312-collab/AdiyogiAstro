'use client';

import React from 'react';

interface KundliWatermarkProps {
  className?: string;
  opacity?: number;
  size?: number;
  color?: string;
}

/**
 * North-Indian style Kundli (birth chart) watermark.
 * The classic diamond-in-square pattern with 12 houses,
 * plus zodiac symbols and planetary glyphs for authenticity.
 */
export default function KundliWatermark({
  className = '',
  opacity = 0.04,
  size = 500,
  color = '#8B5CF6',
}: KundliWatermarkProps) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer square */}
        <rect
          x="10"
          y="10"
          width="480"
          height="480"
          stroke={color}
          strokeWidth="1.5"
          rx="4"
        />

        {/* Inner diamond (rotated square) - the classic Kundli shape */}
        <polygon
          points="250,10 490,250 250,490 10,250"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Diagonal lines creating 12 houses */}
        {/* Top-left to center */}
        <line x1="10" y1="10" x2="250" y2="250" stroke={color} strokeWidth="0.8" />
        {/* Top-right to center */}
        <line x1="490" y1="10" x2="250" y2="250" stroke={color} strokeWidth="0.8" />
        {/* Bottom-left to center */}
        <line x1="10" y1="490" x2="250" y2="250" stroke={color} strokeWidth="0.8" />
        {/* Bottom-right to center */}
        <line x1="490" y1="490" x2="250" y2="250" stroke={color} strokeWidth="0.8" />

        {/* House number labels (1-12 in traditional Kundli layout) */}
        <text x="250" y="80" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">1</text>
        <text x="145" y="145" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">12</text>
        <text x="60" y="255" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">3</text>
        <text x="145" y="370" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">2</text>
        <text x="250" y="435" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">7</text>
        <text x="360" y="370" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">8</text>
        <text x="440" y="255" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">9</text>
        <text x="360" y="145" textAnchor="middle" fill={color} fontSize="18" fontWeight="300" fontFamily="serif">10</text>
        {/* Corner houses */}
        <text x="60" y="55" textAnchor="middle" fill={color} fontSize="16" fontWeight="300" fontFamily="serif">11</text>
        <text x="440" y="55" textAnchor="middle" fill={color} fontSize="16" fontWeight="300" fontFamily="serif">4</text>
        <text x="60" y="465" textAnchor="middle" fill={color} fontSize="16" fontWeight="300" fontFamily="serif">5</text>
        <text x="440" y="465" textAnchor="middle" fill={color} fontSize="16" fontWeight="300" fontFamily="serif">6</text>

        {/* Zodiac circle in center */}
        <circle cx="250" cy="250" r="45" stroke={color} strokeWidth="0.8" strokeDasharray="4 3" />

        {/* Om symbol in center */}
        <text x="250" y="258" textAnchor="middle" fill={color} fontSize="28" fontFamily="serif" fontWeight="300">
          &#x0950;
        </text>

        {/* Outer decorative circle */}
        <circle cx="250" cy="250" r="235" stroke={color} strokeWidth="0.5" strokeDasharray="2 6" />

        {/* Planet glyphs scattered in houses */}
        {/* Sun glyph - House 1 */}
        <circle cx="250" cy="55" r="8" stroke={color} strokeWidth="0.6" />
        <circle cx="250" cy="55" r="2" fill={color} />

        {/* Moon glyph - House 3 */}
        <path d="M52,230 a12,12 0 0,1 0,24 a8,8 0 0,0 0,-24" stroke={color} strokeWidth="0.6" fill="none" />

        {/* Mars glyph - House 10 */}
        <circle cx="380" cy="120" r="6" stroke={color} strokeWidth="0.6" />
        <line x1="386" y1="114" x2="392" y2="108" stroke={color} strokeWidth="0.6" />
        <polyline points="387,108 392,108 392,113" stroke={color} strokeWidth="0.6" fill="none" />

        {/* Jupiter glyph - House 7 */}
        <path d="M235,460 h16 M243,452 v16 M235,452 q12,0 12,8" stroke={color} strokeWidth="0.6" fill="none" />

        {/* Saturn glyph - House 9 */}
        <path d="M448,275 v-12 M444,263 h8 M448,275 q8,0 8,-8" stroke={color} strokeWidth="0.6" fill="none" />

        {/* Venus glyph - House 12 */}
        <circle cx="130" cy="125" r="6" stroke={color} strokeWidth="0.6" />
        <line x1="130" y1="131" x2="130" y2="143" stroke={color} strokeWidth="0.6" />
        <line x1="125" y1="138" x2="135" y2="138" stroke={color} strokeWidth="0.6" />

        {/* Mercury glyph - House 2 */}
        <circle cx="130" cy="350" r="6" stroke={color} strokeWidth="0.6" />
        <line x1="130" y1="356" x2="130" y2="366" stroke={color} strokeWidth="0.6" />
        <line x1="125" y1="361" x2="135" y2="361" stroke={color} strokeWidth="0.6" />
        <path d="M123,344 a7,4 0 0,0 14,0" stroke={color} strokeWidth="0.6" fill="none" />

        {/* Corner decorative dots */}
        <circle cx="25" cy="25" r="3" fill={color} opacity="0.5" />
        <circle cx="475" cy="25" r="3" fill={color} opacity="0.5" />
        <circle cx="25" cy="475" r="3" fill={color} opacity="0.5" />
        <circle cx="475" cy="475" r="3" fill={color} opacity="0.5" />

        {/* Nakshatras - small stars at cardinal points */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 250 + 220 * Math.cos(rad - Math.PI / 2);
          const cy = 250 + 220 * Math.sin(rad - Math.PI / 2);
          return (
            <g key={angle}>
              <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke={color} strokeWidth="0.8" />
              <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke={color} strokeWidth="0.8" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
