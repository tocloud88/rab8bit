import React, { useState, useMemo } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const zodiacSigns = [
    { name: '원숭이띠', icon: '🐵' },
    { name: '닭띠', icon: '🐔' },
    { name: '개띠', icon: '🐶' },
    { name: '돼지띠', icon: '🐷' },
    { name: '쥐띠', icon: '🐭' },
    { name: '소띠', icon: '🐮' },
    { name: '호랑이띠', icon: '🐯' },
    { name: '토끼띠', icon: '🐰' },
    { name: '용띠', icon: '🐲' },
    { name: '뱀띠', icon: '🐍' },
    { name: '말띠', icon: '🐴' },
    { name: '양띠', icon: '🐑' },
  ];

  const getStarSign = (month: number, day: number) => {
    const dates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
    const signs = [
      '염소자리 ♑', '물병자리 ♒', '물고기자리 ♓', '양자리 ♈',
      '황소자리 ♉', '쌍둥이자리 ♊', '게자리 ♋', '사자자리 ♌',
      '처녀자리 ♍', '천칭자리 ♎', '전갈자리 ♏', '사수자리 ♐', '염소자리 ♑'
    ];
    return day < dates[month - 1] ? signs[month - 1] : signs[month];
  };

  const results = useMemo(() => {
    if (!birthDate || !targetDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;

    const bYear = birth.getFullYear();
    const bMonth = birth.getMonth();
    const bDay = birth.getDate();

    const tYear = target.getFullYear();
    const tMonth = target.getMonth();
    const tDay = target.getDate();

    // 1. 만 나이 (International Age)
    let fullAge = tYear - bYear;
    if (tMonth < bMonth || (tMonth === bMonth && tDay < bDay)) {
      fullAge -= 1;
    }

    // 2. 연 나이 (Year Age)
    const yearAge = tYear - bYear;

    // 3. 세는 나이 (Traditional Korean Age)
    const koreanAge = tYear - bYear + 1;

    // 4. 총 살아온 일수
    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 5. 다음 생일까지 남은 D-day
    const nextBirthThisYear = new Date(tYear, bMonth, bDay);
    if (nextBirthThisYear < target) {
      nextBirthThisYear.setFullYear(tYear + 1);
    }
    const daysUntilNextBirth = Math.ceil((nextBirthThisYear.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // 6. 띠 (12간지)
    const zodiac = zodiacSigns[bYear % 12];

    // 7. 별자리
    const starSign = getStarSign(bMonth + 1, bDay);

    return {
      fullAge: Math.max(0, fullAge),
      yearAge: Math.max(0, yearAge),
      koreanAge: Math.max(1, koreanAge),
      totalDays: Math.max(0, totalDays),
      daysUntilNextBirth,
      zodiac,
      starSign
    };
  }, [birthDate, targetDate]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Date Pickers */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">생년월일 선택</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-indigo-500/30 font-bold focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">기준일자 (기본값: 오늘)</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-slate-700 font-bold focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Result Cards */}
      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 만 나이 */}
            <div className="stitch-card p-6 rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/50 to-slate-900/80 relative overflow-hidden">
              <span className="text-xs font-bold text-indigo-400">대한민국 법적 공식 나이</span>
              <h3 className="text-xl font-extrabold text-white mt-1">만 나이</h3>
              <p className="text-4xl sm:text-5xl font-black text-indigo-400 mt-4">
                {results.fullAge} <span className="text-xl font-bold text-slate-400">세</span>
              </p>
            </div>

            {/* 연 나이 */}
            <div className="stitch-card p-6 rounded-3xl border border-purple-500/30 bg-slate-900/80">
              <span className="text-xs font-bold text-purple-400">병역법·청소년보호법 기준</span>
              <h3 className="text-xl font-extrabold text-white mt-1">연 나이</h3>
              <p className="text-4xl sm:text-5xl font-black text-purple-400 mt-4">
                {results.yearAge} <span className="text-xl font-bold text-slate-400">세</span>
              </p>
            </div>

            {/* 세는 나이 */}
            <div className="stitch-card p-6 rounded-3xl border border-pink-500/30 bg-slate-900/80">
              <span className="text-xs font-bold text-pink-400">전통 한국식 나이</span>
              <h3 className="text-xl font-extrabold text-white mt-1">세는 나이</h3>
              <p className="text-4xl sm:text-5xl font-black text-pink-400 mt-4">
                {results.koreanAge} <span className="text-xl font-bold text-slate-400">세</span>
              </p>
            </div>
          </div>

          {/* Detailed Info Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="stitch-card p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">살아온 일수</span>
              <p className="text-lg sm:text-xl font-black text-white">
                {results.totalDays.toLocaleString()}일
              </p>
            </div>

            <div className="stitch-card p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">다음 생일까지</span>
              <p className="text-lg sm:text-xl font-black text-amber-400">
                D-{results.daysUntilNextBirth}
              </p>
            </div>

            <div className="stitch-card p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">띠 (12간지)</span>
              <p className="text-lg sm:text-xl font-black text-emerald-400">
                {results.zodiac.icon} {results.zodiac.name}
              </p>
            </div>

            <div className="stitch-card p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">별자리</span>
              <p className="text-lg sm:text-xl font-black text-cyan-400">
                {results.starSign}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
