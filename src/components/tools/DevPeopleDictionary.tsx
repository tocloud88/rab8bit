import React, { useState } from 'react';

interface Figure {
  name: string;
  role: string;
  achievement: string;
  description: string;
  quote: string;
  tags: string[];
}

const PEOPLE: Figure[] = [
  {
    name: '앨런 튜링 (Alan Turing)',
    role: '현대 컴퓨터 과학과 인공지능의 아버지',
    achievement: '튜링 머신 개념 창안, 에니그마 암호 해독, 튜링 테스트 제안',
    description: '컴퓨터 과학의 이론적 토대를 마련하였으며, 2차 세계대전 당시 독일군의 암호를 해독해 수많은 생명을 구했습니다.',
    quote: '“기계가 생각할 수 있는가? 라는 질문은 너무나도 매력적이다.”',
    tags: ['컴퓨터과학', 'AI', '암호학']
  },
  {
    name: '데니스 리치 (Dennis Ritchie)',
    role: 'C 언어 및 UNIX 운영체제의 창시자',
    achievement: 'C 프로그래밍 언어 개발, UNIX OS 공동 개발',
    description: '현대 모든 운영체제(Linux, macOS, Windows, iOS, Android)와 소프트웨어 생태계의 기틀을 C 언어로 완성한 거장입니다.',
    quote: '“UNIX는 기본적으로 매우 단순합니다. 다만 그 단순함을 이해하는 데 천재성이 필요할 뿐입니다.”',
    tags: ['C언어', 'UNIX', '시스템']
  },
  {
    name: '리누스 토발즈 (Linus Torvalds)',
    role: 'Linux 커널 및 Git의 창시자',
    achievement: 'Linux 커널 개발, 전 세계 개발 표준 Git 분산 버전 관리 시스템 창조',
    description: '오픈소스의 상징인 리눅스와 현대 소프트웨어 협업의 표준 도구인 Git을 만들어 전 세계 기술 혁신을 이끌었습니다.',
    quote: '“말은 쉽습니다. 코드를 보여주세요. (Talk is cheap. Show me the code.)”',
    tags: ['Linux', 'Git', '오픈소스']
  },
  {
    name: '팀 버너스리 (Tim Berners-Lee)',
    role: '월드 와이드 웹(WWW)의 창시자',
    achievement: 'HTML, HTTP, URI 표준 제정 및 최초의 웹 브라우저/서버 개발',
    description: '오늘날 우리가 사용하는 인터넷 웹(Web) 기술을 발명하고, 이를 인류의 공공재로 무료 개방하여 정보 혁명을 일으켰습니다.',
    quote: '“이것은 모두를 위한 것입니다. (This is for everyone.)”',
    tags: ['WWW', 'HTML', '인터넷']
  },
  {
    name: '귀도 반 로섬 (Guido van Rossum)',
    role: 'Python 프로그래밍 언어의 창시자',
    achievement: '파이썬(Python) 언어 설계 및 자비로운 종신 독재자(BDFL)',
    description: '가독성이 높고 아름다운 코드를 지향하는 파이썬을 설계하여 오늘날 데이터 과학과 인공지능(AI) 혁명의 표준 언어로 자리잡게 했습니다.',
    quote: '“파이썬은 재미있어야 하며 배우기 쉬워야 합니다.”',
    tags: ['Python', 'AI/데이터', '언어설계']
  },
  {
    name: '에이다 러브레이스 (Ada Lovelace)',
    role: '세계 최초의 컴퓨터 프로그래머',
    achievement: '배비지의 해석기관을 위한 최초의 알고리즘 작성',
    description: '기계가 단순 계산을 넘어 음악이나 예술을 다룰 수 있다는 현대 컴퓨터 개념을 최초로 통찰한 여성 수학자입니다.',
    quote: '“이 엔진은 숫자뿐만 아니라 음악과 그래픽까지 조작할 수 있다.”',
    tags: ['선구자', '알고리즘', '여성과학']
  }
];

export default function DevPeopleDictionary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = PEOPLE.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Field */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="인물 이름, 개발 언어, 업적을 검색하세요 (예: C언어, 리눅스, 파이썬)..."
          className="w-full bg-slate-950/80 text-white px-4 py-3.5 rounded-2xl border border-indigo-500/30 text-sm font-semibold focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
        />
      </div>

      {/* People Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((person, idx) => (
          <div
            key={idx}
            className="stitch-card p-6 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-indigo-400 block">{person.role}</span>
                <h3 className="text-2xl font-black text-white mt-1">{person.name}</h3>
              </div>

              <p className="text-xs font-bold text-purple-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20">
                🏆 주요 업적: {person.achievement}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                {person.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <blockquote className="text-xs text-slate-400 italic">
                {person.quote}
              </blockquote>

              <div className="flex flex-wrap gap-1.5">
                {person.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
