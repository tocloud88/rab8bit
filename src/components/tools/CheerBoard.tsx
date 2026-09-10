import React, { useState, useEffect } from 'react';

export default function CheerBoard() {
  const [text, setText] = useState('rab8bit 최고! ✨');
  const [textColor, setTextColor] = useState('#f43f5e'); // rose/neon
  const [bgColor, setBgColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(72);
  const [speed, setSpeed] = useState(8); // seconds for marquee
  const [isBlinking, setIsBlinking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors = [
    { name: '네온 핑크', code: '#f43f5e' },
    { name: '네온 옐로우', code: '#facc15' },
    { name: '네온 그린', code: '#22c55e' },
    { name: '네온 블루', code: '#38bdf8' },
    { name: '네온 퍼플', code: '#c084fc' },
    { name: '화이트', code: '#ffffff' },
  ];

  const toggleFullscreen = () => {
    const el = document.getElementById('cheer-display-container');
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Settings Panel */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">응원 문구 입력</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="응원할 문구를 입력하세요..."
            maxLength={50}
            className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-indigo-500/30 text-base font-bold focus:outline-none focus:border-pink-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {/* Text Color */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">네온 글자색</label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setTextColor(c.code)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    textColor === c.code ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.code }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-semibold">
              <span>글자 크기</span>
              <span>{fontSize}px</span>
            </div>
            <input
              type="range"
              min={36}
              max={140}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          {/* Speed */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-semibold">
              <span>흐르는 속도</span>
              <span>{speed}초</span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              step={1}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          {/* Toggle Options */}
          <div className="space-y-2 flex flex-col justify-end">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isBlinking}
                onChange={(e) => setIsBlinking(e.target.checked)}
                className="rounded accent-pink-500"
              />
              <span>반짝임(깜빡임) 효과</span>
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={toggleFullscreen}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>📱 전체화면 전광판 시작</span>
          </button>
        </div>
      </div>

      {/* Live Preview Display Box */}
      <div
        id="cheer-display-container"
        className={`w-full overflow-hidden rounded-3xl border border-slate-800 flex items-center justify-center relative select-none ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen border-none' : 'h-64 sm:h-80'
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <div
          className="whitespace-nowrap font-black tracking-wider transition-all inline-block"
          style={{
            fontSize: `${fontSize}px`,
            color: textColor,
            textShadow: `0 0 10px ${textColor}, 0 0 20px ${textColor}, 0 0 40px ${textColor}`,
            animation: `cheer-marquee ${speed}s linear infinite ${isBlinking ? ', cheer-blink 0.6s infinite alternate' : ''}`
          }}
        >
          {text || '응원 문구를 입력하세요'}
        </div>

        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-50 px-4 py-2 rounded-xl bg-black/60 text-white text-xs font-bold border border-white/20 hover:bg-black"
          >
            닫기 (ESC)
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cheer-marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes cheer-blink {
          0% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}} />
    </div>
  );
}
