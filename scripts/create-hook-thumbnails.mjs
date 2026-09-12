import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_MAP = [
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/large_context_docs_1789200895293.jpg',
    target: 'public/images/blogs/large-context-docs-2026.jpg',
    badge: '⚡ 100만 토큰 시대',
    badgeColor: ['#2563eb', '#1d4ed8'],
    title1: '수백 장 문서·코드',
    title2: '단 1초 완벽 분석!'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/vibe_coding_2026_1789200220893.jpg',
    target: 'public/images/blogs/vibe-coding-2026.jpg',
    badge: '🚀 1인 개발 혁명',
    badgeColor: ['#ec4899', '#8b5cf6'],
    title1: '바이브 코딩 정복',
    title2: '말만 하면 앱 완성!'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_agent_workflow_1789200238978.jpg',
    target: 'public/images/blogs/ai-agent-workflow.jpg',
    badge: '🤖 실무 워크플로우',
    badgeColor: ['#059669', '#047857'],
    title1: 'AI 에이전트 대전환',
    title2: '반복 업무 100% 자동화'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_big_four_comparison_1789196554143.jpg',
    target: 'public/images/blogs/ai-big-4-comparison.jpg',
    badge: '⚔️ 2026 플래그십 맞대결',
    badgeColor: ['#d97706', '#b45309'],
    title1: 'AI 4대 천왕 격돌',
    title2: 'GPT-6 · Claude · Gemini'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/gpt_six_astra_agent_1789196576343.jpg',
    target: 'public/images/blogs/gpt-6-astra-agent.jpg',
    badge: '🔥 OpenAI 전격 공개',
    badgeColor: ['#dc2626', '#b91c1c'],
    title1: 'GPT-6 Astra 해부',
    title2: '화면 보고 PC 직접 조작!'
  }
];

function calcFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(baseSize * (maxChars / len));
}

export function generateVibrantHookSvg(w, h, badge, badgeColor, title1, title2) {
  const badgeWidth = Math.max(480, badge.length * 36 + 120);
  const title1Size = calcFontSize(title1, 116, 10);
  const title2Size = calcFontSize(title2, 98, 11);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Badge Gradient -->
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${badgeColor[0]}"/>
      <stop offset="100%" stop-color="${badgeColor[1]}"/>
    </linearGradient>

    <!-- Glowing Yellow Gradient for Subtitle -->
    <linearGradient id="yellowText" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>

    <!-- Super Heavy Double Drop Shadow Filter for zero-background maximum legibility -->
    <filter id="megaShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#000000" flood-opacity="0.9"/>
    </filter>

    <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- NO TEXT BACKGROUND / NO SCRIM: Raw illustration is 100% visible -->

  <!-- Top Title Bar / Badge (Enlarged & Paperlogy font) -->
  <g transform="translate(${w / 2}, 145)" filter="url(#badgeShadow)">
    <rect x="-${badgeWidth / 2}" y="-42" width="${badgeWidth}" height="84" rx="42" fill="url(#badgeGrad)" stroke="#ffffff" stroke-width="3.5" stroke-opacity="0.9"/>
    <text x="0" y="15" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="42" font-weight="900" fill="#ffffff" letter-spacing="0.5">
      ${badge}
    </text>
  </g>

  <!-- Main Headline 1 (Giant White with 18px Heavy Outline, Paperlogy font) -->
  <g transform="translate(${w / 2}, 365)" filter="url(#megaShadow)">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="18" paint-order="stroke fill" letter-spacing="-2">
      ${title1}
    </text>
  </g>

  <!-- Main Headline 2 (Giant Glowing Gold with 16px Heavy Outline, Paperlogy font) -->
  <g transform="translate(${w / 2}, 545)" filter="url(#megaShadow)">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#yellowText)" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-1.5">
      ${title2}
    </text>
  </g>
</svg>`;
}

async function renderVibrantThumbnails() {
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

    const svgStr = generateVibrantHookSvg(TARGET_W, TARGET_H, item.badge, item.badgeColor, item.title1, item.title2);
    const svgBuf = Buffer.from(svgStr);

    const outBuffer = await sharp(resizedBg)
      .composite([{ input: svgBuf, top: 0, left: 0 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    fs.writeFileSync(item.target, outBuffer);
    console.log(`✅ Rendered 100% background-preserving Paperlogy thumbnail: ${item.target}`);
  }
}

renderVibrantThumbnails().catch(console.error);
