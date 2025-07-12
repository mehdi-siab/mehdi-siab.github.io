// Professional Portfolio JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.querySelector('.contact-form');
    const navbar = document.querySelector('.navbar');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const socialLinks = document.querySelectorAll('.social-link');

    // Mobile Navigation Toggle
    function toggleMobileMenu() {
        if (navToggle && navMenu) {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Smooth scrolling function
    function smoothScroll(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Highlight active navigation link
    function highlightActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Navbar background on scroll
    function handleNavbarScroll() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    // Create scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--color-primary);
            z-index: 1001;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
        return progressBar;
    }

    // Update scroll progress
    function updateScrollProgress(progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // Animation on scroll
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.skill-category, .project-card, .experience-item');
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animations
    function initAnimations() {
        const animateElements = document.querySelectorAll('.skill-category, .project-card, .experience-item');
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const bgColor = type === 'success' ? '#27ae60' : 
                       type === 'error' ? '#e74c3c' : '#3498db';
        
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" type="button">&times;</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-width: 400px;
            word-wrap: break-word;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Contact form handling
    function handleContactForm(event) {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();

        // Validate form
        const errors = [];
        
        if (!name) errors.push('Name is required');
        if (!email) errors.push('Email is required');
        if (!subject) errors.push('Subject is required');
        if (!message) errors.push('Message is required');

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
        }

        if (errors.length > 0) {
            showNotification(errors.join('. '), 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    }

    // Initialize scroll progress
    const scrollProgress = createScrollProgress();

    // Navigation link event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScroll(targetId);
                closeMobileMenu();
            }
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    // Hero buttons event listeners
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                smoothScroll(href);
            }
        });
    });

    // Social links - open in new tab
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('mailto:')) {
                // Allow default mailto behavior
                return;
            }
            // For other social links, open in new tab
            if (href) {
                window.open(href, '_blank');
            }
        });
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Scroll events with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            highlightActiveLink();
            handleNavbarScroll();
            updateScrollProgress(scrollProgress);
            animateOnScroll();
        }, 10);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Click outside to close mobile menu
    document.addEventListener('click', (e) => {
        if (navToggle && navMenu && 
            !navToggle.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Initialize
    initAnimations();
    highlightActiveLink();
    animateOnScroll();
    
    // Typing effect for hero subtitle
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                subtitle.textContent += text.charAt(i);
                i++;
                
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    }, 500);

    // Smooth reveal animation for hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 200);

    console.log('Portfolio website initialized successfully!');
});