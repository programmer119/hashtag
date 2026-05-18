# Discovery Feature

Owns swipe deck, like/pass actions, locked profile detail preview, unlock confirmation entry, and empty/error states.

First screens:

- `DiscoveryDeckScreen`
- `ProfilePreviewScreen`
- `UnlockProfileSheet`

State:

- `DiscoveryDeckController`
- `ProfileUnlockController`
- `DiscoveryRepository`

API:

- `GET /discovery/deck`
- `POST /discovery/:userId/like`
- `POST /discovery/:userId/pass`
- `POST /profiles/:userId/unlock`
