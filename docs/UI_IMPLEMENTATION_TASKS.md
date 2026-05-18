# UI Implementation Tasks

Owner: Codex / Lead Architect

Purpose: translate product-visible rules into concrete UI tasks for mobile, admin, homepage, and store assets.

## MVP UI Rules

- Dating surfaces show nickname or alias only.
- Admin lists mask phone, email, and contact values by default.
- Unlock costs must be shown before spending diamonds.
- Review status must be visible before discovery access.
- Report/block/account deletion entry points must be reachable.
- Public web must not publish unverifiable proof claims.

## Mobile Tasks

| ID | Surface | Rule | Implementation Task | Evidence |
| --- | --- | --- | --- | --- |
| UI-M-001 | Discovery card | Nickname-only display | Render `nickname`, age, city, and intro; never legal name | Discovery screenshot or route |
| UI-M-002 | Profile detail | Unlock clarity | Show locked fields, 10-diamond cost, and confirmation | Unlock screen evidence |
| UI-M-003 | Wallet | Ledger clarity | Show balance and recent ledger entries | Wallet screen evidence |
| UI-M-004 | Review pending | Approval gate | Show pending/rejected/approved state and next action | Review screen evidence |
| UI-M-005 | Chat | Match-only context | Show chat only from match list and include report/block actions | Chat screen evidence |
| UI-M-006 | Settings | Account deletion | Show deletion request entry and support link | Settings evidence |
| UI-M-007 | Permissions | Rationale copy | Add photos/camera/notification copy before permission prompts | Onboarding evidence |

## Admin Tasks

| ID | Surface | Rule | Implementation Task | Evidence |
| --- | --- | --- | --- | --- |
| UI-A-001 | User list | Mask PII | Mask phone/email/contact by default | Admin screenshot |
| UI-A-002 | Review detail | Controlled rejection | Require controlled reason before rejection | Review action evidence |
| UI-A-003 | Suspension | Confirm consequences | Show confirmation and reason before suspend/reinstate | Admin action evidence |
| UI-A-004 | Wallet adjustment | Auditability | Require reason for grant/refund/deduct | Wallet admin evidence |
| UI-A-005 | Audit log | Sensitive reveals | Log elevated reveal or sensitive mutation | Audit row evidence |
| UI-A-006 | Support/deletion queue | Owner paths | Show support and deletion requests in operations console | Admin route evidence |

## Homepage Tasks

| ID | Surface | Rule | Implementation Task | Evidence |
| --- | --- | --- | --- | --- |
| UI-W-001 | Landing | No unverifiable claims | Use reviewed-profile and safety vocabulary only | Landing copy review |
| UI-W-002 | Download | Store readiness | Use placeholder badges until listings exist | Download route |
| UI-W-003 | Privacy/terms | Draft legal status | Mark current text as draft/non-final internally | Legal page review |
| UI-W-004 | Support | Public help path | Connect form to support API preview | Support route/API evidence |
| UI-W-005 | Account deletion | Clear deletion path | Explain deletion request flow and retention caveat | Deletion route |

## Store Asset Tasks

| ID | Asset | Rule | Implementation Task | Evidence |
| --- | --- | --- | --- | --- |
| UI-S-001 | Screenshot 1 | Onboarding | Capture auth/onboarding screen | Screenshot file |
| UI-S-002 | Screenshot 2 | Profile setup | Capture profile setup | Screenshot file |
| UI-S-003 | Screenshot 3 | Review pending | Capture approval gate | Screenshot file |
| UI-S-004 | Screenshot 4 | Discovery | Capture swipe card | Screenshot file |
| UI-S-005 | Screenshot 5 | Unlock | Capture diamond confirmation | Screenshot file |
| UI-S-006 | Screenshot 6 | Match/chat | Capture match or chat | Screenshot file |
| UI-S-007 | Screenshot 7 | Wallet/safety | Capture wallet or safety flow | Screenshot file |

## Next UI Execution Order

1. UI-M-001 through UI-M-004 in mobile preview and Flutter widgets.
2. UI-A-001 through UI-A-003 in admin preview and Next.js pages.
3. UI-W-004 support form connection to backend preview.
4. UI-S screenshot capture after real app screens are runnable.

