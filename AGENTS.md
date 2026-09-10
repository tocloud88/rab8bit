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
