# Admin Web Implementation Plan

Owner: Mason, Admin Frontend Agent

Target stack: Next.js, TypeScript, React, server API integration.

## MVP Goal

The admin web app must let operators safely review users, handle abuse, and confirm business-critical wallet and matching activity before the mobile app is exposed to real users.

The MVP admin is an internal operations console, not a marketing dashboard. It should favor dense tables, clear status labels, auditability, and low-risk actions with confirmation steps.

## Implementation Phases

### Phase 1: Admin Shell

- Create protected admin layout with left navigation and top session bar.
- Add admin login screen using backend-issued access token.
- Add role-aware route guard for `admin`, `reviewer`, and `support` roles.
- Add shared UI primitives for tables, filters, status badges, empty states, confirmation dialogs, and detail drawers.
- Add API client wrapper with request IDs and error normalization.

Acceptance criteria:

- Unauthenticated users cannot access any admin route.
- Expired sessions redirect to login.
- Every mutating action shows success or failure feedback.

### Phase 2: User Review

- Build profile review queue.
- Show submitted profile fields, photos, tags, intro, signup metadata, and risk flags.
- Support approve, reject with controlled reason, and request resubmission.
- Record reviewer ID, decision, reason, and timestamp.
- Prevent approved or rejected profiles from being decided twice.

Acceptance criteria:

- A pending profile can be approved and enters discovery eligibility.
- A rejected profile receives a structured reason for the mobile app to display.
- Duplicate decisions return a safe error and do not corrupt status.

### Phase 3: Safety Operations

- Build report queue for profile, chat, and user reports.
- Add report detail view with reporter, reported user, reason, evidence snapshot, and linked chat/profile context.
- Support suspend, reinstate, dismiss report, and add internal note.
- Add blocklist visibility for suspended users.

Acceptance criteria:

- Suspended users cannot appear in discovery or use chat.
- Report actions are auditable.
- Admin notes are internal only.

### Phase 4: Wallet and Revenue Oversight

- Build diamond wallet lookup by user.
- Show immutable ledger entries for charge, spend, refund, adjustment, and unlock events.
- Add read-only purchase and spend summary.
- Add manual adjustment only behind elevated admin role and confirmation.

Acceptance criteria:

- Repeated profile unlocks can be checked against ledger history.
- Operators can reconcile a user's balance from ledger entries.
- Manual adjustments require reason text and are audit logged.

### Phase 5: Metrics Dashboard

- Add MVP dashboard with daily signup count, pending reviews, approvals, rejections, reports, active matches, chat starts, diamond spend, and payment revenue placeholder.
- Add date range filter and CSV export for operational tables.
- Keep metrics read-only and sourced from backend aggregates.

Acceptance criteria:

- Operators can see whether review and abuse queues are backing up.
- Metrics do not expose raw sensitive document data.

## Route Plan

```text
/login
/dashboard
/users
/users/review
/users/:id
/reports
/reports/:id
/wallets
/wallets/:userId
/settings/admin-users
/settings/audit-log
```

## API Dependencies

- `POST /admin/auth/login`
- `GET /admin/me`
- `GET /admin/stats/overview`
- `GET /admin/users`
- `GET /admin/moderation/reviews`
- `GET /admin/users/:userId`
- `POST /admin/moderation/reviews/:reviewId/approve`
- `POST /admin/moderation/reviews/:reviewId/reject`
- `POST /admin/users/:userId/suspend`
- `POST /admin/users/:userId/restore`
- `GET /admin/reports`
- `POST /admin/reports/:reportId/resolve`
- `GET /admin/wallets/:userId`
- `POST /admin/wallets/:userId/adjust`
- `GET /admin/audit-log`

## Security Requirements

- Use short-lived access tokens and refresh strategy decided by the server agent.
- Never render raw identity document images in MVP because document verification automation is out of scope.
- Mask phone, email, and contact fields by default; reveal only with elevated permission and audit log.
- Require confirmation modal for approve, reject, suspend, reinstate, and wallet adjustment.
- Log every mutating admin action with actor, target, action, reason, request ID, and timestamp.

## Definition of Done

- All MVP screens exist with loading, empty, error, and success states.
- All tables support pagination and basic filtering.
- Admin actions are wired to backend APIs or clearly mocked behind a single adapter.
- QA test cases in `docs/qa/QA_TEST_MATRIX.md` pass for admin frontend-owned flows.
- Store release readiness items related to admin, moderation, privacy, and review credentials are complete.
