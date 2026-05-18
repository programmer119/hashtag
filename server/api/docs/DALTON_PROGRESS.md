# Dalton Self-Progress Note

Date: 2026-05-17

## Completed This Session

- Extended the shared API contract for support requests, account deletion requests, legal document version reads, notice/FAQ reads, homepage content reads, and admin content management.
- Added backend module planning stubs for `support` and `content`.
- Expanded `users` planning routes for account deletion requests.
- Expanded `admin` planning routes and service placeholders for support queues, deletion queues, legal documents, notices, FAQs, and homepage content publishing.
- Added data model draft entries and constraints for the new homepage/admin support surface.

## Current Status

Estimated backend API planning completion: 56%.

The route inventory is now broad enough for homepage and admin frontend planning. The dependency-free preview implementation now covers the mobile MVP contract well enough for typed mobile API hydration tests and manual HTTP smoke checks.

## 2026-05-18 Preview Contract Additions

- Added `/v1/wallet/ledger` with ledger entries and unlock spend recording.
- Added `POST /v1/chat/rooms/:roomId/messages` and persistent preview chat message state.
- Added `GET /v1/admin/support/requests`.
- Added `GET /v1/admin/deletion-requests`.
- Smoke-checked on `localhost:4331`:
  - `GET /health` returned `ok`.
  - `GET /v1/wallet/ledger` returned 1 entry.
  - `POST /v1/chat/rooms/room_m_3001/messages` persisted `Backend preview send smoke`.
  - `GET /v1/chat/rooms/room_m_3001/messages` returned 3 messages after send.
  - `GET /v1/admin/support/requests` returned the admin support queue shape.

## Next Dalton Step

Convert preview routes into NestJS-style controller/service files and DTO-level payload specs while preserving the current dependency-free preview behavior.
