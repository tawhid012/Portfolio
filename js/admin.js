/**
 * Admin Panel Logic - Tawhid Laskar Portfolio 2026
 * Handles real-time JSON generation and Live Preview.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('genForm');
    const outputContainer = document.getElementById('output');
    const previewContainer = document.getElementById('livePreview');

    // Initial Lucide Icons
    if (window.lucide) lucide.createIcons();

    /**
     * Core function to generate the JSON object
     * This is triggered by listeners below
     */
    window.generateJSON = () => {
        const projectData = {
            id: Date.now(), // Unique timestamp ID
            name: document.getElementById('name').value || "Project Name",
            stack: document.getElementById('stack').value || "React, Python, Tailwind",
            desc: document.getElementById('desc').value || "High-impact description of the project architecture and results.",
            github: document.getElementById('git').value || "https://github.com/tawhid012",
            live: document.getElementById('live').value || "https://studyfreaks.netlify.app",
            image: document.getElementById('img').value || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        };

        // Update the code display area
        const jsonString = JSON.stringify(projectData, null, 2);
        outputContainer.textContent = jsonString + ",";

        // Update the live visual preview
        updatePreview(projectData);
    };

    /**
     * Updates the UI card preview to match index.html design
     */
    const updatePreview = (p) => {
        previewContainer.innerHTML = `
            <div class="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden max-w-sm mx-auto transition-all shadow-2xl">
                <div class="aspect-video bg-gray-900 overflow-hidden">
                    <img src="${p.image}" class="w-full h-full object-cover opacity-60">
                </div>
                <div class="p-6">
                    <div class="flex flex-wrap gap-2 mb-3">
                        ${p.stack.split(',').map(tag => `
                            <span class="px-2 py-1 bg-white/5 text-gray-400 text-[9px] font-bold rounded-md uppercase tracking-tighter border border-white/5">
                                ${tag.trim()}
                            </span>
                        `).join('')}
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-white">${p.name}</h3>
                    <p class="text-gray-400 mb-6 text-xs leading-relaxed line-clamp-3">${p.desc}</p>
                    <div class="flex gap-4 opacity-50">
                        <span class="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">Live <i data-lucide="external-link" size="12"></i></span>
                        <span class="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">Code <i data-lucide="github" size="12"></i></span>
                    </div>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    };

    // Attach real-time listeners to all inputs
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', generateJSON);
    });

    // Copy to Clipboard logic
    window.copyToClipboard = () => {
        const text = outputContainer.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.querySelector('.copy-btn');
            const originalText = copyBtn.innerText;
            
            copyBtn.innerText = "COPIED TO CLIPBOARD!";
            copyBtn.style.backgroundColor = "#9333ea"; // Purple-600
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = "";
            }, 2000);
        });
    };

    // Helper to clear form
    window.clearForm = () => {
        form.reset();
        generateJSON();
    };
});