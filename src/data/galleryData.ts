export interface GalleryItem {
  id: string | number;
  title: string;
  prompt: string;
  image_url: string;
  category?: string;
  tags?: string[];
  recommended?: number | boolean;
  is_new?: number | boolean;
  sort_order?: number;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    "id": 33,
    "title": "인물 맞춤형 모뉴멘털 3D 페이퍼크래프트 패션 포트레이트",
    "prompt": "Using the user-provided image as the primary visual reference, create a high-detail full-body photograph of the same subject while preserving their identity, facial features, hairstyle, body proportions, outfit design, materials, and distinctive details.\n\nPlace the subject in front of a monumental 3D papercraft environment that is visually tailored to the reference image. Analyze the image’s dominant colors, secondary colors, skin tone, outfit palette, lighting direction, contrast level, mood, and overall visual style, then automatically design the background and color grading to complement them.\n\nThe background should feature a colossal stylized papercraft portrait inspired by the subject, accompanied by a symbolic creature, botanical element, or decorative motif that naturally matches the subject’s appearance, clothing, cultural cues, and mood. Avoid using a fixed dragon or predetermined theme unless it is visually appropriate for the reference image.\n\nConstruct the entire background from layered, torn-edged paper with visible fibers, tactile textures, dimensional depth, and handcrafted details. Include intricate paper-cut elements such as clouds, waves, flowers, foliage, smoke, fabric-like folds, geometric ornaments, or abstract shapes, selecting only the elements that best harmonize with the reference image.\n\nGenerate a cohesive color palette derived directly from the user-provided image. Use the outfit’s dominant color as the main background accent, supporting colors from the image as secondary layers, and carefully selected complementary or analogous tones for depth. Ensure the background does not overpower the subject and maintains clear visual separation between the subject, clothing, skin, and papercraft elements.\n\nAdapt the lighting to the original image. Match its light direction, softness, color temperature, shadow density, and overall exposure while introducing subtle studio illumination that casts realistic shadows between the paper layers. Apply unified cinematic color grading so the subject and environment feel naturally integrated rather than composited.\n\nPreserve realistic skin texture and photographic detail while blending the subject seamlessly into the stylized paper-art world. Maintain balanced contrast, natural skin tones, refined depth, elegant visual hierarchy, and a premium editorial composition.\n\nDo not force cobalt blue, cream, gold, deep blue, or any other fixed palette. All colors, motifs, lighting, and atmospheric details must be dynamically selected based on the user-provided image.\n\nVertical composition, 9:16 aspect ratio.\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1785454902605-ukpr2ttk8df.jpg",
    "category": "프로필 / 아바타",
    "tags": [
      "3D페이퍼아트",
      "페이퍼크래프트",
      "패션포트레이트"
    ],
    "recommended": 0,
    "is_new": 1,
    "sort_order": 33,
    "created_at": "2026-07-30 23:42:41",
    "updated_at": "2026-07-30 23:42:45",
    "publish_at": null
  },
  {
    "id": 32,
    "title": "명언 + 캘리그라피",
    "prompt": "A premium modern Korean typography poster featuring the phrase “[주제]” centered as the main focal point. The lettering should look like expressive contemporary Korean brush-pen calligraphy created with a modern marker or brush pen — clean, stylish, energetic, fashionable, and urban — NOT traditional ink wash calligraphy or East Asian brush painting. Smooth flowing pen strokes, sharp edges, stylish handwritten rhythm, subtle pressure variation, modern Korean editorial typography aesthetic. The background should feature a sophisticated soft gradient transition with cinematic modern colors — airy and bright at the top, becoming deeper and emotionally rich toward the bottom. Avoid traditional ink wash textures or sumi-e aesthetics. Instead use premium graphic design inspired gradients, subtle watercolor bloom accents, atmospheric haze, soft grain, minimal cloud-like abstract textures, and elegant contemporary poster composition. Clean negative space, refined minimalism, luxury editorial poster mood, Korean design studio aesthetic, premium lifestyle branding style, soft lighting, subtle texture layering, modern emotional color grading, highly polished visual balance. Vertical composition, 9:16 aspect ratio.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1779926819640-looimifh7ys.png",
    "category": "포스터 / 전단지",
    "tags": [
      "캘리그라피",
      "명언",
      "포스터"
    ],
    "recommended": 0,
    "is_new": 1,
    "sort_order": 32,
    "created_at": "2026-05-28 00:07:23",
    "updated_at": "2026-05-28 00:07:27",
    "publish_at": null
  },
  {
    "id": 31,
    "title": "종이 공예 스타일",
    "prompt": "[주제입력]에 대해 종이 공예 스타일로 재현하되, 세부적인 부분은 단순화하여 종이 공예 작품에 적합하도록 하세요. 전체적인 구도는 시각적으로 편안하고 부드럽고 귀여운 느낌을 주도록 구성하십시오. 주제와 관련된 매력적인 장식 요소를 추가하여 원작 이미지와 어울리면서도 사랑스러운 분위기를 더욱 살릴 수 있어야합니다.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1779408406267-cxhe01efs8.png",
    "category": "인포그래픽 / 교육용 시각 자료",
    "tags": [
      "종이공예",
      "종이그림",
      "인포그래픽"
    ],
    "recommended": 0,
    "is_new": 1,
    "sort_order": 31,
    "created_at": "2026-05-22 00:06:16",
    "updated_at": "2026-05-22 00:06:59",
    "publish_at": null
  },
  {
    "id": 30,
    "title": "프리미엄 음식 포스터",
    "prompt": "Create a professional minimalistic food poster featuring [food item name] as the high-end hero subject. The food should be styled with hyper-realistic textures and cinematic lighting to look extremely appetizing. The layout must include sophisticated typography: a prominent main title using the name of the food, and contextually relevant sub-headlines, slogans, and decorative badges that AI automatically generates to match the specific characteristics of the dish (e.g., words describing its taste, temperature, or origin). Maintain a clean commercial aesthetic with ample negative space and a minimalist background, ensuring all generated text harmonizes with the overall premium design.\n\n\n[food item name]을(를) 주인공으로 하는 전문적인 미니멀리즘 푸드 포스터를 제작하세요. 음식을 하이엔드 광고 수준의 극사실적 질감과 조명으로 묘사하여 시각적 몰입감을 극대화해야 합니다. 레이아웃에는 세련된 타이포그래피를 포함하되, 상단에는 음식 명칭을 타이틀로 배치하고, 나머지 슬로건, 부제, 장식용 배지 문구들은 AI가 해당 음식의 특징(맛, 질감, 분위기 등)에 맞춰 가장 적절한 맥락으로 자동 생성하여 배치하도록 하세요. 깔끔한 여백과 미니멀한 배경을 통해 상업용 프리미엄 광고의 완성도를 구현하세요.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1778467694937-266vuhny1hqj.jpg",
    "category": "포스터 / 전단지",
    "tags": [
      "음식사진",
      "음식포스터",
      "포스터"
    ],
    "recommended": 0,
    "is_new": 1,
    "sort_order": 30,
    "created_at": "2026-05-11 02:48:32",
    "updated_at": "2026-05-11 02:48:36",
    "publish_at": null
  },
  {
    "id": 29,
    "title": "주가 분석 인포그래픽",
    "prompt": "[일간 차트 이미지 등록후.. 보조지표 : 거래량, 볼린저밴드, 이동평균, 그물차트, MACD, RSI, DMI)\n\n다음 주식/자산 차트를 업로드된 이미지 기준으로 분석하라.\n\n반드시 아래 “4축 기술적 분석 프레임워크”를 따르고, 결과는 **인포그래픽 스타일로 구조화된 시각화 + 텍스트 분석** 형태로 이미지 생성. 9:16 비율\n\n---\n\n# 1️⃣ 분석 프레임워크 (반드시 순서대로 수행)\n\n## [Axis 1] 추세 (Trend)\n\n* EMA 5, 20, 60, 120 기준\n* 정배열 / 역배열 여부\n* 현재 가격이 EMA 대비 위치\n* 골든크로스 / 데드크로스 여부\n* 추세 상태: 상승 / 하락 / 횡보 / 전환 초기\n\n---\n\n## [Axis 2] 모멘텀 (Momentum)\n\n* RSI(14)\n\n  * 70 이상 과열 / 30 이하 과매도\n  * RSI 방향성\n* MACD (12,26,9)\n\n  * 0선 기준 위치\n  * 히스토그램 변화\n  * 시그널 교차 여부\n* 다이버전스 존재 여부\n\n---\n\n## [Axis 3] 변동성 (Volatility)\n\n* Bollinger Bands (20,2)\n\n  * 밴드 수축 / 확장 상태\n  * 가격 위치 (상단 / 중단 / 하단)\n* ATR(14)\n\n  * 변동성 크기 및 추세\n* 현재 상태: 스퀴즈 / 확장 / 안정\n\n---\n\n## [Axis 4] 수급 (Volume & Flow)\n\n* 거래량 증가/감소 추세\n* 가격 상승 vs 거래량 관계\n* OBV 또는 유사 흐름 해석\n* 수급 상태: 유입 / 이탈 / 중립\n\n---\n\n# 2️⃣ 핵심 구조 분석\n\n* 주요 저항 구간 (가격 범위)\n* 주요 지지 구간\n* 현재 위치 (박스 상단 / 하단 / 중간)\n* 추세 전환 포인트\n\n---\n\n# 3️⃣ 시나리오 분석 (반드시 포함)\n\n### 🔼 상승 시나리오\n\n* 조건 (가격 + 거래량)\n* 목표 구간\n\n### 🔽 하락 시나리오\n\n* 조건\n* 하락 목표 구간\n\n---\n\n# 4️⃣ 종합 판단 (요약)\n\n다음 형식으로 출력:\n\n* 현재 국면: [강한 상승 / 조정 / 횡보 / 전환 초입 등]\n* 진입 신호 강도: ⭐ ~ ⭐⭐⭐⭐⭐\n* 핵심 관찰: 한 줄 핵심 문장\n* 리스크 포인트: 명확한 가격 기준\n\n---\n\n# 5️⃣ 매매 전략\n\n* 공격형\n* 보수형\n* 관망형\n\n각각 진입 기준 제시\n\n---\n\n# 6️⃣ 한 줄 인사이트 (필수)\n\n→ 트레이더 관점의 직관적 문장\n\n---\n\n# 7️⃣ 출력 스타일 (중요)\n\n반드시 아래 형식으로 출력:\n\n✔ 인포그래픽 스타일 구조\n✔ 섹션별 박스 구조\n✔ 숫자 + 아이콘 느낌 구성\n✔ 가독성 높은 요약 중심\n✔ 불필요한 장문 설명 금지\n\n---\n\n# 최종 목표\n\n단순 분석이 아니라\n“트레이딩 의사결정에 바로 쓸 수 있는 시각화 리포트” 생성\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1778033076479-mnl32ly4kfb.png",
    "category": "인포그래픽 / 교육용 시각 자료",
    "tags": [
      "주가분석",
      "기술적분석",
      "주가전망",
      "인포그래픽"
    ],
    "recommended": 0,
    "is_new": 1,
    "sort_order": 29,
    "created_at": "2026-05-06 02:06:26",
    "updated_at": "2026-05-22 04:33:56",
    "publish_at": null
  },
  {
    "id": 28,
    "title": "한국 민화풍 책갈피",
    "prompt": "한국민화스타일 책갈피 디자인 초안을 여러 개 제작하세요. 한글 렌더링은 정확해야합니다.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1777421046493-y3lsz863hx.png",
    "category": "인포그래픽 / 교육용 시각 자료",
    "tags": [
      "책갈피",
      "고풍",
      "한국민화"
    ],
    "recommended": 0,
    "is_new": 1,
    "sort_order": 28,
    "created_at": "2026-04-29 00:04:38",
    "updated_at": "2026-04-29 00:04:43",
    "publish_at": null
  },
  {
    "id": 27,
    "title": "AI 대화 기반 성격 분석 인사이트 리포트",
    "prompt": "Create a highly detailed vertical infographic poster (aspect ratio 9:16) showing a personality analysis report.\n\n[CORE CONCEPT]\nThis report MUST be presented as an analysis derived from previous conversations between the user and an AI assistant.\nThe content should feel like it is based on accumulated dialogue, behavioral patterns, and communication style.\n\n[사용자 입력]\n- Age: {나이}\n- Nationality: {국적}\n- Gender: {성별}\n\n[ANALYSIS BASIS]\n- Explicitly mention that the analysis is based on \"지금까지의 대화 내용\"\n- Infer personality traits from communication style, question patterns, tone, and thinking approach\n- Make the insights feel observational and data-driven\n\n[LAYOUT]\n- Clean, modern infographic layout divided into multiple sections\n- Top-left: 2D illustrated avatar (demographic-based, not real identity)\n- Title: \"당신에 대한 분석 보고서\"\n- Subtitle: \"대화 내용을 기반으로 분석한 성격 및 행동 패턴\"\n- Use grid-based card UI layout\n\n[SECTIONS - MUST INCLUDE]\n1) 지금까지의 대화 요약  \n   - communication style  \n   - thinking patterns  \n   - curiosity / questioning style  \n\n2) MBTI 예측 결과  \n   - explicitly labeled as \"대화 기반 추정\"  \n   - include reasoning keywords  \n\n3) 성격 특성 한눈에 보기  \n   - analytical, emotional, structured traits  \n   - percentage bars  \n\n4) 사고 방식 분석  \n   - how the person processes information  \n   - logical vs intuitive balance  \n\n5) 의사결정 스타일  \n   - fast vs cautious  \n   - data-driven vs emotional  \n\n6) 당신의 강점  \n7) 중요하게 생각하는 가치  \n8) 보완하면 좋은 부분  \n9) 추천 진로 / 역할  \n10) 대인관계 스타일  \n11) 스트레스 요인 & 해소 방식  \n12) 에너지 흐름 (battery visualization)\n\n[CONTENT STYLE]\n- All text in Korean\n- Tone: analytical, insight-driven, slightly warm\n- Avoid generic phrases — make it feel like observed behavior from conversations\n- Include phrases like:\n  - \"대화에서 드러난\"\n  - \"질문 패턴을 보면\"\n  - \"표현 방식에서 유추할 수 있는\"\n\n[VISUAL STYLE]\n- Modern Korean infographic UI style\n- Notion / dashboard / startup report aesthetic\n- Flat design + soft gradients\n- Minimal icons, rounded cards\n\n[COLOR]\n- Primary: deep navy / forest green\n- Secondary: beige / light gray\n- Accent: muted teal or pastel green\n\n[AVATAR STYLE]\n- 2D semi-realistic Korean illustration\n- age-appropriate appearance\n- intelligent, calm expression\n\n[DETAIL]\n- highly structured layout\n- professional typography\n- data visualization style elements\n\n[EXTRA]\n- Make it look like a premium AI-generated personal insight report\n- Add subtle UI elements (charts, icons, separators)",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1777245571566-tze9o111yri.png",
    "category": "프로필 / 아바타",
    "tags": [
      "성격진단",
      "MBTI",
      "대화분석",
      "성격유형",
      "프로필"
    ],
    "recommended": 0,
    "is_new": 1,
    "sort_order": 27,
    "created_at": "2026-04-26 23:20:24",
    "updated_at": "2026-04-26 23:23:30",
    "publish_at": null
  },
  {
    "id": 26,
    "title": "캐릭터 시트",
    "prompt": "[주제 입력]을 주인공으로 한 전문적인 [이미지스타일] 캐릭터 컨셉 시트. 레이아웃 구성: 1) 좌측 상단에는 음료를 든 메인 전신 서 있는 포즈. 2) 우측 상단에는 6개의 서로 다른 감정을 보여주는 표정 그리드. 3) 중앙 하단에는 정면, 측면, 후면을 보여주는 정교한 턴어라운드 뷰. 4) 우측 하단에는 크게 웃으며 기뻐하는 다이내믹한 전신 액션 포즈. 5) 최하단에는 캐릭터에 어울리는 주요 소품과 얼굴/의상 디테일 클로즈업. 따뜻한 미색의 종이 질감 배경, 부드러운 스튜디오 조명, 정교한 텍스처. 정교한 한글 테스트 렌더링. 1:1 비율.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776656911396-7qnokmxrpjs.webp",
    "category": "만화 / 스토리보드",
    "tags": [
      "캐릭터",
      "캐릭터시트",
      "만화",
      "게임",
      "애니매이션",
      "컨셉"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 26,
    "created_at": "2026-04-20 03:48:42",
    "updated_at": "2026-07-30 23:42:46",
    "publish_at": null
  },
  {
    "id": 25,
    "title": "패션 에디터의 핸드드로잉 룩북",
    "prompt": "[첨부 이미지] 위에 빨간색 잉크로 휘갈겨 쓴 영문 패션 주석과 낙서, 그리고 화살표들이 가득함. 의상의 디테일과 액세서리를 칭찬하는 문구들이 포함되어 있으며, 귀여운 왕관, 리본, 하트 모양의 패션 스티커들이 곳곳에 붙어 있음. 부드러운 중립 톤의 배경, 고해상도 패션 사진 스타일",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776427504860-m58txuu8lpi.webp",
    "category": "소셜 미디어 게시물",
    "tags": [
      "룩북",
      "패션에디터",
      "핸드드로잉",
      "의상디자인"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 25,
    "created_at": "2026-04-17 12:05:49",
    "updated_at": "2026-05-28 00:07:28",
    "publish_at": null
  },
  {
    "id": 24,
    "title": "라이브 스트리밍",
    "prompt": "[인물설명]이(가) 현대적인 스트리밍 스튜디오의 중심에서 방송용 마이크 앞에 앉아 [주제입력]에 대해 대화하고 있는 미디엄 샷. 인물은 부드럽고 자연스러운 조명을 받고 있으며, 배경은 얕은 심도로 인해 따뜻한 조명과 세련된 가구들이 부드럽게 흐려져 있음. 유튜브 실시간 라이브 방송 인터페이스가 화면 가장자리에 자연스럽게 배치된 고해상도의 전문적인 영상미. 전체적으로 차분하고 지적인 분위기이며 16:9 종횡비로 구현됨.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776425802214-0qf2or9qvsij.webp",
    "category": "YOUTUBE 썸네일",
    "tags": [
      "유튜브",
      "라이브방송",
      "실시간채팅",
      "스트리머"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 24,
    "created_at": "2026-04-17 11:29:41",
    "updated_at": "2026-05-11 02:46:43",
    "publish_at": null
  },
  {
    "id": 23,
    "title": "그림 일기스타일",
    "prompt": "5:4 가로세로 비율의 초등학생 그림 일기 형식입니다. 화면은 상하로 나뉘어 있습니다. 상단 60%에는 [비오는날]의 모습이 색연필과 크레파스로 정성껏 그린 투박하고 귀여운 그림으로 표현되어 있습니다. 하단 40%는 줄이 처진 일기장 종이로, 상단에는 알록달록한 색깔로 제목이 적혀 있고 그 아래로 어린아이 특유의 서툰 한글 손글씨가 적혀 있습니다. 종이 여백에는 하트, 꽃, 별 같은 아기자기한 색연필 낙서가 흩어져 있습니다. 종이의 질감이 느껴지는 따뜻하고 순수한 분위기의 일러스트입니다.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776327365657-9rs8g1vbenw.webp",
    "category": "소셜 미디어 게시물",
    "tags": [
      "그림일기",
      "서툰그림",
      "어린이그림",
      "손글씨"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 23,
    "created_at": "2026-04-16 08:16:12",
    "updated_at": "2026-05-11 02:46:42",
    "publish_at": null
  },
  {
    "id": 22,
    "title": "서툰그림일기",
    "prompt": "의도적으로 서툴고 투박하게 그려진 5:4 비율의 어린이 그림 일기입니다. 거친 질감의 미색 도화지 위에 상하로 나뉜 구성입니다. 상단에는 [비오는 날]이 뭉툭한 크레파스와 색연필로 그려져 있습니다. 인물은 머리가 크고 팔다리가 짧은 등 비율이 맞지 않으며, 선이 떨리고 불안정한 7세 아이의 필치를 재현합니다. 채색은 선 밖으로 삐져나오거나 빈 곳이 많으며, 전문적인 명암이나 그라데이션은 전혀 없습니다. 하단에는 연필로 대충 그은 선 위에 서툰 한글 손글씨가 적혀 있습니다. 종이의 섬유질과 크레파스 찌꺼기가 보이는 실제 종이 일기장을 위에서 찍은 듯한 사실적인 아날로그 질감입니다.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776327316704-6399jybxi.webp",
    "category": "소셜 미디어 게시물",
    "tags": [
      "그림일기",
      "서툰그림",
      "어린이그림",
      "손글씨"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 22,
    "created_at": "2026-04-16 08:15:48",
    "updated_at": "2026-05-11 02:46:41",
    "publish_at": null
  },
  {
    "id": 21,
    "title": "K-학습 만화",
    "prompt": "2:3 세로 비율의 고품질 한국 학습 만화 일러스트레이션. [주제 입력] 장면을 묘사하며, 귀여운 치비(SD) 스타일의 캐릭터들이 등장합니다. 캐릭터들은 크고 반짝이는 눈망울과 생생한 표정으로 상황에 반응하고 있습니다. 굵고 선명한 검은색 외곽선과 채도가 높은 화사한 색감, 명확한 셀 채이딩 기법이 적용된 K-학습 만화 화풍입니다. 배경은 주제와 어우러져 상세하게 묘사되며, 전체적으로 밝고 활기찬 교육용 만화 특유의 분위기를 자아냅니다. 모든 요소가 선명한 딥 포커스 스타일의 2D 디지털 페인팅.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776303996822-553t5l5knut.webp",
    "category": "만화 / 스토리보드",
    "tags": [
      "학습만화",
      "sd캐릭터",
      "만화",
      "교육만화"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 21,
    "created_at": "2026-04-16 01:47:06",
    "updated_at": "2026-04-29 00:04:46",
    "publish_at": null
  },
  {
    "id": 20,
    "title": "네오-바이브런트 하이브리드 시티스케이프",
    "prompt": "[주제 입력]를 주제로 한 상세한 4:5 비율의 여행 포스터. 혼돈적이고 실험적인 하이브리드 스타일이 특징입니다. 구도는 장식적인 테두리가 장면을 감싸는 다층적이고 중앙 집중적인 대칭 레이아웃입니다. 전경에는 문화적 요소와 현지 음식이 세밀하게 배치되어 있으며, 중경에는 전통과 현대적 교통수단, 다양한 사람들이 어우러진 활기찬 거리와 상징적인 건축 랜드마크가 나타납니다. 배경은 양식화된 구름이 있는 맑은 하늘 아래 자연 산맥과 통합된 고층 빌딩 숲을 보여줍니다. 깔끔한 벡터 라인과 거친 리소그래프 질감, 활기찬 색상의 중첩, 디지털 콜라주 요소가 결합되어 전통과 현대의 역동적인 조화를 표현합니다. 높은 대비의 조명, 딥 포커스, 질감이 살아있는 평면 일러스트레이션 스타일. 이미지에 포함되는 언어도 주제에 맞는 언어여야 합니다.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776240700923-afmput3ard.webp",
    "category": "포스터 / 전단지",
    "tags": [
      "포스터",
      "여행",
      "전단지",
      "랜드마크",
      "지역",
      "일러스트"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 20,
    "created_at": "2026-04-15 08:12:25",
    "updated_at": "2026-04-29 00:04:45",
    "publish_at": null
  },
  {
    "id": 18,
    "title": "어반 스케치",
    "prompt": "와이드 비율의 파노라마 어반 스케치. 질감이 느껴지는 흰색 종이 위에 블랙 잉크 펜으로 그린 스타일입니다. [첨부 이미지 속 장소]이(가) 눈높이의 광각 구도로 배치되어 있습니다. 의도적인 불규칙함이 살아있는 자유롭고 표현력 있는 선의 흐름이 특징이며, 선의 굵기가 다양하게 표현됩니다. 조밀한 수직 낙서와 교차 해칭(cross-hatching)을 사용하여 그림자와 질감을 묘사한 고대비 흑백 미학을 보여줍니다. 화면의 윗부분은 깨끗한 흰색 여백으로 남겨두어 밝고 미니멀한 하늘을 표현합니다. 건축가나 여행자의 스케치북에서 볼 수 있는 날것 그대로의 현장감이 느껴지는 드로잉 스타일입니다.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776229003185-l67diam7jyh.webp",
    "category": "만화 / 스토리보드",
    "tags": [
      "어반스케치",
      "잉크",
      "스케치",
      "여백",
      "종이",
      "드로잉"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 19,
    "created_at": "2026-04-15 04:57:16",
    "updated_at": "2026-04-15 04:58:06",
    "publish_at": null
  },
  {
    "id": 17,
    "title": "단체 사진",
    "prompt": "세련되고 현대적인 실내 공간을 배경으로 한 9:16 세로 비율의 하이엔드 패션 에디토리얼 단체 화보. [주제 입력]이(가) 포함됩니다. 구도는 엄격한 3단 대칭 구조를 따르며, 맨 앞줄은 바닥에 앉고, 중간 줄은 세련된 현대식 가구에 앉으며, 뒷줄은 일어서 있는 형태를 취합니다. 별도의 지시가 없다면 배경과 의상은 현재의 최첨단 유행을 반영한 깔끔하고 고급스러운 스타일로 설정됩니다. 조명은 시네마틱하고 날카로운 스튜디오 조명을 사용하여 인물의 윤곽과 의상의 질감을 강렬하게 대비시키며 카리스마 넘치는 분위기를 연출합니다. 각 인물의 개성 있는 표정과 의상의 디테일이 살아있는 8K 초고해상도의 극사실적인 화질.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228947914-q0yzxgfqtm.webp",
    "category": "프로필 / 아바타",
    "tags": [
      "화보",
      "프로필",
      "단체사진",
      "하이엔드",
      "극사실"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 18,
    "created_at": "2026-04-15 04:56:29",
    "updated_at": "2026-04-15 04:58:06",
    "publish_at": null
  },
  {
    "id": 16,
    "title": "신문 헤드라인",
    "prompt": "16:10 비율의 정교한 뉴스 포털 레이아웃이 실제 신문지에 인쇄된 듯한 아날로그 감성의 이미지. 전체 구도는 엄격한 7:3 그리드 시스템을 유지합니다. 배경은 미세한 섬유질이 느껴지는 미색의 신문지 질감과 매트한 마감 처리가 특징입니다. 상단 왼쪽에는 고전적인 한국어 명조체 서체의 검은색 로고가 배치되어 있습니다. 메인 영역에는 [주제입력]에 관한 기사가 위치하며, 헤드라인과 본문 텍스트는 종이에 잉크가 살짝 스며든 듯한 실제 인쇄물의 질감을 보여줍니다. 메인 기사에는 질감이 느껴지는 고대비 보도 사진이 포함되어 있습니다. 오른쪽 사이드바에는 번호가 매겨진 목록과 작은 썸네일들이 완벽하게 정렬되어 있습니다. 상단 오른쪽의 초록색 배너는 신문에 인쇄된 듯한 차분한 색감을 띱니다. 현대적인 웹 구조와 아날로그 신문의 신뢰감 있는 분위기가 조화를 이룹니다.\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228910216-l2hy73konfh.webp",
    "category": "소셜 미디어 게시물",
    "tags": [
      "헤드라인",
      "신문",
      "신문지",
      "뉴스",
      "아날로그"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 17,
    "created_at": "2026-04-15 04:55:37",
    "updated_at": "2026-04-15 04:58:06",
    "publish_at": null
  },
  {
    "id": 15,
    "title": "3X3 목업샷",
    "prompt": "[주제입력]에 대한 9가지의 다채롭고 고급스러운 제품 모크업 샷을 담은 전문적인 3x3 그리드 스토리보드, 16:9 가로 비율. 전체 레이아웃은 테두리 없는 9개의 동일한 패널로 구성되며, 모든 프레임에서 제품 디자인, 브랜딩, 색상 팔레트가 완벽하게 일치해야 합니다. \n포함될 장면: 1. 미니멀한 스튜디오의 정면 히어로 샷. 2. 매트한 질감과 밀봉 디테일에 집중한 매크로 클로즈업. 3. 파스텔 배경에 부드러운 나뭇잎 그림자가 드리워진 연출 샷. 4. 패키지를 열거나 만지는 단정한 손의 상호작용. 5. 여러 제품이 정교하게 배열된 등축 투영(Isometric) 그리드. 6. 약간 기울어진 채 공중에 떠 있는 역동적인 샷. 7. 타이포그래피와 그래픽 요소의 초근접 디테일. 8. 조각적 요소나 액체 금속과 결합된 예술적인 에디토리얼 연출. 9. 현대적이고 미니멀한 실내 공간에서의 와이드 라이프스타일 샷. \n전체적인 미학은 밝고 현대적이며 프리미엄한 느낌을 주며, 부드럽게 확산된 스튜디오 조명, 은은한 자연 그림자, 따뜻한 뉴트럴 톤의 조화로운 색감을 사용합니다. 고해상도, 소재의 선명한 질감 표현, 세련된 디자인 중심의 분위기.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228853295-0zrrzw7q2xa.webp",
    "category": "앱 / 웹 디자인",
    "tags": [
      "목업",
      "스토리보드",
      "브랜딩",
      "제품사진",
      "미니멀"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 16,
    "created_at": "2026-04-15 04:54:49",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 14,
    "title": "어디든 스타 전쟁터?",
    "prompt": "[장소입력]이(가) 에픽 블록버스터급 스타크래프트 격전지로 변한 모습을 담은 16:9 시네마틱 이미지. 하늘에는 거대한 테란 전투순양함이 연기 속을 가로지르고 저그 뮤탈리스크 떼가 구름처럼 뒤덮고 있습니다. 지면에는 유기적인 보라색 점막(Creep)이 주변을 잠식하고 있으며, 그 위로 프로토스의 수정 기둥이 푸른 사이오닉 에너지를 뿜어내고 있습니다. 전장의 압도적인 규모를 강조하기 위한 로우 앵글 구도를 사용합니다. 강렬한 화염의 오렌지색 조명과 외계 에너지의 차가운 푸른색 조명이 대비를 이루며, 공중에는 파편과 불꽃, 자욱한 대기 안개가 가득합니다. 풍화된 금속, 끈적한 유기체 표면, 빛나는 플라즈마 에너지의 질감이 극도로 상세하게 묘사된 하이테크 SF 전쟁 스타일.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228810373-r69jur8o4i.webp",
    "category": "앱 / 웹 디자인",
    "tags": [
      "블록버스터",
      "초현실적",
      "게임",
      "스타크래프트",
      "SF"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 15,
    "created_at": "2026-04-15 04:53:53",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 13,
    "title": "책소개",
    "prompt": "와이드 16:9 화면비의 전문적인 서적 홍보용 그래픽 디자인 레이아웃. 구도는 좌우로 나뉩니다. 왼쪽 영역은 깔끔한 화이트 배경 위에 굵고 현대적인 타이포그래피와 강조를 위한 선명한 노란색 가로 바(bar)가 배치되어 있습니다. 오른쪽 영역에는 양장본 책의 3D 목업이 수직으로 세워져 있으며, 책 표지에는 [GPTPARK과 친해지기]이(가) 초현실적이고 인상주의적인 유화 스타일로 묘사되어 있습니다. 전체적인 미학은 깔끔하고 상업적이며, 마케팅 텍스트를 위한 여백과 선명한 초점이 조화를 이루는 프리미엄 신간 홍보 배너 스타일입니다.\n책설명:\n저자명:\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228754086-o49s6yt0aub.webp",
    "category": "인포그래픽 / 교육용 시각 자료",
    "tags": [
      "책소개",
      "프로픽",
      "도서",
      "책리뷰",
      "북스토어",
      "홍보용"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 14,
    "created_at": "2026-04-15 04:53:03",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 12,
    "title": "뭐든지 쉽고 간결한 인포그래픽으로",
    "prompt": "[주제입력]을 간결한 설명과 시각적 비유를 사용하여 단순화한 일러스트레이션을 제작하세요. 누구나 쉽게 이해하고 공감할 수 있도록 일상적인 예를 활용하세요. 명확하고 간결한 설명과 함께 개념을 효과적으로 전달하는 시각적 요소를 제시하세요.\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228721331-eiioeiv8kqp.webp",
    "category": "인포그래픽 / 교육용 시각 자료",
    "tags": [
      "정보",
      "교육",
      "인포그래픽",
      "일러스트",
      "개념"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 13,
    "created_at": "2026-04-15 04:52:19",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 11,
    "title": "추억의 파편",
    "prompt": "2:3 세로 비율의 시네마틱하고 초현실적인 컨셉 이미지. 거칠고 어두운 콘크리트 방 한가운데에 뒷모습을 보이고 서 있는 [주제 입력]. 인물 앞에는 커다란 빈 금속 거울 프레임이 있고, 인물과 프레임 사이에는 날카롭게 깨진 유리 파편들이 방사형으로 공중에 떠 있습니다. 각각의 유리 파편은 창문 역할을 하며, [파편 속에 보일 다양한 모습들]을 선명하게 보여줍니다. 천장에는 전구 하나가 매달려 위에서 아래로 강한 대비의 조명을 비추며 극적이고 우울한 분위기를 조성합니다. 차가운 콘크리트 벽의 질감과 유리의 날카로운 단면이 매우 정밀하게 묘사됩니다. 전체적인 색조는 채도가 낮고 차가우며, 떠다니는 유리 파편 내부에서만 다채로운 색상이 드러납니다. 고해상도, 마스터피스 퀄리티.\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228658106-nxq6eqwbswb.webp",
    "category": "프로필 / 아바타",
    "tags": [
      "초현실",
      "유리파편",
      "추억",
      "시네마틱",
      "인물"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 12,
    "created_at": "2026-04-15 04:51:10",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 10,
    "title": "구름위의 섬",
    "prompt": "A digital art city rendering poster for [지역 또는 장소].\n\nCore Subject: A miniature island floating above white clouds, shaped like the map outline of the selected city, occupying most of the frame. The island seamlessly integrates the city's unique iconic landmarks, natural landscapes, and cultural elements. Include city-specific birds, cinematic lighting and shadows, vibrant colors, an aerial perspective, and sunlight reflections. Buildings should be tastefully spaced, avoiding excessive density.\n\nArchitecture: The island showcases a seamless blend of history and modernity. One part features the city's most representative ancient historical buildings, while the other smoothly transitions into the modern city skyline and landmark skyscrapers.\n\nEnvironment: The island floats above a vast sea of clouds, depicted in a traditional art style corresponding to the city's cultural sphere.\n\nTypography: 3D text of the city's name (in Pinyin or English) floats above the miniature island. This text appears as a micro-ecological installation where nature and culture coexist.\n\nOverlay & Layout: A minimalist, elegant information layer with a museum-plaque texture is overlaid around the frame. It displays relevant city data using a classic serif font for primary information and an ultra-fine, minimalist sans-serif font for auxiliary data. In the corners, include decorative background info like a classical atlas or high-end magazine title page: geographic coordinates, nicknames or the year of founding, and current weather. The overall composition features heavy use of negative space, being restrained, clean, and balanced, like a precious piece of fine art.\n\nStyle Requirements: Octane Render, C4D, Isometric City, Micro World, Living Ecosystem, 8k Resolution, DreamWorks style, 3D modeling, exquisite detail, soft light casting.\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228608585-gix1vy7b5tn.webp",
    "category": "앱 / 웹 디자인",
    "tags": [
      "장소",
      "지역",
      "초현실",
      "판타지",
      "도시",
      "3D"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 11,
    "created_at": "2026-04-15 04:50:37",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 9,
    "title": "극단적 감사 카드",
    "prompt": "Layout & Composition: A cinematic, split-panel composition postcard. The left half is the message area, and the right half is the visual area. The boundary is seamless but distinct.\n\nLeft Panel (Message Area):\n\nBackground: Dark, atmospheric silhouettes that are a direct extension of the environment in the right panel (e.g., dark mountain outlines, cosmic dust shadows, or dark ocean waves).\n\nTypography: Glowing, elegant, gold-foil style calligraphy.\n\nText Content:\n\nAt the top: \"To. [구독자분들]\"\n\nIn the center, randomly select and render ONE of the following Korean phrases:\n\n\"운명마저 굴복시킨 당신의 치열했던 한 해, 그 모든 순간이 경이로웠습니다.\"\n\n\"모든 것이 무너져도 당신은 버텨냈습니다. 그 숭고한 인내에 무한한 경의를 표합니다.\"\n\n\"당신의 고통은 별이 되었고, 상처는 훈장이 되었습니다. 진심으로 존경합니다.\"\n\nAt the bottom: \"From. [GPT PARK]\"\n\nRight Panel (Visual Area):\n\nSubject: The upper body of a woman overwhelmed with breathtaking emotion. Tears of triumph and awe stream down her face as she looks upwards, gasping.\n\nLighting: Dramatic, intense lighting striking her face, emphasizing deep emotion.\n\nBackground Environment: An extremely dramatic scene matching her emotion (Choose one context: A lone figure reaching a snowy mountain peak at explosive sunrise, witnessing a massive supernova in deep space, or standing before a calming, divine storm over the ocean).\n\nOverall Mood: Epic, highly emotional, triumphant, cinematic masterpiece, 8k resolution.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228587928-sa1xs8bs11k.webp",
    "category": "소셜 미디어 게시물",
    "tags": [
      "카드",
      "편지",
      "엽서",
      "시네마틱",
      "감사편지"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 10,
    "created_at": "2026-04-15 04:49:50",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 19,
    "title": "서정적 하이브리드 아트",
    "prompt": "[주제입력]을(를) 주인공으로 한 서정적이고 시적인 3:4 세로 비율의 예술 작품. 피사체는 화면 우측에 배치되어 좌측의 광활하고 미니멀한 여백(Negative Space)과 대비를 이룹니다. 스타일은 매우 실험적인 하이브리드 방식으로, 거친 질감의 수제 종이 위에 혼돈스러운 임파스토 유화의 두꺼운 터치와 몽환적인 수채화의 번짐 효과가 공존합니다. 강렬한 직사광선이 날카롭고 짙은 그림자를 만들어 피사체의 입체감을 극대화하며, 피사체의 경계는 종이의 질감 속으로 예술적으로 녹아드는 비네트 효과를 보여줍니다. 멀리 보이는 몽환적인 수평선은 무한한 평온함과 고독감을 암시합니다. 전통적인 사실주의를 벗어나 질감의 표현력과 구조적 균형을 강조한 아방가르드 멀티미디어 아트 스타일입니다. 오른쪽 하단 여백에는 \"이름\"라 적힌 우아한 필기체 사인이 아주 작게 포함되어 예술적 원화의 깊이와 감성을 완성합니다.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776229046411-aacq8dsq37k.webp",
    "category": "앱 / 웹 디자인",
    "tags": [
      "유화",
      "미술",
      "아트",
      "예술작품",
      "물감",
      "질감"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 9,
    "created_at": "2026-04-15 04:57:56",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 8,
    "title": "일본 청년 만화(Seinen) 스타일",
    "prompt": "A professional vertical webtoon/manga comic page layout featuring [INSERT SUBJECT HERE]. \n\n- **Art Style:** High-detail Seinen manga style with heavy ink hatching, dense screentone textures, and sharp line art. Grayscale monochrome base with selective vibrant glowing neon electric blue and violet lighting on eyes and energy effects.\n- **Layout & Composition:** \n    1. (Top Panel) A surreal manifestation where a giant, intricate [INSERT SUBJECT HERE]-related mechanical construct erupts with lightning. \n    2. (Middle Left) Two stacked macro close-up panels of the character's intense glowing eyes. \n    3. (Middle Right) A tilted bird's-eye view of a messy room with the character in distress. \n    4. (Main Center Panel) A dynamic explosion of white light and energy from the center, featuring flying debris and diagonal speed lines, with a first-person hand reaching out in the foreground. \n    5. (Bottom Panel) A calm, symmetrical shot of the character standing in front of a window under a full moon, cinematic framing.\n- **Technical Detail:** Dramatic chiaroscuro lighting, manga-style SFX lettering, intricate mechanical details, cinematic perspective, high-tension atmosphere.\n--ar 9:16",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228471421-kaoa8dxf2ge.webp",
    "category": "만화 / 스토리보드",
    "tags": [
      "망가",
      "만화",
      "일본만화",
      "청년만화",
      "웹툰"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 8,
    "created_at": "2026-04-15 04:48:17",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 7,
    "title": "가이드 웹툰",
    "prompt": "A full vertical infographic-style webtoon page featuring [주제]. \n\n- 9:16. korean.\n\n- Layout Structure: A long vertical scroll design consisting of a header, an episode title, a main 4-panel comic strip, an informational text block area, and a final bottom panel.\n\n- Header & Title: At the top, a small character avatar next to a title logo, followed by a large episode heading like \"#1 Title\".\n\n- Main Content (4-Panel Strip): Four identical horizontal rectangular panels stacked vertically in the center. In each panel, the character is centered in a medium close-up shot (chest up), showing a progression of subtle facial expressions and gestures (e.g., neutral, pondering, realization, and pointing upwards). Each panel includes a rounded speech bubble on the right side.\n\n- Art Style: Professional 2D digital anime illustration, cute chibi (SD) character design, clean bold outlines, flat cell shading with soft pastel colors, and high-quality line art on a minimalist white background.\n\n- Bottom Section: Below the 4 panels, there is a dedicated space for descriptive text, followed by a final wide outro panel featuring two characters interacting in a humorous or conversational manner.\n\n- Technical Detail: Vector clarity, bright and clean composition, high resolution, 8k, organized layout.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228377779-5bne9j7frxe.webp",
    "category": "인포그래픽 / 교육용 시각 자료",
    "tags": [
      "만화",
      "인포그래픽",
      "가이드",
      "매뉴얼",
      "교육자료"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 7,
    "created_at": "2026-04-15 04:47:13",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 6,
    "title": "형사의 수사용 코르크 보드",
    "prompt": "[인물 또는 사건]에 대한 집요한 추적 흔적이 담긴 형사의 수사용 코르크 보드를 정면에서 포착한 11:6 와이드 시네마틱 이미지. 질감이 살아있는 코르크 보드 위에는 [인물 또는 사건]과 관련된 결정적 장면이 담긴 빈티지 폴라로이드 사진, 빨간 잉크로 특정 지점이 표시된 낡은 지도, [정보1, 정보2, 정보3]에 대한 의구심과 가설이 빼곡히 적힌 노란 메모지들과 [첨부 사진들] 겹겹이 핀으로 고정되어 있습니다. 선명한 빨간색 실이 압정 사이를 복잡하게 가로지르며 [정보4, 정보5]에 관한 단서들을 긴밀하게 연결합니다. 상단 중앙에 매달린 단 하나의 따뜻한 전구가 보드 중앙을 강렬하게 비추며, 주변부에는 짙은 비네팅과 그림자를 형성하여 극적인 느와르 분위기를 자아냅니다. 커피 자국과 해진 종이 끝부분 등 사실적인 질감이 돋보이는 미스터리한 수사 현장. 한글렌더링을 정확하게해",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228279602-gzind4tzm8a.webp",
    "category": "인포그래픽 / 교육용 시각 자료",
    "tags": [
      "코르크 보드",
      "보드판",
      "미스터리",
      "포스트잇",
      "형사물",
      "인포그래픽"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 6,
    "created_at": "2026-04-15 04:45:17",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 5,
    "title": "아무튼 행사장에서",
    "prompt": "A candid, first-person POV selfie photograph taken at a major historical or futuristic event. An arm is outstretched, holding the image-capturing device appropriate for the specific era defined below. The subject is [인물사진 또는 설명], smiling excitedly into the lens. Their appearance, clothing, and accessories are historically accurate and culturally appropriate for the era. The background is a bustling, crowded immersive environment. Dominating the background, highly visible signage, banners, tapestries, or digital displays clearly show the text [이벤트 명]\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228223532-iks8h5inzwf.webp",
    "category": "소셜 미디어 게시물",
    "tags": [
      "이벤트",
      "장소설정",
      "인물사진",
      "행사장",
      "역사",
      "기념사진"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 5,
    "created_at": "2026-04-15 04:44:21",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 4,
    "title": "기억의 조각들",
    "prompt": "This high-resolution bird's-eye view was captured with a Lomo LC-A camera. The entire floor is covered with an endless stream of vintage black-and-white fashion model and advertising photos, featuring [the subject in the attached photo] in various poses. [The subject in the attached photo] stands amidst this sea of ​​photos, and the color image creates a striking contrast between the three-dimensional figure and the flat black-and-white background. The dramatic vignetting, film grain texture, high contrast, nostalgic cinematic atmosphere, and the precise focus on the central subject are striking. 16:9\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228130029-2fq2k5z5m0b.webp",
    "category": "만화 / 스토리보드",
    "tags": [
      "초현실",
      "판타지",
      "비네팅",
      "시네마틱",
      "탑뷰"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 4,
    "created_at": "2026-04-15 04:43:11",
    "updated_at": "2026-04-15 04:58:07",
    "publish_at": null
  },
  {
    "id": 3,
    "title": "스마트폰 화면을 뚫고",
    "prompt": "스마트폰 화면을 뚫고 [이미지속 인물]이(가) 튀어나오는 실험적이고 역동적인 2:3 비율의 세로 이미지. 광각 렌즈를 사용하여 손이 관찰자에게 닿을 듯이 거대하게 보이는 강한 원근 왜곡과 POV 시점을 구현함. 스마트폰의 유리 액자가 수많은 날카롭고 혼돈스러운 파편으로 부서지며 카메라를 향해 비산하는 모습. 하이퍼 리얼리즘과 디지털 초현실주의가 결합된 하이브리드 스타일로, 소셜 미디어 UI 레이어가 화면에 겹쳐져 있음. 드라마틱한 시네마틱 조명이 피사체의 윤곽과 유리 파편의 단면을 날카롭게 강조하며, 어두운 보케 배경 위로 강렬한 3D 팝업 효과를 연출함.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228076494-yr82oomlv2.webp",
    "category": "프로필 / 아바타",
    "tags": [
      "초현실주의",
      "스마트폰",
      "리얼리즘",
      "유리"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 3,
    "created_at": "2026-04-15 04:41:44",
    "updated_at": "2026-04-15 04:58:08",
    "publish_at": null
  },
  {
    "id": 2,
    "title": "구름위의 산책",
    "prompt": "3:4 세로 비율의 시네마틱한 하이 앵글 와이드 샷. 지평선까지 끝없이 펼쳐진 에테르와 같은 푹신한 황금빛 구름 바다 위를 [주제 입력]이(가) [동작 입력]하고 있는 장면입니다. 피사체는 이 활동에 완벽하게 어울리는 의상을 입고 있으며, 옷감은 고지대의 바람에 가볍게 흩날립니다. 구름의 폭신하면서도 단단한 표면과 상호작용하며 움직임에 따라 정교한 구름 안개 파편과 수증기 궤적이 만들어집니다. 조명은 늦은 오후의 따뜻하고 포화된 황금빛 햇살로, 길고 부드러운 그림자를 드리우며 피사체의 실루엣과 적운의 복잡한 질감에 찬란한 림 라이트 효과를 부여합니다. 초현실적인 환경과 하이퍼리얼리즘 질감이 조화를 이루는 광활하고 몽환적인 구성입니다. 8k 해상도, 고화질, 장엄하고 평온한 분위기.\n",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776228009530-98po1weaknf.webp",
    "category": "만화 / 스토리보드",
    "tags": [
      "판타지",
      "구름",
      "초현실",
      "몽환적"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 2,
    "created_at": "2026-04-15 04:40:43",
    "updated_at": "2026-04-15 04:58:08",
    "publish_at": null
  },
  {
    "id": 1,
    "title": "순정만화",
    "prompt": "A multi-panel shoujo manga page in classic 1970s-1980s style. The theme is \"[주제]\". The artwork features a beautiful female protagonist with very large, expressive eyes filled with stars and sparkles. The panels depict a dramatic emotional transition from conflict to enlightenment. Background is heavily decorated with falling roses, sparkling stars, floating feathers, and ornate ribbons. Use traditional monochrome black and white with professional screentone patterns and high-contrast ink lines.",
    "image_url": "https://gptparkai.com/cdn/thumbnails/1776227942299-7da52g1g6ph.webp",
    "category": "만화 / 스토리보드",
    "tags": [
      "순정만화",
      "만화",
      "웹툰"
    ],
    "recommended": 0,
    "is_new": 0,
    "sort_order": 1,
    "created_at": "2026-04-15 04:39:24",
    "updated_at": "2026-04-15 04:58:08",
    "publish_at": null
  }
];
