# Studio Website

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4. Ready to deploy on Vercel.

## Careers section & job applications

`src/data/careers.ts` holds every department and position — add, remove, or
reorder roles there and the Careers section on the site updates automatically.
Each position can optionally carry a description, responsibilities,
requirements, and nice-to-haves for a future detail view.

Applications are submitted through `src/app/api/apply/route.ts`, a serverless
route that validates the form (including the uploaded CV) server-side and
emails the complete application — with the CV as an attachment — via SMTP
using [Nodemailer](https://nodemailer.com/).

**Before applications can be sent, set these environment variables** (copy
`.env.example` to `.env.local` for local dev; in production set them in
Vercel under Project → Settings → Environment Variables — never commit real
values):

```
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
CAREERS_EMAIL=PenumbraStudio@hotmail.com
```

`SMTP_USER`/`SMTP_PASS` are the credentials for whichever mailbox actually
sends the email — this can be a Hotmail/Outlook account, but a dedicated
transactional provider (Resend, SendGrid, Mailgun, Amazon SES, etc.) is more
reliable for automated mail and less likely to get flagged as spam.
`CAREERS_EMAIL` is just the destination inbox and can stay as
PenumbraStudio@hotmail.com regardless of which SMTP relay you use.

The route also includes a honeypot field and a basic per-IP rate limit as
first-pass spam protection.

## Editing content

Everything text-based — studio name, tagline, games, team bios, contact links —
lives in **one file**:

```
src/data/content.ts
```

Edit the values there and the whole site updates. Anything wrapped in
`[BRACKETS]` is a placeholder that still needs real content.

## Adding real images

Every image slot on the site currently shows a designed placeholder (dark
gradient, grain texture, and a small label naming what goes there) instead of
a broken box, so the site looks intentional even before real art is in.
Swap them out whenever you're ready — same filenames, same folders:

```
public/images/studio/    → hero / key art, OG image
public/images/games/     → game cover art & screenshots
public/images/team/      → founder photos
public/images/gallery/   → concept art / behind-the-scenes
public/images/logos/     → studio logo, wordmark
```

Then swap each `ArtPlaceholder` for Next.js's `<Image />` component pointing
at the new file, using the path already set in `src/data/content.ts`
(`coverImage`, `photo`, `image` fields).

## Adding more games

Add another object to the `games` array in `src/data/content.ts` — the
Games section and cards render automatically, no component changes needed.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deploying to Vercel

Push this repo to GitHub and import it in Vercel, or run:

```bash
npx vercel
```

No environment variables are required for the base site.
