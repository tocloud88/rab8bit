import React, { useState } from 'react';
import type { InteractiveToolItem } from '../../data/interactiveToolsData';

interface ToolCardVisualProps {
  tool: InteractiveToolItem;
}

export default function ToolCardVisual({ tool }: ToolCardVisualProps) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = `/images/tools/${tool.slug}.jpg`;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 flex items-center justify-center select-none border-b border-white/10 group-hover:border-indigo-500/30 transition-colors">
      
      {/* 16:9 Full Graphic Illustration Image */}
      {!imgError ? (
        <img
          src={imageSrc}
          alt={tool.title}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
          <span className="text-4xl">{tool.icon}</span>
        </div>
      )}

      {/* Subtle vignette / overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

      {/* Top-Left Category Badge */}
      <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-md">
          {tool.category}
        </span>
      </div>

      {/* Top-Right Highlight Badge if exists */}
      {tool.badge && (
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg border border-white/20">
            {tool.badge}
          </span>
        </div>
      )}
    </div>
  );
}

