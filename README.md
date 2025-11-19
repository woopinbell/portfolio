# Portfolio Site

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?style=flat&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.59.1-2EAD33?style=flat&logo=playwright&logoColor=white)

작업 이력을 Next.js 기반 포트폴리오로 정리한 저장소입니다. `package.json` 기준으로 Next.js 16.2.4, React 19.2.4, TypeScript 5, Tailwind CSS 4, Vitest 3.2.4, Playwright 1.59.1을 사용합니다. Makefile이나 Docker 설정은 없습니다.

## 포트폴리오 관점

- `src/content/`의 JSON 파일들이 프로필, 프로젝트, 이력, 기술 스택, 연락처, 링크, 사이트 문구를 관리합니다.
- `src/app/`은 홈, 소개, 이력서, 프로젝트 목록, 프로젝트 상세, 연락처 페이지를 담당합니다.
- `src/components/portfolio/`는 프로젝트 카드, 링크, 기술 스택, 프로필 사진, 터미널 표현, 섹션 헤딩 등 포트폴리오 UI 조각을 담고 있습니다.
- `public/projects/`와 `public/previews/`에는 프로젝트 커버와 미리보기 이미지가 들어 있습니다.

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

- 런타임 의존성: `next`, `react`, `react-dom`, `simple-icons`
- 개발 의존성: `@playwright/test`, `@tailwindcss/postcss`, `@testing-library/react`, `eslint`, `jsdom`, `tailwindcss`, `typescript`, `vitest`
- Vitest는 `src/**/*.test.{ts,tsx}`를 `jsdom` 환경에서 실행합니다.
