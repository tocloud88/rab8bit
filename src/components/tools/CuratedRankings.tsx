import React, { useState } from 'react';

const RANKING_DATA: Record<string, { rank: number; title: string; desc: string; badge?: string }[]> = {
  'AI 모델 벤치마크 🤖': [
    { rank: 1, title: 'Claude 3.7 Sonnet (Anthropic)', desc: '하이브리드 추론 및 실전 코딩 역량 1위', badge: 'Best Coding' },
    { rank: 2, title: 'GPT-4.5 / o3 (OpenAI)', desc: '광범위한 상식 및 멀티모달 추론 강자', badge: 'Top Multimodal' },
    { rank: 3, title: 'Gemini 2.0 Flash (Google)', desc: '초고속 레이턴시와 대용량 2M 토큰 컨텍스트', badge: 'Ultra Fast' },
    { rank: 4, title: 'DeepSeek R1', desc: '오픈소스 기반 추론 효율성 혁신 모델', badge: 'Open Weight' },
  ],
  '인기 프로그래밍 언어 💻': [
    { rank: 1, title: 'Python', desc: '인공지능, 데이터 과학, 자동화 표준 언어', badge: 'AI Standard' },
    { rank: 2, title: 'JavaScript / TypeScript', desc: '모던 웹과 풀스택 개발 생태계의 절대 강자', badge: 'Web Dominant' },
    { rank: 3, title: 'Rust', desc: '메모리 안전성과 초고성능 시스템 프로그래밍', badge: 'Most Loved' },
    { rank: 4, title: 'Go (Golang)', desc: '클라우드 인프라 및 대규모 마이크로서비스 백엔드', badge: 'Cloud Native' },
  ],
  '역대 전 세계 흥행 영화 🎬': [
    { rank: 1, title: '아바타 (Avatar, 2009)', desc: '글로벌 박스오피스 $29.2억 (약 3.8조 원)' },
    { rank: 2, title: '어벤져스: 엔드게임 (2019)', desc: '글로벌 박스오피스 $27.9억' },
    { rank: 3, title: '아바타: 물의 길 (2022)', desc: '글로벌 박스오피스 $23.2억' },
    { rank: 4, title: '타이타닉 (Titanic, 1997)', desc: '글로벌 박스오피스 $22.6억' },
  ]
};

export default function CuratedRankings() {
  const [category, setCategory] = useState<string>('AI 모델 벤치마크 🤖');

  const currentList = RANKING_DATA[category] || [];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.keys(RANKING_DATA).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              category === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rankings List Card */}
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🏆</span> {category} 순위
        </h2>

        <div className="space-y-3">
          {currentList.map((item) => (
            <div
              key={item.rank}
              className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                  item.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30' :
                  item.rank === 2 ? 'bg-slate-300 text-slate-950' :
                  item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.rank}
                </span>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>

              {item.badge && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 whitespace-nowrap">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
