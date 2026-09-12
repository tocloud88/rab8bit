import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Category style mapping
export const THUMBNAIL_CONFIGS = [
  {
    id: 'large-context-docs-2026',
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/large_context_docs_1789200895293.jpg',
    target: 'public/images/blogs/large-context-docs-2026.jpg',
    style: 'style1_hightech',
    badge: '100만 토큰 시대',
    tagIcon: '⚡',
    title1: '수백 장 문서·코드',
    title2: '단 1초 완벽 분석!',
    subTag: '2026 최신 대형 컨텍스트 프롬프트 완전 정복',
    hudLabel: '01 // DEEP DOCS ANALYSIS'
  },
  {
    id: 'vibe-coding-2026',
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/vibe_coding_2026_1789200220893.jpg',
    target: 'public/images/blogs/vibe-coding-2026.jpg',
    style: 'style3_streetgraffiti',
    badge: '1인 개발 혁명',
    tagIcon: '🚀',
    title1: '바이브 코딩 정복',
    title2: '말만 하면 앱 완성!',
    subTag: '비개발자도 하루 만에 풀스택 서비스 배포',
    cautionText: 'CAUTION: VIBE CODING ZONE'
  },
  {
    id: 'ai-agent-workflow',
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_agent_workflow_1789200238978.jpg',
    target: 'public/images/blogs/ai-agent-workflow.jpg',
    style: 'style2_comicburst',
    badge: '실무 워크플로우',
    tagIcon: '🤖',
    title1: 'AI 에이전트 대전환',
    title2: '반복 업무 100% 자동화!',
    subTag: '컴퓨터 제어부터 실무 자동화 파이프라인 구축',
    burstText: '100% 자율화'
  },
  {
    id: 'ai-big-4-comparison',
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_big_four_comparison_1789196554143.jpg',
    target: 'public/images/blogs/ai-big-4-comparison.jpg',
    style: 'style4_editorialkinetic',
    badge: '2026 플래그십 맞대결',
    tagIcon: '⚔️',
    title1: 'AI 4대 천왕 격돌',
    title2: 'GPT-6 vs Claude vs Gemini',
    subTag: '벤치마크 점수와 실무 코딩·작문 성능 전격 비교',
    vsBadge: 'VS MATCH'
  },
  {
    id: 'gpt-6-astra-agent',
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/gpt_six_astra_agent_1789196576343.jpg',
    target: 'public/images/blogs/gpt-6-astra-agent.jpg',
    style: 'style4_editorialkinetic',
    badge: 'OpenAI 전격 공개',
    tagIcon: '🔥',
    title1: 'GPT-6 Astra 해부',
    title2: '화면 보고 PC 직접 조작!',
    subTag: '눈으로 보고 손으로 클릭하는 차세대 AI 비서',
    vsBadge: 'ASTRA'
  }
];

function calcFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(baseSize * (maxChars / len));
}

// -------------------------------------------------------------
// STYLE 1: Clean High-Tech Dynamic Slant (Ref 1: 한국형 무공해차)
// Electric Cyan & Royal Blue, Tech Slanted Ribbons, HUD Brackets, Loop Arrow
// -------------------------------------------------------------
export function generateStyle1_HighTech(w, h, item) {
  const title1Size = calcFontSize(item.title1, 120, 9);
  const title2Size = calcFontSize(item.title2, 106, 11);
  const badgeWidth = Math.max(480, item.badge.length * 36 + 120);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="techCyanGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <linearGradient id="textCyanGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#e0f2fe"/>
      <stop offset="75%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <linearGradient id="yellowHighlight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#fef08a"/>
      <stop offset="80%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>

    <filter id="techGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="tech3DShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="6" flood-color="#030712" flood-opacity="1"/>
      <feDropShadow dx="6" dy="24" stdDeviation="16" flood-color="#0284c7" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Futuristic Corner HUD UI -->
  <g opacity="0.85">
    <!-- Top-Left HUD Corner -->
    <path d="M 40 100 L 40 40 L 100 40" fill="none" stroke="#38bdf8" stroke-width="4"/>
    <circle cx="40" cy="40" r="4" fill="#38bdf8"/>
    <text x="60" y="65" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="16" font-weight="800" fill="#38bdf8" letter-spacing="2">
      ${item.hudLabel || 'SYS // VERIFIED AI GUIDE'}
    </text>

    <!-- Top-Right HUD Pill -->
    <g transform="translate(${w - 180}, 50)">
      <rect x="-80" y="-18" width="160" height="36" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="-55" cy="0" r="4" fill="#22c55e"/>
      <text x="5" y="6" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#e0f2fe" letter-spacing="1">
        LIVE REPORT
      </text>
    </g>

    <!-- Bottom-Right HUD Corner -->
    <path d="M ${w - 40} ${h - 100} L ${w - 40} ${h - 40} L ${w - 100} ${h - 40}" fill="none" stroke="#38bdf8" stroke-width="4"/>
  </g>

  <!-- Main Angled Slanted Content Group (-4 deg slant like Ref 1) -->
  <g transform="translate(${w / 2}, ${h / 2}) rotate(-3.5) skewX(-4)">
    
    <!-- Decorative Tech Loop Arrow (Right side) -->
    <g transform="translate(480, -30) rotate(15) scale(1.1)" opacity="0.9" filter="url(#techGlow)">
      <path d="M -40 -30 C 20 -60, 80 0, 40 50 C 10 90, -50 60, -40 20" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
      <polygon points="50,40 30,65 65,65" fill="#38bdf8"/>
      <circle cx="-40" cy="-30" r="7" fill="#facc15"/>
    </g>

    <!-- Left Tech Diamond Star -->
    <g transform="translate(-480, -100) scale(1.2)" filter="url(#techGlow)">
      <polygon points="0,-30 10,-8 32,0 10,8 0,30 -10,8 -32,0 -10,-8" fill="#38bdf8"/>
      <circle cx="0" cy="0" r="6" fill="#ffffff"/>
    </g>

    <!-- Slanted Tech Parallelogram Ribbon Badge (Top) -->
    <g transform="translate(0, -150)" filter="url(#tech3DShadow)">
      <!-- Black Base Shadow Polygon -->
      <polygon points="-${badgeWidth / 2 + 25},-44 ${badgeWidth / 2 + 25},-44 ${badgeWidth / 2 + 5},44 -${badgeWidth / 2 + 5},44" fill="#000000"/>
      <!-- Glowing Cyan Ribbon -->
      <polygon points="-${badgeWidth / 2 + 16},-40 ${badgeWidth / 2 + 16},-40 ${badgeWidth / 2 - 4},40 -${badgeWidth / 2 - 4},40" fill="url(#techCyanGrad)" stroke="#ffffff" stroke-width="4"/>
      <!-- Decorative Side Diamonds -->
      <polygon points="-${badgeWidth / 2 - 20},0 -${badgeWidth / 2 - 10},-12 -${badgeWidth / 2},0 -${badgeWidth / 2 - 10},12" fill="#ffffff"/>
      <polygon points="${badgeWidth / 2 - 40},0 ${badgeWidth / 2 - 30},-12 ${badgeWidth / 2 - 20},0 ${badgeWidth / 2 - 30},12" fill="#ffffff"/>
      <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="36" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="6" paint-order="stroke fill" letter-spacing="1">
        ${item.badge}
      </text>
    </g>

    <!-- Line 1: Ultra High-Tech Solid White Headline -->
    <g transform="translate(0, 35)" filter="url(#tech3DShadow)">
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#0369a1" stroke-width="12" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Glowing Tech Yellow Headline -->
    <g transform="translate(0, 180)" filter="url(#tech3DShadow)">
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#yellowHighlight)" stroke="#000000" stroke-width="12" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>

    <!-- Bottom Slanted Navy Pill Slogan -->
    <g transform="translate(0, 275)" filter="url(#tech3DShadow)">
      <polygon points="-470,-22 470,-22 450,22 -450,22" fill="#082f49" stroke="#38bdf8" stroke-width="3"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="21" font-weight="900" fill="#e0f2fe" letter-spacing="1">
        ✦ ${item.subTag} ✦
      </text>
    </g>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// STYLE 2: Comic Pop Burst & Lightning (Ref 2: 슬기로운 전기차생활)
// Multi-pointed Comic Starburst Plate, Neon Mint & Yellow, Chunky 3D & Lightning Bolts
// -------------------------------------------------------------
export function generateStyle2_ComicBurst(w, h, item) {
  const title1Size = calcFontSize(item.title1, 118, 9);
  const title2Size = calcFontSize(item.title2, 104, 11);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mintGreenGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#a7f3d0"/>
      <stop offset="70%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>

    <linearGradient id="burstYellowGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>

    <linearGradient id="comicBubbleGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>

    <filter id="comicPopShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="6" dy="12" stdDeviation="0" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="12" dy="24" stdDeviation="16" flood-color="#000000" flood-opacity="0.85"/>
    </filter>

    <!-- Lightning Bolt Polygon -->
    <polygon id="lightningBolt" points="0,-45 18,-10 4,-5 22,35 -6,0 6,-8" fill="#facc15" stroke="#000000" stroke-width="4"/>
  </defs>

  <g transform="translate(${w / 2}, ${h / 2}) rotate(-2.5)">
    
    <!-- Giant Multi-Point Comic Explosion Starburst Backdrop -->
    <g transform="scale(1.4, 0.95)" filter="url(#comicPopShadow)" opacity="0.95">
      <polygon points="
        0,-260 45,-210 110,-240 130,-180 200,-190 190,-130 250,-115 220,-60 270,-20 225,30 260,85 195,115 210,180 145,185 135,250 80,225 35,270
        -20,240 -70,270 -100,220 -160,235 -170,175 -230,165 -215,110 -265,75 -230,25 -260,-30 -210,-65 -235,-130 -170,-140 -170,-205 -110,-190 -70,-250
      " fill="url(#burstYellowGrad)" stroke="#000000" stroke-width="10"/>
    </g>

    <!-- Floating Comic Lightning Bolts -->
    <g transform="translate(-460, -180) rotate(-25) scale(1.6)" filter="url(#comicPopShadow)">
      <use href="#lightningBolt" fill="#facc15"/>
    </g>
    <g transform="translate(470, -160) rotate(30) scale(1.5)" filter="url(#comicPopShadow)">
      <use href="#lightningBolt" fill="#38bdf8"/>
    </g>
    <g transform="translate(480, 150) rotate(-15) scale(1.3)" filter="url(#comicPopShadow)">
      <use href="#lightningBolt" fill="#facc15"/>
    </g>
    <g transform="translate(-480, 140) rotate(15) scale(1.4)" filter="url(#comicPopShadow)">
      <use href="#lightningBolt" fill="#34d399"/>
    </g>

    <!-- Confetti Dots -->
    <circle cx="-380" cy="-90" r="14" fill="#f43f5e" stroke="#000000" stroke-width="3"/>
    <circle cx="390" cy="-80" r="16" fill="#10b981" stroke="#000000" stroke-width="3"/>
    <circle cx="-360" cy="80" r="12" fill="#3b82f6" stroke="#000000" stroke-width="3"/>
    <circle cx="410" cy="90" r="15" fill="#facc15" stroke="#000000" stroke-width="3"/>

    <!-- Rounded Comic Bubble Badge (Top) -->
    <g transform="translate(0, -155)" filter="url(#comicPopShadow)">
      <rect x="-250" y="-38" width="500" height="76" rx="38" fill="url(#comicBubbleGrad)" stroke="#000000" stroke-width="6"/>
      <circle cx="-200" cy="0" r="14" fill="#facc15" stroke="#000000" stroke-width="3"/>
      <circle cx="200" cy="0" r="14" fill="#facc15" stroke="#000000" stroke-width="3"/>
      <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="34" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="4" paint-order="stroke fill" letter-spacing="1">
        ${item.badge}
      </text>
    </g>

    <!-- Line 1: Ultra Chunky Comic Title with Crisp White & Hard Black Base -->
    <g transform="translate(0, 35)" filter="url(#comicPopShadow)">
      <text x="6" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Neon Mint Pop Accent Headline -->
    <g transform="translate(0, 180)" filter="url(#comicPopShadow)">
      <text x="6" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#mintGreenGrad)" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>

    <!-- Bottom Yellow Comic Ribbon -->
    <g transform="translate(0, 275)" filter="url(#comicPopShadow)">
      <rect x="-440" y="-24" width="880" height="48" rx="14" fill="#facc15" stroke="#000000" stroke-width="4"/>
      <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="21" font-weight="900" fill="#000000" letter-spacing="0.5">
        ✦ ${item.subTag} ✦
      </text>
    </g>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// STYLE 3: Cyberpunk / Y2K Street Graffiti (Ref 3: VERIFICAÇÃO VENDAS)
// Acid Neon Lime + Hot Magenta Pink, Yellow/Black Caution Stripes, Smiley Face & Street Vibe
// -------------------------------------------------------------
export function generateStyle3_StreetGraffiti(w, h, item) {
  const title1Size = calcFontSize(item.title1, 122, 9);
  const title2Size = calcFontSize(item.title2, 108, 11);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Diagonal Yellow/Black Caution Hazard Stripes Pattern -->
    <pattern id="cautionPattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="20" height="40" fill="#facc15"/>
      <rect x="20" width="20" height="40" fill="#000000"/>
    </pattern>

    <linearGradient id="acidLimeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#d9f99d"/>
      <stop offset="65%" stop-color="#a3e635"/>
      <stop offset="100%" stop-color="#65a30d"/>
    </linearGradient>

    <linearGradient id="hotPinkGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fbcfe8"/>
      <stop offset="70%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>

    <filter id="streetShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="8" dy="10" stdDeviation="0" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="0" dy="20" stdDeviation="14" flood-color="#ec4899" flood-opacity="0.35"/>
    </filter>

    <!-- Smiley Face Vector Component -->
    <g id="acidSmiley">
      <circle cx="0" cy="0" r="45" fill="#facc15" stroke="#000000" stroke-width="6"/>
      <ellipse cx="-16" cy="-10" rx="6" ry="12" fill="#000000"/>
      <ellipse cx="16" cy="-10" rx="6" ry="12" fill="#000000"/>
      <path d="M -22 10 Q 0 34 22 10" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
    </g>

    <!-- Street Crosshair Marker -->
    <g id="crosshair">
      <line x1="-20" y1="-20" x2="20" y2="20" stroke="#a3e635" stroke-width="8" stroke-linecap="round"/>
      <line x1="-20" y1="20" x2="20" y2="-20" stroke="#a3e635" stroke-width="8" stroke-linecap="round"/>
    </g>

    <!-- Vector Warning Triangle -->
    <g id="warningTriangle">
      <polygon points="0,-18 16,14 -16,14" fill="#facc15" stroke="#000000" stroke-width="2"/>
      <polygon points="0,-12 10,10 -10,10" fill="#facc15"/>
      <rect x="-2" y="-4" width="4" height="8" fill="#000000"/>
      <circle cx="0" cy="7" r="2" fill="#000000"/>
    </g>
  </defs>

  <!-- Top Caution Stripe Bar across full width -->
  <g transform="translate(0, 0)">
    <rect x="0" y="0" width="${w}" height="28" fill="url(#cautionPattern)"/>
    <rect x="0" y="24" width="${w}" height="4" fill="#000000"/>
  </g>

  <g transform="translate(${w / 2}, ${h / 2}) rotate(-4) skewX(-2)">
    
    <!-- Floating Y2K Acid Smiley Face Badge (Top-Left) -->
    <g transform="translate(-460, -180) rotate(-15) scale(1.1)" filter="url(#streetShadow)">
      <use href="#acidSmiley"/>
    </g>

    <!-- Floating Crosshair Badges -->
    <g transform="translate(480, -160) rotate(15) scale(1.2)" filter="url(#streetShadow)">
      <use href="#crosshair"/>
    </g>
    <g transform="translate(-470, 150) rotate(20) scale(1)" filter="url(#streetShadow)">
      <use href="#crosshair"/>
    </g>

    <!-- Top Hazard Caution Strip Label: "VIBE CODING ZONE" -->
    <g transform="translate(0, -160)" filter="url(#streetShadow)">
      <rect x="-270" y="-34" width="540" height="68" fill="#facc15" stroke="#000000" stroke-width="6"/>
      <rect x="-260" y="-24" width="520" height="48" fill="#000000"/>
      <!-- Warning Triangles -->
      <g transform="translate(-210, 0) scale(1.3)"><use href="#warningTriangle"/></g>
      <g transform="translate(210, 0) scale(1.3)"><use href="#warningTriangle"/></g>
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="28" font-weight="900" fill="#a3e635" letter-spacing="2">
        ${item.badge}
      </text>
    </g>

    <!-- Line 1: Acid Neon Lime Street Headline with Heavy Solid Black Block Contour -->
    <g transform="translate(0, 35)" filter="url(#streetShadow)">
      <text x="8" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="url(#acidLimeGrad)" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Hot Magenta Pink Headline -->
    <g transform="translate(0, 180)" filter="url(#streetShadow)">
      <text x="8" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#hotPinkGrad)" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>

    <!-- Bottom Street Graffiti Tape Ribbon -->
    <g transform="translate(0, 275)" filter="url(#streetShadow)">
      <polygon points="-460,-24 460,-24 450,24 -450,24" fill="#ec4899" stroke="#000000" stroke-width="5"/>
      <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="22" font-weight="900" fill="#ffffff" letter-spacing="0.5">
        ✦ ${item.subTag} ✦
      </text>
    </g>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// STYLE 4: Editorial Kinetic Sticker & Flame Duel (Ref 4: 갓생살다 / VS Match)
// Red & Orange Flame Gradient, Offset Kinetic Outline Trails, "VS MATCH" Pill & Sports Duel Vibe
// -------------------------------------------------------------
export function generateStyle4_EditorialKinetic(w, h, item) {
  const title1Size = calcFontSize(item.title1, 120, 9);
  const title2Size = calcFontSize(item.title2, 102, 11);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="flameRedGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#facc15"/>
    </linearGradient>

    <linearGradient id="duelTextGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ffedd5"/>
      <stop offset="70%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>

    <filter id="kineticShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="6" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="#ef4444" flood-opacity="0.45"/>
    </filter>

    <!-- Flame Icon Vector -->
    <g id="flameIcon">
      <path d="M 0 -35 C 10 -20 25 -10 25 10 C 25 25 15 35 0 35 C -15 35 -25 25 -25 10 C -25 -5 -10 -15 0 -35 Z" fill="#ef4444" stroke="#ffffff" stroke-width="3"/>
      <path d="M 0 -15 C 6 -5 14 0 14 12 C 14 20 8 26 0 26 C -8 26 -14 20 -14 12 C -14 3 -5 -3 0 -15 Z" fill="#facc15"/>
    </g>
  </defs>

  <!-- Speed Slash Background Accents -->
  <g opacity="0.4">
    <line x1="80" y1="0" x2="0" y2="${h}" stroke="#ef4444" stroke-width="12" stroke-linecap="round"/>
    <line x1="120" y1="0" x2="40" y2="${h}" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>
    <line x1="${w - 80}" y1="0" x2="${w - 160}" y2="${h}" stroke="#ef4444" stroke-width="12" stroke-linecap="round"/>
    <line x1="${w - 40}" y1="0" x2="${w - 120}" y2="${h}" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
  </g>

  <g transform="translate(${w / 2}, ${h / 2}) rotate(-3) skewX(-3)">
    
    <!-- Top-Left Flame Sticker -->
    <g transform="translate(-460, -180) rotate(-15) scale(1.3)" filter="url(#kineticShadow)">
      <use href="#flameIcon"/>
    </g>

    <!-- Top-Right Circular "VS MATCH" Emblem -->
    <g transform="translate(470, -160) rotate(15)" filter="url(#kineticShadow)">
      <circle cx="0" cy="0" r="46" fill="#dc2626" stroke="#ffffff" stroke-width="5"/>
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="22" font-weight="900" fill="#facc15" letter-spacing="1">
        ${item.vsBadge || 'VS'}
      </text>
    </g>

    <!-- Top Angled Flame Ribbon Badge with Vector Flames on sides -->
    <g transform="translate(0, -150)" filter="url(#kineticShadow)">
      <polygon points="-270,-40 270,-40 250,40 -250,40" fill="#000000"/>
      <polygon points="-260,-34 260,-34 242,34 -242,34" fill="url(#flameRedGrad)" stroke="#ffffff" stroke-width="4"/>
      <!-- Small side flames -->
      <g transform="translate(-215, 0) scale(0.6)"><use href="#flameIcon"/></g>
      <g transform="translate(215, 0) scale(0.6)"><use href="#flameIcon"/></g>
      <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="34" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="5" paint-order="stroke fill" letter-spacing="1">
        ${item.badge}
      </text>
    </g>

    <!-- Kinetic Outline Echo Trail for Line 1 (Visual Echo Effect from Ref 4) -->
    <g transform="translate(0, 35)">
      <!-- Kinetic Echo 2 (Far) -->
      <text x="0" y="-12" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="none" stroke="#ef4444" stroke-width="3" opacity="0.35" letter-spacing="-2">
        ${item.title1}
      </text>
      <!-- Kinetic Echo 1 (Near) -->
      <text x="0" y="-6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="none" stroke="#f97316" stroke-width="4" opacity="0.6" letter-spacing="-2">
        ${item.title1}
      </text>

      <!-- Solid Foreground Line 1 -->
      <g filter="url(#kineticShadow)">
        <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-2">
          ${item.title1}
        </text>
        <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#991b1b" stroke-width="12" paint-order="stroke fill" letter-spacing="-2">
          ${item.title1}
        </text>
      </g>
    </g>

    <!-- Line 2: Hot Fiery Red/Amber Duel Headline -->
    <g transform="translate(0, 180)" filter="url(#kineticShadow)">
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#duelTextGrad)" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>

    <!-- Bottom Slanted Flame Duel Ribbon -->
    <g transform="translate(0, 275)" filter="url(#kineticShadow)">
      <polygon points="-460,-22 460,-22 445,22 -445,22" fill="#030712" stroke="#ef4444" stroke-width="3"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="21" font-weight="900" fill="#ffffff" letter-spacing="0.5">
        ✦ ${item.subTag} ✦
      </text>
    </g>
  </g>
</svg>`;
}

// Master Dispatcher by Style
export function generateThumbnailSvgByStyle(w, h, item) {
  switch (item.style) {
    case 'style1_hightech':
      return generateStyle1_HighTech(w, h, item);
    case 'style2_comicburst':
      return generateStyle2_ComicBurst(w, h, item);
    case 'style3_streetgraffiti':
      return generateStyle3_StreetGraffiti(w, h, item);
    case 'style4_editorialkinetic':
    default:
      return generateStyle4_EditorialKinetic(w, h, item);
  }
}

async function renderThumbnails() {
  const TARGET_W = 1280;
  const TARGET_H = 720;

  for (const item of THUMBNAIL_CONFIGS) {
    if (!fs.existsSync(item.raw)) {
      console.warn('Raw file missing:', item.raw);
      continue;
    }

    const resizedBg = await sharp(item.raw)
      .resize(TARGET_W, TARGET_H, { fit: 'cover', position: 'center' })
      .toBuffer();

    const svgStr = generateThumbnailSvgByStyle(TARGET_W, TARGET_H, item);
    const svgBuf = Buffer.from(svgStr);

    const outBuffer = await sharp(resizedBg)
      .composite([{ input: svgBuf, top: 0, left: 0 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    fs.writeFileSync(item.target, outBuffer);
    console.log(`✅ [${item.style}] Rendered: ${item.target}`);
  }
}

renderThumbnails().catch(console.error);
