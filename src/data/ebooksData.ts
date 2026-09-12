export interface EbookItem {
  id: string;
  title: string;
  access?: string;
  url: string;
  thumbnail?: string;
  description: string;
  sort_order?: number;
  is_new?: number | boolean;
}

export const EBOOKS_DATA: EbookItem[] = [
  {
    "id": "gemini-master-manual",
    "title": "2026 제미나이(Gemini) 실전 마스터 매뉴얼",
    "access": "무료",
    "url": "/ebooks/gemini-manual",
    "thumbnail": "/images/ebooks/gemini-manual-cover.jpg",
    "description": "100만~200만 토큰 대형 문서 분석부터 구글 워크스페이스(@Gmail, @Drive, @Docs) 연동, 프롬프트 엔지니어링 및 AI Studio API 무인 자동화까지 50페이지로 완벽 정리한 실전 바이블입니다.",
    "sort_order": 16,
    "is_new": 1
  },
  {
    "id": 15,
    "title": "비법을 파는 사람에겐 비법이 없다",
    "access": "무료",
    "url": "https://no-secret-in-secret-selling.vercel.app/",
    "thumbnail": "https://gptparkai.com/cdn/thumbnails/1788007988668-ipdyqc2dd6o.jpg",
    "description": "\"월 300만 원 자동 수익\", \"선착순 마감\"이라는 광고는 정보가 아니라 심리적 조급함을 자극하도록 정교하게 설계된 유혹입니다. 조작하기 쉬운 통장 캡처와 생존자 편향의 후기 뒤에는 '채널 운영'이 아닌 '강의와 곡괭이(도구) 판매'를 본업으로 삼는 구조가 숨어 있습니다.\n\n이 책은 결제 충동을 막는 7가지 검증법을 제시합니다. 화면 속 캡처 대신 실물 채널 데이터를 확인하고, 상세페이지 밖 진짜 후기와 환불 규정을 읽으며, 마감 압박 앞에서 '24시간 유예 원칙'을 지키는 것입니다.\n진짜 비법은 없습니다. 값비싼 강의 대신 무료 공개 자료와 나의 진짜 불편을 해결하는 묵묵한 실천이 유일한 길입니다.",
    "sort_order": 14,
    "created_at": "2026-08-29 12:53:52",
    "updated_at": "2026-08-29 12:53:59",
    "is_new": 1,
    "publish_at": "2026-08-30 02:45:00"
  },
  {
    "id": 14,
    "title": "AI를 잘 쓰는 사람과, AI 없이 못 하게 된 사람",
    "access": "무료",
    "url": "https://ai-users-vs-ai-dependents.vercel.app/",
    "thumbnail": "https://gptparkai.com/cdn/thumbnails/1786020409620-dh0o603c6hi.jpg",
    "description": "AI가 틀렸는지 확인하는 법은 이미 배웠습니다. 그런데도 무언가 조용히 빠져나간다면, 이제 의심할 대상은 도구가 아니라 여러분입니다.\n\n'AI에게 속지 않는 법' 3부작의 완결편. 이 책은 방향을 바꿔 말합니다. \"오늘은 여러분을 조심하세요.\"\n\n넘겨도 되는 일과 절대 넘기면 안 되는 것, 그리고 판단하는 힘을 지키는 습관을 담았습니다. 마지막 방어선은 도구가 아니라 사람입니다.",
    "sort_order": 13,
    "created_at": "2026-08-06 12:48:51",
    "updated_at": "2026-08-06 12:48:55",
    "is_new": 1,
    "publish_at": "2026-08-09 02:45:00"
  },
  {
    "id": 13,
    "title": "AI는 당신을 설득하지 않았다",
    "access": "무료",
    "url": "https://ai-conversation-verification.vercel.app/",
    "thumbnail": "https://gptparkai.com/cdn/thumbnails/1785314563170-u9ndzpobnk.jpg",
    "description": "프롬프트를 고쳐도, 대화가 길어지면 AI는 다시 \"다 맞다\"고 합니다. 당신 잘못이 아닙니다. AI는 기억이 없어 매번 대화 전체를 다시 읽으며, 당신의 결론과 자신의 오류를 함께 쌓기 때문입니다.\n\n이 책은 편향이 누적되는 맥락 오염의 구조를 파헤치고, 오염을 알아채는 5가지 신호와 새 창 원칙·적대적 역할·사실만 이관하기·교차 검증이라는 실전 무기를 복붙 템플릿과 함께 담았습니다.\n\n긴 대화는 깊은 대화가 아니라 기울어진 대화입니다. AI가 당신을 설득한 게 아니라, 당신이 AI를 설득해 놓고 그 답을 다시 듣고 있었을 뿐입니다.",
    "sort_order": 12,
    "created_at": "2026-07-29 08:44:23",
    "updated_at": "2026-08-06 12:46:07",
    "is_new": 1,
    "publish_at": "2026-08-02 02:45:00"
  },
  {
    "id": 12,
    "title": "AI에게 속지 않는 법",
    "access": "무료",
    "url": "https://how-to-spot-ai-deception.vercel.app/",
    "thumbnail": "https://gptparkai.com/cdn/thumbnails/1784369686799-khzhprgz0dc.jpg",
    "description": "AI 강의는 첫 시간에 그림 생성부터 가르칩니다. 화면에 결과가 바로 뜨니까요. 하지만 그건 실력이 아니라 버튼 누르는 법입니다.\n이 책은 순서를 제자리로 돌려놓습니다. 이 기계의 정체를 알고, 질문에서 내 결론을 빼고, 답변을 초안으로 다루는 검증 루틴을 갖추는 세 단계입니다. AI가 예스맨인 게 아니라, 내 질문이 예스맨을 만들었으니까요.\n프롬프트는 도구가 바뀌면 사라지지만 의심하는 법은 남습니다. 이 책을 덮으면 어떤 새 도구가 나와도 30분이면 적응하실 수 있습니다.",
    "sort_order": 11,
    "created_at": "2026-07-18 10:15:37",
    "updated_at": "2026-07-18 10:15:41",
    "is_new": 1,
    "publish_at": "2026-07-19 02:45:00"
  },
  {
    "id": 11,
    "title": "유튜브 초기 운영 성장 바이블",
    "access": "무료",
    "url": "https://youtube-initial-growth-system.vercel.app/",
    "thumbnail": "https://gptparkai.com/cdn/thumbnails/1779770027802-qmoqul0u2tp.png",
    "description": "유튜브 초보 운영자가 가장 많이 하는 실수와 알고리즘의 핵심 원리를 데이터 관점에서 정리한 실전 전략 전자책.\n조회수보다 중요한 시청지속시간, 외부공유, 품앗이, 음악·플리 채널 운영법, 썸네일·제목 전략, 90일 성장 원칙까지 실제 사례 중심으로 설명합니다.",
    "sort_order": 10,
    "created_at": "2026-05-26 04:34:09",
    "updated_at": "2026-08-29 12:54:01",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 10,
    "title": "구독자 2만이 10만보다 더 버는 이유",
    "access": "회원전용",
    "url": "https://drive.google.com/file/d/1tQDV1ZGwLgsUsGqIP1u9IehLKbQqKN7r/view?usp=sharing",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/site/%EA%B5%AC%EB%8F%85%EC%9E%902%EB%A7%8C%EC%9D%B410%EB%A7%8C%EB%B3%B4%EB%8B%A4%EB%8D%94%EB%B2%84%EB%8A%94%EC%9D%B4%EC%9C%A0COVER.jpg",
    "description": "구독자 10만이 꿈이신가요? 잠깐, 숫자를 먼저 보세요.\n구독자 2만 채널이 10만 채널보다 더 많이 버는 일이 실제로 일어나고 있습니다. 수익을 결정하는 건 구독자 수가 아니라 수익 구조입니다.\n이 책은 광고·멤버십·쿠팡 파트너스·블로그, 4가지 수익 파이프라인을 하나로 연결하는 시스템 설계법을 알려줍니다. 지금 당장 시작할 수 있는 구체적인 수치와 순서로, 구독자 2만으로 월 400만 원을 만드는 구조를 직접 설계해보세요.",
    "sort_order": 9,
    "created_at": "2026-04-11 11:25:12",
    "updated_at": "2026-08-06 12:46:08",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 1,
    "title": "당신의 첫 전자책, AI와 함께 시작해요!",
    "access": "무료",
    "url": "https://nimble-axolotl-329d68.netlify.app/",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/AI_Ebook_Masterclass.jpg",
    "description": "글쓰기가 두려운 당신을 위한 AI 활용 전자책 제작 완벽 가이드! 이 책은 아이디어 발굴부터 목차 구성, 초안 작성, 편집, 표지 디자인까지 AI와 함께 전자책을 완성하는 모든 과정을 단계별로 안내합니다.",
    "sort_order": 8,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:02",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 2,
    "title": "콘텐츠 크리에이터를 위한 AI 프롬프트 수익화 마스터 가이드",
    "access": "회원전용",
    "url": "aHR0cHM6Ly9haS1wcm9tcHQtbW9uZXRpemF0aW9uLW1hc3Rlci1ndWlkZS5uZXRsaWZ5LmFwcC8=",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/AI_Prompt_Monetization_Master_Guide.jpg",
    "description": "콘텐츠 크리에이터를 위한 AI 수익화 완벽 가이드입니다. 최신 AI 모델 활용법과 프롬프트 엔지니어링 기법을 통해 블로그, 유튜브, SNS 등 플랫폼별 수익 창출 전략을 제시합니다. SEO, 니치 마켓 발굴, 환각 방지 등 실전 노하우와 템플릿을 제공하여 콘텐츠 품질 향상과 수익 극대화를 돕는 실무 지침서입니다.",
    "sort_order": 7,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:02",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 3,
    "title": "MCP 실용 매뉴얼 - 인터랙티브 가이드",
    "access": "무료",
    "url": "https://mcp-practical-manual.vercel.app/",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/MCP_Practical_Manual.jpg",
    "description": "MCP의 핵심 개념과 아키텍처를 설명하고, Python 기반 서버 구축부터 Claude AI 연동, 보안 설정까지의 과정을 단계별 예제와 함께 안내하여 개발자가 AI 시스템을 실무에 효과적으로 적용하도록 돕습니다.",
    "sort_order": 6,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:02",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 4,
    "title": "구글이 사랑하는 블로그 SEO 최적화 A to Z",
    "access": "무료",
    "url": "https://seo-optimization-guide-e-book.vercel.app/",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/SEO_Optimization_Guide_E-Book.jpg",
    "description": "구글 상위 노출을 위한 SEO 최적화 가이드입니다. 최신 알고리즘의 핵심은 E-E-A-T(경험·전문성·권위·신뢰)와 독자에게 실질적 도움이 되는 콘텐츠입니다. 검색 의도를 반영한 글쓰기, 매력적인 제목, 가독성 높은 구조화, 이미지 최적화 전략을 제시합니다.",
    "sort_order": 5,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:02",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 5,
    "title": "유튜브 쇼츠를 통한 현실적인 수익화 가이드",
    "access": "회원전용",
    "url": "aHR0cHM6Ly95b3UtdHViZS1zaG9ydHMtbW9uZXRpemF0aW9uLWd1aWRlLnZlcmNlbC5hcHAv",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/YouTube_Shorts_Monetization_Guide.jpg",
    "description": "YPP 광고, 제휴 마케팅, 브랜드 협찬, 롱폼 연계, 자체 상품 판매 등 5가지 현실적인 전략과 제작 팁을 제시합니다. 과장된 정보 대신 검증된 방법과 장기적인 브랜딩을 통해 지속 가능한 수익을 창출하는 실질적인 로드맵을 제공합니다.",
    "sort_order": 4,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:02",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 6,
    "title": "퍼플렉시티 AI 프롬프트 마스터",
    "access": "무료",
    "url": "https://perplexity-prompt-master.vercel.app/",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/Perplexity_AI_Prompt_Master.jpg",
    "description": "퍼플렉시티 AI의 잠재력을 극대화하는 프롬프트 작성 완벽 가이드입니다. 실시간 검색과 AI가 결합된 퍼플렉시티의 특징을 설명하고, 명확한 지시와 맥락 설정 등 효과적인 프롬프트 작성 원칙을 제시합니다.",
    "sort_order": 3,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:02",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 7,
    "title": "퍼플렉시티 검색 최적화_환각 최소화 및 정확성 극대화를 위한 프롬프트 전략",
    "access": "무료",
    "url": "https://perplexity-optimization-guide.vercel.app/",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/Perplexity_Optimization_Guide.jpg",
    "description": "퍼플렉시티 검색시 환각 최소화, 정보오류 감소, 최신성 반영, 검색결과 재검증을 위한 체계적인 프롬프트 전략을 제시합니다.",
    "sort_order": 2,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:03",
    "is_new": 0,
    "publish_at": null
  },
  {
    "id": 8,
    "title": "2026 AI 시대 디지털 생존 가이드",
    "access": "무료",
    "url": "https://2026-ai-survival-guide.vercel.app/",
    "thumbnail": "https://raw.githubusercontent.com/muzbox1973/BananaWorkimg/main/site/2026-AI-BOOK.webp",
    "description": "인공지능 시대를 위한 종합적인 디지털 가이드 전략으로, 반응형 전자책 레이아웃과 심층 분석 챕터를 특징으로 합니다.",
    "sort_order": 1,
    "created_at": "2026-04-06 04:00:06",
    "updated_at": "2026-04-11 11:27:03",
    "is_new": 0,
    "publish_at": null
  }
];
