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
    badgeText: '#ffffff',
    iconFill: '#fef08a'
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
    badgeText: '#ffffff',
    iconFill: '#a7f3d0'
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
    badgeText: '#ffffff',
    iconFill: '#bae6fd'
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
    badgeText: '#000000',
    iconFill: '#ccff00'
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
    badgeText: '#ffffff',
    iconFill: '#fecdd3'
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
    badgeText: '#ffffff',
    iconFill: '#f3e8ff'
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
    badgeText: '#ffffff',
    iconFill: '#ffedd5'
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
    badgeText: '#ffffff',
    iconFill: '#fce7f3'
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
    badgeText: '#ffffff',
    iconFill: '#e0e7ff'
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
    badgeText: '#ffffff',
    iconFill: '#ccfbf1'
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
    badgeText: '#ffffff',
    iconFill: '#c7d2fe'
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
    badgeText: '#ffffff',
    iconFill: '#fef08a'
  }
];

// -----------------------------------------------------------------------------
// High-Resolution Crisp Vector Icons (100% SVG, Zero Missing Emoji Risk)
// -----------------------------------------------------------------------------
function getVectorIconSVG(slug, color = '#ffffff') {
  // Sized within 64x64 viewport
  if (slug.includes('salary') || slug.includes('bonus') || slug.includes('money') || slug.includes('severance') || slug.includes('weekly') || slug.includes('annual') || slug.includes('tax') || slug.includes('freelancer') || slug.includes('comprehensive') || slug.includes('youth-leap')) {
    // Banknote & Coins / Money Bag
    return `<g fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="14" width="52" height="36" rx="6" fill="${color}" fill-opacity="0.15"/>
      <circle cx="32" cy="32" r="9" fill="${color}" fill-opacity="0.3"/>
      <line x1="14" y1="24" x2="14" y2="24.01" stroke-width="6"/>
      <line x1="50" y1="40" x2="50" y2="40.01" stroke-width="6"/>
      <path d="M28 26h8M32 26v12M28 38h8"/>
    </g>`;
  }

  if (slug.includes('stock') || slug.includes('crypto') || slug.includes('savings') || slug.includes('windmill') || slug.includes('gpa')) {
    // Trending Growth Chart
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 50h48" stroke-width="3.5" opacity="0.6"/>
      <path d="M12 42l14-16 12 10 18-20"/>
      <path d="M46 16h10v10"/>
      <circle cx="26" cy="26" r="4" fill="${color}"/>
      <circle cx="38" cy="36" r="4" fill="${color}"/>
      <circle cx="56" cy="16" r="4" fill="${color}"/>
    </g>`;
  }

  if (slug.includes('realtor') || slug.includes('pyeong') || slug.includes('house') || slug.includes('restaurant')) {
    // Modern House / Real Estate Building
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8L8 28h8v24h32V28h8z" fill="${color}" fill-opacity="0.2"/>
      <rect x="26" y="34" width="12" height="18" fill="${color}" fill-opacity="0.5"/>
      <circle cx="32" cy="20" r="4" fill="${color}"/>
    </g>`;
  }

  if (slug.includes('loan') || slug.includes('credit') || slug.includes('duty') || slug.includes('unit-price')) {
    // Credit Card / Safe Bank Vault
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="14" width="52" height="36" rx="8" fill="${color}" fill-opacity="0.15"/>
      <line x1="6" y1="24" x2="58" y2="24" stroke-width="6"/>
      <rect x="14" y="34" width="12" height="8" rx="2" fill="${color}"/>
      <circle cx="44" cy="38" r="4" fill="${color}" fill-opacity="0.7"/>
    </g>`;
  }

  if (slug.includes('lotto') || slug.includes('dice') || slug.includes('ladder') || slug.includes('roulette') || slug.includes('game') || slug.includes('party') || slug.includes('charades') || slug.includes('speed') || slug.includes('chosung')) {
    // Dice / Luck Star
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="10" width="44" height="44" rx="10" fill="${color}" fill-opacity="0.2"/>
      <circle cx="22" cy="22" r="4" fill="${color}"/>
      <circle cx="42" cy="22" r="4" fill="${color}"/>
      <circle cx="32" cy="32" r="4.5" fill="${color}"/>
      <circle cx="22" cy="42" r="4" fill="${color}"/>
      <circle cx="42" cy="42" r="4" fill="${color}"/>
    </g>`;
  }

  if (slug.includes('qr') || slug.includes('barcode')) {
    // High-Tech QR Scanner
    return `<g fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="20" rx="4" fill="${color}" fill-opacity="0.25"/>
      <rect x="14" y="14" width="8" height="8" fill="${color}"/>
      <rect x="36" y="8" width="20" height="20" rx="4" fill="${color}" fill-opacity="0.25"/>
      <rect x="42" y="14" width="8" height="8" fill="${color}"/>
      <rect x="8" y="36" width="20" height="20" rx="4" fill="${color}" fill-opacity="0.25"/>
      <rect x="14" y="42" width="8" height="8" fill="${color}"/>
      <path d="M36 36h8v8h-8zM48 36h8v8h-8zM36 48h8v8h-8zM48 48h8v8h-8z" fill="${color}"/>
    </g>`;
  }

  if (slug.includes('password') || slug.includes('jwt') || slug.includes('hash') || slug.includes('base64') || slug.includes('security') || slug.includes('uuid')) {
    // Security Shield & Key
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 6l20 8v16c0 14-9 22-20 28C21 52 12 44 12 30V14z" fill="${color}" fill-opacity="0.2"/>
      <circle cx="32" cy="26" r="6" stroke-width="4"/>
      <path d="M32 32v10" stroke-width="4.5"/>
    </g>`;
  }

  if (slug.includes('json') || slug.includes('sql') || slug.includes('regex') || slug.includes('html') || slug.includes('markdown') || slug.includes('cron') || slug.includes('dev') || slug.includes('subnet') || slug.includes('user-agent') || slug.includes('my-ip') || slug.includes('url')) {
    // Developer Code Brackets < / >
    return `<g fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 18L8 32l12 14"/>
      <path d="M44 18l12 14-12 14"/>
      <line x1="36" y1="12" x2="28" y2="52" stroke-width="4.5" opacity="0.8"/>
    </g>`;
  }

  if (slug.includes('pomodoro') || slug.includes('dday') || slug.includes('holiday') || slug.includes('military') || slug.includes('timestamp') || slug.includes('sleep') || slug.includes('baby') || slug.includes('lunar') || slug.includes('age') || slug.includes('reaction')) {
    // Precision Stopwatch / Timer
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="34" r="22" fill="${color}" fill-opacity="0.2"/>
      <path d="M32 6v6M26 6h12M48 18l4-4"/>
      <polyline points="32,22 32,34 42,34" stroke-width="4.5"/>
    </g>`;
  }

  if (slug.includes('bmi') || slug.includes('caffeine') || slug.includes('alcohol') || slug.includes('water') || slug.includes('onerm') || slug.includes('quit') || slug.includes('pregnancy') || slug.includes('cheer')) {
    // Heart Vital & Health Activity
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 54S10 40 10 24a12 12 0 0 1 22-7 12 12 0 0 1 22 7c0 16-22 30-22 30z" fill="${color}" fill-opacity="0.25"/>
      <polyline points="18,26 26,26 30,18 34,34 38,26 46,26" stroke="${color}" stroke-width="4"/>
    </g>`;
  }

  if (slug.includes('mbti') || slug.includes('tarot') || slug.includes('birthday') || slug.includes('qna') || slug.includes('new-word')) {
    // Magic Star / Crystal Sparkle
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 6l6 18 18 6-18 6-6 18-6-18-18-6 18-6z" fill="${color}" fill-opacity="0.3"/>
      <circle cx="16" cy="14" r="3" fill="${color}"/>
      <circle cx="48" cy="48" r="3" fill="${color}"/>
    </g>`;
  }

  if (slug.includes('color') || slug.includes('gradient') || slug.includes('svg') || slug.includes('aspect') || slug.includes('transparent') || slug.includes('flexbox') || slug.includes('knitting')) {
    // Design Art Palette
    return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8C18.7 8 8 18.7 8 32c0 10.3 6.8 19 16.2 21.6 2.3.6 4.3-.7 4.3-2.6v-3.5c0-4.4 3.6-8 8-8h5.5c7.7 0 14-6.3 14-14 0-13.3-10.7-23.5-24-23.5z" fill="${color}" fill-opacity="0.2"/>
      <circle cx="20" cy="22" r="4" fill="${color}"/>
      <circle cx="32" cy="18" r="4" fill="${color}"/>
      <circle cx="44" cy="24" r="4" fill="${color}"/>
    </g>`;
  }

  // Default: Precision Lightning Spark
  return `<g fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="36 6 14 34 32 34 28 58 50 30 32 30" fill="${color}" fill-opacity="0.3"/>
  </g>`;
}

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
  if (title2.length > 10) {
    title2 = title2.slice(0, 10);
  }

  // Pick palette by hash + index to ensure adjacent tools have contrasting colors
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const paletteIdx = (hash + index * 3) % PALETTES.length;
  const p = PALETTES[paletteIdx];

  // Pick sub-feature text
  const desc = tool.description || '';
  let subFeature = '✦ 2026 최신 알고리즘 실시간 분석';
  if (desc.includes('4대보험')) subFeature = '✔ 2026 4대보험 & 세후 실수령액 계산';
  else if (desc.includes('평단가')) subFeature = '✔ 목표 탈출 단가 & 물타기 시뮬레이션';
  else if (desc.includes('중개')) subFeature = '✔ 법정 상한 요율 복비 & 부가세 계산';
  else if (desc.includes('이자')) subFeature = '✔ 원리금/원금 균등 상환액 비교';
  else if (desc.includes('3.3%')) subFeature = '✔ 3.3% 사업소득세 원천징수 계산';
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
  else if (desc.includes('퇴직금')) subFeature = '✔ 근로기준법 3개월 평균임금 계산';
  else if (desc.includes('연차')) subFeature = '✔ 통상임금 기준 미사용 연차 수당';
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
// SVG Card Generator for 640x360 Tool Thumbnail (Ultra High Readability & Icon Visibility)
// -----------------------------------------------------------------------------
function generateToolSVG(tool, index) {
  const w = 640;
  const h = 360;
  const { title1, title2, subFeature, palette: p } = parseToolVisualData(tool, index);
  const category = escapeXml(tool.category || '스마트 도구');
  const badge = escapeXml(tool.badge || 'PRO');
  const iconSVG = getVectorIconSVG(tool.slug, p.iconFill);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad_${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${p.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${p.bgGrad[2]}"/>
    </linearGradient>

    <!-- Icon Container Gradient (Vibrant, never black) -->
    <linearGradient id="iconContainerGrad_${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.accentDark}"/>
      <stop offset="50%" stop-color="${p.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${p.bgGrad[0]}"/>
    </linearGradient>

    <!-- Radial Glow for Icon -->
    <radialGradient id="iconRadialGlow_${index}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.glowColor}" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="${p.glowColor}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Drop Shadow Filter for Elements -->
    <filter id="crispShadow_${index}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- 1. Rich Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#bgGrad_${index})"/>

  <!-- 2. High-Tech Background Decorative Curves & Glow Orbs -->
  <circle cx="120" cy="180" r="140" fill="url(#iconRadialGlow_${index})"/>
  <g opacity="0.18">
    <circle cx="${w - 60}" cy="60" r="180" fill="none" stroke="${p.accent}" stroke-width="2.5" stroke-dasharray="10,8"/>
    <circle cx="${w - 60}" cy="60" r="120" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
    <line x1="0" y1="70" x2="${w}" y2="70" stroke="${p.accent}" stroke-width="1.5" stroke-dasharray="6,6"/>
    <line x1="0" y1="285" x2="${w}" y2="285" stroke="${p.accent}" stroke-width="1.5" stroke-dasharray="6,6"/>
  </g>

  <!-- 3. Left Zone: High-Visibility Glowing Vector Icon Emblem (156x156px) -->
  <g transform="translate(118, 180)" filter="url(#crispShadow_${index})">
    <!-- Outer Glowing Rounded Squircle Frame -->
    <rect x="-78" y="-78" width="156" height="156" rx="40" fill="url(#iconContainerGrad_${index})" stroke="${p.accent}" stroke-width="4"/>
    <!-- Inner Glass Border -->
    <rect x="-70" y="-70" width="140" height="140" rx="34" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.35"/>
    
    <!-- Giant Crisp Vector Icon (Scaled up to fill squircle) -->
    <g transform="translate(-43, -43) scale(1.35)">
      ${iconSVG}
    </g>
  </g>

  <!-- 4. Right Zone: Large, High-Contrast Typography & Badges -->

  <!-- Top Category Pill -->
  <g transform="translate(225, 58)" filter="url(#crispShadow_${index})">
    <rect x="0" y="-18" width="135" height="36" rx="18" fill="#000000" fill-opacity="0.85" stroke="${p.accent}" stroke-width="2.2"/>
    <text x="67" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="${p.accentLight}" letter-spacing="0.5">
      ${category}
    </text>
  </g>

  <!-- Top-Right Badge -->
  <g transform="translate(${w - 95}, 58)" filter="url(#crispShadow_${index})">
    <rect x="-55" y="-18" width="110" height="36" rx="18" fill="${p.badgeBg}" stroke="#ffffff" stroke-width="2.2"/>
    <text x="0" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="${p.badgeText}">
      ${badge}
    </text>
  </g>

  <!-- Main Huge Tool Title (46px & 40px) -->
  <g transform="translate(225, 142)" filter="url(#crispShadow_${index})">
    <!-- Line 1 (Crisp Pure White) -->
    <text x="0" y="0" font-family="${FONT_FAMILY}" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="-1">
      ${title1}
    </text>

    <!-- Line 2 (Vibrant Neon Accent) -->
    <text x="0" y="54" font-family="${FONT_FAMILY}" font-size="40" font-weight="900" fill="${p.title2Color}" letter-spacing="-1">
      ${title2}
    </text>
  </g>

  <!-- Bottom Highlight Sub-Feature Pill (High Contrast & Clear) -->
  <g transform="translate(225, 282)" filter="url(#crispShadow_${index})">
    <rect x="-8" y="-19" width="405" height="38" rx="19" fill="#030712" fill-opacity="0.95" stroke="${p.accent}" stroke-width="2.2"/>
    <text x="14" y="6" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="0.2">
      ${subFeature}
    </text>
  </g>

  <!-- Bottom Right Decorative Neon Dots -->
  <g transform="translate(${w - 30}, ${h - 22})" opacity="0.8">
    <circle cx="0" cy="0" r="7" fill="${p.accent}"/>
    <circle cx="-18" cy="0" r="3.5" fill="${p.accent}"/>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// Generate All 100 Unique Tool Thumbnails
// -----------------------------------------------------------------------------
async function generateAllToolImages() {
  console.log(`🚀 Generating 100 100% Distinct, High-Impact Tool Thumbnails with Vector Icons & Huge Typography...`);
  let count = 0;

  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    const svg = generateToolSVG(tool, i);
    const targetFile = path.join(OUT_DIR, `${tool.slug}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toFile(targetFile);

    count++;
    if (count % 20 === 0 || count === tools.length) {
      console.log(`  ✓ Generated ${count}/${tools.length} tool thumbnails (${tool.slug}.jpg)`);
    }
  }

  console.log(`✨ All ${count} tool thumbnails generated successfully into ${OUT_DIR}!`);
}

generateAllToolImages().catch(console.error);
