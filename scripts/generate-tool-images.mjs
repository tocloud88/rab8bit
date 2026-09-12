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

console.log(`🚀 Generating 100 Unique Tools with 1/3 Category Pattern + 2/3 Tailored Program Graphics...`);

// ----------------------------------------------------------------------
// Category Pattern Themes (Left 1/3 Zone: x: 0 to 210)
// ----------------------------------------------------------------------
const CATEGORY_THEMES = {
  '변환/계산': {
    name: '변환/계산',
    grad: ['#064e3b', '#047857', '#022c22'],
    accent: '#34d399',
    accentLight: '#a7f3d0',
    glyphs: ['₩', '%', '+', '=', '÷', '∑'],
    patternType: 'mathGrid',
    badgeText: 'CALC & CONVERT'
  },
  '지식/정보': {
    name: '지식/정보',
    grad: ['#1e1b4b', '#2563eb', '#0f172a'],
    accent: '#38bdf8',
    accentLight: '#bae6fd',
    glyphs: ['🌐', '🔍', '✦', '📚', '💡', '⚡'],
    patternType: 'networkGrid',
    badgeText: 'KNOWLEDGE'
  },
  '게임/추첨': {
    name: '게임/추첨',
    grad: ['#4a044e', '#9333ea', '#1e0524'],
    accent: '#f43f5e',
    accentLight: '#fbcfe8',
    glyphs: ['🎯', '🎲', '🎰', '✨', '⚡', '🏆'],
    patternType: 'dotBurst',
    badgeText: 'GAME & LUCKY'
  },
  '개발자': {
    name: '개발자',
    grad: ['#082f49', '#0284c7', '#031a28'],
    accent: '#22d3ee',
    accentLight: '#cffafe',
    glyphs: ['&lt;/&gt;', '{ }', 'λ', '01', '//', '&amp;&amp;'],
    patternType: 'codeMatrix',
    badgeText: 'DEV UTILS'
  },
  '텍스트': {
    name: '텍스트',
    grad: ['#451a03', '#ea580c', '#1f0902'],
    accent: '#fbbf24',
    accentLight: '#fef08a',
    glyphs: ['Aa', '¶', '”', '✍️', '📝', '✦'],
    patternType: 'typeGrid',
    badgeText: 'TEXT STUDIO'
  },
  '이미지/미디어': {
    name: '이미지/미디어',
    grad: ['#3b0764', '#a21caf', '#1b0430'],
    accent: '#f472b6',
    accentLight: '#fce7f3',
    glyphs: ['🎨', '🖼️', '✂️', '📐', '🌈', '✦'],
    patternType: 'mediaSwatches',
    badgeText: 'MEDIA LAB'
  }
};

const DEFAULT_THEME = {
  name: '스마트도구',
  grad: ['#0f172a', '#312e81', '#090d16'],
  accent: '#818cf8',
  accentLight: '#e0e7ff',
  glyphs: ['⚡', '✦', '🛠️', '✨', '⚙️', '💡'],
  patternType: 'dotBurst',
  badgeText: 'SMART TOOL'
};

function renderLeftCategoryPattern(catName, toolIcon) {
  const theme = CATEGORY_THEMES[catName] || DEFAULT_THEME;
  const pw = 205;
  const h = 360;

  let patternSvg = '';
  if (theme.patternType === 'mathGrid') {
    patternSvg = `
      <g opacity="0.25">
        <line x1="20" y1="0" x2="20" y2="${h}" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="60" y1="0" x2="60" y2="${h}" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="100" y1="0" x2="100" y2="${h}" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="140" y1="0" x2="140" y2="${h}" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="180" y1="0" x2="180" y2="${h}" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        
        <line x1="0" y1="60" x2="${pw}" y2="60" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="0" y1="120" x2="${pw}" y2="120" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="0" y1="180" x2="${pw}" y2="180" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="0" y1="240" x2="${pw}" y2="240" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="0" y1="300" x2="${pw}" y2="300" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4"/>
      </g>
    `;
  } else if (theme.patternType === 'codeMatrix') {
    patternSvg = `
      <g opacity="0.3" font-family="monospace" font-size="11" fill="${theme.accent}">
        <text x="15" y="40">0101 1010</text>
        <text x="15" y="80">&lt;div id="app"&gt;</text>
        <text x="15" y="120">const x = 2026;</text>
        <text x="15" y="160">return fn(λ);</text>
        <text x="15" y="200">{ status: 200 }</text>
        <text x="15" y="240">npm run build</text>
        <text x="15" y="280">git push origin</text>
        <text x="15" y="320">0110 1101</text>
      </g>
    `;
  } else {
    patternSvg = `
      <g opacity="0.3">
        <circle cx="40" cy="50" r="2" fill="${theme.accent}"/>
        <circle cx="80" cy="50" r="2" fill="${theme.accent}"/>
        <circle cx="120" cy="50" r="2" fill="${theme.accent}"/>
        <circle cx="160" cy="50" r="2" fill="${theme.accent}"/>
        <circle cx="40" cy="110" r="2" fill="${theme.accent}"/>
        <circle cx="80" cy="110" r="2" fill="${theme.accent}"/>
        <circle cx="120" cy="110" r="2" fill="${theme.accent}"/>
        <circle cx="160" cy="110" r="2" fill="${theme.accent}"/>
        <circle cx="40" cy="170" r="2" fill="${theme.accent}"/>
        <circle cx="80" cy="170" r="2" fill="${theme.accent}"/>
        <circle cx="120" cy="170" r="2" fill="${theme.accent}"/>
        <circle cx="160" cy="170" r="2" fill="${theme.accent}"/>
        <circle cx="40" cy="230" r="2" fill="${theme.accent}"/>
        <circle cx="80" cy="230" r="2" fill="${theme.accent}"/>
        <circle cx="120" cy="230" r="2" fill="${theme.accent}"/>
        <circle cx="160" cy="230" r="2" fill="${theme.accent}"/>
        <circle cx="40" cy="290" r="2" fill="${theme.accent}"/>
        <circle cx="80" cy="290" r="2" fill="${theme.accent}"/>
        <circle cx="120" cy="290" r="2" fill="${theme.accent}"/>
        <circle cx="160" cy="290" r="2" fill="${theme.accent}"/>
      </g>
    `;
  }

  return `
    <!-- Left 1/3 Category Pattern Canvas -->
    <defs>
      <linearGradient id="catGrad_${catName}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${theme.grad[0]}"/>
        <stop offset="60%" stop-color="${theme.grad[1]}"/>
        <stop offset="100%" stop-color="${theme.grad[2]}"/>
      </linearGradient>
    </defs>

    <rect x="0" y="0" width="${pw}" height="${h}" fill="url(#catGrad_${catName})"/>
    ${patternSvg}

    <!-- Ambient Glow Orb inside Left Zone -->
    <circle cx="90" cy="180" r="75" fill="${theme.accent}" opacity="0.25" filter="blur(25px)"/>

    <!-- Category Floating Ambient Symbols -->
    <text x="25" y="70" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="${theme.accentLight}" opacity="0.3">${theme.glyphs[0]}</text>
    <text x="145" y="90" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="${theme.accentLight}" opacity="0.3">${theme.glyphs[1]}</text>
    <text x="35" y="300" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="${theme.accentLight}" opacity="0.3">${theme.glyphs[2]}</text>
    <text x="135" y="320" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="${theme.accentLight}" opacity="0.3">${theme.glyphs[3]}</text>

    <!-- Center Category Icon Emblem & Label -->
    <g transform="translate(100, 175)">
      <rect x="-42" y="-42" width="84" height="84" rx="22" fill="#000000" fill-opacity="0.45" stroke="${theme.accent}" stroke-width="2.5"/>
      <text x="0" y="12" text-anchor="middle" font-size="38">${toolIcon}</text>
      
      <rect x="-58" y="55" width="116" height="26" rx="13" fill="#000000" fill-opacity="0.75" stroke="${theme.accent}" stroke-width="1.5"/>
      <text x="0" y="72" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="11" font-weight="900" fill="${theme.accentLight}" letter-spacing="0.5">
        ${catName}
      </text>
    </g>

    <!-- Vertical Neon Seam Divider (Between 1/3 and 2/3) -->
    <line x1="${pw}" y1="0" x2="${pw}" y2="${h}" stroke="#000000" stroke-width="4"/>
    <line x1="${pw - 1}" y1="0" x2="${pw - 1}" y2="${h}" stroke="${theme.accent}" stroke-width="2" opacity="0.8"/>
  `;
}

// ----------------------------------------------------------------------
// Render Right 2/3 (Unique Program Illustration Zone: x: 205 to 640)
// ----------------------------------------------------------------------
function renderRightToolUniqueIllustration(tool) {
  const slug = tool.slug;
  const title = tool.title;
  const badge = tool.badge || 'PRO TOOL';
  const icon = tool.icon;
  const cx = 422;
  const cy = 180;

  // 1. Specific Bespoke Illustrators
  if (slug === 'salary-calculator') {
    return `
      <g transform="translate(${cx - 80}, ${cy + 50})">
        <ellipse cx="0" cy="0" rx="36" ry="12" fill="#ca8a04"/>
        <rect x="-36" y="-24" width="72" height="24" fill="#eab308"/>
        <ellipse cx="0" cy="-24" rx="36" ry="12" fill="#facc15"/>
        <ellipse cx="0" cy="-38" rx="36" ry="12" fill="#eab308"/>
        <rect x="-36" y="-62" width="72" height="24" fill="#facc15"/>
        <ellipse cx="0" cy="-62" rx="36" ry="12" fill="#fef08a"/>
        <text x="0" y="-58" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#a16207">₩</text>
      </g>
      <g transform="translate(${cx + 40}, ${cy - 10}) rotate(-4)">
        <rect x="-105" y="-65" width="210" height="130" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="3"/>
        <rect x="-90" y="-48" width="90" height="14" rx="4" fill="#34d399"/>
        <rect x="-90" y="-22" width="180" height="6" rx="2" fill="#334155"/>
        <rect x="-90" y="-8" width="140" height="6" rx="2" fill="#334155"/>
        <rect x="-90" y="12" width="180" height="28" rx="6" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
        <text x="-78" y="31" font-family="'Paperlogy', sans-serif" font-size="12" font-weight="900" fill="#6ee7b7">실수령액: ₩ 4,850,000</text>
      </g>
    `;
  }

  if (slug === 'stock-water') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <rect x="-170" y="-95" width="340" height="190" rx="14" fill="#090d16" stroke="#38bdf8" stroke-width="2.5"/>
        <line x1="-150" y1="-70" x2="150" y2="-70" stroke="#1e293b" stroke-width="1.5"/>
        <text x="-140" y="-76" font-family="monospace" font-size="11" fill="#38bdf8">STOCK WATERING // SIMULATOR</text>
        
        <line x1="-130" y1="40" x2="-80" y2="10" stroke="#ef4444" stroke-width="3"/>
        <line x1="-80" y1="10" x2="-20" y2="35" stroke="#ef4444" stroke-width="3"/>
        <line x1="-20" y1="35" x2="60" y2="-30" stroke="#22c55e" stroke-width="4"/>
        <line x1="60" y1="-30" x2="130" y2="-65" stroke="#22c55e" stroke-width="4"/>
        
        <g transform="translate(85, -20)">
          <rect x="-45" y="-15" width="90" height="30" rx="6" fill="#15803d" stroke="#4ade80" stroke-width="1.5"/>
          <text x="0" y="5" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="11" font-weight="900" fill="#ffffff">평단가 탈출 🚀</text>
        </g>
      </g>
    `;
  }

  if (slug === 'realtor-fee') {
    return `
      <g transform="translate(${cx - 45}, ${cy + 15})">
        <polygon points="0,-75 -65,-25 65,-25" fill="#38bdf8" stroke="#ffffff" stroke-width="3"/>
        <rect x="-55" y="-25" width="110" height="85" fill="#1e293b" stroke="#ffffff" stroke-width="3"/>
        <rect x="-18" y="15" width="36" height="45" fill="#f59e0b"/>
        <rect x="-42" y="-10" width="22" height="22" fill="#38bdf8"/>
        <rect x="20" y="-10" width="22" height="22" fill="#38bdf8"/>
      </g>
      <g transform="translate(${cx + 70}, ${cy - 15}) rotate(8)">
        <rect x="-55" y="-70" width="110" height="140" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="3"/>
        <text x="0" y="-45" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="12" font-weight="900" fill="#0369a1">부동산 계약서</text>
        <rect x="-42" y="-30" width="84" height="6" fill="#94a3b8"/>
        <rect x="-42" y="-18" width="70" height="6" fill="#94a3b8"/>
        <rect x="-42" y="-6" width="76" height="6" fill="#94a3b8"/>
        <circle cx="20" cy="35" r="18" fill="#ef4444" opacity="0.85"/>
        <text x="20" y="40" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="10" font-weight="900" fill="#ffffff">인</text>
      </g>
    `;
  }

  if (slug === 'loan-calculator') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <rect x="-130" y="-70" width="180" height="110" rx="12" fill="#1e1b4b" stroke="#818cf8" stroke-width="2.5"/>
        <rect x="-130" y="-45" width="180" height="20" fill="#0f172a"/>
        <circle cx="-95" cy="15" r="14" fill="#ef4444"/>
        <circle cx="-75" cy="15" r="14" fill="#f59e0b" opacity="0.85"/>
        <g transform="translate(60, 20) rotate(5)">
          <rect x="-60" y="-60" width="120" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="0" y="-40" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="11" font-weight="900" fill="#38bdf8">원리금 상환표</text>
          <line x1="-50" y1="-25" x2="50" y2="-25" stroke="#334155"/>
          <rect x="-45" y="-15" width="90" height="5" fill="#4ade80"/>
          <rect x="-45" y="-3" width="75" height="5" fill="#4ade80"/>
          <rect x="-45" y="9" width="85" height="5" fill="#4ade80"/>
          <rect x="-45" y="21" width="60" height="5" fill="#4ade80"/>
        </g>
      </g>
    `;
  }

  if (slug === 'freelancer-tax') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <g transform="translate(-60, 0)">
          <circle cx="0" cy="0" r="58" fill="#dc2626" stroke="#ffffff" stroke-width="4"/>
          <text x="0" y="-10" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#ffffff">원천징수</text>
          <text x="0" y="22" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="28" font-weight="900" fill="#fef08a">3.3%</text>
        </g>
        <g transform="translate(65, 0) rotate(4)">
          <rect x="-65" y="-65" width="130" height="130" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <rect x="-50" y="-45" width="60" height="12" rx="3" fill="#fbbf24"/>
          <rect x="-50" y="-20" width="100" height="6" fill="#475569"/>
          <rect x="-50" y="-8" width="80" height="6" fill="#475569"/>
          <rect x="-50" y="15" width="100" height="24" rx="4" fill="#78350f"/>
          <text x="0" y="32" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="11" font-weight="900" fill="#fef08a">세후 입금액</text>
        </g>
      </g>
    `;
  }

  if (slug === 'crypto-calc') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <g transform="translate(-65, 10)">
          <circle cx="0" cy="0" r="48" fill="#f59e0b" stroke="#fef08a" stroke-width="4"/>
          <text x="0" y="16" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="44" font-weight="900" fill="#78350f">₿</text>
        </g>
        <g transform="translate(45, -25)">
          <polygon points="0,-40 -25,-5 0,15 25,-5" fill="#818cf8"/>
          <polygon points="0,20 -25,0 0,-15 25,0" fill="#6366f1"/>
        </g>
        <g transform="translate(60, 45)">
          <rect x="-55" y="-16" width="110" height="32" rx="8" fill="#15803d" stroke="#4ade80" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#ffffff">+154.8% 🚀</text>
        </g>
      </g>
    `;
  }

  if (slug === 'savings-calc' || slug === 'windmill-savings') {
    return `
      <!-- Savings Piggy & Windmill Ladder -->
      <g transform="translate(${cx}, ${cy})">
        <g transform="translate(-60, 0)">
          <ellipse cx="0" cy="0" rx="48" ry="38" fill="#ec4899" stroke="#ffffff" stroke-width="3"/>
          <circle cx="-25" cy="-8" r="5" fill="#000000"/>
          <rect x="-10" y="-32" width="20" height="6" rx="2" fill="#be185d"/>
          <text x="5" y="8" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#ffffff">복리</text>
        </g>
        <g transform="translate(65, 0)">
          <!-- Windmill / Step Ladder -->
          <rect x="-40" y="-60" width="80" height="120" rx="8" fill="#0f172a" stroke="#facc15" stroke-width="2"/>
          <text x="0" y="-40" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="11" font-weight="900" fill="#facc15">12개월 만기</text>
          <rect x="-30" y="-20" width="60" height="10" rx="3" fill="#3b82f6"/>
          <rect x="-30" y="-5" width="60" height="10" rx="3" fill="#60a5fa"/>
          <rect x="-30" y="10" width="60" height="10" rx="3" fill="#93c5fd"/>
          <rect x="-30" y="25" width="60" height="18" rx="4" fill="#10b981"/>
          <text x="0" y="38" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="9" font-weight="900" fill="#ffffff">+ 이자 수익</text>
        </g>
      </g>
    `;
  }

  if (slug === 'youth-leap') {
    return `
      <!-- Youth Leap Account -->
      <g transform="translate(${cx}, ${cy})">
        <circle cx="-50" cy="0" r="50" fill="#047857" stroke="#34d399" stroke-width="3"/>
        <text x="-50" y="-10" text-anchor="middle" font-size="28">🌱</text>
        <text x="-50" y="20" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#ffffff">청년도약</text>
        
        <g transform="translate(60, 0)">
          <rect x="-55" y="-50" width="110" height="100" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <text x="0" y="-28" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="11" font-weight="900" fill="#f59e0b">정부기여금</text>
          <rect x="-45" y="-12" width="90" height="24" rx="4" fill="#b45309"/>
          <text x="0" y="4" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="12" font-weight="900" fill="#fef08a">매칭 지원금</text>
          <text x="0" y="36" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="10" font-weight="900" fill="#34d399">5천만원 모으기</text>
        </g>
      </g>
    `;
  }

  if (slug === 'lotto-generator') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <circle cx="-110" cy="-20" r="28" fill="#eab308" stroke="#ffffff" stroke-width="3"/>
        <text x="-110" y="-12" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="#000000">7</text>
        <circle cx="-55" cy="20" r="28" fill="#2563eb" stroke="#ffffff" stroke-width="3"/>
        <text x="-55" y="28" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="#ffffff">14</text>
        <circle cx="0" cy="-25" r="28" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
        <text x="0" y="-17" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="#ffffff">23</text>
        <circle cx="55" cy="20" r="28" fill="#64748b" stroke="#ffffff" stroke-width="3"/>
        <text x="55" y="28" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="#ffffff">32</text>
        <circle cx="110" cy="-20" r="28" fill="#16a34a" stroke="#ffffff" stroke-width="3"/>
        <text x="110" y="-12" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="#ffffff">41</text>
        <text x="0" y="65" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="15" font-weight="900" fill="#facc15">✦ 1등 당첨 번호 추출 ✦</text>
      </g>
    `;
  }

  if (slug === 'roulette' || slug === 'party-penalty') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="75" fill="#0f172a" stroke="#facc15" stroke-width="6"/>
        <path d="M 0 0 L 0 -75 A 75 75 0 0 1 65 -37 Z" fill="#ef4444"/>
        <path d="M 0 0 L 65 -37 A 75 75 0 0 1 65 37 Z" fill="#3b82f6"/>
        <path d="M 0 0 L 65 37 A 75 75 0 0 1 0 75 Z" fill="#10b981"/>
        <path d="M 0 0 L 0 75 A 75 75 0 0 1 -65 37 Z" fill="#f59e0b"/>
        <path d="M 0 0 L -65 37 A 75 75 0 0 1 -65 -37 Z" fill="#8b5cf6"/>
        <path d="M 0 0 L -65 -37 A 75 75 0 0 1 0 -75 Z" fill="#ec4899"/>
        <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#000000" stroke-width="3"/>
        <polygon points="0,-85 -12,-65 12,-65" fill="#facc15" stroke="#000000" stroke-width="2"/>
      </g>
    `;
  }

  if (slug === 'ladder-game' || slug === 'ladder') {
    return `
      <!-- Ghost Leg Ladder -->
      <g transform="translate(${cx}, ${cy})">
        <line x1="-90" y1="-70" x2="-90" y2="70" stroke="#38bdf8" stroke-width="4"/>
        <line x1="-30" y1="-70" x2="-30" y2="70" stroke="#38bdf8" stroke-width="4"/>
        <line x1="30" y1="-70" x2="30" y2="70" stroke="#38bdf8" stroke-width="4"/>
        <line x1="90" y1="-70" x2="90" y2="70" stroke="#38bdf8" stroke-width="4"/>
        <!-- Rungs -->
        <line x1="-90" y1="-40" x2="-30" y2="-40" stroke="#facc15" stroke-width="4"/>
        <line x1="-30" y1="-10" x2="30" y2="-10" stroke="#facc15" stroke-width="4"/>
        <line x1="30" y1="20" x2="90" y2="20" stroke="#facc15" stroke-width="4"/>
        <line x1="-90" y1="45" x2="-30" y2="45" stroke="#facc15" stroke-width="4"/>
        <!-- Winner Marker -->
        <circle cx="30" cy="75" r="10" fill="#22c55e"/>
        <text x="30" y="79" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="9" font-weight="900" fill="#ffffff">당첨</text>
      </g>
    `;
  }

  if (slug === 'dice-roller') {
    return `
      <!-- 3D Rolling Dice -->
      <g transform="translate(${cx}, ${cy})">
        <g transform="translate(-45, 0) rotate(12)">
          <rect x="-40" y="-40" width="80" height="80" rx="14" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
          <circle cx="0" cy="0" r="10" fill="#ffffff"/>
        </g>
        <g transform="translate(50, -10) rotate(-15)">
          <rect x="-40" y="-40" width="80" height="80" rx="14" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
          <circle cx="-20" cy="-20" r="7" fill="#dc2626"/>
          <circle cx="20" cy="-20" r="7" fill="#000000"/>
          <circle cx="-20" cy="20" r="7" fill="#000000"/>
          <circle cx="20" cy="20" r="7" fill="#dc2626"/>
          <circle cx="0" cy="0" r="7" fill="#000000"/>
        </g>
      </g>
    `;
  }

  if (slug === 'json-formatter') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <rect x="-160" y="-85" width="320" height="170" rx="12" fill="#0b0f19" stroke="#38bdf8" stroke-width="2.5"/>
        <line x1="-160" y1="-55" x2="160" y2="-55" stroke="#1e293b" stroke-width="1.5"/>
        <circle cx="-140" cy="-70" r="4" fill="#ef4444"/>
        <circle cx="-128" cy="-70" r="4" fill="#facc15"/>
        <circle cx="-116" cy="-70" r="4" fill="#22c55e"/>
        <text x="0" y="-66" text-anchor="middle" font-family="monospace" font-size="10" fill="#94a3b8">payload.json (Formatted)</text>
        <g font-family="monospace" font-size="12" xml:space="preserve">
          <text x="-140" y="-30" fill="#f43f5e">{</text>
          <text x="-120" y="-10" fill="#38bdf8">"status"<tspan fill="#ffffff">: </tspan><tspan fill="#4ade80">"success"</tspan><tspan fill="#ffffff">,</tspan></text>
          <text x="-120" y="10" fill="#38bdf8">"code"<tspan fill="#ffffff">: </tspan><tspan fill="#fbbf24">200</tspan><tspan fill="#ffffff">,</tspan></text>
          <text x="-120" y="30" fill="#38bdf8">"data"<tspan fill="#ffffff">: [ </tspan><tspan fill="#a855f7">{ "id": 1 } </tspan><tspan fill="#ffffff">]</tspan></text>
          <text x="-140" y="50" fill="#f43f5e">}</text>
        </g>
      </g>
    `;
  }

  if (slug === 'jwt-decoder') {
    return `
      <!-- JWT Token 3-Part Inspector -->
      <g transform="translate(${cx}, ${cy})">
        <rect x="-160" y="-85" width="320" height="170" rx="12" fill="#0b0f19" stroke="#ec4899" stroke-width="2.5"/>
        <text x="0" y="-60" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="12" font-weight="900" fill="#f472b6">JWT TOKEN DECODER</text>
        <rect x="-140" y="-45" width="80" height="30" rx="6" fill="#ef4444"/>
        <text x="-100" y="-25" text-anchor="middle" font-family="monospace" font-size="11" font-weight="900" fill="#ffffff">HEADER</text>
        <rect x="-50" y="-45" width="100" height="30" rx="6" fill="#a855f7"/>
        <text x="0" y="-25" text-anchor="middle" font-family="monospace" font-size="11" font-weight="900" fill="#ffffff">PAYLOAD</text>
        <rect x="60" y="-45" width="80" height="30" rx="6" fill="#38bdf8"/>
        <text x="100" y="-25" text-anchor="middle" font-family="monospace" font-size="11" font-weight="900" fill="#ffffff">VERIFY</text>
        
        <rect x="-140" y="0" width="280" height="60" rx="6" fill="#1e293b"/>
        <text x="-120" y="24" font-family="monospace" font-size="11" fill="#4ade80">sub: "user_2026"</text>
        <text x="-120" y="44" font-family="monospace" font-size="11" fill="#38bdf8">role: "admin", exp: 1789200</text>
      </g>
    `;
  }

  if (slug === 'qr-code') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <rect x="-80" y="-80" width="160" height="160" rx="14" fill="#ffffff" stroke="#38bdf8" stroke-width="4"/>
        <rect x="-65" y="-65" width="40" height="40" fill="#000000"/>
        <rect x="-55" y="-55" width="20" height="20" fill="#ffffff"/>
        <rect x="-47" y="-47" width="4" height="4" fill="#000000"/>
        
        <rect x="25" y="-65" width="40" height="40" fill="#000000"/>
        <rect x="35" y="-55" width="20" height="20" fill="#ffffff"/>
        <rect x="43" y="-47" width="4" height="4" fill="#000000"/>
        
        <rect x="-65" y="25" width="40" height="40" fill="#000000"/>
        <rect x="-55" y="35" width="20" height="20" fill="#ffffff"/>
        <rect x="-47" y="43" width="4" height="4" fill="#000000"/>
        
        <rect x="-10" y="-60" width="10" height="10" fill="#000000"/>
        <rect x="5" y="-40" width="12" height="8" fill="#000000"/>
        <rect x="-20" y="-10" width="40" height="20" fill="#000000"/>
        <rect x="-5" y="30" width="18" height="18" fill="#000000"/>
        <rect x="30" y="20" width="15" height="15" fill="#000000"/>
        <rect x="40" y="45" width="12" height="12" fill="#000000"/>

        <line x1="-95" y1="0" x2="95" y2="0" stroke="#ef4444" stroke-width="3"/>
        <circle cx="0" cy="0" r="3" fill="#ef4444" filter="blur(2px)"/>
      </g>
    `;
  }

  if (slug === 'barcode-generator') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <rect x="-130" y="-70" width="260" height="140" rx="10" fill="#ffffff" stroke="#334155" stroke-width="3"/>
        <g fill="#000000">
          <rect x="-105" y="-50" width="6" height="80"/>
          <rect x="-93" y="-50" width="3" height="80"/>
          <rect x="-84" y="-50" width="9" height="80"/>
          <rect x="-69" y="-50" width="4" height="80"/>
          <rect x="-59" y="-50" width="12" height="80"/>
          <rect x="-41" y="-50" width="5" height="80"/>
          <rect x="-30" y="-50" width="8" height="80"/>
          <rect x="-16" y="-50" width="4" height="80"/>
          <rect x="-6" y="-50" width="10" height="80"/>
          <rect x="10" y="-50" width="4" height="80"/>
          <rect x="20" y="-50" width="8" height="80"/>
          <rect x="34" y="-50" width="14" height="80"/>
          <rect x="54" y="-50" width="4" height="80"/>
          <rect x="64" y="-50" width="10" height="80"/>
          <rect x="80" y="-50" width="6" height="80"/>
          <rect x="92" y="-50" width="4" height="80"/>
          <rect x="102" y="-50" width="6" height="80"/>
        </g>
        <text x="0" y="52" text-anchor="middle" font-family="monospace" font-size="14" font-weight="900" fill="#000000">8 801234 567893</text>
        <line x1="-140" y1="-10" x2="140" y2="-10" stroke="#ef4444" stroke-width="2.5"/>
      </g>
    `;
  }

  if (slug === 'color-palette' || slug === 'css-gradient') {
    return `
      <!-- Color Palette Swatches -->
      <g transform="translate(${cx}, ${cy})">
        <g transform="translate(-100, 0)">
          <rect x="-22" y="-60" width="44" height="120" rx="10" fill="#6366f1" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="45" text-anchor="middle" font-family="monospace" font-size="8" fill="#ffffff">#6366F1</text>
        </g>
        <g transform="translate(-50, 0)">
          <rect x="-22" y="-60" width="44" height="120" rx="10" fill="#ec4899" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="45" text-anchor="middle" font-family="monospace" font-size="8" fill="#ffffff">#EC4899</text>
        </g>
        <g transform="translate(0, 0)">
          <rect x="-22" y="-60" width="44" height="120" rx="10" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="45" text-anchor="middle" font-family="monospace" font-size="8" fill="#000000">#F59E0B</text>
        </g>
        <g transform="translate(50, 0)">
          <rect x="-22" y="-60" width="44" height="120" rx="10" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="45" text-anchor="middle" font-family="monospace" font-size="8" fill="#ffffff">#10B981</text>
        </g>
        <g transform="translate(100, 0)">
          <rect x="-22" y="-60" width="44" height="120" rx="10" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="45" text-anchor="middle" font-family="monospace" font-size="8" fill="#000000">#38BDF8</text>
        </g>
      </g>
    `;
  }

  // 2. Generic Tailored Dynamic Graphic for all other tools
  const hashSeed = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorAccents = [
    { border: '#38bdf8', bg: '#0369a1', glow: '#0ea5e9' },
    { border: '#f59e0b', bg: '#b45309', glow: '#f59e0b' },
    { border: '#a855f7', bg: '#7e22ce', glow: '#a855f7' },
    { border: '#10b981', bg: '#047857', glow: '#10b981' },
    { border: '#f43f5e', bg: '#be123c', glow: '#f43f5e' },
    { border: '#06b6d4', bg: '#0e7490', glow: '#06b6d4' }
  ];
  const col = colorAccents[hashSeed % colorAccents.length];

  return `
    <!-- Dedicated Tool Stage Card -->
    <g transform="translate(${cx}, ${cy})">
      <rect x="-160" y="-90" width="320" height="180" rx="16" fill="#0b1120" stroke="${col.border}" stroke-width="2.5"/>
      <circle cx="0" cy="0" r="60" fill="${col.glow}" opacity="0.18" filter="blur(20px)"/>
      
      <!-- Top Program Title Banner inside Screen -->
      <rect x="-140" y="-72" width="280" height="28" rx="6" fill="#000000" fill-opacity="0.6"/>
      <text x="0" y="-53" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="13" font-weight="900" fill="#ffffff" letter-spacing="0.5">
        ${escapeXml(title)}
      </text>

      <!-- Center Hero 3D Icon Stage -->
      <g transform="translate(0, 10)">
        <circle cx="0" cy="0" r="42" fill="#000000" fill-opacity="0.7" stroke="${col.border}" stroke-width="2"/>
        <text x="0" y="14" text-anchor="middle" font-size="44">${icon}</text>
      </g>

      <!-- Bottom Status Pill -->
      <g transform="translate(0, 64)">
        <rect x="-60" y="-12" width="120" height="24" rx="12" fill="${col.bg}" stroke="#ffffff" stroke-width="1.5"/>
        <text x="0" y="4" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="11" font-weight="900" fill="#ffffff">
          ⚡ ${escapeXml(badge)}
        </text>
      </g>
    </g>
  `;
}

// ----------------------------------------------------------------------
// Master Tool Image SVG Assembler (1/3 Category Pattern + 2/3 Unique Illustration)
// ----------------------------------------------------------------------
function generateMasterToolSvg(tool) {
  const w = 640;
  const h = 360;

  const leftCategoryPattern = renderLeftCategoryPattern(tool.category, tool.icon);
  const rightToolIllustration = renderRightToolUniqueIllustration(tool);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <!-- Dark Studio Base Background -->
    <rect width="${w}" height="${h}" fill="#080c14"/>

    <!-- Left 1/3: Category Pattern Canvas -->
    ${leftCategoryPattern}

    <!-- Right 2/3: Unique Program Graphic Canvas -->
    <g transform="translate(0, 0)">
      ${rightToolIllustration}
    </g>

    <!-- Top-Right Badge Overlay if present -->
    ${tool.badge ? `
      <g transform="translate(${w - 20}, 24)">
        <rect x="-70" y="-12" width="70" height="24" rx="12" fill="#ea580c" stroke="#ffffff" stroke-width="1.5"/>
        <text x="-35" y="4" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="10" font-weight="900" fill="#ffffff">
          ${escapeXml(tool.badge)}
        </text>
      </g>
    ` : ''}

    <!-- Subtle Outer Border -->
    <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="#334155" stroke-width="2"/>
  </svg>`;
}

// Generate all 100 images
async function generateAllToolImages() {
  let count = 0;
  for (const tool of tools) {
    const svg = generateMasterToolSvg(tool);
    const targetFile = path.join(OUT_DIR, `${tool.slug}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 92 })
      .toFile(targetFile);

    count++;
  }
  console.log(`✅ Successfully generated ${count} 1/3 Category + 2/3 Unique Tool Images in ${OUT_DIR}`);
}

generateAllToolImages().catch(console.error);
