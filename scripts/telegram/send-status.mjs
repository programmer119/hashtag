import { buildStatusReport } from './status-report.mjs';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!token || !chatId) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.');
  process.exit(1);
}

const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    chat_id: chatId,
    text: buildStatusReport(),
    disable_web_page_preview: true
  })
});

if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}

console.log('Telegram status sent.');

