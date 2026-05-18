# API Contract

Base path: `/v1`

Auth: mobile endpoints use user bearer tokens. Admin endpoints use separate admin bearer tokens. Error shape is `{ "code": string, "message": string, "details"?: object }`.

## Auth

- `POST /auth/phone/start`: start phone verification
- `POST /auth/phone/verify`: verify code and issue tokens
- `POST /auth/refresh`: rotate access token
- `POST /auth/logout`: revoke current session

## Users

- `GET /users/me`: current account and onboarding state
- `PATCH /users/me`: update account preferences
- `POST /users/me/deactivate`: deactivate account
- `POST /users/me/deletion-requests`: request account deletion and start retention/legal hold workflow

## Support

- `POST /support/requests`: create logged-out or logged-in support request
- `GET /support/requests/me`: current user's support request history
- `GET /support/requests/:requestId`: current user's support request detail

## Public Content

- `GET /content/legal-documents`: list active terms, privacy, refund, and community policy versions
- `GET /content/legal-documents/:documentKey`: active legal document by key
- `GET /content/notices`: published notice list for homepage and app surfaces
- `GET /content/notices/:noticeId`: published notice detail
- `GET /content/faqs`: published FAQ list, filterable by category and surface
- `GET /content/homepage`: homepage content bundle for public web

## Profiles

- `GET /profiles/me`: current profile
- `PUT /profiles/me`: create or update profile
- `POST /profiles/me/photos/upload-url`: create signed photo upload URL
- `POST /profiles/me/photos`: attach uploaded photo
- `GET /profiles/:profileId`: view profile with lock metadata
- `POST /profiles/:profileId/unlocks`: unlock profile information using diamonds

## Moderation

- `POST /moderation/documents/upload-url`: create signed document upload URL
- `POST /moderation/documents`: submit uploaded verification document
- `GET /moderation/me/status`: current review and document status

## Discovery

- `GET /discovery/swipe-deck`: swipe cards
- `GET /discovery/profile-list`: profile-centered recommendations
- `GET /discovery/community-feed`: anonymous community matching feed placeholder
- `POST /discovery/swipes`: record pass or like swipe

## Likes and Matches

- `POST /likes`: send standard like
- `POST /likes/premium-contact`: send high-cost like with encrypted contact payload
- `GET /likes/received`: received likes
- `GET /matches`: current matches
- `POST /matches/:matchId/unmatch`: end match

## Chat

- `GET /chat/rooms`: chat room list
- `GET /chat/rooms/:roomId/messages`: paginated messages
- `POST /chat/rooms/:roomId/messages`: send message
- `POST /chat/rooms/:roomId/read`: mark room read

## Wallet and Payments

- `GET /wallet`: diamond balance
- `GET /wallet/ledger`: ledger entries
- `GET /payments/products`: purchasable diamond products
- `POST /payments/apple/verify`: verify App Store transaction
- `POST /payments/google/verify`: verify Play Billing transaction

## Reports

- `POST /reports`: create abuse report
- `GET /reports/me`: reports submitted by current user

## Admin

- `POST /admin/auth/login`: admin login
- `GET /admin/me`: current admin identity and role
- `GET /admin/users`: user search and filters
- `GET /admin/users/:userId`: user detail
- `POST /admin/users/:userId/suspend`: suspend user
- `POST /admin/users/:userId/restore`: restore user
- `GET /admin/moderation/reviews`: review queue
- `POST /admin/moderation/reviews/:reviewId/approve`: approve review subject
- `POST /admin/moderation/reviews/:reviewId/reject`: reject review subject
- `POST /admin/moderation/documents/:documentId/purge`: force purge document file
- `GET /admin/reports`: report queue
- `POST /admin/reports/:reportId/resolve`: resolve report
- `GET /admin/support/requests`: support queue with status, category, and priority filters
- `GET /admin/support/requests/:requestId`: support request detail and thread
- `POST /admin/support/requests/:requestId/reply`: add operator reply
- `PATCH /admin/support/requests/:requestId`: update support status, assignee, category, or priority
- `GET /admin/account-deletion-requests`: account deletion queue
- `GET /admin/account-deletion-requests/:requestId`: account deletion request detail
- `POST /admin/account-deletion-requests/:requestId/approve`: approve deletion after checks
- `POST /admin/account-deletion-requests/:requestId/reject`: reject deletion with reason
- `POST /admin/account-deletion-requests/:requestId/cancel`: cancel request after user/admin confirmation
- `GET /admin/wallets/:userId`: wallet balance and ledger
- `POST /admin/wallets/:userId/adjust`: manual wallet adjustment
- `GET /admin/content/legal-documents`: legal document versions
- `POST /admin/content/legal-documents`: create draft legal document version
- `GET /admin/content/legal-documents/:documentId`: legal document version detail
- `PATCH /admin/content/legal-documents/:documentId`: update draft legal document version
- `POST /admin/content/legal-documents/:documentId/publish`: publish legal document version
- `POST /admin/content/legal-documents/:documentId/archive`: archive legal document version
- `GET /admin/content/notices`: notice management list
- `POST /admin/content/notices`: create notice
- `GET /admin/content/notices/:noticeId`: notice detail
- `PATCH /admin/content/notices/:noticeId`: update notice
- `POST /admin/content/notices/:noticeId/publish`: publish notice
- `POST /admin/content/notices/:noticeId/archive`: archive notice
- `GET /admin/content/faqs`: FAQ management list
- `POST /admin/content/faqs`: create FAQ
- `GET /admin/content/faqs/:faqId`: FAQ detail
- `PATCH /admin/content/faqs/:faqId`: update FAQ
- `POST /admin/content/faqs/:faqId/publish`: publish FAQ
- `POST /admin/content/faqs/:faqId/archive`: archive FAQ
- `GET /admin/content/homepage`: homepage content blocks
- `PATCH /admin/content/homepage`: update draft homepage content blocks
- `POST /admin/content/homepage/publish`: publish homepage content bundle
- `GET /admin/audit-log`: admin action audit log
- `GET /admin/stats/overview`: signup, matching, payment, and diamond-spend summary

## Request Notes

- Support requests accept `email`, `userId` when authenticated, `category`, `subject`, `message`, optional `deviceContext`, and optional attachment references created through the future upload-url flow.
- Account deletion requests must capture request source, identity confirmation status, reason code, free-text reason, legal hold state, scheduled deletion date, and final processor.
- Legal documents are versioned by `documentKey`, `version`, `locale`, `status`, `effectiveAt`, and immutable published body snapshot.
- Notice, FAQ, and homepage content use `status` (`draft`, `published`, `archived`), `surface`, `locale`, `publishedAt`, and admin audit metadata.
