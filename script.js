// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (document.body.classList.contains('menu-open')) return; // add this line
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
let scrollPosition = 0;

function openMenu() {
    scrollPosition = window.scrollY;
    navLinks.classList.add('open');
    document.body.classList.add('menu-open');
    document.body.style.top = `-${scrollPosition}px`;
}

function closeMenu() {
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);

    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
}

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation class and observe elements
const animateElements = document.querySelectorAll(
    '.service-card, .pest-card, .process-step, .why-feature, .why-card-main'
);

// Inject animation styles
const style = document.createElement('style');
style.textContent = `
  .service-card,
  .pest-card,
  .process-step,
  .why-feature,
  .why-card-main {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .service-card.visible,
  .pest-card.visible,
  .process-step.visible,
  .why-feature.visible,
  .why-card-main.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

animateElements.forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById('quoteForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const type = document.getElementById('type').value;

    if (!name || !phone || !service || !type) {
        alert('Please fill in all required fields.');
        return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        form.reset();
        submitBtn.textContent = 'Request Free Quote ✓';
        submitBtn.disabled = false;
        successMsg.style.display = 'block';

        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }, 1500);
});

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--teal)';
        }
    });
});

// ===== COUNTER ANIMATION (Hero Stats) =====
function animateCounter(el, target, duration = 1500) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const suffix = el.dataset.suffix || '';
        el.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Trigger counters when hero is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNums = document.querySelectorAll('.stat-num');
            statNums.forEach(stat => {
                const text = stat.textContent;
                const num = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, num);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== WHATSAPP FLOAT (optional) =====
const waFloat = document.createElement('a');
waFloat.href = 'https://wa.me/918446104688?text=Hi%20KatX%2C%20I%20need%20pest%20control%20help!';
waFloat.target = '_blank';
waFloat.rel = 'noopener';
waFloat.innerHTML = `
  <div style="
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    background: #25D366;
    color: white;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    box-shadow: 0 4px 20px rgba(37,211,102,0.4);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  " 
  onmouseover="this.style.transform='scale(1.1)';this.style.boxShadow='0 6px 28px rgba(37,211,102,0.6)'"
  onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 4px 20px rgba(37,211,102,0.4)'"
  title="Chat on WhatsApp"
  >💬</div>
`;
document.body.appendChild(waFloat);

console.log('✅ KatX Pest Control website loaded successfully.');