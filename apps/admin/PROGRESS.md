# Admin Frontend Progress

Owner: Mason, Admin Frontend Agent

Last updated: 2026-05-17

## Current Status

Estimated completion: 45%

Mason has taken over admin frontend ownership from the generic Admin Agent docs. The admin frontend planning surface is scoped to `apps/admin`, route naming is aligned around `/users`, and the dependency-free admin preview now covers the core operator surfaces.

## Completed

- Confirmed admin frontend ownership boundary is `apps/admin`.
- Updated admin frontend docs to name Mason as owner.
- Confirmed the planned route map uses `/users`, `/users/review`, and `/users/:id`.
- Updated screen and empty-state language from member-facing labels to user-facing labels where it describes admin frontend routes.
- Added this progress note and a dedicated admin frontend worklist.
- Added dependency-free preview routes for login, dashboard, review queue, user list, user detail, reports, and wallets.
- Added masked PII user detail with review/safety context and suspension history preview.
- Added wallet adjustment preview with grant/refund/deduct guardrails and ledger-style rows.

## In Progress

- Next.js replacement planning while preview surfaces harden.
- Preview runtime verification passed after elevated restart: `/users/u_1003` and `/wallets` both returned 200 on `localhost:4301`.

## Not Started

- Next.js app scaffold.
- Real Next.js protected admin shell and session UI.
- Real login and role guard.
- API-backed report detail, wallet lookup, audit log, and admin user settings screens.

## Risks And Dependencies

- Backend admin APIs must preserve `/admin/users` naming for list/detail/suspend/restore.
- QA matrix still contains legacy "Admin Members" wording outside this lane; Mason will not edit it unless ownership expands beyond `apps/admin`.
- No dependencies have been installed for the admin app.
