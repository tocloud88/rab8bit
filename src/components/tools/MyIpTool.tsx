import React, { useState, useEffect } from 'react';

export default function MyIpTool() {
  const [ipData, setIpData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [userAgent, setUserAgent] = useState('');

  useEffect(() => {
    setUserAgent(navigator.userAgent);
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setIpData({ ip: data.ip });
        setLoading(false);
      })
      .catch(() => {
        // Fallback
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            setIpData(data);
            setLoading(false);
          })
          .catch(() => {
            setIpData({ ip: '확인 불가 (네트워크 상태를 확인하세요)' });
            setLoading(false);
          });
      });
  }, []);

  const handleCopyIp = async () => {
    if (!ipData?.ip) return;
    await navigator.clipboard.writeText(ipData.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Big IP Banner Card */}
      <div className="stitch-card p-8 sm:p-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/60 shadow-2xl text-center space-y-4">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">내 공인 IP 주소 (Public IP)</span>
        
        {loading ? (
          <div className="text-2xl font-bold text-slate-400 animate-pulse">
            IP 주소 조회 중...
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight select-all">
              {ipData?.ip}
            </h2>

            <button
              onClick={handleCopyIp}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              {copied ? '✓ IP 주소 복사완료' : '📋 IP 주소 복사하기'}
            </button>
          </div>
        )}
      </div>

      {/* Network & Browser Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stitch-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <span>🌐</span> 네트워크 및 환경 정보
          </h3>
          <div className="space-y-2 text-xs font-semibold">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">네트워크 상태</span>
              <span className="text-emerald-400">온라인 (Online)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">화면 해상도</span>
              <span className="text-slate-200">{typeof window !== 'undefined' ? `${window.screen.width} x ${window.screen.height}` : '-'}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">언어 (Language)</span>
              <span className="text-slate-200">{typeof navigator !== 'undefined' ? navigator.language : 'ko-KR'}</span>
            </div>
          </div>
        </div>

        <div className="stitch-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <span>💻</span> User-Agent 정보
          </h3>
          <p className="text-xs font-mono text-slate-400 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 break-all leading-relaxed">
            {userAgent || '브라우저 정보 확인 중...'}
          </p>
        </div>
      </div>
    </div>
  );
}
