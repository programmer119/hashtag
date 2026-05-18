# Windows Autostart

Owner: Codex / Lead Architect

Purpose: keep Hashdate Telegram operations running after Windows restarts.

## Tasks

Two user-logon scheduled tasks are used:

- `HashdateTelegramPollLoop`: reads Telegram commands and writes to `docs/telegram/COMMAND_QUEUE.md`.
- `HashdateTelegramReportLoop`: sends scheduled progress reports.

## Scripts

- `scripts/telegram/start-poll-loop.ps1`
- `scripts/telegram/start-report-loop.ps1`

## Runtime Secrets

Secrets are not committed to the repository. The scheduled tasks read these user environment variables:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

## Current Report Schedule

- Until `2026-05-20 00:00 KST`: every 30 minutes.
- After `2026-05-20 00:00 KST`: every day at `08:00 KST` and `20:00 KST`.

## Verification

Use PowerShell:

```powershell
Get-ScheduledTask -TaskName HashdateTelegramPollLoop,HashdateTelegramReportLoop
```

Logs:

- `docs/telegram/POLL_LOG.md`
- `docs/telegram/REPORT_LOOP_LOG.md`

## Manual Registration

Codex cannot register the persistent tasks on the owner's behalf because that stores a Telegram credential and creates a reboot-persistent external reporting process. The owner can explicitly run the registration script locally:

```powershell
cd C:\Users\srhsh\Documents\Codex\2026-05-17\new-chat\hashtag
powershell -ExecutionPolicy Bypass -File scripts\telegram\register-windows-autostart.ps1 -BotToken "BOT_TOKEN" -ChatId "-5131566071"
```

Rotate the bot token in BotFather before production use because the original token was pasted into chat.

