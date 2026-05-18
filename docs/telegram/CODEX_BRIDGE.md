# Telegram Codex Bridge

Owner: Codex / Lead Architect

Last updated: 2026-05-17T05:27Z

## Decision

The Telegram server is useful only if it can push work into Codex when a message arrives.

This has been verified. `codex exec` can be launched from the local Telegram poll process and can return a result file for Telegram to send back.

## Verified Command

```text
codex exec --skip-git-repo-check -C . -o docs\telegram\.codex-exec-test-output.txt "Return exactly: TELEGRAM_PUSH_OK"
```

Verified result:

```text
TELEGRAM_PUSH_OK
```

## Runtime Flow

```text
Telegram poll-loop
  -> getUpdates every 10 seconds
  -> direct commands answered in Node
  -> /codex, /decide, /priority call codex exec immediately
  -> codex writes last message to docs/telegram/.codex-telegram-output.txt
  -> poll-loop sends that result back to Telegram
  -> COMMAND_QUEUE.md and COMMAND_RESULTS.md keep durable records
```

## Current Behavior

- `/status`, `/progress`, `/workers`, `/worklist`, `/blockers`, and `/links` answer directly from project files.
- Simple arithmetic through `/codex`, such as `/codex 3*5`, answers directly from the poll loop.
- Project work through `/codex <task>` starts `codex exec` immediately.
- `/decide <decision>` starts `codex exec` immediately.
- `/priority <item>` starts `codex exec` immediately.

## Operational Notes

- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` stay in runtime env only.
- `CODEX_COMMAND` can override the executable name if needed; default is `codex`.
- `TELEGRAM_CODEX_TIMEOUT_MS` controls the maximum Codex run time; default is 20 minutes.
- The poll loop blocks while one Codex command is running. This is intentional for now to avoid overlapping writes.
