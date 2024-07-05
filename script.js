document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const hamburger = document.querySelector('.nav__hamburger');
    const navList = document.querySelector('.nav__list');

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // Close menu when a link is clicked
    navList.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav__link')) {
            navList.classList.remove('show');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('show');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
