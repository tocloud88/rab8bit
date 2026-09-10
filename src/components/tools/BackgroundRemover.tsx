import React, { useState, useRef } from 'react';

export default function BackgroundRemover() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [targetColor, setTargetColor] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      setHasResult(false);

      const img = new Image();
      img.onload = () => {
        const origCanvas = originalCanvasRef.current;
        if (origCanvas) {
          origCanvas.width = img.width;
          origCanvas.height = img.height;
          const ctx = origCanvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const removeBackground = () => {
    if (!originalCanvasRef.current || !resultCanvasRef.current) return;
    setIsProcessing(true);

    const origCanvas = originalCanvasRef.current;
    const resCanvas = resultCanvasRef.current;
    const width = origCanvas.width;
    const height = origCanvas.height;

    resCanvas.width = width;
    resCanvas.height = height;

    const origCtx = origCanvas.getContext('2d');
    const resCtx = resCanvas.getContext('2d');
    if (!origCtx || !resCtx) return;

    const imgData = origCtx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Parse target color hex
    const rTarget = parseInt(targetColor.slice(1, 3), 16);
    const gTarget = parseInt(targetColor.slice(3, 5), 16);
    const bTarget = parseInt(targetColor.slice(5, 7), 16);

    const tol = (tolerance / 100) * 441.67; // max Euclidean distance between RGB (sqrt(255^2*3))

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const dist = Math.sqrt(
        Math.pow(r - rTarget, 2) +
        Math.pow(g - gTarget, 2) +
        Math.pow(b - bTarget, 2)
      );

      if (dist <= tol) {
        data[i + 3] = 0; // Transparent
      }
    }

    resCtx.putImageData(imgData, 0, 0);
    setIsProcessing(false);
    setHasResult(true);
  };

  const downloadResult = () => {
    const canvas = resultCanvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `transparent-image-${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload & Control Panel */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2">
            <span>📷 사진/이미지 선택 (PNG, JPG)</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <span className="text-xs text-slate-400">
            🔒 이미지는 서버로 전송되지 않고 브라우저에서 안전하게 처리됩니다.
          </span>
        </div>

        {imageSrc && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">제거할 배경 색상</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={targetColor}
                  onChange={(e) => setTargetColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-none"
                />
                <span className="text-xs font-mono text-slate-200">{targetColor}</span>
                <button
                  onClick={() => setTargetColor('#ffffff')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  흰색
                </button>
                <button
                  onClick={() => setTargetColor('#000000')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  검정색
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>색상 허용 오차 (Tolerance)</span>
                <span>{tolerance}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={80}
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 pt-2">
              <button
                onClick={removeBackground}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                {isProcessing ? '배경 투명화 처리 중...' : '✨ 배경 투명하게 지우기'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Viewers */}
      {imageSrc && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original */}
          <div className="stitch-card p-5 rounded-3xl border border-slate-800 space-y-3 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400">원본 이미지</span>
            <div className="max-h-80 overflow-hidden flex items-center justify-center rounded-2xl bg-slate-950 p-2">
              <canvas ref={originalCanvasRef} className="max-w-full max-h-72 object-contain" />
            </div>
          </div>

          {/* Result (Transparent Checkerboard Pattern) */}
          <div className="stitch-card p-5 rounded-3xl border border-indigo-500/30 space-y-3 flex flex-col items-center">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold text-indigo-400">투명 배경 누끼 결과</span>
              {hasResult && (
                <button
                  onClick={downloadResult}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  💾 PNG 저장
                </button>
              )}
            </div>
            
            <div
              className="max-h-80 overflow-hidden flex items-center justify-center rounded-2xl p-2 w-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                backgroundColor: '#0f172a'
              }}
            >
              <canvas ref={resultCanvasRef} className="max-w-full max-h-72 object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
