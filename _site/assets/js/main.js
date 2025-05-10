document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const textarea = document.querySelectorAll(".auto-expand");

  // Función para cerrar el menú
  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    hamburgerIcon.classList.remove("opacity-0");
    closeIcon.classList.add("opacity-0");
    hamburgerButton.setAttribute("aria-expanded", "false");
  }

  document.querySelectorAll(".js-map-lite").forEach((container) => {
    container.addEventListener("click", () => injectMap(container));
    container.addEventListener("keypress", (e) => {
      if (e.key === "Enter") injectMap(container);
    });
  });

  function injectMap(container) {
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3518.215450707012!2d-15.43278772404242!3d28.12336487584835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40950f6a5e5c6b%3A0x3a8e8b4c1a0d9a1!2sC.%20Ripoche%2C%207%2C%2035007%20Las%20Palmas%20de%20Gran%20Canaria%2C%20Las%20Palmas!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses";
    iframe.className = "w-full h-full border-0 rounded-lg shadow";
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    container.innerHTML = "";
    container.appendChild(iframe);
  }

  // Toggle del menú hamburguesa
  hamburgerButton.addEventListener("click", function () {
    const isExpanded = hamburgerButton.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      hamburgerIcon.classList.add("opacity-0");
      closeIcon.classList.remove("opacity-0");
      hamburgerButton.setAttribute("aria-expanded", "true");
    }
  });

  // Cerrar menú al hacer click en un enlace
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Solo cerrar si es un enlace interno (que comienza con #)
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        closeMobileMenu();

        // Scroll suave al destino
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", function (e) {
    if (!hamburgerButton.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

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
});

// Habilitar scroll suave para todos los enlaces con clase scroll-smooth
document.querySelectorAll("a.scroll-smooth").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});
