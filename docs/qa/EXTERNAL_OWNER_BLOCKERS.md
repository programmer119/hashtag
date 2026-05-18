# External Owner Blocker Register

Owner: Carver / QA Release Agent

Purpose: separate repo-owned QA work from items blocked by Apple, Google, payment providers, identity vendors, or legal/business owners. These items do not stop autonomous repo execution, but they do block store submission or production launch when marked `Release Blocker`.

## Operating Rules

- Carver records the blocker, affected release gate, owner, required evidence, and fallback.
- Internal implementation continues around documented assumptions unless the blocker controls production credentials, legal approval, or provider dashboard access.
- A blocker closes only when evidence is captured in the repo, release notes, store console screenshot/log, provider dashboard, or explicit owner confirmation.
- Unknown external choices default to the safest MVP path: defer production exposure, use sandbox/test mode, and keep user-facing claims conservative.

## Blocker Register

| ID | Area | External Owner | Release Gate | Status | Required Evidence | Autonomous Fallback |
| --- | --- | --- | --- | --- | --- | --- |
| EXT-APPLE-001 | Apple Developer account access | Business/store owner | TestFlight and App Store submission | Open | Active Apple Developer Program team, bundle ID access, 2FA submission owner | Continue iOS docs/build prep; mark submission blocked |
| EXT-APPLE-002 | App Store app identity | Business/store owner | App Store metadata | Open | Final app name, subtitle, category, age rating, support URL, privacy URL | Use Hashdate working name in docs; do not claim final metadata |
| EXT-APPLE-003 | Apple Sign in | Business/store owner + auth owner | App review if social login is enabled | Open | Decision that Apple Sign in is configured or social login is deferred | Keep email/phone placeholder flow as MVP assumption |
| EXT-APPLE-004 | Apple IAP products | Business/store owner + payment owner | Paid diamond testing and submission | Open | Product IDs, pricing tiers, sandbox tester, receipt validation plan | Keep paid purchases deferred or sandbox-only |
| EXT-GOOGLE-001 | Google Play Console access | Business/store owner | Internal testing and Play submission | Open | Play Console app, package name, signing access, tester track owner | Continue Android QA docs/build prep; mark submission blocked |
| EXT-GOOGLE-002 | Google Play Data Safety | Legal/privacy owner | Play submission | Open | Data collection, sharing, deletion, encryption, and retention answers approved | Draft from current architecture and mark legal review required |
| EXT-GOOGLE-003 | Google Play billing products | Business/store owner + payment owner | Paid diamond testing and submission | Open | Product IDs, base plans/prices, license tester, backend validation plan | Keep paid purchases deferred or sandbox-only |
| EXT-PAY-001 | Payment production strategy | Business/payment owner | Launch with paid diamonds | Open | Decision: production IAP, sandbox-only, or deferred for MVP | Default to deferred production payments until approved |
| EXT-PAY-002 | Refund and balance correction policy | Business/support owner | Launch with wallet value | Open | Written support process, admin adjustment authority, audit requirements | Allow only documented manual review in QA plan |
| EXT-ID-001 | Identity verification vendor | Business/security owner | Launch with real identity verification | Open | Vendor, data fields, retention/deletion proof, legal basis, test credentials | Keep real identity document upload out of MVP |
| EXT-ID-002 | Review account identity state | Business/store owner + admin owner | Store review | Open | Pre-approved review account with seeded profile, match, chat, and diamonds | Use synthetic seed data and document setup steps |
| EXT-LEGAL-001 | Privacy policy approval | Legal/privacy owner | Store submission and public launch | Open | Approved privacy policy URL and version/date | Use draft homepage privacy page; mark legal approval required |
| EXT-LEGAL-002 | Terms approval | Legal/business owner | Store submission and public launch | Open | Approved terms URL and version/date | Use draft homepage terms page; mark legal approval required |
| EXT-LEGAL-003 | Moderation/community guidelines approval | Legal/safety owner | Dating app review and launch | Open | Approved UGC policy, report/block process, enforcement language | Use product moderation draft; mark legal approval required |
| EXT-LEGAL-004 | Account deletion and retention policy | Legal/privacy owner | Store submission | Open | Deletion request process, retention windows, contact channel, response SLA | Use documented request flow; avoid promising instant deletion |

## Current Release Position

- Repo QA can continue autonomously against local/staging artifacts.
- Store submission is blocked until Apple/Google account access, final metadata, privacy/data safety answers, and legal URLs are confirmed.
- Production paid diamonds are blocked until IAP product setup, receipt validation, refund handling, and support authority are confirmed.
- Real identity document handling is blocked until vendor, retention, deletion proof, and legal basis are confirmed.
