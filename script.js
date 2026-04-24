function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// ===== SCROLL REVEAL ANIMATION =====
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// ===== CAROUSEL =====
let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const slides = track ? track.querySelectorAll('.carousel-slide') : [];
const total = slides.length;
const indicatorsEl = document.getElementById('indicators');

if (indicatorsEl && slides.length > 0) {
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'indicator' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        indicatorsEl.appendChild(dot);
    });
}

function goToSlide(n) {
    if (slides.length === 0) return;
    currentSlide = (n + total) % total;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.indicator').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() { 
    if (slides.length > 0) goToSlide(currentSlide + 1); 
}

function previousSlide() { 
    if (slides.length > 0) goToSlide(currentSlide - 1); 
}

// Auto-advance carousel every 16 seconds
if (slides.length > 0) {
    setInterval(() => nextSlide(), 16000);
}

// ===== ACCORDION (inside carousel) =====
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    if (!content) return;
    
    const isOpen = btn.classList.contains('open');
    // Close siblings
    const list = btn.closest('.accordion-list');
    if (list) {
        list.querySelectorAll('.accordion-btn').forEach(b => {
            b.classList.remove('open');
            if (b.nextElementSibling) {
                b.nextElementSibling.classList.remove('open');
            }
        });
    }
    
    if (!isOpen) {
        btn.classList.add('open');
        content.classList.add('open');
    }
}

// ===== DEP ACCORDION =====
function toggleDep(btn) {
    const content = btn.nextElementSibling;
    if (!content) return;
    
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.dep-btn').forEach(b => {
        b.classList.remove('open');
        if (b.nextElementSibling) {
            b.nextElementSibling.classList.remove('open');
        }
    });
    
    if (!isOpen) {
        btn.classList.add('open');
        content.classList.add('open');
    }
}
document.fonts.ready.then(() => {
    document.querySelectorAll('.team-member').forEach(el => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'border-svg');
        svg.setAttribute('aria-hidden', 'true');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'border-rect');
        path.setAttribute('fill', 'none');

        svg.appendChild(path);
        el.appendChild(svg);

        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const r = 23;

        svg.setAttribute('width', w);
        svg.setAttribute('height', h);

       path.setAttribute('d', `
    M ${r} 1
    L ${w - r} 1
    Q ${w - 1} 1 ${w - 1} ${r}
    L ${w - 1} ${h - r}
    Q ${w - 1} ${h - 1} ${w - r} ${h - 1}
    L ${r} ${h - 1}
    Q 1 ${h - 1} 1 ${h - r}
    L 1 ${r}
    Q 1 1 ${r} 1
`);

        const perimeter = path.getTotalLength();
        const extra = perimeter + 2;

        path.style.setProperty('--perimeter', extra);
        path.style.strokeDasharray = extra;
        path.style.strokeDashoffset = extra;

        el.addEventListener('mouseleave', () => {
            path.style.animation = 'none';
            path.style.strokeDashoffset = extra;
            void path.getBoundingClientRect();
            path.style.animation = '';
        });
    });
});
// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initial reveal for elements already in view
    reveal();
    
    // Smooth scroll with header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 30;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
