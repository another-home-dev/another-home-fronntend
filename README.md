# Another Home — Web Dashboard

The web dashboard for hostel staff. Wardens use it to run the hostel; super-admins also use it to create warden accounts. Students use the [mobile app](https://github.com/another-home-dev/mobile-app) instead.

Part of [Another Home](https://github.com/another-home-dev). Live at <https://34.54.94.62.nip.io>.

## Features

| Page | What it does |
| --- | --- |
| Dashboard | Totals, occupancy, maintenance and payment charts, recent activity |
| Hostel Management | Add buildings and rooms; edit or delete rooms |
| Students | Search residents, register a student, open a student's profile |
| Room Allocation | Assign unallocated students to rooms, reassign students |
| Maintenance | Review complaints and photos, mark them resolved |
| Visitors | Approve or reject visitor requests; visitor history |
| Payments | Invoice status by student, CSV report |
| Reports & Analytics | Revenue, occupancy and complaint charts, CSV export |
| Announcements | Publish and delete notices for students |
| Notifications | Items that need attention: new complaints, pending visitors, overdue payments |
| Wardens | Create warden accounts (super-admin only) |

Cafeteria, Settings and Profile are UI previews: their changes stay in the browser and are not saved to the backend.

## Sign-in

Users sign in with Asgardeo (OpenID Connect). The dashboard reads the user's role from the token and accepts only `warden` and `super-admin`. Every API call sends the access token to the gateway.

## Tech stack

- React 19 and Vite, JavaScript
- Tailwind CSS 4
- React Router, Zustand for session state, React Hook Form
- Axios for API calls, Recharts for charts
- `@asgardeo/auth-react` for sign-in
- Playwright for browser tests

## Run locally

The app lives in the `frontend/` folder.

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

It talks to the API gateway. Start the backend from [another-home-infra](https://github.com/another-home-dev/anotherhome-infrastructure) with `docker compose up --build`, which also serves this dashboard at `http://localhost:8080`.

| Variable | Purpose | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | API gateway URL | `http://localhost:3001/api/v1` |
| `VITE_APP_BASE_URL` | This app's own URL, used as the Asgardeo sign-in redirect | `http://localhost:5173` |

Both are read at build time. The Asgardeo client ID and tenant are in `src/features/authentication/infrastructure/asgardeoConfig.js`.

## Scripts

Run inside `frontend/`:

| Command | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright smoke tests (`e2e/`) |

## Project structure

Each feature is split into layers, so pages never call the API directly:

```
frontend/src/
├── app/                 router, layout, sidebar, route guards
├── features/
│   └── <feature>/
│       ├── domain/          entities and business rules
│       ├── application/     use cases
│       ├── infrastructure/  API calls (repositories)
│       └── presentation/    pages, components, hooks
├── shared/              reusable UI components and utilities
└── infrastructure/      HTTP client
```

## Deployment

`cloudbuild.yaml` runs on every push to `main`: Playwright smoke tests, Docker build with the live URLs, push to Artifact Registry, then a rolling update of the `frontend` deployment on GKE.
