# Concierge Chatbot Monorepo

An Nx-powered monorepo that hosts a full-stack concierge chatbot platform:
- Admin (Next.js) app for managing content/configuration
- Widget (Vite + React) embeddable client
- Backend (NestJS) API/server
- Local infra via Docker Compose (Postgres with pgvector, Redis)


## Tech stack
- Monorepo/build: Nx
- Admin: Next.js (React, App Router)
- Widget: Vite + React
- Backend: NestJS (compiled with webpack)
- Database: Postgres (ankane/pgvector)
- Cache/queue: Redis
- Testing: Jest (Nx-managed)
- Linting/formatting: ESLint, Prettier


## Repository structure
- apps/
  - admin/ — Next.js admin UI (Next config present under apps/admin)
  - backend/ — NestJS API
  - src/, vite.config.ts, index.html — Vite/React widget (project name: widget)
- .env.example — sample environment variables
- docker-compose.yml — local Postgres + Redis
- eslint.config.mjs — workspace ESLint config (flat config)
- jest.config.ts — workspace Jest config (Nx projects)


## Prerequisites
- Node.js 18+ (recommended)
- npm, pnpm, or yarn (choose one; examples below use npm)
- Docker Desktop (for Postgres + Redis)


## Environment configuration
1) Copy the example env and adjust values as needed:
   cp .env.example .env

   Values provided:
   - DATABASE_URL: postgresql://concierge:concierge@localhost:5432/concierge?schema=public
   - REDIS_URL: redis://localhost:6379
   - JWT_SECRET: replace with a strong secret
   - JWT_EXPIRES_IN: 1h
   - NODE_ENV: development
   - PORT: 3000

2) Start local infra (Postgres + Redis):
   docker compose up -d

   - Postgres exposed on 5432 (database: concierge / user: concierge / pass: concierge)
   - Redis exposed on 6379


## Install dependencies
- Using npm:
  npm install

- Using pnpm:
  pnpm install

- Using yarn:
  yarn install


## Running the apps (development)
You can use Nx for the backend (targets are defined), and direct framework CLIs for the frontend apps (targets not defined yet). If you prefer Nx targets for admin/widget, see the “Add Nx targets (optional)” section.

- Backend (NestJS)
  - Development (watches by default via Nx serve pipeline):
    npx nx serve backend

  - Explicit configuration selection:
    npx nx serve backend --configuration=development
    npx nx serve backend --configuration=production

- Admin (Next.js)
  From the repo root:
    npx next dev -p 3001 --turbo --dir apps/admin
  Or change directory and run:
    cd apps/admin && npx next dev -p 3001

- Widget (Vite + React)
  From the repo root:
    npx vite --config apps/vite.config.ts
  Or change directory and run:
    cd apps && npx vite

Notes
- If ports are occupied, adjust with -p for Next.js or --port for Vite.
- Ensure .env is loaded by your process manager or framework as needed.


## Build
- Backend (NestJS)
  npx nx build backend
  # configurations available: development (default via serve), production

- Admin (Next.js)
  cd apps/admin && npx next build && npx next export
  # or just: npx next build --dir apps/admin

- Widget (Vite + React)
  # build into apps/dist by Vite config defaults (adjust as needed)
  npx vite build --config apps/vite.config.ts
  # or: cd apps && npx vite build


## Test
- Run all Jest projects:
  npx nx test

- Backend only:
  npx nx test backend

Note: The backend’s test target is configured with passWithNoTests: true, so it won’t fail if no tests are present yet.


## Lint and format
- Lint the whole workspace:
  npx eslint .

- Auto-fix:
  npx eslint . --fix

- Format with Prettier (if configured via scripts):
  npx prettier . --write


## Docker services (local infra)
- Up:
  docker compose up -d

- Logs:
  docker compose logs -f

- Down (preserve volumes):
  docker compose down

- Down and remove volumes:
  docker compose down -v

Volumes
- postgres_data -> /var/lib/postgresql/data (persisted)
- redis_data -> /data (persisted)


## Add Nx targets (optional)
To standardize commands via Nx, you can add targets in the respective project.json files.

- apps/admin/project.json (example)
  {
    "targets": {
      "serve": {
        "executor": "nx:run-commands",
        "options": {
          "command": "next dev -p 3001",
          "cwd": "apps/admin"
        }
      },
      "build": {
        "executor": "nx:run-commands",
        "options": {
          "command": "next build",
          "cwd": "apps/admin"
        }
      }
    }
  }

- apps/project.json (widget) (example)
  {
    "targets": {
      "serve": {
        "executor": "nx:run-commands",
        "options": {
          "command": "vite",
          "cwd": "apps"
        }
      },
      "build": {
        "executor": "nx:run-commands",
        "options": {
          "command": "vite build",
          "cwd": "apps"
        }
      }
    }
  }

Then you can run:
- npx nx serve admin
- npx nx build admin
- npx nx serve widget
- npx nx build widget


## Troubleshooting
- Ensure Docker is running; check health:
  docker compose ps

- Database connection failures:
  - Verify DATABASE_URL in .env
  - Confirm Postgres is healthy: docker compose logs postgres

- Redis connection issues:
  - Check: docker compose logs redis

- Port conflicts:
  - Change admin port: npx next dev -p 3002 --dir apps/admin
  - Change Vite port: npx vite --config apps/vite.config.ts --port 5174

- Nx cache/graph issues:
  - Clear cache: npx nx reset


## Notes
- Workspace ESLint uses @nx/eslint-plugin flat configs with module boundary enforcement.
- Jest projects are auto-discovered via getJestProjectsAsync in jest.config.ts.
- The backend uses a webpack build; serve depends on a build step configured via Nx.


## License
Add your license information here.

