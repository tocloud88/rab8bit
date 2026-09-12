import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export function generateHookSvg(width, height, badge, title1, title2) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="darkGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617" stop-opacity="0.25"/>
      <stop offset="50%" stop-color="#020617" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="yellowGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="textGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
  </defs>

  <!-- Dark Backdrop -->
  <rect width="${width}" height="${height}" fill="url(#darkGrad)"/>

  <!-- Glassmorphic Backdrop Card (Translucent 48%) -->
  <rect x="${width * 0.05}" y="${height * 0.12}" width="${width * 0.9}" height="${height * 0.76}" rx="32" fill="#020617" fill-opacity="0.48" stroke="#818cf8" stroke-opacity="0.5" stroke-width="2.5" filter="url(#cardShadow)"/>

  <!-- Top Badge -->
  <g transform="translate(${width / 2}, ${height * 0.27})" filter="url(#textGlow)">
    <rect x="-170" y="-25" width="340" height="50" rx="25" fill="url(#badgeGrad)"/>
    <text x="0" y="9" text-anchor="middle" font-family="sans-serif" font-size="23" font-weight="bold" fill="#ffffff" letter-spacing="1">
      ${badge}
    </text>
  </g>

  <!-- Main Title 1 (White Ultra Bold) -->
  <g transform="translate(${width / 2}, ${height * 0.52})" filter="url(#textGlow)">
    <text x="0" y="0" text-anchor="middle" font-family="sans-serif" font-size="64" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="4" paint-order="stroke fill" letter-spacing="-0.5">
      ${title1}
    </text>
  </g>

  <!-- Main Title 2 (Yellow Glowing Bold) -->
  <g transform="translate(${width / 2}, ${height * 0.73})" filter="url(#textGlow)">
    <text x="0" y="0" text-anchor="middle" font-family="sans-serif" font-size="54" font-weight="900" fill="url(#yellowGrad)" stroke="#000000" stroke-width="4" paint-order="stroke fill" letter-spacing="-0.5">
      ${title2}
    </text>
  </g>
</svg>`;
}

async function renderAll() {
  const items = [
    {
      file: 'public/images/blogs/large-context-docs-2026.jpg',
      badge: '⚡ 100만 토큰 시대',
      title1: '수백 장 문서·코드',
      title2: '단 1초 완벽 분석법'
    },
    {
      file: 'public/images/blogs/vibe-coding-2026.jpg',
      badge: '🚀 1인 개발 혁명',
      title1: '바이브 코딩 정복',
      title2: '자연어로 앱 뚝딱 만들기'
    },
    {
      file: 'public/images/blogs/ai-agent-workflow.jpg',
      badge: '🤖 실무 워크플로우',
      title1: 'AI 에이전트 대전환',
      title2: '반복 업무 100% 자율화'
    },
    {
      file: 'public/images/blogs/ai-big-4-comparison.jpg',
      badge: '⚔️ 2026 플래그십',
      title1: 'AI 4대 천왕 맞대결',
      title2: 'GPT-6 · Claude 5 · Gemini 3'
    },
    {
      file: 'public/images/blogs/gpt-6-astra-agent.jpg',
      badge: '🔥 OpenAI 충격 공개',
      title1: 'GPT-6 Astra 전격 해부',
      title2: '화면 보고 PC 직접 조작'
    }
  ];

  for (const item of items) {
    if (!fs.existsSync(item.file)) continue;
    const orig = fs.readFileSync(item.file);
    const meta = await sharp(orig).metadata();
    const w = meta.width || 1200;
    const h = meta.height || 675;

    const svgStr = generateHookSvg(w, h, item.badge, item.title1, item.title2);
    const svgBuf = Buffer.from(svgStr);

    const out = await sharp(orig)
      .composite([{ input: svgBuf, top: 0, left: 0 }])
      .jpeg({ quality: 94 })
      .toBuffer();

    fs.writeFileSync(item.file, out);
    console.log('Composited with glassmorphism:', item.file);
  }
}

renderAll().catch(console.error);
