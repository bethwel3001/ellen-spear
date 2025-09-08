document.addEventListener('DOMContentLoaded', function() {
    // Animation for benefit cards on scroll
    function animateOnScroll() {
        const benefitCards = document.querySelectorAll('.benefit-card, .value-item, .position-item');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        benefitCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Application form handling
    const applicationForm = document.getElementById('application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const phoneInput = document.querySelector('input[name="phone"]');
            const positionInput = document.querySelector('select[name="position"]');
            const resumeInput = document.querySelector('input[name="resume"]');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                highlightError(nameInput);
                isValid = false;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            }
            
            if (!phoneInput.value.trim()) {
                highlightError(phoneInput);
                isValid = false;
            }
            
            if (!positionInput.value) {
                highlightError(positionInput);
                isValid = false;
            }
            
            if (!resumeInput.value) {
                highlightError(resumeInput);
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - in a real application, you would submit the form here
                alert('Thank you for your application! We will review your submission and contact you soon.');
                applicationForm.reset();
            }
        });
    }
    
    function highlightError(input) {
        input.style.borderColor = '#e53e3e';
        
        setTimeout(() => {
            input.style.borderColor = '';
        }, 3000);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});