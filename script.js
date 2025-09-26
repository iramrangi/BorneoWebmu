// Enhanced JavaScript for BorneoWebmu Website
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initializeLanguageSwitcher();
  initializeNavigation();
  initializeTypingEffect();
  initializeTestimonialsCarousel();
  initializePortfolio();
  initializeScrollEffects();
  initializeAnimations();
  initializeSmoothScrolling();
});

// Language Switcher
function initializeLanguageSwitcher() {
  const langEnBtn = document.getElementById('lang-en');
  const langIdBtn = document.getElementById('lang-id');
  
  if (!langEnBtn || !langIdBtn) return;

  function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-id]');
    
    elements.forEach(el => {
      if (lang === 'en') {
        el.textContent = el.getAttribute('data-en');
      } else if (lang === 'id') {
        el.textContent = el.getAttribute('data-id');
      }
    });

    // Update WhatsApp links based on language
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (lang === 'id') {
        if (href.includes('Basic%20package')) {
          link.setAttribute('href', 'https://wa.me/62895179222178?text=Halo!%20Saya%20ingin%20memesan%20paket%20Dasar.');
        } else if (href.includes('Pro%20package')) {
          link.setAttribute('href', 'https://wa.me/6289517922178?text=Halo!%20Saya%20ingin%20memesan%20paket%20Pro.');
        } else if (href.includes('Enterprise%20package')) {
          link.setAttribute('href', 'https://wa.me/6289517922178?text=Halo!%20Saya%20ingin%20memesan%20paket%20Perusahaan.');
        } else if (href.includes('discuss%20a%20web%20development%20project')) {
          link.setAttribute('href', 'https://wa.me/6289517922178?text=Halo!%20Saya%20ingin%20berdiskusi%20tentang%20proyek%20pengembangan%20web.');
        }
      } else {
        if (href.includes('Halo!%20Saya%20ingin%20memesan%20paket%20Dasar')) {
          link.setAttribute('href', 'https://wa.me/62895179222178?text=Hello!%20I%20would%20like%20to%20order%20the%20Basic%20package.');
        } else if (href.includes('Halo!%20Saya%20ingin%20memesan%20paket%20Pro')) {
          link.setAttribute('href', 'https://wa.me/6289517922178?text=Hello!%20I%20would%20like%20to%20order%20the%20Pro%20package.');
        } else if (href.includes('Halo!%20Saya%20ingin%20memesan%20paket%20Perusahaan')) {
          link.setAttribute('href', 'https://wa.me/6289517922178?text=Hello!%20I%20would%20like%20to%20order%20the%20Enterprise%20package.');
        } else if (href.includes('Halo!%20Saya%20ingin%20berdiskusi')) {
          link.setAttribute('href', 'https://wa.me/6289517922178?text=Hello!%20I%20would%20like%20to%20discuss%20a%20web%20development%20project.');
        }
      }
    });

    // Update active button styling
    if (lang === 'en') {
      langEnBtn.classList.add('active');
      langIdBtn.classList.remove('active');
    } else {
      langIdBtn.classList.add('active');
      langEnBtn.classList.remove('active');
    }
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
  }

  // Event listeners for language buttons
  langEnBtn.addEventListener('click', () => switchLanguage('en'));
  langIdBtn.addEventListener('click', () => switchLanguage('id'));

  // Initialize with stored preference or default to English
  const storedLang = localStorage.getItem('preferred-language') || 'en';
  switchLanguage(storedLang);
}

// Navigation
function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');
  
  if (!hamburger || !navMenu) return;

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = !expanded ? 'hidden' : '';
  });

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Header scroll effect
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  });

  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });
}

// Portfolio Section
function initializePortfolio() {
  const seeMoreBtn = document.getElementById('see-more-btn');
  const portfolioPosts = document.querySelectorAll('.portfolio-post.hidden');
  
  if (!seeMoreBtn || portfolioPosts.length === 0) return;

  seeMoreBtn.addEventListener('click', () => {
    const isExpanded = seeMoreBtn.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Hide extra portfolio posts
      portfolioPosts.forEach(post => post.classList.add('hidden'));
      seeMoreBtn.querySelector('span').textContent = seeMoreBtn.querySelector('span').getAttribute('data-en') || 'See More Projects';
      seeMoreBtn.setAttribute('aria-expanded', 'false');
    } else {
      // Show extra portfolio posts
      portfolioPosts.forEach(post => post.classList.remove('hidden'));
      seeMoreBtn.querySelector('span').textContent = 'Show Less';
      seeMoreBtn.setAttribute('aria-expanded', 'true');
    }
  });
}

// Typing Effect
function initializeTypingEffect() {
  const dynamicText = document.getElementById('dynamic-text');
  if (!dynamicText) return;

  const words = [
    'stunning',
    'responsive',
    'modern',
    'beautiful',
    'innovative',
    'professional'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      dynamicText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 75;
    } else {
      dynamicText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing effect
  typeEffect();
}

// Testimonials Carousel
function initializeTestimonialsCarousel() {
  const carousel = document.getElementById('testimonials-carousel');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.nav-dot');
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');
  
  if (!carousel || cards.length === 0) return;

  let currentSlide = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000;

  function showSlide(index) {
    // Remove active class from all cards and dots
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide
    if (cards[index]) {
      cards[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % cards.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + cards.length) % cards.length;
    showSlide(prev);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoPlay();
      startAutoPlay(); // Restart autoplay
    });
  });

  // Arrow navigation
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    }
  });

  // Touch/swipe support
  let startX = 0;
  let endX = 0;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
  });

  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    startAutoPlay();
  });

  // Pause autoplay on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Initialize
  showSlide(0);
  startAutoPlay();
}

// Scroll Effects
function initializeScrollEffects() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.service-card, .package-card, .section-header, .contact-item'
  );
  
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for floating shapes
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Animations
function initializeAnimations() {
  // Add CSS for scroll animations
  const style = document.createElement('style');
  style.textContent = `
    .service-card,
    .package-card,
    .section-header,
    .contact-item {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .service-card {
      transition-delay: 0.1s;
    }
    
    .service-card:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .service-card:nth-child(3) {
      transition-delay: 0.3s;
    }
    
    .service-card:nth-child(4) {
      transition-delay: 0.4s;
    }
    
    .package-card {
      transition-delay: 0.1s;
    }
    
    .package-card:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .package-card:nth-child(3) {
      transition-delay: 0.3s;
    }
  `;
  document.head.appendChild(style);

  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll('.service-card, .package-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

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
  }
}

// Performance optimizations
const debouncedResize = debounce(() => {
  // Handle resize events
  const cards = document.querySelectorAll('.floating-card');
  if (window.innerWidth <= 640) {
    cards.forEach(card => card.style.display = 'none');
  } else {
    cards.forEach(card => card.style.display = 'flex');
  }
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// Loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-actions, .hero-stats');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape') {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
});

// Focus management for mobile menu
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// Apply focus trap to mobile menu
const navMenu = document.getElementById('nav-menu');
if (navMenu) {
  trapFocus(navMenu);
}

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}

