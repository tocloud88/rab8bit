import React, { useState } from 'react';
import { ChefHat, Plus, Trash2, Scale, RefreshCw } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export default function RecipePortionConverter() {
  const [basePortion, setBasePortion] = useState(1);
  const [targetPortion, setTargetPortion] = useState(3);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '간장', amount: 2, unit: '밥숟가락' },
    { id: '2', name: '설탕', amount: 1, unit: '밥숟가락' },
    { id: '3', name: '물', amount: 1, unit: '종이컵' },
    { id: '4', name: '고춧가루', amount: 1.5, unit: '밥숟가락' },
  ]);

  const ratio = basePortion > 0 ? targetPortion / basePortion : 1;

  const addRow = () => {
    setIngredients([...ingredients, { id: String(Date.now()), name: '', amount: 1, unit: '밥숟가락' }]);
  };

  const removeRow = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const updateRow = (id: string, field: 'name' | 'amount' | 'unit', val: any) => {
    setIngredients(ingredients.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">기준 레시피:</span>
            <input
              type="number"
              min="1"
              max="20"
              value={basePortion}
              onChange={(e) => setBasePortion(Number(e.target.value))}
              className="w-16 bg-slate-800 border border-slate-700 rounded-lg py-1 px-2 text-center text-white text-sm"
            />
            <span className="text-xs text-slate-300">인분</span>
          </div>

          <div className="text-indigo-400 text-sm font-bold">➔</div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-300">만들 목표:</span>
            <input
              type="number"
              min="1"
              max="50"
              value={targetPortion}
              onChange={(e) => setTargetPortion(Number(e.target.value))}
              className="w-16 bg-indigo-950 border border-indigo-500/50 rounded-lg py-1 px-2 text-center text-white text-sm font-bold"
            />
            <span className="text-xs text-indigo-300 font-bold">인분 (x{ratio.toFixed(2)}배)</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-400">재료 목록</h4>
            <button
              onClick={addRow}
              className="py-1 px-3 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> 재료 추가
            </button>
          </div>

          <div className="space-y-2">
            {ingredients.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="text"
                  placeholder="재료명 (예: 간장)"
                  value={item.name}
                  onChange={(e) => updateRow(item.id, 'name', e.target.value)}
                  className="col-span-4 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="number"
                  step="0.1"
                  value={item.amount}
                  onChange={(e) => updateRow(item.id, 'amount', Number(e.target.value))}
                  className="col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white text-right"
                />
                <select
                  value={item.unit}
                  onChange={(e) => updateRow(item.id, 'unit', e.target.value)}
                  className="col-span-3 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                >
                  <option value="밥숟가락">밥숟가락 (10ml)</option>
                  <option value="종이컵">종이컵 (180ml)</option>
                  <option value="티스푼">티스푼 (5ml)</option>
                  <option value="g">그램 (g)</option>
                  <option value="ml">밀리리터 (ml)</option>
                  <option value="개">개</option>
                  <option value="꼬집">꼬집</option>
                </select>
                <div className="col-span-2 text-right font-extrabold text-indigo-400 text-xs sm:text-sm">
                  {(item.amount * ratio).toFixed(1).replace(/\.0$/, '')} {item.unit}
                </div>
                <button
                  onClick={() => removeRow(item.id)}
                  className="col-span-1 text-slate-500 hover:text-rose-400 text-right pr-1"
                >
                  <Trash2 className="w-4 h-4 inline" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
