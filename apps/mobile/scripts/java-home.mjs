import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

export function javaHome() {
  const localJdk17 = join(process.cwd(), '.tooling', 'jdk17', 'jdk-17.0.19+10');
  const candidates = [
    process.env.HASHDATE_JAVA_HOME,
    localJdk17,
    join('C:\\', 'Program Files', 'Android', 'Android Studio', 'jre'),
    join('C:\\', 'Program Files', 'Android', 'Android Studio', 'jbr'),
    process.env.JAVA_HOME,
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (existsSync(join(candidate, 'bin', 'java.exe'))) return candidate;
  }

  return process.env.JAVA_HOME ?? '';
}

export function javaBin() {
  const home = javaHome();
  return home ? join(home, 'bin') : dirname('java');
}
