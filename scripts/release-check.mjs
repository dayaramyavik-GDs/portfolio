// Pre-publication gate: lists content that still needs the owner's approval.
// `npm run release-check` exits with an error while essentials are missing.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const profileTs = readFileSync(join(root, 'src/data/profile.ts'), 'utf8');
const missing = [];
const notes = [];

const field = (name) => profileTs.match(new RegExp(`^\\s+${name}: (.+),$`, 'm'))?.[1].trim();
for (const name of ['email', 'linkedin', 'github']) {
  if (field(name) === 'null') missing.push(`profile.${name} is not set (src/data/profile.ts)`);
}
const resume = field('resumeFile')?.replace(/['"]/g, '');
if (!resume || !existsSync(join(root, 'public', resume))) missing.push(`public/${resume} (approved public CV) is missing`);

const projectsDir = join(root, 'src/content/projects');
const projects = readdirSync(projectsDir).filter((f) => f.endsWith('.md'));
const published = projects.filter((f) => /^published:\s*true/m.test(readFileSync(join(projectsDir, f), 'utf8')));
if (published.length === 0) missing.push('no projects are published (set `published: true` after confirming content)');
for (const f of published) {
  const text = readFileSync(join(projectsDir, f), 'utf8');
  if (/CONFIRM|DRAFT/.test(text)) missing.push(`${f} is published but still contains CONFIRM/DRAFT text`);
}
if (!/published: true/.test(profileTs.split('skillGroups')[1] ?? '')) notes.push('no skills are published yet');
if (/education: Education\[\] = \[\]/.test(profileTs)) notes.push('no education entries yet');

if (notes.length) console.log(`Notes:\n  - ${notes.join('\n  - ')}`);
if (missing.length) {
  console.error(`\nNot ready to publish — ${missing.length} item(s):\n  - ${missing.join('\n  - ')}\nSee docs/pre-publication-checklist.md`);
  process.exit(1);
}
console.log('✓ Essentials present. Complete the manual items in docs/pre-publication-checklist.md before going live.');
