// Light Ice-Blue Geometric Vector Background matching asspp.vercel.app reference 1:1
export const LIGHT_ICE_BG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#edf4fc"/>
      <stop offset="50%" stop-color="#f6f9fe"/>
      <stop offset="100%" stop-color="#e4effa"/>
    </linearGradient>

    <radialGradient id="glowTop" cx="75%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#0072f5" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="glowLeft" cx="20%" cy="75%" r="50%">
      <stop offset="0%" stop-color="#0072f5" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#0072f5" stop-opacity="0"/>
    </radialGradient>

    <pattern id="gridPattern" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0, 114, 245, 0.05)" stroke-width="1"/>
      <circle cx="0" cy="0" r="1.5" fill="rgba(0, 114, 245, 0.12)"/>
    </pattern>
  </defs>

  {/* Base Ice Blue Gradient */}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#glowTop)"/>
  <rect width="100%" height="100%" fill="url(#glowLeft)"/>
  <rect width="100%" height="100%" fill="url(#gridPattern)"/>

  {/* Glowing Vector Hexagons & Mesh Lines */}
  <g stroke="rgba(0, 114, 245, 0.14)" stroke-width="1.2" fill="none">
    <polygon points="860,160 930,120 1000,160 1000,240 930,280 860,240"/>
    <polygon points="1000,160 1070,120 1140,160 1140,240 1070,280 1000,240"/>
    <polygon points="930,280 1000,240 1070,280 1070,360 1000,400 930,360"/>
    <polygon points="790,280 860,240 930,280 930,360 860,400 790,360"/>
    
    <line x1="860" y1="160" x2="1000" y2="240" stroke="rgba(0, 114, 245, 0.18)"/>
    <line x1="930" y1="120" x2="930" y2="280" stroke="rgba(2, 132, 199, 0.22)"/>
    <line x1="1070" y1="120" x2="1070" y2="280" stroke="rgba(2, 132, 199, 0.22)"/>
    
    {/* Node Vertices */}
    <circle cx="930" cy="120" r="3.5" fill="#0072f5" opacity="0.6"/>
    <circle cx="1000" cy="160" r="4" fill="#0284c7" opacity="0.7"/>
    <circle cx="1070" cy="120" r="3.5" fill="#0072f5" opacity="0.6"/>
    <circle cx="930" cy="280" r="3.5" fill="#0072f5" opacity="0.6"/>
    <circle cx="1000" cy="240" r="4.5" fill="#38bdf8" opacity="0.8"/>
    <circle cx="1070" cy="280" r="3.5" fill="#0072f5" opacity="0.6"/>
    <circle cx="1000" cy="400" r="3.5" fill="#0284c7" opacity="0.6"/>
  </g>

  {/* Left Subtle Arrow Waves */}
  <g stroke="rgba(0, 114, 245, 0.12)" stroke-width="1.5" fill="none">
    <path d="M -50 200 Q 200 350 400 200"/>
    <path d="M -50 250 Q 220 400 450 250"/>
    <path d="M -50 300 Q 240 450 500 300"/>
  </g>
</svg>
`)}`;
