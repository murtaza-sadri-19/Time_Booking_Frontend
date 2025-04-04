document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const authButtons = document.querySelector('.auth-buttons');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') !== '#') {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        authButtons.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Dynamic lab data for labs.html page
    const labsGrid = document.getElementById('labsGrid');
    
    // Only populate labs section on labs.html page
    if (labsGrid && window.location.pathname.includes('labs.html')) {
        const labsData = [
            {
                name: "Central Coding Hub",
                location: "Bhopal",
                image: "lab1.png",
                specs: ["30 Workstations", "High-Speed Internet", "24/7 Access"],
                description: "Our flagship lab with state-of-the-art equipment and dedicated support staff."
            },
            {
                name: "TechNest Lab",
                location: "Indore",
                image: "lab2.png",
                specs: ["25 Workstations", "Specialized Hardware", "Group Rooms"],
                description: "Perfect for collaborative projects with specialized hardware for graphics and AI development."
            },
            {
                name: "CodeSpace",
                location: "Jabalpur",
                image: "lab3.png",
                specs: ["20 Workstations", "Quiet Environment", "Technical Library"],
                description: "A focused environment with additional resources for deep learning and research."
            },
            {
                name: "Dev Studio",
                location: "Gwalior",
                image: "lab4.png",
                specs: ["15 Workstations", "24/7 Access", "Meeting Rooms"],
                description: "Flexible space with meeting rooms for team coordination and presentations."
            }
        ];
        
        labsData.forEach(lab => {
            const labCard = document.createElement('div');
            labCard.className = 'lab-card';
            
            const labSpecs = lab.specs.map(spec => `<span>${spec}</span>`).join('');
            
            labCard.innerHTML = `
                <img src="${lab.image}" alt="${lab.name}" class="lab-image">
                <div class="lab-info">
                    <h3>${lab.name}</h3>
                    <div class="lab-location">
                        <i class="fas fa-map-marker-alt"></i> ${lab.location}
                    </div>
                    <div class="lab-specs">
                        ${labSpecs}
                    </div>
                    <p>${lab.description}</p>
                    <a href="#" class="btn btn-secondary">View Details</a>
                </div>
            `;
            
            labsGrid.appendChild(labCard);
        });
    }
    
    // Add animation to feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const animateOnScroll = () => {
        featureCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize card styles
    featureCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    // Check initial positions
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const formFields = this.querySelectorAll('input, textarea');
            
            formFields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Form submitted successfully!';
                
                this.appendChild(successMessage);
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    successMessage.remove();
                }, 3000);
            }
        });
    });
    
    // Countdown timer for featured lab events
    function setupCountdown() {
        const countdownElement = document.querySelector('.countdown-timer');
        if (!countdownElement) return;
        
        // Set event date (7 days from now)
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + 7);
        
        function updateCountdown() {
            const currentDate = new Date();
            const difference = eventDate - currentDate;
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="countdown-item"><span>${days}</span> days</div>
                <div class="countdown-item"><span>${hours}</span> hours</div>
                <div class="countdown-item"><span>${minutes}</span> minutes</div>
                <div class="countdown-item"><span>${seconds}</span> seconds</div>
            `;
            
            if (difference < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = '<div class="event-live">Event is live now!</div>';
            }
        }
        
        // Initial update
        updateCountdown();
        
        // Update every second
        const interval = setInterval(updateCountdown, 1000);
    }
    
    // Initialize countdown if element exists
    setupCountdown();
    
    // Analytics tracking (placeholder)
    function trackPageView() {
        console.log('Page viewed:', window.location.pathname);
        // In a real application, you would send this data to your analytics service
    }
    
    function trackButtonClick(buttonText) {
        console.log('Button clicked:', buttonText);
        // In a real application, you would send this data to your analytics service
    }
    
    // Track page view on load
    trackPageView();
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            trackButtonClick(this.textContent.trim());
        });
    });
    
    // Handle theme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
    }
    
    // Listen for theme toggle if it exists
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Update localStorage
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
});