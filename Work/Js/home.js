// Homepage Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Doctor Search Tabs
    const searchTabs = document.querySelectorAll('.search-tab');
    
    if (searchTabs.length) {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                searchTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // How It Works Steps
    const steps = document.querySelectorAll('.step');
    const stepPanels = document.querySelectorAll('.step-panel');
    
    if (steps.length && stepPanels.length) {
        steps.forEach(step => {
            step.addEventListener('click', function() {
                const stepNumber = this.getAttribute('data-step');
                
                // Update active step
                steps.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                
                // Update active panel
                stepPanels.forEach(p => p.classList.remove('active'));
                document.querySelector(`.step-panel[data-step="${stepNumber}"]`).classList.add('active');
            });
        });
    }
    
    // Service Card Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-hover').style.opacity = '1';
            this.querySelector('.service-hover').style.visibility = 'visible';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-hover').style.opacity = '0';
            this.querySelector('.service-hover').style.visibility = 'hidden';
        });
    });
    
    // Book Appointment Buttons
    const bookButtons = document.querySelectorAll('.btn-book-appointment');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would redirect to booking page
            // or show a booking modal
            
            // For demo purposes, show a success message
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            alert(`Booking initiated for ${serviceName}. You will be redirected to the booking page.`);
        });
    });
    
    // Emergency Button
    const emergencyBtn = document.getElementById('emergencyBtn');
    
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            // Show emergency modal
            document.getElementById('emergencyModal').style.display = 'flex';
        });
    }
    
    // Emergency Modal
    const emergencyModal = document.getElementById('emergencyModal');
    
    if (emergencyModal) {
        const emergencyOptions = emergencyModal.querySelectorAll('.emergency-option');
        
        emergencyOptions.forEach(option => {
            option.addEventListener('click', function() {
                const optionType = this.getAttribute('data-type');
                
                // Update modal content based on selection
                emergencyModal.querySelector('.emergency-content').style.display = 'none';
                document.getElementById(`emergency-${optionType}`).style.display = 'block';
            });
        });
    }
});