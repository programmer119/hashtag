# Mobile App

Owner: Mobile Agent

Target stack: Flutter / Dart.

This folder owns the iOS/Android client for the Hashtag MVP. It intentionally starts as a lightweight Flutter-ready structure instead of a generated Flutter project, so agents can plan and review without requiring Flutter to be installed locally.

## Dependency-Free Preview

The preview server uses only Node built-ins and mirrors the planned Flutter app information architecture in a browser:

```text
node scripts/dev-server.mjs
```

Default port: `4302`.

Preview routes:

- `/auth`
- `/profile`
- `/review`
- `/discover`
- `/unlock`
- `/matches`
- `/chat`
- `/wallet`
- `/safety`

## Current Deliverables

- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md): mobile implementation plan, navigation map, screen ownership, state management, API boundary, and first milestones.
- [docs/MOCK_DATA.md](docs/MOCK_DATA.md): dependency-free fixture plan for auth, onboarding, discovery, matches, chat, wallet, settings, and safety.
- [docs/POINCARE_WORKLIST.md](docs/POINCARE_WORKLIST.md): mobile-owned worklist and current progress.
- [docs/POINCARE_PROGRESS.md](docs/POINCARE_PROGRESS.md): mobile-owned progress log.
- [docs/PREVIEW_SERVER.md](docs/PREVIEW_SERVER.md): dependency-free browser preview notes.
- [lib/app/app_shell.dart](lib/app/app_shell.dart): placeholder app shell contract.
- [lib/app/mock_app_skeleton.dart](lib/app/mock_app_skeleton.dart): single registry of mock screen specs for the first generated Flutter flow.
- [lib/core/routing/app_routes.dart](lib/core/routing/app_routes.dart): route names and navigation map placeholders.
- [lib/core/api/api_client.dart](lib/core/api/api_client.dart): API client boundary placeholders.
- [lib/core/mock/mock_screen_models.dart](lib/core/mock/mock_screen_models.dart): no-dependency mock screen and entity contracts.
- `lib/features/*/README.md`: feature responsibilities and first screens.
- `lib/features/*/screens/*_placeholders.dart`: Flutter-ready screen specs for the MVP mock flow.

## Intended Flutter Stack

- Flutter / Dart
- go_router for declarative navigation
- Riverpod for app state and async boundaries
- Dio or package:http behind a small API client boundary
- Secure storage for access and refresh tokens

## Local Setup Note

Do not run dependency installation from this folder until the project lead decides whether to generate the Flutter project in place or create it elsewhere and merge these planning files.
