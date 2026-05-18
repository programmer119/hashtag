# Mobile Preview Server

Owner: Poincare

Lead integration: Codex

## Purpose

Provide a dependency-free browser preview of the mobile MVP flow while the Flutter toolchain is not available.

## Run

```text
node scripts/dev-server.mjs
```

Default port: `4302`.

## Preview Routes

- `/auth`
- `/profile`
- `/review`
- `/discover`
- `/unlock`
- `/matches`
- `/chat`
- `/wallet`
- `/safety`

## Ticket Coverage

- `HD-P0-004`: preview done. A runnable dependency-free mobile flow exists, but the real Flutter project is not generated yet.
- `HD-P0-006` through `HD-P0-011`: represented as clickable preview surfaces with local browser mock behavior, not real Flutter behavior yet.

## Verification

Verified on `2026-05-16T21:42Z`:

- `GET http://localhost:4302/discover` returned `200`
- `GET http://localhost:4302/auth` returned `200`
- `GET http://localhost:4302/wallet` returned `200`

Verified on `2026-05-17T04:12Z`:

- `GET http://localhost:4322/discover` returned `200` and included action controls
- `GET http://localhost:4322/unlock` returned `200` and included action controls
- `GET http://localhost:4322/chat` returned `200` and included action controls
- `GET http://localhost:4322/profile` returned `200` and included action controls
- `GET http://localhost:4322/safety` returned `200` and included action controls

## Remaining

- Generate real Flutter project.
- Convert preview surfaces into Flutter widgets.
- Add mock repositories and route state.
- Add device/simulator verification.
