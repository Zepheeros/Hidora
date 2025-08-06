import { appState } from "./appState.js"; // ✅ Accede al estado global de la app
import { setupGlobalEventListeners } from "./eventListeners.js"; // ✅ Accede a los eventos globales

export function initEventos() {
    console.log("✅ Módulo Eventos y Talleres inicializado correctamente.");

    const readMoreBtn = document.querySelector(".read-more-eventos");
    const eventosModulo = document.querySelector("#eventos-modulo");

    if (!readMoreBtn || !eventosModulo) {
        console.warn("⚠️ No se encontró el botón o el módulo de eventos.");
        return;
    }

    readMoreBtn.addEventListener("click", () => {
        console.log("✅ Click en 'Seguir leyendo' registrado.");
        const isVisible = eventosModulo.classList.contains("visible");

        eventosModulo.classList.toggle("visible", !isVisible);
        eventosModulo.classList.toggle("hidden", isVisible);
        readMoreBtn.textContent = isVisible ? "Seguir leyendo" : "Ocultar sección";

        console.log(`📖 Módulo Eventos ahora está ${isVisible ? "oculto" : "visible"}.`);
    });

    console.log("🔎 Estado del botón:", readMoreBtn);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Documento completamente cargado.");
    initEventos(); // ✅ Llama a `initEventos()` directamente en `DOMContentLoaded`
});
