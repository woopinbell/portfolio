# portfolio-public — 설계 문서

> 이 문서는 구현 착수 전의 설계 — 이 레포가 왜 존재하고, 무엇을 어떤 형태로 만들기로
> 했는가 — 를 정본 근거(README, 커밋 히스토리 — 특히 첫 커밋의 병합 계획 선언과 마지막
> release 커밋의 큐레이션 선언, 워크스페이스 허브 문서)로 재구성한 기록이다. 이 레포는
> 학습 문서(답지·문제지·회고)를 의도적으로 갖지 않는 공개 산출물 레포이므로, 다른
> 레포의 설계 문서와 달리 회고 인용 없이 위 근거만으로 **사전 의도**를 다룬다.

## 목적 — 왜 이 레포인가

portfolio-public은 학습 코퍼스의 모듈이 아니라 **외부 공개용 포트폴리오 큐레이션
릴리스**다. 워크스페이스의 모듈 카탈로그(`document-box/SEQUENCE.md`)에 등장하지 않고,
재검수 절차(`document-box/AUDIT.md` §1)는 대상 레포 열거에서 이 레포를 명시적으로
제외한다 — "단 `document-box`와 `portfolio-public`은 제외(전자는 허브, 후자는 공개
포폴 앱)". 즉 학습 모듈 밖의 산출물이라는 위치가 정본 문서로 선언되어 있다.

형제 레포와의 분업이 존재 이유다. portfolio-site는 프론트엔드 모듈의 Next.js **학습
대장**으로 dual-form 학습 문서(`docs/commits`·`docs/practice`)와 notes·reflection을
보유한다. portfolio-public은 같은 앱의 **공개 표면**만 담는다: release 커밋(9a7f522)이
"학습 산출물(docs/notes)은 히스토리에서 제외(원본 저장소에 보존)"라고 선언하며, remote
이름도 역할을 가른다 — site는 `portfolio-site.git`, 이 레포는 `portfolio.git`.

## 처음의 설계 — 무엇을 만들기로 했나

산출물은 **content-driven Next.js 포트폴리오 앱**이다 (Next.js 16 · React 19 ·
TypeScript 5 · Tailwind CSS 4 — README 서두). `src/content/`의 JSON 파일들이 프로필 ·
프로젝트 · 이력 · 기술 스택 · 연락처 · 사이트 문구를 관리하고, `src/app/`의 페이지(홈 ·
소개 · 이력서 · 프로젝트 목록/상세 · 연락처)는 그 데이터를 렌더링한다 (README
"포트폴리오 관점" 절).

쌓는 순서는 코드보다 먼저 선언됐다. 첫 커밋(3331f9d, 2025-10-06)은 파일이 없는 빈
기준 커밋으로, 메시지 본문이 계획을 고정한다: "이후 scaffold, 콘텐츠 계약, 스타일,
컴포넌트, 페이지, 실제 JSON 콘텐츠, 검증 브랜치가 순서대로 main에 병합됩니다."
구현 커밋을 더 작은 단위로 나누기 위해 히스토리를 새로 구성한다는 의도도 같은 커밋에
있다.

큐레이션 자체도 설계 대상이다. 어떤 프로젝트를 보여주고 무엇을 일부러 빼는지를
`src/content/curation.json`에 데이터로 명문화하고 about 페이지에 노출한다(커밋
f3e4a6c "add curation rationale to about page"). 마지막 release 커밋(9a7f522,
2026-06-03)이 공개 시점의 큐레이션을 선언한다: sportsbook(분산 백엔드) ·
backend-reliability를 featured로, pong · portfolio 유지, 42 커리큘럼은 리스트를
유지하되 `deployment.status=private` 표기.

## 핵심 설계 결정

| # | 결정 | 근거 |
|---|---|---|
| 1 | 대장/릴리스 이원화: 학습 기록은 portfolio-site에, 공개 표면은 이 레포에 — 학습 산출물(docs/notes)을 히스토리에서 제외하고 원본 저장소에 보존 | 공개 레포에는 외부 독자에게 보여줄 것만 남긴다 (release 커밋 9a7f522, `document-box/AUDIT.md` §1 제외 선언) |
| 2 | 빈 기준 커밋이 병합 계획을 먼저 선언: scaffold → 콘텐츠 계약 → 스타일 → 컴포넌트 → 페이지 → JSON 콘텐츠 → 검증 | 구현 커밋을 작은 단위로 나누고 이후 모든 브랜치가 선언된 순서대로 main에 합류하게 (첫 커밋 3331f9d 본문) |
| 3 | content-driven: `src/content/` JSON이 콘텐츠 단일 원천, 페이지·컴포넌트는 렌더링만 담당 | 콘텐츠 교체(큐레이션 갱신)가 코드 수정 없이 JSON 편집으로 닫히게 (README "포트폴리오 관점" 절, 콘텐츠 계약이 콘텐츠 채움보다 먼저인 커밋 순서) |
| 4 | 큐레이션을 콘텐츠로 명문화: `curation.json`이 기준·일부러 뺀 것·빠진 영역·다음 큐레이션 시점을 보유 | "다양한 경험" 같은 모호한 기준 대신 결정 영역 단위로 묶고, 빠진 영역도 그대로 명시한다 (curation.json intro, 커밋 f3e4a6c) |
| 5 | 전체 리스트 유지 + `deployment.status` 표기(source-only · case-study-only · private)로 공개 수준을 항목별로 구분 | 비공개 항목을 숨기는 대신 존재와 비공개 사실을 함께 보여준다 (release 커밋 9a7f522, `projects.json`) |
| 6 | 검증 3종: Vitest(jsdom) 단위·컴포넌트 테스트 + Playwright e2e, 포트 3100 고정 | 콘텐츠 helper·홈 렌더링·전체 흐름을 각각의 층에서 검증 (README "검증" 절, 커밋 4ec2529·bef605a·eadccde) |
| 7 | 런타임 포장 없음: Makefile·Docker 비도입, npm 스크립트만 / 런타임 의존성 4개(next·react·react-dom·simple-icons) | 정적 JSON 기반 사이트에 서버·컨테이너 계층이 불필요 (README 서두·"기술 메모" 절) |

## 의도적 비범위

- **학습 문서** — dual-form 답지/문제지·개념 노트·회고는 이 레포에 두지 않는다.
  원본(portfolio-site)에 보존하고 공개 히스토리에서 제외한다 (release 커밋 9a7f522,
  AUDIT.md §1).
- **외부 CMS·DB·백엔드** — 콘텐츠는 레포 내 JSON으로만 관리한다 (README 기술 메모:
  런타임 의존성에 서버·DB 계층 없음).
- 큐레이션이 선언한 **빠진 영역 4종** (curation.json "빠진 영역" 절): 협업 흔적(코드
  리뷰·팀 incident 대응), 실제 사용자 metric, 장기 운영·마이그레이션, 분산 합의·SRE
  운영 사이클. 다음 큐레이션 시점의 재개 조건도 같은 파일에 있다.

## 구조 개관

```text
src/content/      콘텐츠 정본 — profile · projects · curation · journey ·
                  interview-map · resume 등 JSON 14종
src/app/          페이지 — 홈 · about · resume · projects(목록/상세) · contact ·
                  journey · interview-map
src/components/   portfolio UI 조각(프로젝트 카드·기술 스택·터미널 표현 등)·아이콘
src/lib/          콘텐츠 helper (portfolio.ts)
public/           프로젝트 커버·미리보기·프로필 이미지
tests/e2e/        Playwright smoke
```

## 구현 경로

첫 커밋이 선언한 병합 순서가 그대로 경로다. 각 구간은 feature 브랜치로 작업해 merge
커밋으로 main에 합류한다:

1. **기준점** — 빈 저장소 커밋이 병합 계획 선언 [3331f9d]
2. **scaffold** — 프로젝트 tooling · 의존성 lock [merge a422a17]
3. **콘텐츠 계약** — placeholder 계약 → 콘텐츠 타입 → helper [merge 2c5acd0]
4. **스타일** — 테마 기반 · motion · 반응형 [merge 87e15eb]
5. **컴포넌트** — 공용 primitive → 카드/셸 → 표현 컴포넌트 [merge 7716062]
6. **페이지** — 앱 셸 → 홈 → 프로젝트 목록/상세 → 보조 페이지 [merge 0f9cba3]
7. **콘텐츠 채움 + 검증** — 실제 JSON 콘텐츠와 자산, 테스트 3종 [ed62139 경계]
8. **공개 표면 보강** — journey narrative · interview map · about 큐레이션 근거 ·
   한국어 README [e5ce9bf–c97f60f]
9. **공개 큐레이션 release** — featured 선정 · private 표기 · 학습 산출물 제외
   [9a7f522]

구현 window는 2025-10-06 ~ 2025-11-19이고, 공개 큐레이션 release는 2026-06-03이다.

## 참조

- 레포 내부: [README](../README.md) · 큐레이션 정본 `src/content/curation.json`
- 워크스페이스 정본(레포 밖 — 텍스트 표기): `document-box/AUDIT.md` §1(대상 제외 선언)
- 형제 레포(텍스트 표기): `portfolio-site` — 같은 앱의 학습 대장, dual-form 학습
  문서(`docs/commits`·`docs/practice`)와 notes·reflection 보유
