# Admin Screen Inventory

Owner: Mason, Admin Frontend Agent

## Navigation Model

Primary sections:

- Dashboard
- User Review
- Users
- Reports
- Wallets
- Audit Log
- Admin Settings

## Screens

| Screen | Route | MVP Priority | Purpose | Primary Actions | Key States |
| --- | --- | --- | --- | --- | --- |
| Login | `/login` | P0 | Authenticate admin operators. | Sign in | Empty, invalid credentials, locked account, loading |
| Dashboard | `/dashboard` | P0 | Show operational health and queue pressure. | Change date range, open queue | Loading, no data, partial metric failure |
| Review Queue | `/users/review` | P0 | List profiles waiting for approval. | Filter, sort, open profile | Empty queue, overdue queue, API error |
| Review Detail | `/users/:id?mode=review` | P0 | Decide whether a profile can enter discovery. | Approve, reject, request resubmission | Pending, already decided, missing media |
| User List | `/users` | P0 | Search and inspect all users. | Search, filter status, open user | No results, suspended-only filter |
| User Detail | `/users/:id` | P0 | View profile, account, match, chat, wallet summary. | Suspend, reinstate, open wallet, open reports | Active, pending, rejected, suspended |
| Report Queue | `/reports` | P0 | Triage abuse reports. | Filter reason/status, open report | Empty queue, high-priority reports |
| Report Detail | `/reports/:id` | P0 | Review evidence and resolve a report. | Suspend user, dismiss report, add note | Open, resolved, linked content unavailable |
| Wallet Lookup | `/wallets` | P1 | Find user wallet and ledger. | Search by user ID/email/phone | No wallet, masked PII |
| Wallet Detail | `/wallets/:userId` | P1 | Reconcile balance and profile unlock history. | Manual adjustment, export ledger | No ledger, adjustment denied |
| Audit Log | `/settings/audit-log` | P1 | Inspect admin action history. | Filter by actor/action/target | Empty, retention notice |
| Admin Users | `/settings/admin-users` | P2 | Manage internal operator accounts. | Invite, disable, change role | Insufficient permission |

## Dashboard Widgets

- Pending profile reviews
- Reviews approved today
- Reviews rejected today
- Open reports
- Suspended users today
- New signups
- Active matches
- Chat starts
- Diamond spend
- Payment revenue placeholder

## Table Standards

- Use server-side pagination for all operational tables.
- Show stable row identifiers for support handoff.
- Use clear status badges: pending, approved, rejected, suspended, open, resolved.
- Preserve filters in the URL query string.
- Provide CSV export only for non-sensitive operational data.

## Sensitive Data Rules

- Phone and email are masked by default.
- Contact attachments are hidden unless the user has elevated permission.
- Identity documents are not visible in MVP admin.
- Admin notes are never exposed to mobile app users.
- Report evidence should show only the minimum context needed to make a safety decision.

## Confirmation Dialogs

Required confirmation actions:

- Approve profile
- Reject profile
- Suspend user
- Reinstate user
- Resolve report
- Manual wallet adjustment
- Disable admin user

Each confirmation must show the target user, action consequence, required reason if applicable, and final confirmation button.

## Empty State Copy

Keep empty states short and operational:

- Review queue: `No profiles are waiting for review.`
- Reports: `No open reports.`
- Users search: `No users match these filters.`
- Wallet lookup: `Search for a user to view wallet activity.`
- Audit log: `No admin actions match these filters.`
