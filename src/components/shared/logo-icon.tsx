export function LogoIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="astroSunGrad" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="40%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
        <radialGradient id="astroFaceGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#CD9B1D" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
        <linearGradient id="astroRingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="24" cy="24" r="23" fill="none" stroke="url(#astroRingGrad)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="21.5" fill="none" stroke="#DAA520" strokeWidth="0.5" opacity="0.5" />

      {/* Zodiac band background */}
      <circle cx="24" cy="24" r="21" fill="#FFF8E7" />
      <circle cx="24" cy="24" r="14" fill="url(#astroSunGrad)" />

      {/* Divider lines between zodiac sections */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1={24 + 14 * Math.cos((angle * Math.PI) / 180)}
          y1={24 + 14 * Math.sin((angle * Math.PI) / 180)}
          x2={24 + 21 * Math.cos((angle * Math.PI) / 180)}
          y2={24 + 21 * Math.sin((angle * Math.PI) / 180)}
          stroke="#DAA520"
          strokeWidth="0.4"
          opacity="0.6"
        />
      ))}

      {/* Zodiac symbols around the ring */}
      {[
        { symbol: "♈", angle: -75 },
        { symbol: "♉", angle: -45 },
        { symbol: "♊", angle: -15 },
        { symbol: "♋", angle: 15 },
        { symbol: "♌", angle: 45 },
        { symbol: "♍", angle: 75 },
        { symbol: "♎", angle: 105 },
        { symbol: "♏", angle: 135 },
        { symbol: "♐", angle: 165 },
        { symbol: "♑", angle: 195 },
        { symbol: "♒", angle: 225 },
        { symbol: "♓", angle: 255 },
      ].map(({ symbol, angle }) => (
        <text
          key={symbol}
          x={24 + 17.5 * Math.cos((angle * Math.PI) / 180)}
          y={24 + 17.5 * Math.sin((angle * Math.PI) / 180) + 1.5}
          textAnchor="middle"
          fontSize="4"
          fill="#B8860B"
          fontWeight="bold"
        >
          {symbol}
        </text>
      ))}

      {/* Sun face center circle */}
      <circle cx="24" cy="24" r="10" fill="url(#astroFaceGrad)" stroke="#B8860B" strokeWidth="0.8" />

      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={`ray-${angle}`}
          x1={24 + 10.5 * Math.cos((angle * Math.PI) / 180)}
          y1={24 + 10.5 * Math.sin((angle * Math.PI) / 180)}
          x2={24 + 13.5 * Math.cos((angle * Math.PI) / 180)}
          y2={24 + 13.5 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FFD700"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}

      {/* Wavy rays between straight rays */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle) => (
        <line
          key={`wray-${angle}`}
          x1={24 + 10.5 * Math.cos((angle * Math.PI) / 180)}
          y1={24 + 10.5 * Math.sin((angle * Math.PI) / 180)}
          x2={24 + 12.5 * Math.cos((angle * Math.PI) / 180)}
          y2={24 + 12.5 * Math.sin((angle * Math.PI) / 180)}
          stroke="#DAA520"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      ))}

      {/* Sun face - eyes */}
      <ellipse cx="21.5" cy="23" rx="1.2" ry="1" fill="#654321" />
      <ellipse cx="26.5" cy="23" rx="1.2" ry="1" fill="#654321" />
      <ellipse cx="21.8" cy="22.7" rx="0.4" ry="0.3" fill="#FFD700" opacity="0.5" />
      <ellipse cx="26.8" cy="22.7" rx="0.4" ry="0.3" fill="#FFD700" opacity="0.5" />

      {/* Sun face - nose */}
      <path
        d="M23.5 24.5c0.3 0.5 0.7 0.5 1 0"
        stroke="#8B6914"
        strokeWidth="0.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Sun face - mouth */}
      <path
        d="M22 26.5c0.5 1 3.5 1 4 0"
        stroke="#8B6914"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Small star decorations on outer ring */}
      <circle cx="24" cy="2.5" r="0.8" fill="#FFD700" />
      <circle cx="45" cy="24" r="0.7" fill="#DAA520" />
      <circle cx="24" cy="45.5" r="0.8" fill="#FFD700" />
      <circle cx="3" cy="24" r="0.7" fill="#DAA520" />
    </svg>
  );
}
