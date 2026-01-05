document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Animate hamburger to X (optional simple toggle)
            const bars = mobileToggle.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.transform = 'none';
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Anchor Links (polishing standard behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion Functionality
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                const icon = accItem.querySelector('.accordion-icon');
                if (icon) icon.textContent = '+';
            });

            // If clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.accordion-icon');
                if (icon) icon.textContent = '×';
            }
        });
    });

    // Recent Work Scroll Functionality
    const scrollArrow = document.querySelector('.scroll-arrow');
    const recentWorkSlider = document.querySelector('.recent-work-slider');

    if (scrollArrow && recentWorkSlider) {
        scrollArrow.addEventListener('click', () => {
            recentWorkSlider.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        });
    }

    // Project Overlay Functionality
    const overlay = document.getElementById('project-overlay');
    // const overlayImage = document.getElementById('overlay-image'); // Removed as we use dynamic slides now
    const overlayTitle = document.getElementById('overlay-title');
    const overlayCategory = document.getElementById('overlay-category');
    const overlayYear = document.getElementById('overlay-year');
    const overlayClose = document.getElementById('overlay-close');
    const overlayPrev = document.getElementById('overlay-prev');
    const overlayNext = document.getElementById('overlay-next');
    const currentIndexSpan = document.getElementById('current-index');
    const totalProjectsSpan = document.getElementById('total-projects');
    const headerCounter = document.getElementById('header-counter');

    let projects = [];
    let currentProjectIndex = 0;

    // Collect all project items (Featured + Recent)
    const projectImageMap = {
        "West Esports": "Projects/West Esports - Social Media - Organization - 2024 - 2025.png",
        "Martian Mayhem": "Projects/Martial Mayhem - Social Media - Esports Team - 2024 - 2025.png",
        "Alima Artists' Group": "Projects/Alima Artists' Group - Brand Identity - Organization - 2024 - 2025.png",
        "Artlink App": "Projects/Artlink App - Brand Identity - 2025.png",
        "T-shirt Design": "Projects/T-shirt Designs - 2025.png",
        "Mel Creatives": "Projects/Mel Creatives - Brand Identity - 2025.png",
        "Editorial Spread": "Projects/Editorial Spread - Yearbook - 2025.png",
        "Logo Redesign": "Projects/Logo Design.png"
    };

    // Featured
    document.querySelectorAll('.work-item').forEach(item => {
        const title = item.getAttribute('data-title') || item.querySelector('img').alt;
        const category = item.getAttribute('data-category') || 'Featured Project';
        const year = item.getAttribute('data-year') || '2024';

        // Use high-res image if available in map, otherwise fallback to thumbnail
        const image = projectImageMap[title] || item.querySelector('img').src;

        projects.push({ title, category, year, image });

        const currentIndex = projects.length - 1;
        item.addEventListener('click', () => openOverlay(currentIndex));
    });

    // Recent
    document.querySelectorAll('.project-card').forEach(item => {
        const title = item.querySelector('.project-title')?.innerText || 'Project';
        const category = item.querySelector('.project-category')?.innerText || 'Design';
        const dateText = item.querySelector('.project-date')?.innerText || '2024';
        const year = dateText.split(' ').pop();

        // Use high-res image if available in map, otherwise fallback to thumbnail
        const image = projectImageMap[title] || item.querySelector('img').src;

        projects.push({ title, category, year, image });

        const currentIndex = projects.length - 1;
        item.addEventListener('click', () => openOverlay(currentIndex));
    });

    if (totalProjectsSpan) totalProjectsSpan.textContent = projects.length;

    function openOverlay(index) {
        if (index < 0 || index >= projects.length) return;

        currentProjectIndex = index;
        const project = projects[index];

        overlayTitle.textContent = project.title;
        overlayCategory.textContent = project.category;
        overlayYear.textContent = project.year;

        // Populate slides (Single Image or Library)
        const container = document.querySelector('.overlay-content-container');
        container.innerHTML = ''; // Clear previous

        if (project.title === 'Websites') {
            // Render Website Library Grid
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
                        <img src="${site.image}" alt="${site.title}">
                    </div>
                    <div class="library-info">
                        <h3>${site.title}</h3>
                        <a href="${site.link}" class="library-link">View Website ↗</a>
                    </div>
                `;
                libraryGrid.appendChild(item);
            });

            container.appendChild(libraryGrid);
        } else {
            // Standard Single Image Render
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = `${project.title}`;
            img.classList.add('overlay-slide');

            const wrapper = document.createElement('div');
            // Custom dimensions requested: 1400px width (generalized)
            wrapper.style.width = '100%';
            wrapper.style.maxWidth = '1400px';
            wrapper.style.margin = '0 auto'; // Center it
            // Removed fixed aspect ratio to allow variable height images

            // Strict image styling to ensure it fills the container exactly without duplicate/crop/distortion
            img.style.width = '100%';
            img.style.height = 'auto'; // Allow natural height
            img.style.objectFit = 'contain';
            img.style.display = 'block';
            img.style.maxHeight = 'none'; // Override general max-heights

            wrapper.appendChild(img);
            container.appendChild(wrapper);
        }

        currentIndexSpan.textContent = currentProjectIndex + 1;
        if (headerCounter) headerCounter.textContent = `${currentProjectIndex + 1} / ${projects.length}`;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
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

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;

        if (e.key === 'Escape') closeOverlay();
        if (e.key === 'ArrowRight') showNextProject();
        if (e.key === 'ArrowLeft') showPrevProject();
    });

    // Close on clicking outside image
    const overlayGlass = document.querySelector('.project-overlay-glass');
    if (overlayGlass) overlayGlass.addEventListener('click', closeOverlay);

    // Content Protection
    const copyrightDialog = document.getElementById('copyright-dialog');
    const copyrightOkBtn = document.getElementById('copyright-ok-btn');

    function showCopyrightDialog() {
        if (copyrightDialog) {
            copyrightDialog.classList.add('active');
        } else {
            alert('Images are protected. Please respect the artist\'s copyright.');
        }
    }

    function closeCopyrightDialog() {
        if (copyrightDialog) {
            copyrightDialog.classList.remove('active');
        }
    }

    if (copyrightOkBtn) {
        copyrightOkBtn.addEventListener('click', closeCopyrightDialog);
    }

    // Close on click outside (optional, enhances UX)
    if (copyrightDialog) {
        copyrightDialog.addEventListener('click', (e) => {
            if (e.target === copyrightDialog) {
                closeCopyrightDialog();
            }
        });
    }

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showCopyrightDialog();
        return false;
    });

    // Additional PrintScreen deterrent
    document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            try {
                navigator.clipboard.writeText(''); // Attempt to clear clipboard
            } catch (err) {
                // Clipboard write failed
            }
            showCopyrightDialog();
        }
    });

    document.addEventListener('keydown', (e) => {
        // Prevent F12, Ctrl+S, Ctrl+U, Ctrl+Shift+I, Ctrl+P
        if (
            e.key === 'F12' ||
            e.key === 'PrintScreen' ||
            ((e.ctrlKey || e.metaKey) && (
                e.key === 's' ||
                e.key === 'u' ||
                e.key === 'p' ||
                (e.shiftKey && e.key === 'I')
            ))
        ) {
            e.preventDefault();
            return false;
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.nodeName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
});
