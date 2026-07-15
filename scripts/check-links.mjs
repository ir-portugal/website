import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve, sep } from 'node:path';

const root = resolve('dist');
const configuredBase = (process.env.BASE_PATH || '/').replace(/\/$/, '');

if (!existsSync(root)) {
  console.error('dist/ does not exist. Run npm run build first.');
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function targetFor(reference, sourceFile) {
  const clean = reference.split('#')[0].split('?')[0];
  if (!clean || /^(?:[a-z]+:|\/\/)/i.test(clean)) return null;

  let path;
  if (clean.startsWith('/')) {
    const withoutBase =
      configuredBase && clean.startsWith(`${configuredBase}/`)
        ? clean.slice(configuredBase.length)
        : clean;
    path = join(root, withoutBase.replace(/^\//, ''));
  } else {
    path = resolve(dirname(sourceFile), clean);
  }

  if (path.endsWith(sep) || !/\.[a-z0-9]+$/i.test(path))
    path = join(path, 'index.html');
  return normalize(path);
}

const missing = [];
const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const references = html.matchAll(/(?:href|src)=["']([^"']+)["']/g);

  for (const [, reference] of references) {
    const target = targetFor(reference, file);
    if (target && !existsSync(target)) {
      missing.push(`${relative(root, file)} -> ${reference}`);
    }
  }
}

if (missing.length > 0) {
  console.error(
    `Found ${missing.length} broken internal reference(s):\n${missing.join('\n')}`,
  );
  process.exit(1);
}

console.log(
  `Checked ${htmlFiles.length} HTML files: no broken internal references.`,
);
