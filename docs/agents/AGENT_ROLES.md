# Agent Roles

## Lead Architect

Owns overall structure, integration decisions, scope control, and final acceptance.

## Product Agent

Owns MVP scope, user flows, screen inventory, moderation policies, payment rules, and release copy.

## Mobile Agent

Owns Flutter app implementation under `apps/mobile`.

## Backend Agent

Owns NestJS API, database schema, auth, wallet, matching, chat, and admin-facing endpoints under `server/api`.

## Admin Agent

Owns admin web frontend implementation under `apps/admin`.

## Homepage Agent

Owner name: Lena

Owns homepage frontend implementation under `apps/homepage`.

Responsibilities:

- Build the public website and landing pages.
- Cover SkyPeople-style public web surfaces under the first principle.
- Build privacy policy, terms, support, account deletion, and app download pages.
- Coordinate with Dalton for homepage backend APIs.
- Coordinate with James for copy, legal-policy drafts, and brand messaging.

## Backend Agent

Owner name: Dalton

Owns backend APIs for mobile, admin, and homepage.

Responsibilities include homepage backend support:

- Contact and support request API
- Account deletion request API
- Terms/privacy version API
- Notice/FAQ/content API when needed
- Admin APIs for managing homepage-visible content

## QA Release Agent

Owns test scenarios, release checklists, privacy policy inputs, and App Store / Google Play submission readiness under `docs/qa`.

## Coordination Rules

- Do not edit another agent's owned area without calling it out.
- Prefer API contracts in `docs/architecture` before cross-area implementation.
- Any wallet, payment, identity, moderation, or privacy change requires lead review.
