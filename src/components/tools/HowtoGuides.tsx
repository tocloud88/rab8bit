import React, { useState } from 'react';

interface Guide {
  id: string;
  title: string;
  category: string;
  level: '초급' | '중급' | '고급';
  summary: string;
  steps: string[];
}

const GUIDES: Guide[] = [
  {
    id: 'claude-code',
    title: '클로드 코드(Claude Code) 설치 및 사용법 가이드',
    category: 'AI 개발 도구',
    level: '초급',
    summary: '터미널에서 직접 대규모 프로젝트를 코딩하고 리팩토링하는 Anthropic의 Claude Code CLI 설정법입니다.',
    steps: [
      'Node.js 18 이상 환경을 준비합니다.',
      '터미널에서 `npm install -g @anthropic-ai/claude-code` 명령어로 설치합니다.',
      '프로젝트 디렉토리로 이동 후 `claude`를 실행하고 API 키 인증을 완료합니다.',
      '대화형 인터페이스에서 파일 생성, 버그 수정, 아키텍처 분석을 지시합니다.'
    ]
  },
  {
    id: 'prompt-framework',
    title: '고품질 AI 프롬프트 작성 4단계 공식 (ROSE 프레임워크)',
    category: '프롬프트 엔지니어링',
    level: '초급',
    summary: 'Role(역할), Objective(목표), Scenario(맥락), Expected Output(출력 형식)으로 완성도 높은 결과물을 얻는 공식입니다.',
    steps: [
      'Role: AI에게 명확한 페르소나를 부여합니다 (예: "너는 10년 차 시니어 마케터야").',
      'Objective: 달성하고자 하는 구체적 과업을 명시합니다.',
      'Scenario: 대상 독자, 제약 조건, 톤앤매너 등의 맥락을 제공합니다.',
      'Expected Output: 표, 글머리 기호, JSON 등 원하는 출력 양식을 지정합니다.'
    ]
  },
  {
    id: 'cloudflare-astro',
    title: 'Astro 프로젝트를 Cloudflare Pages에 무료 배포하기',
    category: '웹 호스팅',
    level: '중급',
    summary: '초고속 글로벌 엣지 CDN인 Cloudflare Pages에 Astro 정적 웹사이트를 자동 배포하는 방법입니다.',
    steps: [
      'GitHub 저장소에 Astro 코드를 Push합니다.',
      'Cloudflare 대시보드에서 Workers & Pages > Create application을 선택합니다.',
      'Build command에 `npm run build`, Output directory에 `dist`를 지정합니다.',
      'Deploy 버튼을 누르면 1분 내에 전 세계 엣지 네트워크에 무료 배포됩니다.'
    ]
  }
];

export default function HowtoGuides() {
  const [activeGuide, setActiveGuide] = useState<string>(GUIDES[0].id);

  const selected = GUIDES.find(g => g.id === activeGuide) || GUIDES[0];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Guide Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {GUIDES.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setActiveGuide(guide.id)}
            className={`p-5 rounded-2xl text-left transition-all border ${
              activeGuide === guide.id
                ? 'stitch-card border-indigo-500/50 bg-indigo-950/40 shadow-lg'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
            }`}
          >
            <span className="text-[11px] font-bold text-indigo-400 block">{guide.category}</span>
            <h3 className="text-sm font-bold text-white mt-1 leading-snug">{guide.title}</h3>
          </button>
        ))}
      </div>

      {/* Active Guide Content Display */}
      <div className="stitch-card p-6 sm:p-10 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-6">
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
              {selected.category}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
              난이도: {selected.level}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {selected.title}
          </h2>
          <p className="text-sm text-slate-300">
            {selected.summary}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📋</span> 단계별 실행 가이드
          </h3>

          <div className="space-y-3">
            {selected.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800"
              >
                <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-mono">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
