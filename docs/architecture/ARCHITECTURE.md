# Architecture

## Recommended Stack

- Mobile: Flutter / Dart
- Backend: NestJS / TypeScript
- Database: PostgreSQL
- Cache and realtime fanout: Redis
- Admin: Next.js / TypeScript
- Storage: S3-compatible object storage
- Infrastructure target: AWS

## Service Boundaries

```text
Mobile App
  -> Backend API
    -> PostgreSQL
    -> Redis
    -> Object Storage

Admin Web
  -> Backend API
```

## Core Backend Modules

- Auth
- Users
- Profiles
- Moderation
- Discovery
- Likes
- Matches
- Chat
- Wallet
- Payments
- Reports
- Admin

## Security Baseline

- Never store plaintext secrets.
- Store sensitive files outside the database in encrypted object storage.
- Use short-lived signed upload/download URLs.
- Keep diamond transactions append-only.
- Separate user and admin authentication.
- Log admin access to sensitive records.

