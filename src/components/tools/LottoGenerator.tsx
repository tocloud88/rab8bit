import React, { useState } from 'react';

// Official Lotto Ball Colors (Korean 6/45)
// 1~10: Yellow, 11~20: Blue, 21~30: Red, 31~40: Gray/Black, 41~45: Green
const getBallColor = (num: number) => {
  if (num <= 10) return 'from-amber-400 to-amber-600 text-slate-950 border-amber-300';
  if (num <= 20) return 'from-blue-500 to-blue-700 text-white border-blue-400';
  if (num <= 30) return 'from-red-500 to-red-700 text-white border-red-400';
  if (num <= 40) return 'from-slate-600 to-slate-800 text-white border-slate-500';
  return 'from-emerald-500 to-emerald-700 text-white border-emerald-400';
};

export default function LottoGenerator() {
  const [gamesCount, setGamesCount] = useState<number>(5);
  const [includeNumbers, setIncludeNumbers] = useState<string>(''); // 고정수
  const [excludeNumbers, setExcludeNumbers] = useState<string>(''); // 제외수
  const [generatedGames, setGeneratedGames] = useState<number[][]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = () => {
    // Parse includes & excludes
    const includes = includeNumbers
      .split(/[\s,]+/)
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n >= 1 && n <= 45);

    const excludes = new Set(
      excludeNumbers
        .split(/[\s,]+/)
        .map(n => parseInt(n))
        .filter(n => !isNaN(n) && n >= 1 && n <= 45)
    );

    const games: number[][] = [];

    for (let g = 0; g < gamesCount; g++) {
      const selected = new Set<number>(includes.slice(0, 5)); // max 5 fixed numbers
      const pool: number[] = [];

      for (let i = 1; i <= 45; i++) {
        if (!excludes.has(i) && !selected.has(i)) {
          pool.push(i);
        }
      }

      // Shuffle pool (Fisher-Yates)
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      while (selected.size < 6 && pool.length > 0) {
        selected.add(pool.pop()!);
      }

      const sorted = Array.from(selected).sort((a, b) => a - b);
      games.push(sorted);
    }

    setGeneratedGames(games);
  };

  const copyGame = async (game: number[], idx: number) => {
    await navigator.clipboard.writeText(game.join(', '));
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    if (generatedGames.length === 0) return;
    const text = generatedGames.map((g, i) => `게임 ${i + 1}: ${g.join(', ')}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Control Panel */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Game Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">생성할 게임 수</label>
            <div className="flex items-center gap-1.5">
              {[1, 3, 5, 10].map((count) => (
                <button
                  key={count}
                  onClick={() => setGamesCount(count)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    gamesCount === count
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {count}게임
                </button>
              ))}
            </div>
          </div>

          {/* Fixed Numbers */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">포함할 고정수 (선택)</label>
            <input
              type="text"
              placeholder="예: 7, 11 (쉼표 구분)"
              value={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.value)}
              className="w-full bg-slate-950/80 text-white px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Excluded Numbers */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">제외할 번호 (선택)</label>
            <input
              type="text"
              placeholder="예: 4, 13 (쉼표 구분)"
              value={excludeNumbers}
              onChange={(e) => setExcludeNumbers(e.target.value)}
              className="w-full bg-slate-950/80 text-white px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-semibold focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={generate}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>🍀 행운의 로또 번호 추출하기</span>
          </button>
        </div>
      </div>

      {/* Generated Games Results */}
      {generatedGames.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>✨</span> 생성된 추천 조합 ({generatedGames.length}세트)
            </h2>
            <button
              onClick={copyAll}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline"
            >
              {copiedIndex === -1 ? '✓ 전체 복사완료' : '전체 복사하기'}
            </button>
          </div>

          <div className="space-y-3">
            {generatedGames.map((game, idx) => (
              <div
                key={idx}
                className="stitch-card p-5 rounded-3xl border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:border-indigo-500/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-extrabold text-xs flex items-center justify-center">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center">
                    {game.map((num) => (
                      <div
                        key={num}
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br border shadow-md flex items-center justify-center font-black text-sm sm:text-base ${getBallColor(num)}`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => copyGame(game, idx)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-colors shrink-0"
                >
                  {copiedIndex === idx ? '✓ 복사됨' : '번호 복사'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
