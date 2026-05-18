# Telegram Report Schedule

Owner: Codex / Lead Architect

Timezone: Asia/Seoul

## Active Schedule

- Until `2026-05-20 00:00 KST`: send a Telegram progress report every 30 minutes.
- From `2026-05-20 00:00 KST`: send a Telegram progress report every day at `08:00 KST` and `20:00 KST`.

## Security Rule

Bot tokens and chat IDs must be provided through runtime environment variables. They must not be committed to the repository.

Required environment variables:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

Optional override variables:

```text
TELEGRAM_REPORT_CUTOFF_ISO=2026-05-19T15:00:00.000Z
TELEGRAM_REPORT_DAILY_HOURS=8,20
TELEGRAM_REPORT_PRE_CUTOFF_INTERVAL_MS=1800000
```

The cutoff ISO above is `2026-05-20 00:00 KST`.

