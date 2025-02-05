document.addEventListener('DOMContentLoaded', () => {
  themeSwitcher();
  articles();
  scrollAnimation();
  headerScroll();
  techDescriptions();
  loadingScreen();
  mobileMenu();
  codeTyping();
});

function articles() {
  const articles = document.querySelectorAll('#articles article');
  const articleCountText = document.querySelector('#article-count');
  const categoryFilter = document.querySelector('#category-filter');
  const searchInput = document.querySelector('#search-input');

  function showLastThreeArticles() {
    articles.forEach((article, index) => {
      article.style.display = index < 3 ? 'block' : 'none';
    });
    updateArticleCount(true);
  }

  function updateArticleCount(showTotal = false) {
    if (showTotal) {
      articleCountText.textContent = `Всего статей: ${articles.length}`;
    } else {
      const visibleArticlesCount = Array.from(articles).filter(
        (article) => article.style.display === 'block'
      ).length;
      articleCountText.textContent = `Найдено статей: ${visibleArticlesCount}`;
    }
  }

  categoryFilter.addEventListener('change', function () {
    const selectedCategory = categoryFilter.value.toLowerCase();
    
    if (selectedCategory === '') {
      showLastThreeArticles();
    } else {
      articles.forEach((article) => {
        const articleCategory = article.dataset.category.toLowerCase();
        article.style.display =
          articleCategory === selectedCategory ? 'block' : 'none';
      });
      updateArticleCount();
    }
  });

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();

    articles.forEach((article) => {
      const title = article
        .querySelector('.article-title')
        .textContent.toLowerCase();
      const content = article.querySelector('p').textContent.toLowerCase();

      article.style.display =
        title.includes(query) || content.includes(query) ? 'block' : 'none';
    });

    updateArticleCount();
  });

  showLastThreeArticles();
}

function scrollAnimation() {
  const scrollElements = document.querySelectorAll('.scroll-animate');

  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollElements.forEach((el) => observer.observe(el));
  }, 1500);
}

function headerScroll() {
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function techDescriptions() {
  const techItems = document.querySelectorAll('.tech-item');
  const descriptionBox = document.getElementById('tech-description');

  techItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      descriptionBox.textContent = item.dataset.description;
      descriptionBox.style.opacity = '1';
    });

    item.addEventListener('mouseleave', () => {
      descriptionBox.style.opacity = '0';
    });
  });
}

function loadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');

  document.documentElement.classList.add('loading');
  document.body.classList.add('loading');

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.documentElement.classList.remove('loading');
    document.body.classList.remove('loading');
  }, 1500);
}

function mobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobileMenu');
  const body = document.body;

  function toggleMenu() {
    menu.classList.toggle('active');
    body.classList.toggle('no-scroll');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
}

function themeSwitcher() {
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  document
    .getElementById('theme-switcher')
    .addEventListener('click', toggleTheme);
}

function codeTyping() {
  const codeText = document.getElementById('code');
  const cursor = document.getElementById('cursor');
  const lineHeight = 16;
  const charWidth = 8;
  const startX = 90;
  const startY = 185;
  const tabSize = 4;
  const codeSamples = [
    "def fetch_data():\n return 'Hello, Backend'",
    "const server = require('express')();\nserver.listen(3000);",
    "function queryDB() {\n return 'Data Loaded';\n}",
  ];
  let index = 0;
  let textIndex = 0;
  let tspans = [];
  let currentTspan;
  let currentIndent = 0;

  function createTspan(yOffset, indent = 0) {
    let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan.setAttribute('x', startX + indent * charWidth);
    tspan.setAttribute('y', startY + yOffset);
    tspan.textContent = '';
    codeText.appendChild(tspan);
    tspans.push(tspan);
    return tspan;
  }

  currentTspan = createTspan(0);

  function typeCode() {
    if (textIndex < codeSamples[index].length) {
      let char = codeSamples[index][textIndex];

      if (char === '\t') {
        char = ' '.repeat(tabSize);
      }

      if (char === '\n') {
        currentTspan = createTspan(tspans.length * lineHeight, currentIndent);
      } else {
        currentTspan.textContent += char;
      }

      cursor.setAttribute('x', startX + currentTspan.getComputedTextLength());
      cursor.setAttribute('y', startY + (tspans.length - 1) * lineHeight);

      textIndex++;
      setTimeout(typeCode, 100);
    } else {
      setTimeout(() => {
        textIndex = 0;
        codeText.innerHTML = '';
        tspans = [];
        currentTspan = createTspan(0);
        index = (index + 1) % codeSamples.length;
        cursor.setAttribute('x', startX);
        cursor.setAttribute('y', startY);
        setTimeout(typeCode, 500);
      }, 2000);
    }
  }

  typeCode();
}