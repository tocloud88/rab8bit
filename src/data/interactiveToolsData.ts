export interface InteractiveToolItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  badge?: string;
  tags: string[];
}

export const INTERACTIVE_TOOLS: InteractiveToolItem[] = [
  {
    "slug": "salary-calculator",
    "title": "2026 연봉 실수령액 계산기",
    "description": "2026년 4대보험 요율과 근로소득세 간이세액표를 반영하여 세후 실수령액과 공제 항목을 실시간 계산합니다.",
    "category": "변환/계산",
    "icon": "💵",
    "badge": "2026 최신",
    "tags": [
      "연봉",
      "실수령액",
      "4대보험",
      "근로소득세",
      "월급"
    ]
  },
  {
    "slug": "stock-water",
    "title": "주식 물타기 & 평단가 계산기",
    "description": "보유 주식의 현재 평단가와 추가 매수 금액을 입력하여 최종 평단가와 목표 탈출 단가를 시뮬레이션합니다.",
    "category": "변환/계산",
    "icon": "📈",
    "badge": "투자 필수",
    "tags": [
      "주식",
      "물타기",
      "평단가",
      "추가매수",
      "수익률"
    ]
  },
  {
    "slug": "realtor-fee",
    "title": "부동산 중개보수(복비) 계산기",
    "description": "매매, 전세, 월세 거래금액에 따른 법정 상한 중개보수 요율과 부가세를 자동 계산합니다.",
    "category": "변환/계산",
    "icon": "🏠",
    "badge": "부동산",
    "tags": [
      "부동산",
      "복비",
      "중개수수료",
      "전세",
      "월세"
    ]
  },
  {
    "slug": "loan-calculator",
    "title": "대출 이자 & 상환 계산기",
    "description": "원리금 균등, 원금 균등, 만기 일시 상환 방식별 월 납입금과 총 이자 부담액을 비교 분석합니다.",
    "category": "변환/계산",
    "icon": "💳",
    "badge": "대출",
    "tags": [
      "대출",
      "원리금균등",
      "이자계산",
      "신용대출",
      "주택담보"
    ]
  },
  {
    "slug": "freelancer-tax",
    "title": "프리랜서 3.3% 원천징수 계산기",
    "description": "프리랜서 사업소득 원천징수세율 3.3%(소득세 3% + 지방소득세 0.3%) 차감 후 실수령액을 계산합니다.",
    "category": "변환/계산",
    "icon": "💼",
    "badge": "세금",
    "tags": [
      "프리랜서",
      "3.3%",
      "원천징수",
      "사업소득",
      "세후수령액"
    ]
  },
  {
    "slug": "crypto-calc",
    "title": "코인/가상자산 수익률 계산기",
    "description": "매수/매도 단가와 거래소 수수료(업비트, 빗썸, 바이낸스 등)를 반영하여 순수익과 손익분기점을 계산합니다.",
    "category": "변환/계산",
    "icon": "🪙",
    "badge": "가상자산",
    "tags": [
      "비트코인",
      "가상화폐",
      "수익률",
      "손익분기",
      "수수료"
    ]
  },
  {
    "slug": "windmill-savings",
    "title": "적금 풍차돌리기 플래너",
    "description": "매월 1년 만기 적금을 새로 개설하여 1년 후부터 매월 원금과 이자를 수령하는 적금 계획을 시뮬레이션합니다.",
    "category": "변환/계산",
    "icon": "🎡",
    "badge": "재테크",
    "tags": [
      "풍차돌리기",
      "적금",
      "예금",
      "복리",
      "목돈만들기"
    ]
  },
  {
    "slug": "youth-leap",
    "title": "청년도약계좌 만기 수령액 계산기",
    "description": "매월 납입액과 정부 기여금 매칭, 비과세 혜택을 합산하여 5년 만기 시 최종 수령액을 계산합니다.",
    "category": "변환/계산",
    "icon": "🌱",
    "badge": "청년지원",
    "tags": [
      "청년도약계좌",
      "청년지원",
      "정부기여금",
      "비과세",
      "만기수령"
    ]
  },
  {
    "slug": "comprehensive-tax",
    "title": "종합소득세 간편 모의계산기",
    "description": "과세표준 구간별 세율(6%~45%)과 누진공제액을 적용하여 예상 종합소득세를 계산합니다.",
    "category": "변환/계산",
    "icon": "📊",
    "badge": "절세",
    "tags": [
      "종합소득세",
      "종소세",
      "과세표준",
      "세율",
      "연말정산"
    ]
  },
  {
    "slug": "bonus-tax",
    "title": "상여금 & 보너스 세후 계산기",
    "description": "성과급, 명절 상여금, 인센티브 지급 시 소득세와 4대보험 공제 후 통장 수령액을 계산합니다.",
    "category": "변환/계산",
    "icon": "🎁",
    "badge": "급여",
    "tags": [
      "상여금",
      "보너스",
      "성과급",
      "인센티브",
      "세후"
    ]
  },
  {
    "slug": "weekly-holiday-pay",
    "title": "2026 주휴수당 & 알바비 계산기",
    "description": "주 15시간 이상 근무 시 지급되는 법정 주휴수당과 2026년 최저시급 기준 월 총지급액을 계산합니다.",
    "category": "변환/계산",
    "icon": "⏱️",
    "badge": "노무",
    "tags": [
      "주휴수당",
      "최저임금",
      "알바비",
      "시급",
      "노동법"
    ]
  },
  {
    "slug": "annual-leave-pay",
    "title": "미사용 연차수당 보상금 계산기",
    "description": "통상임금 기준 1일 통상시급을 산출하여 남은 미사용 연차에 대한 보상 수당을 계산합니다.",
    "category": "변환/계산",
    "icon": "🏖️",
    "badge": "직장인",
    "tags": [
      "연차수당",
      "통상임금",
      "연차보상",
      "직장인",
      "퇴사"
    ]
  },
  {
    "slug": "overtime-pay",
    "title": "연장·야간·휴일 가산수당 계산기",
    "description": "근로기준법상 법정 가산율(연장 1.5배, 야간 1.5배, 휴일 1.5~2배)을 적용한 추가 근로 수당을 산출합니다.",
    "category": "변환/계산",
    "icon": "🌙",
    "badge": "수당",
    "tags": [
      "야근수당",
      "연장근로",
      "휴일수당",
      "통상임금",
      "가산수당"
    ]
  },
  {
    "slug": "career-calculator",
    "title": "경력 개월수 & 근속기간 합산기",
    "description": "이직 및 이력서 작성 시 여러 회사의 입사일/퇴사일을 입력하여 총 경력 연수와 개월수를 합산합니다.",
    "category": "지식/정보",
    "icon": "📝",
    "badge": "이력서",
    "tags": [
      "경력계산",
      "이력서",
      "근속기간",
      "이직",
      "재직기간"
    ]
  },
  {
    "slug": "travel-expense",
    "title": "출장비 & 유류비 실비 정산기",
    "description": "국내외 출장 시 이동 거리당 유류비, 일비, 숙박비, 식비를 항목별로 취합하여 정산 보고서를 생성합니다.",
    "category": "변환/계산",
    "icon": "🚅",
    "badge": "업무",
    "tags": [
      "출장비",
      "유류비",
      "실비정산",
      "경비청구",
      "영수증"
    ]
  },
  {
    "slug": "bmi-calculator",
    "title": "BMI 체질량지수 & 비만도 판정기",
    "description": "신장과 체중을 기반으로 BMI 지수를 산출하고 저체중, 정상, 과체중, 비만 단계와 적정 체중 범위를 안내합니다.",
    "category": "변환/계산",
    "icon": "⚖️",
    "badge": "건강",
    "tags": [
      "BMI",
      "체질량지수",
      "비만도",
      "다이어트",
      "적정체중"
    ]
  },
  {
    "slug": "onerm-calc",
    "title": "1RM 헬스 3대 중량 계산기",
    "description": "반복 횟수와 중량을 바탕으로 벤치프레스, 스쿼트, 데드리프트의 최대 1회 중량(1RM)과 %별 훈련 무게표를 산출합니다.",
    "category": "변환/계산",
    "icon": "🏋️",
    "badge": "피트니스",
    "tags": [
      "1RM",
      "3대운동",
      "스쿼트",
      "벤치프레스",
      "데드리프트"
    ]
  },
  {
    "slug": "water-intake",
    "title": "하루 권장 물 섭취량 계산기",
    "description": "체중과 일일 활동량, 날씨를 고려하여 하루에 마셔야 할 최적의 음수량(mL)과 시간대별 가이드를 제공합니다.",
    "category": "지식/정보",
    "icon": "💧",
    "badge": "건강습관",
    "tags": [
      "물섭취량",
      "음수량",
      "수분보충",
      "건강관리",
      "다이어트"
    ]
  },
  {
    "slug": "alcohol-breakdown",
    "title": "음주 후 알코올 분해 시간 계산기",
    "description": "위드마크(Widmark) 공식을 기반으로 주종, 음주량, 체중에 따른 혈중 알코올 농도와 완전 분해 소요 시간을 모의 계산합니다.",
    "category": "지식/정보",
    "icon": "🍺",
    "badge": "음주안전",
    "tags": [
      "알코올분해",
      "숙취",
      "위드마크",
      "음주운전방지",
      "술자리"
    ]
  },
  {
    "slug": "pregnancy-calc",
    "title": "임신 주수 & 출산 예정일 계산기",
    "description": "마지막 생리 시작일 또는 배란일 기준으로 현재 임신 주수, D-Day, 출산 예정일과 주요 검진 일정을 계산합니다.",
    "category": "지식/정보",
    "icon": "👶",
    "badge": "육아/출산",
    "tags": [
      "임신주수",
      "출산예정일",
      "임신테스트",
      "임산부",
      "Dday"
    ]
  },
  {
    "slug": "baby-months",
    "title": "아기 개월수 & 예방접종 계산기",
    "description": "아기 생년월일을 입력하면 오늘 기준 만 나이, 개월수, 일수와 국가 필수 예방접종 추천 시기를 안내합니다.",
    "category": "지식/정보",
    "icon": "🍼",
    "badge": "육아",
    "tags": [
      "아기개월수",
      "생후일수",
      "예방접종",
      "육아일기",
      "영유아"
    ]
  },
  {
    "slug": "caffeine-calc",
    "title": "카페인 섭취량 & 반감기 계산기",
    "description": "커피, 에너지음료 섭취량에 따른 체내 잔류 카페인과 수면 방해 없는 취침 가능 시각을 계산합니다.",
    "category": "지식/정보",
    "icon": "☕",
    "badge": "피로회복",
    "tags": [
      "카페인",
      "커피",
      "수면",
      "반감기",
      "에너지음료"
    ]
  },
  {
    "slug": "quit-smoking",
    "title": "금연 일수 & 절약액 계산기",
    "description": "금연 시작일과 하루 흡연량을 입력하면 아낀 담뱃값, 연장된 예상 수명, 신체 회복 마일스톤을 실시간 집계합니다.",
    "category": "지식/정보",
    "icon": "🚭",
    "badge": "동기부여",
    "tags": [
      "금연",
      "담뱃값",
      "절약액",
      "건강회복",
      "금연일수"
    ]
  },
  {
    "slug": "shoe-size",
    "title": "해외 신발 & 의류 사이즈 환산표",
    "description": "한국(mm), 미국(US), 영국(UK), 유럽(EU), 일본(JP)의 남녀 및 아동 신발/의류 사이즈를 상호 변환합니다.",
    "category": "변환/계산",
    "icon": "👟",
    "badge": "직구필수",
    "tags": [
      "신발사이즈",
      "해외직구",
      "US사이즈",
      "EU사이즈",
      "의류치수"
    ]
  },
  {
    "slug": "unit-price-compare",
    "title": "100g/개당 최저가 가성비 비교기",
    "description": "용량과 가격이 제각각인 마트 상품들의 100g(100ml)당 단가를 비교하여 가장 저렴한 가성비 상품을 찾아냅니다.",
    "category": "변환/계산",
    "icon": "🛒",
    "badge": "알뜰소비",
    "tags": [
      "단위가격",
      "가성비",
      "100g단가",
      "마트비교",
      "최저가"
    ]
  },
  {
    "slug": "credit-card-pick",
    "title": "신용카드 피킹률(혜택율) 계산기",
    "description": "월 총 결제금액 대비 할인·적립 혜택 금액을 계산하여 카드의 혜택 체감률(피킹률) 등급을 진단합니다.",
    "category": "변환/계산",
    "icon": "💳",
    "badge": "소비생활",
    "tags": [
      "피킹률",
      "신용카드",
      "카드혜택",
      "캐시백",
      "알뜰금융"
    ]
  },
  {
    "slug": "fuel-cost-calc",
    "title": "자동차 유류비 & 충전비 비교기",
    "description": "주행거리와 연비, 유가를 입력하여 가솔린, 디젤, LPG, 전기차 간의 예상 주행 비용을 비교 계산합니다.",
    "category": "변환/계산",
    "icon": "🚗",
    "badge": "차량유지",
    "tags": [
      "유류비",
      "전기차충전",
      "연비계산",
      "기름값",
      "주행비용"
    ]
  },
  {
    "slug": "taxi-fare",
    "title": "택시 심야할증 & 예상 요금 계산기",
    "description": "이동 거리와 시간대(주간/심야할증 20%~40%)를 고려하여 전국 주요 도시의 택시 요금을 추산합니다.",
    "category": "변환/계산",
    "icon": "🚕",
    "badge": "교통",
    "tags": [
      "택시요금",
      "심야할증",
      "택시비",
      "대중교통",
      "할증시간"
    ]
  },
  {
    "slug": "pyeong-converter",
    "title": "아파트 평수 & 전용면적 환산기",
    "description": "평(坪)과 제곱미터(㎡)를 상호 변환하고 59㎡(24평형), 84㎡(34평형) 등 아파트 표준 전용면적 정보를 제공합니다.",
    "category": "변환/계산",
    "icon": "🏢",
    "badge": "부동산",
    "tags": [
      "평수계산",
      "제곱미터",
      "전용면적",
      "공급면적",
      "아파트"
    ]
  },
  {
    "slug": "gpa-converter",
    "title": "대학교 학점 변환기 (4.5/4.3/100점)",
    "description": "4.5 만점, 4.3 만점, 4.0 만점 학점을 백분율(100점) 점수로 상호 환산하여 취업 및 대학원 제출용 점수를 산출합니다.",
    "category": "변환/계산",
    "icon": "🎓",
    "badge": "학업/취업",
    "tags": [
      "학점변환",
      "대학교학점",
      "백분율",
      "4.5만점",
      "이력서"
    ]
  },
  {
    "slug": "lang-exam-calc",
    "title": "어학 시험 점수 환산기 (토익/오픽/토스)",
    "description": "TOEIC, OPIc, 토익스피킹, TOEFL, TEPS 점수 간의 상관 환산 등급표를 확인합니다.",
    "category": "지식/정보",
    "icon": "🗣️",
    "badge": "스펙/어학",
    "tags": [
      "토익환산",
      "오픽",
      "토익스피킹",
      "토플",
      "어학점수"
    ]
  },
  {
    "slug": "military-dday",
    "title": "군 복무일수 & 전역일 D-Day 계산기",
    "description": "입대일과 군별(육군, 해군, 공군, 해병대, 사회복무요원)을 선택하면 전역일과 복무 달성률(%)을 계산합니다.",
    "category": "지식/정보",
    "icon": "🪖",
    "badge": "군대/곰신",
    "tags": [
      "전역일계산기",
      "군복무일",
      "곰신",
      "육군복무기간",
      "Dday"
    ]
  },
  {
    "slug": "team-divider",
    "title": "랜덤 팀/조 나누기 추첨기",
    "description": "참가자 명단을 입력하고 원하는 팀 수나 인원수를 설정하면 공평하게 무작위 팀을 편성합니다.",
    "category": "게임/추첨",
    "icon": "👥",
    "badge": "모임/파티",
    "tags": [
      "팀나누기",
      "조편성",
      "랜덤추첨",
      "사다리",
      "모임게임"
    ]
  },
  {
    "slug": "lunch-roulette",
    "title": "오늘 뭐 먹지? 점심 메뉴 룰렛",
    "description": "한식, 중식, 일식, 양식, 분식 등 결정 장애를 해결해 주는 회전판 점심 메뉴 추천 룰렛입니다.",
    "category": "게임/추첨",
    "icon": "🍱",
    "badge": "직장인인기",
    "tags": [
      "점심메뉴",
      "메뉴추천",
      "룰렛",
      "음식추천",
      "오늘뭐먹지"
    ]
  },
  {
    "slug": "party-penalty",
    "title": "술자리 벌칙 & 미션 뽑기 룰렛",
    "description": "회식, MT, 파티에서 분위기를 띄우는 재미있는 벌칙과 미션을 무작위로 추첨합니다.",
    "category": "게임/추첨",
    "icon": "🎉",
    "badge": "술자리/MT",
    "tags": [
      "벌칙뽑기",
      "술게임",
      "미션룰렛",
      "파티게임",
      "MT게임"
    ]
  },
  {
    "slug": "balance-game",
    "title": "밸런스 게임 질문 생성기",
    "description": "연애, 직장, 황당, 극단적 선택 등 모임에서 즐길 수 있는 재미있는 밸런스 게임 문항을 랜덤 제시합니다.",
    "category": "게임/추첨",
    "icon": "⚖️",
    "badge": "아이스브레이킹",
    "tags": [
      "밸런스게임",
      "모임게임",
      "연애질문",
      "심리테스트",
      "파티"
    ]
  },
  {
    "slug": "dice-roller",
    "title": "3D 주사위 굴리기 시뮬레이터",
    "description": "1개부터 6개까지 원하는 수의 주사위를 물리 엔진 사운드와 함께 실시간으로 굴립니다.",
    "category": "게임/추첨",
    "icon": "🎲",
    "badge": "보드게임",
    "tags": [
      "주사위",
      "보드게임",
      "주사위굴리기",
      "랜덤숫자",
      "추첨"
    ]
  },
  {
    "slug": "reaction-time",
    "title": "순발력 반응속도 테스트 (ms 측정)",
    "description": "화면 색상이 바뀌는 순간을 터치하여 나의 밀리초(ms) 단위 반응속도와 상위 % 등급을 측정합니다.",
    "category": "게임/추첨",
    "icon": "⚡",
    "badge": "두뇌테스트",
    "tags": [
      "반응속도",
      "순발력",
      "밀리초",
      "반응속도시험",
      "게임"
    ]
  },
  {
    "slug": "chosung-quiz",
    "title": "초성 퀴즈 단어 생성기",
    "description": "사자성어, 영화 제목, 음식, 수도 등 카테고리별 초성을 제시하고 정답을 맞히는 퀴즈 도구입니다.",
    "category": "게임/추첨",
    "icon": "💡",
    "badge": "퀴즈게임",
    "tags": [
      "초성퀴즈",
      "낱말게임",
      "사자성어",
      "모임퀴즈",
      "브레인게임"
    ]
  },
  {
    "slug": "mbti-match",
    "title": "MBTI 16가지 성격 유형 궁합표",
    "description": "나의 MBTI와 상대방의 MBTI를 선택하여 환상의 궁합, 반반 궁합, 주의할 점을 확인합니다.",
    "category": "지식/정보",
    "icon": "🧩",
    "badge": "성격테스트",
    "tags": [
      "MBTI궁합",
      "MBTI",
      "성격유형",
      "연애궁합",
      "성향분석"
    ]
  },
  {
    "slug": "tarot-today",
    "title": "오늘의 타로 카드 1장 운세",
    "description": "78장의 타로 카드 중 1장을 직접 뽑아 오늘 하루의 흐름, 마음가짐, 조언을 확인합니다.",
    "category": "지식/정보",
    "icon": "🔮",
    "badge": "오늘의운세",
    "tags": [
      "타로카드",
      "오늘의운세",
      "타로점",
      "조언",
      "힐링"
    ]
  },
  {
    "slug": "password-generator",
    "title": "안전한 강력 비밀번호 생성기",
    "description": "길이, 대소문자, 숫자, 특수문자 조합을 커스텀하여 해킹에 안전한 무작위 비밀번호를 원클릭 복사합니다.",
    "category": "개발자",
    "icon": "🔐",
    "badge": "보안필수",
    "tags": [
      "비밀번호생성",
      "패스워드",
      "보안",
      "무작위비번",
      "클라우드보안"
    ]
  },
  {
    "slug": "case-converter",
    "title": "영문 대소문자 & 케이스 변환기",
    "description": "UPPERCASE, lowercase, camelCase, snake_case, PascalCase, kebab-case로 텍스트를 즉시 변환합니다.",
    "category": "텍스트",
    "icon": "🔤",
    "badge": "개발/문서",
    "tags": [
      "대소문자변환",
      "camelCase",
      "snake_case",
      "케이스변환",
      "코딩"
    ]
  },
  {
    "slug": "text-dedup",
    "title": "텍스트 중복 줄 제거 & 가나다 정렬기",
    "description": "대량의 텍스트 줄바꿈 목록에서 중복된 줄을 제거하고 가나다/알파벳 순서로 오름차순/내림차순 정렬합니다.",
    "category": "텍스트",
    "icon": "📋",
    "badge": "문서정리",
    "tags": [
      "중복제거",
      "가나다정렬",
      "줄바꿈정리",
      "텍스트정렬",
      "데이터정제"
    ]
  },
  {
    "slug": "morse-converter",
    "title": "모스 부호(Morse Code) 양방향 번역기",
    "description": "한글, 영문, 숫자를 국제 표준 모스 부호로 변환하고 모스 부호 소리(Audio Beep) 재생을 지원합니다.",
    "category": "텍스트",
    "icon": "📻",
    "badge": "암호/번역",
    "tags": [
      "모스부호",
      "MorseCode",
      "암호변환",
      "모스신호",
      "소리재생"
    ]
  },
  {
    "slug": "hash-generator",
    "title": "해시(Hash) 생성기 (MD5 / SHA-256)",
    "description": "입력 텍스트에 대한 MD5, SHA-1, SHA-256, SHA-512 해시 체크섬을 실시간으로 산출합니다.",
    "category": "개발자",
    "icon": "#️⃣",
    "badge": "개발보안",
    "tags": [
      "해시생성",
      "MD5",
      "SHA256",
      "체크섬",
      "암호화"
    ]
  },
  {
    "slug": "color-palette",
    "title": "웹 컬러 코드(HEX/RGB/HSL) 추출 & 팔레트",
    "description": "컬러 피커에서 색상을 선택하여 HEX, RGB, HSL 코드를 확인하고 조화로운 5색 테마 팔레트를 생성합니다.",
    "category": "개발자",
    "icon": "🎨",
    "badge": "디자인",
    "tags": [
      "컬러코드",
      "HEX코드",
      "RGB변환",
      "HSL",
      "색상팔레트"
    ]
  },
  {
    "slug": "unix-timestamp",
    "title": "Unix 타임스탬프(Epoch Time) 변환기",
    "description": "초/밀리초 단위 타임스탬프를 한국 표준시(KST) 및 UTC 날짜로 상호 변환하고 현재 타임스탬프를 복사합니다.",
    "category": "개발자",
    "icon": "⏱️",
    "badge": "시간변환",
    "tags": [
      "타임스탬프",
      "UnixTime",
      "Epoch",
      "날짜변환",
      "KST"
    ]
  },
  {
    "slug": "regex-tester",
    "title": "정규표현식(Regex) 실시간 테스터",
    "description": "정규식 패턴과 플래그(g, i, m)를 입력하여 대상 텍스트의 일치 항목을 하이라이팅하고 그룹을 추출합니다.",
    "category": "개발자",
    "icon": "🔍",
    "badge": "코딩필수",
    "tags": [
      "정규표현식",
      "Regex",
      "정규식테스트",
      "문자열패턴",
      "개발자"
    ]
  },
  {
    "slug": "html-entities",
    "title": "HTML 엔티티 인코더 & 디코더",
    "description": "<, >, &, \", ' 등 특수문자를 &lt;, &gt;, &quot; 등의 HTML 엔티티 코드로 상호 변환합니다.",
    "category": "개발자",
    "icon": "🏷️",
    "badge": "웹개발",
    "tags": [
      "HTML엔티티",
      "특수문자변환",
      "Entity인코딩",
      "XSS방지",
      "웹코딩"
    ]
  },
  {
    "slug": "css-gradient",
    "title": "CSS 그라데이션 & 그림자 생성기",
    "description": "선형/원형 그라데이션과 다중 박스 섀도우를 시각적으로 조작하고 완성된 CSS 코드를 원클릭 복사합니다.",
    "category": "개발자",
    "icon": "🌈",
    "badge": "CSS스타일",
    "tags": [
      "CSS그라데이션",
      "그라디언트",
      "BoxShadow",
      "CSS코드",
      "UI디자인"
    ]
  },
  {
    "slug": "svg-viewer",
    "title": "SVG 코드 실시간 뷰어 & 최적화",
    "description": "SVG XML 코드를 붙여넣으면 실시간으로 렌더링을 미리보고 Data-URI 및 클린 코드로 추출합니다.",
    "category": "개발자",
    "icon": "📐",
    "badge": "벡터그래픽",
    "tags": [
      "SVG뷰어",
      "SVG미리보기",
      "DataURI",
      "벡터아이콘",
      "디자인"
    ]
  },
  {
    "slug": "flexbox-grid",
    "title": "CSS Flexbox & Grid 인터랙티브 시각화",
    "description": "justify-content, align-items, flex-direction 등 Flex/Grid 속성을 슬라이더로 조작하며 동작 원리를 배웁니다.",
    "category": "개발자",
    "icon": "📦",
    "badge": "인터랙티브",
    "tags": [
      "Flexbox",
      "CSSGrid",
      "레이아웃",
      "웹퍼블리싱",
      "프론트엔드"
    ]
  },
  {
    "slug": "sql-formatter",
    "title": "SQL 쿼리 포매터 & 정렬기",
    "description": "줄바꿈 없는 길고 복잡한 SQL 쿼리문을 예약어 대문자화 및 들여쓰기로 깔끔하게 서식화합니다.",
    "category": "개발자",
    "icon": "🗄️",
    "badge": "DB쿼리",
    "tags": [
      "SQL정렬",
      "쿼리포매터",
      "SQL들여쓰기",
      "데이터베이스",
      "DBA"
    ]
  },
  {
    "slug": "subnet-calculator",
    "title": "IP 서브넷 마스크(CIDR) 계산기",
    "description": "IP 주소와 서브넷 비트(/24 등)를 입력하면 네트워크 주소, 브로드캐스트 주소, 가용 호스트 범위를 산출합니다.",
    "category": "개발자",
    "icon": "🌐",
    "badge": "네트워크",
    "tags": [
      "서브넷마스크",
      "CIDR",
      "IP계산",
      "네트워크",
      "호스트수"
    ]
  },
  {
    "slug": "user-agent-parser",
    "title": "User-Agent 브라우저 & 기기 파서",
    "description": "내 브라우저 또는 임의의 User-Agent 문자열을 분석하여 OS, 브라우저 엔진, 기기 종류를 파싱합니다.",
    "category": "개발자",
    "icon": "💻",
    "badge": "기기진단",
    "tags": [
      "UserAgent",
      "브라우저정보",
      "OS파싱",
      "기기확인",
      "헤더분석"
    ]
  },
  {
    "slug": "markdown-preview",
    "title": "마크다운(Markdown) 실시간 에디터",
    "description": "마크다운 문법으로 작성된 텍스트를 실시간으로 서식화된 HTML 뷰로 미리보고 HTML 코드를 복사합니다.",
    "category": "텍스트",
    "icon": "📝",
    "badge": "문서작성",
    "tags": [
      "마크다운",
      "Markdown",
      "MD에디터",
      "HTML변환",
      "블로그작성"
    ]
  },
  {
    "slug": "uuid-generator",
    "title": "UUID / GUID v4 대량 생성기",
    "description": "버전 4 암호학적 난수 기반 UUID를 원하는 개수(1~100개)만큼 생성하고 하이픈/대소문자 옵션을 제공합니다.",
    "category": "개발자",
    "icon": "🆔",
    "badge": "고유ID",
    "tags": [
      "UUID생성",
      "GUID",
      "난수ID",
      "고유식별자",
      "데이터베이스"
    ]
  },
  {
    "slug": "roman-converter",
    "title": "로마 숫자 ↔ 아라비아 숫자 변환기",
    "description": "로마 숫자(I, V, X, L, C, D, M)와 아라비아 숫자(1~3999)를 상호 변환하고 표기 규칙을 설명합니다.",
    "category": "변환/계산",
    "icon": "🏛️",
    "badge": "수학/기호",
    "tags": [
      "로마숫자",
      "아라비아숫자",
      "수학변환",
      "기호표기",
      "연도표기"
    ]
  },
  {
    "slug": "hangul-romanizer",
    "title": "한국어 로마자 표기법 변환기",
    "description": "국어의 로마자 표기법(문화체육관광부 고시) 표준에 맞춰 한글 이름, 도로명, 지명을 영문 표기로 변환합니다.",
    "category": "텍스트",
    "icon": "🇰🇷",
    "badge": "표준표기",
    "tags": [
      "로마자표기",
      "영문이름",
      "여권이름",
      "도로명영문",
      "한글영어"
    ]
  },
  {
    "slug": "aspect-ratio-calc",
    "title": "화면 비율(16:9 / 4:3) & 해상도 계산기",
    "description": "가로/세로 픽셀을 입력하여 최대공약수 기반 화면 비율을 구하거나, 원하는 비율에 맞는 픽셀 크기를 계산합니다.",
    "category": "변환/계산",
    "icon": "🖥️",
    "badge": "영상/화면",
    "tags": [
      "화면비율",
      "해상도계산",
      "16대9",
      "4K해상도",
      "픽셀계산"
    ]
  },
  {
    "slug": "duty-calculator",
    "title": "해외직구 관·부가세 계산기",
    "description": "미국($200), 일본·유럽·중국($150) 면세 한도와 품목별 예상 관세 및 부가세를 실시간 계산합니다.",
    "category": "변환/계산",
    "icon": "✈️",
    "badge": "2026 신규",
    "tags": [
      "해외직구",
      "관세",
      "부가세",
      "환율",
      "면세한도"
    ]
  },
  {
    "slug": "dutch-pay",
    "title": "스마트 더치페이 & 1/N 정산기",
    "description": "개인별 메뉴 금액에 배달팁과 할인쿠폰을 공평하게 분배하고 카카오톡 정산 문구를 생성합니다.",
    "category": "변환/계산",
    "icon": "🍗",
    "badge": "2026 신규",
    "tags": [
      "더치페이",
      "N분의1",
      "배달비",
      "정산",
      "카톡공유"
    ]
  },
  {
    "slug": "holiday-planner",
    "title": "황금연차 & 연휴 플래너",
    "description": "내 입사일 기준 연차 발생 일수 계산과 2026/2027년 최장 9일 황금연휴 추천 일정을 확인합니다.",
    "category": "지식/정보",
    "icon": "📅",
    "badge": "2026 신규",
    "tags": [
      "황금연차",
      "공휴일",
      "연차계산",
      "대체공휴일",
      "휴가"
    ]
  },
  {
    "slug": "severance-pay",
    "title": "퇴직금 & 실업급여 계산기",
    "description": "근속기간과 최근 3개월 급여 기반 예상 퇴직금 및 고용보험 실업급여 수급액을 모의 계산합니다.",
    "category": "변환/계산",
    "icon": "💰",
    "badge": "2026 신규",
    "tags": [
      "퇴직금",
      "실업급여",
      "구직급여",
      "평균임금",
      "급여"
    ]
  },
  {
    "slug": "savings-calc",
    "title": "예금·적금 이자 계산기",
    "description": "정기예금 및 적금 만기 시 원금, 세전 이자, 이자소득세(15.4%/비과세) 차감 후 만기 수령액을 계산합니다.",
    "category": "변환/계산",
    "icon": "🏦",
    "badge": "2026 신규",
    "tags": [
      "적금이자",
      "정기예금",
      "복리계산",
      "비과세",
      "풍차돌리기"
    ]
  },
  {
    "slug": "pomodoro-timer",
    "title": "뽀모도로 타이머 & 백색소음",
    "description": "25분 몰입과 5분 휴식 인터벌로 생산성을 극대화하며 오프라인 집중 백색소음을 재생합니다.",
    "category": "텍스트",
    "icon": "🍅",
    "badge": "2026 신규",
    "tags": [
      "뽀모도로",
      "타이머",
      "백색소음",
      "몰입",
      "생산성"
    ]
  },
  {
    "slug": "recipe-portion",
    "title": "요리 레시피 인분 변환기",
    "description": "1인분 레시피를 원하는 인분 수에 맞춰 자동 증량 계산하고 밥숟가락, 종이컵 계량으로 변환합니다.",
    "category": "변환/계산",
    "icon": "🍳",
    "badge": "2026 신규",
    "tags": [
      "레시피",
      "인분변환",
      "계량",
      "밥숟가락",
      "종이컵"
    ]
  },
  {
    "slug": "sleep-cycle",
    "title": "수면 사이클 계산기",
    "description": "90분 렘수면 주기를 바탕으로 아침에 가장 개운하게 눈뜰 수 있는 최적의 기상/취침 시각을 계산합니다.",
    "category": "지식/정보",
    "icon": "😴",
    "badge": "2026 신규",
    "tags": [
      "수면사이클",
      "렘수면",
      "기상시간",
      "알람",
      "피로회복"
    ]
  },
  {
    "slug": "dday-calculator",
    "title": "디데이(D-Day) & 기념일 계산기",
    "description": "기념일, 시험, 목표일까지 남은 D-Day와 100일, 1주년, 1000일 기념일 날짜를 자동 계산합니다.",
    "category": "변환/계산",
    "icon": "🎁",
    "badge": "2026 신규",
    "tags": [
      "디데이",
      "D-day",
      "기념일",
      "100일",
      "커플"
    ]
  },
  {
    "slug": "bmr-tdee-calc",
    "title": "기초대사량(BMR) & TDEE 계산기",
    "description": "나의 기초대사량과 하루 유지 칼로리를 계산하고 다이어트 맞춤 탄·단·지(g) 비율을 산출합니다.",
    "category": "변환/계산",
    "icon": "🔥",
    "badge": "2026 신규",
    "tags": [
      "기초대사량",
      "BMR",
      "TDEE",
      "다이어트",
      "칼로리",
      "탄단지"
    ]
  },
  {
    "slug": "character-counter",
    "title": "글자·단어 카운터",
    "description": "공백 포함/제외 글자수, 단어수, 바이트수, 원고지 분량 및 예상 읽기 시간을 실시간으로 계산합니다.",
    "category": "텍스트",
    "icon": "✍️",
    "badge": "필수 유틸",
    "tags": [
      "글자수",
      "바이트",
      "자기소개서",
      "원고지"
    ]
  },
  {
    "slug": "find-replace",
    "title": "문장 바꾸기",
    "description": "여러 단어를 한 번에 찾아 원하는 텍스트로 일괄 치환합니다. 정규표현식(RegEx) 지원.",
    "category": "텍스트",
    "icon": "🔄",
    "tags": [
      "치환",
      "다중교체",
      "정규식",
      "텍스트변환"
    ]
  },
  {
    "slug": "cheer",
    "title": "모두의 전광판",
    "description": "스마트폰 화면을 화려한 네온 LED 전광판으로 변신시킵니다. 콘서트, 응원, 피켓용 풀스크린 모드.",
    "category": "텍스트",
    "icon": "📣",
    "badge": "인기",
    "tags": [
      "LED전광판",
      "응원",
      "콘서트",
      "전체화면"
    ]
  },
  {
    "slug": "unit-converter",
    "title": "실시간 단위 변환기",
    "description": "길이, 무게, 넓이(평수), 부피, 온도, 데이터 등 일상의 모든 단위를 실시간으로 즉시 변환합니다.",
    "category": "변환/계산",
    "icon": "📐",
    "badge": "추천",
    "tags": [
      "평수",
      "무게",
      "길이",
      "온도",
      "실시간"
    ]
  },
  {
    "slug": "age-calculator",
    "title": "나이 계산기",
    "description": "생년월일을 입력하면 법적 만 나이, 연 나이, 세는 나이와 총 살아온 일수, 띠, 별자리를 확인합니다.",
    "category": "변환/계산",
    "icon": "🎂",
    "badge": "생활 필수",
    "tags": [
      "만나이",
      "생일",
      "띠",
      "살아온날"
    ]
  },
  {
    "slug": "lunar-converter",
    "title": "음력·양력 변환기",
    "description": "음력과 양력 사이의 날짜를 쉽게 상호 변환하고, 해당 연도의 60갑자 간지와 띠를 확인합니다.",
    "category": "변환/계산",
    "icon": "🌙",
    "tags": [
      "음력",
      "양력",
      "60갑자",
      "윤달"
    ]
  },
  {
    "slug": "birthday-secret",
    "title": "나의 탄생 비밀",
    "description": "생일만 입력하면 나의 탄생화(꽃말), 탄생석(보석말), 탄생목, 고유 탄생색을 한눈에 확인합니다.",
    "category": "지식/정보",
    "icon": "💎",
    "badge": "흥미",
    "tags": [
      "탄생석",
      "탄생화",
      "꽃말",
      "생일"
    ]
  },
  {
    "slug": "knitting-gauge",
    "title": "뜨개 게이지 계산기",
    "description": "스와치(10cm)의 코/단 수와 완성 치수를 기반으로 필요한 총 코 수와 단 수를 자동 환산합니다.",
    "category": "변환/계산",
    "icon": "🧶",
    "tags": [
      "뜨개질",
      "게이지",
      "코수계산",
      "단수"
    ]
  },
  {
    "slug": "ladder-game",
    "title": "사다리 타기",
    "description": "2인부터 12인까지 참여 가능한 실시간 사다리 게임. 점심 메뉴 고르기, 커피 내기, 벌칙 추첨.",
    "category": "게임/추첨",
    "icon": "🪜",
    "badge": "팀 게임",
    "tags": [
      "사다리타기",
      "점심내기",
      "벌칙",
      "추첨"
    ]
  },
  {
    "slug": "roulette",
    "title": "결정의 룰렛",
    "description": "선택지들을 입력하고 룰렛을 힘차게 돌려보세요. 점심 메뉴와 순번을 공정하게 결정합니다.",
    "category": "게임/추첨",
    "icon": "🎯",
    "tags": [
      "룰렛",
      "점심추천",
      "결정장애",
      "랜덤"
    ]
  },
  {
    "slug": "lotto-generator",
    "title": "로또 번호 생성기",
    "description": "제외 번호 지정 및 번호 합 통계 시뮬레이션 기반의 스마트 행운 로또 번호 6개 추천.",
    "category": "게임/추첨",
    "icon": "🎱",
    "badge": "대박기원",
    "tags": [
      "로또",
      "행운번호",
      "추첨",
      "번호생성"
    ]
  },
  {
    "slug": "charades",
    "title": "몸으로 말해요",
    "description": "영화, 속담, 동물, 인물 등 500+개 제시어로 즐기는 모임 파티 필수 스피드 제스처 게임.",
    "category": "게임/추첨",
    "icon": "🕺",
    "badge": "파티 필수",
    "tags": [
      "몸으로말해요",
      "제스처게임",
      "엠티",
      "파티게임"
    ]
  },
  {
    "slug": "speed-quiz",
    "title": "스피드 퀴즈",
    "description": "타이머와 점수판이 탑재된 실시간 단어 맞히기 스피드 퀴즈. 레크리에이션 진행용.",
    "category": "게임/추첨",
    "icon": "⚡",
    "tags": [
      "스피드퀴즈",
      "낱말게임",
      "레크리에이션",
      "타이머"
    ]
  },
  {
    "slug": "json-formatter",
    "title": "JSON 포맷터 & 뷰어",
    "description": "복잡한 JSON 데이터를 검증, 정렬, 압축(Minify)하고 트리 구조로 직관적으로 시각화합니다.",
    "category": "개발/코딩",
    "icon": "⚙️",
    "badge": "개발자 추천",
    "tags": [
      "JSON",
      "포맷터",
      "검증",
      "Beautify"
    ]
  },
  {
    "slug": "jwt-decoder",
    "title": "JWT 토큰 디코더",
    "description": "서버 전송 없이 브라우저에서 안전하게 JWT Header와 Payload를 디코딩하고 만료시간을 확인합니다.",
    "category": "개발/코딩",
    "icon": "🔐",
    "badge": "안전 보장",
    "tags": [
      "JWT",
      "디코더",
      "Token",
      "보안"
    ]
  },
  {
    "slug": "base64-encoder",
    "title": "Base64 인코더/디코더",
    "description": "텍스트와 이미지 파일을 브라우저 내에서 즉시 Base64 문자열로 상호 변환하고 복사합니다.",
    "category": "개발/코딩",
    "icon": "🔤",
    "tags": [
      "Base64",
      "인코딩",
      "디코딩",
      "DataURI"
    ]
  },
  {
    "slug": "url-encoder",
    "title": "URL 인코더/디코더",
    "description": "URL 특수문자 및 한글 쿼리스트링을 encodeURI / decodeURI 표준 규격으로 상호 변환합니다.",
    "category": "개발/코딩",
    "icon": "🔗",
    "tags": [
      "URL",
      "인코딩",
      "URI",
      "쿼리스트링"
    ]
  },
  {
    "slug": "cron-parser",
    "title": "Cron 표현식 번역기",
    "description": "난해한 Cron 정기작업 표현식을 사람이 읽기 쉬운 한국어 설명 및 다음 실행 예정 시각으로 해석합니다.",
    "category": "개발/코딩",
    "icon": "⏰",
    "tags": [
      "Cron",
      "스케줄러",
      "Crontab",
      "리눅스"
    ]
  },
  {
    "slug": "my-ip",
    "title": "내 IP & 환경 확인",
    "description": "현재 접속 중인 공인 IP 주소, 국가/도시 위치, ISP, 브라우저 User-Agent 정보를 실시간 확인합니다.",
    "category": "개발/코딩",
    "icon": "🌐",
    "tags": [
      "IP주소",
      "공인IP",
      "위치",
      "브라우저정보"
    ]
  },
  {
    "slug": "qr-code",
    "title": "QR 코드 생성기",
    "description": "URL, 와이파이 접속, 텍스트를 고화질 커스텀 색상 QR 코드로 즉시 생성하고 PNG로 저장합니다.",
    "category": "이미지/미디어",
    "icon": "📱",
    "badge": "무료 다운로드",
    "tags": [
      "QR코드",
      "와이파이QR",
      "바코드",
      "생성기"
    ]
  },
  {
    "slug": "barcode-generator",
    "title": "바코드 생성기",
    "description": "CODE128, EAN-13, UPC 등 표준 규격 바코드를 실시간 렌더링하고 이미지로 다운로드합니다.",
    "category": "이미지/미디어",
    "icon": "📊",
    "tags": [
      "바코드",
      "CODE128",
      "EAN13",
      "라벨"
    ]
  },
  {
    "slug": "transparent-background",
    "title": "누끼 이미지 배경 투명화",
    "description": "클릭 한 번으로 특정 배경색을 감지하여 투명한 PNG 이미지로 즉시 변환합니다 (Canvas 처리).",
    "category": "이미지/미디어",
    "icon": "🪄",
    "badge": "로컬 처리",
    "tags": [
      "누끼따기",
      "투명화",
      "배경제거",
      "PNG"
    ]
  },
  {
    "slug": "new-word",
    "title": "최신 신조어·밈 사전",
    "description": "2026년 최신 유행어와 MZ 밈 신조어의 유래, 정확한 뜻, 실전 대화 예시를 한눈에 검색합니다.",
    "category": "지식/정보",
    "icon": "📖",
    "badge": "매월 업데이트",
    "tags": [
      "신조어",
      "유행어",
      "MZ세대",
      "밈"
    ]
  },
  {
    "slug": "howto",
    "title": "생활의 꿀팁 백과",
    "description": "청소, 요리, 옷 관리, 자취생 꿀팁 등 일상 속 번거로운 문제들의 1분 명쾌한 해결법 모음.",
    "category": "지식/정보",
    "icon": "💡",
    "tags": [
      "생활팁",
      "자취",
      "청소법",
      "꿀팁"
    ]
  },
  {
    "slug": "qna-a-day",
    "title": "하루 한 줄 질문",
    "description": "매일 새로운 질문에 답하며 나 자신을 돌아보는 디지털 다이어리 & 생각 기록장.",
    "category": "지식/정보",
    "icon": "📝",
    "tags": [
      "일기",
      "자아성찰",
      "질문다이어리",
      "기록"
    ]
  },
  {
    "slug": "restaurant-map",
    "title": "주변 맛집 & 편의시설 탐색",
    "description": "현재 내 위치를 기반으로 주변의 맛집, 카페, 편의점, 주유소 위치를 지도에서 즉시 탐색합니다.",
    "category": "지식/정보",
    "icon": "🗺️",
    "tags": [
      "맛집",
      "주변탐색",
      "지도",
      "카페"
    ]
  },
  {
    "slug": "bookmarks",
    "title": "자주 찾는 포털 바로가기",
    "description": "국내 주요 포털, 쇼핑몰, 금융, 공공기관의 공식 바로가기 링크를 깔끔하게 모아두었습니다.",
    "category": "지식/정보",
    "icon": "⭐",
    "tags": [
      "바로가기",
      "포털",
      "즐겨찾기",
      "링크모음"
    ]
  },
  {
    "slug": "rankings",
    "title": "실시간 트렌드 랭킹",
    "description": "영화 순위, 음원 차트, 도서 베스트셀러 등 실시간 인기 트렌드를 한눈에 브리핑합니다.",
    "category": "지식/정보",
    "icon": "🏆",
    "tags": [
      "실시간",
      "랭킹",
      "트렌드",
      "베스트셀러"
    ]
  },
  {
    "slug": "dev-people",
    "title": "IT 개발자 성향 테스트",
    "description": "몇 가지 질문으로 나의 개발자 페르소나와 최적의 기술 스택 궁합을 재미있게 분석해드립니다.",
    "category": "지식/정보",
    "icon": "🧑‍💻",
    "tags": [
      "심리테스트",
      "개발자",
      "성향분석",
      "테스트"
    ]
  }
];
