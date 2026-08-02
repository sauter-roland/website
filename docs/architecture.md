Note: This file is AI-generated, and while parts of it have been vetted, others have not.

# Architecture

How this site is put together and why. Companion to `docs/spec-terminal-ui.md`, which covers
the visual design; this document covers the code.

---

## 1. What this is

A single-page personal site: about, work history, projects, scientific background, reading.
One author, no editors, no user accounts, no database, no forms, no analytics. Traffic is
measured in visits per day, not per second.

### Constraints

| Constraint | Consequence |
|---|---|
| Content changes rarely, by one person, in an editor | No CMS, no admin UI, no preview environment |
| No user input, no secrets, no personal data | No auth, no CSRF/session handling, no privacy surface |
| Self-hosted on a VPS the author already runs | Deployment must be a container, not a platform integration |
| Author's time is the scarce resource | Prefer boring, well-documented defaults over clever ones |

---

## 2. At a glance

```
  source (git, branch terminal-design)
        │
        ├── app/               App Router — layout (chrome), page (content), components
        ├── lib/site.ts        section + contact metadata
        ├── tests/e2e/         Playwright, incl. axe accessibility
        ├── public/            static assets
        ├── docs/              you are here
        │
        ▼
  Dockerfile  (multi-stage: node:20-bullseye-slim)
        │  builder  → npm install (incl. dev) → npm run build
        │  runner   → .next + node_modules + public + package.json
        ▼
  Dokploy on VPS
        │  rolling deploy, healthcheck GET / every 30s
        │  512 MB / 0.5 CPU, port 3000
        ▼
  next start  (Node server, single container)
```

## 3. Decisions

Lightweight ADR format: context, decision, consequences.

### 3.1 Next.js App Router

**Context.** The site is static content that would work as handwritten HTML. Framework choice
is therefore about tooling and future headroom, not necessity.

**Decision.** Next.js 16, App Router, React 19, TypeScript strict.

**Why.** Bundling, routing, image optimization, font self-hosting and TS integration arrive
configured and stay maintained. The author works in this stack professionally, so maintenance
cost is near zero. The App Router's server-components-by-default model suits a content site
exactly: almost nothing needs to be interactive.

**Consequences.** The main reason behind using a more complex stack is for my personal learning.
This site was made as an extension of my learning "enough front-end to be dangerous". 

### 3.2 Chrome in the layout, content in the page

**Decision.** `app/layout.tsx` renders the persistent editor chrome — title bar, sidebar, tab
bar, status bar — and `app/page.tsx` renders only the five content sections.

**Why.** The chrome is genuinely global. Putting it in the root layout means it survives
untouched if routes are ever added (§10), and keeps `page.tsx` down to a readable list of
sections.

### 3.3 One observer, shared by two navigation sections

This is the only real state in the application and the subtlest part of the codebase.

**Problem.** The sidebar tree and the tab bar both highlight the section currently being read.
Both need the same scroll-derived value. Two `IntersectionObserver`s watching the same five
elements would duplicate work and drift out of sync.

**Decision.** `use-active-section.ts` owns one observer. `nav-provider.tsx` is a client
component that calls it once and publishes the result through context. Both navigation
sections consume that context.

**The part worth understanding.** `NavProvider` is a client component, but the sections it
wraps are *not* client components. They are passed through as `children`:

```tsx
<NavProvider>          {/* "use client" */}
  <Sidebar />          {/* client — consumes context */}
  <main>
    <TabBar />         {/* client — consumes context */}
    {children}         {/* server-rendered, passed through untouched */}
  </main>
</NavProvider>
```

`"use client"` marks a *boundary in the module graph*, not a subtree in the rendered tree.
Children passed as props are rendered by the server and handed to the client component as
already serialized output. So all five content sections stay server components despite sitting
visually inside a client one. Rendering `{children}` *inside* `NavProvider`'s own module would
have pulled them client-side; passing them in does not.

The observer uses `rootMargin: "-45% 0px -50% 0px"` — collapsing the viewport to a thin band
just above the middle, so exactly one section reports as intersecting at a time.

### 3.4 Fully static, no data layer

**Decision.** No `fetch`, no database, no CMS, no `revalidate`. Everything pre-renders at build.

**Why.** Five sections of prose that change a few times a year. A data layer would add an
availability dependency and a cache-invalidation problem in exchange for nothing.

**Consequences.** Content changes require a rebuild and redeploy — one push. The container's
only runtime job is serving prerendered output, which is why 512 MB and half a CPU are ample.

### 3.5 Content in TSX, structure in `lib/site.ts`

**Decision.** Prose lives in the section components. Data read by *more than one* component —
section ids, filenames, tags, glyphs, prompt commands, gutter line counts, contacts — lives in
`lib/site.ts`.

**Why.** The sidebar, tab bar, prompt lines and gutters all describe the same five sections. A
single array keeps them consistent; adding a section is one entry plus one `<Section>` in
`page.tsx`. Prose, by contrast, is rendered by exactly one component each and gains nothing
from extraction — MDX or a CMS would add a pipeline whose only beneficiary is an editor who
does not exist.

**Consequences.** Copy edits are code edits. The dividing line to hold: *data more than one
component reads* gets extracted; *prose one component renders* stays inline. See §10 for when
this changes. Note the trap this file has already fallen into once: extracting the data is only
half the job, the fields within an entry have to stay consistent with each other too. The
convention table at the top of `lib/site.ts` exists for that reason.

### 3.6 Tailwind v4, tokens in `@theme`

**Decision.** Tailwind v4 via `@tailwindcss/postcss`. Design tokens in a `@theme` block in
`app/globals.css`. Component CSS in `@layer components` in the same file.

**Why (and a trap).** Tailwind v4 moved configuration out of `tailwind.config.ts` and into CSS.
**There is no config file in this project and there should not be one** — v3-era advice,
including most of what an LLM will suggest, does not apply. Tokens in `@theme` become both CSS
custom properties and utility classes, so the palette is expressed once. The 900px breakpoint
is a token too (`--breakpoint-wide`), giving `wide:` / `max-wide:` variants.

**What stays in hand-written CSS.** Only what utilities express badly: pseudo-elements
(`.sec-tag::after`, `.bullets li::before`, `.comment::before`), the blink keyframes, hidden
scrollbars, the skip link, and the `.content`-scoped typography. That last one is deliberate —
scoping headings and links to `.content` rather than setting them globally keeps the chrome
from inheriting body typography, and avoids repeating the same className string in five files.

### 3.7 One page, anchor navigation

**Decision.** A single route with five `<section>` anchors rather than five routes.

**Why.** The content reads as one continuous document. Anchors keep navigation instant and let
both navigations track position without route transitions.

**Consequences.** Two things handled deliberately rather than discovered:

- **Sticky offset.** Title bar (38px) and tab bar (39px) occupy 77px permanently.
  `section { scroll-margin-top: 84px }` in `globals.css` stops anchor jumps landing headings
  underneath them. There is an e2e test for this because it is invisible until it isn't.
- **SEO and sharing.** One URL means one title, one description, one share preview.

### 3.8 Docker + Dokploy on a VPS, not Vercel

**Decision.** Multi-stage Dockerfile deployed by Dokploy onto a VPS the author already runs.
Rolling strategy, healthcheck on `GET /`.

**Why.** The VPS exists and hosts other projects; adding a container is marginal cost. Avoids
coupling the site to a platform whose terms may change, and the container is portable.

**Consequences.** No CDN, no edge caching, no preview deployments — all of which Vercel would
provide free. At this traffic level none matter. If global latency ever does, a CDN in front of
the container is the smaller change.

### 3.9 End-to-end tests over unit tests

**Decision.** No unit tests. Nine Playwright specs covering the behavior that is easy to break
and invisible in review: scroll-spy, anchor offset, keyboard traversal, reduced motion,
responsive breakpoints, external links, chrome rendering, absence of overlays, and axe
accessibility.

**Why.** There is almost no pure logic to unit test — one hook and an array. The risk in this
codebase is *integration*: a sticky offset that hides a heading, a focus style that disappears,
a nav that stops tracking. Only a real browser catches those.

**Two decisions inside the config worth keeping.** Tests run against `npm run build && npm run
start`, not `next dev` — the dev overlay injects a focusable `<nextjs-portal>` that lands in the
tab order and breaks keyboard tests. And a11y is asserted by axe in CI-able form rather than by
remembering to run Lighthouse.

---

## 4. Rendering and runtime

| Stage | What happens |
|---|---|
| Build | Routes pre-rendered to HTML; CSS extracted; Inter + JetBrains Mono self-hosted by `next/font` |
| Runtime | `next start` serves pre-rendered HTML and static assets |
| Client | Hydrates the nav only; content sections are inert markup |

The Node server is kept rather than exporting a static bundle because it keeps `next/image`
optimization working. See §10.

---

## 5. Directory layout

```
app/
  layout.tsx            root shell: fonts, metadata, chrome, skip link
  page.tsx              composes the five sections
  globals.css           @theme tokens, @layer base, @layer components
  components/
    title-bar/sidebar/tab-bar/status-bar   chrome
    nav-provider.tsx, use-active-section.ts  the one observer
    section.tsx, prompt-line.tsx           section scaffolding
    about/work/projects/science/reading    content
    ui/                                    card, badge, chip, bullet-list
lib/site.ts             section + contact metadata
tests/e2e/              Playwright specs
public/                 profile.jpg, favicon
docs/                   architecture.md
```

---

## 6. Accessibility as an architectural constraint

Two decisions above create obligations that are cheap now and expensive to retrofit, so they
are treated as build requirements and covered by tests:

- **Two navigations to the same anchors** (§3.7) need distinct `aria-label`s and
  `aria-current`, or a screen reader hears the same five links twice with no explanation.
- **Decorative chrome** — line numbers, window dots, file glyphs, the cursor — is `aria-hidden`.
  The editor metaphor is entirely visual; a screen reader should get the document, not the
  furniture.
- **Motion** is opt-in: the cursor blink sits inside `prefers-reduced-motion: no-preference`,
  and smooth scrolling reverts to `auto` under `reduce`.

### The contrast finding worth remembering

The design spec measured every text colour against `--color-bg` (`#1e1e2e`). But the title bar,
sidebar and status bar sit on `--color-chrome` (`#313244`), which is lighter — and `fg-faint`
(`#9399b2`) drops from 5.81:1 to **4.45:1** there, just under AA. The implementation added
`--color-faint-chrome` (`#9aa0b8`) for chrome surfaces: 4.85:1 on chrome, 6.32:1 on bg.

The general lesson: **a contrast ratio is a property of a pair, not of a colour.** Any token
used on more than one surface needs measuring against each. `--color-ghost` is the deliberate
exception — it is below AA and restricted to the decorative line-number gutter.

---

## 7. Security posture

Minimal by construction: no user input, no secrets in the repo, no third-party scripts, no
cookies. `.dockerignore` excludes `.env*` so environment files cannot reach the image. Outbound
links carry `rel="noopener noreferrer"`.

Remaining surface is supply chain and the container. Dependencies should be bumped on a
schedule — a site nobody edits is a site whose dependencies quietly rot.

---

## 8. Conventions

- Server components by default. `"use client"` only where a browser API is required, and as low
  in the tree as possible.
- No raw hex outside `@theme`. Colors are referenced as tokens or utilities.
- Anything decorative is `aria-hidden`. If it exists only to look like an editor, it is
  decorative.
- New chrome that describes sections reads from `lib/site.ts` rather than hard coding five of
  anything.

---

## 9. Known debt

| # | Issue | Impact | Fix |
|---|---|---|---|
| D1 | Runner image copies the full `node_modules`, including devDependencies (Tailwind, ESLint, TypeScript, Playwright) | Larger image, larger attack surface | `output: "standalone"` in `next.config.ts`, then copy `.next/standalone` + `.next/static`. Highest-value infra fix |
| D2 | Builder installs `python3 make g++` for native modules; the project has none | Slower, larger builds | Drop the `apt-get` layer |
| D3 | `README.md` is unmodified `create-next-app` boilerplate, still advertising Vercel deployment | Contradicts §3.8; misleads anyone arriving at the repo | Rewrite: what it is, how to run, how it deploys, pointer to `docs/` |
| D4 | `metadata` has title and description only — no Open Graph, no canonical URL | Link shares render bare, on a site whose purpose is being shared | Add OG tags and `metadataBase` |
| D5 | Tests exist but nothing runs them automatically; no `.github/workflows` | Green tests only help if someone remembers | One workflow: `npm run lint`, `npm run build`, `npm run test` on push |
| D6 | Playwright runs Chromium only | Safari/Firefox layout regressions unseen — sticky positioning and `100dvh` are exactly where engines differ | Add WebKit and Firefox projects |

---

## 10. When to revisit

Triggers, not a roadmap.

| Decision | Revisit when |
|---|---|
| Content in TSX (§3.5) | A blog or writing section appears. Then MDX for long-form; components unchanged |
| One route (§3.7) | Any section deserves its own shareable URL or share preview. The chrome already lives in the layout (§3.2), so this is cheaper than it looks |
| Node server (§4) | If `next/image` stops being needed, `output: "export"` makes this a static bundle behind any web server. Note `next/image` needs a loader or `unoptimized` under export — that is the whole trade |
| No CDN (§3.8) | Latency outside Europe becomes a real complaint rather than a hypothetical |
| Self-hosting (§3.8) | Maintaining the VPS stops being something the author enjoys |
