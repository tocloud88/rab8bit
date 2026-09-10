import React, { useState, useRef, useEffect } from 'react';

const DEFAULT_ITEMS = [
  '짜장면 🍜', '김치찌개 🍲', '돈까스 🥩', '피자 🍕',
  '햄버거 🍔', '초밥 🍣', '샐러드 🥗', '제육볶음 🍛'
];

const COLORS = [
  '#6366f1', '#a855f7', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#8b5cf6', '#14b8a6', '#f59e0b'
];

export default function RouletteGame() {
  const [items, setItems] = useState<string[]>(DEFAULT_ITEMS);
  const [newItem, setNewItem] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  // Draw Roulette Canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 15;
    const sliceAngle = (2 * Math.PI) / items.length;

    ctx.clearRect(0, 0, size, size);

    // Slices
    items.forEach((item, index) => {
      const startAngle = angle + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText(item, radius - 20, 5);
      ctx.restore();
    });

    // Center pin
    ctx.beginPath();
    ctx.arc(center, center, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel(currentAngleRef.current);
  }, [items]);

  const spin = () => {
    if (isSpinning || items.length < 2) return;

    setIsSpinning(true);
    setWinner(null);

    const spinRotations = 5 + Math.random() * 5; // 5~10 full spins
    const extraAngle = Math.random() * 2 * Math.PI;
    const totalSpinAngle = spinRotations * 2 * Math.PI + extraAngle;

    const startAngle = currentAngleRef.current;
    const targetAngle = startAngle + totalSpinAngle;
    const duration = 4000; // 4 seconds
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentAngle = startAngle + totalSpinAngle * easedProgress;
      currentAngleRef.current = currentAngle;
      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        // Calculate winner
        // Arrow points from right/top (3 * PI / 2)
        const sliceAngle = (2 * Math.PI) / items.length;
        const normalizedAngle = (1.5 * Math.PI - (targetAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const winningIndex = Math.floor(normalizedAngle / sliceAngle) % items.length;
        setWinner(items[winningIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  const removeItem = (idx: number) => {
    if (items.length <= 2) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Roulette Wheel Area */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          {/* Top Indicator Arrow */}
          <div className="absolute top-2 z-20 -translate-y-1/2 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-pink-500 drop-shadow-[0_4px_10px_rgba(244,63,94,0.6)] animate-bounce" />
          </div>

          <div className="p-4 rounded-full bg-slate-900/90 border-2 border-indigo-500/30 shadow-2xl relative">
            <canvas
              ref={canvasRef}
              width={360}
              height={360}
              className="rounded-full w-[300px] h-[300px] sm:w-[360px] sm:h-[360px]"
            />
          </div>

          <button
            onClick={spin}
            disabled={isSpinning}
            className={`mt-6 px-8 py-3.5 rounded-2xl font-black text-base transition-all shadow-xl ${
              isSpinning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white hover:scale-105 active:scale-95 shadow-purple-500/30'
            }`}
          >
            {isSpinning ? '돌아가는 중...' : '🎯 룰렛 돌리기!'}
          </button>
        </div>

        {/* Options Management */}
        <div className="lg:col-span-5 space-y-4">
          <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>📝</span> 선택지 목록 ({items.length}개)
              </h2>
              <button
                onClick={() => setItems(DEFAULT_ITEMS)}
                className="text-xs text-indigo-400 hover:underline"
              >
                점심 메뉴로 초기화
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                placeholder="새 선택지 입력..."
                className="flex-1 bg-slate-950/80 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={addItem}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
              >
                추가
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-slate-200">{item}</span>
                  </span>
                  {items.length > 2 && (
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-slate-500 hover:text-red-400 px-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal / Callout */}
      {winner && (
        <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-pink-500/50 bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-indigo-950/60 text-center space-y-2 animate-fade-in shadow-2xl">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">축하합니다! 당첨 결과</span>
          <p className="text-3xl sm:text-4xl font-black text-white">
            🎉 <span className="gradient-text-stitch">{winner}</span> 🎉
          </p>
        </div>
      )}
    </div>
  );
}
