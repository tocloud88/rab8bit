import React, { useState, useEffect, useRef } from 'react';
import { Copy, Users, Play, Eye } from 'lucide-react';

interface HorizontalLine {
  col: number; // 0-indexed column (left side of the rung)
  y: number;   // 0 to 1 ratio from top to bottom
}

interface Player {
  id: number;
  name: string;
}

interface Result {
  id: number;
  value: string;
}

export default function LadderGame() {
  const [numPlayers, setNumPlayers] = useState<number>(4);
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: 4 }).map((_, i) => ({ id: i, name: `참가자 ${i + 1}` }))
  );
  const [results, setResults] = useState<Result[]>(
    Array.from({ length: 4 }).map((_, i) => ({ id: i, value: `결과 ${i + 1}` }))
  );
  
  const [lines, setLines] = useState<HorizontalLine[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [activePath, setActivePath] = useState<{ x: number, y: number }[] | null>(null);
  const [activePlayer, setActivePlayer] = useState<number | null>(null);
  const [showAllResults, setShowAllResults] = useState(false);
  const [finalMappings, setFinalMappings] = useState<Record<number, number>>({});

  const svgRef = useRef<SVGSVGElement>(null);

  // Generate random ladder
  const generateLadder = () => {
    const newLines: HorizontalLine[] = [];
    const gaps = numPlayers - 1;
    
    // We want to avoid horizontal lines being too close vertically
    const minYSeparation = 0.05;
    
    for (let c = 0; c < gaps; c++) {
      const numLinesInCol = Math.floor(Math.random() * 3) + 2; // 2 to 4 lines per gap
      
      for (let l = 0; l < numLinesInCol; l++) {
        let y = 0;
        let valid = false;
        let attempts = 0;
        
        while (!valid && attempts < 50) {
          // Y position between 10% and 90% of height
          y = 0.1 + (Math.random() * 0.8);
          
          // Check collision with lines in same column, left column, right column
          const collision = newLines.some(line => 
            (line.col === c || line.col === c - 1 || line.col === c + 1) && 
            Math.abs(line.y - y) < minYSeparation
          );
          
          if (!collision) valid = true;
          attempts++;
        }
        
        if (valid) {
          newLines.push({ col: c, y });
        }
      }
    }
    
    // Sort lines by Y for easier traversal
    newLines.sort((a, b) => a.y - b.y);
    setLines(newLines);
    setGameStarted(true);
    setActivePath(null);
    setActivePlayer(null);
    setShowAllResults(false);
    
    // Pre-calculate all results
    const mappings: Record<number, number> = {};
    for (let p = 0; p < numPlayers; p++) {
      mappings[p] = calculateDestination(p, newLines);
    }
    setFinalMappings(mappings);
  };

  const calculateDestination = (startCol: number, currentLines: HorizontalLine[]) => {
    let currentCol = startCol;
    for (const line of currentLines) {
      if (line.col === currentCol) {
        currentCol++; // Move right
      } else if (line.col === currentCol - 1) {
        currentCol--; // Move left
      }
    }
    return currentCol;
  };

  const playAnimation = (startPlayerIndex: number) => {
    setActivePlayer(startPlayerIndex);
    setShowAllResults(false);
    
    const path = [{ x: startPlayerIndex, y: 0 }];
    let currentCol = startPlayerIndex;
    
    for (const line of lines) {
      if (line.col === currentCol) {
        path.push({ x: currentCol, y: line.y });
        path.push({ x: currentCol + 1, y: line.y });
        currentCol++;
      } else if (line.col === currentCol - 1) {
        path.push({ x: currentCol, y: line.y });
        path.push({ x: currentCol - 1, y: line.y });
        currentCol--;
      }
    }
    
    path.push({ x: currentCol, y: 1 });
    setActivePath(path);
  };

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(e.target.value, 10);
    setNumPlayers(num);
    setGameStarted(false);
    
    setPlayers(Array.from({ length: num }).map((_, i) => ({ 
      id: i, 
      name: players[i]?.name || `참가자 ${i + 1}` 
    })));
    
    setResults(Array.from({ length: num }).map((_, i) => ({ 
      id: i, 
      value: results[i]?.value || (i === 0 ? '당첨!' : '꽝')
    })));
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    const data = {
      p: players.map(p => p.name),
      r: results.map(r => r.value)
    };
    url.searchParams.set('data', btoa(encodeURIComponent(JSON.stringify(data))));
    navigator.clipboard.writeText(url.toString());
    alert('결과 링크가 복사되었습니다! 단톡방에 공유해보세요.');
  };

  // Check URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(dataParam)));
        if (decoded.p && decoded.r && decoded.p.length === decoded.r.length) {
          const len = decoded.p.length;
          setNumPlayers(len);
          setPlayers(decoded.p.map((name: string, i: number) => ({ id: i, name })));
          setResults(decoded.r.map((value: string, i: number) => ({ id: i, value })));
        }
      } catch (e) {
        console.error('Invalid shared data');
      }
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10">
      
      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Users className="w-5 h-5" />
            참가자 수
          </label>
          <select 
            value={numPlayers} 
            onChange={handleNumPlayersChange}
            disabled={gameStarted}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 11 }).map((_, i) => (
              <option key={i + 2} value={i + 2}>{i + 2}명</option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2">
          {!gameStarted ? (
            <button 
              onClick={generateLadder}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> 사다리 생성 및 시작
            </button>
          ) : (
            <>
              <button 
                onClick={() => setShowAllResults(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                <Eye className="w-4 h-4" /> 전체 결과 보기
              </button>
              <button 
                onClick={() => {
                  setGameStarted(false);
                  setActivePath(null);
                  setActivePlayer(null);
                  setShowAllResults(false);
                }}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
              >
                다시 설정
              </button>
            </>
          )}
          <button 
            onClick={handleShare}
            className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
            title="결과 링크 복사"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Ladder Area */}
      <div className="relative w-full overflow-x-auto pb-8 pt-4">
        <div className="min-w-[600px] flex flex-col items-center select-none">
          
          {/* Top Players */}
          <div className="flex w-full justify-between px-8 mb-4">
            {players.map((p, i) => (
              <div key={p.id} className="flex flex-col items-center gap-2 flex-1" style={{ zIndex: 10 }}>
                <input
                  type="text"
                  value={p.name}
                  disabled={gameStarted}
                  onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[i].name = e.target.value;
                    setPlayers(newPlayers);
                  }}
                  className={`w-20 text-center font-bold px-2 py-1.5 border rounded-md text-sm outline-none transition-colors ${
                    activePlayer === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:border-blue-500'
                  } ${gameStarted && activePlayer !== i ? 'opacity-50' : 'opacity-100'}`}
                />
                {gameStarted && !showAllResults && (
                  <button 
                    onClick={() => playAnimation(i)}
                    className="text-xs px-3 py-1 bg-slate-200 hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-800 dark:hover:bg-blue-900/50 rounded-full transition-colors"
                  >
                    출발 ↓
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* SVG Canvas for Lines */}
          <div className="w-full px-8 relative h-[400px]">
            {gameStarted && (
              <svg 
                ref={svgRef}
                className="w-full h-full absolute inset-0 px-8 overflow-visible" 
                preserveAspectRatio="none"
              >
                {/* Vertical Lines */}
                {Array.from({ length: numPlayers }).map((_, i) => {
                  const x = `${(i / (numPlayers - 1)) * 100}%`;
                  return (
                    <line 
                      key={`v-${i}`}
                      x1={x} y1="0" x2={x} y2="100%" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      className="text-slate-300 dark:text-slate-700"
                    />
                  );
                })}

                {/* Horizontal Lines */}
                {lines.map((line, i) => {
                  const x1 = `${(line.col / (numPlayers - 1)) * 100}%`;
                  const x2 = `${((line.col + 1) / (numPlayers - 1)) * 100}%`;
                  const y = `${line.y * 100}%`;
                  return (
                    <line 
                      key={`h-${i}`}
                      x1={x1} y1={y} x2={x2} y2={y} 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      className="text-slate-300 dark:text-slate-700"
                    />
                  );
                })}

                {/* Animated Path */}
                {activePath && (
                  <path
                    d={`M ${activePath.map(p => `${(p.x / (numPlayers - 1)) * 100} ${p.y * 100}`).join(' L ')}`}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-md"
                    style={{
                      strokeDasharray: 2000,
                      strokeDashoffset: 2000,
                      animation: 'dash 1.5s ease-in-out forwards'
                    }}
                  />
                )}
                
                {/* Show All Results Paths */}
                {showAllResults && Array.from({ length: numPlayers }).map((_, pIdx) => {
                  const path = [{ x: pIdx, y: 0 }];
                  let currentCol = pIdx;
                  for (const line of lines) {
                    if (line.col === currentCol) {
                      path.push({ x: currentCol, y: line.y });
                      path.push({ x: currentCol + 1, y: line.y });
                      currentCol++;
                    } else if (line.col === currentCol - 1) {
                      path.push({ x: currentCol, y: line.y });
                      path.push({ x: currentCol - 1, y: line.y });
                      currentCol--;
                    }
                  }
                  path.push({ x: currentCol, y: 1 });
                  
                  // Use different colors for different players
                  const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#64748b'];
                  
                  return (
                    <path
                      key={`all-${pIdx}`}
                      d={`M ${path.map(p => `${(p.x / (numPlayers - 1)) * 100} ${p.y * 100}`).join(' L ')}`}
                      fill="none"
                      stroke={colors[pIdx % colors.length]}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.6"
                      className="drop-shadow-sm"
                    />
                  );
                })}
              </svg>
            )}
            
            {/* CSS for SVG Animation */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes dash {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}} />
          </div>

          {/* Bottom Results */}
          <div className="flex w-full justify-between px-8 mt-4">
            {results.map((r, i) => {
              const isDestination = activePlayer !== null && finalMappings[activePlayer] === i;
              
              return (
                <div key={r.id} className="flex flex-col items-center gap-2 flex-1" style={{ zIndex: 10 }}>
                  <input
                    type="text"
                    value={r.value}
                    disabled={gameStarted}
                    onChange={(e) => {
                      const newResults = [...results];
                      newResults[i].value = e.target.value;
                      setResults(newResults);
                    }}
                    className={`w-20 text-center font-bold px-2 py-1.5 border rounded-md text-sm outline-none transition-colors ${
                      isDestination 
                        ? 'bg-red-500 text-white border-red-500 ring-4 ring-red-500/20' 
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:border-red-400'
                    } ${gameStarted && activePlayer !== null && !isDestination && !showAllResults ? 'opacity-50' : 'opacity-100'}`}
                  />
                  {showAllResults && (
                    <div className="mt-2 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      ← {players.find((_, idx) => finalMappings[idx] === i)?.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  );
}
