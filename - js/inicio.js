import { appState } from "./appState.js"; // ✅ Accede al estado global de la app
import { setupGlobalEventListeners } from "./eventListeners.js"; // ✅ Accede a los eventos globales

export function initInicio() {
    console.log("✅ Módulo Inicio inicializado correctamente.");

    const readMoreBtn = document.querySelector(".read-more");
    const inicioModulo = document.querySelector("#inicio-modulo");

    if (!readMoreBtn || !inicioModulo) {
        console.warn("⚠️ No se encontró el botón o el módulo de inicio.");
        return;
    }

    readMoreBtn.addEventListener("click", () => {
        console.log("✅ Click en 'Seguir leyendo' registrado.");
        const isVisible = inicioModulo.classList.contains("visible");

        inicioModulo.classList.toggle("visible", !isVisible);
        inicioModulo.classList.toggle("hidden", isVisible);
        readMoreBtn.textContent = isVisible ? "Seguir leyendo" : "Ocultar sección";

        console.log(`📖 Módulo Inicio ahora está ${isVisible ? "oculto" : "visible"}.`);
    });

    // ✅ Estado del botón después de inicializarlo
    console.log("🔎 Estado del botón:", readMoreBtn);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Documento completamente cargado.");
    initInicio(); // ✅ Llama a `initInicio()` directamente en `DOMContentLoaded`

    // ✅ Agrega eventos de interacción en la página de Inicio
    const sendCommentBtn = document.querySelector(".send-comment");
    if (sendCommentBtn) {
        sendCommentBtn.addEventListener("click", function () {
            alert("¡Gracias por tu comentario! Será revisado por la comunidad.");
        });
    }

    const mapImage = document.querySelector(".map-interactive");
    if (mapImage) {
        mapImage.addEventListener("click", function () {
            alert("Explorando el arrecife de Geva...");
        });
    }
});
