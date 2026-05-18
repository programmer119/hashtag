# Chat Feature

Owns thread view, message pagination-ready state, composer send state, and report/block shortcuts.

First screens:

- `ChatThreadScreen`
- `MessageReportSheet`

State:

- `ChatThreadController`
- `ChatRepository`

API:

- `GET /chat/threads`
- `GET /chat/threads/:threadId/messages`
- `POST /chat/threads/:threadId/messages`
