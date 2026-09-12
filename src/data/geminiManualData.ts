export interface Chapter {
  id: string;
  title: string;
  pageRange: string;
  summary: string;
  contentHtml: string;
}

export interface Part {
  id: string;
  title: string;
  badge: string;
  chapters: Chapter[];
}

export const GEMINI_MANUAL_PARTS: Part[] = [
  {
    id: "part-1",
    title: "Part 1. 제미나이 생태계 이해와 모델별 특징",
    badge: "기초 & 아키텍처",
    chapters: [
      {
        id: "ch-1-1",
        title: "1.1 Gemini 1.5 Pro vs Flash vs Ultra 모델별 차이점과 가성비 선택법",
        pageRange: "p.1 ~ p.3",
        summary: "비용과 처리 속도, 추론 역량에 따른 제미나이 모델군(Pro/Flash/Ultra)의 실무 선택 가이드",
        contentHtml: `
          <p>구글 제미나이(Google Gemini)는 단일 거대 모델이 아닌, 목적과 비용 효율성에 따라 세분화된 <strong>모델 패밀리</strong> 구조를 가지고 있습니다. 실무에서 최적의 성과를 내기 위해서는 각 모델의 특성을 정확히 이해하고 상황에 맞게 배치해야 합니다.</p>
          
          <div class="my-6 overflow-x-auto">
            <table class="w-full text-sm border-collapse border border-slate-700 rounded-xl overflow-hidden">
              <thead class="bg-slate-800 text-slate-200">
                <tr>
                  <th class="p-3 border border-slate-700 text-left">모델명</th>
                  <th class="p-3 border border-slate-700 text-left">컨텍스트 윈도우</th>
                  <th class="p-3 border border-slate-700 text-left">주요 강점</th>
                  <th class="p-3 border border-slate-700 text-left">추천 실무 용도</th>
                </tr>
              </thead>
              <tbody class="text-slate-300 divide-y divide-slate-800">
                <tr class="bg-slate-900/60">
                  <td class="p-3 font-bold text-indigo-400">Gemini 1.5 Pro</td>
                  <td class="p-3">최대 2,000,000 토큰</td>
                  <td class="p-3">복합 추론, 대용량 문서 교차 검증, 복잡한 코딩</td>
                  <td class="p-3">수백 장 논문/보고서 분석, 전체 코드베이스 리팩토링</td>
                </tr>
                <tr class="bg-slate-900/30">
                  <td class="p-3 font-bold text-emerald-400">Gemini 1.5 Flash</td>
                  <td class="p-3">최대 1,000,000 토큰</td>
                  <td class="p-3">초고속 응답 속도, 극도로 저렴한 API 단가</td>
                  <td class="p-3">실시간 고객 챗봇, 일일 뉴스 요약, 대량 데이터 파싱</td>
                </tr>
                <tr class="bg-slate-900/60">
                  <td class="p-3 font-bold text-purple-400">Gemini Ultra / Advanced</td>
                  <td class="p-3">최대 1,000,000+ 토큰</td>
                  <td class="p-3">최고 난도 수학/과학/논리 문제 해결</td>
                  <td class="p-3">심층 학술 연구, 엔터프라이즈 아키텍처 설계</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-sm">
            💡 <strong>실무 선택 공식:</strong> 일상적인 텍스트 요약이나 빠른 분류 작업은 <strong>Flash</strong>를 사용하여 비용을 90% 이상 절감하고, 여러 문서 간의 모순점 찾기나 고난도 로직 설계는 <strong>Pro</strong> 모델을 선택하는 것이 정석입니다.
          </div>
        `
      },
      {
        id: "ch-1-2",
        title: "1.2 100만~200만 토큰 대형 컨텍스트(Long Context)의 본질과 패러다임 변화",
        pageRange: "p.4 ~ p.6",
        summary: "단편적 질문-답변을 넘어 전체 데이터베이스를 통째로 주입하는 RAG 없는 신세계",
        contentHtml: `
          <p>100만 토큰은 <strong>도서 약 8~10권 분량</strong>(약 70만 단어) 또는 <strong>1시간 이상의 고화질 비디오</strong>, <strong>약 30,000줄 이상의 소스코드</strong>에 해당합니다. 이는 기존 AI 활용법을 완전히 뒤바꾸어 놓았습니다.</p>
          
          <h4 class="text-base font-bold text-white mt-6 mb-3">전통적 RAG(검색 증강 생성) vs 제미나이 롱 컨텍스트 비교</h4>
          <ul class="list-disc list-inside space-y-2 text-slate-300 text-sm pl-2">
            <li><strong>기존 방식(RAG):</strong> 긴 문서를 수백 개의 청크(Chunk)로 쪼개어 임베딩하고 벡터 검색으로 일부분만 추출 ➔ 문맥 유실 및 단편적 오류 빈번.</li>
            <li><strong>제미나이 롱 컨텍스트:</strong> 문서 전체, 전년도 회계 장부, 전체 API 문서를 프롬프트에 통째로 임베딩 ➔ 완벽한 전역적 맥락 파악 및 100% 바늘 찾기(Needle in a Haystack) 달성.</li>
          </ul>
        `
      },
      {
        id: "ch-1-3",
        title: "1.3 웹 버전(gemini.google.com)과 구글 AI 스튜디오(AI Studio) 완벽 비교",
        pageRange: "p.7 ~ p.8",
        summary: "일반 사용자용 웹 인터페이스와 엔지니어용 노코드 AI Studio 환경의 장단점 분석",
        contentHtml: `
          <p>구글은 제미나이를 두 가지 주요 통로로 제공합니다. 용도에 맞게 플랫폼을 병행 활용해야 실질적인 생산성을 300% 이상 끌어올릴 수 있습니다.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <h5 class="font-bold text-indigo-400 mb-2">🌐 웹 버전 (gemini.google.com)</h5>
              <p class="text-xs text-slate-300 leading-relaxed">
                • 구글 계정 기반 편리한 챗 UI<br/>
                • Gmail, Drive, YouTube 등 구글 확장도구(Extensions) 즉시 연동<br/>
                • 음성 대화(Live 모드) 및 직관적인 이미지 업로드 지원<br/>
                • 일반 사무직, 학생, 기획자에게 최적
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <h5 class="font-bold text-emerald-400 mb-2">⚡ 구글 AI 스튜디오 (aistudio.google.com)</h5>
              <p class="text-xs text-slate-300 leading-relaxed">
                • 시스템 프롬프트(System Instruction) 완벽 통제<br/>
                • Temperature, Top-P, Safety Settings 등 미세 파라미터 조절<br/>
                • 최대 200만 토큰 파일 업로드 및 구조화된 JSON 모드 출력<br/>
                • 무료 API 키 발급 및 파이썬/JS 코드 원클릭 추출
              </p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "part-2",
    title: "Part 2. 실전 프롬프트 엔지니어링 & 메타 프롬프팅",
    badge: "프롬프트 마스터",
    chapters: [
      {
        id: "ch-2-1",
        title: "2.1 제미나이가 가장 좋아하는 마크다운 구조화 프롬프트 작성법",
        pageRange: "p.9 ~ p.11",
        summary: "XML 태그와 마크다운 계층 구조를 활용하여 정확도를 99%까지 끌어올리는 프롬프트 설계법",
        contentHtml: `
          <p>제미나이는 구글의 방대한 웹 크롤링 데이터와 마크다운 문서를 깊이 학습했기 때문에, <strong>명확한 헤더(#, ##), 불릿 포인트, XML 구분 태그</strong>를 사용할 때 가장 이상적인 추론 품질을 보입니다.</p>

          <div class="my-5 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 leading-relaxed">
            <div class="text-slate-500 mb-2">// 📌 제미나이 최적화 마크다운 프롬프트 템플릿</div>
# [역할 부여]
당신은 10년 차 수석 비즈니스 전략 컨설턴트입니다.

## [목표]
제공된 2026 3분기 실적 데이터를 바탕으로 경영진 보고용 원페이지 요약본을 작성하세요.

## [제약 사항]
1. 불필요한 서론이나 인사말은 생략하고 본론부터 시작할 것.
2. 수치는 반드시 백분율(%)과 증감액을 병기할 것.
3. 리스크 요인은 3가지로 압축하여 불릿 포인트로 정리할 것.

## [출력 포맷]
- ## 1. 핵심 성과 요약
- ## 2. 부문별 실적 분석 (표 형식)
- ## 3. 4분기 주요 액션 플랜

## [입력 데이터]
&lt;context&gt;
{여기에 원본 데이터 입력}
&lt;/context&gt;
          </div>
        `
      },
      {
        id: "ch-2-2",
        title: "2.2 시스템 인스트럭션(System Instructions)과 퓨샷(Few-shot) 최적화",
        pageRange: "p.12 ~ p.14",
        summary: "고정 페르소나 설정과 2~3개의 모범 예시(Few-shot)를 결합한 불변의 출력 제어 기법",
        contentHtml: `
          <p>AI 스튜디오의 <strong>System Instructions</strong> 영역에 지침을 입력하면, 대화가 수십 턴 진행되어도 초기의 어조와 규칙을 절대 잊지 않습니다.</p>
          
          <h4 class="text-sm font-bold text-white mt-4 mb-2">효과적인 퓨샷(Few-Shot) 예시 구성 요령:</h4>
          <ol class="list-decimal list-inside space-y-2 text-slate-300 text-sm pl-2">
            <li><strong>입력(Input)과 출력(Output) 쌍을 최소 2개 이상</strong> 제공합니다.</li>
            <li>원하는 톤앤매너와 JSON 스키마를 정확히 예시로 보여줍니다.</li>
            <li>예외 상황(데이터가 없을 때 "N/A" 반환 등)에 대한 처리 규칙을 포함시킵니다.</li>
          </ol>
        `
      },
      {
        id: "ch-2-3",
        title: "2.3 할루시네이션(환각)을 0%로 줄이는 3단계 역검증 질문 공식",
        pageRange: "p.15 ~ p.16",
        summary: "모델이 자신의 답변을 원문과 대조하여 스스로 모순을 잡아내는 Chain-of-Verification(CoVe) 기법",
        contentHtml: `
          <p>제미나이에게 단순 질문만 던지는 것이 아니라, <strong>답변의 출처 문장 번호(Citation)를 강제</strong>하고 2단계 자체 검증을 거치게 하면 환각을 극적으로 차단할 수 있습니다.</p>

          <div class="my-4 p-4 rounded-xl bg-slate-900 border border-indigo-500/30 text-xs text-indigo-300">
            <strong>3단계 역검증 프롬프트 구문:</strong><br/>
            "답변을 작성한 후, 아래 2가지를 반드시 별도 섹션에 추가 검증하세요.<br/>
            1. 위 답변의 각 주장이 본문 몇 페이지 몇 번째 문단에 근거하는지 출처 명시.<br/>
            2. 본문에 명시되지 않은 추측성 정보가 1%라도 포함되었는지 스스로 셀프 감사(Audit) 결과 보고."
          </div>
        `
      },
      {
        id: "ch-2-4",
        title: "2.4 실무 즉시 복붙 프롬프트 템플릿 10선",
        pageRange: "p.17 ~ p.18",
        summary: "비즈니스 이메일, 기획서 초안, 회의록 요약, 카피라이팅, SQL 쿼리 생성 등 엄선된 10대 실무 템플릿",
        contentHtml: `
          <div class="space-y-4 text-xs">
            <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <span class="font-bold text-indigo-400">📋 템플릿 1: 회의록 ➔ 스마트 액션 아이템 변환기</span>
              <p class="mt-1 text-slate-300 font-mono">"다음 회의 스크립트에서 (1) 결정된 최종 안건, (2) 담당자별 마감 기한과 액션 아이템, (3) 미결 토론 쟁점 3가지를 표 형태로 추출해 줘."</p>
            </div>
            <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <span class="font-bold text-indigo-400">📊 템플릿 2: 복잡한 데이터 분석 및 인사이트 도출</span>
              <p class="mt-1 text-slate-300 font-mono">"첨부된 CSV 데이터를 기반으로 상위 20% 이익 기여 고객군의 특징과 이탈 위험 신호 3가지를 파악하고 해결책을 제시해 줘."</p>
            </div>
            <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <span class="font-bold text-indigo-400">🎯 템플릿 3: 고수익 후킹 마케팅 카피라이팅 5종</span>
              <p class="mt-1 text-slate-300 font-mono">"타겟: 30대 바쁜 직장인 / 제품: 제미나이 생산성 가이드북. 호기심 유발형, 공포(FOMO) 극복형, 데이터 증명형 3가지 앵글로 각 5개씩 작성해 줘."</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "part-3",
    title: "Part 3. 구글 생태계 200% 활용: 확장 프로그램(Extensions)",
    badge: "구글 연동 실무",
    chapters: [
      {
        id: "ch-3-1",
        title: "3.1 Gmail, Google Drive, Google Docs 직접 연동 검색 및 요약",
        pageRange: "p.19 ~ p.21",
        summary: "@구글 드라이브, @Gmail 호출을 통해 내 사내 데이터베이스를 지능형 AI 비서로 탈바꿈하는 법",
        contentHtml: `
          <p>웹 버전 제미나이 입력창에서 <code>@Google Drive</code> 또는 <code>@Gmail</code>을 입력하면, 사용자의 승인된 구글 클라우드 내 문서와 메일을 실시간으로 검색하고 분석합니다.</p>

          <h4 class="text-sm font-bold text-white mt-4 mb-2">실전 활용 예시:</h4>
          <ul class="list-disc list-inside space-y-2 text-slate-300 text-xs pl-2">
            <li><code>@Gmail 지난 2주간 김 팀장님과 주고받은 '신규 예산안' 관련 메일에서 확정된 최종 금액만 찾아줘.</code></li>
            <li><code>@Google Drive '2026 마케팅 제안서' 폴더 안의 모든 Docs 문서를 요약해서 차이점을 비교해 줘.</code></li>
          </ul>
        `
      },
      {
        id: "ch-3-2",
        title: "3.2 YouTube 영상 링크 기반 1초 타임스탬프 분석 및 핵심 요약",
        pageRange: "p.22 ~ p.24",
        summary: "1~2시간짜리 해외 기술 컨퍼런스나 튜토리얼 영상을 시청하지 않고 핵심만 뽑아내는 테크닉",
        contentHtml: `
          <p><code>@YouTube</code> 확장을 호출하고 영상 URL을 붙여넣으면, 영상의 자막 트랙과 멀티모달 프레임을 분석하여 <strong>초단위 타임스탬프와 핵심 요약</strong>을 즉시 생성합니다.</p>

          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 my-3">
            프롬프트: "@YouTube https://youtube.com/watch?v=XXXX 이 영상에서 다루는 3가지 주요 신기술과 각 기술이 등장하는 정확한 타임스탬프(00:00)를 한글로 정리해 줘."
          </div>
        `
      },
      {
        id: "ch-3-3",
        title: "3.3 Google Maps, Flights, Hotels 연동 스마트 여행/출장 기획법",
        pageRange: "p.25 ~ p.26",
        summary: "실시간 비행기 편, 호텔 시세, 최적 동선 지도를 결합한 10초 출장 일정표 완성",
        contentHtml: `
          <p><code>@Google Flights</code>와 <code>@Google Hotels</code>, <code>@Google Maps</code>를 단일 프롬프트에서 복합 호출하여 현실성 있는 출장 및 여행 동선을 자동 기획합니다.</p>
        `
      },
      {
        id: "ch-3-4",
        title: "3.4 대용량 스프레드시트(Google Sheets) 데이터 자동 분석 및 시각화",
        pageRange: "p.27 ~ p.28",
        summary: "복잡한 VLOOKUP/INDEX-MATCH 함수 대신 자연어로 구글 시트 데이터를 정제하고 파이썬 차트로 시각화",
        contentHtml: `
          <p>제미나이의 <strong>Advanced Code Execution</strong>(내장 파이썬 환경) 기능을 활성화하면 수만 행의 시트 데이터를 직접 연산하고 깔끔한 그래프와 표를 다운로드할 수 있습니다.</p>
        `
      }
    ]
  },
  {
    id: "part-4",
    title: "Part 4. 멀티모달(문서·이미지·영상·음성) 분석 실전",
    badge: "멀티모달",
    chapters: [
      {
        id: "ch-4-1",
        title: "4.1 수백 장의 PDF 논문/사내 규정집 통째로 넣고 교차 분석하기",
        pageRange: "p.29 ~ p.31",
        summary: "300페이지 분량의 PDF 파일을 단 3초 만에 완벽하게 색인하고 조항 간의 충돌 지점 찾기",
        contentHtml: `
          <p>제미나이 1.5 Pro의 네이티브 멀티모달 아키텍처는 PDF 문서 내의 텍스트뿐만 아니라 <strong>도표, 차트, 각주, 캡션 이미지</strong>까지 동시에 이해합니다.</p>
        `
      },
      {
        id: "ch-4-2",
        title: "4.2 손글씨 회의 메모/칠판 사진을 깔끔한 디지털 인포그래픽으로 변환",
        pageRange: "p.32 ~ p.34",
        summary: "화이트보드 브레인스토밍 낙서를 구조화된 마크다운 표, Mermaid 다이어그램, HTML 코드로 재생성",
        contentHtml: `
          <p>스마트폰으로 대충 찍은 회의실 칠판 사진을 제미나이에 올린 뒤 <code>"이 화이트보드의 다이어그램을 Mermaid.js 코드로 변환해 줘"</code>라고 요청하면 완벽한 디지털 차트 코드가 출력됩니다.</p>
        `
      },
      {
        id: "ch-4-3",
        title: "4.3 1시간짜리 회의 녹음 파일/영상에서 액션 아이템 자동 추출",
        pageRange: "p.35 ~ p.36",
        summary: "음성 파일(MP3/WAV)을 텍스트로 변환하는 단계를 건너뛰고 오디오의 억양과 감정까지 직접 추론",
        contentHtml: `
          <p>제미나이는 별도의 STT(Speech-to-Text) 모델을 거치지 않고 오디오 파형 자체를 직접 입력받으므로 발화자의 말투, 강조 지점, 회의 분위기까지 정밀하게 읽어냅니다.</p>
        `
      },
      {
        id: "ch-4-4",
        title: "4.4 Imagen 3를 활용한 상업용 고품질 AI 이미지 프롬프트 공식",
        pageRange: "p.37 ~ p.38",
        summary: "구글의 최신 이미지 생성 엔진 Imagen 3에서 텍스트 깨짐 없는 썸네일/배경 에셋 생성 공식",
        contentHtml: `
          <p>Imagen 3는 한글/영문 텍스트 렌더링 능력이 극적으로 향상되었습니다. 완벽한 조명, 카메라 렌즈 화각(85mm f/1.4), 구도(Rule of Thirds) 키워드를 조합하는 공식을 정리합니다.</p>
        `
      }
    ]
  },
  {
    id: "part-5",
    title: "Part 5. AI 스튜디오 & API를 활용한 무인 자동화",
    badge: "무인 자동화",
    chapters: [
      {
        id: "ch-5-1",
        title: "5.1 Google AI Studio에서 무료 API Key 발급 및 파라미터(Temperature 등) 설정",
        pageRange: "p.39 ~ p.41",
        summary: "분당 15회 무료 호출(RPM)을 제공하는 Google AI Studio API 키 발급 및 실무 파라미터 가이드",
        contentHtml: `
          <p>Google AI Studio(aistudio.google.com)는 개발자와 비개발자 모두에게 <strong>Gemini 1.5 Flash/Pro의 무료 API 티어</strong>를 제공합니다.</p>

          <h4 class="text-sm font-bold text-white mt-4 mb-2">핵심 파라미터 권장 세팅:</h4>
          <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-300 pl-2">
            <li><strong>Temperature:</strong> 사실 기반 요약·코딩 <code>0.0 ~ 0.2</code> / 창의적 카피라이팅 <code>0.7 ~ 1.0</code></li>
            <li><strong>Top-P:</strong> 일관된 답변 유지 시 <code>0.8</code></li>
            <li><strong>Response Schema:</strong> 정형화된 JSON 반환 시 JSON Schema 직접 정의</li>
          </ul>
        `
      },
      {
        id: "ch-5-2",
        title: "5.2 노코드 툴(Make, Zapier, n8n)과 제미나이 API 연동 자동화",
        pageRange: "p.42 ~ p.44",
        summary: "코딩 한 줄 없이 매일 아침 구글 뉴스 스크랩 ➔ 제미나이 요약 ➔ 슬랙/텔레그램 자동 발송 파이프라인",
        contentHtml: `
          <p>Make(Integromat) 또는 Zapier의 HTTP 모듈을 통해 제미나이 API 엔드포인트(<code>generativelanguage.googleapis.com</code>)를 연결하면 완전 무인 자동화 워크플로우를 30분 만에 완성할 수 있습니다.</p>
        `
      },
      {
        id: "ch-5-3",
        title: "5.3 파이썬(Python) 10줄로 만드는 나만의 자동 문서 요약 봇",
        pageRange: "p.45 ~ p.46",
        summary: "google-generativeai SDK를 활용한 초간단 10줄 자동화 스크립트 실전 코드",
        contentHtml: `
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
import google.generativeai as genai

genai.configure(api_key="YOUR_GEMINI_API_KEY")
model = genai.GenerativeModel("gemini-1.5-flash")

response = model.generate_content("다음 텍스트를 핵심 3줄로 요약해 줘: ...")
print(response.text)
          </div>
        `
      }
    ]
  },
  {
    id: "part-6",
    title: "Part 6. 제미나이 실무 트러블슈팅 & 시크릿 치트시트",
    badge: "치트시트 & FAQ",
    chapters: [
      {
        id: "ch-6-1",
        title: "6.1 자주 발생하는 답변 짤림 및 포맷 오류 해결법",
        pageRange: "p.47 ~ p.48",
        summary: "Max Output Tokens 제한으로 중간에 끊길 때 '이어서 작성' 대신 사용하는 스마트 재개 프롬프트",
        contentHtml: `
          <p>답변이 중간에 끊겼을 때 <code>"계속해"</code>라고만 하면 맥락이 엉킬 수 있습니다. <code>"직전 답변의 마지막 문장 '[...] ' 이후의 내용부터 동일한 마크다운 헤더 구조를 유지하여 계속 작성하세요."</code>라고 명시하세요.</p>
        `
      },
      {
        id: "ch-6-2",
        title: "6.2 데이터 보안 및 프라이버시(Workspace 기업 데이터 보호) 설정",
        pageRange: "p.49",
        summary: "내 프롬프트와 문서가 모델 학습에 사용되지 않도록 차단하는 기업용 보안 옵션 체크리스트",
        contentHtml: `
          <p>구글 워크스페이스 유료 기업 플랜(Gemini Enterprise/Business) 및 Google AI Studio의 유료 티어를 사용할 경우, 사용자의 입력 데이터는 <strong>구글의 기초 모델 학습에 일체 사용되지 않으며</strong> 엄격히 격리됩니다.</p>
        `
      },
      {
        id: "ch-6-3",
        title: "6.3 2026 최신 제미나이 단축키 & 치트시트 한 장 정리",
        pageRange: "p.50",
        summary: "업무 속도를 2배로 올려주는 단축키, 필수 호출 명령어 모음",
        contentHtml: `
          <div class="p-4 bg-slate-900 rounded-xl border border-indigo-500/30 text-xs text-slate-200 space-y-2">
            <div>⌨️ <strong>Shift + Enter:</strong> 줄바꿈 / <strong>Enter:</strong> 전송</div>
            <div>🔍 <strong>@Google Drive:</strong> 드라이브 파일 직접 검색</div>
            <div>📩 <strong>@Gmail:</strong> 이메일 내용 직접 색인 및 답변 초안 작성</div>
            <div>🎥 <strong>@YouTube:</strong> 영상 타임스탬프 분석</div>
            <div>⚙️ <strong>AI Studio:</strong> JSON Mode ON으로 프론트엔드 연동 데이터 바로 추출</div>
          </div>
        `
      }
    ]
  }
];
