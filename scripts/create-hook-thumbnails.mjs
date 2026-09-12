import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_MAP = [
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/large_context_docs_1789200895293.jpg',
    target: 'public/images/blogs/large-context-docs-2026.jpg',
    badge: '⚡ 100만 토큰 시대',
    badgeColor: ['#3b82f6', '#1d4ed8'],
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
    badgeColor: ['#10b981', '#059669'],
    title1: 'AI 에이전트 대전환',
    title2: '반복 업무 100% 자동화'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_big_four_comparison_1789196554143.jpg',
    target: 'public/images/blogs/ai-big-4-comparison.jpg',
    badge: '⚔️ 2026 플래그십 맞대결',
    badgeColor: ['#f59e0b', '#d97706'],
    title1: 'AI 4대 천왕 격돌',
    title2: 'GPT-6 vs Claude vs Gemini'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/gpt_six_astra_agent_1789196576343.jpg',
    target: 'public/images/blogs/gpt-6-astra-agent.jpg',
    badge: '🔥 OpenAI 전격 공개',
    badgeColor: ['#ef4444', '#b91c1c'],
    title1: 'GPT-6 Astra 해부',
    title2: '화면 보고 PC 직접 조작!'
  }
];

export function generateVibrantHookSvg(w, h, badge, badgeColor, title1, title2) {
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Soft cinematic vignette with bottom-to-top subtle darkening for maximum text contrast -->
    <linearGradient id="bgScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.35"/>
      <stop offset="35%" stop-color="#000000" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.8"/>
    </linearGradient>
    
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${badgeColor[0]}"/>
      <stop offset="100%" stop-color="${badgeColor[1]}"/>
    </linearGradient>

    <linearGradient id="yellowText" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>

    <!-- Super Crisp Heavy Text Dropshadow Filter -->
    <filter id="megaShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.9"/>
    </filter>

    <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Background Scrim (Keeps illustration visible while making text ultra legible) -->
  <rect width="${w}" height="${h}" fill="url(#bgScrim)"/>

  <!-- Semi-transparent Center Backdrop Plate with glowing border -->
  <rect x="70" y="80" width="${w - 140}" height="${h - 160}" rx="32" fill="#030712" fill-opacity="0.55" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" filter="url(#badgeShadow)"/>

  <!-- Top Title Bar / Badge -->
  <g transform="translate(${w / 2}, 165)" filter="url(#badgeShadow)">
    <rect x="-240" y="-32" width="480" height="64" rx="32" fill="url(#badgeGrad)" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.6"/>
    <text x="0" y="11" text-anchor="middle" font-family="'Pretendard', 'Noto Sans KR', sans-serif" font-size="32" font-weight="900" fill="#ffffff" letter-spacing="1">
      ${badge}
    </text>
  </g>

  <!-- Main Headline 1 (Title Bar Body 1: Giant White with Heavy Outline) -->
  <g transform="translate(${w / 2}, 360)" filter="url(#megaShadow)">
    <text x="0" y="0" text-anchor="middle" font-family="'Pretendard', 'Noto Sans KR', sans-serif" font-size="94" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-1.5">
      ${title1}
    </text>
  </g>

  <!-- Main Headline 2 (Title Bar Body 2: Giant Glowing Gold with Heavy Outline) -->
  <g transform="translate(${w / 2}, 520)" filter="url(#megaShadow)">
    <text x="0" y="0" text-anchor="middle" font-family="'Pretendard', 'Noto Sans KR', sans-serif" font-size="82" font-weight="900" fill="url(#yellowText)" stroke="#000000" stroke-width="12" paint-order="stroke fill" letter-spacing="-1">
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

    // First resize base illustration to 1280x720 standard 16:9
    const resizedBg = await sharp(item.raw)
      .resize(TARGET_W, TARGET_H, { fit: 'cover', position: 'center' })
      .toBuffer();

    const svgStr = generateVibrantHookSvg(TARGET_W, TARGET_H, item.badge, item.badgeColor, item.title1, item.title2);
    const svgBuf = Buffer.from(svgStr);

    const outBuffer = await sharp(resizedBg)
      .composite([{ input: svgBuf, top: 0, left: 0 }])
      .jpeg({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(item.target, outBuffer);
    console.log(`✅ Rendered super-legible 1280x720 thumbnail: ${item.target}`);
  }
}

renderVibrantThumbnails().catch(console.error);
