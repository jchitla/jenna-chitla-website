// Simple Implementation Journey Game
console.log('Script loaded!');

let gameRunning = false;
let score = 0;
let birdY = 200;
let birdSpeed = 0;
let gameInterval = null;
let currentPhase = 0;

const phases = [
    { name: 'Discovery', icon: '🔍', desc: 'Understanding client needs', target: 50 },
    { name: 'Design', icon: '⚙️', desc: 'Creating architecture', target: 100 },
    { name: 'Testing', icon: '🧪', desc: 'Validating solution', target: 150 },
    { name: 'Launch', icon: '🚀', desc: 'Going live!', target: 200 }
];

function startGame() {
    console.log('Starting game...');
    
    // Reset game state
    gameRunning = true;
    score = 0;
    birdY = 200;
    birdSpeed = 0;
    currentPhase = 0;
    phaseProgress = 0;
    
    // Start game loop
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 50);
    
    console.log('Game started!');
}

function gameLoop() {
    if (!gameRunning) return;
    
    // Apply gravity
    birdSpeed += 0.5;
    birdY += birdSpeed;
    
    // Update bird position
    const bird = document.getElementById('bird');
    if (bird) {
        bird.style.top = birdY + 'px';
    }
    
    // Check if hit ground
    if (birdY > 350) {
        gameOver();
        return;
    }
    
    // Update score
    score += 1;
    
    // Check for phase progression
    if (currentPhase < phases.length && score >= phases[currentPhase].target) {
        showPhasePopup();
        currentPhase++;
    }
    
    // Update progress bar
    updateProgressBar();
}

function showPhasePopup() {
    if (currentPhase < phases.length) {
        const popup = document.getElementById('phase-popup');
        const icon = document.getElementById('popup-icon');
        const text = document.getElementById('popup-text');
        const desc = document.getElementById('popup-desc');
        
        icon.textContent = phases[currentPhase].icon;
        text.textContent = phases[currentPhase].name + ' Phase';
        desc.textContent = phases[currentPhase].desc;
        
        popup.style.display = 'block';
        
        // Hide after 2 seconds
        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }
}

function updateProgressBar() {
    const phaseName = document.getElementById('current-phase');
    const progressFill = document.getElementById('phase-fill');
    
    if (currentPhase < phases.length) {
        phaseName.textContent = phases[currentPhase].name;
        const progress = Math.min(100, (score / phases[currentPhase].target) * 100);
        progressFill.style.width = progress + '%';
        
        // Mark milestone as completed
        const milestone = document.getElementById(`milestone-${currentPhase + 1}`);
        if (milestone) {
            milestone.classList.add('completed');
        }
    } else {
        phaseName.textContent = 'Complete!';
        progressFill.style.width = '100%';
    }
}

function flap() {
    if (!gameRunning) return;
    console.log('Flap!');
    birdSpeed = -8;
}

function gameOver() {
    console.log('Game over!');
    gameRunning = false;
    clearInterval(gameInterval);
    document.getElementById('final-score').textContent = Math.floor(score / 10);
    document.getElementById('game-over').style.display = 'flex';
}

function restartGame() {
    console.log('Restarting...');
    document.getElementById('game-over').style.display = 'none';
    clearInterval(gameInterval);
    startGame();
}

function completeGame() {
    console.log('Completing...');
    document.getElementById('flying-game').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Event listeners
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        flap();
    }
});

document.addEventListener('click', function(e) {
    if (gameRunning) {
        flap();
    }
});

// Test function
function testFunction() {
    console.log('Test button clicked!');
    alert('JavaScript is working!');
}

// Make functions global
window.startGame = startGame;
window.flap = flap;
window.restartGame = restartGame;
window.completeGame = completeGame;
window.testFunction = testFunction;

function updateGameScene(step) {
    const gameWorld = document.getElementById('game-world');
    const jennaCharacter = document.getElementById('jenna-character');
    const clientCharacter = document.getElementById('client-character');
    const teamMember1 = document.getElementById('team-member-1');
    const teamMember2 = document.getElementById('team-member-2');
    const computer1 = document.getElementById('computer-1');
    const computer2 = document.getElementById('computer-2');
    const whiteboard = document.getElementById('whiteboard');
    const server = document.getElementById('server');
    
    // Update progress dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index < step - 1) {
            dot.classList.add('completed');
        } else if (index === step - 1) {
            dot.classList.add('active');
        }
    });
    
    // Update game world background
    gameWorld.className = `game-world scene-${step}`;
    
    // Character positions and animations for each step
    const sceneConfigs = [
        // Step 1: Welcome - Jenna meets client
        {
            jenna: { left: '20%', animation: 'characterTalk' },
            client: { left: '70%', animation: 'characterIdle' },
            team1: { left: '10%', animation: 'characterIdle', visible: false },
            team2: { left: '90%', animation: 'characterIdle', visible: false },
            objects: { computer1: '30%', computer2: '60%', whiteboard: '50%', server: '80%' }
        },
        // Step 2: Discovery - Team discussion
        {
            jenna: { left: '30%', animation: 'characterTalk' },
            client: { left: '60%', animation: 'characterTalk' },
            team1: { left: '15%', animation: 'characterIdle', visible: true },
            team2: { left: '75%', animation: 'characterIdle', visible: true },
            objects: { computer1: '25%', computer2: '55%', whiteboard: '45%', server: '85%' }
        },
        // Step 3: Design - Working on computers
        {
            jenna: { left: '25%', animation: 'characterWalk' },
            client: { left: '70%', animation: 'characterIdle' },
            team1: { left: '10%', animation: 'characterWalk', visible: true },
            team2: { left: '80%', animation: 'characterWalk', visible: true },
            objects: { computer1: '20%', computer2: '50%', whiteboard: '40%', server: '75%' }
        },
        // Step 4: Testing - Team collaboration
        {
            jenna: { left: '40%', animation: 'characterTalk' },
            client: { left: '65%', animation: 'characterIdle' },
            team1: { left: '20%', animation: 'characterTalk', visible: true },
            team2: { left: '75%', animation: 'characterTalk', visible: true },
            objects: { computer1: '15%', computer2: '45%', whiteboard: '35%', server: '70%' }
        },
        // Step 5: Celebration - Success!
        {
            jenna: { left: '50%', animation: 'characterCelebrate' },
            client: { left: '60%', animation: 'characterCelebrate' },
            team1: { left: '30%', animation: 'characterCelebrate', visible: true },
            team2: { left: '70%', animation: 'characterCelebrate', visible: true },
            objects: { computer1: '20%', computer2: '40%', whiteboard: '50%', server: '80%' }
        }
    ];
    
    const config = sceneConfigs[step - 1];
    if (config) {
        // Update Jenna
        jennaCharacter.style.left = config.jenna.left;
        jennaCharacter.querySelector('.character-sprite').style.animation = `${config.jenna.animation} 2s infinite`;
        
        // Update Client
        clientCharacter.style.left = config.client.left;
        clientCharacter.querySelector('.character-sprite').style.animation = `${config.client.animation} 2s infinite`;
        
        // Update Team Members
        teamMember1.style.left = config.team1.left;
        teamMember1.style.display = config.team1.visible ? 'block' : 'none';
        teamMember1.querySelector('.character-sprite').style.animation = `${config.team1.animation} 2s infinite`;
        
        teamMember2.style.left = config.team2.left;
        teamMember2.style.display = config.team2.visible ? 'block' : 'none';
        teamMember2.querySelector('.character-sprite').style.animation = `${config.team2.animation} 2s infinite`;
        
        // Update Objects
        computer1.style.left = config.objects.computer1;
        computer2.style.left = config.objects.computer2;
        whiteboard.style.left = config.objects.whiteboard;
        server.style.left = config.objects.server;
    }
}

function selectOption(option) {
    // Remove selected class from all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.target.classList.add('selected');
    
    // Auto-advance after a short delay
    setTimeout(() => {
        nextStep();
    }, 500);
}

function completeOnboarding() {
    // Hide onboarding experience
    document.getElementById('onboarding').style.display = 'none';
    
    // Show main content
    document.getElementById('main-content').style.display = 'block';
    
    // Smooth scroll to main content
    document.getElementById('main-content').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Auto-start the game when page loads
    setTimeout(() => {
        startGame();
    }, 500);
});
