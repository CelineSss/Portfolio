// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation handler
const animateElement = (element) => {
    // Remove existing animation
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    
    // Add animation class based on element type
    if (element.classList.contains('education-title')) {
        element.style.animation = 'fadeInUp 1s ease forwards 0.3s';
    } else if (element.classList.contains('education-image')) {
        element.style.animation = 'fadeInLeft 1s ease forwards';
    } else if (element.classList.contains('university')) {
        const delay = element.classList.contains('animate-delay-1') ? '0.4s' : '0.6s';
        element.style.animation = `fadeInUp 1s ease forwards ${delay}`;
    }
};

// Intersection Observer setup
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateElement(entry.target);
        } else {
            // Reset animation when element is out of view
            entry.target.style.animation = 'none';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-50px'
});

// Observe all animated elements
document.querySelectorAll('.university, .education-image, .education-title').forEach((element) => {
    observer.observe(element);
});

// Skills animation
const animateSkills = () => {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach(item => {
                    item.classList.add('animate');
                });
            } else {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach(item => {
                    item.classList.remove('animate');
                });
            }
        });
    }, {
        threshold: 0.5
    });

    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
};

// Particle creation function
function createParticles() {
    const skillsSection = document.querySelector('.skills-section');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random initial position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Animation
        particle.style.animation = `
            float ${Math.random() * 10 + 5}s linear infinite,
            glow ${Math.random() * 2 + 1}s ease-in-out infinite alternate
        `;

        skillsSection.appendChild(particle);
    }
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
        }
        50% {
            transform: translateY(-${Math.random() * 100 + 50}px) translateX(${Math.random() * 40 - 20}px);
        }
        100% {
            transform: translateY(0) translateX(0);
        }
    }

    @keyframes glow {
        from {
            opacity: 0.2;
        }
        to {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    createParticles();
});

// Add this typing animation function
function typeWriter(text, element, speed = 100, delay = 500) {
    let i = 0;
    // Wait for initial delay before starting
    setTimeout(() => {
        // First clear the element
        element.textContent = '';
        
        // Then start typing
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Add blinking cursor at the end
                element.classList.add('typing-done');
            }
        }
        type();
    }, delay);
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Your existing code...
    
    // Add typing effect
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        typeWriter('Siew Zhen Lynn', typingText, 150, 1000);
    }
});

document.querySelectorAll('.doc-btn, .code-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default action
        window.open(this.href, '_blank'); 
    });
});