# Diamond Policy

Diamonds are the MVP virtual currency used for premium profile unlocks. The first launch should keep the economy simple so the product can be tested without creating payment and refund complexity too early.

## Currency Principles

- Diamonds are consumed only by explicit user actions.
- The app must show the cost before spending.
- The server is the source of truth for balance.
- Wallet history is append-only.
- Repeated access to the same unlocked profile must not charge again.
- Admin adjustments require a reason and must be auditable.

## MVP Diamond Uses

| Action | Cost | Notes |
| --- | ---: | --- |
| View basic swipe card | 0 | Free discovery keeps the core loop active. |
| Like | 0 | Likes are free in MVP to avoid early liquidity problems. |
| Premium profile detail unlock | 10 diamonds | Unlocks configured premium fields for one target profile. |
| Chat after mutual match | 0 | Chat is free after match. |
| Report or block | 0 | Safety actions must never cost diamonds. |

## Premium Fields for MVP Unlock

Before unlock, the profile may show:

- Main photo and basic profile preview.
- Nickname or display alias.
- Age range or birth-year-derived age display.
- Location area.
- A short intro excerpt.
- Public lifestyle tags.

After unlock, the profile may additionally show:

- Full introduction.
- Occupation text.
- Education text.
- Additional lifestyle tags or prompts.
- Additional approved photos if the design chooses to lock some photos.

Sensitive personal contact details must not be part of MVP unlock.

## Ledger Entry Types

| Type | Direction | Created By | MVP Use |
| --- | --- | --- | --- |
| purchase | Credit | Store/payment service | Real IAP after store setup. |
| test_purchase | Credit | Test build/payment stub | Internal and beta testing. |
| grant | Credit | Admin | Promotions, compensation, manual seeding. |
| spend_unlock | Debit | User action | Premium profile unlock. |
| refund | Credit | Admin | Customer support resolution. |
| adjustment_debit | Debit | Admin | Manual correction with reason. |

## Duplicate Charge Prevention

For every unlock request, the server should:

1. Authenticate viewer.
2. Check viewer status is approved and not suspended.
3. Check target profile is eligible to view.
4. Check whether an unlock already exists for viewer and target.
5. If unlock exists, return unlocked state with no ledger entry.
6. If unlock does not exist, verify balance is at least the required cost.
7. In one transaction, create spend ledger entry and unlock record.
8. Return updated balance and unlocked profile payload.

## Purchase Policy

- MVP can include store product placeholders and test purchase simulation.
- Production sale of diamonds requires Apple/Google product IDs, store metadata, receipt validation, and refund handling.
- The app must not sell diamonds outside Apple/Google in-app purchase for digital features.
- Diamond packs should be simple at launch: small, medium, large.
- Bonus diamonds and subscriptions are deferred.

## Admin Adjustment Rules

- Admin must select adjustment type and enter a reason.
- Negative adjustments cannot make balance negative unless a super-admin override exists in a later phase.
- Ledger entries cannot be edited or deleted.
- Member detail should show recent wallet events.

## Phase 2 Economy Candidates

- Channel-specific unlock costs such as 5, 10, and 20 diamonds.
- Premium like with attached contact information.
- Subscription or membership tier.
- Promotional coupon codes.
- Store receipt validation and refund webhook automation.
