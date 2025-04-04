document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Form Validation
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            
            const inputs = signupForm.querySelectorAll('input');
            inputs.forEach(input => input.classList.remove('error'));
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            let isValid = true;
            
            // Validate Full Name
            if (fullName === '') {
                showError('fullName', 'Please enter your full name');
                isValid = false;
            }
            
            // Validate Email
            if (email === '') {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Password
            if (password === '') {
                showError('password', 'Please enter a password');
                isValid = false;
            } else if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters long');
                isValid = false;
            } else if (!isStrongPassword(password)) {
                showError('password', 'Password must include numbers and special characters');
                isValid = false;
            }
            
            // Validate Confirm Password
            if (confirmPassword === '') {
                showError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            // Validate Terms
            if (!terms) {
                showError('terms', 'You must agree to the Terms of Service');
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                // Here you would typically send the data to your server
                // For demo purposes, we'll just show an alert
                showSuccessMessage();
                
                // Reset form after successful submission
                signupForm.reset();
            }
        });
    }
    
    // Helper Functions
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        input.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;
        
        const parent = input.parentElement;
        parent.appendChild(errorDiv);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isStrongPassword(password) {
        // Check for at least one number and one special character
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasNumber && hasSpecial;
    }
    
    function showSuccessMessage() {
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.backgroundColor = 'var(--success-color)';
        successDiv.style.color = 'white';
        successDiv.style.padding = '15px';
        successDiv.style.borderRadius = '5px';
        successDiv.style.marginTop = '20px';
        successDiv.style.textAlign = 'center';
        successDiv.innerText = 'Account created successfully! Redirecting to login...';
        
        // Add to form container
        const formContainer = document.querySelector('.auth-form-container');
        formContainer.appendChild(successDiv);
        
        // Redirect after 3 seconds (for demo purposes)
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }
});