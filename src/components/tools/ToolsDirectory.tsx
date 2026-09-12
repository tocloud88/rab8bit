import React, { useState, useMemo } from 'react';

export interface InteractiveToolItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  badge?: string;
  tags: string[];
}

export const INTERACTIVE_TOOLS: InteractiveToolItem[] = [
  // 5. New 2026 Life Utilities
  {
    slug: "duty-calculator",
    title: "해외직구 관·부가세 계산기",
    description: "미국($200), 일본·유럽·중국($150) 면세 한도와 품목별 예상 관세 및 부가세를 실시간 계산합니다.",
    category: "변환/계산",
    icon: "✈️",
    badge: "2026 신규",
    tags: ["해외직구", "관세", "부가세", "환율", "면세한도"]
  },
  {
    slug: "dutch-pay",
    title: "스마트 더치페이 & 1/N 정산기",
    description: "개인별 메뉴 금액에 배달팁과 할인쿠폰을 공평하게 분배하고 카카오톡 정산 문구를 생성합니다.",
    category: "변환/계산",
    icon: "🍗",
    badge: "2026 신규",
    tags: ["더치페이", "N분의1", "배달비", "정산", "카톡공유"]
  },
  {
    slug: "holiday-planner",
    title: "황금연차 & 연휴 플래너",
    description: "내 입사일 기준 연차 발생 일수 계산과 2026/2027년 최장 9일 황금연휴 추천 일정을 확인합니다.",
    category: "지식/정보",
    icon: "📅",
    badge: "2026 신규",
    tags: ["황금연차", "공휴일", "연차계산", "대체공휴일", "휴가"]
  },
  {
    slug: "severance-pay",
    title: "퇴직금 & 실업급여 계산기",
    description: "근속기간과 최근 3개월 급여 기반 예상 퇴직금 및 고용보험 실업급여 수급액을 모의 계산합니다.",
    category: "변환/계산",
    icon: "💰",
    badge: "2026 신규",
    tags: ["퇴직금", "실업급여", "구직급여", "평균임금", "급여"]
  },
  {
    slug: "savings-calc",
    title: "예금·적금 이자 계산기",
    description: "정기예금 및 적금 만기 시 원금, 세전 이자, 이자소득세(15.4%/비과세) 차감 후 만기 수령액을 계산합니다.",
    category: "변환/계산",
    icon: "🏦",
    badge: "2026 신규",
    tags: ["적금이자", "정기예금", "복리계산", "비과세", "풍차돌리기"]
  },
  {
    slug: "pomodoro-timer",
    title: "뽀모도로 타이머 & 백색소음",
    description: "25분 몰입과 5분 휴식 인터벌로 생산성을 극대화하며 오프라인 집중 백색소음을 재생합니다.",
    category: "텍스트",
    icon: "🍅",
    badge: "2026 신규",
    tags: ["뽀모도로", "타이머", "백색소음", "몰입", "생산성"]
  },
  {
    slug: "recipe-portion",
    title: "요리 레시피 인분 변환기",
    description: "1인분 레시피를 원하는 인분 수에 맞춰 자동 증량 계산하고 밥숟가락, 종이컵 계량으로 변환합니다.",
    category: "변환/계산",
    icon: "🍳",
    badge: "2026 신규",
    tags: ["레시피", "인분변환", "계량", "밥숟가락", "종이컵"]
  },
  {
    slug: "sleep-cycle",
    title: "수면 사이클 계산기",
    description: "90분 렘수면 주기를 바탕으로 아침에 가장 개운하게 눈뜰 수 있는 최적의 기상/취침 시각을 계산합니다.",
    category: "지식/정보",
    icon: "😴",
    badge: "2026 신규",
    tags: ["수면사이클", "렘수면", "기상시간", "알람", "피로회복"]
  },
  {
    slug: "dday-calculator",
    title: "디데이(D-Day) & 기념일 계산기",
    description: "기념일, 시험, 목표일까지 남은 D-Day와 100일, 1주년, 1000일 기념일 날짜를 자동 계산합니다.",
    category: "변환/계산",
    icon: "🎁",
    badge: "2026 신규",
    tags: ["디데이", "D-day", "기념일", "100일", "커플"]
  },
  {
    slug: "bmr-tdee-calc",
    title: "기초대사량(BMR) & TDEE 계산기",
    description: "나의 기초대사량과 하루 유지 칼로리를 계산하고 다이어트 맞춤 탄·단·지(g) 비율을 산출합니다.",
    category: "변환/계산",
    icon: "🔥",
    badge: "2026 신규",
    tags: ["기초대사량", "BMR", "TDEE", "다이어트", "칼로리", "탄단지"]
  },

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
    category: '변환/계산',
    icon: '📐',
    badge: '추천',
    tags: ['평수', '무게', '길이', '온도', '실시간']
  },
  {
    slug: 'age-calculator',
    title: '나이 계산기',
    description: '생년월일을 입력하면 법적 만 나이, 연 나이, 세는 나이와 총 살아온 일수, 띠, 별자리를 확인합니다.',
    category: '변환/계산',
    icon: '🎂',
    badge: '생활 필수',
    tags: ['만나이', '생일', '띠', '살아온날']
  },
  {
    slug: 'lunar-converter',
    title: '음력·양력 변환기',
    description: '음력과 양력 사이의 날짜를 쉽게 상호 변환하고, 해당 연도의 60갑자 간지와 띠를 확인합니다.',
    category: '변환/계산',
    icon: '🌙',
    tags: ['음력', '양력', '60갑자', '윤달']
  },
  {
    slug: 'birthday-secret',
    title: '나의 탄생 비밀',
    description: '생일만 입력하면 나의 탄생화(꽃말), 탄생석(보석말), 탄생목, 고유 탄생색을 한눈에 확인합니다.',
    category: '지식/정보',
    icon: '💎',
    badge: '흥미',
    tags: ['탄생석', '탄생화', '꽃말', '생일']
  },
  {
    slug: 'knitting-gauge',
    title: '뜨개 게이지 계산기',
    description: '스와치(10cm)의 코/단 수와 완성 치수를 기반으로 필요한 총 코 수와 단 수를 자동 환산합니다.',
    category: '변환/계산',
    icon: '🧶',
    tags: ['뜨개질', '게이지', '코수계산', '단수']
  },

  // 3. Random & Games
  {
    slug: 'ladder-game',
    title: '사다리 타기',
    description: '2인부터 12인까지 참여 가능한 실시간 사다리 게임. 점심 메뉴 고르기, 커피 내기, 벌칙 추첨.',
    category: '게임/추첨',
    icon: '🪜',
    badge: '팀 게임',
    tags: ['사다리타기', '점심내기', '벌칙', '추첨']
  },
  {
    slug: 'roulette',
    title: '결정의 룰렛',
    description: '선택지들을 입력하고 룰렛을 힘차게 돌려보세요. 점심 메뉴와 순번을 공정하게 결정합니다.',
    category: '게임/추첨',
    icon: '🎯',
    tags: ['룰렛', '점심추천', '결정장애', '랜덤']
  },
  {
    slug: 'lotto-generator',
    title: '로또 번호 생성기',
    description: '제외 번호 지정 및 번호 합 통계 시뮬레이션 기반의 스마트 행운 로또 번호 6개 추천.',
    category: '게임/추첨',
    icon: '🎱',
    badge: '대박기원',
    tags: ['로또', '행운번호', '추첨', '번호생성']
  },
  {
    slug: 'charades',
    title: '몸으로 말해요',
    description: '영화, 속담, 동물, 인물 등 500+개 제시어로 즐기는 모임 파티 필수 스피드 제스처 게임.',
    category: '게임/추첨',
    icon: '🕺',
    badge: '파티 필수',
    tags: ['몸으로말해요', '제스처게임', '엠티', '파티게임']
  },
  {
    slug: 'speed-quiz',
    title: '스피드 퀴즈',
    description: '타이머와 점수판이 탑재된 실시간 단어 맞히기 스피드 퀴즈. 레크리에이션 진행용.',
    category: '게임/추첨',
    icon: '⚡',
    tags: ['스피드퀴즈', '낱말게임', '레크리에이션', '타이머']
  },

  // 4. Developer Tools
  {
    slug: 'json-formatter',
    title: 'JSON 포맷터 & 뷰어',
    description: '복잡한 JSON 데이터를 검증, 정렬, 압축(Minify)하고 트리 구조로 직관적으로 시각화합니다.',
    category: '개발/코딩',
    icon: '⚙️',
    badge: '개발자 추천',
    tags: ['JSON', '포맷터', '검증', 'Beautify']
  },
  {
    slug: 'jwt-decoder',
    title: 'JWT 토큰 디코더',
    description: '서버 전송 없이 브라우저에서 안전하게 JWT Header와 Payload를 디코딩하고 만료시간을 확인합니다.',
    category: '개발/코딩',
    icon: '🔐',
    badge: '안전 보장',
    tags: ['JWT', '디코더', 'Token', '보안']
  },
  {
    slug: 'base64-encoder',
    title: 'Base64 인코더/디코더',
    description: '텍스트와 이미지 파일을 브라우저 내에서 즉시 Base64 문자열로 상호 변환하고 복사합니다.',
    category: '개발/코딩',
    icon: '🔤',
    tags: ['Base64', '인코딩', '디코딩', 'DataURI']
  },
  {
    slug: 'url-encoder',
    title: 'URL 인코더/디코더',
    description: 'URL 특수문자 및 한글 쿼리스트링을 encodeURI / decodeURI 표준 규격으로 상호 변환합니다.',
    category: '개발/코딩',
    icon: '🔗',
    tags: ['URL', '인코딩', 'URI', '쿼리스트링']
  },
  {
    slug: 'cron-parser',
    title: 'Cron 표현식 번역기',
    description: '난해한 Cron 정기작업 표현식을 사람이 읽기 쉬운 한국어 설명 및 다음 실행 예정 시각으로 해석합니다.',
    category: '개발/코딩',
    icon: '⏰',
    tags: ['Cron', '스케줄러', 'Crontab', '리눅스']
  },
  {
    slug: 'my-ip',
    title: '내 IP & 환경 확인',
    description: '현재 접속 중인 공인 IP 주소, 국가/도시 위치, ISP, 브라우저 User-Agent 정보를 실시간 확인합니다.',
    category: '개발/코딩',
    icon: '🌐',
    tags: ['IP주소', '공인IP', '위치', '브라우저정보']
  },

  // 5. Image & Media
  {
    slug: 'qr-code',
    title: 'QR 코드 생성기',
    description: 'URL, 와이파이 접속, 텍스트를 고화질 커스텀 색상 QR 코드로 즉시 생성하고 PNG로 저장합니다.',
    category: '이미지/미디어',
    icon: '📱',
    badge: '무료 다운로드',
    tags: ['QR코드', '와이파이QR', '바코드', '생성기']
  },
  {
    slug: 'barcode-generator',
    title: '바코드 생성기',
    description: 'CODE128, EAN-13, UPC 등 표준 규격 바코드를 실시간 렌더링하고 이미지로 다운로드합니다.',
    category: '이미지/미디어',
    icon: '📊',
    tags: ['바코드', 'CODE128', 'EAN13', '라벨']
  },
  {
    slug: 'transparent-background',
    title: '누끼 이미지 배경 투명화',
    description: '클릭 한 번으로 특정 배경색을 감지하여 투명한 PNG 이미지로 즉시 변환합니다 (Canvas 처리).',
    category: '이미지/미디어',
    icon: '🪄',
    badge: '로컬 처리',
    tags: ['누끼따기', '투명화', '배경제거', 'PNG']
  },

  // 6. Knowledge & Daily
  {
    slug: 'new-word',
    title: '최신 신조어·밈 사전',
    description: '2026년 최신 유행어와 MZ 밈 신조어의 유래, 정확한 뜻, 실전 대화 예시를 한눈에 검색합니다.',
    category: '지식/정보',
    icon: '📖',
    badge: '매월 업데이트',
    tags: ['신조어', '유행어', 'MZ세대', '밈']
  },
  {
    slug: 'howto',
    title: '생활의 꿀팁 백과',
    description: '청소, 요리, 옷 관리, 자취생 꿀팁 등 일상 속 번거로운 문제들의 1분 명쾌한 해결법 모음.',
    category: '지식/정보',
    icon: '💡',
    tags: ['생활팁', '자취', '청소법', '꿀팁']
  },
  {
    slug: 'qna-a-day',
    title: '하루 한 줄 질문',
    description: '매일 새로운 질문에 답하며 나 자신을 돌아보는 디지털 다이어리 & 생각 기록장.',
    category: '지식/정보',
    icon: '📝',
    tags: ['일기', '자아성찰', '질문다이어리', '기록']
  },
  {
    slug: 'restaurant-map',
    title: '주변 맛집 & 편의시설 탐색',
    description: '현재 내 위치를 기반으로 주변의 맛집, 카페, 편의점, 주유소 위치를 지도에서 즉시 탐색합니다.',
    category: '지식/정보',
    icon: '🗺️',
    tags: ['맛집', '주변탐색', '지도', '카페']
  },
  {
    slug: 'bookmarks',
    title: '자주 찾는 포털 바로가기',
    description: '국내 주요 포털, 쇼핑몰, 금융, 공공기관의 공식 바로가기 링크를 깔끔하게 모아두었습니다.',
    category: '지식/정보',
    icon: '⭐',
    tags: ['바로가기', '포털', '즐겨찾기', '링크모음']
  },
  {
    slug: 'rankings',
    title: '실시간 트렌드 랭킹',
    description: '영화 순위, 음원 차트, 도서 베스트셀러 등 실시간 인기 트렌드를 한눈에 브리핑합니다.',
    category: '지식/정보',
    icon: '🏆',
    tags: ['실시간', '랭킹', '트렌드', '베스트셀러']
  },
  {
    slug: 'dev-people',
    title: 'IT 개발자 성향 테스트',
    description: '몇 가지 질문으로 나의 개발자 페르소나와 최적의 기술 스택 궁합을 재미있게 분석해드립니다.',
    category: '지식/정보',
    icon: '🧑‍💻',
    tags: ['심리테스트', '개발자', '성향분석', '테스트']
  }
];

export default function ToolsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract all categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    INTERACTIVE_TOOLS.forEach(t => cats.add(t.category));
    return ["전체", ...Array.from(cats)];
  }, []);

  // Filter interactive tools
  const filteredTools = useMemo(() => {
    return INTERACTIVE_TOOLS.filter(item => {
      const matchCategory = selectedCategory === "전체" || item.category === selectedCategory;
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
            const count = cat === "전체" 
              ? INTERACTIVE_TOOLS.length 
              : INTERACTIVE_TOOLS.filter(t => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50"
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
            placeholder="도구 이름, 키워드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
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
            className="stitch-card p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-indigo-950/50 border border-indigo-800/30 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] text-indigo-400 font-semibold">{item.category}</span>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-1 leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-400 font-bold">
              <span className="text-slate-500 text-[10px]">웹 앱 바로 실행</span>
              <span className="group-hover:translate-x-1 transition-transform">도구 열기 &rarr;</span>
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
