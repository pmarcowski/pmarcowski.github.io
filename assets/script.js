document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  const elements = {
    themeToggle: document.getElementById('theme-toggle'),
    body: document.body,
    hamburger: document.querySelector('.nav__hamburger'),
    navList: document.querySelector('.nav__list'),
    scrollLinks: document.querySelectorAll('.nav__link, .scroll-arrow')
  };
  
  // Theme handling
  const handleTheme = {
    toggle: () => {
      elements.body.classList.toggle('dark-theme');
      const isDark = elements.body.classList.contains('dark-theme');
      elements.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    },
    
    initialize: () => {
      if (localStorage.getItem('theme') === 'dark') {
        elements.body.classList.add('dark-theme');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    }
  };
  
  // Navigation menu handling
  const handleMenu = {
    toggle: () => elements.navList.classList.toggle('show'),
    
    closeIfLink: (e) => {
      if (e.target.classList.contains('nav__link')) {
        elements.navList.classList.remove('show');
      }
    },
    
    closeIfOutside: (e) => {
      if (!elements.hamburger.contains(e.target) && !elements.navList.contains(e.target)) {
        elements.navList.classList.remove('show');
      }
    }
  };
  
  // Smooth scrolling
  const scrollTo = (targetElement) => {
    const headerOffset = 75;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 1000;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
        
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };
  
  // Event listeners
  const initEventListeners = () => {
    // Theme toggle
    elements.themeToggle.addEventListener('click', handleTheme.toggle);
    
    // Mobile menu
    elements.hamburger.addEventListener('click', handleMenu.toggle);
    elements.navList.addEventListener('click', handleMenu.closeIfLink);
    document.addEventListener('click', handleMenu.closeIfOutside);
    
    // Smooth scrolling
    elements.scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          scrollTo(targetElement);
          history.pushState(null, '', targetId);
        }
      });
    });
  };
  
  // Initialize
  handleTheme.initialize();
  initEventListeners();
});
