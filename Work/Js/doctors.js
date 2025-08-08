// Doctors Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Doctor Filtering
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const filterSelects = document.querySelectorAll('.filter-options select');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    if (applyFiltersBtn && resetFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterDoctors);
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    // Sort Doctors
    const sortBySelect = document.getElementById('sortBy');
    
    if (sortBySelect) {
        sortBySelect.addEventListener('change', sortDoctors);
    }
    
    // Doctor Card Click
    doctorCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button or link
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                return;
            }
            
            // Toggle details visibility
            const details = this.querySelector('.doctor-details');
            if (details) {
                details.classList.toggle('show');
            }
        });
    });
    
    // Book Appointment Buttons
    const bookButtons = document.querySelectorAll('.btn-book');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const doctorCard = this.closest('.doctor-card');
            const doctorName = doctorCard.querySelector('h3').textContent;
            const doctorSpecialty = doctorCard.querySelector('.specialty').textContent;
            
            // In a real implementation, this would open a booking modal or page
            alert(`Booking appointment with ${doctorName} (${doctorSpecialty})`);
        });
    });
    
    // Pagination
    const pageNumbers = document.querySelectorAll('.page-number');
    const pageNavs = document.querySelectorAll('.page-nav');
    
    pageNumbers.forEach(number => {
        number.addEventListener('click', function() {
            pageNumbers.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, this would load the selected page
        });
    });
    
    pageNavs.forEach(nav => {
        nav.addEventListener('click', function() {
            if (this.disabled) return;
            
            // In a real implementation, this would navigate pages
        });
    });
    
    // Filter Doctors Function
    function filterDoctors() {
        const filters = {
            specialty: document.getElementById('specialty').value,
            location: document.getElementById('location').value,
            language: document.getElementById('language').value,
            availability: document.getElementById('availability').value
        };
        
        doctorCards.forEach(card => {
            const cardSpecialty = card.getAttribute('data-specialty');
            const cardLocation = card.getAttribute('data-location');
            const cardLanguages = card.getAttribute('data-languages').split(',');
            const cardAvailability = card.getAttribute('data-availability');
            
            const matchesSpecialty = !filters.specialty || cardSpecialty === filters.specialty;
            const matchesLocation = !filters.location || cardLocation === filters.location;
            const matchesLanguage = !filters.language || cardLanguages.includes(filters.language);
            const matchesAvailability = !filters.availability || cardAvailability.includes(filters.availability);
            
            if (matchesSpecialty && matchesLocation && matchesLanguage && matchesAvailability) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Reset Filters Function
    function resetFilters() {
        filterSelects.forEach(select => {
            select.value = '';
        });
        
        doctorCards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        });
    }
    
    // Sort Doctors Function
    function sortDoctors() {
        const sortBy = this.value;
        const container = document.querySelector('.doctors-grid');
        const cards = Array.from(container.querySelectorAll('.doctor-card'));
        
        cards.sort((a, b) => {
            if (sortBy === 'rating') {
                const ratingA = parseFloat(a.querySelector('.rating span').textContent.match(/\d+\.?\d*/)[0]);
                const ratingB = parseFloat(b.querySelector('.rating span').textContent.match(/\d+\.?\d*/)[0]);
                return ratingB - ratingA;
            } else if (sortBy === 'experience') {
                const expA = parseInt(a.querySelector('.doctor-info .info-item:nth-child(2)').textContent.match(/\d+/)[0]);
                const expB = parseInt(b.querySelector('.doctor-info .info-item:nth-child(2)').textContent.match(/\d+/)[0]);
                return expB - expA;
            } else if (sortBy === 'price') {
                const priceA = parseFloat(a.querySelector('.service-price').textContent.match(/\d+\.?\d*/)[0]);
                const priceB = parseFloat(b.querySelector('.service-price').textContent.match(/\d+\.?\d*/)[0]);
                return priceA - priceB;
            } else if (sortBy === 'price-desc') {
                const priceA = parseFloat(a.querySelector('.service-price').textContent.match(/\d+\.?\d*/)[0]);
                const priceB = parseFloat(b.querySelector('.service-price').textContent.match(/\d+\.?\d*/)[0]);
                return priceB - priceA;
            }
            return 0;
        });
        
        // Re-append sorted cards
        cards.forEach(card => container.appendChild(card));
    }
});