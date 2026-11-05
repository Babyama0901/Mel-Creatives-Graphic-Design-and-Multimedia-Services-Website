# Mel Creatives — Graphic Design & Multimedia Services Website

Official portfolio website of **Mel Creatives** (Mel Joseph Tatud) — UI/UX Designer and Multimedia Artist specializing in brand identity, packaging design, interactive web experiences, and visual storytelling.

- **Live Production URL:** [https://melcreatives.vercel.app/](https://melcreatives.vercel.app/)
- **Repository:** [https://github.com/Babyama0901/Mel-Creatives-Graphic-Design-and-Multimedia-Services-Website](https://github.com/Babyama0901/Mel-Creatives-Graphic-Design-and-Multimedia-Services-Website)
- **Tech Stack:** Semantic HTML5, Vanilla CSS3 (Flexbox/CSS Grid/CSS Variables), Vanilla JavaScript (ES6+), GSAP (ScrollTrigger via CDN).

---

## Folder Structure

```
Mel-Creatives-Graphic-Design-and-Multimedia-Services-Website/
├── index.html                 # Main website document
├── styles.css                 # Global styling, themes, layout, animations
├── script.js                  # Interactions, accessible modal dialog, GSAP batch reveals
├── robots.txt                 # Search engine crawler instructions
├── sitemap.xml                # SEO sitemap
├── Mel_Joseph_Tatud_CV.pdf    # Downloadable Curriculum Vitae
├── Logo.png                   # Brand header logo
├── og-image.jpg               # Open Graph & Twitter social card image (1200x630)
├── Mel Creatives Favicon.svg  # SVG browser favicon
├── about-mel.jpg              # Profile visual in the About section
├── Projects/                  # High-resolution portfolio case study assets
│   ├── Alima Artists' Group - Brand Identity - Organization - 2024 - 2025.png
│   ├── Artlink App - Brand Identity - 2025.png
│   ├── Editorial Spread - Yearbook - 2025.png
│   ├── Logo Design.png
│   ├── Martial Mayhem - Social Media - Esports Team - 2024 - 2025.png
│   ├── Mel Creatives - Brand Identity - 2025.png
│   ├── T-shirt Designs - 2025.png
│   └── West Esports - Social Media - Organization - 2024 - 2025.png
└── Stock Images/              # Section illustration and feature thumbnails
    ├── Alima Artists' Group - Feature Project 3.png
    ├── Design Process.jpg
    ├── FAQs.jpg
    ├── Martian Mayhem - Feature Project 2.png
    ├── Services.jpg
    └── West Esports - Feature Project 1.png
```

---

## How to Add a Project

### 1. Adding a Featured Project
1. Place your thumbnail in `Stock Images/` and your full-resolution case study image in `Projects/`.
2. Open `index.html` and add an `<article class="work-item fade-up">` entry inside `.work-grid`:
   ```html
   <article class="work-item fade-up"
       data-title="Your Project Title"
       data-category="Branding & Identity"
       data-year="2026"
       data-description="Brief 1-2 sentence description of the project problem, role, and outcome."
       tabindex="0"
       role="button"
       aria-haspopup="dialog"
       aria-label="View case study for Your Project Title">
       <img src="Stock Images/your-project-thumb.png"
            class="work-thumb"
            alt="Descriptive alt text for the project"
            width="800"
            height="1000">
       <div class="work-overlay">
           <span class="btn-case">View Casestudy ↗</span>
       </div>
   </article>
   ```
3. In `script.js`, register the high-resolution file in `projectImageMap`:
   ```javascript
   "Your Project Title": "Projects/your-full-image.png",
   ```

### 2. Adding a Recent Project
Add an `<article class="project-card fade-up">` inside `.projects-grid` in `index.html`:
```html
<article class="project-card fade-up"
    data-title="Project Name"
    data-category="Package Design"
    data-year="2026"
    tabindex="0"
    role="button"
    aria-haspopup="dialog"
    aria-label="View project details for Project Name">
    <img src="Projects/your-image.png"
         class="project-image"
         alt="Descriptive alt text"
         width="800"
         height="600"
         loading="lazy"
         decoding="async">
    <div class="project-info">
        <h3 class="project-title">Project Name</h3>
        <div class="project-meta">
            <span class="project-category">Package Design</span>
            <span class="project-date">2026</span>
        </div>
    </div>
</article>
```

---

## Deployment

The website is a static HTML/CSS/JS site with zero build steps required.

- **Vercel (Production):** Connected to the GitHub repository default branch (`master`). Pushing to `master` automatically triggers an instant global deployment.
- **GitHub Pages:** Can be hosted directly from the `gh-pages` branch by selecting GitHub Pages root folder in repo Settings.
- **Local Development:** Run any static server (e.g., `npx serve`, VS Code Live Server, or Python `python -m http.server 8000`).

---

## Accessibility & Performance Features

- Fully keyboard-accessible navigation with skip link, focus trap, and focus restoration on modals.
- Native `<button>` based FAQ accordions with ARIA attributes (`aria-expanded`, `aria-controls`, `role="region"`).
- Zero layout shift with explicit `width`, `height`, and responsive CSS `aspect-ratio` rules.
- Respects `prefers-reduced-motion` to disable animations and pause marquee loops.
- Mobile viewport overflow guard preventing horizontal scrolling on screens down to 320px width.
