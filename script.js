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

    // Modal UI Logic
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
            }
        });
    });

    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // 배경 스크롤 복구
            }
        });
    });
});
