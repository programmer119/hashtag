# Mobile Implementation Plan

## Role Boundary

The Mobile Agent owns only `apps/mobile`. The app consumes backend APIs and does not define final server schema, admin workflows, or payment provider implementation details. When a contract is unclear, record the open question in this plan and keep UI code behind mockable repositories.

## Product Goal

Ship a focused Flutter MVP for iOS and Android:

- Account entry and approval-aware onboarding
- Profile setup with photos, attributes, lifestyle tags, and introduction
- Swipe discovery for approved users
- Like, pass, mutual match, and basic chat
- Diamond balance and premium profile unlock UI
- Settings, report, and account safety flows

## Recommended State Management

Use Riverpod with a simple feature-layer split:

- `StateProvider` or `Notifier` for small UI state such as selected tabs, form steps, and filters.
- `AsyncNotifier` for network-backed state such as session, profile, discovery deck, matches, chat threads, and wallet.
- Repositories wrap `ApiClient` and expose typed methods to feature notifiers.
- Keep models immutable. Prefer generated models later, but hand-written DTOs are acceptable for the first MVP.

Rationale: Riverpod keeps app state independent from widget trees, is testable without Flutter integration, and handles async loading/error states clearly.

## API Client Boundary

Mobile should call backend through one boundary:

```text
features/* UI
  -> feature controller/notifier
    -> feature repository
      -> core/api ApiClient
        -> Backend REST API
```

Initial API groups:

- `AuthApi`: start phone/email login, verify code, refresh session, logout.
- `ProfileApi`: get my profile, save profile draft, upload photo metadata, submit for review.
- `DiscoveryApi`: fetch swipe deck, like, pass, unlock profile detail.
- `MatchApi`: list matches, get match detail.
- `ChatApi`: list threads, list messages, send message.
- `WalletApi`: get balance, list transactions, request diamond product catalog, confirm purchase placeholder.
- `ReportApi`: report user or message.

Do not let UI widgets directly know HTTP URLs, tokens, or response shapes.

## Navigation Map

```text
/splash
  -> /auth/welcome
  -> /review/pending
  -> /app/discovery

/auth/welcome
  -> /auth/phone
  -> /auth/email

/auth/phone
  -> /auth/code
  -> /onboarding/profile

/onboarding/profile
  -> /onboarding/photos
  -> /onboarding/tags
  -> /onboarding/submit
  -> /review/pending

/app
  /app/discovery
    -> /profile/:userId
    -> /wallet/unlock
  /app/matches
    -> /matches/:matchId
    -> /chat/:threadId
  /app/wallet
    -> /wallet/store
  /app/settings
    -> /settings/account
    -> /settings/safety

/profile/:userId
  -> /report/user/:userId
  -> /block/user/:userId

/chat/:threadId
  -> /report/message/:messageId
  -> /block/user/:userId

/settings/safety
  -> /settings/safety/blocked-users
```

## Screen Responsibilities

### Auth

- Welcome screen: brand, login method selection, policy links.
- Phone/email entry: capture identifier and request verification code.
- Code verification: verify OTP, handle retry, show rate limit message.
- Session restore: handled by splash using secure token storage.

### Onboarding/Profile

- Profile basics: nickname, birth year, gender, region, occupation summary.
- Photos: local selection UI and upload progress placeholder.
- Tags: lifestyle, interests, relationship intent.
- Submit: review checklist and submit profile for admin approval.
- Pending review: explain approval state and refresh status.

### Discovery

- Swipe deck: card stack with photo-first summary and like/pass actions.
- Profile preview: locked premium fields and unlock CTA.
- Empty deck: waitlist/refresh state.
- Error state: retry and support path.

### Matches

- Match list: mutual matches ordered by latest activity.
- Match detail: profile summary and chat entry.

### Chat

- Thread list entry from matches.
- Message list with pagination-ready structure.
- Composer with send pending/error state.
- Report/block shortcut.

### Wallet

- Balance overview.
- Diamond transaction list.
- Store product list placeholder for Apple/Google IAP.
- Unlock confirmation sheet showing cost before deduction.

### Settings/Safety

- Account info.
- Notification settings placeholder.
- Safety/report history placeholder.
- Blocked users list and unblock confirmation.
- Logout and account deletion request entry.

### Report/Block

- Report user with structured reasons, optional details, and block-after-report toggle.
- Report message with message preview and conversation context.
- Block user confirmation from profile, match, or chat.
- Blocked users list from settings safety.

## Placeholder Folder Structure

```text
lib/
  app/
    app_shell.dart
  core/
    api/
      api_client.dart
    mock/
      mock_screen_models.dart
    routing/
      app_routes.dart
  features/
    auth/
    profile/
    discovery/
    matches/
    chat/
    wallet/
    settings/
    safety/
test/
```

## Current Mock Skeleton

The current mobile folder includes dependency-free screen specs under `lib/features/*/screens/` and fixture guidance in `docs/MOCK_DATA.md`. These are not Flutter widgets yet; they are stable contracts for the first generated Flutter implementation.

## First Implementation Milestones

1. Generate Flutter project in `apps/mobile` after lead approval and preserve this plan.
2. Add app theme, app shell, bottom navigation, and route skeleton.
3. Implement mock repositories for auth, profile, discovery, matches, chat, and wallet.
4. Build clickable MVP flow with mock data and no backend dependency.
5. Replace mocks with `ApiClient` repositories as backend endpoints stabilize.
6. Add secure token storage, session restore, and approval-gated navigation.
7. Add photo upload flow using signed upload URL contract.
8. Add wallet unlock confirmation and transaction refresh.
9. Add smoke tests for critical navigation and state transitions.
10. Prepare Android internal testing and iOS TestFlight build checklist.

## Open Contract Questions

- Exact login method for MVP: phone, email, or both?
- Whether profile approval blocks all discovery or allows limited browsing.
- Diamond unlock costs for MVP screens.
- Chat transport for MVP: REST polling first or websocket immediately.
- Product IDs for Apple/Google diamond packages.
