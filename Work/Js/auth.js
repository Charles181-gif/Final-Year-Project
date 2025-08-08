// js/auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Common elements
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            let strength = 0;
            
            // Reset
            strengthBars.forEach(bar => bar.style.backgroundColor = '#e3ebf6');
            
            // Check password strength
            if (password.length >= 8) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^A-Za-z0-9]/)) strength++;
            
            // Update UI
            for (let i = 0; i < strength; i++) {
                let color;
                if (strength === 1) color = '#e63757'; // Weak
                else if (strength === 2) color = '#f6c343'; // Moderate
                else if (strength === 3) color = '#2c7be5'; // Good
                else if (strength === 4) color = '#00d97e'; // Strong
                
                strengthBars[i].style.backgroundColor = color;
            }
            
            const messages = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
            strengthText.textContent = messages[strength];
        });
    }
    
    // Registration form handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        // Toggle doctor fields
        const userTypeRadios = document.querySelectorAll('input[name="userType"]');
        const doctorFields = document.getElementById('doctorFields');
        
        userTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'doctor') {
                    doctorFields.style.display = 'block';
                } else {
                    doctorFields.style.display = 'none';
                }
            });
        });
        
        // Form submission
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const userData = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (userData.password !== userData.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (!userData.terms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitButton.disabled = true;
            
            try {
                // In a real app, you would send this to your backend
                const response = await mockApiCall('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                // Handle successful registration
                alert('Account created successfully! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            } catch (error) {
                alert('Registration failed: ' + error.message);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const credentials = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitButton.disabled = true;
            
            try {
                // In a real app, you would send this to your backend
                const response = await mockApiCall('/api/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                // Handle successful login
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            } catch (error) {
                alert('Login failed: ' + error.message);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Mock API function for demonstration
    async function mockApiCall(url, options) {
        console.log('Mock API call:', url, options);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate successful response for demo purposes
        if (url === '/api/register') {
            return { status: 'success', user: JSON.parse(options.body) };
        } else if (url === '/api/login') {
            const body = JSON.parse(options.body);
            if (body.email === 'doctor@example.com') {
                return { 
                    status: 'success', 
                    user: {
                        id: 'doc123',
                        firstName: 'Kwame',
                        lastName: 'Osei',
                        email: 'doctor@example.com',
                        role: 'doctor',
                        specialty: 'cardiology'
                    },
                    token: 'mock-jwt-token'
                };
            } else {
                return { 
                    status: 'success', 
                    user: {
                        id: 'pat123',
                        firstName: 'Akosua',
                        lastName: 'Mensah',
                        email: 'patient@example.com',
                        role: 'patient'
                    },
                    token: 'mock-jwt-token'
                };
            }
        }
        
        // Simulate error for demo purposes
        throw new Error('Network error or invalid credentials');
    }
});