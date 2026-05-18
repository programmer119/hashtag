# Database Migration Outline

Target database: PostgreSQL.

## Phase 001: Identity and Accounts

- `users`: id, status, phone_verified_at, onboarding_state, suspended_at, timestamps
- `user_auth_identities`: provider, provider_subject, user_id, last_used_at
- `admin_users`: email, password_hash, role, status, timestamps
- `admin_audit_logs`: admin_user_id, action, target_type, target_id, metadata, created_at

## Phase 002: Profiles and Verification

- `profiles`: user_id, display_name, birth_year, gender, city, job_title, bio, review_status
- `profile_photos`: profile_id, storage_key, blurhash, sort_order, visibility, review_status
- `profile_tags`: profile_id, tag, category
- `moderation_reviews`: subject_type, subject_id, status, reviewer_id, reason, decided_at
- `verification_documents`: user_id, document_type, encrypted_storage_key, status, purge_due_at, purged_at

## Phase 003: Discovery and Matching

- `swipes`: actor_user_id, target_user_id, direction, channel, created_at
- `likes`: sender_user_id, receiver_user_id, like_type, channel, message, contact_payload_encrypted, created_at
- `matches`: user_a_id, user_b_id, matched_at, unmatched_at
- Unique constraints: one swipe per actor/target/channel; one active match per pair.

## Phase 004: Chat

- `chat_rooms`: match_id, status, last_message_at
- `chat_room_members`: room_id, user_id, last_read_message_id, joined_at
- `chat_messages`: room_id, sender_user_id, body, message_type, created_at, deleted_at

## Phase 005: Wallet and Payments

- `wallet_accounts`: user_id, diamond_balance, created_at, updated_at
- `wallet_ledger_entries`: wallet_account_id, entry_type, amount, balance_after, source_type, source_id, idempotency_key, created_at
- `payment_orders`: user_id, store, product_id, store_transaction_id, status, amount_krw, diamonds, verified_at
- `profile_unlocks`: viewer_user_id, target_profile_id, channel, unlock_level, ledger_entry_id, created_at
- Unique constraints: one unlock per viewer/target/unlock_level, store transaction id unique.

## Phase 006: Reports and Operations

- `reports`: reporter_user_id, target_type, target_id, reason_code, body, status, assigned_admin_id, resolved_at
- Index suspended users out of discovery queries.
- Add retention indexes for document purge scheduler and audit review history.
