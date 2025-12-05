// Disable all Chart.js animations for performance
if (typeof Chart !== 'undefined') {
    Chart.defaults.animation = false;
    Chart.defaults.animations = false;
}

//feedback
document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();
    this.reset();
});

document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const popup = document.getElementById('thankYouPopup');
    popup.style.display = 'block';
    this.reset();
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('efficiencyChart');
    const efficiencyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Energy Efficiency Index',
                data: [100, 108, 115, 125, 135, 150],
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.3,
                borderWidth: 3,
                pointBackgroundColor: '#FF6384',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Energy Efficiency Trends',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20,
                    color: '#2c3e50'
                },
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c3e50',
                    bodyColor: '#2c3e50',
                    borderColor: '#FF6384',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Efficiency Index: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 90,
                    max: 160,
                    title: {
                        display: true,
                        text: 'Efficiency Index',
                        font: {
                            weight: 'bold',
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('transportChart');
    const transportChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Car', 'Bus', 'Train', 'Bicycle', 'Walking'],
            datasets: [{
                label: 'CO2 Emissions (g/km/person)',
                data: [192, 104, 41, 16, 0],
                backgroundColor: [
                    '#FF6384',  // Red for Car
                    '#36A2EB',  // Blue for Bus
                    '#FFCE56',  // Yellow for Train
                    '#4BC0C0',  // Teal for Bicycle
                    '#9966FF'   // Purple for Walking
                ],
                borderWidth: 2,
                borderRadius: 5,
                borderColor: 'rgba(255, 255, 255, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Transport CO2 Emissions Comparison',
                    font: {
                        size: 18,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw} g/km/person`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'CO2 Emissions (g/km/person)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('recyclingStats');
    const recyclingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Global Recycling Rate',
                data: [32, 35, 38, 42, 45],
                backgroundColor: '#FF6384',
                borderWidth: 2,
                borderRadius: 5,
                categoryPercentage: 0.8,
                barPercentage: 0.7
            }, {
                label: 'Plastic Recycling Rate',
                data: [20, 22, 25, 28, 30],
                backgroundColor: '#36A2EB',
                borderWidth: 2,
                borderRadius: 5,
                categoryPercentage: 0.8,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Recycling Progress (2019-2023)',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#333',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    title: {
                        display: true,
                        text: 'Recycling Rate (%)',
                        font: {
                            weight: 'bold',
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
});
 
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('wasteCompositionChart');
    const wasteChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Organic Waste', 'Paper', 'Plastic', 'Glass', 'Metal', 'Other Materials'],
            datasets: [{
                data: [44, 17, 12, 5, 4, 18],
                backgroundColor: [
                    '#FF6384',  // Pink for Organic
                    '#36A2EB',  // Blue for Paper
                    '#FFCE56',  // Yellow for Plastic
                    '#4BC0C0',  // Teal for Glass
                    '#9966FF',  // Purple for Metal
                    '#FF9F40'   // Orange for Other
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Global Waste Distribution',
                    font: {
                        size: 22,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 25,
                    color: '#2c3e50'
                },
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c3e50',
                    bodyColor: '#2c3e50',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
});
   
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('recyclingImpactChart');
    const impactChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Energy Savings', 'Water Conservation', 'CO2 Reduction'],
            datasets: [{
                label: 'Environmental Impact (%)',
                data: [65, 40, 70],
                backgroundColor: [
                    '#FF6384',  // Energy
                    '#36A2EB',  // Water
                    '#4BC0C0'   // CO2
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderColor: '#ffffff',
                barThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Recycling Environmental Benefits',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c3e50',
                    bodyColor: '#2c3e50',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `Impact: ${context.raw}% reduction`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Reduction Percentage (%)',
                        font: {
                            weight: 'bold',
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('renewableEnergyChart');
    const energyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Solar Energy (GW)',
                data: [480, 586, 714, 849, 971, 1100],
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Wind Energy (GW)',
                data: [540, 623, 733, 825, 907, 1000],
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Hydropower (GW)',
                data: [1132, 1190, 1230, 1300, 1350, 1400],
                borderColor: '#4BC0C0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Renewable Energy Growth',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Installed Capacity (GW)',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('waterConservationChart');
    const waterChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Water Saved (Billion Cubic Meters)',
                data: [15, 22, 28, 35, 42, 50],
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#36A2EB',
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Energy Reduction in Treatment (TWh)',
                data: [10, 15, 20, 25, 30, 35],
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#FF6384',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Global Water Conservation Impact',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c3e50',
                    bodyColor: '#2c3e50',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volume & Energy',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('biodiversityChart');
    const biodiversityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Plants', 'Mammals', 'Birds', 'Fish', 'Amphibians', 'Reptiles'],
            datasets: [{
                label: 'Species Recovery Rate (%)',
                data: [33, 26, 22, 18, 15, 20],
                backgroundColor: [
                    '#4BC0C0',  // Teal for Plants
                    '#FF6384',  // Pink for Mammals
                    '#36A2EB',  // Blue for Birds
                    '#FFCE56',  // Yellow for Fish
                    '#9966FF',  // Purple for Amphibians
                    '#FF9F40'   // Orange for Reptiles
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Wildlife Conservation Success Rates',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c3e50',
                    bodyColor: '#2c3e50',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `Recovery Rate: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40,
                    title: {
                        display: true,
                        text: 'Recovery Rate (%)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('airQualityChart');
    const airQualityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Air Quality Index',
                data: [150, 135, 120, 110, 105, 100],
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#FF6384',
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Pollution Reduction (%)',
                data: [0, 10, 20, 27, 30, 33],
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#36A2EB',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Air Quality Improvement Trends',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c3e50',
                    bodyColor: '#2c3e50',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label;
                            const value = context.raw;
                            return `${label}: ${value}${label.includes('%') ? '%' : ''}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Index Value & Reduction %',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
});

