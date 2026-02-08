/**
 * Romantic Interactive Webpage - Valentine's Day Invitation
 * Pure vanilla JavaScript - no dependencies
 * Handles 4-step flow with intermediate "rethink" screen and final confirmation
 */

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
    }, 800); // Match CSS transition duration
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
}

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
    
    // Add click animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    if (answer === 'yes') {
        // Proceed to next step
        setTimeout(() => {
            goToNextStep();
        }, 300);
    } else if (answer === 'no') {
        // Show intermediate screen
        setTimeout(() => {
            showIntermediate(stepNumber);
        }, 300);
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
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Show final confirmation
        setTimeout(() => {
            showFinalScreen();
        }, 300);
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
    
    runawayButton.addEventListener('mouseenter', function() {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Get button dimensions
        const buttonRect = this.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        
        // Calculate safe bounds (keep button on screen)
        const maxX = viewportWidth - buttonWidth - 40;
        const maxY = viewportHeight - buttonHeight - 40;
        
        // Generate random position
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Apply new position
        this.style.position = 'fixed';
        this.style.left = `${randomX}px`;
        this.style.top = `${randomY}px`;
        this.style.transition = 'all 0.3s ease';
    });
    
    // Prevent clicking the runaway button (extra safeguard)
    runawayButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Move it again just in case they managed to click
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonRect = this.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        const maxX = viewportWidth - buttonWidth - 40;
        const maxY = viewportHeight - buttonHeight - 40;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        this.style.position = 'fixed';
        this.style.left = `${randomX}px`;
        this.style.top = `${randomY}px`;
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
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            setTimeout(() => {
                returnToPreviousStep();
            }, 300);
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
