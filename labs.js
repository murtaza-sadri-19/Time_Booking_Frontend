document.addEventListener('DOMContentLoaded', function() {
    // Enhanced lab data with more details
    const labsData = [
        {
            id: 1,
            name: "Central Coding Hub",
            location: "Bhopal",
            image: "/api/placeholder/400/200",
            specs: ["30 Workstations", "High-Speed Internet", "24/7 Access"],
            features: ["Dual Monitor Setup", "Ergonomic Chairs", "Technical Support", "Private Meeting Rooms", "Vending Machines"],
            description: "Our flagship lab with state-of-the-art equipment and dedicated support staff.",
            availability: "available",
            detailedSpecs: {
                "Workstations": "30 HP EliteDesk PCs",
                "Monitors": "Dual 24\" displays",
                "Internet": "1 Gbps fiber connection",
                "Software": "Full Adobe Suite, Visual Studio, JetBrains",
                "Hours": "24/7 access for registered users"
            }
        },
        {
            id: 2,
            name: "TechNest Lab",
            location: "Indore",
            image: "/api/placeholder/400/200",
            specs: ["25 Workstations", "Specialized Hardware", "Group Rooms"],
            features: ["AI Development Hardware", "VR Testing Equipment", "Conference Room", "Standing Desks", "Lounge Area"],
            description: "Perfect for collaborative projects with specialized hardware for graphics and AI development.",
            availability: "limited",
            detailedSpecs: {
                "Workstations": "25 Dell Precision Workstations",
                "GPU": "NVIDIA RTX GPUs for AI projects",
                "Special Hardware": "VR/AR testing equipment",
                "Collaboration": "5 group meeting rooms",
                "Hours": "8 AM - 10 PM daily"
            }
        },
        {
            id: 3,
            name: "CodeSpace",
            location: "Jabalpur",
            image: "/api/placeholder/400/200",
            specs: ["20 Workstations", "Quiet Environment", "Technical Library"],
            features: ["Reference Book Collection", "Noise-Cancelling Booths", "Private Workspaces", "Coffee Station", "Printing Services"],
            description: "A focused environment with additional resources for deep learning and research.",
            availability: "available",
            detailedSpecs: {
                "Workstations": "20 Apple iMac stations",
                "Focus Areas": "8 private study booths",
                "Library": "Over 500 technical books",
                "Internet": "500 Mbps dedicated line",
                "Hours": "6 AM - Midnight daily"
            }
        },
        {
            id: 4,
            name: "Dev Studio",
            location: "Gwalior",
            image: "/api/placeholder/400/200",
            specs: ["15 Workstations", "24/7 Access", "Meeting Rooms"],
            features: ["Presentation System", "Whiteboard Walls", "Phone Booths", "Game Area", "Free Beverages"],
            description: "Flexible space with meeting rooms for team coordination and presentations.",
            availability: "unavailable",
            detailedSpecs: {
                "Workstations": "15 Custom Build PCs",
                "Meeting Spaces": "3 small, 1 large room",
                "Connectivity": "4K Projectors and conferencing",
                "Relaxation": "Gaming and relaxation area",
                "Hours": "24/7 access with keycard"
            }
        }
    ];

    // DOM elements
    const labsGrid = document.getElementById('labsGrid');
    const locationFilter = document.getElementById('locationFilter');
    const featureFilter = document.getElementById('featureFilter');
    const sortBySelect = document.getElementById('sortBy');
    const labModal = document.getElementById('labModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');

    // Initialize the page
    function init() {
        // Render all labs initially
        renderLabs(labsData);
        
        // Set up event listeners
        setupEventListeners();
    }

    // Render labs based on current filters
    function renderLabs(labs) {
        // Clear current labs
        labsGrid.innerHTML = '';
        
        if (labs.length === 0) {
            labsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No labs match your filters</h3>
                    <p>Try adjusting your filter criteria</p>
                </div>
            `;
            return;
        }
        
        // Create lab cards
        labs.forEach(lab => {
            const availabilityClass = lab.availability;
            const availabilityText = lab.availability === 'available' ? 'Available Now' : 
                                   lab.availability === 'limited' ? 'Limited Availability' : 'Currently Unavailable';
            const availabilityIcon = lab.availability === 'available' ? 'check-circle' : 
                                   lab.availability === 'limited' ? 'exclamation-circle' : 'times-circle';
            
            const labCard = document.createElement('div');
            labCard.className = 'lab-card filtered-fade';
            labCard.setAttribute('data-lab-id', lab.id);
            
            const labSpecs = lab.specs.map(spec => `<span>${spec}</span>`).join('');
            
            labCard.innerHTML = `
                <img src="${lab.image}" alt="${lab.name}" class="lab-image">
                <div class="lab-info">
                    <h3>${lab.name}</h3>
                    <div class="lab-location">
                        <i class="fas fa-map-marker-alt"></i> ${lab.location}
                    </div>
                    <div class="lab-availability ${availabilityClass}">
                        <i class="fas fa-${availabilityIcon}"></i> ${availabilityText}
                    </div>
                    <div class="lab-specs">
                        ${labSpecs}
                    </div>
                    <p class="lab-description">${lab.description}</p>
                    <div class="lab-actions">
                        <button class="btn btn-secondary view-details" data-lab-id="${lab.id}">View Details</button>
                        <button class="btn ${lab.availability === 'unavailable' ? 'btn-disabled' : ''}" 
                            ${lab.availability === 'unavailable' ? 'disabled' : ''}>
                            ${lab.availability === 'unavailable' ? 'Unavailable' : 'Book Now'}
                        </button>
                    </div>
                </div>
            `;
            
            labsGrid.appendChild(labCard);
        });
        
        // Add click event for detail buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const labId = this.getAttribute('data-lab-id');
                openLabModal(labId);
            });
        });
    }

    // Set up filter and sort event listeners
    function setupEventListeners() {
        // Filter by location
        locationFilter.addEventListener('change', applyFilters);
        
        // Filter by feature
        featureFilter.addEventListener('change', applyFilters);
        
        // Sort by
        sortBySelect.addEventListener('change', applyFilters);
        
        // Close modal
        closeModal.addEventListener('click', function() {
            labModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === labModal) {
                labModal.style.display = 'none';
            }
        });
        
        // Implement escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && labModal.style.display === 'block') {
                labModal.style.display = 'none';
            }
        });
    }

    // Apply filters and sort to labs
    function applyFilters() {
        const locationValue = locationFilter.value;
        const featureValue = featureFilter.value;
        const sortValue = sortBySelect.value;
        
        // Filter labs
        let filteredLabs = labsData.filter(lab => {
            // Location filter
            if (locationValue !== 'all' && lab.location !== locationValue) {
                return false;
            }
            
            // Feature filter
            if (featureValue !== 'all') {
                // Check both specs and features arrays
                const hasFeature = lab.specs.some(spec => spec.includes(featureValue)) || 
                                   lab.features.some(feature => feature.includes(featureValue));
                if (!hasFeature) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Sort labs
        if (sortValue === 'name') {
            filteredLabs.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'location') {
            filteredLabs.sort((a, b) => a.location.localeCompare(b.location));
        } else if (sortValue === 'capacity') {
            filteredLabs.sort((a, b) => {
                // Extract number of workstations from specs
                const getWorkstations = lab => {
                    const workstationSpec = lab.specs.find(spec => spec.includes('Workstation'));
                    return workstationSpec ? parseInt(workstationSpec) : 0;
                };
                
                return getWorkstations(b) - getWorkstations(a); // Sort by highest capacity first
            });
        }
        
        // Render filtered and sorted labs
        renderLabs(filteredLabs);
    }

    // Open lab detail modal
    function openLabModal(labId) {
        const lab = labsData.find(lab => lab.id == labId);
        if (!lab) return;
        
        // Create features list HTML
        const featuresListHTML = lab.features.map(feature => 
            `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
        ).join('');
        
        // Create detailed specs HTML
        const specsHTML = Object.entries(lab.detailedSpecs).map(([key, value]) => 
            `<div class="specs-item">
                <span class="specs-label">${key}</span>
                <span class="specs-value">${value}</span>
            </div>`
        ).join('');
        
        // Availability class and text
        const availabilityClass = lab.availability === 'available' ? 'available-tag' : 
                               lab.availability === 'limited' ? 'limited-tag' : 'unavailable-tag';
        const availabilityText = lab.availability === 'available' ? 'Available Now' : 
                               lab.availability === 'limited' ? 'Limited Availability' : 'Currently Unavailable';
        
        // Create modal content
        modalBody.innerHTML = `
            <img src="${lab.image}" alt="${lab.name}" class="modal-header-image">
            
            <div class="modal-lab-info">
                <div class="modal-lab-title">
                    <h2>${lab.name}</h2>
                    <span class="lab-availability-tag ${availabilityClass}">${availabilityText}</span>
                </div>
                
                <div class="modal-lab-details">
                    <div class="modal-lab-description">
                        <p>${lab.description}</p>
                        
                        <div class="modal-lab-features">
                            <h3>Lab Features</h3>
                            <ul class="features-list">
                                ${featuresListHTML}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="modal-lab-specs">
                        <h3>Lab Specifications</h3>
                        ${specsHTML}
                    </div>
                </div>
                
                <div class="booking-section">
                    <p class="modal-cta-text">Ready to use this lab? Book your time slot now.</p>
                    <button class="btn ${lab.availability === 'unavailable' ? 'btn-disabled' : ''}" 
                        ${lab.availability === 'unavailable' ? 'disabled' : ''}>
                        ${lab.availability === 'unavailable' ? 'Currently Unavailable' : 'Book This Lab'}
                    </button>
                </div>
            </div>
        `;
        
        // Show modal
        labModal.style.display = 'block';
    }

    // Initialize the page
    init();
    
    // Additional functionality: Add mobile navigation toggle for this page
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const authButtons = document.querySelector('.auth-buttons');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});