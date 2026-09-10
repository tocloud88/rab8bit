import React, { useState, useMemo } from 'react';

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InJhYjhiaXQiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTc2NzIwODAwMCwiaXNzdWVyIjoiaHR0cHM6Ly9yYWI4Yml0LmNvbSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE_JWT);

  const decoded = useMemo(() => {
    if (!token.trim()) return null;

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return { error: '유효한 JWT 형식이 아닙니다 (Header.Payload.Signature 형태여야 합니다).' };
    }

    try {
      const base64UrlDecode = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const signature = parts[2];

      // Expiration check
      let isExpired = false;
      let expDateStr = null;
      if (payload.exp) {
        const expTime = new Date(payload.exp * 1000);
        isExpired = expTime < new Date();
        expDateStr = expTime.toLocaleString('ko-KR');
      }

      let iatDateStr = null;
      if (payload.iat) {
        iatDateStr = new Date(payload.iat * 1000).toLocaleString('ko-KR');
      }

      return {
        header,
        payload,
        signature,
        isExpired,
        expDateStr,
        iatDateStr,
        parts
      };
    } catch (err: any) {
      return { error: '토큰 디코딩 중 오류가 발생했습니다. Base64 인코딩 상태를 확인하세요.' };
    }
  }, [token]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Token Input */}
      <div className="stitch-card p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-white flex items-center gap-2">
            <span>🔑</span> JWT (JSON Web Token) 인코딩 문자열 입력
          </label>
          <button
            onClick={() => setToken('')}
            className="text-xs text-slate-400 hover:text-white"
          >
            지우기
          </button>
        </div>

        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="여기에 JWT 토큰을 붙여넣으세요..."
          rows={5}
          className="w-full bg-slate-950/80 text-xs sm:text-sm font-mono text-slate-200 p-4 rounded-2xl border border-indigo-500/30 focus:outline-none focus:border-indigo-500 break-all leading-relaxed"
        />

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>구분:</span>
          <span className="text-red-400 font-mono font-bold">Header (빨간색)</span>
          <span>·</span>
          <span className="text-purple-400 font-mono font-bold">Payload (보라색)</span>
          <span>·</span>
          <span className="text-cyan-400 font-mono font-bold">Signature (하늘색)</span>
        </div>
      </div>

      {/* Decoded Results */}
      {decoded && !decoded.error && (
        <div className="space-y-4">
          {/* Status Alert Banner */}
          {decoded.expDateStr && (
            <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold ${
              decoded.isExpired
                ? 'bg-red-950/30 border-red-500/40 text-red-300'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
            }`}>
              <span>
                {decoded.isExpired ? '⚠️ 만료된 토큰입니다' : '✅ 유효한 토큰입니다'} (만료 일시: {decoded.expDateStr})
              </span>
              {decoded.iatDateStr && (
                <span className="text-slate-400 font-normal">발행 일시: {decoded.iatDateStr}</span>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Header Box */}
            <div className="stitch-card p-5 rounded-3xl border border-red-500/30 bg-slate-900/80 space-y-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">HEADER: 알고리즘 및 토큰 타입</span>
              <pre className="p-4 bg-slate-950/90 rounded-2xl text-xs font-mono text-red-300 overflow-x-auto border border-red-500/20">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload Box */}
            <div className="stitch-card p-5 rounded-3xl border border-purple-500/30 bg-slate-900/80 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">PAYLOAD: 데이터(클레임) 내용</span>
              <pre className="p-4 bg-slate-950/90 rounded-2xl text-xs font-mono text-purple-300 overflow-x-auto border border-purple-500/20">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {decoded && decoded.error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-bold">
          {decoded.error}
        </div>
      )}
    </div>
  );
}
