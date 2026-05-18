# Poincare Progress

Owner: Poincare / Mobile App Agent

Current progress: 83%

## 2026-05-18

Added the iOS IPA build path:

- `ios/ExportOptions.ad-hoc.plist`
- `ios/ExportOptions.app-store.plist`
- `scripts/build-ios-ipa.sh`
- `docs/IPA_BUILD_EVIDENCE.md`
- `npm run ipa:build-mac`

The current Windows machine cannot produce a valid `.ipa`; Flutter on Windows does not expose `flutter build ipa`, and iPhone-installable builds require macOS, Xcode, and Apple signing. The project is ready for a macOS build runner to output the IPA under `build/ios/ipa/*.ipa` after signing is configured.

Added runtime repository selection:

- `lib/app/app_runtime.dart`
- `lib/core/api/live_api_client.dart`
- `lib/core/repositories/repository_mode.dart`
- `docs/RUNTIME_MODE.md`

`HashdateAppRoot` now chooses mock mode by default and REST mode with `--dart-define=HASHDATE_REPOSITORY_MODE=rest`. REST mode hydrates the repository snapshot from the preview API, displays a loading screen while requests run, and displays a clear error screen if the backend is unreachable. Flutter tests passed again, and the Android debug APK was rebuilt after the runtime mode work.

Added SkyPeople-style auth entry screens:

- Purple membership entry screen with login and signup routes.
- Login screen with prefilled test credentials `test1 / test1`.
- Signup condition screen with male/female eligibility cards inspired by benchmark screenshots.
- Auth gate now blocks the main app until test login or signup completion.

Flutter widget coverage now includes the auth gate, test login, signup condition switching, and the existing discovery/wallet/chat/safety flows. Ten Flutter tests passed, and the Android debug APK was rebuilt after the auth work.

Expanded benchmark-style visible mock coverage:

- Start screen now has a Korean/English language switch with Korean selected by default.
- Main app tabs use Korean labels for the current default locale.
- Added a full-screen mock catalog under the menu tab covering signup/verification, matching, communication, payment, account, support, acquaintance blocking, notifications, and operations-facing surfaces that are not yet wired to real backend flows.
- Flutter widget coverage now checks the Korean default, English switch, and benchmark mock catalog navigation.

Twelve Flutter tests passed, and the Android debug APK was rebuilt after the language and mock-screen coverage work.

## 2026-05-17

Created a richer Flutter-ready, no-dependency mobile mock app skeleton under `apps/mobile`.

Completed artifacts:

- Added shared mock screen model contracts.
- Added a single mock app skeleton registry for generation handoff.
- Added screen placeholder specs for auth, onboarding/profile, review pending, discovery swipe, profile detail/unlock, matches, chat, wallet, settings, and report/block.
- Added safety/report-block feature area.
- Added mobile mock data documentation covering personas, fixture profiles, discovery deck behavior, matches, chat, wallet, settings, and safety.
- Updated mobile route constants, app README, implementation plan, and Poincare worklist.
- Added local browser-preview interactions for profile submit/reset, discovery like/pass, unlock diamond deduction with no double-charge display, chat send/report navigation, wallet grant, and safety report/block states.
- Smoke-checked `/discover`, `/unlock`, `/chat`, `/profile`, and `/safety` on `localhost:4322`; each returned 200 and included action controls.

Progress moved from 22% to 40% because the dependency-free mobile preview now has clickable mock behavior for the main MVP flows, but no generated Flutter project, widgets, navigation runtime, state controllers, repositories, or tests yet.

Added the first installable-app source path for the APK priority push:

- `pubspec.yaml`
- `analysis_options.yaml`
- `lib/main.dart`
- `lib/app/hashdate_mock_app.dart`
- `lib/core/mock/mock_app_data.dart`
- `scripts/apk-readiness.mjs`
- `scripts/toolchain-check.mjs`
- `scripts/build-debug-apk.mjs`
- `scripts/install-smoke.mjs`
- `docs/APK_BUILD_EVIDENCE.md`
- `docs/APK_INSTALL_EVIDENCE.md`
- `docs/APK_BUILD_PATH.md`

Progress moved from 40% to 45% because real Flutter app entry/source files were added for the mock APK path.

Toolchain checks now show Git, Flutter 3.41.9, Dart 3.11.5, Java 17, and ADB are available through project-local tooling. `npm run toolchain:check` and `npm run apk:readiness` route the next APK attempt to the exact missing step.

Added `npm run apk:build-debug` as a single APK runner. It writes `docs/APK_BUILD_EVIDENCE.md`; the latest attempt succeeded and produced `build/app/outputs/flutter-apk/app-debug.apk`.

Installed project-local Flutter and JDK 17 tooling under `.tooling`, generated Android/iOS/platform folders with `flutter create .`, built the Android debug APK, and updated `test/widget_test.dart` to smoke-test discovery unlock and wallet navigation.

Progress moved from 45% to 60% because the mobile app now has a real Flutter project, platform folders, a built debug APK, and passing widget smoke tests. It does not move higher until a device/emulator install smoke test, real repository/state split, backend integration, and release signing path exist.

Added `npm run apk:install-smoke` and `docs/APK_INSTALL_EVIDENCE.md`. The latest install attempt is blocked because `adb devices` lists no connected Android device or emulator.

Split the Flutter mock app state out of the UI:

- Added `lib/app/hashdate_mock_controller.dart`.
- Added `lib/core/mock/mock_hashdate_repository.dart`.
- Updated `lib/app/hashdate_mock_app.dart` to render from controller state instead of owning deck, wallet, and unlock logic directly in the widget.
- Re-ran `dart format`.
- Re-ran Flutter widget smoke tests: passed.
- Rebuilt `build/app/outputs/flutter-apk/app-debug.apk` after the split.

Progress moved from 60% to 62% because the mock APK is no longer a single widget-owned state blob and now has a first controller/repository boundary. It does not move higher until install smoke, fuller feature repositories, backend adapters, and release build paths exist.

Expanded the controller/repository boundary across more feature behavior:

- Added mock session/profile approval state to the discovery surface.
- Added wallet test grant behavior through `HashdateMockController`.
- Added safety case fixtures and report submission behavior through the controller.
- Extended widget smoke tests to cover approval display, wallet grant, and safety report submission.
- Rebuilt the Android debug APK after the expanded state split.

Progress moved from 62% to 64% because auth/profile context, wallet action state, and safety report state now flow through controller/repository boundaries with passing tests. It does not move higher until these boundaries are separated per feature and connected to backend API adapters.

Split the shared mock controller into feature controllers:

- `features/session/controllers/session_controller.dart`
- `features/discovery/controllers/discovery_controller.dart`
- `features/wallet/controllers/wallet_controller.dart`
- `features/safety/controllers/safety_controller.dart`

`HashdateMockController` now composes feature controllers instead of owning all feature logic directly. Flutter widget smoke tests still pass, and the Android debug APK was rebuilt after the split.

Progress moved from 64% to 66% because the app now has feature-level controller boundaries for session, discovery, wallet, and safety. It does not move higher until chat/profile controllers, backend API adapters, and device install smoke evidence exist.

Added the remaining first-pass feature controllers:

- `features/profile/controllers/profile_controller.dart`
- `features/chat/controllers/chat_controller.dart`

The discovery surface now exposes a profile review submission mock, the matches surface can send a mock chat message through `ChatController`, widget smoke coverage increased to four flows, and the Android debug APK was rebuilt after the change.

Progress moved from 66% to 68% because all MVP mock surfaces now have first-pass feature controller boundaries. It does not move higher until API adapter contracts replace mock-only repositories and install smoke runs on a device/emulator.

Added the first typed backend API adapter boundary:

- `lib/core/api/hashdate_api.dart`
- Expanded `ApiClient` with `put`.
- Added `test/hashdate_api_test.dart`.

`HashdateApi` now maps the MVP preview endpoints for dev login, current user/profile, profile save, discovery deck/swipes, profile unlock, wallet, matches, chat rooms/messages, and reports. Flutter tests now include API endpoint/body mapping plus the widget smoke flows, and the Android debug APK was rebuilt after the API boundary change.

Progress moved from 68% to 70% because the mobile app now has both feature controller boundaries and a typed REST adapter boundary. It does not move higher until controllers consume the API adapter for real async flows and install smoke runs on a device/emulator.

Added repository contract boundaries for mock and REST-backed implementations:

- `lib/core/repositories/hashdate_repository.dart`
- `lib/core/repositories/rest_hashdate_repository.dart`
- `lib/core/repositories/repository_mode.dart`
- `test/repository_contract_test.dart`

Feature controllers now depend on `HashdateRepository` instead of the mock repository type directly. The REST repository currently keeps the typed `HashdateApi` attached and throws explicit `RestRepositoryNotWired` markers until async mapping is implemented. Flutter tests now cover API mapping, repository contracts, and four widget flows; the Android debug APK was rebuilt after the boundary change.

Progress moved from 70% to 72% because controllers are no longer hardwired to mock-only repositories and the REST swap point is now explicit and tested. It does not move higher until the REST repository maps responses into app models and install smoke runs on a device/emulator.

Implemented first-pass REST response snapshot mapping in `RestHashdateRepository`:

- Current user payload maps into `MockSession`.
- Swipe deck candidates map into `MockProfile`.
- Wallet ledger entries map into `MockWalletEntry`.
- Chat messages map into `MockChatMessage`.
- Latest report payload maps into `MockSafetyCase`.

Expanded repository tests to cover hydrated preview payload mapping. Flutter tests now include API mapping, mock repository contract, REST hydration guard, REST payload mapping, and four widget flows. Android debug APK was rebuilt after the mapping change.

Progress moved from 72% to 74% because the REST repository now maps backend preview response shapes into app models. It does not move higher until controllers can hydrate from live API calls asynchronously and device/emulator install smoke evidence exists.

Added first-pass live API hydration scaffolding:

- `lib/core/repositories/rest_repository_hydrator.dart`
- `RestRepositoryHydrator.hydratePreview()` calls typed `HashdateApi` endpoints for current user, swipe deck, wallet ledger, and chat messages, then builds a `RestRepositorySnapshot`.
- `RecordingApiClient` now supports path-based response fixtures for tests.
- Repository tests now verify hydration call order and mapped repository output.

Progress moved from 74% to 76% because the app can now build a REST repository snapshot from typed API responses in tests. It does not move higher until the app can choose mock vs REST mode at runtime and handle live loading/error states in controllers.

## Remaining To Reach 50%

- Device or emulator install smoke evidence for `app-debug.apk`.
- Add runtime mock/REST repository selection and loading/error state in the app shell.
- Add per-feature controller unit tests beyond widget smoke.
- First routing and state smoke tests.
