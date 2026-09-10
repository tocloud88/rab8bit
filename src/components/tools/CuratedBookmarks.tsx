import React, { useState } from 'react';

interface Bookmark {
  title: string;
  url: string;
  category: string;
  description: string;
  icon: string;
}

const BOOKMARKS: Bookmark[] = [
  {
    title: 'Astro 공식 문서',
    url: 'https://docs.astro.build',
    category: '웹 프레임워크',
    description: '콘텐츠 중심의 초고속 웹사이트를 구축하기 위한 최고의 모던 웹 프레임워크.',
    icon: '🚀'
  },
  {
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    category: 'UI/CSS',
    description: '유틸리티 우선의 현대적인 CSS 프레임워크와 컴포넌트 스타일링.',
    icon: '🎨'
  },
  {
    title: 'Claude AI (Anthropic)',
    url: 'https://claude.ai',
    category: 'AI 도구',
    description: '코딩과 복잡한 추론, 긴 문서 분석에 최적화된 차세대 인공지능.',
    icon: '🤖'
  },
  {
    title: 'Lucide Icons',
    url: 'https://lucide.dev',
    category: '디자인 리소스',
    description: '모던 웹 개발을 위한 깔끔하고 일관성 있는 무료 오픈소스 아이콘 팩.',
    icon: '✨'
  },
  {
    title: 'Cloudflare Pages',
    url: 'https://pages.cloudflare.com',
    category: '인프라/호스팅',
    description: '글로벌 초고속 엣지 네트워크를 갖춘 프런트엔드 정적 호스팅 서비스.',
    icon: '⚡'
  },
  {
    title: 'Can I Use',
    url: 'https://caniuse.com',
    category: '웹 표준',
    description: '프론트엔드 최신 CSS/JS 기능의 브라우저별 호환성 및 점유율 확인 사이트.',
    icon: '🔍'
  }
];

export default function CuratedBookmarks() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const categories = ['전체', '웹 프레임워크', 'AI 도구', 'UI/CSS', '디자인 리소스', '인프라/호스팅', '웹 표준'];

  const filtered = BOOKMARKS.filter(b => activeCategory === '전체' || b.category === activeCategory);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group stitch-card p-6 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 text-indigo-400 border border-slate-800 font-semibold">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                <span>{item.title}</span>
                <span className="text-xs text-slate-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono truncate">
              {item.url}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
