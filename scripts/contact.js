document.addEventListener('DOMContentLoaded', function() {
    // Map modal functionality
    const mapToggleBtn = document.querySelector('.map-toggle-btn');
    const mapModal = document.querySelector('.map-modal');
    const mapModalClose = document.querySelector('.map-modal-close');
    
    // Open map modal
    if (mapToggleBtn) {
        mapToggleBtn.addEventListener('click', function() {
            mapModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close map modal
    if (mapModalClose) {
        mapModalClose.addEventListener('click', function() {
            mapModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside
    if (mapModal) {
        mapModal.addEventListener('click', function(e) {
            if (e.target === mapModal) {
                mapModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mapModal.classList.contains('active')) {
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form-card form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const messageInput = document.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                highlightError(nameInput);
                isValid = false;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                highlightError(messageInput);
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - in a real application, you would submit the form here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
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
    
    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
        });
    }
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
    }
    
    // Close chatbot when clicking outside
    document.addEventListener('click', function(e) {
        if (chatbotContainer && chatbotContainer.classList.contains('active') && 
            !chatbotContainer.contains(e.target) && 
            !chatbotToggle.contains(e.target)) {
            chatbotContainer.classList.remove('active');
        }
    });
    
    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                botResponse(message);
            }, 800);
        }
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Bot responses
    function botResponse(userMessage) {
        let response = '';
        userMessage = userMessage.toLowerCase();
        
        if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
            response = 'Hello! How can I help you with Ellen Spear Group services today?';
        } else if (userMessage.includes('service') || userMessage.includes('security')) {
            response = 'We offer various security services including physical security, mobile patrols, IT security, alarm response, and security consultancy. Which service are you interested in?';
        } else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('phone')) {
            response = 'You can reach us at info@ellenspear.com or call +1 (555) 123-4567. Our team is available 24/7 to assist you.';
        } else if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('quote')) {
            response = 'For pricing information, please fill out the contact form and our team will provide a customized quote based on your specific needs.';
        } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
            response = "You're welcome! Is there anything else I can help you with?";
        } else if (userMessage.includes('map') || userMessage.includes('location') || userMessage.includes('address')) {
            response = "We're located at 123 Security Avenue, Safe City. Click the 'View Our Location on Map' button to see our location on the map.";
        } else {
            response = "I'm here to help you learn more about Ellen Spear Group's security services. You can ask me about our services, contact information, or request a quote.";
        }
        
        addMessage(response, 'bot');
    }
    
    // Add initial bot message
    setTimeout(() => {
        if (chatbotMessages) {
            addMessage("Hello! I'm Ellie, your security assistant. How can I help you today?", 'bot');
        }
    }, 1000);
});