import React, { useState } from 'react';
import { DollarSign, ShieldAlert, FileText, CheckCircle, Calculator, TrendingUp } from 'lucide-react';

export default function SeveranceCalculator() {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2026-09-12');
  const [m1, setM1] = useState(3500000);
  const [m2, setM2] = useState(3500000);
  const [m3, setM3] = useState(3500000);
  const [bonus, setBonus] = useState(2000000); // 연간 상여금
  const [annualLeavePay, setAnnualLeavePay] = useState(500000); // 연차수당
  const [age, setAge] = useState(35);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.max(0, Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  const total3Months = (Number(m1) || 0) + (Number(m2) || 0) + (Number(m3) || 0);
  const bonus3Months = ((Number(bonus) || 0) * (3 / 12));
  const leave3Months = ((Number(annualLeavePay) || 0) * (3 / 12));
  const avg3MonthsTotal = total3Months + bonus3Months + leave3Months;

  // 3 months approx 91.25 days
  const avgDailyWage = diffDays >= 365 ? Math.round(avg3MonthsTotal / 91) : 0;
  const severancePay = diffDays >= 365 ? Math.round((avgDailyWage * 30 * diffDays) / 365) : 0;

  // Unemployment benefit estimate
  // 1일 상한 66,000원, 하한 약 63,104원
  const unempDaily = Math.min(66000, Math.max(63104, Math.round(avgDailyWage * 0.6)));
  const unempMonths = diffDays < 365 ? 0 : (age >= 50 || diffDays >= 3650 ? 240 : (diffDays >= 1825 ? 210 : 150));
  const unempTotal = unempDaily * unempMonths;

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">입사일</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">퇴사일</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">최근 3개월 기본급/수당 (월별)</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="1개월차"
                  value={m1}
                  onChange={(e) => setM1(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-right"
                />
                <input
                  type="number"
                  placeholder="2개월차"
                  value={m2}
                  onChange={(e) => setM2(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-right"
                />
                <input
                  type="number"
                  placeholder="3개월차"
                  value={m3}
                  onChange={(e) => setM3(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">연간 상여금 총액</label>
                <input
                  type="number"
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white text-right"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">연차수당 (미사용분)</label>
                <input
                  type="number"
                  value={annualLeavePay}
                  onChange={(e) => setAnnualLeavePay(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white text-right"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400">총 재직일수</span>
                <span className="text-xs font-bold text-indigo-400">{diffDays}일 ({ (diffDays/365).toFixed(1) }년)</span>
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>1일 평균임금</span>
                  <span className="font-semibold">{avgDailyWage.toLocaleString()}원</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400">예상 퇴직금</span>
                <span className="text-xl font-extrabold text-indigo-400">{severancePay.toLocaleString()} <span className="text-xs text-slate-400 font-normal">원</span></span>
              </div>
              {diffDays < 365 && (
                <p className="text-xs text-amber-400">⚠️ 계속 근로기간 1년(365일) 미만은 법정 퇴직금 지급 대상이 아닙니다.</p>
              )}
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-300">💡 실업급여(구직급여) 모의 예측</span>
                <span className="text-emerald-400 font-bold">{unempMonths}일 수급</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>1일 수급액 (상한선 66,000원 적용)</span>
                <span className="text-white font-semibold">{unempDaily.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-white font-bold items-baseline">
                <span>예상 총 수급액</span>
                <span className="text-emerald-400 text-lg font-extrabold">{unempTotal.toLocaleString()} 원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
