# Decisions

## D-001 Monorepo Layout

Use one monorepo with separate app, admin, server, and docs areas.

Reason: early-stage coordination is easier when API contracts, product rules, and implementation live together.

## D-002 Mobile Stack

Use Flutter / Dart for the mobile app.

Reason: one codebase can target iOS and Android while supporting high-control UI, swipe gestures, animations, and store deployment.

## D-003 Backend Stack

Use NestJS / TypeScript with PostgreSQL.

Reason: strong module boundaries, good API structure, and fast iteration for admin and mobile clients.

## D-004 Wallet Ledger

Diamond balance must be derived from immutable ledger entries, not a mutable-only balance field.

Reason: paid unlocks and refunds need auditability and double-charge protection.

## D-005 MVP Before Full Hybrid Matching

Launch the first build around verified profile approval, swipe discovery, matches, chat, and diamond unlocks.

Reason: the full 3-channel concept is valuable, but the first app must validate the core dating loop before adding complexity.

## D-006 Benchmark And Client Requirement Coverage

Hashtag must be planned against full visible benchmark coverage, with SkyPeople as the primary reference, plus every client-requested feature.

Reason: the project owner's first principle is that no visible benchmark menu, page, function, or UX surface should be missed, while client-specific requested features must also be included.

## D-007 Product Name

Use `해시데이트` / `Hashdate` as the working product name.

Reason: the owner selected this name. Final store naming remains subject to trademark, domain, and marketplace availability checks.

## D-008 No-Question Execution Mode

The Lead Architect will make all non-owner-controlled decisions and keep the project moving without asking the owner for routine approvals.

Reason: the owner wants final completion reports rather than ongoing decision prompts.
