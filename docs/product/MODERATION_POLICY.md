# Moderation Policy

The MVP moderation system should protect trust and safety without pretending to automate everything. The first launch uses controlled profile review, reports, blocking, suspension, and audit trails.

## Account Statuses

| Status | Meaning | User Access |
| --- | --- | --- |
| draft | User has not submitted profile. | Can edit onboarding only. |
| pending_review | Profile submitted for admin review. | Cannot enter discovery. |
| approved | Profile approved. | Can discover, unlock, like, match, chat, purchase. |
| rejected | Profile rejected with reason. | Can edit and resubmit. |
| suspended | Account restricted by admin. | Cannot discover, unlock, like, chat send, purchase, or appear in discovery. |
| deleted | User requested deletion or account removed. | Cannot access app. |

## Profile Review Standards

Admins should reject profiles that contain:

- Missing or unclear face photo.
- Obscene, violent, hateful, or illegal content.
- Commercial promotion, external links, or solicitation.
- Impersonation indicators.
- Underage indicators or age inconsistency.
- Empty, spam-like, or low-effort profile content.

MVP review does not verify income, car ownership, license, or government identity. If the UI mentions premium screening, wording must be careful: "profile review" rather than "verified income" unless the verification actually exists.

## Controlled Rejection Reasons

- Photo does not meet profile standards.
- Profile information is incomplete.
- Introduction or tags need revision.
- Commercial or promotional content is not allowed.
- Safety or authenticity concern.
- Other policy issue.

The user-facing message should be short and not expose internal fraud signals.

## Report Reasons

- Fake profile or impersonation.
- Harassment or abusive message.
- Sexual or explicit content.
- Spam, promotion, or solicitation.
- Scam or suspicious money request.
- Underage concern.
- Other safety concern.

## Report Handling

1. New reports enter open status.
2. Admin reviews reporter, target, source screen, reason, notes, and available context.
3. Admin chooses dismiss, warn, suspend, or escalate.
4. Admin records an internal reason for action.
5. If suspended, the target is removed from discovery and loses core actions immediately.
6. Reporter can receive a generic confirmation that the report was reviewed.

## Blocking Policy

- A user can block another user from profile detail or chat.
- Blocking removes the target from the blocker's discovery and match list where practical.
- Blocking prevents new chat messages between the two users.
- Blocking is private and should not notify the blocked user.
- Blocking does not automatically suspend the target.

## Suspension Policy

Admins may suspend for:

- Confirmed harassment or threats.
- Underage or illegal content concerns.
- Scam, money request, or external payment solicitation.
- Repeated reports with credible evidence.
- Impersonation or severe authenticity concern.
- Chargeback or payment abuse after review.

Suspension effects:

- User cannot appear in discovery.
- User cannot swipe, like, unlock, purchase, or send chat messages.
- Existing chat history remains available to admins for review.
- User should see a generic restricted-account notice.

## Audit Requirements

The system should record:

- Profile approval and rejection actions.
- Suspension and reinstatement actions.
- Report decisions.
- Wallet manual adjustments.
- Admin actor, timestamp, target user, action type, and reason.

## MVP Safety Limits

- No automated fraud score is required.
- No real-time chat moderation is required.
- No document review workflow is required.
- No appeal workflow is required beyond support contact or manual admin reinstatement.

## Phase 2 Moderation Candidates

- Document upload review and encrypted deletion audit.
- Appeal queue.
- Keyword-based chat risk flags.
- Device and phone number abuse signals.
- Admin role permissions and multi-reviewer approval for severe actions.
