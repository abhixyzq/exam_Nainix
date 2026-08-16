// Pixel Art Forest & Lake SVG Background Generator
export const FOREST_BG_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
  <defs>
    <!-- Sky Gradient -->
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bce3d9"/>
      <stop offset="50%" stop-color="#c9e5dd"/>
      <stop offset="100%" stop-color="#d4ebe4"/>
    </linearGradient>

    <!-- Lake Water Gradient -->
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7ca79f"/>
      <stop offset="100%" stop-color="#5a867e"/>
    </linearGradient>

    <!-- Cloud Soft Pattern -->
    <radialGradient id="cloudGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#e3f2ec" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Sky Canvas -->
  <rect width="1440" height="900" fill="url(#skyGrad)"/>

  <!-- Soft Pixel Cloud Clusters -->
  <circle cx="250" cy="180" r="160" fill="url(#cloudGrad)"/>
  <circle cx="450" cy="220" r="190" fill="url(#cloudGrad)"/>
  <circle cx="1150" cy="190" r="220" fill="url(#cloudGrad)"/>
  <circle cx="950" cy="240" r="170" fill="url(#cloudGrad)"/>

  <!-- Background Mountain Distant Silhouette -->
  <path d="M0,580 L180,510 L350,560 L520,490 L750,570 L980,500 L1180,550 L1440,480 L1440,650 L0,650 Z" fill="#9dbfb6" opacity="0.4"/>

  <!-- Middle Pixel Pine Trees Left Bank -->
  <g fill="#1b433e" opacity="0.85">
    <!-- Tree 1 -->
    <polygon points="120,580 90,640 150,640"/>
    <polygon points="120,530 95,590 145,590"/>
    <polygon points="120,480 102,540 138,540"/>
    <rect x="115" y="640" width="10" height="30" fill="#3d271d"/>

    <!-- Tree 2 -->
    <polygon points="210,600 175,670 245,670"/>
    <polygon points="210,540 182,610 238,610"/>
    <polygon points="210,490 190,550 230,550"/>
    <rect x="204" y="670" width="12" height="35" fill="#3d271d"/>

    <!-- Tree 3 -->
    <polygon points="290,610 260,675 320,675"/>
    <polygon points="290,560 268,620 312,620"/>
    <rect x="285" y="675" width="10" height="25" fill="#3d271d"/>
  </g>

  <!-- Middle Pixel Pine Trees Right Bank -->
  <g fill="#1b433e" opacity="0.85">
    <!-- Tree 4 -->
    <polygon points="1180,600 1145,670 1215,670"/>
    <polygon points="1180,540 1152,610 1208,610"/>
    <polygon points="1180,490 1160,550 1200,550"/>
    <rect x="1174" y="670" width="12" height="35" fill="#3d271d"/>

    <!-- Tree 5 -->
    <polygon points="1280,580 1250,640 1310,640"/>
    <polygon points="1280,530 1255,590 1305,590"/>
    <polygon points="1280,480 1262,540 1298,540"/>
    <rect x="1275" y="640" width="10" height="30" fill="#3d271d"/>
  </g>

  <!-- Ground Islands -->
  <rect x="0" y="665" width="420" height="40" rx="4" fill="#2d524d"/>
  <rect x="0" y="695" width="420" height="15" fill="#583f33"/>

  <rect x="1050" y="665" width="390" height="40" rx="4" fill="#2d524d"/>
  <rect x="1050" y="695" width="390" height="15" fill="#583f33"/>

  <!-- Calm Lake Water Body at Bottom -->
  <rect x="0" y="710" width="1440" height="190" fill="url(#waterGrad)"/>

  <!-- Water Reflection Ripples -->
  <line x1="100" y1="740" x2="300" y2="740" stroke="#a4cdcf" stroke-width="2" stroke-dasharray="10 15 25 10"/>
  <line x1="800" y1="760" x2="1100" y2="760" stroke="#a4cdcf" stroke-width="2" stroke-dasharray="15 20 30"/>
  <line x1="400" y1="810" x2="700" y2="810" stroke="#a4cdcf" stroke-width="2" stroke-dasharray="20 10 15"/>
</svg>
`;

export const FOREST_BG_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(FOREST_BG_SVG)}`;
