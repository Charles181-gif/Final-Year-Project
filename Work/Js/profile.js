// js/profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (in a real app, you would verify the JWT)
    const user = getUserFromToken();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set user role (patient or doctor)
    const isDoctor = user.role === 'doctor';
    
    // Initialize profile page
    initProfilePage(user);
    
    // Profile section navigation
    const menuItems = document.querySelectorAll('.profile-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section') + 'Section';
            document.querySelectorAll('.profile-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(sectionId).style.display = 'block';
            
            // Show professional section only for doctors
            if (sectionId === 'medicalSection' && isDoctor) {
                document.getElementById('professionalSection').style.display = 'block';
            }
        });
    });
    
    // Edit profile functionality
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            toggleEditMode('personalInfoForm', true);
        });
    }
    
    // Cancel edit buttons
    document.getElementById('cancelPersonalEdit')?.addEventListener('click', () => toggleEditMode('personalInfoForm', false));
    document.getElementById('cancelMedicalEdit')?.addEventListener('click', () => toggleEditMode('medicalInfoForm', false));
    document.getElementById('cancelProfessionalEdit')?.addEventListener('click', () => toggleEditMode('professionalInfoForm', false));
    
    // Form submissions
    document.getElementById('personalInfoForm')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('medicalInfoForm')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('professionalInfoForm')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('securityForm')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('notificationsForm')?.addEventListener('submit', handleFormSubmit);
    
    // Avatar upload
    document.querySelector('.avatar-upload-btn')?.addEventListener('click', function() {
        document.getElementById('avatarUpload').click();
    });
    
    document.getElementById('avatarUpload')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const avatarImage = document.getElementById('avatarImage');
                avatarImage.innerHTML = '';
                avatarImage.style.backgroundImage = `url(${event.target.result})`;
                avatarImage.style.backgroundSize = 'cover';
                
                // In a real app, you would upload this to your server
                console.log('Avatar uploaded:', file);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Helper functions
    function getUserFromToken() {
        // In a real app, you would decode the JWT from localStorage/cookies
        return {
            id: 'user123',
            firstName: 'Akosua',
            lastName: 'Mensah',
            email: 'akosua.mensah@example.com',
            phone: '0241234567',
            role: 'patient',
            // For doctors:
            // role: 'doctor',
            // specialty: 'cardiology',
            // licenseNumber: 'GMC-123456'
        };
    }
    
    function initProfilePage(user) {
        // Set user info in the UI
        document.getElementById('firstNameView').textContent = user.firstName;
        document.getElementById('lastNameView').textContent = user.lastName;
        document.getElementById('emailView').textContent = user.email;
        document.getElementById('phoneView').textContent = user.phone;
        
        // Set avatar initials
        const avatarImage = document.getElementById('avatarImage');
        if (avatarImage && !avatarImage.style.backgroundImage) {
            const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
            avatarImage.textContent = initials;
        }
        
        // Show professional section for doctors
        if (isDoctor) {
            const medicalSection = document.getElementById('medicalSection');
            if (medicalSection) {
                medicalSection.insertAdjacentHTML('afterend', `
                    <div class="profile-section" id="professionalSection" style="display: none;">
                        <!-- Doctor professional info would be here -->
                    </div>
                `);
            }
        }
    }
    
    function toggleEditMode(formId, editMode) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const viewElements = form.querySelectorAll('.view-mode');
        const editElements = form.querySelectorAll('.edit-mode');
        const formActions = form.querySelector('.form-actions');
        
        if (editMode) {
            viewElements.forEach(el => el.style.display = 'none');
            editElements.forEach(el => el.style.display = 'block');
            if (formActions) formActions.style.display = 'flex';
        } else {
            viewElements.forEach(el => el.style.display = 'block');
            editElements.forEach(el => el.style.display = 'none');
            if (formActions) formActions.style.display = 'none';
        }
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        submitButton.disabled = true;
        
        try {
            // In a real app, you would send this to your backend
            const response = await mockApiCall('/api/update-profile', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // Update view mode with new values
            if (form.id === 'personalInfoForm') {
                document.getElementById('firstNameView').textContent = data.firstName;
                document.getElementById('lastNameView').textContent = data.lastName;
                document.getElementById('emailView').textContent = data.email;
                document.getElementById('phoneView').textContent = data.phone;
                document.getElementById('dobView').textContent = new Date(data.dob).toLocaleDateString();
                document.getElementById('genderView').textContent = 
                    data.gender === 'female' ? 'Female' : 
                    data.gender === 'male' ? 'Male' : 
                    data.gender === 'other' ? 'Other' : 'Prefer not to say';
                document.getElementById('addressView').textContent = data.address;
            }
            
            // Show success message
            alert('Profile updated successfully!');
            toggleEditMode(form.id, false);
        } catch (error) {
            alert('Error updating profile: ' + error.message);
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    // Mock API function
    async function mockApiCall(url, options) {
        console.log('Mock API call:', url, options);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { status: 'success' };
    }
});