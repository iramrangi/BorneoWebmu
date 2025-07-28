// Script for language switching and hamburger menu toggle

document.addEventListener('DOMContentLoaded', () => {
  const langEnBtn = document.getElementById('lang-en');
  const langIdBtn = document.getElementById('lang-id');
  const langButtons = [langEnBtn, langIdBtn];
  const elementsToTranslate = document.querySelectorAll('[data-en][data-id]');
  const navMenu = document.getElementById('nav-menu');
  const hamburger = document.querySelector('.hamburger');

  // Defensive checks
  if (!langEnBtn || !langIdBtn || !navMenu || !hamburger) {
    console.error('Essential elements for language switcher or hamburger menu not found.');
    return;
  }

  // Default language
  let currentLang = 'en';

  function setLanguage(lang) {
    currentLang = lang;
    elementsToTranslate.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.id === `lang-${lang}`);
    });
  }

  langEnBtn.addEventListener('click', () => setLanguage('en'));
  langIdBtn.addEventListener('click', () => setLanguage('id'));

  // Initialize language
  setLanguage(currentLang);

  // Hamburger menu toggle with improved logic
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    } else {
      navMenu.classList.add('active');
    }
  });

  // Close menu on nav link click (for mobile)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
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

  // Language switch fade effect
  function fadeOutIn(element, newText) {
    element.style.opacity = 0;
    setTimeout(() => {
      element.textContent = newText;
      element.style.opacity = 1;
    }, 300);
  }

  langEnBtn.addEventListener('click', () => {
    currentLang = 'en';
    elementsToTranslate.forEach(el => {
      fadeOutIn(el, el.getAttribute('data-en'));
    });
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.id === 'lang-en');
    });
  });

  langIdBtn.addEventListener('click', () => {
    currentLang = 'id';
    elementsToTranslate.forEach(el => {
      fadeOutIn(el, el.getAttribute('data-id'));
    });
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.id === 'lang-id');
    });
  });
});
