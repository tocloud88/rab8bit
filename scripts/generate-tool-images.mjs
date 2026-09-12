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
// Curated 2-Line High-Impact Titles for all 100 Tools
// -----------------------------------------------------------------------------
function parseToolVisualData(tool, index) {
  const slug = tool.slug || '';
  const rawTitle = (tool.title || '').replace(/계산기/g, '').replace(/생성기/g, '').trim();
  
  let title1 = '';
  let title2 = '';

  if (slug === 'salary-calculator') {
    title1 = '2026 연봉';
    title2 = '실수령액';
  } else if (slug === 'stock-water') {
    title1 = '주식';
    title2 = '물타기 평단가';
  } else if (slug === 'realtor-fee') {
    title1 = '부동산';
    title2 = '중개보수(복비)';
  } else if (slug === 'loan-calculator') {
    title1 = '대출';
    title2 = '이자 상환';
  } else if (slug === 'freelancer-tax') {
    title1 = '3.3% 프리랜서';
    title2 = '사업소득세';
  } else if (slug === 'crypto-calc') {
    title1 = '코인·가상자산';
    title2 = '수익률 계산';
  } else if (slug === 'lotto-generator') {
    title1 = '로또 6/45';
    title2 = '행운 번호추첨';
  } else if (slug === 'ladder' || slug === 'ladder-game') {
    title1 = '사다리타기';
    title2 = '벌칙 랜덤추첨';
  } else if (slug === 'qr-code') {
    title1 = '고화질 QR';
    title2 = '코드 생성기';
  } else if (slug === 'barcode-generator') {
    title1 = '바코드';
    title2 = '원클릭 생성기';
  } else if (slug === 'password-generator') {
    title1 = '안전한 비밀번호';
    title2 = '강력 암호생성';
  } else if (slug === 'mbti-match') {
    title1 = 'MBTI 성격';
    title2 = '16유형 궁합';
  } else if (slug === 'pomodoro-timer') {
    title1 = '포모도로';
    title2 = '25분 집중타이머';
  } else if (slug === 'bmi-calculator') {
    title1 = 'BMI 비만도';
    title2 = '표준체중 계산';
  } else if (slug === 'caffeine-calc') {
    title1 = '체내 카페인';
    title2 = '반감기 분석';
  } else if (slug === 'alcohol-breakdown') {
    title1 = '알코올 분해';
    title2 = '숙취해소 시간';
  } else if (slug === 'tarot-today') {
    title1 = '오늘의 타로';
    title2 = '22장 운세카드';
  } else if (slug === 'lunch-roulette' || slug === 'roulette') {
    title1 = '점심·야식';
    title2 = '룰렛 메뉴추첨';
  } else if (slug === 'severance-pay') {
    title1 = '근로기준법';
    title2 = '퇴직금 계산';
  } else if (slug === 'annual-leave-pay') {
    title1 = '통상임금';
    title2 = '연차수당 계산';
  } else if (slug === 'weekly-holiday-pay') {
    title1 = '알바·직장인';
    title2 = '주휴수당 계산';
  } else if (slug === 'comprehensive-tax') {
    title1 = '종합소득세';
    title2 = '8단계 누진세율';
  } else if (slug === 'bonus-tax') {
    title1 = '성과급·상여금';
    title2 = '세후 실수령액';
  } else if (slug === 'dday-calculator') {
    title1 = 'D-Day 디데이';
    title2 = '기념일 계산기';
  } else if (slug === 'json-formatter') {
    title1 = 'JSON';
    title2 = '포맷터·검증기';
  } else if (slug === 'jwt-decoder') {
    title1 = 'JWT 토큰';
    title2 = '페이로드 디코더';
  } else if (slug === 'unit-converter') {
    title1 = '단위 변환';
    title2 = '길이·무게·넓이';
  } else if (slug === 'pyeong-converter') {
    title1 = '아파트 평수';
    title2 = '㎡ 단위변환기';
  } else {
    const words = rawTitle.split(/[ &+,/·]/).filter(w => w.trim().length > 0);
    title1 = words[0] || '스마트';
    title2 = words.slice(1).join(' ') || (tool.title.includes('계산기') ? '계산기' : '도구');

    if (title1.length > 6) {
      title2 = title1.slice(5) + ' ' + title2;
      title1 = title1.slice(0, 5);
    }
    if (title2.length > 9) {
      title2 = title2.slice(0, 9);
    }
  }

  // Pick palette by hash + index to ensure adjacent tools have contrasting colors
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const paletteIdx = (hash + index * 3) % PALETTES.length;
  const p = PALETTES[paletteIdx];

  return {
    title1: escapeXml(title1),
    title2: escapeXml(title2),
    palette: p
  };
}

// Dynamic Font Size helper for Title
function getTitleFontSizes(t1, t2) {
  let s1 = 66;
  if (t1.length <= 2) s1 = 76;
  else if (t1.length <= 4) s1 = 68;
  else if (t1.length <= 6) s1 = 58;
  else s1 = 50;

  let s2 = 58;
  if (t2.length <= 4) s2 = 64;
  else if (t2.length <= 6) s2 = 56;
  else if (t2.length <= 8) s2 = 48;
  else s2 = 42;

  return { s1, s2 };
}

// -----------------------------------------------------------------------------
// SVG Card Generator for 640x360 Tool Thumbnail (Maximized Icon & Giant Typography)
// -----------------------------------------------------------------------------
function generateToolSVG(tool, index) {
  const w = 640;
  const h = 360;
  const { title1, title2, palette: p } = parseToolVisualData(tool, index);
  const category = escapeXml(tool.category || '변환/계산');
  const badge = escapeXml(tool.badge || '스마트');
  const iconSVG = getVectorIconSVG(tool.slug, p.iconFill);
  const { s1, s2 } = getTitleFontSizes(title1, title2);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad_${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${p.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${p.bgGrad[2]}"/>
    </linearGradient>

    <!-- Icon Container Gradient (Vibrant, luminous) -->
    <linearGradient id="iconContainerGrad_${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.accentDark}"/>
      <stop offset="60%" stop-color="${p.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${p.bgGrad[0]}"/>
    </linearGradient>

    <!-- Radial Glow for Icon -->
    <radialGradient id="iconRadialGlow_${index}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.glowColor}" stop-opacity="0.65"/>
      <stop offset="60%" stop-color="${p.glowColor}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Heavy Drop Shadow Filter for Giant Typography & Icon -->
    <filter id="megaShadow_${index}" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.95"/>
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- 1. Rich Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#bgGrad_${index})"/>

  <!-- 2. High-Tech Background Decorative Grid & Glow -->
  <circle cx="120" cy="205" r="160" fill="url(#iconRadialGlow_${index})"/>
  <g opacity="0.16">
    <circle cx="${w - 60}" cy="80" r="200" fill="none" stroke="${p.accent}" stroke-width="2.5" stroke-dasharray="12,8"/>
    <circle cx="${w - 60}" cy="80" r="130" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
    <line x1="0" y1="78" x2="${w}" y2="78" stroke="${p.accent}" stroke-width="1.5" stroke-dasharray="6,6"/>
    <line x1="0" y1="315" x2="${w}" y2="315" stroke="${p.accent}" stroke-width="1.5" stroke-dasharray="6,6"/>
  </g>

  <!-- 3. Top Header: Category Pill (Left) & Badge (Right) -->
  <!-- Top-Left Category Pill -->
  <g transform="translate(36, 46)" filter="url(#megaShadow_${index})">
    <rect x="0" y="-18" width="135" height="36" rx="18" fill="#000000" fill-opacity="0.85" stroke="${p.accent}" stroke-width="2.2"/>
    <text x="67" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="${p.accentLight}" letter-spacing="0.5">
      ${category}
    </text>
  </g>

  <!-- Top-Right Highlight Badge -->
  <g transform="translate(${w - 95}, 46)" filter="url(#megaShadow_${index})">
    <rect x="-55" y="-18" width="110" height="36" rx="18" fill="${p.badgeBg}" stroke="#ffffff" stroke-width="2.2"/>
    <text x="0" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="${p.badgeText}">
      ${badge}
    </text>
  </g>

  <!-- 4. Left Zone: High-Visibility Glowing Vector Icon Emblem (156x156px) -->
  <g transform="translate(118, 210)" filter="url(#megaShadow_${index})">
    <!-- Outer Glowing Squircle Base -->
    <rect x="-78" y="-78" width="156" height="156" rx="42" fill="url(#iconContainerGrad_${index})" stroke="${p.accent}" stroke-width="4.5"/>
    <!-- Inner Glass Ring -->
    <rect x="-70" y="-70" width="140" height="140" rx="36" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.4"/>
    
    <!-- Crisp Scaled Vector Icon (86x86 equivalent) -->
    <g transform="translate(-43, -43) scale(1.35)">
      ${iconSVG}
    </g>
  </g>

  <!-- 5. Right Zone: GIGANTIC 2-Line Typography (Maximizing Canvas Height) -->
  <g transform="translate(225, 130)" filter="url(#megaShadow_${index})">
    <!-- Line 1: Pure Solid White Hero Title -->
    <text x="0" y="${s1}" font-family="${FONT_FAMILY}" font-size="${s1}" font-weight="900" fill="#ffffff" letter-spacing="-1.5">
      ${title1}
    </text>

    <!-- Line 2: Vibrant High-Luminance Neon Title -->
    <text x="0" y="${s1 + s2 + 16}" font-family="${FONT_FAMILY}" font-size="${s2}" font-weight="900" fill="${p.title2Color}" letter-spacing="-1.2">
      ${title2}
    </text>
  </g>

  <!-- Bottom Right Mini Decorative Neon Emblem -->
  <g transform="translate(${w - 28}, ${h - 20})" opacity="0.8">
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
