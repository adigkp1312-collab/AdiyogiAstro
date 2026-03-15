export function LogoIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer celestial ring */}
      <circle cx="24" cy="24" r="22" fill="none" stroke="#FF6600" strokeWidth="2" opacity="0.3" />
      {/* Inner glowing circle */}
      <circle cx="24" cy="24" r="16" fill="url(#astroSunGrad)" />
      {/* Om-inspired abstract mark */}
      <path
        d="M20 28c-2-1-3-3-2-5s3-3 5-3c3 0 4 2 4 4"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M27 24c1 2 0 5-3 6"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="28" cy="19" r="1.5" fill="white" />
      <path
        d="M25 17c1-1 3-1 4 0"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Orbiting stars */}
      <circle cx="10" cy="12" r="2" fill="#FF8C00" />
      <circle cx="38" cy="14" r="1.5" fill="#FFB347" />
      <circle cx="36" cy="36" r="1.8" fill="#FF6600" />
      <circle cx="8" cy="34" r="1.2" fill="#FFB347" />
      {/* Orbit path */}
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="12"
        fill="none"
        stroke="#FF8C00"
        strokeWidth="0.8"
        opacity="0.25"
        transform="rotate(-25 24 24)"
      />
      <defs>
        <radialGradient id="astroSunGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF6600" />
        </radialGradient>
      </defs>
    </svg>
  );
}
