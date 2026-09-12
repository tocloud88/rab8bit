import React, { useEffect } from 'react';

interface AdBannerProps {
  type?: 'horizontal' | 'in-article' | 'in-feed' | 'compact' | 'leaderboard';
  slotId?: string;
  client?: string;
  className?: string;
  label?: string;
}

export default function AdBanner({
  type = 'horizontal',
  slotId = '1234567890',
  client = 'ca-pub-XXXXXXXXXXXXXXXX',
  className = '',
  label = '광고 · AD'
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // Ignore in dev/fallback
    }
  }, []);

  const dimensionClasses: Record<string, string> = {
    horizontal: 'w-full min-h-[90px] sm:min-h-[105px] max-w-5xl mx-auto my-6',
    leaderboard: 'w-full min-h-[95px] sm:min-h-[120px] max-w-6xl mx-auto my-6 sm:my-8',
    'in-article': 'w-full min-h-[160px] sm:min-h-[220px] max-w-3xl mx-auto my-8',
    'in-feed': 'w-full min-h-[180px] sm:min-h-[220px] h-full flex flex-col justify-between',
    compact: 'w-full min-h-[60px] sm:min-h-[85px] max-w-sm mx-auto my-4',
  };

  return (
    <div className={`adsense-wrapper relative overflow-hidden transition-all duration-300 rounded-2xl border border-indigo-500/20 shadow-md ${dimensionClasses[type] || ''} ${className}`}>
      {/* Policy Compliant Ad Header */}
      <div className="flex items-center justify-between px-3 py-1 bg-slate-950/70 border-b border-slate-800/80 text-[10px] text-slate-500 select-none">
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30 text-[9px]">AD</span>
          <span className="text-slate-400 font-medium">{label}</span>
        </div>
        <span className="text-[9px] text-slate-500">Google AdSense</span>
      </div>

      {/* AdSense Container */}
      <div className="p-3 sm:p-4 bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-indigo-950/30 flex flex-col items-center justify-center text-center backdrop-blur-md">
        {/* Google AdSense Official Tag Placeholder */}
        <ins
          className="adsbygoogle w-full block text-center"
          style={{ display: 'block' }}
          data-ad-client={client}
          data-ad-slot={slotId}
          data-ad-format={type === 'in-article' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />

        {/* Fallback / Preview UI */}
        <div className="adsense-fallback flex flex-col sm:flex-row items-center justify-between gap-3 w-full py-2.5 px-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/15 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-indigo-500/30 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-sm">
              {type === 'in-article' ? '💡' : '🚀'}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-200">
                {type === 'in-article' 
                  ? '실무 생산성을 극대화하는 AI 프롬프트 라이브러리' 
                  : 'rab8bit 엄선 스마트 AI 도구 & 실전 프롬프트'}
              </p>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {type === 'in-article' 
                  ? '370+ 검증된 실전 비즈니스 프롬프트와 맞춤형 GPTs 지침을 즉시 무료로 확인하세요.' 
                  : '130+ 웹 유틸리티와 최신 AI 트렌드 인사이트를 무료로 이용해 보세요.'}
              </p>
            </div>
          </div>
          <a
            href={type === 'in-article' ? '/prompts' : '/tools'}
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1"
          >
            <span>자세히 보기</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
