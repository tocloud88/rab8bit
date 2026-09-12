import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to get formatted KST Date (Supports CLI argument --date YYYY-MM-DD)
function getKSTDate() {
  const args = process.argv.slice(2);
  const dateArgIdx = args.indexOf('--date');
  let targetTime;

  if (dateArgIdx !== -1 && args[dateArgIdx + 1]) {
    targetTime = new Date(args[dateArgIdx + 1]);
  } else {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    targetTime = new Date(utc + 9 * 3600000);
  }

  const yyyy = targetTime.getFullYear();
  const mm = String(targetTime.getMonth() + 1).padStart(2, '0');
  const dd = String(targetTime.getDate()).padStart(2, '0');

  return {
    dotDate: `${yyyy}.${mm}.${dd}`,
    dashDate: `${yyyy}-${mm}-${dd}`,
    timestamp: `${yyyy}-${mm}-${dd} 06:00:00`,
    epoch: targetTime.getTime(),
    yyyy,
    mm,
    dd
  };
}

// Rich fallback content generators with daily dynamic variance
const TOPIC_POOL = {
  blog: [
    {
      titleSuffix: "실무 워크플로우 대전환: AI 에이전트 자동화 실전 가이드",
      category: "AI 에이전트",
      tags: ["AI에이전트", "업무자동화", "생산성", "LLM실무", "프롬프트"],
      thumbnail: "/images/blogs/ai-agent-workflow.jpg",
      summary: "단순 질의응답을 넘어 브라우저 제어와 복합 업무를 스스로 완수하는 차세대 AI 에이전트의 실전 도입 전략과 유용한 팁을 심층 분석합니다.",
      mainPoints: [
        "자율형 컴퓨터 제어(Computer Use) 모델의 실제 작동 구조와 주의점",
        "반복적인 엑셀 정리 및 이메일 발송 자동화 파이프라인 구성",
        "할루시네이션 방지를 위한 다단계 검증 프롬프트 설계법"
      ]
    },
    {
      titleSuffix: "1인 창업가를 위한 바이브 코딩(Vibe Coding) 최적 스택",
      category: "Vibe 코딩",
      tags: ["바이브코딩", "VibeCoding", "1인개발", "Bolt.new", "ClaudeCode", "웹개발"],
      thumbnail: "/images/blogs/vibe-coding-2026.jpg",
      summary: "자연어 프롬프트만으로 풀스택 웹 애플리케이션을 기획부터 배포까지 원스톱으로 완성하는 2026 바이브 코딩 도구 조합을 정리합니다.",
      mainPoints: [
        "아이디어 구체화: Claude Artifacts와 v0를 통한 UI 프로토타이핑",
        "원클릭 풀스택 구현: Bolt.new와 Supabase 백엔드 연동",
        "로컬 최적화 및 유지보수: Claude Code 터미널 에이전트 활용법"
      ]
    },
    {
      titleSuffix: "100만 토큰 컨텍스트 시대를 200% 활용하는 대형 문서 분석법",
      category: "문서 분석",
      tags: ["대형컨텍스트", "NotebookLM", "ClaudeOpus", "논문요약", "PDF분석"],
      thumbnail: "/images/blogs/gpt-6-astra-agent.jpg",
      summary: "수백 페이지의 논문, 사내 규정집, 수만 줄의 코드베이스를 누락 없이 교차 검증하고 인사이트를 도출하는 고급 프롬프트 기법입니다.",
      mainPoints: [
        "단일 프롬프트에 통째로 임베딩하여 문맥 손실 최소화하기",
        "역방향 질의(Reverse Querying)를 통한 데이터 불일치 검증",
        "Audio Overview 기능을 활용한 이동 중 핵심 내용 청취 워크플로우"
      ]
    },
    {
      titleSuffix: "초실사 이미지 & 비디오 AI 생성: 상업용 퀄리티 제작 공식",
      category: "AI 미디어",
      tags: ["Flux", "Kling", "AI영상", "이미지생성", "유튜브쇼츠"],
      thumbnail: "/images/blogs/ai-big-4-comparison.jpg",
      summary: "완벽한 한글 텍스트 렌더링과 물리 엔진 시뮬레이션 기반의 최신 생성 AI를 활용해 상업용 수준의 비주얼 에셋을 제작하는 방법입니다.",
      mainPoints: [
        "Flux 1.1 Pro Ultra를 활용한 광고 배너 및 타이포그래피 생성",
        "Kling 1.5와 Luma를 활용한 시네마틱 10초 쇼츠 영상 렌더링",
        "ElevenLabs와의 결합을 통한 무인 보이스오버 자동화"
      ]
    },
    {
      titleSuffix: "로컬 온디바이스(On-Device) LLM 완벽 세팅: 보안과 무료 무제한 활용",
      category: "로컬 AI",
      tags: ["로컬LLM", "Ollama", "Jan.ai", "보안", "프라이버시"],
      thumbnail: "/images/blogs/vibe-coding-2026.jpg",
      summary: "민감한 기업 내부 데이터나 개인정보 유출 걱정 없이, 내 컴퓨터에서 완전 무료로 최고 성능 오픈소스 모델을 구동하는 가이드입니다.",
      mainPoints: [
        "Ollama 및 Jan.ai GUI를 통한 원클릭 경량 모델 설치",
        "로컬 RAG(검색 증강 생성)를 구축하여 내 PC 파일 검색하기",
        "네트워크 단절 환경에서도 동작하는 오프라인 비서 세팅"
      ]
    }
  ],
  insight: [
    {
      title: "AI 에이전트로 엑셀 & 데이터 전처리 5분 만에 끝내는 실전 팁",
      category: "업무 자동화",
      description: "복잡한 수식 없이 자연어로 대용량 CSV/Excel 데이터를 정제하고 피벗 테이블 및 시각화 차트를 즉시 생성하는 방법을 알아봅니다.",
      tags: ["데이터분석", "엑셀자동화", "ChatGPT", "Claude", "실무생산성"],
      video_url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ"
    },
    {
      title: "프롬프트 작성 시 흔히 하는 3가지 실수와 즉각적인 개선책",
      category: "프롬프트 엔지니어링",
      description: "AI에게 지나치게 모호한 지시를 내리거나 의도를 과도하게 주입하여 발생하는 환각(Hallucination)을 없애는 핵심 템플릿을 소개합니다.",
      tags: ["프롬프트", "할루시네이션", "질문법", "AI팁"],
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "유튜브 쇼츠 & 릴스 제작 시간을 1/10로 줄이는 AI 툴 조합",
      category: "AI 영상 제작",
      description: "대본 작성부터 음성 합성, B-roll 영상 클립 생성 및 자막 자동 싱크까지 완전 자동화 파이프라인을 구축하는 노하우입니다.",
      tags: ["쇼츠제작", "릴스", "Kling", "ElevenLabs", "크리에이터"],
      video_url: "https://www.youtube.com/watch?v=kYV3FwT0tB4"
    }
  ],
  prompt: [
    {
      category_id: 2,
      category_name: "비즈니스 및 업무",
      title: "경영진/보고용 3단 압축 브리핑 보고서 작성기",
      description: "방대한 회의록이나 보고서 초안을 바쁜 의사결정권자가 30초 만에 파악할 수 있도록 핵심 요약, 수치 분석, 권고 행동으로 정제합니다.",
      content: `[역할 부여]
당신은 글로벌 전략 컨설팅 펌 출신의 수석 비즈니스 애널리스트입니다.
아래 제공된 원문 텍스트를 분석하여, 경영진이 30초 내에 핵심 의사결정을 내릴 수 있는 'Executive 1-Page Summary'로 변환해 주세요.

[작성 포맷 규칙]
1. 🎯 핵심 결론 (Executive Summary): 3문장 이내 (배경 - 핵심 성과/이슈 - 권고사항)
2. 📊 주요 정량/정성 지표 (Key Metrics & Insights): 불릿 포인트 3~4개 (수치 강조)
3. ⚠️ 리스크 요인 및 선제 조치 (Risk & Mitigation): 발생 가능한 리스크와 즉시 실행 대책
4. 🚀 다음 실행 과제 (Next Action Items): 담당/기한/우선순위(P1, P2) 형태의 표

[원문 데이터 입력]:
{{여기에 회의록 또는 원문 내용을 붙여넣으세요}}`
    },
    {
      category_id: 5,
      category_name: "소프트웨어 개발",
      title: "시니어 아키텍트의 코드 리뷰 & 성능 최적화 검증기",
      description: "작성된 코드의 시간/공간 복잡도, 엣지 케이스, 보안 취약점, 가독성 리팩토링 포인트를 철저히 진단합니다.",
      content: `[역할 부여]
당신은 15년 차 시니어 풀스택 소프트웨어 아키텍트이자 보안 감사관입니다.
제시된 코드의 버그 가능성, 메모리 누수, 비동기 레이스 컨디션, O(N) 최적화 포인트를 단계별로 리뷰하세요.

[리뷰 기준]
1. 🐛 잠재 버그 및 엣지 케이스 (Null/Undefined, 경계값, 예외 처리 누락)
2. ⚡ 성능 및 복잡도 분석 (현재 Big-O vs 최적화 가능한 Big-O)
3. 🔒 보안 취약점 (XSS, Injection, 불필요한 민감 정보 노출)
4. ✨ 클린 코드 & 리팩토링 제안 (개선 전/후 TypeScript 코드 diff 제공)

[코드 입력]:
\`\`\`typescript
{{여기에 분석할 코드를 입력하세요}}
\`\`\``
    },
    {
      category_id: 1,
      category_name: "마케팅 및 기획",
      title: "고전환율(CVR) 랜딩페이지 후킹 카피 & CTA 생성기",
      description: "방문자의 시선을 3초 안에 사로잡고 클릭을 유도하는 감정 유발 헤드라인과 행동 촉구(CTA) 문구를 다각도로 도출합니다.",
      content: `[역할 부여]
당신은 연간 수백억 매출을 달성한 세계 최고 수준의 다이렉트 리스폰스 카피라이터입니다.

[제품/서비스 정보]
- 타깃 고객: {{주요 타깃층과 그들의 가장 큰 고민/페인포인트}}
- 핵심 가치 제안: {{제품이 해결해 주는 단 하나의 결정적 문제}}
- 목표 전환 행동: {{무료 체험 / 사전 예약 / 구매}}

[요청 산출물]
1. 🔥 AIDA 기반 헤드라인 5가지 (호기심형, 공포/손실회피형, 즉각적 이득형, 권위자 추천형, 스토리텔링형)
2. 💡 서브 카피 3종 (주장을 뒷받침하는 명확한 근거 1문장)
3. ⚡ 클릭률을 극대화하는 마이크로 카피 & 버튼 텍스트 5선`
    }
  ],
  gpt: [
    {
      category_id: 3,
      category_name: "비즈니스 및 업무",
      title: "스마트 업무 자동화 & 이메일 작성 어시스턴트",
      description: "상황별 정중한 비즈니스 커뮤니케이션, 영문 거래처 협상 메일, 거절 및 조율 메일을 5초 만에 격식에 맞춰 작성해 줍니다.",
      content: "비즈니스 이메일 작성, 회의 안건 정리, 일정 조율 및 클라이언트 커뮤니케이션을 전문적으로 지원하는 맞춤형 GPT 비서입니다."
    },
    {
      category_id: 5,
      category_name: "소프트웨어 개발",
      title: "풀스택 API 설계 및 데이터베이스 스키마 마스터",
      description: "RESTful 및 GraphQL API 엔드포인트 설계부터 PostgreSQL/Prisma 스키마 최적화 및 인덱싱 가이드를 제공합니다.",
      content: "고성능 백엔드 아키텍처 설계와 효율적인 데이터베이스 모델링을 실시간으로 코칭하는 개발 전문 에이전트입니다."
    }
  ],
  tool: [
    {
      name: "AgentOps Studio",
      link: "https://agentops.ai",
      category: "업무 자동화 및 에이전트",
      description: "AI 자율 에이전트의 실행 과정, 토큰 비용, 레이턴시, 오류 발생 구간을 실시간으로 추적하고 모니터링하는 차세대 LLMOps 플랫폼입니다.",
      keywords: ["에이전트", "모니터링", "LLMOps", "비용최적화"]
    },
    {
      name: "Superwhisper",
      link: "https://superwhisper.com",
      category: "비즈니스 생산성",
      description: "로컬 AI 기반 초고정밀 음성 인식으로 모든 앱에서 말하는 즉시 완벽한 마크다운 문서 및 코드로 타이핑해 주는 온디바이스 음성 입력기입니다.",
      keywords: ["음성인식", "Whisper", "생산성", "타이핑"]
    }
  ]
};

// Main Update Logic
async function updateDailyContent() {
  const kst = getKSTDate();
  console.log(`\n📅 [Daily Auto-Update] Running for KST Date: ${kst.dotDate} (${kst.dashDate})`);

  let updatedCount = 0;

  // 1. Update Blog (src/data/blogsData.ts)
  try {
    const blogFilePath = path.join(ROOT_DIR, 'src/data/blogsData.ts');
    let blogContent = fs.readFileSync(blogFilePath, 'utf8');

    // Pick topic based on day of year to ensure daily rotation
    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const blogTemplate = TOPIC_POOL.blog[dayOfYear % TOPIC_POOL.blog.length];
    
    const blogId = `daily-tech-insight-${kst.dashDate}`;
    
    if (!blogContent.includes(blogId)) {
      const newBlog = {
        id: blogId,
        title: `${kst.dotDate} 최신 AI 트렌드 리포트: ${blogTemplate.titleSuffix}`,
        excerpt: blogTemplate.summary,
        file_name: "",
        date: kst.dotDate,
        tags: [...blogTemplate.tags, `AI_${kst.yyyy}`, "최신트렌드"],
        thumbnail: blogTemplate.thumbnail || "/images/blogs/ai-agent-workflow.jpg",
        author: "rab8bit 자동 큐레이터",
        sort_order: 100 + (dayOfYear % 100),
        created_at: kst.timestamp,
        updated_at: kst.timestamp,
        is_new: 1,
        publish_at: null,
        content: `<div style="font-family: 'Noto Sans KR', sans-serif; line-height: 1.85; max-width: 800px; margin: 0 auto; font-size: 16px; box-sizing: border-box;">
  <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 18px 20px; border-radius: 0 10px 10px 0; font-size: 15.5px; margin-bottom: 28px; line-height: 1.7;">
    💡 <strong>${kst.dotDate} 모닝 AI 인사이트:</strong> ${blogTemplate.summary}
  </div>

  <p style="margin-bottom: 22px;">
    생성형 AI 생태계는 하루가 다르게 새로운 모델과 실무 도구들이 쏟아져 나오고 있습니다. 오늘 기준 가장 주목해야 할 <strong>${blogTemplate.category}</strong> 분야의 핵심 포인트와 실전 적용 팁을 간결하게 정리해 드립니다.
  </p>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>1. 오늘의 핵심 기술 동향 & 실전 적용 포인트 🚀</strong>
  </h2>

  <ul style="margin: 20px 0; padding-left: 24px; font-size: 15.5px; line-height: 1.9;">
    ${blogTemplate.mainPoints.map(pt => `<li><strong>${pt}</strong></li>`).join('\n    ')}
  </ul>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px; margin: 24px 0;">
    <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800;">💡 실무 적용 팁</h3>
    <p style="margin: 0; font-size: 15px; line-height: 1.8;">
      단순히 도구를 아는 것보다 기존 업무 파이프라인의 병목 구간(예: 자료 수집, 1차 초안 작성, 코드 검증)에 정확히 매핑하여 5~10분 단위의 시간 절약을 쌓아가는 것이 가장 중요합니다.
    </p>
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>2. 추천 실천 과제 🎯</strong>
  </h2>
  <p style="margin-bottom: 20px;">
    오늘 하루 업무를 시작하기 전, 위의 프롬프트나 자동화 도구 중 1가지를 직접 테스트해 보세요. 작은 자동화 경험이 축적되어 극적인 생산성 향상으로 이어집니다.
  </p>
</div>`
      };

      const insertMarker = 'export const BLOGS_DATA: BlogPost[] = [\n';
      const formattedEntry = '  ' + JSON.stringify(newBlog, null, 2).replace(/\n/g, '\n  ') + ',\n';
      blogContent = blogContent.replace(insertMarker, insertMarker + formattedEntry);
      fs.writeFileSync(blogFilePath, blogContent, 'utf8');
      console.log(`✅ [Blog] Added new daily post: "${newBlog.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [Blog] Daily post for ${kst.dashDate} already exists.`);
    }
  } catch (err) {
    console.error(`❌ [Blog] Error updating:`, err);
  }

  // 2. Update Insights (src/data/insightsData.ts)
  try {
    const insightFilePath = path.join(ROOT_DIR, 'src/data/insightsData.ts');
    let insightContent = fs.readFileSync(insightFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const insightTemplate = TOPIC_POOL.insight[dayOfYear % TOPIC_POOL.insight.length];
    const insightId = `daily-insight-${kst.dashDate}`;

    if (!insightContent.includes(insightId)) {
      const ytMatch = insightTemplate.video_url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const ytId = ytMatch ? ytMatch[1] : 'dQw4w9WgXcQ';
      const ytThumbnail = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;

      const newInsight = {
        id: insightId,
        category: insightTemplate.category,
        access: "공개",
        title: `[${kst.dotDate}] ${insightTemplate.title}`,
        video_url: insightTemplate.video_url,
        description: insightTemplate.description,
        download_url: null,
        thumbnail: ytThumbnail,
        tags: [...insightTemplate.tags, "데일리인사이트", "2026AI"],
        date: kst.dashDate,
        sort_order: 100 + (dayOfYear % 100),
        is_new: 1
      };

      const insertMarker = 'export const INSIGHTS_DATA: InsightItem[] = [\n';
      const formattedEntry = '  ' + JSON.stringify(newInsight, null, 2).replace(/\n/g, '\n  ') + ',\n';
      insightContent = insightContent.replace(insertMarker, insertMarker + formattedEntry);
      fs.writeFileSync(insightFilePath, insightContent, 'utf8');
      console.log(`✅ [Insights] Added new daily insight: "${newInsight.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [Insights] Daily insight for ${kst.dashDate} already exists.`);
    }
  } catch (err) {
    console.error(`❌ [Insights] Error updating:`, err);
  }

  // 3. Update Prompts (src/data/promptsData.ts)
  try {
    const promptFilePath = path.join(ROOT_DIR, 'src/data/promptsData.ts');
    let promptContent = fs.readFileSync(promptFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const promptTemplate = TOPIC_POOL.prompt[dayOfYear % TOPIC_POOL.prompt.length];
    const promptId = `daily-prompt-${kst.dashDate}`;

    if (!promptContent.includes(promptId)) {
      const newPrompt = {
        id: promptId,
        category_id: promptTemplate.category_id,
        category_name: promptTemplate.category_name,
        title: `[${kst.dotDate}] ${promptTemplate.title}`,
        description: promptTemplate.description,
        content: promptTemplate.content,
        sort_order: 100 + (dayOfYear % 100),
        is_new: 1
      };

      const insertMarker = 'export const PROMPTS_DATA: PromptItem[] = [\n';
      const formattedEntry = '  ' + JSON.stringify(newPrompt, null, 2).replace(/\n/g, '\n  ') + ',\n';
      promptContent = promptContent.replace(insertMarker, insertMarker + formattedEntry);
      fs.writeFileSync(promptFilePath, promptContent, 'utf8');
      console.log(`✅ [Prompts] Added new daily prompt: "${newPrompt.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [Prompts] Daily prompt for ${kst.dashDate} already exists.`);
    }
  } catch (err) {
    console.error(`❌ [Prompts] Error updating:`, err);
  }

  // 4. Update GPTs (src/data/gptsData.ts)
  try {
    const gptFilePath = path.join(ROOT_DIR, 'src/data/gptsData.ts');
    let gptContent = fs.readFileSync(gptFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const gptTemplate = TOPIC_POOL.gpt[dayOfYear % TOPIC_POOL.gpt.length];
    const gptId = `daily-gpt-${kst.dashDate}`;

    if (!gptContent.includes(gptId)) {
      const newGpt = {
        id: gptId,
        category_id: gptTemplate.category_id,
        category_name: gptTemplate.category_name,
        title: `[${kst.dotDate}] ${gptTemplate.title}`,
        description: gptTemplate.description,
        content: gptTemplate.content,
        sort_order: 100 + (dayOfYear % 100),
        is_new: 1
      };

      const insertMarker = 'export const GPTS_DATA: GptItem[] = [\n';
      const formattedEntry = '  ' + JSON.stringify(newGpt, null, 2).replace(/\n/g, '\n  ') + ',\n';
      gptContent = gptContent.replace(insertMarker, insertMarker + formattedEntry);
      fs.writeFileSync(gptFilePath, gptContent, 'utf8');
      console.log(`✅ [GPTs] Added new daily GPT: "${newGpt.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [GPTs] Daily GPT for ${kst.dashDate} already exists.`);
    }
  } catch (err) {
    console.error(`❌ [GPTs] Error updating:`, err);
  }

  // 5. Update AI Tools (src/data/aiTools.ts)
  try {
    const toolsFilePath = path.join(ROOT_DIR, 'src/data/aiTools.ts');
    let toolsContent = fs.readFileSync(toolsFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const toolTemplate = TOPIC_POOL.tool[dayOfYear % TOPIC_POOL.tool.length];
    const toolName = `${toolTemplate.name} (${kst.dotDate})`;

    if (!toolsContent.includes(toolTemplate.name)) {
      const newTool = {
        name: toolTemplate.name,
        link: toolTemplate.link,
        description: toolTemplate.description,
        category: toolTemplate.category,
        keywords: [...toolTemplate.keywords, "2026추천", "자동업데이트"]
      };

      const insertMarker = 'export const AI_TOOLS: AiTool[] = [\n';
      const formattedEntry = '  ' + JSON.stringify(newTool, null, 2).replace(/\n/g, '\n  ') + ',\n';
      toolsContent = toolsContent.replace(insertMarker, insertMarker + formattedEntry);
      fs.writeFileSync(toolsFilePath, toolsContent, 'utf8');
      console.log(`✅ [AI Tools] Added new daily tool: "${newTool.name}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [AI Tools] Daily tool ${toolTemplate.name} already exists.`);
    }
  } catch (err) {
    console.error(`❌ [AI Tools] Error updating:`, err);
  }

  console.log(`\n🎉 [Daily Auto-Update] Completed! ${updatedCount} categories updated.\n`);
}

updateDailyContent();
