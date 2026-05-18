# SkyPeople-Style Benchmark Audit Checklist

Owner: James / Product, Policy, Copy

Date: 2026-05-17

Scope: mobile app and public web surfaces that are publicly knowable from app store listings, official web pages, legal pages, and visible screenshot descriptions. This is a functional benchmark, not a copy deck. Hashdate must use original UX, copy, visual design, naming, iconography, and policy wording.

## Public Sources Reviewed

- Official SkyPeople public website: https://skypeople.app/
- App Store listing: https://apps.apple.com/us/app/id1191259452
- Google Play listing: https://play.google.com/store/apps/details?id=app.hybirds.skypeople
- Terms page: https://www.skypeople.me/include/rule.do
- Privacy page: https://www.skypeople.me/include/privacy.do
- Public screenshot/market summary mirror: https://mwm.ai/ko/apps/seukaipipeul-seupi-injeung-giban-peurimieom-sogaetingaeb/1191259452

## Status Legend

- Planned: already present in Hashdate docs or API plan, but not implemented.
- Partial: visible skeleton, route, or policy draft exists.
- Gap: not yet represented clearly enough in Hashdate docs.
- Deferred: intentionally Phase 2 or later.
- Blocked: requires owner-controlled account, credential, legal, or payment asset.

## Mobile App Feature And Screen Checklist

| Benchmark surface | Public signal | Hashdate equivalent | Owner role | Phase | Status | Product notes |
| --- | --- | --- | --- | --- | --- | --- |
| Premium verified positioning | Public listings emphasize a curated dating app with verified school/work identity signals. | Premium, reviewed member onboarding with trust-first profile approval. | James + Poincare + Mason | MVP | Planned | Use "reviewed" and "higher-trust" unless Hashdate actually verifies external documents. |
| School/work verification | Website and store pages describe school/work email or document-based proof. | Profile education/occupation fields in MVP; optional document upload, encrypted temporary storage, and admin document review in Phase 2. | James + Dalton + Mason | Phase 2 | Deferred | Current MVP avoids sensitive document storage. Keep backend placeholders, but do not claim verification until built. |
| Application approval gate | Terms describe service approval/refusal for invalid, false, underage, married, or policy-violating users. | Admin profile review gate before discovery eligibility. | Mason + James | MVP | Planned | Add rejection reason copy and applicant-facing states. |
| Daily card / curated introductions | Screenshot descriptions refer to "today" style cards and tailored matching. | Home discovery swipe deck with curated card queue. | Poincare + Dalton | MVP | Planned | MVP can use simple backend ranking or mock order; avoid promising AI. |
| Keyword ideal-type search | Screenshot descriptions mention keyword search for preferred match attributes. | Discovery filters and profile-list recommendations. | Poincare + Dalton | Phase 2 | Deferred | API has `/discovery/profile-list`; mobile screen inventory needs a future screen row. |
| Swipe-like card browsing | Public app category and screenshot set imply card-based dating discovery. | Home discovery, profile card, like/pass, match result. | Poincare | MVP | Planned | Already in screen inventory. |
| Profile detail with locked premium fields | Terms discuss paid acceptance/add-ons; store listings show paid in-app currency. | Profile detail with diamond unlock confirmation and duplicate-charge prevention. | James + Dalton + Poincare | MVP | Planned | Existing diamond policy sets 10-diamond unlock; owner may later change cost. |
| Paid virtual currency | App stores expose in-app purchases for heart-like currency. | Diamond wallet, diamond packs, spend ledger, test purchases. | James + Dalton + Carver | MVP | Planned | Production sale remains blocked until Apple/Google products exist. |
| Post-match chat | App store metadata includes messaging/chat. | 1:1 chat after mutual match. | Poincare + Dalton | MVP | Planned | MVP is text-only. |
| Received likes / acceptance | Terms mention paid acceptance may be required after matching. | Likes received, mutual match, optional premium contact-like in Phase 2. | James + Poincare + Dalton | MVP / Phase 2 | Partial | Standard likes/matches in MVP; contact-attached premium like deferred. |
| Contact-attached premium like | Client brief requires a premium contact-attached like. | High-cost like with encrypted contact payload. | James + Dalton + Poincare | Phase 2 | Deferred | API placeholder exists; mobile flow still needs screen spec. |
| Privacy: avoid acquaintances | Website/store pages highlight avoiding acquaintances, company peers, or school peers. | Contact blocklist import, same workplace/school avoidance toggles, and privacy settings. | James + Poincare + Dalton | Phase 2 | Gap | Add as a Phase 2 privacy feature; MVP can include manual block only. |
| Address book permission | App Store permission text and privacy page mention contacts/address book use. | Optional contact permission only for acquaintance avoidance; hashed matching on server. | Dalton + James + Carver | Phase 2 | Gap | Requires strict consent copy, privacy disclosure, and deletion behavior. |
| Anonymous community module | Public website and store listing describe dating and anonymous community as separate modules. | Anonymous community feed, post detail, comments, and community match/DM request. | James + Poincare + Dalton + Mason | Phase 2 | Deferred | Already in API and deferred screen inventory; needs fuller product spec. |
| Community comments | Recent Google Play change log mentions community comment improvements. | Community post comments and moderation queue. | James + Poincare + Mason | Phase 2 | Deferred | Needs report categories and admin review context before implementation. |
| Real-name hidden from matches | Public website states real names are not shown. | Display alias/nickname only; no legal name exposure in dating surfaces. | James + Poincare + Dalton | MVP | Planned | Add explicit acceptance criterion. |
| Profile photo anti-leak protection | Store listing references watermark/privacy protection for photos. | Hashdate photo watermarking, screenshot friction, and reportable image misuse policy. | James + Poincare + Dalton | Phase 2 | Gap | MVP can include policy language; technical watermarking can follow. |
| Verified badges | Screenshot descriptions show verification-complete and credential badges. | Hashdate status badges: profile reviewed, document verified, occupation/education reviewed. | James + Poincare + Mason | MVP / Phase 2 | Partial | MVP only "profile reviewed"; document badges Phase 2. |
| Trust/safety monitoring | Website describes active monitoring and review. | Admin reports, suspension, moderation audit, support queues. | Mason + Dalton + James | MVP | Planned | Current docs cover reports and suspension; add monitoring copy later. |
| False-profile / impersonation enforcement | Terms mention refusal or restriction for false info, stolen photos, and policy abuse. | Moderation policy, report reasons, admin suspension/reinstatement, audit log. | James + Mason | MVP | Planned | Keep claims operational, not absolute. |
| Illegal transaction safety warning | App Store listing includes safety warnings and reporting guidance. | Safety page, in-app report reasons, emergency guidance, prohibited conduct policy. | James + Carver + Lena | MVP | Partial | Homepage safety page exists as draft; in-app policy copy needed. |
| Account deletion | Terms mention app/web withdrawal or customer support paths. | Settings withdrawal screen plus public account deletion page and admin deletion queue. | James + Lena + Dalton + Mason | MVP | Partial | Homepage route and API/admin contract exist; mobile screen planned. |
| Support contact | Public surfaces expose support email and app support links. | In-app support, public support page, support request API, admin support queue. | Lena + Dalton + Mason + James | MVP | Partial | Web skeleton and API contract exist; production copy and forms pending. |
| Notices / updates | Store and web surfaces present release notes, notices, and support info. | Public notices API, homepage content, app notice surface. | Lena + Dalton + Poincare | MVP | Planned | API contract exists; mobile/public web rendering needs implementation. |
| App permissions disclosure | App Store/Play pages disclose camera/photos/contacts. | Store metadata checklist plus onboarding permission rationale copy. | James + Carver + Poincare | MVP / Phase 2 | Gap | MVP needs camera/photos; contacts only if acquaintance avoidance ships. |
| Age rating / adult safety | App Store is 16+; Google Play shows adult rating in Korea. | Age gate, adult eligibility copy, store rating review, prohibited minors policy. | James + Carver | MVP | Partial | Consent screen exists in inventory; final store rating blocked by store accounts. |
| Public app download web page | Official site has app download CTAs and app-only signup. | Hashdate `/download` page and app store badge placeholders. | Lena + James | MVP | Partial | Existing homepage skeleton has download page. |
| Public trust landing page | Official site leads with trust proof, member pool, verification, awards, media, and safety. | Original Hashdate public landing with trust principles, review process, safety, and beta status. | Lena + James | MVP | Partial | Existing homepage should avoid unverifiable awards/member-count claims. |
| Success stories / marriage news | Public site has a success-story/news surface. | Hashdate success stories or member outcomes page after real consented stories exist. | James + Lena | Phase 2 | Blocked | Owner-controlled real testimonials are required; use no fabricated stories. |
| Company/about footer | Official site exposes company info, contact, and business identity. | Hashdate company/about/legal footer with support, policies, and deletion link. | Lena + James | MVP | Blocked | Final business identity is owner-controlled; keep placeholders until supplied. |
| Legal terms and privacy | Public terms/privacy cover service scope, payment, refund, data collection, contacts, and deletion. | Terms, privacy, refund, community guidelines, location/privacy policy set. | James + Dalton + Lena | MVP | Partial | Draft pages exist; final legal publication requires owner/legal review. |
| Store listing screenshots | App stores show 8-10 screenshots covering trust, matching, verification, privacy, and community. | Original Hashdate store screenshot plan: onboarding, reviewed profile, discovery, unlock, match/chat, wallet, safety, support. | James + Carver + Poincare | MVP | Gap | Add store screenshot script after mobile mock screens exist. |

## Public Web Checklist

| Benchmark public web item | Hashdate equivalent | Owner role | Phase | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Homepage hero with app download | Hashdate landing page with download CTA | Lena + James | MVP | Partial | Existing skeleton present. |
| App-only signup explanation | Download page and app-first onboarding note | Lena + James | MVP | Partial | Existing download route present; copy should remain original. |
| Trust/verification sections | Review-process and safety sections | Lena + James | MVP | Partial | Do not claim document verification until Phase 2. |
| App screenshots | Original Hashdate app preview images | Poincare + Lena + James | MVP | Gap | Needs mobile mock UI first. |
| Privacy and safety explanations | Safety, privacy, account deletion, support pages | Lena + James + Carver | MVP | Partial | Draft routes exist. |
| Terms/privacy/support links | Footer and legal pages | Lena + James | MVP | Partial | Final legal content blocked by business identity/legal review. |
| Success/outcome content | Consent-based stories page | James + Lena | Phase 2 | Blocked | Requires real user permission and owner approval. |
| Company/about proof | Company page or footer identity | James + Lena | MVP | Blocked | Requires real operator/company details. |
| Media/award proof | Press or proof page | James + Lena | Phase 2 | Blocked | Only publish verified Hashdate-specific press/awards. |
| Store badges | App Store and Google Play links | Lena + Carver | MVP | Blocked | Requires store listings. |

## Hashdate Product Decisions From Audit

- MVP should keep the trusted dating promise, but describe it as profile review and member approval, not full credential verification.
- Phase 2 must include the heavier benchmark surfaces: document verification, acquaintance avoidance, anonymous community, keyword/profile-list matching, photo watermarking, and contact-attached premium like.
- Mobile and public web must share one trust vocabulary: reviewed profile, private identity, explicit unlock cost, safety reporting, and account deletion.
- Store metadata must be treated as a first-class product surface, with screenshots mapped to actual implemented screens.
- Legal/policy copy must avoid absolute promises such as "100% verified" or "no fake users" unless operations, evidence, and legal review support the claim.

## Follow-Up Work Items

| Work item | Owner role | Phase | Status |
| --- | --- | --- | --- |
| Add Phase 2 mobile screen specs for contact avoidance, community, keyword search, and premium contact-like. | James + Poincare | Phase 2 | Gap |
| Add acceptance criteria for nickname-only display and no legal-name exposure. | James | MVP | Gap |
| Draft store screenshot script once mobile mock screens exist. | James + Carver | MVP | Gap |
| Expand privacy policy draft for contacts before acquaintance avoidance ships. | James + Carver | Phase 2 | Gap |
| Add public web copy rules that prohibit unverifiable awards, membership counts, testimonials, or verification claims. | James + Lena | MVP | Gap |
