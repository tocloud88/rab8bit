import React, { useState } from 'react';
import { Flame, Activity, Scale, Dumbbell, Apple } from 'lucide-react';

export default function BmrTdeeCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.375); // 1.2, 1.375, 1.55, 1.725, 1.9

  // Mifflin-St Jeor Equation
  const bmr = Math.round(
    gender === 'male'
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161
  );

  const tdee = Math.round(bmr * activity);
  const cutCalorie = Math.round(tdee - 500); // 체중 감량
  const bulkCalorie = Math.round(tdee + 300); // 근육 증가

  // Macro grams for maintain (Carb 50%, Protein 30%, Fat 20%)
  const proteinG = Math.round((tdee * 0.3) / 4);
  const carbG = Math.round((tdee * 0.5) / 4);
  const fatG = Math.round((tdee * 0.2) / 9);

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">성별</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={'py-2.5 rounded-xl font-bold text-xs transition ' + (gender === 'male' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400')}
                >
                  남성 (Male)
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={'py-2.5 rounded-xl font-bold text-xs transition ' + (gender === 'female' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400')}
                >
                  여성 (Female)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">나이</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">키 (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">체중 (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-white text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">평소 활동량</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-xs text-white"
              >
                <option value={1.2}>거의 운동 안 함 (좌식 생활)</option>
                <option value={1.375}>가벼운 운동 (주 1~3회)</option>
                <option value={1.55}>보통 수준 운동 (주 3~5회)</option>
                <option value={1.725}>적극적인 운동 (주 6~7회)</option>
                <option value={1.9}>매우 격렬한 운동 / 육체 노동</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-400">내 기초대사량 (BMR)</span>
              <div className="text-2xl font-black text-indigo-400 mt-1">{bmr.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kcal/일</span></div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400">하루 유지 칼로리 (TDEE)</span>
              <div className="text-3xl font-black text-white mt-1">{tdee.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kcal/일</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-xl">
                <span className="text-slate-400 block">다이어트 (감량)</span>
                <strong className="text-emerald-400 text-sm font-extrabold">{cutCalorie.toLocaleString()} kcal</strong>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-xl">
                <span className="text-slate-400 block">린매스업 (증량)</span>
                <strong className="text-amber-400 text-sm font-extrabold">{bulkCalorie.toLocaleString()} kcal</strong>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex justify-between border-t border-slate-800">
              <span>탄: {carbG}g</span>
              <span>단: {proteinG}g</span>
              <span>지: {fatG}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
