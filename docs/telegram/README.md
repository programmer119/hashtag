# Telegram Operations

Hashdate can report project progress to a Telegram room and accept lightweight bot commands.

## Required Environment

Set these environment variables before running the scripts:

```text
TELEGRAM_BOT_TOKEN=123456:telegram-bot-token
TELEGRAM_CHAT_ID=-1001234567890
```

## Scripts

```text
node scripts/telegram/status-report.mjs
node scripts/telegram/send-status.mjs
node scripts/telegram/bot-poll.mjs
node scripts/telegram/get-chat-id.mjs
node scripts/telegram/report-loop.mjs
node scripts/telegram/send-command-results.mjs
```

## Reporting Schedule

The intended reporting cadence is every 6 hours.

For stable reporting, run the local report loop instead of relying on Codex heartbeat environment variables:

```powershell
$env:TELEGRAM_BOT_TOKEN="..."
$env:TELEGRAM_CHAT_ID="-5131566071"
node scripts\telegram\report-loop.mjs
```

Optional immediate first send:

```powershell
$env:TELEGRAM_REPORT_SEND_IMMEDIATELY="1"
node scripts\telegram\report-loop.mjs
```

Current schedule is documented in `docs/telegram/REPORT_SCHEDULE.md`.

## Command Flow

Simple commands are answered directly by the bot from local project files.

The persistent poll loop checks Telegram every 10 seconds by default. Override with:

```text
TELEGRAM_POLL_INTERVAL_MS=10000
```

Commands that require Codex work are written to:

```text
docs/telegram/COMMAND_QUEUE.md
```

Codex checks that queue during autonomous work and executes queued owner commands without asking routine follow-up questions.

After execution, Codex writes the owner-facing result to:

```text
docs/telegram/COMMAND_RESULTS.md
```

When Telegram environment variables are available, Codex runs:

```text
node scripts/telegram/send-command-results.mjs
```

That posts completed command results back to the Telegram room and moves them from `Pending Send` to `Sent`.

The persistent `poll-loop.mjs` also checks `COMMAND_RESULTS.md` each cycle and sends pending result messages, so a running bot loop can deliver Codex's final answers without waiting for a separate manual command.

Immediate vs queued reply behavior is documented in:

```text
docs/telegram/IMMEDIATE_REPLY_POLICY.md
```

The event-driven Codex bridge is documented in:

```text
docs/telegram/CODEX_BRIDGE.md
```

## Owner-Controlled Setup

The owner must create a Telegram bot, add it to the Telegram room, and provide the bot token/chat ID through environment variables. Codex should not hardcode secrets into the repo.

If the bot does not appear in group search, see `docs/telegram/SETUP_TROUBLESHOOTING.md`.
