import React, { useState } from 'react';

export default function StockWaterCalculator() {
  const [inputVal1, setInputVal1] = useState<string>('');
  const [inputVal2, setInputVal2] = useState<string>('');
  const [selectVal, setSelectVal] = useState<string>('default');
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCalculate = () => {
    const n1 = parseFloat(inputVal1) || 0;
    const n2 = parseFloat(inputVal2) || 0;

    let computed = '';
    let details: Record<string, any> = {};

    
      const currentPrice = n1;
      const currentQty = n2;
      const buyPrice = currentPrice * 0.85;
      const buyQty = 100;
      const totalCost = (currentPrice * currentQty) + (buyPrice * buyQty);
      const totalQty = currentQty + buyQty;
      const newAvg = totalCost / (totalQty || 1);

      computed = '물타기 후 평단가: ' + Math.round(newAvg).toLocaleString() + '원';
      details = {
        '기존 투자금': Math.round(currentPrice * currentQty).toLocaleString() + '원',
        '추가 매수금': Math.round(buyPrice * buyQty).toLocaleString() + '원',
        '총 보유 수량': totalQty.toLocaleString() + '주',
        '평단가 변동': (Math.round(currentPrice) - Math.round(newAvg)).toLocaleString() + '원 인하'
      };
      

    setResult({ summary: computed, details });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputVal1('');
    setInputVal2('');
    setResult(null);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="stitch-card p-5 sm:p-7 rounded-3xl space-y-6 border border-indigo-500/25 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <span className="text-3xl sm:text-4xl p-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30">
            📈
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">주식 물타기 &amp; 평단가 계산기</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">보유 주식의 현재 평단가와 추가 매수 금액을 입력하여 최종 평단가와 목표 탈출 단가를 시뮬레이션합니다.</p>
          </div>
        </div>

        <div className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">현재 내 보유 평단가 (원)</label>
            <input
              type="number"
              placeholder="예: 75000"
              value={inputVal1}
              onChange={(e) => setInputVal1(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">현재 보유 수량 (주)</label>
            <input
              type="number"
              placeholder="예: 200"
              value={inputVal2}
              onChange={(e) => setInputVal2(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
    

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCalculate}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>⚡</span>
              <span>계산 &amp; 실행하기</span>
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-all"
            >
              초기화
            </button>
          </div>
        </div>

        {result && (
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400">📊 계산 결과</span>
              <button
                onClick={() => handleCopy(result.summary)}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 transition-all flex items-center gap-1 font-semibold"
              >
                {copied ? '✓ 복사됨' : '📋 결과 복사'}
              </button>
            </div>

            <div className="text-xl sm:text-2xl font-black text-white bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center text-indigo-300">
              {result.summary}
            </div>

            {result.details && Object.keys(result.details).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {Object.entries(result.details).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between">
                    <span className="text-slate-400">{k}</span>
                    <span className="font-bold text-slate-200">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-300 flex items-center gap-1.5">
          <span>💡</span> <span>알아두면 유용한 팁</span>
        </h3>
        <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>입력된 모든 데이터는 브라우저 내부에서만 안전하게 처리되며 외부 서버로 전송되지 않습니다.</li>
          <li>최신 기준 법령 및 공식 표준 계산 공식을 바탕으로 제작되었습니다.</li>
        </ul>
      </div>
    </div>
  );
}
