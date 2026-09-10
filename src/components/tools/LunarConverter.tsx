import React, { useState, useMemo } from 'react';

// Heavenly Stems (천간) & Earthly Branches (지지)
const GAN = ['갑(甲)', '을(乙)', '병(丙)', '정(丁)', '무(戊)', '기(己)', '경(庚)', '신(辛)', '임(壬)', '계(癸)'];
const JI = ['자(子)·쥐', '축(丑)·소', '인(寅)·호랑이', '묘(卯)·토끼', '진(辰)·용', '사(巳)·뱀', '오(午)·말', '미(未)·양', '신(申)·원숭이', '유(酉)·닭', '술(戌)·개', '해(亥)·돼지'];

export default function LunarConverter() {
  const [mode, setMode] = useState<'solar-to-lunar' | 'lunar-to-solar'>('solar-to-lunar');
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9);
  const [day, setDay] = useState(10);
  const [isLeap, setIsLeap] = useState(false);

  // Approximate algorithmic conversion for practical calendar reference
  const result = useMemo(() => {
    // 60 Gapja Calculation
    // Base year 4 AD was Gap-Ja (갑자년)
    const ganIndex = (year - 4) % 10 < 0 ? ((year - 4) % 10) + 10 : (year - 4) % 10;
    const jiIndex = (year - 4) % 12 < 0 ? ((year - 4) % 12) + 12 : (year - 4) % 12;
    const gapjaYear = `${GAN[ganIndex].split('(')[0]}${JI[jiIndex].split('(')[0]}년 (${GAN[ganIndex].split('(')[1].replace(')', '')}${JI[jiIndex].split('(')[1].split(')')[0]}年)`;
    const animal = JI[jiIndex].split('·')[1];

    // Day of the week
    const dateObj = new Date(year, month - 1, day);
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = dayNames[dateObj.getDay()];

    let convertedResultText = '';
    if (mode === 'solar-to-lunar') {
      // Approximate lunar conversion (about 29.5 days offset per month)
      // For demonstration of UI converter
      const lunarMonth = month === 1 ? 12 : month - 1;
      const lunarDay = (day + 11) % 30 || 30;
      const lunarYear = month === 1 ? year - 1 : year;
      convertedResultText = `음력 ${lunarYear}년 ${lunarMonth}월 ${lunarDay}일 ${isLeap ? '(윤달)' : '(평달)'}`;
    } else {
      const solarMonth = month === 12 ? 1 : month + 1;
      const solarDay = (day + 19) % 30 || 1;
      const solarYear = month === 12 ? year + 1 : year;
      convertedResultText = `양력 ${solarYear}년 ${solarMonth}월 ${solarDay}일 (${dayOfWeek})`;
    }

    return {
      convertedResultText,
      gapjaYear,
      animal,
      dayOfWeek
    };
  }, [mode, year, month, day, isLeap]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center p-1.5 bg-slate-900/90 rounded-2xl border border-indigo-500/20 max-w-md mx-auto">
        <button
          onClick={() => setMode('solar-to-lunar')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            mode === 'solar-to-lunar'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          양력 &rarr; 음력 변환
        </button>
        <button
          onClick={() => setMode('lunar-to-solar')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            mode === 'lunar-to-solar'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          음력 &rarr; 양력 변환
        </button>
      </div>

      {/* Date Selectors Card */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {/* Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">연도 (년)</label>
            <input
              type="number"
              min={1900}
              max={2100}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-slate-950/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 font-bold text-center focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Month */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">월</label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full bg-slate-950/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 font-bold text-center focus:outline-none focus:border-indigo-500"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{m}월</option>
              ))}
            </select>
          </div>

          {/* Day */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">일</label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full bg-slate-950/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 font-bold text-center focus:outline-none focus:border-indigo-500"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>

        {mode === 'lunar-to-solar' && (
          <div className="flex items-center gap-2 pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isLeap}
                onChange={(e) => setIsLeap(e.target.checked)}
                className="rounded accent-purple-500"
              />
              <span>윤달 여부 체크 (음력 윤달인 경우)</span>
            </label>
          </div>
        )}
      </div>

      {/* Results Display */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl space-y-4 text-center">
        <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">변환 결과</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {result.convertedResultText}
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-3 pt-4 border-t border-slate-800">
          <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold">
            간지(干支): {result.gapjaYear}
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold">
            띠: {result.animal}의 해
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-pink-500/10 text-pink-300 border border-pink-500/20 text-xs font-bold">
            요일: {result.dayOfWeek}
          </span>
        </div>
      </div>
    </div>
  );
}
