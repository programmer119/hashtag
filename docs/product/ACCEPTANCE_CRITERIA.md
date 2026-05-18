# MVP Feature Acceptance Criteria

Acceptance criteria are written for a first launch build. Anything not listed here should be treated as optional unless it blocks app review, payment compliance, privacy, or safety.

## Account and Onboarding

- A signed-out user can create an account using the MVP credential method.
- The app requires terms, privacy policy, and age confirmation before profile submission.
- A user cannot submit a profile until required basics, photos, tags, and introduction fields are valid.
- A submitted user enters pending review and cannot access discovery.
- A rejected user can see a controlled rejection reason and resubmit after editing.
- A suspended user cannot access discovery, chat sending, diamond purchase, or profile unlock.

## Profile Review

- Admin can list pending profiles.
- Admin can open profile detail with photos and submitted fields.
- Admin can approve a profile.
- Admin can reject a profile with a controlled reason.
- Approved profiles become eligible for discovery.
- Rejected and suspended profiles do not appear in discovery.

## Discovery and Matching

- Approved users can view swipe cards for eligible approved candidates.
- Users can pass a candidate.
- Users can like a candidate.
- A mutual like creates exactly one match record.
- Existing matches are not recreated by repeated likes.
- Blocked, suspended, rejected, or deleted users are excluded from new discovery results.
- Users do not see their own profile in discovery.

## Premium Unlocks and Diamonds

- A user can see their current diamond balance.
- Locked premium profile fields show an unlock CTA and diamond cost.
- Unlock requires explicit confirmation before spend.
- Unlock fails with a clear insufficient balance state if the user lacks diamonds.
- Successful unlock creates an immutable wallet ledger spend.
- Successful unlock creates a viewer-target unlock record.
- Reopening an already unlocked profile does not deduct diamonds again.
- Admin can search wallet ledger entries by user.
- Admin can create manual grant, refund, or deduction entries with a reason.

## Chat

- Chat is available only for mutual matches.
- A user can send and receive text messages in a matched chat.
- Suspended users cannot send new messages.
- Blocked users cannot continue chat with the blocker.
- Failed sends show a retry or failure state.
- Chat room provides report and block entry points.

## Reports and Moderation

- A user can report another user from profile detail or chat.
- A report requires a controlled reason.
- Admin can list open reports.
- Admin can view report context.
- Admin can dismiss a report.
- Admin can suspend a reported user with a reason.
- Suspended users are immediately removed from discovery eligibility.

## Wallet and Payment Abstraction

- The app displays configured diamond packs.
- Test builds can simulate a successful purchase without real store billing.
- Real production purchases remain disabled until Apple/Google product IDs and receipt validation are configured.
- Every balance-affecting event is represented by a ledger entry.
- Balance cannot become negative through normal user actions.

## Privacy and Safety

- Profile photos and chat content are accessible only to authenticated users with a valid reason to view them.
- Admin actions that affect user status or wallet balance are auditable.
- User withdrawal or deletion request is available from settings.
- Legal and privacy screens are reachable from onboarding and settings.
- Dating surfaces display nickname or alias only, never legal name.
- Admin lists mask phone, email, and contact fields by default.
- Public web examples must not imply real members, awards, success stories, or verification claims without evidence.

## Launch Smoke Test

- Complete sign up and submit profile.
- Approve user in admin.
- Swipe, unlock, like, and match with a seeded or second test account.
- Send a chat message.
- Report a profile.
- Suspend the reported user in admin.
- Confirm suspended user cannot swipe, chat send, purchase, or unlock.
