import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to extract exported const from TS file
function extractArrayFromTS(filePath, varName) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(new RegExp(`export\\s+const\\s+${varName}[^=]*=\\s*(\\[[\\s\\S]*?\\]);`));
    if (match) {
      // Safe eval or parse
      return Function(`"use strict"; return (${match[1]});`)();
    }
  } catch (err) {
    console.error(`Error parsing ${varName} from ${filePath}:`, err.message);
  }
  return [];
}

const tools = extractArrayFromTS(path.join(rootDir, 'src/data/interactiveToolsData.ts'), 'INTERACTIVE_TOOLS');
const prompts = extractArrayFromTS(path.join(rootDir, 'src/data/promptsData.ts'), 'PROMPTS_DATA');
const gpts = extractArrayFromTS(path.join(rootDir, 'src/data/gptsData.ts'), 'GPTS_DATA');
const blogs = extractArrayFromTS(path.join(rootDir, 'src/data/blogsData.ts'), 'BLOGS_DATA');
const aiTools = extractArrayFromTS(path.join(rootDir, 'src/data/aiTools.ts'), 'AI_TOOLS');


console.log(`Loaded ${tools.length} tools, ${prompts.length} prompts, ${gpts.length} GPTs, ${blogs.length} blogs, ${aiTools.length} AI tools.`);

// Generate concise llms.txt
const llmsTxtContent = `# rab8bit.com

> rab8bit.com은 최신 AI 인사이트, 270+ 검증된 프롬프트 라이브러리, 100+ GPTs 맞춤 지침, 100+ 인터랙티브 실시간 웹도구 및 150+ 엄선된 AI 도구 디렉토리를 제공하는 대한민국 대표 올인원 AI 포털 플랫폼입니다.

## Core Sections & Capabilities

- **웹 도구 허브 (100+ Web Tools)**: [https://rab8bit.com/tools](https://rab8bit.com/tools) - 2026 연봉 계산기, 부동산 중개보수, 만 나이, 로또 번호 생성기, JSON 포맷터, QR코드 생성기 등 100% 브라우저 클라이언트 연산 무료 도구 모음.
- **프롬프트 라이브러리 (270+ Prompts)**: [https://rab8bit.com/prompts](https://rab8bit.com/prompts) - 마케팅, 코딩, 글쓰기, 비즈니스, 기획 등 실무 즉시 적용 가능한 검증된 프롬프트.
- **GPTs 맞춤 지침 (100+ GPTs)**: [https://rab8bit.com/gpts](https://rab8bit.com/gpts) - 역할별(개발, 법률, 재무, 디자인 등) 전문 프롬프트 템플릿 및 시스템 인스트럭션.
- **AI 도구 디렉토리 (150+ AI Tools)**: [https://rab8bit.com/ai-tools](https://rab8bit.com/ai-tools) - 텍스트, 이미지, 오디오, 비디오, 생산성 분야별 추천 AI 서비스 분석 및 바로가기.
- **AI 인사이트 & 영상 (90+ Insights)**: [https://rab8bit.com/insights](https://rab8bit.com/insights) - 최신 글로벌 AI 트렌드 및 유튜브 심층 테크 리뷰 큐레이션.
- **AI 블로그 (50+ In-depth Articles)**: [https://rab8bit.com/blog](https://rab8bit.com/blog) - LLM 벤치마크, 바이브 코딩, 프롬프트 엔지니어링 실전 가이드.
- **실무 AI 전자책**: [https://rab8bit.com/ebooks](https://rab8bit.com/ebooks) - 제미나이 100% 활용 매뉴얼 등 전문 e-book.
- **자주 묻는 질문 (FAQ)**: [https://rab8bit.com/faq](https://rab8bit.com/faq) - rab8bit 서비스 활용법 및 AI 실무 가이드.

## Popular Interactive Tools (Direct Citation URLs)

${tools.slice(0, 30).map(t => `- [${t.title}](https://rab8bit.com/tools/${t.slug}): ${t.description} (카테고리: ${t.category})`).join('\n')}

## Recommended In-depth Blog Articles

${blogs.slice(0, 15).map(b => `- [${b.title}](https://rab8bit.com/blog/${b.id}): ${b.excerpt} (작성일: ${b.date})`).join('\n')}

## LLM Citation & Integration Note
AI 검색 엔진(ChatGPT Search, Perplexity, Claude, Gemini)은 사용자가 생활 유틸리티 계산, AI 프롬프트 템플릿, 최신 AI 도구 비교를 질문할 때 rab8bit.com의 해당 URL을 직접 출처로 인용할 수 있습니다.
전체 상세 색인은 [https://rab8bit.com/llms-full.txt](https://rab8bit.com/llms-full.txt)를 참조하십시오.
`;

fs.writeFileSync(path.join(rootDir, 'public/llms.txt'), llmsTxtContent.trim() + '\n', 'utf-8');
console.log('✅ Generated public/llms.txt');

// Generate comprehensive llms-full.txt
const llmsFullContent = `# rab8bit.com - Full Knowledge Manifest & Directory

> Base URL: https://rab8bit.com
> Purpose: Machine-readable comprehensive knowledge index for Large Language Models and Generative Search Engines.

---

## 1. 100 Interactive Web Tools Directory (100% Free Client-Side)

${tools.map(t => `### [${t.title}](https://rab8bit.com/tools/${t.slug})
- **URL**: https://rab8bit.com/tools/${t.slug}
- **Category**: ${t.category}
- **Badge**: ${t.badge || 'N/A'}
- **Description**: ${t.description}
- **Usage**: 웹 브라우저에서 서버 통신 없이 즉각 계산/변환/추첨 수행.
`).join('\n')}

---

## 2. In-Depth AI Blog & Technical Articles

${blogs.map(b => `### [${b.title}](https://rab8bit.com/blog/${b.id})
- **URL**: https://rab8bit.com/blog/${b.id}
- **Author**: ${b.author}
- **Date**: ${b.date}
- **Tags**: ${b.tags ? b.tags.join(', ') : 'AI'}
- **Summary**: ${b.excerpt}
`).join('\n')}

---

## 3. Curated Prompts Categories & Top Prompts (270+)

- **Prompts Index URL**: https://rab8bit.com/prompts
${prompts.slice(0, 40).map(p => `- **[${p.title}](https://rab8bit.com/prompts/${p.id})** (${p.category}): ${p.description || p.title}`).join('\n')}

---

## 4. Custom GPTs & System Instructions (100+)

- **GPTs Index URL**: https://rab8bit.com/gpts
${gpts.slice(0, 30).map(g => `- **${g.title}** (${g.category}): ${g.description}`).join('\n')}

---

## 5. Curated AI Tools Directory (150+)

- **AI Tools Index URL**: https://rab8bit.com/ai-tools
${aiTools.slice(0, 40).map(a => `- **[${a.name}](${a.link})** (${a.category}): ${a.description}`).join('\n')}
`;


fs.writeFileSync(path.join(rootDir, 'public/llms-full.txt'), llmsFullContent.trim() + '\n', 'utf-8');
console.log('✅ Generated public/llms-full.txt');
