import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const apkPath = join(root, 'build', 'app', 'outputs', 'flutter-apk', 'app-debug.apk');
const evidencePath = join(root, 'docs', 'APK_INSTALL_EVIDENCE.md');
const packageName = 'com.example.hashdate_mobile';
const activityName = `${packageName}/.MainActivity`;

function run(command, args) {
  const startedAt = new Date().toISOString();
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    shell: false,
  });
  return {
    command: `${command} ${args.join(' ')}`,
    startedAt,
    status: result.status,
    stdout: result.stdout?.trim() ?? '',
    stderr: result.stderr?.trim() ?? '',
    error: result.error?.message ?? '',
  };
}

function writeEvidence(summary, steps) {
  mkdirSync(join(root, 'docs'), { recursive: true });
  const lines = [
    '# APK Install Evidence',
    '',
    `Last attempted: ${new Date().toISOString()}`,
    '',
    `Summary: ${summary}`,
    '',
    `APK: ${apkPath}`,
    '',
    '## Steps',
    '',
  ];

  for (const step of steps) {
    lines.push(`### ${step.command}`);
    lines.push('');
    lines.push(`- Started: ${step.startedAt}`);
    lines.push(`- Exit code: ${step.status}`);
    for (const text of [step.stdout, step.stderr, step.error].filter(Boolean)) {
      lines.push('');
      lines.push('```text');
      lines.push(text.slice(-4000));
      lines.push('```');
    }
    lines.push('');
  }

  writeFileSync(evidencePath, `${lines.join('\n')}\n`, 'utf8');
}

if (!existsSync(apkPath)) {
  writeEvidence('blocked; APK file not found', []);
  console.error(`APK not found: ${apkPath}`);
  process.exit(1);
}

const steps = [];
const devices = run('adb', ['devices']);
steps.push(devices);

const deviceLines = devices.stdout
  .split(/\r?\n/)
  .slice(1)
  .map((line) => line.trim())
  .filter((line) => line && line.endsWith('\tdevice'));

if (devices.status !== 0 || deviceLines.length === 0) {
  writeEvidence('blocked; no connected Android device or emulator detected by adb devices', steps);
  console.error('No connected Android device or emulator detected.');
  process.exit(2);
}

const install = run('adb', ['install', '-r', apkPath]);
steps.push(install);
if (install.status !== 0) {
  writeEvidence('failed during adb install', steps);
  process.exit(install.status ?? 1);
}

const launch = run('adb', ['shell', 'am', 'start', '-n', activityName]);
steps.push(launch);
if (launch.status !== 0) {
  writeEvidence('failed during app launch', steps);
  process.exit(launch.status ?? 1);
}

const currentFocus = run('adb', ['shell', 'dumpsys', 'window', 'windows']);
steps.push(currentFocus);
writeEvidence('success; APK installed and launch command completed', steps);
console.log('APK install and launch smoke completed.');
