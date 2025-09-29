function loadProjects() {
  return {
    projects: [
      {
        id: 1,
        title: 'Портфолио дизайнера интерьера',
        description: `Многостраничный сайт с каталогом проектов.
        Система отзывов через Supabase, формы обратной связи через EmailJS.`,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'EmailJS'],
        image: 'images/project1.png',
        links: [{ name: 'Demo', url: 'https://romanzemskov.ru' }],
      },
      {
        id: 2,
        title: 'Клиент для архива военных писем',
        description: `Десктоп-приложение для хакатона "Код Победы".
        Интерфейс управления архивом с ролевой системой доступа, интеграция с REST API.`,
        technologies: ['Python', 'Tkinter', 'REST API', 'JWT'],
        image: 'images/project2.png',
        links: [
          {
            name: 'GitHub',
            url: 'https://github.com/ZemskovIK/Spectre/tree/main/client/desktop',
          },
        ],
      },
      {
        id: 3,
        title: 'Сайт-визитка для медицинской IT-компании',
        description: `Корпоративный сайт с современным минималистичным дизайном и адаптивной версткой.`,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite'],
        image: 'images/project3.png',
        links: [
          {
            name: 'Demo',
            url: 'https://infomed.tech',
          },
        ],
      },
    ],
  }
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container')
  if (!container) {
    console.error('Projects container not found!')
    return
  }

  container.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card fade-in">
            <div class="project-image">
                <img src="${project.image}" alt="${
        project.title
      }" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies
                      .map(
                        (tech) => `
                        <span class="tech-tag">${tech}</span>
                    `
                      )
                      .join('')}
                </div>
                <div class="project-links">
                    ${project.links
                      .map(
                        (link) => `
                        <a href="${link.url}" class="project-link" target="_blank">${link.name}</a>
                    `
                      )
                      .join('')}
                </div>
            </div>
        </div>
    `
    )
    .join('')

  initScrollAnimations()
}

document.addEventListener('DOMContentLoaded', function () {
  const data = loadProjects()
  renderProjects(data.projects)
})
