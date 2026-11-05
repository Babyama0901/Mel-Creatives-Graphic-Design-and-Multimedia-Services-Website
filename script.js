/**
 * Mel Creatives — Graphic Design & Multimedia Portfolio
 * Author: Mel Joseph Tatud
 */
(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Remove .no-js class if present
        document.documentElement.classList.remove('no-js');

        // Dynamic Copyright Year
        const currentYearEl = document.getElementById('current-year');
        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear();
        }

        /* ==========================================================================
           1. Mobile Navigation Menu
           ========================================================================== */
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        function closeMobileMenu() {
            if (!navMenu || !mobileToggle) return;
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            const bars = mobileToggle.querySelectorAll('.bar');
            if (bars && bars.length >= 2) {
                bars[0].style.transform = 'none';
                bars[1].style.transform = 'none';
            }
        }

        function toggleMobileMenu() {
            if (!navMenu || !mobileToggle) return;
            const isOpen = navMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            const bars = mobileToggle.querySelectorAll('.bar');
            if (bars && bars.length >= 2) {
                if (isOpen) {
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                    bars[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.transform = 'none';
                }
            }
        }

        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
        }

        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close mobile nav on Escape or outside click
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
                if (mobileToggle) mobileToggle.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });

        /* ==========================================================================
           2. Scroll Animations (GSAP with matchMedia + Fallback)
           ========================================================================== */
        if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
            window.gsap.registerPlugin(window.ScrollTrigger);
            const mm = window.gsap.matchMedia();

            // Motion allowed
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                window.gsap.set('.fade-up', { y: 35, autoAlpha: 0 });
                window.gsap.set('.fade-in', { autoAlpha: 0 });

                window.ScrollTrigger.batch('.fade-up', {
                    start: 'top 85%',
                    once: true,
                    onEnter: els => window.gsap.to(els, {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        stagger: 0.12,
                        overwrite: true
                    })
                });

                window.ScrollTrigger.batch('.fade-in', {
                    start: 'top 90%',
                    once: true,
                    onEnter: els => window.gsap.to(els, {
                        autoAlpha: 1,
                        duration: 0.9,
                        ease: 'power2.out',
                        stagger: 0.1,
                        overwrite: true
                    })
                });
            });

            // Reduced motion
            mm.add('(prefers-reduced-motion: reduce)', () => {
                window.gsap.set('.fade-up, .fade-in', { clearProps: 'all', autoAlpha: 1 });
            });

            window.addEventListener('load', () => window.ScrollTrigger.refresh());
            if (document.fonts) {
                document.fonts.ready.then(() => window.ScrollTrigger.refresh());
            }
        } else {
            // IntersectionObserver Fallback
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in, .fade-up').forEach(el => observer.observe(el));
        }

        /* ==========================================================================
           3. Smooth Scroll for Anchor Links (with scroll-margin-top offset)
           ========================================================================== */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    if (target.tabIndex < 0 && target !== document.body) {
                        target.setAttribute('tabindex', '-1');
                    }
                    target.focus({ preventScroll: true });
                }
            });
        });

        /* ==========================================================================
           4. Accessible FAQ Accordion
           ========================================================================== */
        const accordionItems = document.querySelectorAll('.accordion-item');

        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (!header) return;

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all accordion items
                accordionItems.forEach(accItem => {
                    accItem.classList.remove('active');
                    const btn = accItem.querySelector('.accordion-header');
                    const icon = accItem.querySelector('.accordion-icon');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                    if (icon) icon.textContent = '+';
                });

                // Toggle selected
                if (!isActive) {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                    const icon = item.querySelector('.accordion-icon');
                    if (icon) icon.textContent = '×';
                }
            });
        });

        /* ==========================================================================
           5. Project Overlay Dialog (Modal)
           ========================================================================== */
        const overlay = document.getElementById('project-overlay');
        const overlayTitle = document.getElementById('overlay-title');
        const overlayCategory = document.getElementById('overlay-category');
        const overlayYear = document.getElementById('overlay-year');
        const overlayClose = document.getElementById('overlay-close');
        const overlayPrev = document.getElementById('overlay-prev');
        const overlayNext = document.getElementById('overlay-next');
        const currentIndexSpan = document.getElementById('current-index');
        const totalProjectsSpan = document.getElementById('total-projects');
        const headerCounter = document.getElementById('header-counter');
        const overlayContainer = document.querySelector('.overlay-content-container');

        let projects = [];
        let currentProjectIndex = 0;
        let lastFocusedElement = null;

        const projectImageMap = {
            "West Esports": "Stock Images/west-esports.jpg",
            "Martian Mayhem": "Stock Images/martian-mayhem.jpg",
            "Alima Artists' Group": "Stock Images/alima-artists-group.jpg",
            "Artlink App": "Projects/artlink-app.jpg",
            "T-shirt Design": "Projects/tshirt-designs.jpg",
            "Mel Creatives": "Projects/mel-creatives.jpg",
            "Editorial Spread": "Projects/editorial-spread.jpg",
            "Logo Redesign": "Projects/logo-design.jpg"
        };

        // Collect Featured projects
        document.querySelectorAll('.work-item').forEach(item => {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title') || (img ? img.alt : 'Project');
            const category = item.getAttribute('data-category') || 'Featured Project';
            const year = item.getAttribute('data-year') || '2025';
            const description = item.getAttribute('data-description') || '';
            const image = projectImageMap[title] || (img ? img.src : '');

            projects.push({ title, category, year, description, image, triggerEl: item });

            const idx = projects.length - 1;
            item.addEventListener('click', () => openOverlay(idx));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openOverlay(idx);
                }
            });
        });

        // Collect Recent projects (excluding placeholders)
        document.querySelectorAll('.project-card:not([data-placeholder="true"])').forEach(item => {
            const title = item.getAttribute('data-title') || item.querySelector('.project-title')?.innerText || 'Project';
            const category = item.getAttribute('data-category') || item.querySelector('.project-category')?.innerText || 'Design';
            const year = item.getAttribute('data-year') || item.querySelector('.project-date')?.innerText || '2025';
            const img = item.querySelector('img');
            const image = projectImageMap[title] || (img ? img.src : '');

            projects.push({ title, category, year, description: '', image, triggerEl: item });

            const idx = projects.length - 1;
            item.addEventListener('click', () => openOverlay(idx));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openOverlay(idx);
                }
            });
        });

        // Initialize counters
        if (totalProjectsSpan) totalProjectsSpan.textContent = projects.length;
        if (headerCounter) headerCounter.textContent = `1 / ${projects.length}`;

        function openOverlay(index) {
            if (!overlay || index < 0 || index >= projects.length) return;

            lastFocusedElement = document.activeElement;
            currentProjectIndex = index;
            const project = projects[index];

            if (overlayTitle) overlayTitle.textContent = project.title;
            if (overlayCategory) overlayCategory.textContent = project.category;
            if (overlayYear) overlayYear.textContent = project.year;

            if (overlayContainer) {
                overlayContainer.innerHTML = '';

                if (project.title === 'Websites') {
                    const libraryGrid = document.createElement('div');
                    libraryGrid.className = 'library-grid';

                    const websites = [
                        {
                            title: 'Pag-Ambit Interactive Web Comic Book',
                            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=jpg&q=60&w=800',
                            link: 'https://babyama0901.github.io/Pag-Ambit-Interactive-Web-Comic-Book/'
                        },
                        {
                            title: 'Team Lykaions Digital Portfolio',
                            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?fm=jpg&q=60&w=800',
                            link: 'https://babyama0901.github.io/Team-Lykaions---Digital-Portfolio-2025---BSEMC-4A/'
                        }
                    ];

                    websites.forEach(site => {
                        const item = document.createElement('div');
                        item.className = 'library-item';
                        item.innerHTML = `
                            <div class="library-preview">
                                <img src="${site.image}" alt="${site.title}" width="400" height="225" loading="lazy">
                            </div>
                            <div class="library-info">
                                <h3>${site.title}</h3>
                                <a href="${site.link}" class="library-link" target="_blank" rel="noopener noreferrer">View Website ↗</a>
                            </div>
                        `;
                        libraryGrid.appendChild(item);
                    });

                    overlayContainer.appendChild(libraryGrid);
                } else if (project.title === 'UI/UX Designs') {
                    const libraryGrid = document.createElement('div');
                    libraryGrid.className = 'library-grid';

                    const uiuxDesigns = [
                        {
                            title: 'Hardpoint App',
                            year: '2024',
                            tags: 'Mobile Application',
                            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?fm=jpg&q=60&w=800',
                            link: 'https://www.figma.com/design/BWyl7jjKEvgWmSIcKNxrWM/EMC-204---Hardpoint-App---Tatud---Garcia?m=auto&t=QrjUIZikJ1oWFETj-6'
                        },
                        {
                            title: 'Traffic Management Section',
                            year: '2024',
                            tags: 'Website Portfolio',
                            image: 'https://images.unsplash.com/photo-1507238692062-5a042e9e18b4?fm=jpg&q=60&w=800',
                            link: 'https://www.figma.com/design/kRNfOmbywp8w67q1ux997u/TRAFFIC-MANAGEMENT-SECTION?node-id=1-2&t=Co9cJQGwpzxVTvyD-1'
                        },
                        {
                            title: 'Mel Creatives',
                            year: '2025',
                            tags: 'Website Portfolio',
                            image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?fm=jpg&q=60&w=800',
                            link: 'https://www.figma.com/site/0H35jaLN0YuwsnYk9RoXVb/Mel-Creatives?node-id=0-1&t=3MIPr3MYnQvurHQx-1'
                        }
                    ];

                    uiuxDesigns.forEach(design => {
                        const item = document.createElement('div');
                        item.className = 'library-item';
                        item.innerHTML = `
                            <div class="library-preview">
                                <img src="${design.image}" alt="${design.title}" width="400" height="225" loading="lazy">
                            </div>
                            <div class="library-info">
                                <h3>${design.title}</h3>
                                <p class="library-meta">${design.year} • ${design.tags}</p>
                                <a href="${design.link}" class="library-link" target="_blank" rel="noopener noreferrer">View Figma Project ↗</a>
                            </div>
                        `;
                        libraryGrid.appendChild(item);
                    });

                    overlayContainer.appendChild(libraryGrid);
                } else {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'overlay-image-wrapper';

                    if (project.description) {
                        const desc = document.createElement('p');
                        desc.className = 'overlay-description';
                        desc.textContent = project.description;
                        wrapper.appendChild(desc);
                    }

                    const img = document.createElement('img');
                    img.src = project.image;
                    img.alt = `${project.title} detailed preview`;
                    img.className = 'overlay-slide';

                    wrapper.appendChild(img);
                    overlayContainer.appendChild(wrapper);
                }
            }

            if (currentIndexSpan) currentIndexSpan.textContent = currentProjectIndex + 1;
            if (headerCounter) headerCounter.textContent = `${currentProjectIndex + 1} / ${projects.length}`;

            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Focus close button for accessibility
            if (overlayClose) {
                setTimeout(() => overlayClose.focus(), 50);
            }
        }

        function closeOverlay() {
            if (!overlay) return;
            overlay.classList.remove('active');
            document.body.style.overflow = '';

            // Return focus to triggering element
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }

        function showNextProject() {
            let nextIndex = currentProjectIndex + 1;
            if (nextIndex >= projects.length) nextIndex = 0;
            openOverlay(nextIndex);
        }

        function showPrevProject() {
            let prevIndex = currentProjectIndex - 1;
            if (prevIndex < 0) prevIndex = projects.length - 1;
            openOverlay(prevIndex);
        }

        if (overlayClose) overlayClose.addEventListener('click', closeOverlay);
        if (overlayNext) overlayNext.addEventListener('click', showNextProject);
        if (overlayPrev) overlayPrev.addEventListener('click', showPrevProject);

        // Overlay keyboard trapping and navigation
        document.addEventListener('keydown', (e) => {
            if (!overlay || !overlay.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeOverlay();
            } else if (e.key === 'ArrowRight') {
                showNextProject();
            } else if (e.key === 'ArrowLeft') {
                showPrevProject();
            } else if (e.key === 'Tab') {
                // Focus trap inside active overlay dialog
                const focusable = overlay.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusable || focusable.length === 0) return;

                const firstEl = focusable[0];
                const lastEl = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                } else if (!e.shiftKey && document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        });

        // Close on clicking overlay background glass
        const overlayGlass = document.querySelector('.project-overlay-glass');
        if (overlayGlass) {
            overlayGlass.addEventListener('click', closeOverlay);
        }
    });
})();
