# Yavik Dayaram — Portfolio

Static portfolio site for **Yavik Dayaram, IT Support & App Developer** (Melbourne). Built with [Astro](https://astro.build) 7, TypeScript and plain CSS. No database, no login, no tracking.

**Status: ready for owner setup — not live.** Contact details, CV and project content still need approval. Run `npm run release-check` to see what's missing, and see [docs/pre-publication-checklist.md](docs/pre-publication-checklist.md).

## Contents

- [Run it locally](#run-it-locally)
- [Edit content](#edit-content)
- [Replace the CV](#replacing-the-cv)
- [Put it on GitHub](#put-it-on-github)
- [Deploy](#deploy)
- [Update and roll back](#update-and-roll-back)
- Docs: [research](docs/research.md) · [design](docs/design.md) · [security](docs/security.md) · [testing](docs/testing.md)

## Run it locally

You need Node.js 22.12 or newer. Node 24 LTS is recommended (`.nvmrc`).

```bash
npm ci
```

```bash
npm run dev
```

Open http://localhost:4321. The dev server shows **draft** content with a dashed outline and a "Draft — hidden in production" badge. Visitors never see drafts.

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with drafts visible |
| `npm run build` | Production build into `dist/` (drafts excluded) |
| `npm run preview` | Serve `dist/` locally to check the real output |
| `npm test` | Type check, build and post-build checks (links, CSP-safe markup, no drafts) |
| `npm run release-check` | Lists missing content and fails until the essentials are present |

## Edit content

All content lives in two places. You never need to touch the components.

### `src/data/profile.ts`: you
- `email`, `linkedin`, `github`, `repository`: replace `null` with the real value in quotes. Anything left `null` stays hidden.
- `about`: the About paragraphs.
- `experience`: jobs. Only add bullets you can stand behind.
- `education`: confirmed qualifications only.
- `skillGroups`: set `published: true` on a skill once you can back it up. Optionally set `project: 'slug'` to link it to a case study.

### `src/content/projects/*.md`: one file per project
The front matter at the top is checked on every build. If it's wrong, the build fails with a clear message instead of publishing a broken page.

```yaml
---
title: My Project
area: app                 # app | support
type: Personal Lab        # Academic Project | Personal Lab | Prototype | Work Project | Production
status: Completed         # Completed | In Progress | Concept
problem: "One sentence: the problem it solves."
contribution: "One sentence: what you did."
tech: ["Node.js", "Express"]
repo: https://github.com/you/repo   # optional, omit if none
demo: https://...                   # optional
cover: ./images/my-project.png      # optional; put the image beside the file
coverAlt: "Describe the screenshot"  # required if cover is set
date: "2025"
featured: true            # show on the homepage (keep 3–5)
order: 10                 # lower = earlier
published: true           # false = draft (dev only)
---
Case study in Markdown…
```

- **Add**: copy an existing file and rename it. The file name becomes the URL (`/projects/my-project/`).
- **Unpublish**: set `published: false`.
- **Remove**: delete the file.
- **Reorder**: change `order`.

App case study headings: Problem and users → What I built → Architecture and choices → Accessibility and security → Testing → Result and evidence → Limitations and next steps.
Support case study headings: Environment → Objective → Diagnosis → Safe actions → Verification → Documentation and lessons learned.

Images in `src/content/projects/` are resized and optimised automatically at build time.

### Editing on github.com (no local setup)
Open the file in your repository, click the ✏️ pencil, edit it, then click **Commit changes**. The site rebuilds and redeploys automatically.

## Replacing the CV

1. Export a **public** version of your CV as a PDF, with no home address, referees or other private details. Clear the metadata.
2. Name it `Yavik-Dayaram-CV.pdf` and put it in `public/`, replacing the old one.
3. Commit it. The "Download CV" and "View CV" buttons appear automatically when the file exists, and disappear if it is removed.

To use a different file name, change `resumeFile` in `src/data/profile.ts`.

## Put it on GitHub

Nothing has been uploaded yet. Create an **empty** public repository named `portfolio` on github.com, without a README or licence. Then run these commands in this folder, replacing `YOUR-USERNAME`:

```bash
git init -b main
```

```bash
git add .
```

```bash
git commit -m "Initial portfolio"
```

```bash
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
```

```bash
git push -u origin main
```

If you name the repository `YOUR-USERNAME.github.io`, GitHub Pages serves it at the root (`https://YOUR-USERNAME.github.io/`). In that case, change `BASE_PATH` in `.github/workflows/deploy-pages.yml` to `/`.

Then enable the repository security settings in [docs/security.md](docs/security.md#repository-and-account-settings-owner-actions).

## Deploy

The source stays on GitHub whichever host you choose. Every host builds with `npm run build` and publishes `dist/`. Set these two environment variables:

| Variable | Example | Meaning |
|---|---|---|
| `SITE_URL` | `https://yavikdayaram.com` | Your public address, used for canonical links and the sitemap |
| `BASE_PATH` | `/` or `/portfolio` | `/` unless the site lives in a sub-folder |

### Recommended: Netlify (supports security headers)
1. On netlify.com, go to **Add new site → Import an existing project → GitHub** and choose the repository.
2. `netlify.toml` already sets the build command (`npm run build`), the publish directory (`dist`) and Node 24.
3. No environment variables are needed. Netlify supplies your site address automatically. If you later add a custom domain, set it as the **primary domain** and redeploy.
4. Security headers come from `public/_headers` automatically.

### Cloudflare Pages
**Workers & Pages → Create → Pages → Connect to Git.** Use build command `npm run build` and output directory `dist`. Add the environment variables `SITE_URL` and `NODE_VERSION=24`. Cloudflare reads `public/_headers`.

### Vercel
**Add New → Project**, then import the repository. `vercel.json` sets the build, output and headers. Add `SITE_URL`.

### GitHub Pages
1. In the repository, go to **Settings → Pages → Source: GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy-pages.yml` builds with `SITE_URL=https://<owner>.github.io` and `BASE_PATH=/<repo>`, then deploys.
3. GitHub Pages **can't set custom security headers**. Only the meta-tag CSP applies, without clickjacking protection. See [docs/security.md](docs/security.md#host-support).

If you use another host, delete or disable `deploy-pages.yml` so you aren't publishing to two places.

### Other static hosts
Upload the contents of `dist/`. Configure the headers from `public/_headers` in the web server, and serve `404.html` for missing pages.

### Custom domain (optional)
Buy the domain yourself. Nothing has been purchased. Add it in your host's domain settings and create the DNS records the host shows you (usually a `CNAME` for `www` and `A`/`ALIAS` records for the root). Wait for the HTTPS certificate. Then set `SITE_URL=https://yourdomain` and `BASE_PATH=/` (for GitHub Pages, also add `public/CNAME` containing the domain). Once HTTPS works, consider enabling HSTS in `public/_headers`.

### Sharing the live URL
Put the final URL on your CV, in your LinkedIn **Contact info → Website** field, and in your email signature. Test it in a private browser window first.

## Update and roll back

- **Update**: edit, commit and push. CI checks every push, and the host rebuilds automatically.
- **Roll back on Netlify, Cloudflare or Vercel**: open the deploys list in the dashboard and choose **Publish/Promote** on an earlier good deploy.
- **Roll back on GitHub Pages**: `git revert <bad-commit>` then `git push`. Or re-run the deploy workflow from an earlier commit.

## Project structure

```
src/
  data/profile.ts          ← your details (edit)
  content/projects/*.md    ← projects (edit)
  components/              Header, Footer, ProjectCard, ContactActions, DraftBadge
  layouts/BaseLayout.astro <head>, meta CSP, skip link
  pages/                   index, projects/, privacy, 404, sitemap.xml, robots.txt
  lib/                     helpers (base-path URLs, sections, CSP, CV detection)
  scripts/enhance.ts       optional JS: mobile menu, copy email
  styles/global.css        design tokens and base styles
public/                    favicon, _headers, (your CV PDF)
scripts/                   check-dist.mjs, release-check.mjs
.github/                   CI, Pages deploy, Dependabot
docs/                      research, design, security, testing, checklist
```

## Licence

No licence has been added yet. Without one, the code is "all rights reserved" by default. Your options:

- **Keep no licence**: people can view the code but have no permission to reuse it.
- **MIT**: anyone may reuse the *code*.

Either way, your personal text, CV, photos and project screenshots remain yours. A code licence doesn't need to cover them, so say so explicitly if you add one. To add a licence, create a `LICENSE` file.
