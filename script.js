document.addEventListener('DOMContentLoaded', () => {
  const langEnBtn = document.getElementById('lang-en');
  const langIdBtn = document.getElementById('lang-id');
  const seeMoreBtn = document.getElementById('see-more-btn');
  const portfolioPosts = document.querySelectorAll('.portfolio-post.hidden');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Function to switch language
  function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-id]');
    elements.forEach(el => {
      if (lang === 'en') {
        el.textContent = el.getAttribute('data-en');
      } else if (lang === 'id') {
        el.textContent = el.getAttribute('data-id');
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
  }

  // Event listeners for language buttons
  langEnBtn.addEventListener('click', () => {
    switchLanguage('en');
  });

  langIdBtn.addEventListener('click', () => {
    switchLanguage('id');
  });

  // Initialize language to English on page load
  switchLanguage('en');

  // See More button functionality
  seeMoreBtn.addEventListener('click', () => {
    const isExpanded = seeMoreBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      // Hide extra portfolio posts
      portfolioPosts.forEach(post => post.classList.add('hidden'));
      seeMoreBtn.textContent = 'See More';
      seeMoreBtn.setAttribute('aria-expanded', 'false');
    } else {
      // Show extra portfolio posts
      portfolioPosts.forEach(post => post.classList.remove('hidden'));
      seeMoreBtn.textContent = 'See Less';
      seeMoreBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Hamburger menu toggle functionality
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
  });

  // Typing animation for header dynamic text
  const dynamicText = document.getElementById('dynamic-text');
  const words = ['personal', 'company', 'e-commerce', 'portfolio', 'blog'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let deletingSpeed = 100;
  let pauseTime = 1500;

  function type() {
    console.log('Typing animation running'); // Debug log
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      dynamicText.textContent = currentWord.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, deletingSpeed);
      }
    } else {
      charIndex++;
      dynamicText.textContent = currentWord.substring(0, charIndex);
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
      } else {
        setTimeout(type, typingSpeed);
      }
    }
  }

  type();
});
