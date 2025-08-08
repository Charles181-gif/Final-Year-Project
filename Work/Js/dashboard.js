// js/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Notification dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.createElement('div');
    notificationDropdown.className = 'notification-dropdown';
    notificationDropdown.innerHTML = `
        <div class="dropdown-header">
            <h4>Notifications</h4>
            <button class="mark-all-read">Mark all as read</button>
        </div>
        <div class="notification-list">
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="notification-content">
                    <p>Your appointment with Dr. Asante is confirmed for tomorrow at 10:30 AM</p>
                    <span class="notification-time">2 hours ago</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-pills"></i>
                </div>
                <div class="notification-content">
                    <p>Reminder to take your Amlodipine medication</p>
                    <span class="notification-time">5 hours ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-file-medical"></i>
                </div>
                <div class="notification-content">
                    <p>Your lab test results are now available</p>
                    <span class="notification-time">1 day ago</span>
                </div>
            </div>
        </div>
        <div class="dropdown-footer">
            <a href="#">View all notifications</a>
        </div>
    `;
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const existingDropdown = document.querySelector('.notification-dropdown');
            
            if (existingDropdown) {
                existingDropdown.remove();
            } else {
                notificationBtn.parentNode.appendChild(notificationDropdown);
                
                // Mark as read functionality
                const markAllRead = notificationDropdown.querySelector('.mark-all-read');
                const unreadItems = notificationDropdown.querySelectorAll('.unread');
                
                markAllRead.addEventListener('click', function() {
                    unreadItems.forEach(item => {
                        item.classList.remove('unread');
                    });
                    document.querySelector('.notification-badge').style.display = 'none';
                });
            }
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.notification-dropdown');
        if (dropdown) {
            dropdown.remove();
        }
    });
    
    // Testimonial slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialDots.length > 0) {
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const testimonialId = this.getAttribute('data-testimonial');
                
                // Remove active class from all
                document.querySelectorAll('.testimonial').forEach(t => {
                    t.classList.remove('active');
                });
                testimonialDots.forEach(d => {
                    d.classList.remove('active');
                });
                
                // Add active class to selected
                document.getElementById(`testimonial${testimonialId}`).classList.add('active');
                this.classList.add('active');
            });
        });
    }
    
    // Chart simulation (in a real app, you would use Chart.js or similar)
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    
    chartPlaceholders.forEach(chart => {
        chart.addEventListener('click', function() {
            this.textContent = 'Chart loaded...';
            setTimeout(() => {
                this.innerHTML = '<canvas class="chart-canvas"></canvas>';
                // In a real implementation, you would initialize the chart here
            }, 500);
        });
    });
    
    // Medication log dose functionality
    const logDoseButtons = document.querySelectorAll('.medication-actions .btn-outline:first-child');
    
    logDoseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const medicationName = this.closest('.medication-card').querySelector('h4').textContent;
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Log Dose for ${medicationName}</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Date & Time</label>
                            <input type="datetime-local" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Dose Taken</label>
                            <input type="text" class="form-control" value="5mg" readonly>
                        </div>
                        <div class="form-group">
                            <label>Notes (Optional)</label>
                            <textarea class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline close-modal">Cancel</button>
                        <button class="btn btn-primary">Confirm</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal functionality
            const closeButtons = modal.querySelectorAll('.close-modal');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    modal.remove();
                    document.body.style.overflow = '';
                });
            });
            
            // Confirm button functionality
            const confirmBtn = modal.querySelector('.btn-primary');
            confirmBtn.addEventListener('click', function() {
                // In a real app, you would save this data
                modal.remove();
                document.body.style.overflow = '';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success';
                successMsg.textContent = `Dose of ${medicationName} logged successfully!`;
                document.querySelector('.dashboard-content').prepend(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            });
        });
    });
});