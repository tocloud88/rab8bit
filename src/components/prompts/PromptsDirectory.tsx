import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROMPTS_DATA, PROMPT_CATEGORIES, type PromptItem } from '../../data/promptsData';
import { GPTS_DATA, GPT_CATEGORIES, type GptItem } from '../../data/gptsData';

interface Props {
  initialTab?: 'prompts' | 'gpts';
}

export default function PromptsDirectory({ initialTab = 'prompts' }: Props) {
  const [activeTab, setActiveTab] = useState<'prompts' | 'gpts'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<(PromptItem | GptItem) | null>(null);
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

  const [visibleCount, setVisibleCount] = useState<number>(24);
  const observerTarget = React.useRef<HTMLDivElement>(null);

  // Switch tabs reset category
  const handleTabSwitch = (tab: 'prompts' | 'gpts') => {
    setActiveTab(tab);
    setSelectedCategory('전체');
    setSearchQuery('');
    setVisibleCount(24);
  };

  // Categories based on active tab
  const categories = useMemo(() => {
    if (activeTab === 'prompts') {
      return ['전체', ...PROMPT_CATEGORIES.map(c => c.name)];
    } else {
      return ['전체', ...GPT_CATEGORIES.map(c => c.name)];
    }
  }, [activeTab]);

  // Current items
  const currentItems = activeTab === 'prompts' ? PROMPTS_DATA : GPTS_DATA;

  // Filtered items
  const filteredItems = useMemo(() => {
    return currentItems.filter(item => {
      const matchCategory = selectedCategory === '전체' || item.category_name === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.content && item.content.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [currentItems, selectedCategory, searchQuery]);

  // Reset pagination on filter changes
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategory, searchQuery]);

  // Infinite Scroll IntersectionObserver
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredItems.length) {
          setVisibleCount((prev) => Math.min(filteredItems.length, prev + 24));
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleCount, filteredItems.length]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const copyToClipboard = (text: string, id: string | number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-indigo-500/25 backdrop-blur-xl shadow-lg shadow-indigo-950/40">
          <button
            onClick={() => handleTabSwitch('prompts')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'prompts'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>💬</span> AI 프롬프트 ({PROMPTS_DATA.length})
          </button>
          <button
            onClick={() => handleTabSwitch('gpts')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'gpts'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🤖</span> 챗봇지침 (GPTs) ({GPTS_DATA.length})
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? activeTab === 'prompts'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25 scale-105'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="프롬프트 제목, 본문 검색..."
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
        {visibleItems.map(item => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="stitch-card p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between group hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/50 truncate max-w-[120px]">
                    {item.category_name || (activeTab === 'prompts' ? '프롬프트' : '챗봇지침')}
                  </span>
                  {item.is_new ? (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-pink-500/20 text-pink-400 font-bold border border-pink-500/30">
                      NEW
                    </span>
                  ) : null}
                </div>

                <h3
                  onClick={() => setActiveModalItem(item)}
                  className="font-bold text-xs sm:text-sm text-white group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug cursor-pointer"
                >
                  {item.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description || item.content.slice(0, 80)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(item.content, item.id)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white border border-slate-700/80 hover:border-purple-500'
                  }`}
                >
                  <span>{isCopied ? '✓' : '📋'}</span>
                  <span>{isCopied ? '복사됨!' : '복사'}</span>
                </button>
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[11px] font-medium transition-colors border border-slate-800"
                >
                  보기
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite Scroll Sentinel */}
      {visibleCount < filteredItems.length && (
        <div ref={observerTarget} className="py-8 flex justify-center items-center">
          <button
            onClick={() => setVisibleCount(prev => Math.min(filteredItems.length, prev + 24))}
            className="px-6 py-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-600/80 text-slate-300 hover:text-white text-xs font-bold border border-slate-700/80 transition-all flex items-center gap-2 shadow-lg"
          >
            <span>더 많은 프롬프트 불러오기</span>
            <span className="text-slate-400 text-[10px]">({visibleCount} / {filteredItems.length})</span>
          </button>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-400 text-sm font-medium">검색된 프롬프트가 없습니다.</p>
        </div>
      )}

      {/* Detail Modal */}
      {activeModalItem && mounted && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl flex flex-col text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 p-4 bg-slate-950 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 font-bold border border-purple-800/50">
                  {activeModalItem.category_name}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 overscroll-contain">
              {activeModalItem.description && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  💡 <strong className="text-white">설명:</strong> {activeModalItem.description}
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-purple-400">프롬프트 본문</span>
                  <button
                    onClick={() => copyToClipboard(activeModalItem.content, 'modal')}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow"
                  >
                    {copiedId === 'modal' ? '✓ 복사 완료!' : '📋 원클릭 복사'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed select-all">
                  {activeModalItem.content}
                </pre>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
