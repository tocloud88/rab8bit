import React, { useState } from 'react';

interface Rule {
  id: string;
  find: string;
  replace: string;
}

export default function FindReplace() {
  const [sourceText, setSourceText] = useState('');
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', find: '', replace: '' }
  ]);
  const [matchCase, setMatchCase] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [copied, setCopied] = useState(false);

  const addRule = () => {
    setRules(prev => [...prev, { id: Date.now().toString(), find: '', replace: '' }]);
  };

  const removeRule = (id: string) => {
    if (rules.length === 1) return;
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: 'find' | 'replace', value: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Perform replacement
  const resultText = React.useMemo(() => {
    let output = sourceText;
    for (const rule of rules) {
      if (!rule.find) continue;
      try {
        if (useRegex) {
          const flags = matchCase ? 'g' : 'gi';
          const regex = new RegExp(rule.find, flags);
          output = output.replace(regex, rule.replace);
        } else {
          if (matchCase) {
            output = output.split(rule.find).join(rule.replace);
          } else {
            const escaped = rule.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'gi');
            output = output.replace(regex, rule.replace);
          }
        }
      } catch (err) {
        // invalid regex ignoring
      }
    }
    return output;
  }, [sourceText, rules, matchCase, useRegex]);

  const handleCopy = async () => {
    if (!resultText) return;
    await navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Rules Section */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>🔄</span> 치환 규칙 설정
          </h2>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
                className="rounded accent-indigo-500"
              />
              <span>대소문자 구분</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="rounded accent-indigo-500"
              />
              <span>정규표현식 (RegEx)</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((rule, index) => (
            <div key={rule.id} className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 w-6">#{index + 1}</span>
              <input
                type="text"
                placeholder="찾을 단어/문장..."
                value={rule.find}
                onChange={(e) => updateRule(rule.id, 'find', e.target.value)}
                className="flex-1 bg-slate-950/80 text-slate-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-indigo-500/20 focus:outline-none focus:border-indigo-500"
              />
              <span className="text-slate-400 text-xs font-bold">&rarr;</span>
              <input
                type="text"
                placeholder="바꿀 단어..."
                value={rule.replace}
                onChange={(e) => updateRule(rule.id, 'replace', e.target.value)}
                className="flex-1 bg-slate-950/80 text-slate-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500"
              />
              {rules.length > 1 && (
                <button
                  onClick={() => removeRule(rule.id)}
                  className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="규칙 삭제"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={addRule}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all flex items-center gap-1.5"
          >
            <span>+</span> 규칙 추가하기
          </button>
        </div>
      </div>

      {/* Editor Side by Side or Stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Text */}
        <div className="stitch-card p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">원본 텍스트</span>
            <button
              onClick={() => setSourceText('')}
              className="text-[11px] text-slate-500 hover:text-slate-300"
            >
              비우기
            </button>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="변환할 원본 텍스트를 입력하세요..."
            rows={12}
            className="w-full bg-slate-950/80 text-slate-200 text-xs sm:text-sm p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Result Text */}
        <div className="stitch-card p-5 rounded-3xl border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400">치환 결과</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
            >
              {copied ? '✓ 복사완료' : '결과 복사'}
            </button>
          </div>
          <textarea
            readOnly
            value={resultText}
            placeholder="규칙에 따라 치환된 결과가 여기에 실시간으로 표시됩니다."
            rows={12}
            className="w-full bg-slate-950/90 text-indigo-100 text-xs sm:text-sm p-4 rounded-2xl border border-indigo-500/30 focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
}
