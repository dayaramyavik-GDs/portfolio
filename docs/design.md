# Design

## Brief

A recruiter should be able to tell within one screen **who** this is (Yavik Dayaram), **what** they do (IT Support & App Developer), **where** (Melbourne), and **how to act** (see work, get the CV, make contact). Everything after that is evidence. The tone is approachable and practical, in Australian English.

## Information architecture

```
/                 Home: Hero → Selected Work → Skills → Experience → About/Education → Contact → Footer
/projects/        Complete catalogue, grouped IT Support & Cloud / App Development
/projects/<slug>/ Case study page (one per Markdown file)
/privacy/         What the site does and doesn't collect
/404              Helpful not-found page
/sitemap.xml, /robots.txt
```

A homepage section only renders when it has approved content, and the navigation is generated from the sections that exist. No visitor ever sees an empty heading or "coming soon".

## Text wireframe (desktop; mobile stacks to one column)

```
┌ [YD] Yavik Dayaram                 Work  Skills  Experience  About  Contact  [CV] ┐
│ MELBOURNE, VICTORIA, AUSTRALIA                                                   │
│ Yavik Dayaram                                                                    │
│ IT Support & App Developer                                                       │
│ I help people solve IT problems and build practical applications.                │
│ [View my work]  [Download CV]  [Contact me]  [LinkedIn]                          │
├─ SELECTED WORK ──────────────────────────────────────────────────────────────────┤
│ IT SUPPORT & CLOUD                                                               │
│ ┌ label · type · status ┐ ┌──────────────┐                                       │
│ │ Title                 │ │ ...          │                                       │
│ │ Problem: …            │                                                        │
│ │ My part: …            │                                                        │
│ │ [tech] [tech]         │                                                        │
│ │ Read the case study   │                                                        │
│ APP DEVELOPMENT  (same cards)                     [View all projects]            │
├─ SKILLS ─ three cards: IT Support | Networking, Cloud & Security | App Dev ──────┤
│   each skill: name ……………… Workplace / Study & labs / Learning                    │
├─ EXPERIENCE ─ dated cards, verified bullets only ────────────────────────────────┤
├─ ABOUT ─ two short paragraphs │ Education card ──────────────────────────────────┤
├─ CONTACT ─ email (mailto) [Copy email] · [Download CV] [View CV] [LinkedIn] [GitHub]
└ © year · Privacy · All projects · Site source ───────────────────────────────────┘
```

## Visual tokens (`src/styles/global.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f6f7f9` | `#0f1418` | Page |
| `--surface` | `#ffffff` | `#161d23` | Cards |
| `--text` | `#16202a` | `#e7edf2` | Body text (15.4:1 / 15.7:1) |
| `--muted` | `#47525e` | `#a9b4be` | Secondary text (≥7.4:1) |
| `--accent` | `#0d6870` | `#62c6cd` | Teal: links, buttons, labels (6.1:1 / 9.2:1) |
| `--focus` | `#b4410b` | `#ffb27a` | Focus ring, 3px, distinct from accent |

Typography: system font stack (no web-font download, no licensing question). Fluid headings with `clamp()`. Spacing via `--space` and `--section`. Radius 10px. Buttons are at least 44px tall.

Dark mode follows the operating system (`prefers-color-scheme`) with no toggle, so it needs no JavaScript. Both themes were checked for contrast (see `testing.md`).

## Component decisions

| Component | Decision |
|---|---|
| Header | Sticky, short labels. Without JS the links wrap below the name; with JS a "Menu" disclosure button (`aria-expanded`, Escape closes) appears below 768px. `scroll-padding-top` stops the sticky header covering focused targets. |
| Hero | Text only — no portrait, logos or stats invented. Buttons appear only when their target exists. |
| Project card | Area label, honest type + status, problem, personal contribution, ≤8 tech tags, links only when real. Cover image optional and requires alt text (enforced by schema). |
| Skills | Grouped lists with a context tag — no bars, stars or percentages. |
| Contact | Visible email as a `mailto:` link; "Copy email" button only appears if the Clipboard API is available, with a polite live-region status. Address is always selectable as a manual fallback. |
| Drafts | Unpublished items render in `npm run dev` with a dashed outline and "Draft — hidden in production" badge. A production build excludes them, and the build check fails if any draft marker leaks. |
| Motion | Only colour transitions on hover; disabled under `prefers-reduced-motion`. |
| Print | Navigation hidden, link URLs printed after link text. |

## Architecture decision

**Astro 7 static output + TypeScript + plain CSS**, content in `src/data/profile.ts` and `src/content/projects/*.md` (validated by a Zod schema). No React, database, CMS, analytics or server runtime. Rationale: portable to any static host, nothing to patch on a server, owner edits text files in GitHub. Trade-off: no in-browser admin panel — editing happens through the owner's GitHub account, which is also how owner-only access is enforced.
