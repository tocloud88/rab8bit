import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Flame, Coffee, Sparkles } from 'lucide-react';

export default function PomodoroTimer() {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cycles, setCycles] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const modeTimes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCycles(c => c + 1);
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modeTimes[newMode]);
  };

  const toggleNoise = () => {
    if (!soundEnabled) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Generate Pink/Brownish noise for concentration
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.15; // gentle volume

        noise.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start(0);

        noiseNodeRef.current = noise;
        setSoundEnabled(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setSoundEnabled(false);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-10 rounded-3xl border border-indigo-500/20 shadow-xl text-center space-y-6">
        <div className="inline-flex p-1.5 bg-slate-900 rounded-2xl border border-slate-800 gap-1">
          <button
            onClick={() => switchMode('focus')}
            className={'py-2 px-4 rounded-xl text-xs font-bold transition ' + (
              mode === 'focus' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            )}
          >
            🔥 25분 집중
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={'py-2 px-4 rounded-xl text-xs font-bold transition ' + (
              mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            )}
          >
            ☕ 5분 휴식
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={'py-2 px-4 rounded-xl text-xs font-bold transition ' + (
              mode === 'longBreak' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            )}
          >
            🏖️ 15분 긴 휴식
          </button>
        </div>

        {/* Big Timer Display */}
        <div className="py-6">
          <span className="text-6xl sm:text-8xl font-black text-white tracking-tight font-mono">
            {formatTime(timeLeft)}
          </span>
          <p className="text-xs text-slate-400 mt-2">오늘 완료한 뽀모도로 세션: <strong className="text-indigo-400">{cycles}회</strong></p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="py-3.5 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? '일시 정지' : '타이머 시작'}
          </button>

          <button
            onClick={() => { setIsRunning(false); setTimeLeft(modeTimes[mode]); }}
            className="p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition"
            title="리셋"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleNoise}
            className={'py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center gap-2 ' + (
              soundEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
            )}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? '백색소음 재생 중' : '집중 백색소음 켜기'}
          </button>
        </div>
      </div>
    </div>
  );
}
