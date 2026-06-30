# cabrio-eyewear-mirror

Branded landing page for the Cabrio virtual eyewear try-on ("mirror").

It is a single static `index.html`: a black header with the white Cabrio logo, and a
full-height `<iframe>` embedding the [Fittingbox](https://www.fittingbox.com/) virtual
try-on at `https://cabrio.owiz.fittingbox.com` (the iframe requests camera access to let
visitors try frames on live).

Served under its own domain **cabrio-eyewear-mirror.com** so the Fittingbox try-on runs
behind Cabrio branding.

## Files
- `index.html` — the wrapper page (header + iframe + inline styling)
- `logo-white.svg` — the white Cabrio logo in the header
- `favicon.ico`

## Deploy
Fully static — host the three files anywhere (the iframe content is served by Fittingbox).
