const BASE_ASSET_PATH = window.location.pathname.includes('/assets/pages/') ? '../' : '';
const PROJECTS_JSON_PATH = window.location.pathname.includes('/assets/pages/') ? '../data/projects.json' : 'assets/data/projects.json';

const DEFAULT_PROJECTS = [
    {
        "title": "IT Support Dashboard",
        "description": "Ticketing dashboard and asset tracking for internal IT support.",
        "image": "assets/img/NC2.jpeg"
    },
    {
        "title": "Network Cabling & Deployment",
        "description": "Structured cabling and point-to-point network setups.",
        "image": "assets/img/marns.jpg"
    },
    {
        "title": "Certificate Gallery",
        "description": "Certification evidence and training records display.",
        "image": "assets/img/NC2.jpeg"
    },
    {
        "title": "IT Documentation",
        "description": "Manuals, diagrams, and IT procedure documentation for support teams.",
        "image": "assets/img/marns.jpg"
    }
];

async function loadProjects() {
    try {
        const response = await fetch(PROJECTS_JSON_PATH);
        if (!response.ok) throw new Error('Unable to fetch projects');
        const projects = await response.json();
        return projects;
    } catch (error) {
        return DEFAULT_PROJECTS;
    }
}

function renderProjectsGrid(container, projects, maxItems = 0) {
    container.innerHTML = '';
    const items = maxItems > 0 ? projects.slice(0, maxItems) : projects;

    items.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${BASE_ASSET_PATH}${project.image}" alt="${project.title}">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
        `;
        container.appendChild(card);
    });
}

function initProjects() {
    const containers = document.querySelectorAll('.projects-grid');
    if (!containers.length) return;

    loadProjects().then(projects => {
        containers.forEach(container => {
            const max = parseInt(container.dataset.max, 10) || 0;
            renderProjectsGrid(container, projects, max);
        });
    });
}

function initDarkMode() {
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';

    if (darkModeEnabled) {
        body.classList.add('dark-mode');
        if (toggleButton) toggleButton.textContent = '☀️ Light Mode';
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                toggleButton.textContent = '☀️ Light Mode';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                toggleButton.textContent = '🌙 Dark Mode';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initProjects();
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
