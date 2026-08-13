# Storybook App

React + TypeScript + Vite app with a design system, Storybook, and Playwright tests.

## Prerequisites

- Node.js 20+
- npm

```bash
npm install
```

First time using Playwright, also install browsers:

```bash
npx playwright install
```

## Run the app

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

| Path | Page |
| --- | --- |
| `/auth/login` | Login |
| `/` | Dashboard (after login) |
| `/home` | Home |
| `/users` | Users |
| `/playground` | Testing playground |

Login uses DummyJSON:

- Username: `emilys`
- Password: `emilyspass`

API base URL comes from `.env`:

```
VITE_API_URL=https://dummyjson.com/
```

## Run Storybook

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006).

Stories live next to components, for example:

- `src/components/Button.stories.tsx`
- `src/components/Input.stories.tsx`
- `src/pages/auth/LoginForm.stories.tsx`

Build a static Storybook site:

```bash
npm run build-storybook
```

Output goes to `storybook-static/`.

Publish visual reviews to Chromatic:

```bash
npm run chromatic
```

## Run Playwright tests

E2E tests (app flows such as login, users, playground):

```bash
npm run test:e2e
```

Run one file or headed mode:

```bash
npx playwright test tests/auth.spec.ts --project=chromium
npx playwright test tests/playground --project=chromium --headed
```

Component tests (isolated UI in `tests/component`):

```bash
npm run test:ct
```

After a run, open the HTML report:

```bash
npx playwright show-report
```

E2E uses `http://localhost:5173`. Playwright starts Vite automatically if it is not already running.

## Other scripts

```bash
npm run build      # production build
npm run preview    # preview the production build
npm run lint       # ESLint
npm run format     # Prettier
```
