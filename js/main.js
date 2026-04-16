let typedTimeout;
let typedDeleting = false;
let typedCharIndex = 0;
let typedRoleIndex = 0;
const typedEl = document.getElementById('typed');

function startTyped(roles) {
  if (!typedEl) return;
  if (!roles || !Array.isArray(roles) || roles.length === 0) return;
  
  if (typedTimeout) clearTimeout(typedTimeout);
  
  const current = roles[typedRoleIndex];
  if (!current) return;
  
  if (!typedDeleting) {
    typedEl.textContent = current.slice(0, ++typedCharIndex);
    
    if (typedCharIndex === current.length) {
      typedTimeout = setTimeout(() => {
        typedDeleting = true;
        startTyped(roles);
      }, 1800);
    } else {
      typedTimeout = setTimeout(() => startTyped(roles), 100);
    }
  } else {
    typedEl.textContent = current.slice(0, --typedCharIndex);
    
    if (typedCharIndex === 0) {
      typedDeleting = false;
      typedRoleIndex = (typedRoleIndex + 1) % roles.length;
      typedTimeout = setTimeout(() => startTyped(roles), 300);
    } else {
      typedTimeout = setTimeout(() => startTyped(roles), 60);
    }
  }
}

window.restartTyped = (roles) => {
  if (typedTimeout) clearTimeout(typedTimeout);
  typedCharIndex = 0;
  typedRoleIndex = 0;
  typedDeleting = false;
  
  if (typedEl && roles && Array.isArray(roles) && roles.length > 0) {
    typedEl.textContent = '';
    startTyped(roles);
  }
};

function initBurgerMenu() {
  const burger = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!burger || !mobileMenu) return;
  
  const mobileLinks = mobileMenu.querySelectorAll('a');
  
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !burger.contains(e.target)) {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  function update() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('nav-active', a.getAttribute('href') === `#${current}`);
    });
  }
  
  window.addEventListener('scroll', update, { passive: true });
  update();
}

document.addEventListener('DOMContentLoaded', function () {
  if (window.i18n) {
    window.i18n.initLangSwitcher();
  }
  
  initBurgerMenu();
  
  const defaultRoles = ['Backend Developer', 'Python Engineer', 'Go Enthusiast', 'Security Researcher'];
  window.typedRoles = defaultRoles;
  if (typedEl) startTyped(defaultRoles);
  
  initScrollAnimations();
  initYear();
  initNavHighlight();
});