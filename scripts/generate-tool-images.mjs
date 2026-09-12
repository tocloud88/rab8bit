import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT_DIR, 'public/images/tools');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Load tools from TypeScript file
const content = fs.readFileSync(path.join(ROOT_DIR, 'src/data/interactiveToolsData.ts'), 'utf8');
const startPos = content.indexOf('export const INTERACTIVE_TOOLS');
const eqPos = content.indexOf('=', startPos);
const arrayStart = content.indexOf('[', eqPos);
const arrayEnd = content.lastIndexOf(']');
const rawArray = content.substring(arrayStart, arrayEnd + 1);
const tools = eval('(' + rawArray + ')');

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const FONT_FAMILY = "'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', 'Noto Sans KR', sans-serif";

// -----------------------------------------------------------------------------
// 12 Vibrant & High-Contrast Visual Palettes for Distinguishable Cards
// -----------------------------------------------------------------------------
const PALETTES = [
  // 0: Gold & Amber (Finance / Money / Winning)
  {
    bgGrad: ['#1c1303', '#3d2504', '#0c0701'],
    accent: '#facc15',
    accentLight: '#fef08a',
    accentDark: '#854d0e',
    glowColor: '#eab308',
    title2Color: '#fde047',
    badgeBg: '#ca8a04',
    badgeText: '#ffffff'
  },
  // 1: Emerald & Mint (Tax / Salary / Savings)
  {
    bgGrad: ['#021b12', '#064e3b', '#010f0a'],
    accent: '#34d399',
    accentLight: '#a7f3d0',
    accentDark: '#065f46',
    glowColor: '#10b981',
    title2Color: '#6ee7b7',
    badgeBg: '#059669',
    badgeText: '#ffffff'
  },
  // 2: Royal Blue & Sky Cyan (Stock / Tech / Converter)
  {
    bgGrad: ['#051129', '#1e3a8a', '#020712'],
    accent: '#38bdf8',
    accentLight: '#bae6fd',
    accentDark: '#1e40af',
    glowColor: '#0284c7',
    title2Color: '#7dd3fc',
    badgeBg: '#2563eb',
    badgeText: '#ffffff'
  },
  // 3: Cyber Acid Volt (Trading / Crypto / Speed)
  {
    bgGrad: ['#0d1403', '#1e3a05', '#050a01'],
    accent: '#ccff00',
    accentLight: '#ecfccb',
    accentDark: '#3f6212',
    glowColor: '#84cc16',
    title2Color: '#ccff00',
    badgeBg: '#65a30d',
    badgeText: '#000000'
  },
  // 4: Vivid Crimson & Coral (Health / Risk / Emergency)
  {
    bgGrad: ['#24050b', '#881337', '#120205'],
    accent: '#fb7185',
    accentLight: '#fecdd3',
    accentDark: '#9f1239',
    glowColor: '#f43f5e',
    title2Color: '#fca5a5',
    badgeBg: '#e11d48',
    badgeText: '#ffffff'
  },
  // 5: Electric Purple & Amethyst (Game / Tarot / Fortune)
  {
    bgGrad: ['#1c0733', '#581c87', '#0e031a'],
    accent: '#c084fc',
    accentLight: '#f3e8ff',
    accentDark: '#6b21a8',
    glowColor: '#9333ea',
    title2Color: '#d8b4fe',
    badgeBg: '#7c3aed',
    badgeText: '#ffffff'
  },
  // 6: Sunset Orange & Coral (Food / Leisure / Energy)
  {
    bgGrad: ['#240d04', '#7c2d12', '#120602'],
    accent: '#fb923c',
    accentLight: '#ffedd5',
    accentDark: '#9a3412',
    glowColor: '#ea580c',
    title2Color: '#fdba74',
    badgeBg: '#ea580c',
    badgeText: '#ffffff'
  },
  // 7: Neon Hot Pink & Magenta (MBTI / Dating / Party)
  {
    bgGrad: ['#2b061b', '#831843', '#14020c'],
    accent: '#f472b6',
    accentLight: '#fce7f3',
    accentDark: '#9d174d',
    glowColor: '#db2777',
    title2Color: '#f9a8d4',
    badgeBg: '#db2777',
    badgeText: '#ffffff'
  },
  // 8: Deep Indigo & Slate (Dev / Developer / Security)
  {
    bgGrad: ['#09091f', '#312e81', '#04040e'],
    accent: '#818cf8',
    accentLight: '#e0e7ff',
    accentDark: '#3730a3',
    glowColor: '#6366f1',
    title2Color: '#a5b4fc',
    badgeBg: '#4f46e5',
    badgeText: '#ffffff'
  },
  // 9: Matrix Teal & Aquamarine (Calculator / Unit / Web)
  {
    bgGrad: ['#021919', '#134e4a', '#010c0c'],
    accent: '#2dd4bf',
    accentLight: '#ccfbf1',
    accentDark: '#115e59',
    glowColor: '#0d9488',
    title2Color: '#5eead4',
    badgeBg: '#0f766e',
    badgeText: '#ffffff'
  },
  // 10: Radiant Violet & Cyan (AI / Smart / Modern)
  {
    bgGrad: ['#12082b', '#4338ca', '#090317'],
    accent: '#38bdf8',
    accentLight: '#c7d2fe',
    accentDark: '#4338ca',
    glowColor: '#6366f1',
    title2Color: '#a5b4fc',
    badgeBg: '#6366f1',
    badgeText: '#ffffff'
  },
  // 11: Ruby & Gold Arc (Premium / Investment / VIP)
  {
    bgGrad: ['#240905', '#7f1d1d', '#120402'],
    accent: '#facc15',
    accentLight: '#fef08a',
    accentDark: '#991b1b',
    glowColor: '#dc2626',
    title2Color: '#fde047',
    badgeBg: '#b91c1c',
    badgeText: '#ffffff'
  }
];

// -----------------------------------------------------------------------------
// Curated 2-Line High-Impact Titles and Sub-features for all 100 Tools
// -----------------------------------------------------------------------------
function parseToolVisualData(tool, index) {
  const slug = tool.slug || '';
  const rawTitle = (tool.title || '').replace(/계산기/g, '').replace(/생성기/g, '').trim();
  const words = rawTitle.split(/[ &+,/·]/).filter(w => w.trim().length > 0);
  
  let title1 = words[0] || '스마트';
  let title2 = words.slice(1).join(' ') || (tool.title.includes('계산기') ? '계산기' : '도구');

  if (title1.length > 7) {
    title2 = title1.slice(5) + ' ' + title2;
    title1 = title1.slice(0, 5);
  }
  if (title2.length > 9) {
    title2 = title2.slice(0, 9);
  }

  // Pick palette by hash + index to ensure adjacent tools have contrasting colors
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const paletteIdx = (hash + index * 3) % PALETTES.length;
  const p = PALETTES[paletteIdx];

  // Pick sub-feature text
  const desc = tool.description || '';
  let subFeature = '✦ 2026 최신 알고리즘 실시간 계산';
  if (desc.includes('4대보험')) subFeature = '✔ 2026 4대보험 & 근로소득세 반영';
  else if (desc.includes('평단가')) subFeature = '✔ 목표 탈출 단가 & 물타기 시뮬레이션';
  else if (desc.includes('중개')) subFeature = '✔ 매매/전월세 법정 상한 요율 적용';
  else if (desc.includes('이자')) subFeature = '✔ 원리금/원금 균등 상환액 비교';
  else if (desc.includes('3.3%')) subFeature = '✔ 소득세 3% + 지방세 0.3% 원천징수';
  else if (desc.includes('수익률')) subFeature = '✔ 매수/매도 수수료 & 순수익 계산';
  else if (desc.includes('로또')) subFeature = '✔ 6/45 행운 난수 100% 랜덤 추출';
  else if (desc.includes('사다리')) subFeature = '✔ 최대 12명 벌칙 내기 원클릭 추첨';
  else if (desc.includes('MBTI')) subFeature = '✔ 16가지 성격 유형별 궁합 지수';
  else if (desc.includes('포모도로')) subFeature = '✔ 25분 집중 + 5분 휴식 타이머';
  else if (desc.includes('QR')) subFeature = '✔ 고화질 QR 코드 즉시 다운로드';
  else if (desc.includes('JSON')) subFeature = '✔ JSON 문법 오류 검증 & 정렬';
  else if (desc.includes('JWT')) subFeature = '✔ Header & Payload 페이로드 디코딩';
  else if (desc.includes('비밀번호')) subFeature = '✔ 100% 안전한 고난도 암호 생성';
  else if (desc.includes('D-Day') || desc.includes('디데이')) subFeature = '✔ 디데이 & 백일/천일 기념일 계산';
  else if (desc.includes('BMI')) subFeature = '✔ 비만도 지수 & 표준 체중 산출';
  else if (desc.includes('카페인')) subFeature = '✔ 체내 잔여 카페인 반감기 분석';
  else if (desc.includes('알코올')) subFeature = '✔ 위드마크 공식 분해 시간 산출';
  else if (desc.includes('타로')) subFeature = '✔ 22장 메이저 아르카나 오늘의 운세';
  else if (desc.includes('룰렛')) subFeature = '✔ 점심/야식 메뉴 랜덤 원클릭 추첨';
  else if (desc.includes('퇴직금')) subFeature = '✔ 근로기준법 기준 3개월 평균임금';
  else if (desc.includes('연차')) subFeature = '✔ 통상임금 기준 미사용 연차 보상';
  else if (desc.includes('주휴')) subFeature = '✔ 주 15시간 이상 근무 주휴수당';
  else if (desc.includes('종합소득세')) subFeature = '✔ 6%~45% 8단계 누진세율 적용';
  else if (desc.includes('상여금')) subFeature = '✔ 성과급 & 보너스 세후 수령액';

  return {
    title1: escapeXml(title1),
    title2: escapeXml(title2),
    subFeature: escapeXml(subFeature),
    palette: p
  };
}

// -----------------------------------------------------------------------------
// SVG Card Generator for 640x360 Tool Thumbnail
// -----------------------------------------------------------------------------
function generateToolSVG(tool, index) {
  const w = 640;
  const h = 360;
  const { title1, title2, subFeature, palette: p } = parseToolVisualData(tool, index);
  const icon = tool.icon || '⚡';
  const category = escapeXml(tool.category || '스마트 도구');
  const badge = escapeXml(tool.badge || 'PRO');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad_${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bgGrad[0]}"/>
      <stop offset="60%" stop-color="${p.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${p.bgGrad[2]}"/>
    </linearGradient>

    <!-- Icon Pedestal Glow Gradient -->
    <radialGradient id="iconGlow_${index}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.glowColor}" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="${p.glowColor}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Drop Shadow Filter -->
    <filter id="toolShadow_${index}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- 1. Rich Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#bgGrad_${index})"/>

  <!-- 2. Subtle High-Tech Geometric Grid & Radial Lighting -->
  <g opacity="0.12">
    <circle cx="${w - 100}" cy="80" r="160" fill="none" stroke="${p.accent}" stroke-width="2" stroke-dasharray="8,8"/>
    <circle cx="${w - 100}" cy="80" r="100" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
    <line x1="0" y1="80" x2="${w}" y2="80" stroke="${p.accent}" stroke-width="1" stroke-dasharray="4,4"/>
    <line x1="0" y1="280" x2="${w}" y2="280" stroke="${p.accent}" stroke-width="1" stroke-dasharray="4,4"/>
  </g>

  <!-- Ambient Glowing Orb behind Icon -->
  <circle cx="115" cy="180" r="110" fill="url(#iconGlow_${index})"/>

  <!-- 3. Left Zone: Giant 3D Icon & Embellished Glass Badge -->
  <g transform="translate(115, 175)" filter="url(#toolShadow_${index})">
    <!-- Outer Octagon/Rounded Base -->
    <rect x="-68" y="-68" width="136" height="136" rx="34" fill="#090d16" fill-opacity="0.85" stroke="${p.accent}" stroke-width="3"/>
    <rect x="-62" y="-62" width="124" height="124" rx="28" fill="#000000" fill-opacity="0.45"/>
    
    <!-- Giant Representative 3D Emoji -->
    <text x="0" y="24" text-anchor="middle" font-size="64">${icon}</text>
  </g>

  <!-- 4. Right Zone: Distinctive Tool Typography & Badges -->
  
  <!-- Category Tag Pill -->
  <g transform="translate(230, 68)">
    <rect x="0" y="-18" width="115" height="30" rx="15" fill="#000000" fill-opacity="0.65" stroke="${p.accent}" stroke-width="1.5"/>
    <text x="57" y="2" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="12" font-weight="900" fill="${p.accentLight}" letter-spacing="0.5">
      ${category}
    </text>
  </g>

  <!-- Top-Right Highlight Badge -->
  <g transform="translate(${w - 90}, 68)">
    <rect x="-45" y="-18" width="90" height="30" rx="15" fill="${p.badgeBg}" stroke="#ffffff" stroke-width="1.5" filter="url(#toolShadow_${index})"/>
    <text x="0" y="2" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="12" font-weight="900" fill="${p.badgeText}">
      ${badge}
    </text>
  </g>

  <!-- Main 2-Line Bold Tool Title in Paperlogy -->
  <g transform="translate(230, 145)" filter="url(#toolShadow_${index})">
    <!-- Line 1 (White Bold Title) -->
    <text x="0" y="6" font-family="${FONT_FAMILY}" font-size="34" font-weight="900" fill="#000000" stroke="#000000" stroke-width="10" paint-order="stroke fill" letter-spacing="-1">
      ${title1}
    </text>
    <text x="0" y="0" font-family="${FONT_FAMILY}" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="-1">
      ${title1}
    </text>

    <!-- Line 2 (Vibrant Neon Accent Title) -->
    <text x="0" y="54" font-family="${FONT_FAMILY}" font-size="30" font-weight="900" fill="#000000" stroke="#000000" stroke-width="10" paint-order="stroke fill" letter-spacing="-1">
      ${title2}
    </text>
    <text x="0" y="48" font-family="${FONT_FAMILY}" font-size="30" font-weight="900" fill="${p.title2Color}" letter-spacing="-1">
      ${title2}
    </text>
  </g>

  <!-- Bottom Highlight Sub-Feature Bar -->
  <g transform="translate(230, 275)" filter="url(#toolShadow_${index})">
    <rect x="-6" y="-16" width="380" height="32" rx="16" fill="#000000" fill-opacity="0.75" stroke="${p.accent}" stroke-width="1.5"/>
    <text x="14" y="5" font-family="${FONT_FAMILY}" font-size="12.5" font-weight="800" fill="#e2e8f0" letter-spacing="0.2">
      ${subFeature}
    </text>
  </g>

  <!-- Bottom Right Mini Decorative Emblem -->
  <g transform="translate(${w - 35}, ${h - 25})" opacity="0.65">
    <circle cx="0" cy="0" r="6" fill="${p.accent}"/>
    <circle cx="-16" cy="0" r="3" fill="${p.accent}"/>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// Generate All 100 Unique Tool Thumbnails
// -----------------------------------------------------------------------------
async function generateAllToolImages() {
  console.log(`🚀 Generating 100 100% Distinct, High-Impact Tool Thumbnails with Paperlogy Font...`);
  let count = 0;

  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    const svg = generateToolSVG(tool, i);
    const targetFile = path.join(OUT_DIR, `${tool.slug}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toFile(targetFile);

    count++;
  }

  console.log(`✅ Successfully generated ${count} distinct tool thumbnails in ${OUT_DIR}`);
}

generateAllToolImages().catch(console.error);
