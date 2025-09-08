document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                // For dropdown parents, don't close the menu
                if (!e.target.parentElement.classList.contains('dropdown')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    body.classList.remove('nav-open');
                }
            }
        });
    });

    // Handle dropdowns on mobile
    document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                const dropdown = e.target.closest('.dropdown');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && 
            navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.hamburger')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('nav-open');
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Only the top bar is sticky now - remove hiding behavior from main nav
    const topBar = document.getElementById('topBar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            if (lastScrollY < window.scrollY && window.scrollY > 100) {
                // Scrolling down - hide top bar
                topBar.classList.add('hidden');
            } else {
                // Scrolling up - show top bar
                topBar.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
        }
    });
});

// Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    if (page === "careers.html") {
        document.body.classList.add("careers-page");
    } 
    else if (page === "about.html" || page === "contact.html") {
        document.body.classList.add("light-background-page");
    }
});