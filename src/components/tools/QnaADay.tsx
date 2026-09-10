import React, { useState, useEffect } from 'react';

const QUESTIONS = [
  '오늘 하루 중 가장 감사했던 순간이나 사람은 누구인가요?',
  '최근 나를 가장 설레게 만든 새로운 배움이나 발견은 무엇인가요?',
  '1년 전의 나와 비교했을 때 내가 가장 성장한 점은 무엇인가요?',
  '오늘 나에게 해주고 싶은 따뜻한 한마디는 무엇인가요?',
  '만약 모든 두려움이 사라진다면 당장 시작하고 싶은 일은 무엇인가요?',
  '최근 내 마음에 깊은 여운을 남긴 문장이나 음악이 있다면?',
  '스트레스를 받을 때 나만의 가장 확실한 힐링 루틴은 무엇인가요?'
];

export default function QnaADay() {
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const question = QUESTIONS[dayOfYear % QUESTIONS.length];

  const [answer, setAnswer] = useState('');
  const [savedEntries, setSavedEntries] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rab8bit_qna_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedEntries(parsed);
        if (parsed[dateKey]) {
          setAnswer(parsed[dateKey]);
        }
      }
    } catch {}
  }, [dateKey]);

  const saveAnswer = () => {
    if (!answer.trim()) return;
    const updated = { ...savedEntries, [dateKey]: answer.trim() };
    setSavedEntries(updated);
    try {
      localStorage.setItem('rab8bit_qna_history', JSON.stringify(updated));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Today Question Card */}
      <div className="stitch-card p-6 sm:p-10 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-purple-950/40 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
            📅 {dateKey} 오늘의 질문
          </span>
          <span className="text-xs text-slate-500 font-semibold">365 성찰 일기</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
          “{question}”
        </h2>

        <div className="space-y-3">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="오늘의 생각을 자유롭게 기록하세요..."
            rows={6}
            className="w-full bg-slate-950/80 text-slate-100 p-4 rounded-2xl border border-indigo-500/20 focus:outline-none focus:border-indigo-500 text-sm leading-relaxed resize-y"
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">
              🔒 작성된 답변은 브라우저(LocalStorage)에만 안전하게 저장됩니다.
            </span>
            <button
              onClick={saveAnswer}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              {copied ? '✓ 저장되었습니다' : '💾 오늘 답변 저장'}
            </button>
          </div>
        </div>
      </div>

      {/* Past Entries */}
      {Object.keys(savedEntries).length > 0 && (
        <div className="stitch-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>📖</span> 나의 지난 답변 기록 ({Object.keys(savedEntries).length}일)
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {Object.entries(savedEntries)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([date, text]) => (
                <div key={date} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
                  <span className="text-indigo-400 font-bold">{date}</span>
                  <p className="text-slate-300 leading-relaxed">{text}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
