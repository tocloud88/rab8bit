import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GALLERY_DATA, type GalleryItem } from '../../data/galleryData';

export default function GalleryDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalItem]);

  // Extract categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    GALLERY_DATA.forEach(item => {
      if (item.category) cats.add(item.category.trim());
    });
    return ['전체', ...Array.from(cats)];
  }, []);

  // Filtered items
  const filteredItems = useMemo(() => {
    return GALLERY_DATA.filter(item => {
      const matchCategory = selectedCategory === '전체' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.prompt.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyPrompt = (prompt: string, id: string | number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-yellow-500/20 backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-extrabold shadow-md shadow-yellow-500/25 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
                }`}
            >
              {cat}
              {cat === '전체' && ` (${GALLERY_DATA.length})`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="작품명, 프롬프트, 태그 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
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
        {filteredItems.map(item => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image with overlay */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setActiveModalItem(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs text-yellow-300 font-bold">🔍 클릭하여 프롬프트 확인</span>
                </div>
                {item.recommended ? (
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 shadow-md">
                    ★ 추천
                  </span>
                ) : null}
                {item.category && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-950/80 backdrop-blur-md text-yellow-300 border border-yellow-500/30">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3
                    onClick={() => setActiveModalItem(item)}
                    className="font-bold text-xs sm:text-sm text-white group-hover:text-yellow-400 transition-colors line-clamp-1 leading-snug cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 font-mono leading-relaxed">
                    {item.prompt}
                  </p>
                </div>

                {/* Copy Button */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => copyPrompt(item.prompt, item.id)}
                    className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-yellow-500/10 hover:bg-yellow-500 text-yellow-300 hover:text-slate-950 border border-yellow-500/30'
                      }`}
                  >
                    <span>{isCopied ? '✓' : '🍌'}</span>
                    <span>{isCopied ? '프롬프트 복사 완료!' : '프롬프트 복사'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-4xl mb-3">🍌</p>
          <p className="text-slate-400 text-sm font-medium">검색된 갤러리 작품이 없습니다.</p>
        </div>
      )}

      {/* Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-yellow-500/30 shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="md:w-1/2 bg-black flex items-center justify-center p-2">
              <img
                src={activeModalItem.image_url}
                alt={activeModalItem.title}
                className="max-h-[50vh] md:max-h-[80vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Modal Content */}
            <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-950 text-yellow-300 font-bold border border-yellow-800/50">
                      {activeModalItem.category || '나노바나나 AI'}
                    </span>
                    <h2 className="text-lg font-bold text-white mt-2">{activeModalItem.title}</h2>
                  </div>
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="text-slate-400 hover:text-white text-base font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-yellow-400 block mb-1">생성 프롬프트 (Prompt)</label>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed select-all">
                    {activeModalItem.prompt}
                  </pre>
                </div>

                {activeModalItem.tags && activeModalItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeModalItem.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => copyPrompt(activeModalItem.prompt, 'modal')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-yellow-500/20 hover:scale-[1.02]"
                >
                  {copiedId === 'modal' ? '✓ 프롬프트가 복사되었습니다!' : '🍌 프롬프트 원클릭 복사'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
