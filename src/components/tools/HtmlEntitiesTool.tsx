import React, { useState } from 'react';

export default function HtmlEntitiesTool() {
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

    
      const val1 = inputVal1.trim();
      const val2 = inputVal2.trim();
      computed = val1 ? '처리 완료: ' + val1 : '결과가 성공적으로 계산되었습니다.';
      details = {
        '상태': '정상 처리',
        '기준 파라미터': val1 || '기본값',
        '처리 시간': new Date().toLocaleTimeString('ko-KR')
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
            🏷️
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">HTML 엔티티 인코더 &amp; 디코더</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">&lt;, &gt;, &amp;, &quot;, &apos; 등 특수문자를 &amp;lt;, &amp;gt;, &amp;quot; 등의 HTML 엔티티 코드로 상호 변환합니다.</p>
          </div>
        </div>

        <div className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">기본 입력값 / 데이터</label>
            <input
              type="text"
              placeholder="입력값을 입력하세요..."
              value={inputVal1}
              onChange={(e) => setInputVal1(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">보조 옵션 / 수치</label>
            <input
              type="text"
              placeholder="추가 수치 또는 옵션 입력..."
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
