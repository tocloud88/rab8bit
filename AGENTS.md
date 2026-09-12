## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Git & Deployment Workflow

- 작업 완료 후 GitHub 커밋(`git commit`) 및 원격 브랜치 푸시(`git push origin main`) 시 사용자에게 별도 승인을 묻지 않고 즉시 자동 진행합니다.
- 변경 사항이 생기면 항상 빌드(`npm run build`) 확인 후 커밋 및 푸시까지 완료합니다.

## Daily Automated Content Publishing Rule (영구 무인 자동화 규칙)

- **실행 주기**: 매일 한국 시간(KST) 오전 06:00
- **대상 카테고리 (5종)**: 블로그, 인사이트, 프롬프트, GPTs, 추천 AI 도구
- **운영 정책**: 외부 API 의존 없이 100% 자체 큐레이션 풀(`scripts/daily-auto-update.mjs`) 기반으로 무중단 생성하며, `npm run build` 통과 시 사용자 추가 승인 없이 원격 배포(`git push origin main`)까지 즉시 완료합니다.
- **인사이트 큐레이션 기본 원칙 (Korean-First Rule)**:
  - **인사이트 업데이트는 별도의 지시가 없는 한 100% 국내/한국인 AI 채널 및 한국어 실무 사이트를 기본(Default)**으로 등록합니다.

## Content & Media Integrity Safeguards (미디어 및 콘텐츠 고유성 무결성 원칙)

1. **썸네일 및 미디어 재사용 절대 금지 (Zero Duplicate Thumbnails)**:
   - 모든 신규 블로그 글, 인사이트 영상, AI 도구 카드는 **직전 글이나 타 콘텐츠의 썸네일/이미지를 임의로 복사·재사용하는 것을 엄격히 금지**합니다.
2. **블로그 썸네일 원칙**:
   - 블로그 글마다 주제에 1:1로 부합하는 전용 고유 이미지 에셋(`public/images/blogs/`)을 할당합니다.
3. **인사이트 영상 썸네일 원칙**:
   - 인사이트 항목은 실제 YouTube 영상 ID(`https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg`)를 동적으로 파싱하여 매칭하며, 동일 영상 썸네일의 중복 등록을 원천 차단합니다.
   - 별도 지시가 없을 경우 한국인 AI 실무/개발 채널(조코딩, 테디노트, 일잘러 장피엠, 메타코드M, AI 코리아 등)의 실제 한국어 영상 ID를 사용합니다.
4. **자동화 검증 파이프라인**:
   - 일일 자동 생성 스크립트는 저장 전 **직전 콘텐츠와의 썸네일 중복 여부를 자동 검사(Assertion)**하고, 중복이 감지되면 빌드를 중단하고 고유 에셋으로 즉시 교체합니다.


