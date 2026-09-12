import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BLOGS_FILE = path.join(ROOT_DIR, 'src/data/blogsData.ts');

// 1. Comprehensive Rich Content for 2026-09-14 (100만 토큰 대형 문서 분석법)
const content_2026_09_14 = `<div style="font-family: 'Noto Sans KR', sans-serif; line-height: 1.85; max-width: 800px; margin: 0 auto; font-size: 16px; box-sizing: border-box;">
  <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 18px 20px; border-radius: 0 10px 10px 0; font-size: 15.5px; margin-bottom: 28px; line-height: 1.7;">
    💡 <strong>2026.09.14 모닝 AI 인사이트:</strong> 100만 토큰(1M)에서 200만 토큰에 달하는 초대형 컨텍스트 창이 상용화되면서 수백 페이지의 학술 논문, 사내 규정집, 수만 줄의 모노레포 코드베이스를 통째로 업로드하여 분석하는 업무가 일상화되었습니다. 하지만 단순히 파일을 올리는 것만으로는 '컨텍스트 망각(Lost in the Middle)' 현상을 피할 수 없습니다. 대형 문서를 200% 활용하는 실전 분석 아키텍처와 검증 프롬프트를 완전 해부합니다.
  </div>

  <p style="margin-bottom: 22px;">
    과거에는 수백 페이지 분량의 PDF 문서를 AI로 분석하기 위해 텍스트를 수십 개로 쪼개고 벡터 데이터베이스에 임베딩하는 복잡한 RAG(검색 증강 생성) 파이프라인 구축이 필수적이었습니다. 하지만 <strong>Claude Opus 5 (100만 토큰)</strong>, <strong>Gemini 3.1 Pro (200만 토큰)</strong>, <strong>GPT-6 Astra (105만 토큰)</strong>의 등장으로 이제 원본 문서를 단 하나의 프롬프트 컨텍스트에 통째로 임베딩하여 직접 추론하는 시대가 열렸습니다.
  </p>

  <p style="margin-bottom: 22px;">
    그러나 프롬프트 창이 넓어졌다고 해서 모든 분석이 자동으로 정밀해지는 것은 아닙니다. 텍스트가 방대해질수록 중간에 위치한 세부 사실을 무시하거나 엉뚱한 결론을 도출하는 <strong>'문맥 피로도(Context Degradation)'</strong>가 발생할 수 있습니다. 이를 극복하고 99.9% 무결점의 분석 보고서를 추출하는 5단계 실무 프로토콜을 정리해 드립니다.
  </p>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>1. 대형 컨텍스트 vs 전통 RAG 비교 분석 📊</strong>
  </h2>

  <p style="margin-bottom: 20px;">
    문서 분석 프로젝트 진행 시 어떤 방식을 채택해야 비용과 정확도 측면에서 최적인지 비교한 핵심 지표입니다.
  </p>

  <div style="overflow-x: auto; margin: 24px 0;">
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; font-size: 14.5px;">
      <thead>
        <tr style="background: linear-gradient(to right, #f8fafc, #f1f5f9);">
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: left; font-weight: 700;">비교 항목</th>
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800;">초대형 컨텍스트 (1M+ 토큰)</th>
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800;">전통적 RAG (Chunking + Vector DB)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">문맥 전체 파악력</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: 800;">★★★★★ (문서 전체 상관관계 완벽 이해)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #dc2626;">★★★☆☆ (청크 분절로 문맥 파편화 위험)</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">구축 및 유지보수 난이도</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: 800;">매우 낮음 (파일 즉시 업로드)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">높음 (임베딩 모델, DB 인덱싱 필요)</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">다중 문서 교차 검증</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700;">완벽 (A문서 120p와 B문서 45p 모순 즉각 탐지)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">제한적 (유사도 검색에 의존)</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">호출당 토큰 비용</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">프롬프트 캐싱 활용 시 75~90% 절감 가능</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">질의당 적은 토큰 소모</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>2. 100만 토큰 정밀 분석을 위한 4단계 마스터 프롬프트 📝</strong>
  </h2>

  <p style="margin-bottom: 20px;">
    단순한 요약 요청은 일반론적인 답변만 도출합니다. 아래의 <strong>역방향 교차 검증 프롬프트 템플릿</strong>을 복사하여 사용해 보세요.
  </p>

  <div style="background-color: #0f172a; color: #f8fafc; border-radius: 12px; padding: 22px; margin: 24px 0; font-family: monospace; font-size: 14px; line-height: 1.7; box-shadow: 0 8px 24px rgba(0,0,0,0.25);">
    <div style="color: #38bdf8; font-weight: 800; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 14px;">
      📋 [실전 템플릿] 대형 문서 심층 감사 & 교차 검증 프롬프트
    </div>
    <span style="color: #a855f7;">[Role & Persona]</span><br>
    당신은 글로벌 1위 감사 법인의 시니어 리스크 매니저이자 수석 리서치 애널리스트입니다.<br>
    제공된 [원본 문서 텍스트]를 처음부터 끝까지 정밀 스캔하여 다음 4가지 핵심 과제를 수행하세요.<br><br>

    <span style="color: #38bdf8;">[분석 요구 조건]</span><br>
    1. <strong>핵심 주장 및 근거 매핑:</strong> 문서 전체에서 제시된 주요 가설과 이를 뒷받침하는 수치 데이터를 [페이지/섹션 번호]와 함께 1:1로 정리하세요.<br>
    2. <strong>내부 논리 모순 탐지 (Reverse Querying):</strong> 앞부분(서론/방법론)에서 정의한 기준과 뒷부분(결과/결론)에서 나타난 데이터 간의 불일치 또는 비약이 존재하는지 3가지 이상 비판적으로 검증하세요.<br>
    3. <strong>미언급된 블라인드 스팟(Blind Spot):</strong> 문서에서 의도적으로 누락했거나 다루지 않은 외부 변수(시장 리스크, 규제, 기술적 한계)를 명시하세요.<br>
    4. <strong>의사결정용 3줄 Executive Summary:</strong> C-레벨 경영진이 10초 만에 핵심 조치를 결정할 수 있도록 간결하게 정리하세요.<br><br>

    <span style="color: #4ade80;">[출력 포맷]</span><br>
    - 마크다운 표(Table)와 불릿 포인트를 활용하여 가독성을 극대화할 것.<br>
    - 모든 주장의 끝에는 [원문 인용구 + 위치]를 첨부할 것.
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>3. 실무 워크플로우: NotebookLM & Claude Code 결합 전략 🚀</strong>
  </h2>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px; margin: 24px 0;">
    <h3 style="margin: 0 0 12px 0; font-size: 17.5px; font-weight: 800; color: #1e40af;">
      🎧 Step 1. NotebookLM Audio Overview로 10분 만에 거시 맥락 파악
    </h3>
    <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 1.8;">
      300페이지가 넘는 보고서를 처음부터 읽기 전, Google NotebookLM에 PDF를 업로드하고 <strong>Deep Dive Podcast(오디오 개요)</strong>를 생성하세요. AI 팟캐스터 2명이 핵심 쟁점을 대화형으로 요약해 주므로 출퇴근길에 전체 윤곽을 10분 만에 완벽히 이해할 수 있습니다.
    </p>

    <h3 style="margin: 0 0 12px 0; font-size: 17.5px; font-weight: 800; color: #7c3aed;">
      💻 Step 2. Claude Opus 5로 심층 데이터 추출 & 표 변환
    </h3>
    <p style="margin: 0; font-size: 15px; line-height: 1.8;">
      파악된 맥락을 토대로 Claude Opus 5의 100만 토큰 창에 문서를 투입하고, 필요한 재무 제표, 기술 규격 스펙, 사용자 설문 응답 원시 데이터를 구조화된 JSON 또는 CSV 포맷으로 즉시 추출합니다.
    </p>
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>4. 반드시 피해야 할 3가지 주의점 ⚠️</strong>
  </h2>

  <ul style="margin: 20px 0; padding-left: 24px; font-size: 15.5px; line-height: 1.9;">
    <li><strong>프롬프트 캐싱 미설정으로 인한 API 비용 낭비:</strong> 동일한 대형 문서를 반복 질의할 때는 반드시 <code>Prompt Caching</code> 옵션을 활성화하여 토큰 비용을 90% 이상 절감하세요.</li>
    <li><strong>스캔본 OCR 품질 불량:</strong> 오래된 종이 문서의 저화질 스캔본은 인식 오류를 일으킵니다. 고화질 PDF 변환 도구를 먼저 거치는 것이 필수입니다.</li>
    <li><strong>단일 질의 과신:</strong> 중요한 계약서나 법률 문서는 '주요 혜택 분석'과 '잠재적 독소 조항 분석'으로 질의를 2단계로 나누어 분리 실행하세요.</li>
  </ul>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>❓ 자주 묻는 질문 (FAQ)</strong>
  </h2>

  <h3 style="font-size: 18px; margin: 24px 0 8px; font-weight: 700;">
    <strong>Q1. 100만 토큰은 실제 A4 용지로 몇 장 분량인가요?</strong>
  </h3>
  <p style="margin-bottom: 18px;">
    한국어 기준 약 1,500~2,000페이지 분량, 영문 기준 약 3,000페이지 분량입니다. 책 한 권(약 300페이지) 5~10권을 통째로 넣을 수 있는 규모입니다.
  </p>

  <h3 style="font-size: 18px; margin: 24px 0 8px; font-weight: 700;">
    <strong>Q2. PDF 파일 내의 표(Table)나 그래프 이미지도 인식하나요?</strong>
  </h3>
  <p style="margin-bottom: 18px;">
    네, Gemini 3.1 Pro와 GPT-6 Astra, Claude Opus 5는 멀티모달 네이티브 엔진이므로 문서 내에 삽입된 복잡한 표, 차트, 흐름도 다이어그램을 시각적으로 정확히 판독합니다.
  </p>

  <h3 style="font-size: 18px; margin: 24px 0 8px; font-weight: 700;">
    <strong>Q3. 보안이 중요한 기업 내부 기밀 문서를 업로드해도 되나요?</strong>
  </h3>
  <p style="margin-bottom: 18px;">
    일반 무료 웹 채팅 버전은 학습 데이터로 사용될 수 있으므로, 반드시 <strong>'데이터 학습 미사용(Zero Data Retention)'</strong> 정책이 보장되는 유료 엔터프라이즈 계정 또는 API 환경(Google AI Studio, Anthropic Console)을 사용해야 합니다.
  </p>
</div>`;

// 2. Comprehensive Rich Content for 2026-09-13 (1인 창업가를 위한 바이브 코딩 최적 스택)
const content_2026_09_13 = `<div style="font-family: 'Noto Sans KR', sans-serif; line-height: 1.85; max-width: 800px; margin: 0 auto; font-size: 16px; box-sizing: border-box;">
  <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 18px 20px; border-radius: 0 10px 10px 0; font-size: 15.5px; margin-bottom: 28px; line-height: 1.7;">
    💡 <strong>2026.09.13 모닝 AI 인사이트:</strong> 2026년 실리콘밸리와 1인 창업 생태계의 최대 화두는 단연 <strong>'바이브 코딩(Vibe Coding)'</strong>입니다. 문법 하나하나를 타이핑하는 대신 자연어 대화와 시각적 피드백만으로 풀스택 웹 서비스를 당일 기획·배포하는 완벽한 실전 툴체인(Bolt.new + v0 + Supabase + Claude Code)을 공개합니다.
  </div>

  <p style="margin-bottom: 22px;">
    전 테슬라 AI 디렉터 안드레이 카파시(Andrej Karpathy)가 정의한 <strong>바이브 코딩</strong>은 개발자가 코드를 직접 작성하는 것이 아니라, AI 에이전트에게 전체적인 방향성과 '바이브(Vibe)'를 제시하고 AI가 생성한 결과물을 감독하며 빠르게 릴리즈하는 새로운 소프트웨어 엔지니어링 패러다임입니다.
  </p>

  <p style="margin-bottom: 22px;">
    과거에는 백엔드 DB 설계, 인증(OAuth), 결제 시스템, 프론트엔드 반응형 디자인을 갖춘 완성형 SaaS를 만들기 위해 수개월의 개발 기간과 수천만 원의 외주 비용이 필요했습니다. 하지만 최신 바이브 코딩 스택을 장착하면 <strong>기획부터 첫 유료 결제 연동까지 48시간</strong> 안에 1인 단독으로 끝마칠 수 있습니다.
  </p>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>1. 2026 바이브 코딩 최강 4단계 툴체인 🛠️</strong>
  </h2>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px; margin: 24px 0;">
    <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #2563eb;">
      🎨 1단계. UI/UX 디자인 프로토타입: v0.dev & Claude Artifacts
    </h3>
    <p style="margin: 0 0 12px 0; font-size: 15px; line-height: 1.8;">
      "다크 모드 글래스모피즘이 적용된 AI 주식 대시보드 화면을 만들어줘"라는 한 줄 프롬프트만으로 Tailwind CSS와 React 컴포넌트 코드가 30초 만에 렌더링됩니다.
    </p>

    <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #7c3aed;">
      ⚡ 2단계. 원클릭 브라우저 풀스택 환경: Bolt.new
    </h3>
    <p style="margin: 0 0 12px 0; font-size: 15px; line-height: 1.8;">
      로컬 환경 세팅 없이 브라우저 내에서 Node.js, Next.js, Vite 서버를 즉시 띄우고 패키지 설치부터 오류 디버깅까지 AI가 자율적으로 처리합니다.
    </p>

    <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #059669;">
      🗄️ 3단계. 서버리스 백엔드 & DB 연동: Supabase
    </h3>
    <p style="margin: 0 0 12px 0; font-size: 15px; line-height: 1.8;">
      PostgreSQL 데이터베이스 테이블 생성, RLS 보안 규칙 설정, 소셜 로그인(구글/카카오) 인증을 AI SQL 어시스턴트로 원스톱 구성합니다.
    </p>

    <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #dc2626;">
      💻 4단계. 로컬 프로덕션 최적화: Claude Code 터미널 에이전트
    </h3>
    <p style="margin: 0; font-size: 15px; line-height: 1.8;">
      터미널에서 <code>claude</code>를 실행하여 전체 코드베이스를 진단하고, 빌드 에러 해결, SEO 태그 최적화, GitHub push 및 배포 파이프라인을 자동 완성합니다.
    </p>
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>2. 바이브 코딩 도구별 장단점 비교표 📊</strong>
  </h2>

  <div style="overflow-x: auto; margin: 24px 0;">
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; font-size: 14px;">
      <thead>
        <tr style="background: linear-gradient(to right, #f8fafc, #f1f5f9);">
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: left; font-weight: 700;">도구</th>
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800;">최적 사용처</th>
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800;">장점</th>
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800;">주의점</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">Bolt.new</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">0 to 1 프로토타입</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">설치 0초, 즉시 작동</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">대규모 프로젝트 시 토큰 소모 큼</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">v0 by Vercel</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">초고화질 UI 컴포넌트</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">디자인 완성도 압도적 1위</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">백엔드 로직은 별도 연결 필요</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">Claude Code (CLI)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">로컬 전체 프로젝트 리팩토링</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">수십 개 파일 동시 수정 & Git 자동화</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">터미널 CLI 환경에 친숙해야 함</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>3. 실전 프롬프트: 실패 없는 초기 앱 기획 프롬프트 💡</strong>
  </h2>

  <div style="background-color: #0f172a; color: #f8fafc; border-radius: 12px; padding: 22px; margin: 24px 0; font-family: monospace; font-size: 14px; line-height: 1.7;">
    <div style="color: #38bdf8; font-weight: 800; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 14px;">
      🚀 [복사해서 사용] 바이브 코딩 마스터 시스템 프롬프트
    </div>
    "당신은 10년 차 수석 풀스택 개발자이자 UX 디자이너입니다.<br>
    우리는 [서비스 아이디어: 예, AI 기반 개인 맞춤형 영양제 추천 웹앱]을 제작합니다.<br><br>
    [기술 스택]: React 19, TypeScript, Tailwind CSS, Lucide Icons, Supabase<br>
    [디자인 원칙]:<br>
    - 모바일 퍼스트 반응형 레이아웃<br>
    - 딥 다크 모드(#0f172a)와 네온 바이올렛/에메랄드 포인트 컬러<br>
    - 부드러운 트랜지션 애니메이션과 카드 글래스모피즘 효과<br><br>
    먼저 더미 데이터가 포함된 완전한 동작 가능한 메인 화면 코드를 단일 파일로 작성해 주세요."
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>❓ 자주 묻는 질문 (FAQ)</strong>
  </h2>

  <h3 style="font-size: 18px; margin: 24px 0 8px; font-weight: 700;">
    <strong>Q1. 코딩을 전혀 모르는 비전공자도 바이브 코딩이 가능한가요?</strong>
  </h3>
  <p style="margin-bottom: 18px;">
    네, 가능합니다. 핵심은 코드를 읽는 능력이 아니라 '문제를 세부 기능으로 쪼개어 AI에게 설명하는 기획력'과 '에러 메시지를 AI에게 그대로 전달하는 피드백 능력'입니다.
  </p>

  <h3 style="font-size: 18px; margin: 24px 0 8px; font-weight: 700;">
    <strong>Q2. 바이브 코딩으로 만든 서비스도 실제 상용 서비스로 운영할 수 있나요?</strong>
  </h3>
  <p style="margin-bottom: 18px;">
    현재 수많은 인디 해커들이 바이브 코딩으로 제작한 마이크로 SaaS로 월 수천 달러 이상의 MRR(월간 반복 매출)을 달성하고 있습니다. Cloudflare Pages, Vercel 등을 통해 월 비용 0원으로 수십만 트래픽을 처리할 수 있습니다.
  </p>
</div>`;

// 3. Comprehensive Rich Content for 2026-09-12 (실무 워크플로우 대전환: AI 에이전트 자동화 실전 가이드)
const content_2026_09_12 = `<div style="font-family: 'Noto Sans KR', sans-serif; line-height: 1.85; max-width: 800px; margin: 0 auto; font-size: 16px; box-sizing: border-box;">
  <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 18px 20px; border-radius: 0 10px 10px 0; font-size: 15.5px; margin-bottom: 28px; line-height: 1.7;">
    💡 <strong>2026.09.12 모닝 AI 인사이트:</strong> 2026년 업무 환경은 '인간이 묻고 AI가 답하는 챗봇'에서 '목표만 던지면 AI가 화면을 보고 스스로 여러 툴을 조작해 결과를 납품하는 에이전트'로 완전히 대전환되었습니다. 사내 반복 업무의 80%를 덜어내는 자율 에이전트 도입 실전 가이드를 총정리합니다.
  </div>

  <p style="margin-bottom: 22px;">
    더 이상 "이 텍스트를 요약해 줘" 수준에 머물러서는 업무 혁신을 이룰 수 없습니다. 최신 AI 에이전트들은 <strong>툴 사용(Function Calling)</strong>, <strong>웹 브라우징(Headless Browser Control)</strong>, <strong>데스크톱 조작(Computer Use)</strong> 능력을 결합하여 스스로 계획을 세우고 오류를 자가 수정(Self-Correction)하며 최종 목표를 완수합니다.
  </p>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>1. 챗봇 vs AI 에이전트 핵심 차이점 🤖</strong>
  </h2>

  <div style="overflow-x: auto; margin: 24px 0;">
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; font-size: 14.5px;">
      <thead>
        <tr style="background: linear-gradient(to right, #f8fafc, #f1f5f9);">
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: left; font-weight: 700;">비교 항목</th>
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800;">전통적 챗봇 (ChatGPT 3.5/4)</th>
          <th style="padding: 14px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800;">자율 AI 에이전트 (2026 최신)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">상호작용 방식</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">1문 1답 수동 대화</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #16a34a;">단일 목표 부여 후 자율 다단계 실행</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">도구 및 외부 시스템 제어</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">텍스트 생성에 국한</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700;">API 호출, DB 조회, 마우스/키보드 직접 조작</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 700;">에러 처리 방식</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">실패 시 사람에게 재질문 요구</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #16a34a;">로그 분석 후 다른 대안 경로로 자가 수정</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>2. 실무 3대 자동화 파이프라인 구축법 ⚡</strong>
  </h2>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px; margin: 24px 0;">
    <h3 style="margin: 0 0 10px 0; font-size: 17.5px; font-weight: 800; color: #1e40af;">
      📊 1. 매일 아침 경쟁사 가격 & 뉴스 자동 크롤링 리포트
    </h3>
    <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 1.8;">
      n8n 웹훅과 Gemini API를 연동하여 주요 경쟁사 5곳의 신규 상품 및 보도자료를 오전 7시마다 자동 수집, 핵심 브리핑 슬랙(Slack) 메시지로 전송합니다.
    </p>

    <h3 style="margin: 0 0 10px 0; font-size: 17.5px; font-weight: 800; color: #7c3aed;">
      📧 2. 고객 문의(CS) 자동 분류 및 1차 맞춤 답장 초안 작성
    </h3>
    <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 1.8;">
      수신된 인바운드 이메일을 AI 에이전트가 감정 상태, 긴급도, 문의 유형(환불/기술문의/제휴)으로 자동 라벨링하고 사내 FAQ 데이터베이스를 조회해 완벽한 답장 초안을 생성합니다.
    </p>

    <h3 style="margin: 0 0 10px 0; font-size: 17.5px; font-weight: 800; color: #059669;">
      📑 3. 복합 엑셀 전표 데이터 검증 및 이상치 자동 탐지
    </h3>
    <p style="margin: 0; font-size: 15px; line-height: 1.8;">
      매월 수천 건의 지출 결의서 영수증 이미지와 회계 ERP 엑셀 시트를 교차 검증하여 금액 불일치, 중복 청구, 규정 위반 항목을 1초 만에 붉은색으로 하이라이트합니다.
    </p>
  </div>

  <h2 style="font-size: 22px; color: white; background: linear-gradient(135deg, #2563eb, #4f46e5); margin: 35px 0 18px; border-radius: 12px; padding: 12px 25px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
    <strong>❓ 자주 묻는 질문 (FAQ)</strong>
  </h2>

  <h3 style="font-size: 18px; margin: 24px 0 8px; font-weight: 700;">
    <strong>Q1. AI 에이전트가 오작동해서 잘못된 메일을 발송하거나 결제를 진행하면 어떡하나요?</strong>
  </h3>
  <p style="margin-bottom: 18px;">
    반드시 <strong>'Human-in-the-loop(인간 승인 절차)'</strong>를 설정해야 합니다. 데이터 수집과 초안 작성까지는 AI가 전자동으로 처리하고, 최종 발송 및 결제 승인 버튼만 사람이 확인 후 클릭하는 하이브리드 워크플로우가 업계 표준입니다.
  </p>

  <h3 style="font-size: 18px; margin: 24px 0 8px; font-weight: 700;">
    <strong>Q2. 노코드 툴(Make, n8n)과 AI 에이전트는 어떻게 연동하나요?</strong>
  </h3>
  <p style="margin-bottom: 18px;">
    n8n의 HTTP Request 노드를 통해 OpenAI, Anthropic, Google Gemini API의 <code>json_object</code> 응답 포맷을 전달받아 다음 단계로 라우팅하면 복잡한 코딩 없이 손쉽게 엔터프라이즈 에이전트를 구축할 수 있습니다.
  </p>
</div>`;

// Update blogsData.ts
console.log('📖 Loading src/data/blogsData.ts...');
let blogsContent = fs.readFileSync(BLOGS_FILE, 'utf-8');

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
  process.exit(1);
}

// Replace contents of the top short items
blogsData.forEach(post => {
  if (post.id === 'daily-tech-insight-2026-09-14') {
    post.content = content_2026_09_14;
  } else if (post.id === 'daily-tech-insight-2026-09-13') {
    post.content = content_2026_09_13;
  } else if (post.id === 'daily-tech-insight-2026-09-12') {
    post.content = content_2026_09_12;
  }
});

const newBlogsTs = `export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  file_name?: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  author: string;
  sort_order?: number;
  is_new?: number | boolean;
  content: string;
  created_at?: string;
  updated_at?: string;
  publish_at?: string | null;
}

export const BLOGS_DATA: BlogPost[] = ${JSON.stringify(blogsData, null, 2)};
`;

fs.writeFileSync(BLOGS_FILE, newBlogsTs, 'utf-8');
console.log('✅ Successfully updated blogsData.ts with deep, rich 5x+ content!');
