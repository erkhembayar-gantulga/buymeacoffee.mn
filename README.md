# BuyMeACoffee.mn

Languages: [English](README.md) | [Mongolian](README_mn.md)

## Goal

- Enable Mongolian creators to monetize their work with small
  one‑off tips ("buy a coffee"), while keeping setup simple and fast.
- Reduce friction for supporters to say thanks, leave a message, and
  optionally attach a small amount.
- Provide a clear path for creators to onboard, share a public page,
  and receive support.

## What it solves

- Creators lack an easy local alternative to global tipping products.
- Fans want a lightweight way to show appreciation without complex
  checkout flows.
- A single shareable page per creator unifies profile, comments, and
  support.

## Key values provided

- Fast onboarding: Google sign‑in, create page in minutes.
- Simple supporter UX: pick an amount, leave a message, submit.
- Local focus: Mongolian UI copy; lightweight design.
- Transparent: recent support and comments visible on creator pages and
  the homepage.

## How it works (high‑level)

1. Auth: Users sign in via Google using NextAuth. On first sign‑in a
   `User` is upserted.
2. Onboarding: Creators create a public page (`Creator`) with username,
   bio, and image.
3. Support: Visitors choose an amount and message; a mock payment
   intent is created and persisted as `Payment`. Comments are posted to
   the creator profile.
4. Discovery: Homepage lists creators with `creatorProfile` and recent
   comments.

## Architecture

- Framework: Next.js 14 App Router, React 18, TypeScript.
- Auth: NextAuth (Google provider) via `app/api/auth/[...nextauth]` and
  `auth.ts` handlers.
- Data: PostgreSQL with Prisma ORM, singleton client in `lib/prisma.ts`.
- API routes: App‑router `route.ts` handlers under `app/api/*`.
- UI: Tailwind CSS + shadcn/ui.
- Repository pattern: Query logic in `app/repositories/*` and
  `lib/repositories/*`. Prisma operations run server‑side only.

## Data model (Prisma)

- User: id, email, name, username, profileImage, timestamps
  - Relations: comments authored, comments received via creator role,
    optional `creatorProfile` (1‑1 Creator)
- Creator: id (uuid), username (unique), bio, profileImage, userId
  (unique), payments[]
- Comment: id, content (<=500), optional amount, authorId -> User,
  creatorId -> User (via `CreatorComments` relation)
- Payment: id (uuid), amount, currency, status, paymentIntentId
  (unique), creatorId -> Creator, optional name/message

## Core flows and components

### Homepage (`app/page.tsx`)
- Lists creators via `UserRepository.getCreators()`
- Shows latest comments via `CommentRepository.getLatest()`

### Creator page (`app/[username]/page.tsx`)
- Fetches creator profile via `/api/creators/[username]`
- Support form creates payment intent via `/api/create-payment-intent`
- Comments section uses `CommentForm` and `CommentsList`

### Onboarding (`app/@creator/page.tsx`, `app/onboarding/creator/page.tsx`)
- Redirects based on whether creator page exists
- `CreatorOnboardingForm` validates with Zod and posts to
  `/api/creators`

### Edit profile (`app/[username]/edit/page.tsx`)
- Updates via `PUT /api/creators/[username]`

## API overview

### Auth
- `GET/POST /api/auth/[...nextauth]`: NextAuth handlers

### Creators
- `POST /api/creators`: create creator for current user
- `GET /api/creators/[username]`: public profile payload with
  `isOwnProfile`
- `PUT /api/creators/[username]`: update username/bio for owner

### Comments
- `POST /api/comments`: create comment (auth required)
- `GET /api/comments/[username]`: list comments for a creator

### Payments (mock)
- `POST /api/create-payment-intent`: create and persist mock payment
  intent as `Payment`, returns `clientSecret`
- `POST /api/confirm-payment`: confirm mock payment by `clientSecret`

## Security and validation

- Auth required for posting comments and creating payment intents.
- Creator creation restricted to current session user; unique username
  enforced.
- On update, ownership is checked; username conflicts rejected.
- Zod validation on onboarding form; server‑side guards on routes.

## Local development

### Prerequisites

- Node.js 20+, Yarn
- Docker (for Postgres via docker‑compose)

### Environment variables

- Required for app (examples shown in `docker-compose.yml`):
  - AUTH_GOOGLE_ID
  - AUTH_GOOGLE_SECRET
  - AUTH_SECRET
  - DATABASE_URL (set automatically in docker compose for the app
    container; set locally in shell for dev)

### Run with Docker

1. yarn install
2. docker compose up --build
3. In another shell (if developing outside container):
   - export DATABASE_URL="postgresql://bmc_user:test1234@localhost:5432/bmc_db?schema=public"
   - yarn prisma migrate dev
   - yarn prisma:seed
4. App runs at http://localhost:3000

### Run locally (without Docker)

1. Start Postgres and set `DATABASE_URL`
2. yarn install
3. yarn prisma migrate dev
4. yarn prisma:seed
5. yarn dev

## Deployment (Vercel)

1. **Environment Variables**:
   - `DATABASE_URL`: Connection string for the app (can be pooled).
   - `POSTGRES_URL_NON_POOLING`: Direct connection string for migrations (required if `DATABASE_URL` is pooled).
   - `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`: NextAuth configuration.

2. **Build Settings**:
   - **Build Command**: `npm run vercel-build` (Runs migrations before build).
   - **Output Directory**: `Next.js default` (.next).

3. **Prisma**:
   - `postinstall` script runs `prisma generate` automatically.
   - Migrations are handled by the custom build command.

## Tech stack

- Next.js 14 (App Router), React 18, TypeScript
- NextAuth (Google), Prisma, PostgreSQL
- Tailwind CSS, shadcn/ui, Radix UI

## Project structure (selected)

- app/
  - api/
    - auth/[...nextauth]/route.ts
    - creators/route.ts, creators/[username]/route.ts
    - comments/route.ts, comments/[username]/route.ts
    - create-payment-intent/route.ts
    - confirm-payment/route.ts
  - @creator/page.tsx
  - onboarding/creator/page.tsx
  - [username]/page.tsx, [username]/edit/page.tsx
  - page.tsx, layout.tsx
- lib/
  - prisma.ts
  - repositories/comment-repository.ts, creator-repository.ts
- app/repositories/userRepository.ts
- components/
  - comment-form.tsx, comments-list.tsx, creator-onboarding-form.tsx,
    header.tsx
- prisma/
  - schema.prisma, seed.ts

## Development notes

- Prisma client is a singleton (see `lib/prisma.ts`).
- All Prisma operations are server‑side (API routes or server components).
- Repository pattern encapsulates data access for clarity.
- Payment flow is mocked; integrate Stripe by replacing the
  `/api/create-payment-intent` and `/api/confirm-payment` logic and
  wiring Stripe.js on the client.

## Roadmap (from git history and current code)

- Real Stripe integration (server + client)
- Dashboard for creators (analytics, payout settings)
- Reactions on comments, richer supporter feed
- Localization improvements and accessibility polish

## License

Sustainable Use License