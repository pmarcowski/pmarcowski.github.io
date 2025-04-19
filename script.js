// Smooth scrolling
$(document).ready(function() {
    // Handle all anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 800); // Animation duration in ms
        }
    });
    
    // Specific handler for scroll-down button with longer animation
    $('.scroll-down').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').stop().animate({
            scrollTop: $('#section-title').offset().top
        }, 1000); // Slightly longer animation for main scroll
    });
    
    // Theme toggling
    const $htmlElement = $('html');
    const $themeIcon = $('#theme-icon');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    $htmlElement.attr('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme on click
    $('#theme-toggle').on('click', function() {
        const currentTheme = $htmlElement.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        $htmlElement.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        $themeIcon.removeClass('fa-sun fa-moon');
        $themeIcon.addClass(theme === 'dark' ? 'fa-sun' : 'fa-moon');
    }
});