# Research

Accessed **27 October 2026**. Pages were read as text (fetched content and repository READMEs). Visual layout, mobile behaviour, interaction and performance of the reference sites were **not** tested. Claims made on other people's sites are self-reported and were not independently verified.

This builds on the owner's brief *Recruiter-Focused IT Support and App Developer Portfolio — Research and Design Brief*, which cites the same references.

## Reference comparison

| Reference | Role clarity | First screen | Project evidence | Support vs dev positioning | CV / contact | Maintenance structure | Observed limitations |
|---|---|---|---|---|---|---|---|
| [brittanychiang.com](https://brittanychiang.com/) | Very clear: name, "Frontend Engineer", one-line focus | Identity + in-page nav (About, Experience, Projects) + social links; skip link | Project cards with image, description, tech tags; link to full archive | Single role | "View Full Résumé" PDF link inside Experience; no email on page, contact via social profiles only | Not inspected (site source not reviewed) | No direct email; CV link is below the fold |
| [AndreeaVP/andreea-it-portfolio](https://github.com/AndreeaVP/andreea-it-portfolio) | "Aspiring IT Support professional", target roles named | Not visually tested | Categories: Windows Server, Cisco Packet Tracer, AWS networking/security, IoT, Power BI, full-stack diploma project | IT support first, web dev as supporting skill | CV PDF in repo root | Plain HTML/CSS/JS on GitHub Pages; no documented update process | Broad tool list with no indication of depth; preparation for CompTIA A+ is stated correctly as preparation |
| [AdithyaSalian23/IT-Support-Troubleshooting-Lab](https://github.com/AdithyaSalian23/IT-Support-Troubleshooting-Lab) | Explicitly a personal lab, "not corporate IT experience" | n/a (repository) | Simulated tickets (IT-001…004), asset register, escalation workflow, checklists | Support only | n/a | Folder per topic, numbered Markdown guides | Ticket files lack explicit Issue/Diagnosis/Resolution labels; it is evidence, not a portfolio homepage |
| [AbubakarAbdulrahim/MyPortfolio](https://github.com/AbubakarAbdulrahim/MyPortfolio) | Mobile developer | Not visually tested | Three app case studies with stack per app | Development only | `public/resume.pdf` replaced by owner | README documents content folders | Metrics without methodology; three conflicting live URLs; README tree doesn't match repo; unfinished testimonials listed as a feature |
| [quaidtahir.com/portfolio](https://www.quaidtahir.com/portfolio) | "Software Engineer" | Name, title, mission line, email/website/GitHub/LinkedIn | One featured project with bullets | Software title, IT Support Specialist is the only listed job | Contact at top; CV download links at the bottom with apparently malformed extensions (`.pdff`, `.docc`) | Not inspected | Shows how combined positioning can blur; broken-looking CV links |
| [joshwcomeau.com/about-josh](https://www.joshwcomeau.com/about-josh/) | Web developer and educator | Short intro | Open-source packages and side projects | Development only | Contact via separate page | Not inspected | Interactive, cosmetic widgets suit a frontend educator; not appropriate as the main signal for an IT support role |

## Patterns that repeat

1. **Identity before anything else** — name, exact role, short value statement (Chiang, Tahir).
2. **Evidence over tool lists** — the strongest repositories document *what was done* (Adithya's ticket records, Abubakar's per-app stacks); the weakest signals are flat technology lists.
3. **Honest labelling** — the troubleshooting lab explicitly says "simulated", which makes it more credible, not less.
4. **Easy CV access** matters, and broken CV links (Tahir) or conflicting URLs (Abubakar) visibly hurt trust.
5. **Content in files** — owners who edit content in a folder (`content/projects`, `public/resume.pdf`) get a simple maintenance path.

## Conflicting approaches

- **Contact by social links only** (Chiang) vs **email in header** (Tahir). For an early-career candidate, a visible email plus LinkedIn is more convenient for recruiters. → Visible email in Contact, contact button in hero.
- **Interactive personality** (Comeau) vs **plain evidence** (lab repo). → No decorative interaction; JavaScript only for menu and copy-email.

## Unsuitable for this owner

- Metrics or testimonials without evidence; certification badges for preparation; skill bars; "available for work" badges without confirmation; employer logos without permission; animated intros.

## Presenting two career areas without looking unfocused

- One identity and one headline ("IT Support & App Developer") — no role picker.
- Selected Work shows **two labelled groups** (IT Support & Cloud, App Development) on the same page.
- The About section states the link explicitly: support work keeps the owner close to users, which shapes how apps are built.
- Skills are grouped by area and tagged by where they were used (Workplace / Study & labs / Learning).

## Technical research (official documentation)

| Topic | Source | Decision |
|---|---|---|
| Astro static deployment, `site`/`base`, GitHub Pages workflow | [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) | Astro 7.4.2 static output; `SITE_URL`/`BASE_PATH` env vars; GitHub Actions deploy workflow. The Astro doc uses `withastro/action`; this repo uses `actions/setup-node` + `npm ci` so the same steps run in CI and deploy. |
| Astro config: `build.inlineStylesheets`, `security.csp` | [Astro configuration reference](https://docs.astro.build/en/reference/configuration-reference/) | `inlineStylesheets: 'never'` so no inline CSS. Astro's `security.csp` (meta-tag hashes) was not needed because the output contains no inline code. |
| CSP | [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) (cited in brief) | Header-delivered CSP where the host supports it; meta fallback documented as weaker (no `frame-ancestors`). |
| Host headers | [Netlify headers](https://docs.netlify.com/manage/routing/headers/), [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/), [GitHub community discussion](https://github.com/orgs/community/discussions/199121) (cited in brief) | `public/_headers` for Netlify + Cloudflare, `vercel.json` for Vercel; GitHub Pages documented as meta-only. |
| Repository security | [GitHub: securing your repository](https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository) (cited in brief) | Dependabot config, `SECURITY.md`, owner instructions for secret scanning/push protection. |
| Accessibility | [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) (cited in brief) | Targets AA: contrast, keyboard, focus visible, focus not obscured, reflow at 320px. |

The Netlify, Cloudflare, OWASP, GitHub and WCAG pages were taken from the owner's brief and **not re-fetched** on the access date above; re-check them if host behaviour matters for a decision.
