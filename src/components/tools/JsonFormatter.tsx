import React, { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"rab8bit","service":"smart tools hub","features":["unit-converter","ladder-game","ai-prompts"],"active":true,"version":2026}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError(null);
    } catch (err: any) {
      setError(err.message || '유효하지 않은 JSON 형식입니다.');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || '유효하지 않은 JSON 형식입니다.');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/90 rounded-2xl border border-indigo-500/20">
        <div className="flex items-center gap-2">
          <button
            onClick={formatJson}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 transition-all"
          >
            ✨ JSON 정렬 (Format)
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold border border-slate-700 transition-all"
          >
            📦 한 줄 압축 (Minify)
          </button>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="bg-slate-950 text-slate-300 text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
          >
            <option value={2}>들여쓰기: 2칸</option>
            <option value={4}>들여쓰기: 4칸</option>
            <option value={1}>들여쓰기: 탭(Tab)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setInput(''); setOutput(''); setError(null); }}
            className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
          >
            비우기
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20"
          >
            {copied ? '✓ 복사완료' : '결과 복사'}
          </button>
        </div>
      </div>

      {/* Editor Dual Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Pane */}
        <div className="stitch-card p-4 rounded-3xl border border-slate-800 space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-2">
            <span>JSON 원본 입력</span>
            <span>{input.length} 글자</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="여기에 JSON 문자열을 입력하거나 붙여넣으세요..."
            rows={16}
            className="w-full flex-1 bg-slate-950/80 text-indigo-200 text-xs sm:text-sm font-mono p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-y leading-relaxed"
          />
        </div>

        {/* Output Pane */}
        <div className="stitch-card p-4 rounded-3xl border border-indigo-500/20 space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold px-2">
            <span className={error ? 'text-red-400' : 'text-emerald-400'}>
              {error ? '❌ 유효성 검사 오류' : '✔️ 포맷팅 결과'}
            </span>
            {error && <span className="text-red-400 text-[11px] truncate max-w-xs">{error}</span>}
          </div>
          <textarea
            readOnly
            value={error ? `// 오류 발생:\n${error}` : output}
            placeholder="포맷팅 또는 검증된 결과가 여기에 표시됩니다."
            rows={16}
            className={`w-full flex-1 bg-slate-950/90 text-xs sm:text-sm font-mono p-4 rounded-2xl border resize-y leading-relaxed ${
              error ? 'border-red-500/50 text-red-300' : 'border-indigo-500/30 text-emerald-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
