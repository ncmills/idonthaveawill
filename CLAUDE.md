# idonthaveawill — Claude Code Instructions

## Cross-project inventory
See `~/PROJECTS.md` for portfolio map and `~/.claude/CLAUDE.md` for file-routing convention (`~/work/<project>/...` for scratch, `~/work/handoffs/` for briefs, etc.).

## Deploy Workflow

As of 2026-04-10 this project is connected to GitHub via the Vercel GitHub App. A push to `main` auto-builds and auto-promotes `idonthaveawill` to production.

- **Deploy:** `git add` → `git commit` → `git push origin main`. Vercel handles the rest.
- **Do NOT run `vercel --prod` manually** unless a build is stuck or Nick explicitly asks.
- PRs automatically get preview URLs.

## Brand mark — "I." (2026-08-18)

The mark is the brand name's first word and its full stop: a letterpress slab
serif capital **I** plus the oversized sage period the wordmark already ends on.
Cream `#f8f3ea` on the sage plate `#7a8a6f`, `rx` 7.5 on a 32 viewBox.

It replaced an outlined folded-page icon that (a) was the category's stock icon,
(b) was a near-black stroke on transparent and so was **invisible on a dark
browser tab**, and (c) shared nothing with the header or the OG card.

**One geometry, four files. Change them in the same commit:**

| Surface | File |
|---|---|
| Header lockup + mono variant | `src/components/shared/Brand.tsx` (source of truth) |
| Browser tab (vector) | `src/app/icon.svg` |
| Browser tab (raster) + iOS + PWA | `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png` |
| Share card | `src/app/opengraph-image.tsx` (`MARK` data URI) |
| `Organization` JSON-LD `logo` | `public/logo.svg` |

Never draw the mark with `<text>`: Satori (OG, app icons) cannot load Lora and
would silently substitute a different typeface, which is how the portfolio ended
up with three different marks per brand.
