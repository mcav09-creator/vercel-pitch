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
small keyword-overlap retrieval step (`lib/rag.ts`) over `lib/content/knowledge-chunks.ts`
— no vector DB, no embedding calls, just enough retrieval to keep the model
honest about what it does and doesn't know. The system prompt instructs the
model to answer in Matt's voice, in first person, and to say "I'd want to
validate that before the interview" rather than invent specifics.

## Deploying

The GitHub repo is connected to the `vercel-pitch` project on Vercel
(team-cav1) and deploys on push. AI Gateway auths via OIDC automatically on
Vercel deployments — no env var to set for that. A custom domain can be
attached in the Vercel dashboard whenever it's ready.

## Updating content

All copy and stats live in `lib/content/*.ts` as typed data — correct a
number or reword a claim there without touching any component.
