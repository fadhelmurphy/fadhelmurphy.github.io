# fadhelpop.com — v2

Astro (static, zero framework JS) + Tailwind v4 + OGL (WebGL).

| | |
|---|---|
| Framework JS shipped | 0 KB (no React) |
| Total JS (gzip, all lazy) | ~27 KB — WebGL loads on idle / when visible |
| Images | auto WebP + responsive `srcset` via `astro:assets` |
| Fonts | self-hosted variable fonts (no Google Fonts request) |

## Commands
```bash
npm i
npm run dev            # localhost:4321
npm run sync:linkedin  # regenerate src/data/experience.json + education.json
npm run build          # sync + build → dist/
```

## Work experience from LinkedIn (auto-update)
`scripts/linkedin-sync.mjs` runs before every build and **every night at 01:00 WIB** (GitHub Actions cron):

1. **Apify** (live, automatic) — add repo secret `APIFY_TOKEN` (apify.com → Settings → API & Integrations).
   Default actor `linkedintel/linkedin-profile-scraper-no-cookies` (no LinkedIn login, ~$0.002/run).
   Swap with `APIFY_ACTOR` / `APIFY_INPUT` env if you prefer another actor. First run: set `LINKEDIN_DEBUG=1` to dump `apify-raw.json` and check the fields map correctly.
2. **CSV fallback** — `src/data/linkedin/Positions.csv` + `Education.csv` from LinkedIn's official data export.
3. If both fail, the last committed JSON is kept, so the build never breaks.

When the data changes the workflow commits the new JSON and redeploys.

## Structure
```
src/
  scripts/wave-gradient.ts   fullscreen wave blur gradient shader (rendered at 1/3 res, upscale = blur)
  scripts/blob-3d.ts         interactive 3D iridescent blob + particle ring
  content/blog/*/index.mdx   blog posts (content collection)
  data/linkedin/*.csv        LinkedIn export → scripts/linkedin-sync.mjs → data/*.json
```
WebGL respects `prefers-reduced-motion`, pauses off-screen / in background tabs, and caps DPR at 1.75.
