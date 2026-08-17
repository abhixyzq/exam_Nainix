import React from 'react';

export default function BoardLogo({ boardId, size = 38 }) {
  const width = size;
  const height = size;

  switch (boardId) {
    case 'bseb':
      // Bihar School Examination Board (BSEB Patna Logo)
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#1e3a8a" stroke="#d97706" strokeWidth="4"/>
          <circle cx="50" cy="50" r="40" fill="#ffffff"/>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#991b1b" strokeWidth="1.5" strokeDasharray="3 2"/>
          {/* Outer Ring Text Representation */}
          <path id="bseb-text-path" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
          <text fontSize="7.5" fontWeight="900" fill="#1e3a8a" textAnchor="middle">
            <textPath href="#bseb-text-path" startOffset="50%">BIHAR BOARD PATNA</textPath>
          </text>
          {/* Inner Emblem - Open Book & Sun Rays */}
          <path d="M50 26 L50 68" stroke="#d97706" strokeWidth="2"/>
          <path d="M26 38 C34 35, 44 38, 50 42 C56 38, 66 35, 74 38 L74 66 C66 63, 56 65, 50 70 C44 65, 34 63, 26 66 Z" fill="#e0f2fe" stroke="#1e3a8a" strokeWidth="2.5"/>
          <path d="M50 42 L50 70" stroke="#1e3a8a" strokeWidth="2"/>
          {/* Flame / Diya Rays at top */}
          <path d="M50 20 L53 28 L50 26 L47 28 Z" fill="#ef4444"/>
          <circle cx="50" cy="24" r="2.5" fill="#f59e0b"/>
          {/* Star at bottom */}
          <polygon points="50,75 52,80 57,80 53,83 55,88 50,85 45,88 47,83 43,80 48,80" fill="#d97706"/>
        </svg>
      );

    case 'cbse':
      // Central Board of Secondary Education (CBSE New Delhi Logo)
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0284c7" stroke="#0369a1" strokeWidth="3"/>
          <circle cx="50" cy="50" r="41" fill="#ffffff"/>
          <circle cx="50" cy="50" r="35" fill="none" stroke="#0284c7" strokeWidth="2"/>
          {/* Central Diya / Torch of Knowledge */}
          <path d="M50 28 Q56 22 50 16 Q44 22 50 28 Z" fill="#ef4444"/>
          <path d="M50 28 Q53 24 50 20 Q47 24 50 28 Z" fill="#f59e0b"/>
          <path d="M42 34 C42 30, 58 30, 58 34 L54 44 L46 44 Z" fill="#1e293b"/>
          {/* Open Pages */}
          <path d="M24 48 C36 44, 46 47, 50 52 C54 47, 64 44, 76 48 L76 72 C64 68, 54 71, 50 76 C46 71, 36 68, 24 72 Z" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5"/>
          <path d="M50 52 L50 76" stroke="#0284c7" strokeWidth="2"/>
          {/* CBSE Text Badge */}
          <rect x="28" y="78" width="44" height="12" rx="3" fill="#0284c7"/>
          <text x="50" y="87" fontSize="8.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">CBSE</text>
        </svg>
      );

    case 'upmsp':
      // UPMSP Prayagraj (UP Board Logo)
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" stroke="#1e40af" strokeWidth="3"/>
          <circle cx="50" cy="50" r="41" fill="#ffffff"/>
          {/* UP State Seal Bow & Arrow + Pair of Fish */}
          <circle cx="50" cy="50" r="33" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.5"/>
          {/* Bow & Arrow */}
          <path d="M30 46 Q50 30 70 46" fill="none" stroke="#b91c1c" strokeWidth="3"/>
          <line x1="30" y1="46" x2="70" y2="46" stroke="#b91c1c" strokeWidth="1.5"/>
          <line x1="50" y1="32" x2="50" y2="58" stroke="#b91c1c" strokeWidth="2.5"/>
          <path d="M50 30 L46 36 L54 36 Z" fill="#b91c1c"/>
          {/* Fish motifs */}
          <path d="M32 58 C38 54, 42 62, 34 66 C30 64, 28 60, 32 58 Z" fill="#1d4ed8"/>
          <path d="M68 58 C62 54, 58 62, 66 66 C70 64, 72 60, 68 58 Z" fill="#1d4ed8"/>
          {/* UPMSP Banner */}
          <rect x="22" y="74" width="56" height="14" rx="4" fill="#b91c1c"/>
          <text x="50" y="84" fontSize="7.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">UPMSP</text>
        </svg>
      );

    case 'icse':
      // ICSE / CISCE Board Shield Logo
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield Outline */}
          <path d="M50 8 L85 20 V52 C85 74, 50 92, 50 92 C50 92, 15 74, 15 52 V20 L50 8 Z" fill="#312e81" stroke="#4338ca" strokeWidth="3"/>
          <path d="M50 14 L79 24 V50 C79 68, 50 84, 50 84 C50 84, 21 68, 21 50 V24 L50 14 Z" fill="#ffffff"/>
          {/* Cross Divide */}
          <line x1="50" y1="14" x2="50" y2="84" stroke="#4338ca" strokeWidth="2"/>
          <line x1="21" y1="46" x2="79" y2="46" stroke="#4338ca" strokeWidth="2"/>
          {/* Inner Symbols: Book, Crown, Star */}
          <path d="M30 28 L42 28 C42 34, 30 36, 30 36 Z" fill="#4338ca"/>
          <polygon points="65,26 67,31 72,31 68,34 70,39 65,36 60,39 62,34 58,31 63,31" fill="#f59e0b"/>
          <path d="M30 60 C38 56, 44 60, 44 60 L44 72 C38 68, 30 72, 30 72 Z" fill="#4338ca"/>
          <polygon points="65,58 68,64 62,64" fill="#ef4444"/>
          {/* Banner */}
          <rect x="24" y="74" width="52" height="13" rx="3" fill="#312e81"/>
          <text x="50" y="83.5" fontSize="8" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.8">CISCE</text>
        </svg>
      );

    case 'jee_neet':
      // JEE & NEET Foundation Logo (NTA Mock)
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0f172a" stroke="#0072f5" strokeWidth="3"/>
          <circle cx="50" cy="50" r="41" fill="#ffffff"/>
          {/* Atomic / Medical Orbit Circles */}
          <ellipse cx="50" cy="46" rx="28" ry="10" fill="none" stroke="#0072f5" strokeWidth="2.5" transform="rotate(-30 50 46)"/>
          <ellipse cx="50" cy="46" rx="28" ry="10" fill="none" stroke="#10b981" strokeWidth="2.5" transform="rotate(30 50 46)"/>
          {/* Central Nucleus Pulse */}
          <circle cx="50" cy="46" r="6" fill="#ef4444"/>
          <circle cx="50" cy="46" r="3" fill="#ffffff"/>
          {/* NTA / JEE NEET Badge */}
          <rect x="20" y="72" width="60" height="14" rx="4" fill="#0f172a"/>
          <text x="50" y="82.5" fontSize="7.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">NTA MOCK</text>
        </svg>
      );

    default:
      return null;
  }
}
