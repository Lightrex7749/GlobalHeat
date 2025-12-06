// ==================== GLOBALHEAT ADVANCED FEATURES ====================

// ==================== 1. MULTI-LANGUAGE SUPPORT ====================
const translations = {
    en: {
        home: "Home",
        causes: "Causes",
        benefits: "Benefits",
        strategies: "Strategies",
        recycling: "Recycling",
        feedback: "Feedback",
        contact: "Contact",
        introduction: "Introduction",
        readMore: "Read More",
        shareOn: "Share on",
        quiz: "Take the Climate Quiz!",
        quizStart: "Start Quiz",
        quizNext: "Next Question",
        quizFinish: "See Results",
        quizScore: "Your Score",
        readingMode: "Reading Mode",
        listenArticle: "Listen to Article",
        stopListening: "Stop",
        keyboardShortcuts: "Keyboard Shortcuts",
        tableOfContents: "Table of Contents",
        visitors: "Visitors",
        events: "Upcoming Events",
        achievements: "Your Achievements",
        generateQR: "Generate QR Code",
        themeCustomizer: "Customize Theme"
    },
    hi: {
        home: "होम",
        causes: "कारण",
        benefits: "लाभ",
        strategies: "रणनीतियाँ",
        recycling: "पुनर्चक्रण",
        feedback: "प्रतिक्रिया",
        contact: "संपर्क",
        introduction: "परिचय",
        readMore: "और पढ़ें",
        shareOn: "शेयर करें",
        quiz: "जलवायु प्रश्नोत्तरी लें!",
        quizStart: "शुरू करें",
        quizNext: "अगला प्रश्न",
        quizFinish: "परिणाम देखें",
        quizScore: "आपका स्कोर",
        readingMode: "पढ़ने का मोड",
        listenArticle: "लेख सुनें",
        stopListening: "रोकें",
        keyboardShortcuts: "कीबोर्ड शॉर्टकट",
        tableOfContents: "विषय सूची",
        visitors: "आगंतुक",
        events: "आगामी कार्यक्रम",
        achievements: "आपकी उपलब्धियां",
        generateQR: "QR कोड बनाएं",
        themeCustomizer: "थीम कस्टमाइज़ करें"
    }
};

let currentLang = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// ==================== 2. THEME CUSTOMIZER ====================
const themeColors = {
    default: { primary: '#667eea', secondary: '#764ba2' },
    ocean: { primary: '#0077b6', secondary: '#00b4d8' },
    forest: { primary: '#2d6a4f', secondary: '#40916c' },
    sunset: { primary: '#f77f00', secondary: '#d62828' },
    lavender: { primary: '#7209b7', secondary: '#b5179e' },
    mint: { primary: '#06d6a0', secondary: '#118ab2' }
};

function setThemeColor(themeName) {
    const theme = themeColors[themeName] || themeColors.default;
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    localStorage.setItem('themeColor', themeName);
}

// ==================== 3. LIVE CLIMATE DATA ====================
async function fetchClimateData() {
    const climateDataEl = document.getElementById('liveClimateData');
    if (!climateDataEl) return;
    
    try {
        // Using Open-Meteo API (free, no key required)
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true');
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        
        climateDataEl.innerHTML = `
            <div class="climate-stat">
                <i class="fas fa-temperature-high"></i>
                <span class="stat-value">${data.current_weather.temperature}°C</span>
                <span class="stat-label">Current Temp (Delhi)</span>
            </div>
            <div class="climate-stat">
                <i class="fas fa-wind"></i>
                <span class="stat-value">${data.current_weather.windspeed} km/h</span>
                <span class="stat-label">Wind Speed</span>
            </div>
        `;
    } catch (error) {
        // Fallback to static data
        climateDataEl.innerHTML = `
            <div class="climate-stat">
                <i class="fas fa-temperature-high"></i>
                <span class="stat-value">28°C</span>
                <span class="stat-label">Avg Global Temp Rise</span>
            </div>
            <div class="climate-stat">
                <i class="fas fa-thermometer-half"></i>
                <span class="stat-value">+1.1°C</span>
                <span class="stat-label">Since Pre-industrial</span>
            </div>
        `;
    }
}

// CO2 Data from global monitoring
async function fetchCO2Data() {
    const co2El = document.getElementById('co2Data');
    if (!co2El) return;
    
    // Current approximate CO2 levels (updates yearly)
    const co2Level = 421.5; // ppm as of 2024
    co2El.innerHTML = `
        <div class="co2-display">
            <i class="fas fa-cloud"></i>
            <span class="co2-value">${co2Level} ppm</span>
            <span class="co2-label">Atmospheric CO₂</span>
        </div>
    `;
}

// ==================== 4. CLIMATE QUIZ GAME ====================
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
        options: ["Agriculture", "Transportation", "Energy Production", "Buildings"],
        correct: 2
    },
    {
        question: "What percentage of the world's coral reefs are at risk due to climate change?",
        options: ["25%", "50%", "75%", "90%"],
        correct: 3
    },
    {
        question: "Which country is the largest emitter of CO2?",
        options: ["USA", "India", "China", "Russia"],
        correct: 2
    },
    {
        question: "What is the Paris Agreement's main goal?",
        options: ["Limit warming to 1.5°C", "Ban all fossil fuels", "Plant 1 billion trees", "Stop meat consumption"],
        correct: 0
    },
    {
        question: "How much sea level rise is expected by 2100 in worst case?",
        options: ["10cm", "30cm", "1 meter", "5 meters"],
        correct: 2
    },
    {
        question: "Which renewable energy source is growing fastest?",
        options: ["Hydropower", "Wind", "Solar", "Geothermal"],
        correct: 2
    }
];

let currentQuestion = 0;
let quizScore = 0;
let quizActive = false;

function startQuiz() {
    const quizModal = document.getElementById('quizModal');
    if (!quizModal) return;
    
    currentQuestion = 0;
    quizScore = 0;
    quizActive = true;
    showQuestion();
    quizModal.classList.add('visible');
}

function showQuestion() {
    const q = quizQuestions[currentQuestion];
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    quizContent.innerHTML = `
        <div class="quiz-progress">Question ${currentQuestion + 1} of ${quizQuestions.length}</div>
        <h3 class="quiz-question">${q.question}</h3>
        <div class="quiz-options">
            ${q.options.map((opt, i) => `
                <button class="quiz-option" onclick="selectAnswer(${i})">${opt}</button>
            `).join('')}
        </div>
    `;
}

function selectAnswer(index) {
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((opt, i) => {
        opt.disabled = true;
        if (i === q.correct) {
            opt.classList.add('correct');
        } else if (i === index && i !== q.correct) {
            opt.classList.add('wrong');
        }
    });
    
    if (index === q.correct) {
        quizScore++;
        awardAchievement('quiz_correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showQuizResults();
        }
    }, 1500);
}

function showQuizResults() {
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    let badge = '🌱';
    let title = 'Climate Learner';
    if (percentage >= 80) { badge = '🌍'; title = 'Climate Champion'; awardAchievement('quiz_master'); }
    else if (percentage >= 60) { badge = '🌿'; title = 'Eco Warrior'; }
    else if (percentage >= 40) { badge = '🌾'; title = 'Green Beginner'; }
    
    quizContent.innerHTML = `
        <div class="quiz-results">
            <div class="result-badge">${badge}</div>
            <h3>${title}</h3>
            <p>You scored ${quizScore} out of ${quizQuestions.length} (${percentage}%)</p>
            <div class="result-bar">
                <div class="result-fill" style="width: ${percentage}%"></div>
            </div>
            <button class="quiz-restart" onclick="startQuiz()">Try Again</button>
            <button class="quiz-close" onclick="closeQuiz()">Close</button>
        </div>
    `;
    
    awardAchievement('quiz_completed');
}

function closeQuiz() {
    const quizModal = document.getElementById('quizModal');
    if (quizModal) quizModal.classList.remove('visible');
    quizActive = false;
}

// ==================== 5. VISITOR COUNTER ====================
function updateVisitorCount() {
    const counterEl = document.getElementById('visitorCount');
    if (!counterEl) return;
    
    let visits = parseInt(localStorage.getItem('pageVisits') || '0');
    visits++;
    localStorage.setItem('pageVisits', visits);
    
    // Animate counter
    counterEl.textContent = visits.toLocaleString();
}

// ==================== 7. CLIMATE EVENTS CALENDAR ====================
const climateEvents = [
    { date: '2025-03-22', name: 'World Water Day', icon: '💧' },
    { date: '2025-03-26', name: 'Earth Hour', icon: '🌍' },
    { date: '2025-04-22', name: 'Earth Day', icon: '🌎' },
    { date: '2025-05-22', name: 'Biodiversity Day', icon: '🦋' },
    { date: '2025-06-05', name: 'World Environment Day', icon: '🌳' },
    { date: '2025-06-08', name: 'World Oceans Day', icon: '🌊' },
    { date: '2025-09-16', name: 'Ozone Day', icon: '☀️' },
    { date: '2025-11-06', name: 'Climate Action Day', icon: '🌡️' }
];

function showClimateEvents() {
    const eventsEl = document.getElementById('climateEvents');
    if (!eventsEl) return;
    
    const today = new Date();
    const upcoming = climateEvents
        .filter(e => new Date(e.date) >= today)
        .slice(0, 3);
    
    eventsEl.innerHTML = upcoming.map(e => `
        <div class="event-item">
            <span class="event-icon">${e.icon}</span>
            <div class="event-info">
                <span class="event-name">${e.name}</span>
                <span class="event-date">${new Date(e.date).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

// ==================== 8. ACHIEVEMENT BADGES ====================
const achievements = {
    first_visit: { name: 'First Steps', icon: '👣', desc: 'Visited the site for the first time' },
    dark_mode: { name: 'Night Owl', icon: '🦉', desc: 'Enabled dark mode' },
    quiz_completed: { name: 'Quiz Taker', icon: '📝', desc: 'Completed the climate quiz' },
    quiz_master: { name: 'Quiz Master', icon: '🏆', desc: 'Scored 80%+ on the quiz' },
    quiz_correct: { name: 'Quick Learner', icon: '💡', desc: 'Answered a question correctly' },
    scroll_master: { name: 'Explorer', icon: '🧭', desc: 'Scrolled through the entire page' },
    shared: { name: 'Advocate', icon: '📢', desc: 'Shared the page on social media' },
    reading_mode: { name: 'Focused Reader', icon: '📖', desc: 'Used reading mode' },
    tts_used: { name: 'Listener', icon: '🎧', desc: 'Used text-to-speech' },
    theme_changed: { name: 'Designer', icon: '🎨', desc: 'Customized the theme' }
};

function awardAchievement(id) {
    const earned = JSON.parse(localStorage.getItem('achievements') || '[]');
    if (earned.includes(id)) return;
    
    earned.push(id);
    localStorage.setItem('achievements', JSON.stringify(earned));
    
    const achievement = achievements[id];
    if (!achievement) return;
    
    // Show notification
    showAchievementNotification(achievement);
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <span class="achievement-icon">${achievement.icon}</span>
        <div class="achievement-text">
            <strong>Achievement Unlocked!</strong>
            <span>${achievement.name}</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('visible'), 100);
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showAchievements() {
    const earned = JSON.parse(localStorage.getItem('achievements') || '[]');
    const modal = document.getElementById('achievementsModal');
    const content = document.getElementById('achievementsContent');
    if (!modal || !content) return;
    
    content.innerHTML = Object.entries(achievements).map(([id, ach]) => `
        <div class="achievement-badge ${earned.includes(id) ? 'earned' : 'locked'}">
            <span class="badge-icon">${ach.icon}</span>
            <span class="badge-name">${ach.name}</span>
            <span class="badge-desc">${ach.desc}</span>
        </div>
    `).join('');
    
    modal.classList.add('visible');
}

// ==================== 9. QR CODE GENERATOR ====================
function generateQRCode() {
    const modal = document.getElementById('qrModal');
    const qrContainer = document.getElementById('qrCode');
    if (!modal || !qrContainer) return;
    
    const url = window.location.href;
    
    // Using QR Server API (free)
    qrContainer.innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}" alt="QR Code">
        <p>Scan to visit this page</p>
    `;
    
    modal.classList.add('visible');
}

// ==================== 10. READING MODE ====================
let readingModeActive = false;

function toggleReadingMode() {
    readingModeActive = !readingModeActive;
    document.body.classList.toggle('reading-mode', readingModeActive);
    
    if (readingModeActive) {
        awardAchievement('reading_mode');
    }
}

// ==================== 11. KEYBOARD SHORTCUTS ====================
const shortcuts = {
    'h': () => window.location.hash = '#home',
    'd': () => document.querySelector('.theme-toggle')?.click(),
    'r': () => toggleReadingMode(),
    't': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'q': () => startQuiz(),
    's': () => toggleTTS(),
    '?': () => showShortcutsHelp()
};

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const handler = shortcuts[e.key.toLowerCase()];
        if (handler && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            handler();
        }
    });
}

function showShortcutsHelp() {
    const modal = document.getElementById('shortcutsModal');
    modal.classList.add('visible');
}

// ==================== 12. TABLE OF CONTENTS ====================
function generateTOC() {
    const tocEl = document.getElementById('tableOfContents');
    if (!tocEl) return;
    
    const sections = document.querySelectorAll('.page-section[id]');
    
    tocEl.innerHTML = `
        <div class="toc-header">
            <i class="fas fa-list"></i> Contents
            <button class="toc-toggle" onclick="toggleTOC()">−</button>
        </div>
        <ul class="toc-list">
            ${Array.from(sections).map(s => `
                <li><a href="#${s.id}">${s.querySelector('h2')?.textContent || s.id}</a></li>
            `).join('')}
        </ul>
    `;
}

function toggleTOC() {
    document.getElementById('tableOfContents')?.classList.toggle('collapsed');
}

// ==================== 13. TEXT-TO-SPEECH ====================
let ttsActive = false;
let utterance = null;

function toggleTTS() {
    if (ttsActive) {
        window.speechSynthesis.cancel();
        ttsActive = false;
        document.getElementById('ttsBtn')?.classList.remove('active');
    } else {
        const text = document.querySelector('.page-section')?.textContent || '';
        utterance = new SpeechSynthesisUtterance(text.substring(0, 5000));
        utterance.rate = 0.9;
        utterance.onend = () => {
            ttsActive = false;
            document.getElementById('ttsBtn')?.classList.remove('active');
        };
        window.speechSynthesis.speak(utterance);
        ttsActive = true;
        document.getElementById('ttsBtn')?.classList.add('active');
        awardAchievement('tts_used');
    }
}

// ==================== 14. IMAGE LIGHTBOX ====================
function initLightbox() {
    const images = document.querySelectorAll('.stat-card img, .animated-img');
    
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
}

function openLightbox(src, alt) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('visible');
}

function closeLightbox() {
    document.getElementById('lightbox')?.classList.remove('visible');
}

// ==================== INITIALIZE ALL FEATURES ====================
document.addEventListener('DOMContentLoaded', () => {
    // Award first visit achievement
    if (!localStorage.getItem('visited')) {
        localStorage.setItem('visited', 'true');
        awardAchievement('first_visit');
    }
    
    // Initialize features
    updateLanguage();
    setThemeColor(localStorage.getItem('themeColor') || 'default');
    fetchClimateData();
    fetchCO2Data();
    updateVisitorCount();
    showClimateEvents();
    generateTOC();
    initKeyboardShortcuts();
    initLightbox();
    
    // Track scroll achievement
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) maxScroll = scrollPercent;
        if (maxScroll > 90) awardAchievement('scroll_master');
    });
    
    // Track dark mode achievement
    const observer = new MutationObserver(() => {
        if (document.body.classList.contains('dark-mode')) {
            awardAchievement('dark_mode');
        }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

// Close modals on escape or click outside
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.visible').forEach(m => m.classList.remove('visible'));
        closeLightbox();
        closeQuiz();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('visible');
    }
});
