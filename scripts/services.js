document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    const carousel = document.querySelector('.services-carousel');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    let cardsPerView = calculateCardsPerView();
    
    // Calculate how many cards to show based on screen width
    function calculateCardsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 40; // width + margin
        const transformValue = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${transformValue}px)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cardCount - cardsPerView;
    }
    
    // Next card
    function nextCard() {
        if (currentIndex < cardCount - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Previous card
    function prevCard() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Go to specific card
    function goToCard(index) {
        if (index >= 0 && index <= cardCount - cardsPerView) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToCard(index));
    });
    
    // Recalculate on window resize
    window.addEventListener('resize', () => {
        const newCardsPerView = calculateCardsPerView();
        
        // Only update if cards per view changed
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            
            // Reset to first card if current index is too high
            if (currentIndex > cardCount - cardsPerView) {
                currentIndex = Math.max(0, cardCount - cardsPerView);
            }
            updateCarousel();
        }
    });
    
    // Initialize carousel
    updateCarousel();
});