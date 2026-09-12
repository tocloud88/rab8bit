import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_MAP = [
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/large_context_docs_1789200895293.jpg',
    target: 'public/images/blogs/large-context-docs-2026.jpg',
    badge: '⚡ 100만 토큰 시대',
    title1: '수백 장 문서·코드',
    title2: '단 1초 완벽 분석'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/vibe_coding_2026_1789200220893.jpg',
    target: 'public/images/blogs/vibe-coding-2026.jpg',
    badge: '🚀 1인 개발 혁명',
    title1: '바이브 코딩 정복',
    title2: '자연어로 앱 만들기'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_agent_workflow_1789200238978.jpg',
    target: 'public/images/blogs/ai-agent-workflow.jpg',
    badge: '🤖 실무 워크플로우',
    title1: 'AI 에이전트 대전환',
    title2: '반복 업무 100% 자율화'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/ai_big_four_comparison_1789196554143.jpg',
    target: 'public/images/blogs/ai-big-4-comparison.jpg',
    badge: '⚔️ 2026 플래그십 맞대결',
    title1: 'AI 4대 천왕 비교',
    title2: 'GPT-6 · Claude · Gemini'
  },
  {
    raw: '/Users/tocloud/.gemini/antigravity-ide/brain/138b71e5-9592-4a62-bdb4-e9006ff453ba/gpt_six_astra_agent_1789196576343.jpg',
    target: 'public/images/blogs/gpt-6-astra-agent.jpg',
    badge: '🔥 OpenAI 전격 공개',
    title1: 'GPT-6 Astra 해부',
    title2: '화면 보고 PC 직접 조작'
  }
];

export function generateVibrantHookSvg(width, height, badge, title1, title2) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Soft Subtle Radial Vignette that preserves 100% background details -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.1"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.65"/>
    </radialGradient>
    
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#e11d48"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </linearGradient>

    <linearGradient id="yellowText" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>

    <!-- Ultra Heavy Drop Shadows for crisp readability over any vibrant background -->
    <filter id="heavyTextShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
  </defs>

  <!-- Transparent Vignette (Background shines through completely) -->
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>

  <!-- Top Badge Pill -->
  <g transform="translate(${width / 2}, ${height * 0.22})" filter="url(#heavyTextShadow)">
    <rect x="-160" y="-22" width="320" height="44" rx="22" fill="url(#badgeGrad)" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
    <text x="0" y="8" text-anchor="middle" font-family="sans-serif" font-size="21" font-weight="900" fill="#ffffff" letter-spacing="1">
      ${badge}
    </text>
  </g>

  <!-- Main Headline 1 (White Bold with 10px Black Outline) -->
  <g transform="translate(${width / 2}, ${height * 0.52})" filter="url(#heavyTextShadow)">
    <text x="0" y="0" text-anchor="middle" font-family="sans-serif" font-size="70" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="10" paint-order="stroke fill" letter-spacing="-1">
      ${title1}
    </text>
  </g>

  <!-- Main Headline 2 (Glowing Yellow with 9px Black Outline) -->
  <g transform="translate(${width / 2}, ${height * 0.76})" filter="url(#heavyTextShadow)">
    <text x="0" y="0" text-anchor="middle" font-family="sans-serif" font-size="60" font-weight="900" fill="url(#yellowText)" stroke="#000000" stroke-width="9" paint-order="stroke fill" letter-spacing="-0.5">
      ${title2}
    </text>
  </g>
</svg>`;
}

async function renderVibrantThumbnails() {
  for (const item of RAW_MAP) {
    if (!fs.existsSync(item.raw)) {
      console.warn('Raw file missing:', item.raw);
      continue;
    }

    const origBuffer = fs.readFileSync(item.raw);
    const meta = await sharp(origBuffer).metadata();
    const w = meta.width || 1200;
    const h = meta.height || 675;

    const svgStr = generateVibrantHookSvg(w, h, item.badge, item.title1, item.title2);
    const svgBuf = Buffer.from(svgStr);

    const outBuffer = await sharp(origBuffer)
      .composite([{ input: svgBuf, top: 0, left: 0 }])
      .jpeg({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(item.target, outBuffer);
    console.log(`✅ Rendered vibrant background thumbnail: ${item.target}`);
  }
}

renderVibrantThumbnails().catch(console.error);
