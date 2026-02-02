$(document).ready(function () {

    // --- Theme Toggle ---
    const $htmlElement = $('html');
    const $themeIcon = $('#theme-icon');

    // Check saved theme or default to light for this specific design
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Click handler for the NEW button ID
    $('#theme-toggle-btn').on('click', function () {
        const currentTheme = $htmlElement.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        $htmlElement.attr('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Icon update
        if (theme === 'dark') {
            $themeIcon.removeClass('fa-moon fa-sun').addClass('fa-sun'); // Sun icon implies "Light mode available"
        } else {
            $themeIcon.removeClass('fa-sun fa-moon').addClass('fa-moon'); // Moon icon implies "Dark mode available"
        }
    }
});