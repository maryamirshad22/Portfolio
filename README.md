# Maryam Irshad — Portfolio

A premium, animated personal portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-based design tokens, no `tailwind.config` needed)
- **Framer Motion** for section/component animation
- **GSAP** for the site-wide animated background and the Hero's staggered heading reveal
- **next-themes** for dark/light mode
- **lucide-react** for icons (+ custom inline SVGs for GitHub/LinkedIn/X, since brand marks were removed from lucide)
- **zod** for the contact form's API validation

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Folder structure

```
app/
  layout.tsx        Root layout: fonts, SEO metadata, JSON-LD, theme provider
  page.tsx           Composes every section in order
  globals.css        Design tokens (@theme) + dark/light CSS variables
  loading.tsx         Route-level loading skeleton
  sitemap.ts / robots.ts
  api/contact/route.ts   Contact form endpoint (zod-validated)

components/
  layout/            Navbar, Footer, ThemeToggle
  sections/          One file per portfolio section (Hero, About, Skills, ...)
  ui/                 Reusable primitives (Button, Badge, GlassCard, ProjectCard,
                       ProjectModal, CommandPalette, AnimatedNetwork, BrandIcons, Reveal)
  providers/         ThemeProvider

data/                 All content lives here — edit these files to update the site
  projects.ts         Project case studies (web + AI)
  skills.ts            Skill levels + tech stack marquee items
  experience.ts        Work experience, timeline, certifications, testimonials
  blog.ts               Full blog post content (used by /blog and /blog/[slug])
  social.ts            Site config (name, email, resume URL) + social links

types/index.ts        Shared TypeScript types for the content layer
lib/utils.ts           `cn()` class-merge helper
```

## Personalizing

Everything editorial lives in `data/`. Nothing else needs to change to update content:

1. **`data/social.ts`** — name, email, resume link, GitHub/LinkedIn/X URLs.
2. **`data/projects.ts`** — currently holds five real projects: EMS, LMS, IAK
   website, Sherwani Builder Website, and AITS Website (AI). Add `github` /
   `demo` URLs once you have public links — until then, `githubNote` /
   `demoNote` show a status pill instead (e.g. "Private repository", "In development").
3. **`data/experience.ts`** — experience, timeline, certifications, testimonials.
4. **`data/blog.ts`** — real blog posts, rendered at `/blog` (index) and
   `/blog/[slug]` (full post). Each post is an array of content blocks
   (`p`, `h2`, `list`, `code`) — add a new object to the array to publish a
   new post, no routing changes needed.
5. **`data/skills.ts`** — skill percentages and the tech-stack marquee.
6. **`components/sections/GithubStats.tsx`** — set `GITHUB_USERNAME` to your real
   handle; it fetches live stats from the GitHub API with a static fallback if the
   request fails.
7. **`public/resume/`** — replace the placeholder with your real
   `Maryam-Irshad-Resume.pdf` (the Navbar's Resume button already links to it).
8. **`public/images/projects/`** — swap the generated gradient placeholders for real
   screenshots (same filenames, or update `image` in `data/projects.ts`).
9. **`public/og-image.png`** — add a 1200×630 social preview image (referenced in
   `app/layout.tsx` metadata).
10. **Contact form** — already wired to send real email to
   `maryamirshad842@gmail.com` via Gmail SMTP. You just need to add two
   environment variables — see "Contact form email setup" below.

## Contact form email setup

The contact form sends real email to `maryamirshad842@gmail.com` using Gmail's
SMTP server via Nodemailer (`app/api/contact/route.ts`). To make it work you
need a **Gmail App Password** (a 16-character code — not your normal Gmail
password, since Gmail blocks plain-password SMTP logins).

1. Go to your Google Account → **Security**.
2. Turn on **2-Step Verification** if it isn't already on (required for App Passwords).
3. Go to **Security → 2-Step Verification → App passwords**
   (or visit https://myaccount.google.com/apppasswords directly).
4. Create a new app password — name it something like "Portfolio Contact Form".
5. Google gives you a 16-character password. Copy it.
6. In the project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
7. Fill in the two values:
   ```
   GMAIL_USER=maryamirshad842@gmail.com
   GMAIL_APP_PASSWORD=your16charapppassword
   ```
8. Restart `npm run dev`. Submit the contact form — the message will arrive in
   your Gmail inbox, with **Reply-To** set to the sender's email so you can
   reply directly.

**Deploying (e.g. Vercel):** add `GMAIL_USER` and `GMAIL_APP_PASSWORD` as
Environment Variables in your project settings — do not commit `.env.local`
(it's already in `.gitignore`).

If the env vars are missing, the API route returns a clear error instead of
silently failing, and logs a reminder to the server console.

## Design system

- Colors, fonts, and radii are defined once in `app/globals.css` under `@theme`
  and a `[data-theme]` block, so dark/light mode is a single CSS variable swap —
  no component-level conditionals.
- The signature visual is the animated canvas node-graph in the Hero
  (`components/ui/AnimatedNetwork.tsx`), representing the agent/tool-connection
  model central to Maryam's AI work — plus a functional `⌘K` command palette
  (`components/ui/CommandPalette.tsx`) for quick navigation.
- A site-wide, GSAP-powered animated background (`components/ui/AnimatedBackground.tsx`)
  sits fixed behind every section — four gradient blobs with continuous organic
  floating motion (randomized per blob so nothing loops in sync) plus subtle
  mouse-parallax, dimmed automatically in light mode, and skipped entirely under
  `prefers-reduced-motion`. The Hero heading also uses GSAP for a word-by-word
  stagger reveal on load.
- Projects (web + AI) live in one filterable section (`components/sections/ProjectsGrid.tsx`)
  with All / Web / AI tabs, instead of a separate AI Projects section — add new
  projects to `data/projects.ts` with the right `category` and they're picked up
  automatically. The Journey section similarly toggles between the timeline and
  certifications via tabs (`components/sections/Journey.tsx`), and Skills uses the
  same tab pattern to show one category's proficiency bars at a time
  (`components/sections/Skills.tsx`).
- Motion is centralized in `components/ui/Reveal.tsx` for consistent scroll-reveal
  timing across every section, and `prefers-reduced-motion` is respected globally.

## Notes on this sandbox build

Google Fonts (`fonts.googleapis.com`) isn't reachable from the environment this
project was built in, so the production build here temporarily swapped to system
fonts to verify everything else compiles cleanly, then the real `next/font/google`
Inter import was restored before packaging. Any normal deploy target (Vercel,
local dev, CI with internet access) will fetch it automatically — no action needed.
