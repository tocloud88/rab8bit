import React, { useState, useMemo } from 'react';
import { BLOGS_DATA, type BlogPost } from '../../data/blogsData';

export default function BlogDirectory() {
  const [selectedTag, setSelectedTag] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [visibleCount, setVisibleCount] = useState<number>(16);
  const observerTarget = React.useRef<HTMLDivElement>(null);

  // Extract popular tags
  const popularTags = useMemo(() => {
    const tagCount: { [k: string]: number } = {};
    BLOGS_DATA.forEach(post => {
      post.tags?.forEach(t => {
        const clean = t.trim();
        tagCount[clean] = (tagCount[clean] || 0) + 1;
      });
    });
    const sorted = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(entry => entry[0]);
    return ['전체', ...sorted];
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOGS_DATA.filter(post => {
      const matchTag = selectedTag === '전체' || (post.tags && post.tags.includes(selectedTag));
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));
      return matchTag && matchSearch;
    });
  }, [selectedTag, searchQuery]);

  // Reset pagination on filter changes
  React.useEffect(() => {
    setVisibleCount(16);
  }, [selectedTag, searchQuery]);

  // IntersectionObserver for progressive chunk loading
  React.useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredPosts.length) {
          setVisibleCount((prev) => Math.min(filteredPosts.length, prev + 16));
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleCount, filteredPosts.length]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  return (
    <div className="space-y-6">
      {/* Search & Tag Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-xl">
        {/* Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {popularTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
              }`}
            >
              {tag === '전체' ? '전체' : `#${tag}`}
              {tag === '전체' && ` (${BLOGS_DATA.length})`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="글 제목, 내용, 키워드 검색..."
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
        {visiblePosts.map(post => (
          <a
            key={post.id}
            href={`/blog/${post.id}`}
            className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              {post.thumbnail ? (
                <img
                  src={`${post.thumbnail}?v=v30ultra`}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950/50 to-slate-900 text-indigo-400 font-bold text-2xl">
                  📝
                </div>
              )}
              {post.is_new ? (
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md">
                  NEW
                </span>
              ) : null}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-bold">
                <span className="text-slate-500 text-xs truncate max-w-[100px]">
                  {post.tags && post.tags[0] ? `#${post.tags[0]}` : '블로그'}
                </span>
                <span className="group-hover:translate-x-1 transition-transform">
                  읽기 &rarr;
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Infinite Scroll Sentinel */}
      {visibleCount < filteredPosts.length && (
        <div ref={observerTarget} className="py-8 flex justify-center items-center">
          <button
            onClick={() => setVisibleCount(prev => Math.min(filteredPosts.length, prev + 16))}
            className="px-6 py-2.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600/80 text-slate-300 hover:text-white text-xs font-bold border border-slate-700/80 transition-all flex items-center gap-2 shadow-lg"
          >
            <span>더 많은 블로그 글 불러오기</span>
            <span className="text-slate-400 text-[10px]">({visibleCount} / {filteredPosts.length})</span>
          </button>
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-400 text-sm font-medium">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
