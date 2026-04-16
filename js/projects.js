const PROJECTS = [
  {
    id: 1,
    title: { ru: 'E-commerce API', en: 'E-commerce API' },
    description: {
      ru: 'Backend интернет-магазина на FastAPI: аутентификация, система ролей (buyer/seller/admin), корзина, заказы, интеграция с YooKassa.',
      en: 'E-commerce backend built with FastAPI: authentication, role system (buyer/seller/admin), cart, orders, YooKassa integration.'
    },
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'YooKassa'],
    links: [{ name: 'GitHub', url: 'https://github.com/ZemskovIK/fastapi-ecommerce', type: 'github' }],
    category: 'backend'
  },
  {
    id: 2,
    title: { ru: 'Auth & RBAC System', en: 'Auth & RBAC System' },
    description: {
      ru: 'Система аутентификации и разграничения прав доступа: схема БД для RBAC, JWT с access/refresh-токенами, ротация и отзыв токенов.',
      en: 'Authentication and access control system: RBAC database schema, JWT with access/refresh tokens, token rotation and revocation.'
    },
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'RBAC', 'SQLAlchemy'],
    links: [{ name: 'GitHub', url: 'https://github.com/ZemskovIK/fastapi-auth-rbac', type: 'github' }],
    category: 'backend'
  },
  {
    id: 3,
    title: { ru: 'Портфолио дизайнера интерьера', en: 'Interior Designer Portfolio' },
    description: {
      ru: 'Многостраничный сайт с каталогом проектов. Система отзывов через Supabase, формы обратной связи через EmailJS.',
      en: 'Multi-page website with a project catalog. Review system via Supabase, contact forms via EmailJS.'
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'EmailJS'],
    links: [{ name: 'Demo', url: 'https://romanzemskov.ru', type: 'external' }],
    category: 'frontend'
  },
  {
    id: 4,
    title: { ru: 'Клиент для архива военных писем', en: 'Military Letters Archive Client' },
    description: {
      ru: 'Десктоп-приложение для хакатона "Код Победы". Интерфейс управления архивом с ролевой системой доступа, интеграция с REST API.',
      en: 'Desktop application for the "Victory Code" hackathon. Archive management interface with role-based access control, REST API integration.'
    },
    technologies: ['Python', 'Tkinter', 'REST API', 'JWT'],
    links: [{ name: 'GitHub', url: 'https://github.com/ZemskovIK/Spectre/tree/main/client/desktop', type: 'github' }],
    category: 'fullstack'
  },
  {
    id: 5,
    title: { ru: 'Сайт медицинской IT-компании', en: 'Medical IT Company Website' },
    description: {
      ru: 'Корпоративный сайт-визитка с современным минималистичным дизайном и адаптивной версткой.',
      en: 'Corporate landing page with a modern minimalist design and responsive layout.'
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite'],
    links: [{ name: 'Demo', url: 'https://infomed.tech', type: 'external' }],
    category: 'frontend'
  },
  {
    id: 6,
    title: { ru: 'Персональное портфолио', en: 'Personal Portfolio' },
    description: {
      ru: 'Персональный сайт-портфолио с тёмной темой, терминальным UI и поддержкой двух языков.',
      en: 'Personal portfolio site with a dark theme, terminal UI, and bilingual support.'
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    links: [
      { name: 'Demo', url: 'https://zemskovik.github.io', type: 'external' },
      { name: 'GitHub', url: 'https://github.com/ZemskovIK/zemskovik.github.io', type: 'github' }
    ],
    category: 'frontend'
  }
];

const linkIcons = {
  github: `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  external: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>`
};

let currentFilter = 'all';

function renderProjects(projects, filter = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) {
    console.error('Projects container not found!');
    return;
  }

  const lang = window.i18n?.currentLang || 'ru';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  container.innerHTML = filtered.map(project => {
    const title = project.title[lang] || project.title.ru;
    const description = project.description[lang] || project.description.ru;
    const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    const linksHtml = project.links.map(link => `
      <a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="${link.name}">
        ${linkIcons[link.type] || linkIcons.external}
      </a>
    `).join('');

    return `
      <article class="project-card fade-up">
        <div class="project-info">
          <h3 class="project-title">${title}</h3>
          <p class="project-description">${description}</p>
          <div class="project-tech">${techTags}</div>
          <div class="project-links">${linksHtml}</div>
        </div>
      </article>
    `;
  }).join('');
}

function initProjectFilters() {
  const buttons = document.querySelectorAll('.project-filters [data-filter]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProjects(PROJECTS, currentFilter);
      if (typeof initScrollAnimations === 'function') requestAnimationFrame(initScrollAnimations);
    });
  });
  const allBtn = document.querySelector('.project-filters [data-filter="all"]');
  if (allBtn) allBtn.classList.add('active');
}

function initProjects() {
  renderProjects(PROJECTS);
  initProjectFilters();
  if (typeof initScrollAnimations === 'function') initScrollAnimations();
}

window['rerenderProjects'] = () => {
  renderProjects(PROJECTS, currentFilter);
  if (typeof initScrollAnimations === 'function') requestAnimationFrame(initScrollAnimations);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}
