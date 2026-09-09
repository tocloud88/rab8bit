import React, { useState, useEffect } from 'react';

const CATEGORIES = {
  length: {
    label: '길이',
    units: [
      { id: 'mm', label: '밀리미터 (mm)', factor: 0.001 },
      { id: 'cm', label: '센티미터 (cm)', factor: 0.01 },
      { id: 'm', label: '미터 (m)', factor: 1 },
      { id: 'km', label: '킬로미터 (km)', factor: 1000 },
      { id: 'in', label: '인치 (in)', factor: 0.0254 },
      { id: 'ft', label: '피트 (ft)', factor: 0.3048 },
      { id: 'yd', label: '야드 (yd)', factor: 0.9144 },
      { id: 'mi', label: '마일 (mi)', factor: 1609.344 },
    ]
  },
  area: {
    label: '넓이',
    units: [
      { id: 'm2', label: '제곱미터 (m²)', factor: 1 },
      { id: 'pyeong', label: '평', factor: 3.305785 },
      { id: 'a', label: '아르 (a)', factor: 100 },
      { id: 'ha', label: '헥타르 (ha)', factor: 10000 },
      { id: 'km2', label: '제곱킬로미터 (km²)', factor: 1000000 },
      { id: 'ft2', label: '제곱피트 (sq ft)', factor: 0.092903 },
      { id: 'yd2', label: '제곱야드 (sq yd)', factor: 0.836127 },
      { id: 'acre', label: '에이커 (ac)', factor: 4046.856 },
    ]
  },
  weight: {
    label: '무게',
    units: [
      { id: 'mg', label: '밀리그램 (mg)', factor: 0.000001 },
      { id: 'g', label: '그램 (g)', factor: 0.001 },
      { id: 'kg', label: '킬로그램 (kg)', factor: 1 },
      { id: 't', label: '톤 (t)', factor: 1000 },
      { id: 'oz', label: '온스 (oz)', factor: 0.0283495 },
      { id: 'lb', label: '파운드 (lb)', factor: 0.453592 },
      { id: 'geun', label: '근 (고기)', factor: 0.6 },
      { id: 'don', label: '돈 (금)', factor: 0.00375 },
    ]
  }
};

export default function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>('area');
  const [inputValue, setInputValue] = useState<string>('1');
  const [baseUnit, setBaseUnit] = useState<string>('pyeong');
  
  // Parse URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const val = params.get('val');
    const from = params.get('from');
    
    if (val && !isNaN(Number(val))) setInputValue(val);
    
    if (from) {
      // Find category that contains this unit
      for (const [catKey, catData] of Object.entries(CATEGORIES)) {
        if (catData.units.some(u => u.id === from)) {
          setActiveCategory(catKey as keyof typeof CATEGORIES);
          setBaseUnit(from);
          break;
        }
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, unitId: string) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setInputValue(val);
      setBaseUnit(unitId);
    }
  };

  const currentCategoryData = CATEGORIES[activeCategory];
  const baseUnitData = currentCategoryData.units.find(u => u.id === baseUnit) || currentCategoryData.units[0];
  
  // Calculate value in standard unit (e.g., base unit is 'm2' or 'kg')
  const standardValue = (Number(inputValue) || 0) * baseUnitData.factor;

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('val', inputValue || '0');
    url.searchParams.set('from', baseUnit);
    navigator.clipboard.writeText(url.toString());
    alert('결과 링크가 복사되었습니다!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(catKey => (
          <button
            key={catKey}
            onClick={() => {
              setActiveCategory(catKey);
              setBaseUnit(CATEGORIES[catKey].units[0].id);
              setInputValue('1');
            }}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeCategory === catKey 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {CATEGORIES[catKey].label}
          </button>
        ))}
      </div>

      {/* Converter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {currentCategoryData.units.map((unit) => {
          // Calculate the value for this specific unit based on the standardValue
          const displayValue = inputValue === '' ? '' : 
            unit.id === baseUnit 
              ? inputValue // Exact input string for the base unit to allow typing decimals
              : (standardValue / unit.factor).toLocaleString('ko-KR', { maximumFractionDigits: 6 });

          const isFocused = unit.id === baseUnit;

          return (
            <div 
              key={unit.id} 
              className={`p-4 rounded-xl border-2 transition-all ${
                isFocused 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <label className="flex justify-between items-center mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                {unit.label}
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={displayValue}
                onChange={(e) => handleInputChange(e, unit.id)}
                onFocus={() => {
                  if (unit.id !== baseUnit) {
                    setBaseUnit(unit.id);
                    setInputValue(displayValue.replace(/,/g, ''));
                  }
                }}
                className="w-full text-2xl font-bold bg-transparent outline-none text-slate-900 dark:text-white"
                placeholder="0"
              />
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex justify-end mt-4">
        <button 
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          이 결과 링크 복사
        </button>
      </div>
    </div>
  );
}
