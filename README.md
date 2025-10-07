# Portfolio Site

Design-minded portfolio for Seungwoo Kim. The site presents product interfaces, case studies, reliability training, and 42 curriculum work from a single content registry.

## Scope

The visible project list is intentionally aligned to the current work history:

- 18 projects under `~/Desktop/working/42`, excluding `pong-pong-platform`
- `~/Desktop/working/backend-reliability-training`
- `~/Desktop/working/frontend-reliability-training`
- `~/Desktop/working/game-server-reliability-training`
- `~/Desktop/working/full-stack/grounded-travel`
- `~/Desktop/working/full-stack/chatbot-evaluation`
- `~/Desktop/working/front-next-js/portfolio-site`

The three reliability-training repositories are grouped as one portfolio entry to keep the project index readable.

## Local URL

- Portfolio: `http://localhost:3100`

```bash
npm run dev
```

## Content Registry

Portfolio content is split across JSON files in `src/content/`:

- `profile.json`
- `journey.json`
- `presentation.json`
- `projects.json`
- `skills.json`
- `tech-stack.json`
- `experience.json`
- `resume.json`
- `links.json`
- `contact.json`
- `site.json`

Project cards, case study pages, resume project highlights, deployment badges, screenshots, links, stack chips, and archive grouping are driven by `src/content/projects.json`.
The home/about Journey timeline is driven by `src/content/journey.json`, the profile portrait slot reads its image path from `src/content/profile.json`, and home presentation variants read section copy plus terminal copy from `src/content/presentation.json`.

## Design Direction

The home page prioritizes:

- lead product case studies first
- a visual product screenshot surface in the hero
- a complete work map with product, 42, and reliability counts
- grouped project archive sections on `/projects`
- case study pages for architecture, decisions, tradeoffs, and results

Older sample entries and the excluded `pong-pong-platform` entry are kept disabled in the content file rather than shown in the public project list.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npx playwright test
```

GitHub remote and deployment settings are outside this repository scope.
