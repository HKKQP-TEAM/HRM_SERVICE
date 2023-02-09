# HRM Service

## Table of Contents

- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)

## Comfortable development

```bash
  git clone --depth 1 https://github.com/HKKQP-TEAM/HRM_SERVICE my-app
  cd my-app
  cp env-example .env
```

1. Add Database URL

   ```bash
   DATABASE_URL=YOUR_MONGODB_URL
   ```

1. Generate secret key

   ```bash
   node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
   ```

1. Go to `/.env` and change value in `AUTH_JWT_SECRET`

   ```text
   AUTH_JWT_SECRET=HERE_SECRET_KEY_FROM_STEP_1
   ```

1. Install dependency

   ```bash
   yarn
   ```

1. Run generations

   ```bash
   yarn prisma:generate
   ```

1. Run push database

   ```bash
   yarn prisma:push
   ```

1. Run seeds (optional)

   ```bash
   yarn prisma:seed
   ```

1. Run app in dev mode

   ```bash
   yarn dev
   ```

## Links

- Swagger (API docs): http://localhost:8000/v1/docs

## Automatic update of dependencies

If you want to automatically update dependencies, you can connect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Run generate

```bash
yarn prisma:generate
```

Run push collections

```bash
yarn prisma:push
```

Run seed

```bash
yarn prisma:seed
```
