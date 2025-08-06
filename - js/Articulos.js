import { appState } from "./appState.js"; // ✅ Accede al estado global de la app
import { setupGlobalEventListeners } from "./eventListeners.js"; // ✅ Accede a los eventos globales

export function initArticulos() {
    console.log("✅ Módulo Artículos Educativos inicializado correctamente.");

    const readMoreBtn = document.querySelector(".read-more-articulos");
    const articulosModulo = document.querySelector("#articulos-modulo");

    if (!readMoreBtn || !articulosModulo) {
        console.warn("⚠️ No se encontró el botón o el módulo de artículos.");
        return;
    }

    readMoreBtn.addEventListener("click", () => {
        console.log("✅ Click en 'Seguir leyendo' registrado.");
        const isVisible = articulosModulo.classList.contains("visible");

        articulosModulo.classList.toggle("visible", !isVisible);
        articulosModulo.classList.toggle("hidden", isVisible);
        readMoreBtn.textContent = isVisible ? "Seguir leyendo" : "Ocultar sección";

        console.log(`📖 Módulo Artículos ahora está ${isVisible ? "oculto" : "visible"}.`);
    });

    console.log("🔎 Estado del botón:", readMoreBtn);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Documento completamente cargado.");
    initArticulos(); // ✅ Llama a `initArticulos()` directamente en `DOMContentLoaded`
});
