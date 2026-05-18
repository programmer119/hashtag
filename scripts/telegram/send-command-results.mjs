import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const root = fileURLToPath(new URL('../../', import.meta.url));
const resultsPath = join(root, 'docs/telegram/COMMAND_RESULTS.md');

if (!token || !chatId) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.');
  process.exit(1);
}

function splitSections(markdown) {
  const pendingHeader = '## Pending Send';
  const sentHeader = '## Sent';
  const pendingStart = markdown.indexOf(pendingHeader);
  const sentStart = markdown.indexOf(sentHeader);

  if (pendingStart === -1 || sentStart === -1 || sentStart < pendingStart) {
    throw new Error('COMMAND_RESULTS.md is missing required sections.');
  }

  return {
    beforePending: markdown.slice(0, pendingStart + pendingHeader.length),
    pending: markdown.slice(pendingStart + pendingHeader.length, sentStart).trim(),
    sentHeader,
    sent: markdown.slice(sentStart + sentHeader.length).trim()
  };
}

function parsePendingBlocks(pending) {
  if (!pending || pending === 'No pending results.') return [];
  return pending
    .split(/\n(?=- \[ \] )/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function messageFromBlock(block) {
  return block
    .replace(/^- \[ \] /, '')
    .replace(/\n  /g, '\n')
    .trim();
}

async function sendMessage(text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

const current = readFileSync(resultsPath, 'utf8');
const sections = splitSections(current);
const pendingBlocks = parsePendingBlocks(sections.pending);

if (pendingBlocks.length === 0) {
  console.log('No pending Telegram command results.');
  process.exit(0);
}

const sentBlocks = [];

for (const block of pendingBlocks) {
  await sendMessage(messageFromBlock(block));
  sentBlocks.push(block.replace('- [ ] ', '- [x] '));
}

const next = [
  sections.beforePending,
  '',
  'No pending results.',
  '',
  sections.sentHeader,
  '',
  sentBlocks.join('\n\n'),
  sections.sent ? `\n\n${sections.sent}` : ''
].join('\n');

writeFileSync(resultsPath, `${next.trimEnd()}\n`);
console.log(`Sent ${sentBlocks.length} Telegram command result(s).`);
