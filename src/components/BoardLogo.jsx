import React, { useState } from 'react';

const BOARD_IMAGE_URLS = {
  bseb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9osxpYbwVWtc0AvWIJ7oyWvc63uelnf2QwQ_UEQ0O0ZzoRSXiABXEHnqcdbkRihBF2TDYyoprVGjdHKEgcQvbaZeeVU6lmkOYT77QlQsjUd7jSKjvvw1uB6xDVsflqsoni-rilmUOpAAeOt0z8lNOOhORTU6udqjkzSFjfYxBfPlMfz0LmOHs-zfy_w/s1600/BSEB-1.jpg",
  cbse: "https://vectorseek.com/wp-content/uploads/2023/08/CBSE-Logo-Vector.svg--266x300.png",
  icse: "https://www.cpgoenkainternationalschool.com/images/homepage/board/icse.png"
};

export default function BoardLogo({ boardId, size = 38 }) {
  const [hasError, setHasError] = useState(false);
  const width = size;
  const height = size;

  if (BOARD_IMAGE_URLS[boardId] && !hasError) {
    return (
      <img
        src={BOARD_IMAGE_URLS[boardId]}
        alt={`${boardId} logo`}
        onError={() => setHasError(true)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: 'contain',
          borderRadius: '6px'
        }}
      />
    );
  }

  switch (boardId) {
    case 'bseb':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#1e3a8a" stroke="#d97706" strokeWidth="4"/>
          <circle cx="50" cy="50" r="40" fill="#ffffff"/>
          <path id="bseb-text-path" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
          <text fontSize="7.5" fontWeight="900" fill="#1e3a8a" textAnchor="middle">
            <textPath href="#bseb-text-path" startOffset="50%">BIHAR BOARD PATNA</textPath>
          </text>
          <path d="M50 26 L50 68" stroke="#d97706" strokeWidth="2"/>
          <path d="M26 38 C34 35, 44 38, 50 42 C56 38, 66 35, 74 38 L74 66 C66 63, 56 65, 50 70 C44 65, 34 63, 26 66 Z" fill="#e0f2fe" stroke="#1e3a8a" strokeWidth="2.5"/>
          <circle cx="50" cy="24" r="2.5" fill="#f59e0b"/>
        </svg>
      );

    case 'cbse':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0284c7" stroke="#0369a1" strokeWidth="3"/>
          <circle cx="50" cy="50" r="41" fill="#ffffff"/>
          <path d="M50 28 Q56 22 50 16 Q44 22 50 28 Z" fill="#ef4444"/>
          <path d="M24 48 C36 44, 46 47, 50 52 C54 47, 64 44, 76 48 L76 72 C64 68, 54 71, 50 76 C46 71, 36 68, 24 72 Z" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5"/>
          <rect x="28" y="78" width="44" height="12" rx="3" fill="#0284c7"/>
          <text x="50" y="87" fontSize="8.5" fontWeight="900" fill="#ffffff" textAnchor="middle">CBSE</text>
        </svg>
      );

    case 'upmsp':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" stroke="#1e40af" strokeWidth="3"/>
          <circle cx="50" cy="50" r="41" fill="#ffffff"/>
          <path d="M30 46 Q50 30 70 46" fill="none" stroke="#b91c1c" strokeWidth="3"/>
          <rect x="22" y="74" width="56" height="14" rx="4" fill="#b91c1c"/>
          <text x="50" y="84" fontSize="7.5" fontWeight="900" fill="#ffffff" textAnchor="middle">UPMSP</text>
        </svg>
      );

    case 'icse':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 L85 20 V52 C85 74, 50 92, 50 92 C50 92, 15 74, 15 52 V20 L50 8 Z" fill="#312e81"/>
          <rect x="24" y="74" width="52" height="13" rx="3" fill="#312e81"/>
          <text x="50" y="83.5" fontSize="8" fontWeight="900" fill="#ffffff" textAnchor="middle">CISCE</text>
        </svg>
      );

    case 'jee_neet':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0f172a" stroke="#0072f5" strokeWidth="3"/>
          <circle cx="50" cy="50" r="41" fill="#ffffff"/>
          <ellipse cx="50" cy="46" rx="28" ry="10" fill="none" stroke="#0072f5" strokeWidth="2.5" transform="rotate(-30 50 46)"/>
          <ellipse cx="50" cy="46" rx="28" ry="10" fill="none" stroke="#10b981" strokeWidth="2.5" transform="rotate(30 50 46)"/>
          <rect x="20" y="72" width="60" height="14" rx="4" fill="#0f172a"/>
          <text x="50" y="82.5" fontSize="7.5" fontWeight="900" fill="#ffffff" textAnchor="middle">NTA MOCK</text>
        </svg>
      );

    default:
      return null;
  }
}

