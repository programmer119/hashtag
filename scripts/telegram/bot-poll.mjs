import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { buildStatusReport } from './status-report.mjs';

const execFileAsync = promisify(execFile);
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const codexCommand = process.env.CODEX_COMMAND || 'codex';
const root = fileURLToPath(new URL('../../', import.meta.url));
const offsetPath = join(root, 'docs/telegram/.telegram-offset');
const queuePath = join(root, 'docs/telegram/COMMAND_QUEUE.md');
const resultsPath = join(root, 'docs/telegram/COMMAND_RESULTS.md');
const codexOutputPath = join(root, 'docs/telegram/.codex-telegram-output.txt');

if (!token || !chatId) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.');
  process.exit(1);
}

function readOffset() {
  try {
    return Number(readFileSync(offsetPath, 'utf8').trim()) || 0;
  } catch {
    return 0;
  }
}

function writeOffset(offset) {
  writeFileSync(offsetPath, String(offset));
}

async function sendMessage(text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  });
}

async function sendLongMessage(text) {
  const clean = text.trim() || 'Codex finished without a text result.';
  const limit = 3500;
  for (let index = 0; index < clean.length; index += limit) {
    await sendMessage(clean.slice(index, index + limit));
  }
}

function queueCommand(kind, text, from) {
  const stamp = new Date().toISOString();
  appendFileSync(
    queuePath,
    `\n- [ ] ${stamp} ${kind} from ${from || 'telegram'}: ${text.trim()}\n`
  );
}

function appendCompleted(kind, text, from, result) {
  const stamp = new Date().toISOString();
  appendFileSync(
    queuePath,
    `\n- [x] ${stamp} ${kind} from ${from || 'telegram'}: ${text.trim()}. Result: ${result}\n`
  );
}

function trySimpleArithmetic(text) {
  const normalized = text
    .replace(/[？?]/g, '')
    .replace(/\s+/g, '')
    .trim();
  const match = normalized.match(/^(-?\d+(?:\.\d+)?)([+\-*/xX×÷])(-?\d+(?:\.\d+)?)$/);
  if (!match) return null;

  const left = Number(match[1]);
  const right = Number(match[3]);
  const operator = match[2];
  let value;

  if (operator === '+') value = left + right;
  else if (operator === '-') value = left - right;
  else if (operator === '*' || operator === 'x' || operator === 'X' || operator === '×') value = left * right;
  else if (operator === '/' || operator === '÷') {
    if (right === 0) return 'Cannot divide by zero.';
    value = left / right;
  }

  return `${match[1]}${operator}${match[3]} = ${Number.isInteger(value) ? value : Number(value.toFixed(6))}`;
}

function codexPrompt(kind, text, from) {
  return [
    `You are processing a Telegram ${kind} for the Hashdate project.`,
    `Requester: ${from || 'telegram'}`,
    `Command: ${text.trim()}`,
    '',
    'Work autonomously inside this workspace. Make routine product, technical, UI, UX, architecture, and implementation decisions without asking the owner.',
    'If the command is a simple question, answer directly. If it asks for project work, make the needed local changes and verify them where reasonable.',
    'Do not hardcode secrets. Treat owner-controlled external accounts, production credentials, payment credentials, and legal identity actions as blockers.',
    'Keep the final answer concise and suitable for posting back to Telegram. Include changed files and verification only when relevant.'
  ].join('\n');
}

async function runCodexNow(kind, text, from) {
  await sendMessage('Codex is processing this now.');
  try {
    await execFileAsync(codexCommand, [
      'exec',
      '--skip-git-repo-check',
      '-s',
      'workspace-write',
      '-C',
      root,
      '-o',
      codexOutputPath,
      codexPrompt(kind, text, from)
    ], {
      cwd: root,
      windowsHide: true,
      maxBuffer: 1024 * 1024 * 8,
      timeout: Number(process.env.TELEGRAM_CODEX_TIMEOUT_MS || 1000 * 60 * 20)
    });
    const finalText = readFileSync(codexOutputPath, 'utf8').trim();
    appendCompleted(kind, text, from, 'codex exec completed');
    appendFileSync(resultsPath, `\n- [x] ${new Date().toISOString()} Codex result for ${kind} from ${from || 'telegram'}:\n  ${finalText.replace(/\n/g, '\n  ')}\n`);
    return sendLongMessage(finalText);
  } catch (error) {
    const message = `Codex execution failed: ${error?.message ?? error}`;
    appendCompleted(kind, text, from, message);
    return sendLongMessage(message);
  }
}

function commandHelp() {
  return [
    'Hashdate bot commands:',
    '/help',
    '/status',
    '/progress',
    '/workers',
    '/worklist',
    '/blockers',
    '/links',
    '/codex <task>',
    '/decide <decision>',
    '/priority <item>'
  ].join('\n');
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8');
}

async function handleCommand(text, from) {
  if (text === '/help') return sendMessage(commandHelp());
  if (text === '/status' || text === '/progress') return sendMessage(buildStatusReport());
  if (text === '/workers') return sendMessage(read('docs/WORKLIST.md').slice(0, 3500));
  if (text === '/worklist') return sendMessage(read('docs/WORKLIST.md').slice(0, 3500));
  if (text === '/blockers') return sendMessage(read('docs/qa/EXTERNAL_OWNER_BLOCKERS.md').slice(0, 3500));
  if (text === '/links') {
    return sendMessage([
      'Hashdate links:',
      'Status page: http://localhost:3000/work-status',
      'Progress: docs/PROGRESS.md',
      'Worklist: docs/WORKLIST.md',
      'Command queue: docs/telegram/COMMAND_QUEUE.md'
    ].join('\n'));
  }
  if (text.startsWith('/codex ')) {
    const task = text.slice('/codex '.length);
    const arithmeticAnswer = trySimpleArithmetic(task);
    if (arithmeticAnswer) {
      appendCompleted('codex-task', task, from, `answered immediately in Telegram; ${arithmeticAnswer}`);
      return sendMessage(arithmeticAnswer);
    }
    return runCodexNow('codex-task', task, from);
  }
  if (text.startsWith('/decide ')) {
    return runCodexNow('owner-decision', text.slice('/decide '.length), from);
  }
  if (text.startsWith('/priority ')) {
    return runCodexNow('priority', text.slice('/priority '.length), from);
  }
}

const offset = readOffset();
const response = await fetch(
  `https://api.telegram.org/bot${token}/getUpdates?timeout=0&offset=${offset}`
);

if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}

const payload = await response.json();
let nextOffset = offset;

for (const update of payload.result ?? []) {
  nextOffset = Math.max(nextOffset, update.update_id + 1);
  const message = update.message;
  if (!message?.text) continue;
  if (String(message.chat.id) !== String(chatId)) continue;
  const from = message.from?.username || message.from?.first_name || 'telegram';
  await handleCommand(message.text.trim(), from);
}

writeOffset(nextOffset);
console.log(`Processed ${payload.result?.length ?? 0} Telegram updates.`);
