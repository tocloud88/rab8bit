import React from 'react';
import { EBOOKS_DATA } from '../../data/ebooksData';

export default function EbooksDirectory() {
  return (
    <div className="space-y-6">
      {/* Grid: 4 cols on Web, 2 cols on Mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {EBOOKS_DATA.map((item) => (
          <div
            key={item.id}
            className="stitch-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950/40 to-slate-900 text-emerald-400 p-4 text-center">
                  <span className="text-3xl mb-2">📚</span>
                  <span className="text-xs font-bold">{item.title}</span>
                </div>
              )}
              {item.is_new ? (
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md">
                  NEW
                </span>
              ) : null}
            </div>

            {/* Content */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800/80">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1 border border-emerald-500/30"
                >
                  <span>📖</span>
                  <span>가이드북 열기</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
