const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.firstElementChild.classList.toggle('fa-bars');
    menuBtn.firstElementChild.classList.toggle('fa-xmark');
});

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.firstElementChild.classList.add('fa-bars');
        menuBtn.firstElementChild.classList.remove('fa-xmark');
    });
});

const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.firstElementChild.className = 'fa-solid fa-moon';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.firstElementChild.className = 'fa-solid fa-sun';
    }
});




const words = ["Engineer.", "AI Developer.", "Robotics Specialist."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextSpan = document.querySelector(".typed-text");

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; 
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", () => setTimeout(type, 1000));

function runCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 100;
            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target');
        bar.style.width = targetWidth;
    });
}

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
const scrollTopBtn = document.getElementById('scrollTopBtn');
let counterTriggered = false;

window.addEventListener('scroll', () => {
    let current = '';
    
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }

        if (window.scrollY > (section.offsetTop - window.innerHeight + 100)) {
            section.classList.add('active');
            
            if (section.getAttribute('id') === 'skills') {
                animateProgressBars();
            }
            if (section.getAttribute('id') === 'achievements' && !counterTriggered) {
                runCounters();
                counterTriggered = true;
            }
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});