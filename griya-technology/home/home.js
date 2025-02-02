AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// aniamsi gulir
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


window.addEventListener('scroll', function() {
const navbar = document.querySelector('.navbar');
if (window.scrollY > 800) { // angka bisa di ubah
navbar.classList.add('scrolled');
} else {
navbar.classList.remove('scrolled');
}
});




function animateValue(id, start, end, duration) {
const obj = document.getElementById(id);
let startTimestamp = null;

const step = (timestamp) => {
if (!startTimestamp) startTimestamp = timestamp;
const progress = Math.min((timestamp - startTimestamp) / duration, 1);
obj.textContent = Math.floor(progress * (end - start) + start);
if (progress < 1) {
  window.requestAnimationFrame(step);
}
};

window.requestAnimationFrame(step);
}

animateValue("projectsacv", 1, 50, 3000);
animateValue("clientsacv", 1, 100, 3000);
animateValue("awardsacv", 1, 10, 3000);







// Typewriter effect with multiple texts
class TypeWriter {
    constructor(element, texts, wait = 3000) {
        this.element = element;
        this.texts = texts;
        this.wait = wait;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.texts.length;
        const fullTxt = this.texts[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = new TypeWriter(document.querySelector('#typewriter'), [
        'Welcome to \n Griya Technology',
        'various digital \n solutions for you',
        'quality and \n professional service'
    ], 3000);
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#64ffda'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64ffda',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'bounce',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Mouse Trail Effect
const canvas = document.getElementById('mouse-trail');
const ctx = canvas.getContext('2d');
let particles = [];

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class for mouse trail
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
        
        if (this.size > 0.1) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = `rgba(100, 255, 218, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Mouse movement handler
window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.x, e.y));
    }
});

// Animation loop for mouse trail
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}

animate();

// Counter Animation
const counters = document.querySelectorAll('.stat-number');

counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.round(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    // Start counter animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});











        // Belajar javascript (membuat animasi counter)
// mereplika animasi counter
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    // memisah angka ribuan
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    // easing animasi counter
    const animateCounter = (counter, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // smooth animasi
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            counter.textContent = formatNumber(current);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.textContent = formatNumber(end);
                
                // silakan menambahkan effect highlight sesuka hati disini (jangan aneh aneh biar tidak crash)
                counter.style.animation = 'counterHighlight 0.5s ease-out';
            }
        };
        window.requestAnimationFrame(step);
    };

    // observer ketika animasi dilihat
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                // animasi target
                animateCounter(counter, 0, target, 2500); // 2.5 detik
                
                // unobserve pas animasi dimulai
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    // belajar styling di javascript :)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes counterHighlight {
            0% {
                color: #2563eb;
                transform: scale(1);
            }
            50% {
                color: #1e40af;
                transform: scale(1.1);
            }
            100% {
                color: #1e40af;
                transform: scale(1);
            }
        }
        
        .achievement-item h3 {
            position: relative;
        }
        
        .achievement-item h3::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #2563eb, #1e40af);
            transition: width 0.3s ease;
        }
        
        .achievement-item:hover h3::after {
            width: 50%;
        }
    `;
    document.head.appendChild(style);

    // observe semua counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// mereset kalau section belum di scrol
// counnter jalan ketika divisit lagi

// observver section
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            resetCounters();
        }
    });
}, { threshold: 0 });

// observe about
const aboutSection = document.querySelector('.about-section');
sectionObserver.observe(aboutSection);
