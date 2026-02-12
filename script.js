/**
 * Romantic Interactive Webpage - Valentine's Day Invitation
 * Pure vanilla JavaScript - no dependencies
 * Handles 4-step flow with intermediate "rethink" screen and final confirmation
 */

// ==========================================================================
// Mobile Detection and Features
// ==========================================================================

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

/**
 * Vibrate device when button is pressed (mobile only)
 * @param {number} duration - Vibration duration in ms
 */
function vibrateDevice(duration = 50) {
    if (isMobile && 'vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

/**
 * Lock screen orientation to portrait on mobile
 */
function lockPortraitOrientation() {
    if (isMobile && screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(() => {
            // Orientation lock not supported or denied
        });
    }
}

/**
 * Add confetti hearts effect for mobile
 */
function createConfettiHearts() {
    if (!isMobile) return;
    
    const colors = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = colors[Math.floor(Math.random() * colors.length)];
            heart.style.cssText = `
                position: absolute;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${20 + Math.random() * 20}px;
                animation: fallHeart ${3 + Math.random() * 2}s linear forwards;
            `;
            confettiContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
    
    setTimeout(() => confettiContainer.remove(), 6000);
}

// Add CSS animation for falling hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes fallHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================================================
// State Management
// ==========================================================================

let currentStep = 1;
let previousStep = null; // Track which step to return to from intermediate

// ==========================================================================
// DOM Elements
// ==========================================================================

const steps = {
    1: document.getElementById('step-1'),
    2: document.getElementById('step-2'),
    3: document.getElementById('step-3'),
    4: document.getElementById('step-4'),
    intermediate: document.getElementById('intermediate'),
    final: document.getElementById('final')
};

const rethinkButton = document.getElementById('btn-rethink');

// ==========================================================================
// Core Navigation Functions
// ==========================================================================

/**
 * Transition between steps with fade animation
 * @param {HTMLElement} fromStep - Current step element
 * @param {HTMLElement} toStep - Target step element
 */
function transitionToStep(fromStep, toStep) {
    // Fade out current step
    fromStep.classList.add('fade-out');
    
    // After fade out completes, switch steps
    setTimeout(() => {
        fromStep.classList.remove('active', 'fade-out');
        toStep.classList.add('active');
    }, 760); // Match CSS transition duration
}

/**
 * Navigate to the next step in the flow
 */
function goToNextStep() {
    const nextStepNumber = currentStep + 1;
    
    if (nextStepNumber <= 4) {
        transitionToStep(steps[currentStep], steps[nextStepNumber]);
        currentStep = nextStepNumber;
    } else if (nextStepNumber === 5) {
        // After step 4, go to final screen
        transitionToStep(steps[currentStep], steps.final);
    }
}

/**
 * Show intermediate "think again" screen
 * @param {number} stepNumber - The step to return to
 */
function showIntermediate(stepNumber) {
    previousStep = stepNumber;
    transitionToStep(steps[stepNumber], steps.intermediate);
}

/**
 * Return to the previous step from intermediate screen
 */
function returnToPreviousStep() {
    if (previousStep !== null) {
        transitionToStep(steps.intermediate, steps[previousStep]);
    }
}

/**
 * Show final confirmation screen
 */
function showFinalScreen() {
    transitionToStep(steps[4], steps.final);
    
    // Añadir partículas flotantes de fondo en la pantalla final
    setTimeout(() => {
        createFloatingHearts();
    }, 500);
}

/**
 * Create floating hearts in background for final screen
 */
function createFloatingHearts() {
    const finalScreen = document.getElementById('final');
    const heartsEmojis = ['💕', '💖', '💗', '💓', '💝', '❤️'];
    
    // Crear contenedor de partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    finalScreen.insertBefore(particlesContainer, finalScreen.firstChild);
    
    // Crear 20 corazones flotantes
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartsEmojis[Math.floor(Math.random() * heartsEmojis.length)];
            heart.style.cssText = `
                position: absolute;
                bottom: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${15 + Math.random() * 25}px;
                opacity: ${0.3 + Math.random() * 0.4};
                animation: floatUp ${8 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            particlesContainer.appendChild(heart);
        }, i * 200);
    }
}

// Añadir estilos para partículas flotantes
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-120vh) translateX(${Math.random() > 0.5 ? '' : '-'}${50 + Math.random() * 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingStyle);

// ==========================================================================
// Button Event Handlers
// ==========================================================================

/**
 * Handle button clicks for steps 1-3
 * @param {Event} event - Click event
 */
function handleButtonClick(event) {
    const button = event.target;
    const answer = button.dataset.answer;
    const stepNumber = parseInt(button.dataset.step);
    
    // Vibrate on mobile
    vibrateDevice(50);
    
    // Add click animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 142);
    
    if (answer === 'yes') {
        // Proceed to next step
        setTimeout(() => {
            goToNextStep();
        }, 285);
    } else if (answer === 'no') {
        // Show intermediate screen
        setTimeout(() => {
            showIntermediate(stepNumber);
        }, 285);
    }
}

/**
 * Handle Step 4 (final question) button clicks
 * @param {Event} event - Click event
 */
function handleFinalStepClick(event) {
    const button = event.target;
    const answer = button.dataset.answer;
    
    if (answer === 'yes') {
        // Vibrate on mobile (longer for final YES)
        vibrateDevice([100, 50, 100]);
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 142);
        
        // Show confetti on mobile
        if (isMobile) {
            createConfettiHearts();
        }
        
        // Show final confirmation
        setTimeout(() => {
            showFinalScreen();
        }, 285);
    }
    // Note: "No" button uses hover handler (runaway effect)
}

// ==========================================================================
// Runaway Button Logic (Step 4)
// ==========================================================================

/**
 * Make the "No" button run away when hovered on final step
 */
function initializeRunawayButton() {
    const runawayButton = document.querySelector('#step-4 .btn-runaway');
    
    if (!runawayButton) return;
    
    function moveButton() {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Get button dimensions
        const buttonRect = runawayButton.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        
        // Calculate safe bounds (keep button on screen)
        const maxX = viewportWidth - buttonWidth - 40;
        const maxY = viewportHeight - buttonHeight - 40;
        
        // Generate random position
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Apply new position
        runawayButton.style.position = 'fixed';
        runawayButton.style.left = `${randomX}px`;
        runawayButton.style.top = `${randomY}px`;
        runawayButton.style.transition = 'all 0.285s ease';
        
        // Vibrate on mobile when button escapes
        vibrateDevice(30);
    }
    
    // Desktop: mouseenter
    runawayButton.addEventListener('mouseenter', moveButton);
    
    // Mobile: touchstart (before tap)
    runawayButton.addEventListener('touchstart', function(event) {
        event.preventDefault();
        moveButton();
    });
    
    // Prevent clicking the runaway button (extra safeguard)
    runawayButton.addEventListener('click', function(event) {
        event.preventDefault();
        moveButton();
    });
}

// ==========================================================================
// Event Listener Attachment
// ==========================================================================

/**
 * Attach event listeners to all buttons
 */
function initializeEventListeners() {
    // Steps 1-3 buttons
    for (let i = 1; i <= 3; i++) {
        const stepButtons = steps[i].querySelectorAll('.btn');
        stepButtons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });
    }
    
    // Step 4 buttons (final question)
    const step4Buttons = steps[4].querySelectorAll('.btn');
    step4Buttons.forEach(button => {
        if (button.dataset.answer === 'yes') {
            button.addEventListener('click', handleFinalStepClick);
        }
    });
    
    // Intermediate "rethink" button
    if (rethinkButton) {
        rethinkButton.addEventListener('click', function() {
            // Vibrate on mobile
            vibrateDevice(50);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 142);
            
            setTimeout(() => {
                returnToPreviousStep();
            }, 285);
        });
    }
    
    // Initialize runaway button for step 4
    initializeRunawayButton();
}

// ==========================================================================
// Initialization
// ==========================================================================

/**
 * Initialize the application when DOM is ready
 */
function init() {
    console.log('💕 Valentine\'s Day Invitation Initialized');
    
    // Mobile-specific enhancements
    if (isMobile) {
        console.log('📱 Mobile device detected - enhanced features enabled');
        lockPortraitOrientation();
        
        // Prevent pull-to-refresh on mobile
        document.body.style.overscrollBehavior = 'none';
        
        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Ensure step 1 is visible on load
    steps[1].classList.add('active');
    
    // Attach all event listeners
    initializeEventListeners();
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(event) {
        // Allow Enter key to activate focused buttons
        if (event.key === 'Enter' && document.activeElement.classList.contains('btn')) {
            document.activeElement.click();
        }
    });
}

// ==========================================================================
// Start Application
// ==========================================================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already ready
    init();
}

// ==========================================================================
// Utility Functions
// ==========================================================================

/**
 * Preload images for smoother transitions
 */
function preloadImages() {
    const imagePaths = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg'];
    
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

// Preload images when script loads
preloadImages();

// ==========================================================================
// Debug helpers (can be removed in production)
// ==========================================================================

// Expose functions to console for debugging
window.valentineDebug = {
    currentStep: () => currentStep,
    goToStep: (stepNum) => {
        if (steps[stepNum]) {
            transitionToStep(steps[currentStep], steps[stepNum]);
            currentStep = stepNum;
        }
    },
    showFinal: () => showFinalScreen(),
    reset: () => {
        transitionToStep(steps[currentStep], steps[1]);
        currentStep = 1;
    }
};

console.log('Debug commands available: window.valentineDebug');
