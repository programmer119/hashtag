# Mobile Mock Data

This document defines dependency-free fixture data for the first clickable Flutter skeleton. Keep values local to mobile until backend contracts are finalized.

## Personas

| Id | State | Purpose |
| --- | --- | --- |
| `visitor_phone` | signed out | Phone auth and OTP happy path |
| `visitor_email` | signed out | Email auth and OTP happy path |
| `new_member_draft` | onboarding | Profile draft, photos, tags, submit for review |
| `pending_member` | review pending | Approval gate and refresh status |
| `approved_member` | approved | Discovery, matches, chat, wallet, settings |
| `low_balance_member` | approved | Unlock flow with insufficient diamonds |

## Profile Fixtures

| Id | Display | Visibility | Notes |
| --- | --- | --- | --- |
| `profile_aria` | Aria, 29, Seoul | partially locked | Discovery card with premium fields hidden |
| `profile_min` | Min, 32, Busan | unlocked | Profile detail after diamond unlock |
| `profile_joon` | Joon, 30, Incheon | matched | Match detail and chat thread |
| `profile_hidden` | Hidden member | blocked | Blocked user list and unblock test |

Common profile fields:

- `photos`: ordered local asset placeholders, no external image dependency yet.
- `basics`: nickname, age display, region, occupation summary.
- `tags`: interests, lifestyle, relationship intent.
- `premium`: education detail, company detail, profile verification note.
- `safety`: reportable id, blocked state, moderation labels.

## Discovery Deck

Default deck:

1. `profile_aria`: locked premium details, unlock cost `30` diamonds.
2. `profile_min`: visible unlocked detail, shared tags.
3. Empty deck state after pass/like actions.

Mock outcomes:

- `like(profile_aria)`: optimistic removal and possible match banner disabled.
- `like(profile_joon)`: mutual match banner and route to match detail.
- `pass(any)`: optimistic removal with undo placeholder.
- `unlock(profile_aria)`: deducts diamonds if balance is at least `30`.

## Matches And Chat

Match fixtures:

| Thread | Match | Last State |
| --- | --- | --- |
| `thread_joon` | `profile_joon` | unread incoming message |
| `thread_min` | `profile_min` | sent message pending |

Message fixtures:

- Incoming text message.
- Outgoing delivered message.
- Outgoing pending message.
- Failed message with retry action.
- Reportable message id for report-message flow.

## Wallet

Balances:

- `approved_member`: `120` diamonds.
- `low_balance_member`: `10` diamonds.

Product placeholders:

| Product Id | Diamonds | Label |
| --- | ---: | --- |
| `diamonds_small` | 30 | Starter |
| `diamonds_medium` | 100 | Popular |
| `diamonds_large` | 300 | Best value |

Transactions:

- Purchase pending receipt confirmation.
- Profile unlock debit.
- Support-adjusted credit placeholder.

## Settings And Safety

Settings fixtures:

- Notifications enabled.
- Marketing notifications disabled.
- Account deletion request not started.
- Legal links point to route placeholders.

Safety fixtures:

- Report reasons: spam, harassment, fake profile, inappropriate photo, other.
- Report draft with optional text details.
- Blocked user list containing `profile_hidden`.
- Report submission success and network error states.

## Fixture Storage Plan

When Flutter generation is approved, add these as plain Dart fixtures under `lib/core/mock/fixtures/` and expose them through mock repositories. Do not bind widgets directly to these fixture maps.
