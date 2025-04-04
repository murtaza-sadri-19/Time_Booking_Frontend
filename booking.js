// DOM Elements
const labNameInput = document.getElementById('labName');
const bookingCalendar = document.getElementById('bookingCalendar');
const timeSlotsList = document.getElementById('timeSlotsList');
const monthYearDisplay = document.getElementById('monthYearDisplay');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const summaryLabName = document.getElementById('summaryLabName');
const summaryDate = document.getElementById('summaryDate');
const summaryTime = document.getElementById('summaryTime');
const summaryDuration = document.getElementById('summaryDuration');
const termsAgreeCheckbox = document.getElementById('termsAgree');
const confirmBookingBtn = document.getElementById('confirmBookingBtn');
const bookingConfirmationModal = document.getElementById('bookingConfirmationModal');
const confirmationLab = document.getElementById('confirmationLab');
const confirmationDateTime = document.getElementById('confirmationDateTime');
const confirmationId = document.getElementById('confirmationId');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Calendar variables
let currentDate = new Date();
let selectedDate = null;
let selectedTimeSlot = null;
let selectedLab = null;

// Initialize booking page
document.addEventListener('DOMContentLoaded', function() {
    // Get lab ID from URL if present
    const labId = getUrlParameter('lab');
    if (labId && window.labsData) {
        const lab = window.labsData.find(lab => lab.id === parseInt(labId));
        if (lab) {
            selectedLab = lab;
            labNameInput.value = lab.name;
            updateBookingSummary();
        }
    }

    // Initialize the calendar
    renderCalendar();
    
    // Add event listeners
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
    
    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            if (!validateBookingForm()) {
                return;
            }
            
            // Update confirmation modal details
            if (confirmationLab) {
                confirmationLab.textContent = selectedLab ? selectedLab.name : labNameInput.value;
            }
            
            if (confirmationDateTime) {
                confirmationDateTime.textContent = `${formatDate(selectedDate)} | ${selectedTimeSlot}`;
            }
            
            // Generate a random booking ID
            if (confirmationId) {
                const randomNum = Math.floor(1000 + Math.random() * 9000);
                const today = new Date();
                const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
                confirmationId.textContent = `MP-CL-${formattedDate}${randomNum}`;
            }
            
            // Show confirmation modal
            if (bookingConfirmationModal) {
                bookingConfirmationModal.style.display = 'block';
            }
        });
    }
    
    // Close modal when clicking X
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookingConfirmationModal) {
            bookingConfirmationModal.style.display = 'none';
        }
    });
    
    // When lab name changes, update summary
    if (labNameInput) {
        labNameInput.addEventListener('input', function() {
            if (!selectedLab) {
                updateBookingSummary();
            }
        });
    }
});

// Render the calendar for current month
function renderCalendar() {
    if (!bookingCalendar) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (monthYearDisplay) {
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Create calendar grid
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    bookingCalendar.innerHTML = '';
    
    // Create weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day weekday';
        dayHeader.textContent = day;
        bookingCalendar.appendChild(dayHeader);
    });
    
    // Create empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        bookingCalendar.appendChild(emptyDay);
    }
    
    // Create days of the month
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const calendarDay = document.createElement('div');
        calendarDay.className = 'calendar-day';
        calendarDay.textContent = day;
        
        const calendarDate = new Date(year, month, day);
        
        // Check if this day is before today
        if (calendarDate < new Date(currentYear, currentMonth, currentDay)) {
            calendarDay.classList.add('disabled');
        } else {
            calendarDay.classList.add('available');
            
            // Check if this is the selected date
            if (selectedDate && 
                selectedDate.getDate() === day && 
                selectedDate.getMonth() === month && 
                selectedDate.getFullYear() === year) {
                calendarDay.classList.add('selected');
            }
            
            // Add click event to available days
            calendarDay.addEventListener('click', function() {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Update selected date
                selectedDate = new Date(year, month, day);
                
                // Update date display
                if (selectedDateDisplay) {
                    selectedDateDisplay.textContent = `for ${formatDate(selectedDate)}`;
                }
                
                // Generate time slots
                generateTimeSlots();
                
                // Update booking summary
                updateBookingSummary();
            });
        }
        
        bookingCalendar.appendChild(calendarDay);
    }
}

// Generate time slots for selected date
function generateTimeSlots() {
    if (!timeSlotsList) return;
    
    // Clear existing time slots
    timeSlotsList.innerHTML = '';
    
    // Reset selected time slot
    selectedTimeSlot = null;
    
    // Example time slots - in a real app, these would be fetched from a server
    // based on the selected lab and date
    const availableSlots = [
        '9:00 AM - 11:00 AM',
        '11:00 AM - 1:00 PM',
        '1:00 PM - 3:00 PM',
        '3:00 PM - 5:00 PM',
        '5:00 PM - 7:00 PM'
    ];
    
    // Create time slot elements
    availableSlots.forEach(slot => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = slot;
        
        timeSlot.addEventListener('click', function() {
            // Remove selected class from all time slots
            document.querySelectorAll('.time-slot.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Add selected class to clicked time slot
            this.classList.add('selected');
            
            // Update selected time slot
            selectedTimeSlot = slot;
            
            // Update booking summary
            updateBookingSummary();
        });
        
        timeSlotsList.appendChild(timeSlot);
    });
}

// Update booking summary
function updateBookingSummary() {
    if (summaryLabName) {
        summaryLabName.textContent = selectedLab ? selectedLab.name : (labNameInput ? labNameInput.value : '-');
    }
    
    if (summaryDate) {
        summaryDate.textContent = selectedDate ? formatDate(selectedDate) : '-';
    }
    
    if (summaryTime) {
        summaryTime.textContent = selectedTimeSlot || '-';
    }
}

// Validate booking form
function validateBookingForm() {
    let isValid = true;
    
    // Check if lab name is provided
    if (!labNameInput.value.trim()) {
        alert('Please enter a lab name');
        isValid = false;
    }
    
    // Check if date is selected
    if (!selectedDate) {
        alert('Please select a date');
        isValid = false;
    }
    
    // Check if time slot is selected
    if (!selectedTimeSlot) {
        alert('Please select a time slot');
        isValid = false;
    }
    
    // Check if terms are agreed
    if (!termsAgreeCheckbox.checked) {
        alert('Please agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

// Format date as "Day, Month DD, YYYY"
function formatDate(date) {
    if (!date) return '';
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${dayName}, ${monthName} ${day}, ${year}`;
}