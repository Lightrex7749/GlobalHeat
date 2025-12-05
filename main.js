// Initialize AOS animations
AOS.init({
    duration: 1000,
    once: true
});

// ==================== DARK MODE FUNCTIONALITY ====================
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const themeIcon = themeToggle?.querySelector('i');

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Toggle theme
themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    // Update icon
    if (themeIcon) {
        if (isDark) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==================== MOBILE MENU FUNCTIONALITY ====================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

mobileMenuToggle?.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu?.classList.remove('active');
            mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('nav') && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        }
    }
});

// ==================== SMOOTH SCROLLING ====================
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

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 500);
    }
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(45deg, #1a2a6c, #2c5364);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ==================== FEEDBACK FORM (if exists) ====================
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const popup = document.getElementById('thankYouPopup');
        if (popup) {
            popup.style.display = 'block';
        }
        this.reset();
        setTimeout(() => {
            if (popup) {
                popup.style.display = 'none';
            }
        }, 3000);
    });
}

// ==================== ACCESSIBILITY: KEYBOARD NAVIGATION ====================
// Trap focus in mobile menu when open
const focusableElements = 'a[href], button:not([disabled]), textarea, input, select';

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        mobileMenuToggle?.focus();
    }
});

// ==================== PERFORMANCE: DEBOUNCE RESIZE ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        }
    }, 250);
});

// ==================== CHART ANIMATIONS OPTIMIZATION ====================
// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion && typeof Chart !== 'undefined') {
    Chart.defaults.animation.duration = 0;
}

// ==================== SOCIAL SHARE FUNCTIONS ====================
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out GlobalHeat - Learn about climate change and how we can make a difference! 🌍');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=550,height=420');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=550,height=420');
}

function shareViaEmail() {
    const subject = encodeURIComponent('GlobalHeat - Climate Change Awareness');
    const body = encodeURIComponent(`I found this great resource about climate change and global warming:\n\n${window.location.href}\n\nCheck it out!`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// Web Share API (for mobile devices that support it)
const shareBtn = document.querySelector('.share-btn');
if (navigator.share && shareBtn) {
    shareBtn.addEventListener('click', async () => {
        try {
            await navigator.share({
                title: 'GlobalHeat - Climate Change Awareness',
                text: 'Learn about climate change and how we can make a difference!',
                url: window.location.href
            });
        } catch (err) {
            // Fallback to showing options if sharing fails or is cancelled
            console.log('Share cancelled or failed');
        }
    });
}

console.log('✅ GlobalHeat initialized successfully');
