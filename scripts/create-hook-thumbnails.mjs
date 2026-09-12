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
// -----------------------------------------------------------------------------
export const PUNCHY_HOOK_MAP = {
  'daily-tech-insight-2026-09-15': { badge: '🔍 딥 리서치', title1: '딥 리서치 AI', title2: '보고서 10배 단축' },
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
// Detect Specific Content Scene Theme (Based on Content Keywords)
// -----------------------------------------------------------------------------
export function detectSceneTheme(post) {
  const id = post.id || '';
  const title = post.title || '';
  const tags = (post.tags || []).join(' ');
  const excerpt = post.excerpt || '';
  const text = (id + ' ' + title + ' ' + tags + ' ' + excerpt).toLowerCase();

  if (text.includes('통장') || text.includes('보안') || text.includes('bank') || text.includes('취약') || text.includes('위험')) {
    return 'bank_security';
  } else if (text.includes('주가') || text.includes('주식') || text.includes('수익률') || text.includes('투자') || text.includes('차트')) {
    return 'stock_trading';
  } else if (text.includes('바이브') || text.includes('90개') || text.includes('개발') || text.includes('bolt') || text.includes('supabase') || text.includes('1인 창업')) {
    return 'vibe_coding';
  } else if (text.includes('gpt-6') || text.includes('astra') || text.includes('에이전트') || text.includes('agent') || text.includes('브라우저') || text.includes('자동화')) {
    return 'ai_agent_lab';
  } else if (text.includes('4대 천왕') || text.includes('플래그십') || text.includes('grok') || text.includes('비교')) {
    return 'ai_big_four';
  } else if (text.includes('claude') || text.includes('클로드') || text.includes('쿼터') || text.includes('아티팩트')) {
    return 'claude_workspace';
  } else if (text.includes('gemini') || text.includes('제미나이') || text.includes('google ai') || text.includes('구글') || text.includes('익스텐션')) {
    return 'gemini_lab';
  } else if (text.includes('논문') || text.includes('보고서') || text.includes('100만') || text.includes('notebooklm') || text.includes('문서') || text.includes('연구')) {
    return 'document_archive';
  } else if (text.includes('애드센스') || text.includes('seo') || text.includes('aeo') || text.includes('검색') || text.includes('트래픽') || text.includes('스냅블로그')) {
    return 'seo_traffic';
  } else if (text.includes('이미지') || text.includes('미드저니') || text.includes('나노바나나') || text.includes('인포그래픽') || text.includes('그림') || text.includes('사진')) {
    return 'creative_media';
  } else if (text.includes('lyria') || text.includes('음악') || text.includes('작곡') || text.includes('오디오') || text.includes('숏츠')) {
    return 'music_audio';
  } else if (text.includes('쇼핑') || text.includes('할인') || text.includes('가짜') || text.includes('가격비교')) {
    return 'smart_shopping';
  } else if (text.includes('월드컵') || text.includes('축구') || text.includes('게임') || text.includes('레트로') || text.includes('낚시')) {
    return 'retro_gaming';
  } else if (text.includes('터미널') || text.includes('cli') || text.includes('마크다운') || text.includes('html') || text.includes('파일 정리')) {
    return 'terminal_hacker';
  } else if (text.includes('엑셀') || text.includes('회의록') || text.includes('생산성') || text.includes('직장인') || text.includes('100배') || text.includes('재테크')) {
    return 'smart_productivity';
  } else if (text.includes('부동산') || text.includes('안드로이드') || text.includes('모바일') || text.includes('앱')) {
    return 'mobile_app';
  } else if (text.includes('마케팅') || text.includes('광고') || text.includes('블로거')) {
    return 'marketing_growth';
  } else if (text.includes('저널') || text.includes('서재') || text.includes('라이브러리') || text.includes('270개')) {
    return 'learning_journal';
  } else if (text.includes('메타') || text.includes('한계') || text.includes('프롬프트')) {
    return 'meta_prompting';
  } else {
    return 'ai_core_universe';
  }
}

// -----------------------------------------------------------------------------
// Content-Aware Rich Visual Background Scene Generator
// -----------------------------------------------------------------------------
export function renderThematicBackgroundScene(theme, w = 1280, h = 720) {
  switch (theme) {
    case 'document_archive':
      return `
        <rect width="${w}" height="${h}" fill="#030814"/>
        <radialGradient id="bgDocGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0c4a6e" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#031d2e" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#01060a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgDocGlow)"/>
        <g opacity="0.45" transform="translate(90, 70) rotate(-10)">
          <rect width="260" height="340" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
          <rect x="25" y="35" width="210" height="24" rx="4" fill="#38bdf8"/>
          <rect x="25" y="75" width="160" height="12" rx="3" fill="#64748b"/>
          <rect x="25" y="100" width="190" height="12" rx="3" fill="#64748b"/>
          <rect x="25" y="125" width="140" height="12" rx="3" fill="#64748b"/>
          <rect x="25" y="160" width="210" height="140" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
          <polyline points="40,260 90,200 140,240 210,180" fill="none" stroke="#38bdf8" stroke-width="4"/>
        </g>
        <g opacity="0.45" transform="translate(${w - 350}, 120) rotate(12)">
          <rect width="280" height="360" rx="14" fill="#0f172a" stroke="#60a5fa" stroke-width="4"/>
          <rect x="30" y="40" width="220" height="24" rx="4" fill="#60a5fa"/>
          <rect x="30" y="85" width="180" height="12" rx="3" fill="#64748b"/>
          <rect x="30" y="110" width="200" height="12" rx="3" fill="#64748b"/>
          <rect x="30" y="150" width="220" height="150" rx="8" fill="#1e293b" stroke="#2563eb" stroke-width="2"/>
        </g>
      `;

    case 'vibe_coding':
      return `
        <rect width="${w}" height="${h}" fill="#080318"/>
        <radialGradient id="bgVibeGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#4c1d95" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#1e0b3d" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#05010a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgVibeGlow)"/>
        <g opacity="0.5" transform="translate(70, 60) rotate(-6)">
          <rect width="440" height="290" rx="14" fill="#0f172a" stroke="#a855f7" stroke-width="4"/>
          <circle cx="25" cy="20" r="6" fill="#ef4444"/><circle cx="45" cy="20" r="6" fill="#facc15"/><circle cx="65" cy="20" r="6" fill="#22c55e"/>
          <line x1="25" y1="60" x2="320" y2="60" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
          <line x1="25" y1="95" x2="220" y2="95" stroke="#a855f7" stroke-width="8" stroke-linecap="round"/>
          <line x1="25" y1="130" x2="380" y2="130" stroke="#4ade80" stroke-width="8" stroke-linecap="round"/>
          <line x1="25" y1="165" x2="260" y2="165" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
          <line x1="25" y1="200" x2="300" y2="200" stroke="#f472b6" stroke-width="8" stroke-linecap="round"/>
        </g>
        <g opacity="0.5" transform="translate(${w - 500}, 240) rotate(8)">
          <rect width="440" height="290" rx="14" fill="#0f172a" stroke="#c084fc" stroke-width="4"/>
          <line x1="25" y1="60" x2="340" y2="60" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
          <line x1="25" y1="95" x2="260" y2="95" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
          <line x1="25" y1="130" x2="360" y2="130" stroke="#4ade80" stroke-width="8" stroke-linecap="round"/>
        </g>
      `;

    case 'ai_agent_lab':
      return `
        <rect width="${w}" height="${h}" fill="#030814"/>
        <radialGradient id="bgAgentGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#0f1026" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#02040a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgAgentGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.5">
          <circle cx="0" cy="0" r="320" fill="none" stroke="#6366f1" stroke-width="3" stroke-dasharray="20,10"/>
          <circle cx="-180" cy="-90" r="32" fill="#4f46e5" stroke="#a5b4fc" stroke-width="4"/>
          <circle cx="180" cy="-90" r="32" fill="#4f46e5" stroke="#a5b4fc" stroke-width="4"/>
          <circle cx="0" cy="160" r="36" fill="#4338ca" stroke="#c7d2fe" stroke-width="5"/>
          <line x1="-148" y1="-90" x2="148" y2="-90" stroke="#818cf8" stroke-width="4"/>
          <line x1="-160" y1="-60" x2="-25" y2="135" stroke="#818cf8" stroke-width="4"/>
          <line x1="160" y1="-60" x2="25" y2="135" stroke="#818cf8" stroke-width="4"/>
        </g>
      `;

    case 'ai_big_four':
      return `
        <rect width="${w}" height="${h}" fill="#050713"/>
        <radialGradient id="bgBigFour" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020408" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgBigFour)"/>
        <g opacity="0.5" transform="translate(120, 100)">
          <circle cx="60" cy="60" r="55" fill="#0f172a" stroke="#10a37f" stroke-width="5"/>
          <text x="60" y="68" font-size="22" font-weight="900" fill="#10a37f" text-anchor="middle">GPT</text>
        </g>
        <g opacity="0.5" transform="translate(${w - 240}, 100)">
          <circle cx="60" cy="60" r="55" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
          <text x="60" y="68" font-size="20" font-weight="900" fill="#38bdf8" text-anchor="middle">Gemini</text>
        </g>
        <g opacity="0.5" transform="translate(120, ${h - 220})">
          <circle cx="60" cy="60" r="55" fill="#0f172a" stroke="#d97706" stroke-width="5"/>
          <text x="60" y="68" font-size="20" font-weight="900" fill="#f59e0b" text-anchor="middle">Claude</text>
        </g>
        <g opacity="0.5" transform="translate(${w - 240}, ${h - 220})">
          <circle cx="60" cy="60" r="55" fill="#0f172a" stroke="#ffffff" stroke-width="5"/>
          <text x="60" y="68" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">Grok</text>
        </g>
      `;

    case 'stock_trading':
      return `
        <rect width="${w}" height="${h}" fill="#010d08"/>
        <radialGradient id="bgStockGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#064e3b" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#02241b" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010a08" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgStockGlow)"/>
        <g opacity="0.5" transform="translate(60, 40)">
          <rect x="50" y="240" width="40" height="140" rx="4" fill="#10b981"/>
          <line x1="70" y1="170" x2="70" y2="450" stroke="#10b981" stroke-width="4"/>
          <rect x="140" y="180" width="40" height="210" rx="4" fill="#10b981"/>
          <line x1="160" y1="100" x2="160" y2="430" stroke="#10b981" stroke-width="4"/>
          <rect x="${w - 300}" y="80" width="40" height="280" rx="4" fill="#10b981"/>
          <line x1="${w - 280}" y1="20" x2="${w - 280}" y2="400" stroke="#10b981" stroke-width="4"/>
        </g>
        <path d="M 0 650 Q 450 550 800 280 T 1280 40" fill="none" stroke="#fbbf24" stroke-width="10" stroke-linecap="round" opacity="0.65"/>
      `;

    case 'seo_traffic':
      return `
        <rect width="${w}" height="${h}" fill="#020f12"/>
        <radialGradient id="bgSeoGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0f766e" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010609" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgSeoGlow)"/>
        <g opacity="0.55" transform="translate(90, 70)">
          <rect width="400" height="80" rx="16" fill="#0f172a" stroke="#2dd4bf" stroke-width="4"/>
          <circle cx="40" cy="40" r="18" fill="#fbbf24"/>
          <text x="40" y="47" font-size="20" font-weight="900" fill="#000000" text-anchor="middle">#1</text>
          <line x1="80" y1="40" x2="340" y2="40" stroke="#2dd4bf" stroke-width="8" stroke-linecap="round"/>
        </g>
        <path d="M 0 640 L 400 500 L 750 340 L 1050 200 L 1280 60" fill="none" stroke="#2dd4bf" stroke-width="10" stroke-linecap="round" opacity="0.65"/>
      `;

    case 'creative_media':
      return `
        <rect width="${w}" height="${h}" fill="#120312"/>
        <radialGradient id="bgCreativeGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#831843" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#060106" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgCreativeGlow)"/>
        <g opacity="0.5" transform="translate(100, 80) rotate(-8)">
          <rect width="300" height="230" rx="18" fill="#0f172a" stroke="#f43f5e" stroke-width="5"/>
          <circle cx="80" cy="80" r="35" fill="#fbbf24"/>
          <polygon points="50,190 140,110 220,190" fill="#f43f5e"/>
        </g>
      `;

    case 'music_audio':
      return `
        <rect width="${w}" height="${h}" fill="#080218"/>
        <radialGradient id="bgAudioGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#4c1d95" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#03010a" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgAudioGlow)"/>
        <g opacity="0.5" transform="translate(90, 340)">
          <rect x="0" y="-140" width="28" height="280" rx="12" fill="#c084fc"/>
          <rect x="45" y="-200" width="28" height="400" rx="12" fill="#a855f7"/>
          <rect x="90" y="-90" width="28" height="180" rx="12" fill="#818cf8"/>
          <rect x="135" y="-170" width="28" height="340" rx="12" fill="#38bdf8"/>
          <rect x="${w - 260}" y="-180" width="28" height="360" rx="12" fill="#f472b6"/>
          <rect x="${w - 215}" y="-220" width="28" height="440" rx="12" fill="#ec4899"/>
          <rect x="${w - 170}" y="-110" width="28" height="220" rx="12" fill="#c084fc"/>
        </g>
      `;

    case 'smart_productivity':
      return `
        <rect width="${w}" height="${h}" fill="#020a14"/>
        <radialGradient id="bgProdGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0369a1" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010408" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgProdGlow)"/>
        <g opacity="0.5" transform="translate(110, 90)">
          <circle cx="90" cy="90" r="80" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
          <line x1="90" y1="90" x2="90" y2="40" stroke="#facc15" stroke-width="6" stroke-linecap="round"/>
          <line x1="90" y1="90" x2="130" y2="90" stroke="#facc15" stroke-width="6" stroke-linecap="round"/>
        </g>
      `;

    case 'terminal_hacker':
      return `
        <rect width="${w}" height="${h}" fill="#010803"/>
        <radialGradient id="bgTermGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#064e3b" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010301" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgTermGlow)"/>
        <g opacity="0.5" transform="translate(90, 80)">
          <rect width="400" height="250" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="4"/>
          <text x="25" y="50" font-family="monospace" font-size="20" font-weight="900" fill="#10b981">&gt; claude code --run</text>
          <text x="25" y="90" font-family="monospace" font-size="18" fill="#34d399">✔ 270 files organized</text>
          <text x="25" y="130" font-family="monospace" font-size="18" fill="#6ee7b7">&gt; build complete (0 errors)</text>
        </g>
      `;

    case 'retro_gaming':
      return `
        <rect width="${w}" height="${h}" fill="#030814"/>
        <radialGradient id="bgGameGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010308" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgGameGlow)"/>
        <g opacity="0.5" transform="translate(90, 90)">
          <rect width="280" height="140" rx="20" fill="#1e293b" stroke="#38bdf8" stroke-width="5"/>
          <circle cx="60" cy="70" r="28" fill="#38bdf8"/>
          <circle cx="200" cy="60" r="14" fill="#ef4444"/>
          <circle cx="235" cy="85" r="14" fill="#facc15"/>
        </g>
      `;

    case 'bank_security':
      return `
        <rect width="${w}" height="${h}" fill="#020612"/>
        <radialGradient id="bgVaultGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010206" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgVaultGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.45">
          <circle cx="0" cy="0" r="340" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="24,12"/>
          <circle cx="0" cy="0" r="280" fill="none" stroke="#60a5fa" stroke-width="8"/>
        </g>
        <g transform="translate(120, 110)" opacity="0.6">
          <polygon points="0,-60 50,-30 50,30 0,60 -50,30 -50,-30" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
          <circle cx="0" cy="-5" r="14" fill="#fbbf24"/>
          <rect x="-10" y="-5" width="20" height="22" rx="4" fill="#f59e0b"/>
        </g>
      `;

    case 'ai_core_universe':
    default:
      return `
        <rect width="${w}" height="${h}" fill="#030512"/>
        <radialGradient id="bgCoreGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.95"/>
          <stop offset="50%" stop-color="#0f172a" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#010208" stop-opacity="1"/>
        </radialGradient>
        <rect width="${w}" height="${h}" fill="url(#bgCoreGlow)"/>
        <g transform="translate(${w / 2}, ${h / 2})" opacity="0.45">
          <circle cx="0" cy="0" r="290" fill="none" stroke="#6366f1" stroke-width="4" stroke-dasharray="16,8"/>
          <circle cx="0" cy="0" r="180" fill="none" stroke="#38bdf8" stroke-width="3"/>
        </g>
      `;
  }
}

// ==============================================================================
// 4 SIGNATURE STYLES (EXACT APPROVED GEOMETRIES) x 5 COLOR PALETTES (20 TOTAL)
// FONT: Paperlogy ('Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', sans-serif)
// ==============================================================================

const FONT_FAMILY = "'Paperlogy', 'Paperlogy-9Black', 'Paperlogy-8ExtraBold', 'Noto Sans KR', sans-serif";

const DROP_SHADOW_FILTER = `
  <filter id="megaShadow" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000000" flood-opacity="0.98"/>
  </filter>
`;

// -----------------------------------------------------------------------------
// STYLE 1: Eco Clean / Fresh News 3D Ribbon (5 Color Variations)
// -----------------------------------------------------------------------------
const S1_COLOR_THEMES = [
  // 0: Original Royal Blue & Sky Cyan
  {
    boxGrad: ['#1d4ed8', '#2563eb'],
    arrowGrad: ['#fef08a', '#facc15', '#f59e0b'],
    arrowHead: '#f59e0b',
    archBg: '#1e40af',
    title1Color: '#ffffff',
    title2Color: '#38bdf8',
    title2Stroke: '#ffffff',
    pillBorder: '#38bdf8'
  },
  // 1: Crimson Red & Neon Amber (Fire Energy)
  {
    boxGrad: ['#be123c', '#e11d48'],
    arrowGrad: ['#a5f3fc', '#38bdf8', '#0284c7'],
    arrowHead: '#0284c7',
    archBg: '#9f1239',
    title1Color: '#ffffff',
    title2Color: '#fbbf24',
    title2Stroke: '#ffffff',
    pillBorder: '#fb7185'
  },
  // 2: Cyber Purple & Volt Lime (Synthwave Power)
  {
    boxGrad: ['#6b21a8', '#9333ea'],
    arrowGrad: ['#bef264', '#a3e635', '#65a30d'],
    arrowHead: '#65a30d',
    archBg: '#581c87',
    title1Color: '#ffffff',
    title2Color: '#ccff00',
    title2Stroke: '#ffffff',
    pillBorder: '#c084fc'
  },
  // 3: Deep Emerald & Gold Sunshine (Money/Tech Alpha)
  {
    boxGrad: ['#047857', '#059669'],
    arrowGrad: ['#fed7aa', '#fb923c', '#ea580c'],
    arrowHead: '#ea580c',
    archBg: '#065f46',
    title1Color: '#ffffff',
    title2Color: '#fde047',
    title2Stroke: '#ffffff',
    pillBorder: '#34d399'
  },
  // 4: Sunset Magenta & Cyber Mint (Ultra Modern Punch)
  {
    boxGrad: ['#c026d3', '#db2777'],
    arrowGrad: ['#a7f3d0', '#34d399', '#059669'],
    arrowHead: '#059669',
    archBg: '#86198f',
    title1Color: '#ffffff',
    title2Color: '#22d3ee',
    title2Stroke: '#ffffff',
    pillBorder: '#f472b6'
  }
];

export function renderStyle1_FreshNews(w, h, post, colorIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const boxWidth = Math.max(820, title1.length * 115 + 100);
  const c = S1_COLOR_THEMES[colorIdx % S1_COLOR_THEMES.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s1BoxGrad_${colorIdx}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${c.boxGrad[0]}"/>
      <stop offset="100%" stop-color="${c.boxGrad[1]}"/>
    </linearGradient>

    <linearGradient id="s1ArrowGrad_${colorIdx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.arrowGrad[0]}"/>
      <stop offset="50%" stop-color="${c.arrowGrad[1]}"/>
      <stop offset="100%" stop-color="${c.arrowGrad[2]}"/>
    </linearGradient>
    ${DROP_SHADOW_FILTER}
  </defs>

  <!-- 1. Content-Aware Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>

  <!-- 3. Yellow Circular Orbiting Arrow -->
  <g transform="translate(${w / 2}, ${h / 2 - 20}) rotate(-12)" filter="url(#megaShadow)">
    <path d="M -340 0 A 340 260 0 1 1 310 90" fill="none" stroke="url(#s1ArrowGrad_${colorIdx})" stroke-width="26" stroke-linecap="round"/>
    <polygon points="310,40 370,105 280,125" fill="${c.arrowHead}"/>
    <path d="M 320 -140 L 330 -115 L 355 -105 L 330 -95 L 320 -70 L 310 -95 L 285 -105 L 310 -115 Z" fill="${c.arrowGrad[1]}"/>
  </g>

  <!-- 4. Central Giant Typography (-6.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-6.5)" filter="url(#megaShadow)">
    
    <!-- Top Curved Category Arch -->
    <g transform="translate(0, -125)">
      <path d="M -180 25 Q 0 -25 180 25" fill="none" stroke="${c.archBg}" stroke-width="44" stroke-linecap="round"/>
      <text x="0" y="16" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="26" font-weight="900" fill="#ffffff">
        ${escapeXml(badge)}
      </text>
    </g>

    <!-- 3D Ribbon Box for Title 1 -->
    <g transform="translate(0, 5)">
      <polygon points="${-boxWidth / 2 + 10},-70 ${boxWidth / 2 + 50},-70 ${boxWidth / 2 - 10},80 ${-boxWidth / 2 - 50},80" fill="#000000" opacity="0.75"/>
      <polygon points="${-boxWidth / 2},-80 ${boxWidth / 2 + 40},-80 ${boxWidth / 2 - 20},70 ${-boxWidth / 2 - 60},70" fill="url(#s1BoxGrad_${colorIdx})"/>
      <polygon points="${-boxWidth / 2},-80 ${boxWidth / 2 + 40},-80 ${boxWidth / 2 + 35},-65 ${-boxWidth / 2 - 5},-65" fill="#ffffff" opacity="0.45"/>
      
      <text x="-5" y="24" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="140" font-weight="900" fill="${c.title1Color}" stroke="#000000" stroke-width="14" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Title 2 (Massive Solid Text with 3D Outlines) -->
    <g transform="translate(0, 160)">
      <text x="0" y="14" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="28" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="${c.title2Color}" stroke="${c.title2Stroke}" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Crisp Subtitle Pill -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
    <rect x="-300" y="-22" width="600" height="44" rx="22" fill="#0f172a" stroke="${c.pillBorder}" stroke-width="2"/>
    <text x="0" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="20" font-weight="800" fill="#ffffff">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// STYLE 2: Comic Pop / Starburst Electric Punch (5 Color Variations)
// -----------------------------------------------------------------------------
const S2_COLOR_THEMES = [
  // 0: Original Deep Navy & Electric Yellow
  {
    starGrad: ['#0284c7', '#1e3a8a'],
    starSpark: '#facc15',
    wirePin: '#fbbf24',
    title2Color: '#facc15',
    boltColor: '#38bdf8',
    subPillBg: '#e11d48'
  },
  // 1: Midnight Purple & Volt Green (Cyber Toxic Pop)
  {
    starGrad: ['#7c3aed', '#3b0764'],
    starSpark: '#ccff00',
    wirePin: '#ccff00',
    title2Color: '#ccff00',
    boltColor: '#f43f5e',
    subPillBg: '#9333ea'
  },
  // 2: Ruby Black & Cyan Burst (High Voltage Arcade)
  {
    starGrad: ['#dc2626', '#450a0a'],
    starSpark: '#38bdf8',
    wirePin: '#38bdf8',
    title2Color: '#38bdf8',
    boltColor: '#facc15',
    subPillBg: '#2563eb'
  },
  // 3: Dark Teal & Sunset Orange (Explosive Impact)
  {
    starGrad: ['#0d9488', '#042f2e'],
    starSpark: '#fb923c',
    wirePin: '#fb923c',
    title2Color: '#fb923c',
    boltColor: '#facc15',
    subPillBg: '#059669'
  },
  // 4: Pure Carbon Black & Neon Hot Pink (Bold Street Pop)
  {
    starGrad: ['#db2777', '#500724'],
    starSpark: '#fef08a',
    wirePin: '#facc15',
    title2Color: '#f43f5e',
    boltColor: '#38bdf8',
    subPillBg: '#eab308'
  }
];

export function renderStyle2_ComicPop(w, h, post, colorIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const boxWidth = Math.max(800, title1.length * 115 + 90);
  const c = S2_COLOR_THEMES[colorIdx % S2_COLOR_THEMES.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s2StarGrad_${colorIdx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.starGrad[0]}"/>
      <stop offset="100%" stop-color="${c.starGrad[1]}"/>
    </linearGradient>
    ${DROP_SHADOW_FILTER}
  </defs>

  <!-- 1. Content-Aware Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.35"/>

  <!-- 3. Giant Comic Starburst Backdrop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
    <polygon points="
      0,-270 55,-140 200,-250 145,-110 300,-140 185,-20 330,30 185,90 270,220 130,165 155,295 30,185
      -20,295 -65,175 -200,260 -145,120 -310,150 -200,20 -330,-40 -185,-90 -270,-210 -120,-155 -130,-285 -20,-175
    " fill="url(#s2StarGrad_${colorIdx})" stroke="#000000" stroke-width="14"/>

    <polygon points="230,-190 255,-130 225,-125 270,-65 235,-75 260,-10 205,-70 230,-75" fill="${c.starSpark}" stroke="#000000" stroke-width="5"/>
    <polygon points="-230,130 -255,75 -225,70 -270,10 -235,20 -260,-45 -205,15 -230,20" fill="${c.starSpark}" stroke="#000000" stroke-width="5"/>
  </g>

  <!-- 4. Electric Plug Wire Loop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
    <path d="M -380 10 Q -440 130 -220 175 Q 220 195 380 110" fill="none" stroke="#000000" stroke-width="26" stroke-linecap="round"/>
    <path d="M 370 105 L 420 120 L 400 160 L 350 145 Z" fill="#000000"/>
    <rect x="415" y="115" width="24" height="7" fill="${c.wirePin}" stroke="#000000" stroke-width="2"/>
    <rect x="405" y="138" width="24" height="7" fill="${c.wirePin}" stroke="#000000" stroke-width="2"/>
  </g>

  <!-- 5. Central Giant Dynamic Headline (-4 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 15}) rotate(-4)" filter="url(#megaShadow)">
    
    <!-- Top Black Box for Title 1 -->
    <g transform="translate(0, -65)">
      <rect x="${-boxWidth / 2}" y="-70" width="${boxWidth}" height="135" rx="18" fill="#000000" stroke="#000000" stroke-width="8"/>
      <text x="0" y="28" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="138" font-weight="900" fill="#ffffff" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Bottom Giant Neon Text for Title 2 -->
    <g transform="translate(0, 95)">
      <text x="0" y="16" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="${c.title2Color}" stroke="#000000" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>

      <g transform="translate(${Math.min(300, title2.length * 40)}, -40)">
        <polygon points="0,-28 18,0 3,0 14,28 -18,6 0,6" fill="${c.boltColor}" stroke="#000000" stroke-width="4"/>
      </g>
    </g>
  </g>

  <!-- Bottom Highlight Subtitle Pill -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
    <rect x="-280" y="-22" width="560" height="44" rx="22" fill="${c.subPillBg}" stroke="#000000" stroke-width="4"/>
    <text x="0" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="19" font-weight="900" fill="#ffffff">
      ⚡ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// STYLE 3: Street Graffiti & Caution Tech (5 Color Variations)
// -----------------------------------------------------------------------------
const S3_COLOR_THEMES = [
  // 0: Original Volt Lime & Caution Yellow
  {
    stripeColor: '#facc15',
    starStroke: '#ccff00',
    smileyBg: '#facc15',
    title2Color: '#ccff00',
    tagBg: '#ccff00',
    tagTextColor: '#000000'
  },
  // 1: Electric Cyan & Hazard Orange
  {
    stripeColor: '#fb923c',
    starStroke: '#38bdf8',
    smileyBg: '#38bdf8',
    title2Color: '#38bdf8',
    tagBg: '#38bdf8',
    tagTextColor: '#000000'
  },
  // 2: Hot Magenta & Hazard Yellow
  {
    stripeColor: '#facc15',
    starStroke: '#f43f5e',
    smileyBg: '#f43f5e',
    title2Color: '#fb7185',
    tagBg: '#fb7185',
    tagTextColor: '#000000'
  },
  // 3: Acid Yellow & Hazard Green
  {
    stripeColor: '#4ade80',
    starStroke: '#facc15',
    smileyBg: '#4ade80',
    title2Color: '#facc15',
    tagBg: '#facc15',
    tagTextColor: '#000000'
  },
  // 4: Royal Purple & Hazard Cyan
  {
    stripeColor: '#38bdf8',
    starStroke: '#c084fc',
    smileyBg: '#c084fc',
    title2Color: '#c084fc',
    tagBg: '#c084fc',
    tagTextColor: '#000000'
  }
];

export function renderStyle3_StreetCaution(w, h, post, colorIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const c = S3_COLOR_THEMES[colorIdx % S3_COLOR_THEMES.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <pattern id="s3CautionPattern_${colorIdx}" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="30" height="60" fill="${c.stripeColor}"/>
      <rect x="30" width="30" height="60" fill="#000000"/>
    </pattern>
    ${DROP_SHADOW_FILTER}
  </defs>

  <!-- 1. Content-Aware Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.4"/>

  <!-- 3. Diagonal Caution Tapes -->
  <g transform="translate(-80, 50) rotate(-22)" filter="url(#megaShadow)">
    <rect width="450" height="42" fill="url(#s3CautionPattern_${colorIdx})" stroke="#000000" stroke-width="4"/>
    <rect x="40" y="6" width="370" height="30" fill="#000000"/>
    <text x="225" y="27" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="${c.stripeColor}" letter-spacing="3">
      ⚠️ KEEP OUT! CAUTION // AI TECH
    </text>
  </g>

  <g transform="translate(${w - 320}, ${h - 20}) rotate(-18)" filter="url(#megaShadow)">
    <rect width="450" height="42" fill="url(#s3CautionPattern_${colorIdx})" stroke="#000000" stroke-width="4"/>
    <rect x="40" y="6" width="370" height="30" fill="#000000"/>
    <text x="225" y="27" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="${c.stripeColor}" letter-spacing="3">
      ⚡ 2026 HOT DEAL $420
    </text>
  </g>

  <!-- 4. Big Dark Silhouette Star Backdrop -->
  <g transform="translate(${w / 2}, ${h / 2 - 10})" filter="url(#megaShadow)">
    <polygon points="
      0,-240 60,-80 230,-80 100,35 150,200 0,105 -150,200 -100,35 -230,-80 -60,-80
    " fill="#000000" stroke="${c.starStroke}" stroke-width="6"/>
  </g>

  <!-- Tech Stickers -->
  <g transform="translate(${w - 150}, 160) rotate(8)" filter="url(#megaShadow)">
    <circle cx="0" cy="0" r="45" fill="${c.smileyBg}" stroke="#000000" stroke-width="6"/>
    <circle cx="-16" cy="-10" r="6" fill="#000000"/>
    <circle cx="16" cy="-10" r="6" fill="#000000"/>
    <path d="M -22 10 Q 0 34 22 10" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
  </g>

  <g transform="translate(${w - 180}, ${h - 140}) rotate(-10)" filter="url(#megaShadow)">
    <rect x="-65" y="-30" width="130" height="60" rx="8" fill="#ffffff" stroke="#000000" stroke-width="4"/>
    <text x="0" y="-8" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="12" font-weight="900" fill="#000000">100% VERIFIED</text>
    <line x1="-50" y1="5" x2="-50" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="-30" y1="5" x2="-30" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="-10" y1="5" x2="-10" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="10" y1="5" x2="10" y2="20" stroke="#000000" stroke-width="4"/>
    <line x1="30" y1="5" x2="30" y2="20" stroke="#000000" stroke-width="4"/>
  </g>

  <!-- 5. Central 3D Graffiti Headline (-4.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-3)" filter="url(#megaShadow)">
    
    <!-- Top Stencil Badge -->
    <g transform="translate(0, -125)">
      <rect x="-160" y="-22" width="320" height="44" rx="8" fill="#ffffff" stroke="#000000" stroke-width="4"/>
      <text x="0" y="8" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="20" font-weight="900" fill="#000000" letter-spacing="2">
        ✦ ${escapeXml(badge)}
      </text>
    </g>

    <!-- Line 1 (White Ultra Bold with Thick Black Shadow) -->
    <g transform="translate(0, 18)">
      <text x="0" y="10" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="138" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="138" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-3">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Line 2 (Massive Neon with 3D Extrusion) -->
    <g transform="translate(0, 148)">
      <text x="0" y="18" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="28" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="${c.title2Color}" stroke="#000000" stroke-width="18" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Tag Sticker -->
  <g transform="translate(${w / 2}, ${h - 55}) rotate(2)" filter="url(#megaShadow)">
    <rect x="-260" y="-20" width="520" height="40" rx="8" fill="${c.tagBg}" stroke="#000000" stroke-width="4"/>
    <text x="0" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="18" font-weight="900" fill="${c.tagTextColor}">
      🔥 ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// STYLE 4: Editorial Kinetic Dark (5 Color Variations)
// -----------------------------------------------------------------------------
const S4_COLOR_THEMES = [
  // 0: Original Cyan Wireframes & Gold 3D Title
  {
    wireColor: '#38bdf8',
    pill1Bg: '#2563eb',
    ovalBg: '#f43f5e',
    pill2Bg: '#38bdf8',
    pill3Bg: '#facc15',
    badgeBg: '#a855f7',
    title2Color: '#facc15',
    subBarBorder: '#38bdf8'
  },
  // 1: Lime Wireframes & Cyan 3D Title (Matrix Kinetic)
  {
    wireColor: '#4ade80',
    pill1Bg: '#16a34a',
    ovalBg: '#f97316',
    pill2Bg: '#4ade80',
    pill3Bg: '#38bdf8',
    badgeBg: '#0284c7',
    title2Color: '#38bdf8',
    subBarBorder: '#4ade80'
  },
  // 2: Hot Pink Wireframes & Volt Lime 3D Title (Hyperpop Dark)
  {
    wireColor: '#f43f5e',
    pill1Bg: '#db2777',
    ovalBg: '#8b5cf6',
    pill2Bg: '#f43f5e',
    pill3Bg: '#ccff00',
    badgeBg: '#e11d48',
    title2Color: '#ccff00',
    subBarBorder: '#f43f5e'
  },
  // 3: Amber Wireframes & Sky Cyan 3D Title (Solar Eclipse)
  {
    wireColor: '#fbbf24',
    pill1Bg: '#ea580c',
    ovalBg: '#06b6d4',
    pill2Bg: '#fbbf24',
    pill3Bg: '#38bdf8',
    badgeBg: '#d97706',
    title2Color: '#38bdf8',
    subBarBorder: '#fbbf24'
  },
  // 4: Purple Violet Wireframes & Radiant Gold 3D Title (Luxury Tech)
  {
    wireColor: '#c084fc',
    pill1Bg: '#7c3aed',
    ovalBg: '#ef4444',
    pill2Bg: '#c084fc',
    pill3Bg: '#facc15',
    badgeBg: '#9333ea',
    title2Color: '#fde047',
    subBarBorder: '#c084fc'
  }
];

export function renderStyle4_EditorialKinetic(w, h, post, colorIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const c = S4_COLOR_THEMES[colorIdx % S4_COLOR_THEMES.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    ${DROP_SHADOW_FILTER}
  </defs>

  <!-- 1. Content-Aware Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Wash -->
  <rect width="${w}" height="${h}" fill="#000000" opacity="0.45"/>

  <!-- 3. Repeated Wireframe Outline Typography Echoes (Top & Bottom) -->
  <g transform="translate(${w / 2}, 110) rotate(-4.5) skewX(-4)" opacity="0.35">
    <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="135" font-weight="900" fill="none" stroke="${c.wireColor}" stroke-width="3" letter-spacing="-4">
      ${escapeXml(title1)} ${escapeXml(title2)}
    </text>
  </g>
  <g transform="translate(${w / 2}, ${h - 40}) rotate(-4.5) skewX(-4)" opacity="0.35">
    <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="135" font-weight="900" fill="none" stroke="${c.wireColor}" stroke-width="3" letter-spacing="-4">
      ${escapeXml(title1)} ${escapeXml(title2)}
    </text>
  </g>

  <!-- 4. Colorful Kinetic Stickers Scattered Around -->
  <!-- Top-Left Pill -->
  <g transform="translate(180, 100) rotate(-12)" filter="url(#megaShadow)">
    <rect x="-85" y="-22" width="170" height="44" rx="22" fill="${c.pill1Bg}"/>
    <text x="0" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="1">
      ✦ START NOW
    </text>
  </g>

  <!-- Top-Right Oval Sticker -->
  <g transform="translate(${w - 200}, 90) rotate(14)" filter="url(#megaShadow)">
    <ellipse cx="0" cy="0" rx="65" ry="32" fill="${c.ovalBg}"/>
    <text x="0" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="15" font-weight="900" fill="#ffffff">
      ${escapeXml(badge)}
    </text>
  </g>

  <!-- Bottom-Left Pill -->
  <g transform="translate(190, ${h - 130}) rotate(8)" filter="url(#megaShadow)">
    <rect x="-95" y="-22" width="190" height="44" rx="22" fill="${c.pill2Bg}"/>
    <text x="0" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="15" font-weight="900" fill="#000000">
      ✔ AI 최적화 완료
    </text>
  </g>

  <!-- Bottom-Right Pill -->
  <g transform="translate(${w - 180}, ${h - 130}) rotate(-8)" filter="url(#megaShadow)">
    <rect x="-90" y="-22" width="180" height="44" rx="22" fill="${c.pill3Bg}"/>
    <text x="0" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="#000000" letter-spacing="1">
      ★ 실전 적용 100%
    </text>
  </g>

  <!-- 5. Central Solid Giant White Headline (-4.5 deg dynamic tilt) -->
  <g transform="translate(${w / 2}, ${h / 2 - 10}) rotate(-4.5) skewX(-4)" filter="url(#megaShadow)">
    
    <!-- Top Mini Arch Badge -->
    <g transform="translate(0, -100)">
      <rect x="-130" y="-20" width="260" height="40" rx="20" fill="${c.badgeBg}"/>
      <text x="0" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="18" font-weight="900" fill="#ffffff">
        ${escapeXml(badge)}
      </text>
    </g>

    <!-- Main Solid Bold White Headline (Line 1) -->
    <g transform="translate(0, 15)">
      <text x="0" y="12" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="140" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="140" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Line 2 (Second Line with High Contrast Color) -->
    <g transform="translate(0, 130)">
      <text x="0" y="12" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="148" font-weight="900" fill="${c.title2Color}" stroke="#000000" stroke-width="16" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- Bottom Center Subtitle Bar -->
  <g transform="translate(${w / 2}, ${h - 55})" filter="url(#megaShadow)">
    <rect x="-260" y="-20" width="520" height="40" rx="20" fill="#000000" stroke="${c.subBarBorder}" stroke-width="2"/>
    <text x="0" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="18" font-weight="800" fill="#ffffff">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// STYLE 5: Perspective Manga Squeeze / 3D Speed Slash (Reference: "LOL 峡谷成功学")
// -----------------------------------------------------------------------------
const S5_COLOR_THEMES = [
  // 0: Anime Electric Blue (Original Reference)
  {
    bgGrad: ['#f0f9ff', '#e0f2fe', '#bae6fd'],
    speedLines: '#2563eb',
    title1Grad: ['#1d4ed8', '#2563eb'],
    title1Stroke: '#ffffff',
    title2Grad: ['#0284c7', '#0369a1'],
    title2Stroke: '#ffffff',
    bannerBg: '#1e293b',
    bannerText: '#ffffff',
    highlight: '#38bdf8',
    sparkColor: '#facc15'
  },
  // 1: Mecha Crimson Fire
  {
    bgGrad: ['#fff1f2', '#ffe4e6', '#fecdd3'],
    speedLines: '#dc2626',
    title1Grad: ['#b91c1c', '#dc2626'],
    title1Stroke: '#ffffff',
    title2Grad: ['#991b1b', '#b91c1c'],
    title2Stroke: '#ffffff',
    bannerBg: '#450a0a',
    bannerText: '#ffffff',
    highlight: '#fb7185',
    sparkColor: '#facc15'
  },
  // 2: Cyber Acid Volt (Dark Mode High Contrast)
  {
    bgGrad: ['#090d16', '#0f172a', '#1e293b'],
    speedLines: '#65a30d',
    title1Grad: ['#ccff00', '#a3e635'],
    title1Stroke: '#000000',
    title2Grad: ['#38bdf8', '#0284c7'],
    title2Stroke: '#000000',
    bannerBg: '#000000',
    bannerText: '#ccff00',
    highlight: '#ccff00',
    sparkColor: '#38bdf8'
  },
  // 3: Hyper Violet Arcade
  {
    bgGrad: ['#faf5ff', '#f3e8ff', '#e9d5ff'],
    speedLines: '#7c3aed',
    title1Grad: ['#6d28d9', '#7c3aed'],
    title1Stroke: '#ffffff',
    title2Grad: ['#4c1d95', '#6d28d9'],
    title2Stroke: '#ffffff',
    bannerBg: '#2e1065',
    bannerText: '#ffffff',
    highlight: '#c084fc',
    sparkColor: '#facc15'
  },
  // 4: Solar Gold Dynamo
  {
    bgGrad: ['#fffbeb', '#fef3c7', '#fde68a'],
    speedLines: '#d97706',
    title1Grad: ['#b45309', '#d97706'],
    title1Stroke: '#ffffff',
    title2Grad: ['#92400e', '#b45309'],
    title2Stroke: '#ffffff',
    bannerBg: '#451a03',
    bannerText: '#ffffff',
    highlight: '#facc15',
    sparkColor: '#ea580c'
  }
];

export function renderStyle5_PerspectiveSlash(w, h, post, colorIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const c = S5_COLOR_THEMES[colorIdx % S5_COLOR_THEMES.length];

  // Dynamic font sizing to guarantee 100% visibility with zero clipping
  const t1Len = Math.max(title1.length, 1);
  const t2Len = Math.max(title2.length, 1);
  const t1Size = Math.min(140, Math.max(95, Math.floor(1100 / Math.max(t1Len, 5.5))));
  const t2Size = Math.min(148, Math.max(100, Math.floor(1150 / Math.max(t2Len, 5.5))));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s5BgGrad_${colorIdx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${c.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${c.bgGrad[2]}"/>
    </linearGradient>

    <linearGradient id="s5T1Grad_${colorIdx}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${c.title1Grad[0]}"/>
      <stop offset="100%" stop-color="${c.title1Grad[1]}"/>
    </linearGradient>

    <linearGradient id="s5T2Grad_${colorIdx}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${c.title2Grad[0]}"/>
      <stop offset="100%" stop-color="${c.title2Grad[1]}"/>
    </linearGradient>

    ${DROP_SHADOW_FILTER}
  </defs>

  <!-- 1. Content-Aware Thematic Background -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dynamic Perspective Base Gradient Overlay -->
  <rect width="${w}" height="${h}" fill="url(#s5BgGrad_${colorIdx})" opacity="0.82"/>

  <!-- 3. High-Energy Fisheye 3D Perspective Speed Rays Converging to Center Horizon -->
  <g opacity="0.32">
    <polygon points="0,0 350,0 ${w/2 - 100},${h/2}" fill="${c.speedLines}"/>
    <polygon points="${w},0 ${w - 350},0 ${w/2 + 100},${h/2}" fill="${c.speedLines}"/>
    <polygon points="0,${h} 380,${h} ${w/2 - 120},${h/2}" fill="${c.speedLines}"/>
    <polygon points="${w},${h} ${w - 380},${h} ${w/2 + 120},${h/2}" fill="${c.speedLines}"/>
    <polygon points="0,${h/2 - 90} 0,${h/2 + 90} ${w/2 - 150},${h/2}" fill="${c.speedLines}"/>
    <polygon points="${w},${h/2 - 90} ${w},${h/2 + 90} ${w/2 + 150},${h/2}" fill="${c.speedLines}"/>
  </g>

  <!-- 4. Corner Perspective Angled Banners & Doodles -->
  <!-- Top-Left Angled Strip -->
  <g transform="translate(35, 60) rotate(-14)" filter="url(#megaShadow)">
    <rect x="-10" y="-18" width="310" height="38" rx="6" fill="${c.bannerBg}"/>
    <text x="145" y="8" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="15" font-weight="900" fill="${c.bannerText}" letter-spacing="1">
      ⚡ AI 공략 // ${escapeXml(badge)}
    </text>
  </g>

  <!-- Top-Right Angled Strip -->
  <g transform="translate(${w - 280}, 65) rotate(14)" filter="url(#megaShadow)">
    <rect x="-10" y="-18" width="280" height="38" rx="6" fill="${c.bannerBg}"/>
    <text x="130" y="8" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="14" font-weight="900" fill="${c.bannerText}" letter-spacing="1">
      ★ 2026 최신 트렌드 검증
    </text>
  </g>

  <!-- Bottom-Left Angled Strip -->
  <g transform="translate(45, ${h - 75}) rotate(12)" filter="url(#megaShadow)">
    <rect x="-10" y="-18" width="290" height="36" rx="6" fill="${c.bannerBg}"/>
    <text x="135" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="14" font-weight="900" fill="${c.bannerText}">
      ✔ 단 3분 마스터 핵심 비법
    </text>
  </g>

  <!-- Bottom-Right Angled Strip -->
  <g transform="translate(${w - 275}, ${h - 70}) rotate(-12)" filter="url(#megaShadow)">
    <rect x="-10" y="-18" width="275" height="36" rx="6" fill="${c.bannerBg}"/>
    <text x="127" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="14" font-weight="900" fill="${c.bannerText}">
      ✦ GO! TAKE RISKS 100%
    </text>
  </g>

  <!-- Top Center Game Emblem Badge -->
  <g transform="translate(${w/2}, 65)" filter="url(#megaShadow)">
    <rect x="-130" y="-20" width="260" height="40" rx="20" fill="#000000" stroke="${c.highlight}" stroke-width="3"/>
    <text x="0" y="7" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="17" font-weight="900" fill="#ffffff" letter-spacing="2">
      ⚡ RAB8BIT AI LAB
    </text>
  </g>

  <!-- 5. Central High-Energy 2-Line Manga Perspective Headline -->
  <g transform="translate(${w/2}, ${h/2 - 10})" filter="url(#megaShadow)">
    
    <!-- Line 1 (Upper Tier - Dynamic Left Squeeze Tilt) -->
    <g transform="translate(0, -50) rotate(-3.5) skewX(-4)">
      <!-- Deep 3D Shadow -->
      <text x="0" y="20" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="${t1Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
      <!-- Main Gradient Body with Crisp White/Dark Stroke -->
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="${t1Size}" font-weight="900" fill="url(#s5T1Grad_${colorIdx})" stroke="${c.title1Stroke}" stroke-width="14" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
      <!-- Manga Slash Accents -->
      <polygon points="${-t1Len * (t1Size * 0.38) - 30},-40 ${-t1Len * (t1Size * 0.38) - 10},-25 ${-t1Len * (t1Size * 0.38) - 45},-10" fill="${c.highlight}"/>
    </g>

    <!-- Line 2 (Lower Tier - Dynamic Right Squeeze Tilt) -->
    <g transform="translate(0, 95) rotate(2.5) skewX(3)">
      <!-- Deep 3D Shadow -->
      <text x="0" y="22" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="${t2Size}" font-weight="900" fill="#000000" stroke="#000000" stroke-width="28" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <!-- Main Gradient Body with Crisp White/Dark Stroke -->
      <text x="0" y="0" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="${t2Size}" font-weight="900" fill="url(#s5T2Grad_${colorIdx})" stroke="${c.title2Stroke}" stroke-width="16" paint-order="stroke fill" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <!-- Manga Slash Accents -->
      <polygon points="${t2Len * (t2Size * 0.38) + 30},-30 ${t2Len * (t2Size * 0.38) + 10},-15 ${t2Len * (t2Size * 0.38) + 45},0" fill="${c.highlight}"/>
    </g>

    <!-- Central Energy Spark Accents -->
    <g transform="translate(${Math.min(360, t2Len * 50)}, 30)">
      <polygon points="0,-22 14,0 2,0 10,22 -14,5 0,5" fill="${c.sparkColor}" stroke="#000000" stroke-width="3"/>
    </g>
  </g>

  <!-- Bottom Anchor Subtitle Pill -->
  <g transform="translate(${w/2}, ${h - 50})" filter="url(#megaShadow)">
    <rect x="-260" y="-18" width="520" height="36" rx="18" fill="#000000" stroke="${c.highlight}" stroke-width="2"/>
    <text x="0" y="6" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="16" font-weight="900" fill="#ffffff">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// STYLE 6: Editorial Monolithic Stack / Fashion Headline (Reference: "I AM POWERFUL")
// -----------------------------------------------------------------------------
const S6_COLOR_THEMES = [
  // 0: Vogue Carmine Red & Studio Charcoal (Original Reference)
  {
    bgWash: '#09090b',
    monoText: '#ef4444',
    monoTextStroke: '#000000',
    monoShadow: '#7f1d1d',
    accentLine: '#f87171',
    quoteColor: '#fca5a5',
    tagBg: '#ef4444',
    tagText: '#ffffff'
  },
  // 1: Acid Volt & Deep Obsidian
  {
    bgWash: '#020617',
    monoText: '#ccff00',
    monoTextStroke: '#000000',
    monoShadow: '#365314',
    accentLine: '#a3e635',
    quoteColor: '#bef264',
    tagBg: '#ccff00',
    tagText: '#000000'
  },
  // 2: Cyber Sky Cyan & Midnight Cobalt
  {
    bgWash: '#030712',
    monoText: '#38bdf8',
    monoTextStroke: '#000000',
    monoShadow: '#0c4a6e',
    accentLine: '#7dd3fc',
    quoteColor: '#bae6fd',
    tagBg: '#0284c7',
    tagText: '#ffffff'
  },
  // 3: Radiant Gold & Espresso Noir
  {
    bgWash: '#1c1917',
    monoText: '#facc15',
    monoTextStroke: '#000000',
    monoShadow: '#78350f',
    accentLine: '#fde047',
    quoteColor: '#fef08a',
    tagBg: '#eab308',
    tagText: '#000000'
  },
  // 4: Hyper Neon Pink & Velvet Smoke
  {
    bgWash: '#0f172a',
    monoText: '#f43f5e',
    monoTextStroke: '#000000',
    monoShadow: '#881337',
    accentLine: '#fb7185',
    quoteColor: '#fbcfe8',
    tagBg: '#e11d48',
    tagText: '#ffffff'
  }
];

export function renderStyle6_EditorialMonolith(w, h, post, colorIdx = 0) {
  const { badge, title1, title2, subTag } = parseHookingCopy(post);
  const theme = detectSceneTheme(post);
  const c = S6_COLOR_THEMES[colorIdx % S6_COLOR_THEMES.length];

  // Dynamic font sizing for left column so long words never overflow
  const t1Len = Math.max(title1.length, 1);
  const t2Len = Math.max(title2.length, 1);
  const t1Size = Math.min(136, Math.max(88, Math.floor(660 / Math.max(t1Len, 4.2))));
  const t2Size = Math.min(138, Math.max(90, Math.floor(680 / Math.max(t2Len, 4.2))));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <!-- Woodblock / Brush Distressed Texture Filter -->
    <filter id="woodblockTexture_${colorIdx}" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    ${DROP_SHADOW_FILTER}
  </defs>

  <!-- 1. Thematic Background Scene -->
  ${renderThematicBackgroundScene(theme, w, h)}

  <!-- 2. Dark Cinematic Vignette & Studio Lighting Overlay -->
  <rect width="${w}" height="${h}" fill="${c.bgWash}" opacity="0.65"/>
  <radialGradient id="s6Spotlight_${colorIdx}" cx="75%" cy="45%" r="65%">
    <stop offset="0%" stop-color="${c.accentLine}" stop-opacity="0.25"/>
    <stop offset="60%" stop-color="#000000" stop-opacity="0.8"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.95"/>
  </radialGradient>
  <rect width="${w}" height="${h}" fill="url(#s6Spotlight_${colorIdx})"/>

  <!-- 3. Right Cinematic Framing Graphic (Futuristic AI Portal Aesthetic) -->
  <g transform="translate(${w - 300}, ${h/2})" opacity="0.4" filter="url(#megaShadow)">
    <circle cx="0" cy="0" r="210" fill="none" stroke="${c.monoText}" stroke-width="4" stroke-dasharray="12,6"/>
    <circle cx="0" cy="0" r="160" fill="none" stroke="${c.accentLine}" stroke-width="2"/>
    <circle cx="0" cy="0" r="85" fill="${c.monoShadow}" opacity="0.6"/>
  </g>

  <!-- 4. Top Editorial Metadata Headers -->
  <g transform="translate(80, 65)">
    <rect x="0" y="-16" width="130" height="28" rx="4" fill="${c.tagBg}"/>
    <text x="65" y="3" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="13" font-weight="900" fill="${c.tagText}">
      ${escapeXml(badge)}
    </text>
    <text x="150" y="3" font-family="monospace" font-size="14" font-weight="900" fill="#94a3b8" letter-spacing="2">
      ISSUE NO.2026 // VOL.08 — RAB8BIT EDITORIAL ARCHIVE
    </text>
  </g>

  <!-- 5. Giant Left-Aligned 3-Tier Monolithic Stacked Typography -->
  <g transform="translate(80, 95)" filter="url(#woodblockTexture_${colorIdx})">
    
    <!-- Tier 1: Bold Top Hook Label -->
    <g transform="translate(0, 90)" filter="url(#megaShadow)">
      <text x="0" y="10" font-family="${FONT_FAMILY}" font-size="95" font-weight="900" fill="${c.monoShadow}" stroke="#000000" stroke-width="12" letter-spacing="-3">
        AI TREND
      </text>
      <text x="0" y="0" font-family="${FONT_FAMILY}" font-size="95" font-weight="900" fill="${c.monoText}" letter-spacing="-3">
        AI TREND
      </text>
    </g>

    <!-- Tier 2: Title Line 1 (Giant Monolithic Condensed) -->
    <g transform="translate(0, 225)" filter="url(#megaShadow)">
      <text x="0" y="14" font-family="${FONT_FAMILY}" font-size="${t1Size}" font-weight="900" fill="${c.monoShadow}" stroke="#000000" stroke-width="14" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
      <text x="0" y="0" font-family="${FONT_FAMILY}" font-size="${t1Size}" font-weight="900" fill="${c.monoText}" letter-spacing="-4">
        ${escapeXml(title1)}
      </text>
    </g>

    <!-- Tier 3: Title Line 2 (Giant Monolithic Condensed) -->
    <g transform="translate(0, 365)" filter="url(#megaShadow)">
      <text x="0" y="14" font-family="${FONT_FAMILY}" font-size="${t2Size}" font-weight="900" fill="${c.monoShadow}" stroke="#000000" stroke-width="14" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
      <text x="0" y="0" font-family="${FONT_FAMILY}" font-size="${t2Size}" font-weight="900" fill="${c.monoText}" letter-spacing="-4">
        ${escapeXml(title2)}
      </text>
    </g>
  </g>

  <!-- 6. Editorial Quote Paragraph Beside/Below (Reference 2 Styling) -->
  <g transform="translate(80, ${h - 90})" filter="url(#megaShadow)">
    <line x1="0" y1="0" x2="360" y2="0" stroke="${c.accentLine}" stroke-width="3"/>
    <text x="0" y="22" font-family="${FONT_FAMILY}" font-size="15" font-weight="900" fill="${c.quoteColor}" letter-spacing="1">
      THE MOST POWERFUL AI WORKFLOW FOR MODERN BUILDERS.
    </text>
    <text x="0" y="42" font-family="${FONT_FAMILY}" font-size="14" font-weight="800" fill="#cbd5e1" letter-spacing="0.5">
      ✦ ${escapeXml(subTag)}
    </text>
  </g>

  <!-- Right Side Minimalist Tech Seal -->
  <g transform="translate(${w - 80}, ${h - 80}) rotate(90)" opacity="0.75">
    <text x="0" y="0" text-anchor="middle" font-family="monospace" font-size="12" font-weight="900" fill="${c.quoteColor}" letter-spacing="4">
      RAB8BIT.COM // 2026
    </text>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// Master Dispatcher: 6 Signature Layouts x 5 Color Palettes (30 Total Variations)
// -----------------------------------------------------------------------------
export function renderMasterHookThumbnail(post, index, w = 1280, h = 720) {
  const layoutIdx = index % 6;
  const colorIdx = Math.floor(index / 6) % 5;

  switch (layoutIdx) {
    case 0:
      return renderStyle1_FreshNews(w, h, post, colorIdx);
    case 1:
      return renderStyle2_ComicPop(w, h, post, colorIdx);
    case 2:
      return renderStyle3_StreetCaution(w, h, post, colorIdx);
    case 3:
      return renderStyle4_EditorialKinetic(w, h, post, colorIdx);
    case 4:
      return renderStyle5_PerspectiveSlash(w, h, post, colorIdx);
    case 5:
    default:
      return renderStyle6_EditorialMonolith(w, h, post, colorIdx);
  }
}

export function renderContentAwareBlogSVG(post, w = 1280, h = 720) {
  const hash = (post.id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return renderMasterHookThumbnail(post, hash, w, h);
}

// -----------------------------------------------------------------------------
// Generate All 59 Thumbnails
// -----------------------------------------------------------------------------
export async function generateAllHookThumbnails() {
  console.log('🚀 Generating Thumbnails with 6 Signature Layouts x 5 Color Patterns (30 Total Variations) + Paperlogy Font...');
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

  console.log(`✅ Successfully generated ${count} thumbnails matching 6 layouts x 5 color themes with Paperlogy font in ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllHookThumbnails().catch(console.error);
}
