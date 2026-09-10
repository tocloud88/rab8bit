import React, { useState, useEffect } from 'react';

const CHARADES_DATA: Record<string, string[]> = {
  '동작·행동 🏃': [
    '줄넘기', '양치질', '스키 타기', '낚시', '서핑', '역도', '축구 헤딩',
    '볼링', '탁구', '피아노 연주', '청소기 돌리기', '셀카 찍기', '설거지'
  ],
  '직업·역할 👨‍✈️': [
    '요리사', '경찰관', '소방관', '의사', '승무원', '우주비행사',
    '마술사', '지휘자', '사진작가', '발레리나', '탐정', '아이돌'
  ],
  '감정·상태 😲': [
    '화남(분노)', '배고픔', '졸림', '놀람', '무서움(공포)', '사랑에 빠짐',
    '추위(오들오들)', '더위(땀 뻘뻘)', '당황스러움', '기쁨의 댄스'
  ],
  '사물·도구 📱': [
    '선풍기', '스마트폰', '우산', '전자레인지', '드라이기', '자동차 와이퍼',
    '카메라', '자전거', '망원경', '가위질'
  ]
};

export default function CharadesGame() {
  const [category, setCategory] = useState<string>('동작·행동 🏃');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);

  const startQuiz = () => {
    const list = [...CHARADES_DATA[category]];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setWords(list);
    setCurrentIndex(0);
    setScore(0);
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

  const handleNext = (correct: boolean) => {
    if (correct) setScore(prev => prev + 1);
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
            <p className="text-xs text-slate-400">말없이 오직 몸짓과 제스처만으로 제시어를 표현하세요!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {Object.keys(CHARADES_DATA).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  category === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={startQuiz}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-black text-base shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            🕺 몸으로 말해요 시작 (60초)
          </button>
        </div>
      )}

      {/* In-Game Display */}
      {isPlaying && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-purple-500/20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">남은 시간</span>
              <span className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                ⏱️ {timeLeft}초
              </span>
            </div>

            <div className="text-xs font-bold text-pink-400">
              맞힌 개수: {score}개
            </div>
          </div>

          <div className="stitch-card p-12 sm:p-16 rounded-3xl border border-pink-500/40 bg-gradient-to-br from-purple-950/60 via-slate-900/90 to-pink-950/60 text-center shadow-2xl flex flex-col items-center justify-center min-h-[260px]">
            <span className="text-xs font-bold text-pink-400 mb-4">{category} (말하기 금지 🤫)</span>
            <h3 className="text-4xl sm:text-6xl font-black text-white tracking-wide animate-fade-in">
              {words[currentIndex]}
            </h3>
            <span className="text-xs text-slate-500 mt-6 font-semibold">
              {currentIndex + 1} / {words.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleNext(false)}
              className="py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-lg border border-slate-700 transition-all active:scale-95"
            >
              ⏭️ 패스 (Pass)
            </button>
            <button
              onClick={() => handleNext(true)}
              className="py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-extrabold text-lg shadow-lg shadow-pink-500/25 transition-all active:scale-95"
            >
              🎉 정답! (+1)
            </button>
          </div>
        </div>
      )}

      {/* Result Card */}
      {isFinished && (
        <div className="stitch-card p-8 sm:p-10 rounded-3xl border border-purple-500/30 text-center space-y-6 shadow-2xl">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">게임 종료</span>
          <h2 className="text-3xl font-black text-white">최종 결과</h2>
          
          <p className="text-5xl font-black text-pink-400">{score}개 성공!</p>

          <button
            onClick={startQuiz}
            className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm transition-all shadow-lg shadow-purple-600/30 hover:scale-105"
          >
            다시 플레이하기 🔄
          </button>
        </div>
      )}
    </div>
  );
}
