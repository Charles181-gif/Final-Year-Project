// Enhanced Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Service Search Functionality
    const serviceSearch = document.getElementById('serviceSearch');
    const searchButton = document.getElementById('searchButton');
    
    function searchServices() {
        const searchTerm = serviceSearch.value.toLowerCase();
        if (!searchTerm) return;
        
        // Highlight matching services
        document.querySelectorAll('.service-text h2, .service-features li').forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Temporarily highlight
                const originalBg = element.style.backgroundColor;
                element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
                
                setTimeout(() => {
                    element.style.backgroundColor = originalBg;
                }, 2000);
            }
        });
    }
    
    searchButton.addEventListener('click', searchServices);
    serviceSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchServices();
    });
    
    // Enhanced Category Tabs with History
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    function showCategory(category) {
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.category-tab[data-category="${category}"]`).classList.add('active');
        
        // Show corresponding content
        document.querySelectorAll('.category-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelector(`.category-content[data-category="${category}"]`).classList.add('active');
        
        // Update URL without reload
        history.pushState(null, null, `#${category}`);
    }
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategory(category);
        });
    });
    
    // Check URL hash on load
    if (window.location.hash) {
        const category = window.location.hash.substring(1);
        const tab = document.querySelector(`.category-tab[data-category="${category}"]`);
        if (tab) showCategory(category);
    }
    
    // Doctor Availability Data
    const doctorsData = [
        {
            id: 1,
            name: "Dr. Ama Mensah",
            specialty: "General Practitioner",
            avatar: "images/doctor1.jpg",
            availableSlots: ["09:00", "11:30", "14:00", "16:30"]
        },
        {
            id: 2,
            name: "Dr. Kwesi Boateng",
            specialty: "Telemedicine Specialist",
            avatar: "images/doctor2.jpg",
            availableSlots: ["10:15", "13:45", "15:30"]
        },
        {
            id: 3,
            name: "Dr. Esi Nyarko",
            specialty: "Family Medicine",
            avatar: "images/doctor3.jpg",
            availableSlots: ["08:30", "12:00", "14:45"]
        }
    ];
    
    // Populate Doctor Availability
    function populateDoctorAvailability() {
        const container = document.querySelector('.availability-cards');
        if (!container) return;
        
        container.innerHTML = '';
        
        doctorsData.forEach(doctor => {
            const card = document.createElement('div');
            card.className = 'availability-card';
            card.innerHTML = `
                <img src="${doctor.avatar}" alt="${doctor.name}" class="doctor-avatar">
                <div class="doctor-info">
                    <h4>${doctor.name}</h4>
                    <div class="doctor-specialty">${doctor.specialty}</div>
                    <div class="available-slots">
                        ${doctor.availableSlots.map(slot => 
                            `<button class="slot-btn" data-doctor="${doctor.id}" data-time="${slot}">${slot}</button>`
                        ).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
    
    populateDoctorAvailability();
    
    // Service Comparison Data
    const comparisonData = {
        features: [
            "Consultation Time",
            "Emergency Availability",
            "Lab Test Integration",
            "Family Coverage",
            "Prescription Services",
            "Follow-up Support"
        ],
        services: {
            "General Health": [true, false, true, false, true, false],
            "Specialist Care": [true, false, true, false, true, true],
            "Telemedicine": [true, true, true, true, true, true],
            "Emergency": [false, true, true, false, true, false]
        }
    };
    
    // Populate Service Comparison Table
    function populateComparisonTable() {
        const tbody = document.querySelector('.comparison-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        comparisonData.features.forEach((feature, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="feature-name">${feature}</td>`;
            
            Object.keys(comparisonData.services).forEach(service => {
                const isAvailable = comparisonData.services[service][index];
                row.innerHTML += `
                    <td class="${isAvailable ? 'available' : 'not-available'}">
                        ${isAvailable ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>'}
                    </td>
                `;
            });
            
            tbody.appendChild(row);
        });
    }
    
    populateComparisonTable();
    
    // Plan Comparison Toggle
    const planToggleBtns = document.querySelectorAll('.toggle-btn');
    const planCardsView = document.getElementById('planCardsView');
    const planTableView = document.getElementById('planTableView');
    
    planToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            planToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'cards') {
                planCardsView.style.display = 'block';
                planTableView.style.display = 'none';
            } else {
                planCardsView.style.display = 'none';
                planTableView.style.display = 'block';
                populatePlanComparisonTable();
            }
        });
    });
    
    // Populate Plan Comparison Table
    function populatePlanComparisonTable() {
        const table = document.querySelector('.plan-comparison-table');
        if (!table) return;
        
        // Clear existing content except headers
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        
        // Sample plan data
        const plans = [
            {
                name: "Basic Care",
                price: "GH₵50/month",
                consultations: "2 General/month",
                specialist: "Not included",
                emergency: "24/7 Advice line",
                tests: "Discounted",
                family: "Not included"
            },
            {
                name: "Family Care",
                price: "GH₵150/month",
                consultations: "4 General/month",
                specialist: "2 Specialist/year",
                emergency: "24/7 Support",
                tests: "Basic included",
                family: "Up to 4 members",
                popular: true
            },
            {
                name: "Comprehensive Care",
                price: "GH₵300/month",
                consultations: "Unlimited General",
                specialist: "6 Specialist/year",
                emergency: "Priority Support",
                tests: "Comprehensive",
                family: "Full coverage"
            }
        ];
        
        // Add plan rows
        plans.forEach(plan => {
            const row = table.insertRow();
            row.className = plan.popular ? 'popular-plan' : '';
            
            row.innerHTML = `
                <td class="plan-name">${plan.name}</td>
                <td>${plan.price}</td>
                <td>${plan.consultations}</td>
                <td>${plan.specialist}</td>
                <td>${plan.emergency}</td>
                <td>${plan.tests}</td>
                <td>${plan.family}</td>
                <td><button class="btn btn-sm ${plan.popular ? 'btn-primary' : 'btn-outline'}">Choose</button></td>
            `;
        });
    }
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentTestimonial = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    let carouselInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    // FAQ Search
    const faqSearch = document.getElementById('faqSearch');
    faqSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (!searchTerm) {
            faqItems.forEach(item => item.style.display = 'block');
            return;
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                
                // Open matching FAQs
                const answer = item.querySelector('.faq-answer');
                if (!answer.classList.contains('active')) {
                    item.querySelector('.faq-question').click();
                }
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Enhanced Booking Modal
    const bookingModal = document.getElementById('bookingModal');
    const modalClose = document.querySelector('.modal-close');
    const bookServiceBtns = document.querySelectorAll('.book-service');
    
    function openBookingModal(serviceName, servicePrice) {
        document.getElementById('serviceName').value = serviceName;
        document.getElementById('servicePrice').value = servicePrice;
        document.querySelector('.modal-title').textContent = `Book ${serviceName}`;
        
        // Generate time slots
        const timeSelect = document.getElementById('appointmentTime');
        timeSelect.innerHTML = '<option value="">Select a time</option>';
        
        const startHour = 8;
        const endHour = 17;
        const interval = 30; // minutes
        
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            }
        }
        
        bookingModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    bookServiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.price-card');
            const serviceName = card.querySelector('h4').textContent;
            const servicePrice = card.querySelector('.price').textContent;
            openBookingModal(serviceName, servicePrice);
        });
    });
    
    // Doctor slot booking
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('slot-btn') && !e.target.classList.contains('booked')) {
            const doctorId = e.target.dataset.doctor;
            const time = e.target.dataset.time;
            
            // In a real app, this would check availability with the server
            e.target.classList.add('booked');
            e.target.textContent += ' (Booked)';
            
            openBookingModal("Doctor Consultation", "GH₵80");
            document.getElementById('appointmentTime').value = time;
        }
    });
    
    modalClose.addEventListener('click', function() {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const serviceName = formData.get('service-name');
            const patientName = formData.get('patient-name');
            const date = formData.get('appointment-date');
            const time = formData.get('appointment-time');
            
            // In a real implementation, this would send to backend
            alert(`Booking confirmed for ${patientName}\nService: ${serviceName}\nDate: ${date} at ${time}`);
            
            // Close modal
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.reset();
        });
    }
    
    // Set minimum date for appointment (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;
});