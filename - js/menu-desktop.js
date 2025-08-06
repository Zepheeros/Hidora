import { config } from './config.js';

export const desktopMenu = {
    init() {
        console.log('🖥️ Desktop menu inicializado correctamente.');
        this.setupDesktopInteractions();
    },

    setupDesktopInteractions() {
        const navLinks = document.querySelectorAll('.desktop-nav a');

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                console.log(`🔹 Hover en ${link.textContent}`);
            });
        });
    }
};

document.addEventListener("DOMContentLoaded", () => desktopMenu.init());
