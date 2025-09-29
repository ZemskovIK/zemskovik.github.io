function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  document
    .querySelectorAll('.fade-in, .skill-card, .timeline-item, .project-card')
    .forEach((el) => {
      observer.observe(el)
    })
}

function loadSkills() {
  const skillsData = [
    // Languages
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },

    // Backend Frameworks
    {
      name: 'FastAPI',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    },

    // Frontend
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    {
      name: 'SASS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    },

    // Databases
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },

    // DevOps & Tools
    {
      name: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    },
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },

    // Build Tools
    {
      name: 'Vite',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    },
  ]

  const container = document.getElementById('skills-container')
  if (!container) {
    console.error('Skills container not found!')
    return
  }

  container.innerHTML = skillsData
    .map(
      (skill) => `
        <div class="skill-card">
            <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" />
            <div class="skill-name">${skill.name}</div>
        </div>
    `
    )
    .join('')

  initScrollAnimations()
}

function calculateScrollOffset() {
  if (window.innerWidth < 768) {
    return 60
  } else if (window.innerWidth < 1024) {
    return 50
  } else {
    return 40
  }
}

document.addEventListener('DOMContentLoaded', function () {
  loadSkills()

  const burgerMenu = document.getElementById('burger-menu')
  const navMenu = document.querySelector('.nav-menu')
  const body = document.body

  if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', function () {
      const isActive = burgerMenu.classList.toggle('active')
      navMenu.classList.toggle('active')
      body.classList.toggle('no-scroll')
      burgerMenu.setAttribute('aria-expanded', isActive)
    })

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', function () {
        burgerMenu.classList.remove('active')
        navMenu.classList.remove('active')
        body.classList.remove('no-scroll')
        burgerMenu.setAttribute('aria-expanded', 'false')
        this.blur()
      })
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        const offset = calculateScrollOffset()
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth',
        })
      }
    })
  })
})
