# Backend Preview Server

Owner: Dalton

Lead integration: Codex

## Purpose

Provide a dependency-free backend preview while the NestJS dependency baseline is not installed.

## Run

```text
node scripts/dev-server.mjs
```

If the default port is occupied:

```text
PORT=4317 node scripts/dev-server.mjs
```

## Routes

- `GET /health`
- `GET /version`
- `POST /v1/auth/dev-login`
- `GET /v1/users/me`
- `GET /v1/profiles/me`
- `PUT /v1/profiles/me`
- `GET /v1/discovery/swipe-deck`
- `POST /v1/discovery/swipes`
- `GET /v1/wallet`
- `POST /v1/profiles/:profileId/unlocks`
- `GET /v1/matches`
- `GET /v1/chat/rooms`
- `GET /v1/chat/rooms/:roomId/messages`
- `GET /v1/payments/products`
- `GET /v1/content/legal`

## Ticket Coverage

- `HD-P0-002`: preview done. A runnable dependency-free backend preview exists, but the NestJS app is not yet compiled.
- `HD-P0-005`: done for preview mode. Health and version endpoints return JSON.
- `HD-P0-006`: preview done. Dev login returns tokens, user, and next route.
- `HD-P0-009`: preview partial. Swipe deck and swipe recording endpoints exist.
- `HD-P0-010`: preview partial. Match list and chat room/message endpoints exist.
- `HD-P0-011`: preview partial. Wallet and profile unlock endpoints exist with no-double-charge behavior.

## Verification

Verified on `2026-05-16T20:42Z` with preview port `4317`:

- `GET http://localhost:4317/health` returned `200`
- `GET http://localhost:4317/version` returned `200`

Verified expanded preview routes on `2026-05-16T22:12Z` with preview port `4318`:

- `POST http://localhost:4318/v1/auth/dev-login` returned `200`
- `GET http://localhost:4318/v1/users/me` returned `200`
- `GET http://localhost:4318/v1/discovery/swipe-deck` returned `200`
- `GET http://localhost:4318/v1/wallet` returned `200`
- `GET http://localhost:4318/v1/matches` returned `200`

Verified support/deletion preview routes on `2026-05-17T00:42Z` with preview port `4319`:

- `POST http://localhost:4319/v1/support/requests` returned `201`
- `POST http://localhost:4319/v1/users/me/deletion-requests` returned `201`

Ports `4100` and `4101` were already occupied by another local process during verification.

## Remaining

- Install real backend dependencies.
- Replace preview routing with NestJS controllers.
- Add tests for health/version routes.
- Add database-backed services.
