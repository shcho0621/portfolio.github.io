document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navHeight;

                // 스크롤 이동
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 히어로 섹션이 아닌 경우에만 붕 뜨는 애니메이션 강제 재현
                if (targetId !== '#hero') {
                    const animatedElements = targetElement.querySelectorAll('.fade-up');
                    animatedElements.forEach(el => el.classList.remove('visible'));
                    
                    // 스크롤이 도착할 즈음(300ms 후) 강제로 visible을 다시 부여해 무조건 애니메이션이 재생되게 함
                    setTimeout(() => {
                        animatedElements.forEach(el => el.classList.add('visible'));
                    }, 300);
                }
            }
        });
    });

    // 3. Intersection Observer for Fade-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 4. Auto-sort gallery items in Category pages
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
        
        // Sort items using localeCompare for Korean string alphabetical sorting (가나다 순)
        items.sort((a, b) => {
            const titleA = a.querySelector('.gallery-item-title').textContent.trim();
            const titleB = b.querySelector('.gallery-item-title').textContent.trim();
            return titleA.localeCompare(titleB, 'ko');
        });
        
        // Empty the grid and append sorted items
        galleryGrid.innerHTML = '';
        items.forEach(item => {
            galleryGrid.appendChild(item);
        });
    }
});
