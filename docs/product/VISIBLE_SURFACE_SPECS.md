# Visible Surface Specs

Owner: James / Product, Policy, Copy

Lead integration: Codex

Purpose: close MVP gaps from the SkyPeople-style benchmark audit by defining visible Hashdate app, web, and store surfaces without copying protected UI, text, or claims.

## Identity Display Rule

Hashdate dating surfaces must show nickname or alias only.

### Applies To

- Discovery cards
- Profile detail
- Like received list
- Match list
- Chat room title
- Report target summary
- Push and in-app notification copy

### Must Not Show

- Legal name
- Full phone number
- Full email address
- Raw identity document details
- Workplace/school document file names
- Contact payload attached to premium like unless explicitly accepted by the recipient in a Phase 2 flow

### Acceptance Criteria

- Mobile app never renders legal name in dating surfaces.
- Admin can view masked account identifiers only by default.
- Elevated admin reveal actions require audit logging.
- Public web uses product examples, not real or implied real member identities.

## Store Screenshot Script

Screenshots must show implemented or clearly staged Hashdate UI only. Do not reuse benchmark screenshots.

| Shot | Surface | Message | Required Implementation Evidence |
| --- | --- | --- | --- |
| 1 | Onboarding | Join a reviewed dating community | Auth/onboarding screen exists |
| 2 | Profile setup | Build a profile with intent, tags, and photos | Profile setup screen exists |
| 3 | Review pending | Profiles enter approval before discovery | Review pending screen exists |
| 4 | Discovery | Swipe through curated introductions | Discovery screen exists |
| 5 | Unlock | Unlock details for a clear diamond cost | Unlock confirmation exists |
| 6 | Match | Mutual interest opens a match | Match screen exists |
| 7 | Chat | Conversations start after matching | Chat screen exists |
| 8 | Wallet | Diamonds are transparent and ledger-backed | Wallet screen exists |
| 9 | Safety | Report, block, and account controls are reachable | Safety/settings screen exists |
| 10 | Support | Help and account deletion are clear | Support/deletion surface exists |

## Public Web Copy Rules

Hashdate public web must not publish unverifiable claims.

### Prohibited Until Evidence Exists

- Member counts
- Marriage or relationship success counts
- Awards
- Press mentions
- "100% verified" claims
- "No fake users" claims
- Claims that documents are verified if the current release only has profile review
- Testimonials without written consent

### Allowed MVP Vocabulary

- Reviewed profiles
- Approval before discovery
- Safety reporting
- Diamond unlock transparency
- Account deletion path
- Support request path
- Private identity by design

## App Permission Rationale Copy

Use short, just-in-time explanations near permission prompts.

| Permission | MVP Use | Copy Direction |
| --- | --- | --- |
| Photos | Profile photo selection | "Choose profile photos for review and discovery." |
| Camera | Optional profile photo capture | "Take a profile photo when you want to add one now." |
| Notifications | Match, chat, review status | "Receive match, chat, and review updates." |
| Contacts | Phase 2 only | "Help avoid people you may already know. Contacts are used only for privacy filtering when enabled." |

## Benchmark Coverage Decisions

- MVP covers trust through review and moderation, not full credential verification.
- MVP covers privacy through nickname-only display, masking, report/block, and account deletion.
- MVP covers paid unlock through a 10-diamond profile detail unlock with no double-charge behavior.
- Phase 2 covers community, contact avoidance, document verification, watermarking, keyword search, and premium contact-attached like.

