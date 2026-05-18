# Safety Feature

Owns report, block, unblock, and safety-center surfaces that can be launched from discovery, profile detail, match detail, chat, and settings.

First screens:

- `ReportUserScreen`
- `ReportMessageScreen`
- `BlockUserSheet`
- `BlockedUsersScreen`

State:

- `ReportDraftController`
- `BlockedUsersController`
- `SafetyRepository`

API:

- `POST /reports/users`
- `POST /reports/messages`
- `POST /moderation/blocks`
- `DELETE /moderation/blocks/:userId`
- `GET /moderation/blocks`
