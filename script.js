/* Script for language switching, hamburger menu toggle, and portfolio "See More" functionality */

document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const elementsToTranslate = document.querySelectorAll('[data-en][data-id]');
  const navMenu = document.getElementById('nav-menu');
  const hamburger = document.querySelector('.hamburger');
  const seeMoreBtn = document.querySelector('.portfolio-see-more .btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  let showingAll = false;
  let currentLang = localStorage.getItem('preferredLang') || 'en';

  // Defensive checks
  if (!langButtons.length || !navMenu || !hamburger) {
    console.error('Essential elements for language switcher or hamburger menu not found.');
    return;
  }

  // Set language with fade effect
  function fadeOutIn(element, newText) {
    element.style.transition = 'opacity 0.3s ease';
    element.style.opacity = 0;
    setTimeout(() => {
      element.textContent = newText;
      element.style.opacity = 1;
    }, 300);
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    elementsToTranslate.forEach(el => {
      fadeOutIn(el, el.getAttribute(`data-${lang}`));
    });
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.id === `lang-${lang}`);
      btn.setAttribute('aria-pressed', btn.classList.contains('active'));
    });
  }

  // Language button event delegation
  document.querySelector('.lang-switcher').addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-btn')) {
      const lang = e.target.id.replace('lang-', '');
      if (lang !== currentLang) {
        setLanguage(lang);
      }
    }
  });

  // Initialize language
  setLanguage(currentLang);

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
  });

  // Close menu on nav link click (for mobile)
  navMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // offset for fixed header
          behavior: 'smooth',
        });
      }
    });
  });

  // Portfolio "See More" functionality
  if (seeMoreBtn && portfolioGrid) {
    seeMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-post');
      if (!showingAll) {
        portfolioItems.forEach(item => item.style.display = 'flex');
        seeMoreBtn.textContent = 'Show Less';
        showingAll = true;
      } else {
        portfolioItems.forEach((item, index) => {
          if (index >= 6) item.style.display = 'none';
        });
        seeMoreBtn.textContent = 'See More';
        showingAll = false;
      }
    });

    // Initially hide portfolio items beyond 6
    const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-post');
    portfolioItems.forEach((item, index) => {
      if (index >= 6) item.style.display = 'none';
    });
  }

  // Live demo URLs for portfolio projects
  const liveDemoUrls = {
    'IKN TIME': 'https://www.ikntime.com/',
    'SMA SANTO PAULUS NYARUMKOP': 'https://www.smasantopaulusskw.id/',
    'MINE SAFETY': 'https://www.minesafety.id/',
    'Project Four': 'https://www.indotribune.com/',
    'Project Five': 'https://example.com/project-five-live-demo',
    'Project Six': 'https://example.com/project-six-live-demo',
    'Project Seven': 'https://example.com/project-six-live-demo',
    'Project Eight': 'https://example.com/project-six-live-demo',
    'Project Nine': 'https://example.com/project-six-live-demo',
  };

  // Event delegation for "Read More" links
  portfolioGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('portfolio-readmore')) {
      e.preventDefault();
      const portfolioPost = e.target.closest('.portfolio-post');
      if (!portfolioPost) return;
      const titleElement = portfolioPost.querySelector('.portfolio-title');
      if (!titleElement) return;
      const projectTitle = titleElement.textContent.trim();
      const liveDemoUrl = liveDemoUrls[projectTitle];
      if (liveDemoUrl) {
        window.open(liveDemoUrl, '_blank', 'noopener');
      } else {
        alert('Live demo URL not available for this project.');
      }
    }
  });
});

