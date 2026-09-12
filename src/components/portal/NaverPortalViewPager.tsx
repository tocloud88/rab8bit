import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import HomePortalPanel from './HomePortalPanel';
import InsightsDirectory from '../insights/InsightsDirectory';
import AiToolsDirectory from '../ai-tools/AiToolsDirectory';
import BlogDirectory from '../blog/BlogDirectory';
import ToolsDirectory from '../tools/ToolsDirectory';
import PromptsDirectory from '../prompts/PromptsDirectory';
import GalleryDirectory from '../gallery/GalleryDirectory';
import EbooksDirectory from '../ebooks/EbooksDirectory';

export interface CategoryTab {
  id: string;
  label: string;
  href: string;
  icon?: string;
  title: string;
}

export const PORTAL_CATEGORIES: CategoryTab[] = [
  { id: 'home', label: '홈', href: '/', icon: '🏠', title: 'rab8bit | AI 인사이트, 프롬프트, 도구 & 갤러리 올인원 플랫폼' },
  { id: 'insights', label: '인사이트', href: '/insights', icon: '🎬', title: 'AI 인사이트 & 실무 팁 - rab8bit' },
  { id: 'ai-tools', label: 'AI 도구', href: '/ai-tools', icon: '🤖', title: '추천 AI 웹사이트 & 도구 모음 (172종) | rab8bit' },
  { id: 'blog', label: '블로그', href: '/blog', icon: '📝', title: 'AI 심층 블로그 & 최신 테크 아티클 | rab8bit' },
  { id: 'tools', label: '웹 도구', href: '/tools', icon: '🛠️', title: '130+ 무료 스마트 웹 도구 & 계산기 | rab8bit' },
  { id: 'prompts', label: '프롬프트', href: '/prompts', icon: '💬', title: '실무 프롬프트 라이브러리 (274종) | rab8bit' },
  { id: 'gpts', label: '챗봇지침', href: '/gpts', icon: '🤖', title: '검증된 GPTs 챗봇지침 (100종) | rab8bit' },
  { id: 'gallery', label: '바나나 갤러리', href: '/gallery', icon: '🍌', title: '바나나 AI 이미지 갤러리 | rab8bit' },
  { id: 'ebooks', label: '전자책', href: '/ebooks', icon: '📚', title: '실무 AI 전자책 라이브러리 | rab8bit' },
  { id: 'faq', label: 'FAQ', href: '/faq', icon: '❓', title: '자주 묻는 질문 (FAQ) | rab8bit' },
];

const FAQS = [
  {
    q: 'rab8bit(래빗비트)은 어떤 서비스인가요?',
    a: 'rab8bit은 최신 생성형 AI 트렌드, 검증된 프롬프트 라이브러리, 커스텀 GPTs 지침, 172+ 추천 AI 사이트 모음 및 130+ 실용 웹 유틸리티 도구를 무료로 제공하는 종합 올인원 AI 플랫폼입니다.'
  },
  {
    q: '모든 도구와 콘텐츠는 무료로 이용 가능한가요?',
    a: '네! rab8bit에서 제공하는 모든 자체 웹 도구(단위 변환기, QR코드 생성기, JSON 포맷터 등), 프롬프트 원클릭 복사, AI 인사이트 및 아티클은 회원가입이나 결제 없이 100% 무료입니다.'
  },
  {
    q: '제공되는 프롬프트는 어떤 AI 모델에서 쓸 수 있나요?',
    a: 'ChatGPT(GPT-4o, GPT-5), 구글 Gemini(Gemini 2.5/3 Pro), Anthropic Claude 3.5/3.7 Sonnet, DeepSeek, Grok, Midjourney 등 최신 주요 LLM 및 이미지 생성 모델에서 모두 검증되었습니다.'
  },
  {
    q: '모바일에서 좌우 스와이프로 어떻게 이동하나요?',
    a: '네이버 모바일 앱처럼 화면 어디서나 손가락을 좌우로 부드럽게 밀면, 이전/다음 카테고리가 한 화면에 실시간으로 펼쳐지며 자연스럽게 전환됩니다.'
  }
];

function FaqPanel() {
  return (
    <div className="w-full space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-3 py-6 px-4 rounded-3xl stitch-card border border-indigo-500/20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <span>❓</span> 자주 묻는 질문
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          도움말 & <span className="gradient-text-stitch">FAQ</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          rab8bit 서비스 이용 및 AI 도구·프롬프트 활용에 관한 핵심 질문과 답변입니다.
        </p>
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        {FAQS.map((faq, idx) => (
          <details key={idx} className="group stitch-card rounded-2xl p-4 border border-indigo-500/20 open:border-indigo-500/50 transition-all">
            <summary className="font-bold text-sm text-slate-900 dark:text-slate-100 cursor-pointer flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs shrink-0 font-extrabold">Q</span>
                <span>{faq.q}</span>
              </span>
              <span className="text-indigo-400 group-open:rotate-180 transition-transform text-sm">▼</span>
            </summary>
            <div className="pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/80 mt-3 pl-8">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

interface Props {
  initialCategoryId?: string;
}

export default function NaverPortalViewPager({ initialCategoryId = 'home' }: Props) {
  const initialIndex = useMemo(() => {
    const idx = PORTAL_CATEGORIES.findIndex(c => c.id === initialCategoryId);
    return idx >= 0 ? idx : 0;
  }, [initialCategoryId]);

  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [loadedTabs, setLoadedTabs] = useState<Set<number>>(() => new Set([initialIndex, Math.max(0, initialIndex - 1), Math.min(PORTAL_CATEGORIES.length - 1, initialIndex + 1)]));
  
  // Drag and animation transition state
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const transitionTimer = useRef<any>(null);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  
  const touchStartPos = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const isTouchLocked = useRef<boolean>(false);
  const isHorizontal = useRef<boolean>(false);

  // Mark tab as loaded
  const ensureTabLoaded = useCallback((idx: number) => {
    setLoadedTabs(prev => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      if (idx > 0) next.add(idx - 1);
      if (idx < PORTAL_CATEGORIES.length - 1) next.add(idx + 1);
      return next;
    });
  }, []);

  // Update active index and sync URL
  const changeTab = useCallback((newIdx: number, replaceUrl = true) => {
    if (newIdx < 0 || newIdx >= PORTAL_CATEGORIES.length) return;
    setActiveIndex(newIdx);
    setDragDeltaX(0);
    setIsDragging(false);
    setIsTransitioning(true);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 320);
    ensureTabLoaded(newIdx);

    const targetCat = PORTAL_CATEGORIES[newIdx];
    if (replaceUrl && typeof window !== 'undefined' && targetCat) {
      if (window.location.pathname !== targetCat.href) {
        window.history.replaceState(null, '', targetCat.href);
      }
      document.title = targetCat.title;
    }

    // Scroll active tab to center in Naver style
    const targetTabEl = tabRefs.current[newIdx];
    const navBar = tabContainerRef.current;
    if (targetTabEl && navBar) {
      const navRect = navBar.getBoundingClientRect();
      const itemRect = targetTabEl.getBoundingClientRect();
      const scrollLeft = targetTabEl.offsetLeft - (navRect.width / 2) + (itemRect.width / 2);
      navBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [ensureTabLoaded]);

  // Handle URL popstate / initial sync
  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      let idx = -1;
      if (path === '/' || path === '/index.html') {
        idx = PORTAL_CATEGORIES.findIndex(c => c.id === 'home');
      } else {
        idx = PORTAL_CATEGORIES.findIndex(c => c.id !== 'home' && (c.href === path || path.startsWith(c.href)));
      }
      if (idx >= 0 && idx !== activeIndex) {
        changeTab(idx, false);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [activeIndex, changeTab]);

  // Initial tab center on mount
  useEffect(() => {
    const targetTabEl = tabRefs.current[activeIndex];
    const navBar = tabContainerRef.current;
    if (targetTabEl && navBar) {
      setTimeout(() => {
        const navRect = navBar.getBoundingClientRect();
        const itemRect = targetTabEl.getBoundingClientRect();
        const scrollLeft = targetTabEl.offsetLeft - (navRect.width / 2) + (itemRect.width / 2);
        navBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }, 50);
    }
  }, [activeIndex]);

  // Touch Handlers for Naver-style multi-panel continuous slide
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const target = e.target as HTMLElement;
    // Don't drag when touching interactive widgets, code, form controls
    if (target.closest('input, textarea, select, pre, code, canvas, button, a, [data-no-swipe], .no-swipe')) {
      return;
    }

    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
    isTouchLocked.current = false;
    isHorizontal.current = false;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const curX = e.touches[0].clientX;
    const curY = e.touches[0].clientY;
    const deltaX = curX - touchStartPos.current.x;
    const deltaY = curY - touchStartPos.current.y;

    // Lock direction after 8px threshold
    if (!isTouchLocked.current) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX > 8 || absY > 8) {
        isTouchLocked.current = true;
        if (absY >= absX) {
          // Vertical scroll: cancel horizontal viewpager drag
          isHorizontal.current = false;
          setIsDragging(false);
          setDragDeltaX(0);
          return;
        } else {
          isHorizontal.current = true;
        }
      }
    }

    if (!isHorizontal.current) return;

    // Boundary rubber-band resistance
    let effectiveDeltaX = deltaX;
    if ((deltaX > 0 && activeIndex === 0) || (deltaX < 0 && activeIndex === PORTAL_CATEGORIES.length - 1)) {
      effectiveDeltaX = deltaX * 0.22; // Elastic resistance
    }

    setDragDeltaX(effectiveDeltaX);

    // Preload approaching tab
    if (deltaX < -30 && activeIndex < PORTAL_CATEGORIES.length - 1) {
      ensureTabLoaded(activeIndex + 1);
    } else if (deltaX > 30 && activeIndex > 0) {
      ensureTabLoaded(activeIndex - 1);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isHorizontal.current) {
      setIsDragging(false);
      setDragDeltaX(0);
      return;
    }

    setIsDragging(false);
    const duration = Math.max(1, Date.now() - touchStartPos.current.time);
    const velocity = Math.abs(dragDeltaX) / duration;
    const threshold = 45; // 45px drag or fast flick
    const isFlick = velocity > 0.30 && Math.abs(dragDeltaX) > 20;

    let targetIdx = activeIndex;
    if ((dragDeltaX < -threshold || (dragDeltaX < -20 && isFlick)) && activeIndex < PORTAL_CATEGORIES.length - 1) {
      targetIdx = activeIndex + 1;
    } else if ((dragDeltaX > threshold || (dragDeltaX > 20 && isFlick)) && activeIndex > 0) {
      targetIdx = activeIndex - 1;
    }

    setDragDeltaX(0);
    changeTab(targetIdx, true);
  };

  // Render individual category panel with rich hero header and directory content
  const renderPanelContent = (tabId: string, idx: number) => {
    if (!loadedTabs.has(idx)) {
      return (
        <div className="w-full py-20 flex flex-col items-center justify-center text-slate-400">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs mt-3 font-bold">콘텐츠 로딩 중...</span>
        </div>
      );
    }

    switch (tabId) {
      case 'home':
        return (
          <HomePortalPanel
            onNavigateTab={(targetTabId) => {
              const targetIdx = PORTAL_CATEGORIES.findIndex(c => c.id === targetTabId);
              if (targetIdx >= 0) changeTab(targetIdx, true);
            }}
          />
        );
      case 'insights':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                <span>🎬</span> 실무 영상 & 인사이트 라이브러리
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                AI 인사이트 <span className="gradient-text-stitch">아카이브</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                유튜브 실무 튜토리얼 영상과 연동된 핵심 자료, 실전 프롬프트 및 다운로드 링크를 제공합니다.
              </p>
            </div>
            <InsightsDirectory />
          </div>
        );
      case 'ai-tools':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <span>🤖</span> 2026 최신 172+ 엄선 AI 도구
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                추천 <span className="gradient-text-stitch">AI 웹사이트 & 도구 모음</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Claude Code, Operator, Flux 1.1, Kling, Bolt.new 등 실무 생산성을 극대화하는 글로벌 AI 도구 모음입니다.
              </p>
            </div>
            <AiToolsDirectory />
          </div>
        );
      case 'blog':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                <span>📝</span> 56편의 실무 AI 심층 아티클
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                AI 인사이트 <span className="gradient-text-stitch">블로그</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                실질적인 활용법과 검증된 테크닉만을 엄선하여 깊이 있는 가이드를 제공합니다.
              </p>
            </div>
            <BlogDirectory />
          </div>
        );
      case 'tools':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                <span>🛠️</span> 130+ 인터랙티브 스마트 도구
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                스마트 웹 <span className="gradient-text-stitch">유틸리티 모음</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                급여 계산기, 퇴직금 계산기, JSON 포맷터, QR코드 생성기 등 매일 쓰는 생산성 도구 모음입니다.
              </p>
            </div>
            <ToolsDirectory />
          </div>
        );
      case 'prompts':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold">
                <span>💬</span> 274+ 실무 검증 프롬프트
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                실전 <span className="gradient-text-stitch">프롬프트 라이브러리</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                ChatGPT, Claude, Gemini에서 원클릭으로 복사하여 즉시 결과를 도출하는 검증된 프롬프트입니다.
              </p>
            </div>
            <PromptsDirectory initialTab="prompts" />
          </div>
        );
      case 'gpts':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                <span>🤖</span> 100+ 커스텀 GPTs 지침
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                챗봇지침 <span className="gradient-text-stitch">(GPTs) 모음</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                나만의 AI 어시스턴트, 전문가 어드바이저, 코딩 튜터를 구축하는 시스템 프롬프트 모음입니다.
              </p>
            </div>
            <PromptsDirectory initialTab="gpts" />
          </div>
        );
      case 'gallery':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold">
                <span>🍌</span> 바나나 AI 이미지 갤러리
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                고화질 AI <span className="gradient-text-stitch">아트워크 & 프롬프트</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                미드저니, FLUX.1, DALL-E로 생성한 고퀄리티 이미지와 프롬프트 복사 기능을 제공합니다.
              </p>
            </div>
            <GalleryDirectory />
          </div>
        );
      case 'ebooks':
        return (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 py-4 px-4 rounded-3xl stitch-card border border-indigo-500/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <span>📚</span> 실무 AI 전자책
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                AI 실전 <span className="gradient-text-stitch">전자책 라이브러리</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                제미나이 실무 매뉴얼, 프롬프트 가이드북 등 다운로드 가능한 실무 전자책 모음입니다.
              </p>
            </div>
            <EbooksDirectory />
          </div>
        );
      case 'faq':
        return <FaqPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Naver-Style Stationary Sub-Header Tab Bar (Mobile only < 1024px, hidden on desktop to avoid duplicate menu) */}
      <div className="lg:hidden relative w-full bg-[var(--bg-header)] border-b border-[var(--header-border)]">
        {/* Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[var(--bg-header)] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-[var(--bg-header)] to-transparent z-10"></div>

        {/* Scrollable Tab Row */}
        <div
          ref={tabContainerRef}
          className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto scrollbar-none scroll-smooth select-none w-full"
        >
          {PORTAL_CATEGORIES.map((cat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={cat.id}
                ref={el => { tabRefs.current[idx] = el; }}
                onClick={() => changeTab(idx, true)}
                className={`relative flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-md shadow-indigo-500/30 scale-[1.03]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 active:scale-95'
                }`}
              >
                {cat.icon && <span className="text-xs">{cat.icon}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Naver Multi-Panel Continuous Touch ViewPager */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="w-full overflow-hidden relative touch-pan-y min-h-[70vh] pt-3 sm:pt-4"
      >
        {/* Continuous Horizontal Flex Track */}
        <div
          className="flex w-full will-change-transform items-start"
          style={{
            transform: `translate3d(calc(-${activeIndex * 100}% + ${dragDeltaX}px), 0, 0)`,
            transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {PORTAL_CATEGORIES.map((cat, idx) => {
            const isCurrent = idx === activeIndex;
            const isAdjacent = Math.abs(idx - activeIndex) <= 1;
            const shouldHaveHeight = isCurrent || (isDragging && isAdjacent) || isTransitioning;

            return (
              <div
                key={cat.id}
                className={`w-full shrink-0 min-w-full box-border px-3 sm:px-0 ${
                  shouldHaveHeight 
                    ? 'block' 
                    : 'h-0 max-h-0 overflow-hidden invisible pointer-events-none select-none'
                }`}
                style={{ width: '100%' }}
                aria-hidden={!isCurrent}
              >
                {renderPanelContent(cat.id, idx)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
