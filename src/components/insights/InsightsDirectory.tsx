import React, { useState, useMemo } from 'react';
import { INSIGHTS_DATA, type InsightItem } from '../../data/insightsData';

export default function InsightsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

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
            className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
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
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                {item.video_url && (
                  <button
                    onClick={() => setActiveVideoUrl(item.video_url || null)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1 border border-indigo-500/30"
                  >
                    <span>▶</span> 영상 시청
                  </button>
                )}
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

      {/* Video Modal */}
      {activeVideoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-slate-950 flex justify-between items-center border-b border-slate-800">
              <span className="text-xs font-bold text-indigo-400">🎬 영상 시청</span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2 py-1"
              >
                닫기 ✕
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(activeVideoUrl) || ''}
                title="Insight Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
