# Dalton Backend Worklist

Owner: Dalton / Backend Agent

Scope: homepage support APIs, account deletion requests, legal document versions, notices, FAQs, homepage content, and admin content management.

## Ready for Contract Review

- Confirm public support intake fields, spam/rate-limit requirements, and attachment policy.
- Confirm account deletion request states: `requested`, `identity_pending`, `blocked`, `approved`, `scheduled`, `completed`, `rejected`, `cancelled`.
- Confirm legal document keys for MVP: `terms`, `privacy`, `refund`, `community_guidelines`, `location_privacy`.
- Confirm content locales for launch. Proposed default: `ko-KR`; reserve `en-US`.
- Confirm admin roles allowed to publish legal/content changes.

## Backend Implementation Tasks

- Add database migrations for `support_requests`, `support_request_messages`, `account_deletion_requests`, `legal_document_versions`, `notices`, `faq_entries`, and `homepage_content_blocks`.
- Implement `support` module controllers, DTOs, validation, service methods, and persistence.
- Implement account deletion request creation under `users`, including duplicate open-request protection.
- Implement `content` module read APIs with published-only filtering and cache headers.
- Implement admin support queue, support reply/update flows, and audit log writes.
- Implement admin account deletion queue and legal hold checks before approval.
- Implement admin legal document version CRUD with immutable published versions.
- Implement admin notice, FAQ, and homepage content CRUD/publish/archive flows.
- Add auth guards and role checks once framework dependencies are installed.
- Add unit and API contract tests after the NestJS baseline is approved.

## Dependencies and Decisions

- Needs lead review for deletion retention period and legal hold policy.
- Needs product/legal copy source of truth from James before legal documents can be seeded.
- Needs Lena homepage content block schema before finalizing `GET /content/homepage`.
- Needs Carver admin UI filter/sort requirements for support and content queues.
