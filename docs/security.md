# Security and privacy

No system is "secure" in an absolute sense. This document records what is implemented, what depends on the host, what has been verified, and what remains a risk.

## Threat model

| Threat | Likelihood / impact | Controls | Residual risk |
|---|---|---|---|
| GitHub account takeover → defaced site | Medium / high | Owner MFA or passkey, branch ruleset on `main`, minimal workflow permissions, no long-lived deploy tokens (Pages uses OIDC) | Depends on owner's account hygiene |
| Secret committed to the repo | Low (site needs no secrets) / high | `.gitignore` for `.env*`, no secrets in code, build check sniffs for common key formats, GitHub secret scanning + push protection (owner must enable) | Pattern checks are not exhaustive |
| Malicious or vulnerable dependency | Low–medium / medium | Four direct dependencies, committed lockfile, `npm ci`, `npm audit` in CI, Dependabot PRs reviewed manually | Supply-chain attacks can precede advisories |
| Compromised GitHub Action | Low / high | Actions pinned to commit SHAs; validation job has read-only token and `persist-credentials: false` | Owner must review Dependabot action bumps |
| Injected content / XSS | Low / medium | All content is rendered as escaped text by Astro; no `set:html`, no `eval`, no inline handlers; CSP `script-src 'self'`; config URLs must be `https:` | Markdown in case studies is owner-authored and trusted |
| Clickjacking / framing | Low / low | `frame-ancestors 'none'` + `X-Frame-Options: DENY` on header-capable hosts | **Not available on GitHub Pages** |
| Contact spam / email harvesting | High / low | Email link only; no form or endpoint to abuse | Published addresses will receive some spam — use a dedicated address |
| Accidental publication of personal or employer data | Medium / high | Profile fields default to `null`; drafts excluded from build; release check; checklist covers metadata, screenshots, CV | Human review is still required |

## Site controls (implemented)

- **No inline code.** `build.inlineStylesheets: 'never'` and `assetsInlineLimit: 0`; the build check fails on inline `<script>`, `<style>`, `style=""` or `on*=""`.
- **CSP** (`src/lib/security.ts`):
  `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'none'; object-src 'none'` — plus `frame-ancestors 'none'; upgrade-insecure-requests` in host headers.
  No `'unsafe-inline'`, nonces or hashes are needed.
- **Meta CSP fallback** in every production page. It does *not* support `frame-ancestors` and doesn't replace the other headers.
- **Other headers** (`public/_headers`, `vercel.json`): `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation, payment, usb off), `Cross-Origin-Opener-Policy: same-origin`.
- **HSTS** is left commented out. Turn it on after HTTPS is confirmed on the final domain. Start without `preload` or `includeSubDomains`.
- **External links** use `rel="noopener noreferrer"` and open in the same tab. Profile URLs are validated (`https:` only), and the email address is format-checked.
- **No third parties**: no analytics, cookies, fonts, CDNs or embeds.
- Disabling right-click or copy is **not** a security control, and is not used. Anything public can be copied.

## Host support

| Control | Netlify | Cloudflare Pages | Vercel | GitHub Pages | Other static host |
|---|---|---|---|---|---|
| HTTPS | Automatic | Automatic | Automatic | Enable "Enforce HTTPS" | Varies |
| Header CSP + `frame-ancestors` | `public/_headers` | `public/_headers` | `vercel.json` | ❌ not configurable | Configure in server |
| Other security headers | ✅ | ✅ | ✅ | ❌ | Configure in server |
| Meta CSP fallback | ✅ (redundant) | ✅ (redundant) | ✅ (redundant) | ✅ only protection | ✅ |
| Status | Configured, **not verified live** | Configured, **not verified live** | Configured, **not verified live** | Meta only, **not verified live** | — |

On GitHub Pages, `_headers` is served as a plain file and has no effect. Header rules on Netlify and Cloudflare cover static files; any serverless function added later must set its own headers.

**After deployment, verify the real headers:**

```bash
curl -sI https://your-site.example/ | grep -iE "content-security|x-frame|x-content|referrer|permissions|strict-transport"
```

Then load every page with DevTools open and confirm there are no CSP errors in the console.

## Repository and account settings (owner actions)

Committing files doesn't enable these settings. Turn them on in GitHub:

1. **Account**: passkey or authenticator-app 2FA; review authorised OAuth apps.
2. **Repository → Settings → Code security**: Dependabot alerts and security updates, secret scanning, **push protection**, and CodeQL default setup. These are free for public repositories, but private repositories may need a paid plan.
3. **Settings → Rules → Rulesets** for `main`: require a pull request or at least the `CI` status check, and block force-pushes and deletion.
4. **Settings → Actions → General**: set workflow permissions to "Read repository contents". Don't allow Actions to approve pull requests.
5. **Collaborators**: none. You are the only person with write access.
6. Hosting accounts (Netlify/Cloudflare/Vercel): enable 2FA and connect only this repository.

## Owner-only editing

Visitors have read-only access to a static site, so there's no write surface to attack. Content changes only by committing to the GitHub repository, and only your account can do that. There's no admin panel, no login and no client-side password. If you ever want a web editor, it must authenticate and authorise every write on the server. Hiding buttons doesn't count.

## Dependency maintenance

- Dependabot opens weekly npm PRs and monthly Action PRs. Read the release notes, let CI pass and merge by hand. Don't turn on auto-merge.
- Run `npm audit` and `npm outdated` occasionally.

## Incident checklist

1. **A secret leaked?** Revoke or rotate it at the provider *first*. Deleting it from the latest commit is not enough, because it stays in Git history, forks and caches. Then clean history if needed (`git filter-repo`) and force-push.
2. **Site defaced or unexpected commit?** Change your GitHub password, revoke sessions and tokens, and review the account security log. Then restore: on Netlify/Cloudflare/Vercel, roll back to a previous deploy in the dashboard. On GitHub Pages, `git revert` the bad commits and push.
3. **Vulnerable dependency?** Update it, rebuild and redeploy. Check whether it reached the built output (`dist/`). Build-only tools usually don't.
4. **Personal or employer data published by mistake?** Remove it, redeploy, and request removal from search engines if it was indexed. If it's in Git history, treat it like a leaked secret. Tell the affected person or employer if appropriate.
5. Write down what happened and what changed.
