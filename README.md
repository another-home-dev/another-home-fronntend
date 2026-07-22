# Another Home Frontend

A modern admin-only hostel management frontend for the Smart Hostel project. The app is built with Next.js and focuses on the progressive web console used by hostel administrators.

## Overview

Another Home helps hostel teams manage daily operations from one interface:

- Admin dashboard with hostel occupancy, payments, maintenance, notices, residents, and room management views
- Progressive web app metadata for the admin console
- Security dashboard for visitor and hostel access workflows
- Authentication screens for admin sign in and password recovery
- Shared UI components and layouts for consistent pages across the application

Student self-service is assigned to the mobile app. The web frontend keeps only the admin and operations experience.

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- React Icons
- React Hook Form
- Zustand
- ESLint

## Project Structure

```text
another-home-fronntend/
|-- README.md
`-- frontend/
    |-- src/
    |   |-- app/                       # Next.js app router routes
    |   |-- assets/                    # Images, icons, and logos
    |   |-- features/                  # Feature-based modules
    |   |   |-- authentication/        # Clean-architecture auth module
    |   |   |-- dashboard/             # Admin dashboard pages
    |   |   |-- room-management/       # Room domain, repositories, and pages
    |   |   `-- security/              # Security staff pages
    |   |-- shared/                    # Reusable components and layouts
    |   |-- store/                     # App state stores
    |   `-- styles/                    # Global theme styles
    |-- package.json
    `-- next.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- npm

### Installation

```bash
cd frontend
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

The root route redirects to `/sign-in`.

## Available Scripts

Run these commands inside the `frontend` directory:

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build locally.

```bash
npm run lint
```

Checks the codebase with ESLint.

## Demo Login Accounts

The authentication module currently uses seeded demo users from the local repository implementation.

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@anotherhome.edu` | `admin123` |
Only admin web access is supported in this frontend.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/sign-in` | Login page |
| `/forgot-password` | Password recovery screen |
| `/dashboard` | Admin dashboard home |
| `/dashboard/residents` | Resident management |
| `/dashboard/rooms` | Room management |
| `/dashboard/billing` | Billing overview |
| `/dashboard/maintenance` | Maintenance overview |
| `/dashboard/notifications` | Notifications and notices |
| `/security/dashboard` | Security dashboard |

## Architecture Notes

The project is organized by feature, with shared components and layouts separated from domain-specific modules.

- `src/app` defines routes using the Next.js app router.
- `src/features/dashboard` contains admin dashboard pages and operational views.
- `src/features/authentication` and `src/features/room-management` use domain, application, infrastructure, and presentation layers.
- `src/shared` contains reusable UI building blocks such as dashboard layouts, cards, brand elements, and form components.

## Current Status

This frontend is ready for local admin UI development and demonstration. Authentication and room operations are currently simulated in the frontend, so the next major step is connecting these repositories to real backend API endpoints.

## Suggested Next Steps

- Connect authentication to the backend API
- Replace seeded room data with live room-management endpoints
- Add protected-route behavior based on real sessions or tokens
- Add form validation and loading/error states where workflows become connected to real services
- Add automated tests for critical user flows
