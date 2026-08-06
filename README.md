# Matt Cavallaro → Vercel pitch site

A single-page pitch built for Vercel's **Account Executive, Majors (APAC)** role.
Every section is copy-mapped to a line in the JD — see `lib/content/` for the
source-of-truth data behind each claim, pulled from the CV and the strategic
brief this repo was built from.

Built with Claude Code. Shipped on Vercel.

## Stack

- Next.js 16 (App Router) + TypeScript, Turbopack
- Tailwind CSS v4, hand-rolled Geist-inspired dark theme
- Vercel AI SDK (`ai`, `@ai-sdk/react`) + AI Gateway for the live chat panel
- Framer Motion for the hero terminal animation

## Local setup

```bash
npm install
vercel link            # connect this directory to the vercel-pitch project
vercel env pull .env.local   # provisions VERCEL_OIDC_TOKEN, no manual key needed
npm run dev
```

`@ai-sdk/gateway` authenticates via that OIDC token automatically. If you'd
rather not link the project, copy `.env.local.example` to `.env.local` and
fill in `AI_GATEWAY_API_KEY` (or `OPENAI_API_KEY`) by hand instead.

Without either, the site still builds and runs fully — the "Technical
Fluency" chat panel just shows a clear "chat disabled" state instead of
crashing.

## The chat panel

`app/api/chat/route.ts` streams responses via `streamText`, grounded by a
small keyword-overlap retrieval step (`lib/rag.ts`) — no vector DB, no
embedding calls, just enough retrieval to keep the model honest about what
it does and doesn't know. The system prompt instructs the model to answer
in Matt's voice, in first person, and to say "I'd want to validate that
before the interview" rather than invent specifics.

The grounding facts themselves live in **Vercel Edge Config**
(`vercel-pitch-grounding`, key `knowledgeChunks`), not just the committed
`lib/content/knowledge-chunks.ts` file. `lib/rag.ts` reads from Edge Config
first and falls back to the static file if `EDGE_CONFIG` isn't set or the
read fails, so local dev and a fresh clone both work with zero setup.
`lib/content/knowledge-chunks.ts` is still the source of truth checked into
git; Edge Config is a live mirror you can patch instantly:

```bash
# Patch the live store without a redeploy (also update the .ts file to match,
# so the two don't drift)
vercel global-config update vercel-pitch-grounding --patch '{"knowledgeChunks": [...]}'
```

### Rate limiting

The chat endpoint has two layers:

1. **`lib/rate-limit.ts`** — an in-process, best-effort token-bucket check
   (20 req/min per IP) that works immediately with zero provisioning, but
   only holds per warm instance since Fluid Compute doesn't share memory
   across instances or regions.
2. **A Vercel Firewall custom rule** ("Rate limit chat API", path
   `/api/chat`, 20 req/60s per IP) — this is the authoritative, edge-level
   enforcement. It's staged as a draft on this project and needs a review +
   `vercel firewall publish --yes` to go live (deliberately not auto-published
   from a script — see the Vercel Firewall skill's own guidance on staged
   rollouts for anything that can block real traffic).

## Automated target-account verification

`app/api/cron/verify-target-accounts/route.ts` runs weekly (Monday 06:00
UTC, `vercel.json`) via Vercel Cron. It fetches `vercel.com/customers`,
checks whether any of the five Target Accounts sections' companies now
appear on it, and writes the result to a private Vercel Blob store
(`vercel-pitch-status`, pathname `status/target-accounts-verification.json`,
overwritten each run). `components/target-accounts.tsx` reads that result
and shows a "last verified" line under the section; the whole homepage
revalidates hourly (`export const revalidate = 3600` in `app/page.tsx`) so
that stays fresh without a per-request Blob read.

The route checks `Authorization: Bearer $CRON_SECRET` before doing
anything, matching Vercel's documented cron-auth pattern, so it can't be
triggered by a random request to that path.

## Deploying

The GitHub repo is connected to the `vercel-pitch` project on Vercel
(team-cav1) and deploys on push. AI Gateway auths via OIDC automatically on
Vercel deployments — no env var to set for that. A custom domain can be
attached in the Vercel dashboard whenever it's ready.

## Updating content

All copy and stats live in `lib/content/*.ts` as typed data — correct a
number or reword a claim there without touching any component.
