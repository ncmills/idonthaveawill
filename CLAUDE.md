# idonthaveawill — Claude Code Instructions

## Cross-project inventory
See `~/PROJECTS.md` for portfolio map and `~/.claude/CLAUDE.md` for file-routing convention (`~/work/<project>/...` for scratch, `~/work/handoffs/` for briefs, etc.).

## Deploy Workflow

As of 2026-04-10 this project is connected to GitHub via the Vercel GitHub App. A push to `main` auto-builds and auto-promotes `idonthaveawill` to production.

- **Deploy:** `git add` → `git commit` → `git push origin main`. Vercel handles the rest.
- **Do NOT run `vercel --prod` manually** unless a build is stuck or Nick explicitly asks.
- PRs automatically get preview URLs.
