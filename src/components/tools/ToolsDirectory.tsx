import React, { useState, useEffect } from 'react';

export interface ToolItem {
  slug: string;
  title: string;
  description: string;
  category: '텍스트' | '계산기' | '변환' | '랜덤/게임' | '개발 도구' | '이미지' | '지식/사전';
  icon: string;
  badge?: string;
  tags: string[];
}

export const ALL_TOOLS: ToolItem[] = [
  // 1. Text
  {
    slug: 'character-counter',
    title: '글자·단어 카운터',
    description: '공백 포함/제외 글자수, 단어수, 바이트수, 원고지 분량 및 예상 읽기 시간을 실시간으로 계산합니다.',
    category: '텍스트',
    icon: '✍️',
    badge: '필수 유틸',
    tags: ['글자수', '바이트', '자기소개서', '원고지']
  },
  {
    slug: 'find-replace',
    title: '문장 바꾸기',
    description: '여러 단어를 한 번에 찾아 원하는 텍스트로 일괄 치환합니다. 정규표현식(RegEx) 지원.',
    category: '텍스트',
    icon: '🔄',
    tags: ['치환', '다중교체', '정규식', '텍스트변환']
  },
  {
    slug: 'cheer',
    title: '모두의 전광판',
    description: '스마트폰 화면을 화려한 네온 LED 전광판으로 변신시킵니다. 콘서트, 응원, 피켓용 풀스크린 모드.',
    category: '텍스트',
    icon: '📣',
    badge: '인기',
    tags: ['LED전광판', '응원', '콘서트', '전체화면']
  },

  // 2. Calculators & Converters
  {
    slug: 'unit-converter',
    title: '실시간 단위 변환기',
    description: '길이, 무게, 넓이(평수), 부피, 온도, 데이터 등 일상의 모든 단위를 실시간으로 즉시 변환합니다.',
    category: '변환',
    icon: '📐',
    badge: '추천',
    tags: ['평수', '무게', '길이', '온도', '실시간']
  },
  {
    slug: 'age-calculator',
    title: '나이 계산기',
    description: '생년월일을 입력하면 법적 만 나이, 연 나이, 세는 나이와 총 살아온 일수, 띠, 별자리를 확인합니다.',
    category: '계산기',
    icon: '🎂',
    badge: '생활 필수',
    tags: ['만나이', '생일', '띠', '살아온날']
  },
  {
    slug: 'lunar-converter',
    title: '음력·양력 변환기',
    description: '음력과 양력 사이의 날짜를 쉽게 상호 변환하고, 해당 연도의 60갑자 간지와 띠를 확인합니다.',
    category: '변환',
    icon: '🌙',
    tags: ['음력', '양력', '60갑자', '윤달']
  },
  {
    slug: 'birthday-secret',
    title: '나의 탄생 비밀',
    description: '생일만 입력하면 나의 탄생화(꽃말), 탄생석(보석말), 탄생목, 고유 탄생색을 한눈에 확인합니다.',
    category: '지식/사전',
    icon: '💎',
    badge: '흥미',
    tags: ['탄생석', '탄생화', '꽃말', '생일']
  },
  {
    slug: 'knitting-gauge',
    title: '뜨개 게이지 계산기',
    description: '스와치(10cm)의 코/단 수와 완성 치수를 기반으로 필요한 총 코 수와 단 수를 자동 환산합니다.',
    category: '계산기',
    icon: '🧶',
    tags: ['뜨개질', '게이지', '코수계산', '단수']
  },

  // 3. Random & Games
  {
    slug: 'ladder-game',
    title: '사다리 타기',
    description: '2인부터 12인까지 참여 가능한 실시간 사다리 게임. 점심 메뉴 고르기, 커피 내기, 벌칙 추첨.',
    category: '랜덤/게임',
    icon: '🪜',
    badge: '팀 게임',
    tags: ['사다리타기', '점심내기', '벌칙', '추첨']
  },
  {
    slug: 'roulette',
    title: '결정의 룰렛',
    description: '선택지들을 입력하고 룰렛을 힘차게 돌려보세요. 점심 메뉴와 순번을 공정하게 결정합니다.',
    category: '랜덤/게임',
    icon: '🎯',
    badge: '꿀잼',
    tags: ['룰렛돌리기', '메뉴결정', '랜덤추첨']
  },
  {
    slug: 'lotto-generator',
    title: '로또 6/45 번호 생성기',
    description: '원하는 고정수와 제외수를 설정하고 공정한 난수 알고리즘으로 행운의 로또 번호를 추출합니다.',
    category: '랜덤/게임',
    icon: '🍀',
    badge: '행운',
    tags: ['로또번호', '645', '제외수', '번호추출']
  },
  {
    slug: 'speed-quiz',
    title: '스피드 퀴즈 제시어',
    description: '동물, 음식, 영화, 속담, MZ 신조어 제시어를 화면에 띄우고 60초 타이머와 점수판으로 즐기는 파티 퀴즈.',
    category: '랜덤/게임',
    icon: '⏱️',
    badge: '파티용',
    tags: ['스피드퀴즈', 'MT게임', '타이머', '제시어']
  },
  {
    slug: 'charades',
    title: '몸으로 말해요',
    description: '말없이 오직 몸짓과 제스처만으로 제시어를 표현하고 맞추는 파티·레크리에이션 제스처 게임.',
    category: '랜덤/게임',
    icon: '🕺',
    badge: '레크리에이션',
    tags: ['제스처게임', '몸으로말해요', '모임게임']
  },

  // 4. Developer Tools
  {
    slug: 'json-formatter',
    title: 'JSON 정렬 및 검증',
    description: '복잡하거나 깨진 JSON 문자열을 보기 좋게 들여쓰기 정렬하고 구문 오류를 검증하거나 한 줄 압축합니다.',
    category: '개발 도구',
    icon: '💻',
    badge: '개발 필수',
    tags: ['JSON', '포맷터', '검증', '압축']
  },
  {
    slug: 'jwt-decoder',
    title: 'JWT 디코더',
    description: '서버 전송 없이 브라우저에서 안전하게 JWT 헤더, 페이로드 클레임, 만료 시각을 분석합니다.',
    category: '개발 도구',
    icon: '🛡️',
    tags: ['JWT', '토큰디코더', '보안', '클레임']
  },
  {
    slug: 'base64-encoder',
    title: 'Base64 인코더/디코더',
    description: '텍스트와 파일을 Base64로 인코딩하거나 디코딩합니다. UTF-8 한글 및 URL-Safe 모드 지원.',
    category: '개발 도구',
    icon: '🔤',
    tags: ['Base64', '인코딩', '디코딩', '파일변환']
  },
  {
    slug: 'url-encoder',
    title: 'URL 인코더 / 디코더',
    description: '한글/특수문자 URL 퍼센트 인코딩 및 디코딩, URL 쿼리스트링 파라미터 구조 자동 분석.',
    category: '개발 도구',
    icon: '🔗',
    tags: ['URL인코딩', '퍼센트인코딩', '쿼리스트링']
  },
  {
    slug: 'cron-parser',
    title: '크론 표현식 해석기',
    description: 'Unix/Linux Cron 표현식을 이해하기 쉬운 한국어 문장으로 자동 변환하고 실행 일정을 분석합니다.',
    category: '개발 도구',
    icon: '⏰',
    tags: ['크론', 'Cron', '스케줄러', '서버']
  },
  {
    slug: 'my-ip',
    title: '내 아이피 찾기 (My IP)',
    description: '현재 접속 중인 내 컴퓨터와 스마트폰의 공인 IP 주소(IPv4)를 실시간으로 확인하고 복사합니다.',
    category: '개발 도구',
    icon: '🌐',
    tags: ['내아이피', 'IP확인', '네트워크', '공인IP']
  },
  {
    slug: 'qr-code',
    title: 'QR 코드 생성기',
    description: '웹사이트 URL, 와이파이 자동 접속, 텍스트를 커스텀 컬러 QR 코드로 즉시 생성하고 PNG로 저장합니다.',
    category: '개발 도구',
    icon: '📱',
    badge: '인기',
    tags: ['QR코드', '와이파이QR', 'QR만들기', '다운로드']
  },
  {
    slug: 'barcode-generator',
    title: '바코드 생성기',
    description: 'Code 128, EAN-13, Code 39 등 범용 1D 바코드를 무료로 생성하고 이미지로 다운로드합니다.',
    category: '개발 도구',
    icon: '🏷️',
    tags: ['바코드', 'Code128', 'EAN13', '물류']
  },

  // 5. Image Tools
  {
    slug: 'transparent-background',
    title: '배경 투명 만들기 (누끼)',
    description: '서버 업로드 없이 브라우저에서 100% 안전하게 사진/로고의 단색 배경을 투명하게 지우고 PNG로 저장합니다.',
    category: '이미지',
    icon: '🎨',
    badge: '강력 추천',
    tags: ['누끼따기', '투명배경', '배경제거', '로컬처리']
  },

  // 6. Knowledge & Curations
  {
    slug: 'new-word',
    title: '신조어 용어사전',
    description: '요즘 유행하는 MZ 신조어, 인터넷 밈, 최신 IT 기술 용어의 정확한 뜻과 실전 예문을 찾아보는 사전.',
    category: '지식/사전',
    icon: '💬',
    tags: ['신조어', 'MZ유행어', '밈', '용어사전']
  },
  {
    slug: 'dev-people',
    title: '개발 인물 사전',
    description: '소프트웨어 역사의 주요 거장들과 프로그래밍 언어 창시자들의 업적과 철학 명언을 소개합니다.',
    category: '지식/사전',
    icon: '👨‍💻',
    tags: ['개발인물', '리눅스', 'C언어', '파이썬', '역사']
  },
  {
    slug: 'howto',
    title: '하우투 실전 가이드',
    description: 'Claude Code CLI 사용법, 프롬프트 ROSE 공식, Cloudflare 배포 등 핵심 튜토리얼 모음.',
    category: '지식/사전',
    icon: '📚',
    badge: '가이드',
    tags: ['하우투', 'ClaudeCode', '프롬프트공식', '배포']
  },
  {
    slug: 'bookmarks',
    title: '추천 즐겨찾기',
    description: '웹 프레임워크, AI 도구, UI 디자인 리소스 등 개발자와 크리에이터가 엄선한 필수 사이트 모음.',
    category: '지식/사전',
    icon: '⭐',
    tags: ['즐겨찾기', '개발자추천', '디자인리소스', 'AI도구']
  },
  {
    slug: 'qna-a-day',
    title: '1일 1질문 다이어리',
    description: '매일 주어지는 깊이 있는 질문에 생각을 기록하며 나를 돌아보는 365일 성찰 질문 일기장.',
    category: '지식/사전',
    icon: '🌱',
    tags: ['1일1질문', '성찰일기', '다이어리', '기록']
  },
  {
    slug: 'rankings',
    title: '별별 랭킹',
    description: '최신 AI 모델 벤치마크, 인기 프로그래밍 언어, 역대 전 세계 박스오피스 영화 순위 큐레이션.',
    category: '지식/사전',
    icon: '📊',
    tags: ['순위', 'AI모델랭킹', '언어순위', '박스오피스']
  },
  {
    slug: 'restaurant-map',
    title: '맛집 큐레이션 리스트',
    description: '성수, 을지로, 강남, 연남 등 주요 핫플레이스의 검증된 대표 맛집과 시그니처 메뉴 목록.',
    category: '지식/사전',
    icon: '🍽️',
    tags: ['맛집', '핫플', '점심추천', '성수동', '을지로']
  }
];

export default function ToolsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavs, setShowOnlyFavs] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rab8bit_fav_tools');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleFavorite = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = favorites.includes(slug)
      ? favorites.filter(s => s !== slug)
      : [...favorites, slug];
    setFavorites(updated);
    try {
      localStorage.setItem('rab8bit_fav_tools', JSON.stringify(updated));
    } catch {}
  };

  const categories = ['전체', '텍스트', '계산기', '변환', '랜덤/게임', '개발 도구', '이미지', '지식/사전'];

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === '전체' || tool.category === selectedCategory;

    const matchesFav = !showOnlyFavs || favorites.includes(tool.slug);

    return matchesSearch && matchesCategory && matchesFav;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Search and Category Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="원하는 도구를 검색하세요 (예: 단위, 사다리, 로또, QR, JWT, JSON, 누끼)..."
            className="w-full bg-slate-900/90 text-white pl-12 pr-4 py-4 rounded-2xl border border-indigo-500/30 text-sm sm:text-base font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xl placeholder:text-slate-500"
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

        {/* Category Pills & Favorite Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setShowOnlyFavs(!showOnlyFavs)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              showOnlyFavs
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 scale-105'
                : 'bg-slate-900/80 text-pink-400 border border-pink-500/30 hover:bg-slate-800'
            }`}
          >
            <span>❤️ 즐겨찾기 ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>총 <strong className="text-indigo-400 font-bold">{filteredTools.length}</strong>개의 도구가 검색되었습니다.</span>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const isFav = favorites.includes(tool.slug);
          return (
            <a
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group stitch-card p-6 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>

                  <div className="flex items-center gap-2">
                    {tool.badge && (
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                        {tool.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => toggleFavorite(tool.slug, e)}
                      title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                      className="p-1.5 rounded-xl hover:bg-slate-800 text-base transition-transform active:scale-90"
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-500 border border-slate-800/80">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-400">
                <span className="text-slate-500 text-[11px]">{tool.category}</span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  도구 실행 &rarr;
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 stitch-card rounded-3xl border border-slate-800 space-y-3">
          <span className="text-4xl">🔍</span>
          <p className="text-slate-400 text-sm font-semibold">검색 조건에 일치하는 도구가 없습니다.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('전체'); setShowOnlyFavs(false); }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            전체 목록 보기
          </button>
        </div>
      )}
    </div>
  );
}
