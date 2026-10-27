# Testing

Environment: Windows 11, Node.js 24.22.1, npm 11.19.1, Astro 7.4.2. Run on **27 October 2026**. Browser checks used the Chromium-based browser pane in the Claude desktop app.

Status key: ✅ passed · ❌ failed · 🖐 manual check done · ⏳ not yet tested · ⛔ blocked

## Automated

| Check | Command | Result |
|---|---|---|
| Install | `npm install` (lockfile created) | ✅ 0 vulnerabilities |
| Types / Astro diagnostics | `npm run check` | ✅ 0 errors, 0 warnings, 0 hints (22 files) |
| Production build (root `/`) | `npm run build` | ✅ 4 pages + sitemap.xml + robots.txt |
| Post-build checks (root) | `npm run test:links` | ✅ links resolve, no inline script/style/handlers, no draft markers, no secret patterns, header CSP in sync |
| Subpath build (`BASE_PATH=/portfolio`) | `npm run build` + `npm run test:links` | ✅ all links/assets/sitemap prefixed with `/portfolio/` |
| Release gate | `npm run release-check` | ❌ **expected**: email, LinkedIn, GitHub, CV PDF and published projects are missing |
| Clean install from lockfile | `npm ci` | ⏳ runs in CI on first push |

During subpath testing in Git Bash, MSYS converted `/portfolio` into a Windows path. The link checker caught it and reported every link as broken. Re-running in PowerShell passed. That was a local shell artefact, and CI on Linux is not affected.

## Browser checks (manual / scripted in the browser pane)

| Check | Result |
|---|---|
| Production preview, meta CSP active: CSS and JS load, console clean | ✅ 3 stylesheets applied, menu script ran, **0 console messages** |
| 404 page on unknown URL | ✅ |
| Skip link is the first Tab stop and moves focus to `<main>` | ✅ |
| Mobile 375×812: no horizontal scroll (`scrollWidth` = 375) | ✅ |
| Mobile menu: hidden by default, button toggles, `aria-expanded` updates | ✅ |
| Dark theme (OS preference) | 🖐 visual check |
| Light theme | 🖐 visual check |
| Draft styling visible in dev, absent in production | ✅ |

## Contrast (calculated with the WCAG relative-luminance formula)

| Pair | Light | Dark |
|---|---|---|
| Body text on page | 15.38 | 15.70 |
| Muted text on card | 7.97 | 8.07 |
| Accent link on page | 6.06 | 9.24 |
| Button text on accent | 6.50 | 7.87 |
| Label text | 8.00 | 6.54 |
| Focus ring vs page (non-text, needs 3:1) | 5.29 | 10.50 |

All text pairs meet AA (4.5:1), and most meet AAA.

## Not yet tested

- ⏳ Screen reader pass (NVDA on Windows, VoiceOver on iPhone). Checks: heading order, link names, live region on "Copy email".
- ⏳ 200% browser zoom and 320px width on a real device.
- ⏳ JavaScript disabled: nav wraps under the name, email link still works, copy button stays hidden. The code is designed for this, but no browser has tested it.
- ⏳ `prefers-reduced-motion`.
- ⏳ Firefox and Safari.
- ⏳ Lighthouse and axe. Lighthouse wasn't available in this environment, so no scores are claimed. Run Chrome DevTools → Lighthouse against the deployed URL.
- ⛔ **Live HTTP headers and production CSP**: blocked until the site is deployed. See `security.md` for the `curl` command.
- ⛔ **Recruiter scan test** (can a new viewer find name, role, location, best evidence, CV and contact quickly?). This is blocked until real projects, CV and contact details are added. Then ask two or three people to try it.
- ⛔ Private/incognito check of every public link: blocked on real links.

## Re-running

```bash
npm ci
npm test
npm run release-check
```
