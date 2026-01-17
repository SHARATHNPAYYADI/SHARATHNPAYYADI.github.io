// ===== Navigation Scroll Effect =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');

navToggle.addEventListener('click', () => {
  const isOpen = !navMobile.classList.contains('hidden');
  
  if (isOpen) {
    navMobile.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  } else {
    navMobile.classList.remove('hidden');
    iconMenu.classList.add('hidden');
    iconClose.classList.remove('hidden');
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for grid items
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Update Copyright Year =====
const yearElement = document.querySelector('.footer-content p');
if (yearElement) {
  yearElement.innerHTML = yearElement.innerHTML.replace('2024', new Date().getFullYear());
}


// ===== Continuous ROS Terminal Animation =====
const terminalLine = document.getElementById('terminal-line');

const terminalSequence = [
  '$ ./autonomous_system --startup',
  '[INFO] Booting robot controller',
  '[INFO] Initializing sensors',
  '[OK] Perception module online',
  '[OK] Motion planner ready',
  '[STATUS] System running'
];

let lineIndex = 0;
let charIndex = 0;
let state = 'typing';
let pauseCounter = 0;

function runTerminal() {
  if (!terminalLine) return;

  const currentLine = terminalSequence[lineIndex];

  if (state === 'typing') {
    if (charIndex < currentLine.length) {
      terminalLine.textContent += currentLine[charIndex];
      charIndex++;
    } else {
      state = 'pause';
      pauseCounter = 0;
    }
  }

  else if (state === 'pause') {
    pauseCounter++;
    if (pauseCounter > 15) { // ~900ms pause
      state = 'clear';
    }
  }

  else if (state === 'clear') {
    terminalLine.textContent = '';
    charIndex = 0;
    lineIndex = (lineIndex + 1) % terminalSequence.length;
    state = 'typing';
  }
}

setInterval(runTerminal, 60);

// ===== Robot Mode Indicator =====
const modeElement = document.getElementById('terminal-mode');

// Change this to 'real' when needed
const ROBOT_MODE = 'sim'; // 'sim' | 'real'

if (modeElement) {
  if (ROBOT_MODE === 'real') {
    modeElement.textContent = 'REAL';
    modeElement.classList.remove('sim');
    modeElement.classList.add('real');
  } else {
    modeElement.textContent = 'SIM';
    modeElement.classList.remove('real');
    modeElement.classList.add('sim');
  }
}

// ===== Switch to REAL mode on CV click =====

document.querySelectorAll('[data-set-mode="real"]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!modeElement) return;

    modeElement.textContent = 'REAL';
    modeElement.classList.remove('sim');
    modeElement.classList.add('real');
  });
});
