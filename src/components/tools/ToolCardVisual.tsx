import React from 'react';
import type { InteractiveToolItem } from '../../data/interactiveToolsData';

interface ToolCardVisualProps {
  tool: InteractiveToolItem;
}

// Category theme palette definition
interface CategoryTheme {
  bgGradient: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  pattern: string;
  floatingGlyphs: string[];
}

const THEMES: Record<string, CategoryTheme> = {
  '변환/계산': {
    bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
    glowColor: 'bg-emerald-500/25',
    badgeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    badgeText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/30',
    pattern: 'math',
    floatingGlyphs: ['%', '₩', '+', '=', '📊', '📈']
  },
  '지식/정보': {
    bgGradient: 'from-blue-950 via-indigo-900 to-slate-950',
    glowColor: 'bg-blue-500/25',
    badgeBg: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
    badgeText: 'text-blue-400',
    accentBorder: 'border-blue-500/30',
    pattern: 'network',
    floatingGlyphs: ['✦', '💡', '🔍', '🌐', '📚', '⚡']
  },
  '게임/추첨': {
    bgGradient: 'from-fuchsia-950 via-purple-900 to-slate-950',
    glowColor: 'bg-fuchsia-500/25',
    badgeBg: 'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300',
    badgeText: 'text-fuchsia-400',
    accentBorder: 'border-fuchsia-500/30',
    pattern: 'dots',
    floatingGlyphs: ['🎯', '🎲', '🎰', '✨', '⚡', '🏆']
  },
  '개발자': {
    bgGradient: 'from-cyan-950 via-slate-900 to-blue-950',
    glowColor: 'bg-cyan-500/25',
    badgeBg: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
    badgeText: 'text-cyan-400',
    accentBorder: 'border-cyan-500/30',
    pattern: 'code',
    floatingGlyphs: ['</>', '{ }', '01', 'λ', '⚡', '//']
  },
  '텍스트': {
    bgGradient: 'from-amber-950 via-orange-900 to-slate-950',
    glowColor: 'bg-amber-500/25',
    badgeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    badgeText: 'text-amber-400',
    accentBorder: 'border-amber-500/30',
    pattern: 'typography',
    floatingGlyphs: ['Aa', '¶', '”', '✍️', '📝', '✦']
  },
  '이미지/미디어': {
    bgGradient: 'from-violet-950 via-pink-900 to-slate-950',
    glowColor: 'bg-pink-500/25',
    badgeBg: 'bg-pink-500/20 border-pink-500/40 text-pink-300',
    badgeText: 'text-pink-400',
    accentBorder: 'border-pink-500/30',
    pattern: 'media',
    floatingGlyphs: ['🎨', '🖼️', '✂️', '✦', '📐', '🌈']
  }
};

const DEFAULT_THEME: CategoryTheme = {
  bgGradient: 'from-indigo-950 via-slate-900 to-slate-950',
  glowColor: 'bg-indigo-500/25',
  badgeBg: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
  badgeText: 'text-indigo-400',
  accentBorder: 'border-indigo-500/30',
  pattern: 'general',
  floatingGlyphs: ['⚡', '✦', '🛠️', '✨', '⚙️', '💡']
};

export default function ToolCardVisual({ tool }: ToolCardVisualProps) {
  const theme = THEMES[tool.category] || DEFAULT_THEME;

  return (
    <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center select-none border-b border-white/10 group-hover:border-indigo-500/30 transition-colors`}>
      
      {/* Background Graphic Grid / Noise */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Ambient Central Glow Orb */}
      <div className={`absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full ${theme.glowColor} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

      {/* Floating Category Ambient Glyphs */}
      <span className="absolute top-3 left-4 text-[10px] sm:text-xs font-mono font-bold text-white/15 select-none pointer-events-none">
        {theme.floatingGlyphs[0]}
      </span>
      <span className="absolute bottom-3 right-4 text-[10px] sm:text-xs font-mono font-bold text-white/15 select-none pointer-events-none">
        {theme.floatingGlyphs[1]}
      </span>
      <span className="absolute top-3 right-12 text-[9px] font-mono font-bold text-white/10 select-none pointer-events-none">
        {theme.floatingGlyphs[2]}
      </span>
      <span className="absolute bottom-3 left-12 text-[9px] font-mono font-bold text-white/10 select-none pointer-events-none">
        {theme.floatingGlyphs[3]}
      </span>

      {/* Top-Left Category Badge */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border backdrop-blur-md ${theme.badgeBg} shadow-sm`}>
          {tool.category}
        </span>
      </div>

      {/* Top-Right Highlight Badge if exists */}
      {tool.badge && (
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md border border-white/20">
            {tool.badge}
          </span>
        </div>
      )}

      {/* Center 16:9 Hero Graphic: Floating Glassmorphic 3D Icon Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/40 border border-white/20 backdrop-blur-xl shadow-2xl group-hover:border-white/40 group-hover:shadow-indigo-500/20 transition-all">
          <span className="text-3xl sm:text-4xl filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]">
            {tool.icon}
          </span>
        </div>
      </div>

      {/* Bottom Gradient Fade to merge smoothly into card body */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
    </div>
  );
}
