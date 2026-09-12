import React, { useState } from 'react';
import { BLOGS_DATA } from '../../data/blogsData';
import { INSIGHTS_DATA } from '../../data/insightsData';
import { PROMPTS_DATA } from '../../data/promptsData';
import { GPTS_DATA } from '../../data/gptsData';
import { GALLERY_DATA } from '../../data/galleryData';
import { EBOOKS_DATA } from '../../data/ebooksData';
import { INTERACTIVE_TOOLS } from '../tools/ToolsDirectory';
import ToolCardVisual from '../tools/ToolCardVisual';

interface Props {
  onNavigateTab?: (tabId: string) => void;
}

// Reusable Google AdSense / Sponsor Ad Banner Component in React
function AdSlotBanner({
  label = '스폰서 추천',
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

export default function HomePortalPanel({ onNavigateTab }: Props) {
  const latestBlogs = BLOGS_DATA.slice(0, 4);
  const featuredInsights = INSIGHTS_DATA.slice(0, 4);
  const featuredPrompts = PROMPTS_DATA.slice(0, 4);
  const featuredTools = INTERACTIVE_TOOLS.slice(0, 4);
  const featuredGallery = GALLERY_DATA.slice(0, 4);
  const featuredEbooks = EBOOKS_DATA.slice(0, 4);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleNav = (tabId: string, href: string) => (e: React.MouseEvent) => {
    if (onNavigateTab) {
      e.preventDefault();
      onNavigateTab(tabId);
    }
  };

  const handleCopyPrompt = (p: typeof PROMPTS_DATA[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = p.prompt_template || p.description;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-12">
      {/* 1. Hero Banner Section */}
      <section className="relative text-center py-8 sm:py-12 px-4 sm:px-6 rounded-3xl stitch-card overflow-hidden border border-indigo-500/30 shadow-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full stitch-pill text-xs sm:text-sm font-bold shadow-inner">
            <span className="animate-pulse text-amber-400">✨</span> 2026 AI 인사이트 &amp; 스마트 도구 올인원 플랫폼
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2]">
            AI와 생산성의 모든 것 <br className="hidden sm:inline" />
            <span className="gradient-text-stitch">rab8bit.com</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            56편의 AI 심층 아티클, 104편의 실무 인사이트, 370+ 검증된 프롬프트와 130+종 스마트 도구를 한곳에서 만나보세요.
          </p>

          {/* Quick Category Navigation Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={handleNav('insights', '/insights')}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white font-bold text-xs border border-indigo-500/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>🎬</span> 인사이트 ({INSIGHTS_DATA.length})
            </button>
            <button
              onClick={handleNav('tools', '/tools')}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white font-bold text-xs border border-indigo-500/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>🛠️</span> 웹 도구 (130+)
            </button>
            <button
              onClick={handleNav('blog', '/blog')}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white font-bold text-xs border border-indigo-500/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>📝</span> 블로그 ({BLOGS_DATA.length})
            </button>
            <button
              onClick={handleNav('ai-tools', '/ai-tools')}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white font-bold text-xs border border-indigo-500/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>🌐</span> AI 도구 (172)
            </button>
            <button
              onClick={handleNav('prompts', '/prompts')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>💬</span> 프롬프트 ({PROMPTS_DATA.length})
            </button>
            <button
              onClick={handleNav('gpts', '/gpts')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>🤖</span> 챗봇지침 ({GPTS_DATA.length})
            </button>
            <button
              onClick={handleNav('gallery', '/gallery')}
              className="px-3.5 py-2 rounded-xl bg-yellow-500/15 hover:bg-yellow-500 text-yellow-300 hover:text-slate-950 font-bold text-xs border border-yellow-500/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>🍌</span> 바나나 갤러리 ({GALLERY_DATA.length})
            </button>
            <button
              onClick={handleNav('ebooks', '/ebooks')}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs border border-emerald-500/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>📚</span> 전자책 ({EBOOKS_DATA.length})
            </button>
          </div>
        </div>
      </section>

      {/* Top Leaderboard Ad Banner */}
      <AdSlotBanner label="스폰서 추천 광고" mockImg="/images/ads/mock-leaderboard-cloud.png" href="/ai-tools" />

      {/* 2. Featured Video Insights Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-indigo-500/20 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Video &amp; Guides</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>🎬</span> AI 실무 영상 &amp; 튜토리얼
            </h2>
          </div>
          <button
            onClick={handleNav('insights', '/insights')}
            className="text-xs sm:text-sm font-bold text-indigo-400 hover:underline cursor-pointer"
          >
            전체 {INSIGHTS_DATA.length}편 보기 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {featuredInsights.map((item) => (
            <div
              key={item.id}
              onClick={handleNav('insights', '/insights')}
              className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-950/40 text-indigo-400 text-2xl">
                    🎬
                  </div>
                )}
                {item.category && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-950/80 text-indigo-300">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-indigo-400 font-bold">
                  <span>1분 요약보기 &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Smart Web Tools Section (with rich ToolCardVisual) */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-indigo-500/20 pb-3">
          <div>
            <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Utilities</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>🛠️</span> 인기 스마트 웹 유틸리티
            </h2>
          </div>
          <button
            onClick={handleNav('tools', '/tools')}
            className="text-xs sm:text-sm font-bold text-purple-400 hover:underline cursor-pointer"
          >
            전체 130+ 도구 보기 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {featuredTools.map((tool) => (
            <a
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="stitch-card rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg overflow-hidden border border-slate-800/80 bg-slate-900/60"
            >
              <ToolCardVisual tool={tool} />
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-1 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-400 font-bold">
                  <span className="text-slate-500 text-[10px]">{tool.category}</span>
                  <span className="group-hover:translate-x-1 transition-transform">도구 열기 &rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Mid Horizontal Ad Slot */}
      <AdSlotBanner label="스마트 비즈니스 도구 추천" mockImg="/images/ads/mock-leaderboard-cloud.png" href="/ai-tools" />

      {/* 4. Latest AI Blogs Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-indigo-500/20 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Editorial</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>📰</span> 최신 AI 블로그 &amp; 아티클
            </h2>
          </div>
          <button
            onClick={handleNav('blog', '/blog')}
            className="text-xs sm:text-sm font-bold text-indigo-400 hover:underline cursor-pointer"
          >
            전체 {BLOGS_DATA.length}편 보기 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {latestBlogs.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                {post.thumbnail ? (
                  <img
                    src={`${post.thumbnail}?v=v30ultra`}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-950/40 text-indigo-400 text-2xl">
                    📝
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] text-slate-500">{post.date}</span>
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </div>
                <span className="text-[11px] text-indigo-400 font-bold pt-2 border-t border-slate-800">
                  읽기 &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 5. AI Prompts Showcase Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-indigo-500/20 pb-3">
          <div>
            <span className="text-xs font-bold text-pink-400 tracking-wider uppercase">Prompts Library</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>💬</span> 실전 AI 프롬프트 컬렉션
            </h2>
          </div>
          <button
            onClick={handleNav('prompts', '/prompts')}
            className="text-xs sm:text-sm font-bold text-pink-400 hover:underline cursor-pointer"
          >
            전체 {PROMPTS_DATA.length}종 보기 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {featuredPrompts.map((p) => (
            <div
              key={p.id}
              onClick={handleNav('prompts', '/prompts')}
              className="stitch-card rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between group hover:border-pink-500/40 transition-all cursor-pointer bg-slate-900/60"
            >
              <div className="space-y-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 font-bold border border-pink-500/20 inline-block">
                  {p.category_name || '프롬프트'}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-pink-300 transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {p.description}
                </p>
              </div>
              <div className="pt-2.5 border-t border-slate-800 text-[11px] text-pink-400 font-bold flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={(e) => handleCopyPrompt(p, e)}
                  className="w-full text-center py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{copiedId === p.id ? '✓ 복사완료!' : '프롬프트 복사'}</span>
                  <span>{copiedId === p.id ? '✨' : '📋'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Second Horizontal Ad Slot */}
      <AdSlotBanner label="크리에이티브 AI & 프롬프트 스폰서" mockImg="/images/ads/mock-leaderboard-cloud.png" href="/ai-tools" />

      {/* 6. Banana AI Gallery Showcase (4 cols Web, 2 cols Mobile) */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-indigo-500/20 pb-3">
          <div>
            <span className="text-xs font-bold text-yellow-400 tracking-wider uppercase">Gallery</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>🍌</span> 바나나 AI 갤러리
            </h2>
          </div>
          <button
            onClick={handleNav('gallery', '/gallery')}
            className="text-xs sm:text-sm font-bold text-yellow-400 hover:underline cursor-pointer"
          >
            전체 {GALLERY_DATA.length}작품 보기 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {featuredGallery.map((img) => (
            <div
              key={img.id}
              onClick={handleNav('gallery', '/gallery')}
              className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-yellow-500/50 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                <img
                  src={img.image_url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {img.title}
                </h3>
                <span className="text-[11px] text-yellow-400 font-semibold pt-2 border-t border-slate-800">
                  프롬프트 확인 &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. AI Ebooks & Guides Showcase (4 cols Web, 2 cols Mobile) */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-indigo-500/20 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">E-Books</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>📚</span> AI 전문 가이드 &amp; 전자책
            </h2>
          </div>
          <button
            onClick={handleNav('ebooks', '/ebooks')}
            className="text-xs sm:text-sm font-bold text-emerald-400 hover:underline cursor-pointer"
          >
            전체 {EBOOKS_DATA.length}종 전자책 보기 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {featuredEbooks.map((eb) => (
            <div
              key={eb.id}
              className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                {eb.thumbnail ? (
                  <img
                    src={eb.thumbnail}
                    alt={eb.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-950/40 text-emerald-400 text-3xl">
                    📚
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {eb.title}
                </h3>
                <div className="pt-2 border-t border-slate-800">
                  <a
                    href={eb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-bold transition-all border border-emerald-500/30"
                  >
                    가이드 열기 &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
