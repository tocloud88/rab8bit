import React, { useState, useEffect, useMemo } from 'react';
import { AI_TOOLS, AI_CATEGORIES, type AiTool } from '../../data/aiTools';

const CATEGORY_COLORS: Record<string, { badge: string; border: string; glow: string }> = {
  '대화형 AI 및 글쓰기': { badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30', border: 'hover:border-blue-500/50', glow: 'from-blue-500/10' },
  '코드 및 개발': { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', border: 'hover:border-emerald-500/50', glow: 'from-emerald-500/10' },
  '영상 및 오디오 제작': { badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30', border: 'hover:border-purple-500/50', glow: 'from-purple-500/10' },
  '이미지 및 디자인': { badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30', border: 'hover:border-pink-500/50', glow: 'from-pink-500/10' },
  '업무 자동화 및 에이전트': { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', border: 'hover:border-amber-500/50', glow: 'from-amber-500/10' },
  '연구 및 분석': { badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', border: 'hover:border-cyan-500/50', glow: 'from-cyan-500/10' },
  '마케팅 및 비즈니스': { badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30', border: 'hover:border-rose-500/50', glow: 'from-rose-500/10' },
  '비즈니스 생산성': { badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', border: 'hover:border-indigo-500/50', glow: 'from-indigo-500/10' },
};

export default function AiToolsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rab8bit_fav_ai_tools');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleFavorite = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = favorites.includes(name)
      ? favorites.filter(n => n !== name)
      : [...favorites, name];
    setFavorites(updated);
    try {
      localStorage.setItem('rab8bit_fav_ai_tools', JSON.stringify(updated));
    } catch {}
  };

  const copyLink = async (tool: AiTool, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(tool.link);
    setCopiedName(tool.name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  // Extract top keywords for filter pills
  const allKeywords = useMemo(() => {
    const counts: Record<string, number> = {};
    AI_TOOLS.forEach(t => {
      t.keywords?.forEach(k => {
        counts[k] = (counts[k] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([k]) => k);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { '전체': AI_TOOLS.length };
    AI_TOOLS.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.keywords?.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === '전체' || tool.category === selectedCategory;

      const matchesKeyword =
        !selectedKeyword || tool.keywords?.includes(selectedKeyword);

      const matchesFav =
        !showOnlyFavs || favorites.includes(tool.name);

      return matchesSearch && matchesCategory && matchesKeyword && matchesFav;
    });
  }, [searchTerm, selectedCategory, selectedKeyword, showOnlyFavs, favorites]);

  // Progressive Chunk Loading (Load initial 24 items, auto-expand on scroll)
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const observerTarget = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(24);
  }, [searchTerm, selectedCategory, selectedKeyword, showOnlyFavs]);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleCount < filteredTools.length) {
          setVisibleCount(prev => Math.min(filteredTools.length, prev + 24));
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleCount, filteredTools.length]);

  const visibleTools = useMemo(() => {
    return filteredTools.slice(0, visibleCount);
  }, [filteredTools, visibleCount]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Search & Filter Header */}
      <div className="space-y-4">
        {/* Search Input Box */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="AI 도구 이름, 키워드, 기능 설명 검색 (예: Claude, ChatGPT, 코딩, 영상, 에이전트, MCP)..."
            className="w-full bg-slate-900/90 text-white pl-12 pr-10 py-4 rounded-2xl border border-indigo-500/30 text-sm sm:text-base font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xl placeholder:text-slate-500"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕ 지우기
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {AI_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedKeyword(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => setShowOnlyFavs(!showOnlyFavs)}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              showOnlyFavs
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 scale-105'
                : 'bg-slate-900/80 text-pink-400 border border-pink-500/30 hover:bg-slate-800'
            }`}
          >
            <span>❤️ 즐겨찾기 ({favorites.length})</span>
          </button>
        </div>

        {/* Popular Keyword Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-500 font-semibold mr-1">인기 태그:</span>
          {allKeywords.map((k) => (
            <button
              key={k}
              onClick={() => setSelectedKeyword(selectedKeyword === k ? null : k)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                selectedKeyword === k
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-indigo-300 border border-slate-800'
              }`}
            >
              #{k}
            </button>
          ))}
          {selectedKeyword && (
            <button
              onClick={() => setSelectedKeyword(null)}
              className="text-[11px] text-pink-400 hover:underline ml-2"
            >
              태그 초기화 ✕
            </button>
          )}
        </div>
      </div>

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>
          총 <strong className="text-indigo-400 font-bold">{filteredTools.length}</strong>개의 AI 도구가 등록되어 있습니다.
        </span>
        {(selectedCategory !== '전체' || selectedKeyword || searchTerm || showOnlyFavs) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('전체');
              setSelectedKeyword(null);
              setShowOnlyFavs(false);
            }}
            className="text-indigo-400 hover:underline text-xs"
          >
            전체 필터 초기화
          </button>
        )}
      </div>

      {/* AI Tools Cards Grid (Mobile 2 cols, Desktop 3 cols with aside) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3.5 sm:gap-4.5">
        {visibleTools.map((tool) => {
          const isFav = favorites.includes(tool.name);
          const styling = CATEGORY_COLORS[tool.category] || {
            badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
            border: 'hover:border-indigo-500/50',
            glow: 'from-indigo-500/10'
          };

          return (
            <div
              key={tool.name}
              className={`group stitch-card p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-indigo-500/20 ${styling.border} transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Subtle top glow gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${styling.glow} to-transparent rounded-bl-full group-hover:scale-125 transition-transform pointer-events-none`} />

              <div className="space-y-2.5 relative z-10">
                {/* Header: Category Badge & Favorite Button */}
                <div className="flex items-start justify-between gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${styling.badge} truncate max-w-[110px] sm:max-w-[150px]`}>
                    {tool.category}
                  </span>

                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      onClick={(e) => copyLink(tool, e)}
                      title="웹사이트 링크 복사"
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
                    >
                      {copiedName === tool.name ? '✓' : '🔗'}
                    </button>
                    <button
                      onClick={(e) => toggleFavorite(tool.name, e)}
                      title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                      className="p-1 rounded-lg hover:bg-slate-800 text-xs sm:text-sm transition-transform active:scale-90"
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-sm sm:text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors leading-snug line-clamp-1">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                {/* Keywords */}
                {tool.keywords && tool.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {tool.keywords.slice(0, 3).map((kw) => (
                      <span
                        key={kw}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedKeyword(kw);
                        }}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors cursor-pointer"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer: Visit Site CTA */}
              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between relative z-10 gap-1">
                <span className="hidden sm:inline text-[10px] text-slate-500 font-mono truncate max-w-[90px]">
                  {tool.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-2.5 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-[11px] sm:text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1 group-hover:scale-105"
                >
                  <span>방문</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite Scroll Sentinel / Load More Button */}
      {visibleCount < filteredTools.length && (
        <div ref={observerTarget} className="py-4 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => Math.min(filteredTools.length, prev + 24))}
            className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-bold border border-indigo-500/30 transition-all shadow-md flex items-center gap-1.5"
          >
            <span>더 많은 AI 도구 불러오기 ({visibleCount} / {filteredTools.length})</span>
            <span>↓</span>
          </button>
        </div>
      )}

      {filteredTools.length === 0 && (
        <div className="text-center py-20 stitch-card rounded-3xl border border-slate-800 space-y-4">
          <span className="text-5xl">🤖</span>
          <h3 className="text-lg font-bold text-white">일치하는 AI 도구를 찾지 못했습니다</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            검색어 철자를 확인하시거나 카테고리/태그 필터를 초기화해 보세요.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('전체');
              setSelectedKeyword(null);
              setShowOnlyFavs(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105"
          >
            전체 AI 도구 보기 (152개)
          </button>
        </div>
      )}
    </div>
  );
}
