function initApplicationModal() {
    const applyButtons = document.querySelectorAll('.apply-btn, .application-btn');
    const applicationModal = document.getElementById('application-modal');
    const modalClose = document.querySelector('.modal-close');
    const applicationForm = document.getElementById('application-form');
    const positionSelect = document.getElementById('position');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    // Open modal when Apply buttons are clicked
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // If button has a data-position attribute, set the position select
            const position = this.getAttribute('data-position');
            if (position && positionSelect) {
                positionSelect.value = position;
            }
            
            applicationModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            applicationModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside
    if (applicationModal) {
        applicationModal.addEventListener('click', function(e) {
            if (e.target === applicationModal) {
                applicationModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && applicationModal.classList.contains('active')) {
            applicationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // File upload preview functionality
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = this.files[0];
            const previewId = this.getAttribute('data-preview');
            const previewContainer = document.getElementById(previewId);
            
            if (file && previewContainer) {
                const fileName = document.getElementById(`${previewId}-name`);
                const removeBtn = document.getElementById(`${previewId}-remove`);
                
                if (fileName) fileName.textContent = file.name;
                previewContainer.classList.add('active');
                
                // Remove file functionality
                if (removeBtn) {
                    removeBtn.onclick = function() {
                        this.value = '';
                        previewContainer.classList.remove('active');
                    };
                }
            }
        });
    });
    
    // Form validation
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const phoneInput = document.querySelector('input[name="phone"]');
            const positionInput = document.querySelector('select[name="position"]');
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your full name');
                isValid = false;
            } else {
                hideError(nameInput);
            }
            
            // Validate email
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError(emailInput);
            }
            
            // Validate phone
            if (!phoneInput.value.trim()) {
                showError(phoneInput, 'Please enter your phone number');
                isValid = false;
            } else {
                hideError(phoneInput);
            }
            
            // Validate position
            if (!positionInput.value) {
                showError(positionInput, 'Please select a position');
                isValid = false;
            } else {
                hideError(positionInput);
            }
            
            if (isValid) {
                // Form is valid - in a real application, you would submit the form here
                // This would typically involve AJAX to send the form data to a server
                
                // Show success message
                alert('Thank you for your application! We will review your submission and contact you soon.');
                
                // Reset form and close modal
                applicationForm.reset();
                document.querySelectorAll('.file-preview').forEach(preview => {
                    preview.classList.remove('active');
                });
                applicationModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.textContent = message;
            errorElement.classList.add('active');
        }
        input.style.borderColor = '#e53e3e';
    }
    
    function hideError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.classList.remove('active');
        }
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Initialize the application modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApplicationModal();
});