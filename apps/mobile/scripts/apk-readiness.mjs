import { existsSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { flutterCommand } from './flutter-command.mjs';

const root = process.cwd();
const toolHome = join(root, '.tooling', 'home');
mkdirSync(toolHome, { recursive: true });
const requiredFiles = [
  'pubspec.yaml',
  'lib/main.dart',
  'lib/app/hashdate_mock_app.dart',
  'lib/core/mock/mock_app_data.dart'
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));
const flutter = spawnSync(flutterCommand(root), ['--version'], {
  encoding: 'utf8',
  shell: flutterCommand(root).endsWith('.bat') || flutterCommand(root).endsWith('.cmd'),
  env: {
    ...process.env,
    APPDATA: join(toolHome, 'AppData', 'Roaming'),
    LOCALAPPDATA: join(toolHome, 'AppData', 'Local'),
    PUB_CACHE: join(root, '.tooling', 'pub-cache'),
    FLUTTER_SUPPRESS_ANALYTICS: 'true',
  },
});
const adb = spawnSync('adb', ['version'], {
  encoding: 'utf8',
  shell: false
});
const hasAndroidFolder = existsSync(join(root, 'android'));

console.log('# APK Readiness');
console.log('');
console.log(`Required source files: ${missing.length === 0 ? 'ready' : `missing ${missing.join(', ')}`}`);
console.log(`Flutter toolchain: ${flutter.status === 0 ? 'available' : flutter.error?.message ?? 'missing from PATH'}`);
console.log(`Android platform folder: ${hasAndroidFolder ? 'present' : 'missing; run flutter create .'}`);
console.log(`ADB: ${adb.status === 0 ? 'available' : adb.error?.message ?? 'optional missing from PATH'}`);
console.log('');

if (missing.length > 0) {
  process.exitCode = 1;
} else if (flutter.status !== 0) {
  console.log('Next command after Flutter install: npm run apk:build-debug');
  process.exitCode = 2;
} else if (!hasAndroidFolder) {
  console.log('Next command: npm run apk:build-debug');
  process.exitCode = 3;
} else {
  console.log('Next command: npm run apk:build-debug');
}
