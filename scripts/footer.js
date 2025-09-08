document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year automatically
    function updateCopyrightYear() {
        const yearElement = document.getElementById('copyright-year');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = currentYear;
        }
    }
    
    // Smooth scroll to top function
    function initScrollToTop() {
        const scrollButton = document.getElementById('scroll-to-top');
        if (scrollButton) {
            scrollButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Initialize footer functionality
    updateCopyrightYear();
    initScrollToTop();
    
    // Add animation to footer elements on scroll
    function animateFooterOnScroll() {
        const footer = document.querySelector('.footer');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const footerColumns = document.querySelectorAll('.footer-column');
                    footerColumns.forEach((column, index) => {
                        column.style.opacity = '0';
                        column.style.transform = 'translateY(20px)';
                        column.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        setTimeout(() => {
                            column.style.opacity = '1';
                            column.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                    
                    // Disconnect after animating
                    observer.disconnect();
                }
            });
        }, observerOptions);
        
        if (footer) {
            observer.observe(footer);
        }
    }
    
    // Initialize footer animation
    animateFooterOnScroll();
});