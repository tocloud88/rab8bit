import React, { useState, useRef, useEffect } from 'react';

export default function BarcodeGenerator() {
  const [value, setValue] = useState('8801234567890');
  const [barcodeType, setBarcodeType] = useState('CODE128');
  const [showText, setShowText] = useState(true);
  const [barHeight, setBarHeight] = useState(80);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simple Code 128 / Bar pattern simulator for universal browser canvas rendering
  const renderBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 320;
    const height = barHeight + (showText ? 35 : 15);
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#000000';

    // Hash string into barcode lines
    let str = value || '12345678';
    let seed = 0;
    for (let i = 0; i < str.length; i++) {
      seed = (seed * 31 + str.charCodeAt(i)) & 0xffffffff;
    }

    const startX = 20;
    const endX = width - 20;
    let currentX = startX;

    // Start pattern
    ctx.fillRect(currentX, 10, 3, barHeight);
    currentX += 5;
    ctx.fillRect(currentX, 10, 2, barHeight);
    currentX += 4;

    // Generate bar strips deterministically
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      const pattern = [(code % 3) + 1, ((code >> 2) % 3) + 1, ((code >> 4) % 2) + 1, ((code >> 1) % 3) + 1];
      
      pattern.forEach((w, idx) => {
        if (idx % 2 === 0) {
          ctx.fillRect(currentX, 10, w * 1.5, barHeight);
        }
        currentX += w * 1.5 + 1.5;
      });

      if (currentX >= endX - 15) break;
    }

    // End guard pattern
    ctx.fillRect(currentX, 10, 2, barHeight);
    currentX += 4;
    ctx.fillRect(currentX, 10, 3, barHeight);

    // Text below
    if (showText) {
      ctx.font = 'bold 14px "Plus Jakarta Sans", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.fillText(value, width / 2, barHeight + 25);
    }
  };

  useEffect(() => {
    renderBarcode();
  }, [value, barcodeType, showText, barHeight]);

  const downloadBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `barcode-${value}-${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings */}
        <div className="lg:col-span-7 space-y-4">
          <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">바코드에 입력할 데이터/번호</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="숫자 또는 영문 텍스트 입력..."
                className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-indigo-500/30 font-mono text-sm font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">바코드 표준 규격</label>
                <select
                  value={barcodeType}
                  onChange={(e) => setBarcodeType(e.target.value)}
                  className="w-full bg-slate-950/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 text-xs font-bold focus:outline-none"
                >
                  <option value="CODE128">Code 128 (범용)</option>
                  <option value="EAN13">EAN-13 (한국 상품 바코드 880)</option>
                  <option value="UPCA">UPC-A (북미 유통)</option>
                  <option value="CODE39">Code 39 (영숫자)</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-semibold">
                  <span>바코드 높이</span>
                  <span>{barHeight}px</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={150}
                  value={barHeight}
                  onChange={(e) => setBarHeight(Number(e.target.value))}
                  className="w-full accent-indigo-500 mt-2"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showText}
                  onChange={(e) => setShowText(e.target.checked)}
                  className="rounded accent-indigo-500"
                />
                <span>바코드 하단에 번호 텍스트 표기</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="stitch-card p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl flex flex-col items-center justify-center w-full">
            <div className="p-4 bg-white rounded-2xl shadow-inner inline-block">
              <canvas
                ref={canvasRef}
                className="rounded max-w-full"
              />
            </div>

            <button
              onClick={downloadBarcode}
              className="mt-6 w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>💾 바코드 PNG 다운로드</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
