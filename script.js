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
    element.style.animation = 'none';
    element.offsetHeight; 
    
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

// Name typing animation
function typeWriter(text, element, speed = 100, delay = 500) {
    let i = 0;
    setTimeout(() => {
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('typing-done');
            }
        }
        type();
    }, delay);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    // Typing effect
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        typeWriter('Siew Zhen Lynn', typingText, 150, 1000);
    }
});