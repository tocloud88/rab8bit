import React, { useState, useEffect, useMemo } from 'react';
import { BLOGS_DATA } from '../../data/blogsData';
import { INSIGHTS_DATA } from '../../data/insightsData';
import { PROMPTS_DATA } from '../../data/promptsData';
import { GPTS_DATA } from '../../data/gptsData';
import { AI_TOOLS } from '../../data/aiTools';
import { INTERACTIVE_TOOLS } from '../tools/ToolsDirectory';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) setQuery(q);
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { blogs: [], insights: [], tools: [], prompts: [], gpts: [], aiTools: [] };

    const blogs = BLOGS_DATA.filter(
      b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || (b.tags && b.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 8);

    const insights = INSIGHTS_DATA.filter(
      i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || (i.tags && i.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 8);

    const tools = INTERACTIVE_TOOLS.filter(
      t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q))
    ).map(t => ({ ...t, isLocal: true, link: "/tools/" + t.slug })).slice(0, 8);

    const prompts = PROMPTS_DATA.filter(
      p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
    ).slice(0, 8);

    const gpts = GPTS_DATA.filter(
      g => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.content.toLowerCase().includes(q)
    ).slice(0, 8);

    const aiTools = AI_TOOLS.filter(
      a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || (a.keywords && a.keywords.some(k => k.toLowerCase().includes(q)))
    ).slice(0, 8);

    return { blogs, insights, tools, prompts, gpts, aiTools };
  }, [query]);

  const totalCount =
    results.blogs.length +
    results.insights.length +
    results.tools.length +
    results.prompts.length +
    results.gpts.length +
    results.aiTools.length;

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            const url = new URL(window.location.href);
            url.searchParams.set('q', e.target.value);
            window.history.replaceState({}, '', url.toString());
          }}
          placeholder="검색어를 입력하세요 (예: 챗GPT, 단위변환, 코딩, 이미지)..."
          className="w-full bg-slate-900/90 text-white text-sm sm:text-base rounded-2xl pl-12 pr-10 py-3.5 border border-indigo-500/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xl placeholder:text-slate-500 transition-all"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">🔍</span>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              const url = new URL(window.location.href);
              url.searchParams.delete('q');
              window.history.replaceState({}, '', url.toString());
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Result Stats & Filter */}
      {query && (
        <div className="text-center text-xs sm:text-sm text-slate-400">
          "<strong className="text-indigo-400">{query}</strong>" 검색 결과 총 <strong className="text-white">{totalCount}</strong>건
        </div>
      )}

      {/* Results by Category */}
      {query && (
        <div className="space-y-8">
          {/* Blogs */}
          {results.blogs.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>📝</span> 블로그 아티클 ({results.blogs.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {results.blogs.map(b => (
                  <a
                    key={b.id}
                    href={`/blog/${b.id}`}
                    className="stitch-card p-3.5 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all"
                  >
                    <div>
                      <span className="text-[10px] text-slate-500">{b.date}</span>
                      <h3 className="font-bold text-xs text-white group-hover:text-indigo-400 line-clamp-2 mt-1">
                        {b.title}
                      </h3>
                    </div>
                    <span className="text-[11px] text-indigo-400 font-semibold mt-2 pt-2 border-t border-slate-800">
                      읽기 &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Insights */}
          {results.insights.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>🎬</span> AI 인사이트 ({results.insights.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {results.insights.map(i => (
                  <a
                    key={i.id}
                    href="/insights"
                    className="stitch-card p-3.5 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all"
                  >
                    <div>
                      <span className="text-[10px] text-indigo-400 font-bold">{i.category}</span>
                      <h3 className="font-bold text-xs text-white group-hover:text-indigo-400 line-clamp-2 mt-1">
                        {i.title}
                      </h3>
                    </div>
                    <span className="text-[11px] text-indigo-400 font-semibold mt-2 pt-2 border-t border-slate-800">
                      영상 확인 &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {results.tools.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>🛠️</span> 스마트 도구 ({results.tools.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {results.tools.map((t, idx) => (
                  <a
                    key={idx}
                    href={'link' in t ? (t as any).link : '/tools'}
                    className="stitch-card p-3.5 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all"
                  >
                    <div>
                      <span className="text-[10px] text-slate-500">도구</span>
                      <h3 className="font-bold text-xs text-white group-hover:text-indigo-400 line-clamp-1 mt-1">
                        {t.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{t.description}</p>
                    </div>
                    <span className="text-[11px] text-indigo-400 font-semibold mt-2 pt-2 border-t border-slate-800">
                      실행 &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Prompts & GPTs */}
          {(results.prompts.length > 0 || results.gpts.length > 0) && (
            <div className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>💬</span> 프롬프트 & 챗봇지침 ({results.prompts.length + results.gpts.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {[...results.prompts, ...results.gpts].slice(0, 8).map(p => (
                  <a
                    key={p.id}
                    href="/prompts"
                    className="stitch-card p-3.5 rounded-2xl flex flex-col justify-between group hover:border-purple-500/50 transition-all"
                  >
                    <div>
                      <span className="text-[10px] text-purple-400 font-bold">{p.category_name || '프롬프트'}</span>
                      <h3 className="font-bold text-xs text-white group-hover:text-purple-400 line-clamp-2 mt-1">
                        {p.title}
                      </h3>
                    </div>
                    <span className="text-[11px] text-purple-400 font-semibold mt-2 pt-2 border-t border-slate-800">
                      프롬프트 복사 &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* AI Tools */}
          {results.aiTools.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>🌐</span> 추천 AI 사이트 ({results.aiTools.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {results.aiTools.map(a => (
                  <a
                    key={a.id}
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stitch-card p-3.5 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all"
                  >
                    <div>
                      <span className="text-[10px] text-indigo-400 font-bold">{a.category}</span>
                      <h3 className="font-bold text-xs text-white group-hover:text-indigo-400 line-clamp-1 mt-1">
                        {a.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{a.description}</p>
                    </div>
                    <span className="text-[11px] text-indigo-400 font-semibold mt-2 pt-2 border-t border-slate-800">
                      사이트 방문 &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {totalCount === 0 && (
            <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-slate-400 text-sm font-medium">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-16 text-slate-500 text-sm">
          상단 검색창에 키워드를 입력하시면 블로그, 인사이트, 도구, 프롬프트, AI 사이트에서 실시간으로 검색됩니다.
        </div>
      )}
    </div>
  );
}
