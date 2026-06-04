document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const fadeElements = document.querySelectorAll('.fade-up');
    const texts = ['Frontend Developer', 'Cybersecurity Enthusiast', 'AI & Data Science Student'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function updateNavbar() {
        if (window.scrollY > 24) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    function animateFadeIn() {
        fadeElements.forEach((element) => element.classList.add('visible'));
    }

    function typeRole() {
        if (!typingElement) return;

        const currentText = texts[textIndex];
        const currentLength = charIndex;
        const isComplete = !isDeleting && currentLength === currentText.length;
        const isCleared = isDeleting && currentLength === 0;

        if (isComplete) {
            isDeleting = true;
            setTimeout(typeRole, 1800);
            return;
        }

        if (isCleared) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        charIndex += isDeleting ? -1 : 1;
        typingElement.textContent = currentText.slice(0, charIndex);
        const delay = isDeleting ? 40 : 80;
        setTimeout(typeRole, delay);
    }

    function closeMenuOnLinkClick() {
        const navCollapse = document.querySelector('.navbar-collapse');
        if (!navCollapse) return;

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });
                    bsCollapse.hide();
                }
            });
        });
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                if (targetId.length > 1) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        event.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    function updateActiveLink() {
        let currentSection = 'home';
        document.querySelectorAll('section[id]').forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${currentSection}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    updateNavbar();
    animateFadeIn();
    typeRole();
    closeMenuOnLinkClick();
    setupSmoothScroll();
    updateActiveLink();

    window.addEventListener('scroll', () => {
        updateNavbar();
        updateActiveLink();
    }, { passive: true });
});
