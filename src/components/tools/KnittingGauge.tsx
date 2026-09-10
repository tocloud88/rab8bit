import React, { useState, useMemo } from 'react';

export default function KnittingGauge() {
  // Swatch Gauge (Standard 10cm x 10cm)
  const [swatchStitches, setSwatchStitches] = useState(20); // 10cm당 코 수
  const [swatchRows, setSwatchRows] = useState(26); // 10cm당 단 수

  // Target Project Dimensions (cm)
  const [targetWidth, setTargetWidth] = useState(50); // 가로 목표 (cm)
  const [targetLength, setTargetLength] = useState(60); // 세로 목표 (cm)

  const results = useMemo(() => {
    // Stitches per 1cm
    const stitchPerCm = swatchStitches / 10;
    const rowPerCm = swatchRows / 10;

    // Required total stitches and rows
    const totalStitches = Math.round(targetWidth * stitchPerCm);
    const totalRows = Math.round(targetLength * rowPerCm);

    return {
      stitchPerCm: stitchPerCm.toFixed(1),
      rowPerCm: rowPerCm.toFixed(1),
      totalStitches,
      totalRows
    };
  }, [swatchStitches, swatchRows, targetWidth, targetLength]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 2-column input section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Swatch Gauge */}
        <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">1</span>
            <h2 className="text-base font-bold text-white">스와치 게이지 (10cm 기준)</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">10cm 안의 코 수 (Stitches)</label>
              <input
                type="number"
                min={1}
                max={100}
                value={swatchStitches}
                onChange={(e) => setSwatchStitches(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-slate-700 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">10cm 안의 단 수 (Rows)</label>
              <input
                type="number"
                min={1}
                max={150}
                value={swatchRows}
                onChange={(e) => setSwatchRows(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-slate-700 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Target Size */}
        <div className="stitch-card p-6 rounded-3xl border border-purple-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center">2</span>
            <h2 className="text-base font-bold text-white">만들 편물의 목표 크기</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">목표 가로 폭 (cm)</label>
              <input
                type="number"
                min={1}
                max={300}
                value={targetWidth}
                onChange={(e) => setTargetWidth(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-slate-700 font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">목표 세로 길이 (cm)</label>
              <input
                type="number"
                min={1}
                max={300}
                value={targetLength}
                onChange={(e) => setTargetLength(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-slate-700 font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Result Cards */}
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 bg-gradient-to-br from-slate-950/80 via-slate-900/90 to-purple-950/40 shadow-2xl space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">계산된 필수 작업 수치</span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">뜨개질 코·단 계산 결과</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="stitch-card p-6 rounded-2xl border border-indigo-500/30 bg-slate-950/60 text-center">
            <span className="text-xs font-semibold text-slate-400">필요한 총 코 수 (시작 코)</span>
            <p className="text-4xl sm:text-5xl font-black text-indigo-400 mt-2">
              {results.totalStitches} <span className="text-xl font-bold text-slate-400">코</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">1cm당 약 {results.stitchPerCm}코</p>
          </div>

          <div className="stitch-card p-6 rounded-2xl border border-purple-500/30 bg-slate-950/60 text-center">
            <span className="text-xs font-semibold text-slate-400">필요한 총 단 수 (세로 길이)</span>
            <p className="text-4xl sm:text-5xl font-black text-purple-400 mt-2">
              {results.totalRows} <span className="text-xl font-bold text-slate-400">단</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">1cm당 약 {results.rowPerCm}단</p>
          </div>
        </div>
      </div>
    </div>
  );
}
