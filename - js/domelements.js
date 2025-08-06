import { selectors } from './config.js';

const domCache = new Map();
const errorReports = new Set();

/**
 * Obtiene elementos DOM con caché y manejo de errores mejorado
 */
export function getDOMElements() {
    try {
        // 🧹 Limpieza antes de buscar elementos
        clearDomCache();

        if (!selectors?.menu) {
            console.warn('⚠️ Configuración de selectores no encontrada, devolviendo estructura vacía.');
            return {};
        }

        const elements = {
            menuToggle: getElement(selectors.menu.toggle, 'Botón de menú', true),
            mobileNav: getElement(selectors.menu.mobileNav, 'Navegación móvil', true),
            menuOverlay: getElement(selectors.menu.overlay, 'Overlay del menú'),
            navLinks: getElements(selectors.menu.links, 'Enlaces de navegación'),
            desktopNav: getElement(selectors.menu.desktopNav, 'Navegación desktop'),
            scrollToTopButton: getElement(selectors.scrollButton.selector, 'Botón de scroll'),
            header: getElement(selectors.header, 'Encabezado'),
            htmlElement: document.documentElement,
            bodyElement: document.body
        };

        console.log('[Debug] Elementos obtenidos en getDOMElements():', elements);
        console.log('[Debug] getDOMElements() retorna:', elements);


        if (!elements.menuToggle || !elements.mobileNav) {
            throw new Error(`Elementos críticos faltantes: ${!elements.menuToggle ? 'menuToggle' : ''} ${!elements.mobileNav ? 'mobileNav' : ''}`);
        }

        elements.mobileNav.dataset.jsEnabled = "true";
        return elements;
    } catch (error) {
        console.error('Error en getDOMElements():', error);
        reportError(error);

        return {
            menuToggle: null,
            mobileNav: null,
            menuOverlay: null,
            navLinks: [],
            scrollToTopButton: null,
            header: null,
            htmlElement: document.documentElement,
            bodyElement: document.body
        };
    }
}

/**
 * Obtiene un elemento individual con caché
 */
function fetchFromCache(selector, callback, required, name) {
    if (!selector) {
        if (required) reportError(new Error(`Selector vacío para: ${name}`));
        return required ? null : [];
    }

    if (!domCache.has(selector)) {
        const result = callback(selector);
        if (!result || (Array.isArray(result) && result.length === 0)) {
            if (required) reportError(new Error(`Elemento requerido no encontrado (${name}): ${selector}`));
        }
        domCache.set(selector, result);
    }

    return domCache.get(selector);
}

/**
 * Obtiene múltiples elementos con caché
 */
function getElements(selector, name = '') {
    return fetchFromCache(selector, document.querySelectorAll.bind(document), false, name);
}

/**
 * Obtiene un elemento único con caché
 */
function getElement(selector, name = '', required = false) {
    return fetchFromCache(selector, document.querySelector.bind(document), required, name);
}

/**
 * Reporta errores de forma controlada
 */
function reportError(error) {
    if (!errorReports.has(error.message)) {
        errorReports.add(error.message);
        console.error('DOM Error:', error.message);

        if (window.trackError) {
            window.trackError(error);
        }
    }
}

/**
 * Limpia caché y reportes de error
 */
export function clearDomCache() {
    domCache.clear();
    errorReports.clear();
}



