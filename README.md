# Portfolio Site

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?style=flat&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.59.1-2EAD33?style=flat&logo=playwright&logoColor=white)

외부 공개용 포트폴리오 **큐레이션 릴리스**입니다. content-driven Next.js 사이트로, `src/content/`의 JSON이 프로필·프로젝트·이력·큐레이션을 단일 원천으로 관리하고 페이지는 그 데이터를 렌더링만 합니다. 무엇을 보여주고 무엇을 일부러 뺐는지는 `src/content/curation.json`에 데이터로 명문화해 about 페이지에 그대로 노출합니다. 학습 기록(docs·notes·커밋 히스토리)은 형제 레포 `portfolio-site`가 대장으로 보유하고, 이 레포는 같은 앱의 **공개 표면**만 담습니다.

> 이 레포가 왜 존재하고 어떻게 설계됐는지는 [docs/DESIGN.md](docs/DESIGN.md)부터 보세요.

## 구성

콘텐츠를 단일 원천으로 두고 페이지·컴포넌트는 렌더링만 담당하도록 역할을 나눕니다.

- `src/content/` — 콘텐츠·큐레이션 JSON. 프로필·프로젝트·이력·기술 스택·연락처·사이트 문구와 함께, 큐레이션 기준과 일부러 뺀 영역을 적은 `curation.json`이 들어 있습니다.
- `src/app/` — 페이지. 홈·소개(about)·이력서(resume)·프로젝트 목록/상세·연락처(contact)에 더해 journey·interview-map 페이지를 담당합니다.
- `src/components/portfolio/` — 포트폴리오 UI 조각. 프로젝트 카드, 링크, 기술 스택, 프로필 사진, 터미널 표현, 섹션 헤딩 등을 담고, 아이콘은 `src/components/icons.tsx`에 둡니다.
- `src/lib/` — 콘텐츠 helper. JSON 콘텐츠를 페이지에서 쓰기 좋게 읽어 옵니다.
- `public/projects/`·`public/previews/`·`public/profile/` — 프로젝트 커버, 미리보기, 프로필 이미지.

## 실행

의존성 설치 후 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

개발 서버 스크립트는 `next dev --webpack -p 3100`이며 로컬 주소는 `http://localhost:3100`입니다.

프로덕션 빌드와 실행은 패키지 스크립트를 그대로 사용합니다.

```bash
npm run build
npm run start
```

`npm run start`는 `next start -p 3100`을 실행합니다.

## 검증

패키지에 선언된 검증 명령은 아래와 같습니다.

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
```

- `npm run lint`: `eslint .`
- `npm run typecheck`: `tsc --noEmit`
- `npm test`: `vitest run`
- `npm run test:e2e`: `playwright test`

Playwright 설정은 `http://localhost:3100`을 기준으로 하며, 필요하면 `npm run dev`를 자동으로 띄우도록 구성되어 있습니다.

## 기술 메모

- Makefile이나 Docker 설정은 없습니다. 정적 JSON 기반 사이트라 npm 스크립트만으로 실행·검증이 닫힙니다.
- 런타임 의존성: `next`, `react`, `react-dom`, `simple-icons`
- 개발 의존성: `@playwright/test`, `@tailwindcss/postcss`, `@testing-library/react`, `eslint`, `jsdom`, `tailwindcss`, `typescript`, `vitest`
- Vitest는 `src/**/*.test.{ts,tsx}`를 `jsdom` 환경에서 실행합니다.
