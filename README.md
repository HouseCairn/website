# housecairn.app

Public showcase website for [HouseCairn](https://github.com/HouseCairn/HouseCairn), a free and open-source, self-hosted web app for home maintenance and renovation.

Static site built with [Astro](https://astro.build), in English (`/`) and French (`/fr/`).
No client-side JavaScript, no cookies, no analytics, no external resources: fonts are self-hosted
through `@fontsource/manrope`.

## Requirements

- Node.js 22.23.4 or newer (CI uses Node 24)
- npm

## Build and preview

```sh
npm ci            # install the exact versions from package-lock.json
npm run build     # static output in dist/
npm run preview   # serve dist/ on http://localhost:4321
```

`npm run dev` starts the development server with live reload.

Set `ASTRO_TELEMETRY_DISABLED=1` to turn off Astro's own build telemetry.

## Structure

| Path | Content |
| --- | --- |
| `src/i18n/ui.ts` | All page text, English and French, same keys |
| `src/i18n/jsonld.ts` | JSON-LD `SoftwareApplication` |
| `src/layouts/Base.astro` | `<head>` (SEO, hreflang, Open Graph), header, footer |
| `src/components/Home.astro`, `Roadmap.astro` | Page bodies, shared by both languages |
| `src/components/Shot.astro` | Screenshot component: AVIF and WebP with PNG fallback, declared dimensions |
| `src/assets/app/` | Real application screenshots (demo data), English and French |
| `src/pages/` | Routes: `/`, `/roadmap/`, `/fr/`, `/fr/roadmap/`, `/404.html` |
| `public/` | Logo, favicons, Open Graph images, `robots.txt` |
| `scripts/og.mjs` | Regenerates `public/og/og-{en,fr}.png` (1200x630) from SVG |

To change the Open Graph images, edit `scripts/og.mjs` and run `npm run og`
(uses the dev dependency `@resvg/resvg-js`). The source SVGs are written next to the script.

## Application screenshots

The screenshots in `src/assets/app/` are produced by the `Documentation` workflow of
[HouseCairn/HouseCairn](https://github.com/HouseCairn/HouseCairn) (artifact `docs-screenshots`) from a demo
instance with fictional data (`demo@example.com`, "Example house"). To refresh them, download that artifact
from the latest run on `main`, check that nothing real is visible, and replace the files
`homes-mobile`, `more-desktop` and `sign-in-mobile` (`.en.png` and `.fr.png`). The build converts them to
AVIF and WebP.

## Content Security Policy

The build is compatible with a strict CSP: stylesheets are external files
(`build.inlineStylesheets: "never"`), assets are never inlined as `data:` URIs
(`vite.build.assetsInlineLimit: 0`), there are no `style=` attributes, and the only
inline script is the JSON-LD block (`type="application/ld+json"`).

A matching policy:

```
default-src 'none'; style-src 'self'; font-src 'self'; img-src 'self';
base-uri 'none'; form-action 'none'; frame-ancestors 'none'
```

GitHub Pages does not let you set response headers, so this is documentation for a
future host.

Quick checks after a build:

```sh
grep -rn "<style" dist/ ; grep -rn " style=" dist/
grep -rno "<script[^>]*>" dist/ | grep -v "application/ld+json"
```

## Deployment

`.github/workflows/pages.yml` builds the site and deploys it to GitHub Pages on every push
to `main`. In the repository settings, set Pages to "GitHub Actions" and the custom domain
to `housecairn.app`.

## How this project is built

HouseCairn is developed with an AI agent, under human review. Every change to this site goes
through a pull request that the maintainer reads and merges; nothing is pushed straight to `main`.

## Licence

AGPL-3.0-only, like HouseCairn.
