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

// -----------------------------------------------------------------------------
// Curated Short 2-Line Mega-Punchy Hooking Dictionary (Max 5~8 chars per line)
// Guarantees Giant 130px~160px Text Size with ZERO Clutter
// -----------------------------------------------------------------------------
export const PUNCHY_HOOK_MAP = {
  'daily-tech-insight-2026-09-14': { badge: '⚡ 100만 토큰', title1: '100만 토큰', title2: '대형 문서 분석' },
  'daily-tech-insight-2026-09-13': { badge: '🚀 바이브 코딩', title1: '바이브 코딩', title2: '1인 창업 스택' },
  'daily-tech-insight-2026-09-12': { badge: '🤖 AI 에이전트', title1: 'AI 에이전트', title2: '업무 자동화' },
  'ai-big-4-comparison-chatgpt-gemini-claude-grok': { badge: '⚔️ 플래그십', title1: 'AI 4대 천왕', title2: '끝장 맞대결' },
  'openai-gpt-6-astra-release-analysis': { badge: '🔥 OpenAI 충격', title1: 'GPT-6 Astra', title2: 'PC 직접 조작' },
  'ai-self-explanation-verification-guide': { badge: '⚠️ 환각 주의', title1: '모델 자기설명', title2: '믿지 마세요!' },
  'ai-side-hustle-course-verification-guide': { badge: '💰 재테크 검증', title1: 'AI 재테크 강의', title2: '가짜 강사 거르기' },
  'openai-pauses-training-google-opens-chrome': { badge: '🌐 빅테크 격돌', title1: '오픈AI 멈춤', title2: '구글 크롬 개방' },
  'why-ai-websites-look-same-claude-skills-solution': { badge: '🎨 웹 디자인', title1: '똑같은 AI 웹', title2: '클로드로 탈출' },
  'gemini-paper-report-three-line-summary-guide': { badge: '📑 논문 요약', title1: '제미나이로', title2: '논문 3줄 요약' },
  'ai-meeting-minutes-action-plan-chatgpt-prompt': { badge: '⏱️ 업무 단축', title1: '회의록 한숨 끝', title2: 'AI로 업무 단축' },
  'ai-advisor-not-yesman-remove-intention-from-prompts': { badge: '💡 질문의 기술', title1: '예스맨 AI를', title2: '조언자로 변신' },
  'lessons-from-building-90-ai-tools': { badge: '🛠️ 인디 해킹', title1: 'AI 앱 90개', title2: '직접 만든 후기' },
  'adsense-rejected-ai-cooload-robots-txt-fix': { badge: '💵 애드센스', title1: '애드센스 거절', title2: '클로드가 해결' },
  'recover-lost-returns-stock-analysis-prompt': { badge: '📈 주가 분석', title1: '잃어버린 수익', title2: 'AI 주가 프롬프트' },
  'retro-game-site-deployer': { badge: '🎮 8비트 게임', title1: '레트로 게임', title2: '앱 제작기' },
  'peurompeuteu-raibeureori': { badge: '📚 프롬프트', title1: '프롬프트 270개', title2: '나만의 서재' },
  'preventing-gemini-api-disruptions': { badge: '⚡ API 대응', title1: 'Gemini API 종료', title2: '무충격 대응법' },
  '2026-world-cup-ai-prediction-prompt': { badge: '⚽ 2026 월드컵', title1: '2026 월드컵', title2: 'AI 예측 프롬프트' },
  'claude-unexpected-strengths': { badge: '🟣 Claude 강점', title1: '직접 써본 클로드', title2: '놀라운 강점 5' },
  'claude-excel-prompts-6': { badge: '📊 엑셀 혁신', title1: '엑셀 노가다 끝!', title2: '마법의 프롬프트' },
  'migrate-chatgpt-to-gemini-claude': { badge: '🔄 모델 이전', title1: 'ChatGPT 메모리', title2: '클로드로 이전' },
  'blog-post-aeo-optimization-prompt': { badge: '🚀 트래픽 3배', title1: '블로그 트래픽', title2: '3배 폭발 비법' },
  'google-ai-studio-android-app-build': { badge: '📱 노코드 앱', title1: '코딩 없이 제작', title2: '부동산 조회 앱' },
  'ai-fake-discount-checker-prompt': { badge: '🛒 스마트 쇼핑', title1: '쇼핑 효율 200%', title2: '가짜 할인 판독' },
  'chatgpt-vs-claude-comparison': { badge: '⚖️ 모델 선택', title1: '단순 작업 ChatGPT', title2: '중요 결정 Claude' },
  'notebooklm-prompts-for-complex-topics': { badge: '🧠 장기 기억', title1: 'NotebookLM으로', title2: '장기 기억 구축' },
  'chatgpt-bank-account-risk': { badge: '🔒 금융 보안', title1: 'ChatGPT에 통장', title2: '맡겨도 될까?' },
  'html-is-the-new-markdown': { badge: '💻 웹 포맷', title1: '마크다운보다', title2: 'HTML이 나은 이유' },
  'how-to-check-ai-outage-chatgpt-claude-gemini': { badge: '🚨 장애 진단', title1: 'AI 먹통일 때', title2: '장애 확인 3법' },
  'how-to-make-html5-fishing-game-with-google-ai-studio': { badge: '🎣 게임 개발', title1: 'AI Studio로', title2: '낚시게임 제작' },
  'best-ai-tools-for-research-claude-notebooklm': { badge: '🔬 연구 툴', title1: '자료는 노트북LM', title2: '글쓰기는 클로드' },
  'manage-learning-materials-with-notebooklm': { badge: '📁 지식 관리', title1: '흩어진 학습 자료', title2: '한 번에 통합' },
  'work-prompt-examples-10-for-business': { badge: '💼 직장인 실무', title1: '직장인 실무', title2: '필수 프롬프트 10' },
  'how-to-organize-files-with-claude-code-for-beginners': { badge: '📂 파일 정리', title1: '클로드 코드로', title2: '파일 정리 끝!' },
  '3-step-ai-prompt-guide': { badge: '🎯 프롬프트 기초', title1: '프롬프트 작성', title2: '3단계 마스터' },
  'gemini-advanced-marketing-tactics-part-2': { badge: '📢 마케팅 실전', title1: '블로거 & 마케터', title2: '제미나이 200%' },
  'yourblog-com-gemini-hacks-outperform-chatgpt-part-1': { badge: '🔥 제미나이 꿀팁', title1: 'ChatGPT 넘는', title2: '제미나이 미친 팁' },
  'snapblog-naver-blog-automation': { badge: '⚡ 블로그 자동화', title1: '사진만 넣으면 끝', title2: 'SEO 글 자동생성' },
  '10-powerful-ai-prompts-for-work-to-boost-productivity': { badge: '🚀 업무 효율 100배', title1: '업무 효율 100배', title2: '비밀 프롬프트' },
  'risks-of-ai-browser-automation': { badge: '⚠️ AI 브라우저', title1: 'AI 브라우저', title2: '불편한 진실 5' },
  'notebooklm-learning-journal-guide': { badge: '📝 학습 저널', title1: 'NotebookLM으로', title2: '초간단 저널 구축' },
  '5-limits-of-prompt-engineering-2026': { badge: '🔍 한계 분석', title1: '프롬프트 한계', title2: '2026 팩트체크' },
  'vibe-coding-google-ai-studio-auth': { badge: '⚡ 200만 토큰', title1: 'Gemini 200만', title2: '아키텍처 설계' },
  'how-to-prompt-lyria-3-pro-like-a-professional': { badge: '🎵 AI 작곡', title1: '제미니 Lyria 3', title2: '프로 작곡 비법' },
  'overcoming-ai-wall-for-leaders': { badge: '👔 AI 리더십', title1: 'AI 벽에 부딪힌', title2: '리더를 위한 해법' },
  'turning-handwritten-chaos-into-infographic-gold-with-chatgpt': { badge: '📊 인포그래픽', title1: '손글씨 메모를', title2: '인포그래픽으로' },
  'ai-prompt-strategy-for-difficult-tasks': { badge: '🎯 난제 해결', title1: '어려운 업무', title2: 'AI로 쉽게 시작' },
  'terminal-ai-tools-comparison-2026': { badge: '💻 터미널 AI', title1: '터미널 AI 3대장', title2: '완벽 비교' },
  'claude-quota-management-tips': { badge: '⚙️ 쿼터 공략', title1: '클로드 쿼터 초과', title2: '돌파하는 5가지 팁' },
  'ai-image-generation-tools-comparison-2026': { badge: '🎨 이미지 AI', title1: 'AI 이미지 대격돌', title2: '최고의 툴 1위는?' },
  'ai-writer-workflow-creativity': { badge: '✍️ 창의적 글쓰기', title1: '작가 창의력 200%', title2: 'AI 공동 집필법' },
  'markdown-structured-prompt-technique': { badge: '📑 마크다운 팁', title1: '마크다운 문법', title2: 'AI 응답 200% UP' },
  'ai-search-engine-optimization-aeo': { badge: '🔍 AEO 전략', title1: 'AI 검색 최적화', title2: '답변 채택 전략' },
  'ai-llm-real-ability-and-misconceptions': { badge: '🧠 LLM 진실', title1: 'AI는 생각 안 한다', title2: 'LLM의 진짜 능력' },
  'gemini-meta-prompting-guide': { badge: '🤖 메타 프롬프트', title1: 'AI가 AI를 교육', title2: '메타 프롬프팅' },
  'gemini-extensions-automation-guide': { badge: '🔌 구글 익스텐션', title1: '제미나이 확장', title2: '드라이브 자동화' },
  'humanizing-prompt-engineering': { badge: '🌿 인간화 프롬프트', title1: '죽은 글 살리기', title2: '인간화 프롬프트' },
  'gemini-vs-chatgpt-guide': { badge: '🥊 모델 맞대결', title1: 'Gemini vs ChatGPT', title2: '실전 비교 가이드' }
};

export function parseHookingCopy(post) {
  const id = post.id || '';
  if (PUNCHY_HOOK_MAP[id]) {
    const item = PUNCHY_HOOK_MAP[id];
    return {
      badge: item.badge,
      title1: item.title1,
      title2: item.title2,
      subTag: (post.excerpt || '2026 대한민국 1위 AI 포털').slice(0, 20) + '...'
    };
  }

  // Fallback
  const rawTitle = (post.title || '').trim().replace(/\[.*?\]/g, '').replace(/["'“”]/g, '');
  const words = rawTitle.split(/[:—\- ]/).filter(w => w.trim().length > 0);
  const mid = Math.ceil(words.length / 2);
  const title1 = words.slice(0, Math.min(2, mid)).join(' ');
  const title2 = words.slice(Math.min(2, mid), Math.min(5, words.length)).join(' ') || '핵심 가이드';

  return {
    badge: post.tags && post.tags[0] ? post.tags[0] : '2026 AI 트렌드',
    title1: title1.slice(0, 8),
    title2: title2.slice(0, 8),
    subTag: (post.excerpt || '2026 대한민국 1위 AI 포털').slice(0, 20) + '...'
  };
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
// -----------------------------------------------------------------------------
export function renderThematicBackgroundScene(theme, w = 1280, h = 720) {
  switch (theme) {
    case 'bank_security':
      return `
        <!-- Bank Vault & Cyber Security Scene -->
        <rect width="${w}" height="${h}" fill="#050813"/>
        <radialGradient id="vaultGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.8"/>
          <stop offset="60%" stop-color="#091024" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020408" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#vaultGlow)"/>

        <!-- High-Tech Heavy Steel Vault Door Rings -->
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.4">
          <circle cx="0" cy="0" r="320" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="24,12"/>
          <circle cx="0" cy="0" r="260" fill="none" stroke="#60a5fa" stroke-width="8"/>
          <circle cx="0" cy="0" r="200" fill="none" stroke="#93c5fd" stroke-width="3" stroke-dasharray="8,8"/>
          <line x1="-300" y1="0" x2="300" y2="0" stroke="#38bdf8" stroke-width="4"/>
          <line x1="0" y1="-300" x2="0" y2="300" stroke="#38bdf8" stroke-width="4"/>
          <line x1="-210" y1="-210" x2="210" y2="210" stroke="#38bdf8" stroke-width="3"/>
          <line x1="-210" y1="210" x2="210" y2="-210" stroke="#38bdf8" stroke-width="3"/>
        </g>
        <g transform="translate(140, 140)" opacity="0.5">
          <polygon points="0,-60 50,-30 50,30 0,60 -50,30 -50,-30" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <circle cx="0" cy="-5" r="14" fill="#fbbf24"/>
          <rect x="-10" y="-5" width="20" height="22" rx="4" fill="#f59e0b"/>
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
        <g opacity="0.4" transform="translate(60, 40)">
          <rect x="50" y="240" width="30" height="120" rx="4" fill="#10b981"/>
          <line x1="65" y1="180" x2="65" y2="420" stroke="#10b981" stroke-width="3"/>
          <rect x="120" y="190" width="30" height="180" rx="4" fill="#10b981"/>
          <line x1="135" y1="120" x2="135" y2="400" stroke="#10b981" stroke-width="3"/>
          <rect x="${w - 310}" y="110" width="30" height="230" rx="4" fill="#fbbf24"/>
          <line x1="${w - 295}" y1="50" x2="${w - 295}" y2="360" stroke="#fbbf24" stroke-width="3"/>
          <rect x="${w - 240}" y="70" width="30" height="280" rx="4" fill="#10b981"/>
          <line x1="${w - 225}" y1="20" x2="${w - 225}" y2="370" stroke="#10b981" stroke-width="3"/>
        </g>
        <path d="M 0 650 Q 450 550 800 320 T 1280 80" fill="none" stroke="#fbbf24" stroke-width="6" opacity="0.45"/>
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
        <g opacity="0.35" transform="translate(80, 80) rotate(-6)">
          <rect width="400" height="260" rx="14" fill="#0f172a" stroke="#818cf8" stroke-width="3"/>
          <circle cx="25" cy="20" r="5" fill="#ef4444"/>
          <circle cx="45" cy="20" r="5" fill="#facc15"/>
          <circle cx="65" cy="20" r="5" fill="#22c55e"/>
          <line x1="25" y1="60" x2="280" y2="60" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="90" x2="200" y2="90" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="120" x2="340" y2="120" stroke="#4ade80" stroke-width="6" stroke-linecap="round"/>
        </g>
        <g opacity="0.35" transform="translate(${w - 480}, 280) rotate(8)">
          <rect width="420" height="280" rx="14" fill="#0f172a" stroke="#c084fc" stroke-width="3"/>
          <line x1="25" y1="60" x2="320" y2="60" stroke="#fbbf24" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="90" x2="240" y2="90" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
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
        <g opacity="0.35" transform="translate(100, 100) rotate(-12)">
          <rect width="220" height="300" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <line x1="30" y1="50" x2="190" y2="50" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <line x1="30" y1="80" x2="150" y2="80" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <circle cx="170" cy="250" r="22" fill="#0284c7"/>
          <text x="170" y="256" text-anchor="middle" font-family="sans-serif" font-weight="900" fill="#ffffff" font-size="14">PDF</text>
        </g>
        <g opacity="0.35" transform="translate(${w - 320}, 140) rotate(15)">
          <rect width="220" height="300" rx="12" fill="#0f172a" stroke="#818cf8" stroke-width="2"/>
          <line x1="30" y1="50" x2="190" y2="50" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
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
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.35">
          <circle cx="0" cy="0" r="300" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="16,8"/>
          <circle cx="0" cy="0" r="220" fill="none" stroke="#818cf8" stroke-width="3"/>
          <circle cx="0" cy="0" r="140" fill="none" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="6,6"/>
          <line x1="-300" y1="-120" x2="300" y2="120" stroke="#38bdf8" stroke-width="2"/>
          <line x1="-200" y1="200" x2="200" y2="-200" stroke="#c084fc" stroke-width="2"/>
        </g>
      `;
  }
}

// ==============================================================================
// STYLE 1: Eco Clean / Fresh News 3D Ribbon (Reference: "한국형 무공해차")
// ==============================================================================
export function renderStyle1_FreshNews(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = 135;
  const title2Size = 145;
  const boxWidth = Math.max(820, title1.length * 105 + 100);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s1BoxGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <linearGradient id="s1ArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>

    <filter id="s1Shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- 1. Content-Aware Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Contrast Preserver -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.3"/>

  <!-- 3. Yellow Circular Orbiting Arrow -->
  <g transform="translate(${w / 2}, ${h / 2 - 20}) rotate(-12)" filter="url(#s1Shadow)">
    <path d="M -340 0 A 340 260 0 1 1 310 90" fill="none" stroke="url(#s1ArrowGrad)" stroke-width="26" stroke-linecap="round"/>
    <polygon points="310,40 370,105 280,125" fill="#f59e0b"/>
    <path d="M 320 -140 L 330 -115 L 355 -105 L 330 -95 L 320 -70 L 310 -95 L 285 -105 L 310 -115 Z" fill="#fbbf24"/>
  </g>

  <!-- 4. Central Giant Typography (-6.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-6.5)" filter="url(#s1Shadow)">
    
    <!-- Top Curved Category Arch -->
    <g transform="translate(0, -125)">
      <path d="M -180 25 Q 0 -25 180 25" fill="none" stroke="#1e40af" stroke-width="44" stroke-linecap="round"/>
      <text x="0" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="26" font-weight="900" fill="#ffffff">
        ${escapeXml(badge)}
      </text>
    </g>

    <!-- 3D Ribbon Box for Title 1 -->
    <g transform="translate(0, 5)">
      <polygon points="${-boxWidth / 2 + 10},-70 ${boxWidth / 2 + 50},-70 ${boxWidth / 2 - 10},80 ${-boxWidth / 2 - 50},80" fill="#000000" opacity="0.75"/>
      <polygon points="${-boxWidth / 2},-80 ${boxWidth / 2 + 40},-80 ${boxWidth / 2 - 20},70 ${-boxWidth / 2 - 60},70" fill="url(#s1BoxGrad)"/>
      <polygon points="${-boxWidth / 2},-80 ${boxWidth / 2 + 40},-80 ${boxWidth / 2 + 35},-65 ${-boxWidth / 2 - 5},-65" fill="#ffffff" opacity="0.45"/>
      
      <text x="-5" y="24" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Title 2 (Massive Solid Blue Text with 3D White/Dark Outlines) -->
    <g transform="translate(0, 160)">
      <text x="0" y="14" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#38bdf8" stroke="#ffffff" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Crisp Subtitle Pill -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#s1Shadow)">
    <rect x="-300" y="-22" width="600" height="44" rx="22" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="20" font-weight="800" fill="#ffffff">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// ==============================================================================
// STYLE 2: Comic Pop / Starburst Electric Punch (Reference: "슬기로운 전기차생활")
// ==============================================================================
export function renderStyle2_ComicPop(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = 135;
  const title2Size = 145;
  const boxWidth = Math.max(800, title1.length * 105 + 80);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s2StarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>

    <filter id="s2ComicShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="20" stdDeviation="26" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- 1. Content-Aware Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>

  <!-- 3. Giant Comic Starburst Backdrop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s2ComicShadow)">
    <polygon points="
      0,-270 55,-140 200,-250 145,-110 300,-140 185,-20 330,30 185,90 270,220 130,165 155,295 30,185
      -20,295 -65,175 -200,260 -145,120 -310,150 -200,20 -330,-40 -185,-90 -270,-210 -120,-155 -130,-285 -20,-175
    " fill="url(#s2StarGrad)" stroke="#000000" stroke-width="14"/>

    <polygon points="230,-190 255,-130 225,-125 270,-65 235,-75 260,-10 205,-70 230,-75" fill="#facc15" stroke="#000000" stroke-width="5"/>
    <polygon points="-230,130 -255,75 -225,70 -270,10 -235,20 -260,-45 -205,15 -230,20" fill="#facc15" stroke="#000000" stroke-width="5"/>
  </g>

  <!-- 4. Electric Plug Wire Loop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#s2ComicShadow)">
    <path d="M -380 10 Q -440 130 -220 175 Q 220 195 380 110" fill="none" stroke="#000000" stroke-width="26" stroke-linecap="round"/>
    <path d="M 370 105 L 420 120 L 400 160 L 350 145 Z" fill="#000000"/>
    <rect x="415" y="115" width="24" height="7" fill="#fbbf24" stroke="#000000" stroke-width="2"/>
    <rect x="405" y="138" width="24" height="7" fill="#fbbf24" stroke="#000000" stroke-width="2"/>
  </g>

  <!-- 5. Central Giant Dynamic Headline (-4 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-4)" filter="url(#s2ComicShadow)">
    
    <!-- Top Black Box for Title 1 -->
    <g transform="translate(0, -65)">
      <rect x="${-boxWidth / 2}" y="-70" width="${boxWidth}" height="135" rx="18" fill="#000000" stroke="#000000" stroke-width="8"/>
      <text x="0" y="28" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Bottom Giant Neon Text for Title 2 -->
    <g transform="translate(0, 95)">
      <text x="0" y="16" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>

      <g transform="translate(${Math.min(300, title2.length * 40)}, -40)">
        <polygon points="0,-28 18,0 3,0 14,28 -18,6 0,6" fill="#38bdf8" stroke="#000000" stroke-width="4"/>
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
// ==============================================================================
export function renderStyle3_StreetGraffiti(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = 130;
  const title2Size = 145;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <pattern id="s3CautionPattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="30" height="60" fill="#facc15"/>
      <rect x="30" width="30" height="60" fill="#000000"/>
    </pattern>

    <filter id="s3Shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="20" stdDeviation="26" flood-color="#000000" flood-opacity="0.9"/>
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
      0,-240 60,-80 230,-80 100,35 150,200 0,105 -150,200 -100,35 -230,-80 -60,-80
    " fill="#000000" stroke="#ccff00" stroke-width="6"/>
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
    <g transform="translate(0, -100)">
      <rect x="-150" y="-22" width="300" height="44" rx="8" fill="#ffffff" stroke="#000000" stroke-width="4"/>
      <text x="0" y="8" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="20" font-weight="900" fill="#000000" letter-spacing="2">
        ✦ ${escapeXml(badge)}
      </text>
    </g>

    <!-- Line 1 (White Ultra Bold with Thick Black Shadow) -->
    <g transform="translate(0, 5)">
      <text x="0" y="10" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Line 2 (Massive Acid Volt Neon with 3D Extrusion) -->
    <g transform="translate(0, 130)">
      <text x="0" y="18" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="28" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#ccff00" stroke="#000000" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">
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
// ==============================================================================
export function renderStyle4_EditorialKinetic(w, h, post, variantIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const title1Size = 135;
  const title2Size = 145;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <filter id="s4Shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
  </defs>

  <!-- 1. Content-Aware Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>

  <!-- 3. Repeated Wireframe Outline Typography Echoes (Top & Bottom) -->
  <g transform="translate(${w / 2}, 110) rotate(-4.5) skewX(-4)" opacity="0.35">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="135" font-weight="900" fill="none" stroke="#38bdf8" stroke-width="3" letter-spacing="-4">
      ${escapeXml(title1)} ${escapeXml(title2)}
    </text>
  </g>
  <g transform="translate(${w / 2}, ${h - 40}) rotate(-4.5) skewX(-4)" opacity="0.35">
    <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="135" font-weight="900" fill="none" stroke="#38bdf8" stroke-width="3" letter-spacing="-4">
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
    <g transform="translate(0, -100)">
      <rect x="-130" y="-20" width="260" height="40" rx="20" fill="#a855f7"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="18" font-weight="900" fill="#ffffff">
        ${escapeXml(badge)}
      </text>
    </g>

    <!-- Main Solid Bold White Headline (Line 1) -->
    <g transform="translate(0, 15)">
      <text x="0" y="12" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title1Size}" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Line 2 (Second Line with High Contrast Color) -->
    <g transform="translate(0, 130)">
      <text x="0" y="12" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="'Paperlogy', 'Paperlogy-9Black', sans-serif" font-size="${title2Size}" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-4">
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
  console.log('🚀 Generating Giant 135-145px Ultra-Sharp Hook Thumbnails for all 59 posts...');
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

  console.log(`✅ Successfully generated ${count} giant 140px crystal-clear thumbnails in ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllHookThumbnails().catch(console.error);
}
