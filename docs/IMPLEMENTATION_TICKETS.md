# Implementation Tickets

Owner: Codex / Lead Architect

Purpose: convert Hashdate requirements into executable work items. Ticket IDs are stable and should be referenced by agents, Telegram commands, progress updates, and QA evidence.

## Status Legend

- Ready: clear enough to execute.
- In Progress: actively being worked.
- Done: artifact exists and is reviewed.
- Blocked: requires owner-controlled external asset or production credential.

## P0 Vertical Slice

| ID | Title | Owner | Status | Depends On | Acceptance Evidence |
| --- | --- | --- | --- | --- | --- |
| HD-P0-001 | Create runnable homepage build | Lena | Ready | npm/Next install available | `apps/homepage` builds and `/work-status` opens |
| HD-P0-002 | Create runnable backend skeleton | Dalton | Done | Node dependency install | Dependency-free API preview starts and health endpoint returns 200 |
| HD-P0-003 | Create runnable admin skeleton | Mason | Done | Node dependency install | Dependency-free admin preview opens login/dashboard shell |
| HD-P0-004 | Create runnable mobile skeleton | Poincare | Done | Flutter toolchain | Dependency-free browser mobile preview opens shell with mock navigation |
| HD-P0-005 | Add backend health and version endpoints | Dalton | Done | HD-P0-002 | `GET /health` and `GET /version` return JSON in preview mode |
| HD-P0-006 | Add mock auth session flow | Dalton + Poincare | Done | HD-P0-002, HD-P0-004 | Backend dev login returns tokens/user; mobile auth gate supports benchmark-style login/signup and `test1 / test1` test credentials |
| HD-P0-007 | Add profile onboarding mock flow | Poincare | Done | HD-P0-004 | Profile preview has nickname/tag inputs and submit/reset mock behavior |
| HD-P0-008 | Add admin review queue mock flow | Mason | Done | HD-P0-003 | Pending profile review queue is visible in preview mode with approve/reject actions |
| HD-P0-009 | Add discovery swipe mock flow | Poincare | Done | HD-P0-004 | Backend swipe deck/swipe recording exists; mobile preview like/pass behavior updates mock state |
| HD-P0-010 | Add match and chat mock flow | Poincare | Done | HD-P0-004 | Backend match/chat preview endpoints exist; mobile preview can open chat and send a mock message |
| HD-P0-011 | Add wallet and unlock mock flow | Poincare | Done | HD-P0-004 | Backend wallet/unlock endpoints exist; mobile preview deducts 10 diamonds once and records mock wallet grant |
| HD-P0-012 | Add reports and suspension mock flow | Mason + Poincare | Done | HD-P0-008 | Backend report/suspension endpoints exist; admin reports surface and mobile safety action preview are visible |
| HD-P0-013 | Create installable mobile mock APK path | Poincare | In Progress | HD-P0-004 | Flutter project exists, Android debug APK build evidence exists, widget smoke tests pass across profile/unlock/wallet/chat/safety flows, feature controllers exist for all MVP mock surfaces, typed API endpoint tests pass, repository swap-point tests pass, REST payload mapping tests pass, hydration tests pass, and runtime mock/REST mode selection has loading/error states; remaining evidence is device/emulator install smoke result |

## P1 Backend Contracts

| ID | Title | Owner | Status | Depends On | Acceptance Evidence |
| --- | --- | --- | --- | --- | --- |
| HD-P1-001 | Define auth DTOs | Dalton | Done | HD-P0-002 | DTO file and route contract updated |
| HD-P1-002 | Define profile DTOs | Dalton | Done | HD-P0-002 | Profile save/review DTOs documented |
| HD-P1-003 | Define wallet ledger DTOs | Dalton | Done | HD-P0-002 | Ledger entry types and examples documented |
| HD-P1-004 | Define match/chat DTOs | Dalton | Done | HD-P0-002 | Match/chat API payload examples documented |
| HD-P1-005 | Define report/moderation DTOs | Dalton | Done | HD-P0-002 | Report and suspension preview payloads documented |
| HD-P1-006 | Define homepage support DTOs | Dalton + Lena | Done | HD-P0-002 | Support/deletion request payloads documented |

## P1 Product/QA

| ID | Title | Owner | Status | Depends On | Acceptance Evidence |
| --- | --- | --- | --- | --- | --- |
| HD-P1-101 | Convert benchmark audit to screen specs | James | Done | Benchmark audit | Screen spec doc maps every MVP visible surface |
| HD-P1-102 | Add store screenshot script | James + Carver | Done | Mobile mock screens | Screenshot shot list exists |
| HD-P1-103 | Add QA smoke evidence template | Carver | Done | QA matrix | `docs/qa/SMOKE_EVIDENCE_TEMPLATE.md` defines run metadata, surface evidence, P0 flow evidence, defects, blockers, and completion rules |
| HD-P1-104 | Add privacy/terms launch placeholders | James + Lena | In Progress | Homepage pages | Legal placeholders clearly marked non-final |
| HD-P1-105 | Add build readiness map | Codex + Carver | Done | Runnable previews | `docs/BUILD_READINESS.md` separates runnable preview version from store-build gaps |

## P1 UI Implementation

| ID | Title | Owner | Status | Depends On | Acceptance Evidence |
| --- | --- | --- | --- | --- | --- |
| HD-P1-201 | Convert visible surface specs to UI tasks | Codex | Done | Visible surface specs | `docs/UI_IMPLEMENTATION_TASKS.md` exists |
| HD-P1-202 | Enforce nickname-only dating surfaces | Poincare | Ready | HD-P1-201 | Discovery/profile/match/chat screenshots show aliases only |
| HD-P1-203 | Enforce masked admin list values | Mason | Done | HD-P1-201 | Admin preview lists masked phone/email values by default |
| HD-P1-204 | Add support form API connection | Lena + Dalton | Done | HD-P1-201 | Support page form surface exists and preview API accepts requests |
| HD-P1-205 | Add store screenshot capture checklist | Carver + James | Ready | HD-P1-201 | Screenshot evidence folder and shot list exist |

## Blocked External Items

| ID | Title | Owner | Status | Blocker |
| --- | --- | --- | --- | --- |
| HD-X-001 | Real Telegram token rotation | Owner | Blocked | Requires BotFather action |
| HD-X-002 | Apple Developer setup | Owner | Blocked | Requires account access |
| HD-X-003 | Google Play Console setup | Owner | Blocked | Requires account access |
| HD-X-004 | SMS/identity verification vendor | Owner | Blocked | Requires vendor account |
| HD-X-005 | Production legal identity | Owner | Blocked | Requires business/legal details |

## Next Execution Order

1. HD-P0-013 installable mobile mock APK path
2. HD-P0-001 homepage build
3. HD-P1-202 nickname-only dating surfaces
4. HD-P1-103 QA smoke evidence template
5. HD-P1-205 store screenshot capture checklist
