// --------------------------
// 1. CONFIGURACIÓN Y UTILIDADES
// --------------------------

import { config } from './config.js';
import { appState, initAppState } from './appState.js';
import { browserFixes } from './browserfixes.js'; 
import { animateScroll } from './utils.js';
import { getDOMElements } from './domelements.js';

// --------------------------
// 2. MÓDULOS DE INTERFAZ Y FUNCIONALIDAD
// --------------------------
import { mobileMenu } from './menu-mobile.js';
import { toggleMenu, handleMenuState } from './menuEvents.js';
import { desktopMenu } from './menu-desktop.js';
import { scrollButton } from './scroll-button.js';
import { scrollHeader } from './scroll-header.js';
import { checkMenuElements, checkMenuEvents } from './menuDebugger.js';
import { initScrollEvents } from './scrollevents.js';

// --------------------------
// 3. MANEJO DE EVENTOS
// --------------------------
import { setupGlobalEventListeners } from './eventListeners.js';

// ✅ Obtener elementos primero
const elements = getDOMElements();

// ✅ Función para manejo responsive
function handleResponsive() {
    const isMobile = window.innerWidth < config.breakpoints.desktop;
    if (!isMobile && typeof mobileMenu.close === 'function') {
        mobileMenu.close();
    }
}

// ✅ Inicialización principal mejorada (fuera del `DOMContentLoaded`)
async function initializeApp() {
    try {
        await document.fonts.ready;
        await waitForElements(['header.main-header','#menu-toggle'], 2000);

        mobileMenu.init();
        scrollHeader.init();
        initScrollEvents();

        document.documentElement.classList.remove('preload');
    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }
}

// ✅ Esperar a que TODO esté listo
window.addEventListener('load', () => {
    initializeApp().then(() => {
        console.log('[Debug] scrollHeader disponible:', {
            scrollHeader,
            updateVisibility: typeof scrollHeader?.updateVisibility
        });

        // ✅ Correcciones específicas para navegadores después de la inicialización
        browserFixes.detectBrowser();
        browserFixes.applyFixes();
    });
});
// ✅ iniciar modulo de secciones
document.addEventListener("DOMContentLoaded", async () => {
    try {
        await waitForElements(["header.main-header", "#menu-toggle", ".read-more", "#inicio-modulo", ".read-more-historias", "#historias-modulo"], 2000);

        // ✅ Inicializar la app primero
        initializeApp();

        // ✅ Cargar el módulo "Inicio" si la sección está presente
        const moduloInicio = await import(`${window.location.origin}/BLOG_HIDORA/js/inicio.js`);
        console.log("📌 Módulo importado:", moduloInicio);

        if (moduloInicio.initInicio) {
            console.log("✅ Ejecutando initInicio()...");
            moduloInicio.initInicio();
        } else {
            console.error("❌ initInicio no está definido dentro del módulo.");
        }

        // ✅ Cargar el módulo "Historias de Superación" si la sección está presente
        const moduloHistorias = await import(`${window.location.origin}/BLOG_HIDORA/js/historias.js`);
        console.log("📌 Módulo importado:", moduloHistorias);

        if (moduloHistorias.initHistoriasSuperacion) {
            console.log("✅ Ejecutando initHistoriasSuperacion()...");
            moduloHistorias.initHistoriasSuperacion();
        } else {
            console.error("❌ initHistoriasSuperacion no está definido dentro del módulo.");
        }

    } catch (error) {
        console.error("❌ Error al inicializar:", error);
    }
}); // ✅ Cierre correcto del `DOMContentLoaded`


// ✅ Función auxiliar para esperar elementos
function waitForElements(selectors, timeout = 3000) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const allFound = selectors.every(selector => document.querySelector(selector));
            if (allFound) {
                clearInterval(interval);
                resolve();
            }
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Timeout esperando elementos: ${selectors.join(', ')}`));
        }, timeout);
    });
}

// Configurar eventos del menú
if (elements.menuToggle) {
    elements.menuToggle.addEventListener('click', () => toggleMenu(elements));
}

// 5. Configurar responsive
handleResponsive();
window.addEventListener('resize', handleResponsive);

// 6. Verificaciones finales
checkMenuElements();
checkMenuEvents();

console.debug('📌 Aplicación inicializada correctamente');
