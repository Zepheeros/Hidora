/**
 * Estado global de la aplicación - Versión optimizada
 * @module AppState
 * @version 3.1
 */

const state = {
    menu: {
        isOpen: false,
        isMobile: window.matchMedia('(max-width: 768px)').matches,
        isAnimating: false
    },
    breakpoints: {
        mobile: 0,
        tablet: 768,
        desktop: 1024
    }
};

const methods = {
    toggleMenuState() {
        state.menu.isOpen = !state.menu.isOpen;
        this.dispatchMenuChange();
    },

    setMenuState(isOpen) {
        state.menu.isOpen = isOpen;
        this.dispatchMenuChange();
    },

    dispatchMenuChange() {
        try {
            document.dispatchEvent(new CustomEvent('menuStateChange', {
                detail: { isOpen: state.menu.isOpen, isMobile: state.menu.isMobile }
            }));
        } catch (error) {
            console.error('❌ Error al despachar el evento `menuStateChange`:', error);
        }
    },

    updateViewportState() {
        const isNowMobile = window.matchMedia('(max-width: 768px)').matches;
        if (state.menu.isMobile !== isNowMobile) {
            state.menu.isMobile = isNowMobile;
            console.log(`[Debug] Vista: ${isNowMobile ? 'Móvil' : 'Desktop'}`);
            this.dispatchMenuChange(); // 🔹 Propagar cambio para evitar inconsistencias
        }
    },

    initResizeListener() {
        window.addEventListener('resize', () => this.updateViewportState());
    }
};

export const appState = {
    get menu() {
        return state.menu;
    },
    get breakpoints() {
        return state.breakpoints;
    },
    methods: Object.freeze(methods)
};

/**
 * Inicializa el estado de la aplicación con mejoras en el manejo del DOM
 */
export function initAppState() {
    if (document.readyState === 'complete') {
        methods.updateViewportState();
    } else {
        document.addEventListener('DOMContentLoaded', () => methods.updateViewportState());
    }

    methods.initResizeListener();
}
