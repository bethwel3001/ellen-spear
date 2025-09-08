document.addEventListener('DOMContentLoaded', function() {
    // Get the scroll-to-top button
    const scrollButton = document.querySelector('.scroll-top');
    
    // Get the hero section to determine when to show the button
    const heroSection = document.querySelector('.hero');
    
    // Function to check scroll position
    function checkScroll() {
        if (!heroSection) return;
        
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        // Show button when scrolled past the hero section
        if (scrollPosition > heroHeight * 0.7) {
            scrollButton.classList.add('visible');
            
            // Add pulse animation after being visible for a moment
            setTimeout(() => {
                scrollButton.classList.add('pulse');
            }, 1000);
        } else {
            scrollButton.classList.remove('visible');
            scrollButton.classList.remove('pulse');
        }
    }
    
    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add click event to the button
    if (scrollButton) {
        scrollButton.addEventListener('click', scrollToTop);
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', checkScroll);
    
    // Initial check in case page is loaded with scroll position
    setTimeout(checkScroll, 100);
    
    // Additional feature: Hide button when at top
    function hideAtTop() {
        if (window.scrollY < 100) {
            scrollButton.classList.remove('visible');
            scrollButton.classList.remove('pulse');
        }
    }
    
    window.addEventListener('scroll', hideAtTop);
    
    // Keyboard accessibility
    if (scrollButton) {
        scrollButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
        
        // Make button focusable for keyboard users
        scrollButton.setAttribute('tabindex', '0');
        scrollButton.setAttribute('role', 'button');
        scrollButton.setAttribute('aria-label', 'Scroll to top');
    }
});