# Lead Handoff

## Current State

The Hashdate project has been initialized as a coordinated monorepo with product, mobile, backend, admin, homepage, and QA/release tracks.

## Completed

- Root workspace structure created.
- MVP scope defined around profile approval, swipe discovery, likes, matches, chat, wallet, and admin moderation.
- Product policies and acceptance criteria drafted.
- Backend module boundaries and API contract drafted.
- Mobile implementation plan and Flutter-ready folder structure drafted.
- Admin implementation plan and screen inventory drafted.
- QA matrix and store release readiness checklist drafted.
- Homepage ownership assigned to Lena for frontend and Dalton for backend/API support.

## Lead Decisions

- Mobile stack: Flutter / Dart.
- Backend stack: NestJS / TypeScript.
- Admin stack: Next.js / TypeScript.
- Homepage stack: Next.js / TypeScript.
- Database: PostgreSQL.
- Working product name: `해시데이트` / `Hashdate`.
- First principle: cover all visible SkyPeople-style benchmark features, pages, menus, and UX surfaces, plus all client-requested requirements.
- Second principle: when the owner is not actively using Codex, continue work that clearly advances benchmark completeness and client requirement completeness.
- Execution mode: no-question autonomous execution. The lead decides everything except owner-controlled external accounts, production credentials, and final legal identity actions.
- First release excludes full document verification, community matching, and AI matching.
- Diamond wallet uses immutable ledger entries.
- Admin API naming is standardized around `users`, not `members`.

## Immediate Next Work

1. Generate real app skeletons:
   - `apps/mobile`: Flutter project
   - `server/api`: install NestJS dependencies and make placeholder modules compile
   - `apps/admin`: Next.js admin project
   - `apps/homepage`: Next.js public homepage project
2. Implement mock-first vertical slice:
   - mobile signup/profile/discovery screens
   - backend auth/profile/discovery endpoints with in-memory or seeded data
   - admin review queue with mocked adapter
3. Replace mock adapters with database-backed implementation.
4. Add local run instructions and smoke tests.

## Decisions Needed From Owner

- Final app name: `Hashtag`, `HashDate`, or another name.
- MVP login method: phone-first, email-first, or both.
- Initial diamond packages and unlock cost.
- Whether iOS TestFlight or Android internal testing should be prepared first.
