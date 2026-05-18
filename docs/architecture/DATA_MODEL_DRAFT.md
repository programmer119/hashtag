# Data Model Draft

## Core Tables

- users
- user_auth_identities
- profiles
- profile_photos
- profile_tags
- moderation_reviews
- swipes
- likes
- matches
- chat_rooms
- chat_messages
- wallet_accounts
- wallet_ledger_entries
- payment_orders
- reports
- support_requests
- support_request_messages
- account_deletion_requests
- legal_document_versions
- notices
- faq_entries
- homepage_content_blocks
- admin_users
- admin_audit_logs

## Important Constraints

- One wallet account per user.
- One match per user pair.
- One paid unlock per viewer and target profile.
- Wallet ledger entries are append-only.
- Suspended users are excluded from discovery.
- Published legal document versions are immutable; edits create a new draft version.
- Account deletion requests cannot be approved while open payment disputes, moderation holds, or legal holds exist.
- Public notices, FAQs, and homepage blocks are served only from published records.
- Admin content mutations must create admin audit log entries.
