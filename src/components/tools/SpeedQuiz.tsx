import React, { useState, useEffect } from 'react';

const QUIZ_DATA: Record<string, string[]> = {
  '동물 🦁': [
    '호랑이', '기린', '판다', '카멜레온', '코알라', '펭귄', '하마',
    '캥거루', '미어캣', '나무늘보', '북극곰', '돌고래', '타조', '플라밍고'
  ],
  '음식 🍕': [
    '떡볶이', '마라탕', '삼겹살', '치킨', '붕어빵', '타코야끼', '파스타',
    '짜장면', '김치찌개', '탕수육', '초밥', '마카롱', '샌드위치', '비빔밥'
  ],
  '영화·애니 🎬': [
    '어벤져스', '기생충', '겨울왕국', '센과 치히로의 행방불명', '토이스토리',
    '아바타', '타이타닉', '해리포터', '알라딘', '스파이더맨', '인터스텔라'
  ],
  '속담·사자성어 📜': [
    '가는 날이 장날', '소 잃고 외양간 고친다', '금강산도 식후경',
    '누워서 떡 먹기', '일석이조', '동문서답', '역지사지', '새옹지마'
  ],
  'MZ 신조어 💬': [
    '알잘딱깔센', '중꺾마', '갓생', '분좋카', '점메추', '억까', '폼미쳤다', '핑프'
  ]
};

export default function SpeedQuiz() {
  const [category, setCategory] = useState<string>('동물 🦁');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [passCount, setPassCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);

  const startQuiz = () => {
    const list = [...QUIZ_DATA[category]];
    // Shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setWords(list);
    setCurrentIndex(0);
    setScore(0);
    setPassCount(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setIsFinished(false);
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setIsFinished(true);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleCorrect = () => {
    setScore(prev => prev + 1);
    if (currentIndex + 1 < words.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setIsFinished(true);
    }
  };

  const handlePass = () => {
    setPassCount(prev => prev + 1);
    if (currentIndex + 1 < words.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setIsFinished(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Category Select & Start */}
      {!isPlaying && !isFinished && (
        <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">카테고리를 선택하세요</h2>
            <p className="text-xs text-slate-400">60초 동안 최대한 많은 제시어를 설명하고 맞추세요!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {Object.keys(QUIZ_DATA).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  category === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={startQuiz}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-black text-base shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            🔥 스피드 퀴즈 시작 (60초)
          </button>
        </div>
      )}

      {/* In-Game Display */}
      {isPlaying && (
        <div className="space-y-6">
          {/* Top Bar: Timer & Score */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">남은 시간</span>
              <span className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                ⏱️ {timeLeft}초
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-emerald-400">정답: {score}개</span>
              <span className="text-slate-400">패스: {passCount}회</span>
            </div>
          </div>

          {/* Word Card Display */}
          <div className="stitch-card p-12 sm:p-16 rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/60 text-center shadow-2xl flex flex-col items-center justify-center min-h-[260px]">
            <span className="text-xs font-bold text-indigo-400 mb-4">{category}</span>
            <h3 className="text-4xl sm:text-6xl font-black text-white tracking-wide animate-fade-in">
              {words[currentIndex]}
            </h3>
            <span className="text-xs text-slate-500 mt-6 font-semibold">
              {currentIndex + 1} / {words.length}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handlePass}
              className="py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-lg border border-slate-700 transition-all active:scale-95"
            >
              ⏭️ 패스 (Pass)
            </button>
            <button
              onClick={handleCorrect}
              className="py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-lg shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
            >
              🎉 정답! (+1)
            </button>
          </div>
        </div>
      )}

      {/* Result Card */}
      {isFinished && (
        <div className="stitch-card p-8 sm:p-10 rounded-3xl border border-indigo-500/30 text-center space-y-6 shadow-2xl">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">게임 종료</span>
          <h2 className="text-3xl font-black text-white">최종 획득 점수</h2>
          
          <div className="flex justify-center items-center gap-6">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center min-w-[120px]">
              <span className="text-xs font-semibold text-slate-400">맞힌 정답</span>
              <p className="text-4xl font-black text-emerald-400 mt-1">{score}개</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-center min-w-[120px]">
              <span className="text-xs font-semibold text-slate-400">패스한 개수</span>
              <p className="text-4xl font-black text-slate-400 mt-1">{passCount}개</p>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all shadow-lg shadow-indigo-600/30 hover:scale-105"
          >
            다시 도전하기 🔄
          </button>
        </div>
      )}
    </div>
  );
}
