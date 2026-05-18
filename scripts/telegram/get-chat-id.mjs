const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Missing TELEGRAM_BOT_TOKEN.');
  process.exit(1);
}

const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);

if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}

const payload = await response.json();
const updates = payload.result ?? [];

if (updates.length === 0) {
  console.log([
    'No Telegram updates found.',
    'Open a 1:1 chat with the bot or add it to a group, then send /start or test.',
    'Run this script again after the message is sent.'
  ].join('\n'));
  process.exit(0);
}

for (const update of updates) {
  const message = update.message ?? update.channel_post;
  if (!message?.chat) continue;

  const chat = message.chat;
  console.log([
    `chat_id=${chat.id}`,
    `type=${chat.type}`,
    `title=${chat.title ?? ''}`,
    `username=${chat.username ? `@${chat.username}` : ''}`,
    `text=${message.text ?? ''}`,
    '---'
  ].join('\n'));
}

