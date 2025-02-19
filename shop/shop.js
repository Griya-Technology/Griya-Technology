
AOS.init({
    duration: 1000,
    once: true
});


const launchDate = new Date();
launchDate.setMonth(launchDate.getMonth() + 3);





function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}


setInterval(updateCountdown, 1000);
updateCountdown();






function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}


const productCount = document.getElementById('productCount');
const brandCount = document.getElementById('brandCount');
const subscriberCount = document.getElementById('subscriberCount');


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'productCount') animateCounter(entry.target, 1000);
            if (entry.target.id === 'brandCount') animateCounter(entry.target, 50);
            if (entry.target.id === 'subscriberCount') animateCounter(entry.target, 500);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(productCount);
observer.observe(brandCount);
observer.observe(subscriberCount);




document.querySelector('.subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Terima kasih telah subscribe! Kami akan mengirimkan update ke: ${email}`);
    this.reset();
});





document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.width = '75%';
    }, 500);
});
