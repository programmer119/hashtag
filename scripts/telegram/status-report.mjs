import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8');
}

function extractOverall(progress) {
  const match = progress.match(/Current overall progress:\s*(\d+%)/);
  return match?.[1] ?? 'unknown';
}

function extractTableRows(markdown, heading) {
  const start = markdown.indexOf(heading);
  if (start === -1) return [];
  const rest = markdown.slice(start);
  const nextHeading = rest.slice(heading.length).search(/\n## /);
  const section = nextHeading === -1 ? rest : rest.slice(0, heading.length + nextHeading);
  return section
    .split('\n')
    .filter((line) => line.startsWith('|') && !line.includes('---'))
    .slice(1)
    .map((line) =>
      line
        .split('|')
        .map((cell) => cell.trim())
        .filter(Boolean)
    );
}

export function buildStatusReport() {
  const progress = read('docs/PROGRESS.md');
  const worklist = read('docs/WORKLIST.md');
  const blockers = read('docs/qa/EXTERNAL_OWNER_BLOCKERS.md');

  const overall = extractOverall(progress);
  const areaRows = extractTableRows(progress, '## Area Progress');
  const teamRows = extractTableRows(worklist, '## Team');

  const areaText = areaRows
    .map(([area, owner, pct, status]) => `- ${area}: ${pct} (${owner}) - ${status}`)
    .join('\n');

  const teamText = teamRows
    .map(([name, role, , pct]) => `- ${name}: ${pct} - ${role}`)
    .join('\n');

  const blockerSummary = blockers.includes('Blocked')
    ? 'External blockers are tracked in docs/qa/EXTERNAL_OWNER_BLOCKERS.md.'
    : 'No external blocker summary found.';

  return [
    `Hashdate progress update`,
    `Overall: ${overall}`,
    ``,
    `Workers:`,
    teamText,
    ``,
    `Areas:`,
    areaText,
    ``,
    blockerSummary,
    ``,
    `Local status page: http://localhost:3000/work-status`
  ].join('\n');
}

if (process.argv[1]?.endsWith('status-report.mjs')) {
  console.log(buildStatusReport());
}
