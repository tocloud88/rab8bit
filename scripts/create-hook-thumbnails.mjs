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

// ==============================================================================
// STYLE 1: Eco Clean / Fresh News 3D Ribbon (Reference: "한국형 무공해차")
// Features: Slanted 3D Ribbon Box + Dual-tone Ultra Bold Typography + Circular Accent Arrows + Scenery Horizon
// ==============================================================================
export function renderStyle1_FreshNews(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const title1Size = calcFontSize(title1, 106, 9);
  const title2Size = calcFontSize(title2, 114, 10);
  const boxWidth = Math.max(760, title1.length * 72 + 120);

  const sceneries = [
    // 0: Azure Sky & Road Horizon
    {
      bgGrad: ['#ffffff', '#f0f9ff', '#dbeafe'],
      boxGrad: ['#1d4ed8', '#2563eb'],
      textGrad: ['#1d4ed8', '#0284c7'],
      arrowGrad: ['#fef08a', '#facc15', '#f59e0b'],
      hills: ['#bae6fd', '#7dd3fc'],
      sunColor: '#fbbf24',
      badgeBg: '#1e40af',
      subPillBg: '#0f172a',
      subPillText: '#ffffff'
    },
    // 1: Fresh Mint & Emerald Eco
    {
      bgGrad: ['#ffffff', '#f0fdf4', '#dcfce7'],
      boxGrad: ['#047857', '#059669'],
      textGrad: ['#065f46', '#059669'],
      arrowGrad: ['#67e8f9', '#34d399', '#10b981'],
      hills: ['#a7f3d0', '#6ee7b7'],
      sunColor: '#10b981',
      badgeBg: '#065f46',
      subPillBg: '#064e3b',
      subPillText: '#ffffff'
    },
    // 2: Sunrise Coral & Sunset Lavender
    {
      bgGrad: ['#ffffff', '#fff1f2', '#ffe4e6'],
      boxGrad: ['#e11d48', '#f43f5e'],
      textGrad: ['#be123c', '#e11d48'],
      arrowGrad: ['#fde047', '#fb7185', '#e11d48'],
      hills: ['#fbcfe8', '#f472b6'],
      sunColor: '#fb7185',
      badgeBg: '#9f1239',
      subPillBg: '#881337',
      subPillText: '#ffffff'
    },
    // 3: Cyber Ice & Ultra Indigo
    {
      bgGrad: ['#ffffff', '#f8fafc', '#e0e7ff'],
      boxGrad: ['#4338ca', '#6366f1'],
      textGrad: ['#3730a3', '#4f46e5'],
      arrowGrad: ['#38bdf8', '#818cf8', '#4338ca'],
      hills: ['#c7d2fe', '#a5b4fc'],
      sunColor: '#6366f1',
      badgeBg: '#312e81',
      subPillBg: '#1e1b4b',
      subPillText: '#ffffff'
    },
    // 4: Champagne Gold & Luxury Amber
    {
      bgGrad: ['#ffffff', '#fffbeb', '#fef3c7'],
      boxGrad: ['#b45309', '#d97706'],
      textGrad: ['#92400e', '#b45309'],
      arrowGrad: ['#fef08a', '#facc15', '#d97706'],
      hills: ['#fde68a', '#fcd34d'],
      sunColor: '#f59e0b',
      badgeBg: '#78350f',
      subPillBg: '#451a03',
      subPillText: '#ffffff'
    }
  ];

  const sc = sceneries[variantIdx % sceneries.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s1BgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${sc.bgGrad[0]}"/>
      <stop offset="60%" stop-color="${sc.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.bgGrad[2]}"/>
    </linearGradient>

    <linearGradient id="s1BoxGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${sc.boxGrad[0]}"/>
      <stop offset="100%" stop-color="${sc.boxGrad[1]}"/>
    </linearGradient>

    <linearGradient id="s1TextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${sc.textGrad[0]}"/>
      <stop offset="100%" stop-color="${sc.textGrad[1]}"/>
    </linearGradient>

    <linearGradient id="s1ArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${sc.arrowGrad[0]}"/>
      <stop offset="50%" stop-color="${sc.arrowGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.arrowGrad[2]}"/>
    </linearGradient>

    <filter id="s1Shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#s1BgGrad)"/>

  <!-- Sun & Atmospheric Sky -->
  <circle cx="160" cy="110" r="55" fill="${sc.sunColor}" opacity="0.9"/>
  <ellipse cx="230" cy="130" rx="90" ry="35" fill="#ffffff" opacity="0.8"/>
  <ellipse cx="140" cy="140" rx="70" ry="25" fill="#ffffff" opacity="0.9"/>

  <!-- Rolling Hills Horizon -->
  <path d="M 0 620 Q 300 480 700 580 T 1280 500 L 1280 720 L 0 720 Z" fill="${sc.hills[0]}" opacity="0.7"/>
  <path d="M 0 660 Q 400 540 850 640 T 1280 570 L 1280 720 L 0 720 Z" fill="${sc.hills[1]}" opacity="0.85"/>

  <!-- Bottom Perspective Highway/Stage -->
  <polygon points="460,720 540,560 740,560 820,720" fill="#ffffff" opacity="0.95"/>
  <line x1="640" y1="560" x2="640" y2="720" stroke="${sc.textGrad[0]}" stroke-width="8" stroke-dasharray="24,18"/>

  <!-- Yellow Circular Orbiting Arrow -->
  <g transform="translate(${w / 2}, ${h / 2 - 20}) rotate(-12)" filter="url(#s1Shadow)">
    <path d="M -300 0 A 300 240 0 1 1 270 90" fill="none" stroke="url(#s1ArrowGrad)" stroke-width="24" stroke-linecap="round"/>
    <polygon points="270,40 325,100 240,120" fill="${sc.arrowGrad[2]}"/>
    
    <!-- Sparkles -->
    <path d="M 280 -140 L 290 -115 L 315 -105 L 290 -95 L 280 -70 L 270 -95 L 245 -105 L 270 -115 Z" fill="${sc.sunColor}"/>
    <path d="M -260 140 L -252 160 L -232 168 L -252 176 L -260 196 L -268 176 L -288 168 L -268 160 Z" fill="${sc.arrowGrad[1]}"/>
  </g>

  <!-- Central Dynamic Typography (-6.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-6.5)" filter="url(#s1Shadow)">
    
    <!-- Top Curved Category Arch -->
    <g transform="translate(0, -115)">
      <path d="M -160 25 Q 0 -20 160 25" fill="none" stroke="${sc.badgeBg}" stroke-width="40" stroke-linecap="round"/>
      <text x="0" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="24" font-weight="900" fill="#ffffff">
        ${escapeXml(badge)}
      </text>
    </g>

    <!-- 3D Ribbon Box for Title 1 -->
    <g transform="translate(0, 5)">
      <!-- 3D Drop Shadow Box -->
      <polygon points="${-boxWidth / 2 + 10},-60 ${boxWidth / 2 + 40},-60 ${boxWidth / 2 - 10},70 ${-boxWidth / 2 - 40},70" fill="#000000" opacity="0.35"/>
      <!-- Main Solid Box -->
      <polygon points="${-boxWidth / 2},-70 ${boxWidth / 2 + 30},-70 ${boxWidth / 2 - 20},60 ${-boxWidth / 2 - 50},60" fill="url(#s1BoxGrad)"/>
      <polygon points="${-boxWidth / 2},-70 ${boxWidth / 2 + 30},-70 ${boxWidth / 2 + 25},-55 ${-boxWidth / 2 - 5},-55" fill="#ffffff" opacity="0.35"/>
      
      <!-- Text 1 (White with heavy stroke) -->
      <text x="-5" y="18" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="${sc.badgeBg}" stroke-width="10" paint-order="stroke fill" letter-spacing="-2">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Title 2 (Massive Solid Blue Text with 3D White/Dark Outlines) -->
    <g transform="translate(0, 140)">
      <!-- 3D Extrusion Shadow -->
      <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" opacity="0.3" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
      <!-- Main Text -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#s1TextGrad)" stroke="#ffffff" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Crisp Subtitle Pill -->
  <g transform="translate(${w / 2}, ${h - 60})" filter="url(#s1Shadow)">
    <rect x="-300" y="-22" width="600" height="44" rx="22" fill="${sc.subPillBg}"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="20" font-weight="800" fill="${sc.subPillText}">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 2: Comic Pop / Starburst Electric Punch (Reference: "슬기로운 전기차생활")
// Features: Dynamic Comic Starburst + Lightning Bolts + 2-tone Stacked 3D Block Typography + Plug/Circuit
// ==============================================================================
export function renderStyle2_ComicPop(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const title1Size = calcFontSize(title1, 108, 9);
  const title2Size = calcFontSize(title2, 118, 9);
  const boxWidth = Math.max(740, title1.length * 80 + 80);

  const sceneries = [
    // 0: Royal Blue & Electric Mint
    {
      bgGrad: ['#1e1b4b', '#1e3a8a', '#0284c7'],
      starGrad: ['#dc2626', '#b91c1c'],
      secondLineColor: '#34d399',
      lightningColor: '#facc15',
      pillBg: '#047857',
      pillText: '#ffffff'
    },
    // 1: Cyber Violet & High-Voltage Yellow
    {
      bgGrad: ['#170529', '#3b0764', '#6b21a8'],
      starGrad: ['#0284c7', '#0369a1'],
      secondLineColor: '#facc15',
      lightningColor: '#38bdf8',
      pillBg: '#e11d48',
      pillText: '#ffffff'
    },
    // 2: Crimson Dark & Electric Cyan
    {
      bgGrad: ['#1c040b', '#4c0519', '#881337'],
      starGrad: ['#7c3aed', '#6d28d9'],
      secondLineColor: '#38bdf8',
      lightningColor: '#facc15',
      pillBg: '#4338ca',
      pillText: '#ffffff'
    },
    // 3: Deep Emerald & Gold
    {
      bgGrad: ['#021810', '#064e3b', '#047857'],
      starGrad: ['#d97706', '#b45309'],
      secondLineColor: '#fbbf24',
      lightningColor: '#6ee7b7',
      pillBg: '#1e3a8a',
      pillText: '#ffffff'
    },
    // 4: Midnight Onyx & Neon Orange
    {
      bgGrad: ['#030712', '#0f172a', '#1e293b'],
      starGrad: ['#e11d48', '#be123c'],
      secondLineColor: '#fb923c',
      lightningColor: '#facc15',
      pillBg: '#7c3aed',
      pillText: '#ffffff'
    }
  ];

  const sc = sceneries[variantIdx % sceneries.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s2BgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${sc.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${sc.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.bgGrad[2]}"/>
    </linearGradient>

    <linearGradient id="s2StarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${sc.starGrad[0]}"/>
      <stop offset="100%" stop-color="${sc.starGrad[1]}"/>
    </linearGradient>

    <filter id="s2ComicShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#s2BgGrad)"/>

  <!-- Comic Halftone & Angular Speed Strips -->
  <g opacity="0.25">
    <polygon points="0,0 200,0 120,720 0,720" fill="#f43f5e"/>
    <polygon points="1080,0 1280,0 1280,720 1160,720" fill="#38bdf8"/>
    <polygon points="150,0 280,0 100,720 0,720" fill="#facc15"/>
    <polygon points="1000,0 1150,0 1280,720 1200,720" fill="#4ade80"/>
  </g>

  <!-- Floating Confetti & Sparks -->
  <g opacity="0.85">
    <circle cx="200" cy="180" r="14" fill="#38bdf8"/>
    <circle cx="1080" cy="160" r="16" fill="#f43f5e"/>
    <circle cx="240" cy="540" r="12" fill="#facc15"/>
    <circle cx="1050" cy="560" r="15" fill="#4ade80"/>
    <polygon points="180,320 210,340 170,360" fill="#a855f7"/>
    <polygon points="1100,380 1130,410 1080,420" fill="#facc15"/>
  </g>

  <!-- Giant Comic Starburst Backdrop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s2ComicShadow)">
    <polygon points="
      0,-250 50,-130 180,-230 130,-100 270,-130 170,-20 300,30 170,80 250,200 120,150 140,270 30,170
      -20,270 -60,160 -180,240 -130,110 -280,140 -180,20 -300,-40 -170,-80 -250,-190 -110,-140 -120,-260 -20,-160
    " fill="url(#s2StarGrad)" stroke="#000000" stroke-width="12"/>

    <!-- Lightning Bolt Graphics -->
    <polygon points="210,-170 230,-120 205,-115 245,-60 215,-70 235,-10 185,-65 210,-70" fill="${sc.lightningColor}" stroke="#000000" stroke-width="5"/>
    <polygon points="-210,120 -230,70 -205,65 -245,10 -215,20 -235,-40 -185,15 -210,20" fill="${sc.lightningColor}" stroke="#000000" stroke-width="5"/>
  </g>

  <!-- Electric Plug Wire Loop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s2ComicShadow)">
    <path d="M -340 10 Q -400 120 -200 160 Q 200 180 340 100" fill="none" stroke="#000000" stroke-width="24" stroke-linecap="round"/>
    <path d="M 330 95 L 375 110 L 360 145 L 315 130 Z" fill="#000000"/>
    <rect x="370" y="105" width="22" height="6" fill="#fbbf24" stroke="#000000" stroke-width="2"/>
    <rect x="360" y="125" width="22" height="6" fill="#fbbf24" stroke="#000000" stroke-width="2"/>
  </g>

  <!-- Central Dynamic Headline (-4 deg dynamic tilt) -->
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
      <!-- 3D Extrusion -->
      <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="22" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
      <!-- Main Neon Text -->
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="${sc.secondLineColor}" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>

      <!-- Lightning icon embedded inside Title 2 -->
      <g transform="translate(${Math.min(260, title2.length * 35)}, -35)">
        <polygon points="0,-25 15,0 2,0 12,25 -15,5 0,5" fill="${sc.lightningColor}" stroke="#000000" stroke-width="4"/>
      </g>
    </g>
  </g>

  <!-- Bottom Highlight Subtitle Pill -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#s2ComicShadow)">
    <rect x="-280" y="-22" width="560" height="44" rx="22" fill="${sc.pillBg}" stroke="#000000" stroke-width="4"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="${sc.pillText}">
      ⚡ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 3: Street Graffiti & Caution Tech (Reference: "VENDAS")
// Features: Diagonal Caution Tape + Acid Neon 3D Graffiti Headline + Tech Stickers & Badges
// ==============================================================================
export function renderStyle3_StreetGraffiti(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const title1Size = calcFontSize(title1, 95, 10);
  const title2Size = calcFontSize(title2, 120, 8);

  const sceneries = [
    // 0: Cobalt Blue & Acid Lime
    {
      bgGrad: ['#0f172a', '#1e3a8a', '#1d4ed8'],
      starColor: '#000000',
      graffitiFill: '#ccff00',
      graffitiStroke: '#000000',
      accentTagBg: '#ccff00',
      accentTagText: '#000000'
    },
    // 1: Deep Purple & Electric Cyan
    {
      bgGrad: ['#1e0836', '#4c1d95', '#6d28d9'],
      starColor: '#000000',
      graffitiFill: '#22d3ee',
      graffitiStroke: '#000000',
      accentTagBg: '#facc15',
      accentTagText: '#000000'
    },
    // 2: Crimson & High-Voltage Yellow
    {
      bgGrad: ['#1c040b', '#7f1d1d', '#b91c1c'],
      starColor: '#000000',
      graffitiFill: '#fde047',
      graffitiStroke: '#000000',
      accentTagBg: '#38bdf8',
      accentTagText: '#000000'
    },
    // 3: Toxic Emerald & Hot Pink
    {
      bgGrad: ['#021b14', '#064e3b', '#047857'],
      starColor: '#000000',
      graffitiFill: '#f43f5e',
      graffitiStroke: '#000000',
      accentTagBg: '#4ade80',
      accentTagText: '#000000'
    },
    // 4: Pitch Black & Pure Acid Volt
    {
      bgGrad: ['#030712', '#0f172a', '#18181b'],
      starColor: '#000000',
      graffitiFill: '#a3e635',
      graffitiStroke: '#000000',
      accentTagBg: '#f43f5e',
      accentTagText: '#ffffff'
    }
  ];

  const sc = sceneries[variantIdx % sceneries.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s3BgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${sc.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${sc.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.bgGrad[2]}"/>
    </linearGradient>

    <!-- Caution Stripe Pattern -->
    <pattern id="s3CautionPattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="30" height="60" fill="#facc15"/>
      <rect x="30" width="30" height="60" fill="#000000"/>
    </pattern>

    <filter id="s3Shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#s3BgGrad)"/>

  <!-- Half-tone grid dots -->
  <g opacity="0.2" fill="#ffffff">
    <circle cx="100" cy="140" r="4"/><circle cx="130" cy="140" r="4"/><circle cx="160" cy="140" r="4"/><circle cx="190" cy="140" r="4"/>
    <circle cx="100" cy="170" r="4"/><circle cx="130" cy="170" r="4"/><circle cx="160" cy="170" r="4"/><circle cx="190" cy="170" r="4"/>
    <circle cx="100" cy="200" r="4"/><circle cx="130" cy="200" r="4"/><circle cx="160" cy="200" r="4"/><circle cx="190" cy="200" r="4"/>
    
    <circle cx="1080" cy="500" r="4"/><circle cx="1110" cy="500" r="4"/><circle cx="1140" cy="500" r="4"/><circle cx="1170" cy="500" r="4"/>
    <circle cx="1080" cy="530" r="4"/><circle cx="1110" cy="530" r="4"/><circle cx="1140" cy="530" r="4"/><circle cx="1170" cy="530" r="4"/>
  </g>

  <!-- Top-Left Diagonal Caution Tape -->
  <g transform="translate(-80, 50) rotate(-22)">
    <rect width="450" height="42" fill="url(#s3CautionPattern)" stroke="#000000" stroke-width="4"/>
    <rect x="40" y="6" width="370" height="30" fill="#000000"/>
    <text x="225" y="27" text-anchor="middle" font-family="monospace" font-size="16" font-weight="900" fill="#facc15" letter-spacing="3">
      ⚠️ KEEP OUT! CAUTION // AI INSIGHT
    </text>
  </g>

  <!-- Bottom-Right Diagonal Caution Tape -->
  <g transform="translate(${w - 320}, ${h - 20}) rotate(-18)">
    <rect width="450" height="42" fill="url(#s3CautionPattern)" stroke="#000000" stroke-width="4"/>
    <rect x="40" y="6" width="370" height="30" fill="#000000"/>
    <text x="225" y="27" text-anchor="middle" font-family="monospace" font-size="16" font-weight="900" fill="#facc15" letter-spacing="3">
      ⚡ SPECIAL HOT DEAL $420
    </text>
  </g>

  <!-- Big Dark Silhouette Star Backdrop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s3Shadow)">
    <polygon points="
      0,-220 55,-70 215,-70 90,30 140,185 0,95 -140,185 -90,30 -215,-70 -55,-70
    " fill="${sc.starColor}" stroke="${sc.graffitiFill}" stroke-width="4"/>
  </g>

  <!-- Tech Stickers (Smiley, Peace Hand, Barcode, Radiation) -->
  <g transform="translate(140, ${h - 180}) rotate(12)" filter="url(#s3Shadow)">
    <polygon points="0,-40 45,35 -45,35" fill="#facc15" stroke="#000000" stroke-width="4"/>
    <circle cx="0" cy="15" r="8" fill="#000000"/>
    <text x="0" y="10" text-anchor="middle" font-size="20">☠️</text>
  </g>

  <g transform="translate(${w - 150}, 160) rotate(8)" filter="url(#s3Shadow)">
    <circle cx="0" cy="0" r="45" fill="#facc15" stroke="#000000" stroke-width="6"/>
    <circle cx="-16" cy="-10" r="6" fill="#000000"/>
    <circle cx="16" cy="-10" r="6" fill="#000000"/>
    <path d="M -22 10 Q 0 34 22 10" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
  </g>

  <g transform="translate(${w - 180}, ${h - 140}) rotate(-10)" filter="url(#s3Shadow)">
    <rect x="-65" y="-30" width="130" height="60" rx="8" fill="#ffffff" stroke="#000000" stroke-width="4"/>
    <text x="0" y="-8" text-anchor="middle" font-family="monospace" font-size="12" font-weight="900" fill="#000000">100% VERIFIED</text>
    <line x1="-50" y1="5" x2="-50" y2="20" stroke="#000000" stroke-width="3"/>
    <line x1="-42" y1="5" x2="-42" y2="20" stroke="#000000" stroke-width="5"/>
    <line x1="-30" y1="5" x2="-30" y2="20" stroke="#000000" stroke-width="2"/>
    <line x1="-20" y1="5" x2="-20" y2="20" stroke="#000000" stroke-width="6"/>
    <line x1="-5" y1="5" x2="-5" y2="20" stroke="#000000" stroke-width="3"/>
    <line x1="10" y1="5" x2="10" y2="20" stroke="#000000" stroke-width="5"/>
    <line x1="25" y1="5" x2="25" y2="20" stroke="#000000" stroke-width="2"/>
    <line x1="40" y1="5" x2="40" y2="20" stroke="#000000" stroke-width="6"/>
  </g>

  <!-- Central High-Impact 3D Graffiti Headline (-4.5 deg dynamic tilt) -->
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
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="${sc.graffitiFill}" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Tag Sticker -->
  <g transform="translate(${w / 2}, ${h - 55}) rotate(2)" filter="url(#s3Shadow)">
    <rect x="-240" y="-20" width="480" height="40" rx="8" fill="${sc.accentTagBg}" stroke="#000000" stroke-width="4"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="${sc.accentTagText}">
      🔥 ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 4: Editorial Kinetic Dark (Reference: "갓생살다")
// Features: Sleek Dark Canvas + Repeated Wireframe Outline Typography Echo + Massive Slanted White Headline + Colorful Multi-Sticker Pills
// ==============================================================================
export function renderStyle4_EditorialKinetic(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const title1Size = calcFontSize(title1, 110, 8);
  const title2Size = calcFontSize(title2, 120, 8);

  const sceneries = [
    // 0: Onyx Slate & Electric Blue/Yellow Stickers
    {
      bgGrad: ['#090d16', '#111827', '#1f2937'],
      wireColor: '#38bdf8',
      stickers: ['#2563eb', '#facc15', '#10b981', '#f43f5e'],
      secondLineColor: '#ffffff'
    },
    // 1: Midnight Purple & Magenta/Cyan Stickers
    {
      bgGrad: ['#0f051d', '#1e0c3b', '#2e1065'],
      wireColor: '#c084fc',
      stickers: ['#9333ea', '#38bdf8', '#fbbf24', '#ec4899'],
      secondLineColor: '#facc15'
    },
    // 2: Deep Forest & Mint/Orange Stickers
    {
      bgGrad: ['#02140d', '#062d1f', '#064e3b'],
      wireColor: '#34d399',
      stickers: ['#059669', '#f97316', '#38bdf8', '#facc15'],
      secondLineColor: '#6ee7b7'
    },
    // 3: Dark Crimson & Gold/Cyan Stickers
    {
      bgGrad: ['#140207', '#2e0813', '#4c0519'],
      wireColor: '#f87171',
      stickers: ['#e11d48', '#facc15', '#06b6d4', '#8b5cf6'],
      secondLineColor: '#fde047'
    },
    // 4: Cyber Navy & Violet/Lime Stickers
    {
      bgGrad: ['#030712', '#0c1938', '#0f2759'],
      wireColor: '#818cf8',
      stickers: ['#4f46e5', '#a3e635', '#f43f5e', '#38bdf8'],
      secondLineColor: '#38bdf8'
    }
  ];

  const sc = sceneries[variantIdx % sceneries.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s4BgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${sc.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${sc.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.bgGrad[2]}"/>
    </linearGradient>

    <filter id="s4Shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#s4BgGrad)"/>

  <!-- Repeated Wireframe Outline Typography Echoes (Top & Bottom) -->
  <g transform="translate(${w / 2}, 110) rotate(-4.5) skewX(-4)" opacity="0.22">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="125" font-weight="900" fill="none" stroke="${sc.wireColor}" stroke-width="2.5" letter-spacing="-3">
      ${escapeXml(title1)} ${escapeXml(title2)}
    </text>
  </g>
  <g transform="translate(${w / 2}, ${h - 40}) rotate(-4.5) skewX(-4)" opacity="0.22">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="125" font-weight="900" fill="none" stroke="${sc.wireColor}" stroke-width="2.5" letter-spacing="-3">
      ${escapeXml(title1)} ${escapeXml(title2)}
    </text>
  </g>

  <!-- Colorful Kinetic Stickers Scattered Around -->
  <!-- 1. Top-Left Pill -->
  <g transform="translate(180, 100) rotate(-12)" filter="url(#s4Shadow)">
    <rect x="-85" y="-22" width="170" height="44" rx="22" fill="${sc.stickers[0]}"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ START NOW
    </text>
  </g>

  <!-- 2. Top-Right Oval Sticker -->
  <g transform="translate(${w - 200}, 90) rotate(14)" filter="url(#s4Shadow)">
    <ellipse cx="0" cy="0" rx="65" ry="32" fill="${sc.stickers[3]}"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="15" font-weight="900" fill="#ffffff">
      ${escapeXml(badge)}
    </text>
  </g>

  <!-- 3. Bottom-Left Pill -->
  <g transform="translate(190, ${h - 130}) rotate(8)" filter="url(#s4Shadow)">
    <rect x="-95" y="-22" width="190" height="44" rx="22" fill="${sc.stickers[1]}"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="15" font-weight="900" fill="#000000">
      ✔ AI 최적화 완료
    </text>
  </g>

  <!-- 4. Bottom-Right Pill -->
  <g transform="translate(${w - 180}, ${h - 130}) rotate(-8)" filter="url(#s4Shadow)">
    <rect x="-90" y="-22" width="180" height="44" rx="22" fill="${sc.stickers[2]}"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="1">
      ★ 실전 적용 100%
    </text>
  </g>

  <!-- Central Solid Giant White Headline (-4.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)" filter="url(#s4Shadow)">
    
    <!-- Top Mini Arch Badge -->
    <g transform="translate(0, -90)">
      <rect x="-120" y="-18" width="240" height="36" rx="18" fill="${sc.stickers[0]}"/>
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
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="${sc.secondLineColor}" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Center Subtitle Bar -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#s4Shadow)">
    <rect x="-260" y="-20" width="520" height="40" rx="20" fill="#000000" stroke="${sc.stickers[1]}" stroke-width="2"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="18" font-weight="800" fill="#ffffff">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// Master Dispatcher: Selects Style & Dynamic Background Scenery per post
// -----------------------------------------------------------------------------
export function renderMasterHookThumbnail(post, index, w = 1280, h = 720) {
  // 4 Core Reference Styles
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
  console.log('🚀 Generating Ultra-Sharp High-Converting Hook Thumbnails for All Blog Posts...');
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

  console.log(`✅ Successfully generated ${count} ultra-sharp varied thumbnails in ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllHookThumbnails().catch(console.error);
}
