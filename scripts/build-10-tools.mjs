import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log("🚀 Generating 10 new Life Utility Tools...");

// 1. DutyCalculator.tsx
const DutyCalculatorCode = `import React, { useState } from 'react';
import { Plane, Calculator, RefreshCw, AlertCircle, ShoppingBag, ShieldCheck, Copy, Check } from 'lucide-react';

const CATEGORIES = [
  { name: '일반 의류 / 패션', tariff: 0.13, vat: 0.10, desc: '관세 13% + 부가세 10%' },
  { name: '신발 / 구두 / 운동화', tariff: 0.13, vat: 0.10, desc: '관세 13% + 부가세 10%' },
  { name: '가전 / 컴퓨터 / 스마트폰', tariff: 0.00, vat: 0.10, desc: '관세 0% (면세) + 부가세 10%' },
  { name: '화장품 / 기초 스킨케어', tariff: 0.065, vat: 0.10, desc: '관세 6.5% + 부가세 10%' },
  { name: '건강기능식품 / 영양제', tariff: 0.08, vat: 0.10, desc: '관세 8% + 부가세 10% (최대 6병 자가사용)' },
  { name: '가방 / 지갑 / 액세서리', tariff: 0.08, vat: 0.10, desc: '관세 8% + 부가세 10%' },
  { name: '서적 / 인쇄물', tariff: 0.00, vat: 0.00, desc: '관세 및 부가세 전액 면제' },
  { name: '식품 / 커피 / 가공식품', tariff: 0.08, vat: 0.10, desc: '관세 8% + 부가세 10%' },
];

const CURRENCIES = [
  { code: 'USD', name: '미국 달러 ($)', rate: 1380, limit: 200, limitName: '목록통관 $200 (미국)' },
  { code: 'JPY', name: '일본 엔 (¥100)', rate: 930, limit: 150, limitName: '일반면세 $150 기준' },
  { code: 'EUR', name: '유럽 유로 (€)', rate: 1510, limit: 150, limitName: '일반면세 $150 기준' },
  { code: 'CNY', name: '중국 위안 (¥)', rate: 195, limit: 150, limitName: '일반면세 $150 기준' },
];

export default function DutyCalculator() {
  const [currency, setCurrency] = useState('USD');
  const [price, setPrice] = useState<number | ''>('');
  const [shipping, setShipping] = useState<number | ''>('');
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const curInfo = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
  const catInfo = CATEGORIES[categoryIdx];

  const itemPrice = typeof price === 'number' ? price : 0;
  const shipPrice = typeof shipping === 'number' ? shipping : 0;
  const totalForeign = itemPrice + shipPrice;

  // Convert to USD for threshold check
  const usdRate = 1380;
  const currentRate = curInfo.rate / (curInfo.code === 'JPY' ? 100 : 1);
  const totalUSD = (totalForeign * currentRate) / usdRate;

  const isExempt = totalUSD <= curInfo.limit && totalUSD > 0;
  const krwItemPrice = Math.round(totalForeign * currentRate);

  const tariffAmount = isExempt ? 0 : Math.round(krwItemPrice * catInfo.tariff);
  const vatBase = krwItemPrice + tariffAmount;
  const vatAmount = isExempt ? 0 : Math.round(vatBase * catInfo.vat);
  const totalTax = tariffAmount + vatAmount;
  const finalTotal = krwItemPrice + totalTax;

  const handleCopy = () => {
    const text = `[해외직구 예상 관·부가세 계산]
품목: ${catInfo.name}
결제금액: ${totalForeign.toLocaleString()} ${curInfo.code} (약 ${krwItemPrice.toLocaleString()}원)
면세 여부: ${isExempt ? '면세 대상 (관·부가세 0원)' : '과세 대상'}
예상 관세: ${tariffAmount.toLocaleString()}원
예상 부가세: ${vatAmount.toLocaleString()}원
총 납부 세금: ${totalTax.toLocaleString()}원
최종 총 예상 비용: ${finalTotal.toLocaleString()}원`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Input Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">통화 선택</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CURRENCIES.map(c => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={\`py-2.5 px-3 rounded-xl font-bold text-xs transition-all \${
                      currency === c.code
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }\`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">품목 분류</label>
              <select
                value={categoryIdx}
                onChange={(e) => setCategoryIdx(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.map((cat, i) => (
                  <option key={cat.name} value={i}>{cat.name} ({cat.desc})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">물품 가격 ({curInfo.code})</label>
              <input
                type="number"
                placeholder="예: 180"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">현지 배송비 ({curInfo.code})</label>
              <input
                type="number"
                placeholder="0"
                value={shipping}
                onChange={(e) => setShipping(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Right Column: Result Card */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400">면세 한도 기준</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                  {curInfo.limitName}
                </span>
              </div>

              <div className="my-4 text-center">
                {isExempt ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> 면세 대상입니다 (관세·부가세 0원)
                  </div>
                ) : totalUSD > curInfo.limit ? (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-sm font-bold flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" /> 면세 한도 초과 (과세 대상)
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs py-2">금액을 입력하면 실시간 계산됩니다.</div>
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">결제 원화 환산</span>
                  <span className="font-semibold">{krwItemPrice.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">예상 관세 ({(catInfo.tariff * 100).toFixed(1)}%)</span>
                  <span className="font-semibold text-amber-300">{tariffAmount.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">예상 부가세 (10%)</span>
                  <span className="font-semibold text-amber-300">{vatAmount.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-slate-200 font-bold">
                  <span>총 납부 세금</span>
                  <span className="text-indigo-400 text-sm">{totalTax.toLocaleString()} 원</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-bold text-slate-400">최종 총 예상 비용</span>
                <span className="text-xl font-extrabold text-white">{finalTotal.toLocaleString()} <span className="text-xs font-normal text-slate-400">원</span></span>
              </div>
              <button
                onClick={handleCopy}
                disabled={totalForeign === 0}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '결과 복사 완료!' : '계산 결과 텍스트 복사'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/DutyCalculator.tsx'), DutyCalculatorCode, 'utf8');
console.log("✅ 1. DutyCalculator.tsx created.");

