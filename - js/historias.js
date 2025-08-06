import { appState } from "./appState.js"; // ✅ Accede al estado global de la app
import { setupGlobalEventListeners } from "./eventListeners.js"; // ✅ Accede a los eventos globales

export function initHistoriasSuperacion() {
    console.log("✅ Módulo Historias de Superación inicializado correctamente.");

    const readMoreBtn = document.querySelector(".read-more-historias");
    const historiasModulo = document.querySelector("#historias-modulo");

    if (!readMoreBtn || !historiasModulo) {
        console.warn("⚠️ No se encontró el botón o el módulo de historias.");
        return;
    }

    readMoreBtn.addEventListener("click", () => {
        console.log("✅ Click en 'Seguir leyendo' registrado.");
        const isVisible = historiasModulo.classList.contains("visible");

        historiasModulo.classList.toggle("visible", !isVisible);
        historiasModulo.classList.toggle("hidden", isVisible);
        readMoreBtn.textContent = isVisible ? "Seguir leyendo" : "Ocultar sección";

        console.log(`📖 Módulo Historias ahora está ${isVisible ? "oculto" : "visible"}.`);
    });

    console.log("🔎 Estado del botón:", readMoreBtn);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Documento completamente cargado.");
    initHistoriasSuperacion(); // ✅ Llama a `initHistoriasSuperacion()` directamente en `DOMContentLoaded`
});
