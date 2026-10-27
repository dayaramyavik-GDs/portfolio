/**
 * Content Security Policy shared by the <meta> fallback and documented in
 * public/_headers, netlify.toml and vercel.json. Keep them in sync —
 * `npm run test:links` fails if the header files drift from this policy.
 *
 * The site ships no inline scripts or styles, so no 'unsafe-inline',
 * nonces or hashes are needed.
 */
export const CSP_DIRECTIVES = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'none'",
  "object-src 'none'",
];

/** Meta tags cannot carry frame-ancestors; that is set by host headers only. */
export const CSP_META = CSP_DIRECTIVES.join('; ');
