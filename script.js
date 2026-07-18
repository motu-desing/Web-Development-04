/**
 * Level 2 - Task 2: Responsive Design
 * JavaScript for Hamburger Menu, Form Handling, and Interactive Features
 */

// ============================================
// DOM CONTENT LOADED
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Level 2 - Task 2 loaded successfully!');
    console.log('📌 Features: Responsive Design with Hamburger Menu');
    console.log('📧 Contact: venkysadhu.8@gmail.com');
    console.log('📱 Phone: +91 7816004107');
    
    // ============================================
    // HAMBURGER MENU TOGGLE
    // ============================================
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu on hamburger click
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('🍔 Hamburger menu toggled');
        });
    }
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                console.log('🔗 Menu closed after link click');
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = hamburger.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            console.log('🚪 Menu closed by clicking outside');
        }
    });
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide navbar
            // navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            // navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ============================================
    // ACTIVE LINK ON SCROLL (Scroll Spy)
    // ============================================
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                console.log(`📌 Scrolled to: ${targetId}`);
            }
        });
    });
    
    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const subject = document.getElementById('userSubject').value.trim() || 'No Subject';
            const message = document.getElementById('userMessage').value.trim();
            
            // Validate
            if (name === '' || email === '' || message === '') {
                showFormStatus('⚠️ Please fill in all required fields.', 'error');
                console.log('❌ Form validation failed: Missing fields');
                return;
            }
            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showFormStatus('⚠️ Please enter a valid email address.', 'error');
                console.log('❌ Form validation failed: Invalid email');
                return;
            }
            
            // Show sending status
            showFormStatus('📤 Sending your message...', 'sending');
            
            // Prepare email data
            const emailData = {
                to: 'venkysadhu.8@gmail.com',
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                phone: '+91 7816004107'
            };
            
            console.log('📧 Sending email with data:', emailData);
            
            // Send email using mailto: (fallback method)
            sendEmailViaMailTo(emailData);
        });
    }
    
    // ============================================
    // SEND EMAIL FUNCTION (MailTo Fallback)
    // ============================================
    
    function sendEmailViaMailTo(data) {
        const subject = encodeURIComponent(`[CodeLab] ${data.subject} - from ${data.from_name}`);
        const body = encodeURIComponent(
            `Hello VENKAT SADHU,\n\n` +
            `You have received a new message from your website.\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `📋 Message Details:\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `👤 Name: ${data.from_name}\n` +
            `📧 Email: ${data.from_email}\n` +
            `📱 Phone: ${data.phone}\n` +
            `📌 Subject: ${data.subject}\n\n` +
            `💬 Message:\n` +
            `${data.message}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `📅 Sent from: CodeLab Website\n` +
            `🕐 Date: ${new Date().toLocaleString()}\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Please reply to: ${data.from_email}`
        );
        
        // Open email client
        const mailtoLink = `mailto:venkysadhu.8@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        // Show success message
        showFormStatus('✅ Message opened in your email client! Please click send to complete.', 'success');
        console.log('📧 Email client opened with pre-filled message');
        
        // Clear form after a delay
        setTimeout(() => {
            if (contactForm) {
                document.getElementById('userName').value = '';
                document.getElementById('userEmail').value = '';
                document.getElementById('userSubject').value = '';
                document.getElementById('userMessage').value = '';
            }
        }, 3000);
    }
    
    // ============================================
    // FORM STATUS DISPLAY
    // ============================================
    
    function showFormStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'form-status';
        
        if (type === 'success') {
            formStatus.style.color = '#4ade80';
            formStatus.style.background = 'rgba(74, 222, 128, 0.1)';
            formStatus.style.padding = '12px 16px';
            formStatus.style.borderRadius = '10px';
            formStatus.style.border = '1px solid rgba(74, 222, 128, 0.2)';
            formStatus.style.marginTop = '15px';
        } else if (type === 'error') {
            formStatus.style.color = '#f87171';
            formStatus.style.background = 'rgba(248, 113, 113, 0.1)';
            formStatus.style.padding = '12px 16px';
            formStatus.style.borderRadius = '10px';
            formStatus.style.border = '1px solid rgba(248, 113, 113, 0.2)';
            formStatus.style.marginTop = '15px';
        } else if (type === 'sending') {
            formStatus.style.color = '#60a5fa';
            formStatus.style.background = 'rgba(96, 165, 250, 0.1)';
            formStatus.style.padding = '12px 16px';
            formStatus.style.borderRadius = '10px';
            formStatus.style.border = '1px solid rgba(96, 165, 250, 0.2)';
            formStatus.style.marginTop = '15px';
        }
        
        // Auto hide after 10 seconds
        clearTimeout(window.statusTimeout);
        window.statusTimeout = setTimeout(() => {
            if (formStatus) {
                formStatus.textContent = '';
                formStatus.style.padding = '0';
                formStatus.style.background = 'transparent';
                formStatus.style.border = 'none';
            }
        }, 10000);
    }
    
    // ============================================
    // FLOATING ANIMATION FOR CARDS
    // ============================================
    
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
    
    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.about-card, .service-card, .contact-info, .contact-form-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // Press 'H' for Home
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('🏠 Scrolled to Home');
            e.preventDefault();
        }
        
        // Press 'A' for About
        if (e.key === 'a' || e.key === 'A') {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            console.log('📖 Scrolled to About');
            e.preventDefault();
        }
        
        // Press 'S' for Services
        if (e.key === 's' || e.key === 'S') {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
            console.log('🛠️ Scrolled to Services');
            e.preventDefault();
        }
        
        // Press 'C' for Contact
        if (e.key === 'c' || e.key === 'C') {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            console.log('📧 Scrolled to Contact');
            e.preventDefault();
        }
        
        // Press 'M' to toggle menu
        if (e.key === 'm' || e.key === 'M') {
            if (hamburger) {
                hamburger.click();
                console.log('🍔 Menu toggled via keyboard');
            }
            e.preventDefault();
        }
        
        // Press 'Escape' to close menu
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                console.log('🚪 Menu closed via Escape key');
            }
        }
    });
    
    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    
    console.log('%c🚀 CodeLab - Level 2 Task 2', 'font-size: 20px; font-weight: bold; color: #00e5ff;');
    console.log('%c📌 Responsive Design with Hamburger Menu', 'font-size: 14px; color: #94a3b8;');
    console.log('%c📧 venkysadhu.8@gmail.com', 'font-size: 14px; color: #94a3b8;');
    console.log('%c📱 +91 7816004107', 'font-size: 14px; color: #94a3b8;');
    
    // ============================================
    // DEVICE DETECTION
    // ============================================
    
    function detectDevice() {
        const width = window.innerWidth;
        let device = '';
        
        if (width < 480) {
            device = 'Mobile (Small)';
        } else if (width < 768) {
            device = 'Mobile (Large)';
        } else if (width < 1024) {
            device = 'Tablet';
        } else if (width < 1200) {
            device = 'Laptop';
        } else {
            device = 'Desktop';
        }
        
        console.log(`📱 Device detected: ${device} (${width}px)`);
        return device;
    }
    
    // Detect on load
    detectDevice();
    
    // Detect on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            detectDevice();
        }, 500);
    });
    
    // ============================================
    // RESPONSIVE TESTING INFO
    // ============================================
    
    console.log('%c📋 Responsive Testing Info:', 'font-weight: bold; color: #00e5ff;');
    console.log('✅ Hamburger menu: Available on mobile');
    console.log('✅ Grid layout: 3-column → 2-column → 1-column');
    console.log('✅ Font scaling: Responsive typography');
    console.log('✅ Images: Auto-resizing');
    console.log('✅ Touch targets: Optimized for mobile');
    console.log('✅ Media queries: Multiple breakpoints');
    
    console.log('%c📐 Breakpoints:', 'font-weight: bold; color: #00e5ff;');
    console.log('   📱 480px - Mobile');
    console.log('   📱 768px - Tablet');
    console.log('   💻 1024px - Laptop');
    console.log('   🖥️ 1200px+ - Desktop');
    
    console.log('%c🎯 All features initialized successfully!', 'color: #4ade80; font-weight: bold;');
});

// ============================================
// WINDOW FUNCTIONS (for onclick in HTML)
// ============================================

// Scroll to top function
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('⬆️ Scrolled to top');
};

// Toggle menu function
window.toggleMenu = function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        console.log('🍔 Menu toggled');
    }
};

// Print device info
window.showDeviceInfo = function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const device = detectDevice();
    alert(`📱 Device: ${device}\n📐 Width: ${width}px\n📏 Height: ${height}px`);
    console.log('📱 Device info displayed');
};

// ============================================
// DETECT DEVICE FUNCTION (Global)
// ============================================

function detectDevice() {
    const width = window.innerWidth;
    let device = '';
    
    if (width < 480) {
        device = 'Mobile (Small)';
    } else if (width < 768) {
        device = 'Mobile (Large)';
    } else if (width < 1024) {
        device = 'Tablet';
    } else if (width < 1200) {
        device = 'Laptop';
    } else {
        device = 'Desktop';
    }
    
    return device;
}

// ============================================
// CONSOLE KEYBOARD SHORTCUTS GUIDE
// ============================================

console.log('%c⌨️ Keyboard Shortcuts:', 'font-weight: bold; color: #00e5ff;');
console.log('   H - Go to Home');
console.log('   A - Go to About');
console.log('   S - Go to Services');
console.log('   C - Go to Contact');
console.log('   M - Toggle Menu');
console.log('   ESC - Close Menu');