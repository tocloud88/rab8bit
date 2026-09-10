import React, { useState } from 'react';

interface Restaurant {
  name: string;
  category: string;
  location: string;
  signature: string;
  rating: string;
  desc: string;
}

const RESTAURANTS: Restaurant[] = [
  {
    name: '성수 대림창고',
    category: '카페/디저트',
    location: '서울 성동구 성수동',
    signature: '시그니처 드립커피, 크로플',
    rating: '★ 4.8',
    desc: '붉은 벽돌과 예술 작품이 어우러진 성수동의 상징적인 갤러리 감성 대형 카페.'
  },
  {
    name: '을지로 평래옥',
    category: '한식/면류',
    location: '서울 중구 을지로',
    signature: '평양냉면, 초계탕',
    rating: '★ 4.7',
    desc: '70년 전통의 진한 닭육수 초계탕과 담백한 평양냉면 명가.'
  },
  {
    name: '강남 땀땀',
    category: '아시안/베트남',
    location: '서울 강남구 역삼동',
    signature: '매운 소곱창 쌀국수',
    rating: '★ 4.9',
    desc: '불향 가득한 소곱창이 푸짐하게 올라간 중독성 넘치는 매운 쌀국수 성지.'
  },
  {
    name: '연남동 카쿠시타',
    category: '일식/이자카야',
    location: '서울 마포구 연남동',
    signature: '연남카츠, 모츠나베',
    rating: '★ 4.8',
    desc: '겉바속촉 수제 카츠와 따뜻한 대창 전골이 일품인 아늑한 심야식당.'
  },
  {
    name: '한남동 오스테리아 오르조',
    category: '양식/이탈리안',
    location: '서울 용산구 한남동',
    signature: '한우 안심 카르파치오, 화이트 라구',
    rating: '★ 4.9',
    desc: '미쉐린 가이드 선정, 생면 파스타와 와인 페어링이 완벽한 이탈리안 비스트로.'
  }
];

export default function RestaurantList() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '한식/면류', '아시안/베트남', '일식/이자카야', '양식/이탈리안', '카페/디저트'];

  const filtered = RESTAURANTS.filter(r => selectedCategory === '전체' || r.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r, idx) => (
          <div
            key={idx}
            className="stitch-card p-6 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all shadow-xl space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 text-indigo-400 border border-slate-800 font-semibold">
                  {r.category}
                </span>
                <span className="text-xs font-bold text-amber-400">{r.rating}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{r.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span>📍</span> {r.location}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {r.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs font-bold text-indigo-300 flex items-center justify-between">
              <span>대표 메뉴: {r.signature}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
