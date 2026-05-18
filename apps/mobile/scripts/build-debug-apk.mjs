import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { flutterCommand } from './flutter-command.mjs';
import { javaBin, javaHome } from './java-home.mjs';

const root = process.cwd();
const evidencePath = join(root, 'docs', 'APK_BUILD_EVIDENCE.md');
const flutter = flutterCommand(root);

function run(command, args) {
  const startedAt = new Date().toISOString();
  const toolHome = join(root, '.tooling', 'home');
  mkdirSync(toolHome, { recursive: true });
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    shell: command.endsWith('.bat') || command.endsWith('.cmd'),
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
  return {
    command: `${command} ${args.join(' ')}`,
    startedAt,
    status: result.status,
    stdout: result.stdout?.trim() ?? '',
    stderr: result.stderr?.trim() ?? '',
    error: result.error?.message ?? '',
  };
}

function writeEvidence(steps, summary) {
  mkdirSync(join(root, 'docs'), { recursive: true });
  const lines = [
    '# APK Build Evidence',
    '',
    `Last attempted: ${new Date().toISOString()}`,
    '',
    `Summary: ${summary}`,
    '',
    '## Steps',
    '',
  ];

  for (const step of steps) {
    lines.push(`### ${step.command}`);
    lines.push('');
    lines.push(`- Started: ${step.startedAt}`);
    lines.push(`- Exit code: ${step.status}`);
    if (step.stdout) {
      lines.push('');
      lines.push('```text');
      lines.push(step.stdout.slice(-4000));
      lines.push('```');
    }
    if (step.stderr) {
      lines.push('');
      lines.push('```text');
      lines.push(step.stderr.slice(-4000));
      lines.push('```');
    }
    if (step.error) {
      lines.push('');
      lines.push('```text');
      lines.push(step.error);
      lines.push('```');
    }
    lines.push('');
  }

  writeFileSync(evidencePath, `${lines.join('\n')}\n`, 'utf8');
}

const requiredFiles = [
  'pubspec.yaml',
  'lib/main.dart',
  'lib/app/hashdate_mock_app.dart',
  'lib/core/mock/mock_app_data.dart',
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  writeEvidence([], `blocked; missing source files: ${missing.join(', ')}`);
  console.error(`Missing source files: ${missing.join(', ')}`);
  process.exit(1);
}

const flutterVersion = run(flutter, ['--version']);
if (flutterVersion.status !== 0) {
  writeEvidence([flutterVersion], 'blocked; Flutter is missing from PATH');
  console.error('Flutter is missing from PATH. Install Flutter SDK and retry.');
  process.exit(2);
}

const steps = [flutterVersion];

if (!existsSync(join(root, 'android'))) {
  const create = run(flutter, ['create', '.']);
  steps.push(create);
  if (create.status !== 0) {
    writeEvidence(steps, 'failed during flutter create .');
    process.exit(create.status ?? 1);
  }
}

const pubGet = run(flutter, ['pub', 'get']);
steps.push(pubGet);
if (pubGet.status !== 0) {
  writeEvidence(steps, 'failed during flutter pub get');
  process.exit(pubGet.status ?? 1);
}

const build = run(flutter, ['build', 'apk', '--debug']);
steps.push(build);
if (build.status !== 0) {
  writeEvidence(steps, 'failed during flutter build apk --debug');
  process.exit(build.status ?? 1);
}

const apkPath = join(root, 'build', 'app', 'outputs', 'flutter-apk', 'app-debug.apk');
writeEvidence(steps, existsSync(apkPath) ? `success; APK at ${apkPath}` : 'build exited 0 but APK path was not found');
console.log(existsSync(apkPath) ? `APK built: ${apkPath}` : 'Build completed, but APK path was not found.');
