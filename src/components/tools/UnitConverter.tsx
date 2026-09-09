import React, { useState, useEffect } from 'react';
import { Share2, Check, Copy, Sparkles } from 'lucide-react';

const CATEGORIES = {
  area: {
    label: '넓이 (평수)',
    icon: '🏠',
    presets: [
      { label: '59㎡ (약 24평)', val: '59', unit: 'm2' },
      { label: '84㎡ (약 34평)', val: '84', unit: 'm2' },
      { label: '100㎡ (약 30평)', val: '100', unit: 'm2' },
      { label: '10평', val: '10', unit: 'pyeong' },
      { label: '30평', val: '30', unit: 'pyeong' },
    ],
    units: [
      { id: 'pyeong', label: '평', symbol: '평', factor: 3.305785 },
      { id: 'm2', label: '제곱미터', symbol: 'm²', factor: 1 },
      { id: 'a', label: '아르', symbol: 'a', factor: 100 },
      { id: 'ha', label: '헥타르', symbol: 'ha', factor: 10000 },
      { id: 'km2', label: '제곱킬로미터', symbol: 'km²', factor: 1000000 },
      { id: 'ft2', label: '제곱피트', symbol: 'sq ft', factor: 0.092903 },
      { id: 'yd2', label: '제곱야드', symbol: 'sq yd', factor: 0.836127 },
      { id: 'acre', label: '에이커', symbol: 'ac', factor: 4046.856 },
    ]
  },
  length: {
    label: '길이',
    icon: '📐',
    presets: [
      { label: '1 cm', val: '1', unit: 'cm' },
      { label: '1 인치 (2.54cm)', val: '1', unit: 'in' },
      { label: '1 피트 (30.48cm)', val: '1', unit: 'ft' },
      { label: '1 km', val: '1', unit: 'km' },
      { label: '1 마일', val: '1', unit: 'mi' },
    ],
    units: [
      { id: 'cm', label: '센티미터', symbol: 'cm', factor: 0.01 },
      { id: 'm', label: '미터', symbol: 'm', factor: 1 },
      { id: 'km', label: '킬로미터', symbol: 'km', factor: 1000 },
      { id: 'in', label: '인치', symbol: 'in', factor: 0.0254 },
      { id: 'ft', label: '피트', symbol: 'ft', factor: 0.3048 },
      { id: 'yd', label: '야드', symbol: 'yd', factor: 0.9144 },
      { id: 'mi', label: '마일', symbol: 'mi', factor: 1609.344 },
      { id: 'mm', label: '밀리미터', symbol: 'mm', factor: 0.001 },
    ]
  },
  weight: {
    label: '무게',
    icon: '⚖️',
    presets: [
      { label: '1돈 (금 3.75g)', val: '1', unit: 'don' },
      { label: '1근 (고기 600g)', val: '1', unit: 'geun' },
      { label: '1 파운드 (453g)', val: '1', unit: 'lb' },
      { label: '1 kg', val: '1', unit: 'kg' },
      { label: '1 온스 (28.3g)', val: '1', unit: 'oz' },
    ],
    units: [
      { id: 'kg', label: '킬로그램', symbol: 'kg', factor: 1 },
      { id: 'g', label: '그램', symbol: 'g', factor: 0.001 },
      { id: 'lb', label: '파운드', symbol: 'lb', factor: 0.453592 },
      { id: 'oz', label: '온스', symbol: 'oz', factor: 0.0283495 },
      { id: 'geun', label: '근 (고기)', symbol: '근', factor: 0.6 },
      { id: 'don', label: '돈 (금)', symbol: '돈', factor: 0.00375 },
      { id: 't', label: '톤', symbol: 't', factor: 1000 },
      { id: 'mg', label: '밀리그램', symbol: 'mg', factor: 0.000001 },
    ]
  }
};

export default function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>('area');
  const [inputValue, setInputValue] = useState<string>('84');
  const [baseUnit, setBaseUnit] = useState<string>('m2');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const val = params.get('val');
    const from = params.get('from');

    if (val && !isNaN(Number(val))) setInputValue(val);

    if (from) {
      for (const [catKey, catData] of Object.entries(CATEGORIES)) {
        if (catData.units.some(u => u.id === from)) {
          setActiveCategory(catKey as keyof typeof CATEGORIES);
          setBaseUnit(from);
          break;
        }
      }
    }
  }, []);

  const handleInputChange = (val: string, unitId: string) => {
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setInputValue(val);
      setBaseUnit(unitId);
    }
  };

  const currentCategoryData = CATEGORIES[activeCategory];
  const baseUnitData = currentCategoryData.units.find(u => u.id === baseUnit) || currentCategoryData.units[0];
  const standardValue = (Number(inputValue) || 0) * baseUnitData.factor;

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('val', inputValue || '0');
    url.searchParams.set('from', baseUnit);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Category Tabs */}
      <div className="flex p-1.5 bg-slate-200/60 dark:bg-slate-900/80 rounded-2xl border border-slate-300/40 dark:border-slate-800/60 max-w-md mx-auto shadow-inner">
        {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(catKey => (
          <button
            key={catKey}
            onClick={() => {
              setActiveCategory(catKey);
              setBaseUnit(CATEGORIES[catKey].units[0].id);
              setInputValue('1');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === catKey
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md scale-[1.02]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{CATEGORIES[catKey].icon}</span>
            <span>{CATEGORIES[catKey].label}</span>
          </button>
        ))}
      </div>

      {/* Preset Quick Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 자주 쓰는 수치:
        </span>
        {currentCategoryData.presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setBaseUnit(preset.unit);
              setInputValue(preset.val);
            }}
            className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Converter Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentCategoryData.units.map((unit) => {
          const isFocused = unit.id === baseUnit;
          const displayValue = inputValue === '' ? '' : 
            unit.id === baseUnit 
              ? inputValue
              : (standardValue / unit.factor).toLocaleString('ko-KR', { maximumFractionDigits: 6 });

          return (
            <div
              key={unit.id}
              onClick={() => {
                if (!isFocused) {
                  setBaseUnit(unit.id);
                  setInputValue(displayValue.replace(/,/g, ''));
                }
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                isFocused
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-900/30 dark:to-slate-900 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/30'
                  : 'border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {unit.label} ({unit.symbol})
                </span>
                {isFocused && (
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500 text-white shadow-sm">
                    기준 입력 단위
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={displayValue}
                  onChange={(e) => handleInputChange(e.target.value, unit.id)}
                  onFocus={() => {
                    if (unit.id !== baseUnit) {
                      setBaseUnit(unit.id);
                      setInputValue(displayValue.replace(/,/g, ''));
                    }
                  }}
                  className="w-full text-2xl sm:text-3xl font-extrabold bg-transparent outline-none text-slate-900 dark:text-white font-mono"
                  placeholder="0"
                />
                <span className="text-sm font-bold text-slate-400">{unit.symbol}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 입력창을 클릭하거나 숫자를 수정하면 실시간으로 자동 변환됩니다.
        </p>

        <button
          onClick={handleCopyLink}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
            copiedLink
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white'
          }`}
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4" />
              <span>링크 복사됨!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>결과 링크 공유</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
