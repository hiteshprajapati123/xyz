// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMusic();
    initProposalButtons();
    initReplyForm();
    initAnimations();
    initFloatingHearts();
    initScrollEffects();
    initHeartCanvas();
    
    // Smooth scrolling for navigation
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
});

// Music functionality
function initMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const lyricsToggle = document.getElementById('lyricsToggle');
    let isPlaying = false;

    // Initialize lyrics functionality
    initLyrics();

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('.music-text').textContent = 'Music';
        } else {
            // Play Bollywood romantic song
            backgroundMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.querySelector('.music-text').textContent = 'Samjhawan';
                isPlaying = true;
                
                // Show lyrics container when music starts
                setTimeout(() => {
                    lyricsContainer.classList.add('show');
                }, 1000);
            }).catch(error => {
                console.log('Audio play failed:', error);
                // Fallback to Web Audio API melody
                playRomanticMelody();
                musicToggle.classList.add('playing');
                musicToggle.querySelector('.music-text').textContent = 'Samjhawan';
                isPlaying = true;
                
                // Show lyrics container
                setTimeout(() => {
                    lyricsContainer.classList.add('show');
                }, 1000);
            });
            return;
        }
        
        // Hide lyrics when music stops
        if (!isPlaying) {
            lyricsContainer.classList.remove('show');
        }
        
        isPlaying = !isPlaying;
    });
    
    // Handle audio events
    backgroundMusic.addEventListener('ended', () => {
        // Loop the song
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    });
    
    backgroundMusic.addEventListener('error', (e) => {
        console.log('Audio error, falling back to Web Audio melody');
        // Fallback to generated melody if audio file fails
        if (isPlaying) {
            playRomanticMelody();
        }
    });
}

// Lyrics functionality
function initLyrics() {
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsText = document.getElementById('lyricsText');
    let lyricsVisible = false;
    
    // Sample romantic lyrics structure - you can replace with your own
    const sampleLyrics = [
        "🎵 [Add your romantic song lyrics here] 🎵",
        "",
        "💕 Instructions to add Samjhawan lyrics:",
        "1. Find the lyrics online (legally)",
        "2. Replace this text in the JavaScript",
        "3. Each line should be a separate array item",
        "",
        "✨ The lyrics will display beautifully",
        "with romantic animations and styling! ✨"
    ];
    
    lyricsToggle.addEventListener('click', () => {
        if (!lyricsVisible) {
            // Show lyrics
            lyricsText.innerHTML = sampleLyrics.map((line, index) => 
                `<p class="lyrics-line" style="animation-delay: ${index * 0.1}s">${line}</p>`
            ).join('');
            
            lyricsToggle.textContent = 'Hide Lyrics';
            lyricsVisible = true;
            
            // Animate lyrics appearance
            setTimeout(() => {
                document.querySelectorAll('.lyrics-line').forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }, 100);
        } else {
            // Hide lyrics
            lyricsText.innerHTML = '<p class="lyrics-line">Click to show romantic lyrics...</p>';
            lyricsToggle.textContent = 'Show Lyrics';
            lyricsVisible = false;
        }
    });
}

// Create a simple romantic melody using Web Audio API
function playRomanticMelody() {
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const audioContext = window.audioContext;
    
    // Bollywood-inspired romantic melody notes
    const melody = [
        { freq: 523.25, duration: 0.5 }, // C5
        { freq: 587.33, duration: 0.3 }, // D5
        { freq: 659.25, duration: 0.4 }, // E5
        { freq: 698.46, duration: 0.3 }, // F5
        { freq: 783.99, duration: 0.8 }, // G5
        { freq: 880.00, duration: 0.4 }, // A5
        { freq: 783.99, duration: 0.3 }, // G5
        { freq: 659.25, duration: 0.4 }, // E5
        { freq: 587.33, duration: 0.3 }, // D5
        { freq: 523.25, duration: 0.8 }, // C5
        { freq: 493.88, duration: 0.4 }, // B4
        { freq: 523.25, duration: 1.2 }, // C5
    ];
    
    let currentTime = audioContext.currentTime;
    
    melody.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'triangle'; // Warmer sound for Bollywood feel
        
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        currentTime += note.duration;
    });
    
    // Loop the melody
    setTimeout(() => {
        if (document.getElementById('musicToggle').classList.contains('playing')) {
            playRomanticMelody();
        }
    }, (currentTime - audioContext.currentTime) * 1000);
}

// Proposal buttons functionality
function initProposalButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseContainer = document.getElementById('responseContainer');

    yesBtn.addEventListener('click', () => {
        // Create celebration
        createFireworks();
        createConfetti();
        showYesResponse();
        
        // Add extra sparkle to the button
        yesBtn.classList.add('rainbow-text');
        
        // Play celebration sound
        playCelebrationSound();
    });

    noBtn.addEventListener('click', () => {
        showNoResponse();
        createSadAnimation();
    });
}

function showYesResponse() {
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = `
        <div class="response-yes" style="text-align: center; animation: fadeInScale 1s ease-out;">
            <h3 style="font-family: 'Dancing Script', cursive; font-size: 2.5rem; color: #ff6b6b; margin-bottom: 20px;">
                💕 You said YES! 💕
            </h3>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">
                I'm the luckiest person in the world! 🌟
            </p>
            <div class="celebration-gif" style="font-size: 3rem; animation: heartBeat 1s ease-in-out infinite;">
                🎉 💖 🎊 💍 ✨
            </div>
            <p style="font-style: italic; margin-top: 20px; color: #666;">
                "Every love story is beautiful, but ours is my favorite." 💕
            </p>
        </div>
    `;
    
    // Add CSS for fadeInScale animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

function showNoResponse() {
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = `
        <div class="response-no" style="text-align: center; animation: fadeInScale 1s ease-out;">
            <h3 style="font-family: 'Dancing Script', cursive; font-size: 2rem; color: #666; margin-bottom: 20px;">
                🥺 That's okay...
            </h3>
            <div class="sad-animation" style="font-size: 3rem; margin: 20px 0;">
                😢 💔 🐶
            </div>
            <p style="font-size: 1rem; color: #666; font-style: italic;">
                Maybe you need more time to think about it? 💭
            </p>
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #ffb3ba; border: none; border-radius: 25px; cursor: pointer;">
                Let me try again 💕
            </button>
        </div>
    `;
}

// Reply form functionality
function initReplyForm() {
    const replyForm = document.getElementById('replyForm');
    const formResponse = document.getElementById('formResponse');

    replyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = document.getElementById('message').value.trim();
        
        if (message) {
            // Show immediate feedback while form submits
            formResponse.innerHTML = `
                <div class="form-sending">
                    <h3 style="color: #ff6b6b; margin-bottom: 15px;">💌 Sending your message...</h3>
                    <p>Your beautiful words are being delivered with love!</p>
                    <div style="margin-top: 20px; font-size: 2rem;">
                        💕 ✨ 💖 ✨ 💕
                    </div>
                </div>
            `;
            formResponse.className = 'form-response sending';
            
            // Create heart animation
            createFloatingHearts(20);
            
            try {
                // Submit form data to Formspree
                const formData = new FormData(replyForm);
                const response = await fetch(replyForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    formResponse.innerHTML = `
                        <div class="form-success">
                            <h3 style="color: #059669; margin-bottom: 15px;">💌 Message Delivered!</h3>
                            <p>Your beautiful words have been received with all my love!</p>
                            <div style="margin-top: 20px; font-size: 2rem;">
                                💕 ✨ 💖 ✨ 💕
                            </div>
                        </div>
                    `;
                    formResponse.className = 'form-response success';
                    createFloatingHearts(30);
                    
                    // Reset form
                    document.getElementById('message').value = '';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error handling
                formResponse.innerHTML = `
                    <div class="form-error">
                        <h3 style="color: #dc2626; margin-bottom: 15px;">💔 Oops!</h3>
                        <p>There was an issue sending your message. Please try again!</p>
                        <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #ff6b6b; color: white; border: none; border-radius: 25px; cursor: pointer;">
                            Try Again 💕
                        </button>
                    </div>
                `;
                formResponse.className = 'form-response error';
            }
        } else {
            // Show validation message
            formResponse.innerHTML = `
                <div class="form-validation">
                    <h3 style="color: #f59e0b; margin-bottom: 15px;">💭 Your thoughts?</h3>
                    <p>Please share your beautiful thoughts with me!</p>
                </div>
            `;
            formResponse.className = 'form-response validation';
        }
    });
}

// Animation effects
function initAnimations() {
    // Simple AOS-like functionality
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Floating hearts animation
function initFloatingHearts() {
    const heroSection = document.querySelector('.hero');
    const heartsContainer = heroSection.querySelector('.floating-hearts');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: 100%;
            pointer-events: none;
            z-index: 1;
            animation: floatUp ${Math.random() * 3 + 4}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000);
    }
    
    // Add CSS for floatUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create hearts periodically
    setInterval(createHeart, 2000);
}

// Scroll effects
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Update navigation background
        const nav = document.querySelector('.nav');
        if (scrolled > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 5px 20px rgba(255, 179, 186, 0.2)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Heart canvas background
function initHeartCanvas() {
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Heart particles array
    const hearts = [];
    
    // Heart particle class
    class HeartParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 15 + 10;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.color = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 186}, ${this.opacity})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px Arial`;
            ctx.fillText('💕', this.x, this.y);
            ctx.restore();
        }
    }
    
    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        hearts.push(new HeartParticle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Celebration effects
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    fireworksContainer.innerHTML = '';
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.innerHTML = '✨';
            firework.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${Math.random() * 30 + 20}px;
                animation: firework 2s ease-out forwards;
                pointer-events: none;
            `;
            
            fireworksContainer.appendChild(firework);
            
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 2000);
        }, i * 200);
    }
    
    // Add firework animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes firework {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0.5) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    
    const confettiColors = ['🎊', '🎉', '✨', '💖', '💕', '🌟'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -10%;
                font-size: ${Math.random() * 25 + 15}px;
                animation: confettiFall ${Math.random() * 3 + 4}s linear forwards;
                pointer-events: none;
            `;
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 7000);
        }, i * 100);
    }
    
    // Add confetti animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function createFloatingHearts(count = 10) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: 100%;
                font-size: ${Math.random() * 30 + 20}px;
                z-index: 9999;
                pointer-events: none;
                animation: floatUpHeart ${Math.random() * 2 + 3}s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }, i * 200);
    }
    
    // Add floating heart animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUpHeart {
            0% {
                transform: translateY(0) scale(0);
                opacity: 1;
            }
            50% {
                transform: translateY(-50vh) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function createSadAnimation() {
    // Create falling tears
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const tear = document.createElement('div');
            tear.innerHTML = '💧';
            tear.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: 10%;
                font-size: 20px;
                z-index: 9999;
                pointer-events: none;
                animation: tearFall 3s ease-out forwards;
            `;
            
            document.body.appendChild(tear);
            
            setTimeout(() => {
                if (tear.parentNode) {
                    tear.parentNode.removeChild(tear);
                }
            }, 3000);
        }, i * 300);
    }
    
    // Add tear animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tearFall {
            0% {
                transform: translateY(0);
                opacity: 1;
            }
            100% {
                transform: translateY(80vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Celebration sound using Web Audio API
function playCelebrationSound() {
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const audioContext = window.audioContext;
    
    // Create a celebration melody
    const celebrationNotes = [
        { freq: 523.25, duration: 0.2 }, // C5
        { freq: 659.25, duration: 0.2 }, // E5
        { freq: 783.99, duration: 0.2 }, // G5
        { freq: 1046.5, duration: 0.4 }, // C6
        { freq: 783.99, duration: 0.2 }, // G5
        { freq: 1046.5, duration: 0.6 }, // C6
    ];
    
    let currentTime = audioContext.currentTime;
    
    celebrationNotes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        currentTime += note.duration;
    });
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add some fun interactions
document.addEventListener('mousemove', (e) => {
    // Create small hearts that follow the mouse occasionally
    if (Math.random() < 0.02) { // 2% chance
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            animation: fadeOutUp 2s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
});

// Add fadeOutUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutUp {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code for extra hearts
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger massive heart explosion!
        createFloatingHearts(50);
        konamiCode = [];
        
        // Show secret message
        setTimeout(() => {
            alert('💕 Secret heart explosion activated! You found the Easter egg! 💕');
        }, 1000);
    }
});

console.log('💖 Welcome to our love story! 💖');
console.log('🌟 Built with love for Janvi 🌟');
console.log('✨ Try the Konami code for a surprise! ✨');