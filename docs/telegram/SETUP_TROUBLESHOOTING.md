# Telegram Setup Troubleshooting

## Bot Does Not Appear In Group Invite Search

Use the bot username, not the display name.

1. Open BotFather.
2. Send `/mybots`.
3. Select the Hashdate bot.
4. Copy the bot `Username`, usually ending in `_bot`.
5. Open the bot directly with `https://t.me/<username>`.
6. Send `/start` in the 1:1 bot chat.
7. Return to the group and search for `@<username>`.

If it still does not appear:

1. Open BotFather.
2. Send `/mybots`.
3. Select the bot.
4. Open `Bot Settings`.
5. Check whether group usage is allowed.
6. If available, enable group access and retry.

## Fastest Setup

The fastest path is to use the bot 1:1 chat first.

1. Open the bot with `https://t.me/<username>`.
2. Send `/start`.
3. Set `TELEGRAM_BOT_TOKEN`.
4. Run:

```powershell
node scripts\telegram\get-chat-id.mjs
```

5. Use the returned `chat_id` as `TELEGRAM_CHAT_ID`.

This sends reports to the owner directly instead of a group. A group can be added later.

## Getting Group Chat ID

1. Create the group.
2. Add the Hashdate bot.
3. Send `test` in the group.
4. Run:

```powershell
node scripts\telegram\get-chat-id.mjs
```

Group chat IDs usually look like negative numbers, often starting with `-100`.

## Security

If a bot token is pasted into chat or a public place, rotate it in BotFather before production use.

