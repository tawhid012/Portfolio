/**
 * Projects Archive Logic - Tawhid Laskar
 */

let allProjects = [];

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('full-project-grid');
    const searchInput = document.getElementById('projectSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');

    try {
        const response = await fetch('data/projects.json');
        allProjects = await response.json();
        renderArchive(allProjects);

        // Search Logic
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allProjects.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.stack.toLowerCase().includes(term) ||
                p.desc.toLowerCase().includes(term)
            );
            renderArchive(filtered);
        });

        // Filter Logic
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update UI active state
                filterBtns.forEach(b => b.classList.remove('bg-purple-600', 'border-purple-500'));
                filterBtns.forEach(b => b.classList.add('border-white/10'));
                btn.classList.add('bg-purple-600', 'border-purple-500');
                btn.classList.remove('border-white/10');

                const filter = btn.getAttribute('data-filter');
                const filtered = filter === 'all' 
                    ? allProjects 
                    : allProjects.filter(p => p.stack.toLowerCase().includes(filter));
                renderArchive(filtered);
            });
        });

    } catch (err) {
        console.error("Archive Error:", err);
        grid.innerHTML = `<p class="col-span-full text-center py-20 text-gray-600 font-mono uppercase tracking-widest">Error connecting to project database</p>`;
    }
});

function renderArchive(projects) {
    const grid = document.getElementById('full-project-grid');
    const emptyState = document.getElementById('no-results');

    if (projects.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    grid.innerHTML = projects.map(p => `
        <article class="glass p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group">
            <div class="aspect-video overflow-hidden rounded-2xl mb-6 relative">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-40"></div>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${p.stack.split(',').map(tag => `<span class="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-gray-500 uppercase">${tag.trim()}</span>`).join('')}
            </div>
            
            <h3 class="text-xl font-bold mb-3">${p.name}</h3>
            <p class="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-3">${p.desc}</p>
            
            <div class="flex justify-between items-center pt-4 border-t border-white/5">
                <a href="${p.live}" target="_blank" class="text-[10px] font-black tracking-widest text-purple-400 hover:text-white transition-colors">LIVE PREVIEW</a>
                <a href="${p.github}" target="_blank" class="text-gray-500 hover:text-white transition-colors"><i data-lucide="github" size="16"></i></a>
            </div>
        </article>
    `).join('');
    
    if (window.lucide) lucide.createIcons();
}