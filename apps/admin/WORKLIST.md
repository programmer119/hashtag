# Admin Frontend Worklist

Owner: Mason, Admin Frontend Agent

Scope: `apps/admin` only. Admin frontend routes are standardized on `/users`; do not introduce `/members` routes.

## Active Work

| ID | Priority | Area | Task | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| ADM-FE-001 | P0 | Ownership | Replace generic Admin Agent ownership language in admin frontend docs. | Done | README, implementation plan, and screen inventory now name Mason. |
| ADM-FE-002 | P0 | Routing | Keep user management routes under `/users`, `/users/review`, and `/users/:id`. | Done | Inventory and plan route tables already use `/users`; terminology updated away from member route labels. |
| ADM-FE-003 | P0 | App shell | Scaffold protected admin layout, top session bar, and left navigation. | Preview done | Dependency-free shell exists; Next.js protected shell still pending. |
| ADM-FE-004 | P0 | Auth | Build admin login screen and role-aware route guard. | Preview done | Preview login exists; production guard depends on `POST /admin/auth/login` and `GET /admin/me`. |
| ADM-FE-005 | P0 | Users | Build user review queue and user detail review mode. | Preview done | Preview routes: `/users/review`, `/users/:id`; controlled rejection remains production work. |
| ADM-FE-006 | P0 | Users | Build user list and user detail operations. | Preview done | Preview user detail includes masked contact, review state, safety context, and suspension history. |
| ADM-FE-007 | P0 | Safety | Build report queue and report detail resolution flow. | Preview partial | `/reports` preview shows report evidence and operator actions; detail route remains pending. |
| ADM-FE-008 | P1 | Wallets | Build wallet lookup and ledger detail views. | Preview partial | `/wallets` preview shows adjustment guardrails and ledger rows; user-specific detail route remains pending. |
| ADM-FE-009 | P1 | Audit | Build audit log screen and filters. | Not started | Route: `/settings/audit-log`. |
| ADM-FE-010 | P2 | Admin users | Build internal admin user management. | Not started | Route: `/settings/admin-users`. |

## Coordination Notes

- Do not install dependencies from this lane without explicit approval.
- Do not modify server, mobile, homepage, shared docs, or root files from this lane.
- Backend API naming is `users`, not `members`; frontend labels should say user when naming routes, screens, empty states, and navigation.
