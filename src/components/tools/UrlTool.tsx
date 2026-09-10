import React, { useState } from 'react';

export default function UrlTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('https://rab8bit.com/search?keyword=인공지능 프롬프트&category=AI 도구');
  const [encodeFullUri, setEncodeFullUri] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = React.useMemo(() => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        return encodeFullUri ? encodeURI(input) : encodeURIComponent(input);
      } else {
        return decodeURIComponent(input);
      }
    } catch (err: any) {
      return `오류: 잘못된 URL 형식입니다 (${err.message})`;
    }
  }, [input, mode, encodeFullUri]);

  // Query String Parser
  const queryParams = React.useMemo(() => {
    try {
      const url = new URL(input.startsWith('http') ? input : `https://dummy.com/${input}`);
      const params: { key: string; value: string }[] = [];
      url.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });
      return params;
    } catch {
      return [];
    }
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-indigo-500/20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'encode'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            🔗 URL 인코딩 (Encode)
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'decode'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            🔓 URL 디코딩 (Decode)
          </button>
        </div>

        {mode === 'encode' && (
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={encodeFullUri}
              onChange={(e) => setEncodeFullUri(e.target.checked)}
              className="rounded accent-indigo-500"
            />
            <span>전체 URI 모드 (encodeURI - ://, ? 유지)</span>
          </label>
        )}
      </div>

      {/* Editor Dual Panes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stitch-card p-5 rounded-3xl border border-slate-800 space-y-2 flex flex-col">
          <span className="text-xs font-semibold text-slate-300">
            {mode === 'encode' ? '인코딩할 URL / 텍스트' : '인코딩된 URL (퍼센트 인코딩 %XX)'}
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="URL을 입력하세요..."
            rows={10}
            className="w-full flex-1 bg-slate-950/80 text-slate-200 text-xs sm:text-sm font-mono p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        <div className="stitch-card p-5 rounded-3xl border border-indigo-500/30 space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-indigo-400">변환 결과</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all"
            >
              {copied ? '✓ 복사완료' : '결과 복사'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="결과가 여기에 표시됩니다."
            rows={10}
            className="w-full flex-1 bg-slate-950/90 text-indigo-200 text-xs sm:text-sm font-mono p-4 rounded-2xl border border-indigo-500/20 resize-y"
          />
        </div>
      </div>

      {/* Query Parameters Inspection Table */}
      {queryParams.length > 0 && (
        <div className="stitch-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>🔎</span> 감지된 URL 파라미터 (Query String)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3">Key (파라미터명)</th>
                  <th className="py-2 px-3">Value (디코딩된 값)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {queryParams.map((param, i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 font-bold text-indigo-400">{param.key}</td>
                    <td className="py-2 px-3 text-slate-200">{param.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
