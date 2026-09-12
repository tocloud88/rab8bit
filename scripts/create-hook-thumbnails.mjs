import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Category style mapping
export const THUMBNAIL_CONFIGS = [
  {
    id: 'large-context-docs-2026',
    target: 'public/images/blogs/large-context-docs-2026.jpg',
    style: 'style1_ecoclean', // Ref 1: 화사한 화이트/스카이블루 + 회전화살표 + 사각블루박스
    badge: '100만 토큰 시대',
    title1: '수백 장 문서·코드',
    title2: '단 1초 완벽 분석!',
    subTag: '2026 최신 대형 컨텍스트 프롬프트 완전 정복'
  },
  {
    id: 'ai-agent-workflow',
    target: 'public/images/blogs/ai-agent-workflow.jpg',
    style: 'style2_comicpop', // Ref 2: 딥바이올렛/블루 + 16각 붉은스타버스트 + 민트볼록폰트 + 전선플러그/번개
    badge: '실무 워크플로우',
    title1: 'AI 에이전트',
    title2: '반복 업무 100% 자동화!',
    subTag: '컴퓨터 제어부터 실무 자동화 파이프라인 구축'
  },
  {
    id: 'vibe-coding-2026',
    target: 'public/images/blogs/vibe-coding-2026.jpg',
    style: 'style3_streetgraffiti', // Ref 3: 코발트블루 + 거대블랙별 + 네온라임그래피티 + 스마일리/스티커폭탄
    badge: '1인 개발 혁명',
    title1: '바이브 코딩 정복',
    title2: '말만 하면 앱 완성!',
    subTag: '비개발자도 하루 만에 풀스택 서비스 배포'
  },
  {
    id: 'ai-big-4-comparison',
    target: 'public/images/blogs/ai-big-4-comparison.jpg',
    style: 'style4_editorialkinetic', // Ref 4: 젯블랙 + 와이어프레임 잔상 + 사선초거대 타이포 + 원색스티커칩
    badge: '2026 플래그십 맞대결',
    title1: 'AI 4대 천왕 격돌',
    title2: 'GPT-6 vs Claude vs Gemini',
    subTag: '벤치마크 점수와 실무 성능 전격 비교'
  },
  {
    id: 'gpt-6-astra-agent',
    target: 'public/images/blogs/gpt-6-astra-agent.jpg',
    style: 'style4_editorialkinetic',
    badge: 'OpenAI 전격 공개',
    title1: 'GPT-6 ASTRA 해부',
    title2: '화면 보고 PC 직접 조작!',
    subTag: '눈으로 보고 손으로 클릭하는 차세대 AI 에이전트'
  }
];

function calcFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(baseSize * (maxChars / len));
}

// ----------------------------------------------------------------------
// STYLE 1 (Ref 1: 한국형 무공해차 전환100 스타일)
// 화이트 & 스카이블루 클린 배경 + 노랑 원형 회전 화살표 + 블루 슬랜트 박스 + 일렉트릭 블루 와이드 폰트
// ----------------------------------------------------------------------
export function renderStyle1_EcoClean(w, h, item) {
  const title1Size = calcFontSize(item.title1, 108, 9);
  const title2Size = calcFontSize(item.title2, 114, 10);
  const boxWidth = Math.max(760, item.title1.length * 75 + 100);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgSkyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f0f9ff"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>

    <!-- Deep Blue Box Gradient -->
    <linearGradient id="blueBoxGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <!-- Electric Royal Blue Text Gradient -->
    <linearGradient id="blueTextGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <!-- Yellow Arrow Gradient -->
    <linearGradient id="arrowYellowGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>

    <filter id="cleanShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0284c7" flood-opacity="0.18"/>
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.08"/>
    </filter>

    <filter id="boldTextShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="0" flood-color="#ffffff" flood-opacity="1"/>
      <feDropShadow dx="4" dy="14" stdDeviation="8" flood-color="#0369a1" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Clean Bright Canvas Background -->
  <rect width="${w}" height="${h}" fill="url(#bgSkyGrad)"/>

  <!-- Top-Left Sun & Cloud Graphic -->
  <g transform="translate(140, 100)">
    <circle cx="-30" cy="-20" r="45" fill="#fbbf24" opacity="0.85"/>
    <path d="M -70 10 Q -50 -15 -20 0 Q 10 -25 40 0 Q 70 -10 80 15 L -70 15 Z" fill="#93c5fd" opacity="0.6"/>
  </g>

  <!-- Bottom Perspective Clean Road / Mountain Landscape -->
  <g transform="translate(${w / 2}, ${h})">
    <!-- Mountain Outlines -->
    <polygon points="-640,-130 -300,-170 0,-130 300,-180 640,-130 640,0 -640,0" fill="#bae6fd" opacity="0.6"/>
    <polygon points="-640,-80 -200,-110 100,-70 400,-100 640,-80 640,0 -640,0" fill="#7dd3fc" opacity="0.7"/>
    <!-- Central Road -->
    <polygon points="-240,0 240,0 35,-60 -35,-60" fill="#f8fafc"/>
    <polygon points="-180,0 180,0 25,-60 -25,-60" fill="#e2e8f0"/>
    <polygon points="-20,0 20,0 4,-60 -4,-60" fill="#ffffff"/>
  </g>

  <!-- Central Dynamic Graphic Group (-4 deg tilt like Ref 1) -->
  <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-3.5) skewX(-3)">
    
    <!-- Yellow Circular Dual Loop Arrow (Ref 1 Signature) -->
    <g transform="scale(1.25, 0.95)" filter="url(#cleanShadow)">
      <!-- Top Arc Arrow -->
      <path d="M -260 -50 A 300 220 0 0 1 260 -50" fill="none" stroke="url(#arrowYellowGrad)" stroke-width="26" stroke-linecap="round"/>
      <polygon points="260,-80 295,-45 255,-20" fill="#f59e0b"/>
      <!-- Bottom Arc Arrow -->
      <path d="M 260 50 A 300 220 0 0 1 -260 50" fill="none" stroke="url(#arrowYellowGrad)" stroke-width="26" stroke-linecap="round"/>
      <polygon points="-260,80 -295,45 -255,20" fill="#f59e0b"/>
    </g>

    <!-- Top Badge (Clean Curved Pill) -->
    <g transform="translate(0, -170)" filter="url(#cleanShadow)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="36" font-weight="900" fill="#0284c7" stroke="#ffffff" stroke-width="8" paint-order="stroke fill" letter-spacing="2">
        ✦ ${item.badge} ✦
      </text>
    </g>

    <!-- Line 1: Slanted Solid Royal Blue Parallelogram Box (Ref 1: '무공해차') -->
    <g transform="translate(0, -45)" filter="url(#cleanShadow)">
      <polygon points="-${boxWidth / 2 + 25},-54 ${boxWidth / 2 + 25},-54 ${boxWidth / 2 - 10},54 -${boxWidth / 2 - 10},54" fill="url(#blueBoxGrad)" stroke="#ffffff" stroke-width="8"/>
      <text x="0" y="18" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" letter-spacing="-1">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Giant Royal Blue Bold Typography with White Contour (Ref 1: '전환 100') -->
    <g transform="translate(0, 115)" filter="url(#boldTextShadow)">
      <!-- Outer White Rim -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#0284c7" stroke="#ffffff" stroke-width="22" paint-order="stroke fill" letter-spacing="-2">
        ${item.title2}
      </text>
      <!-- Foreground Blue -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#blueTextGrad)" letter-spacing="-2">
        ${item.title2}
      </text>
    </g>

    <!-- Bottom English Subtitle (Ref 1: '(K-EV100)') -->
    <g transform="translate(0, 185)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="24" font-weight="900" fill="#0284c7" letter-spacing="3">
        (AI PROMPT &amp; DEEP DOCS ANALYSIS)
      </text>
    </g>
  </g>

  <!-- Bottom Slogan Ribbon (Ref 1: '탄소중립 실현을 위해 동참해주세요!') -->
  <g transform="translate(${w / 2}, ${h - 45})" filter="url(#cleanShadow)">
    <rect x="-420" y="-22" width="840" height="44" rx="22" fill="#0284c7"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="1">
      ${item.subTag}
    </text>
  </g>
</svg>`;
}

// ----------------------------------------------------------------------
// STYLE 2 (Ref 2: 슬기로운 전기차생활 스타일)
// 비비드 딥바이올렛/블루 + 16각 붉은 스타버스트 + 민트/화이트 3D 볼록 타이포 + 전선 플러그/번개
// ----------------------------------------------------------------------
export function renderStyle2_ComicPop(w, h, item) {
  const title1Size = calcFontSize(item.title1, 115, 8);
  const title2Size = calcFontSize(item.title2, 98, 12);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Vivid Comic Blue Gradient -->
    <linearGradient id="comicBgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="40%" stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>

    <!-- Starburst Red Gradient -->
    <linearGradient id="starburstGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>

    <!-- Mint Green Text Gradient -->
    <linearGradient id="mintPopGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="40%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>

    <!-- Comic Hard Drop Shadow -->
    <filter id="comicHard3D" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="10" dy="16" stdDeviation="0" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="14" dy="24" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <!-- Comic Starburst Polygon -->
    <polygon id="burst16" points="
      0,-250 40,-170 120,-220 120,-140 210,-160 170,-90 250,-70 190,-10 240,50 170,80 200,160 120,150 110,230 40,180 0,250
      -40,180 -110,230 -120,150 -200,160 -170,80 -240,50 -190,-10 -250,-70 -170,-90 -210,-160 -120,-140 -120,-220 -40,-170
    " fill="url(#starburstGrad)" stroke="#facc15" stroke-width="8"/>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#comicBgGrad)"/>

  <!-- Comic Speed Lines & Purple Lightning Background Shards -->
  <g opacity="0.6">
    <polygon points="0,0 250,0 120,300 0,200" fill="#a855f7" opacity="0.4"/>
    <polygon points="${w},0 ${w - 300},0 ${w - 180},280 ${w},150" fill="#ec4899" opacity="0.4"/>
    <polygon points="0,${h} 280,${h} 150,${h - 260} 0,${h - 180}" fill="#3b82f6" opacity="0.4"/>
    <polygon points="${w},${h} ${w - 260},${h} ${w - 140},${h - 240} ${w},${h - 160}" fill="#a855f7" opacity="0.4"/>
  </g>

  <!-- Confetti Triangles & Circles -->
  <polygon points="120,140 160,110 170,160" fill="#ec4899"/>
  <polygon points="${w - 160},120 ${w - 110},100 ${w - 130},150" fill="#facc15"/>
  <polygon points="180,${h - 120} 220,${h - 150} 240,${h - 90}" fill="#34d399"/>
  <polygon points="${w - 200},${h - 140} ${w - 150},${h - 170} ${w - 170},${h - 110}" fill="#ec4899"/>
  <circle cx="280" cy="120" r="14" fill="#38bdf8"/>
  <circle cx="${w - 280}" cy="140" r="16" fill="#f43f5e"/>
  <circle cx="240" cy="${h - 180}" r="12" fill="#facc15"/>
  <circle cx="${w - 250}" cy="${h - 180}" r="14" fill="#34d399"/>

  <!-- Center Comic Starburst -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) scale(1.6, 1.05)" filter="url(#comicHard3D)">
    <use href="#burst16"/>
  </g>

  <!-- Comic Swirling Power Cord / Plug Tail Graphic (Ref 2 Signature) -->
  <g transform="translate(${w / 2}, ${h / 2})" filter="url(#comicHard3D)">
    <!-- Swirling Black Cable Loop -->
    <path d="M -380 -80 C -480 -30, -420 180, -220 160 C 0 140, 360 220, 480 80" fill="none" stroke="#000000" stroke-width="36" stroke-linecap="round"/>
    <path d="M -380 -80 C -480 -30, -420 180, -220 160 C 0 140, 360 220, 480 80" fill="none" stroke="#facc15" stroke-width="14" stroke-linecap="round"/>
    
    <!-- 2-Prong Electric Plug on Right Side -->
    <g transform="translate(480, 80) rotate(25)">
      <rect x="-10" y="-30" width="45" height="60" rx="8" fill="#000000" stroke="#facc15" stroke-width="4"/>
      <rect x="35" y="-20" width="28" height="12" rx="4" fill="#facc15"/>
      <rect x="35" y="8" width="28" height="12" rx="4" fill="#facc15"/>
    </g>
  </g>

  <!-- Dynamic Tilted Comic Content (-3 deg tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 20}) rotate(-3)">
    
    <!-- Top Boxed Word: '슬기로운' / 'AI 에이전트' -->
    <g transform="translate(0, -65)" filter="url(#comicHard3D)">
      <!-- Black Outer Box Base -->
      <rect x="-260" y="-55" width="520" height="105" rx="16" fill="#000000" stroke="#000000" stroke-width="12"/>
      <rect x="-250" y="-48" width="500" height="90" rx="10" fill="#000000"/>
      <!-- Crisp White Comic Block Headline -->
      <text x="0" y="20" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" letter-spacing="-1">
        ${item.title1}
      </text>
    </g>

    <!-- Bottom Giant Word: '전기차생활' / '반복 업무 100% 자동화!' with Neon Mint Fill -->
    <g transform="translate(0, 95)" filter="url(#comicHard3D)">
      <!-- Black Heavy Shadow Contour -->
      <text x="8" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="32" paint-order="stroke fill" letter-spacing="-2">
        ${item.title2}
      </text>
      <!-- Foreground Neon Mint Text -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#mintPopGrad)" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-2">
        ${item.title2}
      </text>
    </g>

    <!-- Electric Lightning Bolt Accents in Text (Ref 2 Signature) -->
    <g transform="translate(180, 50) scale(1.4)" filter="url(#comicHard3D)">
      <polygon points="0,-35 15,-5 2,-2 18,30 -6,-2 4,-8" fill="#facc15" stroke="#000000" stroke-width="4"/>
    </g>
    <g transform="translate(-360, 40) rotate(-20) scale(1.2)" filter="url(#comicHard3D)">
      <polygon points="0,-35 15,-5 2,-2 18,30 -6,-2 4,-8" fill="#facc15" stroke="#000000" stroke-width="4"/>
    </g>
  </g>

  <!-- Bottom Pop Subtag Banner -->
  <g transform="translate(${w / 2}, ${h - 45})" filter="url(#comicHard3D)">
    <polygon points="-440,-20 440,-20 420,20 -420,20" fill="#facc15" stroke="#000000" stroke-width="4"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="20" font-weight="900" fill="#000000" letter-spacing="1">
      ⚡ ${item.subTag} ⚡
    </text>
  </g>
</svg>`;
}

// ----------------------------------------------------------------------
// STYLE 3 (Ref 3: VERIFICAÇÃO VENDAS 스타일)
// 비비드 로열 블루 + 하프톤 도트 + 거대 블랙 별 + 초강렬 형광 라임 그래피티 + Y2K 스티커 폭탄
// ----------------------------------------------------------------------
export function renderStyle3_StreetGraffiti(w, h, item) {
  const title1Size = calcFontSize(item.title1, 118, 9);
  const title2Size = calcFontSize(item.title2, 108, 10);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Caution Hazard Pattern -->
    <pattern id="hazardStripe" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="18" height="36" fill="#facc15"/>
      <rect x="18" width="18" height="36" fill="#000000"/>
    </pattern>

    <!-- Halftone Dot Pattern -->
    <pattern id="halftoneDots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="4" fill="#ffffff" opacity="0.15"/>
    </pattern>

    <!-- Acid Neon Lime Gradient -->
    <linearGradient id="acidLimePop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="25%" stop-color="#d9f99d"/>
      <stop offset="70%" stop-color="#a3e635"/>
      <stop offset="100%" stop-color="#65a30d"/>
    </linearGradient>

    <!-- Giant 5-Point Star -->
    <polygon id="blackStar" points="
      0,-260 75,-80 260,-80 110,35 165,220 0,110 -165,220 -110,35 -260,-80 -75,-80
    " fill="#09090b" stroke="#000000" stroke-width="12"/>

    <filter id="street3D" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="10" dy="14" stdDeviation="0" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="16" dy="24" stdDeviation="16" flood-color="#a3e635" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Vivid Royal Blue Background (Ref 3 Signature) -->
  <rect width="${w}" height="${h}" fill="#1d4ed8"/>
  <rect width="${w}" height="${h}" fill="url(#halftoneDots)"/>

  <!-- Top Caution Hazard Tape -->
  <g transform="translate(0, 0)">
    <rect x="0" y="0" width="${w}" height="32" fill="url(#hazardStripe)"/>
    <rect x="0" y="28" width="${w}" height="4" fill="#000000"/>
  </g>

  <!-- Bottom Caution Hazard Tape -->
  <g transform="translate(0, ${h - 32})">
    <rect x="0" y="0" width="${w}" height="32" fill="url(#hazardStripe)"/>
    <rect x="0" y="0" width="${w}" height="4" fill="#000000"/>
  </g>

  <!-- Center Giant Black Star Graphic (Ref 3 Signature) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) scale(1.6, 1.15)" filter="url(#street3D)">
    <use href="#blackStar"/>
  </g>

  <!-- Y2K Sticker Bomb Accents -->
  <!-- 1. Yellow Smiley Face (Top-Right) -->
  <g transform="translate(${w - 140}, 110) rotate(15)" filter="url(#street3D)">
    <circle cx="0" cy="0" r="50" fill="#facc15" stroke="#000000" stroke-width="6"/>
    <ellipse cx="-18" cy="-12" rx="7" ry="14" fill="#000000"/>
    <ellipse cx="18" cy="-12" rx="7" ry="14" fill="#000000"/>
    <path d="M -25 12 Q 0 40 25 12" fill="none" stroke="#000000" stroke-width="7" stroke-linecap="round"/>
  </g>

  <!-- 2. Peace V-Sign Hand (Bottom-Right) -->
  <g transform="translate(${w - 170}, ${h - 130}) rotate(-12)" filter="url(#street3D)">
    <rect x="-35" y="-45" width="70" height="90" rx="35" fill="#ffffff" stroke="#000000" stroke-width="7"/>
    <path d="M -15 -45 L -15 -85 M 15 -45 L 15 -90" stroke="#000000" stroke-width="16" stroke-linecap="round"/>
    <path d="M -15 -45 L -15 -85 M 15 -45 L 15 -90" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
  </g>

  <!-- 3. Spray Can Graffiti Graphic (Bottom-Left) -->
  <g transform="translate(130, ${h - 130}) rotate(25)" filter="url(#street3D)">
    <rect x="-25" y="-50" width="50" height="100" rx="10" fill="#a3e635" stroke="#000000" stroke-width="6"/>
    <rect x="-12" y="-68" width="24" height="18" fill="#000000"/>
    <circle cx="0" cy="-75" r="6" fill="#facc15"/>
  </g>

  <!-- 4. Top-Left Street Pill ($420 / SPECIAL) -->
  <g transform="translate(160, 95) rotate(-10)" filter="url(#street3D)">
    <rect x="-70" y="-22" width="140" height="44" rx="8" fill="#a3e635" stroke="#000000" stroke-width="5"/>
    <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="22" font-weight="900" fill="#000000">
      ⚡ SPECIAL
    </text>
  </g>

  <!-- Central Street Graffiti Typography Group -->
  <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-4) skewX(-2)">
    
    <!-- Top Stencil Badge (Ref 3: 'VERIFICAÇÃO') -->
    <g transform="translate(0, -115)" filter="url(#street3D)">
      <rect x="-240" y="-24" width="480" height="48" rx="6" fill="#000000" stroke="#a3e635" stroke-width="4"/>
      <text x="0" y="9" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="3">
        ✦ ${item.badge} ✦
      </text>
    </g>

    <!-- Line 1: Ultra Giant Acid Neon Lime Street Headline (Ref 3: 'VENDAS') -->
    <g transform="translate(0, 0)" filter="url(#street3D)">
      <!-- Black Heavy Contour -->
      <text x="8" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="32" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
      <!-- Foreground Acid Lime Fill -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="url(#acidLimePop)" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Hot White & Yellow Headline -->
    <g transform="translate(0, 105)" filter="url(#street3D)">
      <text x="6" y="12" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="12" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>
  </g>

  <!-- Bottom Slogan Badge -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#street3D)">
    <rect x="-400" y="-18" width="800" height="36" rx="8" fill="#000000" stroke="#facc15" stroke-width="3"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="18" font-weight="900" fill="#a3e635" letter-spacing="1">
      ✦ ${item.subTag} ✦
    </text>
  </g>
</svg>`;
}

// ----------------------------------------------------------------------
// STYLE 4 (Ref 4: 갓생살다 스타일)
// 매트 젯블랙 배경 + 와이어프레임 아웃라인 잔상(Kinetic Wireframe Echo) + 사선 와이드 한글 + 알록달록 스티커 칩
// ----------------------------------------------------------------------
export function renderStyle4_EditorialKinetic(w, h, item) {
  const title1Size = calcFontSize(item.title1, 130, 8);
  const title2Size = calcFontSize(item.title2, 96, 12);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="editorialGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- Matte Jet Black Background (Ref 4 Signature) -->
  <rect width="${w}" height="${h}" fill="#09090b"/>

  <!-- Top & Bottom Kinetic Wireframe Echo Ghost Typography (Ref 4 Signature) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)">
    <!-- Top Echo 2 (Far) -->
    <text x="0" y="-230" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size * 0.95}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.25" letter-spacing="-3">
      ${item.title1}
    </text>
    <!-- Top Echo 1 (Near) -->
    <text x="0" y="-120" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.5" letter-spacing="-3">
      ${item.title1}
    </text>

    <!-- Bottom Echo 1 (Near) -->
    <text x="0" y="240" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.45" letter-spacing="-3">
      ${item.title1}
    </text>
    <!-- Bottom Echo 2 (Far) -->
    <text x="0" y="340" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size * 0.95}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.2" letter-spacing="-3">
      ${item.title1}
    </text>
  </g>

  <!-- Scattered Colorful Primary Sticker Pills (Ref 4 Signature) -->
  <!-- 1. Blue 'START NOW' Pill (Top-Right) -->
  <g transform="translate(${w - 180}, 90) rotate(10)" filter="url(#editorialGlow)">
    <rect x="-90" y="-22" width="180" height="44" rx="22" fill="#2563eb"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ START NOW
    </text>
  </g>

  <!-- 2. Green 'START NOW' Pill (Top-Left) -->
  <g transform="translate(180, 110) rotate(-12)" filter="url(#editorialGlow)">
    <rect x="-85" y="-20" width="170" height="40" rx="20" fill="#16a34a"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="17" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ HOT ISSUE
    </text>
  </g>

  <!-- 3. Circular Red Check Sticker (Left) -->
  <g transform="translate(120, 260) rotate(-15)" filter="url(#editorialGlow)">
    <circle cx="0" cy="0" r="42" fill="#ea580c"/>
    <text x="0" y="-6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
      2026 플래그십
    </text>
    <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="16" font-weight="900" fill="#ffffff">
      실무 검증
    </text>
  </g>

  <!-- 4. Round Blue & Yellow Check Badges -->
  <g transform="translate(${w - 240}, 180) rotate(5)">
    <circle cx="-35" cy="0" r="24" fill="#2563eb"/>
    <text x="-35" y="8" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="20" font-weight="900" fill="#ffffff">✔</text>
    <circle cx="20" cy="0" r="24" fill="#facc15"/>
    <text x="20" y="8" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="20" font-weight="900" fill="#000000">✔</text>
  </g>

  <!-- 5. Blue Starburst Emblem (Bottom-Right) -->
  <g transform="translate(${w - 180}, ${h - 220}) rotate(-10)" filter="url(#editorialGlow)">
    <polygon points="0,-45 15,-15 45,0 15,15 0,45 -15,15 -45,0 -15,-15" fill="#2563eb"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="15" font-weight="900" fill="#ffffff">
      AI 맞대결
    </text>
  </g>

  <!-- 6. Red 'START NOW' Pill (Bottom-Right) -->
  <g transform="translate(${w - 200}, ${h - 110}) rotate(8)" filter="url(#editorialGlow)">
    <rect x="-85" y="-20" width="170" height="40" rx="20" fill="#dc2626"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="17" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ VS MATCH
    </text>
  </g>

  <!-- Central Solid Giant White Headline (-4.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)" filter="url(#editorialGlow)">
    
    <!-- Top Red Arch Badge (Ref 4 Signature) -->
    <g transform="translate(0, -95)">
      <path d="M -90 15 L -90 -10 Q 0 -50 90 -10 L 90 15 Z" fill="#ea580c"/>
      <text x="0" y="4" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="20" font-weight="900" fill="#ffffff">
        ${item.badge}
      </text>
    </g>

    <!-- Main Solid Bold White Headline (Ref 4: '갓생살다') -->
    <g transform="translate(0, 15)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${item.title1}
      </text>
    </g>

    <!-- Second Line: Dynamic Fiery Red/Yellow Block -->
    <g transform="translate(0, 105)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="12" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>
  </g>

  <!-- Yellow Arch Ribbon (Ref 4: '오늘부터 갓생살기 시작합니다 ✔') -->
  <g transform="translate(${w / 2 - 120}, ${h - 110}) rotate(-5)" filter="url(#editorialGlow)">
    <rect x="-240" y="-22" width="480" height="44" rx="22" fill="#facc15"/>
    <text x="-15" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="18" font-weight="900" fill="#000000">
      ${item.subTag}
    </text>
    <circle cx="205" cy="0" r="16" fill="#ea580c"/>
    <text x="205" y="5" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#ffffff">✔</text>
  </g>
</svg>`;
}

// Master Dispatcher
export function renderThumbnailByStyle(w, h, item) {
  switch (item.style) {
    case 'style1_ecoclean':
      return renderStyle1_EcoClean(w, h, item);
    case 'style2_comicpop':
      return renderStyle2_ComicPop(w, h, item);
    case 'style3_streetgraffiti':
      return renderStyle3_StreetGraffiti(w, h, item);
    case 'style4_editorialkinetic':
    default:
      return renderStyle4_EditorialKinetic(w, h, item);
  }
}

async function runRender() {
  const TARGET_W = 1280;
  const TARGET_H = 720;

  for (const item of THUMBNAIL_CONFIGS) {
    const svgStr = renderThumbnailByStyle(TARGET_W, TARGET_H, item);
    const svgBuf = Buffer.from(svgStr);

    const outBuffer = await sharp(svgBuf)
      .jpeg({ quality: 96 })
      .toBuffer();

    fs.writeFileSync(item.target, outBuffer);
    console.log(`✅ [${item.style}] Created Distinct Thumbnail: ${item.target}`);
  }
}

runRender().catch(console.error);
