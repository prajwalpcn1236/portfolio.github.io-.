// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoader();
    initNavigation();
    initCustomCursor();
    initParticles();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initStatsCounter();
    initSmoothScrolling();
    
    console.log('Portfolio loaded successfully! 🚀');
});

// Loading Screen
function initLoader() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Text Animation
const typingTextElement = document.getElementById('typing-text');
const cursorBlinkElement = document.getElementById('cursor-blink');
const words = ["Prajwal", "a Developer", "a Designer"];
let wordIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < words[wordIndex].length) {
        typingTextElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // Typing speed
    } else {
        setTimeout(erase, 1500); // Wait before erasing
    }
}

function erase() {
    if (charIndex > 0) {
        typingTextElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50); // Erasing speed
    } else {
        wordIndex++;
        if (wordIndex >= words.length) wordIndex = 0;
        setTimeout(type, 500); // Wait before typing next word
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingTextElement && cursorBlinkElement) {
        type();
    }
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Particle System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 3 + 3;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle);
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const cursorBlink = document.getElementById('cursor-blink');
    
    if (!typingText || !cursorBlink) return;
    
    const text = 'Prajwal';
    let currentText = '';
    let isDeleting = false;
    let typeSpeed = 150;
    
    function type() {
        if (!isDeleting && currentText.length < text.length) {
            currentText += text.charAt(currentText.length);
            typingText.textContent = currentText;
        } else if (isDeleting && currentText.length > 0) {
            currentText = currentText.slice(0, -1);
            typingText.textContent = currentText;
        }
        
        if (currentText.length === text.length && !isDeleting) {
            setTimeout(() => {
                cursorBlink.style.animation = 'none';
                setTimeout(() => {
                    cursorBlink.style.animation = 'blink 1s infinite';
                }, 2000);
            }, 1000);
            return;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .alignment-item, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Section title animations
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('scale-in');
        observer.observe(title);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const skillProgress = skillItem.querySelector('.skill-progress');
                const skillPercentage = skillItem.getAttribute('data-skill');
                
                setTimeout(() => {
                    skillProgress.style.width = skillPercentage + '%';
                }, 300);
                
                skillObserver.unobserve(skillItem);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                
                animateNumber(statNumber, target);
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16); // ~60fps
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const formData = new FormData(contactForm);
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with your actual endpoint)
            await simulateFormSubmission(formData);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

async function simulateFormSubmission(formData) {
    // Simulate API call delay
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 350px;
                border-left: 4px solid var(--primary-color);
            }
            
            .notification-success {
                border-left-color: var(--success-color);
            }
            
            .notification-error {
                border-left-color: var(--error-color);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification-message {
                color: var(--text-primary);
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-muted);
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events efficiently
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'https://via.placeholder.com/400x250/667eea/ffffff?text=E-Commerce+Platform',
        'https://via.placeholder.com/400x250/764ba2/ffffff?text=Task+Manager',
        'https://via.placeholder.com/400x250/667eea/ffffff?text=Weather+App'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadCriticalResources();

// Create the Amazon Research page
document.addEventListener('DOMContentLoaded', function() {
    // Create the amazon research page if it doesn't exist
    if (!document.querySelector('script[data-amazon-page]')) {
        createAmazonPage();
    }
});

function createAmazonPage() {
    const amazonPage = document.createElement('script');
    amazonPage.setAttribute('data-amazon-page', 'true');
    amazonPage.textContent = `
        // Create Amazon Research page
        const amazonHTML = \`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Amazon Search Algorithm - Prajwal's Research</title>
            <!-- Google Fonts -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet">
            <style>
                :root {
                    --primary-color: #ff9900;
                    --secondary-color: #146eb4;
                    --text-primary: #232f3e;
                    --text-secondary: #4a5568;
                    --text-muted: #718096;
                    --bg-primary: #ffffff;
                    --bg-secondary: #f7fafc;
                    --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
                    --font-heading: 'Space Grotesk', system-ui, -apple-system, sans-serif;
                    --font-mono: 'Fira Code', 'SF Mono', Monaco, monospace;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                html {
                    scroll-behavior: smooth;
                }
                
                body {
                    font-family: var(--font-primary);
                    line-height: 1.6;
                    color: var(--text-primary);
                    background-color: var(--bg-secondary);
                }
                
                header {
                    background: var(--text-primary);
                    color: white;
                    padding: 2rem 0;
                    text-align: center;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                .header-content h1 {
                    font-family: var(--font-heading);
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 0.5rem;
                }
                
                .header-content p {
                    color: #ccc;
                    font-size: 1.2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    color: var(--primary-color);
                    text-decoration: none;
                    font-weight: 500;
                    gap: 0.5rem;
                    margin-top: 2rem;
                    transition: all 0.3s ease;
                }
                
                .back-link:hover {
                    color: white;
                }
                
                main {
                    padding: 4rem 0;
                }
                
                .research-section {
                    margin-bottom: 4rem;
                }
                
                h2 {
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                    color: var(--text-primary);
                }
                
                p {
                    margin-bottom: 1.5rem;
                    color: var(--text-secondary);
                }
                
                .amazon-architecture {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    margin: 2rem 0;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                
                .architecture-diagram {
                    width: 100%;
                    height: 400px;
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    margin: 2rem 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #888;
                    position: relative;
                    overflow: hidden;
                }
                
                .architecture-layer {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    width: 80%;
                    text-align: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }
                
                .layer-1 {
                    top: 20px;
                    border-left: 4px solid var(--primary-color);
                }
                
                .layer-2 {
                    top: 100px;
                    border-left: 4px solid var(--secondary-color);
                }
                
                .layer-3 {
                    top: 180px;
                    border-left: 4px solid #9553e9;
                }
                
                .layer-4 {
                    top: 260px;
                    border-left: 4px solid #41c7c7;
                }
                
                .layer-5 {
                    top: 340px;
                    border-left: 4px solid #28a745;
                }
                
                .architecture-layer:hover {
                    transform: translateX(-50%) scale(1.05);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                
                .architecture-diagram::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 2px;
                    height: 80%;
                    background: #ddd;
                    transform: translate(-50%, -50%);
                    z-index: -1;
                }
                
                .architecture-diagram::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: #ddd;
                    transform: translateY(-50%);
                    z-index: -1;
                }
                
                .performance-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin: 2rem 0;
                }
                
                .performance-card {
                    background: white;
                    border-radius: 8px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                    border-top: 3px solid var(--primary-color);
                }
                
                .performance-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                
                .performance-card h3 {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }
                
                .performance-card p {
                    color: var(--text-muted);
                    margin-bottom: 0;
                }
                
                .performance-card:nth-child(2) {
                    border-color: var(--secondary-color);
                }
                
                .performance-card:nth-child(3) {
                    border-color: #9553e9;
                }
                
                .code-block {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin: 1.5rem 0;
                    overflow-x: auto;
                    font-family: var(--font-mono);
                    font-size: 0.9rem;
                    line-height: 1.5;
                }
                
                .comment {
                    color: #6a9955;
                }
                
                .keyword {
                    color: #569cd6;
                }
                
                .string {
                    color: #ce9178;
                }
                
                .function {
                    color: #dcdcaa;
                }
                
                .footer {
                    background: var(--text-primary);
                    color: white;
                    padding: 2rem 0;
                    text-align: center;
                }
                
                @media (max-width: 768px) {
                    .architecture-layer {
                        width: 90%;
                    }
                    
                    .performance-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>
        <body>
            <header>
                <div class="container">
                    <div class="header-content">
                        <h1>Amazon Search Algorithm Research</h1>
                        <p>A deep dive into how Amazon's search retrieval system works</p>
                        <a href="index.html" class="back-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to Portfolio
                        </a>
                    </div>
                </div>
            </header>
            
            <main>
                <div class="container">
                    <section class="research-section">
                        <h2>Introduction to Amazon's Search System</h2>
                        <p>
                            Amazon processes billions of search queries daily, returning results in milliseconds. 
                            This incredible feat is achieved through a sophisticated combination of algorithms, 
                            distributed systems, and data optimization techniques.
                        </p>
                        <p>
                            The search system must balance multiple factors: relevance, personalization, inventory, 
                            conversion probability, and business objectives - all while maintaining blazing fast response times.
                        </p>
                    </section>
                    
                    <section class="research-section">
                        <h2>System Architecture</h2>
                        <div class="amazon-architecture">
                            <p>
                                Amazon's search architecture follows a multi-tiered distributed system that enables 
                                parallel processing, fault tolerance, and incredible scalability. The high-level 
                                architecture can be visualized as follows:
                            </p>
                            <div class="architecture-diagram">
                                <div class="architecture-layer layer-1">
                                    <strong>User Interface Layer</strong>: Query handling and results presentation
                                </div>
                                <div class="architecture-layer layer-2">
                                    <strong>Query Processing Layer</strong>: Query understanding, spelling correction, tokenization
                                </div>
                                <div class="architecture-layer layer-3">
                                    <strong>Retrieval Layer</strong>: Inverted indices, retrieval algorithms, filtering
                                </div>
                                <div class="architecture-layer layer-4">
                                    <strong>Ranking Layer</strong>: ML-based ranking models, personalization, business rules
                                </div>
                                <div class="architecture-layer layer-5">
                                    <strong>Data Layer</strong>: Distributed storage, caching, replication, sharding
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section class="research-section">
                        <h2>Retrieval Algorithms: Lightning-Fast Search</h2>
                        <p>
                            Amazon employs several key techniques to achieve sub-100ms search response times:
                        </p>
                        <div class="performance-grid">
                            <div class="performance-card">
                                <h3>Inverted Indices</h3>
                                <p>
                                    The core data structure that maps terms to product IDs, enabling rapid lookup.
                                    These are highly optimized, compressed, and distributed across many machines.
                                </p>
                            </div>
                            <div class="performance-card">
                                <h3>Distributed Search</h3>
                                <p>
                                    Search indices are sharded (partitioned) and replicated across clusters of machines,
                                    allowing parallel query processing and fault tolerance.
                                </p>
                            </div>
                            <div class="performance-card">
                                <h3>Multi-level Caching</h3>
                                <p>
                                    Popular queries are cached at multiple levels, from application servers to CDN edge locations,
                                    drastically reducing latency for common searches.
                                </p>
                            </div>
                        </div>
                        
                        <h3>Key Algorithms</h3>
                        <p>
                            Some of the core algorithms powering Amazon's search include:
                        </p>
                        
                        <div class="code-block">
                            <span class="comment">// Simplified pseudo-code for Amazon's search retrieval</span><br>
                            <span class="keyword">function</span> <span class="function">amazonSearch</span>(query, userContext) {<br>
                            &nbsp;&nbsp;<span class="comment">// 1. Query understanding</span><br>
                            &nbsp;&nbsp;<span class="keyword">const</span> processedQuery = <span class="function">processQuery</span>(query);<br>
                            &nbsp;&nbsp;<span class="keyword">const</span> correctedQuery = <span class="function">spellCorrect</span>(processedQuery);<br>
                            &nbsp;&nbsp;<span class="keyword">const</span> tokens = <span class="function">tokenize</span>(correctedQuery);<br>
                            <br>
                            &nbsp;&nbsp;<span class="comment">// 2. Retrieve candidates using inverted index</span><br>
                            &nbsp;&nbsp;<span class="keyword">const</span> candidateProducts = <span class="function">retrieveCandidates</span>(tokens);<br>
                            <br>
                            &nbsp;&nbsp;<span class="comment">// 3. Apply filters (category, price, availability, etc.)</span><br>
                            &nbsp;&nbsp;<span class="keyword">const</span> filteredProducts = <span class="function">applyFilters</span>(candidateProducts, userContext.filters);<br>
                            <br>
                            &nbsp;&nbsp;<span class="comment">// 4. Rank results using ML models</span><br>
                            &nbsp;&nbsp;<span class="keyword">const</span> rankedProducts = <span class="function">rankProducts</span>(filteredProducts, userContext);<br>
                            <br>
                            &nbsp;&nbsp;<span class="comment">// 5. Apply business rules and personalization</span><br>
                            &nbsp;&nbsp;<span class="keyword">const</span> finalResults = <span class="function">applyBusinessRules</span>(rankedProducts, userContext);<br>
                            <br>
                            &nbsp;&nbsp;<span class="keyword">return</span> finalResults;<br>
                            }
                        </div>
                    </section>
                    
                    <section class="research-section">
                        <h2>Data Storage and Optimization</h2>
                        <p>
                            Amazon's product catalog contains hundreds of millions of items. Efficient storage and retrieval
                            are critical for maintaining performance at scale:
                        </p>
                        
                        <h3>Data Sharding Strategy</h3>
                        <p>
                            Amazon horizontally partitions (shards) its search indices across many machines. 
                            This allows parallel processing of search queries and enables scaling by simply adding more machines.
                            The sharding strategy likely follows these principles:
                        </p>
                        
                        <ul style="margin-bottom: 2rem; padding-left: 2rem; color: var(--text-secondary);">
                            <li>Product category-based sharding (different servers for different departments)</li>
                            <li>Consistent hashing for evenly distributing products</li>
                            <li>Replication for fault tolerance and load balancing</li>
                            <li>Geographic distribution for lower latency in different regions</li>
                        </ul>
                        
                        <h3>Index Compression</h3>
                        <p>
                            To optimize storage and memory usage, Amazon employs sophisticated compression techniques for its indices:
                        </p>
                        <ul style="margin-bottom: 2rem; padding-left: 2rem; color: var(--text-secondary);">
                            <li>Delta encoding for storing product IDs</li>
                            <li>Bitmap compression for faster Boolean operations</li>
                            <li>Block-level compression for efficient I/O operations</li>
                        </ul>
                    </section>
                    
                    <section class="research-section">
                        <h2>Ranking and Relevance</h2>
                        <p>
                            Beyond just retrieval, Amazon's true magic lies in its ability to rank products optimally:
                        </p>
                        
                        <h3>Machine Learning Models</h3>
                        <p>
                            Amazon uses sophisticated ML models that consider hundreds of features to rank results:
                        </p>
                        <ul style="padding-left: 2rem; color: var(--text-secondary);">
                            <li>Query-product text matching (TF-IDF, BM25, semantic similarity)</li>
                            <li>Historical user behavior (clicks, purchases, add-to-carts)</li>
                            <li>Product quality signals (ratings, reviews, return rates)</li>
                            <li>Customer-specific factors (purchase history, browsing patterns)</li>
                            <li>Business metrics (conversion rate, margin)</li>
                        </ul>
                    </section>
                </div>
            </main>
            
            <footer class="footer">
                <div class="container">
                    <p>© 2025 Prajwal | Research on Amazon's Search Technology</p>
                </div>
            </footer>
        </body>
        </html>
        \`;
        
        // Write the file
        const blob = new Blob([amazonHTML], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'amazon-research.html';
        document.body.appendChild(link);
    `;
    
    document.body.appendChild(amazonPage);
}
