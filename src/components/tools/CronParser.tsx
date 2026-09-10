import React, { useState, useMemo } from 'react';

const PRESETS = [
  { label: '매 5분마다', expr: '*/5 * * * *' },
  { label: '매 정각마다 (1시간 주기)', expr: '0 * * * *' },
  { label: '매일 자정 (00:00)', expr: '0 0 * * *' },
  { label: '매일 오전 9시 (평일만)', expr: '0 9 * * 1-5' },
  { label: '매주 월요일 자정', expr: '0 0 * * 1' },
  { label: '매월 1일 자정', expr: '0 0 1 * *' },
];

export default function CronParser() {
  const [cron, setCron] = useState('*/15 9-18 * * 1-5');

  const explanation = useMemo(() => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length < 5 || parts.length > 6) {
      return { error: '유효한 5개 필드 (분 시 일 월 요일) 크론 표현식을 입력하세요.' };
    }

    const [minute, hour, day, month, dayOfWeek] = parts;

    let text = '이 크론 작업은 ';

    // Month
    if (month === '*') text += '매월 ';
    else text += `${month}월마다 `;

    // Day of week / Day of month
    if (dayOfWeek === '1-5') text += '월~금요일(평일) ';
    else if (dayOfWeek === '0,6' || dayOfWeek === '6,0') text += '주말마다 ';
    else if (dayOfWeek !== '*') text += `요일(${dayOfWeek})마다 `;

    if (day !== '*') text += `${day}일에 `;

    // Hour
    if (hour === '*') text += '매 시간 ';
    else if (hour.includes('-')) text += `${hour.split('-')[0]}시부터 ${hour.split('-')[1]}시 사이에 `;
    else text += `${hour}시에 `;

    // Minute
    if (minute === '*') text += '매 분마다 실행됩니다.';
    else if (minute.startsWith('*/')) text += `매 ${minute.replace('*/', '')}분 간격으로 실행됩니다.`;
    else text += `${minute}분에 실행됩니다.`;

    // Next 5 Estimated Runs (Visual simulation based on current date)
    const nextRuns: string[] = [];
    const now = new Date();
    for (let i = 1; i <= 5; i++) {
      const d = new Date(now.getTime() + i * 15 * 60 * 1000);
      nextRuns.push(d.toLocaleString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }));
    }

    return {
      text,
      parts: { minute, hour, day, month, dayOfWeek },
      nextRuns
    };
  }, [cron]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Field */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
        <label className="text-xs font-bold text-white flex items-center gap-2">
          <span>⏰</span> Unix Cron 표현식 입력 (분 시 일 월 요일)
        </label>
        
        <input
          type="text"
          value={cron}
          onChange={(e) => setCron(e.target.value)}
          placeholder="예: */5 * * * *"
          className="w-full bg-slate-950/80 text-indigo-300 font-mono text-xl sm:text-2xl font-black p-4 rounded-2xl border border-indigo-500/30 focus:outline-none focus:border-indigo-500 text-center tracking-widest"
        />

        {/* Presets */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-slate-400">자주 쓰이는 프리셋:</span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.expr}
                onClick={() => setCron(p.expr)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 text-xs font-semibold transition-all hover:border-indigo-500/40"
              >
                {p.label} <code className="text-indigo-400 font-mono ml-1">({p.expr})</code>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Human-Readable Explanation Box */}
      {explanation && !explanation.error && (
        <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-indigo-950/40 shadow-2xl space-y-5 text-center">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">한국어 해석 결과</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            “{explanation.text}”
          </h2>

          {/* Breakdown Fields */}
          <div className="grid grid-cols-5 gap-2 pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">분 (Minute)</span>
              <span className="font-mono font-bold text-indigo-300 text-sm">{explanation.parts.minute}</span>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">시 (Hour)</span>
              <span className="font-mono font-bold text-purple-300 text-sm">{explanation.parts.hour}</span>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">일 (Day)</span>
              <span className="font-mono font-bold text-pink-300 text-sm">{explanation.parts.day}</span>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">월 (Month)</span>
              <span className="font-mono font-bold text-amber-300 text-sm">{explanation.parts.month}</span>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">요일 (Week)</span>
              <span className="font-mono font-bold text-teal-300 text-sm">{explanation.parts.dayOfWeek}</span>
            </div>
          </div>
        </div>
      )}

      {explanation && explanation.error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-bold">
          {explanation.error}
        </div>
      )}
    </div>
  );
}
