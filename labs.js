// Lab data - would normally come from a backend API
const labsData = [
    {
        id: 1,
        name: "TechHub Indore",
        location: "Indore",
        address: "123 AB Road, Vijay Nagar, Indore",
        capacity: 40,
        features: ["High-Speed Internet", "24/7 Access", "Meeting Rooms"],
        description: "A modern coding space with high-speed connectivity and collaboration areas.",
        equipment: "Dual monitor setup, ergonomic chairs, high-performance workstations",
        image: "images/indore1.jpeg",
        availability: "Monday-Sunday, 24 hours"
    },
    {
        id: 2,
        name: "CodeNest Bhopal",
        location: "Bhopal",
        address: "45 MP Nagar Zone 1, Bhopal",
        capacity: 35,
        features: ["High-Speed Internet", "Meeting Rooms", "Specialized Hardware"],
        description: "A specialized lab with advanced hardware for machine learning and AI projects.",
        equipment: "GPU workstations, VR equipment, presentation screens",
        image: "images/bhopal1.jpeg",
        availability: "Monday-Saturday, 8am-10pm"
    },
    {
        id: 3,
        name: "DevSpace Jabalpur",
        location: "Jabalpur",
        address: "78 Wright Town, Jabalpur",
        capacity: 25,
        features: ["High-Speed Internet", "24/7 Access"],
        description: "A cozy space perfect for focused coding and small team collaborations.",
        equipment: "Ergonomic workstations, collaboration boards, high-speed WiFi",
        image: "images/jabalpur1.jpeg",
        availability: "Monday-Sunday, 24 hours"
    },
    {
        id: 4,
        name: "CodeCampus Gwalior",
        location: "Gwalior",
        address: "12 City Center, Gwalior",
        capacity: 30,
        features: ["High-Speed Internet", "Meeting Rooms"],
        description: "A vibrant coding space with focus on educational workshops and group learning.",
        equipment: "Teaching displays, workstations, learning materials",
        image: "images/gwalior1.jpeg",
        availability: "Monday-Friday, 9am-9pm"
    },
    {
        id: 5,
        name: "Innovation Hub Bhopal",
        location: "Bhopal",
        address: "89 Arera Colony, Bhopal",
        capacity: 50,
        features: ["High-Speed Internet", "24/7 Access", "Meeting Rooms", "Specialized Hardware"],
        description: "Our flagship lab with all premium features and equipments for any coding need.",
        equipment: "Latest Mac and Windows workstations, specialized hardware for IoT and ML",
        image: "images/bhopal2.jpeg",
        availability: "Monday-Sunday, 24 hours"
    },
    {
        id: 6,
        name: "CodeCraft Indore",
        location: "Indore",
        address: "56 Palasia, Indore",
        capacity: 28,
        features: ["High-Speed Internet", "Specialized Hardware"],
        description: "A specialized lab focusing on hardware integration and embedded systems.",
        equipment: "Soldering stations, microcontrollers, IoT kits, workstations",
        image: "images/indore2.jpeg",
        availability: "Monday-Saturday, 10am-8pm"
    }
];

// DOM Elements
let labsGrid = document.getElementById('labsGrid');
let labModal = document.getElementById('labModal');
let modalBody = document.getElementById('modalBody');
let closeModal = document.querySelector('.close-modal');
let locationFilter = document.getElementById('locationFilter');
let featureFilter = document.getElementById('featureFilter');
let sortBySelect = document.getElementById('sortBy');
let bookFromModalBtn = document.getElementById('bookFromModalBtn');

// Initialize page content
document.addEventListener('DOMContentLoaded', function() {
    // Initialize labs grid
    if (labsGrid) {
        renderLabs(labsData);
        
        // Add event listeners for filters
        if (locationFilter) {
            locationFilter.addEventListener('change', filterLabs);
        }
        
        if (featureFilter) {
            featureFilter.addEventListener('change', filterLabs);
        }
        
        if (sortBySelect) {
            sortBySelect.addEventListener('change', filterLabs);
        }
    }
    
    // Add event listener for modal close
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            labModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === labModal) {
            labModal.style.display = 'none';
        }
    });
});

// Render labs to the grid
function renderLabs(labs) {
    if (!labsGrid) return;
    
    labsGrid.innerHTML = '';
    
    if (labs.length === 0) {
        labsGrid.innerHTML = '<p class="no-results">No labs match your criteria. Please adjust your filters.</p>';
        return;
    }
    
    labs.forEach(lab => {
        const labCard = document.createElement('div');
        labCard.className = 'lab-card';
        labCard.innerHTML = `
            <div class="lab-image">
                <img src="${lab.image}" alt="${lab.name}">
            </div>
            <div class="lab-info">
                <h3>${lab.name}</h3>
                <p class="lab-location"><i class="fas fa-map-marker-alt"></i> ${lab.location}</p>
                <p class="lab-capacity"><i class="fas fa-users"></i> Capacity: ${lab.capacity} users</p>
                <div class="lab-features">
                    ${lab.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="lab-actions">
                    <button class="btn btn-secondary view-details-btn" data-id="${lab.id}">View Details</button>
                    <a href="booking.html?lab=${lab.id}" class="btn">Book Now</a>
                </div>
            </div>
        `;
        
        labsGrid.appendChild(labCard);
        
        // Add event listener to the view details button
        const viewDetailsBtn = labCard.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', function() {
            showLabDetails(lab.id);
        });
    });
}

// Filter labs based on selected criteria
function filterLabs() {
    const locationValue = locationFilter.value;
    const featureValue = featureFilter.value;
    const sortValue = sortBySelect.value;
    
    let filteredLabs = labsData.filter(lab => {
        // Filter by location
        if (locationValue !== 'all' && lab.location !== locationValue) {
            return false;
        }
        
        // Filter by feature
        if (featureValue !== 'all' && !lab.features.includes(featureValue)) {
            return false;
        }
        
        return true;
    });
    
    // Sort labs
    filteredLabs.sort((a, b) => {
        if (sortValue === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortValue === 'location') {
            return a.location.localeCompare(b.location);
        } else if (sortValue === 'capacity') {
            return b.capacity - a.capacity;
        }
        return 0;
    });
    
    renderLabs(filteredLabs);
}

// Show lab details in modal
function showLabDetails(labId) {
    const lab = labsData.find(lab => lab.id === labId);
    if (!lab) return;
    
    modalBody.innerHTML = `
        <h2>${lab.name}</h2>
        <div class="modal-content-grid">
            <div class="modal-image">
                <img src="${lab.image}" alt="${lab.name}">
            </div>
            <div class="modal-details">
                <p><strong>Location:</strong> ${lab.address}</p>
                <p><strong>Capacity:</strong> ${lab.capacity} users</p>
                <p><strong>Availability:</strong> ${lab.availability}</p>
                <p><strong>Features:</strong> ${lab.features.join(', ')}</p>
                <p><strong>Equipment:</strong> ${lab.equipment}</p>
                <h4>Description</h4>
                <p>${lab.description}</p>
            </div>
        </div>
        <div class="modal-actions">
            <a href="booking.html?lab=${lab.id}" class="btn">Book This Lab</a>
        </div>
    `;
    
    labModal.style.display = 'block';
    
    // Update the booking button URL
    if (bookFromModalBtn) {
        bookFromModalBtn.href = `booking.html?lab=${lab.id}`;
    }
}

// Function to get URL parameters - used for booking page
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Export functions and data for use in booking.js
window.labsData = labsData;
window.getUrlParameter = getUrlParameter;