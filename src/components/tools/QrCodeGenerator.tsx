import React, { useState, useRef, useEffect } from 'react';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://rab8bit.com');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(250);
  const [qrType, setQrType] = useState<'url' | 'wifi' | 'text'>('url');

  // Wi-Fi fields
  const [wifiSsid, setWifiSsid] = useState('MyHomeWifi');
  const [wifiPass, setWifiPass] = useState('password123');
  const [wifiType, setWifiType] = useState('WPA');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute final QR content
  const qrContent = React.useMemo(() => {
    if (qrType === 'wifi') {
      return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
    }
    return text;
  }, [qrType, text, wifiSsid, wifiPass, wifiType]);

  // Generate QR on Canvas using Google Chart API or standard QR image fallback
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    const encoded = encodeURIComponent(qrContent || 'https://rab8bit.com');
    // Using high quality quick QR endpoint
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encoded}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&margin=2`;

    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx.drawImage(img, 0, 0, qrSize, qrSize);
    };
  }, [qrContent, fgColor, bgColor, qrSize]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `rab8bit-qrcode-${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Type Selector Tabs */}
      <div className="flex items-center justify-center p-1.5 bg-slate-900/90 rounded-2xl border border-indigo-500/20 max-w-md mx-auto">
        <button
          onClick={() => setQrType('url')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            qrType === 'url' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          🔗 웹사이트 URL
        </button>
        <button
          onClick={() => setQrType('wifi')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            qrType === 'wifi' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          📶 와이파이(Wi-Fi)
        </button>
        <button
          onClick={() => setQrType('text')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            qrType === 'text' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          📝 일반 텍스트
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
            {qrType !== 'wifi' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  {qrType === 'url' ? '웹사이트 주소 (URL)' : '변환할 텍스트'}
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-slate-950/80 text-white px-4 py-3 rounded-2xl border border-indigo-500/30 font-semibold focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">와이파이 이름 (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="w-full bg-slate-950/80 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs sm:text-sm font-bold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">와이파이 비밀번호</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    className="w-full bg-slate-950/80 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs sm:text-sm font-bold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">보안 방식</label>
                  <select
                    value={wifiType}
                    onChange={(e) => setWifiType(e.target.value)}
                    className="w-full bg-slate-950/80 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-bold focus:outline-none"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3 (기본)</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">비밀번호 없음 (Open)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">QR 코드 색상</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-none"
                  />
                  <span className="text-xs font-mono text-slate-300">{fgColor}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">배경 색상</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-none"
                  />
                  <span className="text-xs font-mono text-slate-300">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live QR Preview & Download */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="stitch-card p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl flex flex-col items-center justify-center">
            <div className="p-3 bg-white rounded-2xl shadow-inner inline-block">
              <canvas
                ref={canvasRef}
                width={qrSize}
                height={qrSize}
                className="rounded-lg w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]"
              />
            </div>

            <button
              onClick={downloadPng}
              className="mt-6 w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>💾 PNG 이미지로 다운로드</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
