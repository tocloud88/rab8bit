import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
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

function calcFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(baseSize * (maxChars / len));
}

import {
  renderContentAwareBlogSVG
} from './create-hook-thumbnails.mjs';


// Rich fallback content generators with daily dynamic variance
const TOPIC_POOL = {
  blog: [
    {
      titleSuffix: "실무 워크플로우 대전환: AI 에이전트 자동화 실전 가이드",
      category: "AI 에이전트",
      tags: ["AI에이전트", "업무자동화", "생산성", "LLM실무", "프롬프트"],
      badge: "🤖 실무 워크플로우",
      title1: "AI 에이전트 대전환",
      title2: "반복 업무 100% 자율화",
      baseImage: "public/images/blogs/ai-agent-workflow.jpg",
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
      badge: "🚀 1인 개발 혁명",
      title1: "바이브 코딩 정복",
      title2: "자연어로 앱 뚝딱 만들기",
      baseImage: "public/images/blogs/vibe-coding-2026.jpg",
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
      badge: "⚡ 100만 토큰 시대",
      title1: "수백 장 문서·코드",
      title2: "단 1초 완벽 분석법",
      baseImage: "public/images/blogs/large-context-docs-2026.jpg",
      summary: "수백 페이지의 논문, 사내 규정집, 수만 줄의 코드베이스를 누락 없이 교차 검증하고 인사이트를 도출하는 고급 프롬프트 기법입니다.",
      mainPoints: [
        "단일 프롬프트에 통째로 임베딩하여 문맥 손실 최소화하기",
        "역방향 질의(Reverse Querying)를 통한 데이터 불일치 검증",
        "Audio Overview 기능을 활용한 이동 중 핵심 내용 청취 워크플로우"
      ]
    },
    {
      titleSuffix: "2026 플래그십 AI 빅4 맞대결: GPT-6 vs Claude 5 vs Gemini 3",
      category: "AI 비교",
      tags: ["GPT6", "Claude5", "Gemini3", "Grok4", "플래그십"],
      badge: "⚔️ 2026 플래그십",
      title1: "AI 4대 천왕 맞대결",
      title2: "GPT-6 · Claude 5 · Gemini 3",
      baseImage: "public/images/blogs/ai-big-4-comparison.jpg",
      summary: "OpenAI GPT-6 Astra, 구글 Gemini 3.8 Flash, 앤트로픽 Claude Opus 5, xAI Grok 4.6의 최신 스펙과 실무 선택 기준을 총정리합니다.",
      mainPoints: [
        "컴퓨터 화면 조작과 에이전틱 코딩 능력 비교",
        "100만 토큰 장문 추론 정확도와 할루시네이션 비율 분석",
        "내 직무에 가장 적합한 플래그십 AI 구독 가이드"
      ]
    },
    {
      titleSuffix: "OpenAI GPT-6 Astra 공개: 화면 보고 PC 직접 조작",
      category: "OpenAI",
      tags: ["GPT6", "Astra", "OpenAI", "ComputerUse", "자율행동"],
      badge: "🔥 OpenAI 충격 공개",
      title1: "GPT-6 Astra 전격 해부",
      title2: "화면 보고 PC 직접 조작",
      baseImage: "public/images/blogs/gpt-6-astra-agent.jpg",
      summary: "단순 텍스트 질의응답을 넘어 사용자의 화면을 인식하고 마우스와 키보드로 소프트웨어를 직접 제어하는 혁신적인 차세대 에이전트 모델을 소개합니다.",
      mainPoints: [
        "Agentic Computer Use의 실제 작동 원리와 지원 프로그램",
        "105만 토큰 문맥과 86.4% SWE-bench 코딩 성공률",
        "사이버보안 Critical 등급 판정과 기업용 샌드박스 보안책"
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
    }
  ],
  gpt: [
    {
      title: "스마트 업무 자동화 컨설턴트 GPT",
      category: "업무 생산성",
      description: "복잡한 수작업 엑셀 및 이메일 업무를 파이썬 스크립트와 노코드 툴(Make, Zapier)로 자동화해 주는 전담 컨설턴트입니다.",
      content: `[System Instruction]
당신은 10년 차 업무 자동화(RPA & Python) 전문 컨설턴트입니다.
사용자가 반복적으로 겪는 수작업 프로세스를 설명하면, 이를 가장 적은 비용과 시간으로 자동화할 수 있는 실현 가능한 3가지 해결책을 제시하세요.
1. 노코드(Zapier/Make) 자동화 워크플로우
2. 즉시 실행 가능한 파이썬(Python) 자동화 코드
3. 오류 방지 및 예외 처리 가이드라인`
    }
  ],
  aiTool: [
    {
      name: "WhisperFlow 2026",
      short_desc: "실시간 음성-마크다운 문서 자동 변환기",
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
      // 1-1. Generate Hooking Thumbnail Image
      const thumbFileName = `daily-insight-${kst.dashDate}.jpg`;
      const thumbRelPath = `/images/blogs/${thumbFileName}`;
      const thumbAbsPath = path.join(ROOT_DIR, 'public/images/blogs', thumbFileName);

      try {
        const fakePost = {
          id: blogId,
          title: `${kst.dotDate} 최신 AI 트렌드 리포트: ${blogTemplate.titleSuffix}`,
          excerpt: blogTemplate.summary,
          date: kst.dotDate,
          tags: blogTemplate.tags || []
        };
        const svgStr = renderContentAwareBlogSVG(fakePost, 1280, 720);
        await sharp(Buffer.from(svgStr))
          .jpeg({ quality: 92 })
          .toFile(thumbAbsPath);
        console.log(`   🎨 Generated Bespoke Content-Aware Thumbnail: ${thumbRelPath}`);
      } catch (e) {
        console.warn('   ⚠️ Thumbnail generation warning:', e.message);
      }

      const finalThumb = fs.existsSync(thumbAbsPath) ? thumbRelPath : blogTemplate.baseImage.replace('public', '');

      const newBlog = {
        id: blogId,
        title: `${kst.dotDate} 최신 AI 트렌드 리포트: ${blogTemplate.titleSuffix}`,
        excerpt: blogTemplate.summary,
        file_name: "",
        date: kst.dotDate,
        tags: [...blogTemplate.tags, `AI_${kst.yyyy}`, "최신트렌드"],
        thumbnail: finalThumb,
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

      const insertionIndex = blogContent.indexOf('export const BLOGS_DATA: BlogPost[] = [') + 'export const BLOGS_DATA: BlogPost[] = ['.length;
      const jsonSnippet = '\n  ' + JSON.stringify(newBlog, null, 2).replace(/\n/g, '\n  ') + ',';
      blogContent = blogContent.slice(0, insertionIndex) + jsonSnippet + blogContent.slice(insertionIndex);

      fs.writeFileSync(blogFilePath, blogContent, 'utf8');
      console.log(`✅ [Blog] Added new post: "${newBlog.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [Blog] Post for ${kst.dotDate} already exists.`);
    }
  } catch (err) {
    console.error('❌ [Blog] Update error:', err);
  }

  // 2. Update Insight (src/data/insightsData.ts)
  try {
    const insightFilePath = path.join(ROOT_DIR, 'src/data/insightsData.ts');
    let insightContent = fs.readFileSync(insightFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const insightTemplate = TOPIC_POOL.insight[dayOfYear % TOPIC_POOL.insight.length];
    const insightId = `daily-insight-${kst.dashDate}`;

    if (!insightContent.includes(insightId)) {
      // Dynamic YouTube ID parsing for genuine thumbnail matching
      const videoIdMatch = insightTemplate.video_url.match(/[?&]v=([^&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : 'dQw4w9WgXcQ';
      const genuineThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const newInsight = {
        id: insightId,
        title: `[${kst.dotDate}] ${insightTemplate.title}`,
        category: insightTemplate.category,
        description: insightTemplate.description,
        video_url: insightTemplate.video_url,
        thumbnail: genuineThumbnail,
        tags: [...insightTemplate.tags, `인사이트_${kst.yyyy}`],
        is_new: true,
        created_at: kst.timestamp
      };

      const insertionIndex = insightContent.indexOf('export const INSIGHTS_DATA: InsightItem[] = [') + 'export const INSIGHTS_DATA: InsightItem[] = ['.length;
      const jsonSnippet = '\n  ' + JSON.stringify(newInsight, null, 2).replace(/\n/g, '\n  ') + ',';
      insightContent = insightContent.slice(0, insertionIndex) + jsonSnippet + insightContent.slice(insertionIndex);

      fs.writeFileSync(insightFilePath, insightContent, 'utf8');
      console.log(`✅ [Insight] Added new item: "${newInsight.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [Insight] Item for ${kst.dotDate} already exists.`);
    }
  } catch (err) {
    console.error('❌ [Insight] Update error:', err);
  }

  // 3. Update Prompts (src/data/promptsData.ts)
  try {
    const promptFilePath = path.join(ROOT_DIR, 'src/data/promptsData.ts');
    let promptContent = fs.readFileSync(promptFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const promptTemplate = TOPIC_POOL.prompt[dayOfYear % TOPIC_POOL.prompt.length];
    const promptId = 90000 + (dayOfYear % 1000);

    if (!promptContent.includes(`"id": ${promptId}`) && !promptContent.includes(`id: ${promptId}`)) {
      const newPrompt = {
        id: promptId,
        category_id: promptTemplate.category_id,
        category_name: promptTemplate.category_name,
        title: `[${kst.dotDate} 추천] ${promptTemplate.title}`,
        description: promptTemplate.description,
        content: promptTemplate.content,
        created_at: kst.timestamp,
        updated_at: kst.timestamp,
        is_new: 1
      };

      const insertionIndex = promptContent.indexOf('export const PROMPTS_DATA: PromptItem[] = [') + 'export const PROMPTS_DATA: PromptItem[] = ['.length;
      const jsonSnippet = '\n  ' + JSON.stringify(newPrompt, null, 2).replace(/\n/g, '\n  ') + ',';
      promptContent = promptContent.slice(0, insertionIndex) + jsonSnippet + promptContent.slice(insertionIndex);

      fs.writeFileSync(promptFilePath, promptContent, 'utf8');
      console.log(`✅ [Prompt] Added new prompt: "${newPrompt.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [Prompt] Item for ID ${promptId} already exists.`);
    }
  } catch (err) {
    console.error('❌ [Prompt] Update error:', err);
  }

  // 4. Update GPTs (src/data/gptsData.ts)
  try {
    const gptFilePath = path.join(ROOT_DIR, 'src/data/gptsData.ts');
    let gptContent = fs.readFileSync(gptFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const gptTemplate = TOPIC_POOL.gpt[dayOfYear % TOPIC_POOL.gpt.length];
    const gptId = 80000 + (dayOfYear % 1000);

    if (!gptContent.includes(`"id": ${gptId}`) && !gptContent.includes(`id: ${gptId}`)) {
      const newGpt = {
        id: gptId,
        title: `[${kst.dotDate}] ${gptTemplate.title}`,
        category: gptTemplate.category,
        description: gptTemplate.description,
        content: gptTemplate.content,
        link: "https://chatgpt.com",
        created_at: kst.timestamp,
        is_new: 1
      };

      const insertionIndex = gptContent.indexOf('export const GPTS_DATA: GptItem[] = [') + 'export const GPTS_DATA: GptItem[] = ['.length;
      const jsonSnippet = '\n  ' + JSON.stringify(newGpt, null, 2).replace(/\n/g, '\n  ') + ',';
      gptContent = gptContent.slice(0, insertionIndex) + jsonSnippet + gptContent.slice(insertionIndex);

      fs.writeFileSync(gptFilePath, gptContent, 'utf8');
      console.log(`✅ [GPTs] Added new GPT: "${newGpt.title}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [GPTs] Item for ID ${gptId} already exists.`);
    }
  } catch (err) {
    console.error('❌ [GPTs] Update error:', err);
  }

  // 5. Update AI Tools (src/data/aiTools.ts)
  try {
    const aiToolsFilePath = path.join(ROOT_DIR, 'src/data/aiTools.ts');
    let aiToolsContent = fs.readFileSync(aiToolsFilePath, 'utf8');

    const dayOfYear = Math.floor((kst.epoch - new Date(kst.yyyy, 0, 0).getTime()) / 86400000);
    const toolTemplate = TOPIC_POOL.aiTool[dayOfYear % TOPIC_POOL.aiTool.length];
    const toolId = `tool-daily-${kst.dashDate}`;

    if (!aiToolsContent.includes(toolId)) {
      const newTool = {
        id: toolId,
        name: toolTemplate.name,
        category: toolTemplate.category,
        url: "https://whisperflow.ai",
        short_desc: toolTemplate.short_desc,
        description: toolTemplate.description,
        pricing: "Free / Freemium",
        tags: ["신규도구", "생산성", "AI추천"],
        keywords: toolTemplate.keywords,
        badge: "2026 추천",
        rating: 4.9,
        review_count: 85,
        created_at: kst.timestamp
      };

      const insertionIndex = aiToolsContent.indexOf('export const AI_TOOLS: AITool[] = [') + 'export const AI_TOOLS: AITool[] = ['.length;
      const jsonSnippet = '\n  ' + JSON.stringify(newTool, null, 2).replace(/\n/g, '\n  ') + ',';
      aiToolsContent = aiToolsContent.slice(0, insertionIndex) + jsonSnippet + aiToolsContent.slice(insertionIndex);

      fs.writeFileSync(aiToolsFilePath, aiToolsContent, 'utf8');
      console.log(`✅ [AI Tools] Added new tool: "${newTool.name}"`);
      updatedCount++;
    } else {
      console.log(`ℹ️ [AI Tools] Item for ${toolId} already exists.`);
    }
  } catch (err) {
    console.error('❌ [AI Tools] Update error:', err);
  }

  console.log(`\n🎉 Daily update summary: ${updatedCount} new content item(s) processed.`);
}

updateDailyContent().catch(console.error);
