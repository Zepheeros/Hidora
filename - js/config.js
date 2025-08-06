/**
 * CONFIGURACIÓN GLOBAL - Versión mejorada para compatibilidad con menú y scroll modular
 * @version 1.3
 */

// Versión de configuración
const CONFIG_VERSION = '1.3';

export const config = {
    // Breakpoints responsive (px)
    breakpoints: {
        xs: 0,
        sm: 480,
        md: 768,
        lg: 1024,
        xl: 1200,
        xxl: 1440
    },
    
    // Configuración específica del menú
    menu: {
        animationDuration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        mobileBreakpoint: 'md',
        closeOnLinkClick: true,
        touchEvents: true,
        overlayOpacity: 0.7,
        zIndex: {
            menu: 1000,
            overlay: 999,
            toggle: 1001
        }
    },

    // Configuración del botón de scroll
    scrollButton: {
        selector: '.scroll-to-top',
        visibleClass: 'is-visible',
        hiddenClass: 'is-hidden',
        animationDuration: 300
    },

    // Animaciones
    animations: {
        duration: 300,
        shortDuration: 150,
        longDuration: 450,
        respectMotionPreferences: true
    },

    // Versión
    _version: CONFIG_VERSION
};

// Selectores CSS
export const selectors = {
    menu: {
        toggle: '#menu-toggle',
        mobileNav: '#mobile-nav', // ✅ Confirmar que coincide con el `id` real
        overlay: '.menu-overlay', // ✅ Confirmar que coincide con el `class` real
        links: '#mobile-nav .nav-link', // ✅ Asegurarse de que los enlaces tengan la clase `nav-link`
        scrollToTop: '.scroll-to-top', // Para que coincida con domelements.js
        desktopNav: '#desktop-nav' // Nuevo selector
    },
    scrollButton: '.scroll-to-top', // 🔹 Renombrado
    header: 'header.main-header',
    mainContent: 'main'
};

// Clases de estado
export const cssClasses = {
    active: 'is-active',
    hidden: 'is-hidden',
    visible: 'is-visible',
    open: 'is-open',

    // Específicas de menú
    menu: {
        active: 'menu--active',
        open: 'menu--open',
        animating: 'menu--animating',
        mobile: 'menu--mobile',
        desktop: 'menu--desktop'
    },

    // Scroll
    scrollButton: {
        visible: 'scroll-btn--visible',
        hidden: 'scroll-btn--hidden'
    },

    header: {
        hidden: 'header--hidden' // 🔹 Ahora `scroll-header.js` lo usa
    }
};
