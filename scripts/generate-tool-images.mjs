import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const OUT_DIR = path.join(ROOT_DIR, 'public/images/tools');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Load tools from TypeScript file
const content = fs.readFileSync(path.join(ROOT_DIR, 'src/data/interactiveToolsData.ts'), 'utf8');
const match = content.match(/export const INTERACTIVE_TOOLS: InteractiveToolItem\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  throw new Error('Could not parse INTERACTIVE_TOOLS from interactiveToolsData.ts');
}
const tools = JSON.parse(match[1]);

function generateIllustrationSvg(tool) {
  const w = 640;
  const h = 360;
  const slug = tool.slug;
  const cat = tool.category;
  const title = tool.title;
  const badge = tool.badge || cat;

  // Render specific rich illustration scene based on slug / domain
  let sceneContent = '';
  let bgGrad = ['#0f172a', '#1e1b4b', '#0284c7'];

  if (slug.includes('salary') || slug.includes('tax') || slug.includes('pay') || slug.includes('severance') || slug.includes('leave') || slug.includes('bonus')) {
    // 💵 Finance & Salary Paycheck Scene
    bgGrad = ['#064e3b', '#0f766e', '#022c22'];
    sceneContent = `
      <!-- 3D Gold Coin Stacks -->
      <g transform="translate(180, 240)">
        <ellipse cx="0" cy="0" rx="45" ry="16" fill="#ca8a04"/>
        <rect x="-45" y="-30" width="90" height="30" fill="#eab308"/>
        <ellipse cx="0" cy="-30" rx="45" ry="16" fill="#facc15" stroke="#fef08a" stroke-width="2"/>
        <ellipse cx="0" cy="-45" rx="45" ry="16" fill="#eab308"/>
        <rect x="-45" y="-75" width="90" height="30" fill="#facc15"/>
        <ellipse cx="0" cy="-75" rx="45" ry="16" fill="#fef08a" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="-70" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="20" font-weight="900" fill="#a16207">₩</text>
      </g>
      <!-- Isometric Financial Statement Document -->
      <g transform="translate(380, 160) rotate(-6)">
        <rect x="-140" y="-85" width="280" height="170" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="4"/>
        <rect x="-120" y="-65" width="120" height="16" rx="4" fill="#34d399"/>
        <rect x="-120" y="-35" width="240" height="8" rx="2" fill="#334155"/>
        <rect x="-120" y="-15" width="180" height="8" rx="2" fill="#334155"/>
        <rect x="-120" y="5" width="210" height="8" rx="2" fill="#334155"/>
        <!-- Big Number Display -->
        <rect x="-120" y="25" width="240" height="36" rx="6" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
        <text x="-105" y="48" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#6ee7b7">실수령액: ₩ 4,850,000</text>
      </g>
      <!-- Floating Percentage Badge -->
      <g transform="translate(520, 100) rotate(12)">
        <circle cx="0" cy="0" r="32" fill="#f59e0b" stroke="#ffffff" stroke-width="3"/>
        <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="#000000">3.3%</text>
      </g>
    `;
  } else if (slug.includes('stock') || slug.includes('crypto')) {
    // 📈 Stock / Crypto Trading Candlestick Terminal Scene
    bgGrad = ['#0f172a', '#1e3a8a', '#030712'];
    sceneContent = `
      <!-- Terminal Window Screen -->
      <g transform="translate(320, 175)">
        <rect x="-240" y="-120" width="480" height="240" rx="16" fill="#090d16" stroke="#38bdf8" stroke-width="3"/>
        <!-- Window Header -->
        <path d="M -240 -85 L 240 -85" stroke="#1e293b" stroke-width="2"/>
        <circle cx="-215" cy="-102" r="5" fill="#ef4444"/>
        <circle cx="-198" cy="-102" r="5" fill="#facc15"/>
        <circle cx="-181" cy="-102" r="5" fill="#22c55e"/>
        <text x="0" y="-97" text-anchor="middle" font-family="monospace" font-size="12" fill="#94a3b8">CANDLESTICK CHART // LIVE</text>
        
        <!-- Candlesticks (Green & Red) -->
        <!-- Candle 1 -->
        <line x1="-160" y1="40" x2="-160" y2="-40" stroke="#ef4444" stroke-width="2"/>
        <rect x="-172" y="-20" width="24" height="50" rx="3" fill="#ef4444"/>
        <!-- Candle 2 -->
        <line x1="-100" y1="20" x2="-100" y2="-60" stroke="#22c55e" stroke-width="2"/>
        <rect x="-112" y="-50" width="24" height="60" rx="3" fill="#22c55e"/>
        <!-- Candle 3 -->
        <line x1="-40" y1="30" x2="-40" y2="-70" stroke="#22c55e" stroke-width="2"/>
        <rect x="-52" y="-60" width="24" height="70" rx="3" fill="#22c55e"/>
        <!-- Candle 4 -->
        <line x1="20" y1="0" x2="20" y2="-90" stroke="#22c55e" stroke-width="2"/>
        <rect x="8" y="-80" width="24" height="65" rx="3" fill="#22c55e"/>
        <!-- Candle 5 (Breakout) -->
        <line x1="80" y1="-20" x2="80" y2="-110" stroke="#22c55e" stroke-width="2"/>
        <rect x="68" y="-100" width="24" height="70" rx="3" fill="#22c55e"/>
        <!-- Moving Average Curve Line -->
        <path d="M -200 40 Q -100 -20 0 -50 T 180 -105" fill="none" stroke="#facc15" stroke-width="4"/>
        
        <!-- Live Gain Pill -->
        <g transform="translate(150, -40)">
          <rect x="-55" y="-18" width="110" height="36" rx="8" fill="#15803d" stroke="#4ade80" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="14" font-weight="900" fill="#ffffff">+24.5% ▲</text>
        </g>
      </g>
    `;
  } else if (slug.includes('realtor') || slug.includes('loan') || slug.includes('pyeong')) {
    // 🏠 Real Estate & Mortgage Architecture Scene
    bgGrad = ['#1e1b4b', '#1e3a8a', '#0f172a'];
    sceneContent = `
      <!-- 3D Isometric Modern House -->
      <g transform="translate(260, 190)">
        <!-- House Base Wall -->
        <polygon points="0,50 120,-10 120,-110 0,-50" fill="#1e293b"/>
        <polygon points="0,50 -120,-10 -120,-110 0,-50" fill="#334155"/>
        <!-- Roof -->
        <polygon points="0,-120 140,-50 0,20 -140,-50" fill="#3b82f6" stroke="#93c5fd" stroke-width="2"/>
        <polygon points="0,-120 0,20 140,-50" fill="#1d4ed8"/>
        <!-- Glowing Windows -->
        <polygon points="20,-20 80,-50 80,-90 20,-60" fill="#fef08a" opacity="0.9"/>
        <polygon points="-20,-20 -80,-50 -80,-90 -20,-60" fill="#facc15" opacity="0.85"/>
        <!-- Door -->
        <polygon points="-15,40 15,25 15,-15 -15,0" fill="#0f172a"/>
      </g>
      <!-- Credit Card with Metallic EMV Chip (Right) -->
      <g transform="translate(480, 170) rotate(-10)">
        <rect x="-95" y="-60" width="190" height="120" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="3"/>
        <rect x="-75" y="-35" width="36" height="26" rx="4" fill="#fbbf24"/>
        <line x1="-75" y1="-22" x2="-39" y2="-22" stroke="#78350f" stroke-width="2"/>
        <circle cx="55" cy="25" r="16" fill="#ef4444" opacity="0.8"/>
        <circle cx="72" cy="25" r="16" fill="#f59e0b" opacity="0.8"/>
        <text x="-75" y="32" font-family="monospace" font-size="11" fill="#94a3b8">•••• 8826</text>
      </g>
    `;
  } else if (slug.includes('lotto') || slug.includes('roulette') || slug.includes('ladder') || slug.includes('dice') || slug.includes('game') || slug.includes('quiz')) {
    // 🎲 Game, Lotto, Roulette & Arcade Scene
    bgGrad = ['#4a044e', '#581c87', '#1e1b4b'];
    sceneContent = `
      <!-- 3D Casino Roulette Wheel (Left) -->
      <g transform="translate(200, 180)">
        <circle cx="0" cy="0" r="100" fill="#09090b" stroke="#f59e0b" stroke-width="8"/>
        <!-- Slices -->
        <path d="M 0 0 L 0 -95 A 95 95 0 0 1 67 -67 Z" fill="#dc2626"/>
        <path d="M 0 0 L 67 -67 A 95 95 0 0 1 95 0 Z" fill="#15803d"/>
        <path d="M 0 0 L 95 0 A 95 95 0 0 1 67 67 Z" fill="#dc2626"/>
        <path d="M 0 0 L 67 67 A 95 95 0 0 1 0 95 Z" fill="#15803d"/>
        <path d="M 0 0 L 0 95 A 95 95 0 0 1 -67 67 Z" fill="#dc2626"/>
        <path d="M 0 0 L -67 67 A 95 95 0 0 1 -95 0 Z" fill="#15803d"/>
        <path d="M 0 0 L -95 0 A 95 95 0 0 1 -67 -67 Z" fill="#dc2626"/>
        <path d="M 0 0 L -67 -67 A 95 95 0 0 1 0 -95 Z" fill="#15803d"/>
        <!-- Golden Center Hub -->
        <circle cx="0" cy="0" r="30" fill="#facc15" stroke="#78350f" stroke-width="4"/>
        <!-- Ticker Needle -->
        <polygon points="0,-115 -10,-95 10,-95" fill="#facc15" stroke="#000000" stroke-width="2"/>
      </g>
      <!-- 3D Numbered Lottery Spheres (Right) -->
      <g transform="translate(450, 140)">
        <!-- Ball 1 (Gold 7) -->
        <circle cx="-50" cy="0" r="38" fill="#eab308" stroke="#fef08a" stroke-width="3"/>
        <circle cx="-50" cy="0" r="20" fill="#ffffff"/>
        <text x="-50" y="7" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="#000000">7</text>
        <!-- Ball 2 (Red 24) -->
        <circle cx="30" cy="-30" r="34" fill="#ef4444" stroke="#fca5a5" stroke-width="3"/>
        <circle cx="30" cy="-30" r="18" fill="#ffffff"/>
        <text x="30" y="-24" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="16" font-weight="900" fill="#000000">24</text>
        <!-- Ball 3 (Blue 38) -->
        <circle cx="40" cy="50" r="36" fill="#3b82f6" stroke="#bfdbfe" stroke-width="3"/>
        <circle cx="40" cy="50" r="19" fill="#ffffff"/>
        <text x="40" y="56" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="17" font-weight="900" fill="#000000">38</text>
      </g>
    `;
  } else if (slug.includes('json') || slug.includes('jwt') || slug.includes('regex') || slug.includes('base64') || slug.includes('hash') || slug.includes('uuid') || slug.includes('sql') || slug.includes('ip') || slug.includes('code') || slug.includes('dev')) {
    // 💻 Developer Terminal & IDE Code Scene
    bgGrad = ['#082f49', '#0f172a', '#1e1b4b'];
    sceneContent = `
      <!-- Code IDE Editor Window -->
      <g transform="translate(320, 175)">
        <rect x="-240" y="-115" width="480" height="230" rx="14" fill="#020617" stroke="#06b6d4" stroke-width="3"/>
        <!-- Tab Bar -->
        <path d="M -240 -80 L 240 -80" stroke="#1e293b" stroke-width="2"/>
        <circle cx="-215" cy="-97" r="5" fill="#ef4444"/>
        <circle cx="-198" cy="-97" r="5" fill="#facc15"/>
        <circle cx="-181" cy="-97" r="5" fill="#22c55e"/>
        <rect x="-150" y="-110" width="130" height="30" rx="6" fill="#0f172a"/>
        <text x="-85" y="-91" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#38bdf8">utility.json</text>
        
        <!-- Formatted Code Lines -->
        <text x="-210" y="-45" font-family="monospace" font-size="15" fill="#f43f5e">{\n</text>
        <text x="-190" y="-20" font-family="monospace" font-size="14" fill="#38bdf8">  "status": <tspan fill="#a3e635">200</tspan>,</text>
        <text x="-190" y="5" font-family="monospace" font-size="14" fill="#38bdf8">  "valid": <tspan fill="#f59e0b">true</tspan>,</text>
        <text x="-190" y="30" font-family="monospace" font-size="14" fill="#38bdf8">  "token": <tspan fill="#e879f9">"eyJhbGciOiJIUz..."</tspan></text>
        <text x="-210" y="55" font-family="monospace" font-size="15" fill="#f43f5e">}</text>

        <!-- Floating Verified Shield -->
        <g transform="translate(160, 30)">
          <polygon points="0,-40 35,-15 35,25 0,45 -35,25 -35,-15" fill="#0891b2" stroke="#22d3ee" stroke-width="3"/>
          <path d="M -12 2 L -2 12 L 14 -6" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        </g>
      </g>
    `;
  } else if (slug.includes('qr') || slug.includes('barcode')) {
    // 📱 QR Code & Barcode Laser Scanner Scene
    bgGrad = ['#1e1b4b', '#172554', '#0f172a'];
    sceneContent = `
      <!-- Holographic 3D QR Code Plate -->
      <g transform="translate(320, 175)">
        <rect x="-120" y="-120" width="240" height="240" rx="20" fill="#ffffff" stroke="#38bdf8" stroke-width="6"/>
        <!-- QR Finder Patterns (Top-Left, Top-Right, Bottom-Left) -->
        <rect x="-95" y="-95" width="55" height="55" fill="#000000"/>
        <rect x="-80" y="-80" width="25" height="25" fill="#ffffff"/>
        <rect x="-70" y="-70" width="10" height="10" fill="#000000"/>

        <rect x="40" y="-95" width="55" height="55" fill="#000000"/>
        <rect x="55" y="-80" width="25" height="25" fill="#ffffff"/>
        <rect x="65" y="-70" width="10" height="10" fill="#000000"/>

        <rect x="-95" y="40" width="55" height="55" fill="#000000"/>
        <rect x="-80" y="55" width="25" height="25" fill="#ffffff"/>
        <rect x="-70" y="65" width="10" height="10" fill="#000000"/>

        <!-- Matrix Pixels -->
        <rect x="-20" y="-90" width="18" height="18" fill="#000000"/>
        <rect x="10" y="-90" width="18" height="18" fill="#000000"/>
        <rect x="-20" y="-60" width="48" height="18" fill="#000000"/>
        <rect x="-20" y="-30" width="18" height="48" fill="#000000"/>
        <rect x="10" y="-30" width="18" height="18" fill="#000000"/>
        <rect x="40" y="-30" width="48" height="18" fill="#000000"/>
        <rect x="-20" y="30" width="48" height="18" fill="#000000"/>
        <rect x="40" y="30" width="48" height="48" fill="#000000"/>

        <!-- Red Laser Beam Across QR -->
        <line x1="-160" y1="-10" x2="160" y2="-10" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <line x1="-160" y1="-10" x2="160" y2="-10" stroke="#fca5a5" stroke-width="2" stroke-linecap="round"/>
      </g>
    `;
  } else {
    // 🛠️ Universal Precision Tool & Gauge Dashboard Scene
    bgGrad = ['#1e1b4b', '#312e81', '#0f172a'];
    sceneContent = `
      <!-- Precision Speedometer / Gauge Meter -->
      <g transform="translate(320, 180)">
        <!-- Arc Track -->
        <path d="M -130 50 A 140 140 0 1 1 130 50" fill="none" stroke="#334155" stroke-width="24" stroke-linecap="round"/>
        <path d="M -130 50 A 140 140 0 1 1 50 -130" fill="none" stroke="#6366f1" stroke-width="24" stroke-linecap="round"/>
        <!-- Needle Pointer -->
        <polygon points="0,-120 -8,10 8,10" fill="#ef4444" transform="rotate(35)"/>
        <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="5"/>
        <!-- Digital Stat Box -->
        <rect x="-80" y="35" width="160" height="45" rx="10" fill="#090d16" stroke="#818cf8" stroke-width="2"/>
        <text x="0" y="65" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="20" font-weight="900" fill="#a5b4fc">SMART APP</text>
      </g>
    `;
  }

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="toolBgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgGrad[0]}"/>
      <stop offset="50%" stop-color="${bgGrad[1]}"/>
      <stop offset="100%" stop-color="${bgGrad[2]}"/>
    </linearGradient>

    <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Full 16:9 Canvas Background -->
  <rect width="${w}" height="${h}" fill="url(#toolBgGrad)"/>

  <!-- Subtle Perspective Grid Lines -->
  <g opacity="0.15" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="120" x2="${w}" y2="120"/>
    <line x1="0" y1="240" x2="${w}" y2="240"/>
    <line x1="160" y1="0" x2="160" y2="${h}"/>
    <line x1="320" y1="0" x2="320" y2="${h}"/>
    <line x1="480" y1="0" x2="480" y2="${h}"/>
  </g>

  <!-- Illustration Visual Scene Content -->
  <g filter="url(#shadowFilter)">
    ${sceneContent}
  </g>

  <!-- Top-Left Category Tag Pill -->
  <g transform="translate(24, 20)">
    <rect x="0" y="0" width="${cat.length * 16 + 28}" height="28" rx="8" fill="#000000" fill-opacity="0.6" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5"/>
    <text x="14" y="19" font-family="'Paperlogy', sans-serif" font-size="12" font-weight="800" fill="#38bdf8">${cat}</text>
  </g>

  <!-- Top-Right Highlight Badge Pill -->
  <g transform="translate(${w - 24}, 20)">
    <g transform="translate(-${(badge.length * 15 + 26)}, 0)">
      <rect x="0" y="0" width="${badge.length * 15 + 26}" height="28" rx="14" fill="#f59e0b" stroke="#fef08a" stroke-width="1.5"/>
      <text x="${(badge.length * 15 + 26) / 2}" y="19" text-anchor="middle" font-family="'Paperlogy', sans-serif" font-size="12" font-weight="900" fill="#000000">${badge}</text>
    </g>
  </g>

  <!-- Bottom Gradient Fade -->
  <rect x="0" y="${h - 40}" width="${w}" height="40" fill="url(#toolBgGrad)" opacity="0.4"/>
</svg>`;
}

async function generateAllToolImages() {
  console.log(`🚀 Starting 16:9 illustration image generation for ${tools.length} tools...`);
  
  for (const tool of tools) {
    const svgStr = generateIllustrationSvg(tool);
    const svgBuf = Buffer.from(svgStr);
    const outPath = path.join(OUT_DIR, `${tool.slug}.jpg`);

    await sharp(svgBuf)
      .resize(640, 360)
      .jpeg({ quality: 92 })
      .toFile(outPath);
  }

  console.log(`✅ Successfully generated 100 tool illustration images in ${OUT_DIR}`);
}

generateAllToolImages().catch(console.error);
