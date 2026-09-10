import React, { useState } from 'react';

interface WordItem {
  word: string;
  category: string;
  meaning: string;
  example: string;
  tag: string;
}

const WORDS_DATABASE: WordItem[] = [
  {
    word: '알잘딱깔센',
    category: 'MZ 신조어',
    meaning: '알아서 잘 딱 깔끔하고 센스있게 행동하는 태도.',
    example: '“이번 프로젝트 기획안 알잘딱깔센하게 부탁드립니다.”',
    tag: '업무/센스'
  },
  {
    word: '중꺾마',
    category: '유행어/밈',
    meaning: '‘중요한 것은 꺾이지 않는 마음’의 줄임말로 포기하지 않는 끈기를 뜻함.',
    example: '“힘든 시기지만 중꺾마 정신으로 끝까지 가보자!”',
    tag: '동기부여'
  },
  {
    word: '갓생 (God+生)',
    category: '라이프스타일',
    meaning: '하루하루를 부지런하고 생산적이며 모범적으로 살아가는 삶.',
    example: '“오늘부터 미라클 모닝 하면서 갓생 살기 도전!”',
    tag: '생산성'
  },
  {
    word: '프롬프트 엔지니어링',
    category: 'AI/IT 용어',
    meaning: 'LLM(대형 언어 모델)으로부터 원하는 최적의 답변을 이끌어내기 위해 질문과 지침을 체계적으로 설계하는 기술.',
    example: '“rab8bit의 프롬프트 팁을 보고 프롬프트 엔지니어링 역량을 키웠어.”',
    tag: '인공지능'
  },
  {
    word: '분좋카',
    category: 'MZ 신조어',
    meaning: '‘분위기 좋은 카페’의 줄임말.',
    example: '“주말에 성수동에서 분좋카 투어 갈 사람?”',
    tag: '일상'
  },
  {
    word: '점메추',
    category: '직장인/학생',
    meaning: '‘점심 메뉴 추천’의 줄임말.',
    example: '“오늘 점메추 좀 해줘! 뭐 먹을지 결정을 못하겠어.”',
    tag: '음식'
  },
  {
    word: 'Harness (하네스)',
    category: '개발/AI 용어',
    meaning: '소프트웨어나 AI 모델을 테스트하고 자동화된 파이프라인으로 연결해주는 테스트/실행 프레임워크.',
    example: '“새로운 에이전트 평가용 테스트 하네스를 구축했습니다.”',
    tag: '기술'
  },
  {
    word: '폼 미쳤다',
    category: '유행어/밈',
    meaning: '어떤 사람의 기량, 성과, 외모나 완성도가 믿기지 않을 만큼 대단함을 칭찬하는 말.',
    example: '“오늘 rab8bit 웹사이트 업데이트 폼 미쳤다!”',
    tag: '칭찬'
  },
  {
    word: '핑프 (핑거 프린세스/프린스)',
    category: '인터넷 용어',
    meaning: '스스로 검색해보지 않고 사소한 것까지 남에게 바로 질문부터 하는 사람.',
    example: '“검색 한 번이면 나오는 정보인데 핑프처럼 묻지 말자.”',
    tag: '인터넷'
  },
  {
    word: '디토 (Ditto) 소비',
    category: '트렌드',
    meaning: '특정 인물이나 인플루언서, 전문가의 추천과 취향을 그대로 따라 구매하는 소비 트렌드.',
    example: '“요즘엔 복잡한 비교 대신 신뢰하는 큐레이터를 디토 소비하는 게 대세야.”',
    tag: '소비/경제'
  }
];

export default function NewWordDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');

  const tags = ['전체', 'MZ 신조어', 'AI/IT 용어', '유행어/밈', '라이프스타일', '직장인/학생'];

  const filtered = WORDS_DATABASE.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.example.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '전체' || item.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search and Filters */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="궁금한 신조어, 밈, 최신 IT 단어를 검색하세요..."
            className="w-full bg-slate-950/80 text-white pl-12 pr-4 py-3.5 rounded-2xl border border-indigo-500/30 text-sm font-semibold focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="stitch-card p-6 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all space-y-3 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">#{item.tag}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{item.word}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.meaning}</p>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80 text-xs text-indigo-300 italic">
              {item.example}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          검색된 신조어 단어가 없습니다.
        </div>
      )}
    </div>
  );
}
