const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log("🛠️ Building 10 Life Utility Tools...");

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
  const [price, setPrice] = useState('');
  const [shipping, setShipping] = useState('');
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const curInfo = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
  const catInfo = CATEGORIES[categoryIdx];

  const itemPrice = typeof price === 'number' ? price : Number(price) || 0;
  const shipPrice = typeof shipping === 'number' ? shipping : Number(shipping) || 0;
  const totalForeign = itemPrice + shipPrice;

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
    const text = "[해외직구 예상 관·부가세 계산]\\n" +
      "품목: " + catInfo.name + "\\n" +
      "결제금액: " + totalForeign.toLocaleString() + " " + curInfo.code + " (약 " + krwItemPrice.toLocaleString() + "원)\\n" +
      "면세 여부: " + (isExempt ? "면세 대상 (관·부가세 0원)" : "과세 대상") + "\\n" +
      "예상 관세: " + tariffAmount.toLocaleString() + "원\\n" +
      "예상 부가세: " + vatAmount.toLocaleString() + "원\\n" +
      "총 납부 세금: " + totalTax.toLocaleString() + "원\\n" +
      "최종 총 예상 비용: " + finalTotal.toLocaleString() + "원";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">통화 선택</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CURRENCIES.map(c => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={'py-2.5 px-3 rounded-xl font-bold text-xs transition-all ' + (
                      currency === c.code
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    )}
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

// 2. DutchPayCalculator.tsx
const DutchPayCalculatorCode = `import React, { useState } from 'react';
import { Users, Plus, Trash2, Copy, Check, Calculator, Send } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  amount: number;
}

export default function DutchPayCalculator() {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: '김철수', amount: 0 },
    { id: '2', name: '이영희', amount: 0 },
    { id: '3', name: '박민수', amount: 0 },
  ]);
  const [extraFee, setExtraFee] = useState<number | ''>(''); // 배달비 등
  const [discount, setDiscount] = useState<number | ''>(''); // 할인쿠폰 등
  const [roundUnit, setRoundUnit] = useState<number>(100); // 100원 단위 올림/내림
  const [bankInfo, setBankInfo] = useState('');
  const [copied, setCopied] = useState(false);

  const addMember = () => {
    const nextNum = members.length + 1;
    setMembers([...members, { id: String(Date.now()), name: '멤버 ' + nextNum, amount: 0 }]);
  };

  const removeMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers(members.filter(m => m.id !== id));
  };

  const updateMember = (id: string, field: 'name' | 'amount', value: any) => {
    setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const totalBase = members.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);
  const extraVal = Number(extraFee) || 0;
  const discVal = Number(discount) || 0;
  const netCommon = extraVal - discVal;
  const commonPerPerson = members.length > 0 ? netCommon / members.length : 0;

  const results = members.map(m => {
    let perAmount = (Number(m.amount) || 0) + commonPerPerson;
    if (roundUnit > 1) {
      perAmount = Math.ceil(perAmount / roundUnit) * roundUnit;
    } else {
      perAmount = Math.round(perAmount);
    }
    return {
      ...m,
      finalAmount: Math.max(0, perAmount)
    };
  });

  const totalFinal = results.reduce((sum, r) => sum + r.finalAmount, 0);

  const handleCopy = () => {
    let msg = "📢 [모임 / 배달 정산 안내]\\n";
    results.forEach(r => {
      msg += "▪ " + r.name + ": " + r.finalAmount.toLocaleString() + "원\\n";
    });
    msg += "───────────────\\n";
    msg += "총 금액: " + totalFinal.toLocaleString() + "원";
    if (bankInfo.trim()) {
      msg += "\\n입금 계좌: " + bankInfo.trim();
    }
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> 참여 인원별 금액 입력
              </h3>
              <button
                onClick={addMember}
                className="py-1.5 px-3 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> 인원 추가
              </button>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {members.map((m, idx) => (
                <div key={m.id} className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 w-5 text-center">{idx + 1}</span>
                  <input
                    type="text"
                    value={m.name}
                    onChange={(e) => updateMember(m.id, 'name', e.target.value)}
                    className="w-28 sm:w-32 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    placeholder="이름"
                  />
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={m.amount === 0 ? '' : m.amount}
                      onChange={(e) => updateMember(m.id, 'amount', e.target.value === '' ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-2.5 pr-7 py-1.5 text-xs text-white text-right focus:outline-none focus:border-indigo-500"
                      placeholder="금액 (선택)"
                    />
                    <span className="absolute right-2.5 top-1.5 text-xs text-slate-400">원</span>
                  </div>
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(m.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs text-slate-400 mb-1">공통 추가금 (배달비/팁 등)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={extraFee}
                  onChange={(e) => setExtraFee(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">공통 할인액 (쿠폰 등)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">단위 절사 (올림 기준)</label>
                <select
                  value={roundUnit}
                  onChange={(e) => setRoundUnit(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={1}>1원 단위 (정확히)</option>
                  <option value={10}>10원 단위 올림</option>
                  <option value={100}>100원 단위 올림 (깔끔)</option>
                  <option value={1000}>1,000원 단위 올림</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">입금 계좌/토스 링크 (선택)</label>
                <input
                  type="text"
                  placeholder="예: 카카오뱅크 3333-xx-xxxx"
                  value={bankInfo}
                  onChange={(e) => setBankInfo(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400">정산 요약</span>
                <span className="text-xs font-bold text-indigo-400">총 {members.length}명 참여</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {results.map((r) => (
                  <div key={r.id} className="flex justify-between items-center bg-slate-800/40 p-2 rounded-lg text-xs">
                    <span className="font-semibold text-slate-300">{r.name}</span>
                    <span className="font-bold text-indigo-300 text-sm">{r.finalAmount.toLocaleString()}원</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>메뉴 합계</span>
                  <span>{totalBase.toLocaleString()}원</span>
                </div>
                {extraVal > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>공통 추가금</span>
                    <span>+{extraVal.toLocaleString()}원</span>
                  </div>
                )}
                {discVal > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>공통 할인</span>
                    <span>-{discVal.toLocaleString()}원</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400">최종 총액</span>
                <span className="text-xl font-extrabold text-white">{totalFinal.toLocaleString()} <span className="text-xs font-normal text-slate-400">원</span></span>
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '카카오톡 공유 문구 복사 완료!' : '카톡/문자용 정산 문구 복사'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/DutchPayCalculator.tsx'), DutchPayCalculatorCode, 'utf8');

// 3. HolidayPlanner.tsx
const HolidayPlannerCode = `import React, { useState } from 'react';
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
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/HolidayPlanner.tsx'), HolidayPlannerCode, 'utf8');

// 4. SeveranceCalculator.tsx
const SeveranceCalculatorCode = `import React, { useState } from 'react';
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
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/SeveranceCalculator.tsx'), SeveranceCalculatorCode, 'utf8');

// 5. SavingsCalculator.tsx
const SavingsCalculatorCode = `import React, { useState } from 'react';
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
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/SavingsCalculator.tsx'), SavingsCalculatorCode, 'utf8');

// 6. PomodoroTimer.tsx
const PomodoroTimerCode = `import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Flame, Coffee, Sparkles } from 'lucide-react';

export default function PomodoroTimer() {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cycles, setCycles] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const modeTimes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCycles(c => c + 1);
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modeTimes[newMode]);
  };

  const toggleNoise = () => {
    if (!soundEnabled) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Generate Pink/Brownish noise for concentration
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.15; // gentle volume

        noise.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start(0);

        noiseNodeRef.current = noise;
        setSoundEnabled(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setSoundEnabled(false);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-10 rounded-3xl border border-indigo-500/20 shadow-xl text-center space-y-6">
        <div className="inline-flex p-1.5 bg-slate-900 rounded-2xl border border-slate-800 gap-1">
          <button
            onClick={() => switchMode('focus')}
            className={'py-2 px-4 rounded-xl text-xs font-bold transition ' + (
              mode === 'focus' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            )}
          >
            🔥 25분 집중
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={'py-2 px-4 rounded-xl text-xs font-bold transition ' + (
              mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            )}
          >
            ☕ 5분 휴식
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={'py-2 px-4 rounded-xl text-xs font-bold transition ' + (
              mode === 'longBreak' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            )}
          >
            🏖️ 15분 긴 휴식
          </button>
        </div>

        {/* Big Timer Display */}
        <div className="py-6">
          <span className="text-6xl sm:text-8xl font-black text-white tracking-tight font-mono">
            {formatTime(timeLeft)}
          </span>
          <p className="text-xs text-slate-400 mt-2">오늘 완료한 뽀모도로 세션: <strong className="text-indigo-400">{cycles}회</strong></p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="py-3.5 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? '일시 정지' : '타이머 시작'}
          </button>

          <button
            onClick={() => { setIsRunning(false); setTimeLeft(modeTimes[mode]); }}
            className="p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition"
            title="리셋"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleNoise}
            className={'py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center gap-2 ' + (
              soundEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
            )}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? '백색소음 재생 중' : '집중 백색소음 켜기'}
          </button>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/PomodoroTimer.tsx'), PomodoroTimerCode, 'utf8');

// 7. RecipePortionConverter.tsx
const RecipePortionConverterCode = `import React, { useState } from 'react';
import { ChefHat, Plus, Trash2, Scale, RefreshCw } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export default function RecipePortionConverter() {
  const [basePortion, setBasePortion] = useState(1);
  const [targetPortion, setTargetPortion] = useState(3);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '간장', amount: 2, unit: '밥숟가락' },
    { id: '2', name: '설탕', amount: 1, unit: '밥숟가락' },
    { id: '3', name: '물', amount: 1, unit: '종이컵' },
    { id: '4', name: '고춧가루', amount: 1.5, unit: '밥숟가락' },
  ]);

  const ratio = basePortion > 0 ? targetPortion / basePortion : 1;

  const addRow = () => {
    setIngredients([...ingredients, { id: String(Date.now()), name: '', amount: 1, unit: '밥숟가락' }]);
  };

  const removeRow = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const updateRow = (id: string, field: 'name' | 'amount' | 'unit', val: any) => {
    setIngredients(ingredients.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">기준 레시피:</span>
            <input
              type="number"
              min="1"
              max="20"
              value={basePortion}
              onChange={(e) => setBasePortion(Number(e.target.value))}
              className="w-16 bg-slate-800 border border-slate-700 rounded-lg py-1 px-2 text-center text-white text-sm"
            />
            <span className="text-xs text-slate-300">인분</span>
          </div>

          <div className="text-indigo-400 text-sm font-bold">➔</div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-300">만들 목표:</span>
            <input
              type="number"
              min="1"
              max="50"
              value={targetPortion}
              onChange={(e) => setTargetPortion(Number(e.target.value))}
              className="w-16 bg-indigo-950 border border-indigo-500/50 rounded-lg py-1 px-2 text-center text-white text-sm font-bold"
            />
            <span className="text-xs text-indigo-300 font-bold">인분 (x{ratio.toFixed(2)}배)</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-400">재료 목록</h4>
            <button
              onClick={addRow}
              className="py-1 px-3 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> 재료 추가
            </button>
          </div>

          <div className="space-y-2">
            {ingredients.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="text"
                  placeholder="재료명 (예: 간장)"
                  value={item.name}
                  onChange={(e) => updateRow(item.id, 'name', e.target.value)}
                  className="col-span-4 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="number"
                  step="0.1"
                  value={item.amount}
                  onChange={(e) => updateRow(item.id, 'amount', Number(e.target.value))}
                  className="col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white text-right"
                />
                <select
                  value={item.unit}
                  onChange={(e) => updateRow(item.id, 'unit', e.target.value)}
                  className="col-span-3 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                >
                  <option value="밥숟가락">밥숟가락 (10ml)</option>
                  <option value="종이컵">종이컵 (180ml)</option>
                  <option value="티스푼">티스푼 (5ml)</option>
                  <option value="g">그램 (g)</option>
                  <option value="ml">밀리리터 (ml)</option>
                  <option value="개">개</option>
                  <option value="꼬집">꼬집</option>
                </select>
                <div className="col-span-2 text-right font-extrabold text-indigo-400 text-xs sm:text-sm">
                  {(item.amount * ratio).toFixed(1).replace(/\\.0$/, '')} {item.unit}
                </div>
                <button
                  onClick={() => removeRow(item.id)}
                  className="col-span-1 text-slate-500 hover:text-rose-400 text-right pr-1"
                >
                  <Trash2 className="w-4 h-4 inline" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/RecipePortionConverter.tsx'), RecipePortionConverterCode, 'utf8');

// 8. SleepCycleCalculator.tsx
const SleepCycleCalculatorCode = `import React, { useState } from 'react';
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
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/SleepCycleCalculator.tsx'), SleepCycleCalculatorCode, 'utf8');

// 9. DdayCalculator.tsx
const DdayCalculatorCode = `import React, { useState } from 'react';
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
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/DdayCalculator.tsx'), DdayCalculatorCode, 'utf8');

// 10. BmrTdeeCalculator.tsx
const BmrTdeeCalculatorCode = `import React, { useState } from 'react';
import { Flame, Activity, Scale, Dumbbell, Apple } from 'lucide-react';

export default function BmrTdeeCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.375); // 1.2, 1.375, 1.55, 1.725, 1.9

  // Mifflin-St Jeor Equation
  const bmr = Math.round(
    gender === 'male'
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161
  );

  const tdee = Math.round(bmr * activity);
  const cutCalorie = Math.round(tdee - 500); // 체중 감량
  const bulkCalorie = Math.round(tdee + 300); // 근육 증가

  // Macro grams for maintain (Carb 50%, Protein 30%, Fat 20%)
  const proteinG = Math.round((tdee * 0.3) / 4);
  const carbG = Math.round((tdee * 0.5) / 4);
  const fatG = Math.round((tdee * 0.2) / 9);

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">성별</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={'py-2.5 rounded-xl font-bold text-xs transition ' + (gender === 'male' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400')}
                >
                  남성 (Male)
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={'py-2.5 rounded-xl font-bold text-xs transition ' + (gender === 'female' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400')}
                >
                  여성 (Female)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">나이</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">키 (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">체중 (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">평소 활동량</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-xs text-white"
              >
                <option value={1.2}>거의 운동 안 함 (좌식 생활)</option>
                <option value={1.375}>가벼운 운동 (주 1~3회)</option>
                <option value={1.55}>보통 수준 운동 (주 3~5회)</option>
                <option value={1.725}>적극적인 운동 (주 6~7회)</option>
                <option value={1.9}>매우 격렬한 운동 / 육체 노동</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-400">내 기초대사량 (BMR)</span>
              <div className="text-2xl font-black text-indigo-400 mt-1">{bmr.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kcal/일</span></div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400">하루 유지 칼로리 (TDEE)</span>
              <div className="text-3xl font-black text-white mt-1">{tdee.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kcal/일</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-xl">
                <span className="text-slate-400 block">다이어트 (감량)</span>
                <strong className="text-emerald-400 text-sm font-extrabold">{cutCalorie.toLocaleString()} kcal</strong>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-xl">
                <span className="text-slate-400 block">린매스업 (증량)</span>
                <strong className="text-amber-400 text-sm font-extrabold">{bulkCalorie.toLocaleString()} kcal</strong>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex justify-between border-t border-slate-800">
              <span>탄: {carbG}g</span>
              <span>단: {proteinG}g</span>
              <span>지: {fatG}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(ROOT_DIR, 'src/components/tools/BmrTdeeCalculator.tsx'), BmrTdeeCalculatorCode, 'utf8');

console.log("✅ All 10 React components written!");
