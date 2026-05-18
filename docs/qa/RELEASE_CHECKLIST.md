# Release Checklist

Owner: Carver / QA Release Agent

Mode: nonstop autonomous execution. Carver keeps validating documented, runnable, or inspectable artifacts without waiting for routine approvals. Only owner-controlled external assets are allowed to block progress.

## Artifact-Based Progress Verification Rules

Progress can move only when there is an artifact that another agent can inspect or run.

| Claim Type | Required Artifact | Verification Rule | Progress Credit |
| --- | --- | --- | --- |
| Documentation complete | Committed or saved doc path with checklist, matrix, or policy text | File exists, scope is clear, owner and next action are named | Counts for planning/readiness only |
| UI surface complete | Screen/page file plus route or app shell reference | Page can be opened or has a screenshot attached to QA notes | Partial until smoke tested |
| API behavior complete | Controller/service code plus API contract or README entry | Endpoint shape is documented and can be called locally or in staging | Partial until integration tested |
| Data behavior complete | Migration/schema/seed artifact plus affected API path | QA can trace expected state changes and rollback risk | Partial until data integrity test passes |
| Release-ready flow | Test evidence, screenshot/log, build number, and environment | P0 smoke path passes on the target environment | Full credit for that flow |
| External setup complete | Store console, provider dashboard, legal URL, or owner confirmation captured in release notes | QA records provider, owner, date, and remaining constraints | Credit only after external owner confirms |

No progress credit is given for intent, verbal status, TODO-only files, unrun commands, placeholder screens without route reachability, or external assets that are not controlled by the repo team.

## Nonstop QA Execution Loop

1. Inspect changed artifacts by owner area.
2. Map each artifact to QA matrix rows and release checklist items.
3. Run the smallest useful smoke test available for homepage, admin, mobile, and backend.
4. Record blockers as internal defects or external-owner blockers.
5. Update progress only for verified artifacts.
6. Continue to the next unblocked artifact without asking questions.

## Before Internal Testing

- App launches on Android and iOS simulator/device.
- Signup, profile creation, swipe, like, match, chat, and wallet flows work.
- Admin can approve, reject, suspend, and view reports.
- Seed data exists for review.
- Crash logging and basic analytics are configured or explicitly deferred.

## Before Store Submission

- App name and bundle identifiers finalized.
- App icon and screenshots prepared.
- Privacy policy URL prepared.
- Terms of service URL prepared.
- Data safety forms drafted.
- Apple Sign in requirement reviewed if third-party/social login is added.
- In-app purchase products configured if paid diamonds are enabled.
- Review account credentials prepared.

## Cross-Area Smoke Test Checklist

Run this checklist before every release candidate label and after any cross-area integration change.

### Homepage

- [ ] `/` loads without runtime error and exposes app value proposition, safety, download, support, terms, privacy, and account deletion paths.
- [ ] `/privacy`, `/terms`, `/safety`, `/support`, `/account-deletion`, and `/download` render reachable content.
- [ ] Support and account deletion pages identify the expected backend/API handoff or documented fallback.
- [ ] Store badges, legal copy, and contact details are either production-ready or listed in the external-owner blocker register.
- [ ] Mobile viewport renders without horizontal overflow or inaccessible primary links.

### Admin

- [ ] Admin shell/login route is reachable in the target environment or mock app.
- [ ] Pending profile review queue is visible with seeded or mock users.
- [ ] Approve, reject, suspend, reinstate, report resolution, wallet lookup, and audit log paths are present.
- [ ] PII is masked in list/detail views unless the role explicitly requires full access.
- [ ] Mutating admin actions require reason capture where policy requires it.

### Mobile

- [ ] Fresh install or clean app state reaches auth/onboarding.
- [ ] User can complete profile setup and is held pending admin approval.
- [ ] Approved user reaches discovery, can like/pass, can create or view a match, and can open chat.
- [ ] Wallet balance displays, premium unlock deducts once, and insufficient balance is blocked.
- [ ] Report/block/safety path is reachable from profile or chat context.
- [ ] Android and iOS builds identify version/build number and target environment.

### Backend

- [ ] API process starts and health/readiness endpoint or documented equivalent responds.
- [ ] Auth/profile/discovery/matches/chat/wallet/reports/admin modules expose expected routes from API contract.
- [ ] Mobile role cannot call admin endpoints; reviewer/admin roles are permission-limited.
- [ ] Wallet ledger preserves immutable entries and blocks duplicate unlock deduction.
- [ ] Admin moderation action creates audit log with actor, target, action, reason, and timestamp.
- [ ] Migration plan is documented and rollback risk is known for the release candidate.
