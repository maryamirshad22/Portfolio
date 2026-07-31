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
- **zod** for the contact form and admin API validation
- **jose** for signing/verifying the admin panel's login session (JWT)

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
  (site)/            Public site route group — has its own root layout
    layout.tsx        Root layout: fonts, SEO metadata, JSON-LD, theme provider,
                       Navbar/Footer/animated background/cursor
    page.tsx           Composes every section in order (force-dynamic — see Admin panel below)
    loading.tsx         Route-level loading skeleton
    blog/               Blog index + [slug] post pages
  (admin)/           Admin panel route group — its own independent root layout,
                       deliberately with NO Navbar/Footer/animated background/cursor
    layout.tsx         Minimal root layout: just fonts + theme provider
    admin/              Login, dashboard, add/edit project forms
  globals.css        Design tokens (@theme) + dark/light CSS variables (imported by both layouts)
  sitemap.ts / robots.ts
  api/contact/route.ts   Contact form endpoint (zod-validated, sends real email)
  api/admin/          Admin API routes (login, logout, projects CRUD)

proxy.ts               Protects /admin and /api/admin (Next.js 16's replacement for middleware.ts)

components/
  layout/            Navbar, Footer, ThemeToggle
  sections/          One file per portfolio section (Hero, About, Skills, ...)
  ui/                 Reusable primitives (Button, Badge, GlassCard, ProjectCard,
                       ProjectModal, CommandPalette, AnimatedNetwork, BrandIcons, Reveal,
                       AnimatedBackground, ScrollProgress, CustomCursor, background-boxes)
  admin/               Admin-only components (AdminShell, ProjectForm, ProjectsTable,
                       ExperienceForm, ExperienceTable, SkillGroupForm, SkillGroupsTable)
  providers/         ThemeProvider

data/                 All content lives here — edit these files to update the site
  projects.ts         Seed/fallback project data (used if the JSON store is missing)
  experience.ts        Seed/fallback for the `experience` array, plus the fully static
                       timeline, certifications, and testimonials (not admin-editable yet)
  skills.ts             Seed/fallback skill groups + tech stack marquee items
  store/                 The live, admin-editable data — this is what actually renders
                         on the site once the admin panel has been used at least once
    projects.json          Edited via /admin
    experience.json         Edited via /admin/experience
    skills.json              Edited via /admin/skills
  blog.ts               Full blog post content (used by /blog and /blog/[slug])
  social.ts            Site config (name, email, resume URL) + social links

lib/
  auth.ts               JWT session sign/verify (used by proxy.ts and the login route)
  projects-store.ts     Server-only read/write helpers for data/store/projects.json
  experience-store.ts   Server-only read/write helpers for data/store/experience.json
  skills-store.ts        Server-only read/write helpers for data/store/skills.json
  project-status.ts     Derives each project's Live/Ongoing/Private Codebase badge
  zod-error.ts           Formats validation errors as "field: message" so admin
                         forms always show exactly which field is the problem
  utils.ts               `cn()` class-merge helper

types/index.ts        Shared TypeScript types for the content layer
```

## Admin panel

Visit **`/admin`** to manage your content without touching code — three sections,
each with add/edit/delete:

- **Projects** (`/admin`) — the same project data shown in Featured Projects
- **Experience** (`/admin/experience`) — work experience entries
- **Skills** (`/admin/skills`) — skill groups, each with its own list of
  named skills and proficiency levels (add/remove individual skills inline)

Changes appear on the live site immediately — no rebuild needed. Validation
errors now always name the exact field that's the problem (e.g. `role: Too
small: expected string to have >=1 characters`) instead of a vague message,
and the forms also catch empty required fields client-side before submitting.

### Setup

1. Copy `.env.example` to `.env.local` if you haven't already.
2. Set three values in `.env.local`:
   ```
   ADMIN_USERNAME=pick-a-username
   ADMIN_PASSWORD=pick-a-strong-password
   ADMIN_JWT_SECRET=a-long-random-string
   ```
   Generate a good secret with `openssl rand -base64 32` (or any long random string).
3. Restart `npm run dev`, then visit `http://localhost:3000/admin` and log in.

### ⚠️ Important: this won't persist writes on Vercel

The admin panel stores project data in `data/store/projects.json` on disk. That
works perfectly for local development and for hosts with a persistent
filesystem. **It will not work on Vercel (or any serverless host)** — those
platforms run your app in a read-only filesystem, so edits made through
`/admin` on a Vercel deployment won't actually save.

Your options:
- **Use it locally** — run `npm run dev` or `npm run build && npm run start`
  on your own machine, edit content there, and re-deploy the updated
  `data/store/projects.json` file.
- **Deploy somewhere with persistent disk** — e.g. Railway, Render, Fly.io, or
  a VPS with Docker — and the admin panel works exactly as-is.
- **Upgrade to a real database** — the read/write logic is isolated in
  `lib/projects-store.ts` (two functions: `readProjects` / `writeProjects`).
  Swap their internals for calls to a hosted database (Vercel Postgres, Neon,
  Supabase, Turso, etc.) and every API route and admin page keeps working
  unchanged, since they only ever call those two functions.

### Security notes

- The password check is a plain equality comparison against `ADMIN_PASSWORD`
  in your environment variables — never commit `.env.local`, and use a
  genuinely strong password since this env var is effectively your login.
- Sessions are signed JWTs in an httpOnly cookie (`admin_session`), verified
  on every request to `/admin/*` and `/api/admin/*` by `proxy.ts`.
- There's no rate-limiting on the login endpoint. Fine for a personal
  portfolio behind a private URL; add rate-limiting if you want extra
  protection against brute-forcing.

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

- The app uses **two independent root layouts** via route groups —
  `app/(site)/layout.tsx` (Navbar, Footer, animated background, custom cursor,
  full SEO metadata) and `app/(admin)/layout.tsx` (bare — just fonts and the
  theme provider, `noindex`). This keeps the admin panel completely free of
  the public site's chrome; neither layout leaks into the other. Route groups
  don't affect URLs, so `/admin` and `/` work exactly as you'd expect.
- Colors, fonts, and radii are defined once in `app/globals.css` under `@theme`
  and a `[data-theme]` block, so dark/light mode is a single CSS variable swap —
  no component-level conditionals.
- The signature visual is the animated canvas node-graph in the Hero
  (`components/ui/AnimatedNetwork.tsx`), representing the agent/tool-connection
  model central to Maryam's AI work — plus a functional `⌘K` command palette
  (`components/ui/CommandPalette.tsx`) for quick navigation.
- A site-wide interactive grid background (`components/ui/background-boxes.tsx` +
  `components/ui/AnimatedBackground.tsx`) sits fixed behind every section — a
  hover-reactive box grid (adapted from a common "background boxes" pattern,
  cut down from 15,000 to ~1,200 cells and rebuilt as a plain, non-transformed
  grid so it reliably covers the full viewport) with a soft radial-gradient
  vignette so it glows near the center and fades to solid at the edges. On top
  of hover, a GSAP loop continuously "twinkles" random cells on its own so the
  grid stays visibly alive. Colors and borders pull from the theme tokens, so
  it adapts to dark/light mode automatically.
- A GSAP ScrollTrigger-powered progress bar (`components/ui/ScrollProgress.tsx`)
  fills across the very top of the page as you scroll.
- A custom GSAP cursor (`components/ui/CustomCursor.tsx`) — a lagging ring +
  tight dot that scales up over links/buttons — replaces the native cursor on
  desktop (fine-pointer) devices only, and is skipped entirely on touch
  devices and under `prefers-reduced-motion`.
- Projects render in a bento-style grid (`components/sections/ProjectsGrid.tsx`)
  with the first project spanning both columns. Each card shows an honest
  status pill — **Live** (has a real `demo` link), **Ongoing** (`demoNote`
  mentions "development"/"progress"), or **Private Codebase** (no public
  link) — derived automatically in `lib/project-status.ts` from each
  project's existing `github`/`demo`/`githubNote`/`demoNote` fields, so no
  extra data entry is needed per project.
- Scroll-reveals (`components/ui/Reveal.tsx`) now include a subtle
  scale + blur-in alongside the fade/slide, used consistently across every section.
- The Hero heading uses GSAP for a word-by-word stagger reveal on load.
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
