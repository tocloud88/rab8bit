const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const tools = [
  {
    slug: "duty-calculator",
    component: "DutyCalculator",
    title: "해외직구 관·부가세 계산기 | 면세 한도·실시간 환율·품목별 관세율 - rab8bit",
    description: "미국($200), 일본·유럽·중국($150) 해외직구 면세 한도와 품목별(의류, 전자, 화장품, 영양제) 예상 관세 및 부가세를 실시간으로 자동 계산합니다.",
    tag: "✈️ 해외직구 / 관세",
    h1: "해외직구 관·부가세 계산기",
    desc: "달러/엔화/유로 환율과 품목별 관세율을 적용하여 최종 통관 예상 비용을 한눈에 확인하세요.",
    guideTitle: "📦 해외직구 통관 및 면세 기준 안내",
    guideItems: [
      "미국발 물품(목록통관): 총 결제금액 $200 이하 면세",
      "미국 외 국가(일본, 유럽, 중국 등) 또는 일반통관: 총 결제금액 $150 이하 면세",
      "건강기능식품 및 의약품: 자가사용 기준 최대 6병까지만 통관 가능 (일반통관 $150 기준 적용)"
    ]
  },
  {
    slug: "dutch-pay",
    component: "DutchPayCalculator",
    title: "배달비 & 모임 1/N 스마트 정산기 | 더치페이 카톡 공유 - rab8bit",
    description: "개인별 메뉴 금액에 배달팁과 할인쿠폰을 공평하게 N분의 1로 분배하고 카카오톡/토스 전송용 정산 문구를 원클릭으로 완성합니다.",
    tag: "🍗 모임 / 배달 정산",
    h1: "스마트 더치페이 & 1/N 정산기",
    desc: "인원별 메뉴 가격, 공통 배달비, 할인쿠폰을 깔끔하게 나누고 카톡 공유 문구를 복사하세요.",
    guideTitle: "💡 정산 팁 & 단위 절사 안내",
    guideItems: [
      "100원 단위 올림을 설정하면 자투리 동전 없이 깔끔하게 입금 요청이 가능합니다.",
      "공통 배달비와 할인쿠폰은 참여한 모든 인원에게 균등하게 자동 분배됩니다."
    ]
  },
  {
    slug: "holiday-planner",
    component: "HolidayPlanner",
    title: "2026 황금연차 & 연휴 플래너 | 입사일 기준 연차 계산기 - rab8bit",
    description: "내 입사일 기준 발생 연차 일수 계산과 2026/2027년 대체공휴일 포함 최장 9일 황금연휴를 만드는 추천 연차 사용일을 확인하세요.",
    tag: "📅 연차 / 공휴일",
    h1: "황금연차 & 연휴 플래너",
    desc: "내 법정 연차 발생 일수를 조회하고, 2026년 공휴일과 주말을 연계한 최적의 휴가 일정을 계획하세요.",
    guideTitle: "⚖️ 근로기준법상 연차 유급휴가 발생 기준",
    guideItems: [
      "입사 1년 미만: 1개월 개근 시 매월 1일씩 (최대 11일 발생)",
      "입사 1년 이상: 1년간 80% 이상 출근 시 기본 15일 발생",
      "근속 3년 이상: 매 2년 근속마다 1일씩 가산 (최대 25일 한도)"
    ]
  },
  {
    slug: "severance-pay",
    component: "SeveranceCalculator",
    title: "퇴직금 & 실업급여 모의 계산기 | 3개월 평균임금 수급액 계산 - rab8bit",
    description: "근속기간과 최근 3개월 급여 기반 예상 퇴직금 및 고용보험 실업급여(구직급여) 1일 수급액과 총 지급액을 모의 계산합니다.",
    tag: "💰 급여 / 퇴직금",
    h1: "퇴직금 & 실업급여 모의 계산기",
    desc: "입사일과 퇴사일, 최근 3개월 급여를 입력하면 법정 퇴직금과 실업급여 예상 수령액을 즉시 계산합니다.",
    guideTitle: "📌 퇴직금 및 실업급여 지급 요건 안내",
    guideItems: [
      "퇴직금 지급 요건: 주 15시간 이상, 계속 근로기간 1년(365일) 이상 근무 시 법적 발생",
      "1일 평균임금 산정: 퇴직일 이전 3개월간 지급된 임금 총액 / 3개월 총 일수 (약 91일)",
      "실업급여 상한액: 2026년 기준 1일 상한액 66,000원 적용"
    ]
  },
  {
    slug: "savings-calc",
    component: "SavingsCalculator",
    title: "정기 예금·적금 이자 계산기 | 단리·복리·세후 실수령액 - rab8bit",
    description: "정기예금 및 적금 만기 시 수령하는 원금, 세전 이자, 이자소득세(15.4%/9.5%/비과세) 차감 후 최종 만기 수령액을 계산합니다.",
    tag: "🏦 금융 / 적금 이자",
    h1: "정기 예금·적금 이자 계산기",
    desc: "월 납입액과 이자율, 과세 방식을 설정하여 만기 시 실제로 손에 쥐는 세후 이자를 확인하세요.",
    guideTitle: "💡 이자 과세 유형 안내",
    guideItems: [
      "일반과세: 소득세 14% + 지방소득세 1.4% = 총 15.4% 원천징수",
      "세금우대 (조합원/농어가 등): 농어촌특별세 등 9.5% 우대 세율 적용",
      "비과세 종합저축: 만 65세 이상 또는 장애인/유공자 대상 1인당 5천만원 한도 0% 비과세"
    ]
  },
  {
    slug: "pomodoro-timer",
    component: "PomodoroTimer",
    title: "뽀모도로 타이머 & 집중 백색소음기 | 25분 몰입 5분 휴식 - rab8bit",
    description: "25분 집중과 5분 휴식 주기로 업무와 공부 효율을 극대화하는 온라인 뽀모도로 타이머. 오프라인 작동 백색소음 플레이어를 지원합니다.",
    tag: "🍅 생산성 / 집중",
    h1: "뽀모도로 타이머 & 집중 백색소음",
    desc: "과학적으로 검증된 25분 집중 인터벌과 차분한 백색소음으로 깊은 몰입(Deep Work) 상태를 유지하세요.",
    guideTitle: "🧠 뽀모도로(Pomodoro) 기법 활용법",
    guideItems: [
      "1단계: 단 하나의 작업 목표를 정하고 25분간 온전히 집중합니다.",
      "2단계: 25분이 끝나면 알람과 함께 5분간 스트레칭 등 가벼운 휴식을 취합니다.",
      "3단계: 4세트를 완료하면 15~30분의 긴 휴식을 가지며 뇌의 피로를 회복합니다."
    ]
  },
  {
    slug: "recipe-portion",
    component: "RecipePortionConverter",
    title: "요리 레시피 인분 변환기 | 1인분 계량 숟가락·종이컵 환산 - rab8bit",
    description: "1인분 요리 레시피를 2인분, 3인분, 4인분으로 자동 증량 계산하고 밥숟가락, 종이컵(180ml), g, ml 계량 단위로 변환합니다.",
    tag: "🍳 요리 / 레시피 계량",
    h1: "요리 레시피 인분 변환기",
    desc: "기준 레시피의 인분 수와 재료 용량을 원하는 인분 수에 맞춰 황금 비율로 즉시 자동 계산하세요.",
    guideTitle: "🥄 한국 표준 계량 단위 환산표",
    guideItems: [
      "밥숟가락 1큰술(1T): 액체 약 10ml, 가루류 약 7~10g",
      "종이컵 1컵: 물/액체 기준 180ml, 쌀 기준 약 150g, 밀가루 기준 약 100g",
      "티스푼 1작은술(1t): 약 5ml, 1꼬집: 엄지와 검지로 살짝 집은 양(약 0.5~1g)"
    ]
  },
  {
    slug: "sleep-cycle",
    component: "SleepCycleCalculator",
    title: "수면 사이클 계산기 | 90분 렘수면 최적 기상·취침 알람 - rab8bit",
    description: "90분 주기 렘수면(REM) 사이클을 바탕으로 지금 잠들었을 때 아침에 가장 개운하게 일어날 수 있는 추천 알람 시각을 계산합니다.",
    tag: "😴 수면 / 피로회복",
    h1: "최적 수면 사이클 계산기",
    desc: "수면 관성(Sleep Inertia) 없이 가뿐하게 눈을 뜰 수 있는 최적의 기상 및 취침 시각을 확인하세요.",
    guideTitle: "🌙 90분 수면 주기(Ultradian Cycle)의 원리",
    guideItems: [
      "사람의 수면은 얕은 수면, 깊은 수면, 렘수면(REM) 주기를 약 90분 단위로 반복합니다.",
      "깊은 수면 도중에 알람이 울리면 잠에서 깨도 피로감이 심한 수면 관성이 발생합니다.",
      "90분 주기의 끝(렘수면 직후)에 기상하면 수면 시간이 적더라도 훨씬 개운함을 느낄 수 있습니다."
    ]
  },
  {
    slug: "dday-calculator",
    component: "DdayCalculator",
    title: "디데이(D-Day) & 기념일 계산기 | 100일·1주년·시험 카운트다운 - rab8bit",
    description: "기념일, 시험, 수능, 전역일까지 남은 날짜 D-Day 카운트다운과 100일, 200일, 1주년, 1000일 기념일 날짜를 자동으로 계산합니다.",
    tag: "🎁 디데이 / 기념일",
    h1: "디데이(D-Day) & 기념일 계산기",
    desc: "소중한 기념일이나 목표일까지 남은 일수를 실시간 카운트다운하고 주요 기념일 일정을 한눈에 확인하세요.",
    guideTitle: "📅 기념일 계산법 안내",
    guideItems: [
      "D-Day 계산: 목표일까지 남은 일수 (당일은 D-DAY)",
      "100일 계산법: 만난 날을 1일째로 포함하여 100일째 되는 날 산출 (당일 + 99일)",
      "1주년(365일): 만난 날로부터 정확히 365일째 되는 날짜"
    ]
  },
  {
    slug: "bmr-tdee-calc",
    component: "BmrTdeeCalculator",
    title: "기초대사량(BMR) & 활동대사량(TDEE) 계산기 | 탄단지 다이어트 - rab8bit",
    description: "미플린-지어 공식을 통한 나의 기초대사량(BMR)과 하루 총 에너지 소비량(TDEE) 계산. 다이어트 및 벌크업 맞춤 일일 탄·단·지(g)를 확인하세요.",
    tag: "🔥 헬스 / 다이어트",
    h1: "기초대사량 & TDEE 계산기",
    desc: "성별, 나이, 키, 체중, 활동량을 입력하여 내 몸의 유지 칼로리와 다이어트 맞춤 영양 섭취량을 계산하세요.",
    guideTitle: "📊 BMR과 TDEE 개념 정리",
    guideItems: [
      "기초대사량 (BMR): 숨만 쉬어도 생명 유지를 위해 소모되는 최소 에너지",
      "유지 칼로리 (TDEE): 일상 활동 및 운동을 포함해 현재 체중을 유지하는 데 필요한 총 칼로리",
      "다이어트 공식: TDEE에서 약 300~500kcal 적게 섭취 시 안전하고 지속 가능한 체지방 감량 가능"
    ]
  }
];

tools.forEach(t => {
  const pageCode = `---
import Layout from '../../layouts/Layout.astro';
import ${t.component} from '../../components/tools/${t.component}';
import AdBanner from '../../components/ads/AdBanner.astro';
---

<Layout 
  title="${t.title}"
  description="${t.description}"
>
  <div class="max-w-4xl mx-auto space-y-8 py-4">
    <div class="text-center space-y-2">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full stitch-pill text-xs font-bold">
        ${t.tag}
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white">${t.h1}</h1>
      <p class="text-slate-400 text-sm sm:text-base">
        ${t.desc}
      </p>
    </div>

    <${t.component} client:load />

    {/* In-tool Horizontal Ad Slot */}
    <AdBanner type="horizontal" className="my-8" />

    <div class="mt-8 stitch-card p-6 rounded-3xl border border-indigo-500/20 space-y-3 text-sm text-slate-300">
      <h2 class="text-lg font-bold text-white">${t.guideTitle}</h2>
      <ul class="list-disc list-inside space-y-1.5 text-slate-400">
        ${t.guideItems.map(item => `<li>${item}</li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</Layout>
`;

  const filePath = path.join(ROOT_DIR, 'src/pages/tools', `${t.slug}.astro`);
  fs.writeFileSync(filePath, pageCode, 'utf8');
  console.log(`✅ Created src/pages/tools/${t.slug}.astro`);
});
