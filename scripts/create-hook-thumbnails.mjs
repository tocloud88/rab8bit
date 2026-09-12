import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function calcFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(baseSize * (maxChars / len));
}

// -----------------------------------------------------------------------------
// Content Analyzer: Extracts punchy 2-line hooking copy & theme
// -----------------------------------------------------------------------------
export function parseHookingCopy(post) {
  const rawTitle = (post.title || '').trim();
  const tags = post.tags || [];
  
  let badge = tags[0] || '2026 AI 트렌드';
  let title1 = '';
  let title2 = '';
  let subTag = (post.excerpt || '2026 대한민국 1위 AI 포털').slice(0, 24) + '...';

  // Colon or quote split
  if (rawTitle.includes(':')) {
    const parts = rawTitle.split(':');
    badge = parts[0].replace(/\[.*?\]/g, '').trim().slice(0, 14);
    const rest = parts.slice(1).join(':').trim();
    const words = rest.split(' ');
    const mid = Math.ceil(words.length / 2);
    title1 = words.slice(0, mid).join(' ');
    title2 = words.slice(mid).join(' ');
  } else if (rawTitle.includes('—') || rawTitle.includes('-')) {
    const parts = rawTitle.split(/[—-]/);
    title1 = parts[0].trim().replace(/["'“”]/g, '');
    title2 = (parts[1] || '').trim().replace(/["'“”]/g, '');
  } else {
    const words = rawTitle.split(' ');
    const mid = Math.ceil(words.length / 2);
    title1 = words.slice(0, mid).join(' ');
    title2 = words.slice(mid).join(' ');
  }

  // Clean brackets and special chars
  title1 = title1.replace(/["'“”]/g, '').trim();
  title2 = title2.replace(/["'“”]/g, '').trim();

  if (!title2) {
    if (title1.length > 10) {
      const half = Math.floor(title1.length / 2);
      title2 = title1.slice(half).trim();
      title1 = title1.slice(0, half).trim();
    } else {
      title2 = '완벽 가이드';
    }
  }

  return { badge, title1, title2, subTag };
}

// -----------------------------------------------------------------------------
// Detect Specific Content Scene Theme
// -----------------------------------------------------------------------------
export function detectSceneTheme(post) {
  const id = post.id || '';
  const title = post.title || '';
  const tags = (post.tags || []).join(' ');
  const text = (id + ' ' + title + ' ' + tags).toLowerCase();

  if (text.includes('통장') || text.includes('보안') || text.includes('bank') || text.includes('위험') || text.includes('취약') || text.includes('장애')) {
    return 'bank_security';
  } else if (text.includes('gpt-6') || text.includes('astra') || text.includes('에이전트') || text.includes('agent') || text.includes('컴퓨터')) {
    return 'ai_agent_lab';
  } else if (text.includes('주가') || text.includes('주식') || text.includes('재테크') || text.includes('수익률') || text.includes('투자')) {
    return 'stock_trading';
  } else if (text.includes('바이브 코딩') || text.includes('vibe') || text.includes('90개') || text.includes('개발') || text.includes('bolt') || text.includes('supabase')) {
    return 'vibe_coding';
  } else if (text.includes('claude') || text.includes('클로드') || text.includes('아티팩트') || text.includes('엑셀') || text.includes('opus')) {
    return 'claude_workspace';
  } else if (text.includes('gemini') || text.includes('제미나이') || text.includes('google ai') || text.includes('구글')) {
    return 'gemini_lab';
  } else if (text.includes('논문') || text.includes('보고서') || text.includes('100만 토큰') || text.includes('notebooklm') || text.includes('문서')) {
    return 'document_archive';
  } else if (text.includes('애드센스') || text.includes('seo') || text.includes('aeo') || text.includes('검색') || text.includes('트래픽') || text.includes('스냅블로그')) {
    return 'seo_traffic';
  } else if (text.includes('이미지') || text.includes('미드저니') || text.includes('lyria') || text.includes('음악') || text.includes('인포그래픽') || text.includes('창의력')) {
    return 'creative_media';
  } else if (text.includes('회의') || text.includes('생산성') || text.includes('일잘러') || text.includes('시간') || text.includes('리더')) {
    return 'smart_productivity';
  } else if (text.includes('레트로') || text.includes('게임') || text.includes('낚시') || text.includes('월드컵') || text.includes('world cup')) {
    return 'retro_gaming';
  } else if (text.includes('터미널') || text.includes('cli') || text.includes('마크다운') || text.includes('html')) {
    return 'terminal_hacker';
  } else {
    return 'ai_core_universe';
  }
}

// -----------------------------------------------------------------------------
// Rich Thematic Realistic Background Scene Generator (1280x720)
// Generates a content-specific atmospheric scene behind the text
// -----------------------------------------------------------------------------
export function renderThematicBackgroundScene(theme, w = 1280, h = 720) {
  switch (theme) {
    case 'bank_security':
      return `
        <!-- Bank Vault & Cyber Security Scene -->
        <rect width="${w}" height="${h}" fill="#050813"/>
        <!-- Radial Vault Backlight -->
        <radialGradient id="vaultGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.8"/>
          <stop offset="60%" stop-color="#091024" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020408" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#vaultGlow)"/>

        <!-- High-Tech Heavy Steel Vault Door Rings -->
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.35">
          <circle cx="0" cy="0" r="320" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="24,12"/>
          <circle cx="0" cy="0" r="260" fill="none" stroke="#60a5fa" stroke-width="8"/>
          <circle cx="0" cy="0" r="200" fill="none" stroke="#93c5fd" stroke-width="3" stroke-dasharray="8,8"/>
          <!-- Vault Spokes -->
          <line x1="-300" y1="0" x2="300" y2="0" stroke="#38bdf8" stroke-width="4"/>
          <line x1="0" y1="-300" x2="0" y2="300" stroke="#38bdf8" stroke-width="4"/>
          <line x1="-210" y1="-210" x2="210" y2="210" stroke="#38bdf8" stroke-width="3"/>
          <line x1="-210" y1="210" x2="210" y2="-210" stroke="#38bdf8" stroke-width="3"/>
        </g>

        <!-- Cyber Security Shield & Gold Lock Icon in Corner -->
        <g transform="translate(140, 140)" opacity="0.45">
          <polygon points="0,-60 50,-30 50,30 0,60 -50,30 -50,-30" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <circle cx="0" cy="-5" r="14" fill="#fbbf24"/>
          <rect x="-10" y="-5" width="20" height="22" rx="4" fill="#f59e0b"/>
        </g>
        <g transform="translate(${w - 140}, ${h - 140})" opacity="0.45">
          <polygon points="0,-60 50,-30 50,30 0,60 -50,30 -50,-30" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
          <text x="0" y="10" text-anchor="middle" font-size="28" fill="#ef4444">⚠️</text>
        </g>
      `;

    case 'stock_trading':
      return `
        <!-- Multi-Monitor Trading Floor & Candlestick Scene -->
        <rect width="${w}" height="${h}" fill="#030908"/>
        <radialGradient id="stockGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#064e3b" stop-opacity="0.85"/>
          <stop offset="60%" stop-color="#021f17" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010a08" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#stockGlow)"/>

        <!-- Glowing Green/Gold Candlestick Bars in Background -->
        <g opacity="0.35" transform="translate(60, 40)">
          <!-- Left Candlesticks -->
          <rect x="50" y="240" width="30" height="120" rx="4" fill="#10b981"/>
          <line x1="65" y1="180" x2="65" y2="420" stroke="#10b981" stroke-width="3"/>
          
          <rect x="120" y="190" width="30" height="180" rx="4" fill="#10b981"/>
          <line x1="135" y1="120" x2="135" y2="400" stroke="#10b981" stroke-width="3"/>

          <rect x="190" y="280" width="30" height="80" rx="4" fill="#ef4444"/>
          <line x1="205" y1="220" x2="205" y2="390" stroke="#ef4444" stroke-width="3"/>

          <!-- Right Candlesticks -->
          <rect x="${w - 380}" y="160" width="30" height="190" rx="4" fill="#10b981"/>
          <line x1="${w - 365}" y1="100" x2="${w - 365}" y2="380" stroke="#10b981" stroke-width="3"/>

          <rect x="${w - 310}" y="110" width="30" height="230" rx="4" fill="#fbbf24"/>
          <line x1="${w - 295}" y1="50" x2="${w - 295}" y2="360" stroke="#fbbf24" stroke-width="3"/>

          <rect x="${w - 240}" y="70" width="30" height="280" rx="4" fill="#10b981"/>
          <line x1="${w - 225}" y1="20" x2="${w - 225}" y2="370" stroke="#10b981" stroke-width="3"/>
        </g>

        <!-- Exponential Golden Trend Curve -->
        <path d="M 0 650 Q 450 550 800 320 T 1280 80" fill="none" stroke="#fbbf24" stroke-width="6" opacity="0.4"/>
      `;

    case 'vibe_coding':
      return `
        <!-- Cyberpunk IDE & Vibe Coding Matrix Scene -->
        <rect width="${w}" height="${h}" fill="#080718"/>
        <radialGradient id="vibeGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#311042" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="#14092b" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#060212" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#vibeGlow)"/>

        <!-- Dual Isometric Code Editor Windows -->
        <g opacity="0.3" transform="translate(80, 80) rotate(-6)">
          <rect width="400" height="260" rx="14" fill="#0f172a" stroke="#818cf8" stroke-width="3"/>
          <circle cx="25" cy="20" r="5" fill="#ef4444"/>
          <circle cx="45" cy="20" r="5" fill="#facc15"/>
          <circle cx="65" cy="20" r="5" fill="#22c55e"/>
          <line x1="25" y1="60" x2="280" y2="60" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="90" x2="200" y2="90" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="120" x2="340" y2="120" stroke="#4ade80" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="150" x2="160" y2="150" stroke="#f43f5e" stroke-width="6" stroke-linecap="round"/>
        </g>

        <g opacity="0.3" transform="translate(${w - 480}, 280) rotate(8)">
          <rect width="420" height="280" rx="14" fill="#0f172a" stroke="#c084fc" stroke-width="3"/>
          <circle cx="25" cy="20" r="5" fill="#ef4444"/>
          <circle cx="45" cy="20" r="5" fill="#facc15"/>
          <circle cx="65" cy="20" r="5" fill="#22c55e"/>
          <line x1="25" y1="60" x2="320" y2="60" stroke="#fbbf24" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="90" x2="240" y2="90" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="120" x2="360" y2="120" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
        </g>
      `;

    case 'document_archive':
      return `
        <!-- 100M Token Digital Library & PDF Archive Scene -->
        <rect width="${w}" height="${h}" fill="#030814"/>
        <radialGradient id="docGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#0c2d48" stop-opacity="0.85"/>
          <stop offset="60%" stop-color="#051622" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#01060a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#docGlow)"/>

        <!-- Floating High-Tech PDF Document Stacks in Background -->
        <g opacity="0.3" transform="translate(100, 100) rotate(-12)">
          <rect width="220" height="300" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <line x1="30" y1="50" x2="190" y2="50" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <line x1="30" y1="80" x2="150" y2="80" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <line x1="30" y1="110" x2="180" y2="110" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <circle cx="170" cy="250" r="22" fill="#0284c7"/>
          <text x="170" y="256" text-anchor="middle" font-family="sans-serif" font-weight="900" fill="#ffffff" font-size="14">PDF</text>
        </g>

        <g opacity="0.3" transform="translate(${w - 320}, 140) rotate(15)">
          <rect width="220" height="300" rx="12" fill="#0f172a" stroke="#818cf8" stroke-width="2"/>
          <line x1="30" y1="50" x2="190" y2="50" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <line x1="30" y1="80" x2="170" y2="80" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <circle cx="170" cy="250" r="22" fill="#6366f1"/>
          <text x="170" y="256" text-anchor="middle" font-family="sans-serif" font-weight="900" fill="#ffffff" font-size="14">DOC</text>
        </g>
      `;

    case 'ai_agent_lab':
    default:
      return `
        <!-- Autonomous Agent & Holographic Core Scene -->
        <rect width="${w}" height="${h}" fill="#030712"/>
        <radialGradient id="agentSceneGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.8"/>
          <stop offset="60%" stop-color="#0f172a" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020617" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#agentSceneGlow)"/>

        <!-- Orbiting Holographic HUD Rings in Background -->
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.3">
          <circle cx="0" cy="0" r="300" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="16,8"/>
          <circle cx="0" cy="0" r="220" fill="none" stroke="#818cf8" stroke-width="3"/>
          <circle cx="0" cy="0" r="140" fill="none" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="6,6"/>
          <!-- Synapse Connecting Lines -->
          <line x1="-300" y1="-120" x2="300" y2="120" stroke="#38bdf8" stroke-width="2"/>
          <line x1="-200" y1="200" x2="200" y2="-200" stroke="#c084fc" stroke-width="2"/>
        </g>
      `;
  }
}

// ==============================================================================
// STYLE 1: Eco Clean / Fresh News 3D Ribbon (Reference: "한국형 무공해차")
// Features: Content-Generated Scene + Slanted 3D Ribbon Box + Dual-tone Ultra Bold Typography + Orbiting Arrow
// ==============================================================================
export function renderStyle1_FreshNews(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = calcFontSize(title1, 106, 9);
  const title2Size = calcFontSize(title2, 114, 10);
  const boxWidth = Math.max(760, title1.length * 72 + 120);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s1BoxGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <linearGradient id="s1TextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <linearGradient id="s1ArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>

    <filter id="s1Shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- 1. Content-Aware Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark/Vignette Wash for 100% Typography Contrast -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.3"/>

  <!-- 3. Yellow Circular Orbiting Arrow -->
  <g transform="translate(${w / 2}, ${h / 2 - 20}) rotate(-12)" filter="url(#s1Shadow)">
    <path d="M -300 0 A 300 240 0 1 1 270 90" fill="none" stroke="url(#s1ArrowGrad)" stroke-width="24" stroke-linecap="round"/>
    <polygon points="270,40 325,100 240,120" fill="#f59e0b"/>
    <!-- Sparkles -->
    <path d="M 280 -140 L 290 -115 L 315 -105 L 290 -95 L 280 -70 L 270 -95 L 245 -105 L 270 -115 Z" fill="#fbbf24"/>
  </g>

  <!-- 4. Central Dynamic Typography (-6.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-6.5)" filter="url(#s1Shadow)">
    
    <!-- Top Curved Category Arch -->
    <g transform="translate(0, -115)">
      <path d="M -160 25 Q 0 -20 160 25" fill="none" stroke="#1e40af" stroke-width="40" stroke-linecap="round"/>
      <text x="0" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="24" font-weight="900" fill="#ffffff">
        ${escapeXml(badge)}
      </text>
    </g>

    <!-- 3D Ribbon Box for Title 1 -->
    <g transform="translate(0, 5)">
      <polygon points="${-boxWidth / 2 + 10},-60 ${boxWidth / 2 + 40},-60 ${boxWidth / 2 - 10},70 ${-boxWidth / 2 - 40},70" fill="#000000" opacity="0.65"/>
      <polygon points="${-boxWidth / 2},-70 ${boxWidth / 2 + 30},-70 ${boxWidth / 2 - 20},60 ${-boxWidth / 2 - 50},60" fill="url(#s1BoxGrad)"/>
      <polygon points="${-boxWidth / 2},-70 ${boxWidth / 2 + 30},-70 ${boxWidth / 2 + 25},-55 ${-boxWidth / 2 - 5},-55" fill="#ffffff" opacity="0.4"/>
      
      <text x="-5" y="18" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="12" paint-order="stroke fill" letter-spacing="-2">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Title 2 (Massive Solid Blue Text with 3D White/Dark Outlines) -->
    <g transform="translate(0, 140)">
      <text x="0" y="12" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="22" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#38bdf8" stroke="#ffffff" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Crisp Subtitle Pill -->
  <g transform="translate(${w / 2}, ${h - 60})" filter="url(#s1Shadow)">
    <rect x="-300" y="-22" width="600" height="44" rx="22" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="20" font-weight="800" fill="#ffffff">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 2: Comic Pop / Starburst Electric Punch (Reference: "슬기로운 전기차생활")
// Features: Content-Generated Scene + Comic Starburst + Lightning Bolts + 2-tone Stacked 3D Block Typography + Plug
// ==============================================================================
export function renderStyle2_ComicPop(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = calcFontSize(title1, 108, 9);
  const title2Size = calcFontSize(title2, 118, 9);
  const boxWidth = Math.max(740, title1.length * 80 + 80);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s2StarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>

    <filter id="s2ComicShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <!-- 1. Content-Aware Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>

  <!-- 3. Giant Comic Starburst Backdrop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s2ComicShadow)">
    <polygon points="
      0,-250 50,-130 180,-230 130,-100 270,-130 170,-20 300,30 170,80 250,200 120,150 140,270 30,170
      -20,270 -60,160 -180,240 -130,110 -280,140 -180,20 -300,-40 -170,-80 -250,-190 -110,-140 -120,-260 -20,-160
    " fill="url(#s2StarGrad)" stroke="#000000" stroke-width="12"/>

    <!-- Lightning Bolt Graphics -->
    <polygon points="210,-170 230,-120 205,-115 245,-60 215,-70 235,-10 185,-65 210,-70" fill="#facc15" stroke="#000000" stroke-width="5"/>
    <polygon points="-210,120 -230,70 -205,65 -245,10 -215,20 -235,-40 -185,15 -210,20" fill="#facc15" stroke="#000000" stroke-width="5"/>
  </g>

  <!-- 4. Electric Plug Wire Loop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s2ComicShadow)">
    <path d="M -340 10 Q -400 120 -200 160 Q 200 180 340 100" fill="none" stroke="#000000" stroke-width="24" stroke-linecap="round"/>
    <path d="M 330 95 L 375 110 L 360 145 L 315 130 Z" fill="#000000"/>
    <rect x="370" y="105" width="22" height="6" fill="#fbbf24" stroke="#000000" stroke-width="2"/>
    <rect x="360" y="125" width="22" height="6" fill="#fbbf24" stroke="#000000" stroke-width="2"/>
  </g>

  <!-- 5. Central Dynamic Headline (-4 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-4)" filter="url(#s2ComicShadow)">
    
    <!-- Top Black Box for Title 1 -->
    <g transform="translate(0, -60)">
      <rect x="${-boxWidth / 2}" y="-65" width="${boxWidth}" height="120" rx="16" fill="#000000" stroke="#000000" stroke-width="8"/>
      <text x="0" y="24" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" letter-spacing="-2">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Bottom Giant Neon Text for Title 2 -->
    <g transform="translate(0, 85)">
      <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="22" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>

      <!-- Lightning icon embedded inside Title 2 -->
      <g transform="translate(${Math.min(260, title2.length * 35)}, -35)">
        <polygon points="0,-25 15,0 2,0 12,25 -15,5 0,5" fill="#38bdf8" stroke="#000000" stroke-width="4"/>
      </g>
    </g>
  </g>

  <!-- Bottom Highlight Subtitle Pill -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#s2ComicShadow)">
    <rect x="-280" y="-22" width="560" height="44" rx="22" fill="#e11d48" stroke="#000000" stroke-width="4"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#ffffff">
      ⚡ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 3: Street Graffiti & Caution Tech (Reference: "VENDAS")
// Features: Content-Generated Scene + Caution Tape + 3D Neon Graffiti + Badges
// ==============================================================================
export function renderStyle3_StreetGraffiti(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = calcFontSize(title1, 95, 10);
  const title2Size = calcFontSize(title2, 120, 8);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <pattern id="s3CautionPattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="30" height="60" fill="#facc15"/>
      <rect x="30" width="30" height="60" fill="#000000"/>
    </pattern>

    <filter id="s3Shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <!-- 1. Content-Aware Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>

  <!-- 3. Diagonal Caution Tapes -->
  <g transform="translate(-80, 50) rotate(-22)" filter="url(#s3Shadow)">
    <rect width="450" height="42" fill="url(#s3CautionPattern)" stroke="#000000" stroke-width="4"/>
    <rect x="40" y="6" width="370" height="30" fill="#000000"/>
    <text x="225" y="27" text-anchor="middle" font-family="monospace" font-size="16" font-weight="900" fill="#facc15" letter-spacing="3">
      ⚠️ KEEP OUT! CAUTION // AI TECH
    </text>
  </g>

  <g transform="translate(${w - 320}, ${h - 20}) rotate(-18)" filter="url(#s3Shadow)">
    <rect width="450" height="42" fill="url(#s3CautionPattern)" stroke="#000000" stroke-width="4"/>
    <rect x="40" y="6" width="370" height="30" fill="#000000"/>
    <text x="225" y="27" text-anchor="middle" font-family="monospace" font-size="16" font-weight="900" fill="#facc15" letter-spacing="3">
      ⚡ 2026 HOT DEAL $420
    </text>
  </g>

  <!-- 4. Big Dark Silhouette Star Backdrop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s3Shadow)">
    <polygon points="
      0,-220 55,-70 215,-70 90,30 140,185 0,95 -140,185 -90,30 -215,-70 -55,-70
    " fill="#000000" stroke="#ccff00" stroke-width="5"/>
  </g>

  <!-- Tech Stickers -->
  <g transform="translate(${w - 150}, 160) rotate(8)" filter="url(#s3Shadow)">
    <circle cx="0" cy="0" r="45" fill="#facc15" stroke="#000000" stroke-width="6"/>
    <circle cx="-16" cy="-10" r="6" fill="#000000"/>
    <circle cx="16" cy="-10" r="6" fill="#000000"/>
    <path d="M -22 10 Q 0 34 22 10" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
  </g>

  <g transform="translate(${w - 180}, ${h - 140}) rotate(-10)" filter="url(#s3Shadow)">
    <rect x="-65" y="-30" width="130" height="60" rx="8" fill="#ffffff" stroke="#000000" stroke-width="4"/>
    <text x="0" y="-8" text-anchor="middle" font-family="monospace" font-size="12" font-weight="900" fill="#000000">100% VERIFIED</text>
    <line x1="-50" y1="5" x2="-50" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="-30" y1="5" x2="-30" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="-10" y1="5" x2="-10" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="10" y1="5" x2="10" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="30" y1="5" x2="30" y2="20" stroke="#000000" stroke-width="4"/>
  </g>

  <!-- 5. Central 3D Graffiti Headline (-4.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-3)" filter="url(#s3Shadow)">
    
    <!-- Top Stencil Badge -->
    <g transform="translate(0, -90)">
      <rect x="-140" y="-20" width="280" height="40" rx="6" fill="#ffffff" stroke="#000000" stroke-width="4"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="18" font-weight="900" fill="#000000" letter-spacing="2">
        ✦ ${escapeXml(badge)}
      </text>
    </g>

    <!-- Line 1 (White Ultra Bold with Thick Black Shadow) -->
    <g transform="translate(0, 5)">
      <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="20" paint-order="stroke fill" letter-spacing="-2">
        ${escapeXml(title1)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-2">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Line 2 (Massive Acid Volt Neon with 3D Extrusion) -->
    <g transform="translate(0, 115)">
      <text x="0" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#ccff00" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Tag Sticker -->
  <g transform="translate(${w / 2}, ${h - 55}) rotate(2)" filter="url(#s3Shadow)">
    <rect x="-240" y="-20" width="480" height="40" rx="8" fill="#ccff00" stroke="#000000" stroke-width="4"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#000000">
      🔥 ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 4: Editorial Kinetic Dark (Reference: "갓생살다")
// Features: Content-Generated Scene + Wireframe Echoes + Giant White Headline + Multi-Stickers
// ==============================================================================
export function renderStyle4_EditorialKinetic(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = calcFontSize(title1, 110, 8);
  const title2Size = calcFontSize(title2, 120, 8);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <filter id="s4Shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- 1. Content-Aware Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>

  <!-- 3. Repeated Wireframe Outline Typography Echoes (Top & Bottom) -->
  <g transform="translate(${w / 2}, 110) rotate(-4.5) skewX(-4)" opacity="0.3">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="125" font-weight="900" fill="none" stroke="#38bdf8" stroke-width="2.5" letter-spacing="-3">
      ${escapeXml(title1)} ${escapeXml(title2)}
    </text>
  </g>
  <g transform="translate(${w / 2}, ${h - 40}) rotate(-4.5) skewX(-4)" opacity="0.3">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="125" font-weight="900" fill="none" stroke="#38bdf8" stroke-width="2.5" letter-spacing="-3">
      ${escapeXml(title1)} ${escapeXml(title2)}
    </text>
  </g>

  <!-- 4. Colorful Kinetic Stickers Scattered Around -->
  <!-- Top-Left Pill -->
  <g transform="translate(180, 100) rotate(-12)" filter="url(#s4Shadow)">
    <rect x="-85" y="-22" width="170" height="44" rx="22" fill="#2563eb"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ START NOW
    </text>
  </g>

  <!-- Top-Right Oval Sticker -->
  <g transform="translate(${w - 200}, 90) rotate(14)" filter="url(#s4Shadow)">
    <ellipse cx="0" cy="0" rx="65" ry="32" fill="#f43f5e"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="15" font-weight="900" fill="#ffffff">
      ${escapeXml(badge)}
    </text>
  </g>

  <!-- Bottom-Left Pill -->
  <g transform="translate(190, ${h - 130}) rotate(8)" filter="url(#s4Shadow)">
    <rect x="-95" y="-22" width="190" height="44" rx="22" fill="#38bdf8"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="15" font-weight="900" fill="#000000">
      ✔ AI 최적화 완료
    </text>
  </g>

  <!-- Bottom-Right Pill -->
  <g transform="translate(${w - 180}, ${h - 130}) rotate(-8)" filter="url(#s4Shadow)">
    <rect x="-90" y="-22" width="180" height="44" rx="22" fill="#facc15"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#000000" letter-spacing="1">
      ★ 실전 적용 100%
    </text>
  </g>

  <!-- 5. Central Solid Giant White Headline (-4.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)" filter="url(#s4Shadow)">
    
    <!-- Top Mini Arch Badge -->
    <g transform="translate(0, -90)">
      <rect x="-120" y="-18" width="240" height="36" rx="18" fill="#a855f7"/>
      <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="16" font-weight="900" fill="#ffffff">
        ${escapeXml(badge)}
      </text>
    </g>

    <!-- Main Solid Bold White Headline (Line 1) -->
    <g transform="translate(0, 15)">
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="20" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Line 2 (Second Line with High Contrast Color) -->
    <g transform="translate(0, 115)">
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="20" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Center Subtitle Bar -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#s4Shadow)">
    <rect x="-260" y="-20" width="520" height="40" rx="20" fill="#000000" stroke="#38bdf8" stroke-width="2"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="18" font-weight="800" fill="#ffffff">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// Master Dispatcher: Selects Style & Content-Aware Background Scenery per post
// -----------------------------------------------------------------------------
export function renderMasterHookThumbnail(post, index, w = 1280, h = 720) {
  const styleTypes = ['style1', 'style2', 'style3', 'style4'];
  const style = styleTypes[index % styleTypes.length];
  const variantIdx = Math.floor(index / styleTypes.length);

  switch (style) {
    case 'style1':
      return renderStyle1_FreshNews(w, h, post, variantIdx);
    case 'style2':
      return renderStyle2_ComicPop(w, h, post, variantIdx);
    case 'style3':
      return renderStyle3_StreetGraffiti(w, h, post, variantIdx);
    case 'style4':
    default:
      return renderStyle4_EditorialKinetic(w, h, post, variantIdx);
  }
}

// Backward compatibility alias
export function renderContentAwareBlogSVG(post, w = 1280, h = 720) {
  const hash = (post.id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return renderMasterHookThumbnail(post, hash, w, h);
}

// -----------------------------------------------------------------------------
// Generate All 59 Thumbnails
// -----------------------------------------------------------------------------
export async function generateAllHookThumbnails() {
  console.log('🚀 Generating Ultra-Sharp High-Converting Hook Thumbnails with Content Backgrounds...');
  const outDir = path.join(ROOT_DIR, 'public/images/blogs');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Load all blogs reliably
  const blogsFilePath = path.join(ROOT_DIR, 'src/data/blogsData.ts');
  const blogsContent = fs.readFileSync(blogsFilePath, 'utf-8');
  let blogsData = [];
  try {
    const startPos = blogsContent.indexOf('export const BLOGS_DATA');
    const equalPos = blogsContent.indexOf('=', startPos);
    const arrayStart = blogsContent.indexOf('[', equalPos);
    const arrayEnd = blogsContent.lastIndexOf(']');
    const rawArray = blogsContent.substring(arrayStart, arrayEnd + 1);
    blogsData = eval('(' + rawArray + ')');
  } catch (err) {
    console.error('Failed to parse BLOGS_DATA:', err.message);
  }

  let count = 0;
  for (let i = 0; i < blogsData.length; i++) {
    const post = blogsData[i];
    const svg = renderMasterHookThumbnail(post, i, 1280, 720);
    const targetFile = path.join(outDir, `${post.id}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toFile(targetFile);

    count++;
  }

  console.log(`✅ Successfully generated ${count} content-driven thumbnails in ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllHookThumbnails().catch(console.error);
}
