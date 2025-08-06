import { appState } from "./appState.js"; // ✅ Accede al estado global de la app
import { setupGlobalEventListeners } from "./eventListeners.js"; // ✅ Accede a los eventos globales

export function initConsejos() {
    console.log("✅ Módulo Consejos inicializado correctamente.");

    const readMoreBtn = document.querySelector(".read-more-consejos");
    const consejosModulo = document.querySelector("#consejos-modulo");

    if (!readMoreBtn || !consejosModulo) {
        console.warn("⚠️ No se encontró el botón o el módulo de consejos.");
        return;
    }

    readMoreBtn.addEventListener("click", () => {
        console.log("✅ Click en 'Seguir leyendo' registrado.");
        const isVisible = consejosModulo.classList.contains("visible");

        consejosModulo.classList.toggle("visible", !isVisible);
        consejosModulo.classList.toggle("hidden", isVisible);
        readMoreBtn.textContent = isVisible ? "Seguir leyendo" : "Ocultar sección";

        console.log(`📖 Módulo Consejos ahora está ${isVisible ? "oculto" : "visible"}.`);
    });

    console.log("🔎 Estado del botón:", readMoreBtn);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Documento completamente cargado.");
    initConsejos(); // ✅ Llama a `initConsejos()` directamente en `DOMContentLoaded`
});
