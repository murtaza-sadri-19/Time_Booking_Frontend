/* Labs Page Specific Styles */
.labs-banner {
    background: linear-gradient(rgba(44, 62, 80, 0.8), rgba(44, 62, 80, 0.8)), url('/api/placeholder/1200/300') center/cover;
    color: white;
    padding: 8rem 0 4rem;
    text-align: center;
    margin-bottom: 2rem;
}

.labs-banner h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.labs-banner p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
}

/* Filter Styles */
.lab-filters {
    background-color: white;
    padding: 2rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 3rem;
}

.filter-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.filter-group {
    display: flex;
    flex-direction: column;
    min-width: 200px;
}

.filter-group label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--dark);
}

.filter-select {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
}

.filter-select:focus {
    outline: none;
    border-color: var(--primary);
}

/* Labs Section */
.labs-section {
    padding: 2rem 0 5rem;
    background-color: var(--light);
}

.labs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.lab-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.lab-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.lab-image {
    height: 200px;
    width: 100%;
    object-fit: cover;
}

.lab-info {
    padding: 1.5rem;
}

.lab-info h3 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    color: var(--dark);
}

.lab-location {
    display: flex;
    align-items: center;
    color: var(--gray);
    margin-bottom: 1rem;
}

.lab-location i {
    margin-right: 0.5rem;
    color: var(--primary);
}

.lab-availability {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: 500;
}

.lab-availability.available {
    color: var(--success);
}

.lab-availability.limited {
    color: #f39c12;
}

.lab-availability.unavailable {
    color: var(--accent);
}

.lab-availability i {
    margin-right: 0.5rem;
}

.lab-specs {
    margin-bottom: 1rem;
}

.lab-specs span {
    display: inline-block;
    background-color: var(--light);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.lab-description {
    margin-bottom: 1.5rem;
    color: #555;
    font-size: 0.95rem;
}

.lab-actions {
    display: flex;
    justify-content: space-between;
}

/* Lab Modal */
.lab-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2000;
}

.modal-content {
    position: relative;
    background-color: white;
    margin: 5% auto;
    padding: 0;
    border-radius: 10px;
    width: 80%;
    max-width: 800px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
    animation: modalOpen 0.4s;
}

@keyframes modalOpen {
    from {opacity: 0; transform: scale(0.8);}
    to {opacity: 1; transform: scale(1);}
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 2rem;
    color: #777;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
}

.close-modal:hover {
    color: var(--accent);
}

.modal-body {
    padding: 0;
}

.modal-header-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
}

.modal-lab-info {
    padding: 2rem;
}

.modal-lab-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.modal-lab-title h2 {
    font-size: 2rem;
    color: var(--dark);
}

.lab-availability-tag {
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-weight: 600;
    font-size: 0.9rem;
}

.available-tag {
    background-color: rgba(46, 204, 113, 0.2);
    color: var(--success);
}

.limited-tag {
    background-color: rgba(243, 156, 18, 0.2);
    color: #f39c12;
}

.unavailable-tag {
    background-color: rgba(231, 76, 60, 0.2);
    color: var(--accent);
}

.modal-lab-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.modal-lab-description {
    line-height: 1.8;
}

.modal-lab-features {
    margin-top: 1.5rem;
}

.modal-lab-features h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: var(--dark);
}

.features-list {
    list-style: none;
}

.features-list li {
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
}

.features-list li i {
    color: var(--primary);
    margin-right: 0.8rem;
    font-size: 1.2rem;
}

.modal-lab-specs {
    background-color: var(--light);
    padding: 1.5rem;
    border-radius: 10px;
}

.modal-lab-specs h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: var(--dark);
}

.specs-item {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0;
    border-bottom: 1px solid #ddd;
}

.specs-item:last-child {
    border-bottom: none;
}

.specs-label {
    font-weight: 600;
    color: var(--dark);
}

.booking-section {
    margin-top: 2rem;
    text-align: center;
}

.modal-cta-text {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

/* Labs CTA Section */
.labs-cta {
    text-align: center;
    padding: 5rem 0;
    background: linear-gradient(rgba(52, 152, 219, 0.9), rgba(52, 152, 219, 0.9)), url('/api/placeholder/1200/600') center/cover;
    color: white;
}

.labs-cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.labs-cta p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.labs-cta .btn {
    background-color: white;
    color: var(--primary);
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
}

.labs-cta .btn:hover {
    background-color: var(--dark);
    color: white;
}

/* Filtered Content Animation */
.filtered-fade {
    animation: filteredFade 0.4s ease-in-out;
}

@keyframes filteredFade {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}

/* Responsive Styles */
@media (max-width: 992px) {
    .modal-lab-details {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .labs-banner h1 {
        font-size: 2.5rem;
    }
    
    .filter-wrapper {
        flex-direction: column;
    }
    
    .filter-group {
        width: 100%;
    }
    
    .modal-content {
        width: 95%;
        margin: 10% auto;
    }
    
    .modal-header-image {
        height: 200px;
    }
}

@media (max-width: 576px) {
    .labs-banner h1 {
        font-size: 2rem;
    }
    
    .labs-banner p {
        font-size: 1rem;
    }
    
    .modal-lab-title {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .lab-availability-tag {
        margin-top: 1rem;
    }
}