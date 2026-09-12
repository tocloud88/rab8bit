import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to calculate deterministic hash index
export function getHashIndex(seedStr, modulo) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % modulo;
}

export function calcFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(baseSize * (maxChars / len));
}

// ==============================================================================
// STYLE 1: Eco Clean / Fresh News Studio
// Typography: Slanted solid parallelogram box + 2-tone outline title in Paperlogy
// Dynamic Sceneries: 5 Color & Atmospheric Variations (Azure Sky, Mint Emerald, Coral Lavender, Cyber Ice, Champagne Gold)
// ==============================================================================
export function renderStyle1_EcoClean(w, h, item) {
  const title1Size = calcFontSize(item.title1, 108, 9);
  const title2Size = calcFontSize(item.title2, 114, 10);
  const boxWidth = Math.max(760, (item.title1 || '').length * 75 + 100);

  const variantIdx = getHashIndex(item.id + (item.title1 || '') + (item.date || ''), 5);

  const sceneries = [
    // 0: Classic Azure Sky & Ocean Horizon
    {
      bgGrad: ['#ffffff', '#f0f9ff', '#e0f2fe'],
      boxGrad: ['#1d4ed8', '#2563eb'],
      textGrad: ['#1d4ed8', '#0284c7'],
      arrowGrad: ['#fef08a', '#facc15', '#f59e0b'],
      hills: ['#bae6fd', '#7dd3fc'],
      sunColor: '#fbbf24',
      cloudColor: '#93c5fd',
      badgeColor: '#0284c7',
      ribbonColor: '#0284c7'
    },
    // 1: Fresh Mint & Eco Emerald
    {
      bgGrad: ['#ffffff', '#f0fdf4', '#dcfce7'],
      boxGrad: ['#047857', '#059669'],
      textGrad: ['#065f46', '#059669'],
      arrowGrad: ['#67e8f9', '#34d399', '#10b981'],
      hills: ['#a7f3d0', '#6ee7b7'],
      sunColor: '#10b981',
      cloudColor: '#86efac',
      badgeColor: '#047857',
      ribbonColor: '#047857'
    },
    // 2: Sunrise Coral & Sunset Lavender
    {
      bgGrad: ['#ffffff', '#fff1f2', '#ffe4e6'],
      boxGrad: ['#e11d48', '#f43f5e'],
      textGrad: ['#be123c', '#e11d48'],
      arrowGrad: ['#fde047', '#fb7185', '#e11d48'],
      hills: ['#fbcfe8', '#f472b6'],
      sunColor: '#fb7185',
      cloudColor: '#c084fc',
      badgeColor: '#be123c',
      ribbonColor: '#be123c'
    },
    // 3: Cyber Ice & Ultra Indigo
    {
      bgGrad: ['#ffffff', '#f8fafc', '#e0e7ff'],
      boxGrad: ['#4338ca', '#6366f1'],
      textGrad: ['#3730a3', '#4f46e5'],
      arrowGrad: ['#38bdf8', '#818cf8', '#4338ca'],
      hills: ['#c7d2fe', '#a5b4fc'],
      sunColor: '#6366f1',
      cloudColor: '#818cf8',
      badgeColor: '#3730a3',
      ribbonColor: '#3730a3'
    },
    // 4: Champagne Gold & Luxury Amber
    {
      bgGrad: ['#ffffff', '#fffbeb', '#fef3c7'],
      boxGrad: ['#b45309', '#d97706'],
      textGrad: ['#92400e', '#b45309'],
      arrowGrad: ['#fef08a', '#facc15', '#d97706'],
      hills: ['#fde68a', '#fcd34d'],
      sunColor: '#f59e0b',
      cloudColor: '#fde68a',
      badgeColor: '#92400e',
      ribbonColor: '#92400e'
    }
  ];

  const sc = sceneries[variantIdx];

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s1BgGrad_${variantIdx}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sc.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${sc.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.bgGrad[2]}"/>
    </linearGradient>

    <linearGradient id="s1BoxGrad_${variantIdx}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${sc.boxGrad[0]}"/>
      <stop offset="100%" stop-color="${sc.boxGrad[1]}"/>
    </linearGradient>

    <linearGradient id="s1TextGrad_${variantIdx}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sc.textGrad[0]}"/>
      <stop offset="100%" stop-color="${sc.textGrad[1]}"/>
    </linearGradient>

    <linearGradient id="s1ArrowGrad_${variantIdx}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${sc.arrowGrad[0]}"/>
      <stop offset="50%" stop-color="${sc.arrowGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.arrowGrad[2]}"/>
    </linearGradient>

    <filter id="s1CleanShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="${sc.boxGrad[0]}" flood-opacity="0.22"/>
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.08"/>
    </filter>

    <filter id="s1BoldTextShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="0" flood-color="#ffffff" flood-opacity="1"/>
      <feDropShadow dx="4" dy="14" stdDeviation="8" flood-color="${sc.boxGrad[0]}" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Clean Canvas Background -->
  <rect width="${w}" height="${h}" fill="url(#s1BgGrad_${variantIdx})"/>

  <!-- Top-Left Celestial & Aura Graphic -->
  <g transform="translate(140, 100)">
    <circle cx="-30" cy="-20" r="48" fill="${sc.sunColor}" opacity="0.85"/>
    <path d="M -70 10 Q -50 -15 -20 0 Q 10 -25 40 0 Q 70 -10 80 15 L -70 15 Z" fill="${sc.cloudColor}" opacity="0.6"/>
  </g>

  <!-- Bottom Perspective Dynamic Hills & Road Horizon -->
  <g transform="translate(${w / 2}, ${h})">
    <polygon points="-640,-130 -300,-170 0,-130 300,-180 640,-130 640,0 -640,0" fill="${sc.hills[0]}" opacity="0.6"/>
    <polygon points="-640,-80 -200,-110 100,-70 400,-100 640,-80 640,0 -640,0" fill="${sc.hills[1]}" opacity="0.7"/>
    <polygon points="-240,0 240,0 35,-60 -35,-60" fill="#f8fafc"/>
    <polygon points="-180,0 180,0 25,-60 -25,-60" fill="#e2e8f0"/>
    <polygon points="-20,0 20,0 4,-60 -4,-60" fill="#ffffff"/>
  </g>

  <!-- Central Dynamic Graphic Group (-3.5 deg signature tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-3.5) skewX(-3)">
    
    <!-- Flowing Dual Arc Loop Arrow -->
    <g transform="scale(1.25, 0.95)" filter="url(#s1CleanShadow)">
      <path d="M -260 -50 A 300 220 0 0 1 260 -50" fill="none" stroke="url(#s1ArrowGrad_${variantIdx})" stroke-width="26" stroke-linecap="round"/>
      <polygon points="260,-80 295,-45 255,-20" fill="${sc.arrowGrad[2]}"/>
      <path d="M 260 50 A 300 220 0 0 1 -260 50" fill="none" stroke="url(#s1ArrowGrad_${variantIdx})" stroke-width="26" stroke-linecap="round"/>
      <polygon points="-260,80 -295,45 -255,20" fill="${sc.arrowGrad[2]}"/>
    </g>

    <!-- Top Badge (Clean Curved Header) -->
    <g transform="translate(0, -170)" filter="url(#s1CleanShadow)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="36" font-weight="900" fill="${sc.badgeColor}" stroke="#ffffff" stroke-width="8" paint-order="stroke fill" letter-spacing="2">
        ✦ ${item.badge} ✦
      </text>
    </g>

    <!-- Line 1: Slanted Solid Banner Parallelogram Box -->
    <g transform="translate(0, -45)" filter="url(#s1CleanShadow)">
      <polygon points="-${boxWidth / 2 + 25},-54 ${boxWidth / 2 + 25},-54 ${boxWidth / 2 - 10},54 -${boxWidth / 2 - 10},54" fill="url(#s1BoxGrad_${variantIdx})" stroke="#ffffff" stroke-width="8"/>
      <text x="0" y="18" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" letter-spacing="-1">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Giant Bold Typography with White Contour -->
    <g transform="translate(0, 115)" filter="url(#s1BoldTextShadow)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="${sc.badgeColor}" stroke="#ffffff" stroke-width="22" paint-order="stroke fill" letter-spacing="-2">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#s1TextGrad_${variantIdx})" letter-spacing="-2">
        ${item.title2}
      </text>
    </g>

    <!-- Bottom English Subtitle -->
    <g transform="translate(0, 185)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="24" font-weight="900" fill="${sc.badgeColor}" letter-spacing="3">
        (AI PROMPT &amp; DEEP DOCS ANALYSIS)
      </text>
    </g>
  </g>

  <!-- Bottom Slogan Ribbon -->
  <g transform="translate(${w / 2}, ${h - 45})" filter="url(#s1CleanShadow)">
    <rect x="-420" y="-22" width="840" height="44" rx="22" fill="${sc.ribbonColor}"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="1">
      ${item.subTag}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 2: Comic Pop & Electric Plug
// Typography: 3D Comic Block with Mint/Yellow Fill + Plug & Cord Wire Motif
// Dynamic Sceneries: 5 Color & Lightning Atmospheres (Midnight Blue, Cyber Teal, Neon Magenta, Lava Amber, Emerald Matrix)
// ==============================================================================
export function renderStyle2_ComicPop(w, h, item) {
  const title1Size = calcFontSize(item.title1, 115, 8);
  const title2Size = calcFontSize(item.title2, 98, 12);

  const variantIdx = getHashIndex(item.id + (item.title1 || '') + (item.date || ''), 5);

  const sceneries = [
    // 0: Deep Comic Indigo & Blue
    {
      bgGrad: ['#1e1b4b', '#1e40af', '#312e81'],
      starburst: ['#ef4444', '#b91c1c'],
      burstStroke: '#facc15',
      textGrad: ['#a7f3d0', '#34d399', '#059669'],
      cableAccent: '#facc15',
      shards: ['#a855f7', '#ec4899', '#3b82f6'],
      ribbonBg: '#facc15',
      ribbonText: '#000000'
    },
    // 1: Cyber Teal & Acid Cyan
    {
      bgGrad: ['#042f2e', '#0f766e', '#115e59'],
      starburst: ['#f97316', '#c2410c'],
      burstStroke: '#38bdf8',
      textGrad: ['#fef08a', '#facc15', '#ca8a04'],
      cableAccent: '#2dd4bf',
      shards: ['#06b6d4', '#14b8a6', '#f59e0b'],
      ribbonBg: '#2dd4bf',
      ribbonText: '#000000'
    },
    // 2: Electric Magenta & Purple Shock
    {
      bgGrad: ['#2e0854', '#701a75', '#4a044e'],
      starburst: ['#0284c7', '#0369a1'],
      burstStroke: '#f43f5e',
      textGrad: ['#fef08a', '#fde047', '#eab308'],
      cableAccent: '#f43f5e',
      shards: ['#f472b6', '#c084fc', '#38bdf8'],
      ribbonBg: '#f43f5e',
      ribbonText: '#ffffff'
    },
    // 3: Solar Flare & Lava Carbon
    {
      bgGrad: ['#291804', '#7c2d12', '#451a03'],
      starburst: ['#dc2626', '#991b1b'],
      burstStroke: '#fde047',
      textGrad: ['#67e8f9', '#38bdf8', '#0284c7'],
      cableAccent: '#fbbf24',
      shards: ['#fb923c', '#f87171', '#fbbf24'],
      ribbonBg: '#fbbf24',
      ribbonText: '#000000'
    },
    // 4: Obsidian Emerald Matrix
    {
      bgGrad: ['#022c22', '#065f46', '#064e3b'],
      starburst: ['#7c3aed', '#5b21b6'],
      burstStroke: '#4ade80',
      textGrad: ['#fef08a', '#facc15', '#ca8a04'],
      cableAccent: '#4ade80',
      shards: ['#34d399', '#6ee7b7', '#a78bfa'],
      ribbonBg: '#4ade80',
      ribbonText: '#000000'
    }
  ];

  const sc = sceneries[variantIdx];

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s2BgGrad_${variantIdx}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${sc.bgGrad[0]}"/>
      <stop offset="40%" stop-color="${sc.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.bgGrad[2]}"/>
    </linearGradient>

    <linearGradient id="s2StarburstGrad_${variantIdx}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sc.starburst[0]}"/>
      <stop offset="100%" stop-color="${sc.starburst[1]}"/>
    </linearGradient>

    <linearGradient id="s2TextGrad_${variantIdx}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sc.textGrad[0]}"/>
      <stop offset="40%" stop-color="${sc.textGrad[1]}"/>
      <stop offset="100%" stop-color="${sc.textGrad[2]}"/>
    </linearGradient>

    <filter id="s2ComicHard3D" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="10" dy="16" stdDeviation="0" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="14" dy="24" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <polygon id="s2Burst16_${variantIdx}" points="
      0,-250 40,-170 120,-220 120,-140 210,-160 170,-90 250,-70 190,-10 240,50 170,80 200,160 120,150 110,230 40,180 0,250
      -40,180 -110,230 -120,150 -200,160 -170,80 -240,50 -190,-10 -250,-70 -170,-90 -210,-160 -120,-140 -120,-220 -40,-170
    " fill="url(#s2StarburstGrad_${variantIdx})" stroke="${sc.burstStroke}" stroke-width="8"/>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#s2BgGrad_${variantIdx})"/>

  <!-- Speed Lines & Dynamic Color Shards -->
  <g opacity="0.6">
    <polygon points="0,0 250,0 120,300 0,200" fill="${sc.shards[0]}" opacity="0.4"/>
    <polygon points="${w},0 ${w - 300},0 ${w - 180},280 ${w},150" fill="${sc.shards[1]}" opacity="0.4"/>
    <polygon points="0,${h} 280,${h} 150,${h - 260} 0,${h - 180}" fill="${sc.shards[2]}" opacity="0.4"/>
    <polygon points="${w},${h} ${w - 260},${h} ${w - 140},${h - 240} ${w},${h - 160}" fill="${sc.shards[0]}" opacity="0.4"/>
  </g>

  <!-- Floating Confetti & Sparkles -->
  <polygon points="120,140 160,110 170,160" fill="${sc.shards[1]}"/>
  <polygon points="${w - 160},120 ${w - 110},100 ${w - 130},150" fill="${sc.burstStroke}"/>
  <polygon points="180,${h - 120} 220,${h - 150} 240,${h - 90}" fill="${sc.shards[0]}"/>
  <circle cx="280" cy="120" r="14" fill="${sc.shards[2]}"/>
  <circle cx="${w - 280}" cy="140" r="16" fill="${sc.shards[1]}"/>

  <!-- Center Comic Starburst -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) scale(1.6, 1.05)" filter="url(#s2ComicHard3D)">
    <use href="#s2Burst16_${variantIdx}"/>
  </g>

  <!-- Swirling Power Cord / Plug Tail Graphic -->
  <g transform="translate(${w / 2}, ${h / 2})" filter="url(#s2ComicHard3D)">
    <path d="M -380 -80 C -480 -30, -420 180, -220 160 C 0 140, 360 220, 480 80" fill="none" stroke="#000000" stroke-width="36" stroke-linecap="round"/>
    <path d="M -380 -80 C -480 -30, -420 180, -220 160 C 0 140, 360 220, 480 80" fill="none" stroke="${sc.cableAccent}" stroke-width="14" stroke-linecap="round"/>
    
    <!-- 2-Prong Electric Plug -->
    <g transform="translate(480, 80) rotate(25)">
      <rect x="-10" y="-30" width="45" height="60" rx="8" fill="#000000" stroke="${sc.cableAccent}" stroke-width="4"/>
      <rect x="35" y="-20" width="28" height="12" rx="4" fill="${sc.cableAccent}"/>
      <rect x="35" y="8" width="28" height="12" rx="4" fill="${sc.cableAccent}"/>
    </g>
  </g>

  <!-- Dynamic Tilted Comic Content (-3 deg tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 20}) rotate(-3)">
    
    <!-- Top Boxed Word -->
    <g transform="translate(0, -65)" filter="url(#s2ComicHard3D)">
      <rect x="-260" y="-55" width="520" height="105" rx="16" fill="#000000" stroke="#000000" stroke-width="12"/>
      <text x="0" y="20" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" letter-spacing="-1">
        ${item.title1}
      </text>
    </g>

    <!-- Bottom Giant Word with Neon Fill -->
    <g transform="translate(0, 95)" filter="url(#s2ComicHard3D)">
      <text x="8" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="32" paint-order="stroke fill" letter-spacing="-2">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="url(#s2TextGrad_${variantIdx})" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-2">
        ${item.title2}
      </text>
    </g>

    <!-- Lightning Bolt Accents -->
    <g transform="translate(180, 50) scale(1.4)" filter="url(#s2ComicHard3D)">
      <polygon points="0,-35 15,-5 2,-2 18,30 -6,-2 4,-8" fill="${sc.burstStroke}" stroke="#000000" stroke-width="4"/>
    </g>
    <g transform="translate(-360, 40) rotate(-20) scale(1.2)" filter="url(#s2ComicHard3D)">
      <polygon points="0,-35 15,-5 2,-2 18,30 -6,-2 4,-8" fill="${sc.burstStroke}" stroke="#000000" stroke-width="4"/>
    </g>
  </g>

  <!-- Bottom Pop Subtag Banner -->
  <g transform="translate(${w / 2}, ${h - 45})" filter="url(#s2ComicHard3D)">
    <polygon points="-440,-20 440,-20 420,20 -420,20" fill="${sc.ribbonBg}" stroke="#000000" stroke-width="4"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="20" font-weight="900" fill="${sc.ribbonText}" letter-spacing="1">
      ⚡ ${item.subTag} ⚡
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 3: Street Graffiti & Caution Starburst
// Typography: Giant 3D Acid Lime Text with Black Contour & Y2K Stickers
// Dynamic Sceneries: 5 Color & Hazard Themes (Cobalt Blue, Dark Violet, Petrol Green, Graphite Stealth, Crimson Fury)
// ==============================================================================
export function renderStyle3_StreetGraffiti(w, h, item) {
  const title1Size = calcFontSize(item.title1, 118, 9);
  const title2Size = calcFontSize(item.title2, 108, 10);

  const variantIdx = getHashIndex(item.id + (item.title1 || '') + (item.date || ''), 5);

  const sceneries = [
    // 0: Vivid Royal Cobalt & Acid Lime
    {
      bg: '#1d4ed8',
      hazardColor: '#facc15',
      starFill: '#09090b',
      starStroke: '#000000',
      textGrad: ['#fef08a', '#d9f99d', '#a3e635', '#65a30d'],
      sticker1Bg: '#facc15',
      sticker2Bg: '#a3e635',
      subTagText: '#a3e635'
    },
    // 1: Dark Ultraviolet & Cyber Cyan
    {
      bg: '#3b0764',
      hazardColor: '#06b6d4',
      starFill: '#09090b',
      starStroke: '#06b6d4',
      textGrad: ['#a5f3fc', '#67e8f9', '#06b6d4', '#0891b2'],
      sticker1Bg: '#22d3ee',
      sticker2Bg: '#f472b6',
      subTagText: '#22d3ee'
    },
    // 2: Petrol Deep Teal & Neon Yellow
    {
      bg: '#064e3b',
      hazardColor: '#84cc16',
      starFill: '#021a14',
      starStroke: '#84cc16',
      textGrad: ['#fef08a', '#facc15', '#eab308', '#ca8a04'],
      sticker1Bg: '#facc15',
      sticker2Bg: '#84cc16',
      subTagText: '#facc15'
    },
    // 3: Graphite Carbon & Hot Orange
    {
      bg: '#1c1917',
      hazardColor: '#f97316',
      starFill: '#0c0a09',
      starStroke: '#f97316',
      textGrad: ['#ffedd5', '#fed7aa', '#fb923c', '#ea580c'],
      sticker1Bg: '#fb923c',
      sticker2Bg: '#facc15',
      subTagText: '#fb923c'
    },
    // 4: Crimson Fury & Neon Gold
    {
      bg: '#450a0a',
      hazardColor: '#facc15',
      starFill: '#1a0505',
      starStroke: '#ef4444',
      textGrad: ['#fef08a', '#facc15', '#f59e0b', '#d97706'],
      sticker1Bg: '#facc15',
      sticker2Bg: '#f87171',
      subTagText: '#facc15'
    }
  ];

  const sc = sceneries[variantIdx];

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Hazard Stripe Pattern -->
    <pattern id="s3Hazard_${variantIdx}" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="18" height="36" fill="${sc.hazardColor}"/>
      <rect x="18" width="18" height="36" fill="#000000"/>
    </pattern>

    <pattern id="s3Halftone_${variantIdx}" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="4" fill="#ffffff" opacity="0.12"/>
    </pattern>

    <linearGradient id="s3TextGrad_${variantIdx}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sc.textGrad[0]}"/>
      <stop offset="25%" stop-color="${sc.textGrad[1]}"/>
      <stop offset="70%" stop-color="${sc.textGrad[2]}"/>
      <stop offset="100%" stop-color="${sc.textGrad[3]}"/>
    </linearGradient>

    <!-- Giant 5-Point Star -->
    <polygon id="s3BlackStar_${variantIdx}" points="
      0,-260 75,-80 260,-80 110,35 165,220 0,110 -165,220 -110,35 -260,-80 -75,-80
    " fill="${sc.starFill}" stroke="${sc.starStroke}" stroke-width="12"/>

    <filter id="s3Street3D" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="10" dy="14" stdDeviation="0" flood-color="#000000" flood-opacity="1"/>
      <feDropShadow dx="16" dy="24" stdDeviation="16" flood-color="${sc.hazardColor}" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="${sc.bg}"/>
  <rect width="${w}" height="${h}" fill="url(#s3Halftone_${variantIdx})"/>

  <!-- Top Caution Hazard Tape -->
  <g transform="translate(0, 0)">
    <rect x="0" y="0" width="${w}" height="32" fill="url(#s3Hazard_${variantIdx})"/>
    <rect x="0" y="28" width="${w}" height="4" fill="#000000"/>
  </g>

  <!-- Bottom Caution Hazard Tape -->
  <g transform="translate(0, ${h - 32})">
    <rect x="0" y="0" width="${w}" height="32" fill="url(#s3Hazard_${variantIdx})"/>
    <rect x="0" y="0" width="${w}" height="4" fill="#000000"/>
  </g>

  <!-- Center Giant Star Graphic -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) scale(1.6, 1.15)" filter="url(#s3Street3D)">
    <use href="#s3BlackStar_${variantIdx}"/>
  </g>

  <!-- Y2K Sticker Bomb Accents -->
  <!-- 1. Smiley Face (Top-Right) -->
  <g transform="translate(${w - 140}, 110) rotate(15)" filter="url(#s3Street3D)">
    <circle cx="0" cy="0" r="50" fill="${sc.sticker1Bg}" stroke="#000000" stroke-width="6"/>
    <ellipse cx="-18" cy="-12" rx="7" ry="14" fill="#000000"/>
    <ellipse cx="18" cy="-12" rx="7" ry="14" fill="#000000"/>
    <path d="M -25 12 Q 0 40 25 12" fill="none" stroke="#000000" stroke-width="7" stroke-linecap="round"/>
  </g>

  <!-- 2. Spray Can Graphic (Bottom-Left) -->
  <g transform="translate(130, ${h - 130}) rotate(25)" filter="url(#s3Street3D)">
    <rect x="-25" y="-50" width="50" height="100" rx="10" fill="${sc.sticker2Bg}" stroke="#000000" stroke-width="6"/>
    <rect x="-12" y="-68" width="24" height="18" fill="#000000"/>
    <circle cx="0" cy="-75" r="6" fill="${sc.hazardColor}"/>
  </g>

  <!-- 3. Top-Left Street Pill -->
  <g transform="translate(160, 95) rotate(-10)" filter="url(#s3Street3D)">
    <rect x="-70" y="-22" width="140" height="44" rx="8" fill="${sc.sticker2Bg}" stroke="#000000" stroke-width="5"/>
    <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="22" font-weight="900" fill="#000000">
      ⚡ SPECIAL
    </text>
  </g>

  <!-- Central Typography Group -->
  <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-4) skewX(-2)">
    
    <!-- Top Stencil Badge -->
    <g transform="translate(0, -115)" filter="url(#s3Street3D)">
      <rect x="-240" y="-24" width="480" height="48" rx="6" fill="#000000" stroke="${sc.hazardColor}" stroke-width="4"/>
      <text x="0" y="9" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="3">
        ✦ ${item.badge} ✦
      </text>
    </g>

    <!-- Line 1: Ultra Giant Headline -->
    <g transform="translate(0, 0)" filter="url(#s3Street3D)">
      <text x="8" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="32" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="url(#s3TextGrad_${variantIdx})" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-2">
        ${item.title1}
      </text>
    </g>

    <!-- Line 2: Second Headline -->
    <g transform="translate(0, 105)" filter="url(#s3Street3D)">
      <text x="6" y="12" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="12" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>
  </g>

  <!-- Bottom Slogan Badge -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#s3Street3D)">
    <rect x="-400" y="-18" width="800" height="36" rx="8" fill="#000000" stroke="${sc.hazardColor}" stroke-width="3"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="18" font-weight="900" fill="${sc.subTagText}" letter-spacing="1">
      ✦ ${item.subTag} ✦
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 4: Dark Editorial & Kinetic Watermark
// Typography: Matte Dark Canvas + Dynamic Content Watermark + High Impact Clean Headline
// Dynamic Sceneries: 5 Color Matrix Themes (Obsidian Yellow, Carbon Orange, Midnight Cyan, Deep Plum Gold, Matrix Mint)
// ==============================================================================
export function renderStyle4_EditorialKinetic(w, h, item) {
  const title1Size = calcFontSize(item.title1, 130, 8);
  const title2Size = calcFontSize(item.title2, 96, 12);

  const variantIdx = getHashIndex(item.id + (item.title1 || '') + (item.date || ''), 5);

  const sceneries = [
    // 0: Obsidian & Laser Yellow
    {
      bg: '#09090b',
      accentPill: '#facc15',
      accentPillText: '#000000',
      badgeBg: '#ea580c',
      stickers: ['#2563eb', '#16a34a', '#ea580c', '#dc2626'],
      secondLineColor: '#facc15',
      echoOpacity: [0.25, 0.45]
    },
    // 1: Carbon Jet & Electric Orange
    {
      bg: '#0c0a09',
      accentPill: '#fb923c',
      accentPillText: '#000000',
      badgeBg: '#dc2626',
      stickers: ['#0284c7', '#10b981', '#f97316', '#e11d48'],
      secondLineColor: '#fb923c',
      echoOpacity: [0.22, 0.42]
    },
    // 2: Midnight Navy & Laser Cyan
    {
      bg: '#030712',
      accentPill: '#38bdf8',
      accentPillText: '#000000',
      badgeBg: '#4f46e5',
      stickers: ['#6366f1', '#06b6d4', '#ec4899', '#f59e0b'],
      secondLineColor: '#38bdf8',
      echoOpacity: [0.25, 0.48]
    },
    // 3: Deep Plum & Hot Gold
    {
      bg: '#0f0514',
      accentPill: '#eab308',
      accentPillText: '#000000',
      badgeBg: '#9333ea',
      stickers: ['#c084fc', '#f43f5e', '#a855f7', '#06b6d4'],
      secondLineColor: '#fde047',
      echoOpacity: [0.28, 0.5]
    },
    // 4: Matrix Charcoal & Neon Mint
    {
      bg: '#040d0a',
      accentPill: '#34d399',
      accentPillText: '#000000',
      badgeBg: '#059669',
      stickers: ['#10b981', '#38bdf8', '#fbbf24', '#f43f5e'],
      secondLineColor: '#6ee7b7',
      echoOpacity: [0.26, 0.46]
    }
  ];

  const sc = sceneries[variantIdx];
  // Dynamically use the article's own title for the kinetic ghost watermark!
  const echoWord = item.title1 || 'AI BREAKTHROUGH';

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="s4EditorialGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- Matte Canvas Background -->
  <rect width="${w}" height="${h}" fill="${sc.bg}"/>

  <!-- Dynamic Content Kinetic Wireframe Echo Ghost Typography -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)">
    <text x="0" y="-230" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size * 0.95}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="${sc.echoOpacity[0]}" letter-spacing="-3">
      ${echoWord}
    </text>
    <text x="0" y="-120" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="3" opacity="${sc.echoOpacity[1]}" letter-spacing="-3">
      ${echoWord}
    </text>
    <text x="0" y="240" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="3" opacity="${sc.echoOpacity[1]}" letter-spacing="-3">
      ${echoWord}
    </text>
    <text x="0" y="340" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size * 0.95}" font-weight="900" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="${sc.echoOpacity[0]}" letter-spacing="-3">
      ${echoWord}
    </text>
  </g>

  <!-- Scattered Primary Sticker Pills -->
  <!-- 1. Top-Right Pill -->
  <g transform="translate(${w - 180}, 90) rotate(10)" filter="url(#s4EditorialGlow)">
    <rect x="-90" y="-22" width="180" height="44" rx="22" fill="${sc.stickers[0]}"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ START NOW
    </text>
  </g>

  <!-- 2. Top-Left Pill -->
  <g transform="translate(180, 110) rotate(-12)" filter="url(#s4EditorialGlow)">
    <rect x="-85" y="-20" width="170" height="40" rx="20" fill="${sc.stickers[1]}"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="17" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ HOT ISSUE
    </text>
  </g>

  <!-- 3. Circular Badge (Left) -->
  <g transform="translate(120, 260) rotate(-15)" filter="url(#s4EditorialGlow)">
    <circle cx="0" cy="0" r="42" fill="${sc.stickers[2]}"/>
    <text x="0" y="-6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
      2026 플래그십
    </text>
    <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="16" font-weight="900" fill="#ffffff">
      실무 검증
    </text>
  </g>

  <!-- 4. Round Check Badges -->
  <g transform="translate(${w - 240}, 180) rotate(5)">
    <circle cx="-35" cy="0" r="24" fill="${sc.stickers[0]}"/>
    <text x="-35" y="8" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="20" font-weight="900" fill="#ffffff">✔</text>
    <circle cx="20" cy="0" r="24" fill="${sc.accentPill}"/>
    <text x="20" y="8" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="20" font-weight="900" fill="#000000">✔</text>
  </g>

  <!-- 5. Bottom-Right Starburst Emblem -->
  <g transform="translate(${w - 180}, ${h - 220}) rotate(-10)" filter="url(#s4EditorialGlow)">
    <polygon points="0,-45 15,-15 45,0 15,15 0,45 -15,15 -45,0 -15,-15" fill="${sc.stickers[0]}"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="15" font-weight="900" fill="#ffffff">
      AI 맞대결
    </text>
  </g>

  <!-- 6. Bottom-Right Pill -->
  <g transform="translate(${w - 200}, ${h - 110}) rotate(8)" filter="url(#s4EditorialGlow)">
    <rect x="-85" y="-20" width="170" height="40" rx="20" fill="${sc.stickers[3]}"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="17" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ VS MATCH
    </text>
  </g>

  <!-- Central Solid Giant White Headline (-4.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)" filter="url(#s4EditorialGlow)">
    
    <!-- Top Red Arch Badge -->
    <g transform="translate(0, -95)">
      <path d="M -90 15 L -90 -10 Q 0 -50 90 -10 L 90 15 Z" fill="${sc.badgeBg}"/>
      <text x="0" y="4" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="20" font-weight="900" fill="#ffffff">
        ${item.badge}
      </text>
    </g>

    <!-- Main Solid Bold White Headline -->
    <g transform="translate(0, 15)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${item.title1}
      </text>
    </g>

    <!-- Second Line -->
    <g transform="translate(0, 105)">
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="${sc.secondLineColor}" stroke="#000000" stroke-width="12" paint-order="stroke fill" letter-spacing="-1.5">
        ${item.title2}
      </text>
    </g>
  </g>

  <!-- Highlight Pill Ribbon -->
  <g transform="translate(${w / 2 - 120}, ${h - 110}) rotate(-5)" filter="url(#s4EditorialGlow)">
    <rect x="-240" y="-22" width="480" height="44" rx="22" fill="${sc.accentPill}"/>
    <text x="-15" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', sans-serif" font-size="18" font-weight="900" fill="${sc.accentPillText}">
      ${item.subTag}
    </text>
    <circle cx="205" cy="0" r="16" fill="${sc.badgeBg}"/>
    <text x="205" y="5" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#ffffff">✔</text>
  </g>
</svg>`;
}

// Master Dispatcher
export function renderThumbnailSVG(style, item, w = 1280, h = 720) {
  switch (style) {
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

// Generate all configured thumbnails
export async function generateAllHookThumbnails() {
  console.log('🚀 Generating Dynamic Content-Aware High-Converting Thumbnails...');
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



  const styleKeys = [
    'style1_ecoclean',
    'style3_streetgraffiti',
    'style2_comicpop',
    'style4_editorialkinetic'
  ];

  let count = 0;
  for (let i = 0; i < blogsData.length; i++) {
    const post = blogsData[i];
    const style = styleKeys[i % styleKeys.length];

    // Extract dynamic title parts
    const titleParts = post.title.split(':');
    const mainTitle = (titleParts[1] || titleParts[0]).trim();
    const words = mainTitle.split(' ');
    const half = Math.ceil(words.length / 2);
    const title1 = words.slice(0, half).join(' ');
    const title2 = words.slice(half).join(' ');

    const item = {
      id: post.id,
      date: post.date,
      style,
      badge: post.tags && post.tags[0] ? post.tags[0] : '2026 AI 트렌드',
      title1: title1 || '최신 AI 동향',
      title2: title2 || '실무 활용 가이드',
      subTag: post.excerpt ? post.excerpt.slice(0, 32) + '...' : '2026 대한민국 1위 AI 포털'
    };

    const svg = renderThumbnailSVG(style, item, 1280, 720);
    const targetFile = path.join(outDir, `${post.id}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 92 })
      .toFile(targetFile);

    count++;
  }

  console.log(`✅ Successfully generated ${count} dynamic content-varied thumbnails in ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllHookThumbnails().catch(console.error);
}
