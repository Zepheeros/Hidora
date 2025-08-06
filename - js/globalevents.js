import { appState } from './appState.js';

export const globalEvents = {
    setupViewportChange(menuUpdateFn) {
        const handleViewportChange = (e) => {
            if (!e.detail.isMobile && appState.menu.isOpen) {
                appState.menu.isOpen = false;
                document.dispatchEvent(new CustomEvent('menuStateChange', { detail: { isOpen: false, isMobile: false } }));
            }
            menuUpdateFn?.();
        };

        document.addEventListener('viewportChange', handleViewportChange);
        return () => document.removeEventListener('viewportChange', handleViewportChange);
    }
};
