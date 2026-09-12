import React, { useState } from 'react';
import type { InteractiveToolItem } from '../../data/interactiveToolsData';

interface ToolCardVisualProps {
  tool: InteractiveToolItem;
}

export default function ToolCardVisual({ tool }: ToolCardVisualProps) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = `/images/tools/${tool.slug}.jpg?v=v30tools`;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center select-none border-b border-white/10 group-hover:border-indigo-500/40 transition-all duration-300">
      
      {/* 16:9 Full Graphic Illustration Image */}
      {!imgError ? (
        <img
          src={imageSrc}
          alt={tool.title}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-4">
          <span className="text-4xl mb-2">{tool.icon}</span>
          <span className="text-sm font-black text-white">{tool.title}</span>
        </div>
      )}

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

