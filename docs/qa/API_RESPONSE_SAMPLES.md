# API Response Samples

Owner: Carver / QA Release

Captured: 2026-05-17T01:42Z

Preview server: `http://localhost:4318`

Purpose: preserve payload-level evidence for the dependency-free backend preview. These samples complement HTTP 200 smoke checks.

## GET `/v1/users/me`

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

## POST `/v1/auth/dev-login`

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

## GET `/v1/discovery/swipe-deck`

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
    },
    {
      "profileId": "p_2002",
      "nickname": "Ara",
      "age": 29,
      "city": "Songpa",
      "locked": true,
      "unlockCost": 10,
      "intro": "Doctor, slow weekends, values direct conversation."
    }
  ]
}
```

## GET `/v1/wallet`

```json
{
  "balance": 120,
  "currency": "diamonds"
}
```

## POST `/v1/profiles/p_2001/unlocks`

```json
{
  "profileId": "p_2001",
  "unlocked": true,
  "charged": true,
  "chargedDiamonds": 10,
  "balance": 110
}
```

## GET `/v1/matches`

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

## GET `/v1/chat/rooms`

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

## GET `/v1/chat/rooms/room_m_3001/messages`

```json
{
  "messages": [
    {
      "id": "msg_1",
      "sender": "match",
      "text": "Nice to meet you here.",
      "sentAt": "2026-05-16T22:13:21.452Z"
    },
    {
      "id": "msg_2",
      "sender": "me",
      "text": "Likewise. Your profile stood out.",
      "sentAt": "2026-05-17T02:12:39.463Z"
    }
  ]
}
```

## POST `/v1/reports`

```json
{
  "reportId": "r_9002",
  "reporterUserId": "u_preview_001",
  "targetUserId": "u_1003",
  "targetProfileId": "p_2002",
  "reasonCode": "inappropriate_message",
  "note": "Message crossed safety policy.",
  "status": "open",
  "createdAt": "2026-05-17T02:42:50.000Z"
}
```

## GET `/v1/reports`

```json
{
  "reports": [
    {
      "reportId": "r_9001",
      "reporterUserId": "u_preview_001",
      "targetUserId": "u_1003",
      "targetProfileId": "p_2002",
      "reasonCode": "inappropriate_message",
      "note": "Preview report from chat safety entry point.",
      "status": "open",
      "createdAt": "2026-05-17T02:42:10.000Z"
    }
  ]
}
```

## POST `/v1/admin/users/u_1003/suspensions`

```json
{
  "suspension": {
    "suspensionId": "sus_0001",
    "targetUserId": "u_1003",
    "reasonCode": "safety_review",
    "duration": "indefinite",
    "status": "active",
    "createdAt": "2026-05-17T02:43:15.000Z"
  },
  "actionedReportCount": 2
}
```

## QA Notes

- Dating payloads use `nickname` only.
- Discovery payloads expose `locked` and `unlockCost` for clear diamond unlock UX.
- Wallet payload uses integer diamonds.
- Unlock payload records charged state and remaining balance.
- Match payload avoids legal names and raw contact data.
- Chat room titles use nickname only.
- Reports use controlled reason codes and preserve alias/profile references without exposing raw contact data.
- Suspension response includes actioned report count so admin UI can reconcile queue state.
