// Carbon Footprint Calculator
function calculateFootprint() {
    const miles = parseFloat(document.getElementById('miles').value) || 0;
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const flights = parseFloat(document.getElementById('flights').value) || 0;
    const meat = parseFloat(document.getElementById('meat').value) || 0;

    // Calculate emissions (in tons CO2/year)
    const carEmissions = (miles * 12 * 0.404) / 1000; // 0.404 kg CO2 per mile
    const electricityEmissions = (electricity * 12 * 0.42) / 1000; // 0.42 kg CO2 per kWh
    const flightEmissions = flights * 0.90; // 0.90 tons per round-trip flight
    const meatEmissions = (meat * 52 * 6.61) / 1000; // 6.61 kg CO2 per meat meal

    const totalEmissions = carEmissions + electricityEmissions + flightEmissions + meatEmissions;

    // Display result
    const resultDiv = document.getElementById('footprintResult');
    const resultNumber = resultDiv.querySelector('.result-number');
    const resultComparison = resultDiv.querySelector('.result-comparison');

    // Animate number
    animateValue(resultNumber, 0, totalEmissions.toFixed(1), 1000);

    // Add comparison
    const avgEmissions = 16; // US average
    const difference = ((totalEmissions - avgEmissions) / avgEmissions * 100).toFixed(0);
    
    if (totalEmissions < avgEmissions) {
        resultComparison.innerHTML = `
            <span style="color: #4ade80;">✓ ${Math.abs(difference)}% below US average</span><br>
            <small>Equivalent to ${Math.round(totalEmissions / 0.048)} trees needed to offset</small>
        `;
    } else {
        resultComparison.innerHTML = `
            <span style="color: #fb923c;">↑ ${difference}% above US average</span><br>
            <small>Equivalent to ${Math.round(totalEmissions / 0.048)} trees needed to offset</small>
        `;
    }

    resultDiv.style.display = 'block';
}

// Animate counter values
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 16);
}

// Checklist Progress Tracker
function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    const checked = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked').length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);

    document.getElementById('checklistProgress').textContent = percentage + '%';
    document.getElementById('progressBar').style.width = percentage + '%';

    // Save to localStorage
    localStorage.setItem('climateChecklistProgress', percentage);
    
    // Show achievement notification
    if (percentage === 100 && !localStorage.getItem('achievementShown')) {
        showNotification('🎉 Congratulations! You\'ve completed all climate actions!', 'success');
        localStorage.setItem('achievementShown', 'true');
    }
}

// Initialize checklist listeners
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateChecklistProgress);
    });

    // Load saved progress
    const savedProgress = localStorage.getItem('climateChecklistProgress');
    if (savedProgress) {
        document.getElementById('checklistProgress').textContent = savedProgress + '%';
        document.getElementById('progressBar').style.width = savedProgress + '%';
    }
});

// Did You Know Carousel
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.fact-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlideIndex = (index + slides.length) % slides.length;
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
    showSlide(index);
}

// Auto-rotate carousel
setInterval(() => {
    showSlide(currentSlideIndex + 1);
}, 5000);

// Temperature Chart
function createTemperatureChart() {
    const ctx = document.getElementById('temperatureChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1880', '1900', '1920', '1940', '1960', '1980', '2000', '2020', '2023'],
            datasets: [{
                label: 'Temperature Anomaly (°C)',
                data: [-0.16, -0.08, -0.25, 0.10, 0.00, 0.26, 0.61, 1.02, 1.48],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#e2e8f0',
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });
}

// Animate fact boxes on scroll
function animateFactBoxes() {
    const factBoxes = document.querySelectorAll('.fact-box');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate the number
                    const numberElement = entry.target.querySelector('.fact-number');
                    const target = parseFloat(numberElement.dataset.target);
                    animateValue(numberElement, 0, target, 2000);
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    factBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = 'all 0.6s ease';
        observer.observe(box);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createTemperatureChart();
    animateFactBoxes();
    
    // Trigger initial calculation
    if (document.getElementById('footprintResult')) {
        calculateFootprint();
    }
});

// Show notification helper
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
