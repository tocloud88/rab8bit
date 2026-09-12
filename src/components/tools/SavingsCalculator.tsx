import React, { useState } from 'react';
import { PiggyBank, TrendingUp, Coins, Check, Calculator } from 'lucide-react';

export default function SavingsCalculator() {
  const [calcType, setCalcType] = useState<'deposit' | 'installment'>('installment'); // 예금 vs 적금
  const [monthlyAmount, setMonthlyAmount] = useState(500000); // 월 납입액 or 예치금
  const [period, setPeriod] = useState(12); // 개월
  const [rate, setRate] = useState(3.8); // 이자율 %
  const [taxType, setTaxType] = useState<'normal' | 'preferential' | 'free'>('normal'); // 일반(15.4%), 우대(9.5%), 비과세(0%)

  const taxRate = taxType === 'normal' ? 0.154 : (taxType === 'preferential' ? 0.095 : 0);

  let totalPrincipal = 0;
  let preTaxInterest = 0;

  if (calcType === 'deposit') {
    totalPrincipal = monthlyAmount;
    preTaxInterest = Math.round(monthlyAmount * (rate / 100) * (period / 12));
  } else {
    totalPrincipal = monthlyAmount * period;
    // 적금 공식: Sum(M * r * (N-i+1)/12)
    preTaxInterest = Math.round(monthlyAmount * (rate / 100) * (period * (period + 1) / 24));
  }

  const taxAmount = Math.round(preTaxInterest * taxRate);
  const postTaxInterest = preTaxInterest - taxAmount;
  const finalMaturity = totalPrincipal + postTaxInterest;

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCalcType('installment')}
                className={'py-2.5 px-3 rounded-xl font-bold text-xs transition-all ' + (
                  calcType === 'installment' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                )}
              >
                💰 정기적금 (매달 납입)
              </button>
              <button
                onClick={() => setCalcType('deposit')}
                className={'py-2.5 px-3 rounded-xl font-bold text-xs transition-all ' + (
                  calcType === 'deposit' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                )}
              >
                🏦 정기예금 (목돈 예치)
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                {calcType === 'installment' ? '월 납입 금액' : '예치 금액 (목돈)'}
              </label>
              <input
                type="number"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">가입 기간</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm"
                >
                  <option value={6}>6개월</option>
                  <option value={12}>12개월 (1년)</option>
                  <option value={24}>24개월 (2년)</option>
                  <option value={36}>36개월 (3년)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">연 이자율 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">과세 구분</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTaxType('normal')}
                  className={'py-2 rounded-lg text-xs font-bold ' + (taxType === 'normal' ? 'bg-slate-700 text-white border border-indigo-400' : 'bg-slate-900 text-slate-400')}
                >
                  일반과세 (15.4%)
                </button>
                <button
                  onClick={() => setTaxType('preferential')}
                  className={'py-2 rounded-lg text-xs font-bold ' + (taxType === 'preferential' ? 'bg-slate-700 text-white border border-indigo-400' : 'bg-slate-900 text-slate-400')}
                >
                  세금우대 (9.5%)
                </button>
                <button
                  onClick={() => setTaxType('free')}
                  className={'py-2 rounded-lg text-xs font-bold ' + (taxType === 'free' ? 'bg-slate-700 text-white border border-indigo-400' : 'bg-slate-900 text-slate-400')}
                >
                  비과세 (0%)
                </button>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-400 pb-3 border-b border-slate-800">만기 수령액 분석</h4>
              <div className="space-y-3 mt-4 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>원금 합계</span>
                  <span className="font-semibold">{totalPrincipal.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>세전 이자</span>
                  <span className="font-semibold text-indigo-300">+{preTaxInterest.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>이자 과세 ({ (taxRate * 100).toFixed(1) }%)</span>
                  <span>-{taxAmount.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-slate-800 text-sm">
                  <span>세후 실수령 이자</span>
                  <span>+{postTaxInterest.toLocaleString()} 원</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400">만기 총 수령액</span>
                <span className="text-2xl font-black text-white">{finalMaturity.toLocaleString()} <span className="text-xs font-normal text-slate-400">원</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
