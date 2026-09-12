export interface AiTool {
  id?: string;
  name: string;
  link: string;
  description: string;
  category: string;
  keywords: string[];
}

export const AI_CATEGORIES = [
  "전체",
  "대화형 AI 및 글쓰기",
  "코드 및 개발",
  "영상 및 오디오 제작",
  "이미지 및 디자인",
  "업무 자동화 및 에이전트",
  "연구 및 분석",
  "마케팅 및 비즈니스",
  "비즈니스 생산성"
] as const;

export const AI_TOOLS: AiTool[] = [
  {
    "name": "Sseoba",
    "link": "https://www.sseoba.com/",
    "description": "GPT, Recraft, Imagen, Ideogram 등 다양한 최신 모델을 한곳에서 무제한으로 이용할 수 있는 한국어 특화 올인원 AI 플랫폼입니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": [
      "글쓰기",
      "정보 검색",
      "문서 요약"
    ]
  },
  {
    "name": "Poe",
    "link": "https://poe.com/",
    "description": "Quora에서 제공하는 플랫폼으로, ChatGPT, Claude 등 다양한 모델을 한 번에 구독하여 사용하고 자신만의 챗봇을 쉽게 제작할 수 있습니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": [
      "글쓰기",
      "정보 검색",
      "문서 요약"
    ]
  },
  {
    "name": "Awesome MCP Servers",
    "link": "https://mcpservers.org/",
    "description": "Model Context Protocol(MCP)을 지원하는 서버들을 집계하여 오픈소스로 제공하는 저장소로, AI 에이전트의 확장성을 높이는 데 필수적인 리소스입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "codex",
    "link": "https://openai.com/index/introducing-codex/",
    "description": "OpenAI의 코드 생성 모델을 활용하여 독립적으로 소프트웨어 엔지니어링 작업을 수행하고 복잡한 프로그래밍 문제를 해결하는 에이전트 서비스입니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Langchain Open Agent Platform",
    "link": "https://oap.langchain.com/signin",
    "description": "UI, 실행 환경, 멀티 액션 기능을 통합하여 누구나 정교한 AI 에이전트 플랫폼을 구축하고 운영할 수 있도록 지원하는 도구입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "boo.ai",
    "link": "https://boo.ai",
    "description": "문맥을 이해하고 자연스러운 문장을 제안하는 AI 글쓰기 비서로, 논문, 에세이, 블로그 포스팅 등 긴 글 작성을 효율적으로 도와줍니다.",
    "category": "연구 및 분석",
    "keywords": [
      "글쓰기",
      "교육/리서치",
      "정보 검색"
    ]
  },
  {
    "name": "ChatGPT",
    "link": "https://chatgpt.com",
    "description": "아이디어 구상부터 복잡한 보고서 작성, 코드 리뷰 및 데이터 분석까지 수행하는 범용 AI 서비스로, 최근 이미지 생성 및 음성 대화 기능이 대폭 강화되었습니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": [
      "이미지 생성",
      "코드 개발",
      "데이터 분석"
    ]
  },
  {
    "name": "Claude",
    "link": "https://claude.ai",
    "description": "Anthropic에서 개발한 AI로 인간적인 어조와 정교한 논리력을 갖추었으며, 특히 대용량 문서 분석과 코드 작성에서 매우 높은 신뢰도를 보여줍니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": [
      "코드 개발",
      "데이터 분석",
      "글쓰기"
    ]
  },
  {
    "name": "Copilot",
    "link": "https://copilot.microsoft.com/",
    "description": "Microsoft 서비스 전반에 통합된 AI 비서로, Office 도구와 연동하여 문서 초안 작성, PPT 슬라이드 생성, 이메일 답장 등을 자동화합니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "프레젠테이션",
      "업무 자동화",
      "협업/관리"
    ]
  },
  {
    "name": "copy.ai",
    "link": "https://copy.ai",
    "description": "마케팅 카피라이팅에 특화된 AI로, 제품 설명, 광고 문구, 이메일 마케팅 소구점 등을 브랜드 보이스에 맞춰 빠르게 생성해 줍니다.",
    "category": "마케팅 및 비즈니스",
    "keywords": [
      "글쓰기",
      "마케팅/광고",
      "웹사이트 제작"
    ]
  },
  {
    "name": "DeepSeek",
    "link": "https://chat.deepseek.com",
    "description": "강력한 추론 능력과 코딩 성능을 갖춘 오픈소스 지향형 LLM으로, 기술적인 질문 답변과 복잡한 문제 해결에 최적화된 성능을 제공합니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": [
      "글쓰기",
      "정보 검색",
      "문서 요약"
    ]
  },
  {
    "name": "Felo",
    "link": "https://chat.felo.ai",
    "description": "다양한 AI 모델의 답변을 실시간으로 비교하고, 정보를 시각화하여 사용자가 최적의 결정을 내릴 수 있도록 돕는 스마트 검색 및 대화 도구입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "정보 검색",
      "디자인/편집",
      "교육/리서치"
    ]
  },
  {
    "name": "Gemini",
    "link": "https://gemini.google.com",
    "description": "구글의 최신 멀티모달 모델로, 구글 검색, 워크스페이스, 유튜브 등 구글 생태계와 밀접하게 연동되어 정보를 탐색하고 콘텐츠를 생성합니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": [
      "정보 검색",
      "업무 자동화",
      "글쓰기"
    ]
  },
  {
    "name": "Genspark",
    "link": "https://genspark.ai",
    "description": "여러 AI 엔진의 검색 결과를 취합하여 하나의 완성된 리포트 형태로 제공하며, 사용자의 의도에 맞춰 정보를 재구성하는 AI 기반 리서치 플랫폼입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "정보 검색",
      "교육/리서치",
      "데이터 분석"
    ]
  },
  {
    "name": "Grok",
    "link": "https://grok.com/",
    "description": "X(구 트위터)의 실시간 데이터를 학습하여 최신 뉴스와 이슈에 대해 유머러스하고 개성 있는 답변을 제공하는 대화형 AI입니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": [
      "데이터 분석",
      "교육/리서치",
      "글쓰기"
    ]
  },
  {
    "name": "Jenni.AI",
    "link": "https://jenni.ai/",
    "description": "아카데믹 리서치 보조 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "교육/리서치",
      "정보 검색",
      "데이터 분석"
    ]
  },
  {
    "name": "Le Chat",
    "link": "https://chat.mistral.ai/chat",
    "description": "프랑스 스타트업 미스트랄 AI에서 만든 AI 어시스턴트 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "Liner",
    "link": "https://getliner.com",
    "description": "데이터 기반 리서치 및 에세이 작성 도우미 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "글쓰기",
      "데이터 분석",
      "교육/리서치"
    ]
  },
  {
    "name": "Perplexity",
    "link": "https://perplexity.ai",
    "description": "답변의 출처를 명확히 제시하는 대화형 검색 엔진으로, 환각 현상을 최소화하고 최신 웹 정보를 기반으로 정확한 지식을 전달합니다.",
    "category": "연구 및 분석",
    "keywords": [
      "정보 검색",
      "교육/리서치",
      "데이터 분석"
    ]
  },
  {
    "name": "Qwen",
    "link": "https://chat.qwen.ai/c/guest",
    "description": "알리바바 클라우드가 개발한 초대규모 언어 모델 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "STORM",
    "link": "https://storm.genie.stanford.edu",
    "description": "스탠퍼드 대학의 리서치 보조 AI 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "교육/리서치",
      "정보 검색",
      "데이터 분석"
    ]
  },
  {
    "name": "Writesonic",
    "link": "https://app.writesonic.com",
    "description": "콘텐츠 작성 지원 AI 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "AnimateAI",
    "link": "https://animateai.pro",
    "description": "이미지에 모션을 추가하는 애니메이션 생성기 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Creati.ai",
    "link": "https://creati.ai/",
    "description": "제품 사진 드롭하면 제품 홍보 영상이 한번에 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "마케팅 및 비즈니스",
    "keywords": [
      "영상 제작",
      "마케팅/광고",
      "디자인/편집"
    ]
  },
  {
    "name": "Dreamina",
    "link": "https://dreamina.capcut.com",
    "description": "CapCut 기반의 생성형 영상 제작 툴 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Fliki",
    "link": "https://fliki.ai",
    "description": "AI로 텍스트→비디오·음성 자동변환 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "FLORA",
    "link": "https://florafauna.ai",
    "description": "node 기반 생성형 영상 콘텐츠 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Freepik",
    "link": "https://freepik.com",
    "description": "영상 템플릿 및 애니메이션 요소 제공 (생성형 영상 기능 포함) 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Genspark",
    "link": "https://www.genspark.ai/",
    "description": "여러 AI 엔진의 검색 결과를 취합하여 하나의 완성된 리포트 형태로 제공하며, 사용자의 의도에 맞춰 정보를 재구성하는 AI 기반 리서치 플랫폼입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "정보 검색",
      "교육/리서치",
      "데이터 분석"
    ]
  },
  {
    "name": "GetYarn.io",
    "link": "https://yarn.co",
    "description": "대사 또는 인용구 기반으로 영상 클립 검색 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "정보 검색",
      "영상 제작",
      "디자인/편집"
    ]
  },
  {
    "name": "HailuoAI",
    "link": "https://hailuoai.video/",
    "description": "카메라 움직임이 포함된 AI 영상 생성 플랫폼 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Higgsfield",
    "link": "https://higgsfield.ai",
    "description": "모션 제어 특화 생성형 영상 플랫폼 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "ImagineArt Video Studio",
    "link": "https://imagine.art",
    "description": "사진이나 텍스트를 영상으로 바꿔주는 AI 스튜디오 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Kling",
    "link": "https://klingai.com",
    "description": "차세대 영상 제작을 위한 생성형 크리에이티브 스튜디오 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Krea AI",
    "link": "https://krea.ai",
    "description": "디자인 보조뿐 아니라 모션 그래픽 영상 생성을 지원 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Luma",
    "link": "https://lumalabs.ai",
    "description": "3D 비디오 생성과 4D 재구성 기능 포함 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "MagicLight",
    "link": "https://www.magiclight.ai/",
    "description": "극본 스토리, 씬생성, 등장인물 캐릭터 설정, 애니메이션 생성 한방에 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Pictory",
    "link": "https://pictory.ai",
    "description": "AI로 텍스트→영상 즉시 자동변환 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Pika",
    "link": "https://pikaai.org/image-to-video/",
    "description": "매일 출석으로 크레딧을 제공받는 실험적 AI 영상 도구 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Pix Verse",
    "link": "https://app.pixverse.ai/create",
    "description": "360도 회전 등 모션 템플릿이 많다. 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Playground",
    "link": "https://playgroundai.com",
    "description": "텍스트 입력과 터치를 기반으로 작동 가능한 인터랙티브 영상 플랫폼 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Qwen",
    "link": "https://chat.qwen.ai/",
    "description": "중국 알리바바 그룹의 영상 AI 모델 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Runway",
    "link": "https://app.runwayml.com",
    "description": "텍스트나 이미지를 영상으로 변환하는 생성형 비디오 AI 분야의 선두주자로, 영화 같은 영상미와 세밀한 편집 기능을 제공합니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Sora",
    "link": "https://openai.com/sora",
    "description": "텍스트를 고해상도 영상으로 변환하는 생성형 영상 AI (OpenAI) 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Veo2",
    "link": "https://gemini.google/overview/video-generation/?hl=en",
    "description": "Google DeepMind의 고급 영상 생성 AI 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Vidu",
    "link": "https://vidu.com",
    "description": "빠른 영상 생성과 캐릭터 애니메이션 지원 서비스를 통해 텍스트나 이미지만으로 역동적인 비디오 콘텐츠를 제작하고 편집할 수 있는 혁신적인 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Capcut",
    "link": "https://capcut.com",
    "description": "모바일 및 웹 기반 영상 편집 도구 (AI 기능 포함) 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Captions",
    "link": "https://desktop.captions.ai",
    "description": "영상 자막 생성 및 전사 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "Invideo",
    "link": "https://invideo.io",
    "description": "텍스트 프롬프트 기반 AI 영상 제작 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "Quso.ai",
    "link": "https://quso.ai",
    "description": "SNS용 짧은 영상 자동 제작 툴 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "Recut",
    "link": "https://getrecut.com",
    "description": "영상 자동 편집 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "VEED",
    "link": "https://veed.io",
    "description": "영상 편집 및 자막, 텍스트 기반 영상 생성 지원 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Vrew",
    "link": "https://vrew.voyagerx.com",
    "description": "AI 기반 자막 생성 및 영상 요약 기능 제공 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "문서 요약",
      "음성/오디오"
    ]
  },
  {
    "name": "AI Studio",
    "link": "https://aistudio.google.com",
    "description": "구글 웹 기반 개발 환경을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Anichat",
    "link": "https://www.anichat.ai/",
    "description": "챗봇 개발을 위한 플랫폼을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Codev",
    "link": "https://www.co.dev/",
    "description": "코드 자동 생성 및 코드 시각화 보조 도구 (text to APP)을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "디자인/편집",
      "업무 자동화"
    ]
  },
  {
    "name": "Cursor",
    "link": "https://cursor.com",
    "description": "AI가 코드 전체 맥락을 이해하여 자동 완성 및 오류 수정을 도와주는 코딩 전용 에디터로, 개발 생산성을 수배 이상 향상시킵니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Framer",
    "link": "https://framer.com",
    "description": "인터랙티브 웹사이트를 손쉽게 제작할 수 있는 빌더을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "마케팅 및 비즈니스",
    "keywords": [
      "웹사이트 제작",
      "코드 개발",
      "마케팅/광고"
    ]
  },
  {
    "name": "Lovable",
    "link": "https://lovable.dev/",
    "description": "감정 기반 콘텐츠 시각화 툴을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "디자인/편집",
      "업무 자동화"
    ]
  },
  {
    "name": "Relume",
    "link": "https://relume.io",
    "description": "웹사이트 UI 컴포넌트를 자동 생성해주는 도구을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "웹사이트 제작",
      "코드 개발",
      "업무 자동화"
    ]
  },
  {
    "name": "Replit",
    "link": "https://replit.com",
    "description": "브라우저 기반 클라우드 코딩 환경을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Reweb",
    "link": "https://www.reweb.so/",
    "description": "웹페이지를 자동으로 생성/리팩토링해주는 AI 개발 도구을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "웹사이트 제작",
      "코드 개발",
      "업무 자동화"
    ]
  },
  {
    "name": "Trae",
    "link": "https://www.trae.ai/",
    "description": "디자인 및 프론트엔드 중심의 시각화 아이디어 생성 도구을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "디자인/편집",
      "업무 자동화"
    ]
  },
  {
    "name": "VO",
    "link": "https://v0.dev/",
    "description": "문서와 노션 기반 콘텐츠를 자동 시각화을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "디자인/편집",
      "업무 자동화"
    ]
  },
  {
    "name": "Windsurf",
    "link": "https://windsurf.com/",
    "description": "확장 기능을 갖춘 AI 코드 에디터을(를) 지원하여 복잡한 프로그래밍 지식 없이도 AI와의 대화를 통해 코드를 작성하고 소프트웨어를 개발할 수 있게 돕습니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Carrd",
    "link": "https://carrd.co",
    "description": "단일 페이지 랜딩 사이트를 쉽게 제작을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "DeepL",
    "link": "https://deepl.com",
    "description": "고정밀 AI 번역 도구을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "DoNotPay",
    "link": "https://donotpay.com",
    "description": "AI 법률 조언 및 자동화 법률문서 생성 도구을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Emailnator",
    "link": "https://emailnator.com",
    "description": "임시 이메일 생성 도구을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Gumroad",
    "link": "https://gumroad.com",
    "description": "디지털 제품을 온라인에서 판매할 수 있는 플랫폼을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Lilys AI",
    "link": "https://lilys.ai/",
    "description": "유튜브 영상 요약 제미나이 보다 아주 디테일하게 요약을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "영상 제작",
      "업무 자동화",
      "문서 요약"
    ]
  },
  {
    "name": "Manus",
    "link": "https://manus.im",
    "description": "단순 답변을 넘어 웹 서핑, 파일 편집 등 실제 업무 단계를 자율적으로 수행하는 차세대 AI 에이전트로 실무 자동화의 핵심 도구입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "디자인/편집",
      "문서 요약"
    ]
  },
  {
    "name": "Particle",
    "link": "https://particle.news",
    "description": "맞춤형 뉴스 피드 생성기을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Pocket Prompt",
    "link": "https://www.pocket-prompt.com/prompt/text",
    "description": "한글 프롬프트 보물 창고을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "PRPT",
    "link": "https://prpt.ai",
    "description": "AI 관련 콘텐츠 및 링크 제공 도구을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Timely",
    "link": "https://app.timelyapp.com",
    "description": "작업 시간 자동 기록 및 워크 플로우 추적을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Tools AI Online",
    "link": "https://tools-ai.online",
    "description": "최신 AI 툴 디렉토리을(를) 통해 반복 업무를 자동화하고 업무 흐름을 개선하여 개인과 팀의 업무 효율성을 극대화해주는 생산성 솔루션입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Aippt",
    "link": "https://www.aippt.com/",
    "description": "AI 기반 프레젠테이션 자동 생성기 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "프레젠테이션",
      "업무 자동화",
      "협업/관리"
    ]
  },
  {
    "name": "Canva",
    "link": "https://canva.com",
    "description": "디자인을 쉽게 만들 수 있는 올인원 그래픽 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Designify",
    "link": "https://www.designify.com/",
    "description": "자동 디자인 생성 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Felo",
    "link": "https://felo.ai/search",
    "description": "다양한 AI 모델의 답변을 실시간으로 비교하고, 정보를 시각화하여 사용자가 최적의 결정을 내릴 수 있도록 돕는 스마트 검색 및 대화 도구입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "정보 검색",
      "디자인/편집",
      "교육/리서치"
    ]
  },
  {
    "name": "Fontjoy",
    "link": "https://fontjoy.com/",
    "description": "타이포그래피 최적화 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "Gamma",
    "link": "https://gamma.app",
    "description": "텍스트만 입력하면 프레젠테이션 슬라이드, 웹사이트, 문서 형식을 자동으로 디자인해주는 시각화 도구로 작업 시간을 획기적으로 단축해줍니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "프레젠테이션",
      "웹사이트 제작",
      "디자인/편집"
    ]
  },
  {
    "name": "Khroma",
    "link": "https://www.khroma.co/",
    "description": "AI 색상 조합 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "Let's Enhance",
    "link": "https://letsenhance.io/",
    "description": "이미지 리터칭 & 업스케일 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Mapify",
    "link": "https://mapify.ai",
    "description": "데이터 기반 시각적 맵 및 분석 시각화 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "데이터 분석",
      "디자인/편집",
      "교육/리서치"
    ]
  },
  {
    "name": "Napkin",
    "link": "https://app.napkin.ai",
    "description": "노트 및 아이디어 시각화 도구, 와우 다이어그램 지원 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "디자인/편집",
      "업무 자동화",
      "협업/관리"
    ]
  },
  {
    "name": "PicWish",
    "link": "https://picwish.com",
    "description": "AI로 사진 편집·배경 제거 자동화 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "디자인/편집",
      "협업/관리"
    ]
  },
  {
    "name": "Removebg",
    "link": "https://www.remove.bg/",
    "description": "배경 제거 & 편집 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "디자인/편집",
      "업무 자동화",
      "협업/관리"
    ]
  },
  {
    "name": "Slides AI",
    "link": "https://slidesai.io",
    "description": "AI로 텍스트→PPT 즉시 자동 제작 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "Uizard",
    "link": "https://uizard.io",
    "description": "AI로 UI 디자인·프로토타입 자동 생성 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Apob",
    "link": "https://apob.ai/",
    "description": "대화형 아바타 생성 플랫폼 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "D-ID",
    "link": "https://d-id.com",
    "description": "정적 이미지에 음성을 입혀 아바타 영상을 생성 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "Hedra",
    "link": "https://www.hedra.com/",
    "description": "AI 기반 립싱크 처리 플랫폼 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "Heygen",
    "link": "https://heygen.com",
    "description": "AI 아바타 및 프레젠터 기반 영상 제작 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "Resemble AI",
    "link": "https://app.resemble.ai",
    "description": "음성 클로닝 및 음성 합성 생성 AI 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "음성/오디오",
      "영상 제작",
      "디자인/편집"
    ]
  },
  {
    "name": "Sync",
    "link": "https://sync.so/",
    "description": "맞춤형 아바타와 립싱크 영상을 만드는 생성형 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "Synthesia",
    "link": "https://app.synthesia.io",
    "description": "프레젠터형 립싱크 영상 제작 플랫폼 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "AlphaXiv",
    "link": "https://www.alphaxiv.org/explore",
    "description": "논문 추천 및 요약 중심의 AI 리서치 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "문서 요약",
      "교육/리서치",
      "정보 검색"
    ]
  },
  {
    "name": "Consensus",
    "link": "https://consensus.app",
    "description": "리서치 논문 기반 AI 요약 검색 엔진 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "정보 검색",
      "문서 요약",
      "교육/리서치"
    ]
  },
  {
    "name": "NotebookLM",
    "link": "https://notebooklm.google.com",
    "description": "사용자가 업로드한 문서를 기반으로 답변을 생성하는 구글의 퍼스널 AI 노트로, 문서 간의 연결 고리를 찾고 요약 및 통찰력을 제공하는 데 탁월합니다.",
    "category": "연구 및 분석",
    "keywords": [
      "문서 요약",
      "교육/리서치",
      "정보 검색"
    ]
  },
  {
    "name": "ElevenLabs",
    "link": "https://elevenlabs.io",
    "description": "고품질 텍스트-음성 변환 (TTS) 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "음성/오디오",
      "영상 제작",
      "디자인/편집"
    ]
  },
  {
    "name": "MusicFX",
    "link": "https://labs.google/fx/ko/tools/music-fx-dj",
    "description": "Google DeepMind가 개발한 AI 음악 생성 실험 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "음성/오디오",
      "업무 자동화"
    ]
  },
  {
    "name": "Soundraw",
    "link": "https://soundraw.io",
    "description": "AI로 음악 자동 생성·커스터마이징 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "음성/오디오",
      "영상 제작",
      "디자인/편집"
    ]
  },
  {
    "name": "Suno",
    "link": "https://suno.com",
    "description": "가사와 스타일만 입력하면 보컬이 포함된 완벽한 노래를 만들어주는 AI 작곡 도구로, 음악적 지식 없이도 고퀄리티 음원 생성이 가능합니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "음성/오디오",
      "디자인/편집",
      "영상 제작"
    ]
  },
  {
    "name": "Udio",
    "link": "https://www.udio.com",
    "description": "텍스트 기반 AI 음악 생성 플랫폼, Suno 대안으로 부상 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "음성/오디오",
      "영상 제작",
      "디자인/편집"
    ]
  },
  {
    "name": "YuE AI",
    "link": "https://yueai.ai",
    "description": "AI 기반 작곡 툴 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "Adobe Firefly",
    "link": "https://firefly.adobe.com",
    "description": "어도비 기반 생성형 이미지/디자인 도구 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Clipfly.ai",
    "link": "https://clipfly.ai",
    "description": "지브리풍 이미지 생성 및 편집을 지원하는 영상 플랫폼 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "이미지 생성",
      "영상 제작",
      "디자인/편집"
    ]
  },
  {
    "name": "FlexClip",
    "link": "https://flexclip.com",
    "description": "지브리 스타일 이미지 편집 및 클립 변환 도구 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Fortor",
    "link": "https://goart.fotor.com",
    "description": "사진을 예술적 스타일로 변환, 지브리 느낌 연출 가능 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Freepik",
    "link": "https://freepik.com",
    "description": "상업용 벡터/일러스트 리소스 기반 AI 이미지 추천 및 생성 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Getimg.ai",
    "link": "https://getimg.ai",
    "description": "지브리 스타일 이미지 생성이 가능한 멀티 모델 기반 생성기 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Gling",
    "link": "https://app.gling.ai",
    "description": "영상 자동 편집 AI (영상 클립 생성 포함) 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "디자인/편집",
      "음성/오디오"
    ]
  },
  {
    "name": "Ideogram",
    "link": "https://ideogram.ai",
    "description": "텍스트를 이미지로 변환해주는 AI 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "ImageFX",
    "link": "https://labs.google/fx/tools/image-fx",
    "description": "구글 텍스트 기반 이미지 생성 AI 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Insmind",
    "link": "https://insmind.com",
    "description": "AI 지브리 필터: 사진을 지브리 스타일 아트로 변환 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Krea AI",
    "link": "https://krea.ai",
    "description": "크리에이티브 디자인 보조 생성형 AI 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Leonardo.ai",
    "link": "https://leonardo.ai",
    "description": "고품질 이미지 생성 플랫폼 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Looka",
    "link": "https://looka.com/",
    "description": "로고 & 브랜딩 디자인 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Magnific",
    "link": "https://magnific.ai",
    "description": "초해상화(upscaling) 중심의 이미지 AI 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "MidJourney",
    "link": "https://midjourney.com",
    "description": "예술적 감각이 뛰어난 고화질 이미지를 생성하는 도구로, 디스코드를 통해 운영되며 전문 디자이너 수준의 질감과 조명 표현이 특징입니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Recraft",
    "link": "https://www.recraft.ai/",
    "description": "일러스트는 여기가 짱. 디자인 및 벡터 이미지 편집 AI 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "디자인/편집",
      "이미지 생성",
      "프레젠테이션"
    ]
  },
  {
    "name": "Scenario",
    "link": "https://scenario.gg",
    "description": "게임/캐릭터 아트에 특화된 이미지 생성 AI 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Seedream",
    "link": "https://seedream.pro/",
    "description": "텍스트 기반 명령으로 다양한 스타일의 고해상도 이미지 생성 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Starry",
    "link": "https://starryai.com",
    "description": "AI 기반 이미지 자동 생성 플랫폼 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "VisualElectric",
    "link": "https://visualelectric.com",
    "description": "디지털 아트워크 생성기 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "whisk",
    "link": "https://labs.google/fx/tools/whisk",
    "description": "구글 이미지 기반 이미지 생성 AI 기능을 제공하며, 사용자의 텍스트 프롬프트를 기반으로 고해상도 시각 자료를 빠르게 생성하는 AI 도구입니다.",
    "category": "이미지 및 디자인",
    "keywords": [
      "이미지 생성",
      "디자인/편집",
      "프레젠테이션"
    ]
  },
  {
    "name": "Dify",
    "link": "https://dify.ai",
    "description": "LLM 앱 개발 및 워크플로우 자동화 플랫폼 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "코드 및 개발",
    "keywords": [
      "코드 개발",
      "업무 자동화",
      "디자인/편집"
    ]
  },
  {
    "name": "Make",
    "link": "https://us2.make.com",
    "description": "시각 기반의 자동화 도구, 워크플로우 생성 지원 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "n8n",
    "link": "https://n8n.io",
    "description": "워크플로우 자동화 및 외부 API 연동 자동화 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Zapier",
    "link": "https://zapier.com",
    "description": "앱 간 자동화된 워크플로우 설정 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "데이터 분석"
    ]
  },
  {
    "name": "Beacons",
    "link": "https://account.beacons.ai",
    "description": "크리에이터를 위한 링크 인 바이오 및 도구 모음 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "ChatPlace",
    "link": "https://app.chatplace.io",
    "description": "실시간 협업이 가능한 채팅 플랫폼 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "협업/관리",
      "업무 자동화",
      "문서 요약"
    ]
  },
  {
    "name": "LazyLines",
    "link": "https://new.lazylines.ai",
    "description": "간편한 라인 기반 콘텐츠 기획 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "업무 자동화",
      "협업/관리",
      "문서 요약"
    ]
  },
  {
    "name": "Mixo",
    "link": "https://mixo.io",
    "description": "즉시 웹사이트 생성 및 마케팅 자동화 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "마케팅 및 비즈니스",
    "keywords": [
      "웹사이트 제작",
      "업무 자동화",
      "마케팅/광고"
    ]
  },
  {
    "name": "Storyboarder.ai",
    "link": "https://app.storyboarder.ai",
    "description": "스토리보드 생성 및 정리 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": [
      "영상 제작",
      "음성/오디오",
      "디자인/편집"
    ]
  },
  {
    "name": "FireFlies",
    "link": "https://app.fireflies.ai",
    "description": "회의 녹음 및 요약 자동화 도구 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": [
      "업무 자동화",
      "문서 요약",
      "협업/관리"
    ]
  },
  {
    "name": "Notion",
    "link": "https://notion.so",
    "description": "모든 종류의 정보와 작업을 통합 관리하는 협업 툴 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "비즈니스 생산성",
    "keywords": [
      "협업/관리",
      "업무 자동화",
      "문서 요약"
    ]
  },
  {
    "name": "Notta",
    "link": "https://www.notta.ai/en",
    "description": "회의 녹음 및 실시간 전사 + 요약 기능 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "문서 요약",
      "교육/리서치",
      "정보 검색"
    ]
  },
  {
    "name": "Obsidian",
    "link": "https://obsidian.md",
    "description": "링크 기반 지식 기록 툴 + AI 요약 플러그인 지원 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "문서 요약",
      "교육/리서치",
      "정보 검색"
    ]
  },
  {
    "name": "Trio",
    "link": "https://trio.so",
    "description": "회의 내용 자동 요약 및 태그 생성 기능 기능을 바탕으로 사용자의 작업을 보조하고 효율적인 결과를 도출하도록 설계된 전문 AI 서비스입니다.",
    "category": "연구 및 분석",
    "keywords": [
      "문서 요약",
      "교육/리서치",
      "정보 검색"
    ]
  },
  {
    "name": "페르소나 전문가 지침",
    "link": "https://chatgpt.com",
    "description": "어떤 주제든 깊이 있는 페르소나를 설정하여 대화의 몰입도를 높이는 지침입니다.",
    "category": "지침",
    "keywords": [
      "페르소나",
      "캐릭터",
      "몰입",
      "대화"
    ]
  },
  {
    "name": "논리적 추론 및 문제 해결",
    "link": "https://chatgpt.com",
    "description": "복잡한 문제를 단계별로 분석하고 최적의 해결책을 도출하도록 돕는 논리 추론 지침입니다.",
    "category": "지침",
    "keywords": [
      "논리",
      "추론",
      "문제해결",
      "분석"
    ]
  },
  {
    "name": "멀티모달 이미지 분석가",
    "link": "https://chatgpt.com",
    "description": "업로드된 이미지를 상세히 분석하고 텍스트로 설명하거나 관련 정보를 추출하는 지침입니다.",
    "category": "지침",
    "keywords": [
      "이미지분석",
      "멀티모달",
      "비전",
      "OCR"
    ]
  },
  {
    "name": "코드 리뷰어 및 최적화",
    "link": "https://chatgpt.com",
    "description": "작성된 코드의 버그를 찾고 성능을 개선하며 클린 코드를 위한 가이드를 제공합니다.",
    "category": "지침",
    "keywords": [
      "코딩",
      "코드리뷰",
      "최적화",
      "프로그래밍"
    ]
  },
  {
    "name": "창의적 글쓰기 파트너",
    "link": "https://chatgpt.com",
    "description": "소설, 시, 에세이 등 창의적인 글쓰기 과정에서 아이디어를 확장하고 문체를 다듬어줍니다.",
    "category": "지침",
    "keywords": [
      "글쓰기",
      "창의성",
      "스토리텔링",
      "문학"
    ]
  },
  {
    "name": "데이터 시각화 전문가",
    "link": "https://chatgpt.com",
    "description": "복잡한 데이터를 이해하기 쉬운 차트나 그래프로 시각화하기 위한 최적의 설계를 돕습니다.",
    "category": "지침",
    "keywords": [
      "데이터",
      "시각화",
      "차트",
      "분석"
    ]
  },
  {
    "name": "언어 학습 및 번역 튜터",
    "link": "https://chatgpt.com",
    "description": "자연스러운 번역은 물론, 문법 설명과 상황별 표현 학습을 돕는 언어 교육 지침입니다.",
    "category": "지침",
    "keywords": [
      "번역",
      "언어학습",
      "외국어",
      "교육"
    ]
  },
  {
    "name": "비즈니스 전략 컨설턴트",
    "link": "https://chatgpt.com",
    "description": "시장 분석, 경쟁사 조사, 마케팅 전략 수립 등 비즈니스 전반에 걸친 컨설팅을 제공합니다.",
    "category": "지침",
    "keywords": [
      "비즈니스",
      "전략",
      "컨설팅",
      "마케팅"
    ]
  },
  {
    "name": "심리학 기반 상담 보조",
    "link": "https://chatgpt.com",
    "description": "사용자의 감정을 공감하고 심리학적 원리를 바탕으로 따뜻한 조언과 위로를 건넵니다.",
    "category": "지침",
    "keywords": [
      "심리",
      "상담",
      "공감",
      "멘탈케어"
    ]
  },
  {
    "name": "연구 및 논문 요약 전문가",
    "link": "https://chatgpt.com",
    "description": "방대한 양의 연구 자료나 논문을 핵심 위주로 빠르게 요약하고 통찰을 추출합니다.",
    "category": "지침",
    "keywords": [
      "연구",
      "논문",
      "요약",
      "학술"
    ]
  },
  {
    "name": "Claude Code",
    "link": "https://claude.ai/code",
    "description": "Anthropic의 공식 터미널 기반 에이전틱 코딩 도구로, 로컬 코드베이스 분석, 파일 수정, 단위 테스트 및 git 커밋을 자율 수행합니다.",
    "category": "코드 및 개발",
    "keywords": ["바이브코딩", "CLI", "코드개발", "에이전트"]
  },
  {
    "name": "Bolt.new",
    "link": "https://bolt.new/",
    "description": "StackBlitz가 개발한 브라우저 기반 AI 풀스택 개발 플랫폼으로, 자연어 프롬프트 하나로 웹 앱을 즉시 빌드, 실행, 배포합니다.",
    "category": "코드 및 개발",
    "keywords": ["바이브코딩", "풀스택", "웹개발", "프로토타입"]
  },
  {
    "name": "OpenAI Operator (GPT-6 Astra)",
    "link": "https://openai.com/",
    "description": "웹 브라우징과 데스크톱 GUI 소프트웨어를 마우스와 키보드로 직접 제어하며 복합 업무를 완수하는 OpenAI의 차세대 컴퓨터 제어 에이전트입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": ["컴퓨터유즈", "에이전트", "GPT-6", "자동화"]
  },
  {
    "name": "Flux 1.1 Pro Ultra",
    "link": "https://blackforestlabs.ai/",
    "description": "최대 4K 초고해상도 포토리얼리즘 렌더링과 정교한 영문 텍스트 타이포그래피 생성을 지원하는 2026 차세대 플래그십 이미지 생성 AI입니다.",
    "category": "이미지 및 디자인",
    "keywords": ["이미지생성", "4K", "포토리얼", "디자인"]
  },
  {
    "name": "Kling 1.5 Pro",
    "link": "https://klingai.com/",
    "description": "1080p 고화질 10초 연속 비디오 생성과 정밀한 물리 법칙 시뮬레이션, 역동적인 카메라 모션을 구현하는 글로벌 탑티어 비디오 AI입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": ["비디오생성", "영상제작", "AI영상", "물리시뮬레이션"]
  },
  {
    "name": "Hedra Character-2",
    "link": "https://www.hedra.com/",
    "description": "오디오와 텍스트를 기반으로 생생한 얼굴 표정과 립싱크를 구현하는 차세대 토킹 아바타 및 영상 콘텐츠 제작 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": ["토킹아바타", "립싱크", "캐릭터", "유튜브"]
  },
  {
    "name": "Manus AI",
    "link": "https://manus.im/",
    "description": "다단계 웹 탐색, 데이터 수집, 장문 시장 보고서 작성을 단 한 번의 지시로 브라우저 상에서 완수하는 차세대 범용 자율 에이전트입니다.",
    "category": "업무 자동화 및 에이전트",
    "keywords": ["범용에이전트", "리서치", "업무자동화", "보고서"]
  },
  {
    "name": "Devin 2.0",
    "link": "https://devin.ai/",
    "description": "복잡한 엔지니어링 티켓 해결, 테스트 코드 작성, 환경 설정 및 클라우드 배포를 독립적으로 완수하는 세계 최초 완전 자율 AI 엔지니어입니다.",
    "category": "코드 및 개발",
    "keywords": ["자율개발", "소프트웨어", "디버깅", "풀스택"]
  },
  {
    "name": "NotebookLM Plus",
    "link": "https://notebooklm.google.com/",
    "description": "50개 이상의 대용량 멀티모달 자료를 동시 분석하고 2인 대화형 팟캐스트 오디오(Audio Overview)를 자동 생성하는 구글 지식 연구 도구입니다.",
    "category": "연구 및 분석",
    "keywords": ["연구분석", "팟캐스트", "논문요약", "구글"]
  },
  {
    "name": "Luma Dream Machine 1.5",
    "link": "https://lumalabs.ai/dream-machine",
    "description": "3D 공간 일관성과 사실적인 카메라 트래킹, 고속 렌더링을 지원하는 텍스트/이미지 기반 초현실적 비디오 생성 도구입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": ["비디오생성", "3D카메라", "영상제작", "시네마틱"]
  },
  {
    "name": "Genspark AI Search",
    "link": "https://www.genspark.ai/",
    "description": "복수의 AI 에이전트가 실시간 협력하여 맞춤형 스파크페이지(Sparkpage)를 자동 구축해 다각도 정보를 비교 제공하는 차세대 AI 검색 포털입니다.",
    "category": "연구 및 분석",
    "keywords": ["AI검색", "스파크페이지", "리서치", "정보수집"]
  },
  {
    "name": "v0 by Vercel",
    "link": "https://v0.dev/",
    "description": "자연어 지시만으로 React, Tailwind CSS, shadcn/ui 기반의 고품질 반응형 인터랙티브 웹 UI를 실시간 생성해주는 프론트엔드 도구입니다.",
    "category": "코드 및 개발",
    "keywords": ["UI생성", "React", "Tailwind", "프론트엔드"]
  },
  {
    "name": "Suno v4",
    "link": "https://suno.com/",
    "description": "스튜디오 퀄리티의 마스터링 사운드, 복합 보컬 하모니, 다양한 장르 믹싱을 지원하는 2026 차세대 AI 작곡 및 음원 생성 플랫폼입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": ["음악생성", "작곡", "음원제작", "보컬"]
  },
  {
    "name": "Recraft v3",
    "link": "https://www.recraft.ai/",
    "description": "벡터(SVG), 3D 일러스트, 브랜드 디자인 시스템을 전문가 수준으로 정밀 제어 및 생성하는 전문 디자이너 특화 AI입니다.",
    "category": "이미지 및 디자인",
    "keywords": ["벡터SVG", "일러스트", "브랜딩", "디자인"]
  },
  {
    "name": "Jan.ai",
    "link": "https://jan.ai/",
    "description": "로컬 PC의 GPU를 활용하여 DeepSeek, Llama 3.3, Qwen 등을 100% 오프라인 프라이빗 환경에서 구동하는 오픈소스 데스크톱 클라이언트입니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": ["로컬LLM", "오프라인", "프라이버시", "오픈소스"]
  },
  {
    "name": "Ollama",
    "link": "https://ollama.com/",
    "description": "터미널에서 Llama, DeepSeek, Mistral 등 고성능 오픈소스 LLM을 단 한 줄의 명령어로 설치 및 실행하고 API로 연동하는 프레임워크입니다.",
    "category": "코드 및 개발",
    "keywords": ["로컬LLM", "오픈소스", "CLI", "API서빙"]
  },
  {
    "name": "ChatHub",
    "link": "https://chathub.gg/",
    "description": "ChatGPT, Claude, Gemini, DeepSeek 등 여러 주요 AI 모델에 동일한 프롬프트를 동시에 질의하고 응답을 나란히 비교하는 올인원 브라우저 확장입니다.",
    "category": "대화형 AI 및 글쓰기",
    "keywords": ["모델비교", "멀티챗봇", "확장프로그램", "생산성"]
  },
  {
    "name": "Phind V3",
    "link": "https://www.phind.com/",
    "description": "개발자와 엔지니어를 위해 맞춤 설계된 초고속 코드 특화 AI 검색 엔진으로 심층 디버깅과 기술 공식 문서를 신속하게 제공합니다.",
    "category": "코드 및 개발",
    "keywords": ["개발자검색", "디버깅", "코드검색", "기술문서"]
  },
  {
    "name": "ElevenLabs Reader & Voice 3",
    "link": "https://elevenlabs.io/",
    "description": "인간과 구별 불가능한 감정 표현, 억양, 다국어 실시간 보이스 클로닝과 고품질 텍스트 음성 변환(TTS)을 지원하는 선도적 오디오 AI입니다.",
    "category": "영상 및 오디오 제작",
    "keywords": ["음성합성", "TTS", "보이스클로닝", "더빙"]
  },
  {
    "name": "Mapify (MyMap.ai)",
    "link": "https://mapify.so/",
    "description": "PDF, 유튜브 영상, 장문 기사를 1초 만에 깔끔한 인터랙티브 마인드맵과 구조화된 다이어그램으로 변환해주는 지식 시각화 AI 도구입니다.",
    "category": "비즈니스 생산성",
    "keywords": ["마인드맵", "다이어그램", "시각화", "문서요약"]
  }
];

