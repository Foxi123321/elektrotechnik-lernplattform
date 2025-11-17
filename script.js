// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Ohm's Law Calculator
function calculateOhm() {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const current = parseFloat(document.getElementById('current').value);
    const resistance = parseFloat(document.getElementById('resistance').value);
    const resultDisplay = document.getElementById('result-display');
    
    let result = '';
    let isValid = false;
    
    // Count how many values are provided
    const values = [voltage, current, resistance];
    const providedValues = values.filter(val => !isNaN(val) && val !== 0).length;
    
    if (providedValues === 2) {
        if (!isNaN(voltage) && !isNaN(current) && (isNaN(resistance) || resistance === 0)) {
            // Calculate resistance: R = U/I
            const calculatedR = voltage / current;
            result = `Widerstand R = ${calculatedR.toFixed(3)} Ω`;
            isValid = true;
        } else if (!isNaN(voltage) && !isNaN(resistance) && (isNaN(current) || current === 0)) {
            // Calculate current: I = U/R
            const calculatedI = voltage / resistance;
            result = `Stromstärke I = ${calculatedI.toFixed(3)} A`;
            isValid = true;
        } else if (!isNaN(current) && !isNaN(resistance) && (isNaN(voltage) || voltage === 0)) {
            // Calculate voltage: U = R × I
            const calculatedU = resistance * current;
            result = `Spannung U = ${calculatedU.toFixed(3)} V`;
            isValid = true;
        }
    } else if (providedValues === 3) {
        // Verify Ohm's law
        const calculatedU = resistance * current;
        const difference = Math.abs(voltage - calculatedU);
        const tolerance = 0.001;
        
        if (difference < tolerance) {
            result = `✓ Ohm'sches Gesetz bestätigt: U = R × I = ${calculatedU.toFixed(3)} V`;
            isValid = true;
        } else {
            result = `⚠ Werte stimmen nicht überein. Erwartet: U = ${calculatedU.toFixed(3)} V, Eingegeben: U = ${voltage} V`;
            isValid = true;
        }
    } else {
        result = 'Bitte geben Sie genau zwei Werte ein, um den dritten zu berechnen.';
    }
    
    if (isValid) {
        resultDisplay.innerHTML = `<div class="result-text" style="color: #27ae60; font-weight: 600;">${result}</div>`;
        resultDisplay.style.background = 'linear-gradient(135deg, #e8f4f0 0%, #d1ecf1 100%)';
        resultDisplay.style.borderLeftColor = '#27ae60';
        
        // Add animation
        resultDisplay.classList.add('fade-in');
        setTimeout(() => {
            resultDisplay.classList.remove('fade-in');
        }, 600);
    } else {
        resultDisplay.innerHTML = `<div class="result-text" style="color: #e74c3c;">${result}</div>`;
        resultDisplay.style.background = 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)';
        resultDisplay.style.borderLeftColor = '#e74c3c';
    }
}

function clearCalculator() {
    document.getElementById('voltage').value = '';
    document.getElementById('current').value = '';
    document.getElementById('resistance').value = '';
    document.getElementById('result-display').innerHTML = '<div class="result-text">Ergebnis wird hier angezeigt</div>';
    
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
    resultDisplay.style.borderLeftColor = '#dee2e6';
}

// Tab switching functionality
function switchTab(tabId, buttonElement) {
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to selected tab and button
    document.getElementById(tabId).classList.add('active');
    buttonElement.classList.add('active');
}

// Conductance Calculator Functions
function calculateConductanceFromR() {
    const resistance = parseFloat(document.getElementById('resistance-g').value);
    const conductanceInput = document.getElementById('conductance');
    const resultDisplay = document.getElementById('conductance-result-display');
    
    if (!isNaN(resistance) && resistance > 0) {
        const conductance = 1 / resistance;
        conductanceInput.value = conductance.toFixed(6);
        
        let unit = 'S';
        let displayValue = conductance;
        
        if (conductance < 0.001) {
            displayValue = conductance * 1000;
            unit = 'mS';
        }
        
        resultDisplay.innerHTML = `
            <div class="result-text" style="color: #27ae60; font-weight: 600;">
                Leitwert: ${displayValue.toFixed(3)} ${unit}<br>
                <small>G = 1/R = 1/${resistance}Ω = ${conductance.toFixed(6)}S</small>
            </div>`;
        resultDisplay.style.background = 'linear-gradient(135deg, #e8f4f0 0%, #d1ecf1 100%)';
        resultDisplay.style.borderLeftColor = '#27ae60';
    } else if (resistance === 0) {
        conductanceInput.value = '';
        resultDisplay.innerHTML = '<div class="result-text" style="color: #e74c3c;">Widerstand kann nicht 0 sein (Kurzschluss!)</div>';
        resultDisplay.style.background = 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)';
        resultDisplay.style.borderLeftColor = '#e74c3c';
    } else {
        conductanceInput.value = '';
        resultDisplay.innerHTML = '<div class="result-text">Geben Sie einen gültigen Widerstand ein</div>';
        resultDisplay.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        resultDisplay.style.borderLeftColor = '#dee2e6';
    }
}

function calculateResistanceFromG() {
    const conductance = parseFloat(document.getElementById('conductance').value);
    const resistanceInput = document.getElementById('resistance-g');
    const resultDisplay = document.getElementById('conductance-result-display');
    
    if (!isNaN(conductance) && conductance > 0) {
        const resistance = 1 / conductance;
        resistanceInput.value = resistance.toFixed(3);
        
        let unit = 'Ω';
        let displayValue = resistance;
        
        if (resistance > 1000) {
            displayValue = resistance / 1000;
            unit = 'kΩ';
        }
        
        resultDisplay.innerHTML = `
            <div class="result-text" style="color: #27ae60; font-weight: 600;">
                Widerstand: ${displayValue.toFixed(3)} ${unit}<br>
                <small>R = 1/G = 1/${conductance}S = ${resistance.toFixed(3)}Ω</small>
            </div>`;
        resultDisplay.style.background = 'linear-gradient(135deg, #e8f4f0 0%, #d1ecf1 100%)';
        resultDisplay.style.borderLeftColor = '#27ae60';
    } else if (conductance === 0) {
        resistanceInput.value = '';
        resultDisplay.innerHTML = '<div class="result-text" style="color: #e74c3c;">Leitwert kann nicht 0 sein (Leerlauf!)</div>';
        resultDisplay.style.background = 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)';
        resultDisplay.style.borderLeftColor = '#e74c3c';
    } else {
        resistanceInput.value = '';
        resultDisplay.innerHTML = '<div class="result-text">Geben Sie einen gültigen Leitwert ein</div>';
        resultDisplay.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        resultDisplay.style.borderLeftColor = '#dee2e6';
    }
}

function setExampleValues(resistance, conductance) {
    document.getElementById('resistance-g').value = resistance;
    document.getElementById('conductance').value = conductance;
    calculateConductanceFromR();
}

// Power Calculator Functions
function calculatePower() {
    const voltage = parseFloat(document.getElementById('power-voltage').value);
    const current = parseFloat(document.getElementById('power-current').value);
    const resistance = parseFloat(document.getElementById('power-resistance').value);
    const resultDisplay = document.getElementById('power-result-display');
    
    let result = '';
    let isValid = false;
    
    // Count how many values are provided
    const values = [voltage, current, resistance];
    const providedValues = values.filter(val => !isNaN(val) && val !== 0).length;
    
    if (providedValues >= 2) {
        let power = 0;
        let formula = '';
        
        if (!isNaN(voltage) && !isNaN(current)) {
            power = voltage * current;
            formula = `P = U × I = ${voltage}V × ${current}A`;
            isValid = true;
        } else if (!isNaN(current) && !isNaN(resistance)) {
            power = resistance * current * current;
            formula = `P = R × I² = ${resistance}Ω × (${current}A)²`;
            isValid = true;
        } else if (!isNaN(voltage) && !isNaN(resistance)) {
            power = (voltage * voltage) / resistance;
            formula = `P = U²/R = (${voltage}V)² / ${resistance}Ω`;
            isValid = true;
        }
        
        if (isValid) {
            let unit = 'W';
            let displayValue = power;
            
            if (power >= 1000) {
                displayValue = power / 1000;
                unit = 'kW';
            } else if (power < 0.001) {
                displayValue = power * 1000;
                unit = 'mW';
            }
            
            result = `Leistung: ${displayValue.toFixed(3)} ${unit}<br><small>${formula} = ${power.toFixed(3)}W</small>`;
        }
    } else {
        result = 'Bitte geben Sie mindestens zwei Werte ein.';
    }
    
    if (isValid) {
        resultDisplay.innerHTML = `<div class="result-text" style="color: #27ae60; font-weight: 600;">${result}</div>`;
        resultDisplay.style.background = 'linear-gradient(135deg, #e8f4f0 0%, #d1ecf1 100%)';
        resultDisplay.style.borderLeftColor = '#27ae60';
    } else {
        resultDisplay.innerHTML = `<div class="result-text" style="color: #e74c3c;">${result}</div>`;
        resultDisplay.style.background = 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)';
        resultDisplay.style.borderLeftColor = '#e74c3c';
    }
}

function clearPowerCalculator() {
    document.getElementById('power-voltage').value = '';
    document.getElementById('power-current').value = '';
    document.getElementById('power-resistance').value = '';
    document.getElementById('power-result-display').innerHTML = '<div class="result-text">Ergebnis wird hier angezeigt</div>';
    
    const resultDisplay = document.getElementById('power-result-display');
    resultDisplay.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
    resultDisplay.style.borderLeftColor = '#dee2e6';
}

// Circuit Simulator Functions
function simulateOpenCircuit() {
    const connectionPoint = document.getElementById('connection-point');
    const connectionStatus = document.getElementById('connection-status');
    const measuredVoltage = document.getElementById('measured-voltage');
    const measuredCurrent = document.getElementById('measured-current');
    const measuredResistance = document.getElementById('measured-resistance');
    const circuitPath = document.getElementById('circuit-path');
    
    // Update visual state
    connectionPoint.className = 'connection-point open-circuit';
    connectionStatus.textContent = 'Leerlauf';
    circuitPath.className = 'circuit-path open-circuit';
    
    // Update measurements
    measuredVoltage.textContent = '12.0V';
    measuredCurrent.textContent = '0.0A';
    measuredResistance.textContent = '∞ Ω';
    
    // Add animation
    connectionPoint.style.animation = 'pulse-warning 2s infinite';
    
    // Show safety warning
    showSimulationMessage('⚠️ Leerlauf: Spannung liegt voll an, aber kein Stromfluss!', 'warning');
}

function simulateShortCircuit() {
    const connectionPoint = document.getElementById('connection-point');
    const connectionStatus = document.getElementById('connection-status');
    const measuredVoltage = document.getElementById('measured-voltage');
    const measuredCurrent = document.getElementById('measured-current');
    const measuredResistance = document.getElementById('measured-resistance');
    const circuitPath = document.getElementById('circuit-path');
    
    // Update visual state
    connectionPoint.className = 'connection-point short-circuit';
    connectionStatus.textContent = 'Kurzschluss';
    circuitPath.className = 'circuit-path short-circuit';
    
    // Update measurements
    measuredVoltage.textContent = '0.1V';
    measuredCurrent.textContent = '∞ A';
    measuredResistance.textContent = '0.0Ω';
    
    // Add animation
    connectionPoint.style.animation = 'pulse-danger 1s infinite';
    
    // Show danger warning
    showSimulationMessage('🔥 GEFAHR: Kurzschluss! Extrem hoher Strom!', 'danger');
}

function simulateNormalOperation() {
    const connectionPoint = document.getElementById('connection-point');
    const connectionStatus = document.getElementById('connection-status');
    const measuredVoltage = document.getElementById('measured-voltage');
    const measuredCurrent = document.getElementById('measured-current');
    const measuredResistance = document.getElementById('measured-resistance');
    const circuitPath = document.getElementById('circuit-path');
    
    // Update visual state
    connectionPoint.className = 'connection-point normal-operation';
    connectionStatus.textContent = 'Normalbetrieb';
    circuitPath.className = 'circuit-path normal-operation';
    
    // Calculate values for 100Ω resistor
    const voltage = 12;
    const resistance = 100;
    const current = voltage / resistance;
    
    // Update measurements
    measuredVoltage.textContent = `${voltage.toFixed(1)}V`;
    measuredCurrent.textContent = `${current.toFixed(2)}A`;
    measuredResistance.textContent = `${resistance}Ω`;
    
    // Remove animation
    connectionPoint.style.animation = '';
    
    // Show normal operation message
    showSimulationMessage('✅ Normalbetrieb: Sicherer Strom bei 100Ω Widerstand', 'success');
}

function resetSimulation() {
    const connectionPoint = document.getElementById('connection-point');
    const connectionStatus = document.getElementById('connection-status');
    const measuredVoltage = document.getElementById('measured-voltage');
    const measuredCurrent = document.getElementById('measured-current');
    const measuredResistance = document.getElementById('measured-resistance');
    const circuitPath = document.getElementById('circuit-path');
    
    // Reset to initial state
    connectionPoint.className = 'connection-point';
    connectionStatus.textContent = 'Offen';
    circuitPath.className = 'circuit-path';
    
    // Reset measurements
    measuredVoltage.textContent = '12.0V';
    measuredCurrent.textContent = '0.0A';
    measuredResistance.textContent = '∞ Ω';
    
    // Remove animation
    connectionPoint.style.animation = '';
    
    // Clear message
    const messageElement = document.getElementById('simulation-message');
    if (messageElement) {
        messageElement.remove();
    }
}

function showSimulationMessage(message, type) {
    // Remove existing message
    const existingMessage = document.getElementById('simulation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.id = 'simulation-message';
    messageDiv.className = `simulation-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert after simulator controls
    const simulatorControls = document.querySelector('.simulator-controls');
    simulatorControls.parentNode.insertBefore(messageDiv, simulatorControls.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Quiz Logic
const quizQuestions = [
    {
        question: "Was ist die Einheit der elektrischen Ladung?",
        options: ["Volt (V)", "Coulomb (C)", "Ampere (A)", "Ohm (Ω)"],
        correct: 1,
        explanation: "Die elektrische Ladung wird in Coulomb (C) gemessen. Ein Coulomb entspricht der Ladung von etwa 6,24 × 10¹⁸ Elementarladungen."
    },
    {
        question: "Wie lautet das Ohm'sche Gesetz?",
        options: ["U = I × R", "I = U × R", "R = U × I", "P = U × I"],
        correct: 0,
        explanation: "Das Ohm'sche Gesetz lautet U = R × I, wobei U die Spannung, R der Widerstand und I die Stromstärke ist."
    },
    {
        question: "Was passiert mit gleichnamigen Ladungen?",
        options: ["Sie ziehen sich an", "Sie stoßen sich ab", "Sie neutralisieren sich", "Nichts passiert"],
        correct: 1,
        explanation: "Gleichnamige Ladungen (+ und + oder - und -) stoßen sich ab, während ungleichnamige Ladungen sich anziehen."
    },
    {
        question: "Welcher Wert wurde in euren Messungen für den Widerstand ermittelt?",
        options: ["2 Ω", "4 Ω", "6 Ω", "8 Ω"],
        correct: 1,
        explanation: "Aus der Messtabelle ergibt sich R = U/I = 4Ω bei allen Messungen, was die Konstanz des Widerstands bestätigt."
    },
    {
        question: "Was ist die maximale sichere Berührungsspannung laut eurer Sicherheitsübung?",
        options: ["50 V", "120 V", "230 V", "400 V"],
        correct: 1,
        explanation: "Bei einem Körperwiderstand von 1000Ω und einem gefährlichen Strom von 120mA ergibt sich: U = R × I = 120V als Sicherheitsgrenze."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('question-number').textContent = currentQuestion + 1;
    document.getElementById('quiz-question').textContent = question.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('next-btn').disabled = true;
    selectedAnswer = -1;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    const options = document.querySelectorAll('.quiz-option');
    
    // Remove previous selections
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark selected answer
    options[answerIndex].classList.add('selected');
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === -1) return;
    
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    // Show correct answer
    options[question.correct].classList.add('correct');
    if (selectedAnswer !== question.correct) {
        options[selectedAnswer].classList.add('incorrect');
    } else {
        score++;
    }
    
    // Disable all options
    options.forEach(option => {
        option.disabled = true;
    });
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
            options.forEach(option => {
                option.disabled = false;
            });
        } else {
            showResult();
        }
    }, 2000);
}

function showResult() {
    const quizCard = document.querySelector('.quiz-card');
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = 'Ausgezeichnet! Sie haben die Grundlagen gut verstanden.';
    } else if (percentage >= 60) {
        message = 'Gut gemacht! Wiederholen Sie die schwierigeren Konzepte.';
    } else {
        message = 'Lernen Sie die Grundlagen nochmals durch und versuchen Sie es erneut.';
    }
    
    quizCard.innerHTML = `
        <div class="quiz-result">
            <h3>Quiz beendet!</h3>
            <p>Ihre Punktzahl: <strong>${score} von ${quizQuestions.length}</strong> (${percentage}%)</p>
            <p style="margin-top: 15px;">${message}</p>
            <div style="margin-top: 30px;">
                <button class="btn btn-primary" onclick="restartQuiz()">Quiz wiederholen</button>
                <button class="btn btn-secondary" onclick="scrollToSection('study-guide')">Zurück zum Lernführer</button>
            </div>
        </div>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = -1;
    
    // Reset quiz card structure
    const quizCard = document.querySelector('.quiz-card');
    quizCard.innerHTML = `
        <div class="quiz-header">
            <h3>Frage <span id="question-number">1</span> von ${quizQuestions.length}</h3>
            <div class="quiz-progress">
                <div class="progress-bar" id="progress-bar"></div>
            </div>
        </div>
        
        <div class="quiz-question" id="quiz-question"></div>
        
        <div class="quiz-options" id="quiz-options"></div>
        
        <div class="quiz-controls">
            <button class="btn btn-primary" id="next-btn" onclick="nextQuestion()" disabled>Nächste Frage</button>
            <button class="btn btn-secondary" onclick="restartQuiz()">Neustart</button>
        </div>
    `;
    
    loadQuestion();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Observe cards for animation
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
    
    // Initialize quiz
    loadQuestion();
    
    // Initialize chart
    setTimeout(drawChart, 500);
    
    // Add input event listeners for calculator
    const inputs = ['voltage', 'current', 'resistance'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            // Auto-calculate if user pauses typing
            clearTimeout(window.calcTimeout);
            window.calcTimeout = setTimeout(() => {
                const filledInputs = inputs.filter(inputId => 
                    document.getElementById(inputId).value.trim() !== ''
                ).length;
                
                if (filledInputs >= 2) {
                    calculateOhm();
                }
            }, 1000);
        });
    });
    
    // Add keyboard support for calculator
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateOhm();
            }
        });
    });
});

// Interactive Chart for Ohm's Law
let chartAnimationId;
const measurementData = [
    { voltage: 1, current: 0.25 },
    { voltage: 2, current: 0.5 },
    { voltage: 5, current: 1.25 },
    { voltage: 7, current: 1.75 },
    { voltage: 10, current: 2.5 }
];

function drawChart() {
    const canvas = document.getElementById('ohmsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Grid and axes
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = padding + (i / 10) * (width - 2 * padding);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = height - padding - (i / 5) * (height - 2 * padding);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Axes
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels (Voltage)
    for (let i = 0; i <= 10; i += 2) {
        const x = padding + (i / 10) * (width - 2 * padding);
        ctx.fillText(i + 'V', x, height - padding + 20);
    }
    
    // Y-axis labels (Current)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 2.5; i += 0.5) {
        const y = height - padding - (i / 2.5) * (height - 2 * padding);
        ctx.fillText(i + 'A', padding - 10, y + 4);
    }
    
    // Axis titles
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Spannung U [V]', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Stromstärke I [A]', 0, 0);
    ctx.restore();
    
    // Draw line (R = 4Ω)
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, padding + (height - 2 * padding) * (1 - 2.5/2.5));
    ctx.stroke();
    
    return ctx;
}

function animateChart() {
    const ctx = drawChart();
    if (!ctx) return;
    
    const canvas = document.getElementById('ohmsChart');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;
    
    let animationStep = 0;
    
    if (chartAnimationId) {
        cancelAnimationFrame(chartAnimationId);
    }
    
    function animate() {
        // Redraw base chart
        drawChart();
        
        // Draw animated points
        measurementData.forEach((point, index) => {
            if (index <= animationStep / 20) {
                const x = padding + (point.voltage / 10) * (width - 2 * padding);
                const y = height - padding - (point.current / 2.5) * (height - 2 * padding);
                
                // Point
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fill();
                
                // Point border
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Value label
                ctx.fillStyle = '#2c3e50';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`(${point.voltage}V, ${point.current}A)`, x, y - 15);
            }
        });
        
        animationStep++;
        
        if (animationStep <= 100) {
            chartAnimationId = requestAnimationFrame(animate);
        } else {
            // Final highlight
            ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
            ctx.fillRect(padding, padding, width - 2 * padding, height - 2 * padding);
            
            // R = 4Ω label
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('R = 4Ω', width - padding - 80, padding + 30);
        }
    }
    
    animate();
}

// Calculator enhancement - update chart when values change
function updateCalculatorChart(voltage, current, resistance) {
    if (isNaN(voltage) || isNaN(current)) return;
    
    const canvas = document.getElementById('ohmsChart');
    if (!canvas) return;
    
    const ctx = drawChart();
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;
    
    // Draw new point
    const x = padding + (voltage / 10) * (width - 2 * padding);
    const y = height - padding - (current / 2.5) * (height - 2 * padding);
    
    if (x >= padding && x <= width - padding && y >= padding && y <= height - padding) {
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`(${voltage}V, ${current}A)`, x, y - 20);
    }
}

// Add some Easter eggs and interactive elements
let clickCount = 0;
document.querySelector('.hero-title').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        const title = document.querySelector('.hero-title');
        title.style.transform = 'rotate(360deg)';
        title.style.transition = 'transform 1s ease';
        setTimeout(() => {
            title.style.transform = 'none';
            title.style.transition = '';
            clickCount = 0;
        }, 1000);
    }
});

// Formula box interactive effect
document.querySelectorAll('.formula-highlight').forEach(formula => {
    formula.addEventListener('click', () => {
        formula.style.transform = 'scale(1.05)';
        formula.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            formula.style.transform = 'scale(1)';
        }, 200);
    });
});