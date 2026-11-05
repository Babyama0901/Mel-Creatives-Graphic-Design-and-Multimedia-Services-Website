# AGENT_TASKS.md — Mel Creatives Portfolio Fix & Improvement Plan

**Repo:** https://github.com/Babyama0901/Mel-Creatives-Graphic-Design-and-Multimedia-Services-Website
**Live site:** https://melcreatives.vercel.app/
**Branch reviewed:** `gh-pages`
**Stack:** Semantic HTML5, Vanilla CSS (Flexbox/Grid + CSS Variables), Vanilla JS (ES6+), GSAP (ScrollTrigger)

---

## 0. How to work

1. **Read first, edit second.** Before changing anything, read `index.html`, `script.js`, `styles.css`, `overlay_snippet.html`, `overlay_styles.css`. The review that produced this file only saw `index.html`, so anything about `script.js` / `styles.css` below is a **check**, not a confirmed bug.
2. **Work in phases** (Section order = priority). Commit after each phase with a clear message, e.g. `fix: broken anchors and dead footer links`.
3. **Do not change design language** (colors, typography, layout identity) unless a task says so. Fix bugs and quality, don't redesign.
4. **Do not invent content.** Where a task needs real client work, real testimonials, real prices or real images, leave a clearly marked `TODO(owner)` and list it in the final report. Never fabricate project details, client names, quotes or metrics.
5. **Constraints:**
   - Vanilla HTML/CSS/JS only (no frameworks, no build step required). GSAP via CDN is allowed.
   - **Mobile (<= 768px): no horizontal overflow, ever.** Test at 360px width.
   - Respect `prefers-reduced-motion`.
   - Use CSS variables for any new colors/spacing.
6. **Final deliverable:** a short report listing every task as Done / Skipped / Needs owner input, plus files changed.

---

## Phase 0 — Repo / deploy sync check (do this first)

The `gh-pages` branch does **not** match the deployed Vercel site:

| Item | Repo (`gh-pages`) | Live site |
|---|---|---|
| About bio | "Highly motivated Multimedia student..." | "Detail-oriented UI/UX Designer and Multimedia Artist..." |
| Age | 24 | 25 |
| Footer year | 2025 | 2026 |
| CV filename | `Mel_Tatud_CV.pdf` | `Mel_Joseph_Tatud_CV.pdf` |
| Experience | 7 entries (incl. Santa Barbara NCHS, "Martial Mayhem") | 6 entries (incl. NCAF Branding Committee, Apr 2026) |

**Tasks**
- [ ] Determine which branch/source Vercel deploys from (check `vercel.json`, repo settings, or ask owner). Note it in the report.
- [ ] Treat the **live site's content as the source of truth** for copy (bio, experience, CV filename, year). Port it into the repo's `index.html`.
- [ ] Confirm the CV file exists in the repo root and matches the `href`. If `Mel_Joseph_Tatud_CV.pdf` is missing from the repo, flag `TODO(owner): add CV PDF`.
- [ ] Remove stray/unused files only if confirmed unused: `Desktop.png`, `Mobile.png`, root `featured-project-*.png`, `faq-final.jpg`, `process-final.jpg`, `services-final.jpg` (HTML references `Stock Images/...`). Do **not** delete anything without grepping for references first.

---

## Phase 1 — Bugs & broken things (high priority)

### 1.1 Broken anchor links
- [ ] Process section: `href="#Projects"` → `href="#projects"` (IDs are case-sensitive).
- [ ] Services section: `href="#work"` has no matching ID → change to `#projects`.
- [ ] Header "View Portfolio" and hero "View Portfolio" use `#recent-projects` (valid). Keep, but verify smooth-scroll offset accounts for the fixed header (`scroll-margin-top` on sections).
- [ ] Add `scroll-margin-top: var(--header-height, 80px)` to all `section[id]`.
- **Acceptance:** every `href="#..."` in `index.html` resolves to an existing `id`. Run a script/grep to prove it.

### 1.2 Dead footer links
- [ ] Footer `<div class="social-links">` has `href="#"` for Instagram, Behance, LinkedIn.
  - Behance → `https://www.behance.net/meljosephtatud`
  - LinkedIn → `https://www.linkedin.com/in/meljosephtatud/`
  - Facebook → `https://www.facebook.com/OfficialMlcrtvs35/`
  - Instagram → no URL known: **remove the link** and add `TODO(owner): Instagram URL`.
  - Add `target="_blank" rel="noopener noreferrer"`.
- [ ] Update `&copy; 2025` → dynamic year via JS (`new Date().getFullYear()`) with a static fallback of `2026`.

### 1.3 Missing font
- [ ] Overlay counter uses `font-family: 'Space Mono'` but the Google Fonts `<link>` only loads Outfit and Space Grotesk.
  - Preferred: replace with `'Space Grotesk'` (remove the inline style, put it in CSS using a variable).
  - Alternative: add `family=Space+Mono:wght@400;700` to the fonts URL.

### 1.4 Overlay counter hardcoded
- [ ] `#header-counter`, `#current-index`, `#total-projects` are hardcoded to `1 / 5`, but only 3 featured items have `data-title`.
- [ ] In `script.js`, compute total from the real number of project items; update both counters on open/prev/next.
- [ ] Check whether the 6+ cards in "Recent Projects" are meant to open the overlay (they have no `data-*`). If not intended, leave; if intended, add `data-title`, `data-category`, `data-year` and wire up.
- **Acceptance:** counters always reflect real data; no "5" literal in HTML or JS.

### 1.5 Copy / typo fixes (use live-site copy where available)
- [ ] Bio: remove garbled/duplicated phrase ("...ability to meet client ethic, adaptability, and ability to meet client expectations"), fix "oce administration" → "office administration", fix "skills.Proven" spacing. **Prefer replacing the whole bio with the live-site bio.**
- [ ] "Martial Mayhem" → "Martian Mayhem" (if kept as an experience entry; it is a project, not an employer — confirm with owner, otherwise move/remove).
- [ ] "Send a Email" → "Send an Email".
- [ ] Skill tags: "Editorial Spread" and "T-shirt Design" are projects, not skills. Replace with real skills (e.g. "Packaging Design", "Editorial Design", "Apparel & Merchandise Design", "Adobe Creative Suite", "Figma", "Web Design/Development").
- [ ] Remove or confirm "Age" in the Biography list (recommended: remove; it goes stale).
- [ ] Project meta: normalize to `Category · Year`. Fix "Year 2025" and "Present" in Recent Projects (use real months/years or just year).
- [ ] Footer brand text and `<title>` consistent: "Mel Creatives".

### 1.6 Services copy is shifted (copy-paste bug)
Current cards: *Brand Identity*, *Brand Design*, *Package Design*, *Mockup Design*, but the descriptions of "Brand Design" and "Package Design" belong to **Packaging** and **Mockups** respectively.

- [ ] Rewrite so each description matches its title:
  - **Brand Identity** — logos, visual systems, guidelines.
  - **Brand Design** (or rename to "Social & Marketing Graphics") — consistent brand collateral across touchpoints.
  - **Package Design** — packaging that connects with customers (move the existing packaging sentence here).
  - **Mockup Design** — high-fidelity product mockups (move the existing mockup sentence here).
- [ ] The tag row lists "Product Design", which has no card. Either add a card or remove the tag.
- [ ] Update the hero services paragraph: "brand identity packaging" → "brand identity and packaging".

### 1.7 Process copy is template text
- [ ] Step 1 "Define Your Vision" mentions "Find the perfect plan... balance of features, flexibility, and value" (pricing-plan language). Rewrite to describe the discovery call/brief.
- [ ] Step 2 mentions "our private design portal" — remove unless one exists. Replace with the real intake method (service form / email).
- [ ] Step 3 promises "2-3 days" but FAQ says "2-3 days to 2 weeks". Make consistent (suggest: "typically 2–3 days for small projects; larger projects up to 2 weeks").
- [ ] Use first person ("I") throughout. Replace "we/our/us" in Process, FAQ ("We'll discuss...") and Contact heading ("what we can create") with consistent voice. (Contact can say "what we can create together" intentionally; owner's call. Default: keep that one as is, fix the others.)

### 1.8 FAQ claims
- [ ] "revisions are included in all packages" → there are no packages. Change to "revisions are included; the number depends on the project scope."
- [ ] Industries list (healthcare, e-commerce...) is not backed by portfolio work. Flag `TODO(owner)`; soften to "I work with startups, student orgs, esports, creative groups and small businesses" unless owner confirms.

---

## Phase 2 — Performance

### 2.1 Images
- [ ] Add to **every** `<img>` below the fold: `loading="lazy" decoding="async"` and explicit `width` / `height` (or CSS `aspect-ratio`) to prevent layout shift.
- [ ] Do **not** lazy-load the logo and anything visible on first paint.
- [ ] Remove inline styles on featured images (`style="height: 400px; object-fit: cover; width: 100%;"`). Move to CSS:
  ```css
  .work-thumb { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; }
  .work-item:nth-child(2) .work-thumb { aspect-ratio: 4 / 6; } /* preserve the staggered look */
  ```
- [ ] Unsplash URLs use `w=3000` — either replace with owner's real work (preferred, see 5.1) or reduce to `w=800&q=60` and add `srcset`/`sizes`. Self-host images instead of hotlinking where possible.
- [ ] Convert PNG/JPG assets in `Stock Images/` and root to **WebP** (and optionally AVIF) with `<picture>` fallback. Target < 150 KB for card images, < 300 KB for large images. Keep originals out of the deployed folder or in `/source`.
- [ ] Rename folders/files to URL-safe names (no spaces/apostrophes), e.g. `stock-images/alima-artists-group.webp`. Update all references (HTML, JS, CSS, overlay image arrays). Verify no 404s.

### 2.2 Scripts and fonts
- [ ] Keep `defer` on scripts. Load GSAP with `defer` before `script.js`.
- [ ] Google Fonts: keep `preconnect`, `display=swap`. Trim unused weights (only keep weights actually used in CSS).
- [ ] Analytics (gtag) stays `async`. Add a short privacy note in the footer (see 4.3).

### 2.3 Animation performance
- [ ] Animate only `transform` and `opacity`. No animating `width/height/top/left`.
- [ ] Use `will-change: transform, opacity` only on elements actively animating (add/remove via GSAP `onStart/onComplete` or use `force3D`).
- [ ] Call `ScrollTrigger.refresh()` after images/fonts load (`window.addEventListener('load', ...)` and `document.fonts.ready`).

---

## Phase 3 — Accessibility

### 3.1 FAQ accordion
- [ ] Convert each `.accordion-header` `<div>` into a `<button type="button" aria-expanded="false" aria-controls="faq-N" id="faq-btn-N">`. The first item starts `aria-expanded="true"`.
- [ ] Give panels `id="faq-N" role="region" aria-labelledby="faq-btn-N"`.
- [ ] JS toggles `aria-expanded` and the `active` class. Keyboard: Enter/Space work natively on `<button>`.
- [ ] Mark the `+`/`×` icon `aria-hidden="true"`.

### 3.2 Mobile menu
- [ ] `.mobile-toggle`: add `aria-expanded="false"` and `aria-controls="primary-nav"`; give the `<nav>` `id="primary-nav"`. Toggle `aria-expanded` in JS. Close on Esc and on link click.

### 3.3 Project overlay (dialog)
- [ ] `#project-overlay`: add `role="dialog" aria-modal="true" aria-labelledby="overlay-title"`.
- [ ] On open: store the triggering element, move focus to the close button, lock body scroll.
- [ ] Trap Tab/Shift+Tab inside the overlay; Esc closes; Left/Right arrows go prev/next (optional).
- [ ] On close: return focus to the stored trigger; restore scroll.
- [ ] Make work cards focusable: `tabindex="0" role="button"` (or wrap in a real `<button>`/`<a>`), with Enter/Space to open.

### 3.4 General
- [ ] Add a skip link as first child of `<body>`:
  ```html
  <a class="skip-link" href="#projects">Skip to content</a>
  ```
  ```css
  .skip-link{position:absolute;left:-999px;top:0;padding:.75rem 1rem;background:var(--accent-color,#fff);color:#000;z-index:1000}
  .skip-link:focus{left:1rem;top:1rem}
  ```
- [ ] Add `aria-hidden="true"` to `.section-divider` and to the duplicated marquee rows (`.services-marquee`).
- [ ] Rewrite `alt` text to describe the image (e.g. "West Esports tournament poster in neon blue"), not just the category. Decorative images: `alt=""`.
- [ ] Replace emoji icons (💡 📋 🎯) in `.step-icon` with inline SVGs matching the ✦ visual language (use `currentColor`, `aria-hidden="true"`).
- [ ] Ensure visible `:focus-visible` styles on all interactive elements.
- [ ] Check color contrast (WCAG AA 4.5:1 body, 3:1 large text) especially for text over images/glass buttons. Fix via CSS variables.
- [ ] Social icons: keep `aria-label`s (already present in the contact section). Add them to footer links too.

### 3.5 Remove the "Images are protected" popup (recommended)
- [ ] The copyright dialog/right-click blocking adds friction and doesn't prevent copying. Replace with a subtle footer line ("© Mel Creatives. Please don't reuse without permission.") and optionally a watermark on case-study images.
- [ ] If the owner wants to keep it, make it a proper accessible dialog (same rules as 3.3).

---

## Phase 4 — SEO, sharing, privacy

### 4.1 `<head>` additions
```html
<link rel="canonical" href="https://melcreatives.vercel.app/">
<meta name="theme-color" content="#0b0b0f">
<meta property="og:title" content="Mel Creatives | Graphic Design & Multimedia">
<meta property="og:description" content="Brand identity, packaging and multimedia design by Mel Joseph Tatud.">
<meta property="og:image" content="https://melcreatives.vercel.app/og-image.jpg">
<meta property="og:url" content="https://melcreatives.vercel.app/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```
- [ ] Create `og-image.jpg` (1200×630) from existing brand assets, or `TODO(owner)` if no suitable asset.
- [ ] Add `<link rel="apple-touch-icon">` and a PNG favicon fallback if available.

### 4.2 Structured data
- [ ] Add JSON-LD `Person` (name, jobTitle, url, sameAs: Behance/LinkedIn/Facebook, alumniOf: West Visayas State University). Do not include age.

### 4.3 Files & privacy
- [ ] Add `robots.txt` and `sitemap.xml` (single URL is fine).
- [ ] Add a short privacy note in the footer: site uses Google Analytics. Optionally add a minimal consent banner that loads gtag only after acceptance (owner's call; default: add note only).

---

## Phase 5 — Content (needs owner input; do not fabricate)

### 5.1 Placeholder images
Recent Projects uses Unsplash stock for: **Artlink App, T-shirt Design, Mel Creatives (Social Media Kit), Editorial Spread, Logo Redesign, Websites, Social Media, UI/UX Designs**. These hurt credibility.
- [ ] Check the repo `Projects/` folder for real images and map them to these cards if they exist.
- [ ] For cards with no real image: do **not** delete silently. Mark with `TODO(owner): replace with real work`, and list them in the report. Suggested interim: hide stock-photo cards behind a `data-placeholder="true"` attribute and `display:none` via CSS flag so the owner can re-enable when assets are ready.
- [ ] De-duplicate: West Esports, Martian Mayhem and Alima appear in both Featured and Recent. Keep them in Featured; Recent should list different work (or be reduced).

### 5.2 Case studies
- [ ] Every Featured item's overlay should show real content: title, category, year, role, 3–6 images. Verify the `Projects/` folder structure matches what `script.js` injects. Fix path/case/space issues.
- [ ] `TODO(owner)`: add a short case-study blurb (problem, role, outcome) for each featured project; leave a data field (`data-description`) ready for it.

### 5.3 Positioning
- [ ] About copy sells "UI/UX Designer & Multimedia Artist", Services sell brand/packaging. Flag to owner; don't change positioning yourself. Keep wording consistent with the live site.

### 5.4 Conversion
- [ ] "Book a Free Call" currently just scrolls to `#contact`. Either rename to "Get in Touch" or link to a real booking URL (`TODO(owner): Calendly/Cal.com link`).
- [ ] Optional: add a lightweight contact form (Formspree/Web3Forms) with `TODO(owner): form endpoint`. Don't ship a form without an endpoint.
- [ ] Add a testimonials section scaffold hidden by default with `TODO(owner): real testimonials`. Do not write fake testimonials.

---

## Phase 6 — GSAP animation refactor

> First read `script.js` to see how `.fade-in` / `.fade-up` / `.delay-N` are implemented (CSS, IntersectionObserver, or GSAP). **If GSAP is already used, extend it; do not duplicate.**

### 6.1 Load GSAP
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
<script src="script.js" defer></script>
```

### 6.2 Reveal animations with matchMedia
```js
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

// Motion allowed
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.set(".fade-up", { y: 40, autoAlpha: 0 });
  gsap.set(".fade-in", { autoAlpha: 0 });

  ScrollTrigger.batch(".fade-up", {
    start: "top 85%",
    once: true,
    onEnter: els => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.12, overwrite: true })
  });
  ScrollTrigger.batch(".fade-in", {
    start: "top 90%",
    once: true,
    onEnter: els => gsap.to(els, { autoAlpha: 1, duration: 0.9, ease: "power2.out", stagger: 0.1 })
  });
});

// Reduced motion: show everything immediately
mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(".fade-up, .fade-in", { clearProps: "all", autoAlpha: 1 });
});

// Desktop-only effects (> 768px)
mm.add("(min-width: 769px)", () => { /* parallax / hover effects here */ });

// Mobile (<= 768px): lighter reveals, NO horizontal movement
mm.add("(max-width: 768px)", () => { /* vertical-only reveals */ });
```
- [ ] Remove or neutralize any conflicting CSS `opacity:0`/transition-delay rules for `.fade-*` so there is a single source of truth (add a `.no-js` fallback so content is visible if JS fails).
- [ ] Pause marquee animations under `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce){ .marquee-track{ animation: none; } }
  ```
- [ ] Optional: animate the project overlay open/close with a GSAP timeline (opacity + translateY), respecting reduced motion.

### 6.3 Mobile overflow guard
- [ ] `html, body { overflow-x: clip; }`
- [ ] Use `100dvh` instead of `100vh` for full-height sections (with `100vh` fallback).
- [ ] Constrain `.orb` / `.hero-bg` / marquee containers with `overflow: hidden` and `max-width: 100%`.
- **Acceptance:** at 360×800 and 390×844 viewports, `document.documentElement.scrollWidth === window.innerWidth` on every section.

---

## Phase 7 — Code quality

- [ ] Move all remaining inline `style=""` attributes into CSS classes.
- [ ] Consolidate `overlay_snippet.html` / `overlay_styles.css`: if their content is already inside `index.html` / `styles.css`, delete the duplicates; otherwise merge them.
- [ ] Add a `README.md`: project description, folder structure, how to add a project (data attributes + images folder), how to deploy.
- [ ] Add `.gitignore` (`node_modules`, `.DS_Store`). Check why `package-lock.json` exists with no `package.json`; remove if unused.
- [ ] Use CSS variables for colors/spacing/radii; list all variables in a `:root` block at the top of `styles.css`.
- [ ] Keep JS in a single IIFE or ES module; no globals; guard every `querySelector` against `null`.

---

## Verification checklist (run before reporting)

- [ ] Every internal `#anchor` resolves to an existing `id`.
- [ ] No `href="#"` remaining (except intentional JS buttons — convert those to `<button>`).
- [ ] No 404s for any image, font, CSS, JS or PDF (check network log or a link-checker script).
- [ ] Every `<img>` has `alt`, `width`/`height`, and `loading="lazy"` (except above-the-fold).
- [ ] No horizontal scroll at 360px, 390px, 768px, 1024px, 1440px.
- [ ] Keyboard-only run-through: skip link → nav → cards → overlay (open, Tab trap, Esc, focus return) → FAQ → contact links.
- [ ] `prefers-reduced-motion: reduce` disables movement and marquees.
- [ ] Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Record the scores.
- [ ] Spell-check all copy; scan for "we/our" vs "I" consistency.
- [ ] No console errors.

---

## Final report template

```
## Summary
- Phases completed: ...
- Files changed: ...

## Done
- 1.1 ...

## Skipped / Not applicable
- ... (reason)

## Needs owner input (TODO(owner))
- Instagram URL
- CV PDF in repo
- Real images for: Artlink App, T-shirt Design, ...
- Booking link (Calendly/Cal.com)
- Testimonials
- Case-study descriptions
- Confirm industries list / pricing claims
- og-image.jpg

## Lighthouse (mobile)
Performance: __  Accessibility: __  Best Practices: __  SEO: __
```
