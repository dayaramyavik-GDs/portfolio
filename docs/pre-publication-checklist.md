# Pre-publication checklist (private)

This file is not part of the website build. But if the repository is public, anyone can read it on GitHub, so don't write private details here.

`npm run release-check` automatically checks the items marked **(auto)**.

## Status — 27 Oct 2026
- ✅ Email, LinkedIn and GitHub URLs approved and added.
- ✅ Experience, education, certificates, skills, and the ShiftPay, Assessment Tracker, BookHaven and Shadow Protocol case studies were filled in from your CV. **Review the wording** in `src/data/profile.ts` and `src/content/projects/`.
- ✅ Public CV added as `public/Yavik-Dayaram-CV.pdf`. It has no address, phone number or referee details, and its only metadata is your name as author.
- ✅ The `shiftpay-app`, `assessment-tracker` and `shadow-protocol` repositories are public and linked. A file-name scan found no `.env`, key or credential files. ShiftPay also links to its v1.0.0 release.
- ⚠️ The Shadow Protocol demo URL in the repository settings (`dayaramyavik-gds.github.io/shadow-protocol/`) returns 404, so the site doesn't link it. Enable GitHub Pages for that repository, then add `demo:` to `shadow-protocol.md`.
- ✅ The MLHS staff-count detail was removed, matching your updated CV.
- `npm run release-check` passes.
- ⏳ Travel-Sekai and the networking/cryptography/GRC coursework aren't on your CV, so they stay as drafts.
- ⏳ `invoice-receipt-maker` is your only public repository, but it isn't on your CV, so it isn't on the site. Tell me if you want it added.

## Identity and contact
- [ ] Approve a **professional email** for public display, ideally a dedicated address because it will get some spam. Put it in `profile.email`. **(auto)**
- [ ] Add your **LinkedIn URL**, copied from your profile and not guessed, to `profile.linkedin`. **(auto)**
- [ ] Add your **GitHub profile URL** to `profile.github`. **(auto)**
- [ ] Once the repository exists, set `profile.repository`. This is optional.
- [ ] Confirm the headline "IT Support & App Developer" and the hero sentence.
- [ ] Review the two **About** paragraphs in `src/data/profile.ts` and rewrite them in your own words if they don't sound like you.
- [ ] Only set `openToWork: true` if you are actually looking.

## CV
- [ ] Make a **public version** of your CV. Remove your home address, phone number (unless you want it public), referees, date of birth and student ID.
- [ ] Export it as a text-selectable PDF named `Yavik-Dayaram-CV.pdf` and place it in `public/`. **(auto)**
- [ ] Clear the PDF metadata (author, company, file path) in File → Properties.

## Experience
- [ ] Reconfirm the **MLHS** entry: job title "IT Support", start date 28 Sep 2026, full legal employer name.
- [ ] Add a few accurate bullet points describing the work you do. Don't include ticket counts, metrics or internal system names unless you can share them.
- [ ] Get permission before using any employer logo, screenshot or workplace material. None are used now.

## Projects (`src/content/projects/`)
For each candidate (Travel-Sekai, AWS Infrastructure, Networking/Cryptography/GRC coursework, Assessment Tracker):
- [ ] Confirm that it exists, that you own it or are allowed to show it, what it actually does, its status, and your individual contribution.
- [ ] Choose an honest `type` and `status`. A discussed idea is a `Concept`.
- [ ] Replace every `DRAFT`/`CONFIRM` text, fill in or delete the case-study sections, and set `published: true`. **(auto)**
- [ ] Add real repository, demo or download links, or leave them out. Never use `#`.
- [ ] For screenshots, crop out account IDs, IP addresses, hostnames, emails and personal data. Strip the image metadata.
- [ ] Check your university's rules on publishing assessment work.
- [ ] Keep the homepage to 3–5 projects with `featured: true`.

## Skills and education
- [ ] In `skillGroups`, set `published: true` only for skills you can back up with evidence, and choose Workplace, Study & labs or Learning for each.
- [ ] Add confirmed qualifications to `education`, with the exact name, institution and status. Preparing for a certification doesn't count as having it.

## Repository and hosting
- [ ] Confirm your GitHub username and choose a repository name (`portfolio` or `<username>.github.io`).
- [ ] Choose a licence or deliberately choose none (see README).
- [ ] Choose a host (Netlify recommended) and set `SITE_URL`.
- [ ] Enable the GitHub security settings listed in `docs/security.md`.

## After deployment
- [ ] Check the live headers with `curl -sI`, and check the console for CSP errors.
- [ ] Open every link in a private window.
- [ ] Run Lighthouse and axe, and record the results in `docs/testing.md`.
- [ ] Do the recruiter scan test with two or three people.
- [ ] Turn on HSTS once HTTPS is confirmed.
