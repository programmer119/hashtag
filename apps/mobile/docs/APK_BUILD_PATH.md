# APK Build Path

Owner: Poincare / Mobile App Agent

Last updated: 2026-05-17

## Current State

The mobile folder now contains the first real Flutter app source path:

- `pubspec.yaml`
- `analysis_options.yaml`
- `lib/main.dart`
- `lib/app/hashdate_mock_app.dart`
- `lib/core/mock/mock_app_data.dart`

Android debug APK now builds through project-local Flutter and JDK tooling.

Current APK:

```text
build/app/outputs/flutter-apk/app-debug.apk
```

## What Is Included

- Material app entry point.
- Bottom navigation for Discover, Matches, Wallet, and Safety.
- Mock discovery deck with like/pass.
- Diamond balance display.
- One-time 10 diamond profile unlock with duplicate-charge guard.
- Match/chat preview list.
- Wallet ledger preview.
- Safety/report/block placeholder surface.

## Verification

Run from `apps/mobile`:

```text
npm run toolchain:check
npm run apk:readiness
```

Expected result in the current environment:

```text
Required source files: ready
Flutter toolchain: missing from PATH
Android platform folder: missing; run flutter create .
ADB: available
Next command after Flutter install: flutter create . && flutter pub get && flutter build apk --debug
```

## Build Commands After Flutter Is Available

```text
npm run apk:build-debug
```

`npm run apk:build-debug` expands to:

```text
node scripts/build-debug-apk.mjs
```

The runner performs:

```text
flutter --version
flutter create .
flutter pub get
flutter build apk --debug
```

It writes the latest attempt to `docs/APK_BUILD_EVIDENCE.md`.

## Local Toolchain Snapshot

- Git is available.
- ADB is available from the existing Android platform-tools path.
- Winget was not found on PATH.
- Project-local Flutter 3.41.9 is available under `.tooling/flutter`.
- Project-local JDK 17 is available under `.tooling/jdk17`.
- ADB is available from the existing Android platform-tools path.
- Winget was not found on PATH.

## Latest Build Result

```text
APK built: build/app/outputs/flutter-apk/app-debug.apk
Size: 144,554,802 bytes
Widget smoke tests: passed
Device install smoke: pending; no connected Android device was listed by adb devices
```

## Remaining APK Work

- Install debug APK on a connected Android device or emulator.
- Run `npm run apk:install-smoke`.
- Record launch, discovery, unlock, wallet, and safety smoke evidence.
- Add release signing config for AAB/internal testing later.
