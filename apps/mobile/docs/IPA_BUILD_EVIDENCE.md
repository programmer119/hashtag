# IPA Build Evidence

Last attempted: 2026-05-18T09:10+09:00

Summary: blocked on current Windows machine. A valid iPhone-testable `.ipa` requires macOS, Xcode, Apple signing, and either registered-device ad hoc export or TestFlight/App Store Connect upload.

## Current Local Result

The Flutter iOS project exists:

- `ios/Runner.xcodeproj`
- `ios/Runner.xcworkspace`
- `ios/Runner`
- `ios/ExportOptions.ad-hoc.plist`
- `ios/ExportOptions.app-store.plist`

The current Windows Flutter toolchain cannot build IPA:

```text
flutter build ipa
Could not find a subcommand named "ipa" for "flutter build".
```

## Mac Build Command

On a macOS build machine with Xcode and Apple signing configured:

```bash
cd apps/mobile
chmod +x scripts/build-ios-ipa.sh
IPA_EXPORT_METHOD=ad-hoc scripts/build-ios-ipa.sh
```

For TestFlight/App Store Connect export:

```bash
cd apps/mobile
IPA_EXPORT_METHOD=app-store scripts/build-ios-ipa.sh
```

## Download Location After Successful Build

The generated IPA will be under:

```text
apps/mobile/build/ios/ipa/*.ipa
```

For owner testing on a physical iPhone, the practical download/distribution path is:

- TestFlight link after uploading an app-store signed build to App Store Connect.
- Ad hoc `.ipa` file only after the iPhone UDID is registered in the Apple Developer account and the build is signed with the matching provisioning profile.

Unsigned or Windows-built pseudo-IPA files are not installable on normal iPhones, so Hashdate will not count an IPA as complete until it is produced by macOS/Xcode signing.
