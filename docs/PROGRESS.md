# Progress

Product name: Hashdate

Owner: Codex / Lead Architect

Reviewer: Carver / QA Release Agent

## Tracking Rule

Progress is tracked by the Lead Architect and reviewed by Carver. Percentages represent delivery readiness backed by tangible artifacts, not effort spent or optimism.

## Overall Progress

Current overall progress: 61%

## Area Progress

| Area | Owner | Progress | Status | Next Action |
| --- | --- | ---: | --- | --- |
| Project setup | Codex | 50% | Monorepo docs, principles, worklist, naming, and role expansion initialized | Generate real runnable app/server/admin/homepage skeletons |
| Product planning | James | 40% | MVP scope, policies, benchmark audit, visible surface specs, identity display rules, and store screenshot script drafted | Convert visible surface specs into app/admin UI tasks |
| Mobile app | Poincare | 84% | Android debug APK builds; iOS project exists; Mac IPA build script/export options are prepared; auth gate with test1/test1 login, Korean-default language switch, benchmark-style signup conditions, and a full mock-screen catalog with tappable detail pages is implemented; app runtime selects mock or REST preview mode; thirteen Flutter tests pass | Install APK on device/emulator and run IPA build on macOS/Xcode |
| Backend API | Dalton | 56% | Wallet ledger, chat send, admin support queue, and admin deletion queue preview endpoints added and smoke-checked on localhost:4331 | Replace preview routing with NestJS controllers |
| Admin web | Mason | 45% | Admin preview now covers login, dashboard, review queue, user list, masked user detail, reports, wallet guardrails, and suspension history | Replace preview with Next.js app-router pages and API adapters |
| Homepage web | Lena + Dalton | 42% | Homepage support form preview added and support/deletion backend endpoints verified | Wire real form submission after Next app build |
| QA and release | Carver | 50% | Backend API response samples, smoke evidence, smoke evidence template, build readiness map, APK build evidence, and Flutter widget smoke tests now separate preview, debug APK, and store-release gaps | Add device/emulator install smoke evidence and screenshots |
| Telegram ops | Codex | 96% | Status report, 10-second command polling, immediate Codex exec bridge, command result outbox, local report loop, Windows autostart wrappers, manual autostart registration script, chat ID helper, command docs, queue, troubleshooting guide, and scheduled report policy are in place | Restart poll/report loops with current scripts and rotate token before production |
| Benchmark coverage | Codex + James | 30% | Public mobile/web benchmark surfaces audited and MVP visible-surface gaps closed with specs | Track Phase 2 benchmark items separately |
| Client requirements coverage | Codex | 25% | Abuse report and suspension MVP rows are now tied to verified preview behavior | Convert remaining MVP trace rows into implementation tickets |
| Implementation planning | Codex | 50% | P0 mobile profile, discovery, chat, wallet/unlock, report/suspension mock-flow tickets are Done, HD-P0-013 has APK build evidence, first-pass feature controllers exist, typed API endpoints are tested, repository swap point exists, REST response mapping is tested, and API hydration scaffolding is tested | Continue HD-P0-013 toward device install evidence and runtime REST loading |
| UI implementation planning | Codex | 35% | Visible-surface specs converted into mobile, admin, homepage, and store asset UI tasks | Execute nickname-only, masked admin, and support form tasks |
| Progress tracking | Codex + Carver | 45% | Artifact-based progress rules now include build readiness labels for preview, MVP, API, store-alpha states, and standard smoke evidence template rows | Keep updates tied to changed files, reviewed outputs, and smoke evidence |

## Last Update

2026-05-17:

- Switched to no-question autonomous execution mode.
- Product name changed to `Hashdate`.
- Added Lena as homepage frontend owner and Mason as admin frontend owner.
- Lena created `apps/homepage` with landing, privacy, terms, support, account deletion, download, and safety pages.
- Dalton extended backend planning for support, content, legal documents, account deletion, and admin management APIs.
- Mason took over admin frontend ownership and added admin worklist/progress docs.
- Autonomous progress heartbeat changed to 30 minutes.
- James added `docs/product/BENCHMARK_AUDIT_CHECKLIST.md`.
- Carver added nonstop QA execution rules, artifact-based progress verification, smoke checklist, and external-owner blocker register.
- Poincare added mobile placeholder files for auth, onboarding, review pending, discovery, profile unlock, matches, chat, wallet, settings, and report/block.
- Codex added homepage package/config files, sitemap, robots route, and homepage progress tracking.
- Codex added the public work status page at `/work-status` and linked it in homepage navigation.
- Codex added Telegram status reporting, command polling, command queue, and six-hour report state.
- Codex added Telegram chat ID helper and setup troubleshooting after the first six-hour report attempt was blocked by missing environment credentials.
- Telegram group chat ID was received and a first status report was successfully sent.
- First Telegram `/codex` command was received; persistent poll loop was added.
- Third Telegram `/codex` test command was confirmed in the queue and marked complete.
- Heartbeat queue check processed Telegram test4 and current status report commands.
- Codex added `docs/product/CLIENT_REQUIREMENTS_TRACEABILITY.md` to track every client brief requirement against phase, owner, artifact, and status.
- Codex added `docs/IMPLEMENTATION_TICKETS.md` to convert traceability rows into executable ticket IDs and next execution order.
- Codex added a dependency-free backend preview server with `/health`, `/version`, payment product, and legal content routes.
- Codex verified backend preview `GET /health` and `GET /version` returned 200 on `localhost:4317`.
- Codex added a dependency-free admin preview server with login, dashboard, review queue, users, reports, and wallets routes.
- Codex verified admin preview `/login`, `/dashboard`, and `/users/review` returned 200 on `localhost:4301`.
- Codex added a dependency-free mobile browser preview covering the MVP mobile flow.
- Codex verified mobile preview `/discover`, `/auth`, and `/wallet` returned 200 on `localhost:4302`.
- Codex expanded the backend preview API for dev login, user/profile, discovery, swipe recording, wallet, unlock, matches, and chat.
- Codex verified expanded backend preview routes returned 200 on `localhost:4318`.
- Codex added QA smoke evidence for homepage, admin, mobile, and backend preview surfaces returning 200.
- Codex added `docs/architecture/API_PAYLOADS.md` with MVP request/response shapes for the preview-to-NestJS transition.
- Codex added `docs/product/VISIBLE_SURFACE_SPECS.md` for nickname-only display, store screenshots, public web copy rules, and permission rationale copy.
- Codex added `docs/UI_IMPLEMENTATION_TASKS.md` to translate visible-surface rules into mobile/admin/homepage/store implementation tasks.
- Codex added homepage support form preview and backend support/deletion preview endpoints.
- Codex verified support request and account deletion preview endpoints returned 201 on `localhost:4319`.
- Six-hour Telegram report attempt was blocked because heartbeat env vars were not persisted.
- Codex updated the admin preview to mask phone/email contact values by default.
- Codex added a local Telegram report loop so 6-hour reports can run independently from heartbeat environment variables.
- Codex updated the Telegram report schedule to every 30 minutes until 2026-05-20 00:00 KST, then daily at 08:00 and 20:00 KST.
- Codex added Windows autostart wrapper scripts for Telegram poll and report loops.
- Codex added a manual Windows autostart registration script; automatic registration was blocked by credential persistence policy.
- Codex added `docs/qa/API_RESPONSE_SAMPLES.md` with payload-level evidence for backend preview users, discovery, wallet, and matches.
- Codex extended API response samples with auth, unlock, chat rooms, and chat messages, and corrected Telegram report cadence state.
- Codex added report creation and admin suspension preview endpoints, verified them with real HTTP calls, and connected the admin reports and mobile safety preview surfaces.
- Codex corrected Telegram report state to the current 30-minute then 08:00/20:00 KST schedule.
- Codex processed a Telegram build/readiness command and added `docs/BUILD_READINESS.md` to clarify that Hashdate has runnable local previews but not yet Android/iOS store builds.
- Codex added Telegram command result delivery via `docs/telegram/COMMAND_RESULTS.md` and `scripts/telegram/send-command-results.mjs` so queued commands can receive final answers in Telegram.
- Codex processed two newer Telegram commands, queued final Telegram replies for them, and documented that an older report-loop process may still be writing the old cadence text.
- Codex added local mobile preview actions for profile, discovery, unlock, chat, wallet, and safety, then smoke-checked five mobile routes on `localhost:4322`.
- Codex verified `codex exec` can be launched from the Telegram server path and updated Telegram polling so `/codex`, `/decide`, and `/priority` run Codex immediately instead of waiting for heartbeat processing.
- Poincare/Codex added the first real Flutter app source path for the mobile mock APK priority, installed project-local Flutter 3.41.9 and JDK 17 tooling, generated platform folders with `flutter create .`, built Android debug APK `apps/mobile/build/app/outputs/flutter-apk/app-debug.apk`, passed Flutter widget smoke tests for discovery unlock and wallet navigation, and added APK install smoke evidence showing no connected Android device/emulator.
- Poincare/Codex split the Flutter mock app state into `HashdateMockController` and `MockHashdateRepository`, re-ran `dart format`, passed Flutter widget smoke tests, and rebuilt the Android debug APK from the updated structure.
- Poincare/Codex expanded controller/repository behavior for mock session/profile approval, wallet test grants, and safety report submission, extended widget smoke tests to three flows, and rebuilt the Android debug APK again.
- Poincare/Codex split the shared mobile mock controller into session, discovery, wallet, and safety feature controllers, kept widget smoke tests passing, and rebuilt the Android debug APK from the feature-controller structure.
- Poincare/Codex added profile and chat feature controllers, exposed profile review submit and chat send mock actions in the Flutter app, expanded widget smoke tests to four flows, and rebuilt the Android debug APK.
- Poincare/Codex added `HashdateApi`, expanded `ApiClient`, added API endpoint/body mapping tests, passed five Flutter tests, and rebuilt the Android debug APK.
- Poincare/Codex added `HashdateRepository`, `RestHashdateRepository`, repository mode scaffolding, and repository contract tests; controllers now depend on the repository interface, seven Flutter tests pass, and the Android debug APK rebuilt successfully.
- Poincare/Codex implemented REST preview payload mapping in `RestHashdateRepository`, expanded repository tests, passed eight Flutter tests, and rebuilt the Android debug APK.
- Poincare/Codex added `RestRepositoryHydrator`, path-based API response fixtures, hydration tests, passed nine Flutter tests, and rebuilt the Android debug APK.
- Dalton/Codex aligned backend preview routes with the mobile API adapter by adding wallet ledger, chat send, admin support queue, and admin deletion queue endpoints, then smoke-checked the new endpoints on `localhost:4331`.
- Mason/Codex added admin preview user detail, masked PII review context, suspension history, and wallet adjustment guardrails, then passed `node --check apps/admin/scripts/dev-server.mjs` and verified `/users/u_1003` and `/wallets` returned 200 on `localhost:4301`.
- Codex restarted local previews after computer restart: homepage `/work-status`, mobile `/discover`, and admin `/login` returned 200 on their default ports; backend `/health`, `/v1/wallet/ledger`, and `/v1/admin/suspensions` returned 200 on fallback port `4332` because port `4100` is currently occupied by a different 404 responder.
- Poincare/Codex attempted the iOS IPA path on Windows and confirmed this toolchain cannot produce `.ipa`; added Mac/Xcode IPA export options, `scripts/build-ios-ipa.sh`, `npm run ipa:build-mac`, and `docs/IPA_BUILD_EVIDENCE.md` with the final download path `apps/mobile/build/ios/ipa/*.ipa`.
- Poincare/Codex added mobile runtime mock/REST mode selection, a live API client, loading/error screens, and `docs/RUNTIME_MODE.md`; Flutter tests passed and the Android debug APK was rebuilt.
- Lena/Codex added a Development info section to the work-status page showing Flutter/Dart versions, Android API targets, Java/Gradle, APK/IPA paths, and the current client-company disclosure status; verified on `localhost:3005/work-status`.
- Carver/Codex added `docs/qa/SMOKE_EVIDENCE_TEMPLATE.md` and marked HD-P1-103 done so future homepage, mobile, backend, admin, Telegram, and P0 flow smoke passes require consistent artifact-backed evidence.
- Poincare/Codex added benchmark-style mobile login/signup screens, prefilled `test1 / test1` credentials, male/female signup condition pages, auth-gated main app entry, expanded widget tests to 10 passing tests, and rebuilt the Android debug APK.
- Poincare/Codex added Korean-default start language switching, Korean main tab labels, a menu-based benchmark mock-screen catalog for remaining visible SkyPeople-style surfaces, expanded widget tests to 12 passing tests, and rebuilt the Android debug APK.
- Lena/Codex expanded the work-status Development info section with Flutter UI/code entry paths and the currently declared mobile/homepage package and library inventory, then passed `node --check` on the preview server.
- Lena/Codex added frontend, backend, database, cache/queue, object storage, and payment architecture rows to work-status Development info, passed `node --check`, restarted the `localhost:3005` preview server, and verified the new rows render.
- Lena/Codex added likely Flutter library candidates for routing, state, API, model generation, media, payments, push, errors, animation, charts, and forms to work-status Development info, then verified the refreshed `localhost:3005` page renders them.
- Poincare/Codex removed vendor-facing internal wording such as mock/test/benchmark-server notices from visible mobile UI labels, updated widget assertions, passed 12 Flutter tests, and rebuilt the Android debug APK.
- Lena/Codex fixed the homepage preview routing so `http://localhost:3005/` now serves the public Hashdate service page while `http://localhost:3005/work-status` remains the internal development/status page; verified both routes return distinct content.
- Lena/Codex updated the public homepage with Korean-default language switching, wired all app-download CTAs to `https://cruise.suaveforge.com/app-debug.apk`, changed unfinished navigation items to show a `개발중입니다.` alert without routing, added static export settings, added `apps/homepage/public/CNAME` for `date.suaveforge.com`, and created a GitHub Pages deployment workflow.

- Poincare/Codex converted mobile menu catalog rows into tappable detail pages with screen purpose, member-facing content, connected flow, and development notification states; installed Microsoft OpenJDK 17 after restart, configured Flutter to use it, passed thirteen Flutter tests, and rebuilt the Android debug APK.

## Lead Defaults

- MVP login method: phone-first OTP flow with email fallback for development builds.
- Initial diamond costs: profile detail unlock 10 diamonds, premium contact-like 50 diamonds.
- Wallet operations: immutable ledger entries with admin grant, refund, and deduction.
- First test target: Android internal testing first, then iOS TestFlight.
- Owner-controlled blockers only: Apple/Google/payment/SMS/identity/cloud production credentials and final legal identity publication.
