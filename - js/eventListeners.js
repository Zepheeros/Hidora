import { appState } from './appState.js';

/**
 * Configuración centralizada de eventos globales
 */
export function setupGlobalEventListeners() {
    const cleanupFunctions = [];

    console.log('[Debug] Inicializando eventos globales');

    // 1️⃣ Manejo de cambios en el tamaño de la pantalla
    const handleViewportChange = (e) => {
    if (!e.detail.isMobile && appState.menu.isOpen) {
        if (!document.querySelector("#inicio")) {
            appState.menu.isOpen = false;
            document.dispatchEvent(new CustomEvent("menuStateChange", {
                detail: { isOpen: false, isMobile: false }
            }));
        } else {
            console.log("🔹 Cambio de viewport en Inicio, el menú sigue activo.");
        }
    }
};


    document.addEventListener('viewportChange', handleViewportChange);
    cleanupFunctions.push(() => document.removeEventListener('viewportChange', handleViewportChange));

    // Retornar función de limpieza consolidada
    return () => cleanupFunctions.forEach(fn => fn());
}
