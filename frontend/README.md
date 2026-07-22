# Another Home — Admin Console

Smart Hostel and Boarding Management Platform. This is the admin/warden web application: a React (Vite) single-page app for managing hostel operations — buildings, rooms, students, room allocation, maintenance, visitors, payments, and announcements.

## Stack

- React 19 + Vite, JavaScript (no TypeScript)
- Tailwind CSS v4
- React Router for routing
- Zustand for auth/session state
- React Hook Form for forms
- Axios for API communication
- Recharts for charts
- Framer Motion for animation

## Architecture

The codebase follows a clean-architecture-inspired layering per feature:

```
src/
├── app/            Application shell — router, admin layout, sidebar/navbar
├── features/        One folder per business capability
│   └── <feature>/
│       ├── domain/          Entities and business rules, framework-free
│       ├── application/     Use cases — orchestrate domain + infrastructure
│       ├── infrastructure/  API/repository implementations
│       └── presentation/    React components, pages, hooks
├── shared/           Reusable UI components, hooks, utilities
└── infrastructure/   Cross-cutting infrastructure (HTTP client, config)
```

Data currently comes from in-memory mock repositories (see each feature's `infrastructure/` folder) so the UI is fully explorable without a backend. Each repository is the seam to swap in real API calls later — the `application` and `presentation` layers don't need to change.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run lint      # eslint
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` once a backend is available.

## Demo login

With no backend yet, `VITE_USE_MOCK_API=true` (the default in `.env.example`) swaps the authentication repository for a mock implementation — sign in with **any email and password** and you're in.

Once a real backend is ready, set `VITE_USE_MOCK_API=false` and the same login form will call the live `/auth/login` and `/auth/forgot-password` endpoints via Axios — no changes needed above the `infrastructure/` layer. See `src/features/authentication/infrastructure/authRepository.js`.
