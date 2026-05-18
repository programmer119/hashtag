# MVP Scope

## Product Direction

Hashtag is a premium dating app for users who want curated, higher-trust matching. The first release should prove the core loop before expanding into full 3-channel matching, document-heavy verification, and anonymous community features.

The MVP should feel premium and controlled, but it must stay operationally simple enough to launch, test, and moderate with a small team.

## MVP Goal

Launch a usable iOS and Android app where approved members can:

1. Create a profile.
2. Wait for admin approval.
3. Discover other approved members through swipe cards.
4. Spend diamonds to unlock premium profile details.
5. Like, match, and chat safely.
6. Report problematic users or content.

Admin users must be able to approve members, handle reports, suspend accounts, and review wallet activity.

## Primary MVP Users

- Applicant: a new user who has signed up but is not approved yet.
- Approved member: a user who can appear in discovery, swipe, unlock, match, and chat.
- Suspended member: a user blocked from core actions because of moderation.
- Admin reviewer: an internal operator who reviews profiles, reports, and account status.

## MVP In Scope

- Phone or email-based account creation placeholder flow.
- Profile setup with photos, basic attributes, lifestyle tags, occupation/education text fields, and introduction.
- Admin approval gate before a profile enters discovery.
- Swipe card discovery for approved members.
- Like, pass, and mutual match.
- Basic 1:1 chat after mutual match.
- Diamond wallet balance.
- Diamond deduction for premium profile detail unlock.
- Unlock state remembered per viewer and target profile to prevent duplicate charges.
- Admin user review, approval, rejection, suspension, and reinstatement.
- Basic user reports and abuse queue.
- Wallet ledger for grants, purchases, spends, refunds, and adjustments.
- Minimal payment abstraction ready for Apple/Google in-app purchase integration.

## MVP Out of Scope

- Full government identity verification integration.
- Real income, car, license, or certificate document verification automation.
- Storing sensitive verification documents beyond an optional future temporary upload flow.
- Anonymous community channel.
- Profile-list channel and 3-channel paid unlock synchronization.
- AI/NLP recommendation engine.
- Contact-attached premium like.
- Production-grade fraud detection.
- Production App Store and Google Play receipt validation until store products are configured.

## Phase 2 Candidates

- Document upload with encrypted temporary object storage and scheduled deletion.
- Appearance, profile, and community 3-channel matching.
- Anonymous board and comment system.
- Contact-attached premium like.
- Apple/Google in-app purchase production receipt validation.
- Recommendation model using structured behavior logs.
- Manual invite or waitlist quality-control system.

## Launch Readiness Definition

The MVP is ready for closed beta when:

- A new user can complete onboarding and submit a profile for review.
- An admin can approve or reject that user.
- Approved users can discover, unlock, like, match, chat, block, and report.
- Diamond spends are recorded once and visible in an admin ledger.
- Suspended users are blocked from discovery, likes, chat sends, and purchases.
- Test builds pass a smoke test on at least one Android device and one iPhone.
