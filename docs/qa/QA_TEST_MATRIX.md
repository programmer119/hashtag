# QA Test Matrix

Owner: Admin + QA Release Agent

Scope: Hashtag MVP mobile, admin, API, moderation, wallet, and store release flows.

## Progress Verification Standard

Every passed row must cite at least one artifact: test log, screenshot, route URL, build number, API response, database/audit record, or reviewed document path. A row without evidence remains `Not verified`, even when implementation appears present.

| Result | Meaning |
| --- | --- |
| Pass | Expected result verified with artifact evidence |
| Fail | Expected result not met, defect filed or documented |
| Blocked Internal | Repo-owned implementation, data, environment, or dependency missing |
| Blocked External | Apple, Google, payment, identity, legal, or business-owner dependency missing |
| Not Run | Artifact exists but QA has not executed or inspected it yet |

## Test Environments

| Environment | Purpose | Data Policy |
| --- | --- | --- |
| Local | Developer smoke testing | Seed users only |
| Staging | Integrated QA and release candidate testing | Synthetic users, no real identity documents |
| Store sandbox | In-app purchase and review account testing | Test products and test accounts only |
| Production | Post-release smoke testing | Real users, least-privilege access |

## Severity Levels

| Severity | Definition | Release Decision |
| --- | --- | --- |
| S0 | Data loss, privacy leak, payment corruption, account takeover | Block release |
| S1 | Core signup, approval, match, chat, or wallet flow broken | Block release |
| S2 | Important operational flow degraded with workaround | Release manager decision |
| S3 | Cosmetic or low-risk content issue | Can ship with tracked fix |

## Functional Matrix

| Area | Test Case | Priority | Expected Result |
| --- | --- | --- | --- |
| Auth | New user can create account with MVP email or phone placeholder flow | P0 | Account is created and routed to profile setup |
| Auth | Existing user can sign in | P0 | User lands on correct app state |
| Auth | Suspended user attempts sign in | P0 | User is blocked from app actions |
| Profile | User can add photos, attributes, lifestyle tags, and intro | P0 | Profile is saved as pending review |
| Profile | User cannot enter discovery before admin approval | P0 | Discovery remains locked |
| Admin Review | Admin approves pending profile | P0 | User becomes discovery eligible |
| Admin Review | Admin rejects pending profile with controlled reason | P0 | User sees rejection state and reason |
| Admin Review | Duplicate approval request is submitted | P0 | Second request is rejected safely |
| Discovery | Approved user sees swipe cards | P0 | Eligible profiles appear |
| Discovery | User can like and pass | P0 | Actions persist and next card loads |
| Match | Mutual likes create a match | P0 | Both users see match state |
| Chat | Matched users can exchange messages | P0 | Messages appear in order for both users |
| Chat | Unmatched users cannot start chat | P0 | Chat is blocked |
| Wallet | User sees diamond balance | P0 | Balance matches ledger total |
| Wallet | Premium profile unlock deducts diamonds once | P0 | First unlock deducts, repeat view does not |
| Wallet | Unlock attempt with insufficient balance | P0 | Unlock is blocked and balance unchanged |
| Reports | User reports profile or chat | P0 | Report appears in admin queue |
| Reports | Admin resolves report by suspending user | P0 | Report is resolved and user is suspended |
| Admin Members | Admin searches members by ID/status | P1 | Matching rows appear with masked PII |
| Audit | Mutating admin action creates audit log entry | P0 | Actor, action, target, reason, timestamp are stored |
| Metrics | Dashboard loads operational summary | P1 | Metrics render without exposing sensitive documents |

## API and Data Integrity Matrix

| Area | Test Case | Priority | Expected Result |
| --- | --- | --- | --- |
| Authorization | Mobile token calls admin endpoint | P0 | Request is denied |
| Authorization | Reviewer role attempts wallet adjustment | P0 | Request is denied |
| Wallet Ledger | Concurrent unlock requests for same target profile | P0 | Only one deduction succeeds |
| Matching | Suspended user receives like request | P0 | Match action is blocked |
| Reports | Report references deleted or unavailable content | P1 | Admin can still resolve report safely |
| Audit | Admin action without reason where reason is required | P0 | Request is denied |
| Privacy | Masked PII is returned for default admin list calls | P0 | Phone/email/contact fields are masked |
| Pagination | Large member list paginates consistently | P1 | No duplicate or missing rows across pages |

## Device Matrix

| Platform | Minimum Coverage |
| --- | --- |
| Android | Current Play-supported Android version plus one older common version |
| iOS | Current iOS major version plus one older supported version |
| Web Admin | Chrome latest and Safari latest |

## Release Candidate Smoke Test

Run this before every store submission:

- Install fresh app build.
- Create account.
- Complete profile.
- Approve profile in admin.
- Swipe and create mutual match using seeded account.
- Send chat message.
- Unlock premium profile detail with diamonds.
- File report.
- Resolve report in admin.
- Confirm suspended user is blocked.
- Confirm audit log contains admin actions.

## Smoke Evidence Requirements

| Surface | Minimum Evidence |
| --- | --- |
| Homepage | URLs tested, viewport, screenshot or render log, broken-link notes |
| Admin | Route tested, user role, seeded record ID, screenshot or action log |
| Mobile | Platform, build number, device/simulator, screen evidence for P0 flow |
| Backend | Command/API call, status code, response sample or database/audit record |

## Exit Criteria

- All P0 tests pass.
- No open S0 or S1 defects.
- S2 defects have owner, workaround, and release decision.
- Store release checklist is complete or explicitly deferred by release owner.
- Review account and seed data are ready for Apple and Google review.

## Current Preview Evidence

Current local preview smoke evidence is tracked in:

```text
docs/qa/SMOKE_EVIDENCE.md
```
