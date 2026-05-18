# Runtime Mode

Hashdate mobile can start with local mock data or a hydrated REST preview snapshot.

## Default

The default build uses mock data:

```bash
flutter run
```

## REST Preview

For Android emulator testing against the local backend preview on the development machine:

```bash
flutter run --dart-define=HASHDATE_REPOSITORY_MODE=rest --dart-define=HASHDATE_API_BASE_URL=http://10.0.2.2:4332
```

For iOS simulator on a Mac running the backend preview locally:

```bash
flutter run --dart-define=HASHDATE_REPOSITORY_MODE=rest --dart-define=HASHDATE_API_BASE_URL=http://127.0.0.1:4332
```

For a physical phone, replace `HASHDATE_API_BASE_URL` with the development machine LAN URL.

## Current Behavior

- Mock mode renders immediately from local fixtures.
- REST mode shows a loading screen while hydrating `/v1/users/me`, `/v1/discovery/swipe-deck`, `/v1/wallet/ledger`, and `/v1/chat/rooms/room_m_3001/messages`.
- REST errors render a clear failure screen instead of crashing or silently falling back.
