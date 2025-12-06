// ==================== FEATURES.JS ====================
// Advanced features for GlobalHeat website

// ==================== MULTI-LANGUAGE SUPPORT ====================
const translations = {
    en: {
        home: 'Home',
        causes: 'Causes',
        benefits: 'Benefits',
        strategies: 'Strategies',
        recycling: 'Recycling',
        feedback: 'Feedback',
        contact: 'Contact'
    },
    hi: {
        home: 'होम',
        causes: 'कारण',
        benefits: 'लाभ',
        strategies: 'रणनीतियाँ',
        recycling: 'पुनर्चक्रण',
        feedback: 'प्रतिक्रिया',
        contact: 'संपर्क'
    }
};

function setLanguage(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    localStorage.setItem('preferredLanguage', lang);
}

// ==================== THEME CUSTOMIZER ====================
function setThemeColor(theme) {
    const themes = {
        default: { primary: '#667eea', secondary: '#764ba2' },
        ocean: { primary: '#0077b6', secondary: '#00b4d8' },
        forest: { primary: '#2d6a4f', secondary: '#40916c' },
        sunset: { primary: '#f77f00', secondary: '#d62828' },
        lavender: { primary: '#7209b7', secondary: '#b5179e' },
        mint: { primary: '#06d6a0', secondary: '#118ab2' }
    };
    
    const selected = themes[theme] || themes.default;
    document.documentElement.style.setProperty('--theme-primary', selected.primary);
    document.documentElement.style.setProperty('--theme-secondary', selected.secondary);
    localStorage.setItem('themeColor', theme);
}

// ==================== CLIMATE QUIZ ====================
const quizQuestions = [
    {
        question: "What is the main greenhouse gas responsible for global warming?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1
    },
    {
        question: "By how much has Earth's temperature risen since pre-industrial times?",
        options: ["0.5°C", "1.1°C", "2.5°C", "5°C"],
        correct: 1
    },
    {
        question: "Which sector produces the most greenhouse gas emissions?",
        options: ["Agriculture", "Transportation", "Energy Production", "Construction"],
        correct: 2
    },
    {
        question: "What percentage of coral reefs could be lost if temperatures rise 2°C?",
        options: ["50%", "70%", "90%", "99%"],
        correct: 3
    },
    {
        question: "Which renewable energy source is growing the fastest?",
        options: ["Hydropower", "Wind", "Solar", "Geothermal"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.classList.add('visible');
        showQuestion();
    }
}

function showQuestion() {
    const content = document.getElementById('quizContent');
    if (!content) return;
    
    if (currentQuestion >= quizQuestions.length) {
        content.innerHTML = `
            <div class="quiz-result">
                <h3>Quiz Complete!</h3>
                <p class="score">Your Score: ${score}/${quizQuestions.length}</p>
                <p>${score >= 4 ? '🌟 Excellent! You\'re a climate expert!' : score >= 2 ? '👍 Good job! Keep learning!' : '📚 Keep exploring climate topics!'}</p>
                <button onclick="closeQuiz()" class="quiz-btn">Close</button>
            </div>
        `;
        return;
    }
    
    const q = quizQuestions[currentQuestion];
    content.innerHTML = `
        <div class="quiz-progress">Question ${currentQuestion + 1}/${quizQuestions.length}</div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
            ${q.options.map((opt, i) => `
                <button class="quiz-option" onclick="checkAnswer(${i})">${opt}</button>
            `).join('')}
        </div>
    `;
}

function checkAnswer(selected) {
    if (selected === quizQuestions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    showQuestion();
}

function closeQuiz() {
    const modal = document.getElementById('quizModal');
    if (modal) modal.classList.remove('visible');
}

// ==================== ACHIEVEMENTS ====================
const achievements = [
    { id: 'first_visit', name: 'Welcome!', icon: '👋', description: 'First visit to GlobalHeat' },
    { id: 'dark_mode', name: 'Night Owl', icon: '🌙', description: 'Enabled dark mode' },
    { id: 'quiz_complete', name: 'Quiz Master', icon: '🎯', description: 'Completed the climate quiz' },
    { id: 'all_pages', name: 'Explorer', icon: '🧭', description: 'Visited all pages' },
    { id: 'share', name: 'Spreader', icon: '📢', description: 'Shared the website' }
];

function showAchievements() {
    const modal = document.getElementById('achievementsModal');
    const content = document.getElementById('achievementsContent');
    if (!modal || !content) return;
    
    const unlocked = JSON.parse(localStorage.getItem('achievements') || '["first_visit"]');
    
    content.innerHTML = achievements.map(a => `
        <div class="achievement-item ${unlocked.includes(a.id) ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${a.icon}</span>
            <span class="achievement-name">${a.name}</span>
            <span class="achievement-desc">${a.description}</span>
        </div>
    `).join('');
    
    modal.classList.add('visible');
}

function unlockAchievement(id) {
    const unlocked = JSON.parse(localStorage.getItem('achievements') || '["first_visit"]');
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem('achievements', JSON.stringify(unlocked));
    }
}

// ==================== QR CODE GENERATOR ====================
function generateQRCode() {
    const modal = document.getElementById('qrModal');
    const qrDiv = document.getElementById('qrCode');
    if (!modal || !qrDiv) return;
    
    const url = window.location.href;
    qrDiv.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}" alt="QR Code">`;
    modal.classList.add('visible');
}

// ==================== TEXT-TO-SPEECH ====================
let isSpeaking = false;

function toggleTTS() {
    const btn = document.getElementById('ttsBtn');
    if (!btn) return;
    
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        btn.classList.remove('active');
    } else {
        const section = document.querySelector('.page-section');
        if (section) {
            const text = section.innerText.substring(0, 1000);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => {
                isSpeaking = false;
                btn.classList.remove('active');
            };
            speechSynthesis.speak(utterance);
            isSpeaking = true;
            btn.classList.add('active');
        }
    }
}

// ==================== READING MODE ====================
function toggleReadingMode() {
    document.body.classList.toggle('reading-mode');
}

// ==================== IMAGE LIGHTBOX ====================
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add('visible');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('visible');
}

// ==================== SHARE FUNCTIONS ====================
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out GlobalHeat - Learn about climate change!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    unlockAchievement('share');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    unlockAchievement('share');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    unlockAchievement('share');
}

function shareViaEmail() {
    const subject = encodeURIComponent('Check out GlobalHeat!');
    const body = encodeURIComponent(`I found this great resource about climate change: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    unlockAchievement('share');
}

// ==================== LIVE CLIMATE DATA ====================
async function fetchClimateData() {
    const widget = document.getElementById('liveClimateData');
    if (!widget) return;
    
    try {
        // Using a free weather API for demo
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true');
        const data = await response.json();
        
        if (data.current_weather) {
            widget.innerHTML = `
                <div class="climate-stat">
                    <i class="fas fa-temperature-high"></i>
                    <span class="stat-value">${data.current_weather.temperature}°C</span>
                    <span class="stat-label">Temperature</span>
                </div>
                <div class="climate-stat">
                    <i class="fas fa-wind"></i>
                    <span class="stat-value">${data.current_weather.windspeed} km/h</span>
                    <span class="stat-label">Wind Speed</span>
                </div>
            `;
        }
    } catch (error) {
        widget.innerHTML = `
            <div class="climate-stat">
                <i class="fas fa-thermometer-half"></i>
                <span class="stat-value">+1.1°C</span>
                <span class="stat-label">Global Warming</span>
            </div>
            <div class="climate-stat">
                <i class="fas fa-cloud"></i>
                <span class="stat-value">421 ppm</span>
                <span class="stat-label">CO₂ Level</span>
            </div>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchClimateData();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('themeColor');
    if (savedTheme) setThemeColor(savedTheme);
    
    // Add lightbox to images
    document.querySelectorAll('.page-section img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(img.src));
    });
});
