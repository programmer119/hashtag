# Telegram Progress

Owner: Codex / Lead Architect

## Current Completion

Telegram operations: 90%

## Completed

- Telegram operations docs created.
- Command list created.
- Command queue created.
- No-secret setup rule documented.
- Status report script created.
- Telegram send script created.
- Telegram polling and command queue script created.
- Chat ID helper script created.
- Scheduled report state file created.
- Existing 30-minute Codex heartbeat updated to check Telegram commands and report state.
- Setup troubleshooting guide created.
- Telegram group chat ID received.
- First status send verified.
- Persistent poll loop script created.
- First Telegram `/codex` command was manually polled and verified.
- Third Telegram `/codex` test command reached the queue and was completed by Codex.
- Heartbeat queue check processed two pending Telegram commands.
- Local six-hour report loop script created.
- Report loop schedule updated: every 30 minutes until 2026-05-20 00:00 KST, then daily at 08:00 and 20:00 KST.
- Windows autostart wrapper scripts created for poll and report loops.
- Manual Windows autostart registration script created.
- A garbled Telegram command was still captured in the queue and processed as a build/readiness request.
- Command result outbox and `send-command-results.mjs` were added so Codex can post final answers back to Telegram after queue processing.
- `poll-loop.mjs` now also drains pending command results each polling cycle when Telegram env vars are available.
- Two newer Telegram commands were processed from the queue and their final answers were added to `COMMAND_RESULTS.md`.
- Immediate reply policy was documented so direct bot commands, queued Codex commands, and final result delivery have clear behavior.
- Telegram poll loop default interval changed from 20 seconds to 10 seconds. This does not spend Codex tokens by itself.
- Verified `codex exec` push path with `TELEGRAM_PUSH_OK`.
- Updated `poll-loop.mjs` and `bot-poll.mjs` so `/codex`, `/decide`, and `/priority` launch Codex immediately instead of waiting for heartbeat processing.

## Remaining

- Token should be rotated before production use because it was pasted in chat.
- Runtime environment must persist `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` for future automatic sends.
- Bot polling is running as a local background process. Actual Codex execution now happens immediately through `codex exec` for `/codex`, `/decide`, and `/priority`.
- Telegram report delivery is handled by the local report loop rather than Codex heartbeat.
- Command result delivery uses `docs/telegram/COMMAND_RESULTS.md` plus `node scripts/telegram/send-command-results.mjs` when Telegram env vars are available.
- Report loop must remain running in the local process environment.
- Windows scheduled tasks can restart the poll/report loops at user logon after the owner runs the manual registration script.
- If `REPORT_STATE.md` shows `every 6 hours` again, restart the local report loop because an older process is still writing the previous cadence text.
