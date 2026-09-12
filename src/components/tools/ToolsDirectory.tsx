import React, { useState, useMemo } from 'react';
import { INTERACTIVE_TOOLS, type InteractiveToolItem } from '../../data/interactiveToolsData';
import ToolCardVisual from './ToolCardVisual';

export { INTERACTIVE_TOOLS, type InteractiveToolItem };

export default function ToolsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    INTERACTIVE_TOOLS.forEach(t => cats.add(t.category));
    return ['전체', ...Array.from(cats)];
  }, []);

  // Filter interactive tools
  const filteredTools = useMemo(() => {
    return INTERACTIVE_TOOLS.filter(item => {
      const matchCategory = selectedCategory === '전체' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Category Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => {
            const count = cat === '전체' 
              ? INTERACTIVE_TOOLS.length 
              : INTERACTIVE_TOOLS.filter(t => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="100개 도구 검색..."
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

      {/* Grid: 4 Cols on Desktop / 2 Cols on Mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {filteredTools.map(item => (
          <a
            key={item.slug}
            href={`/tools/${item.slug}`}
            className="stitch-card rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg overflow-hidden border border-slate-800/80 bg-slate-900/60"
          >
            {/* 16:9 Intuitive Visual Thumbnail */}
            <ToolCardVisual tool={item} />

            {/* Card Content Body */}
            <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-1 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-400 font-bold">
                <span className="text-slate-500 text-[10px]">웹 앱 바로 실행</span>
                <span className="group-hover:translate-x-1 transition-transform">도구 열기 →</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-4xl mb-3">🛠️</p>
          <p className="text-slate-400 text-sm font-medium">검색된 웹 도구가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
