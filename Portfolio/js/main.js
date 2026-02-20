// Initialize Lucide Icons
lucide.createIcons();

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple Reveal Animation on Scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = "1";
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    observer.observe(section);
});
// Load Projects from JSON
async function initPortfolio() {
    try {
        const response = await fetch('./data/projects.json');
        const projects = await response.json();
        renderProjects(projects);
    } catch (err) {
        console.error("Error loading projects:", err);
    }
}

function renderProjects(projects) {
    const container = document.querySelector('#project-grid');
    container.innerHTML = projects.map(p => `
        <article class="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500">
            <div class="aspect-video overflow-hidden">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700">
            </div>
            <div class="p-8">
                <div class="flex gap-2 mb-4">
                    ${p.stack.split(',').map(tag => `<span class="text-[10px] font-bold px-2 py-1 bg-white/5 rounded-md uppercase tracking-tighter text-gray-400">${tag.trim()}</span>`).join('')}
                </div>
                <h3 class="text-2xl font-bold mb-3">${p.name}</h3>
                <p class="text-gray-400 text-sm mb-6 leading-relaxed">${p.desc}</p>
                <div class="flex gap-6">
                    <a href="${p.live}" class="flex items-center gap-2 text-sm font-bold hover:text-purple-400 transition-colors">Live Demo <i data-lucide="external-link" size="16"></i></a>
                    <a href="${p.github}" class="flex items-center gap-2 text-sm font-bold hover:text-purple-400 transition-colors">Source <i data-lucide="github" size="16"></i></a>
                </div>
            </div>
        </article>
    `).join('');
    
    // Re-run Lucide icons for the new elements
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', initPortfolio);

/**
 * Main Portfolio Logic - Tawhid Laskar 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons for static elements
    if (window.lucide) lucide.createIcons();
    
    // Load Dynamic Projects
    fetchPortfolioData();
});

async function fetchPortfolioData() {
    const grid = document.getElementById('project-grid');
    
    try {
        // Fetch the JSON file created by your admin panel
        const response = await fetch('./data/projects.json');
        if (!response.ok) throw new Error("JSON not found");
        
        const projects = await response.json();
        
        // Clear the skeleton loaders
        grid.innerHTML = '';

        // Render each project card
        projects.forEach(project => {
            grid.innerHTML += createProjectCard(project);
        });

        // Re-initialize Lucide for newly added icons
        if (window.lucide) lucide.createIcons();

    } catch (error) {
        console.error("Error loading projects:", error);
        grid.innerHTML = `<p class="text-gray-500 col-span-full text-center py-20 font-mono">// Error loading projects. Check data/projects.json</p>`;
    }
}

function createProjectCard(p) {
    // Logic to handle tech stack strings (e.g., "Python, Firebase")
    const tags = p.stack.split(',').map(tag => 
        `<span class="px-2 py-1 bg-white/5 text-gray-400 text-[10px] font-bold rounded-md uppercase tracking-tighter border border-white/5">
            ${tag.trim()}
        </span>`
    ).join('');

    return `
        <article class="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/40 transition-all duration-500">
            <div class="aspect-video overflow-hidden relative">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
            </div>
            
            <div class="p-8 relative">
                <div class="flex flex-wrap gap-2 mb-4">
                    ${tags}
                </div>
                <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">${p.name}</h3>
                <p class="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">${p.desc}</p>
                
                <div class="flex gap-6 items-center">
                    <a href="${p.live}" target="_blank" class="flex items-center gap-2 text-xs font-black tracking-widest uppercase hover:text-purple-400 transition-colors">
                        Live Demo <i data-lucide="external-link" size="14"></i>
                    </a>
                    <a href="${p.github}" target="_blank" class="flex items-center gap-2 text-xs font-black tracking-widest uppercase hover:text-purple-400 transition-colors">
                        Source <i data-lucide="github" size="14"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}