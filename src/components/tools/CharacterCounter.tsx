import React, { useState, useMemo } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const totalChars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;
    const bytes = new Blob([text]).size;
    // Average reading speed: 400 characters per minute (Korean standard)
    const readingTimeMinutes = Math.max(1, Math.ceil(totalChars / 400));
    // Speaking speed: 300 characters per minute
    const speakingTimeMinutes = Math.max(1, Math.ceil(totalChars / 300));

    return {
      totalChars,
      charsNoSpaces,
      words,
      lines,
      bytes,
      readingTimeMinutes,
      speakingTimeMinutes
    };
  }, [text]);

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="stitch-card p-4 rounded-2xl border border-indigo-500/20 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400">공백 포함 글자수</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {stats.totalChars.toLocaleString()} <span className="text-xs font-normal text-slate-400">자</span>
          </span>
        </div>

        <div className="stitch-card p-4 rounded-2xl border border-purple-500/20 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400">공백 제외 글자수</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-2">
            {stats.charsNoSpaces.toLocaleString()} <span className="text-xs font-normal text-slate-400">자</span>
          </span>
        </div>

        <div className="stitch-card p-4 rounded-2xl border border-pink-500/20 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400">단어 수</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-pink-400 mt-2">
            {stats.words.toLocaleString()} <span className="text-xs font-normal text-slate-400">단어</span>
          </span>
        </div>

        <div className="stitch-card p-4 rounded-2xl border border-cyan-500/20 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400">줄 (Line) 수</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-2">
            {stats.lines.toLocaleString()} <span className="text-xs font-normal text-slate-400">줄</span>
          </span>
        </div>

        <div className="stitch-card p-4 rounded-2xl border border-amber-500/20 flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-xs font-semibold text-slate-400">용량 (Byte)</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">
            {stats.bytes.toLocaleString()} <span className="text-xs font-normal text-slate-400">B</span>
          </span>
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/30 shadow-2xl relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-200">실시간 텍스트 입력</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText('')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/50"
            >
              지우기
            </button>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30"
            >
              {copied ? '✓ 복사완료' : '텍스트 복사'}
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여기에 텍스트를 입력하거나 붙여넣으세요... (자기소개서, 블로그 원고, 문서 등)"
          rows={10}
          className="w-full bg-slate-950/70 text-slate-100 placeholder:text-slate-500 rounded-2xl p-4 border border-indigo-500/20 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm sm:text-base leading-relaxed resize-y font-sans"
        />

        {/* Supplementary Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>⏱️ 예상 읽기 시간: <strong className="text-slate-200">약 {stats.readingTimeMinutes}분</strong></span>
            <span>🎙️ 예상 발표 시간: <strong className="text-slate-200">약 {stats.speakingTimeMinutes}분</strong></span>
          </div>
          <div>
            <span>원고지 기준: <strong className="text-indigo-400">약 {Math.ceil(stats.charsNoSpaces / 200)}매</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
