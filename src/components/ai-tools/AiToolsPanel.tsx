import React from 'react';
import AiToolsDirectory from './AiToolsDirectory';

// Reusable Ad Banner
function AdSlotBanner({
  label = '글로벌 AI 도구 & SaaS 스폰서',
  mockImg = '/images/ads/mock-leaderboard-cloud.png',
  href = '/ai-tools'
}: {
  label?: string;
  mockImg?: string;
  href?: string;
}) {
  return (
    <div className="adsense-wrapper w-full max-w-[970px] mx-auto my-3 sm:my-5">
      <div className="relative w-full rounded-2xl overflow-hidden border border-indigo-500/20 bg-slate-950/90 shadow-lg shadow-indigo-950/20 flex flex-col justify-between group">
        <div className="flex items-center justify-between px-3 py-1 bg-slate-950 border-b border-slate-800/80 text-[10px] text-slate-500 select-none">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30 text-[9px]">AD</span>
            <span className="text-slate-400 font-medium">{label}</span>
          </div>
          <span className="text-[9px] text-slate-500">Google AdSense · 스폰서 추천</span>
        </div>
        <div className="flex-1 w-full overflow-hidden flex items-center justify-center p-1 sm:p-1.5">
          <a
            href={href}
            className="w-full aspect-[970/250] sm:aspect-[970/200] max-h-[140px] block overflow-hidden rounded-xl transition-all duration-300 transform group-hover:scale-[1.005] border border-slate-800/80 hover:border-indigo-500/50 relative"
            title={label}
          >
            <img
              src={mockImg}
              alt={label}
              loading="lazy"
              className="w-full h-full object-cover rounded-xl"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AiToolsPanel() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Rich Hero Header Banner */}
      <div className="relative text-center py-8 sm:py-10 px-4 sm:px-6 rounded-3xl stitch-card overflow-hidden border border-indigo-500/30 shadow-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full stitch-pill text-xs font-bold">
            ✨ 2026.09 최신 172+ 엄선 AI 도구 아카이브
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            추천 <span className="gradient-text-stitch">AI 웹사이트 & 도구 모음</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Claude Code, Operator, Flux 1.1 Ultra, Kling 1.5, Bolt.new 등 업무와 창작의 생산성을 극대화하는 글로벌 최신 AI 도구를 카테고리별로 확인하세요.
          </p>
        </div>
      </div>

      {/* 2. Top Leaderboard Ad Slot */}
      <AdSlotBanner label="글로벌 AI 도구 & SaaS 스폰서" mockImg="/images/ads/mock-leaderboard-cloud.png" href="/ai-tools" />

      {/* 3. Main Content (Left: Directory, Right: Aside Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Interactive AI Tools Directory */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <AiToolsDirectory />
        </div>

        {/* Right: Curated Aside Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-5 lg:sticky lg:top-20">
          {/* 1. 2026 Editor's Pick (New Arrivals) */}
          <div className="stitch-card p-4 sm:p-5 rounded-2xl border border-indigo-500/25 space-y-3.5 bg-slate-900/60">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>🔥</span> 2026 핫 신규 AI 픽
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 font-bold">NEW</span>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href="https://claude.ai/code"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">⚡</span>
                <div>
                  <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">Claude Code</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">Anthropic 터미널 자율 코딩 에이전트</p>
                </div>
              </a>

              <a
                href="https://bolt.new/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">🚀</span>
                <div>
                  <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">Bolt.new</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">원클릭 풀스택 바이브 코딩</p>
                </div>
              </a>

              <a
                href="https://openai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">🤖</span>
                <div>
                  <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">OpenAI Operator</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">GPT-6 기반 자율 컴퓨터 조작</p>
                </div>
              </a>

              <a
                href="https://blackforestlabs.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs shrink-0">🎨</span>
                <div>
                  <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">Flux 1.1 Pro Ultra</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">4K 고해상도 사실적 이미지</p>
                </div>
              </a>

              <a
                href="https://klingai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">🎬</span>
                <div>
                  <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">Kling 1.5 Pro</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">물리 기반 10초 연속 비디오 AI</p>
                </div>
              </a>
            </div>
          </div>

          {/* 2. Workflow Stacks Recommendation */}
          <div className="stitch-card p-4 sm:p-5 rounded-2xl border border-indigo-500/25 space-y-3 bg-slate-900/60">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
              <span>💡</span> 목적별 추천 AI 조합
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-0.5">
                <p className="font-bold text-indigo-400">🧑‍💻 1인 바이브 코딩</p>
                <p className="text-[11px] text-slate-400">Bolt.new + Cursor + Claude Code</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-0.5">
                <p className="font-bold text-purple-400">🎬 유튜브 쇼츠/롱폼 제작</p>
                <p className="text-[11px] text-slate-400">Kling 1.5 + Hedra + Suno v4</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-0.5">
                <p className="font-bold text-cyan-400">📊 논문 & 시장 리서치</p>
                <p className="text-[11px] text-slate-400">NotebookLM Plus + Genspark AI</p>
              </div>
            </div>
          </div>

          {/* 3. Prompt Library Link CTA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-purple-950/60 border border-indigo-500/30 text-white space-y-2.5 text-center shadow-lg">
            <p className="text-xs font-bold text-indigo-200">검증된 실전 프롬프트가 필요할 때</p>
            <h4 className="font-extrabold text-sm sm:text-base leading-snug text-white">
              374+ 프롬프트 & <br />GPTs 지침 즉시 복사
            </h4>
            <a
              href="/prompts"
              className="inline-block w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 font-bold text-xs transition-all shadow-md shadow-indigo-500/30"
            >
              프롬프트 보러가기 &rarr;
            </a>
          </div>

          {/* 4. Sidebar Ad Slot */}
          <div className="stitch-card p-3 rounded-2xl border border-indigo-500/20 bg-slate-950/90 text-center">
            <span className="text-[9px] text-slate-500 block mb-1">스폰서 추천</span>
            <a href="/tools" className="block rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500/40">
              <img src="/images/ads/mock-inarticle-cursor.png" alt="추천 스폰서" loading="lazy" className="w-full object-cover rounded-xl" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
