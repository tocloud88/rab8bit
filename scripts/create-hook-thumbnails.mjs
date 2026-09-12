import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_MAP = [
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/large_context_docs_1789200895293.jpg',
    target: 'public/images/blogs/large-context-docs-2026.jpg',
    badge: '⚡ 100만 토큰 시대',
    badgeGrad: ['#2563eb', '#06b6d4'],
    accentColor: '#38bdf8',
    title1: '수백 장 문서·코드',
    title2: '단 1초 완벽 분석!',
    subTag: '🔥 2026 최신 대형 컨텍스트 프롬프트 완전 정복'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/vibe_coding_2026_1789200220893.jpg',
    target: 'public/images/blogs/vibe-coding-2026.jpg',
    badge: '🚀 1인 개발 혁명',
    badgeGrad: ['#ec4899', '#8b5cf6'],
    accentColor: '#f43f5e',
    title1: '바이브 코딩 정복',
    title2: '말만 하면 앱 완성!',
    subTag: '✨ 비개발자도 하루 만에 풀스택 서비스 배포'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_agent_workflow_1789200238978.jpg',
    target: 'public/images/blogs/ai-agent-workflow.jpg',
    badge: '🤖 실무 워크플로우',
    badgeGrad: ['#10b981', '#06b6d4'],
    accentColor: '#10b981',
    title1: 'AI 에이전트 대전환',
    title2: '반복 업무 100% 자동화!',
    subTag: '⚡ 컴퓨터 제어부터 실무 자동화 파이프라인 구축'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_big_four_comparison_1789196554143.jpg',
    target: 'public/images/blogs/ai-big-4-comparison.jpg',
    badge: '⚔️ 2026 플래그십 맞대결',
    badgeGrad: ['#f59e0b', '#ef4444'],
    accentColor: '#fbbf24',
    title1: 'AI 4대 천왕 격돌',
    title2: 'GPT-6 vs Claude vs Gemini',
    subTag: '💥 벤치마크 점수와 실무 코딩·작문 성능 전격 비교'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/gpt_six_astra_agent_1789196576343.jpg',
    target: 'public/images/blogs/gpt-6-astra-agent.jpg',
    badge: '🔥 OpenAI 전격 공개',
    badgeGrad: ['#ef4444', '#dc2626'],
    accentColor: '#f87171',
    title1: 'GPT-6 Astra 해부',
    title2: '화면 보고 PC 직접 조작!',
    subTag: '🎯 눈으로 보고 손으로 클릭하는 차세대 AI 비서'
  }
];

function calcFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(baseSize * (maxChars / len));
}

export function generateDynamicPopSvg(w, h, item) {
  const title1Size = calcFontSize(item.title1, 122, 9);
  const title2Size = calcFontSize(item.title2, 106, 11);
  const badgeWidth = Math.max(460, item.badge.length * 36 + 100);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Badge Linear Gradient -->
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${item.badgeGrad[0]}"/>
      <stop offset="100%" stop-color="${item.badgeGrad[1]}"/>
    </linearGradient>

    <!-- Neon Yellow Gradient for Highlight Text -->
    <linearGradient id="neonYellowGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="15%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>

    <!-- Neon Lime / Mint Gradient -->
    <linearGradient id="neonLimeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#a7f3d0"/>
      <stop offset="70%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>

    <!-- Heavy 3D Comic Drop Shadow Filter -->
    <filter id="comicShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="4" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="6" dy="18" stdDeviation="12" flood-color="#000000" flood-opacity="0.95"/>
      <feDropShadow dx="0" dy="28" stdDeviation="24" flood-color="#000000" flood-opacity="0.85"/>
    </filter>

    <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#000000" flood-opacity="0.75"/>
    </filter>

    <!-- Comic Burst Star Polygon -->
    <polygon id="comicStar" points="0,-35 10,-12 35,-15 18,5 25,30 3,18 -18,28 -12,5 -32,-12 -8,-15" fill="#facc15" stroke="#000000" stroke-width="4"/>
  </defs>

  <!-- Dynamic Tilted Main Visual Group (Inspired by Reference Images) -->
  <g transform="translate(${w / 2}, ${h / 2}) rotate(-3.5) skewX(-3)">
    
    <!-- Floating Graphic Comic Stars & Sparks -->
    <g transform="translate(-480, -220) rotate(-15) scale(1.3)" filter="url(#badgeShadow)">
      <use href="#comicStar" fill="#f43f5e" stroke="#000000" stroke-width="4"/>
    </g>
    <g transform="translate(480, -180) rotate(20) scale(1.4)" filter="url(#badgeShadow)">
      <use href="#comicStar" fill="#38bdf8" stroke="#000000" stroke-width="4"/>
    </g>
    <g transform="translate(-460, 160) rotate(10) scale(1.1)" filter="url(#badgeShadow)">
      <use href="#comicStar" fill="#facc15" stroke="#000000" stroke-width="4"/>
    </g>
    <g transform="translate(490, 140) rotate(-25) scale(1.3)" filter="url(#badgeShadow)">
      <use href="#comicStar" fill="#a3e635" stroke="#000000" stroke-width="4"/>
    </g>

    <!-- Floating Top-Left Sticker Pill: "START NOW" / "HOT ISSUE" -->
    <g transform="translate(-360, -230) rotate(-8)" filter="url(#badgeShadow)">
      <rect x="-110" y="-24" width="220" height="48" rx="24" fill="#000000" stroke="#facc15" stroke-width="4"/>
      <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="22" font-weight="900" fill="#facc15" letter-spacing="1">
        ✦ HOT ISSUE
      </text>
    </g>

    <!-- Floating Top-Right Sticker Pill -->
    <g transform="translate(360, -230) rotate(6)" filter="url(#badgeShadow)">
      <rect x="-100" y="-24" width="200" height="48" rx="24" fill="#f43f5e" stroke="#ffffff" stroke-width="3.5"/>
      <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="22" font-weight="900" fill="#ffffff" letter-spacing="1">
        🔥 2026 NEW
      </text>
    </g>

    <!-- Central Category Title Bar (Tilted Dynamic Ribbon) -->
    <g transform="translate(0, -150)" filter="url(#badgeShadow)">
      <!-- Angled Underline / Banner Backing -->
      <polygon points="-${badgeWidth / 2 + 30},-46 ${badgeWidth / 2 + 30},-46 ${badgeWidth / 2 + 10},46 -${badgeWidth / 2 + 10},46" fill="#000000"/>
      <polygon points="-${badgeWidth / 2 + 20},-42 ${badgeWidth / 2 + 20},-42 ${badgeWidth / 2 + 2},42 -${badgeWidth / 2 + 2},42" fill="url(#badgeGrad)" stroke="#ffffff" stroke-width="4"/>
      <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="38" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="6" paint-order="stroke fill" letter-spacing="1">
        ${item.badge}
      </text>
    </g>

    <!-- Line 1: Ultra Bold Dynamic White Headline with Heavy Double Black 3D Contour -->
    <g transform="translate(0, 40)" filter="url(#comicShadow)">
      <!-- Outer Black 3D Base -->
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
      <!-- Foreground Text with White Stroke & Crisp Fill -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Giant Dynamic Glowing Yellow/Green with Black 3D Contour -->
    <g transform="translate(0, 185)" filter="url(#comicShadow)">
      <!-- Outer Black 3D Base -->
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
      <!-- Foreground Text -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#neonYellowGrad)" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>

    <!-- Bottom Slanted Slogan Ribbon (Inspired by Ref Image 1 & 4) -->
    <g transform="translate(0, 275)" filter="url(#badgeShadow)">
      <polygon points="-460,-22 460,-22 445,22 -445,22" fill="#030712" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="0.5">
        ${item.subTag}
      </text>
    </g>
  </g>
</svg>`;
}

async function renderDynamicPopThumbnails() {
  const TARGET_W = 1280;
  const TARGET_H = 720;

  for (const item of RAW_MAP) {
    if (!fs.existsSync(item.raw)) {
      console.warn('Raw file missing:', item.raw);
      continue;
    }

    const resizedBg = await sharp(item.raw)
      .resize(TARGET_W, TARGET_H, { fit: 'cover', position: 'center' })
      .toBuffer();

    const svgStr = generateDynamicPopSvg(TARGET_W, TARGET_H, item);
    const svgBuf = Buffer.from(svgStr);

    const outBuffer = await sharp(resizedBg)
      .composite([{ input: svgBuf, top: 0, left: 0 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    fs.writeFileSync(item.target, outBuffer);
    console.log(`✅ Rendered Trendy K-Pop/YouTube Dynamic Thumbnail: ${item.target}`);
  }
}

renderDynamicPopThumbnails().catch(console.error);
