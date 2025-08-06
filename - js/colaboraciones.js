import { appState } from "./appState.js"; // ✅ Accede al estado global de la app
import { setupGlobalEventListeners } from "./eventListeners.js"; // ✅ Accede a los eventos globales

export function initColaboraciones() {
    console.log("✅ Módulo Colaboraciones inicializado correctamente.");

    const readMoreBtn = document.querySelector(".read-more-colaboraciones");
    const colaboracionesModulo = document.querySelector("#colaboraciones-modulo");

    if (!readMoreBtn || !colaboracionesModulo) {
        console.warn("⚠️ No se encontró el botón o el módulo de colaboraciones.");
        return;
    }

    readMoreBtn.addEventListener("click", () => {
        console.log("✅ Click en 'Seguir leyendo' registrado.");
        const isVisible = colaboracionesModulo.classList.contains("visible");

        colaboracionesModulo.classList.toggle("visible", !isVisible);
        colaboracionesModulo.classList.toggle("hidden", isVisible);
        readMoreBtn.textContent = isVisible ? "Seguir leyendo" : "Ocultar sección";

        console.log(`📖 Módulo Colaboraciones ahora está ${isVisible ? "oculto" : "visible"}.`);
    });

    console.log("🔎 Estado del botón:", readMoreBtn);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Documento completamente cargado.");
    initColaboraciones(); // ✅ Llama a `initColaboraciones()` directamente en `DOMContentLoaded`
});
