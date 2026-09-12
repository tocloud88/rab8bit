import React, { useState } from 'react';
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
    let msg = "📢 [모임 / 배달 정산 안내]\n";
    results.forEach(r => {
      msg += "▪ " + r.name + ": " + r.finalAmount.toLocaleString() + "원\n";
    });
    msg += "───────────────\n";
    msg += "총 금액: " + totalFinal.toLocaleString() + "원";
    if (bankInfo.trim()) {
      msg += "\n입금 계좌: " + bankInfo.trim();
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
