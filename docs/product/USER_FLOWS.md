# User Flows

## Flow 1: New Member Approval

1. User opens the app and chooses sign up.
2. User enters phone or email placeholder credentials.
3. User accepts required terms, privacy policy, age confirmation, and dating-service conduct rules.
4. User completes profile basics, photos, lifestyle tags, and introduction.
5. App validates required fields and submits the profile.
6. User lands on Review Pending and cannot enter discovery yet.
7. Admin opens Review Queue and checks profile completeness, photos, and policy fit.
8. Admin approves or rejects with a controlled reason.
9. If approved, user can enter discovery.
10. If rejected, user sees the rejection reason and can edit/resubmit.

MVP constraint: no automated document verification in the first launch. Premium positioning is enforced through manual profile review and invite/waitlist controls if needed.

## Flow 2: Discovery, Unlock, Like, Match

1. Approved user opens Home Discovery.
2. App loads approved, non-blocked, non-seen candidates.
3. User can pass or like from the card.
4. User can open Profile Detail.
5. Public fields are visible; premium fields are locked.
6. User taps unlock.
7. App shows diamond cost and current balance.
8. User confirms spend.
9. Server creates one wallet ledger spend and one unlock record.
10. Premium fields become visible.
11. User likes the profile.
12. If target user already liked this user, server creates a match.
13. App shows Match Result and enables chat.

Duplicate charge rule: if an unlock record already exists for the viewer and target profile, viewing again must cost zero diamonds.

## Flow 3: Basic Chat

1. User opens Matches.
2. User selects a mutual match.
3. App opens Chat Room.
4. User sends a text message.
5. Server verifies both users are matched, not blocked, and not suspended.
6. Message is stored and delivered to the room.
7. Either user can report or block from the chat menu.

MVP constraint: text-only chat is enough for first launch. Image, voice, read receipts, reactions, and disappearing messages are deferred.

## Flow 4: Diamond Wallet

1. User opens Diamond Wallet.
2. App displays current balance and recent ledger entries.
3. User opens purchase screen.
4. App displays configured diamond packs.
5. In test builds, purchase can use a mocked successful purchase event.
6. In production, Apple/Google products and receipt validation must be enabled before real sale.
7. Server records purchase or grant as a wallet ledger entry.
8. Balance updates.

MVP constraint: all wallet changes must go through a server-side ledger. The app must never calculate final balance locally.

## Flow 5: Report and Moderation

1. User taps Report from a profile or chat.
2. User selects a controlled reason and can add optional details.
3. Server creates a report item with reporter, target, source, reason, and status.
4. Admin opens Report Queue.
5. Admin reviews context and chooses dismiss, warn, suspend, or escalate.
6. If suspended, target user loses discovery, like, chat send, and purchase access.
7. Reporter does not receive detailed private outcome information.

## Flow 6: Admin Manual Diamond Adjustment

1. Admin opens Member Detail or Ledger Search.
2. Admin chooses manual adjustment.
3. Admin enters amount, adjustment type, and required reason.
4. Server creates a ledger entry with admin ID.
5. Member balance updates.

MVP constraint: adjustments are auditable and append-only. Admins cannot edit or delete prior ledger entries.
