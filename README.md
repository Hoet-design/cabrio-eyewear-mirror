# cabrio-eyewear-mirror

Branded landing page for the Cabrio virtual eyewear try-on ("mirror").

It is a single static `index.html`: a black header with the white Cabrio logo, and a
full-height `<iframe>` embedding the [Fittingbox](https://www.fittingbox.com/) virtual
try-on at `https://cabrio.owiz.fittingbox.com` (the iframe requests camera access to let
visitors try frames on live). The iframe `src` is set after the page's `load` event by
`mirror.js`, so the Fittingbox bundle does not block the first paint; without JavaScript
a `<noscript>` iframe loads it right away.

Served under its own domain **cabrio-eyewear-mirror.com** so the Fittingbox try-on runs
behind Cabrio branding.

## Files
- `index.html` — the wrapper page (header + iframe + inline styling, meta and Open Graph tags)
- `mirror.js`: sets the iframe `src` after `load`. Kept out of `index.html` because the CSP
  in `_headers` refuses inline scripts.
- `_headers`: Netlify response headers. Cache-Control for the logo, favicon and share image
  (one week), plus Content-Security-Policy (only `cabrio.owiz.fittingbox.com` may be
  framed, `frame-ancestors 'self'`), Permissions-Policy (camera and microphone only for
  self and Fittingbox), X-Content-Type-Options and Referrer-Policy. The comments in that
  file explain each rule; the commented-out Google Fonts link in `index.html` is blocked by
  this CSP until the domain is added to `style-src` and `font-src`.
- `logo-white.svg` — the white Cabrio logo in the header
- `share.png`: the 1200x630 Open Graph image used when the link is shared
- `favicon.ico`
- `robots.txt` and `sitemap.xml`: one URL, no `lastmod`
- `elixir.json`: declares the production environment for Elixir (see below)
- `.github/workflows/evidence.yml`: CI, see below

## Deploy
Fully static, hosted on Netlify (the `_headers` file is Netlify's header format; `.netlify/`
in `.gitignore` is the Netlify CLI's local state). The iframe content is served by
Fittingbox. On another host the files still work, but the headers in `_headers` must be set
by that host's own means or they are silently dropped.

There is no build step, no package manifest and no test suite. To view the page locally,
open `index.html` in a browser or serve the folder with any static file server; the
`_headers` rules do not apply then.

## Environments and monitoring
`elixir.json` declares one environment, `production` at `https://cabrio-eyewear-mirror.com`.
Elixir measures that address from the outside. There is no `/up`, `/api/elixir` or
`/.well-known/build.json` endpoint: the site has no backend.

## CI
`.github/workflows/evidence.yml` runs on pull requests to `main` whose branch starts with
`elixir/` (pull requests opened by Elixir's hands). It runs
`abovebeyond-ai/control-verify-action@v1` in `pull` mode to check the Proof-of-Control
record in the pull request footer against the DID log at abovebeyond.ai and the public
evidence mirror before merging. Pull requests from people skip this job. No secret is
needed. There is no other workflow: nothing builds or tests on push.
