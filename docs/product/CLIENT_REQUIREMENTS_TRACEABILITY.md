# Client Requirements Traceability

Owner: Codex / Lead Architect

Purpose: track every client-brief requirement against Hashdate scope, owner, artifact, and implementation phase. This is the control sheet for the "no missing requested features" principle.

## Status Legend

- Captured: requirement is documented but not yet specified in detail.
- Specified: product/API/admin/mobile behavior is defined.
- Scaffolded: placeholder code, route, page, or module exists.
- Implemented: runnable behavior exists.
- Verified: QA evidence exists.
- Blocked: blocked by owner-controlled external asset or legal/business dependency.

## Traceability Matrix

| Requirement | Hashdate Equivalent | Owner | Phase | Current Status | Existing Artifact | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| Cross-platform iOS/Android app | Flutter mobile app | Poincare | MVP | Scaffolded | `apps/mobile` | Generate real Flutter project and widgets |
| Admin web | Internal operations console | Mason + Dalton | MVP | Specified | `apps/admin`, API contract | Generate runnable Next.js admin |
| Public homepage | Hashdate public website | Lena + Dalton | MVP | Scaffolded | `apps/homepage` | Install/build and connect support APIs |
| Phone verification | Phone-first OTP login | Dalton + Poincare | MVP | Captured | `docs/PROGRESS.md` lead defaults | Add DTOs and mock OTP flow |
| Email fallback for dev | Email login fallback | Dalton + Poincare | MVP | Captured | `docs/PROGRESS.md` lead defaults | Add dev-only route and mobile screen |
| Profile creation | Profile onboarding | Poincare + Dalton | MVP | Scaffolded | Mobile placeholder screens, API contract | Implement profile save API and widgets |
| Photo upload | Signed photo upload | Dalton + Poincare | MVP | Specified | `docs/architecture/API_CONTRACT.md` | Add storage adapter contract |
| Admin profile approval | Review queue approval/rejection | Mason + Dalton | MVP | Specified | Admin plan/API contract | Implement mock review queue |
| Rejection reason | Controlled rejection reason | James + Mason | MVP | Specified | Product policies/admin plan | Define enum and UI states |
| Swipe discovery | Appearance-first swipe deck | Poincare + Dalton | MVP | Scaffolded | Mobile discovery placeholders | Implement mock swipe interaction |
| Like/pass | Standard interest actions | Poincare + Dalton | MVP | Specified | API contract | Implement mock and API persistence |
| Mutual match | Match creation | Dalton + Poincare | MVP | Specified | API contract | Enforce one match per pair |
| 1:1 chat | Match-only chat | Poincare + Dalton | MVP | Scaffolded | Mobile chat placeholders | Implement REST polling first |
| Diamond wallet | Wallet balance and ledger | Dalton + Poincare | MVP | Specified | Product policy/API contract | Implement ledger schema and mock UI |
| Profile unlock | 10-diamond profile detail unlock | Dalton + Poincare | MVP | Captured | Lead defaults | Add unlock table and UI confirmation |
| Double-charge prevention | One unlock per viewer-target | Dalton | MVP | Specified | Product acceptance criteria | Add DB constraint and service guard |
| Admin wallet adjustments | Grant/refund/deduct with reason | Dalton + Mason | MVP | Specified | Product policy/admin plan | Add admin endpoint and UI |
| Abuse reports | Profile/chat report queue | Carver + Mason + Dalton | MVP | Verified | Backend preview, admin reports screen, mobile safety preview, QA samples | Convert preview route into production controller and persistence |
| Suspension | Suspend/reinstate users | Mason + Dalton | MVP | Verified | Backend preview, admin reports screen, QA smoke evidence | Add production status guard to discovery/chat APIs |
| App Store/Google Play readiness | Release checklist | Carver | MVP | Specified | `docs/qa` | Fill metadata and evidence |
| Privacy policy | Public privacy page | James + Lena | MVP | Scaffolded | `apps/homepage/app/privacy` | Replace placeholder legal copy |
| Terms of service | Public terms page | James + Lena | MVP | Scaffolded | `apps/homepage/app/terms` | Replace placeholder legal copy |
| Support page | Public support route/API | Lena + Dalton | MVP | Scaffolded | Homepage/support module | Connect form to API |
| Account deletion | Public deletion route/API | Lena + Dalton | MVP | Scaffolded | Homepage/deletion + API planning | Implement request queue |
| Document upload | Secure document collection | Dalton + Poincare | Phase 2 | Specified | API contract moderation routes | Define KMS/storage retention details |
| Document encryption | Encrypted object storage | Dalton | Phase 2 | Captured | Architecture baseline | Add AWS KMS design |
| Document purge | Review then immediate purge | Dalton + Mason | Phase 2 | Specified | API contract purge route | Add deletion scheduler design |
| Existing member rating | 24-hour new member rating | James + Dalton + Poincare | Phase 2 | Captured | Client brief only | Specify rating flow and abuse guard |
| 3-channel matching | Appearance/profile/community channels | James + Poincare + Dalton | Phase 2 | Captured | MVP scope/benchmark audit | Split detailed channel specs |
| Profile-first matching | Text/tag-first list with blinded photos | Poincare + Dalton | Phase 2 | Captured | Client brief | Add route, UI, and unlock model |
| Community matching | Anonymous board with chat request | Poincare + Dalton + Mason | Phase 2 | Captured | Client brief | Specify board moderation model |
| Channel-specific unlock costs | 5/10/20 diamond logic | Dalton + James | Phase 2 | Captured | Client brief | Define pricing matrix and ledger types |
| Cross-channel unlock sync | Shared unlock state across channels | Dalton | Phase 2 | Captured | Client brief | Add canonical unlock domain model |
| Premium contact-like | High-cost contact attached like | Dalton + Poincare | Phase 2 | Captured | API contract placeholder | Define encryption and consent UX |
| Statistics dashboard | Signup, match, revenue, diamond stats | Mason + Dalton | MVP | Specified | Admin plan/API contract | Add stats endpoint and admin widgets |
| AI curation readiness | Structured logs and tags | Dalton + James | Phase 2 | Captured | Architecture docs | Add event log schema |
| NLP matching | AI recommendation phase | Dalton + James | Phase 2 | Captured | Client brief | Keep out of MVP, define event taxonomy |

## Current Coverage Summary

- Total tracked requirements: 40
- MVP requirements: 24
- Phase 2 requirements: 16
- Verified requirements: 2
- Implemented requirements: 0
- Scaffolded requirements: 7
- Specified requirements: 13
- Captured requirements: 18

## Immediate Gaps

- No runnable mobile/admin/backend toolchain yet.
- Legal copy is placeholder only.
- External credentials are not production-ready.
- Document verification is intentionally Phase 2 but must receive a security design before launch marketing claims mention real document verification.
