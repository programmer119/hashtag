# Backend API

Owner: Backend Agent

Target stack: NestJS / TypeScript.

This folder contains the backend API scaffold for the Hashdate MVP. Dependencies are not installed yet; files are intentionally lightweight and NestJS-shaped so implementation agents can add framework imports once the package baseline is approved.

## Dependency-Free Preview

The preview server uses only Node built-ins:

```text
node scripts/dev-server.mjs
```

Preview routes:

- `GET /health`
- `GET /version`
- `GET /v1/payments/products`
- `GET /v1/content/legal`

Default port: `4100`. Verified preview port in this workspace: `4317`.

## Module Boundaries

- `auth`: phone login, token issuing, session refresh, logout
- `users`: account state, onboarding status, user-level settings
- `profiles`: profile detail, photos, tags, profile unlock state
- `moderation`: document review, profile review, file purge workflow
- `discovery`: swipe deck and profile-list recommendations
- `likes`: outbound likes and premium contact likes
- `matches`: mutual match records and match list
- `chat`: rooms, messages, read state
- `wallet`: diamond balance and append-only ledger
- `payments`: Apple/Google purchase verification and order records
- `reports`: user reports and abuse intake
- `support`: public and authenticated support intake
- `content`: public legal document, notice, FAQ, and homepage content reads
- `admin`: operator auth, review queues, statistics, audit logs

## Local Layout

```text
src/
  app.module.ts
  main.ts
  common/
  config/
  database/migrations/
  modules/<domain>/
    <domain>.controller.ts
    <domain>.module.ts
    <domain>.service.ts
docs/
  DATABASE_MIGRATIONS.md
```

## External Contracts

Shared route contract: `../../docs/architecture/API_CONTRACT.md`
