import { setTimeout as sleep } from 'node:timers/promises';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildStatusReport } from './status-report.mjs';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const sendImmediately = process.env.TELEGRAM_REPORT_SEND_IMMEDIATELY === '1';
const preCutoffIntervalMs = Number(process.env.TELEGRAM_REPORT_PRE_CUTOFF_INTERVAL_MS || 1800000);
const cutoffIso = process.env.TELEGRAM_REPORT_CUTOFF_ISO || '2026-05-19T15:00:00.000Z';
const cutoffAt = new Date(cutoffIso);
const dailyHours = (process.env.TELEGRAM_REPORT_DAILY_HOURS || '8,20')
  .split(',')
  .map((hour) => Number(hour.trim()))
  .filter((hour) => Number.isInteger(hour) && hour >= 0 && hour <= 23);
const root = fileURLToPath(new URL('../../', import.meta.url));
const statePath = join(root, 'docs/telegram/REPORT_STATE.md');
const logPath = join(root, 'docs/telegram/REPORT_LOOP_LOG.md');

if (!token || !chatId) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.');
  process.exit(1);
}

function log(message) {
  appendFileSync(logPath, `\n- ${new Date().toISOString()} ${message}\n`);
}

function updateState(result) {
  const now = new Date().toISOString();
  const state = [
    '# Telegram Report State',
    '',
    `Last attempted report: ${now}`,
    '',
    result.ok ? `Last successful report: ${now}` : readLastSuccessful(),
    '',
    'Cadence: every 30 minutes until 2026-05-20 00:00 KST, then daily at 08:00 and 20:00 KST',
    '',
    'Rule: the local Telegram report loop sends status updates independently from Codex heartbeat execution.',
    '',
    `Last result: ${result.message}`
  ].join('\n');
  writeFileSync(statePath, `${state}\n`);
}

function readLastSuccessful() {
  try {
    const current = readFileSync(statePath, 'utf8');
    const match = current.match(/Last successful report: .+/);
    return match?.[0] ?? 'Last successful report: never';
  } catch {
    return 'Last successful report: never';
  }
}

async function sendStatus() {
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
    const body = await response.text();
    updateState({ ok: false, message: `failed: ${body}` });
    log(`send failed: ${body}`);
    return;
  }

  updateState({ ok: true, message: 'success. Local report loop sent the scheduled Telegram status update.' });
  log('status sent');
}

function nextDailyDelayMs(now) {
  const kstOffsetMs = 9 * 60 * 60 * 1000;
  const kstNow = new Date(now.getTime() + kstOffsetMs);
  const year = kstNow.getUTCFullYear();
  const month = kstNow.getUTCMonth();
  const date = kstNow.getUTCDate();

  const candidates = [];
  for (const dayOffset of [0, 1]) {
    for (const hour of dailyHours) {
      const kstCandidate = Date.UTC(year, month, date + dayOffset, hour, 0, 0, 0);
      const utcCandidate = new Date(kstCandidate - kstOffsetMs);
      if (utcCandidate > now) candidates.push(utcCandidate);
    }
  }

  candidates.sort((a, b) => a.getTime() - b.getTime());
  return Math.max(1000, (candidates[0] ?? new Date(now.getTime() + 12 * 60 * 60 * 1000)).getTime() - now.getTime());
}

function nextDelayMs() {
  const now = new Date();
  if (now < cutoffAt) return preCutoffIntervalMs;
  return nextDailyDelayMs(now);
}

log(`report loop started; pre-cutoff interval ${preCutoffIntervalMs}ms, cutoff ${cutoffAt.toISOString()}, daily KST hours ${dailyHours.join(',')}`);

if (sendImmediately) {
  await sendStatus();
}

while (true) {
  const delay = nextDelayMs();
  log(`next report in ${Math.round(delay / 1000)} seconds`);
  await sleep(delay);
  await sendStatus();
}
