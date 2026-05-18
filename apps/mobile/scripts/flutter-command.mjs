import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function flutterCommand(root = process.cwd()) {
  const localWindows = join(root, '.tooling', 'flutter', 'bin', 'flutter.bat');
  const localUnix = join(root, '.tooling', 'flutter', 'bin', 'flutter');
  if (existsSync(localWindows)) return localWindows;
  if (existsSync(localUnix)) return localUnix;
  return 'flutter';
}

export function dartCommand(root = process.cwd()) {
  const localWindows = join(root, '.tooling', 'flutter', 'bin', 'dart.bat');
  const localUnix = join(root, '.tooling', 'flutter', 'bin', 'dart');
  if (existsSync(localWindows)) return localWindows;
  if (existsSync(localUnix)) return localUnix;
  return 'dart';
}
