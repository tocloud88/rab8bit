import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const adsDir = 'public/images/ads';
if (!fs.existsSync(adsDir)) fs.mkdirSync(adsDir, { recursive: true });

function makeLeaderboardAdSvg() {
  return `<svg width="1200" height="120" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="adBg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0b0f19"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#2e1065"/>
    </linearGradient>
    <linearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="120" rx="16" fill="url(#adBg)"/>
  <rect x="1" y="1" width="1198" height="118" rx="15" fill="none" stroke="#6366f1" stroke-opacity="0.4" stroke-width="1.5"/>
  
  <g transform="translate(30, 26)">
    <rect x="0" y="0" width="68" height="68" rx="16" fill="#4338ca" fill-opacity="0.4" stroke="#818cf8" stroke-width="1.5"/>
    <path d="M38 14 L20 38 L34 38 L30 54 L48 30 L34 30 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/>
  </g>
  
  <g transform="translate(120, 50)">
    <text x="0" y="0" font-family="sans-serif" font-size="23" font-weight="900" fill="#ffffff">
      초고속 AI GPU 클라우드 인프라 — 첫 달 50% 할인
    </text>
    <text x="0" y="28" font-family="sans-serif" font-size="14.5" font-weight="500" fill="#94a3b8">
      H100 &amp; RTX 4090 클러스터 초당 과금 · 100만 토큰 LLM 파인튜닝 원클릭 배포
    </text>
  </g>
  
  <g transform="translate(770, 44)">
    <rect x="0" y="0" width="120" height="32" rx="16" fill="#15803d" fill-opacity="0.3" stroke="#22c55e" stroke-opacity="0.5"/>
    <text x="60" y="21" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4ade80">가입 $100 크레딧</text>
  </g>

  <g transform="translate(980, 36)">
    <rect x="0" y="0" width="180" height="48" rx="14" fill="url(#btnGrad)"/>
    <text x="90" y="30" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff">
      무료 체험하기 →
    </text>
  </g>
</svg>`;
}

function makeInArticleAdSvg() {
  return `<svg width="800" height="240" viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="artBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="artBtn" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="800" height="240" rx="20" fill="url(#artBg)"/>
  <rect x="1" y="1" width="798" height="238" rx="19" fill="none" stroke="#8b5cf6" stroke-opacity="0.4" stroke-width="2"/>

  <g transform="translate(35, 45)">
    <rect x="0" y="0" width="150" height="150" rx="20" fill="#1e1b4b" stroke="#6366f1" stroke-opacity="0.6" stroke-width="2"/>
    <circle cx="75" cy="65" r="30" fill="#4338ca" fill-opacity="0.5"/>
    <path d="M60 65 L70 55 M60 65 L70 75 M90 65 L80 55 M90 65 L80 75" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
    <circle cx="75" cy="65" r="4" fill="#a855f7"/>
    <text x="75" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c7d2fe" letter-spacing="1">AI AGENT IDE</text>
  </g>

  <g transform="translate(215, 55)">
    <rect x="0" y="0" width="115" height="24" rx="12" fill="#38bdf8" fill-opacity="0.15" stroke="#38bdf8" stroke-opacity="0.35"/>
    <text x="57" y="16" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#38bdf8">2026 추천 개발 도구</text>

    <text x="0" y="54" font-family="sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      자연어로 10배 빠른 개발, Cursor Pro
    </text>
    <text x="0" y="82" font-family="sans-serif" font-size="13.5" font-weight="400" fill="#94a3b8">
      복잡한 리팩토링과 버그 수정을 AI 에이전트에게 맡기고 아이디어에 집중하세요.
    </text>

    <g transform="translate(0, 106)">
      <rect x="0" y="0" width="190" height="42" rx="12" fill="url(#artBtn)"/>
      <text x="95" y="26" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">
        14일 무료 Pro 체험 →
      </text>
    </g>
  </g>
</svg>`;
}

function makeSideRailAdSvg() {
  return `<svg width="300" height="600" viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sideBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="sideBtn" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="300" height="600" rx="20" fill="url(#sideBg)"/>
  <rect x="1" y="1" width="298" height="598" rx="19" fill="none" stroke="#6366f1" stroke-opacity="0.35" stroke-width="2"/>

  <g transform="translate(150, 45)">
    <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#a855f7" fill-opacity="0.2" stroke="#a855f7" stroke-opacity="0.4"/>
    <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c084fc">글로벌 SaaS 스폰서</text>
  </g>

  <g transform="translate(150, 135)">
    <circle cx="0" cy="0" r="46" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
    <path d="M-12 18 L0 -24 L12 18 L0 10 Z" fill="#60a5fa"/>
    <circle cx="0" cy="-6" r="5" fill="#ffffff"/>
    <path d="M-6 16 L-16 28 L-6 24 Z" fill="#ef4444"/>
    <path d="M6 16 L16 28 L6 24 Z" fill="#ef4444"/>
  </g>

  <g transform="translate(150, 230)" text-anchor="middle">
    <text x="0" y="0" font-family="sans-serif" font-size="22" font-weight="900" fill="#ffffff">
      1인 창업가를 위한
    </text>
    <text x="0" y="28" font-family="sans-serif" font-size="22" font-weight="900" fill="#38bdf8">
      AI 풀스택 올인원
    </text>

    <text x="0" y="75" font-family="sans-serif" font-size="13" font-weight="500" fill="#94a3b8">
      호스팅 · 인증 · DB · AI API
    </text>
    <text x="0" y="98" font-family="sans-serif" font-size="13" font-weight="500" fill="#94a3b8">
      월 $0로 시작하는 스타트업
    </text>
  </g>

  <g transform="translate(45, 375)">
    <rect x="0" y="0" width="210" height="96" rx="12" fill="#030712" fill-opacity="0.65" stroke="#334155" stroke-width="1"/>
    <text x="18" y="26" font-family="sans-serif" font-size="12" fill="#cbd5e1">✓ 글로벌 초고속 CDN</text>
    <text x="18" y="52" font-family="sans-serif" font-size="12" fill="#cbd5e1">✓ 실시간 자동 백업</text>
    <text x="18" y="78" font-family="sans-serif" font-size="12" fill="#cbd5e1">✓ 100만 요청 무료 제공</text>
  </g>

  <g transform="translate(35, 500)">
    <rect x="0" y="0" width="230" height="50" rx="14" fill="url(#sideBtn)"/>
    <text x="115" y="31" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff">
      지금 무료 시작하기 →
    </text>
  </g>
</svg>`;
}

async function run() {
  await sharp(Buffer.from(makeLeaderboardAdSvg())).png().toFile('public/images/ads/mock-leaderboard-cloud.png');
  await sharp(Buffer.from(makeInArticleAdSvg())).png().toFile('public/images/ads/mock-inarticle-cursor.png');
  await sharp(Buffer.from(makeSideRailAdSvg())).png().toFile('public/images/ads/mock-siderail-saas.png');
  console.log('✅ Generated high-quality ad mockups in public/images/ads/');
}

run().catch(console.error);
