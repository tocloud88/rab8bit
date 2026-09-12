import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { INSIGHTS_DATA, type InsightItem } from '../../data/insightsData';

export default function InsightsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInsight, setSelectedInsight] = useState<InsightItem | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedInsight) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedInsight]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    INSIGHTS_DATA.forEach(item => {
      if (item.category) cats.add(item.category.trim());
    });
    return ['전체', ...Array.from(cats)];
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return INSIGHTS_DATA.filter(item => {
      const matchCategory = selectedCategory === '전체' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // YouTube embed helper
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const handleOpenSummary = (item: InsightItem) => {
    setSelectedInsight(item);
    setIsPlayingVideo(false);
    setCopiedLink(false);
  };

  const handleCopyLink = () => {
    if (!selectedInsight) return;
    const shareUrl = selectedInsight.video_url || window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to structure 1-minute summary content
  const renderFormattedDescription = (desc: string) => {
    const paragraphs = desc.split('\n\n').filter(p => p.trim().length > 0);
    if (paragraphs.length > 1) {
      return (
        <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">{p.trim()}</p>
          ))}
        </div>
      );
    }
    return (
      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
        {desc}
      </p>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
              }`}
            >
              {cat}
              {cat === '전체' && ` (${INSIGHTS_DATA.length})`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="인사이트 제목, 내용, 태그 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid: 4 cols on Web, 2 cols on Mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => handleOpenSummary(item)}
            className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950/50 to-slate-900 text-indigo-400 font-bold text-2xl">
                  🎬
                </div>
              )}
              {item.is_new ? (
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md">
                  NEW
                </span>
              ) : null}
              {item.category && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                  {item.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 truncate max-w-[100px]">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleOpenSummary(item)}
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600 hover:to-purple-600 text-indigo-200 hover:text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 border border-indigo-500/40 shadow-sm"
                >
                  <span>📋</span> 요약보기
                </button>
                {item.download_url && (
                  <a
                    href={item.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1 border border-slate-700"
                  >
                    <span>📥</span> 자료
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-400 text-sm font-medium">검색 결과가 없습니다.</p>
        </div>
      )}

      {/* Summary & Video Modal */}
      {selectedInsight && mounted && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in"
          onClick={() => setSelectedInsight(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-indigo-500/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 p-4 sm:p-5 bg-slate-950/95 border-b border-slate-800/80 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    🎬 {selectedInsight.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                    ⏱️ 1분 완독 요약
                  </span>
                  {selectedInsight.date && (
                    <span className="text-[11px] text-slate-400">
                      📅 {selectedInsight.date}
                    </span>
                  )}
                </div>
                <h2 className="text-sm sm:text-lg font-extrabold text-white leading-snug">
                  {selectedInsight.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto overscroll-contain">
              {/* Video Player (Toggleable) */}
              {isPlayingVideo ? (
                <div className="space-y-2">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-indigo-500/30 shadow-lg">
                    <iframe
                      src={getEmbedUrl(selectedInsight.video_url) || ''}
                      title={selectedInsight.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span>🎬 유튜브 영상 시청 중</span>
                    {selectedInsight.video_url && (
                      <a
                        href={selectedInsight.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-semibold"
                      >
                        유튜브 앱/새 창에서 보기 &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                /* Video Play Callout Banner */
                <div
                  onClick={() => setIsPlayingVideo(true)}
                  className="relative group cursor-pointer aspect-video sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-indigo-500/20 hover:border-indigo-500/60 transition-all shadow-md flex items-center justify-center"
                >
                  {selectedInsight.thumbnail ? (
                    <img
                      src={selectedInsight.thumbnail}
                      alt={selectedInsight.title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center gap-2 text-center p-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        영상 시청하기 (클릭 시 바로 재생)
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        본문 요약을 먼저 읽어보신 후 영상을 시청하시면 더욱 효과적입니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 1-Minute Executive Summary Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-purple-950/30 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs sm:text-sm">
                  <span>💡</span>
                  <span>핵심 요약 & 도입</span>
                </div>
                {renderFormattedDescription(selectedInsight.description)}
              </div>

              {/* Structured Key Points (1-Minute Breakdown) */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>📌</span>
                  <span>핵심 포인트 & 실무 적용 가이드</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                    <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <span>🎯</span> 1. 핵심 인사이트
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      기존 방식 대비 차별화된 접근법과 AI 도구의 강점을 최대로 활용하는 핵심 메커니즘을 짚어냅니다.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                    <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                      <span>⚡</span> 2. 실무 워크플로우
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      프롬프트 작성부터 프롬프트 파이프라인 연동, 자동화 도구 세팅까지 현업에 즉시 적용 가능한 가이드를 제공합니다.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>💡</span> 3. 주의사항 & 꿀팁
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      흔히 발생하는 오류와 비효율을 방지하고 작업 완성도를 높이기 위한 필수 노하우를 정리합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended Audience */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-amber-400 font-bold">🎯 추천 대상:</span>
                  <span className="text-slate-400">
                    AI 실무 활용자 · 1인 창업가 · 개발자 · 콘텐츠 크리에이터
                  </span>
                </div>
              </div>

              {/* AD Placement Ready Container */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-dashed border-indigo-500/30 text-center space-y-2 relative overflow-hidden group">
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-semibold tracking-wider">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">AD</span>
                  <span>스폰서 추천 & 광고 영역</span>
                </div>
                <div className="py-3 px-4 rounded-xl bg-indigo-950/20 border border-indigo-500/10 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="font-bold text-slate-200">🚀 GPT PARK의 엄선된 AI 도구 & 프롬프트 모음</p>
                    <p className="text-[11px] text-slate-400">실무 생산성을 10배 끌어올리는 프롬프트 라이브러리를 지금 확인하세요.</p>
                  </div>
                  <a
                    href="/prompts"
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
                  >
                    보러가기 &rarr;
                  </a>
                </div>
              </div>

              {/* Tags */}
              {selectedInsight.tags && selectedInsight.tags.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400">🏷️ 관련 태그:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInsight.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/90 text-indigo-300 border border-slate-700/80"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="shrink-0 p-4 sm:p-5 bg-slate-950 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-md ${
                    isPlayingVideo
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'
                  }`}
                >
                  <span>{isPlayingVideo ? '⏸️ 플레이어 접기' : '▶ 영상 시청하기'}</span>
                </button>

                {selectedInsight.video_url && (
                  <a
                    href={selectedInsight.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1 border border-slate-700"
                  >
                    <span>↗</span> 유튜브 새 탭
                  </a>
                )}

                {selectedInsight.download_url && (
                  <a
                    href={selectedInsight.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-1 border border-emerald-500/30"
                  >
                    <span>📥</span> 자료 다운로드
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1"
                >
                  <span>{copiedLink ? '✓' : '🔗'}</span>
                  <span>{copiedLink ? '복사완료!' : '링크 복사'}</span>
                </button>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
