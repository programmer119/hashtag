# Build Readiness

Owner: Codex / Lead Architect

Last updated: 2026-05-18T08:58+09:00

Purpose: answer whether Hashdate currently has a buildable version, what can be tested now, and what must be converted before App Store / Google Play release.

## Current Answer

Hashdate currently has a runnable local preview version and an Android debug APK for local mock testing, not a production store build.

The current preview is enough to inspect product flow, screen structure, backend contracts, admin operations, Telegram reporting, and QA smoke behavior. The Android debug APK exists at `apps/mobile/build/app/outputs/flutter-apk/app-debug.apk`; device/emulator install smoke is still pending. Store-ready Android AAB and iOS IPA/TestFlight builds are not ready yet.

## Runnable Today

| Surface | Current Form | Command | Default URL | Status |
| --- | --- | --- | --- | --- |
| Homepage | Dependency-free Node preview plus Next-style source | `node apps/homepage/scripts/dev-server.mjs` | `http://localhost:3000/work-status` | Runnable preview |
| Backend API | Dependency-free Node preview API | `node server/api/scripts/dev-server.mjs` | `http://localhost:4100/health` | Runnable preview |
| Admin web | Dependency-free Node preview | `node apps/admin/scripts/dev-server.mjs` | `http://localhost:4301/login` | Runnable preview |
| Mobile app | Dependency-free browser preview of mobile IA | `node apps/mobile/scripts/dev-server.mjs` | `http://localhost:4302/discover` | Runnable preview |
| Telegram reports | Node scripts using env credentials | `node scripts/telegram/report-loop.mjs` | Telegram group | Runnable when env vars exist |

## Not Store-Buildable Yet

| Target | Reason | Required Next Work |
| --- | --- | --- |
| Android APK/AAB | Debug APK exists for local mock testing; install smoke runner exists but no Android device/emulator is connected; release signing, internal testing track, and store-ready AAB do not exist yet | Connect device/emulator, install debug APK, add release signing config, generate AAB, and prepare Play internal testing |
| iOS IPA/TestFlight | iOS project exists and Mac build script/export options are prepared, but this Windows machine cannot run Xcode or produce an installable IPA | Run `npm run ipa:build-mac` on macOS with Xcode and Apple signing, then distribute via `build/ios/ipa/*.ipa` for ad hoc or TestFlight after App Store Connect upload |
| Production homepage | Next-style files exist but dependencies/build have not been installed and verified in this workspace | Install dependencies, run `next build`, fix compile/runtime issues |
| Production backend | Preview API exists but NestJS project/controllers/database are not installed yet | Create NestJS app, implement controllers/services, add PostgreSQL migrations |
| Production admin | Preview admin exists but Next.js admin app is not generated/build-verified yet | Generate Next.js admin app, connect backend APIs, add auth guard |

## Immediate Build Strategy

1. Keep local preview running for product decisions and visible-surface completeness.
2. Convert mobile first into a real Flutter project because App Store / Google Play release depends on it.
3. Convert backend preview routes into NestJS controllers and PostgreSQL persistence.
4. Convert admin and homepage into build-verified Next.js apps.
5. Only after the above, start Android internal testing and iOS TestFlight.

## Build Version Labels

| Version | Meaning | Current Status |
| --- | --- | --- |
| `preview-0.1` | Local browser/API preview across homepage, admin, mobile, and backend | Available |
| `flutter-mvp-0.1` | Installable Flutter dev build with mock repositories | Debug APK built; device install smoke pending |
| `ios-mvp-0.1` | iPhone-testable signed IPA or TestFlight build | Mac/Xcode build path prepared; IPA not produced on Windows |
| `api-mvp-0.1` | NestJS API with database-backed MVP contracts | Not started |
| `store-alpha-0.1` | Android internal testing / iOS TestFlight candidate | Blocked by real app build and store accounts |

## External Blockers

- Apple Developer account for iOS signing and TestFlight.
- Google Play Console account for Android internal testing.
- Production signing keys, app identifiers, and store listing identity.
- SMS/identity/payment vendors for production login and monetization.

These blockers do not stop local implementation. They only stop final store submission and production credential wiring.

## Restart Note

After the 2026-05-18 computer restart, homepage, mobile, and admin previews were restarted and verified on their default ports. Port `4100` responded with an unrelated 404, so the backend preview was restarted on fallback port `4332` and verified with `/health`, `/v1/wallet/ledger`, and `/v1/admin/suspensions`.
