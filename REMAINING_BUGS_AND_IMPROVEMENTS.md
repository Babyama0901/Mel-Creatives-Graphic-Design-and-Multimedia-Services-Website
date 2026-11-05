# REMAINING_BUGS_AND_IMPROVEMENTS.md — Mel Creatives Portfolio (Round 2)

**Live site reviewed:** https://melcreatives.vercel.app/ (rendered text only)
**Repo:** https://github.com/Babyama0901/Mel-Creatives-Graphic-Design-and-Multimedia-Services-Website (branch `gh-pages`)
**Stack:** Semantic HTML5, Vanilla CSS (Flexbox/Grid + CSS Variables), Vanilla JS (ES6+), GSAP (ScrollTrigger)

This file lists **only what is still broken or unimproved** after the first fix round. Items already fixed are listed at the end so they are not touched again.

---

## Rules for the agent

1. **Read before editing:** `index.html`, `script.js`, `styles.css`, `overlay_snippet.html`, `overlay_styles.css`. Items marked **(verify)** could not be confirmed from the rendered page; check the source first and skip if already done.
2. **Confirm the deploy source.** The `gh-pages` branch previously differed from the live Vercel site. Make sure you edit the source Vercel actually builds, and that your changes show up after deploy (hard-refresh to rule out cache).
3. **Do not invent content.** Anything needing owner input is marked `TODO(owner)`. Never fabricate projects, clients, testimonials, prices, links or dates.
4. **Constraints:** vanilla HTML/CSS/JS plus GSAP via CDN only. No horizontal overflow at <= 768px (test at 360px). Respect `prefers-reduced-motion`. Use CSS variables for new colors and spacing. Keep the current visual identity.
5. **Commit per section**, then finish with the report template at the bottom.

---

## SECTION A — Bugs (fix first)

### A1. Broken anchor links
| Location | Current | Fix |
|---|---|---|
| Process section, "See Projects" | `href="#Projects"` | `href="#projects"` (IDs are case-sensitive) |
| Services section, "See Projects" | `href="#work"` (no such ID) | `href="#projects"` |

- [x] Fix both.
- [x] Add `scroll-margin-top: var(--header-height, 80px);` to every `section[id]` so the fixed header doesn't cover headings.
- **Acceptance:** run a script that lists every `href="#..."` and confirms a matching `id` exists. Zero misses.

### A2. Overlay shows placeholder/hardcoded data
Live page shows `Project Title`, `Category • 2024 • 1 / 5` in the overlay markup, and the counter is hardcoded to 5 while only 3 featured projects exist.
- [x] In `script.js`, compute the total from the real number of project items and update `#header-counter`, `#current-index` and `#total-projects` on open / prev / next.
- [x] Remove the literal `5` from HTML and JS.
- [x] Ensure the overlay title/category/year are always populated from each item's `data-title`, `data-category`, `data-year` before it becomes visible (no flash of "Project Title").
- [x] **(verify)** Overlay images come from the `Projects/` folder. Confirm every path resolves (watch for spaces, apostrophes, upper/lowercase) and no 404s occur.
- [x] **(verify)** Recent Projects cards have no `data-*` attributes. If they are not meant to open the overlay, leave them. Otherwise wire them up.

### A3. Copy typo
- [x] "Send a Email" → "Send an Email".

### A4. Services descriptions are shifted (copy-paste bug)
Current: card titles and descriptions are misaligned. Replace with:

| Card title | New description |
|---|---|
| **Brand Identity** | Crafting unique, memorable brand identities that resonate with your audience, from logos to visual systems, so every touchpoint reflects your brand's essence. *(keep current text)* |
| **Brand Design** *(rename to "Marketing & Social Graphics" if owner agrees)* | Creating cohesive brand graphics for social media, print and digital channels so your message looks consistent everywhere your audience finds you. |
| **Package Design** | Designing sleek, impactful packaging that looks great on the shelf and connects with your ideal customers, turning first impressions into lasting brand loyalty. *(this is the text currently under "Brand Design")* |
| **Mockup Design** | Bringing your brand to life through high-fidelity product mockups, giving you a clear, realistic preview of how your packaging and visuals will look in the real world. *(this is the text currently under "Package Design")* |

- [x] Apply the table above.
- [x] Services tag row contains "Product Design", which has no matching card. Remove the tag or add a card (default: remove).
- [x] Hero line "brand identity packaging" → "brand identity and packaging"; "standout" → "stand out".

### A5. Process copy is template text
Replace the three steps with:

| Step | Title | New copy |
|---|---|---|
| 1 | Define Your Vision | Tell me about your brand, audience and goals. We'll agree on scope, deliverables and timeline before any design work begins. |
| 2 | Submit Your Request | Send your brief through the service form or email. I'll review it, ask any follow-up questions and confirm the plan with you. |
| 3 | Project Delivered | I design with close attention to detail and share drafts for your feedback. Small projects are typically delivered in 2–3 days; larger ones can take up to 2 weeks. |

- [x] Apply the copy. It removes "perfect plan", "private design portal", "our" and the conflicting delivery promise.
- [x] Process subtitle: "crafting bold visuals that inspire and elevate brands with thought process." → "Crafting bold visuals that inspire and elevate brands, from first brief to final delivery." (capital C, proper sentence).

### A6. FAQ claims that aren't true or can't be backed up
- [x] "Yes, revisions are included in all packages." → "Yes, revisions are included. The number of rounds depends on the project scope, and we'll agree on it before starting."
- [x] "How do I start working with you?" → replace "contact form" with "service form or email" and use "I'll" consistently (remove "We'll").
- [x] Industries answer lists healthcare, e-commerce, food & beverage, etc. that the portfolio doesn't show. Change to: "I've worked with esports teams, student organizations, creative groups, schools and small businesses, and I'm open to other industries." `TODO(owner): confirm or expand`.
- [x] Pricing answer mentions "retainer options". `TODO(owner): confirm retainers are really offered`, otherwise remove.
- [x] "How long does a project take?" answer: "2-3 days to 2 weeks" → "from 2–3 days for small projects up to about 2 weeks for larger ones."

### A7. Experience dates look wrong
- [x] "Student Content Creator, West Visayas State University — Apr 2022 – Aug 2022" has the **exact same dates** as "Layout Artist, Instamp Iloilo". An earlier version said Apr 2023 – Sept 2023. `TODO(owner): confirm correct dates`; use Apr 2023 – Sept 2023 only if the owner confirms.
- [x] The NCAF role shows only "Apr 2026". Format consistently with the others (e.g. "Apr 2026" is fine if it was a one-month engagement; otherwise add a range).
- [x] The Alima role now reads "Creative Director" in Experience. `TODO(owner)`: confirm title, and make sure the featured case study and Recent Projects wording agree.

### A8. Project metadata formatting
Current oddities: `Branding Sept 2025`, `Packaging Year 2025`, `Print Design Present`.
- [x] Standardize every card to `Category · Year` (e.g. `Branding · 2025`). Replace "Year 2025" and "Present" with a real year or month. `TODO(owner)` for the Editorial Spread date.
- [x] The "Mel Creatives" card's alt text says "Social Media Kit" while the title says "Mel Creatives / Brand Identity". Make title, alt text and category agree.

### A9. Remove the "Images are protected" popup
- [x] It adds friction and doesn't prevent copying. Remove the dialog markup, its CSS and the JS that triggers it (including any right-click blocking).
- [x] Replace with a subtle footer line: "Artwork © Mel Creatives. Please don't reuse without permission."
- [x] If the owner insists on keeping it: make it an accessible dialog (`role="dialog"`, `aria-modal`, focus trap, Esc to close).

---

## SECTION B — Content that needs the owner (do not fabricate)

### B1. Stock placeholder images in Recent Projects (biggest credibility issue)
These cards use Unsplash photos, not Mel's work: **Artlink App, T-shirt Design, Mel Creatives, Editorial Spread, Logo Redesign, Websites, Social Media, UI/UX Designs**.
- [x] Look in the repo's `Projects/` folder for real images and map them to these cards where they exist.
- [x] For cards with no real image: add `data-placeholder="true"` to the `<article>` and hide them with CSS (`[data-placeholder="true"]{display:none}`) so the owner can re-enable them when real work is ready. List them in the report as `TODO(owner)`.
- [x] Do not leave `w=3000` Unsplash URLs active. If any stock image stays visible, use `w=800&q=60`, add `srcset`/`sizes`, and prefer self-hosting.

### B2. Duplicates
- [x] Martian Mayhem, Alima Artists' Group and West Esports appear in **both** Featured and Recent. Keep them in Featured; remove them from Recent (or replace with different work).

### B3. Case studies and conversion
- [x] `TODO(owner)`: a short blurb per featured project (problem, role, outcome). Add a `data-description` attribute and render it in the overlay when present; hide the block when empty.
- [x] "Book a Free Call" only scrolls to `#contact`. Either rename all instances to "Get in Touch" or link to a real booking URL `TODO(owner): Calendly/Cal.com`. There are three instances (Process, Services, FAQ).
- [x] Optional: contact form via Formspree/Web3Forms `TODO(owner): endpoint`. Do not ship a form without an endpoint.
- [x] Optional: testimonials scaffold hidden by default. `TODO(owner): real testimonials`. Never write fake ones.
- [x] Remove "Age: 25 years old" from Biography (goes stale; unnecessary).

### B4. Positioning
- [x] About copy sells "UI/UX Designer and Multimedia Artist" while Services/Process sell brand and packaging. Flag to owner in the report; don't change positioning unprompted.

---

## SECTION C — Performance

- [x] Add `loading="lazy" decoding="async"` and explicit `width`/`height` (or CSS `aspect-ratio`) to every image below the fold. Do not lazy-load the logo or first-paint images. **(verify; may already exist)**
- [x] Remove inline `style="height: 400px/500px; object-fit: cover; width: 100%"` on featured images; move to CSS classes with `aspect-ratio` so they don't crop badly on mobile.
- [x] Convert PNG/JPG in `Stock Images/` and root to **WebP** (optional AVIF) with `<picture>` fallback. Target < 150 KB for cards and < 300 KB for large images.
- [x] Rename assets to URL-safe names (no spaces or apostrophes), e.g. `Alima Artists' Group - Feature Project 3.png` → `alima-artists-group.webp`. Update every reference in HTML, JS, CSS and overlay image arrays. Verify no 404s.
- [x] Trim unused Google Font weights; keep `preconnect` and `display=swap`. Add Space Mono only if it is actually used (the overlay counter used it but the font wasn't loaded).
- [x] Animate only `transform` and `opacity`; call `ScrollTrigger.refresh()` after `load` and `document.fonts.ready`.

---

## SECTION D — Accessibility

All **(verify)**: the rendered page can't show attributes, so check the source and fix what's missing.

- [x] **FAQ accordion:** headers must be `<button type="button" aria-expanded aria-controls>`; panels get `id`, `role="region"`, `aria-labelledby`. Mark `+`/`×` icons `aria-hidden="true"`.
- [x] **Mobile menu toggle:** `aria-expanded` + `aria-controls="primary-nav"`; close on Esc and on link click.
- [x] **Project overlay:** `role="dialog" aria-modal="true" aria-labelledby="overlay-title"`; move focus in on open, trap Tab, Esc closes, return focus to the trigger, lock body scroll. Make work cards keyboard-operable (`tabindex="0"` + Enter/Space, or real `<button>`).
- [x] **Skip link** as the first element in `<body>`, hidden until focused.
- [x] `aria-hidden="true"` on `.section-divider` and on the duplicated marquee rows.
- [x] **Alt text:** describe the image ("West Esports tournament poster in neon blue"), not the category. Current alts like "Brand Identity Design", "Package Design", "Social Media Kit" are category labels.
- [x] **Replace emoji icons** (💡 📋 🎯) in the Process steps with inline SVGs using `currentColor` and `aria-hidden="true"`, matching the ✦ style.
- [x] Visible `:focus-visible` styles on every interactive element.
- [x] Check contrast (AA: 4.5:1 body, 3:1 large text), especially glass buttons and text over images.
- [x] Footer / social links need `aria-label`s (the contact-section ones already have them).

---

## SECTION E — SEO, sharing, privacy

The page head shows only title, description and viewport. Add:

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

- [x] Create `og-image.jpg` (1200×630) from existing brand assets, or `TODO(owner)` if no suitable asset exists.
- [x] Add JSON-LD `Person` (name, jobTitle, url, `sameAs`: Behance, LinkedIn, Facebook, `alumniOf` West Visayas State University). Do not include age.
- [x] Add `robots.txt` and `sitemap.xml`; add an `apple-touch-icon` if an asset exists.
- [x] Google Analytics (gtag) is loaded on every visit. Add a short privacy note in the footer; consent banner optional (owner's call).
- [x] The footer has only the copyright line now. Consider re-adding working social links: Behance `https://www.behance.net/meljosephtatud`, LinkedIn `https://www.linkedin.com/in/meljosephtatud/`, Facebook `https://www.facebook.com/OfficialMlcrtvs35/` (all with `target="_blank" rel="noopener noreferrer"`). Instagram: `TODO(owner)`.

---

## SECTION F — GSAP and mobile

**First read `script.js`** to see how `.fade-in` / `.fade-up` / `.delay-N` currently work. If GSAP is already used, extend it; do not duplicate. If it isn't, load it with `defer` before `script.js` and use:

```js
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.set(".fade-up", { y: 40, autoAlpha: 0 });
  gsap.set(".fade-in", { autoAlpha: 0 });
  ScrollTrigger.batch(".fade-up", {
    start: "top 85%", once: true,
    onEnter: els => gsap.to(els, { y: 0, autoAlpha: 1, duration: .8, ease: "power3.out", stagger: .12, overwrite: true })
  });
  ScrollTrigger.batch(".fade-in", {
    start: "top 90%", once: true,
    onEnter: els => gsap.to(els, { autoAlpha: 1, duration: .9, ease: "power2.out", stagger: .1 })
  });
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(".fade-up, .fade-in", { clearProps: "all", autoAlpha: 1 });
});

mm.add("(min-width: 769px)", () => { /* desktop-only effects */ });
mm.add("(max-width: 768px)", () => { /* vertical-only reveals, no horizontal movement */ });
```

- [x] Remove conflicting CSS `opacity: 0` / `transition-delay` rules so there is one source of truth. Add a `.no-js` fallback so content shows if JS fails.
- [x] `@media (prefers-reduced-motion: reduce){ .marquee-track{ animation: none; } }`
- [x] Mobile overflow guard: `html, body { overflow-x: clip; }`, use `100dvh` (with `100vh` fallback), and give `.orb`, `.hero-bg` and marquee containers `overflow: hidden; max-width: 100%`.
- **Acceptance:** at 360×800, 390×844 and 768×1024, `document.documentElement.scrollWidth === window.innerWidth` for every section.

---

## SECTION G — Code quality

- [x] Move remaining inline `style=""` attributes into CSS classes.
- [x] Merge or delete `overlay_snippet.html` / `overlay_styles.css` if they duplicate `index.html` / `styles.css`.
- [x] Remove unused root assets after grepping for references (`Desktop.png`, `Mobile.png`, `featured-project-*.png`, `faq-final.jpg`, `process-final.jpg`, `services-final.jpg`). Remove `package-lock.json` if there is no `package.json`.
- [x] Add `README.md` (project description, folder structure, how to add a project, how to deploy) and a `.gitignore`.
- [x] Put all colors, spacing and radii in a `:root` variable block. Guard every `querySelector` against `null`.

---

## Already fixed (do not touch)

- Dead footer links removed (footer is now just the copyright line, year 2026).
- Skill tags now list real skills instead of project names.
- "Martial Mayhem" removed from the experience list.
- Bio typos fixed; bio matches the intended UI/UX + multimedia positioning.
- CV link points to `Mel_Joseph_Tatud_CV.pdf`.
- Experience list updated (Creative Staff, Creative Director, NCAF Branding Committee).

---

## Verification checklist

- [x] Every `#anchor` resolves to an existing `id`.
- [x] No `href="#"` remains (convert JS-driven ones to `<button>`).
- [x] No 404s for images, fonts, CSS, JS or the CV PDF.
- [x] Every `<img>` has meaningful `alt`, dimensions, and lazy loading where appropriate.
- [x] No horizontal scroll at 360, 390, 768, 1024 and 1440 px.
- [x] Keyboard-only pass: skip link → nav → cards → overlay (open, Tab trap, Esc, focus return) → FAQ → contact.
- [x] `prefers-reduced-motion: reduce` disables movement and marquees.
- [x] Lighthouse (mobile) targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Record the scores.
- [x] Spell-check all copy; "I" voice is consistent (except the intentional "what we can create together" CTA).
- [x] No console errors.
- [x] Live URL reflects the changes after deploy (hard refresh).

---

## Final report template

```
## Summary
- Sections completed: ...
- Files changed: ...
- Deploy source confirmed as: ...

## Done
- A1 ...

## Skipped / already done (verify items)
- ... (reason)

## Needs owner input (TODO(owner))
- Correct dates for Student Content Creator role
- Confirm "Creative Director" title at Alima
- Real images for: Artlink App, T-shirt Design, Mel Creatives, Editorial Spread, Logo Redesign, Websites, Social Media, UI/UX Designs
- Editorial Spread date
- Booking link (Calendly/Cal.com) or approval to rename to "Get in Touch"
- Instagram URL
- Testimonials, case-study blurbs
- Confirm industries list and retainer pricing claim
- og-image.jpg asset

## Lighthouse (mobile)
Performance: __  Accessibility: __  Best Practices: __  SEO: __
```
