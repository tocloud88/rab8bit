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
// Dedicated Content-Aware Visual Generators
// Each generator creates a unique background, specific domain graphics, and crisp editorial typography.
// -----------------------------------------------------------------------------

// Visual theme configurations based on post ID / subject
export function getPostVisualTheme(post) {
  const id = post.id || '';
  const title = post.title || '';
  const tags = (post.tags || []).join(' ');
  const text = (id + ' ' + title + ' ' + tags).toLowerCase();

  if (text.includes('gpt-6') || text.includes('astra') || text.includes('에이전트') || text.includes('agent')) {
    return 'ai_agent';
  } else if (text.includes('설명 검증') || text.includes('hallucination') || text.includes('믿으면 안') || text.includes('오해') || text.includes('한계')) {
    return 'ai_audit';
  } else if (text.includes('재테크') || text.includes('주가') || text.includes('수익률') || text.includes('stock') || text.includes('강의')) {
    return 'ai_finance';
  } else if (text.includes('크롬') || text.includes('브라우저') || text.includes('chrome') || text.includes('browser')) {
    return 'browser_ai';
  } else if (text.includes('웹사이트') || text.includes('클로드 스킬') || text.includes('claude skills') || text.includes('아티팩트') || text.includes('artifacts')) {
    return 'web_design';
  } else if (text.includes('논문') || text.includes('보고서') || text.includes('요약') || text.includes('pdf') || text.includes('100만 토큰') || text.includes('문서 분석')) {
    return 'doc_summary';
  } else if (text.includes('회의') || text.includes('업무 시간') || text.includes('생산성') || text.includes('일잘러') || text.includes('시간 관리')) {
    return 'meeting_productivity';
  } else if (text.includes('예스맨') || text.includes('조언자') || text.includes('프롬프트') || text.includes('prompt') || text.includes('시스템 프롬프트')) {
    return 'prompt_engineering';
  } else if (text.includes('90개') || text.includes('프로그램') || text.includes('바이브 코딩') || text.includes('vibe coding') || text.includes('1인 창업') || text.includes('1인개발')) {
    return 'app_matrix';
  } else if (text.includes('애드센스') || text.includes('adsense') || text.includes('seo') || text.includes('aeo') || text.includes('검색')) {
    return 'seo_adsense';
  } else if (text.includes('레트로') || text.includes('게임') || text.includes('game') || text.includes('8bit')) {
    return 'retro_game';
  } else if (text.includes('canvas') || text.includes('캔버스') || text.includes('workspace')) {
    return 'gemini_canvas';
  } else if (text.includes('open webui') || text.includes('로컬') || text.includes('local llm') || text.includes('ollama')) {
    return 'local_llm';
  } else if (text.includes('탐지') || text.includes('gptzero') || text.includes('휴머나이징') || text.includes('인간화')) {
    return 'humanizing';
  } else if (text.includes('cursor') || text.includes('windsurf') || text.includes('copilot') || text.includes('코딩')) {
    return 'code_battle';
  } else if (text.includes('rag') || text.includes('벡터') || text.includes('검색 증강')) {
    return 'rag_architecture';
  } else if (text.includes('n8n') || text.includes('자동화') || text.includes('뉴스레터') || text.includes('automation')) {
    return 'workflow_automation';
  } else if (text.includes('terminal') || text.includes('터미널') || text.includes('cli') || text.includes('claude code')) {
    return 'terminal_cli';
  } else if (text.includes('음악') || text.includes('lyria') || text.includes('music') || text.includes('작곡')) {
    return 'music_ai';
  } else if (text.includes('이미지') || text.includes('미드저니') || text.includes('나노바나나') || text.includes('image')) {
    return 'image_ai';
  } else if (text.includes('멀티모달') || text.includes('gpt4o') || text.includes('multimodal')) {
    return 'multimodal_ai';
  } else if (text.includes('빅4') || text.includes('비교') || text.includes('vs') || text.includes('대결')) {
    return 'model_battle';
  } else if (text.includes('오케스트레이션') || text.includes('autogen') || text.includes('crewai')) {
    return 'multi_agent';
  } else if (text.includes('스냅블로그') || text.includes('네이버블로그') || text.includes('티스토리')) {
    return 'blog_auto';
  } else if (text.includes('익스텐션') || text.includes('드라이브') || text.includes('유튜브')) {
    return 'google_ecosystem';
  } else if (text.includes('리더') || text.includes('리더십') || text.includes('스마트 워크')) {
    return 'leadership_ai';
  } else {
    return 'tech_insight_general';
  }
}

// -----------------------------------------------------------------------------
// Graphic Builders for specific themes
// -----------------------------------------------------------------------------

function renderThemeIllustration(theme, w, h) {
  switch (theme) {
    case 'ai_agent':
      return `
        <!-- AI Agent / Autonomous System Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <circle cx="0" cy="0" r="170" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.4"/>
          <circle cx="0" cy="0" r="120" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
          <circle cx="0" cy="0" r="70" fill="url(#agentCoreGrad)" filter="url(#glow)"/>
          
          <!-- Orbiting Agent Nodes -->
          <g transform="rotate(25)">
            <circle cx="120" cy="0" r="14" fill="#38bdf8"/>
            <text x="120" y="4" text-anchor="middle" font-size="9" font-family="sans-serif" font-weight="900" fill="#030712">TASK</text>
          </g>
          <g transform="rotate(145)">
            <circle cx="120" cy="0" r="14" fill="#a855f7"/>
            <text x="120" y="4" text-anchor="middle" font-size="9" font-family="sans-serif" font-weight="900" fill="#ffffff">TOOL</text>
          </g>
          <g transform="rotate(265)">
            <circle cx="120" cy="0" r="14" fill="#10b981"/>
            <text x="120" y="4" text-anchor="middle" font-size="9" font-family="sans-serif" font-weight="900" fill="#030712">EXEC</text>
          </g>
          
          <!-- Floating Holographic HUD Panels -->
          <g transform="translate(-160, -90)">
            <rect width="130" height="60" rx="10" fill="#0f172a" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="12" y="24" font-family="monospace" font-size="11" font-weight="700" fill="#38bdf8">AGENT_STATUS</text>
            <text x="12" y="44" font-family="monospace" font-size="13" font-weight="900" fill="#4ade80">AUTONOMOUS ✔</text>
          </g>
          <g transform="translate(60, 60)">
            <rect width="130" height="55" rx="10" fill="#0f172a" fill-opacity="0.85" stroke="#a855f7" stroke-width="1.5"/>
            <text x="12" y="22" font-family="monospace" font-size="11" font-weight="700" fill="#c084fc">CONTEXT_WINDOW</text>
            <text x="12" y="42" font-family="monospace" font-size="13" font-weight="900" fill="#38bdf8">1,050,000 TKN</text>
          </g>
        </g>
      `;

    case 'ai_audit':
      return `
        <!-- Model Self-Explanation & Hallucination Audit Graphic -->
        <g transform="translate(${w * 0.73}, ${h * 0.5})">
          <!-- Logic Decision Tree Grid -->
          <rect x="-170" y="-120" width="340" height="240" rx="18" fill="#0f172a" fill-opacity="0.8" stroke="#ef4444" stroke-width="1.5"/>
          
          <path d="M -100 0 L -30 -50 L 50 -50 M -30 -50 L 50 10 M -100 0 L -30 60 L 50 60" fill="none" stroke="#64748b" stroke-width="3"/>
          <circle cx="-100" cy="0" r="16" fill="#3b82f6"/>
          <circle cx="-30" cy="-50" r="14" fill="#eab308"/>
          <circle cx="-30" cy="60" r="14" fill="#10b981"/>
          <circle cx="50" cy="-50" r="14" fill="#ef4444"/>
          <circle cx="50" cy="10" r="14" fill="#10b981"/>
          <circle cx="50" cy="60" r="14" fill="#3b82f6"/>
          
          <!-- Big Magnifying Glass Inspection Lens -->
          <g transform="translate(40, -10) rotate(-25)">
            <circle cx="0" cy="0" r="55" fill="#1e293b" fill-opacity="0.7" stroke="#38bdf8" stroke-width="5" filter="url(#glow)"/>
            <line x1="38" y1="38" x2="85" y2="85" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
            <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="900" fill="#f87171">AUDIT !</text>
          </g>

          <!-- Hallucination vs Fact Verification Badge -->
          <g transform="translate(-140, 75)">
            <rect width="140" height="34" rx="8" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5"/>
            <text x="70" y="22" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="800" fill="#fca5a5">⚠️ 환각(검증) 필수</text>
          </g>
        </g>
      `;

    case 'ai_finance':
      return `
        <!-- AI Stock & Wealth Terminal Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <rect x="-180" y="-125" width="360" height="250" rx="16" fill="#090d16" stroke="#f59e0b" stroke-width="1.5"/>
          
          <!-- Candlestick chart simulation -->
          <line x1="-120" y1="60" x2="-120" y2="-20" stroke="#10b981" stroke-width="2"/>
          <rect x="-132" y="10" width="24" height="40" rx="3" fill="#10b981"/>
          
          <line x1="-70" y1="30" x2="-70" y2="-60" stroke="#10b981" stroke-width="2"/>
          <rect x="-82" y="-40" width="24" height="50" rx="3" fill="#10b981"/>
          
          <line x1="-20" y1="10" x2="-20" y2="-40" stroke="#ef4444" stroke-width="2"/>
          <rect x="-32" y="-25" width="24" height="30" rx="3" fill="#ef4444"/>

          <line x1="30" y1="40" x2="30" y2="-80" stroke="#10b981" stroke-width="2"/>
          <rect x="18" y="-60" width="24" height="70" rx="3" fill="#10b981"/>

          <line x1="80" y1="-10" x2="80" y2="-100" stroke="#10b981" stroke-width="2"/>
          <rect x="68" y="-90" width="24" height="60" rx="3" fill="#10b981"/>

          <!-- Exponential Golden Trend Line -->
          <path d="M -150 70 Q -30 20 110 -85" fill="none" stroke="#fbbf24" stroke-width="4" filter="url(#glow)"/>

          <!-- Growth ROI Pill -->
          <g transform="translate(30, 60)">
            <rect width="130" height="42" rx="10" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
            <text x="65" y="26" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="900" fill="#ffffff">ROI +342.8% ▲</text>
          </g>
        </g>
      `;

    case 'browser_ai':
      return `
        <!-- Chrome & Browser Autonomous AI Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <!-- Browser Frame -->
          <rect x="-180" y="-120" width="360" height="240" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <!-- Browser Tab Bar -->
          <rect x="-180" y="-120" width="360" height="36" rx="14" fill="#1e293b"/>
          <circle cx="-160" cy="-102" r="5" fill="#ef4444"/>
          <circle cx="-145" cy="-102" r="5" fill="#eab308"/>
          <circle cx="-130" cy="-102" r="5" fill="#22c55e"/>
          
          <!-- URL bar -->
          <rect x="-110" y="-112" width="220" height="20" rx="6" fill="#0f172a"/>
          <text x="-95" y="-98" font-family="monospace" font-size="10" fill="#94a3b8">https://agent.chrome.ai</text>
          
          <!-- Chrome AI Logo in center -->
          <circle cx="0" cy="15" r="55" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
          <circle cx="0" cy="15" r="28" fill="#3b82f6"/>
          <path d="M 0 -40 L 45 10 L 15 55 Z" fill="#ef4444" opacity="0.85"/>
          <path d="M 45 10 L 0 70 L -45 20 Z" fill="#22c55e" opacity="0.85"/>
          <path d="M -45 20 L -15 -35 L 25 -10 Z" fill="#eab308" opacity="0.85"/>

          <!-- Autonomous Cursor Pointer -->
          <g transform="translate(60, 45)">
            <polygon points="0,0 24,18 14,19 19,30 13,32 8,21 0,26" fill="#38bdf8" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
          </g>
        </g>
      `;

    case 'web_design':
      return `
        <!-- Web Design & Claude Skills Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <!-- Isometric Modern Web Mockup -->
          <g transform="rotate(-6) skewX(-4)">
            <rect x="-170" y="-110" width="340" height="220" rx="16" fill="#090d16" stroke="#818cf8" stroke-width="2" filter="url(#glow)"/>
            
            <!-- Header bar -->
            <rect x="-150" y="-90" width="100" height="14" rx="4" fill="#6366f1"/>
            <rect x="70" y="-90" width="60" height="14" rx="7" fill="#10b981"/>
            
            <!-- Hero Card -->
            <rect x="-150" y="-60" width="180" height="70" rx="10" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
            <rect x="-135" y="-45" width="120" height="12" rx="4" fill="#a5b4fc"/>
            <rect x="-135" y="-25" width="80" height="10" rx="4" fill="#6366f1"/>
            
            <!-- Interactive Widgets -->
            <rect x="50" y="-60" width="80" height="70" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
            <circle cx="90" cy="-25" r="18" fill="#0284c7"/>

            <!-- Bottom Cards Grid -->
            <rect x="-150" y="25" width="85" height="60" rx="8" fill="#1e293b"/>
            <rect x="-55" y="25" width="85" height="60" rx="8" fill="#1e293b"/>
            <rect x="40" y="25" width="90" height="60" rx="8" fill="#312e81" stroke="#a855f7" stroke-width="1"/>
          </g>
        </g>
      `;

    case 'doc_summary':
      return `
        <!-- Document / Research Paper 3-Line Summary Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <!-- Layered PDF Documents -->
          <g transform="translate(-40, -20) rotate(-8)">
            <rect x="-80" y="-90" width="160" height="200" rx="10" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <line x1="-60" y1="-60" x2="40" y2="-60" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
            <line x1="-60" y1="-40" x2="20" y2="-40" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
          </g>

          <g transform="translate(0, 0)">
            <rect x="-90" y="-100" width="180" height="220" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
            
            <!-- Laser Scanning Beam -->
            <line x1="-80" y1="-30" x2="80" y2="-30" stroke="#38bdf8" stroke-width="3" filter="url(#glow)"/>
            
            <!-- 3 Glowing Golden Summary Bullets -->
            <g transform="translate(-70, 0)">
              <circle cx="10" cy="0" r="6" fill="#fbbf24"/>
              <rect x="25" y="-5" width="115" height="10" rx="4" fill="#fef08a"/>
              
              <circle cx="10" cy="30" r="6" fill="#fbbf24"/>
              <rect x="25" y="25" width="95" height="10" rx="4" fill="#fef08a"/>
              
              <circle cx="10" cy="60" r="6" fill="#fbbf24"/>
              <rect x="25" y="55" width="105" height="10" rx="4" fill="#fef08a"/>
            </g>

            <!-- 3-Line Badge -->
            <g transform="translate(30, -80)">
              <rect width="65" height="26" rx="6" fill="#0284c7"/>
              <text x="32" y="17" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="900" fill="#ffffff">3줄 요약</text>
            </g>
          </g>
        </g>
      `;

    case 'meeting_productivity':
      return `
        <!-- Meeting Automation & Productivity Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <!-- Voice Soundwave to Action Items Container -->
          <rect x="-170" y="-115" width="340" height="230" rx="16" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
          
          <!-- Soundwave Animation Bars -->
          <g transform="translate(-130, -50)">
            <rect x="0" y="5" width="6" height="20" rx="3" fill="#34d399"/>
            <rect x="12" y="-10" width="6" height="50" rx="3" fill="#10b981"/>
            <rect x="24" y="-25" width="6" height="80" rx="3" fill="#38bdf8"/>
            <rect x="36" y="-5" width="6" height="40" rx="3" fill="#10b981"/>
            <rect x="48" y="10" width="6" height="10" rx="3" fill="#34d399"/>
          </g>
          <text x="-60" y="-45" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">실시간 회의 음성 분석</text>

          <!-- Generated Action Checklist Cards -->
          <g transform="translate(-140, 0)">
            <rect width="280" height="40" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <circle cx="20" cy="20" r="10" fill="#10b981"/>
            <text x="20" y="24" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">✔</text>
            <text x="42" y="24" font-family="sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">담당자 지정 및 마감일 자동 매핑</text>
          </g>

          <g transform="translate(-140, 50)">
            <rect width="280" height="40" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <circle cx="20" cy="20" r="10" fill="#10b981"/>
            <text x="20" y="24" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">✔</text>
            <text x="42" y="24" font-family="sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">주간 업무 시간 3.8% 단축 완성</text>
          </g>
        </g>
      `;

    case 'prompt_engineering':
      return `
        <!-- Expert Strategic Advisor Prompt Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <!-- Chat Evolution Diagram: Yes-Man to Advisor -->
          <rect x="-170" y="-120" width="340" height="240" rx="16" fill="#090d16" stroke="#8b5cf6" stroke-width="1.5"/>
          
          <!-- Old Yes-Man bubble -->
          <g transform="translate(-140, -85)">
            <rect width="210" height="45" rx="10" fill="#334155" opacity="0.6"/>
            <text x="15" y="26" font-family="sans-serif" font-size="12" fill="#94a3b8">"네, 말씀하신 내용이 맞습니다!" ❌</text>
          </g>

          <!-- Downward Transformation Arrow -->
          <path d="M -35 -30 L -35 -5" fill="none" stroke="#a855f7" stroke-width="4" stroke-linecap="round" marker-end="url(#arrow)"/>

          <!-- High-Value Strategic Advisor Bubble -->
          <g transform="translate(-140, 5)">
            <rect width="280" height="85" rx="12" fill="#1e1b4b" stroke="#c084fc" stroke-width="2" filter="url(#glow)"/>
            <text x="15" y="28" font-family="sans-serif" font-size="13" font-weight="800" fill="#f43f5e">🔥 비판적 전략 분석 보고서</text>
            <text x="15" y="52" font-family="sans-serif" font-size="11" font-weight="600" fill="#e2e8f0">1. 리스크 요인 3가지 도출</text>
            <text x="15" y="70" font-family="sans-serif" font-size="11" font-weight="600" fill="#38bdf8">2. 최적화 대안 시뮬레이션 제안</text>
          </g>
        </g>
      `;

    case 'app_matrix':
      return `
        <!-- 90 AI Apps Matrix / Vibe Coding Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <!-- 3x3 Isometric App Matrix Grid -->
          <g transform="rotate(-10) skewX(-8)">
            <rect x="-140" y="-110" width="75" height="60" rx="10" fill="#1d4ed8" stroke="#60a5fa" stroke-width="1.5"/>
            <text x="-102" y="-75" text-anchor="middle" font-size="20">⚡</text>
            
            <rect x="-50" y="-110" width="75" height="60" rx="10" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
            <text x="-12" y="-75" text-anchor="middle" font-size="20">📊</text>

            <rect x="40" y="-110" width="75" height="60" rx="10" fill="#b91c1c" stroke="#f87171" stroke-width="1.5"/>
            <text x="78" y="-75" text-anchor="middle" font-size="20">🎯</text>

            <rect x="-140" y="-35" width="75" height="60" rx="10" fill="#6d28d9" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="-102" y="0" text-anchor="middle" font-size="20">🤖</text>

            <rect x="-50" y="-35" width="75" height="60" rx="10" fill="#c2410c" stroke="#fb923c" stroke-width="1.5"/>
            <text x="-12" y="0" text-anchor="middle" font-size="20">🚀</text>

            <rect x="40" y="-35" width="75" height="60" rx="10" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="78" y="0" text-anchor="middle" font-size="20">💡</text>

            <rect x="-140" y="40" width="75" height="60" rx="10" fill="#4338ca" stroke="#818cf8" stroke-width="1.5"/>
            <text x="-102" y="75" text-anchor="middle" font-size="20">🎮</text>

            <rect x="-50" y="40" width="75" height="60" rx="10" fill="#0f766e" stroke="#2dd4bf" stroke-width="1.5"/>
            <text x="-12" y="75" text-anchor="middle" font-size="20">⚙️</text>

            <rect x="40" y="40" width="75" height="60" rx="10" fill="#be185d" stroke="#f472b6" stroke-width="1.5"/>
            <text x="78" y="75" text-anchor="middle" font-size="20">✨</text>
          </g>

          <!-- 90 Apps Badge -->
          <g transform="translate(40, -100)">
            <rect width="105" height="34" rx="17" fill="#facc15" filter="url(#glow)"/>
            <text x="52" y="22" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="900" fill="#000000">90개 APP</text>
          </g>
        </g>
      `;

    case 'seo_adsense':
      return `
        <!-- AdSense & SEO Optimization Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <rect x="-170" y="-120" width="340" height="240" rx="16" fill="#090d16" stroke="#10b981" stroke-width="2"/>
          
          <!-- AdSense Blue Banner -->
          <rect x="-150" y="-100" width="300" height="50" rx="10" fill="#1e3a8a"/>
          <circle cx="-120" cy="-75" r="14" fill="#3b82f6"/>
          <text x="-120" y="-69" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="900" fill="#ffffff">$</text>
          <text x="-95" y="-69" font-family="sans-serif" font-size="16" font-weight="900" fill="#ffffff">Google AdSense 통과</text>

          <!-- Audit Checklist -->
          <g transform="translate(-145, -30)">
            <rect width="290" height="35" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
            <text x="15" y="22" font-family="sans-serif" font-size="12" font-weight="700" fill="#86efac">✔ '가치 없는 콘텐츠' 사유 완벽 해소</text>
          </g>

          <g transform="translate(-145, 15)">
            <rect width="290" height="35" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
            <text x="15" y="22" font-family="sans-serif" font-size="12" font-weight="700" fill="#86efac">✔ 고품질 E-E-A-T 구조화 프레임워크</text>
          </g>

          <g transform="translate(-145, 60)">
            <rect width="135" height="30" rx="6" fill="#1e293b"/>
            <text x="67" y="20" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="#38bdf8">SEO: 99/100</text>
            
            <rect x="155" y="0" width="135" height="30" rx="6" fill="#1e293b"/>
            <text x="222" y="20" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="#facc15">AEO: OPTIMIZED</text>
          </g>
        </g>
      `;

    case 'retro_game':
      return `
        <!-- Retro 8-bit Gaming Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <!-- Arcade Cabinet & D-pad Matrix -->
          <rect x="-170" y="-120" width="340" height="240" rx="16" fill="#180b2b" stroke="#f43f5e" stroke-width="2"/>
          
          <!-- CRT Scanlines simulation -->
          <rect x="-150" y="-100" width="300" height="130" rx="10" fill="#0a0518" stroke="#a855f7" stroke-width="1.5"/>
          
          <!-- Pixel Sprite Hero -->
          <g transform="translate(-80, -40)">
            <rect x="0" y="0" width="16" height="16" fill="#fbbf24"/>
            <rect x="16" y="0" width="16" height="16" fill="#fbbf24"/>
            <rect x="32" y="0" width="16" height="16" fill="#fbbf24"/>
            <rect x="16" y="16" width="16" height="16" fill="#f43f5e"/>
            <rect x="0" y="32" width="16" height="16" fill="#38bdf8"/>
            <rect x="32" y="32" width="16" height="16" fill="#38bdf8"/>
          </g>

          <text x="20" y="-30" font-family="monospace" font-size="18" font-weight="900" fill="#38bdf8">STAGE 01</text>
          <text x="20" y="-5" font-family="monospace" font-size="22" font-weight="900" fill="#facc15">999,990 PTS</text>

          <!-- D-Pad and Buttons Control Board -->
          <g transform="translate(-100, 70)">
            <!-- D-Pad -->
            <rect x="-30" y="-10" width="60" height="20" rx="4" fill="#334155"/>
            <rect x="-10" y="-30" width="20" height="60" rx="4" fill="#334155"/>
          </g>
          <g transform="translate(80, 70)">
            <circle cx="-25" cy="0" r="14" fill="#f43f5e"/>
            <text x="-25" y="5" text-anchor="middle" font-family="sans-serif" font-weight="900" fill="#ffffff">B</text>
            <circle cx="15" cy="-10" r="14" fill="#38bdf8"/>
            <text x="15" y="-5" text-anchor="middle" font-family="sans-serif" font-weight="900" fill="#ffffff">A</text>
          </g>
        </g>
      `;

    case 'terminal_cli':
      return `
        <!-- Terminal CLI / Claude Code & Codex CLI Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <rect x="-180" y="-120" width="360" height="240" rx="14" fill="#0c1017" stroke="#22c55e" stroke-width="1.5"/>
          <rect x="-180" y="-120" width="360" height="34" rx="14" fill="#161b22"/>
          <circle cx="-160" cy="-103" r="5" fill="#ef4444"/>
          <circle cx="-145" cy="-103" r="5" fill="#eab308"/>
          <circle cx="-130" cy="-103" r="5" fill="#22c55e"/>
          <text x="0" y="-98" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">claude-code — terminal</text>

          <!-- Code diff and bash lines -->
          <text x="-160" y="-60" font-family="monospace" font-size="13" font-weight="700" fill="#58a6ff">$ claude refactor --autonomous</text>
          <text x="-160" y="-35" font-family="monospace" font-size="12" fill="#7ee787">+ 14 files refactored (0 errors)</text>
          <text x="-160" y="-15" font-family="monospace" font-size="12" fill="#7ee787">+ build passes in 1.4s</text>
          <text x="-160" y="10" font-family="monospace" font-size="13" font-weight="700" fill="#58a6ff">$ git commit -m "feat: complete"</text>
          <text x="-160" y="35" font-family="monospace" font-size="12" fill="#d2a8ff">[main 8e94a] ready for deploy</text>

          <!-- Blinking Cursor -->
          <rect x="-160" y="55" width="10" height="16" fill="#22c55e"/>
        </g>
      `;

    default:
      return `
        <!-- Futuristic AI Core & Synaptic Network Graphic -->
        <g transform="translate(${w * 0.72}, ${h * 0.5})">
          <circle cx="0" cy="0" r="140" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="8,8" opacity="0.5"/>
          <circle cx="0" cy="0" r="90" fill="url(#agentCoreGrad)" filter="url(#glow)"/>
          
          <!-- Neural nodes connected -->
          <line x1="-120" y1="-80" x2="0" y2="0" stroke="#38bdf8" stroke-width="2"/>
          <line x1="120" y1="-60" x2="0" y2="0" stroke="#a855f7" stroke-width="2"/>
          <line x1="-100" y1="90" x2="0" y2="0" stroke="#34d399" stroke-width="2"/>
          <line x1="110" y1="80" x2="0" y2="0" stroke="#f43f5e" stroke-width="2"/>
          
          <circle cx="-120" cy="-80" r="14" fill="#38bdf8"/>
          <circle cx="120" cy="-60" r="14" fill="#a855f7"/>
          <circle cx="-100" cy="90" r="14" fill="#34d399"/>
          <circle cx="110" cy="80" r="14" fill="#f43f5e"/>

          <text x="0" y="6" text-anchor="middle" font-family="monospace" font-size="18" font-weight="900" fill="#ffffff">AI 2026</text>
        </g>
      `;
  }
}

// -----------------------------------------------------------------------------
// Master Blog Thumbnail Generator (Full 16:9 Canvas: 1280x720)
// Layout:
// - Dynamic Content-Themed Gradient Backdrop & Atmospheric Ambient Lights
// - Left Side (x: 50 ~ 580px): Sleek Editorial Typography & Badge (Title, Subtitle, Tag)
// - Right Side (x: 580 ~ 1230px): 100% Unique Bespoke Vector Visual Illustration
// -----------------------------------------------------------------------------
export function renderContentAwareBlogSVG(post, w = 1280, h = 720) {
  const theme = getPostVisualTheme(post);

  // Extract clean editorial titles
  const titleParts = (post.title || '').split(':');
  const mainHeadline = (titleParts[1] || titleParts[0]).trim();
  const preCategory = titleParts.length > 1 ? titleParts[0].trim() : (post.tags && post.tags[0] ? post.tags[0] : '2026 AI INSIGHT');

  // Palette settings per theme
  const themesPalette = {
    ai_agent: {
      bgGrad: ['#030712', '#0c1938', '#0f2759'],
      badgeBg: '#2563eb',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#38bdf8',
      glowColor: '#3b82f6'
    },
    ai_audit: {
      bgGrad: ['#09050b', '#200a18', '#3b0d1e'],
      badgeBg: '#dc2626',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#f87171',
      glowColor: '#ef4444'
    },
    ai_finance: {
      bgGrad: ['#030908', '#06201b', '#0a3528'],
      badgeBg: '#d97706',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#34d399',
      glowColor: '#10b981'
    },
    browser_ai: {
      bgGrad: ['#030712', '#081c2e', '#0b2e4c'],
      badgeBg: '#0284c7',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#38bdf8',
      glowColor: '#0ea5e9'
    },
    web_design: {
      bgGrad: ['#050515', '#130d36', '#211652'],
      badgeBg: '#6366f1',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#a5b4fc',
      glowColor: '#818cf8'
    },
    doc_summary: {
      bgGrad: ['#020b14', '#071f38', '#0d3257'],
      badgeBg: '#0284c7',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#fbbf24',
      glowColor: '#38bdf8'
    },
    meeting_productivity: {
      bgGrad: ['#020c09', '#08261e', '#0d3d2f'],
      badgeBg: '#059669',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#6ee7b7',
      glowColor: '#10b981'
    },
    prompt_engineering: {
      bgGrad: ['#0c051a', '#1e0c3b', '#351661'],
      badgeBg: '#7c3aed',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#c084fc',
      glowColor: '#a855f7'
    },
    app_matrix: {
      bgGrad: ['#05081c', '#101a47', '#1a2b6e'],
      badgeBg: '#e11d48',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#facc15',
      glowColor: '#38bdf8'
    },
    seo_adsense: {
      bgGrad: ['#020b08', '#092419', '#103d2b'],
      badgeBg: '#047857',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#4ade80',
      glowColor: '#22c55e'
    },
    retro_game: {
      bgGrad: ['#12041e', '#2e0847', '#4b0c6e'],
      badgeBg: '#e11d48',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#38bdf8',
      glowColor: '#f43f5e'
    },
    terminal_cli: {
      bgGrad: ['#02060d', '#081320', '#0e2033'],
      badgeBg: '#15803d',
      badgeText: '#ffffff',
      headlineColor: '#ffffff',
      accentColor: '#4ade80',
      glowColor: '#22c55e'
    }
  };

  const pal = themesPalette[theme] || themesPalette.ai_agent;

  // Split headline for 2 lines if needed
  let line1 = mainHeadline;
  let line2 = '';
  if (mainHeadline.length > 18) {
    const words = mainHeadline.split(' ');
    const half = Math.ceil(words.length / 2);
    line1 = words.slice(0, half).join(' ');
    line2 = words.slice(half).join(' ');
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${pal.bgGrad[0]}"/>
      <stop offset="60%" stop-color="${pal.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${pal.bgGrad[2]}"/>
    </linearGradient>

    <!-- Core AI Orb Gradient -->
    <radialGradient id="agentCoreGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="${pal.glowColor}"/>
      <stop offset="100%" stop-color="${pal.bgGrad[1]}"/>
    </radialGradient>

    <!-- Glow Filter -->
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Text Shadow -->
    <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- 1. Background Canvas -->
  <rect width="${w}" height="${h}" fill="url(#bgGrad)"/>

  <!-- 2. Ambient Tech Circuit Grid Lines -->
  <g opacity="0.15" stroke="${pal.accentColor}" stroke-width="1">
    <line x1="0" y1="120" x2="${w}" y2="120"/>
    <line x1="0" y1="240" x2="${w}" y2="240"/>
    <line x1="0" y1="360" x2="${w}" y2="360"/>
    <line x1="0" y1="480" x2="${w}" y2="480"/>
    <line x1="0" y1="600" x2="${w}" y2="600"/>
    <line x1="200" y1="0" x2="200" y2="${h}"/>
    <line x1="400" y1="0" x2="400" y2="${h}"/>
    <line x1="600" y1="0" x2="600" y2="${h}"/>
    <line x1="800" y1="0" x2="800" y2="${h}"/>
    <line x1="1000" y1="0" x2="1000" y2="${h}"/>
  </g>

  <!-- 3. Right Side: 100% Unique Bespoke Visual Artwork -->
  ${renderThemeIllustration(theme, w, h)}

  <!-- 4. Left Side: Clean High-Impact Editorial Typography -->
  <g transform="translate(70, 0)" filter="url(#textGlow)">
    
    <!-- Top Category Badge -->
    <g transform="translate(0, 150)">
      <rect width="auto" height="42" rx="21" fill="${pal.badgeBg}" filter="url(#glow)"/>
      <rect x="0" y="0" width="${Math.max(160, preCategory.length * 20 + 40)}" height="42" rx="21" fill="${pal.badgeBg}"/>
      <circle cx="22" cy="21" r="6" fill="#ffffff"/>
      <text x="36" y="27" font-family="'Paperlogy', sans-serif" font-size="18" font-weight="900" fill="${pal.badgeText}" letter-spacing="1">
        ${escapeXml(preCategory)}
      </text>
    </g>

    <!-- Main Headline Line 1 -->
    <text x="0" y="270" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="52" font-weight="900" fill="${pal.headlineColor}" letter-spacing="-1.5">
      ${escapeXml(line1)}
    </text>

    <!-- Main Headline Line 2 (if present) -->
    ${
      line2
        ? `<text x="0" y="345" font-family="'Paperlogy', 'Noto Sans KR', sans-serif" font-size="50" font-weight="900" fill="${pal.accentColor}" letter-spacing="-1.5">
            ${escapeXml(line2)}
          </text>`
        : ''
    }

    <!-- Bottom Excerpt Highlight Bar -->
    <g transform="translate(0, ${line2 ? 430 : 360})">
      <rect x="0" y="0" width="540" height="52" rx="12" fill="#0f172a" fill-opacity="0.85" stroke="${pal.accentColor}" stroke-width="1.5"/>
      <text x="24" y="32" font-family="'Noto Sans KR', sans-serif" font-size="19" font-weight="700" fill="#e2e8f0">
        ✦ ${escapeXml((post.excerpt || '2026 최신 AI 실전 가이드').slice(0, 26))}...
      </text>
    </g>

    <!-- Footer Meta: Date & rab8bit Brand -->
    <g transform="translate(0, ${h - 100})">
      <text x="0" y="0" font-family="monospace" font-size="16" font-weight="700" fill="#94a3b8">
        DATE // ${escapeXml(post.date || '2026.09')} · rab8bit.com Tech Insight
      </text>
    </g>
  </g>
</svg>`;
}

// -----------------------------------------------------------------------------
// Generate all 59 thumbnails
// -----------------------------------------------------------------------------
export async function generateAllContentAwareThumbnails() {
  console.log('🚀 Generating 100% Content-Aware Bespoke Blog Thumbnails...');
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
  for (const post of blogsData) {
    const svg = renderContentAwareBlogSVG(post, 1280, 720);
    const targetFile = path.join(outDir, `${post.id}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 92 })
      .toFile(targetFile);

    count++;
  }

  console.log(`✅ Successfully generated ${count} bespoke content-aware thumbnails in ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllContentAwareThumbnails().catch(console.error);
}
