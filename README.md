# Ecommerce Monorepo (Medusa v2 + Next.js Storefront)

Welcome to the team repository! This is a monorepo built with **TurboRepo**, containing:
- **`apps/backend`**: Medusa v2 E-Commerce Headless Backend & Admin Portal.
- **`apps/storefront`**: Next.js (App Router) Storefront UI.
- **`packages/types`**: Shared TypeScript types across apps.

---

## 🛠️ Prerequisites

Before setting up the project, make sure you have the following installed on your machine:

1. **Node.js**: `v18.x` or `v20.x` (Recommended)
2. **Yarn**: `v4.5.0` (Enable with `corepack enable` if needed)
3. **PostgreSQL**: Running locally or accessible via URL (Port `5432` / default or custom port)
4. **Redis**: Running locally (Port `6379`) or a hosted Redis instance (required for Medusa event queues & cache)

---

## 🚀 Quick Start (One-Command Setup)

If you have PostgreSQL and Redis running, you can run the automated setup command:

```bash
# 1. Clone the repository
git clone <repository-url>
cd medusa-js

# 2. Install dependencies
yarn install

# 3. Automated environment setup, DB migration, seeding & admin user creation
yarn setup

# 4. Start local development server (Backend + Storefront)
yarn dev
```

---

## ⚙️ Detailed Step-by-Step Setup

If you prefer to run the setup manually or step-by-step:

### Step 1: Environment Variables Setup

Generate default `.env` files for both `apps/backend` and `apps/storefront` from templates:

```bash
yarn generate-env
```

#### `apps/backend/.env`
Ensure your PostgreSQL connection URL matches your local/hosted PostgreSQL database credentials:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/medusa-db
DB_NAME=medusa-db
REDIS_URL=redis://localhost:6379
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:7000,http://localhost:8000,http://localhost:7001
AUTH_CORS=http://localhost:7000,http://localhost:7001,https://docs.medusajs.com
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
```

#### `apps/storefront/.env`
Ensure the backend URL and publishable API keys are set:
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_6f7f134dccad7fdfe1f28e366f61968467fe0982f6f41ed93016e4ca366ccb52
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=us
REVALIDATE_SECRET=supersecret
```

### Step 2: Build Shared Packages
```bash
yarn build-packages
```

### Step 3: Run Database Migrations
```bash
yarn setup-db
```

### Step 4: Seed Demo Data
```bash
yarn seed
```

### Step 5: Create Admin User
Creates default admin user (`admin@test.com` / `supersecret`):
```bash
yarn setup-user
```

---

## 💻 Running the Application

Start both backend and storefront concurrently:

```bash
yarn dev
```

### Application URLs & Ports:

| Service | Local URL | Description |
| :--- | :--- | :--- |
| **Storefront** | `http://localhost:8000` | Next.js Storefront UI |
| **Backend API** | `http://localhost:9000` | Medusa v2 REST API |
| **Admin Dashboard** | `http://localhost:9000/app` | Medusa Admin Portal |

#### Admin Login Credentials:
- **Email**: `admin@test.com`
- **Password**: `supersecret`

---

## 🛠 Useful Scripts

- `yarn dev`: Starts all workspace applications in development mode.
- `yarn setup`: Full zero-to-hero project initialization.
- `yarn build-packages`: Builds workspace shared packages (`packages/types`).
- `yarn setup-db`: Runs Medusa DB migrations.
- `yarn seed`: Seeds the database with products, categories, regions, and sales channels.
- `yarn setup-user`: Creates an admin user.
- `yarn lint`: Runs lint checks across all applications.

---

## ❓ Troubleshooting & FAQs

- **Database Connection Failed**: Ensure PostgreSQL service is active and the `DATABASE_URL` credentials in `apps/backend/.env` are correct.
- **Redis Connection Error**: Ensure Redis server is running (`redis-cli ping` returns `PONG`).
- **Publishable Key Issue**: If storefront cannot fetch products, ensure `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` in `apps/storefront/.env` matches a valid sales channel key from the backend.
