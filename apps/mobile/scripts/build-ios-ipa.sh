#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "IPA builds require macOS with Xcode. Current platform: $(uname -s)" >&2
  exit 1
fi

if ! command -v flutter >/dev/null 2>&1; then
  echo "Flutter is required on the macOS build machine." >&2
  exit 1
fi

if ! command -v xcodebuild >/dev/null 2>&1; then
  echo "Xcode command line tools are required on the macOS build machine." >&2
  exit 1
fi

EXPORT_METHOD="${IPA_EXPORT_METHOD:-ad-hoc}"
EXPORT_OPTIONS="ios/ExportOptions.${EXPORT_METHOD}.plist"

if [[ ! -f "$EXPORT_OPTIONS" ]]; then
  echo "Missing export options plist: $EXPORT_OPTIONS" >&2
  echo "Use IPA_EXPORT_METHOD=ad-hoc or IPA_EXPORT_METHOD=app-store." >&2
  exit 1
fi

flutter pub get
flutter build ipa --release --export-options-plist="$EXPORT_OPTIONS"

IPA_PATH="$(find build/ios/ipa -maxdepth 1 -name '*.ipa' -print -quit)"
if [[ -z "$IPA_PATH" ]]; then
  echo "Build finished but no IPA was found in build/ios/ipa." >&2
  exit 1
fi

echo "IPA ready: $ROOT/$IPA_PATH"
