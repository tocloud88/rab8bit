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
// Curated Short 2-Line Mega-Punchy Hooking Dictionary (Strict 3~6 chars per line)
// Guarantees Giant 135px~160px Text Size with ZERO Clutter across all 59 posts
// -----------------------------------------------------------------------------
export const PUNCHY_HOOK_MAP = {
  'daily-tech-insight-2026-09-14': { badge: '⚡ 100만 토큰', title1: '100만 토큰', title2: '대형 문서 분석' },
  'daily-tech-insight-2026-09-13': { badge: '🚀 바이브 코딩', title1: '바이브 코딩', title2: '1인 창업 스택' },
  'daily-tech-insight-2026-09-12': { badge: '🤖 AI 에이전트', title1: 'AI 에이전트', title2: '업무 자동화' },
  'ai-big-4-comparison-chatgpt-gemini-claude-grok': { badge: '⚔️ 플래그십', title1: 'AI 4대 천왕', title2: '끝장 맞대결' },
  'openai-gpt-6-astra-release-analysis': { badge: '🔥 OpenAI 충격', title1: 'GPT-6 Astra', title2: 'PC 직접 조작' },
  'ai-self-explanation-verification-guide': { badge: '⚠️ 환각 주의', title1: '모델 자기설명', title2: '믿지 마세요!' },
  'ai-side-hustle-course-verification-guide': { badge: '💰 재테크 검증', title1: 'AI 부업 강의', title2: '가짜 강사 거르기' },
  'openai-pauses-training-google-opens-chrome': { badge: '🌐 빅테크 격돌', title1: '오픈AI 멈춤', title2: '구글 크롬 개방' },
  'why-ai-websites-look-same-claude-skills-solution': { badge: '🎨 웹 디자인', title1: '똑같은 AI 웹', title2: '클로드로 탈출' },
  'gemini-paper-report-three-line-summary-guide': { badge: '📑 논문 요약', title1: '제미나이로', title2: '논문 3줄 요약' },
  'ai-meeting-minutes-action-plan-chatgpt-prompt': { badge: '⏱️ 업무 단축', title1: '회의록 한숨 끝', title2: 'AI로 업무 단축' },
  'ai-advisor-not-yesman-remove-intention-from-prompts': { badge: '💡 질문의 기술', title1: '예스맨 AI를', title2: '조언자로 변신' },
  'lessons-from-building-90-ai-tools': { badge: '🛠️ 인디 해킹', title1: 'AI 앱 90개', title2: '직접 만든 후기' },
  'adsense-rejected-ai-cooload-robots-txt-fix': { badge: '💵 애드센스', title1: '애드센스 거절', title2: '클로드가 해결' },
  'recover-lost-returns-stock-analysis-prompt': { badge: '📈 주가 분석', title1: '잃어버린 수익', title2: 'AI 주가 프롬프트' },
  'retro-game-site-deployer': { badge: '🎮 8비트 게임', title1: '레트로 게임', title2: '앱 원클릭 제작' },
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
      subTag: (post.excerpt || '2026 대한민국 1위 AI 포털').slice(0, 24) + '...'
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
    title1: title1.slice(0, 7),
    title2: title2.slice(0, 7),
    subTag: (post.excerpt || '2026 대한민국 1위 AI 포털').slice(0, 24) + '...'
  };
}

// -----------------------------------------------------------------------------
// Detect Specific Content Scene Theme (20 Content-Aware Domains)
// -----------------------------------------------------------------------------
export function detectSceneTheme(post) {
  const id = post.id || '';
  const title = post.title || '';
  const tags = (post.tags || []).join(' ');
  const excerpt = post.excerpt || '';
  const text = (id + ' ' + title + ' ' + tags + ' ' + excerpt).toLowerCase();

  if (text.includes('통장') || text.includes('보안') || text.includes('bank') || text.includes('취약') || text.includes('위험')) {
    return 'bank_security';
  } else if (text.includes('주가') || text.includes('주식') || text.includes('재테크') || text.includes('수익률') || text.includes('투자') || text.includes('부업')) {
    return 'stock_trading';
  } else if (text.includes('바이브') || text.includes('90개') || text.includes('개발') || text.includes('bolt') || text.includes('supabase')) {
    return 'vibe_coding';
  } else if (text.includes('gpt-6') || text.includes('astra') || text.includes('에이전트') || text.includes('agent') || text.includes('브라우저')) {
    return 'ai_agent_lab';
  } else if (text.includes('claude') || text.includes('클로드') || text.includes('쿼터') || text.includes('아티팩트')) {
    return 'claude_workspace';
  } else if (text.includes('gemini') || text.includes('제미나이') || text.includes('google ai') || text.includes('구글') || text.includes('익스텐션')) {
    return 'gemini_lab';
  } else if (text.includes('논문') || text.includes('보고서') || text.includes('100만') || text.includes('notebooklm') || text.includes('문서') || text.includes('연구')) {
    return 'document_archive';
  } else if (text.includes('애드센스') || text.includes('seo') || text.includes('aeo') || text.includes('검색') || text.includes('트래픽') || text.includes('스냅블로그')) {
    return 'seo_traffic';
  } else if (text.includes('이미지') || text.includes('미드저니') || text.includes('나노바나나') || text.includes('인포그래픽') || text.includes('그림')) {
    return 'creative_media';
  } else if (text.includes('lyria') || text.includes('음악') || text.includes('작곡') || text.includes('오디오') || text.includes('숏츠')) {
    return 'music_audio';
  } else if (text.includes('쇼핑') || text.includes('할인') || text.includes('가짜') || text.includes('가격비교')) {
    return 'smart_shopping';
  } else if (text.includes('월드컵') || text.includes('축구') || text.includes('게임') || text.includes('레트로') || text.includes('낚시')) {
    return 'retro_gaming';
  } else if (text.includes('터미널') || text.includes('cli') || text.includes('마크다운') || text.includes('html') || text.includes('파일 정리')) {
    return 'terminal_hacker';
  } else if (text.includes('엑셀') || text.includes('회의록') || text.includes('생산성') || text.includes('직장인') || text.includes('100배')) {
    return 'smart_productivity';
  } else if (text.includes('부동산') || text.includes('안드로이드') || text.includes('모바일') || text.includes('앱')) {
    return 'mobile_app';
  } else if (text.includes('마케팅') || text.includes('광고') || text.includes('블로거')) {
    return 'marketing_growth';
  } else if (text.includes('저널') || text.includes('서재') || text.includes('라이브러리') || text.includes('270개')) {
    return 'learning_journal';
  } else if (text.includes('메타') || text.includes('한계') || text.includes('프롬프트')) {
    return 'meta_prompting';
  } else if (text.includes('인간화') || text.includes('창의력') || text.includes('작가') || text.includes('글쓰기')) {
    return 'humanizing_ai';
  } else {
    return 'ai_core_universe';
  }
}

// -----------------------------------------------------------------------------
// 20 Rich Thematic Realistic Background Scene Generators (1280x720)
// -----------------------------------------------------------------------------
export function renderThematicBackgroundScene(theme, w = 1280, h = 720) {
  switch (theme) {
    case 'bank_security':
      return `
        <rect width="${w}" height="${h}" fill="#050813"/>
        <radialGradient id="bgVaultGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#020408" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgVaultGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.4">
          <circle cx="0" cy="0" r="320" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="24,12"/>
          <circle cx="0" cy="0" r="260" fill="none" stroke="#60a5fa" stroke-width="8"/>
          <line x1="-300" y1="0" x2="300" y2="0" stroke="#38bdf8" stroke-width="4"/>
          <line x1="0" y1="-300" x2="0" y2="300" stroke="#38bdf8" stroke-width="4"/>
        </g>
        <g transform="translate(140, 140)" opacity="0.6">
          <polygon points="0,-60 50,-30 50,30 0,60 -50,30 -50,-30" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
          <circle cx="0" cy="-5" r="14" fill="#fbbf24"/>
          <rect x="-10" y="-5" width="20" height="22" rx="4" fill="#f59e0b"/>
        </g>
      `;

    case 'stock_trading':
      return `
        <rect width="${w}" height="${h}" fill="#030908"/>
        <radialGradient id="bgStockGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#064e3b" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#010a08" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgStockGlow)"/>
        <g opacity="0.45" transform="translate(60, 40)">
          <rect x="50" y="240" width="36" height="130" rx="4" fill="#10b981"/>
          <line x1="68" y1="180" x2="68" y2="430" stroke="#10b981" stroke-width="4"/>
          <rect x="130" y="190" width="36" height="190" rx="4" fill="#10b981"/>
          <line x1="148" y1="120" x2="148" y2="410" stroke="#10b981" stroke-width="4"/>
          <rect x="${w - 280}" y="90" width="36" height="260" rx="4" fill="#10b981"/>
          <line x1="${w - 262}" y1="30" x2="${w - 262}" y2="390" stroke="#10b981" stroke-width="4"/>
        </g>
        <path d="M 0 650 Q 450 550 800 300 T 1280 60" fill="none" stroke="#fbbf24" stroke-width="8" opacity="0.55"/>
      `;

    case 'vibe_coding':
      return `
        <rect width="${w}" height="${h}" fill="#080718"/>
        <radialGradient id="bgVibeGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#3b0764" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#060212" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgVibeGlow)"/>
        <g opacity="0.4" transform="translate(80, 70) rotate(-6)">
          <rect width="400" height="260" rx="14" fill="#0f172a" stroke="#818cf8" stroke-width="3"/>
          <circle cx="25" cy="20" r="5" fill="#ef4444"/><circle cx="45" cy="20" r="5" fill="#facc15"/><circle cx="65" cy="20" r="5" fill="#22c55e"/>
          <line x1="25" y1="60" x2="280" y2="60" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="90" x2="200" y2="90" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="120" x2="340" y2="120" stroke="#4ade80" stroke-width="6" stroke-linecap="round"/>
        </g>
        <g opacity="0.4" transform="translate(${w - 460}, 260) rotate(8)">
          <rect width="400" height="260" rx="14" fill="#0f172a" stroke="#c084fc" stroke-width="3"/>
          <line x1="25" y1="60" x2="320" y2="60" stroke="#fbbf24" stroke-width="6" stroke-linecap="round"/>
          <line x1="25" y1="90" x2="240" y2="90" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
        </g>
      `;

    case 'document_archive':
      return `
        <rect width="${w}" height="${h}" fill="#030814"/>
        <radialGradient id="bgDocGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#0c4a6e" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#01060a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgDocGlow)"/>
        <g opacity="0.4" transform="translate(100, 90) rotate(-12)">
          <rect width="220" height="300" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <rect x="25" y="40" width="170" height="16" rx="4" fill="#38bdf8"/>
          <rect x="25" y="70" width="140" height="10" rx="3" fill="#64748b"/>
          <rect x="25" y="90" width="160" height="10" rx="3" fill="#64748b"/>
        </g>
        <g opacity="0.4" transform="translate(${w - 320}, 160) rotate(10)">
          <rect width="240" height="320" rx="12" fill="#0f172a" stroke="#60a5fa" stroke-width="3"/>
          <rect x="30" y="40" width="180" height="18" rx="4" fill="#60a5fa"/>
          <rect x="30" y="80" width="160" height="10" rx="3" fill="#64748b"/>
        </g>
      `;

    case 'ai_agent_lab':
      return `
        <rect width="${w}" height="${h}" fill="#040914"/>
        <radialGradient id="bgAgentGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#02040a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgAgentGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.45">
          <circle cx="0" cy="0" r="280" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="16,8"/>
          <circle cx="-160" cy="-80" r="28" fill="#4f46e5" stroke="#a5b4fc" stroke-width="3"/>
          <circle cx="160" cy="-80" r="28" fill="#4f46e5" stroke="#a5b4fc" stroke-width="3"/>
          <circle cx="0" cy="140" r="32" fill="#4338ca" stroke="#c7d2fe" stroke-width="4"/>
          <line x1="-132" y1="-80" x2="132" y2="-80" stroke="#818cf8" stroke-width="3"/>
          <line x1="-140" y1="-55" x2="-20" y2="120" stroke="#818cf8" stroke-width="3"/>
          <line x1="140" y1="-55" x2="20" y2="120" stroke="#818cf8" stroke-width="3"/>
        </g>
      `;

    case 'claude_workspace':
      return `
        <rect width="${w}" height="${h}" fill="#0d0814"/>
        <radialGradient id="bgClaudeGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#581c87" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#06020c" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgClaudeGlow)"/>
        <g opacity="0.4" transform="translate(100, 100)">
          <circle cx="80" cy="80" r="80" fill="none" stroke="#d8b4fe" stroke-width="4"/>
          <polygon points="80,10 130,80 80,150 30,80" fill="#a855f7"/>
        </g>
        <g opacity="0.4" transform="translate(${w - 240}, 160)">
          <circle cx="80" cy="80" r="80" fill="none" stroke="#f472b6" stroke-width="4"/>
          <polygon points="80,10 130,80 80,150 30,80" fill="#ec4899"/>
        </g>
      `;

    case 'gemini_lab':
      return `
        <rect width="${w}" height="${h}" fill="#030816"/>
        <radialGradient id="bgGeminiGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#7e22ce" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#02040d" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgGeminiGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.45">
          <path d="M 0 -220 Q 20 -20 220 0 Q 20 20 0 220 Q -20 20 -220 0 Q -20 -20 0 -220 Z" fill="none" stroke="#60a5fa" stroke-width="5"/>
          <path d="M 0 -140 Q 15 -15 140 0 Q 15 15 0 140 Q -15 15 -140 0 Q -15 -15 0 -140 Z" fill="#38bdf8" opacity="0.3"/>
        </g>
      `;

    case 'seo_traffic':
      return `
        <rect width="${w}" height="${h}" fill="#040d12"/>
        <radialGradient id="bgSeoGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#0f766e" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#010609" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgSeoGlow)"/>
        <g opacity="0.45" transform="translate(100, 80)">
          <rect width="360" height="70" rx="14" fill="#0f172a" stroke="#2dd4bf" stroke-width="3"/>
          <circle cx="35" cy="35" r="14" fill="#fbbf24"/>
          <text x="35" y="41" font-size="16" font-weight="900" fill="#000000" text-anchor="middle">#1</text>
          <line x1="70" y1="35" x2="280" y2="35" stroke="#2dd4bf" stroke-width="6" stroke-linecap="round"/>
        </g>
        <path d="M 0 620 L 400 500 L 700 380 L 1000 240 L 1280 80" fill="none" stroke="#2dd4bf" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
      `;

    case 'creative_media':
      return `
        <rect width="${w}" height="${h}" fill="#120512"/>
        <radialGradient id="bgCreativeGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#831843" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#080208" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgCreativeGlow)"/>
        <g opacity="0.4" transform="translate(120, 100) rotate(-10)">
          <rect width="260" height="200" rx="16" fill="#0f172a" stroke="#f43f5e" stroke-width="4"/>
          <circle cx="70" cy="70" r="30" fill="#fbbf24"/>
          <polygon points="40,160 120,90 190,160" fill="#f43f5e"/>
        </g>
      `;

    case 'music_audio':
      return `
        <rect width="${w}" height="${h}" fill="#080318"/>
        <radialGradient id="bgAudioGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#4c1d95" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#04010d" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgAudioGlow)"/>
        <g opacity="0.45" transform="translate(100, 320)">
          <rect x="0" y="-120" width="24" height="240" rx="10" fill="#c084fc"/>
          <rect x="40" y="-180" width="24" height="360" rx="10" fill="#a855f7"/>
          <rect x="80" y="-80" width="24" height="160" rx="10" fill="#818cf8"/>
          <rect x="120" y="-150" width="24" height="300" rx="10" fill="#38bdf8"/>
          <rect x="${w - 240}" y="-160" width="24" height="320" rx="10" fill="#f472b6"/>
          <rect x="${w - 200}" y="-200" width="24" height="400" rx="10" fill="#ec4899"/>
          <rect x="${w - 160}" y="-100" width="24" height="200" rx="10" fill="#c084fc"/>
        </g>
      `;

    case 'smart_shopping':
      return `
        <rect width="${w}" height="${h}" fill="#0c0704"/>
        <radialGradient id="bgShopGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#7c2d12" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#080301" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgShopGlow)"/>
        <g opacity="0.45" transform="translate(140, 140) rotate(-15)">
          <polygon points="0,0 120,-30 180,90 60,120" fill="#ea580c" stroke="#fed7aa" stroke-width="4"/>
          <circle cx="45" cy="25" r="10" fill="#ffffff"/>
          <text x="100" y="65" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">SALE</text>
        </g>
      `;

    case 'retro_gaming':
      return `
        <rect width="${w}" height="${h}" fill="#060914"/>
        <radialGradient id="bgGameGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#02040a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgGameGlow)"/>
        <g opacity="0.4" transform="translate(100, 120)">
          <rect width="240" height="120" rx="18" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
          <circle cx="50" cy="60" r="24" fill="#38bdf8"/>
          <circle cx="170" cy="50" r="12" fill="#ef4444"/>
          <circle cx="200" cy="70" r="12" fill="#facc15"/>
        </g>
      `;

    case 'terminal_hacker':
      return `
        <rect width="${w}" height="${h}" fill="#020804"/>
        <radialGradient id="bgTermGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#064e3b" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#010402" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgTermGlow)"/>
        <g opacity="0.4" transform="translate(100, 100)">
          <rect width="360" height="220" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="3"/>
          <text x="25" y="45" font-family="monospace" font-size="18" fill="#10b981">&gt; claude code --run</text>
          <text x="25" y="80" font-family="monospace" font-size="16" fill="#34d399">✔ 270 files organized</text>
        </g>
      `;

    case 'smart_productivity':
      return `
        <rect width="${w}" height="${h}" fill="#030c14"/>
        <radialGradient id="bgProdGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#0369a1" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#01050a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgProdGlow)"/>
        <g opacity="0.45" transform="translate(120, 110)">
          <circle cx="80" cy="80" r="70" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
          <line x1="80" y1="80" x2="80" y2="35" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>
          <line x1="80" y1="80" x2="115" y2="80" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>
        </g>
      `;

    case 'mobile_app':
      return `
        <rect width="${w}" height="${h}" fill="#0a0518"/>
        <radialGradient id="bgMobGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#581c87" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#04010d" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgMobGlow)"/>
        <g opacity="0.4" transform="translate(120, 80) rotate(-10)">
          <rect width="180" height="340" rx="28" fill="#0f172a" stroke="#c084fc" stroke-width="4"/>
          <line x1="60" y1="20" x2="120" y2="20" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
        </g>
      `;

    case 'marketing_growth':
      return `
        <rect width="${w}" height="${h}" fill="#0e0412"/>
        <radialGradient id="bgMktGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#86198f" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#07010a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgMktGlow)"/>
        <g opacity="0.4" transform="translate(140, 140) rotate(-20)">
          <polygon points="0,40 100,0 100,80" fill="#ec4899" stroke="#fbcfe8" stroke-width="4"/>
          <rect x="100" y="20" width="40" height="40" rx="8" fill="#a21caf"/>
        </g>
      `;

    case 'learning_journal':
      return `
        <rect width="${w}" height="${h}" fill="#040a14"/>
        <radialGradient id="bgLearnGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#02040a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgLearnGlow)"/>
        <g opacity="0.4" transform="translate(100, 100)">
          <polygon points="20,160 140,120 260,160 260,60 140,20 20,60" fill="#0f172a" stroke="#60a5fa" stroke-width="4"/>
          <line x1="140" y1="20" x2="140" y2="120" stroke="#60a5fa" stroke-width="4"/>
        </g>
      `;

    case 'meta_prompting':
      return `
        <rect width="${w}" height="${h}" fill="#080414"/>
        <radialGradient id="bgMetaGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#6d28d9" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#03010a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgMetaGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.4">
          <polygon points="0,-180 160,-60 160,120 0,200 -160,120 -160,-60" fill="none" stroke="#a78bfa" stroke-width="4"/>
          <polygon points="0,-120 100,-40 100,80 0,130 -100,80 -100,-40" fill="#6d28d9" opacity="0.3"/>
        </g>
      `;

    case 'humanizing_ai':
      return `
        <rect width="${w}" height="${h}" fill="#020c0a"/>
        <radialGradient id="bgHumGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#0f766e" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#010605" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgHumGlow)"/>
        <g opacity="0.45" transform="translate(120, 120)">
          <path d="M 80 20 C 30 20 0 60 0 110 C 0 170 80 220 80 220 C 80 220 160 170 160 110 C 160 60 130 20 80 20 Z" fill="#14b8a6" stroke="#99f6e4" stroke-width="4"/>
        </g>
      `;

    case 'ai_core_universe':
    default:
      return `
        <rect width="${w}" height="${h}" fill="#040612"/>
        <radialGradient id="bgCoreGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="#0f172a" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#02040a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgCoreGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.4">
          <circle cx="0" cy="0" r="260" fill="none" stroke="#6366f1" stroke-width="3" stroke-dasharray="16,8"/>
          <circle cx="0" cy="0" r="160" fill="none" stroke="#38bdf8" stroke-width="2"/>
        </g>
      `;
  }
}

// ==============================================================================
// 20 DISTINCT MASTER TYPOGRAPHY STYLES (Style 1 ~ Style 20)
// ==============================================================================

// Helper: Common Heavy Filter
const DROP_SHADOW_FILTER = `
  <filter id="megaShadow" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000000" flood-opacity="0.98"/>
  </filter>
`;

// STYLE 1: Fresh News 3D Ribbon (Blue 3D Slanted Ribbon + Yellow Orbit)
export function renderStyle1(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const boxWidth = Math.max(820, title1.length * 115 + 100);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>
    <g transform="translate(${w / 2}, ${h / 2 - 20}) rotate(-12)" filter="url(#megaShadow)">
      <path d="M -340 0 A 340 260 0 1 1 310 90" fill="none" stroke="#facc15" stroke-width="26" stroke-linecap="round"/>
      <polygon points="310,40 370,105 280,125" fill="#f59e0b"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-6.5)" filter="url(#megaShadow)">
      <g transform="translate(0, -125)">
        <path d="M -180 25 Q 0 -25 180 25" fill="none" stroke="#1e40af" stroke-width="44" stroke-linecap="round"/>
        <text x="0" y="16" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="26" font-weight="900" fill="#ffffff">${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 5)">
        <polygon points="${-boxWidth / 2},-80 ${boxWidth / 2 + 40},-80 ${boxWidth / 2 - 20},70 ${-boxWidth / 2 - 60},70" fill="#2563eb"/>
        <text x="-5" y="24" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 160)">
        <text x="0" y="14" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="28" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#38bdf8" stroke="#ffffff" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-300" y="-22" width="600" height="44" rx="22" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="#ffffff">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 2: Comic Pop Starburst (Electric Starburst + Giant Yellow 3D Punch)
export function renderStyle2(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const boxWidth = Math.max(800, title1.length * 115 + 90);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <polygon points="0,-270 55,-140 200,-250 145,-110 300,-140 185,-20 330,30 185,90 270,220 130,165 155,295 30,185 -20,295 -65,175 -200,260 -145,120 -310,150 -200,20 -330,-40 -185,-90 -270,-210 -120,-155 -130,-285 -20,-175" fill="#1e3a8a" stroke="#000000" stroke-width="14"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-4)" filter="url(#megaShadow)">
      <g transform="translate(0, -65)">
        <rect x="${-boxWidth / 2}" y="-70" width="${boxWidth}" height="135" rx="18" fill="#000000" stroke="#000000" stroke-width="8"/>
        <text x="0" y="28" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="138" font-weight="900" fill="#ffffff" letter-spacing="-3">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 95)">
        <text x="0" y="16" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-280" y="-22" width="560" height="44" rx="22" fill="#e11d48" stroke="#000000" stroke-width="4"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="#ffffff">⚡ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 3: Street Graffiti & Caution Tape (Volt Lime + Caution Strips)
export function renderStyle3(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      ${DROP_SHADOW_FILTER}
      <pattern id="s3Tape" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="30" height="60" fill="#facc15"/>
        <rect x="30" width="30" height="60" fill="#000000"/>
      </pattern>
    </defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>
    <g transform="translate(-80, 50) rotate(-22)" filter="url(#megaShadow)">
      <rect width="450" height="42" fill="url(#s3Tape)"/>
    </g>
    <g transform="translate(${w - 320}, ${h - 20}) rotate(-18)" filter="url(#megaShadow)">
      <rect width="450" height="42" fill="url(#s3Tape)"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <polygon points="0,-240 60,-80 230,-80 100,35 150,200 0,105 -150,200 -100,35 -230,-80 -60,-80" fill="#000000" stroke="#ccff00" stroke-width="6"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-3)" filter="url(#megaShadow)">
      <g transform="translate(0, -95)">
        <rect x="-160" y="-22" width="320" height="44" rx="8" fill="#ffffff"/>
        <text x="0" y="8" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="22" font-weight="900" fill="#000000">✦ ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 10)">
        <text x="0" y="10" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="138" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-3">${escapeXml(title1)}</text>
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="138" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 140)">
        <text x="0" y="18" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="28" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#ccff00" stroke="#000000" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55}) rotate(2)" filter="url(#megaShadow)">
      <rect x="-260" y="-20" width="520" height="40" rx="8" fill="#ccff00" stroke="#000000" stroke-width="4"/>
      <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#000000">🔥 ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 4: Editorial Kinetic Dark (Gold & White Kinetic Badges)
export function renderStyle4(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>
    <g transform="translate(180, 90) rotate(-12)" filter="url(#megaShadow)">
      <rect x="-85" y="-22" width="170" height="44" rx="22" fill="#2563eb"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="#ffffff">✦ START NOW</text>
    </g>
    <g transform="translate(${w - 200}, 85) rotate(14)" filter="url(#megaShadow)">
      <ellipse cx="0" cy="0" rx="75" ry="32" fill="#f43f5e"/>
      <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="#ffffff">${escapeXml(badge)}</text>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)" filter="url(#megaShadow)">
      <g transform="translate(0, 15)">
        <text x="0" y="12" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title1)}</text>
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 135)">
        <text x="0" y="12" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-4">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-280" y="-20" width="560" height="40" rx="20" fill="#000000" stroke="#38bdf8" stroke-width="3"/>
      <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#ffffff">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 5: Cyberpunk HUD & Neon Grid (Magenta + Cyan Glow)
export function renderStyle5(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>
    <g stroke="#06b6d4" stroke-width="1.5" opacity="0.35">
      <line x1="60" y1="0" x2="60" y2="${h}"/>
      <line x1="${w - 60}" y1="0" x2="${w - 60}" y2="${h}"/>
      <circle cx="60" cy="${h / 2}" r="30" fill="none"/>
      <circle cx="${w - 60}" cy="${h / 2}" r="30" fill="none"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -95)">
        <rect x="-180" y="-22" width="360" height="44" fill="#083344" stroke="#06b6d4" stroke-width="3"/>
        <text x="0" y="7" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="#22d3ee">SYS // ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 15)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="142" font-weight="900" fill="#ffffff" stroke="#083344" stroke-width="18" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 140)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="150" font-weight="900" fill="#ec4899" stroke="#000000" stroke-width="20" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 50})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" fill="#18181b" stroke="#ec4899" stroke-width="2"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#f472b6">⚡ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 6: Brutalist Impact Badge (High Contrast Black/Yellow Blocks)
export function renderStyle6(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const box1W = Math.max(760, title1.length * 120 + 80);
  const box2W = Math.max(780, title2.length * 125 + 90);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-3)" filter="url(#megaShadow)">
      <g transform="translate(0, -60)">
        <rect x="${-box1W / 2}" y="-70" width="${box1W}" height="140" fill="#facc15" stroke="#000000" stroke-width="12"/>
        <text x="0" y="32" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="138" font-weight="900" fill="#000000">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 95)">
        <rect x="${-box2W / 2}" y="-70" width="${box2W}" height="140" fill="#000000" stroke="#facc15" stroke-width="10"/>
        <text x="0" y="32" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="142" font-weight="900" fill="#ffffff">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-240" y="-22" width="480" height="44" fill="#facc15" stroke="#000000" stroke-width="4"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="#000000">🚨 ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 7: Golden Luxury VIP Card (Polished Gold + Sparkle Starbursts)
export function renderStyle7(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      ${DROP_SHADOW_FILTER}
      <linearGradient id="s7Gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="50%" stop-color="#eab308"/>
        <stop offset="100%" stop-color="#ca8a04"/>
      </linearGradient>
    </defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.5"/>
    <rect x="40" y="40" width="${w - 80}" height="${h - 80}" rx="24" fill="none" stroke="url(#s7Gold)" stroke-width="4" opacity="0.6"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-140" y="-20" width="280" height="40" rx="20" fill="url(#s7Gold)"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="#000000">👑 ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="142" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="20" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 145)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="150" font-weight="900" fill="url(#s7Gold)" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 60})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" rx="18" fill="#18181b" stroke="url(#s7Gold)" stroke-width="2"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#fef08a">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 8: Retro 8-Bit Pixel Arcade (Pixel Green / Yellow Arcade Frame)
export function renderStyle8(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>
    <g stroke="#22c55e" stroke-width="6" fill="none" opacity="0.5">
      <rect x="50" y="50" width="${w - 100}" height="${h - 100}" rx="6"/>
      <rect x="60" y="60" width="${w - 120}" height="${h - 120}" rx="6"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-150" y="-20" width="300" height="40" fill="#22c55e"/>
        <text x="0" y="7" text-anchor="middle" font-family="monospace" font-size="20" font-weight="900" fill="#000000">&lt; ${escapeXml(badge)} &gt;</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="20" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 145)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#4ade80" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-240" y="-18" width="480" height="36" fill="#022c22" stroke="#22c55e" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#4ade80">🎮 ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 9: Breaking News Alert (Red Urgent LIVE Badge + High Contrast)
export function renderStyle9(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>
    <rect x="0" y="0" width="${w}" height="46" fill="#dc2626"/>
    <text x="${w / 2}" y="30" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="4">🚨 BREAKING NEWS // 2026 AI SPECIAL REPORT</text>
    <g transform="translate(${w / 2}, ${h / 2 + 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -70)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="20" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 65)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="150" font-weight="900" fill="#ef4444" stroke="#ffffff" stroke-width="16" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-280" y="-22" width="560" height="44" fill="#000000" stroke="#dc2626" stroke-width="4"/>
      <text x="0" y="7" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#ffffff">🔴 LIVE: ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 10: Glassmorphism Frost Pill (Aurora Glowing Pills + Emerald Accent)
export function renderStyle10(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const plateW = Math.max(860, Math.max(title1.length, title2.length) * 125 + 100);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <rect x="${-plateW / 2}" y="-160" width="${plateW}" height="320" rx="36" fill="#0f172a" fill-opacity="0.85" stroke="#38bdf8" stroke-width="4"/>
      <g transform="translate(0, -105)">
        <rect x="-140" y="-18" width="280" height="36" rx="18" fill="#0284c7"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#ffffff">${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 5)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="136" font-weight="900" fill="#ffffff">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 115)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="142" font-weight="900" fill="#38bdf8">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 50})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" rx="18" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#7dd3fc">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 11: Manga Action Speedlines (Radial Action Burst + Explosive Yellow/Red)
export function renderStyle11(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>
    <g stroke="#ffffff" stroke-width="3" opacity="0.25">
      <line x1="0" y1="0" x2="${w / 2 - 100}" y2="${h / 2 - 50}"/>
      <line x1="${w}" y1="0" x2="${w / 2 + 100}" y2="${h / 2 - 50}"/>
      <line x1="0" y1="${h}" x2="${w / 2 - 100}" y2="${h / 2 + 50}"/>
      <line x1="${w}" y1="${h}" x2="${w / 2 + 100}" y2="${h / 2 + 50}"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-5)" filter="url(#megaShadow)">
      <g transform="translate(0, -85)">
        <polygon points="-160,-22 160,-22 140,22 -180,22" fill="#ef4444"/>
        <text x="-10" y="8" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="22" font-weight="900" fill="#ffffff">💥 ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="142" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 145)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="150" font-weight="900" fill="#facc15" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-260" y="-20" width="520" height="40" rx="10" fill="#ef4444" stroke="#000000" stroke-width="4"/>
      <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#ffffff">🔥 ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 12: Blueprint Technical Schematics (Grid Blueprint + Technical Cyan)
export function renderStyle12(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#0284c7" opacity="0.3"/>
    <g stroke="#38bdf8" stroke-width="1" opacity="0.3">
      <line x1="100" y1="0" x2="100" y2="${h}" stroke-dasharray="8,8"/>
      <line x1="${w - 100}" y1="0" x2="${w - 100}" y2="${h}" stroke-dasharray="8,8"/>
      <line x1="0" y1="100" x2="${w}" y2="100" stroke-dasharray="8,8"/>
      <line x1="0" y1="${h - 100}" x2="${w}" y2="${h - 100}" stroke-dasharray="8,8"/>
    </g>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-160" y="-20" width="320" height="40" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
        <text x="0" y="6" text-anchor="middle" font-family="monospace" font-size="18" font-weight="900" fill="#ffffff">[ SPEC // ${escapeXml(badge)} ]</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="138" font-weight="900" fill="#ffffff" stroke="#082f49" stroke-width="18" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 140)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="146" font-weight="900" fill="#7dd3fc" stroke="#082f49" stroke-width="20" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" fill="#082f49" stroke="#38bdf8" stroke-width="2"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#bae6fd">📐 ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 13: Neon Sign Cyber Lounge (Dark Background + Glowing Neon Letters)
export function renderStyle13(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.5"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-140" y="-20" width="280" height="40" rx="20" fill="#831843" stroke="#f43f5e" stroke-width="3"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#fecdd3">★ ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="142" font-weight="900" fill="#ffffff" stroke="#f43f5e" stroke-width="16" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 145)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="150" font-weight="900" fill="#fb7185" stroke="#4c0519" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" rx="18" fill="#000000" stroke="#fb7185" stroke-width="2"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#fda4af">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 14: Acid Y2K Chrome Hologram (Ultraviolet + Acid Lime Glow)
export function renderStyle14(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(3)" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-150" y="-22" width="300" height="44" rx="10" fill="#84cc16"/>
        <text x="0" y="7" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="#000000">✦ ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#3f6212" stroke-width="18" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 140)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#bef264" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-240" y="-18" width="480" height="36" rx="8" fill="#1e1b4b" stroke="#84cc16" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#d9f99d">⚡ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 15: Polaroid Photo Snapshot (White Photo Card + Vibrant Title)
export function renderStyle15(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const plateW = Math.max(900, Math.max(title1.length, title2.length) * 125 + 120);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>
    <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-2.5)" filter="url(#megaShadow)">
      <rect x="${-plateW / 2}" y="-190" width="${plateW}" height="380" rx="20" fill="#ffffff" stroke="#000000" stroke-width="8"/>
      <g transform="translate(0, -135)">
        <rect x="-140" y="-18" width="280" height="36" rx="8" fill="#000000"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#ffffff">${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, -15)">
        <text x="0" y="24" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="132" font-weight="900" fill="#000000">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 110)">
        <text x="0" y="24" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#2563eb">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 45})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" rx="8" fill="#000000"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#ffffff">📸 ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 16: Magazine Editorial Typography (Orange & Dark Contrast)
export function renderStyle16(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-150" y="-20" width="300" height="40" fill="#ea580c"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#ffffff">ISSUE // ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="142" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="20" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 145)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="150" font-weight="900" fill="#fb923c" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" fill="#000000" stroke="#ea580c" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#fdba74">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 17: Tech Command Terminal (Phosphor Emerald Matrix Glow)
export function renderStyle17(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-160" y="-20" width="320" height="40" fill="#065f46" stroke="#10b981" stroke-width="2"/>
        <text x="0" y="6" text-anchor="middle" font-family="monospace" font-size="18" font-weight="900" fill="#a7f3d0">root@ai:~# ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#064e3b" stroke-width="20" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 140)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#34d399" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-240" y="-18" width="480" height="36" fill="#022c22" stroke="#10b981" stroke-width="2"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#6ee7b7">&gt; ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 18: 3D Game Banner Card (Floating Diamond Plate + Ruby/Gold)
export function renderStyle18(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <polygon points="-140,-20 140,-20 120,20 -120,20" fill="#9333ea"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#ffffff">💎 ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="20" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 145)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#c084fc" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" rx="18" fill="#1e1b4b" stroke="#c084fc" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#e9d5ff">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 19: Paper Cutout Collage (Torn Strips + Washi Tape Accents)
export function renderStyle19(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const box1W = Math.max(760, title1.length * 120 + 80);
  const box2W = Math.max(780, title2.length * 125 + 90);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -65) rotate(-2)">
        <rect x="${-box1W / 2}" y="-65" width="${box1W}" height="130" fill="#ffffff" stroke="#000000" stroke-width="6"/>
        <text x="0" y="30" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="135" font-weight="900" fill="#000000">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 95) rotate(2)">
        <rect x="${-box2W / 2}" y="-65" width="${box2W}" height="130" fill="#2563eb" stroke="#000000" stroke-width="6"/>
        <text x="0" y="30" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-240" y="-18" width="480" height="36" fill="#facc15" stroke="#000000" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#000000">📌 ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// STYLE 20: Cosmic Nebula Galaxy (Celestial Violet / Starlight Glow)
export function renderStyle20(w, h, post) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>${DROP_SHADOW_FILTER}</defs>
    ${renderThematicBackgroundScene(theme, w, h)}
    <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>
    <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
      <g transform="translate(0, -90)">
        <rect x="-150" y="-20" width="300" height="40" rx="20" fill="#4338ca"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="900" fill="#ffffff">🌌 ${escapeXml(badge)}</text>
      </g>
      <g transform="translate(0, 20)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="140" font-weight="900" fill="#ffffff" stroke="#312e81" stroke-width="20" paint-order="stroke fill">${escapeXml(title1)}</text>
      </g>
      <g transform="translate(0, 145)">
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="148" font-weight="900" fill="#818cf8" stroke="#000000" stroke-width="22" paint-order="stroke fill">${escapeXml(title2)}</text>
      </g>
    </g>
    <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
      <rect x="-260" y="-18" width="520" height="36" rx="18" fill="#0f172a" stroke="#818cf8" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="#c7d2fe">✦ ${escapeXml(subTag)}</text>
    </g>
  </svg>`;
}

// -----------------------------------------------------------------------------
// 20 Style Registry & Dynamic Master Dispatcher
// -----------------------------------------------------------------------------
export const STYLE_RENDERERS = [
  renderStyle1,
  renderStyle2,
  renderStyle3,
  renderStyle4,
  renderStyle5,
  renderStyle6,
  renderStyle7,
  renderStyle8,
  renderStyle9,
  renderStyle10,
  renderStyle11,
  renderStyle12,
  renderStyle13,
  renderStyle14,
  renderStyle15,
  renderStyle16,
  renderStyle17,
  renderStyle18,
  renderStyle19,
  renderStyle20
];

export function renderMasterHookThumbnail(post, index, w = 1280, h = 720) {
  const fn = STYLE_RENDERERS[index % STYLE_RENDERERS.length];
  return fn(w, h, post);
}

export function renderContentAwareBlogSVG(post, w = 1280, h = 720) {
  const hash = (post.id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return renderMasterHookThumbnail(post, hash, w, h);
}

// -----------------------------------------------------------------------------
// Generate All 59 Thumbnails
// -----------------------------------------------------------------------------
export async function generateAllHookThumbnails() {
  console.log('🚀 Generating 20 Distinct Pattern Giant Hook Thumbnails for all 59 posts...');
  const outDir = path.join(ROOT_DIR, 'public/images/blogs');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

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

  console.log(`✅ Successfully generated ${count} thumbnails across 20 distinct styles in ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllHookThumbnails().catch(console.error);
}
