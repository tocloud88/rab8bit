import React, { useState, useMemo } from 'react';

// Monthly Birthstone Data
const BIRTHSTONES = [
  { month: 1, name: '가넷 (Garnet)', meaning: '진실, 우정, 불변의 충성', color: '#881337', icon: '💎' },
  { month: 2, name: '자수정 (Amethyst)', meaning: '성실, 평화, 지혜로운 마음', color: '#7e22ce', icon: '💎' },
  { month: 3, name: '아쿠아마린 (Aquamarine)', meaning: '영원한 젊음, 행복, 침착', color: '#0284c7', icon: '💎' },
  { month: 4, name: '다이아몬드 (Diamond)', meaning: '영원한 사랑, 고귀함, 순결', color: '#e0e7ff', icon: '💎' },
  { month: 5, name: '에메랄드 (Emerald)', meaning: '행운, 행복, 새로운 시작', color: '#059669', icon: '💎' },
  { month: 6, name: '진주 (Pearl)', meaning: '순결, 부귀, 건강과 장수', color: '#f5f5f4', icon: '💎' },
  { month: 7, name: '루비 (Ruby)', meaning: '열정적인 사랑, 용기, 정의', color: '#dc2626', icon: '💎' },
  { month: 8, name: '페리도트 (Peridot)', meaning: '부부의 화합, 친구와의 우정', color: '#65a30d', icon: '💎' },
  { month: 9, name: '사파이어 (Sapphire)', meaning: '성실, 덕망, 진실한 지혜', color: '#1d4ed8', icon: '💎' },
  { month: 10, name: '오팔 (Opal)', meaning: '희망, 순결, 환희와 통찰', color: '#ec4899', icon: '💎' },
  { month: 11, name: '토파즈 (Topaz)', meaning: '건강, 희망, 결백한 인내', color: '#d97706', icon: '💎' },
  { month: 12, name: '터키석 (Turquoise)', meaning: '성공, 승리, 번영과 행운', color: '#0d9488', icon: '💎' },
];

// Monthly Birth Flowers (Representative)
const BIRTHFLOWERS = [
  { month: 1, name: '수선화 (Narcissus)', meaning: '자기애, 고결함, 새로운 시작', icon: '🌼' },
  { month: 2, name: '물망초 (Forget-Me-Not)', meaning: '진실한 사랑, 나를 잊지 마세요', icon: '🌸' },
  { month: 3, name: '데이지 (Daisy)', meaning: '명랑, 순수한 마음, 평화', icon: '🌼' },
  { month: 4, name: '스위트피 (Sweet Pea)', meaning: '기쁨, 은혜로운 추억', icon: '🌺' },
  { month: 5, name: '은방울꽃 (Lily of the Valley)', meaning: '순결, 반드시 찾아올 행복', icon: '💐' },
  { month: 6, name: '장미 (Rose)', meaning: '열렬한 사랑, 아름다움', icon: '🌹' },
  { month: 7, name: '라크스퍼 (Larkspur)', meaning: '청초함, 자유로운 기쁨', icon: '🌸' },
  { month: 8, name: '글라디올러스 (Gladiolus)', meaning: '강인한 의지, 성실함', icon: '🌺' },
  { month: 9, name: '물레나물꽃/아스터 (Aster)', meaning: '믿음직한 사랑, 추억', icon: '🌼' },
  { month: 10, name: '메리골드 (Marigold)', meaning: '반드시 찾아오는 행복, 우정', icon: '🌻' },
  { month: 11, name: '국화 (Chrysanthemum)', meaning: '고결, 진실, 밝은 지혜', icon: '🌼' },
  { month: 12, name: '포인세티아 (Poinsettia)', meaning: '축복, 따뜻한 마음, 행복', icon: '🌺' },
];

// Celtic Birth Tree
const BIRTHTREES = [
  { name: '자작나무 (창조자)', meaning: '영감과 야망을 품은 지적인 이상주의자' },
  { name: '물푸레나무 (사색가)', meaning: '자유로운 상상력과 예술적 직관을 가진 사람' },
  { name: '느릅나무 (고결함)', meaning: '배려심 깊고 도덕적 기준이 높은 리더' },
  { name: '버드나무 (치유자)', meaning: '공감 능력이 뛰어나고 마음을 다독이는 치유자' },
  { name: '단풍나무 (독창성)', meaning: '호기심이 많고 남들과 다른 개성을 지닌 탐험가' },
  { name: '호두나무 (열정)', meaning: '불굴의 의지와 목표를 향해 달리는 열정가' },
  { name: '사과나무 (사랑)', meaning: '매력적이고 주변을 따뜻하게 만드는 사랑의 수호자' },
];

export default function BirthdaySecret() {
  const [month, setMonth] = useState(5);
  const [day, setDay] = useState(15);

  const secret = useMemo(() => {
    const stone = BIRTHSTONES[month - 1];
    const flower = BIRTHFLOWERS[month - 1];
    const tree = BIRTHTREES[(month + day) % BIRTHTREES.length];

    // Hue for birth color
    const hue = Math.floor(((month * 30) + (day * 7)) % 360);
    const birthColor = `hsl(${hue}, 75%, 55%)`;

    return { stone, flower, tree, birthColor };
  }, [month, day]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Pickers */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl max-w-md mx-auto space-y-4">
        <h2 className="text-sm font-bold text-center text-white">생일을 선택해 보세요</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-semibold">태어난 월</label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full bg-slate-950/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 font-bold focus:outline-none focus:border-indigo-500"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{m}월</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-semibold">태어난 일</label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full bg-slate-950/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 font-bold focus:outline-none focus:border-indigo-500"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Secret Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. 탄생석 */}
        <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Birthstone</span>
            <span className="text-2xl">{secret.stone.icon}</span>
          </div>
          <h3 className="text-2xl font-black text-white">{secret.stone.name}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            보석의 의미: <strong className="text-indigo-300 font-bold">{secret.stone.meaning}</strong>
          </p>
        </div>

        {/* 2. 탄생화 */}
        <div className="stitch-card p-6 rounded-3xl border border-pink-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Birthflower</span>
            <span className="text-2xl">{secret.flower.icon}</span>
          </div>
          <h3 className="text-2xl font-black text-white">{secret.flower.name}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            꽃말: <strong className="text-pink-300 font-bold">{secret.flower.meaning}</strong>
          </p>
        </div>

        {/* 3. 탄생목 */}
        <div className="stitch-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Birth Tree</span>
            <span className="text-2xl">🌲</span>
          </div>
          <h3 className="text-2xl font-black text-white">{secret.tree.name}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            나무의 상징: <strong className="text-emerald-300 font-bold">{secret.tree.meaning}</strong>
          </p>
        </div>

        {/* 4. 탄생색 */}
        <div className="stitch-card p-6 rounded-3xl border border-amber-500/20 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Birth Color</span>
              <div
                className="w-7 h-7 rounded-full shadow-lg border-2 border-white/50"
                style={{ backgroundColor: secret.birthColor }}
              />
            </div>
            <h3 className="text-2xl font-black text-white mt-3">나만의 고유 탄생 컬러</h3>
            <p className="text-xs text-slate-400 mt-1">
              생일의 파동 에너지를 담은 나만의 시그니처 힐링 컬러입니다.
            </p>
          </div>
          <div
            className="w-full h-4 rounded-full mt-2"
            style={{ backgroundColor: secret.birthColor }}
          />
        </div>
      </div>
    </div>
  );
}
