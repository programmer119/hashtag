# API Payloads

Owner: Dalton / Backend API

Lead integration: Codex

Purpose: define stable request/response payload shapes for the Hashdate MVP preview-to-NestJS transition.

## Conventions

- Timestamps are ISO 8601 strings.
- IDs are opaque strings and must not expose database sequence numbers.
- Money-like values use integer minor units or integer diamonds.
- Error shape:

```json
{
  "code": "INSUFFICIENT_DIAMONDS",
  "message": "Not enough diamonds to unlock this profile.",
  "details": {
    "required": 10,
    "balance": 5
  }
}
```

## Auth

### POST `/v1/auth/dev-login`

Request:

```json
{
  "email": "preview@hashdate.local",
  "hasProfile": true
}
```

Response:

```json
{
  "accessToken": "dev-access-token",
  "refreshToken": "dev-refresh-token",
  "user": {
    "id": "u_preview_001",
    "nickname": "Mina",
    "status": "approved",
    "diamonds": 120
  },
  "nextRoute": "/app/discovery"
}
```

### POST `/v1/auth/phone/start`

Request:

```json
{
  "phoneNumber": "+821012345678"
}
```

Response:

```json
{
  "verificationId": "otp_123",
  "expiresInSeconds": 180,
  "retryAfterSeconds": 30
}
```

### POST `/v1/auth/phone/verify`

Request:

```json
{
  "verificationId": "otp_123",
  "code": "123456"
}
```

Response follows the `dev-login` session response shape.

## Users

### GET `/v1/users/me`

Response:

```json
{
  "user": {
    "id": "u_preview_001",
    "nickname": "Mina",
    "status": "approved",
    "diamonds": 120
  },
  "onboardingState": "approved",
  "profileId": "p_preview_me"
}
```

## Profiles

### GET `/v1/profiles/me`

Response:

```json
{
  "profile": {
    "id": "p_preview_me",
    "userId": "u_preview_001",
    "nickname": "Mina",
    "age": 31,
    "city": "Seoul",
    "occupation": "Product designer",
    "tags": ["weekend hiking", "long-term", "coffee"],
    "reviewStatus": "approved"
  }
}
```

### PUT `/v1/profiles/me`

Request:

```json
{
  "nickname": "Mina",
  "birthYear": 1995,
  "city": "Seoul",
  "occupation": "Product designer",
  "tags": ["weekend hiking", "long-term"],
  "intro": "Looking for something intentional."
}
```

Response:

```json
{
  "profile": {
    "id": "p_preview_me",
    "reviewStatus": "pending"
  }
}
```

## Discovery

### GET `/v1/discovery/swipe-deck`

Response:

```json
{
  "candidates": [
    {
      "profileId": "p_2001",
      "nickname": "Joon",
      "age": 34,
      "city": "Bundang",
      "locked": true,
      "unlockCost": 10,
      "intro": "Founder, tennis on Sundays, looking for a serious relationship."
    }
  ]
}
```

### POST `/v1/discovery/swipes`

Request:

```json
{
  "profileId": "p_2001",
  "action": "like"
}
```

Response:

```json
{
  "recorded": true,
  "action": "like",
  "profileId": "p_2001",
  "matchCreated": true
}
```

## Wallet

### GET `/v1/wallet`

Response:

```json
{
  "balance": 120,
  "currency": "diamonds"
}
```

### GET `/v1/wallet/ledger`

Response:

```json
{
  "entries": [
    {
      "id": "led_1",
      "type": "unlock_spend",
      "amount": -10,
      "balanceAfter": 110,
      "reason": "Profile detail unlock",
      "createdAt": "2026-05-16T00:00:00.000Z"
    }
  ]
}
```

### POST `/v1/profiles/:profileId/unlocks`

Response:

```json
{
  "profileId": "p_2001",
  "unlocked": true,
  "charged": true,
  "chargedDiamonds": 10,
  "balance": 110
}
```

If already unlocked:

```json
{
  "profileId": "p_2001",
  "unlocked": true,
  "charged": false,
  "chargedDiamonds": 0,
  "balance": 110
}
```

## Matches and Chat

### GET `/v1/matches`

Response:

```json
{
  "matches": [
    {
      "matchId": "m_3001",
      "profileId": "p_2001",
      "nickname": "Joon",
      "latestMessage": "Nice to meet you here.",
      "unreadCount": 1
    }
  ]
}
```

### GET `/v1/chat/rooms`

Response:

```json
{
  "rooms": [
    {
      "roomId": "room_m_3001",
      "matchId": "m_3001",
      "title": "Joon",
      "latestMessage": "Nice to meet you here.",
      "unreadCount": 1
    }
  ]
}
```

### GET `/v1/chat/rooms/:roomId/messages`

Response:

```json
{
  "messages": [
    {
      "id": "msg_1",
      "sender": "match",
      "text": "Nice to meet you here.",
      "sentAt": "2026-05-16T00:00:00.000Z"
    }
  ]
}
```

## Reports

### POST `/v1/reports`

Request:

```json
{
  "targetUserId": "u_2001",
  "targetType": "profile",
  "reasonCode": "inappropriate_content",
  "detail": "Profile contained unsafe content."
}
```

Response:

```json
{
  "reportId": "r_9001",
  "status": "open"
}
```

## Support and Account Deletion

### POST `/v1/support/requests`

Request:

```json
{
  "email": "owner@example.com",
  "category": "account",
  "subject": "I need help",
  "message": "Please contact me about my account."
}
```

Response:

```json
{
  "requestId": "sup_1001",
  "status": "open"
}
```

### POST `/v1/users/me/deletion-requests`

Request:

```json
{
  "reasonCode": "privacy",
  "reasonText": "I want to delete my account."
}
```

Response:

```json
{
  "requestId": "del_1001",
  "status": "pending",
  "scheduledDeletionDate": "2026-06-15"
}
```

