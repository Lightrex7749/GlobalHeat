// Energy Consumption Chart
AOS.init({
    duration: 1000,
    once: true
}); 

const energyCtx = document.getElementById('energyConsumptionChart').getContext('2d');
new Chart(energyCtx, {
    type: 'bar',
    data: {
        labels: ['Fossil Fuel Dependency', 'Renewable Energy Adoption', 'Nuclear Power Usage'],
        datasets: [{
            label: 'Energy Distribution (%)',
            data: [63, 27, 10],
            backgroundColor: [
                '#E74C3C',  // Red for fossil fuels
                '#27AE60',  // Green for renewables
                '#3498DB'   // Blue for nuclear
            ],
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 80
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Global Energy Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Percentage (%)',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    }
});

// Vehicle Emissions Chart
const vehicleCtx = document.getElementById('vehicleEmissionsChart').getContext('2d');
new Chart(vehicleCtx, {
    type: 'doughnut',
    data: {
        labels: ['Road Vehicles', 'Aviation', 'Shipping'],
        datasets: [{
            data: [72, 11, 14],
            backgroundColor: [
                '#FF6384',  // Red for road vehicles
                '#36A2EB',  // Blue for aviation
                '#4BC0C0'   // Teal for shipping
            ],
            borderWidth: 2,
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Transport Emissions Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1500
        }
    }
});



const cropEmissionsCtx = document.getElementById('cropEmissionsChart').getContext('2d');
new Chart(cropEmissionsCtx, {
    type: 'pie',
    data: {
        labels: [
            'Rice Cultivation', 
            'Synthetic Fertilizers', 
            'Soil Management'
        ],
        datasets: [{
            data: [29, 13, 28],
            backgroundColor: [
                '#FFD700',  // Gold for rice
                '#32CD32',  // Lime green for fertilizers
                '#8B4513'   // Saddle brown for soil
            ],
            borderWidth: 2,
            hoverOffset: 15
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const labels = [
                            '29% of crop emissions',
                            '13% of agricultural emissions',
                            '28% of farming impact'
                        ];
                        return labels[context.dataIndex];
                    }
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Crop Emissions Distribution',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 2000,
            easing: 'easeOutQuart'
        }
    }
});


const livestockImpactCtx = document.getElementById('livestockImpactChart').getContext('2d');
new Chart(livestockImpactCtx, {
    type: 'bar',
    data: {
        labels: ['Methane from Cattle', 'Feed Production', 'Manure Management', 'Grazing Impact', 'Processing', 'Transport'],
        datasets: [{
            label: 'Direct Emissions',
            data: [40, 45, 15, 12, 8, 5],
            backgroundColor: [
                '#E67E22',  // Orange for methane
                '#2ECC71',  // Green for feed
                '#9B59B6',  // Purple for manure
                '#F1C40F',  // Yellow for grazing
                '#3498DB',  // Blue for processing
                '#E74C3C'   // Red for transport
            ],
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 60
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.parsed.y}% of sector emissions`;
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: ['Comprehensive Emissions Breakdown',""],
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            datalabels: {
                color: '#fff',
                anchor: 'center',
                align: 'center',
                font: {
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 50,
                title: {
                    display: true,
                    text: 'Percentage Emissions (%)',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    }
});

const biodiversityImpactCtx = document.getElementById('biodiversityImpactChart').getContext('2d');
new Chart(biodiversityImpactCtx, {
    type: 'line',
    data: {
        labels: ['2020', '2025', '2030', '2035', '2040', '2045', '2050'],
        datasets: [{
            label: 'Species Lost Daily',
            data: [137, 150, 175, 200, 230, 260, 300],
            borderColor: '#E74C3C',
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            fill: true,
            yAxisID: 'y',
            tension: 0.4
        },
        {
            label: 'Forest Species Population (%)',
            data: [80, 75, 70, 65, 60, 55, 50],
            borderColor: '#27AE60',
            backgroundColor: 'rgba(39, 174, 96, 0.2)',
            fill: true,
            yAxisID: 'y1',
            tension: 0.4
        },
        {
            label: 'Cumulative Species at Risk (thousands)',
            data: [28, 32, 38, 45, 52, 60, 70],
            borderColor: '#F39C12',
            backgroundColor: 'rgba(243, 156, 18, 0.2)',
            fill: true,
            yAxisID: 'y2',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            title: {
                display: true,
                text: ['Global Biodiversity Crisis Trends', '2020-2050 Projections'],
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        if (context.datasetIndex === 0) return `${label}: ${value} species`;
                        if (context.datasetIndex === 1) return `${label}: ${value}%`;
                        return `${label}: ${value}k species`;
                    }
                }
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Daily Species Loss',
                    font: { weight: 'bold' }
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Forest Species Population (%)',
                    font: { weight: 'bold' }
                },
                grid: {
                    drawOnChartArea: false
                }
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Species at Risk (thousands)',
                    font: { weight: 'bold' }
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    }
});

const forestLossCtx = document.getElementById('forestLossChart').getContext('2d');
new Chart(forestLossCtx, {
    type: 'bar',
    data: {
        labels: ['Tropical Forest Loss', 'Amazon Loss', 'Carbon Impact', 'Boreal Forest Loss', 'Mangrove Loss'],
        datasets: [{
            label: 'Forest Impact Metrics',
            data: [12.2, 17, 15, 8.5, 6.3],
            backgroundColor: [
                '#27AE60',  // Green for tropical
                '#F1C40F',  // Yellow for Amazon
                '#E67E22',  // Orange for carbon
                '#2ECC71',  // Light green for boreal
                '#16A085'   // Teal for mangrove
            ],
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 60
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const labels = [
                            'Million hectares lost in 2020',
                            'Percent lost in 50 years',
                            'Percent of global emissions',
                            'Million hectares lost annually',
                            'Percent lost since 1980'
                        ];
                        return `${context.parsed.y} ${labels[context.dataIndex]}`;
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: ['Global Forest Loss Impact', 'Key Deforestation Metrics'],
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Loss Metrics (Million hectares / Percentage)',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    }
});

const urbanTransitCtx = document.getElementById('urbanTransitChart').getContext('2d');
new Chart(urbanTransitCtx, {
    type: 'doughnut',
    data: {
        labels: [
            'Private Vehicles', 
            'Public Transit', 
            'Ride-sharing Services',
            'Electric Vehicles',
            'Cycling & Walking',
            'Other Transit'
        ],
        datasets: [{
            data: [60, 15, 25, 8, 5, 2],
            backgroundColor: [
                '#E74C3C',  // Red for private vehicles
                '#3498DB',  // Blue for public transit
                '#9B59B6',  // Purple for ride-sharing
                '#2ECC71',  // Green for EVs
                '#F1C40F',  // Yellow for cycling/walking
                '#95A5A6'   // Grey for other
            ],
            borderWidth: 2,
            hoverOffset: 15
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const impactLabels = [
                            'Private Vehicles: 60% (Major urban congestion)',
                            'Public Transit: 15% (Lower per capita emissions)',
                            'Ride-sharing: 25% (Growing impact)',
                            'Electric Vehicles: 8% (Increasing adoption)',
                            'Cycling & Walking: 5% (Zero emissions)',
                            'Other Transit: 2% (Various modes)'
                        ];
                        return impactLabels[context.dataIndex];
                    }
                }
            },
            legend: {
                position: 'right',
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: ['Urban Transportation Impact',],
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 2000,
            easing: 'easeOutQuart'
        }
    }
});


const manufacturingImpactCtx = document.getElementById('manufacturingImpactChart').getContext('2d');
new Chart(manufacturingImpactCtx, {
    type: 'bar',
    indexAxis: 'y',
    data: {
        labels: ['Steel Production', 'Cement Manufacturing', 'Chemical Processing', 'Aluminum Production', 'Paper Industry', 'Textile Manufacturing'],
        datasets: [{
            label: 'Current Emissions',
            data: [8, 7, 6, 2.5, 2, 2.3],
            backgroundColor: [
                '#3498DB',  // Steel
                '#E67E22',  // Cement
                '#2ECC71',  // Chemical
                '#9B59B6',  // Aluminum
                '#F1C40F',  // Paper
                '#E74C3C'   // Textile
            ],
            borderWidth: 1,
            borderRadius: 4
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Industrial Manufacturing Emissions by Sector',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: 20
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.parsed.x}% of global emissions`;
                    }
                }
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 10,
                grid: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Percentage of Global Emissions (%)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 10
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    }
});
