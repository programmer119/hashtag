# Worklist

Product name: Hashdate

Progress owner: Codex / Lead Architect

Progress rule: percentages move only when tangible artifacts are created, reviewed, integrated, built, tested, or otherwise evidenced. Estimates are not counted as completion.

## Team

| Name | Role | Primary Ownership | Current Progress |
| --- | --- | --- | ---: |
| Codex | Lead Architect | Architecture, integration, progress tracking | 24% |
| James | Product / Policy / Copy | Product specs, benchmark audits, policies, copy | 40% |
| Poincare | Mobile App | Flutter app | 83% |
| Dalton | Backend/API | Mobile, admin, homepage backend APIs | 56% |
| Mason | Admin Frontend | Admin web frontend | 45% |
| Lena | Homepage Frontend | Public homepage frontend | 42% |
| Carver | QA / Release | QA matrix, store readiness, release checks | 50% |
| Telegram Ops | Bot bridge | scheduled reports, command polling, immediate Codex exec bridge, and command results | 96% |
| Ticket Backlog | Codex | Runnable implementation tickets | 38% |
| UI Task Backlog | Codex | Visible surface UI tasks | 35% |

## Codex / Lead Architect

- Maintain project principles and decisions.
- Keep API, product, app, admin, homepage, and QA tracks aligned.
- Update `docs/PROGRESS.md` and this worklist after completed work.
- Resolve conflicts between role outputs.
- Continue no-question execution except owner-controlled external assets.
- Maintain `docs/IMPLEMENTATION_TICKETS.md` and keep ticket IDs tied to progress evidence.
- Maintain `docs/UI_IMPLEMENTATION_TASKS.md` so product-visible rules become concrete UI tasks.

## James / Product, Policy, Copy

- Build SkyPeople-style feature and screen audit.
- Maintain client requirements traceability with Codex.
- Draft homepage copy and policy copy.
- Define diamond policy using lead defaults unless later changed by production/legal constraints.

Current artifact: `docs/product/BENCHMARK_AUDIT_CHECKLIST.md`

Shared artifact: `docs/product/CLIENT_REQUIREMENTS_TRACEABILITY.md`

New artifact: `docs/product/VISIBLE_SURFACE_SPECS.md`

Next:

- Convert visible surface specs into mobile/admin UI tasks.
- Track Phase 2 benchmark items separately from MVP-visible surfaces.
- Prepare screenshot assets after real app screens exist.

## Poincare / Mobile App

- Generated Flutter-ready placeholder screen files and mock app skeleton.
- Implement mock navigation and app shell.
- Build onboarding, profile, discovery, match, chat, wallet, settings, and safety screens as real Flutter widgets.
- Integrate backend APIs when stable.

Current artifacts:

- `apps/mobile/docs/MOCK_DATA.md`
- `apps/mobile/docs/POINCARE_WORKLIST.md`
- `apps/mobile/docs/POINCARE_PROGRESS.md`
- `apps/mobile/lib/app/mock_app_skeleton.dart`
- Placeholder screen files for auth, profile, discovery, matches, chat, wallet, settings, and safety.
- `apps/mobile/scripts/dev-server.mjs`
- `apps/mobile/docs/PREVIEW_SERVER.md`
- `apps/mobile/pubspec.yaml`
- `apps/mobile/lib/main.dart`
- `apps/mobile/lib/app/hashdate_mock_app.dart`
- `apps/mobile/lib/app/hashdate_mock_controller.dart`
- `apps/mobile/lib/core/mock/mock_app_data.dart`
- `apps/mobile/lib/core/mock/mock_hashdate_repository.dart`
- `apps/mobile/lib/core/api/hashdate_api.dart`
- `apps/mobile/lib/core/repositories/hashdate_repository.dart`
- `apps/mobile/lib/core/repositories/rest_hashdate_repository.dart`
- `apps/mobile/lib/core/repositories/rest_repository_hydrator.dart`
- `apps/mobile/lib/core/repositories/repository_mode.dart`
- `apps/mobile/lib/features/session/controllers/session_controller.dart`
- `apps/mobile/lib/features/discovery/controllers/discovery_controller.dart`
- `apps/mobile/lib/features/profile/controllers/profile_controller.dart`
- `apps/mobile/lib/features/chat/controllers/chat_controller.dart`
- `apps/mobile/lib/features/wallet/controllers/wallet_controller.dart`
- `apps/mobile/lib/features/safety/controllers/safety_controller.dart`
- `apps/mobile/scripts/apk-readiness.mjs`
- `apps/mobile/scripts/toolchain-check.mjs`
- `apps/mobile/scripts/build-debug-apk.mjs`
- `apps/mobile/scripts/install-smoke.mjs`
- `apps/mobile/docs/APK_BUILD_PATH.md`
- `apps/mobile/docs/APK_BUILD_EVIDENCE.md`
- `apps/mobile/docs/APK_INSTALL_EVIDENCE.md`
- `apps/mobile/docs/IPA_BUILD_EVIDENCE.md`
- `apps/mobile/docs/RUNTIME_MODE.md`
- `apps/mobile/scripts/build-ios-ipa.sh`
- `apps/mobile/ios/ExportOptions.ad-hoc.plist`
- `apps/mobile/ios/ExportOptions.app-store.plist`
- `apps/mobile/android`
- `apps/mobile/ios`
- `apps/mobile/test/widget_test.dart`
- `apps/mobile/test/hashdate_api_test.dart`
- `apps/mobile/test/repository_contract_test.dart`
- `apps/mobile/build/app/outputs/flutter-apk/app-debug.apk`

Verification:

- Mobile preview confirmed on `http://localhost:4302/discover`
- Mobile preview confirmed on `http://localhost:4302/auth`
- Mobile preview confirmed on `http://localhost:4302/wallet`
- Mobile preview now includes local actions for profile submit/reset, discovery like/pass, unlock diamond deduction, chat send/report, wallet grant, and safety report/block.
- Mobile action preview smoke pass confirmed `/discover`, `/unlock`, `/chat`, `/profile`, and `/safety` returned 200 and included action controls on `localhost:4322`.
- APK readiness check confirms the Flutter source path and Android platform folder exist; toolchain check confirms Git, Flutter, Dart, Java 17, and ADB are available through project-local tooling; APK build runner produced `build/app/outputs/flutter-apk/app-debug.apk`.
- Flutter widget smoke tests pass for discovery unlock and wallet navigation.
- APK install smoke runner exists and currently records the blocker that no Android device/emulator is connected.
- Mock app state is now separated into controller and repository boundaries, including session/profile approval, wallet grant, and safety report behavior, with widget tests passing after the split.
- Shared mock controller has been split into session, discovery, wallet, and safety feature controllers.
- Profile and chat feature controllers now cover profile review submit and chat send mock behavior.
- Typed `HashdateApi` maps MVP backend preview endpoints and has endpoint/body mapping tests.
- Feature controllers now depend on a repository interface, with mock and REST repository implementations separated and tested.
- REST repository now maps hydrated preview API payloads into app models for session, discovery, wallet, chat, and safety.
- REST repository hydrator can build a snapshot from typed API responses, with call-order and mapping tests.
- iOS IPA build path is prepared for macOS/Xcode via `npm run ipa:build-mac`; Windows cannot produce an installable `.ipa`, and successful Mac builds will output to `apps/mobile/build/ios/ipa/*.ipa`.
- Mobile runtime can choose mock or REST preview mode with `--dart-define=HASHDATE_REPOSITORY_MODE=rest`; REST mode displays loading and error states and hydrates from preview API responses.
- Mobile auth gate now includes benchmark-style login/signup entry, prefilled `test1 / test1` credentials, and male/female signup condition screens before entering the main app.
- Mobile start now defaults to Korean and includes a Korean/English language switch.
- Mobile menu now includes a benchmark mock-screen catalog for signup/verification, matching, communication, payment, account settings, support, acquaintance blocking, notification, and operations-facing surfaces.
- Flutter widget tests now pass across 12 auth, language, catalog, discovery, wallet, profile, chat, and safety flows; the Android debug APK was rebuilt after the latest mock-screen coverage work.

Next:

- Install APK on a connected Android device or emulator and record smoke evidence.
- Run IPA build on a macOS machine with Xcode and Apple signing, then distribute via TestFlight or signed ad hoc IPA.
- Add per-feature controller unit tests beyond widget smoke.
- Prioritize installable Android mock APK path before noncritical homepage/admin/documentation work.

## Dalton / Backend/API

- Compile NestJS app skeleton.
- Implement auth, profile, discovery, matching, chat, wallet, reports, admin APIs.
- Add homepage support APIs.
- Add database schema and migration workflow.

Current artifacts:

- `server/api/docs/DALTON_WORKLIST.md`
- `server/api/docs/DALTON_PROGRESS.md`
- Support and content module stubs.
- API contract extensions for homepage/admin support.
- `docs/architecture/API_PAYLOADS.md`
- `server/api/scripts/dev-server.mjs`
- `server/api/docs/PREVIEW_SERVER.md`

Verification:

- Backend preview confirmed on `http://localhost:4317/health`
- Backend preview confirmed on `http://localhost:4317/version`
- Expanded backend preview confirmed on `http://localhost:4318/v1/auth/dev-login`
- Expanded backend preview confirmed on `http://localhost:4318/v1/users/me`
- Expanded backend preview confirmed on `http://localhost:4318/v1/discovery/swipe-deck`
- Expanded backend preview confirmed on `http://localhost:4318/v1/wallet`
- Expanded backend preview confirmed on `http://localhost:4318/v1/matches`
- Support request preview confirmed on `http://localhost:4319/v1/support/requests`
- Account deletion request preview confirmed on `http://localhost:4319/v1/users/me/deletion-requests`
- Report creation preview confirmed on `http://localhost:4321/v1/reports`
- Admin suspension preview confirmed on `http://localhost:4321/v1/admin/users/u_1003/suspensions`
- Wallet ledger preview confirmed on `http://localhost:4331/v1/wallet/ledger`
- Chat send preview confirmed on `http://localhost:4331/v1/chat/rooms/room_m_3001/messages`
- Admin support queue preview confirmed on `http://localhost:4331/v1/admin/support/requests`
- Admin deletion queue preview confirmed on `http://localhost:4331/v1/admin/deletion-requests`

Next:

- Resume backend conversion work while mobile install smoke waits for a connected Android device/emulator.
- Prioritize NestJS-style controller/service organization for auth, profile, discovery, wallet, chat, reports, support, and deletion preview contracts.
- Keep endpoint shapes aligned with `docs/architecture/API_PAYLOADS.md` and the mobile `HashdateApi` adapter.

## Mason / Admin Frontend

- Generate Next.js admin app.
- Build admin shell and login.
- Build user review queue.
- Build reports, wallet lookup, audit log, and metrics screens.

Current artifacts:

- `apps/admin/WORKLIST.md`
- `apps/admin/PROGRESS.md`
- `apps/admin/scripts/dev-server.mjs`
- `apps/admin/docs/PREVIEW_SERVER.md`

Verification:

- Admin preview confirmed on `http://localhost:4301/login`
- Admin preview confirmed on `http://localhost:4301/dashboard`
- Admin preview confirmed on `http://localhost:4301/users/review`
- Admin user detail preview confirmed on `http://localhost:4301/users/u_1003`
- Admin wallet adjustment preview confirmed on `http://localhost:4301/wallets`
- Masked contact admin preview confirmed on `http://localhost:4303/users`
- Masked contact admin preview confirmed on `http://localhost:4303/users/review`
- Reports screen now shows evidence, target user, status, suspend action, and dismiss action.
- User detail preview now shows masked contact values, review state, safety context, and suspension history.
- Wallets preview now shows adjustment guardrails, grant/refund/deduct actions, and ledger-style rows.

Next:

- Resume admin flow hardening while mobile install smoke waits for a connected Android device/emulator.
- Add report detail, user-specific wallet lookup, audit log, and production Next.js API adapters.

## Lena / Homepage Frontend

- Generated public homepage structure.
- Built landing, download, support, terms, privacy, account deletion, and safety pages.
- Added public work status page and navigation link.
- Added package manifest, TypeScript config, Next config, sitemap, and robots routes.
- Ensure public web surfaces satisfy benchmark completeness with original Hashdate design.
- Coordinate with Dalton on support and account deletion APIs.

Current artifacts:

- `apps/homepage`
- `apps/homepage/docs/LENA_WORKLIST.md`
- `apps/homepage/docs/HOMEPAGE_PROGRESS.md`

Verification:

- Work-status Development info now lists the mobile Flutter UI entry file, app entry file, feature controller path, mobile runtime/dev packages, homepage stack, homepage preview server, and homepage runtime packages.
- `node --check apps/homepage/scripts/dev-server.mjs` passed after the Development info update.

Next:

- Install dependencies after the mobile mock APK path is underway.
- Resume public web work while mobile install smoke waits for a connected Android device/emulator.
- Run build and fix compile errors.
- Replace placeholder legal/support/store content with production values.
- Add SEO metadata and Open Graph image.

## Carver / QA / Release

- Maintain QA test matrix.
- Maintain App Store and Google Play release readiness.
- Verify progress claims against testable artifacts.
- Prepare smoke tests for mobile, admin, homepage, and backend.
- Maintain the standard smoke evidence template for homepage, mobile, backend, admin, Telegram, and P0 flow runs.

Current artifacts:

- `docs/qa/RELEASE_CHECKLIST.md`
- `docs/qa/QA_TEST_MATRIX.md`
- `docs/qa/STORE_RELEASE_READINESS.md`
- `docs/qa/EXTERNAL_OWNER_BLOCKERS.md`
- `docs/qa/SMOKE_EVIDENCE.md`
- `docs/qa/SMOKE_EVIDENCE_TEMPLATE.md`
- `docs/qa/API_RESPONSE_SAMPLES.md`
- `docs/BUILD_READINESS.md`

Next:

- Run first template-based smoke pass for the currently running homepage/admin/mobile/backend previews.
- Attach screenshots, logs, build numbers, API responses, and data records to each QA result.
- Keep build readiness labels current as previews become real Flutter, NestJS, and Next.js builds.

## Telegram Ops / Bot Bridge

- Generate status reports from `docs/PROGRESS.md` and `docs/WORKLIST.md`.
- Send status to Telegram when `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` exist.
- Poll Telegram commands and run Codex-required tasks immediately through `codex exec`.
- Send completed Codex command results from `docs/telegram/COMMAND_RESULTS.md` back to Telegram.
- Keep scheduled report state in `docs/telegram/REPORT_STATE.md`.

Current artifacts:

- `docs/telegram/README.md`
- `docs/telegram/COMMANDS.md`
- `docs/telegram/CODEX_BRIDGE.md`
- `docs/telegram/COMMAND_QUEUE.md`
- `docs/telegram/COMMAND_RESULTS.md`
- `docs/telegram/REPORT_STATE.md`
- `scripts/telegram/status-report.mjs`
- `scripts/telegram/send-status.mjs`
- `scripts/telegram/send-command-results.mjs`
- `scripts/telegram/bot-poll.mjs`
- `scripts/telegram/poll-loop.mjs`
- `scripts/telegram/report-loop.mjs`
- `scripts/telegram/start-poll-loop.ps1`
- `scripts/telegram/start-report-loop.ps1`
- `scripts/telegram/register-windows-autostart.ps1`
- `scripts/telegram/get-chat-id.mjs`
- `docs/telegram/REPORT_SCHEDULE.md`
- `docs/telegram/WINDOWS_AUTOSTART.md`
- `docs/telegram/SETUP_TROUBLESHOOTING.md`

Next:

- Rotate the pasted bot token before production use.
- Persist `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in the runtime environment.
- Restart `node scripts/telegram/poll-loop.mjs` and `node scripts/telegram/report-loop.mjs` with the current scripts so pending command results are sent and the new reporting cadence is preserved.
