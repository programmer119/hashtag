# Project Principles

## P-001 Benchmark Completeness

Hashtag must include every visible user-facing feature, page, menu, and core UX pattern found in the benchmark premium dating app category, with SkyPeople as the primary benchmark.

This includes:

- All visible navigation areas
- All user-facing pages and states
- All onboarding, profile, discovery, matching, chat, wallet, payment, safety, and settings flows
- All major UI/UX patterns that affect how users understand and use the service

## P-002 Client Requirements Completeness

Hashtag must also include every feature requested by the client brief unless explicitly moved to a later phase by the project owner.

Client-requested requirements include:

- Document-based verification
- Private matching
- Anonymous community matching
- Appearance-first, profile-first, and community-based matching channels
- Channel-specific paid information unlocks
- Diamond wallet and in-app purchases
- Double-charge prevention across channels
- Premium contact-attached like
- Admin review, abuse management, and statistics
- Secure storage, encrypted access, and deletion flow for sensitive documents
- Phase 2-ready data structure for AI curation and NLP matching

## P-003 Original Implementation

Benchmarking means functional and experiential coverage, not copying protected creative assets.

Hashtag must use its own:

- Brand identity
- Visual style
- Icons and illustrations
- Copywriting
- Layout details
- Interaction polish

The goal is to cover the same or broader product surface while building an original, legally safer product.

## P-004 Audit Before Build

Before implementing a benchmarked area, the team must perform a feature and screen audit.

Audit output should identify:

- Benchmark feature or screen
- Hashtag equivalent
- MVP or Phase 2 placement
- Required backend/admin support
- Open policy or compliance questions

## P-005 Autonomous Continuation

When the project owner is not actively using Codex, the team should continue work that clearly falls under P-001 Benchmark Completeness and P-002 Client Requirements Completeness.

This means the team should keep advancing:

- Benchmark feature and screen audits
- Client requirement decomposition
- Product specifications
- App, server, admin, QA, and release implementation tasks
- Progress tracking and missing-scope detection

The team should not wait for the project owner on decisions that are already covered by existing principles, accepted scope, or documented architecture.

## P-006 Owner Decision Boundary

Autonomous continuation must pause only when a decision materially affects business identity, legal risk, payment policy, user eligibility policy, or launch commitments.

Examples that require owner confirmation:

- Final app name and brand identity
- Real-world verification criteria
- Diamond pricing and refund policy
- Legal policy publication
- Store submission timing
- Production credential use

## P-007 No-Question Execution Mode

The project owner does not want to be used as an approval bottleneck.

From this point forward, the Lead Architect should make all product, technical, UI, UX, architecture, scope-ordering, and implementation decisions unless the decision requires real-world owner-controlled assets.

The team should keep working without asking questions.

Owner-controlled blockers are limited to:

- Apple Developer account access
- Google Play Console access
- Real payment merchant or in-app purchase account setup
- Real SMS, identity verification, or cloud production credentials
- Final legal publication using real business identity
- Final trademark, domain, or company registration actions

When blocked by one of these, continue all parallel work that does not require the blocked asset and record the blocker in progress docs.
