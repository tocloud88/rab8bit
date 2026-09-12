import React, { useState } from 'react';
import { CalendarHeart, Heart, Sparkles, Plus, Trash2, Check } from 'lucide-react';

export default function DdayCalculator() {
  const [baseDate, setBaseDate] = useState('2026-01-01');
  const [eventName, setEventName] = useState('새해 / 기념일');

  const calcDiff = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(baseDate);
    target.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diff = calcDiff();

  const getAnniversaries = () => {
    const start = new Date(baseDate);
    const milestones = [100, 200, 300, 365, 500, 1000];
    return milestones.map(days => {
      const d = new Date(start.getTime() + (days - 1) * 86400000);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return {
        label: days === 365 ? '1주년 (365일)' : days + '일 기념일',
        date: yyyy + '.' + mm + '.' + dd
      };
    });
  };

  const anniversaries = getAnniversaries();

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">이벤트 / 기념일 이름</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">기준 날짜</label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm"
            />
          </div>
        </div>

        {/* Highlight D-Day Badge */}
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-950/60 p-8 rounded-3xl border border-indigo-500/30 text-center space-y-2 shadow-2xl">
          <span className="text-sm font-bold text-indigo-300">{eventName}</span>
          <div className="text-5xl sm:text-7xl font-black text-white font-mono">
            {diff === 0 ? 'D - DAY' : (diff > 0 ? 'D - ' + diff : 'D + ' + Math.abs(diff))}
          </div>
          <p className="text-xs text-slate-300">
            {diff === 0 ? '🎉 바로 오늘입니다!' : (diff > 0 ? diff + '일 남았습니다.' : Math.abs(diff) + '일 지났습니다.')}
          </p>
        </div>

        {/* Milestone Dates */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 mb-3">주요 기념일 자동 계산</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {anniversaries.map((a) => (
              <div key={a.label} className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-xs font-semibold text-indigo-300">{a.label}</span>
                <div className="text-sm font-bold text-white">{a.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
