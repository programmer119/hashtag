import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { flutterCommand, dartCommand } from './flutter-command.mjs';
import { javaBin, javaHome } from './java-home.mjs';

const root = process.cwd();
const toolHome = join(root, '.tooling', 'home');
mkdirSync(toolHome, { recursive: true });

const checks = [
  { name: 'Git', command: 'git', args: ['--version'], required: true },
  { name: 'Flutter', command: flutterCommand(), args: ['--version'], required: true },
  { name: 'Dart', command: dartCommand(), args: ['--version'], required: true },
  { name: 'Java', command: join(javaBin(), 'java.exe'), args: ['-version'], required: true },
  { name: 'ADB', command: 'adb', args: ['version'], required: false },
  { name: 'Winget', command: 'winget', args: ['--version'], required: false },
];

let missingRequired = false;

console.log('# Mobile Toolchain Check');
console.log('');

for (const check of checks) {
  const result = spawnSync(check.command, check.args, {
    encoding: 'utf8',
    shell: check.command.endsWith('.bat') || check.command.endsWith('.cmd'),
    env: {
      ...process.env,
      APPDATA: join(toolHome, 'AppData', 'Roaming'),
      LOCALAPPDATA: join(toolHome, 'AppData', 'Local'),
      PUB_CACHE: join(root, '.tooling', 'pub-cache'),
      FLUTTER_SUPPRESS_ANALYTICS: 'true',
      JAVA_HOME: javaHome(),
      PATH: `${javaBin()};${process.env.PATH ?? ''}`,
    },
  });
  const ok = result.status === 0;
  if (!ok && check.required) missingRequired = true;
  const firstLine = ok
    ? `${result.stdout || result.stderr}`.trim().split(/\r?\n/)[0]
    : result.error?.message ?? 'missing from PATH';
  console.log(`- ${check.name}: ${ok ? 'ok' : check.required ? 'missing' : 'optional missing'} (${firstLine})`);
}

console.log('');
if (missingRequired) {
  console.log('Next: install Flutter SDK and add Flutter bin to PATH, then run npm run apk:readiness.');
  process.exitCode = 2;
} else {
  console.log('Next: run npm run apk:build-debug.');
}
