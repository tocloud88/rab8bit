import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const TEST_DIR = path.join(ROOT_DIR, 'public/images/test-tech');

if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const PALETTES = [
  // #001 Crimson Red (Surtr / High-Impact Flame Red)
  {
    id: '001',
    code: 'SURT',
    fullCode: 'SURTR',
    name: 'Surtr',
    specType: 'FINANCE // 01',
    gender: 'AI CORE',
    race: 'ALGORITHM',
    title: '연봉 실수령액 계산기',
    sub: '2026 최신 4대보험 및 공제율 완벽 반영',
    category: 'FINANCE // CALC',
    themeColor: '#D32F2F',
    bgColor: '#16080A',
    bgGradStart: '#B71C1C',
    bgGradEnd: '#3B090F',
    textColor: '#FF4D4D',
    accent: '#FF5252',
    iconGraphic: `
      <!-- 3D Gold Money Chest / Vault & Coin Stack -->
      <g transform="translate(40, 20)">
        <!-- Back Aura -->
        <circle cx="160" cy="160" r="140" fill="#FF5252" fill-opacity="0.25" filter="url(#neonGlow_001)"/>
        
        <!-- Tech Pedestal -->
        <ellipse cx="160" cy="270" rx="150" ry="36" fill="#000000" fill-opacity="0.6"/>
        <ellipse cx="160" cy="270" rx="140" ry="30" fill="none" stroke="#FF5252" stroke-width="2.5"/>

        <!-- 3D Vault / Safe Box -->
        <rect x="70" y="90" width="180" height="150" rx="18" fill="#1E070A" stroke="#FF5252" stroke-width="4"/>
        <rect x="85" y="105" width="150" height="120" rx="12" fill="#2D0B10" stroke="#FF8A80" stroke-width="2"/>
        
        <!-- Vault Dial -->
        <circle cx="160" cy="165" r="42" fill="#150406" stroke="#FFD700" stroke-width="5"/>
        <circle cx="160" cy="165" r="28" fill="#FFD700"/>
        <line x1="160" y1="135" x2="160" y2="150" stroke="#150406" stroke-width="4"/>
        <line x1="160" y1="180" x2="160" y2="195" stroke="#150406" stroke-width="4"/>
        <line x1="130" y1="165" x2="145" y2="165" stroke="#150406" stroke-width="4"/>
        <line x1="175" y1="165" x2="190" y2="165" stroke="#150406" stroke-width="4"/>

        <!-- Floating Gold Coins -->
        <ellipse cx="60" cy="210" rx="28" ry="16" fill="#FFD700" stroke="#FFA000" stroke-width="3"/>
        <ellipse cx="60" cy="195" rx="28" ry="16" fill="#FFE082" stroke="#FFA000" stroke-width="3"/>
        <text x="60" y="200" font-family="'Impact', sans-serif" font-size="16" font-weight="900" fill="#E65100" text-anchor="middle">₩</text>

        <ellipse cx="260" cy="220" rx="32" ry="18" fill="#FFD700" stroke="#FFA000" stroke-width="3"/>
        <ellipse cx="260" cy="202" rx="32" ry="18" fill="#FFE082" stroke="#FFA000" stroke-width="3"/>
        <text x="260" y="208" font-family="'Impact', sans-serif" font-size="18" font-weight="900" fill="#E65100" text-anchor="middle">₩</text>
      </g>
    `,
    bgSilhouetteGraphic: `
      <!-- Ghost Holographic Weapon / Diagonal Energy Spear -->
      <g transform="rotate(-25 150 150)">
        <polygon points="150,0 170,120 155,380 145,380 130,120" fill="#FF5252" fill-opacity="0.35"/>
        <line x1="150" y1="-40" x2="150" y2="420" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="12,8"/>
        <circle cx="150" cy="120" r="60" fill="none" stroke="#FF5252" stroke-width="3"/>
        <circle cx="150" cy="120" r="90" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="8,6"/>
      </g>
    `
  },
  // #002 Tech Slate Navy (Doctor / Tactical Cyber)
  {
    id: '002',
    code: 'DOCT',
    fullCode: 'DOCTOR',
    name: 'Doctor',
    specType: 'INVEST // 02',
    gender: 'TACTICAL',
    race: 'OPERATOR',
    title: '주식 물타기 & 평단가 분석',
    sub: '추가 매수 단가 및 손익분기 탈출 시뮬레이션',
    category: 'INVEST // STOCK',
    themeColor: '#4A6572',
    bgColor: '#0C1217',
    bgGradStart: '#2A3C46',
    bgGradEnd: '#131B22',
    textColor: '#8BA1AD',
    accent: '#00E5FF',
    iconGraphic: `
      <!-- 3D Candlestick Hologram & Target Radar -->
      <g transform="translate(40, 20)">
        <!-- Back Cyan Aura -->
        <circle cx="160" cy="160" r="140" fill="#00E5FF" fill-opacity="0.22" filter="url(#neonGlow_002)"/>

        <!-- Tech Pedestal -->
        <ellipse cx="160" cy="270" rx="150" ry="36" fill="#000000" fill-opacity="0.6"/>
        <ellipse cx="160" cy="270" rx="140" ry="30" fill="none" stroke="#00E5FF" stroke-width="2.5"/>

        <!-- Candlestick Bars -->
        <!-- Bar 1 (Red Up) -->
        <line x1="90" y1="120" x2="90" y2="240" stroke="#FF5252" stroke-width="3"/>
        <rect x="76" y="140" width="28" height="70" rx="4" fill="#FF5252" stroke="#FF8A80" stroke-width="2"/>

        <!-- Bar 2 (Green/Cyan Surge) -->
        <line x1="145" y1="80" x2="145" y2="230" stroke="#00E5FF" stroke-width="3"/>
        <rect x="130" y="100" width="30" height="100" rx="4" fill="#00E5FF" stroke="#E0F7FA" stroke-width="2"/>

        <!-- Bar 3 (Super Surge Breakout) -->
        <line x1="205" y1="50" x2="205" y2="210" stroke="#00E5FF" stroke-width="4"/>
        <rect x="188" y="70" width="34" height="110" rx="4" fill="#00B0FF" stroke="#FFFFFF" stroke-width="2.5"/>

        <!-- Trendline Arrow -->
        <polyline points="70,210 130,160 190,110 250,55" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
        <polygon points="250,55 230,60 245,75" fill="#FFFFFF"/>
      </g>
    `,
    bgSilhouetteGraphic: `
      <!-- Ghost Holographic Tactical HUD Grid -->
      <g transform="translate(0, 0)">
        <circle cx="160" cy="160" r="150" fill="none" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="10,8"/>
        <circle cx="160" cy="160" r="100" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="160" y1="0" x2="160" y2="320" stroke="#00E5FF" stroke-width="1.5"/>
        <line x1="0" y1="160" x2="320" y2="160" stroke="#00E5FF" stroke-width="1.5"/>
      </g>
    `
  },
  // #003 Acid Lime (Kal'tsit / Cybernetic Medical)
  {
    id: '003',
    code: 'KALT',
    fullCode: 'KALTSIT',
    name: "Kal'tsit",
    specType: 'CRYPTO // 03',
    gender: 'EXPERT',
    race: 'FELINE',
    title: '코인 가상자산 수익률 계산',
    sub: '거래소 수수료 및 레버리지 청산가 정밀 계산',
    category: 'CRYPTO // MATRIX',
    themeColor: '#C6FF00',
    bgColor: '#101604',
    bgGradStart: '#7CB342',
    bgGradEnd: '#253508',
    textColor: '#CCFF00',
    accent: '#CCFF00',
    iconGraphic: `
      <!-- 3D Cyber Crystal / Monolith & Lightning Core -->
      <g transform="translate(40, 20)">
        <!-- Back Lime Aura -->
        <circle cx="160" cy="160" r="140" fill="#CCFF00" fill-opacity="0.25" filter="url(#neonGlow_003)"/>

        <!-- Tech Pedestal -->
        <ellipse cx="160" cy="270" rx="150" ry="36" fill="#000000" fill-opacity="0.6"/>
        <ellipse cx="160" cy="270" rx="140" ry="30" fill="none" stroke="#CCFF00" stroke-width="2.5"/>

        <!-- Floating Octahedron Cyber Crystal (Monolith) -->
        <polygon points="160,40 230,150 160,240 90,150" fill="#1E2A05" stroke="#CCFF00" stroke-width="4"/>
        <polygon points="160,40 160,240 230,150" fill="#2E4008" stroke="#CCFF00" stroke-width="2"/>
        <polygon points="160,40 160,240 90,150" fill="#445E0B" stroke="#EEFF41" stroke-width="2"/>

        <!-- Lightning Spark Overlay -->
        <path d="M 165 70 L 140 140 L 175 140 L 150 210" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Orbital Tech Rings -->
        <ellipse cx="160" cy="150" rx="110" ry="40" fill="none" stroke="#EEFF41" stroke-width="2" stroke-dasharray="14,10" transform="rotate(-20 160 150)"/>
      </g>
    `,
    bgSilhouetteGraphic: `
      <!-- Ghost Holographic Summoning Spine / Structure -->
      <g transform="rotate(15 150 150)">
        <path d="M 150 20 Q 220 150 150 280 Q 80 150 150 20" fill="#CCFF00" fill-opacity="0.25"/>
        <circle cx="150" cy="150" r="110" fill="none" stroke="#CCFF00" stroke-width="2" stroke-dasharray="16,8"/>
      </g>
    `
  },
  // #004 Electric Purple (Vibe Coding / AI Agent)
  {
    id: '004',
    code: 'VIBE',
    fullCode: 'VIBECODE',
    name: 'Vibe Agent',
    specType: 'AI // 04',
    gender: 'SYNTHETIC',
    race: 'NEURAL',
    title: 'AI 바이브 코딩 솔루션',
    sub: '1인 창업 풀스택 개발 워크플로우 자동화',
    category: 'SYSTEM // AGENT',
    themeColor: '#AB47BC',
    bgColor: '#13081A',
    bgGradStart: '#7B1FA2',
    bgGradEnd: '#2D0D3F',
    textColor: '#CE93D8',
    accent: '#E040FB',
    iconGraphic: `
      <!-- 3D Neural AI Core & Hologram Rings -->
      <g transform="translate(40, 20)">
        <!-- Back Purple Aura -->
        <circle cx="160" cy="160" r="140" fill="#E040FB" fill-opacity="0.25" filter="url(#neonGlow_004)"/>

        <!-- Tech Pedestal -->
        <ellipse cx="160" cy="270" rx="150" ry="36" fill="#000000" fill-opacity="0.6"/>
        <ellipse cx="160" cy="270" rx="140" ry="30" fill="none" stroke="#E040FB" stroke-width="2.5"/>

        <!-- Central Cyber Brain Core -->
        <circle cx="160" cy="150" r="65" fill="#240A33" stroke="#E040FB" stroke-width="4"/>
        <circle cx="160" cy="150" r="45" fill="#4A148C" stroke="#EA80FC" stroke-width="2"/>
        
        <!-- Neural Nodes -->
        <circle cx="135" cy="135" r="8" fill="#FFFFFF"/>
        <circle cx="185" cy="135" r="8" fill="#FFFFFF"/>
        <circle cx="160" cy="175" r="8" fill="#FFFFFF"/>
        <line x1="135" y1="135" x2="185" y2="135" stroke="#FFFFFF" stroke-width="2.5"/>
        <line x1="135" y1="135" x2="160" y2="175" stroke="#FFFFFF" stroke-width="2.5"/>
        <line x1="185" y1="135" x2="160" y2="175" stroke="#FFFFFF" stroke-width="2.5"/>

        <!-- Orbital Rings -->
        <ellipse cx="160" cy="150" rx="110" ry="40" fill="none" stroke="#EA80FC" stroke-width="2" stroke-dasharray="12,8" transform="rotate(-30 160 150)"/>
        <ellipse cx="160" cy="150" rx="110" ry="40" fill="none" stroke="#E040FB" stroke-width="2" stroke-dasharray="12,8" transform="rotate(30 160 150)"/>
      </g>
    `,
    bgSilhouetteGraphic: `
      <!-- Ghost Code Matrix Wireframe -->
      <g transform="translate(20, 20)">
        <rect width="260" height="180" rx="12" fill="none" stroke="#E040FB" stroke-width="2" stroke-dasharray="10,6"/>
        <line x1="20" y1="40" x2="200" y2="40" stroke="#E040FB" stroke-width="4"/>
        <line x1="20" y1="70" x2="150" y2="70" stroke="#E040FB" stroke-width="4"/>
        <line x1="20" y1="100" x2="220" y2="100" stroke="#E040FB" stroke-width="4"/>
      </g>
    `
  },
  // #005 Cyber Gold / Amber (Lotto / RNG / Lucky Gold)
  {
    id: '005',
    code: 'LOTT',
    fullCode: 'LOTTOPICK',
    name: 'Lotto Core',
    specType: 'RNG // 05',
    gender: 'ALGORITHM',
    race: 'PROBABILITY',
    title: '로또 6/45 행운번호 추출기',
    sub: '최근 당첨 통계 및 알고리즘 기반 난수 생성',
    category: 'ALGORITHM // RNG',
    themeColor: '#FFB300',
    bgColor: '#1A1203',
    bgGradStart: '#FF8F00',
    bgGradEnd: '#4E2E04',
    textColor: '#FFCA28',
    accent: '#FFD54F',
    iconGraphic: `
      <!-- 3D Lucky Golden Sphere & Casino Ring -->
      <g transform="translate(40, 20)">
        <!-- Back Gold Aura -->
        <circle cx="160" cy="160" r="140" fill="#FFD54F" fill-opacity="0.25" filter="url(#neonGlow_005)"/>

        <!-- Tech Pedestal -->
        <ellipse cx="160" cy="270" rx="150" ry="36" fill="#000000" fill-opacity="0.6"/>
        <ellipse cx="160" cy="270" rx="140" ry="30" fill="none" stroke="#FFD54F" stroke-width="2.5"/>

        <!-- Giant Golden Sphere -->
        <circle cx="160" cy="150" r="68" fill="#3E2704" stroke="#FFD54F" stroke-width="4"/>
        <circle cx="160" cy="150" r="48" fill="#FFE082" stroke="#FF8F00" stroke-width="2"/>
        <text x="160" y="166" font-family="'Impact', sans-serif" font-size="44" font-weight="900" fill="#E65100" text-anchor="middle">7</text>

        <!-- Orbiting Mini Lotto Spheres -->
        <circle cx="70" cy="110" r="22" fill="#E53935" stroke="#FFFFFF" stroke-width="2"/>
        <text x="70" y="117" font-family="'Impact', sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">12</text>

        <circle cx="250" cy="190" r="24" fill="#1E88E5" stroke="#FFFFFF" stroke-width="2"/>
        <text x="250" y="198" font-family="'Impact', sans-serif" font-size="17" font-weight="900" fill="#FFFFFF" text-anchor="middle">45</text>

        <!-- Golden Ring Orbit -->
        <ellipse cx="160" cy="150" rx="120" ry="45" fill="none" stroke="#FFD54F" stroke-width="3" stroke-dasharray="16,10" transform="rotate(-15 160 150)"/>
      </g>
    `,
    bgSilhouetteGraphic: `
      <!-- Ghost Target Radar Compass -->
      <g transform="translate(0, 0)">
        <circle cx="160" cy="160" r="140" fill="none" stroke="#FFD54F" stroke-width="2" stroke-dasharray="14,10"/>
        <circle cx="160" cy="160" r="90" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <polygon points="160,30 175,145 290,160 175,175 160,290 145,175 30,160 145,145" fill="#FFD54F" fill-opacity="0.15"/>
      </g>
    `
  }
];

export function renderTechCardSvg(item, w = 1200, h = 630) {
  const {
    id,
    code,
    fullCode,
    title,
    sub,
    category,
    themeColor,
    bgColor,
    bgGradStart,
    bgGradEnd,
    textColor,
    accent,
    iconGraphic,
    bgSilhouetteGraphic
  } = item;

  return `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Base Gradient -->
      <linearGradient id="bgMain_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradStart}" stop-opacity="0.95"/>
        <stop offset="45%" stop-color="${bgGradEnd}" stop-opacity="0.98"/>
        <stop offset="100%" stop-color="${bgColor}" stop-opacity="1"/>
      </linearGradient>

      <!-- Glow and Shadow Filters -->
      <filter id="neonGlow_${id}" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="12" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.8"/>
      </filter>

      <!-- Halftone Dot Grid -->
      <pattern id="dotGrid_${id}" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#FFFFFF" fill-opacity="0.08"/>
      </pattern>

      <!-- Tech Diagonal Slash Pattern -->
      <pattern id="slashPattern" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="16" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="2"/>
      </pattern>
    </defs>

    <!-- Outer Presentation Canvas (Deep Slate Charcoal) -->
    <rect width="${w}" height="${h}" fill="#080B10"/>

    <!-- Tech Banner Main Container -->
    <g transform="translate(24, 24)">
      <!-- Main Card Body -->
      <rect width="${w - 48}" height="${h - 48}" rx="8" fill="url(#bgMain_${id})"/>
      <rect width="${w - 48}" height="${h - 48}" rx="8" fill="url(#dotGrid_${id})"/>
      <rect width="${w - 48}" height="${h - 48}" rx="8" fill="url(#slashPattern)"/>

      <!-- Inner High-Tech White Border -->
      <rect x="16" y="16" width="${w - 80}" height="${h - 80}" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="1.5"/>

      <!-- Corner Screws & Precision Accents -->
      <circle cx="24" cy="24" r="3" fill="#FFFFFF" fill-opacity="0.85"/>
      <circle cx="${w - 72}" cy="24" r="3" fill="#FFFFFF" fill-opacity="0.85"/>
      <circle cx="24" cy="${h - 72}" r="3" fill="#FFFFFF" fill-opacity="0.85"/>
      <circle cx="${w - 72}" cy="${h - 72}" r="3" fill="#FFFFFF" fill-opacity="0.85"/>

      <!-- Precision Bracket Accents -->
      <path d="M 16 44 L 16 16 L 44 16" fill="none" stroke="${accent}" stroke-width="3.5"/>
      <path d="M ${w - 92} 16 L ${w - 64} 16 L ${w - 64} 44" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <path d="M 16 ${h - 92} L 16 ${h - 64} L 44 ${h - 64}" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <path d="M ${w - 92} ${h - 64} L ${w - 64} ${h - 64} L ${w - 64} ${h - 92}" fill="none" stroke="${accent}" stroke-width="3.5"/>

      <!-- TOP HEADER TECH HUD -->
      <g transform="translate(28, 30)">
        <!-- Index Badge -->
        <rect x="0" y="0" width="84" height="22" rx="3" fill="#000000" fill-opacity="0.75" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1"/>
        <text x="42" y="15" font-family="'Impact', 'Arial Black', sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" letter-spacing="1.5" text-anchor="middle">#${id} // EXP</text>

        <!-- Hatch Pattern Slashes -->
        <text x="102" y="16" font-family="'Courier New', monospace" font-size="16" font-weight="900" fill="#FFFFFF" fill-opacity="0.7" letter-spacing="2">///////</text>

        <!-- Organization / System ID -->
        <text x="${w - 120}" y="15" font-family="'Arial', sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" fill-opacity="0.8" text-anchor="end" letter-spacing="1.5">RAB8BIT SYSTEM // SPEC.2026</text>
      </g>

      <!-- MASSIVE CONDENSED TECH TYPOGRAPHY (Left Column) -->
      <g transform="translate(32, 60)">
        <text x="0" y="270" font-family="'Impact', 'Arial Black', sans-serif" font-size="310" font-weight="900" fill="${textColor}" fill-opacity="0.9" letter-spacing="-8" transform="scale(0.85, 1.25)">${code}</text>
      </g>

      <!-- GHOSTED VERTICAL OUTLINE TEXT (Far Right Edge) -->
      <g transform="translate(${w - 75}, 35)">
        <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="110" font-weight="900" fill="none" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="2" letter-spacing="10" transform="rotate(90) scale(1, 0.95)">${fullCode}</text>
      </g>

      <!-- BACKGROUND RIGHT SILHOUETTE / SCHEMATIC GRAPHIC -->
      <g transform="translate(${w - 480}, 60)" opacity="0.28">
        ${bgSilhouetteGraphic}
      </g>

      <!-- CENTER-RIGHT HERO 3D VECTOR ARTWORK -->
      <g transform="translate(${w - 440}, 90)" filter="url(#softShadow)">
        ${iconGraphic}
      </g>

      <!-- TOP-RIGHT CALLIGRAPHIC SIGNATURE / STAMP -->
      <g transform="translate(${w - 210}, 68)">
        <text x="90" y="0" font-family="'Brush Script MT', 'Snell Roundhand', cursive, serif" font-size="38" font-weight="bold" fill="#FFFFFF" fill-opacity="0.95" text-anchor="end" transform="rotate(-3)">${fullCode}</text>
        <text x="90" y="16" font-family="'Brush Script MT', 'Snell Roundhand', cursive, serif" font-size="22" font-weight="bold" fill="${accent}" fill-opacity="0.85" text-anchor="end" transform="rotate(-3)">${fullCode.toLowerCase()}</text>
      </g>

      <!-- BOTTOM OVERLAY: HIGH-CONTRAST KOREAN HOOK & TITLE -->
      <g transform="translate(36, ${h - 185})">
        <!-- Category Pill Badge -->
        <rect x="0" y="0" width="140" height="26" rx="4" fill="#000000" fill-opacity="0.85" stroke="${accent}" stroke-width="1.5"/>
        <text x="70" y="18" font-family="'Arial', 'Paperlogy', sans-serif" font-size="12" font-weight="900" fill="${accent}" letter-spacing="1" text-anchor="middle">■ ${category}</text>

        <!-- Main Punchy Title (Paperlogy Heavy White) -->
        <text x="0" y="66" font-family="'Paperlogy', 'Paperlogy-9Black', 'Noto Sans KR', sans-serif" font-size="38" font-weight="900" fill="#FFFFFF" letter-spacing="-0.8">
          ${escapeXml(title)}
        </text>

        <!-- Sub Description (High-Contrast Accent Tint) -->
        <text x="0" y="100" font-family="'Paperlogy', 'Paperlogy-8ExtraBold', 'Noto Sans KR', sans-serif" font-size="20" font-weight="700" fill="${accent}">
          ✔ ${escapeXml(sub)}
        </text>
      </g>

      <!-- BOTTOM BAR TECH METADATA -->
      <g transform="translate(36, ${h - 52})">
        <text x="0" y="0" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FFFFFF" fill-opacity="0.65">■ OPERATOR ENTRY // SPEC.2026 // PROTOCOL ACTIVE</text>
        <text x="${w - 120}" y="0" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FFFFFF" fill-opacity="0.65" text-anchor="end">[ SECURE-SYSTEM // PASS ]</text>
      </g>
    </g>
  </svg>
  `;
}

// -----------------------------------------------------------------------------
// Render 3-Card Vertical Spec Sheet (Exact Match to User Reference Poster Layout)
// -----------------------------------------------------------------------------
export function renderSpecSheetSvg(items, w = 1200, h = 1600) {
  const cardW = 900;
  const cardH = 430;
  const startX = 260;
  const startY = 160;
  const gapY = 470;

  let cardsSvg = '';
  let metaSidebarSvg = '';

  items.slice(0, 3).forEach((item, idx) => {
    const yPos = startY + idx * gapY;

    // 1. Sidebar Metadata Section
    metaSidebarSvg += `
      <g transform="translate(45, ${yPos + 10})">
        <!-- Number Tag -->
        <text x="0" y="32" font-family="'Impact', 'Arial Black', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="1">#${item.id}</text>
        
        <!-- Key-Value Specs -->
        <g transform="translate(0, 60)" font-family="'Arial', 'Paperlogy', sans-serif">
          <text x="0" y="0" font-size="11" font-weight="700" fill="#64748B">Name</text>
          <text x="0" y="16" font-size="16" font-weight="900" fill="#F1F5F9">${item.name}</text>

          <text x="0" y="42" font-size="11" font-weight="700" fill="#64748B">Type</text>
          <text x="0" y="58" font-size="15" font-weight="900" fill="#F1F5F9">${item.gender}</text>

          <text x="0" y="84" font-size="11" font-weight="700" fill="#64748B">Protocol</text>
          <text x="0" y="100" font-size="15" font-weight="900" fill="#F1F5F9">${item.race}</text>

          <text x="0" y="126" font-size="11" font-weight="700" fill="#64748B">System Ver</text>
          <text x="0" y="142" font-size="15" font-weight="900" fill="#F1F5F9">2026.09</text>
        </g>

        <!-- Mini Preview Avatar Box -->
        <g transform="translate(0, 230)">
          <rect width="84" height="84" rx="6" fill="#0F172A" stroke="#334155" stroke-width="2"/>
          <rect x="4" y="4" width="76" height="76" rx="4" fill="${item.bgColor}"/>
          <circle cx="42" cy="42" r="28" fill="${item.accent}" fill-opacity="0.25"/>
          <text x="42" y="52" font-family="'Impact', sans-serif" font-size="28" font-weight="900" fill="${item.accent}" text-anchor="middle">${item.code.slice(0, 2)}</text>
        </g>
      </g>
    `;

    // 2. Banner Inner Content (Rendered at 1200x600 and Scaled to Fit)
    const cardInnerSvg = renderTechCardSvg(item, 1200, 600);
    cardsSvg += `
      <g transform="translate(${startX}, ${yPos}) scale(0.74, 0.70)">
        ${cardInnerSvg}
      </g>
    `;
  });

  return `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Overall Dark Slate Carbon Canvas Background -->
      <radialGradient id="posterBg" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="70%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#070B12"/>
      </radialGradient>

      <!-- Halftone Dots for Poster Canvas -->
      <pattern id="posterDots" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" fill-opacity="0.05"/>
      </pattern>
    </defs>

    <!-- Canvas Background -->
    <rect width="${w}" height="${h}" fill="url(#posterBg)"/>
    <rect width="${w}" height="${h}" fill="url(#posterDots)"/>

    <!-- TOP LEFT POSTER HEADER -->
    <g transform="translate(45, 60)">
      <!-- Circle Icon -->
      <circle cx="20" cy="20" r="18" fill="#FFFFFF" fill-opacity="0.1" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="7" y1="33" x2="33" y2="7" stroke="#FFFFFF" stroke-width="3"/>

      <!-- Header Label -->
      <text x="50" y="16" font-family="'Impact', 'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" letter-spacing="1.5">#34  디자인 실험</text>
      <text x="50" y="36" font-family="'Impact', 'Arial Black', sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" letter-spacing="1">Experiment</text>
    </g>

    <!-- TOP RIGHT RAB8BIT LAB BADGE -->
    <g transform="translate(${w - 320}, 75)">
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" fill-opacity="0.8" letter-spacing="2">RAB8BIT SYSTEM UI</text>
    </g>

    <!-- SIDEBAR METADATA -->
    ${metaSidebarSvg}

    <!-- MAIN CARDS -->
    ${cardsSvg}

    <!-- BOTTOM FOOTER -->
    <g transform="translate(45, ${h - 40})">
      <text x="0" y="0" font-family="'Arial', sans-serif" font-size="12" font-weight="700" fill="#64748B">RAB8BIT DIGITAL EXPERIMENT LAB // ALL RIGHTS RESERVED</text>
      <text x="${w - 90}" y="0" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#94A3B8" text-anchor="end">#도구썸네일디자인</text>
    </g>
  </svg>
  `;
}

async function run() {
  console.log('Rendering 3 individual tech cards & 1 full spec poster...');
  
  // 1. Render Individual Banners (1200x630)
  for (const item of PALETTES) {
    const svg = renderTechCardSvg(item, 1200, 630);
    const outPath = path.join(TEST_DIR, `tech-card-${item.id}.jpg`);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toFile(outPath);
    console.log(`Generated: ${outPath}`);
  }

  // 2. Render Full Spec Poster (1200x1600) Matching User's Exact Reference Image
  const posterSvg = renderSpecSheetSvg(PALETTES, 1200, 1600);
  const posterPath = path.join(TEST_DIR, `tech-spec-poster-sheet.jpg`);
  await sharp(Buffer.from(posterSvg))
    .jpeg({ quality: 95 })
    .toFile(posterPath);
  console.log(`Generated: ${posterPath}`);

  console.log('Done rendering all assets!');
}

run();

