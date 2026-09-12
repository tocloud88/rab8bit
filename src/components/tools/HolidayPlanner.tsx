import React, { useState } from 'react';
import { Calendar, Sparkles, CheckCircle2, Clock, Sun, PlaneTakeoff, Info } from 'lucide-react';

const HOLIDAYS_2026 = [
  { name: '신정', date: '2026-01-01', day: '목', bridge: '1/2(금) 연차 쓰면 4일 연휴 (1/1~1/4)' },
  { name: '설날 연휴', date: '2026-02-16', day: '월~수', bridge: '2/19(목), 2/20(금) 쓰면 9일 황금연휴 (2/14~2/22)' },
  { name: '3·1절 (대체공휴일)', date: '2026-03-02', day: '월', bridge: '기본 3일 연휴 (2/28~3/2)' },
  { name: '어린이날', date: '2026-05-05', day: '화', bridge: '5/4(월) 연차 쓰면 4일 연휴 (5/2~5/5)' },
  { name: '부처님오신날', date: '2026-05-24', day: '일 (대체 5/25 월)', bridge: '기본 3일 연휴 (5/23~5/25)' },
  { name: '현충일', date: '2026-06-06', day: '토', bridge: '6/5(금) 연차 쓰면 3일 연휴' },
  { name: '광복절 (대체공휴일)', date: '2026-08-17', day: '월', bridge: '기본 3일 연휴 (8/15~8/17)' },
  { name: '추석 연휴', date: '2026-09-24', day: '목~토 (대체 9/28 월)', bridge: '9/29(화)~9/30(수) 쓰면 9일 황금연휴' },
  { name: '개천절', date: '2026-10-03', day: '토 (대체 10/5 월)', bridge: '기본 3일 연휴 (10/3~10/5)' },
  { name: '한글날', date: '2026-10-09', day: '금', bridge: '기본 3일 연휴 (10/9~10/11)' },
  { name: '크리스마스', date: '2026-12-25', day: '금', bridge: '기본 3일 연휴 (12/25~12/27)' },
];

export default function HolidayPlanner() {
  const [joinDate, setJoinDate] = useState('2024-01-01');
  const [selectedSeason, setSelectedSeason] = useState<'all' | 'spring' | 'autumn' | 'winter'>('all');

  const calcLeave = () => {
    const start = new Date(joinDate);
    const now = new Date();
    const diffYears = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    if (diffYears < 1) {
      const diffMonths = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.4));
      return { total: Math.min(11, Math.max(0, diffMonths)), type: '1년 미만 (1개월 개근 시 1일)' };
    } else {
      const fullYears = Math.floor(diffYears);
      const addDays = Math.floor((fullYears - 1) / 2);
      const days = Math.min(25, 15 + addDays);
      return { total: days, type: '근속 ' + fullYears + '년차 (기본 15일 + 가산일)' };
    }
  };

  const leaveInfo = calcLeave();

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        {/* Top: Leave Calculator */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">내 입사일 입력</label>
              <input
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-300 font-medium">{leaveInfo.type}</span>
                <div className="text-xl font-extrabold text-white mt-0.5">발생 연차: <span className="text-indigo-400">{leaveInfo.total}</span>일</div>
              </div>
              <Sparkles className="w-8 h-8 text-indigo-400 opacity-80" />
            </div>
          </div>
        </div>

        {/* Holiday recommendations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <PlaneTakeoff className="w-5 h-5 text-indigo-400" /> 2026년 공휴일 & 추천 황금연차 플랜
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {HOLIDAYS_2026.map((h) => (
              <div key={h.name + h.date} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{h.name}</span>
                    <span className="text-xs text-slate-400">({h.date}, {h.day})</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-bold">
                    추천 꿀팁
                  </span>
                </div>
                <p className="text-xs text-indigo-300 font-medium bg-slate-800/50 p-2 rounded-xl">
                  ✈️ {h.bridge}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
