# Screen Inventory

This inventory defines the practical first-launch surface area. Screens should be polished, but the MVP should avoid deep settings, complex verification, and secondary matching channels until the core loop is validated.

## Mobile App

| Area | Screen | MVP Purpose | Required States |
| --- | --- | --- | --- |
| Launch | Splash | Show brand while session state loads. | Loading, maintenance/error |
| Auth | Welcome | Entry point for sign in and account creation. | Signed out |
| Auth | Sign up | Collect phone or email placeholder credentials and required consents. | Empty, validation error, submitted |
| Auth | Sign in | Existing user login. | Empty, validation error, locked/suspended |
| Auth | Consent | Terms, privacy, age confirmation, marketing optional consent. | Required unchecked, complete |
| Onboarding | Profile basics | Nickname, birth year/age range rule, gender, location, occupation, education. | Draft, validation error |
| Onboarding | Photo upload | Upload and order profile photos. | Empty, uploading, uploaded, failed |
| Onboarding | Lifestyle tags | Select structured tags for interests, lifestyle, relationship intent. | Empty, selected |
| Onboarding | Introduction | Short self-introduction and profile prompts. | Draft, too short, submitted |
| Onboarding | Review pending | Explain that admin review is required before discovery. | Pending, rejected, suspended |
| Core | Home discovery | Swipe approved member cards. | Has cards, no more cards, loading, blocked pending approval |
| Core | Profile card | Preview face/photo-first profile with some locked premium fields. | Locked, unlocked |
| Core | Profile detail | Show public fields and unlocked premium details. | Locked CTA, unlocked, insufficient diamonds |
| Core | Unlock confirmation | Confirm diamond spend before premium details open. | Enough balance, insufficient balance |
| Core | Match result | Celebrate mutual match and offer chat entry. | New match |
| Core | Matches | List mutual matches and latest message preview. | Empty, populated |
| Core | Chat room | 1:1 messages after mutual match. | Empty, sending, failed, blocked/suspended |
| Wallet | Diamond wallet | Show balance and ledger summary. | Empty ledger, populated |
| Wallet | Diamond purchase | List placeholder store products. | Store unavailable, purchase pending, success, failed |
| Safety | Report user | Select report reason and optional details. | Empty, submitted |
| Safety | Block user | Confirm block and remove from discovery/chat access. | Confirmation, complete |
| Account | My profile | Preview and edit own profile fields. | Approved, pending re-review |
| Account | Settings | Account, notification, legal, logout, withdrawal entry. | Normal, suspended |
| Account | Withdrawal | Request account deletion. | Confirmation, submitted |

## Admin Web

| Area | Screen | MVP Purpose | Required States |
| --- | --- | --- | --- |
| Auth | Admin sign in | Restricted operator login. | Empty, invalid, locked |
| Dashboard | Overview | Counts for pending reviews, reports, active users, diamond revenue/spend. | Loading, populated |
| Members | Review queue | List new profiles awaiting approval. | Empty, filtered, populated |
| Members | Review detail | Review profile fields/photos and approve or reject. | Pending, approved, rejected |
| Members | Member detail | See account status, profile, wallet balance, matches, reports. | Active, suspended, deleted |
| Members | Suspension action | Suspend, reinstate, and record reason. | Confirmation, complete |
| Reports | Report queue | Triage reports by status and severity. | Empty, open, resolved |
| Reports | Report detail | Review reporter, target, reason, chat/profile context. | Open, actioned, dismissed |
| Wallet | Ledger search | Search wallet transactions by user and type. | Empty, populated |
| Wallet | Manual adjustment | Grant, refund, or deduct diamonds with reason. | Confirmation, complete |
| Config | Diamond products | View configured product IDs and diamond amounts. | Read-only MVP |
| Config | Policy reasons | Manage controlled rejection/report/suspension reasons. | Read-only or simple edit |

## Deferred Screens

- Anonymous community feed, post detail, comments, and community DM request.
- Profile-list matching channel separate from swipe discovery.
- Full document upload, document review, and destruction audit screens.
- AI recommendation explanation screen.
- Contact-attached premium like flow.
