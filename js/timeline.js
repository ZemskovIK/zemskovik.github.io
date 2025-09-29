function initTimeline() {
  const timelineData = [
    {
      year: '2022',
      title: 'Основы Python',
      description:
        'Изучение Python в школе и подготовка к ЕГЭ. Первое знакомство с программированием.',
    },
    {
      year: '2023',
      title: 'Поступление в вуз',
      description:
        'Поступление в РТУ МИРЭА на специальность "Информационно-аналитические системы безопасности".',
    },
    {
      year: '2024',
      title: 'Веб-разработка',
      description:
        'Изучение HTML, CSS, JavaScript. Создание первых веб-приложений и изучение фронтенда.',
    },
    {
      year: '2025',
      title: 'Современные технологии',
      description:
        'Изучение React, Sass, FastAPI. Освоение полного стека веб-разработки.',
    },
  ]

  const container = document.getElementById('timeline-container')
  if (!container) {
    console.error('Timeline container not found!')
    return
  }

  container.innerHTML = timelineData
    .map(
      (item, index) => `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <p class="timeline-year">${item.year}</p>
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-description">${item.description}</p>
          </div>
        </div>
      `
    )
    .join('')
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initTimeline)
