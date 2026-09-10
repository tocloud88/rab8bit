import React, { useState } from 'react';

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('안녕하세요 rab8bit 스마트 툴스 허브입니다! 🐰');
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileInfo, setFileInfo] = useState<string | null>(null);

  // UTF-8 safe encode
  const utf8Encode = (str: string) => {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  };

  // UTF-8 safe decode
  const utf8Decode = (str: string) => {
    let clean = str.trim();
    if (urlSafe) {
      clean = clean.replace(/-/g, '+').replace(/_/g, '/');
      while (clean.length % 4) clean += '=';
    }
    return decodeURIComponent(
      atob(clean)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  };

  const output = React.useMemo(() => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        let res = utf8Encode(input);
        if (urlSafe) {
          res = res.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        return res;
      } else {
        return utf8Decode(input);
      }
    } catch (err: any) {
      return `오류: 올바른 Base64 문자열이 아닙니다 (${err.message})`;
    }
  }, [input, mode, urlSafe]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileInfo(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setMode('encode');
      setInput(base64String);
    };
    reader.readAsDataURL(file);
  };

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
            🔒 Base64 인코딩 (Encode)
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'decode'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            🔓 Base64 디코딩 (Decode)
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded accent-indigo-500"
            />
            <span>URL-Safe 모드 (-, _)</span>
          </label>
        </div>
      </div>

      {/* File Upload Option */}
      <div className="stitch-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">📎 파일(이미지, 문서)을 Base64로 변환하려면 파일을 선택하세요:</span>
        <label className="px-3.5 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-xl font-bold cursor-pointer hover:bg-indigo-500/30 border border-indigo-500/30">
          <span>파일 선택</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Inputs & Outputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Pane */}
        <div className="stitch-card p-5 rounded-3xl border border-slate-800 space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>{mode === 'encode' ? '원본 텍스트 / 데이터' : 'Base64 인코딩 문자열'}</span>
            <button
              onClick={() => { setInput(''); setFileInfo(null); }}
              className="text-[11px] text-slate-500 hover:text-slate-300"
            >
              비우기
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="여기에 내용을 입력하세요..."
            rows={12}
            className="w-full flex-1 bg-slate-950/80 text-slate-200 text-xs sm:text-sm font-mono p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Output Pane */}
        <div className="stitch-card p-5 rounded-3xl border border-indigo-500/30 space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-indigo-400">{mode === 'encode' ? 'Base64 변환 결과' : '디코딩된 원본 텍스트'}</span>
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
            rows={12}
            className="w-full flex-1 bg-slate-950/90 text-indigo-200 text-xs sm:text-sm font-mono p-4 rounded-2xl border border-indigo-500/20 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
