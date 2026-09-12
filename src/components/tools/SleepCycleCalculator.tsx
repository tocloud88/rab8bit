import React, { useState } from 'react';
import { Moon, Sun, AlarmClock, Sparkles, Check } from 'lucide-react';

export default function SleepCycleCalculator() {
  const [calcMode, setCalcMode] = useState<'sleepNow' | 'wakeAt'>('sleepNow');
  const [wakeTime, setWakeTime] = useState('07:00');

  // 90 minutes per cycle, 15 minutes to fall asleep
  const getSleepNowTimes = () => {
    const now = new Date();
    const times = [];
    for (let cycles = 3; cycles <= 6; cycles++) {
      const wake = new Date(now.getTime() + (cycles * 90 + 15) * 60000);
      const hh = String(wake.getHours()).padStart(2, '0');
      const mm = String(wake.getMinutes()).padStart(2, '0');
      times.push({
        time: hh + ':' + mm,
        cycles: cycles,
        hours: (cycles * 1.5).toFixed(1),
        best: cycles === 5 || cycles === 6
      });
    }
    return times;
  };

  const getSleepAtTimes = () => {
    const [h, m] = wakeTime.split(':').map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);

    const times = [];
    for (let cycles = 6; cycles >= 3; cycles--) {
      const sleep = new Date(target.getTime() - (cycles * 90 + 15) * 60000);
      const hh = String(sleep.getHours()).padStart(2, '0');
      const mm = String(sleep.getMinutes()).padStart(2, '0');
      times.push({
        time: hh + ':' + mm,
        cycles: cycles,
        hours: (cycles * 1.5).toFixed(1),
        best: cycles === 5 || cycles === 6
      });
    }
    return times;
  };

  const times = calcMode === 'sleepNow' ? getSleepNowTimes() : getSleepAtTimes();

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCalcMode('sleepNow')}
            className={'py-3 px-4 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 ' + (
              calcMode === 'sleepNow' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400'
            )}
          >
            <Moon className="w-4 h-4" /> 지금 바로 잘 때 기상 시간
          </button>
          <button
            onClick={() => setCalcMode('wakeAt')}
            className={'py-3 px-4 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 ' + (
              calcMode === 'wakeAt' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400'
            )}
          >
            <Sun className="w-4 h-4" /> 목표 기상 시간에 맞춘 취침 시각
          </button>
        </div>

        {calcMode === 'wakeAt' && (
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">내일 몇 시에 일어나야 하나요?</span>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-sm font-bold"
            />
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold text-slate-400 mb-3">
            {calcMode === 'sleepNow' ? '추천 알람 시각 (90분 렘수면 주기 최적화)' : '추천 취침 시각'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {times.map((t) => (
              <div
                key={t.time + t.cycles}
                className={'p-4 rounded-2xl border transition text-center space-y-1.5 ' + (
                  t.best
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800'
                )}
              >
                {t.best && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold inline-block">
                    ★ 가장 개운한 수면
                  </span>
                )}
                <div className="text-2xl font-black text-white font-mono">{t.time}</div>
                <div className="text-xs text-slate-400">{t.cycles}개 수면 사이클 ({t.hours}시간)</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
