// @ts-check
import { defineConfig } from 'astro/config';

// Deployment target is set by environment variables so the same source can be
// published at a root domain or a GitHub Pages repository subpath.
//   SITE_URL   e.g. https://yavikdayaram.com or https://<username>.github.io
//   BASE_PATH  e.g. / (root) or /portfolio (GitHub Pages project site)
// Netlify sets URL to the site's primary address automatically.
const site = process.env.SITE_URL || process.env.URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // Keep every stylesheet external so the CSP needs no 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Never inline small scripts/assets as data: URIs or inline code.
      assetsInlineLimit: 0,
    },
  },
  devToolbar: { enabled: false },
});
