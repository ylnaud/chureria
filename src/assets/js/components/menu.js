const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
const textarea = document.querySelectorAll(".auto-expand");
function menu() {

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remover clase active de todos los botones y contenidos
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Añadir clase active al botón clickeado
      button.classList.add("active");

      // Mostrar el contenido correspondiente
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  textarea.forEach((textarea) => {
    autoResizeTextarea(textarea); // inicializa tamaño
    textarea.addEventListener("input", () => autoResizeTextarea(textarea));
  });
}

export default menu