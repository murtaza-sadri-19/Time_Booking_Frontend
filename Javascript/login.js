document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.toggle('active');
            });
        });
    }
    
    // Signup form validation
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            let isValid = true;
            
            // Reset previous error messages
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.remove();
            });
            
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
                group.classList.remove('success');
            });
            
            // Validate full name
            if (fullName === '') {
                showError('fullName', 'Full name is required');
                isValid = false;
            } else {
                showSuccess('fullName');
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Email address is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                showSuccess('email');
            }
            
            // Validate password
            if (password === '') {
                showError('password', 'Password is required');
                isValid = false;
            } else if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters');
                isValid = false;
            } else if (!isStrongPassword(password)) {
                showError('password', 'Password must include numbers and special characters');
                isValid = false;
            } else {
                showSuccess('password');
            }
            
            // Validate confirm password
            if (confirmPassword === '') {
                showError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (confirmPassword !== password) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            } else {
                showSuccess('confirmPassword');
            }
            
            // Validate terms agreement
            if (!terms) {
                showError('terms', 'You must agree to the Terms of Service');
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                // In a real application, you would submit the form to your backend here
                // For now, let's simulate a successful submission
                showSubmitSuccess();
            }
        });
    }
    
    // Helper functions
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        
        formGroup.appendChild(errorMessage);
    }
    
    function showSuccess(inputId) {
        const input = document.getElementById(inputId);
        const formGroup = input.parentElement;
        formGroup.classList.add('success');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isStrongPassword(password) {
        // Password must contain at least one number and one special character
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasNumber && hasSpecialChar;
    }
    
    function showSubmitSuccess() {
        // Hide the form
        signupForm.style.display = 'none';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 48px; color: var(--success); margin-bottom: 20px;"></i>
            <h3>Account Created Successfully!</h3>
            <p>We've sent a verification email to your inbox. Please verify your email to complete the signup process.</p>
            <a href="login.html" class="btn auth-btn" style="margin-top: 20px;">Proceed to Login</a>
        `;
        successMessage.style.textAlign = 'center';
        
        // Insert success message
        const formContainer = document.querySelector('.auth-form-container');
        formContainer.appendChild(successMessage);
    }
});