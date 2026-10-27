// Post-build checks on dist/. Run with `npm run test:links` after `npm run build`.
// - every internal href/src resolves to a file in dist (respecting BASE_PATH)
// - no inline <script> code, inline style attributes, javascript: URLs or inline event handlers
// - no "#" placeholder links, no draft markers, no obvious secrets
// - host header files carry the same CSP as src/lib/security.ts
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, posix } from 'node:path';

const root = new URL('../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const dist = join(root, 'dist');
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const errors = [];

if (!existsSync(dist)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

function resolveInternal(ref, fromFile) {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return true; // same-page anchor
  let rel;
  if (clean.startsWith('/')) {
    if (!clean.startsWith(base)) return false; // missing base path prefix
    rel = clean.slice(base.length);
  } else {
    rel = posix.join(posix.dirname(relative(dist, fromFile).replaceAll('\\', '/')), clean);
  }
  const target = join(dist, decodeURIComponent(rel));
  return (
    (existsSync(target) && statSync(target).isFile()) ||
    existsSync(join(target, 'index.html'))
  );
}

for (const file of htmlFiles) {
  const name = relative(dist, file);
  const html = readFileSync(file, 'utf8');

  for (const [, attr, ref] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    if (ref === '#' || ref === '') errors.push(`${name}: empty or "#" ${attr}`);
    else if (/^javascript:/i.test(ref)) errors.push(`${name}: javascript: URL`);
    else if (/^(https?:|mailto:|tel:|data:)/i.test(ref) || ref.startsWith('//')) {
      if (/^http:\/\/(?!localhost)/i.test(ref)) errors.push(`${name}: insecure http link ${ref}`);
    } else if (ref.startsWith('#')) {
      const id = ref.slice(1);
      if (!html.includes(`id="${id}"`)) errors.push(`${name}: anchor ${ref} has no target`);
    } else if (!resolveInternal(ref, file)) {
      errors.push(`${name}: broken internal ${attr} ${ref}`);
    }
  }

  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!/\bsrc=/.test(m[1]) && m[2].trim()) errors.push(`${name}: inline <script> (blocked by CSP)`);
  }
  if (/\sstyle="/.test(html)) errors.push(`${name}: inline style attribute (blocked by CSP)`);
  if (/<style[\s>]/.test(html)) errors.push(`${name}: inline <style> element (blocked by CSP)`);
  if (/\son[a-z]+="/i.test(html)) errors.push(`${name}: inline event handler`);
  if (/draft-badge|is-draft|DRAFT —|CONFIRM/.test(html)) errors.push(`${name}: draft content in production build`);
  if (!/<html lang="/.test(html)) errors.push(`${name}: missing lang attribute`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${name}: missing <title>`);
}

// Very rough secret sniffing across every built file.
const secretPatterns = [/AKIA[0-9A-Z]{16}/, /gh[pousr]_[A-Za-z0-9]{30,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /xox[baprs]-[A-Za-z0-9-]{10,}/];
for (const file of files.filter((f) => /\.(html|js|css|txt|xml|json)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  if (secretPatterns.some((re) => re.test(text))) errors.push(`${relative(dist, file)}: looks like it contains a secret`);
}

// CSP consistency between src/lib/security.ts and host header files.
const securityTs = readFileSync(join(root, 'src/lib/security.ts'), 'utf8');
const directives = [...securityTs.matchAll(/^\s+"([^"]+)",$/gm)].map((m) => m[1]);
for (const hostFile of ['public/_headers', 'vercel.json']) {
  const text = readFileSync(join(root, hostFile), 'utf8');
  for (const d of [...directives, "frame-ancestors 'none'"]) {
    if (!text.includes(d)) errors.push(`${hostFile}: CSP is missing "${d}" — keep it in sync with src/lib/security.ts`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${htmlFiles.length} pages checked (base "${base}"): links, CSP-safe markup, no drafts, header CSP in sync.`);
