# Admin Preview Server

Owner: Mason

Lead integration: Codex

## Purpose

Provide a dependency-free admin preview while the Next.js dependency baseline is not installed.

## Run

```text
node scripts/dev-server.mjs
```

Default port: `4301`.

## Preview Routes

- `/login`
- `/dashboard`
- `/users/review`
- `/users`
- `/reports`
- `/wallets`

## Ticket Coverage

- `HD-P0-003`: preview done. A runnable dependency-free admin shell exists, but the Next.js app is not yet compiled.
- `HD-P0-008`: partial preview. Review queue mock data and approve/reject action buttons are visible.
- `HD-P1-203`: preview done. User list and review queue show masked contact values by default.

## Verification

Verified on `2026-05-16T21:12Z`:

- `GET http://localhost:4301/login` returned `200`
- `GET http://localhost:4301/dashboard` returned `200`
- `GET http://localhost:4301/users/review` returned `200`

Verified masked contact preview on `2026-05-17T01:12Z`:

- `GET http://localhost:4303/users` returned `200`
- `GET http://localhost:4303/users/review` returned `200`
- Response content included masked contact values containing `***`

## Remaining

- Install real frontend dependencies.
- Replace preview HTML with Next.js app-router pages.
- Wire review, report, wallet, and audit screens to backend adapters.
- Add confirmation dialogs and admin auth guards.
